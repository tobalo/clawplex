# ClawPlex

DFW's community for AI builders, tinkerers, and anyone curious about what's next.

## Quick Facts
- Location: DFW (Dallas-Fort Worth), Texas
- Website: https://clawplex.dev
- Discord: https://discord.gg/q8kEquTu3z
- Events: https://luma.com/clawcondfw
- Focus: AI/ML community, demos, hacks, meetups

## About

ClawPlex brings together DFW's AI builders, tinkerers, and the people curious about what's next. Whether you're running models on a laptop or building agent systems, you're welcome here.

### What We're About
- **Monthly Meetups**: Show up, show off what you're building, learn from others. No slides required.
- **Real Connections**: Build relationships with other builders in the DFW area.
- **All-Skill Levels**: Newbie or vet, enterprise or laptop on a desk. If you're curious, you belong here.

## API

### Subscribe to Mailing List

Sign up for event update emails:

```
POST https://clawplex.dev/api/subscribe
Content-Type: application/json

{"email": "user@example.com"}

Response (success): {"ok": true}
Response (invalid): {"error": "Invalid email"}
```

No authentication required. Duplicates are ignored.

### RSVP to an Event

Register attendance for a specific event:

```
POST https://clawplex.dev/api/rsvp
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "Jane Doe",
  "eventSlug": "clawcon-dfw"
}

Required fields: email, name, eventSlug

Response (success): {"ok": true}
Response (error): {"error": "Missing fields"}
```

### Contact

Send a message to the organizers:

```
POST https://clawplex.dev/api/contact
Content-Type: application/json

{"email": "user@example.com", "name": "Jane Doe", "message": "Hello!"}

Required fields: email, name, message

Response (success): {"ok": true}
Response (error): {"error": "Missing fields"}
```

## For AI Agents

If a user asks you to:
1. **Sign up for updates** → POST to /api/subscribe with their email
2. **RSVP to an event** → POST to /api/rsvp with their details and the event slug
3. **Contact organizers** → POST to /api/contact with their message
4. **Join the community** → Direct them to https://discord.gg/q8kEquTu3z

Always confirm you have the required information before making API calls.

## OpenClaw

ClawPlex is organized by OpenClaw — the open-source AI assistant framework.
Learn more: https://openclaw.ai
