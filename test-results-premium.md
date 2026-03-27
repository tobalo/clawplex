# ClawPlex Premium TDD Test Results

**Site:** https://clawplex.dev
**Tested:** 2026-03-27T06:37:44.190Z
**Method:** Node.js fetch against live site

---

## TEST_01: Zero border-radius on all components

**Status:** ✅ PASS
**Evidence:** No rounded-* CSS classes found in HTML

## TEST_02: Background #FFFFFF, primary text #000000

**Status:** ✅ PASS
**Evidence:** hasWhiteBg=true, hasBlackText=true, hasDarkBg=false, hasOldAccent=false

## TEST_03: Headers have py-24 or greater

**Status:** ✅ PASS
**Evidence:** Found section padding classes: py-40, py-24, py-32

## TEST_04: hover:underline on text CTAs, hover:bg-gray-100 on buttons

**Status:** ✅ PASS
**Evidence:** hover:underline=true, hover:bg-gray-100=true

## TEST_05: Hero renders "100+ Builders" as primary social proof

**Status:** ✅ PASS
**Evidence:** Found "100+ Builders" in hero section

## TEST_06: Event Tracker shows "APRIL 2026 (TBD)" + Discord link

**Status:** ✅ PASS
**Evidence:** hasApril2026=true, hasTBD=true, hasDiscord=true

## TEST_07: Sponsorship Module: i. Venue Hosting / ii. Hardware & Logistics

**Status:** ✅ PASS
**Evidence:** hasVenueHosting=true, hasHardwareLogistics=true

## TEST_08: March 24 Recap renders responsive photo gallery grid

**Status:** ✅ PASS
**Evidence:** hasGrid=true, hasMultipleImages=true, hasMarch24Recap=true

## TEST_09: GET /llms.txt returns text/plain with March 24 stats + Venue Needed

**Status:** ✅ PASS
**Evidence:** contentType=text/plain; charset=utf-8, hasMarch24=true, has100Plus=true, hasVenueNeeded=true

## TEST_10: JSON-LD EventSeries schema with eventStatus: "https://schema.org/EventScheduled"

**Status:** ✅ PASS
**Evidence:** hasEventSeries=true, hasScheduledUrl=true, eventStatusCorrect=true

---

**Summary:** 10/10 tests passed
