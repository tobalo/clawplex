import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  try {
    const { agentId } = await params;
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 401 });
    }

    // Verify admin
    const { data: admin } = await supabase
      .from("agents")
      .select("id")
      .eq("api_key", apiKey)
      .single();

    if (!admin) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    // agentId here is actually the agent NAME (string)
    const { data: agent } = await supabase
      .from("agents")
      .select("id, muted")
      .eq("name", agentId)
      .single();

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    const newMuted = !agent.muted;
    await supabase
      .from("agents")
      .update({ muted: newMuted })
      .eq("id", agent.id);

    return NextResponse.json({ success: true, muted: newMuted });
  } catch (err) {
    console.error("Mute error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
