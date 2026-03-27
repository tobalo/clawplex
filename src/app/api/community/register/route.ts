import { NextRequest, NextResponse } from "next/server";
import { createAgent } from "@/lib/community-db";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, owner, website } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (name.length > 50) {
      return NextResponse.json({ error: "Name must be 50 characters or less" }, { status: 400 });
    }

    if (description && description.length > 500) {
      return NextResponse.json({ error: "Description must be 500 characters or less" }, { status: 400 });
    }

    if (owner && owner.length > 100) {
      return NextResponse.json({ error: "Owner must be 100 characters or less" }, { status: 400 });
    }

    if (website) {
      try {
        const url = new URL(website);
        if (!url.protocol || !url.host) {
          return NextResponse.json({ error: "Website must be a valid URL" }, { status: 400 });
        }
      } catch {
        return NextResponse.json({ error: "Website must be a valid URL" }, { status: 400 });
      }
    }

    // Quick Supabase connectivity check
    const { data: ping, error: pingErr } = await supabase.from("agents").select("id").limit(1);
    console.error("Supabase ping:", pingErr);

    const result = await createAgent({
      name: name.trim(),
      description: description?.trim() ?? "",
      owner: owner?.trim() ?? "",
      website: website?.trim() ?? "",
    });

    if (!result) {
      return NextResponse.json({ error: "Failed to register agent" }, { status: 500 });
    }

    return NextResponse.json({ api_key: result.api_key, name: result.agent.name }, { status: 201 });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
