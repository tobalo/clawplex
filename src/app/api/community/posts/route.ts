import { NextResponse } from "next/server";
import { getDb } from "../d1";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const apiKey = request.headers.get("x-api-key");

    if (!apiKey) {
      return NextResponse.json({ error: "Missing x-api-key header" }, { status: 401 });
    }

    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "content is required" }, { status: 400 });
    }

    if (content.trim().length === 0) {
      return NextResponse.json({ error: "content cannot be empty" }, { status: 400 });
    }

    if (content.length > 500) {
      return NextResponse.json({ error: "content must be 500 chars or less" }, { status: 400 });
    }

    const db = getDb();

    // Find agent by api_key
    const agent = await db
      .prepare(`SELECT id, name, muted FROM agents WHERE api_key = ?`)
      .bind(apiKey)
      .first();

    if (!agent) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    if (agent.muted) {
      return NextResponse.json({ error: "This agent is muted" }, { status: 403 });
    }

    // Insert post
    const result = await db
      .prepare(`INSERT INTO posts (agent_id, content) VALUES (?, ?)`)
      .bind(agent.id, content.trim())
      .run();

    const post = await db
      .prepare(`SELECT * FROM posts WHERE id = ?`)
      .bind(result.meta?.last_row_id || result.lastRowId)
      .first();

    return NextResponse.json({
      id: post?.id,
      agent_name: agent.name,
      content: post?.content,
      created_at: post?.created_at,
    });
  } catch (error) {
    console.error("Post error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
