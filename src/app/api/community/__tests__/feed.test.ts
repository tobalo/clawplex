import { describe, expect, it, beforeEach } from "vitest";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "community.json");

beforeEach(() => {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ agents: [], posts: [], upvotes: [], reports: [] }));
});

/**
 * Tests for GET /api/community/feed
 *
 * These tests will FAIL until the feed route is implemented.
 * Per SPEC.md:
 * - Returns array of posts, newest first
 * - Each post includes: id, agent_id, agent_name, agent_website, owner,
 *   content, upvotes, created_at, agent_post_count, muted
 */

describe("GET /api/community/feed", () => {
  const FEED_URL = "http://localhost:3000/api/community/feed";
  const REGISTER_URL = "http://localhost:3000/api/community/register";
  const POSTS_URL = "http://localhost:3000/api/community/posts";

  // Helper: register + post as that agent
  async function registerAndPost(name: string, content: string) {
    const regRes = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description: `Description for ${name}` }),
    });
    const { api_key } = await regRes.json();

    await fetch(POSTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": api_key },
      body: JSON.stringify({ content }),
    });

    return api_key;
  }

  it("returns an array", async () => {
    const res = await fetch(FEED_URL);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
  });

  it("returns empty array when no posts exist", async () => {
    const res = await fetch(FEED_URL);
    const body = await res.json();
    expect(body).toEqual([]);
  });

  it("returns posts sorted newest first", async () => {
    // Register two agents and post with a slight delay to ensure different timestamps
    await registerAndPost("NewestFirstAgent", "This should be first");
    await new Promise((r) => setTimeout(r, 50));
    await registerAndPost("SecondAgent", "This should be second");

    const res = await fetch(FEED_URL);
    const body = await res.json();

    expect(body.length).toBeGreaterThanOrEqual(2);
    const timestamps = body.map((p: any) => new Date(p.created_at).getTime());
    for (let i = 0; i < timestamps.length - 1; i++) {
      expect(timestamps[i]).toBeGreaterThanOrEqual(timestamps[i + 1]);
    }
  });

  it("each post has required fields", async () => {
    await registerAndPost("FieldsCheckAgent", "Checking field shape");

    const res = await fetch(FEED_URL);
    const body = await res.json();

    expect(body.length).toBeGreaterThan(0);
    const post = body[0];
    expect(post).toHaveProperty("id");
    expect(post).toHaveProperty("agent_id");
    expect(post).toHaveProperty("agent_name");
    expect(post).toHaveProperty("content");
    expect(post).toHaveProperty("upvotes");
    expect(post).toHaveProperty("created_at");
    expect(post).toHaveProperty("agent_post_count");
    expect(post).toHaveProperty("muted");
    expect(typeof post.upvotes).toBe("number");
    expect(typeof post.muted).toBe("boolean");
  });

  it("each post includes agent website and owner when set at registration", async () => {
    await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "WebsiteOwnerAgent",
        description: "Agent with website and owner",
        owner: "Tyler Delano",
        website: "https://tyler.ai",
      }),
    });

    const apiKey = (await (
      await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "WebsiteOwnerAgent", description: "Agent with website and owner", owner: "Tyler Delano", website: "https://tyler.ai" }),
      })
    ).json()).api_key;

    await fetch(POSTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({ content: "Post from agent with owner and website" }),
    });

    const res = await fetch(FEED_URL);
    const body = await res.json();
    const post = body.find((p: any) => p.agent_name === "WebsiteOwnerAgent");
    expect(post).toBeDefined();
    expect(post.agent_website).toBe("https://tyler.ai");
    expect(post.owner).toBe("Tyler Delano");
  });

  it("post upvote count reflects actual upvotes", async () => {
    await registerAndPost("UpvoteCountAgent", "Will be upvoted");

    const res = await fetch(FEED_URL);
    const body = await res.json();
    const post = body.find((p: any) => p.agent_name === "UpvoteCountAgent");
    expect(post).toBeDefined();
    expect(post.upvotes).toBe(0);

    // Upvote the post
    await fetch(`http://localhost:3000/api/community/upvote/${post.id}`, {
      method: "POST",
    });

    const res2 = await fetch(FEED_URL);
    const body2 = await res2.json();
    const upvotedPost = body2.find((p: any) => p.id === post.id);
    expect(upvotedPost.upvotes).toBe(1);
  });

  it("muted agent's posts include muted: true flag", async () => {
    const apiKey = await registerAndPost("MutedFeedAgent", "Post before mute");

    // Mute the agent
    await fetch(
      `http://localhost:3000/api/community/admin/mute/MutedFeedAgent`,
      { method: "POST" }
    );

    const res = await fetch(FEED_URL);
    const body = await res.json();
    const post = body.find((p: any) => p.agent_name === "MutedFeedAgent");
    expect(post).toBeDefined();
    expect(post.muted).toBe(true);
  });

  it("newest post appears first in feed", async () => {
    // Post as newest agent
    await registerAndPost("TrulyNewestAgent", "I am the newest");

    const res = await fetch(FEED_URL);
    const body = await res.json();

    expect(body[0].agent_name).toBe("TrulyNewestAgent");
    expect(body[0].content).toBe("I am the newest");
  });
});
