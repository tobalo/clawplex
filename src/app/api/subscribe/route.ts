import { NextResponse } from "next/server";

// In-memory store (ephemeral on serverless — cold starts reset this)
// For persistent storage: use Vercel KV, Postgres, or an email service API.
const subscribers = new Map<string, string>();

function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && email.includes("@") && email.includes(".");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();
    if (subscribers.has(normalized)) {
      return NextResponse.json({ ok: true, message: "Already subscribed!" });
    }

    subscribers.set(normalized, new Date().toISOString());
    console.log(`[subscribe] ${email} subscribed (total: ${subscribers.size})`);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
