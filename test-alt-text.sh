#!/bin/bash
echo "=== Alt Text Tests ==="
python3 << 'PYEOF'
import re
import urllib.parse

with open('homepage.html', 'r') as f:
    html = f.read()

# Find all img tags
img_tags = re.findall(r'<img[^>]+>', html)
print(f"Total img tags found: {len(img_tags)}")

for i, img in enumerate(img_tags, 1):
    alt_match = re.search(r'alt="([^"]*)"', img)
    src_match = re.search(r'src="([^"]*)"', img)
    srcset_match = re.search(r'srcset="([^"]*)"', img)
    
    alt = alt_match.group(1) if alt_match else "NO ALT"
    src = src_match.group(1) if src_match else "NO SRC"
    
    # Decode src URL params
    if '?_next' in src or '%3F' in src:
        # Extract actual image path from Next.js image URL
        url_match = re.search(r'url=([^&"]+)', src)
        if url_match:
            actual = urllib.parse.unquote(url_match.group(1))
        else:
            actual = "complex URL"
    else:
        actual = urllib.parse.unquote(src)
    
    # Check if empty alt vs no alt
    status = "MISSING ALT" if not alt_match else ("EMPTY ALT" if alt == "" else "OK")
    
    print(f"\nImage {i}:")
    print(f"  Alt text: '{alt}' [{status}]")
    print(f"  Actual image: {actual}")
    print(f"  Src: {src[:80]}...")
PYEOF