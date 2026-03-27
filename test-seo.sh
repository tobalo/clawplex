#!/bin/bash
echo "=== SEO / Meta Tests ==="
RESP=$(curl -s https://clawplex.dev)

# Title
TITLE=$(echo "$RESP" | grep -o '<title>[^<]*</title>' | head -1)
echo "Title: $TITLE"

# Meta description
DESC=$(echo "$RESP" | grep -o 'name="description"[^>]*content="[^"]*"' | head -1)
echo "Meta description: $DESC"

# OG tags
OG_TITLE=$(echo "$RESP" | grep -o 'property="og:title"[^>]*content="[^"]*"' | head -1)
OG_DESC=$(echo "$RESP" | grep -o 'property="og:description"[^>]*content="[^"]*"' | head -1)
OG_IMAGE=$(echo "$RESP" | grep -o 'property="og:image"[^>]*content="[^"]*"' | head -1)
OG_TYPE=$(echo "$RESP" | grep -o 'property="og:type"[^>]*content="[^"]*"' | head -1)
OG_URL=$(echo "$RESP" | grep -o 'property="og:url"[^>]*content="[^"]*"' | head -1)
OG_SITE=$(echo "$RESP" | grep -o 'property="og:site_name"[^>]*content="[^"]*"' | head -1)
echo "OG title: $OG_TITLE"
echo "OG description: $OG_DESC"
echo "OG image: $OG_IMAGE"
echo "OG type: $OG_TYPE"
echo "OG url: $OG_URL"
echo "OG site_name: $OG_SITE"

# Twitter card
TW_CARD=$(echo "$RESP" | grep -o 'name="twitter:card"[^>]*content="[^"]*"' | head -1)
TW_TITLE=$(echo "$RESP" | grep -o 'name="twitter:title"[^>]*content="[^"]*"' | head -1)
TW_DESC=$(echo "$RESP" | grep -o 'name="twitter:description"[^>]*content="[^"]*"' | head -1)
TW_IMAGE=$(echo "$RESP" | grep -o 'name="twitter:image"[^>]*content="[^"]*"' | head -1)
echo "Twitter card: $TW_CARD"
echo "Twitter title: $TW_TITLE"
echo "Twitter description: $TW_DESC"
echo "Twitter image: $TW_IMAGE"
