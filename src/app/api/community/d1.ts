import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { D1Database } from "@cloudflare/workers-types";

// Extend CloudflareEnv to include our DB binding
declare global {
  interface CloudflareEnv {
    DB: D1Database;
  }
}

export function getDb(): D1Database {
  const { env } = getCloudflareContext({ async: false });
  return env.DB;
}
