"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

function NewsletterForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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
      <div className="border border-claw-border bg-claw-surface-2 p-4 text-sm text-claw-muted">
        You&apos;re in! Watch your inbox for updates.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        required
        disabled={status === "loading"}
        className="flex-1 border border-claw-border bg-claw-surface-2 px-4 py-3 font-mono text-sm text-claw-text placeholder:text-claw-dim focus:outline-none focus:border-claw-orange disabled:opacity-50 transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-claw-orange text-claw-void border border-claw-orange font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-claw-orange/90 transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-red-500 text-xs mt-2 sm:mt-0 sm:ml-3 self-center font-mono">
          Something went wrong.
        </p>
      )}
    </form>
  );
}

export default function NewsletterPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <main className="pt-16">
        {/* Page header */}
        <div className="border-b border-claw-border grid-bg px-5 md:px-8 py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-3">
              Newsletter
            </p>
            <h1 className="font-display text-4xl md:text-6xl tracking-wider text-claw-text">
              THE DFW AI DISPATCH
            </h1>
            <p className="mt-4 text-lg text-claw-muted">
              Events, community wins, and local AI builds — straight to your
              inbox. No marketing fluff. Just signal.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-5 md:px-8 py-12 md:py-16">
          {/* Subscribe card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-claw-border bg-claw-surface p-8"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-claw-orange mb-2">
              Subscribe
            </p>
            <h2 className="font-display text-2xl tracking-wider text-claw-text mb-1">
              GET THE NEXT ISSUE.
            </h2>
            <p className="text-sm text-claw-dim mb-6">
              Sent per event + occasional monthly digest. No spam, ever.
            </p>
            <NewsletterForm />
          </motion.div>

          {/* Archive placeholder */}
          <div className="mt-12 text-center py-12 border border-dashed border-claw-border">
            <p className="font-mono text-xs text-claw-dim uppercase tracking-widest">
              Issue #1 coming soon — subscribe to be first
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
