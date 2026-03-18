"use client";

import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F0E6] font-sans">
      {/* Hero - Full bleed image, no overlay text */}
      <section className="relative w-full h-screen max-h-[800px]">
        <img 
          src="/hero-lobster.jpg" 
          alt="Cowboy riding a lobster over Dallas" 
          className="h-full w-full object-cover"
        />
      </section>

      {/* About - Offset, less centered */}
      <section className="px-6 py-16 -mt-20 relative z-10">
        <div className="max-w-lg ml-auto pr-8">
          <h1 className="text-5xl md:text-7xl font-black text-[#CC5500] leading-[0.9] tracking-tighter">
            CLAW<br/>PLEX
          </h1>
          <p className="mt-6 text-xl text-[#8B4513] max-w-xs">
            Where DFW builds the future of AI.
          </p>
        </div>
      </section>

      {/* Event - Offset card, less rounded */}
      <section className="px-6 pb-12">
        <div className="max-w-sm ml-6">
          <div className="bg-white p-6 shadow-[8px_8px_0_#CC5500]">
            <p className="text-xs font-bold text-[#CC5500] uppercase tracking-widest mb-1">
              Next Event
            </p>
            <h2 className="text-2xl font-bold text-[#8B4513]">
              ClawCon DFW
            </h2>
            <p className="text-[#8B4513]/70 mb-4">
              Arlington, TX
            </p>
            <a
              href="https://luma.com/clawcondfw?tk=k8qExi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#CC5500] font-bold hover:underline"
            >
              RSVP <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Actions - Full width, less rounded */}
      <section className="px-6 pb-16">
        <div className="flex flex-col gap-4 max-w-sm ml-6">
          <a
            href="https://discord.gg/q8kEquTu3z"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#CC5500] text-white font-bold text-center py-4 shadow-[4px_4px_0_#8B4513] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#8B4513] transition-all"
          >
            Join the Discord
          </a>
          <a
            href="https://luma.com/clawcondfw?tk=k8qExi"
            target="_blank"
            rel="noopener noreferrer"
            className="block border-2 border-[#CC5500] text-[#CC5500] font-bold text-center py-4 hover:bg-[#CC5500] hover:text-white transition-colors"
          >
            RSVP on Luma
          </a>
        </div>
      </section>

      {/* Footer - Simple, less padded */}
      <footer className="bg-[#8B4513] px-6 py-6">
        <div className="flex justify-between items-center">
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
