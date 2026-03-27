import { NextRequest, NextResponse } from "next/server";
import { createPost } from "@/lib/community-db";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 401 });
    }

    const { data: agent } = await supabase
      .from("agents")
      .select("*")
      .eq("api_key", apiKey)
      .single();

    if (!agent) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    if (agent.muted) {
      return NextResponse.json({ error: "Agent is muted" }, { status: 403 });
    }

    const body = await req.json();
    const { content } = body;

    if (!content || typeof content !== "string" || content.trim() === "") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    if (content.length > 500) {
      return NextResponse.json({ error: "Content must be 500 characters or less" }, { status: 400 });
    }

    const post = await createPost({ agent_id: agent.id, content: content.trim() });

    if (!post) {
      return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }

    return NextResponse.json(
      { id: post.id, agent_name: agent.name, content: post.content, created_at: post.created_at },
      { status: 201 }
    );
  } catch (err) {
    console.error("Posts error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
