"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { faqs, hosts, nextEvent, valueProps, venueDetails, venueHighlights } from "@/content/site";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();
    
    if (response.ok && data.ok) {
      setStatus("success");
      setMessage("You're in! Watch your inbox for updates.");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(data.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B10]">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.18),transparent_35%),linear-gradient(180deg,rgba(10,11,16,0.2),rgba(10,11,16,0.92))]" />
        <div className="relative w-full h-[46vh] min-h-[360px]">
          <Image
            src="/hero-lobster.jpg"
            alt="Cowboy riding a lobster over Dallas"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <section className="relative z-10 px-4 pb-10 md:px-6 md:pb-14">
          <div className="mx-auto -mt-24 max-w-5xl rounded-[2rem] border border-white/10 bg-[#0A0B10]/82 p-6 shadow-2xl shadow-[#000]/30 backdrop-blur md:-mt-28 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid gap-8 md:grid-cols-[1.4fr_0.9fr]"
            >
              <div>
                <p className="mb-3 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.35em] text-[#00D4FF]">
                  DFW OpenClaw Chapter
                </p>
                <h1 className="mb-4 font-[family-name:var(--font-space-grotesk)] text-4xl font-extrabold tracking-tight text-[#E0E0E0] md:text-6xl">
                  BUILD TOGETHER.
                  <br />
                  CODE IN TEXAS.
                </h1>
                <p className="max-w-2xl text-base text-[#E0E0E0]/72 md:text-lg">
                  ClawPlex is the Dallas-Fort Worth home base for builders shipping AI projects,
                  local-model experiments, and live demos with other people doing the work.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://discord.gg/q8kEquTu3z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-[#FF4500] px-6 py-3 font-[family-name:var(--font-space-grotesk)] text-base font-bold text-white transition-transform hover:scale-[1.02]"
                  >
                    Join the Discord
                  </a>
                  <a
                    href={nextEvent.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border border-[#00D4FF]/50 bg-[#00D4FF]/8 px-6 py-3 font-[family-name:var(--font-space-grotesk)] text-base font-bold text-[#DDF8FF] transition-colors hover:bg-[#00D4FF]/14"
                  >
                    RSVP Now
                  </a>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-[#FF4500]/20 bg-[#141621] p-5">
                <p className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.3em] text-[#FF4500]">
                  Next Event
                </p>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#E0E0E0]">
                  {nextEvent.name}
                </h2>
                <p className="mt-1 text-sm text-[#E0E0E0]/60">
                  {nextEvent.venue}, {nextEvent.city}
                </p>
                <p className="mt-4 text-sm leading-6 text-[#E0E0E0]/70">{nextEvent.summary}</p>
                <p className="mt-4 text-sm leading-6 text-[#E0E0E0]/68">{nextEvent.address}</p>
                <div className="mt-4 space-y-2">
                  {venueHighlights.map((highlight) => (
                    <p key={highlight} className="text-xs leading-5 text-[#E0E0E0]/55">
                      {highlight}
                    </p>
                  ))}
                </div>
                <a
                  href={nextEvent.venueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex text-sm font-medium text-[#00D4FF] hover:underline"
                >
                  View venue details →
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]"
          >
            <div>
              <h2 className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.3em] text-[#FF4500]">
                What Is ClawPlex
              </h2>
              <p className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#E0E0E0] md:text-4xl">
                A local AI chapter for people who actually build.
              </p>
            </div>
            <div className="space-y-4 text-base leading-7 text-[#E0E0E0]/72">
              <p>
                ClawPlex is where Dallas-Fort Worth builders meet to show work, compare notes,
                and trade practical AI lessons without turning the night into a slide deck parade.
              </p>
              <p>
                It is for first-time builders, cracked local-model tinkerers, startup teams, and
                anyone who wants a room with signal instead of hype.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#12141d] px-4 py-12 md:px-6 md:py-14">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <p className="mb-1 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.3em] text-[#FF4500]">
              Why People Show Up
            </p>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#E0E0E0] md:text-4xl">
              Local signal, not generic tech-event theater.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {valueProps.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <h3 className="mb-2 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-[#E0E0E0]">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-[#E0E0E0]/65">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-14">
        <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-white/10 bg-[#131722] p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-6 md:grid-cols-[1fr_1.1fr]"
          >
            <div>
              <p className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.3em] text-[#FF4500]">
                Venue
              </p>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#E0E0E0]">
                {venueDetails.title}
              </h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-[#E0E0E0]/70">
                {venueDetails.description}
              </p>
              <div className="mt-5 space-y-3">
                {venueDetails.facts.map((fact) => (
                  <div key={fact} className="rounded-xl border border-white/8 bg-black/15 p-4">
                    <p className="text-sm leading-6 text-[#E0E0E0]/68">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-14">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[1.5rem] border border-white/10 bg-[#151823] p-6"
          >
            <h2 className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.3em] text-[#00D4FF]">
              Meet the Hosts
            </h2>
            <p className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#E0E0E0]">
              Builders from DFW, for DFW.
            </p>
            {hosts.map((host) => (
              <div key={host.name} className="mt-4 rounded-xl border border-white/8 bg-black/15 p-4">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-[#E0E0E0]">
                  {host.name}
                </h3>
                <p className="mt-1 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.25em] text-[#FF4500]">
                  {host.role}
                </p>
                <p className="mt-3 text-sm leading-6 text-[#E0E0E0]/68">{host.description}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[1.5rem] border border-white/10 bg-[#151823] p-6"
          >
            <h2 className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.3em] text-[#00D4FF]">
              FAQ
            </h2>
            <p className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#E0E0E0]">
              First meetup?
            </p>
            <div className="mt-5 space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-white/8 bg-black/15 p-4">
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-[#E0E0E0]">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#E0E0E0]/68">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#1A1B23] px-4 py-10 md:px-6 md:py-12">
        <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-[#FF4500]/20 bg-[#10121a] p-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.3em] text-[#FF4500]">
              Stay in the Loop
            </p>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#E0E0E0] md:text-4xl">
              Join the list
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#E0E0E0]/65">
              Get the next meetup drop, event reminders, and updates from the DFW chapter.
            </p>

            {status === "success" ? (
              <div className="mt-5 rounded-lg border border-[#FF4500]/30 bg-[#FF4500]/20 p-3 text-sm text-[#FF4500]">
                {message}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mx-auto mt-5 max-w-2xl">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    id="newsletter-email"
                    type="email"
                    aria-label="Email address"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    required
                    className="flex-1 rounded-lg border border-white/10 bg-[#0A0B10] px-3 py-3 text-sm text-[#E0E0E0] placeholder:text-[#E0E0E0]/30 focus:border-[#FF4500] focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="rounded-lg bg-[#FF4500] px-5 py-3 font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === "loading" ? "Joining..." : "Join the list"}
                  </button>
                </div>
              </form>
            )}

            {status === "error" && <p className="mt-3 text-xs text-red-400">{message}</p>}

            <div className="mt-8 border-t border-white/5 pt-5">
              <p className="font-[family-name:var(--font-space-grotesk)] text-base font-bold text-[#E0E0E0]">
                ClawPlex
              </p>
              <p className="mt-0.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#E0E0E0]/50">
                Dallas-Fort Worth, TX
              </p>
              <div className="mt-3 flex flex-col gap-1">
                <a
                  href="https://discord.gg/q8kEquTu3z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#E0E0E0]/60 hover:text-[#E0E0E0]"
                >
                  Join Discord
                </a>
                <a
                  href="https://openclaw.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#E0E0E0]/40 hover:text-[#E0E0E0]"
                >
                  OpenClaw
                </a>
              </div>
              <p className="mt-4 font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#E0E0E0]/30">
                Built in DFW. Run on local metal.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#0A0B10] px-4 py-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-1 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-widest text-[#00D4FF]">
            For AI Agents
          </p>
          <p className="mb-2 text-xs text-[#E0E0E0]/60">
            Agents: full info at <span className="text-[#00D4FF]">/llms.txt</span>
          </p>
          <a href="/llms.txt" target="_blank" className="text-xs text-[#00D4FF] hover:underline">
            View API docs →
          </a>
        </div>
      </section>
    </div>
  );
}
