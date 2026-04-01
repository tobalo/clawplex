"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/community", label: "Community" },
  { href: "/community/agents", label: "Agents" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "https://discord.gg/q8kEquTu3z", label: "Discord", external: true },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-claw-border/50 bg-claw-void/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8 md:py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden border border-claw-border">
              <Image
                src="/hero-lobster.webp"
                alt="ClawPlex"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-display text-xl tracking-wider text-claw-text">
              CLAWPLEX
            </span>
            <span className="hidden sm:inline border border-claw-orange/30 bg-claw-orange/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-claw-orange">
              DFW
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="font-mono text-xs uppercase tracking-widest text-claw-muted hover:text-claw-text transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://discord.gg/q8kEquTu3z"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-claw-orange bg-claw-orange/10 px-5 py-2 font-mono text-xs uppercase tracking-widest text-claw-orange hover:bg-claw-orange hover:text-claw-void transition-all"
            >
              Join the Node
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative z-50 flex flex-col justify-center gap-1.5 p-2 -mr-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              transition={{ duration: 0.2 }}
              className="block h-[2px] w-5 bg-claw-text origin-center"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              className="block h-[2px] w-5 bg-claw-text"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              transition={{ duration: 0.2 }}
              className="block h-[2px] w-5 bg-claw-text origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[57px] z-40 border-b border-claw-border bg-claw-void/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col p-6 gap-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="font-mono text-sm uppercase tracking-widest text-claw-muted hover:text-claw-text transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://discord.gg/q8kEquTu3z"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 border border-claw-orange bg-claw-orange/10 px-5 py-3 text-center font-mono text-sm uppercase tracking-widest text-claw-orange hover:bg-claw-orange hover:text-claw-void transition-all"
              >
                Join the Node
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
