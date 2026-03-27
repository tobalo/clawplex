# ClawPlex TDD Test Results
**Site:** https://clawplex.dev
**Tested:** 2026-03-27
**Method:** curl + Python scripts against live site

---

## 1. /api/subscribe Endpoint Tests

### Test: POST valid email → expect 200 + {ok: true}
- **Status:** FAIL
- **Expected:** HTTP 200, `{"ok":true}` or similar success response
- **Actual:** HTTP 500, `{"error":"Server error"}`
- **Fix:** Backend is throwing a 500 on valid email POST. Likely cause: missing/invalid environment variable (database connection, API key for email service like Resend/Loops, or Supabase auth). Check Vercel environment variables. The error message should be more descriptive than "Server error" — add proper error logging.

---

### Test: POST invalid email → expect 400
- **Status:** PASS
- **Expected:** HTTP 400 with validation error
- **Actual:** HTTP 400, `{"error":"Invalid email"}`
- **Fix:** N/A

---

### Test: POST duplicate email → handle gracefully
- **Status:** FAIL
- **Expected:** HTTP 409 Conflict or 400 with "already subscribed" message
- **Actual:** HTTP 500, `{"error":"Server error"}` (same as first subscribe attempt — crashes before checking for duplicates)
- **Fix:** The subscribe endpoint crashes on first attempt (likely DB connection), so duplicate handling can't be tested until the underlying 500 is fixed. Implement a graceful duplicate check (catch unique constraint violations and return 409 or friendly message).

---

## 2. Image Accessibility Tests

### Test: All images have alt text
- **Status:** PASS
- **Expected:** Every `<img>` tag has a non-empty `alt` attribute
- **Actual:** All 6 images have descriptive alt text:
  - `hero-lobster.jpg` → "Cowboy riding a lobster over Dallas"
  - `clawcon-1.jpg` → "ClawCon DFW photo 1"
  - `clawcon-2.jpg` → "ClawCon DFW photo 2"
  - `clawcon-3.jpg` → "ClawCon DFW photo 3"
  - `clawcon-4.jpg` → "ClawCon DFW photo 4"
  - `clawcon-5.jpg` → "ClawCon DFW photo 5"
- **Fix:** N/A

---

### Test: All images return HTTP 200
- **Status:** PASS
- **Expected:** All image URLs return HTTP 200
- **Actual:** All 7 resources (6 images + favicon) returned HTTP 200
  - `/hero-lobster.jpg` → 200 (263,586 bytes)
  - `/clawcon-1.jpg` → 200 (178,285 bytes)
  - `/clawcon-2.jpg` → 200 (175,244 bytes)
  - `/clawcon-3.jpg` → 200 (159,882 bytes)
  - `/clawcon-4.jpg` → 200 (171,279 bytes)
  - `/clawcon-5.jpg` → 200 (134,819 bytes)
  - `/favicon.ico` → 200 (25,931 bytes)
- **Fix:** N/A

---

### Test: No images are 0 bytes
- **Status:** PASS
- **Expected:** All images have file size > 0 bytes
- **Actual:** Smallest image is `clawcon-5.jpg` at 134,819 bytes. All non-zero.
- **Fix:** N/A

---

## 3. SEO / Meta Tests

### Test: Page has title tag
- **Status:** PASS
- **Expected:** `<title>ClawPlex | DFW Local AI Community</title>`
- **Actual:** `<title>ClawPlex | DFW Local AI Community</title>` — found in `<head>`
- **Fix:** N/A

---

### Test: Page has meta description
- **Status:** PASS
- **Expected:** `<meta name="description" content="...">`
- **Actual:** `<meta name="description" content="DFW's community for personal AI, local LLMs, and the people building them.">`
- **Fix:** N/A

---

### Test: Page has OG tags for social sharing
- **Status:** FAIL
- **Expected:** `og:title`, `og:description`, `og:image`, `og:type`, `og:url`, `og:site_name`
- **Actual:** **Zero OG tags found.** No `property="og:*"` meta tags in the HTML.
- **Fix:** Add Open Graph metadata in the Next.js page metadata export:
  ```ts
  export const metadata = {
    openGraph: {
      title: 'ClawPlex | DFW Local AI Community',
      description: "DFW's community for personal AI, local LLMs, and the people building them.",
      url: 'https://clawplex.dev',
      siteName: 'ClawPlex',
      type: 'website',
      images: ['/og-image.jpg'], // create an og-image.jpg in /public
    },
  }
  ```

---

### Test: Page has Twitter card meta tags
- **Status:** FAIL
- **Expected:** `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- **Actual:** **Zero Twitter card tags found.**
- **Fix:** Add Twitter card metadata (can be combined with OG tags via Next.js metadata API — `twitter:` keys work alongside `openGraph`):
  ```ts
  twitter: {
    card: 'summary_large_image',
    title: 'ClawPlex | DFW Local AI Community',
    description: "DFW's community for personal AI, local LLMs, and the people building them.",
    images: ['/og-image.jpg'],
  }
  ```

---

## 4. Performance Tests

### Test: Page load time under 3 seconds
- **Status:** PASS
- **Expected:** Time to first byte < 3,000ms
- **Actual:** 193ms (curl time, network-local; real-world would be higher but well within budget)
- **Fix:** N/A

---

### Test: No external resources that fail
- **Status:** PASS
- **Expected:** All external resources (CDNs, fonts, linked sites) return non-4xx/5xx
- **Actual:**
  - Discord invite → 301 redirect (expected, Discord redirects to their app)
  - GitHub → 200
  - OpenClaw.ai → 200
  - All Next.js static chunks → 200
  - All Next.js font files → 200
  - `/llms.txt` → 200
- **Fix:** N/A

---

## Summary

| Category | Passed | Failed |
|----------|--------|--------|
| /api/subscribe | 1/3 | 2/3 |
| Image Accessibility | 3/3 | 0/3 |
| SEO/Meta | 2/4 | 2/4 |
| Performance | 2/2 | 0/2 |
| **Total** | **8/12** | **4/12** |

## Critical Issues

1. **subscribe API returns 500** — Blocks email list signup. Fix env vars / DB connection first.
2. **Missing OG tags** — Social sharing will show no preview. High visibility impact.
3. **Missing Twitter cards** — Same as OG, no rich card previews on X/Twitter.

## Test Scripts Location
All test scripts are in `/Users/soup/flume/clawplex/`:
- `test-subscribe.sh` — API endpoint tests
- `test-images.sh` — Image HTTP/brightness tests
- `test-seo.sh` — Meta tag tests
- `test-performance.sh` — Load time + external resource tests
- `homepage2.html` — Cached page HTML used for parsing
