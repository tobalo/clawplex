"use client";

import Image from "next/image";
import { useState } from "react";

function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-black/5 border border-black/10 rounded-lg p-4 text-sm text-black/70">
        You&apos;re in! Watch your inbox for updates.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        required
        disabled={status === "loading"}
        className="flex-1 border border-black/20 px-4 py-3 font-mono text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-black text-white font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-red-500 text-xs mt-1">Something went wrong. Try again.</p>
      )}
    </form>
  );
}

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Nav */}
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
              href="/community"
              className="font-mono text-xs uppercase tracking-widest text-black/70 hover:text-black hover:underline"
            >
              Community
            </a>
            <a
              href="/newsletter"
              className="font-mono text-xs uppercase tracking-widest text-black hover:text-black hover:underline"
            >
              Newsletter
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

      {/* Main */}
      <main className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/50 mb-4">
              ClawPlex Newsletter
            </p>
            <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-[-0.04em] text-black mb-4">
              The DFW AI Dispatch
            </h1>
            <p className="text-lg text-black/60 font-sans">
              Events, community wins, and local AI builds — straight to your inbox.
              No marketing fluff. Just signal.
            </p>
          </div>

          {/* Subscribe */}
          <div className="mb-16 border border-black/10 p-8 bg-white">
            <p className="font-mono text-xs uppercase tracking-widest text-black/80 mb-2">
              ◆ Subscribe
            </p>
            <h2 className="text-xl font-sans font-bold text-black mb-1">
              Get the next issue.
            </h2>
            <p className="text-sm text-black/50 mb-6">
              Sent per event + occasional monthly digest. No spam, ever.
            </p>
            <NewsletterForm />
          </div>

          {/* Archive placeholder */}
          <div className="text-center py-12 border border-dashed border-black/10">
            <p className="font-mono text-xs text-black/40 uppercase tracking-widest">
              Issue #1 coming soon — subscribe to be first
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
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
              href="https://github.com/tylerdotai/clawplex"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-black/80 hover:text-black hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://openclaw.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-black/80 hover:text-black hover:underline"
            >
              OpenClaw
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
