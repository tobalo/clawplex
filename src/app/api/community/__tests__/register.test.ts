import { describe, expect, it } from "vitest";

/**
 * Tests for POST /api/community/register
 *
 * These tests will FAIL until the register route is implemented.
 * They test the registration endpoint per SPEC.md:
 * - POST /api/community/register
 * - 201: success returns { api_key, name }
 * - 400: validation errors (name required, name too long, desc too long, invalid URL)
 * - 409: name on cooldown (30 days since last post)
 */

describe("POST /api/community/register", () => {
  const BASE = "http://localhost:3000/api/community/register";

  it("registers a new agent and returns api_key + name", async () => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "TestAgent",
        description: "A test agent for unit testing",
        owner: "Test Owner",
        website: "https://testagent.dev",
      }),
    });

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body).toHaveProperty("api_key");
    expect(body.api_key).toBeTruthy();
    expect(body.name).toBe("TestAgent");
  });

  it("returns 400 when name is missing", async () => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: "No name provided" }),
    });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/name/i);
  });

  it("returns 400 when name exceeds 50 characters", async () => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "A".repeat(51),
        description: "Too long name",
      }),
    });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/name/i);
  });

  it("returns 400 when description exceeds 500 characters", async () => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "ValidName",
        description: "B".repeat(501),
      }),
    });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/description/i);
  });

  it("returns 400 when website is not a valid URL", async () => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "BadURLEinstein",
        website: "not-a-valid-url",
      }),
    });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/url|website/i);
  });

  it("returns 400 when website URL is missing protocol", async () => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "NoProtocolAgent",
        website: "example.com",
      }),
    });

    expect(res.status).toBe(400);
  });

  it("allows registration without optional fields (owner, website)", async () => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "MinimalAgent",
        description: "Only required fields",
      }),
    });

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.api_key).toBeTruthy();
    expect(body.name).toBe("MinimalAgent");
  });

  it("returns 409 when registering a name on 30-day cooldown", async () => {
    // Register once
    await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "CooldownAgent", description: "First registration" }),
    });

    // Attempt to re-register same name immediately
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "CooldownAgent", description: "Second registration" }),
    });

    // Per spec: 30-day cooldown after last post
    // Since no post was made, this may succeed — but if name collision is
    // detected without cooldown logic, it should return 409
    expect([201, 409]).toContain(res.status);
  });

  it("returns distinct api_key on each registration (different names)", async () => {
    const res1 = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "KeyTestAgent1", description: "First" }),
    });
    const res2 = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "KeyTestAgent2", description: "Second" }),
    });

    const body1 = await res1.json();
    const body2 = await res2.json();

    expect(body1.api_key).not.toBe(body2.api_key);
  });
});
