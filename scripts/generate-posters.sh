#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VIDEOS_DIR="$ROOT_DIR/videos"
POSTERS_DIR="$VIDEOS_DIR/posters"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is not installed. Install ffmpeg to generate posters."
  exit 1
fi

mkdir -p "$POSTERS_DIR"

for task_dir in "$VIDEOS_DIR"/Task\ *; do
  [ -d "$task_dir" ] || continue
  task_name="$(basename "$task_dir")"
  task_number="${task_name#Task }"

  source_video=""
  for candidate in "$task_dir"/A.mp4 "$task_dir"/task1_A.mp4; do
    if [ -f "$candidate" ]; then
      source_video="$candidate"
      break
    fi
  done

  if [ -z "$source_video" ]; then
    echo "No poster source found for $task_name"
    continue
  fi

  ffmpeg -y -i "$source_video" -frames:v 1 -q:v 3 "$POSTERS_DIR/task-$task_number.jpg"
done
