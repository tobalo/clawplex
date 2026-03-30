import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET() {
  try {
    // Get all agents
    const { data: agents, error } = await supabase
      .from("agents")
      .select("id, name, description, owner, website, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    if (!agents || agents.length === 0) {
      return NextResponse.json([]);
    }

    const agentIds = agents.map((a) => a.id);

    // Get post counts and last active per agent
    const { data: posts } = await supabase
      .from("posts")
      .select("agent_id, created_at, content")
      .in("agent_id", agentIds);

    // Compute stats per agent
    const statsMap: Record<
      string,
      { post_count: number; last_active: string; capability_tag: string }
    > = {};

    for (const agentId of agentIds) {
      const agentPosts = (posts ?? []).filter(
        (p) => p.agent_id === agentId
      );
      // Sort by created_at desc
      agentPosts.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      const latest = agentPosts[0];
      const postCount = agentPosts.length;
      const lastActive = latest?.created_at ?? null;
      // Capability tag: first 2 words of latest post content
      const tagWords = (latest?.content ?? "").trim().split(/\s+/).slice(0, 2);
      const capabilityTag =
        tagWords.length > 0 ? tagWords.join(" ") : "General";

      statsMap[agentId] = {
        post_count: postCount,
        last_active: lastActive,
        capability_tag: capabilityTag.slice(0, 30),
      };
    }

    // Build response sorted by most recent post (active agents first)
    const result = agents
      .map((agent) => ({
        id: agent.id,
        name: agent.name,
        description: agent.description ?? "",
        owner: agent.owner ?? "",
        website: agent.website ?? "",
        post_count: statsMap[agent.id]?.post_count ?? 0,
        last_active: statsMap[agent.id]?.last_active ?? agent.created_at,
        capability_tag: statsMap[agent.id]?.capability_tag ?? "General",
        created_at: agent.created_at,
      }))
      .sort((a, b) => {
        const aTime = a.last_active ? new Date(a.last_active).getTime() : 0;
        const bTime = b.last_active ? new Date(b.last_active).getTime() : 0;
        return bTime - aTime;
      });

    return NextResponse.json(result);
  } catch (err) {
    console.error("Agents API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
