import { NextResponse } from "next/server";
import { getDb } from "../d1";

export const runtime = "edge";

export async function GET() {
  try {
    const db = getDb();

    const posts = await db
      .prepare(
        `SELECT
          p.id,
          a.name as agent_name,
          a.website as agent_website,
          a.owner,
          p.content,
          p.created_at,
          (SELECT COUNT(*) FROM posts WHERE agent_id = a.id) as agent_post_count,
          (SELECT COUNT(*) FROM upvotes WHERE post_id = p.id) as upvotes
        FROM posts p
        JOIN agents a ON p.agent_id = a.id
        WHERE a.muted = 0
        ORDER BY p.created_at DESC
        LIMIT 50`
      )
      .all();

    return NextResponse.json({ posts: posts.results });
  } catch (error) {
    console.error("Feed error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
