import { describe, expect, it } from "vitest";

/**
 * Tests for POST /api/community/posts
 *
 * These tests will FAIL until the posts route is implemented.
 * Per SPEC.md:
 * - Requires x-api-key header
 * - 201: success returns { id, agent_name, content, created_at }
 * - 401: missing or invalid API key
 * - 403: agent muted
 * - 400: content required, content too long (max 500)
 */

describe("POST /api/community/posts", () => {
  const BASE = "http://localhost:3000/api/community/posts";

  // Helper: register an agent and return its api_key
  async function registerAgent(name: string, description = "Test agent") {
    const res = await fetch("http://localhost:3000/api/community/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    const body = await res.json();
    return body.api_key as string;
  }

  it("creates a post with valid API key and returns 201", async () => {
    const apiKey = await registerAgent("PostTestAgent1");
    const res = await fetch(BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ content: "Hello from my agent!" }),
    });

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body).toHaveProperty("id");
    expect(body.agent_name).toBe("PostTestAgent1");
    expect(body.content).toBe("Hello from my agent!");
    expect(body).toHaveProperty("created_at");
  });

  it("returns 401 when x-api-key header is missing", async () => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "No API key provided" }),
    });

    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toMatch(/api.?key/i);
  });

  it("returns 401 when x-api-key is invalid", async () => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "this-is-not-a-valid-key",
      },
      body: JSON.stringify({ content: "Using a fake API key" }),
    });

    expect(res.status).toBe(401);
  });

  it("returns 400 when content is missing", async () => {
    const apiKey = await registerAgent("NoContentAgent");
    const res = await fetch(BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({}),
    });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/content/i);
  });

  it("returns 400 when content exceeds 500 characters", async () => {
    const apiKey = await registerAgent("LongContentAgent");
    const res = await fetch(BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ content: "x".repeat(501) }),
    });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/content/i);
  });

  it("accepts content at exactly 500 characters", async () => {
    const apiKey = await registerAgent("MaxContentAgent");
    const res = await fetch(BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ content: "x".repeat(500) }),
    });

    expect(res.status).toBe(201);
  });

  it("returns 403 when the agent is muted", async () => {
    const apiKey = await registerAgent("MutedPostAgent");
    // Mute the agent via admin endpoint
    await fetch(`http://localhost:3000/api/community/admin/mute/MutedPostAgent`, {
      method: "POST",
    });

    const res = await fetch(BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ content: "This should be blocked" }),
    });

    expect(res.status).toBe(403);
  });

  it("returned post includes id, agent_name, content, and created_at", async () => {
    const apiKey = await registerAgent("ReturnFieldsAgent");
    const res = await fetch(BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ content: "Field check post" }),
    });

    const body = await res.json();
    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("agent_name");
    expect(body).toHaveProperty("content");
    expect(body).toHaveProperty("created_at");
    expect(typeof body.id).toBe("string");
    expect(typeof body.agent_name).toBe("string");
    expect(typeof body.content).toBe("string");
    expect(body.content).toBe("Field check post");
  });

  it("multiple posts from same agent each get unique IDs", async () => {
    const apiKey = await registerAgent("MultiPostAgent");
    const res1 = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({ content: "First post" }),
    });
    const res2 = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({ content: "Second post" }),
    });

    const body1 = await res1.json();
    const body2 = await res2.json();
    expect(body1.id).not.toBe(body2.id);
  });
});
