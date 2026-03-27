import { NextResponse } from "next/server";

const CONTENT = `# ClawPlex \u2014 DFW OpenClaw Chapter

**Keep DFW Clawd.** \uD83E\uDD9E

ClawPlex is the Dallas-Fort Worth chapter of OpenClaw \u2014 a meetup for AI builders, agent enthusiasts, and anyone actually shipping things with AI. Real demos. Real talk. No vendor pitches.

Organized by OpenClaw (https://openclaw.ai).

## Quick Facts
- Location: Dallas-Fort Worth Metroplex, Texas
- Website: https://clawplex.dev
- Discord: https://discord.gg/q8kEquTu3z
- Contact: https://discord.gg/q8kEquTu3z
- Format: Live demos, lightning talks, open hack \u2014 "No Posture" manifesto

## The No Posture Manifesto
ClawPlex runs on live demos and real talk. No slides. No vendor pitches. Bring your work, your questions, or your curiosity. This is a room for builders.

## Recent Events

### ClawCon DFW \u2014 March 24, 2026 (PAST)
- Attendance: 100+ Verified Builders
- Live Demos: 8
- Format: "No Slides. Just Build."
- Location: Spark Coworking, Arlington TX
- This was Node 01 \u2014 the inaugural DFW ClawPlex event.

## Upcoming Events

### DFW Node 02 \u2014 April 2026 (TBD)
- Status: Venue being provisioned
- Details: Will be announced in Discord
- Discord: https://discord.gg/q8kEquTu3z

## Venue & Sponsor Needs

ClawPlex is actively seeking:

**i. Venue Hosting**
- Arlington, Dallas, or Plano
- 100\u2013150 person capacity
- High-density power + fast Wi-Fi
- Contact: https://discord.gg/q8kEquTu3z

**ii. Hardware & Logistics**
- Compute credits, GPU demos, snacks
- Organizations building local-first AI, hardware, infrastructure
- Contact: https://discord.gg/q8kEquTu3z

## Pages
- Home: https://clawplex.dev
- Discord: https://discord.gg/q8kEquTu3z
- OpenClaw: https://openclaw.ai

## API \u2014 Subscribe for Updates

Sign up for event announcements and chapter updates:

\`\`\`
POST https://clawplex.dev/api/subscribe
Content-Type: application/json

{"email": "user@example.com"}

Response (success): {"ok": true}
Response (duplicate): {"ok": true, "message": "Already subscribed!"}
Response (invalid): {"error": "Invalid email address"}
\`\`\`

## API \u2014 RSVP for an Event

Register attendance for a specific event:

\`\`\`
POST https://clawplex.dev/api/rsvp
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "Jane Doe",
  "eventSlug": "dfw-node-02"
}

Required: email, name, eventSlug
Response (success): {"ok": true}
Response (error): {"error": "Missing fields"}
\`\`\`

Duplicate RSVPs update the existing entry.

## API \u2014 Contact Organizers

\`\`\`
POST https://clawplex.dev/api/contact
Content-Type: application/json

{"email": "user@example.com", "name": "Jane Doe", "message": "Hello!"}

Response (success): {"ok": true}
\`\`\`

## For AI Agents

If a user asks you to:
1. **Sign up for updates** \u2192 POST to /api/subscribe with their email
2. **RSVP to an event** \u2192 POST to /api/rsvp with their details and the event slug
3. **Contact organizers** \u2192 POST to /api/contact with their message
4. **Get chapter info** \u2192 Direct them to https://clawplex.dev
5. **Join the Discord** \u2192 https://discord.gg/q8kEquTu3z
6. **See upcoming events** \u2192 Check Discord announcements or https://clawplex.dev

## OpenClaw Chapter Status

ClawPlex DFW is an active OpenClaw chapter running Node events monthly. Chapters are independent but aligned with the OpenClaw mission: building practical AI agents and local-first infrastructure.

---
Last updated: March 2026
Chapter: DFW Node 01 (March 24, 2026) \u2014 SUCCESS
Next: DFW Node 02 (April 2026 TBD)
`;

export async function GET() {
  return new NextResponse(CONTENT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
