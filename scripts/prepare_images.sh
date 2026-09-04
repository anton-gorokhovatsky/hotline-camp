#!/bin/sh
# Reproducible size-only derivatives of the approved photographs (macOS sips).
set -eu
cd "$(dirname "$0")/.."
mkdir -p public/media/responsive
for photo in hero-time-trial coach-evgeny-finish week-swimmer coach-evgeny-bike coach-maksim-finish maksim-pool coach-maksim-water final-finish; do
  for width in 480 960; do
    sips -s format jpeg -s formatOptions 82 --resampleWidth "$width" \
      "public/media/$photo.jpg" --out "public/media/responsive/$photo-$width.jpg" >/dev/null
  done
done
