#!/usr/bin/env node
/**
 * ClawPlex Premium TDD Test Suite
 * Tests the new white/industrial-elite design at https://clawplex.dev
 * 
 * Run: node test-premium.mjs
 */

const BASE_URL = "https://clawplex.dev";

async function fetchHTML(path = "/") {
  const res = await fetch(`${BASE_URL}${path}`);
  const html = await res.text();
  return { html, status: res.status, contentType: res.headers.get("content-type") };
}

async function fetchText(path = "/") {
  const res = await fetch(`${BASE_URL}${path}`);
  const text = await res.text();
  return { text, status: res.status, contentType: res.headers.get("content-type") };
}

// ──────────────────────────────────────────────────────────────
// TEST 01: Zero border-radius on all components
// ──────────────────────────────────────────────────────────────
async function test01_borderRadius() {
  const { html } = await fetchHTML();
  
  // Check for NO rounded-* classes that imply curvature
  // The premium spec says ZERO border-radius on all components
  const badPatterns = [
    /rounded-2xl/,
    /rounded-xl/,
    /rounded-lg/,
    /rounded-md/,
    /rounded-full/,
  ];
  
  const violations = badPatterns.filter(p => p.test(html));
  
  if (violations.length === 0) {
    return { pass: true, evidence: "No rounded-* CSS classes found in HTML" };
  } else {
    // Count occurrences
    const counts = {};
    for (const v of violations) {
      counts[v.toString()] = (html.match(new RegExp(v, 'g')) || []).length;
    }
    return { 
      pass: false, 
      evidence: `Found rounded-* classes: ${JSON.stringify(counts)}`,
      html: violations.length > 0 ? html.substring(0, 500) : undefined
    };
  }
}

// ──────────────────────────────────────────────────────────────
// TEST 02: Background #FFFFFF, primary text #000000
// ──────────────────────────────────────────────────────────────
async function test02_whitePalette() {
  const { html } = await fetchHTML();
  
  // Check bg-[#0A0B10] is GONE (the old dark background)
  const hasDarkBg = /bg-\[#0A0B10\]/.test(html) || /bg-\[#08090E\]/.test(html);
  
  // Check for white background (either literal #FFFFFF or claw-white)
  const hasWhiteBg = /bg-\[#FFFFFF\]/.test(html) || /bg-claw-white/.test(html) || /bg-white/.test(html);
  
  // Check primary text is black (claw-black or #000000)
  const hasBlackText = /text-\[#000000\]/.test(html) || /text-claw-black/.test(html) || /text-black/.test(html);
  
  // Check that old orange/red accent is gone (FF4500 is the old design)
  const hasOldAccent = /#FF4500/.test(html) || /\[#FF4500\]/.test(html) || /text-\[#FF4500\]/.test(html);
  
  if (!hasDarkBg && !hasOldAccent && hasWhiteBg && hasBlackText) {
    return { 
      pass: true, 
      evidence: `hasWhiteBg=${hasWhiteBg}, hasBlackText=${hasBlackText}, hasDarkBg=${hasDarkBg}, hasOldAccent=${hasOldAccent}` 
    };
  } else {
    return { 
      pass: false, 
      evidence: `hasWhiteBg=${hasWhiteBg}, hasBlackText=${hasBlackText}, hasDarkBg=${hasDarkBg}, hasOldAccent=${hasOldAccent}` 
    };
  }
}

// ──────────────────────────────────────────────────────────────
// TEST 03: Headers have py-24 or greater
// ──────────────────────────────────────────────────────────────
async function test03_headerPadding() {
  const { html } = await fetchHTML();
  
  // Look for section elements with py- classes
  // The spec says sections should have py-24 or greater
  // py-24 = 6rem = 96px. Check for py-[2][4-9][0-9] or py-32, py-40 etc.
  
  const sectionMatches = html.match(/<section[^>]*class="[^"]*"[^>]*>/g) || [];
  const hasProperPadding = /py-2[4-9]|py-3[0-9]|py-4[0-9]/.test(html);
  
  if (hasProperPadding) {
    const paddingMatches = html.match(/py-2[4-9]|py-3[0-9]|py-4[0-9]/g) || [];
    return { pass: true, evidence: `Found section padding classes: ${[...new Set(paddingMatches)].join(", ")}` };
  } else {
    return { pass: false, evidence: "No section found with py-24 or greater padding" };
  }
}

// ──────────────────────────────────────────────────────────────
// TEST 04: hover:underline on text CTAs, hover:bg-gray-100 on primary buttons
// ──────────────────────────────────────────────────────────────
async function test04_hoverStates() {
  const { html } = await fetchHTML();
  
  // Check for hover:underline on anchor CTAs
  const hasHoverUnderline = /hover:underline/.test(html);
  
  // Check for hover:bg-gray-100 or hover:bg-white on buttons
  const hasHoverBg = /hover:bg-gray-100|hover:bg-white/.test(html);
  
  if (hasHoverUnderline && hasHoverBg) {
    return { 
      pass: true, 
      evidence: `hover:underline=${hasHoverUnderline}, hover:bg-gray-100=${hasHoverBg}` 
    };
  } else {
    return { 
      pass: false, 
      evidence: `hover:underline=${hasHoverUnderline}, hover:bg-gray-100=${hasHoverBg}` 
    };
  }
}

// ──────────────────────────────────────────────────────────────
// TEST 05: Hero renders "100+ Builders" as primary social proof
// ──────────────────────────────────────────────────────────────
async function test05_heroSocialProof() {
  const { html } = await fetchHTML();
  
  // The new hero should have "100+ Builders" as social proof
  // Look for text like "100+" and "Builders" appearing together
  const has100Plus = /100\+\s*Builders|100\+.*Builders/i.test(html);
  const hasExactPhrase = /100\+ Builders/.test(html);
  
  if (has100Plus) {
    return { pass: true, evidence: 'Found "100+ Builders" in hero section' };
  } else {
    return { pass: false, evidence: 'Did not find "100+ Builders" in hero' };
  }
}

// ──────────────────────────────────────────────────────────────
// TEST 06: Event Tracker shows "APRIL 2026 (TBD)" + Discord link
// ──────────────────────────────────────────────────────────────
async function test06_eventTracker() {
  const { html } = await fetchHTML();
  
  const hasApril2026 = /APRIL 2026|April 2026|april 2026/i.test(html);
  const hasTBD = /TBD|\(TBD\)|T.B.D/.test(html);
  const hasDiscord = /discord|discord\.gg/i.test(html);
  
  if (hasApril2026 && hasTBD && hasDiscord) {
    return { 
      pass: true, 
      evidence: `hasApril2026=${hasApril2026}, hasTBD=${hasTBD}, hasDiscord=${hasDiscord}` 
    };
  } else {
    return { 
      pass: false, 
      evidence: `hasApril2026=${hasApril2026}, hasTBD=${hasTBD}, hasDiscord=${hasDiscord}` 
    };
  }
}

// ──────────────────────────────────────────────────────────────
// TEST 07: Sponsorship Module renders two paths: i. Venue Hosting / ii. Hardware & Logistics
// ──────────────────────────────────────────────────────────────
async function test07_sponsorshipModule() {
  const { html } = await fetchHTML();
  
  const hasVenueHosting = /Venue Hosting|i\.\s*Venue|host.*venue/i.test(html);
  const hasHardwareLogistics = /Hardware.*Logistics|ii\.\s*Hardware|hardware.*logistics/i.test(html);
  
  if (hasVenueHosting && hasHardwareLogistics) {
    return { 
      pass: true, 
      evidence: `hasVenueHosting=${hasVenueHosting}, hasHardwareLogistics=${hasHardwareLogistics}` 
    };
  } else {
    return { 
      pass: false, 
      evidence: `hasVenueHosting=${hasVenueHosting}, hasHardwareLogistics=${hasHardwareLogistics}` 
    };
  }
}

// ──────────────────────────────────────────────────────────────
// TEST 08: March 24 Recap renders responsive photo gallery grid
// ──────────────────────────────────────────────────────────────
async function test08_galleryGrid() {
  const { html } = await fetchHTML();
  
  // Look for grid layout (grid-cols-) + images in recap section
  const hasGrid = /grid-cols-/.test(html);
  const hasMultipleImages = (html.match(/<img/g) || []).length >= 3;
  const hasMarch24Recap = /march.*24|march\s*24|24th/i.test(html);
  
  if (hasGrid && hasMultipleImages && hasMarch24Recap) {
    return { 
      pass: true, 
      evidence: `hasGrid=${hasGrid}, hasMultipleImages=${hasMultipleImages}, hasMarch24Recap=${hasMarch24Recap}` 
    };
  } else {
    return { 
      pass: false, 
      evidence: `hasGrid=${hasGrid}, hasMultipleImages=${hasMultipleImages}, hasMarch24Recap=${hasMarch24Recap}` 
    };
  }
}

// ──────────────────────────────────────────────────────────────
// TEST 09: GET /llms.txt returns text/plain with March 24 stats and "Venue Needed" status
// ──────────────────────────────────────────────────────────────
async function test09_llmsTxt() {
  const { text, contentType } = await fetchText("/llms.txt");
  
  const isPlainText = contentType?.includes("text/plain");
  const hasMarch24 = /march.*24|march\s*24|24th.*2026/i.test(text);
  const has100Plus = /100\+|hundred.*plus/i.test(text);
  const hasVenueNeeded = /venue.*needed|venue.*needed|need.*venue/i.test(text) || 
                          /sponsorship.*need|hardware.*logistics/i.test(text) ||
                          /seeking.*venue/i.test(text);
  
  if (isPlainText && hasMarch24 && has100Plus && hasVenueNeeded) {
    return { 
      pass: true, 
      evidence: `contentType=${contentType}, hasMarch24=${hasMarch24}, has100Plus=${has100Plus}, hasVenueNeeded=${hasVenueNeeded}` 
    };
  } else {
    return { 
      pass: false, 
      evidence: `contentType=${contentType}, hasMarch24=${hasMarch24}, has100Plus=${has100Plus}, hasVenueNeeded=${hasVenueNeeded}`,
      snippet: text.substring(0, 300)
    };
  }
}

// ──────────────────────────────────────────────────────────────
// TEST 10: JSON-LD EventSeries schema in <head> with eventStatus: "https://schema.org/EventScheduled"
// ──────────────────────────────────────────────────────────────
async function test10_jsonLd() {
  const { html } = await fetchHTML();
  
  // Find JSON-LD script tags
  const ldJsonMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  
  if (ldJsonMatches.length === 0) {
    return { pass: false, evidence: "No JSON-LD script tags found in page head" };
  }
  
  // Check for EventSeries type
  const hasEventSeries = ldJsonMatches.some(m => /EventSeries/i.test(m));
  
  // Check for eventStatus: EventScheduled
  const hasEventScheduled = ldJsonMatches.some(m => /EventScheduled|eventStatus/i.test(m));
  const hasScheduledUrl = ldJsonMatches.some(m => /schema\.org\/EventScheduled/.test(m));
  
  // Parse the JSON to check for exact eventStatus value
  let eventStatusCorrect = false;
  for (const match of ldJsonMatches) {
    try {
      const jsonContent = match.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>/i, '').replace(/<\/script>/i, '');
      const data = JSON.parse(jsonContent);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (item["@type"] === "EventSeries" || (item["@graph"] && item["@graph"].some((g) => g["@type"] === "EventSeries"))) {
          if (item.eventStatus === "https://schema.org/EventScheduled" || 
              (item["@graph"] && item["@graph"].some(g => g.eventStatus === "https://schema.org/EventScheduled"))) {
            eventStatusCorrect = true;
          }
        }
      }
    } catch (e) {
      // try @graph approach
    }
  }
  
  if (hasEventSeries && hasScheduledUrl) {
    return { 
      pass: true, 
      evidence: `hasEventSeries=${hasEventSeries}, hasScheduledUrl=${hasScheduledUrl}, eventStatusCorrect=${eventStatusCorrect}` 
    };
  } else {
    return { 
      pass: false, 
      evidence: `hasEventSeries=${hasEventSeries}, hasScheduledUrl=${hasScheduledUrl}, eventStatusCorrect=${eventStatusCorrect}`,
      ldJsonCount: ldJsonMatches.length
    };
  }
}

// ──────────────────────────────────────────────────────────────
// Main runner
// ──────────────────────────────────────────────────────────────
async function main() {
  const tests = [
    { id: "TEST_01", name: "Zero border-radius on all components", fn: test01_borderRadius },
    { id: "TEST_02", name: "Background #FFFFFF, primary text #000000", fn: test02_whitePalette },
    { id: "TEST_03", name: "Headers have py-24 or greater", fn: test03_headerPadding },
    { id: "TEST_04", name: "hover:underline on text CTAs, hover:bg-gray-100 on buttons", fn: test04_hoverStates },
    { id: "TEST_05", name: 'Hero renders "100+ Builders" as primary social proof', fn: test05_heroSocialProof },
    { id: "TEST_06", name: 'Event Tracker shows "APRIL 2026 (TBD)" + Discord link', fn: test06_eventTracker },
    { id: "TEST_07", name: "Sponsorship Module: i. Venue Hosting / ii. Hardware & Logistics", fn: test07_sponsorshipModule },
    { id: "TEST_08", name: "March 24 Recap renders responsive photo gallery grid", fn: test08_galleryGrid },
    { id: "TEST_09", name: "GET /llms.txt returns text/plain with March 24 stats + Venue Needed", fn: test09_llmsTxt },
    { id: "TEST_10", name: 'JSON-LD EventSeries schema with eventStatus: "https://schema.org/EventScheduled"', fn: test10_jsonLd },
  ];

  const results = [];
  
  console.log("🏗️  CLAWPLEX PREMIUM TDD TEST SUITE");
  console.log("═".repeat(60));
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Started: ${new Date().toISOString()}`);
  console.log("═".repeat(60) + "\n");

  for (const test of tests) {
    process.stdout.write(`Running ${test.id}... `);
    try {
      const result = await test.fn();
      results.push({ id: test.id, name: test.name, ...result });
      const icon = result.pass ? "✅ PASS" : "❌ FAIL";
      console.log(icon);
      if (!result.pass) {
        console.log(`   Evidence: ${result.evidence}`);
      }
    } catch (err) {
      results.push({ id: test.id, name: test.name, pass: false, evidence: `Error: ${err.message}` });
      console.log("❌ FAIL (threw)");
      console.log(`   Error: ${err.message}`);
    }
  }

  // Summary
  const passed = results.filter(r => r.pass).length;
  const failed = results.filter(r => !r.pass).length;
  
  console.log("\n" + "═".repeat(60));
  console.log("SUMMARY");
  console.log("═".repeat(60));
  console.log(`Total:  ${results.length} tests`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log("═".repeat(60));

  for (const r of results) {
    const icon = r.pass ? "✅" : "❌";
    console.log(`${icon} ${r.id}: ${r.name}`);
    if (!r.pass) {
      console.log(`   Evidence: ${r.evidence}`);
    }
  }

  // Generate markdown report
  const timestamp = new Date().toISOString();
  let md = `# ClawPlex Premium TDD Test Results\n\n`;
  md += `**Site:** ${BASE_URL}\n`;
  md += `**Tested:** ${timestamp}\n`;
  md += `**Method:** Node.js fetch against live site\n\n`;
  md += `---\n\n`;
  
  for (const r of results) {
    md += `## ${r.id}: ${r.name}\n\n`;
    md += `**Status:** ${r.pass ? "✅ PASS" : "❌ FAIL"}\n`;
    md += `**Evidence:** ${r.evidence}\n\n`;
  }
  
  md += `---\n\n`;
  md += `**Summary:** ${passed}/${results.length} tests passed\n`;
  
  return { results, md, passed, failed };
}

// Export for use as module
export { fetchHTML, fetchText, test01_borderRadius, test02_whitePalette, test03_headerPadding, test04_hoverStates, test05_heroSocialProof, test06_eventTracker, test07_sponsorshipModule, test08_galleryGrid, test09_llmsTxt, test10_jsonLd };

// Run if executed directly
const isMain = process.argv[1]?.endsWith("test-premium.mjs");
if (isMain || process.argv[1]?.includes("test-premium")) {
  main().then(async ({ results, md, passed, failed }) => {
    // Write results to file
    const outputPath = "/Users/soup/flume/clawplex/test-results-premium.md";
    const fs = await import("fs");
    fs.writeFileSync(outputPath, md);
    console.log(`\n📄 Results written to: ${outputPath}`);
    process.exit(failed > 0 ? 1 : 0);
  }).catch(err => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
