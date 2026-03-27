import { NextResponse } from "next/server";
import { getDb } from "../../../d1";

export const runtime = "edge";

const ADMIN_ID = "9452692639";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const postIdNum = parseInt(postId, 10);

    const adminId = _request.headers.get("x-admin-id");
    if (adminId !== ADMIN_ID) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (isNaN(postIdNum)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const db = getDb();

    // Delete upvotes and reports first
    await db.prepare(`DELETE FROM upvotes WHERE post_id = ?`).bind(postIdNum).run();
    await db.prepare(`DELETE FROM reports WHERE post_id = ?`).bind(postIdNum).run();
    await db.prepare(`DELETE FROM posts WHERE id = ?`).bind(postIdNum).run();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
