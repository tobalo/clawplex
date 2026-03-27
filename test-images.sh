#!/bin/bash
echo "=== Image Tests ==="
IMAGES=(
  "https://clawplex.dev/hero-lobster.jpg"
  "https://clawplex.dev/clawcon-1.jpg"
  "https://clawplex.dev/clawcon-2.jpg"
  "https://clawplex.dev/clawcon-3.jpg"
  "https://clawplex.dev/clawcon-4.jpg"
  "https://clawplex.dev/clawcon-5.jpg"
  "https://clawplex.dev/favicon.ico"
)
for img in "${IMAGES[@]}"; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$img")
  SIZE=$(curl -s -o /dev/null -w "%{size_download}" "$img")
  echo "$img -> HTTP $CODE, bytes: $SIZE"
done
