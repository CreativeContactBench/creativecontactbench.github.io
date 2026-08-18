# CreativeContactBench.github.io

Static GitHub Pages site for the CreativeContactBench project page.

## Edit checklist

1. Replace author, affiliation, venue, paper, code, and data links in `index.html`.
2. Replace the abstract with the final paper abstract.
3. Put web-ready project videos in `videos/optimized/`, preserving folders such as `Task 1`, `Task 2`, and so on.
4. Update `videos/index.html` when adding or renaming videos.
5. Add a real teaser image only if you want one.
6. Update the results table and BibTeX in `index.html`.
7. Update placeholder metadata in `videos/tasks.js`.

`videos/tasks.js` is the central manifest for task title, goal, modality, tags, option labels, video paths, preferred
option, and optional model rankings. Unknown fields are explicitly marked as placeholders.

The original task videos are not required for the GitHub Pages deployment. The task-detail page loads browser-ready
H.264 MP4 copies from `videos/optimized/Task .../*.mp4`.

## Local preview

From this directory:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Posters

The gallery works without poster files and shows a placeholder when an image is missing. If `ffmpeg` is installed, you
can generate first-frame posters after the task folders are inside `videos/`:

```bash
bash scripts/generate-posters.sh
```

Example compression command:

```bash
ffmpeg -i input.mp4 -vf "scale='min(1280,iw)':-2" -an -c:v libx264 -crf 28 -preset slow output.mp4
```

If source videos need to be regenerated for the web, create H.264 MP4 copies with fast-start enabled and no audio:

```bash
ffmpeg -i input.mp4 \
  -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2,fps=30" \
  -an -c:v libx264 -crf 28 -preset medium -pix_fmt yuv420p -movflags +faststart output.mp4
```

## GitHub Pages

Create a repository named `creativecontactbench.github.io` under the `CreativeContactBench` organization, push these
files to the default branch, then enable Pages from the repository settings if it is not enabled automatically.

Avoid committing large originals or Git LFS objects. Keep short compressed MP4 files on the page and host full-resolution
videos elsewhere if they are needed later.
