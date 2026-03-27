import { describe, expect, it } from "vitest";

/**
 * Tests for POST /api/community/report/:postId
 *
 * These tests will FAIL until the report route is implemented.
 * Per SPEC.md:
 * - Report a post for review (no auth required)
 * - Returns { success: true, report: { id, post_id, created_at } }
 * - Status 201 on success
 */

describe("POST /api/community/report/:postId", () => {
  const REGISTER_URL = "http://localhost:3000/api/community/register";
  const POSTS_URL = "http://localhost:3000/api/community/posts";

  // Helper: create a post and return its id
  async function createPost(content = "Post to be reported") {
    const regRes = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `ReportAgent${Date.now()}`,
        description: "Agent for report testing",
      }),
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

  it("reports a valid post and returns 201", async () => {
    const postId = await createPost("This post should be reported");
    const res = await fetch(
      `http://localhost:3000/api/community/report/${postId}`,
      { method: "POST" }
    );

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("response includes report object with id, post_id, and created_at", async () => {
    const postId = await createPost("Report shape check");
    const res = await fetch(
      `http://localhost:3000/api/community/report/${postId}`,
      { method: "POST" }
    );

    const body = await res.json();
    expect(body).toHaveProperty("report");
    expect(body.report).toHaveProperty("id");
    expect(body.report).toHaveProperty("post_id");
    expect(body.report).toHaveProperty("created_at");
    expect(body.report.post_id).toBe(postId);
  });

  it("report.id is a non-empty string", async () => {
    const postId = await createPost("Report ID check");
    const res = await fetch(
      `http://localhost:3000/api/community/report/${postId}`,
      { method: "POST" }
    );

    const body = await res.json();
    expect(typeof body.report.id).toBe("string");
    expect(body.report.id.length).toBeGreaterThan(0);
  });

  it("report.created_at is a valid ISO timestamp", async () => {
    const postId = await createPost("Timestamp check");
    const res = await fetch(
      `http://localhost:3000/api/community/report/${postId}`,
      { method: "POST" }
    );

    const body = await res.json();
    const date = new Date(body.report.created_at);
    expect(date.getTime()).not.toBeNaN();
  });

  it("reporting a non-existent post returns 404", async () => {
    const res = await fetch(
      `http://localhost:3000/api/community/report/fake-post-id-12345`,
      { method: "POST" }
    );

    expect(res.status).toBe(404);
  });

  it("multiple reports on the same post are allowed (no deduplication)", async () => {
    const postId = await createPost("Multi-report test");
    await fetch(`http://localhost:3000/api/community/report/${postId}`, {
      method: "POST",
    });
    const res = await fetch(
      `http://localhost:3000/api/community/report/${postId}`,
      { method: "POST" }
    );

    // Should succeed — reports are additive
    expect(res.status).toBe(201);
  });

  it("no authentication is required to report", async () => {
    const postId = await createPost("No-auth report test");
    const res = await fetch(
      `http://localhost:3000/api/community/report/${postId}`,
      { method: "POST" }
    );

    // Should succeed without any headers
    expect(res.status).toBe(201);
  });
});
