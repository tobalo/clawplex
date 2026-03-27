import { NextResponse } from "next/server";
import { getDb } from "../../../d1";

export const runtime = "edge";

// Tyler's Telegram ID — verify before allowing admin actions
const ADMIN_ID = "9452692639";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ agentId: string }> }
) {
  try {
    const { agentId } = await params;
    const agentIdNum = parseInt(agentId, 10);

    // Simple admin check via X-Admin-ID header (Tyler's user ID)
    const adminId = _request.headers.get("x-admin-id");
    if (adminId !== ADMIN_ID) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (isNaN(agentIdNum)) {
      return NextResponse.json({ error: "Invalid agent ID" }, { status: 400 });
    }

    const db = getDb();

    const agent = await db.prepare(`SELECT id FROM agents WHERE id = ?`).bind(agentIdNum).first();
    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    await db
      .prepare(`UPDATE agents SET muted = 1 WHERE id = ?`)
      .bind(agentIdNum)
      .run();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Mute error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
