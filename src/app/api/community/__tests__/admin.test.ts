import { describe, expect, it, beforeAll } from "vitest";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "community.json");

// Ensure clean state before this file's tests run
beforeAll(() => {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ agents: [], posts: [], upvotes: [], reports: [] }));
});

/**
 * Tests for admin endpoints:
 * - POST /api/community/admin/mute/:agentId
 * - DELETE /api/community/admin/posts/:postId
 *
 * These tests will FAIL until the admin routes are implemented.
 * Per SPEC.md:
 * - Mute: toggles agent mute status, returns { success, muted }
 * - Delete: removes a post, returns { success }
 * - Tyler only — no auth for MVP
 */

describe("POST /api/community/admin/mute/:agentId", () => {
  const REGISTER_URL = "http://localhost:3000/api/community/register";
  const POSTS_URL = "http://localhost:3000/api/community/posts";
  const FEED_URL = "http://localhost:3000/api/community/feed";

  async function registerAgent(name: string) {
    const regRes = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description: `Description for ${name}` }),
    });
    return regRes.json().then((b: any) => b.api_key as string);
  }

  it("mutes an unmuted agent and returns muted: true", async () => {
    const agentName = `MuteTestAgent${Date.now()}`;
    await registerAgent(agentName);

    const res = await fetch(
      `http://localhost:3000/api/community/admin/mute/${agentName}`,
      { method: "POST" }
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.muted).toBe(true);
  });

  it("unmutes a muted agent and returns muted: false (toggle)", async () => {
    const agentName = `UnmuteTestAgent${Date.now()}`;
    await registerAgent(agentName);

    // Mute first
    await fetch(
      `http://localhost:3000/api/community/admin/mute/${agentName}`,
      { method: "POST" }
    );

    // Unmute (toggle)
    const res = await fetch(
      `http://localhost:3000/api/community/admin/mute/${agentName}`,
      { method: "POST" }
    );

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.muted).toBe(false);
  });

  it("muted agent's feed entry shows muted: true", async () => {
    const agentName = `FeedMuteAgent${Date.now()}`;
    const apiKey = await registerAgent(agentName);

    // Post something
    await fetch(POSTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({ content: "Post before muting" }),
    });

    // Mute the agent
    await fetch(
      `http://localhost:3000/api/community/admin/mute/${agentName}`,
      { method: "POST" }
    );

    // Check feed
    const feedRes = await fetch(FEED_URL);
    const feed = await feedRes.json();
    const agentPost = feed.find((p: any) => p.agent_name === agentName);
    expect(agentPost).toBeDefined();
    expect(agentPost.muted).toBe(true);
  });

  it("muted agent's posts are still returned in feed (not filtered out)", async () => {
    const agentName = `StillVisibleAgent${Date.now()}`;
    const apiKey = await registerAgent(agentName);

    await fetch(POSTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({ content: "Visible even when muted" }),
    });

    await fetch(
      `http://localhost:3000/api/community/admin/mute/${agentName}`,
      { method: "POST" }
    );

    const feedRes = await fetch(FEED_URL);
    const feed = await feedRes.json();
    const agentPost = feed.find((p: any) => p.agent_name === agentName);
    // Per spec: muted posts still appear in feed with muted: true flag
    expect(agentPost).toBeDefined();
  });

  it("response includes both success and muted fields", async () => {
    const agentName = `ResponseShapeAgent${Date.now()}`;
    await registerAgent(agentName);

    const res = await fetch(
      `http://localhost:3000/api/community/admin/mute/${agentName}`,
      { method: "POST" }
    );

    const body = await res.json();
    expect(body).toHaveProperty("success");
    expect(body).toHaveProperty("muted");
    expect(typeof body.success).toBe("boolean");
    expect(typeof body.muted).toBe("boolean");
  });

  it("muting a non-existent agent returns 404", async () => {
    const res = await fetch(
      `http://localhost:3000/api/community/admin/mute/NonExistentAgent${Date.now()}`,
      { method: "POST" }
    );

    expect(res.status).toBe(404);
  });
});

describe("DELETE /api/community/admin/posts/:postId", () => {
  const REGISTER_URL = "http://localhost:3000/api/community/register";
  const POSTS_URL = "http://localhost:3000/api/community/posts";
  const FEED_URL = "http://localhost:3000/api/community/feed";

  async function createPost(content = "Post to be deleted") {
    const name = `DeleteTestAgent${Date.now()}`;
    const regRes = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description: "For delete testing" }),
    });
    const { api_key } = await regRes.json();

    const postRes = await fetch(POSTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": api_key },
      body: JSON.stringify({ content }),
    });
    return postRes.json().then((b: any) => b.id as string);
  }

  it("deletes an existing post and returns success: true", async () => {
    const postId = await createPost("This post will be deleted");

    const res = await fetch(
      `http://localhost:3000/api/community/admin/posts/${postId}`,
      { method: "DELETE" }
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("deleted post no longer appears in feed", async () => {
    const postId = await createPost("Post that should disappear");

    // Verify it exists first
    const beforeRes = await fetch(FEED_URL);
    const beforeFeed = await beforeRes.json();
    const before = beforeFeed.find((p: any) => p.id === postId);
    expect(before).toBeDefined();

    // Delete it
    await fetch(
      `http://localhost:3000/api/community/admin/posts/${postId}`,
      { method: "DELETE" }
    );

    // Verify it's gone
    const afterRes = await fetch(FEED_URL);
    const afterFeed = await afterRes.json();
    const after = afterFeed.find((p: any) => p.id === postId);
    expect(after).toBeUndefined();
  });

  it("deleting a non-existent post returns 404", async () => {
    const res = await fetch(
      `http://localhost:3000/api/community/admin/posts/fake-post-id-99999`,
      { method: "DELETE" }
    );

    expect(res.status).toBe(404);
  });

  it("response is { success: true } with no extra fields", async () => {
    const postId = await createPost("Response shape check");

    const res = await fetch(
      `http://localhost:3000/api/community/admin/posts/${postId}`,
      { method: "DELETE" }
    );

    const body = await res.json();
    expect(body).toEqual({ success: true });
  });

  it("can delete a post and then upvote returns 404", async () => {
    const postId = await createPost("Post deleted then upvoted");

    await fetch(
      `http://localhost:3000/api/community/admin/posts/${postId}`,
      { method: "DELETE" }
    );

    const upvoteRes = await fetch(
      `http://localhost:3000/api/community/upvote/${postId}`,
      { method: "POST" }
    );

    expect(upvoteRes.status).toBe(404);
  });
});
