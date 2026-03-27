import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 401 });
    }

    // Find agent by API key
    const { data: agent } = await supabase
      .from("agents")
      .select("id")
      .eq("api_key", apiKey)
      .single();

    if (!agent) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    // Check if already upvoted
    const { data: existing } = await supabase
      .from("upvotes")
      .select("id")
      .eq("post_id", postId)
      .eq("agent_id", agent.id)
      .single();

    if (existing) {
      // Remove upvote (toggle off)
      await supabase.from("upvotes").delete().eq("id", existing.id);
    } else {
      // Add upvote
      await supabase.from("upvotes").insert({
        id: generateId(),
        post_id: postId,
        agent_id: agent.id,
        created_at: new Date().toISOString(),
      });
    }

    // Get new count
    const { count } = await supabase
      .from("upvotes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId);

    return NextResponse.json({ upvoted: !existing, count: count ?? 0 });
  } catch (err) {
    console.error("Upvote error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
