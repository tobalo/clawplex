#!/bin/bash
echo "=== Performance Tests ==="

# Page load time
START=$(date +%s%N)
curl -s -o /dev/null https://clawplex.dev
END=$(date +%s%N)
ELAPSED=$(( (END - START) / 1000000 ))
echo "Page load time: ${ELAPSED}ms"

# External resources check (Discord, GitHub, openclaw.ai referenced in links)
EXTERNAL=(
  "https://discord.gg/q8kEquTu3z"
  "https://github.com/tylerdotai"
  "https://openclaw.ai"
)
echo ""
echo "External resource checks:"
for url in "${EXTERNAL[@]}"; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$url")
  echo "  $url -> HTTP $CODE"
done

# Check _next static resources
echo ""
echo "Next.js static resources:"
STATIC=(
  "https://clawplex.dev/_next/static/chunks/f5385907f46b4110.css"
  "https://clawplex.dev/_next/static/chunks/21a0a4061f3ab64d.js"
  "https://clawplex.dev/_next/static/media/051742360c26797e-s.p.102b7f24.woff2"
)
for url in "${STATIC[@]}"; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$url")
  echo "  $url -> HTTP $CODE"
done

# llms.txt endpoint
echo ""
echo "LLM spec endpoint:"
CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://clawplex.dev/llms.txt")
echo "  /llms.txt -> HTTP $CODE"
