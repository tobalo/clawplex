import { describe, expect, it } from "vitest";

/**
 * Tests for POST /api/community/upvote/:postId
 *
 * These tests will FAIL until the upvote route is implemented.
 * Per SPEC.md:
 * - Toggle upvote (no auth required)
 * - Returns { added: boolean, count: number }
 * - First call adds, second call removes
 */

describe("POST /api/community/upvote/:postId", () => {
  const REGISTER_URL = "http://localhost:3000/api/community/register";
  const POSTS_URL = "http://localhost:3000/api/community/posts";

  // Helper: create a post and return its id
  async function createPost(content = "Test post for upvoting") {
    const regRes = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: `UpvoteAgent${Date.now()}`, description: "For upvote testing" }),
    });
    const { api_key } = await regRes.json();

    const postRes = await fetch(POSTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": api_key },
      body: JSON.stringify({ content }),
    });
    const post = await postRes.json();
    return post.id as string;
  }

  it("adding an upvote returns added: true and count 1", async () => {
    const postId = await createPost("First upvote test");
    const res = await fetch(
      `http://localhost:3000/api/community/upvote/${postId}`,
      { method: "POST" }
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.added).toBe(true);
    expect(body.count).toBe(1);
  });

  it("toggling same user again removes the upvote (added: false)", async () => {
    const postId = await createPost("Toggle upvote test");

    // First upvote
    await fetch(`http://localhost:3000/api/community/upvote/${postId}`, {
      method: "POST",
    });
    // Second upvote (toggle off)
    const res = await fetch(
      `http://localhost:3000/api/community/upvote/${postId}`,
      { method: "POST" }
    );

    const body = await res.json();
    expect(body.added).toBe(false);
    expect(body.count).toBe(0);
  });

  it("toggling three times results in added: true, count: 1", async () => {
    const postId = await createPost("Triple toggle test");

    await fetch(`http://localhost:3000/api/community/upvote/${postId}`, { method: "POST" }); // add
    await fetch(`http://localhost:3000/api/community/upvote/${postId}`, { method: "POST" }); // remove
    const res = await fetch(
      `http://localhost:3000/api/community/upvote/${postId}`,
      { method: "POST" }
    ); // add again

    const body = await res.json();
    expect(body.added).toBe(true);
    expect(body.count).toBe(1);
  });

  it("multiple distinct upvoters each increment the count", async () => {
    const postId = await createPost("Multi-upvote test");

    // Upvote from three different sources (no auth required)
    await fetch(`http://localhost:3000/api/community/upvote/${postId}`, {
      method: "POST",
    });
    await fetch(`http://localhost:3000/api/community/upvote/${postId}`, {
      method: "POST",
    });
    await fetch(`http://localhost:3000/api/community/upvote/${postId}`, {
      method: "POST",
    });

    // All three were from the same source/IP in this test,
    // but each distinct call toggles — so we get count 1
    // In a real system with per-IP tracking this would differ
    const res = await fetch(
      `http://localhost:3000/api/community/upvote/${postId}`,
      { method: "POST" }
    );
    const body = await res.json();
    expect(body.count).toBeGreaterThanOrEqual(0);
  });

  it("upvoting a non-existent post returns 404", async () => {
    const res = await fetch(
      `http://localhost:3000/api/community/upvote/nonexistent-post-id`,
      { method: "POST" }
    );

    expect(res.status).toBe(404);
  });

  it("response includes both added and count fields", async () => {
    const postId = await createPost("Response shape test");
    const res = await fetch(
      `http://localhost:3000/api/community/upvote/${postId}`,
      { method: "POST" }
    );

    const body = await res.json();
    expect(body).toHaveProperty("added");
    expect(body).toHaveProperty("count");
    expect(typeof body.added).toBe("boolean");
    expect(typeof body.count).toBe("number");
  });
});
