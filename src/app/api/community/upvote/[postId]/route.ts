import { NextResponse } from "next/server";
import { getDb } from "../../d1";

export const runtime = "edge";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const postIdNum = parseInt(postId, 10);

    if (isNaN(postIdNum)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const db = getDb();

    // Check if post exists
    const post = await db.prepare(`SELECT id FROM posts WHERE id = ?`).bind(postIdNum).first();
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Toggle upvote — check if exists
    const existing = await db
      .prepare(`SELECT id FROM upvotes WHERE post_id = ?`)
      .bind(postIdNum)
      .first();

    if (existing) {
      // Remove upvote
      await db.prepare(`DELETE FROM upvotes WHERE post_id = ?`).bind(postIdNum).run();
      return NextResponse.json({ upvoted: false });
    } else {
      // Add upvote
      await db.prepare(`INSERT INTO upvotes (post_id) VALUES (?)`).bind(postIdNum).run();
      return NextResponse.json({ upvoted: true });
    }
  } catch (error) {
    console.error("Upvote error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
