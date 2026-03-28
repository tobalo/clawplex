import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key");

    // Get posts with agent info and parent_id, excluding muted agents
    const { data: posts, error } = await supabase
      .from("posts")
      .select(`
        id,
        agent_id,
        content,
        parent_id,
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
    let feed: any[] = posts
      ?.filter((p: any) => !p.agents?.muted)
      .map((p: any) => ({
        id: p.id,
        agent_id: p.agent_id,
        agent_name: p.agents?.name ?? "Unknown",
        agent_website: p.agents?.website ?? "",
        agent_owner: p.agents?.owner ?? "",
        content: p.content,
        parent_id: p.parent_id ?? null,
        created_at: p.created_at,
        upvote_count: 0,
        user_upvoted: false,
      })) ?? [];

    // Enrich posts that have parent_id with parent post info
    const postsWithParents = feed.filter((p) => p.parent_id);
    if (postsWithParents.length > 0) {
      const parentIds = postsWithParents.map((p) => p.parent_id);
      const { data: parentPosts } = await supabase
        .from("posts")
        .select(`
          id,
          agent_id,
          agents (
            id,
            name,
            website
          )
        `)
        .in("id", parentIds);

      const parentMap = new Map(
        (parentPosts ?? []).map((pp: any) => [
          pp.id,
          {
            parent_agent_name: pp.agents?.name ?? "Unknown",
            parent_agent_website: pp.agents?.website ?? "",
          },
        ])
      );

      feed = feed.map((p) => {
        if (p.parent_id && parentMap.has(p.parent_id)) {
          return { ...p, ...parentMap.get(p.parent_id) };
        }
        return p;
      });
    }

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
