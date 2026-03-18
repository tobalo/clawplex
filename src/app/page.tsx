"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: "951a1825-4a6d-446b-a043-d2d633e03415",
        email: email,
        subject: "New ClawPlex Newsletter Signup",
      }),
    });

    const data = await response.json();
    
    if (data.success) {
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
      {/* Hero - Image Only */}
      <section className="w-full">
        <img
          src="/hero-lobster.jpg"
          alt="Cowboy riding a lobster over Dallas"
          className="w-full h-[40vh] md:h-[50vh] object-cover object-center"
        />
      </section>

      {/* Content - Below Image */}
      <section className="px-4 md:px-6 py-8 md:py-12 -mt-2 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-extrabold text-[#E0E0E0] tracking-tight mb-3">
              BUILD TOGETHER.<br />CODE IN TEXAS.
            </h1>
            <p className="text-[#E0E0E0]/70 text-base md:text-lg mb-6">
              DFW's community for AI builders, tinkerers, and anyone curious about what's next.
            </p>
            <a
              href="https://discord.gg/q8kEquTu3z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#FF4500] text-white font-[family-name:var(--font-space-grotesk)] font-bold px-6 py-2.5 md:px-8 md:py-3 rounded-lg hover:scale-105 transition-transform text-base md:text-lg"
            >
              JOIN THE DISCORD
            </a>
          </motion.div>
        </div>
      </section>

      {/* Event Section */}
      <section className="px-4 md:px-6 py-6 md:py-8 bg-[#1A1B23]">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-[#FF4500]/30 rounded-lg p-4 md:p-5 text-center"
          >
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#FF4500] uppercase tracking-widest mb-1">
              Next Event
            </p>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl md:text-2xl font-bold text-[#E0E0E0] mb-1">
              CLAWCON DFW
            </h2>
            <p className="text-[#E0E0E0]/60 text-sm mb-3">
              Arlington, TX
            </p>
            <a
              href="https://luma.com/clawcondfw?tk=k8qExi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#00D4FF] hover:underline font-medium text-sm"
            >
              RSVP on Luma →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Real Talk Section */}
      <section className="px-4 md:px-6 py-8 md:py-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 md:mb-8"
          >
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#FF4500] uppercase tracking-widest mb-1">
              What We're About
            </p>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-4xl font-bold text-[#E0E0E0]">
              REAL TALK
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {[
              {
                title: "Monthly Meetups",
                desc: "Show up, show off what you're building, learn from others.",
              },
              {
                title: "Real Connections",
                desc: "Build relationships with other builders in the DFW area.",
              },
              {
                title: "All-Skill Levels",
                desc: "Newbie or vet. If you're curious, you belong here.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 md:p-5"
              >
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-base md:text-lg font-bold text-[#E0E0E0] mb-1">
                  {item.title}
                </h3>
                <p className="text-[#E0E0E0]/60 text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Combined: Email Signup + Footer */}
      <section className="bg-[#1A1B23] px-4 md:px-6 py-8 md:py-10">
        <div className="max-w-xl mx-auto text-center">
          {/* Email Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#FF4500] uppercase tracking-widest mb-1">
              Stay in the Loop
            </p>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-[#E0E0E0] mb-2">
              GET ON THE LIST
            </h2>
            <p className="text-[#E0E0E0]/60 text-sm mb-4">
              Be the first to know about ClawCon and upcoming meetups.
            </p>
            
            {status === "success" ? (
              <div className="bg-[#FF4500]/20 border border-[#FF4500]/30 rounded-lg p-3 text-[#FF4500] text-sm">
                {message}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  required
                  className="flex-1 bg-[#0A0B10] border border-white/10 rounded-lg px-3 py-2.5 text-[#E0E0E0] placeholder:text-[#E0E0E0]/30 focus:outline-none focus:border-[#FF4500] disabled:opacity-50 text-sm"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[#FF4500] text-white font-[family-name:var(--font-space-grotesk)] font-bold px-4 py-2.5 rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {status === "loading" ? "..." : "SUBMIT"}
                </button>
              </form>
            )}
            
            {status === "error" && (
              <p className="text-red-400 text-xs mb-4">{message}</p>
            )}
          </motion.div>

          {/* Footer Links */}
          <div className="pt-4 border-t border-white/5">
            <p className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#E0E0E0] text-base">
              ClawPlex
            </p>
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#E0E0E0]/50 mt-0.5">
              Dallas-Fort Worth, TX
            </p>
            <div className="flex flex-col gap-1 mt-3">
              <a
                href="https://discord.gg/q8kEquTu3z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E0E0E0]/60 hover:text-[#E0E0E0] text-sm"
              >
                Join Discord
              </a>
              <a
                href="https://openclaw.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E0E0E0]/40 hover:text-[#E0E0E0] text-xs"
              >
                OpenClaw
              </a>
            </div>
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#E0E0E0]/30 mt-4">
              Built in DFW. Ran on Local Metal.
            </p>
          </div>
        </div>
      </section>

      {/* For Agents */}
      <section className="px-4 md:px-6 py-4 bg-[#0A0B10] border-t border-white/5">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#00D4FF] uppercase tracking-widest mb-1">
            For AI Agents
          </p>
          <p className="text-[#E0E0E0]/60 text-xs mb-2">
            Agents: full info at <span className="text-[#00D4FF]">/llms.txt</span>
          </p>
          <a
            href="/llms.txt"
            target="_blank"
            className="text-[#00D4FF] hover:underline text-xs"
          >
            View API docs →
          </a>
        </div>
      </section>
    </div>
  );
}
