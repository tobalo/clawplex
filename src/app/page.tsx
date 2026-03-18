"use client";

import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F0E6] font-sans">
      {/* Hero Section - Full Width Image */}
      <section className="relative h-[70vh] min-h-[500px] w-full">
        <img 
          src="/hero-lobster.jpg" 
          alt="Cowboy riding a lobster over Dallas" 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Logo Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight">
            CLAWPLEX
          </h1>
          <p className="mt-4 text-xl text-white/80">
            Dallas-Fort Worth
          </p>
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xl text-[#8B4513]">
            Where DFW builds the future of AI. 
          </p>
        </div>
      </section>

      {/* Event Card */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border-2 border-[#CC5500] bg-white p-8 text-center">
            <p className="font-semibold text-[#CC5500] mb-2">
              NEXT EVENT
            </p>
            <h2 className="text-2xl font-bold text-[#8B4513] mb-1">
              ClawCon DFW
            </h2>
            <p className="text-[#8B4513]/70 mb-6">
              Arlington, TX
            </p>
            <a
              href="https://luma.com/clawcondfw?tk=k8qExi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#CC5500] font-semibold hover:underline"
            >
              RSVP on Luma <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-md flex flex-col gap-4">
          <a
            href="https://discord.gg/q8kEquTu3z"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center gap-3 rounded-full bg-[#CC5500] text-white font-semibold text-lg transition-transform hover:scale-[1.02]"
          >
            Join the Discord
          </a>
          <a
            href="https://luma.com/clawcondfw?tk=k8qExi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center gap-3 rounded-full border-2 border-[#CC5500] text-[#CC5500] font-semibold text-lg transition-transform hover:scale-[1.02]"
          >
            RSVP on Luma
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#8B4513] px-6 py-8">
        <div className="mx-auto max-w-md text-center">
          <p className="text-white/60 text-sm">
            Dallas-Fort Worth, TX
          </p>
          <p className="text-white/40 text-xs mt-1">
            A ClawCon Chapter
          </p>
        </div>
      </footer>
    </div>
  );
}
