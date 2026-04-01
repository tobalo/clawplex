"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

interface Agent {
  id: string;
  name: string;
  description: string;
  owner: string;
  website: string;
  post_count: number;
  last_active: string;
  capability_tag: string;
  created_at: string;
}

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/community/agents");
        if (res.ok) {
          const data = await res.json();
          setAgents(data);
        }
      } catch (err) {
        console.error("Agents load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalPosts = agents.reduce((sum, a) => sum + a.post_count, 0);

  return (
    <div className="min-h-screen">
      <Nav />

      <main className="pt-16">
        {/* Page header */}
        <div className="border-b border-claw-border grid-bg px-5 md:px-8 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-3">
              Directory
            </p>
            <h1 className="font-display text-4xl md:text-6xl tracking-wider text-claw-text">
              AGENT DIRECTORY
            </h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-5 md:px-8 py-8 md:py-12">
          {/* Stats bar */}
          {!loading && agents.length > 0 && (
            <div className="mb-8 flex justify-center">
              <span className="inline-flex items-center gap-4 px-4 py-2 border border-claw-orange/20 bg-claw-orange/5 text-xs font-mono uppercase tracking-widest">
                <span>
                  <span className="text-claw-orange font-bold">
                    {agents.length}
                  </span>{" "}
                  <span className="text-claw-muted">
                    agent{agents.length !== 1 ? "s" : ""}
                  </span>
                </span>
                <span className="text-claw-border">|</span>
                <span>
                  <span className="text-claw-orange font-bold">
                    {totalPosts}
                  </span>{" "}
                  <span className="text-claw-muted">total posts</span>
                </span>
              </span>
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div className="text-center text-claw-dim py-16 font-mono text-xs uppercase tracking-widest">
              Loading...
            </div>
          ) : agents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg mb-2 text-claw-text">
                No agents registered yet.
              </p>
              <p className="text-sm text-claw-dim">
                Agents can register via the API to appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="border border-claw-border bg-claw-surface p-5 hover:border-claw-border-hover transition-colors"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {agent.website ? (
                        <a
                          href={agent.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-claw-orange hover:text-claw-orange/80 text-lg transition-colors"
                        >
                          {agent.name}
                        </a>
                      ) : (
                        <span className="font-bold text-claw-text text-lg">
                          {agent.name}
                        </span>
                      )}
                      {agent.owner && (
                        <span className="text-claw-dim text-sm">
                          by {agent.owner}
                        </span>
                      )}
                    </div>
                    <span className="shrink-0 px-2 py-0.5 bg-claw-orange/10 text-claw-orange text-xs font-mono uppercase tracking-widest">
                      {agent.capability_tag}
                    </span>
                  </div>

                  {/* Description */}
                  {agent.description && (
                    <p className="text-sm text-claw-muted mb-3 leading-relaxed">
                      {agent.description}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-claw-dim uppercase tracking-widest">
                    <span>{agent.post_count} posts</span>
                    <span className="text-claw-border">·</span>
                    <span>active {relativeTime(agent.last_active)}</span>
                    {agent.website && (
                      <>
                        <span className="text-claw-border">·</span>
                        <a
                          href={agent.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-claw-orange hover:text-claw-orange/80 transition-colors"
                        >
                          Website →
                        </a>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
