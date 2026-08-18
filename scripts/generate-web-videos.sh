#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is not installed. Install ffmpeg to generate optimized web videos."
  exit 1
fi

for task_dir in videos/Task\ *; do
  [[ -d "$task_dir" ]] || continue
  task_name="${task_dir#videos/}"
  output_dir="videos/optimized/${task_name}"
  mkdir -p "$output_dir"

  for source in "$task_dir"/*.mp4; do
    [[ -f "$source" ]] || continue
    output="${output_dir}/$(basename "$source")"

    if [[ -s "$output" && "$output" -nt "$source" ]]; then
      printf 'Skipping %s\n' "$output"
      continue
    fi

    printf 'Encoding %s -> %s\n' "$source" "$output"
    ffmpeg -hide_banner -y \
      -i "$source" \
      -map 0:v:0 -an \
      -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2,fps=30" \
      -c:v libx264 -crf 28 -preset medium \
      -pix_fmt yuv420p -movflags +faststart \
      "$output"
  done
done
