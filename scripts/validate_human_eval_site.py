#!/usr/bin/env python3
"""Validate the approved public gallery and protect private study content."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path

REQUIRED_PUBLIC_FILES = {
    "videos/index.html",
    "videos/gallery.js",
    "videos/task.html",
    "videos/task.js",
    "videos/tasks.js",
    "human-eval/index.html",
    "human-eval/app.js",
    "human-eval/styles.css",
    "human-eval/config.js",
    "human-eval/config.example.js",
    "human-eval/human_eval_v0.1.json",
    "human-eval/human_eval_v0.2.json",
    "human-eval/study-navigation.mjs",
    "human-eval/tutorial-example.mjs",
    "human-eval/tutorial-example.svg",
    "human-eval/README.md",
    "tests/human-eval-navigation.test.mjs",
}
TEXT_SUFFIXES = {".html", ".js", ".mjs", ".css", ".json", ".md", ".py", ".txt", ".yml", ".yaml"}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def iter_public_files(root: Path):
    for path in root.rglob("*"):
        if path.is_file() and ".git" not in path.parts:
            yield path


def validate(root: Path, private_assets: Path) -> None:
    errors: list[str] = []
    relative_files = {str(path.relative_to(root)) for path in iter_public_files(root)}
    missing = sorted(REQUIRED_PUBLIC_FILES - relative_files)
    if missing:
        errors.append(f"Missing required public UI files: {missing}")

    protected_paths = [
        root / "human-eval" / "tasks.json",
        root / "human-eval" / "images",
    ]
    for path in protected_paths:
        if path.exists():
            errors.append(f"Protected benchmark content remains in the public tree: {path.relative_to(root)}")

    task_image_pattern = re.compile(r"task-(?:0[1-9]|1[0-24-9])\.(?:jpg|jpeg|png|webp)$", re.I)
    for path in iter_public_files(root):
        relative = path.relative_to(root)
        if task_image_pattern.fullmatch(path.name) and relative.parts[0] != "videos":
            errors.append(f"Benchmark-style task image found: {path.relative_to(root)}")

    gallery_manifest_path = root / "videos" / "tasks.js"
    gallery_video_root = root / "videos" / "optimized"
    if gallery_manifest_path.is_file() and gallery_video_root.is_dir():
        gallery_source = gallery_manifest_path.read_text(encoding="utf-8")
        referenced_videos = set(re.findall(r'"video":\s*"([^"\n]+\.mp4)"', gallery_source))
        actual_videos = {
            path.relative_to(gallery_video_root).as_posix()
            for path in gallery_video_root.rglob("*.mp4")
            if path.is_file()
        }
        missing_videos = sorted(referenced_videos - actual_videos)
        unreferenced_videos = sorted(actual_videos - referenced_videos)
        if missing_videos:
            errors.append(f"Public gallery references missing videos: {missing_videos}")
        if unreferenced_videos:
            errors.append(f"Public gallery contains unreferenced videos: {unreferenced_videos}")
        if not referenced_videos:
            errors.append("Public gallery manifest contains no video references")

        oversized_videos = sorted(
            path.relative_to(root).as_posix()
            for path in gallery_video_root.rglob("*.mp4")
            if path.stat().st_size >= 100 * 1024 * 1024
        )
        if oversized_videos:
            errors.append(f"Public gallery videos exceed GitHub's 100 MiB file limit: {oversized_videos}")

    secret_markers = [
        "sb_" + "secret_",
        "service" + "_role",
        "SUPABASE_" + "SERVICE_ROLE_KEY",
        "database_" + "password",
        "postgres" + "ql://postgres:",
    ]
    password_literal = re.compile(r"\b(?:study_)?password\s*[:=]\s*['\"][^'\"]+['\"]", re.I)
    for path in iter_public_files(root):
        if path.suffix.lower() not in TEXT_SUFFIXES or path.name == Path(__file__).name:
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        for marker in secret_markers:
            if marker.lower() in text.lower():
                errors.append(f"Forbidden credential marker in {path.relative_to(root)}")
        if path.suffix.lower() == ".js" and password_literal.search(text):
            errors.append(f"Possible hard-coded study password in {path.relative_to(root)}")

    app_source = (root / "human-eval" / "app.js").read_text(encoding="utf-8")
    required_security_calls = ["signInWithPassword", '.download("tasks.json")', ".insert(payload)"]
    for call in required_security_calls:
        if call not in app_source:
            errors.append(f"Required authenticated runtime behavior is missing: {call}")
    for unsafe_call in ("getPublicUrl", "createSignedUrl", "console.log", ".select("):
        if unsafe_call in app_source:
            errors.append(f"Unsafe or disallowed runtime behavior found: {unsafe_call}")
    for required_v02_source in (
        'const PROTOCOL_VERSION = "0.2"',
        'fetch("./human_eval_v0.2.json"',
        "deriveOverallRanking",
        "overall_ranking_source",
    ):
        if required_v02_source not in app_source:
            errors.append(f"Required Human v0.2 behavior is missing: {required_v02_source}")

    index_source = (root / "human-eval" / "index.html").read_text(encoding="utf-8")
    navigation_source = (root / "human-eval" / "study-navigation.mjs").read_text(encoding="utf-8")
    for removed_manual_control in ("rank-selectors", 'name="rank-', "Assign each strategy a rank"):
        if removed_manual_control in index_source or removed_manual_control in app_source:
            errors.append(f"Manual overall-ranking control remains: {removed_manual_control}")
    if "derived_equal_weight_dimension_sum" not in navigation_source:
        errors.append("Derived-ranking provenance constant is missing")

    protocol_v02 = json.loads((root / "human-eval" / "human_eval_v0.2.json").read_text(encoding="utf-8"))
    if protocol_v02.get("human_protocol_version") != "0.2":
        errors.append("Human v0.2 protocol version is invalid")
    if protocol_v02.get("dataset_revision") != "8d27ada2f16f1a90dfbf0cd7b7537c764cffa61d":
        errors.append("Human v0.2 dataset revision is invalid")
    if protocol_v02.get("manual_overall_ranking_required") is not False:
        errors.append("Human v0.2 must not require manual overall ranking")
    expected_ranking_metadata = {
        "source": "derived_from_dimension_ratings",
        "weighting": "equal",
        "formula": "effectiveness + feasibility + creativity",
        "sort": "descending",
        "ties_allowed": True,
        "tie_method": "group_equal_total_scores",
        "ranking_style": "dense",
    }
    if protocol_v02.get("overall_ranking") != expected_ranking_metadata:
        errors.append("Human v0.2 derived-ranking metadata is invalid")

    config_source = (root / "human-eval" / "config.js").read_text(encoding="utf-8")
    email_match = re.search(r"authEmail:\s*['\"]([^'\"]+)['\"]", config_source)
    if not email_match:
        errors.append("Mapped study Auth email is missing from config.js")
    else:
        mapped_email = email_match.group(1)
        for relative in ("human-eval/index.html", "human-eval/app.js", "human-eval/styles.css", "human-eval/README.md"):
            if mapped_email in (root / relative).read_text(encoding="utf-8"):
                errors.append(f"Mapped Auth email is displayed or embedded outside config.js: {relative}")

    private_tasks_path = private_assets / "tasks.json"
    manifest_path = private_assets / "ASSET_MANIFEST.json"
    if not private_tasks_path.is_file() or not manifest_path.is_file():
        errors.append("Private assets are unavailable; protected-content hash validation could not run")
    else:
        private_tasks = json.loads(private_tasks_path.read_text(encoding="utf-8"))["tasks"]
        protected_phrases = {
            task[field]
            for task in private_tasks
            for field in ("task_instruction", "option_A", "option_B", "option_C", "option_D")
        }
        for path in iter_public_files(root):
            if path.relative_to(root).parts[0] == "videos":
                continue
            if path.suffix.lower() not in TEXT_SUFFIXES:
                continue
            text = path.read_text(encoding="utf-8", errors="ignore")
            if any(phrase in text for phrase in protected_phrases):
                errors.append(f"Protected task or strategy text found in {path.relative_to(root)}")

        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        private_image_hashes = set(manifest["image_sha256"].values())
        for path in iter_public_files(root):
            if path.relative_to(root).parts[0] == "videos":
                continue
            if path.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"}:
                if sha256(path) in private_image_hashes:
                    errors.append(f"Pinned private task image found in {path.relative_to(root)}")

    if errors:
        raise SystemExit("Public human-evaluation security validation failed:\n- " + "\n- ".join(errors))
    print(
        "Public site validation passed: approved video gallery complete; "
        "private Human Evaluation assets and credentials absent."
    )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument(
        "--private-assets",
        type=Path,
        default=Path(__file__).resolve().parents[2] / "human_eval_private_assets",
    )
    args = parser.parse_args()
    validate(args.root.resolve(), args.private_assets.resolve())


if __name__ == "__main__":
    main()
