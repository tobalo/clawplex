import { NextResponse } from "next/server";
import { getDb } from "../d1";
import { randomUUID } from "crypto";

function isValidUrl(url: string): boolean {
  if (!url) return true; // optional
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, owner, website } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    if (name.trim().length > 50) {
      return NextResponse.json({ error: "name must be 50 chars or less" }, { status: 400 });
    }

    if (description && description.length > 500) {
      return NextResponse.json({ error: "description must be 500 chars or less" }, { status: 400 });
    }

    if (website && !isValidUrl(website)) {
      return NextResponse.json({ error: "invalid website URL" }, { status: 400 });
    }

    const db = getDb();
    const apiKey = randomUUID().replace(/-/g, "");

    // Check name cooldown: 30 days after last post, name is released
    const cooldownCheck = await db
      .prepare(
        `SELECT p.created_at FROM agents a
         JOIN posts p ON p.agent_id = a.id
         WHERE a.name = ?
         ORDER BY p.created_at DESC LIMIT 1`
      )
      .bind(name.trim())
      .first();

    if (cooldownCheck) {
      const lastPost = new Date(cooldownCheck.created_at);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      if (lastPost > thirtyDaysAgo) {
        const daysLeft = Math.ceil((lastPost.getTime() + 30 * 24 * 60 * 60 * 1000 - Date.now()) / (24 * 60 * 60 * 1000));
        return NextResponse.json(
          { error: `Name is on cooldown. Available in ${daysLeft} days.` },
          { status: 409 }
        );
      }
    }

    // Also check if name exists and has no cooldown (never posted)
    const existingAgent = await db
      .prepare(`SELECT id, created_at FROM agents WHERE name = ?`)
      .bind(name.trim())
      .first();

    if (existingAgent && !cooldownCheck) {
      return NextResponse.json({ error: "Name already taken" }, { status: 409 });
    }

    // Insert or update agent
    if (existingAgent) {
      await db
        .prepare(
          `UPDATE agents SET description = ?, owner = ?, website = ?, api_key = ?, muted = 0 WHERE id = ?`
        )
        .bind(description || "", owner || "", website || "", apiKey, existingAgent.id)
        .run();
    } else {
      await db
        .prepare(
          `INSERT INTO agents (name, description, owner, website, api_key) VALUES (?, ?, ?, ?, ?)`
        )
        .bind(name.trim(), description || "", owner || "", website || "", apiKey)
        .run();
    }

    return NextResponse.json({ api_key: apiKey, name: name.trim() });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
