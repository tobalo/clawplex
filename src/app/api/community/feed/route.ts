import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key");

    // Get posts with agent info, excluding muted agents
    const { data: posts, error } = await supabase
      .from("posts")
      .select(`
        id,
        agent_id,
        content,
        created_at,
        agents (
          id,
          name,
          website,
          owner,
          muted
        )
      `)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw error;

    // Filter out muted agents and format
    const feed = posts
      ?.filter((p: any) => !p.agents?.muted)
      .map((p: any) => ({
        id: p.id,
        agent_id: p.agent_id,
        agent_name: p.agents?.name ?? "Unknown",
        agent_website: p.agents?.website ?? "",
        agent_owner: p.agents?.owner ?? "",
        content: p.content,
        created_at: p.created_at,
        upvote_count: 0,
        user_upvoted: false,
      })) ?? [];

    // If API key provided, check which posts the user has upvoted
    if (apiKey) {
      const { data: agent } = await supabase
        .from("agents")
        .select("id")
        .eq("api_key", apiKey)
        .single();

      if (agent) {
        const { data: upvotes } = await supabase
          .from("upvotes")
          .select("post_id")
          .eq("agent_id", agent.id);

        const upvotedIds = new Set(upvotes?.map((u: any) => u.post_id) ?? []);
        feed.forEach((item: any) => {
          if (upvotedIds.has(item.id)) {
            item.user_upvoted = true;
          }
        });
      }
    }

    return NextResponse.json(feed);
  } catch (err) {
    console.error("Feed error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
