"use client";

import { useState } from "react";
import Image from "next/image";

// ─── Navigation ──────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden">
            <Image src="/hero-lobster.jpg" alt="ClawPlex brand seal" fill className="object-cover" />
          </div>
          <span className="font-sans text-sm font-bold uppercase tracking-widest text-black">
            ClawPlex
          </span>
          <span className="border border-black/20 bg-black/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-black">
            DFW
          </span>
        </div>
        <div className="flex items-center gap-8">
          <a
            href="https://discord.gg/q8kEquTu3z"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-widest text-black/70 hover:text-black hover:underline"
          >
            Discord
          </a>
          <a
            href="https://discord.gg/q8kEquTu3z"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-black pb-0.5 font-mono text-xs uppercase tracking-widest text-black hover:text-black/70"
          >
            Join the Node →
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative">
      {/* Cowboy Lobster — full width hero image */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src="/hero-lobster.jpg"
          alt="Cowboy riding a lobster over Dallas — ClawPlex DFW"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Bottom gradient fade into white */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-white" />
      </div>

      {/* Hero text content */}
      <div className="px-6 py-16 md:py-20 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-8xl font-sans font-bold tracking-[-0.04em] uppercase text-black">
          ClawPlex — DFW
        </h1>
        <p className="mt-6 text-sm md:text-base font-mono text-black/70 uppercase tracking-[0.1em]">
          ◆ For you & your agent ◇
        </p>
        <p className="mt-5 max-w-xl mx-auto text-base md:text-lg font-sans text-black/80 leading-relaxed">
          The home base for DFW builders shipping practical AI. Demos, lightning talks, and real-world engineering.
        </p>
        <div className="mt-12 flex justify-center gap-8 font-mono text-xs uppercase tracking-widest text-black/80">
          <span>100+ Builders</span>
          <span>/</span>
          <span>Live Demos</span>
          <span>/</span>
          <span>No Posture</span>
        </div>
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="https://discord.gg/q8kEquTu3z"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-claw-orange bg-claw-orange px-8 py-4 font-sans text-sm font-bold uppercase tracking-widest text-white hover:bg-claw-orange/80"
          >
            Join Discord →
          </a>
          <a
            href="#recap"
            className="border border-black/20 bg-transparent px-8 py-4 font-sans text-sm font-bold uppercase tracking-widest text-black hover:border-black hover:bg-black/5"
          >
            See Recap ↓
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── The Signal — March 24 Recap ─────────────────────────────────────────────
function TheSignal() {
  return (
    <section id="recap" className="border-t border-black/10 px-6 py-24 md:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Header row */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/80 mb-3">
              ◆ The Signal
            </p>
            <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-[-0.04em] text-black leading-none">
              ClawCon DFW.
            </h2>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-black/80">
              March 24, 2026 — Spark Coworking, Arlington TX
            </p>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-black/80">
            [View the March Gallery →]
          </div>
        </div>

        {/* Social proof anchor */}
        <div className="mb-16 grid grid-cols-3 border border-black/10">
          <div className="border-b border-r border-black/10 p-8 md:p-12">
            <p className="text-4xl md:text-6xl font-sans font-bold text-black">100+</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-black/80">
              ◆ Attendees
            </p>
          </div>
          <div className="border-b border-r border-black/10 p-8 md:p-12">
            <p className="text-4xl md:text-6xl font-sans font-bold text-black">8</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-black/80">
              ◇ Live Demos
            </p>
          </div>
          <div className="border-b border-black/10 p-8 md:p-12">
            <p className="text-4xl md:text-6xl font-sans font-bold text-black">1</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-black/80">
              ◆ Node Launched
            </p>
          </div>
          <div className="col-span-3 grid grid-cols-3">
            <div className="border-r border-black/10 p-8 md:p-12">
              <p className="font-mono text-xs uppercase tracking-widest text-black/80">
                ◇ Venue
              </p>
              <p className="mt-1 font-sans text-sm font-medium text-black">Spark Coworking</p>
            </div>
            <div className="border-r border-black/10 p-8 md:p-12">
              <p className="font-mono text-xs uppercase tracking-widest text-black/80">
                ◇ Format
              </p>
              <p className="mt-1 font-sans text-sm font-medium text-black">No Slides. Just Build.</p>
            </div>
            <div className="p-8 md:p-12">
              <p className="font-mono text-xs uppercase tracking-widest text-black/80">
                ◇ Next
              </p>
              <p className="mt-1 font-sans text-sm font-medium text-black">April 2026 — TBD</p>
            </div>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-0 border border-black/10">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="relative border border-black/10 bg-claw-ghost overflow-hidden" style={{ height: "200px" }}>
              <Image
                src={`/clawcon-${i}.jpg`}
                alt={`ClawCon DFW photo ${i}`}
                fill
                className="object-cover hover:opacity-80 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-black/50">
          ClawCon DFW · Arlington TX · March 24, 2026
        </p>
      </div>
    </section>
  );
}

// ─── Active Node — April TBD ─────────────────────────────────────────────────
function ActiveNode() {
  return (
    <section className="bg-black px-6 py-24 md:py-40">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="space-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
            ◆ Active Node
          </p>
          <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-[-0.04em] text-white leading-none">
            DFW Node 02.
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-white/70">
            Next Event — April 2026 (TBD)
          </p>
          <p className="max-w-md text-base text-white/80 leading-relaxed">
            We are currently provisioning a venue for our next 100+ person gathering.
            Final coordinates will be dropped in Discord.
          </p>
        </div>
        <div className="shrink-0">
          <a
            href="https://discord.gg/q8kEquTu3z"
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-claw-orange bg-claw-orange px-12 py-6 font-sans font-bold uppercase tracking-widest text-white hover:bg-claw-orange/80"
          >
            Join Discord for Coordinates →
          </a>
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-white/50">
            OpenClaw DFW · 100+ Node
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Strategic Growth — Partnerships ─────────────────────────────────────────
function Partnerships() {
  return (
    <section className="border-t border-black/10 bg-claw-ghost px-6 py-24 md:py-40">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Left: Value prop */}
        <div className="space-y-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/80">
            ◆ Strategic Growth
          </p>
          <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-[-0.04em] leading-none text-black">
            Scale the DFW
            <br />
            AI Infrastructure.
          </h2>
          <p className="text-lg text-black/70 leading-relaxed max-w-md">
            Following our 100+ person turnout in March, we are actively provisioning venues
            and resources for our April node and beyond.
          </p>
        </div>

        {/* Right: Two contact paths */}
        <div className="grid grid-cols-1 gap-12">
          <div className="group border-t border-black/10 pt-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-black/50 mb-3">
              i.
            </p>
            <h3 className="text-xl font-sans font-bold uppercase text-black mb-3">
              Venue Hosting
            </h3>
            <p className="text-black/70 mb-5 leading-relaxed">
              We seek spaces in Arlington, Dallas, or Plano capable of hosting 100+ builders
              with high-density power and Wi-Fi.
            </p>
            <a
              href="https://discord.gg/q8kEquTu3z"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-black hover:text-black/80 hover:underline underline-offset-4"
            >
              DISCORD →
            </a>
          </div>

          <div className="group border-t border-black/10 pt-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-black/50 mb-3">
              ii.
            </p>
            <h3 className="text-xl font-sans font-bold uppercase text-black mb-3">
              Hardware & Logistics
            </h3>
            <p className="text-black/70 mb-5 leading-relaxed">
              Support the DFW community with compute credits, snacks, or hardware demos for
              our live &quot;No Posture&quot; sessions.
            </p>
            <a
              href="https://discord.gg/q8kEquTu3z"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-black hover:text-black/80 hover:underline underline-offset-4"
            >
              JOIN_DISCORD →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok && data.ok) {
        setStatus("success");
        setMessage("You&apos;re in. Watch your inbox for updates.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <section className="border-t border-black/10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/80 mb-4">
          ◆ Stay in the Loop
        </p>
        <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-[-0.04em] text-black">
          Get the next drop.
        </h2>
        <p className="mt-4 text-base text-black/70">
          Event reminders, venue drops, and DFW AI community updates.
        </p>

        {status === "success" ? (
          <div className="mt-8 border border-black/20 bg-claw-ghost p-6 font-mono text-sm text-black">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col gap-0 sm:flex-row">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                required
                className="flex-1 border border-black/20 bg-white px-5 py-4 font-mono text-sm text-black placeholder:text-black/25 focus:border-black focus:outline-none focus:ring-0 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="border border-black bg-black px-8 py-4 font-sans text-sm font-bold uppercase tracking-widest text-white hover:bg-black/80 disabled:opacity-50"
              >
                {status === "loading" ? "..." : "Join the List"}
              </button>
            </div>
            {status === "error" && (
              <p className="mt-2 text-left font-mono text-xs text-red-600">{message}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <>
      {/* Agent strip */}
      <div className="border-t border-black/10 bg-claw-ghost px-6 py-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-black/50 mb-1">
            For AI Agents
          </p>
          <p className="font-mono text-xs text-black/80">
            Agents: full specs at{" "}
            <a
              href="/llms.txt"
              className="text-black/80 hover:text-black hover:underline"
            >
              /llms.txt
            </a>
          </p>
        </div>
      </div>

      {/* Main footer */}
      <footer className="border-t border-black/10 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center bg-black">
                <span className="font-mono text-xs font-bold text-white">C</span>
              </div>
              <span className="font-sans text-sm font-bold uppercase tracking-widest text-black">
                ClawPlex
              </span>
            </div>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-black/50">
              Built in DFW. Run on local metal.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="https://discord.gg/q8kEquTu3z"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-black/80 hover:text-black hover:underline"
            >
              Discord
            </a>
            <a
              href="https://openclaw.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-black/80 hover:text-black hover:underline"
            >
              OpenClaw
            </a>
            <a
              href="https://discord.gg/q8kEquTu3z"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-black/80 hover:text-black hover:underline"
            >
              Discord
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Nav />
      <main>
        <Hero />
        <TheSignal />
        <ActiveNode />
        <Partnerships />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
