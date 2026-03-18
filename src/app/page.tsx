"use client";

import { ChevronRight, MessageCircle, Calendar, Users, Terminal, Sparkles } from "lucide-react";

const features = [
  {
    marker: "i.",
    title: "Demos",
    description: "See what people are building with their agents.",
  },
  {
    marker: "ii.",
    title: "Lightning Talks",
    description: "5 minutes. No slides required. Just share what you know.",
  },
  {
    marker: "iii.",
    title: "Open Hack",
    description: "Bring your laptop. Break things. Ask the dumb questions.",
  },
  {
    marker: "iv.",
    title: "IRL",
    description: "The part where you put the screen down and talk to humans.",
  },
];

const links = [
  {
    label: "Join Discord",
    href: "https://discord.gg/q8kEquTu3z",
  },
  {
    label: "ClawCon DFW",
    href: "https://luma.com/clawcondfw?tk=k8qExi",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F0E6] text-[#8B4513] font-serif">
      {/* Hero Section - Burnt Orange */}
      <section className="relative overflow-hidden bg-[#CC5500] px-6 py-20">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC41Ij48cGF0aCBkPSJNMjAgMjBoMlYyMEgyMHptLTQgNGgydjJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />
        </div>

        <div className="relative mx-auto max-w-md text-center">
          <p className="mb-4 font-sans text-sm tracking-[0.2em] text-[#FFE4C4]">
            Chapter II
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-[#FFE4C4]">
            Your agent wants to meet other agents.
            <br />
            <span className="italic">So do you.</span>
          </h1>

          <p className="mb-8 text-lg text-[#FFE4C4]/90">
            ClawPlex is where DFW builders show up, plug in, and break things.
            Demos, hacks, and real talk about what's working.
          </p>

          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FFE4C4] px-8 font-sans font-semibold text-[#CC5500] transition-transform hover:scale-105"
              >
                {link.label}
                <ChevronRight className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Event Card - Cream */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border-2 border-[#CC5500] bg-white p-6">
            <p className="mb-2 font-sans text-xs tracking-widest text-[#CC5500]">
              NEXT EVENT — Coming Soon
            </p>
            <p className="mb-4 font-sans text-sm text-[#8B4513]/60">
              ClawCon DFW • Arlington, TX
            </p>
            <a
              href="https://luma.com/clawcondfw?tk=k8qExi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#CC5500] hover:underline"
            >
              RSVP on Luma <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Program Section - White */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border border-[#8B4513]/20 bg-white p-6">
            <h2 className="mb-6 font-sans text-xs tracking-widest text-[#8B4513]/50">
              WHAT WE DO
            </h2>

            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="border-b border-[#8B4513]/10 pb-6 last:border-0 last:pb-0">
                  <p className="mb-1 font-serif text-2xl italic text-[#8B4513]/30">
                    {feature.marker}
                  </p>
                  <h3 className="mb-1 font-serif text-xl font-bold text-[#8B4513]">
                    {feature.title}
                  </h3>
                  <p className="font-serif italic text-[#8B4513]/70">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup - Cream */}
      <section className="bg-[#FFE4C4] px-6 py-12">
        <div className="mx-auto max-w-md text-center">
          <p className="mb-2 font-serif italic text-[#8B4513]/70">
            Stay in the loop
          </p>
          <h2 className="mb-4 font-serif text-3xl font-bold text-[#CC5500]">
            Get on the list
          </h2>
          <p className="mb-6 font-sans text-xs tracking-widest text-[#8B4513]/60">
            FOR FUTURE EVENTS
          </p>
          <p className="mb-6 font-serif italic text-[#8B4513]/70">
            We'll email you when the next one's announced. Nothing else.
          </p>
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@email.com"
              className="h-12 rounded-full border border-[#8B4513]/30 bg-white px-6 font-sans text-[#8B4513] placeholder-[#8B4513]/40 focus:border-[#CC5500] focus:outline-none"
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-[#CC5500] font-sans font-semibold text-white transition-transform hover:scale-105"
            >
              NOTIFY ME
            </button>
          </form>
        </div>
      </section>

      {/* Footer - Dark Orange */}
      <footer className="bg-[#8B4513] px-6 py-10">
        <div className="mx-auto max-w-md text-center">
          <p className="mb-6 font-sans text-xs tracking-widest text-white/60">
            SUPPORTED BY
          </p>
          <div className="mb-6 flex justify-center gap-6">
            {/* Placeholder logos - can be replaced */}
            <div className="h-8 w-8 rounded border border-white/30" />
            <div className="h-8 w-8 rounded border border-white/30" />
            <div className="h-8 w-8 rounded border border-white/30" />
          </div>
          <p className="font-sans text-xs tracking-widest text-white/60">
            A COMMUNITY THING FOR OPENCLAW • DALLAS-FORT WORTH, TX
          </p>
          <p className="mt-2 font-sans text-xs text-white/40">
            Agents, look here
          </p>
        </div>
      </footer>
    </div>
  );
}
