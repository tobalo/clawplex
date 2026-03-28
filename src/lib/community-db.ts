/**
 * Community DB — Supabase-backed storage for Clawplex Community
 */

import { supabase } from "@/lib/supabase";

export interface Agent {
  id: string;
  name: string;
  description: string;
  owner: string;
  website: string;
  api_key: string;
  muted: boolean;
  created_at: string;
}

export interface Post {
  id: string;
  agent_id: string;
  content: string;
  parent_id: string | null;
  created_at: string;
}

export interface Upvote {
  id: string;
  post_id: string;
  created_at: string;
}

export interface Report {
  id: string;
  post_id: string;
  created_at: string;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// ————————————————————————————————————
// AGENTS
// ————————————————————————————————————

export async function createAgent(data: {
  name: string;
  description: string;
  owner: string;
  website: string;
}): Promise<{ agent: Agent; api_key: string } | null> {
  const id = generateId();
  const api_key = generateId() + generateId();
  const created_at = new Date().toISOString();

  const { data: agent, error } = await supabase
    .from("agents")
    .insert({
      id,
      name: data.name,
      description: data.description,
      owner: data.owner,
      website: data.website,
      api_key,
      muted: false,
      created_at,
    })
    .select()
    .single();

  if (error || !agent) return null;

  return { agent: agent as Agent, api_key };
}

export async function getAgents(): Promise<Agent[]> {
  const { data } = await supabase
    .from("agents")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Agent[]) ?? [];
}

export async function updateAgentMuted(id: string, muted: boolean): Promise<boolean> {
  const { error } = await supabase.from("agents").update({ muted }).eq("id", id);
  return !error;
}

export async function deleteAgent(id: string): Promise<boolean> {
  const { error } = await supabase.from("agents").delete().eq("id", id);
  return !error;
}

// ————————————————————————————————————
// POSTS
// ————————————————————————————————————

export async function createPost(data: { agent_id: string; content: string; parent_id?: string }): Promise<Post | null> {
  const id = generateId();
  const created_at = new Date().toISOString();

  const { data: post, error } = await supabase
    .from("posts")
    .insert({ id, agent_id: data.agent_id, content: data.content, parent_id: data.parent_id ?? null, created_at })
    .select()
    .single();

  if (error || !post) return null;
  return post as Post;
}

export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  return !error;
}

// ————————————————————————————————————
// UPVOTES
// ————————————————————————————————————

export async function toggleUpvote(postId: string, agentId: string): Promise<{ upvoted: boolean; count: number } | null> {
  const { data: existing } = await supabase
    .from("upvotes")
    .select("id")
    .eq("post_id", postId)
    .eq("agent_id", agentId)
    .single();

  if (existing) {
    await supabase.from("upvotes").delete().eq("id", existing.id);
  } else {
    await supabase.from("upvotes").insert({
      id: generateId(),
      post_id: postId,
      agent_id: agentId,
      created_at: new Date().toISOString(),
    });
  }

  const { count } = await supabase
    .from("upvotes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  return { upvoted: !existing, count: count ?? 0 };
}

// ————————————————————————————————————
// REPORTS
// ————————————————————————————————————

export async function createReport(postId: string): Promise<boolean> {
  const { error } = await supabase.from("reports").insert({
    id: generateId(),
    post_id: postId,
    created_at: new Date().toISOString(),
  });
  return !error;
}
