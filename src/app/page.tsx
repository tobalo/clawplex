"use client";

import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      {/* Hero - Full bleed image */}
      <section className="relative w-full h-[55vh] md:h-[70vh]">
        <img 
          src="/hero-lobster.jpg" 
          alt="Cowboy riding a lobster over Dallas" 
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </section>

      {/* About */}
      <section className="px-4 md:px-6 -mt-16 relative z-10">
        <div className="max-w-lg mx-auto md:mx-0 md:ml-auto md:pr-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#CC5500] tracking-tight">
            CLAWPLEX
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-xl text-[#8B4513]">
            Where DFW builds the future of AI.
          </p>
          <p className="mt-2 text-[#8B4513]/70 text-sm md:text-base">
            Beginners welcome. Veterans encouraged. All skills level.
          </p>
        </div>
      </section>

      {/* Event */}
      <section className="px-4 md:px-6 py-10 md:py-12">
        <div className="max-w-sm mx-auto md:mx-0 md:ml-4">
          <div className="bg-white p-5 md:p-6">
            <p className="text-xs font-semibold text-[#CC5500] uppercase tracking-wider mb-1">
              Next Event
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-[#8B4513]">
              ClawCon DFW
            </h2>
            <p className="text-[#8B4513]/70 mb-4">
              Arlington, TX
            </p>
            <a
              href="https://luma.com/clawcondfw?tk=k8qExi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#CC5500] font-semibold hover:underline"
            >
              RSVP <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="px-4 md:px-6 pb-12">
        <div className="flex flex-col gap-3 max-w-sm mx-auto md:mx-0 md:ml-4">
          <a
            href="https://discord.gg/q8kEquTu3z"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#CC5500] text-white font-semibold py-4 px-6 hover:bg-[#b84a00] transition-colors"
          >
            Join the Discord
          </a>
          <a
            href="https://luma.com/clawcondfw?tk=k8qExi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border-2 border-[#CC5500] text-[#CC5500] font-semibold py-4 px-6 hover:bg-[#CC5500] hover:text-white transition-colors"
          >
            RSVP on Luma
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#8B4513] px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-white/60 text-sm">
            Dallas-Fort Worth, TX
          </p>
          <p className="text-white/40 text-xs">
            A ClawCon Chapter
          </p>
        </div>
      </footer>
    </div>
  );
}
