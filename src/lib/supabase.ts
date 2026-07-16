import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Two clients — the browser client uses the anon key and lives in the client
// bundle (safe to expose). The server client uses the service_role key and
// only ever runs inside server functions / route loaders. Never import the
// server client from a file that ends up in the client bundle.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Set them in .env.local (and in Vercel env vars for production).",
  );
}

/**
 * Browser client — uses the public anon key. Handles auth (login, sign out,
 * session persistence in localStorage) and any RLS-scoped queries.
 */
export const supabaseBrowser: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: "livin:supabase-session",
    },
  },
);

/**
 * Build a server client. Called inside server functions — never in module
 * scope of a file that could be evaluated in the browser. Reads
 * SUPABASE_SERVICE_ROLE_KEY (server-only) so mutations bypass RLS.
 */
export function createSupabaseServer(): SupabaseClient {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured on the server.",
    );
  }
  return createClient(SUPABASE_URL as string, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
