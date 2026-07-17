import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Two clients — the browser client uses the anon key and lives in the client
// bundle (safe to expose). The server client uses the service_role key and
// only ever runs inside server functions / route loaders. Never import the
// server client from a file that ends up in the client bundle.

// Read env vars at module scope but DO NOT throw here. A missing var only
// becomes an error at the point of use, so the rest of the app can still
// boot and show a readable error instead of a blank crash page.
//
// Vite inlines import.meta.env.VITE_* into the client bundle at build time
// but the SSR bundle on Vercel doesn't always get the inlining, so we fall
// back to process.env at runtime on the server.
function readEnv(name: string): string | undefined {
  const fromVite = (import.meta.env as Record<string, string | undefined>)[name];
  if (fromVite) return fromVite.trim();
  if (typeof process !== "undefined" && process.env && process.env[name]) {
    return process.env[name]?.trim();
  }
  return undefined;
}

const SUPABASE_URL = readEnv("VITE_SUPABASE_URL");
const SUPABASE_ANON_KEY = readEnv("VITE_SUPABASE_ANON_KEY");

function requireUrlAndAnon() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
    );
  }
  return { url: SUPABASE_URL, anon: SUPABASE_ANON_KEY };
}

// Lazy singleton so the module can be imported safely even if env vars
// aren't set yet (e.g. during a first deploy).
let _browser: SupabaseClient | null = null;

/**
 * Browser client — uses the public anon key. Handles auth (login, sign out,
 * session persistence in localStorage). Throws only when actually used
 * without env vars.
 */
export const supabaseBrowser: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    if (!_browser) {
      const { url, anon } = requireUrlAndAnon();
      _browser = createClient(url, anon, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          storageKey: "livin:supabase-session",
        },
      });
    }
    return Reflect.get(_browser, prop, _browser);
  },
});

/**
 * Build a server client. Called inside server functions. Uses
 * SUPABASE_SERVICE_ROLE_KEY (server-only) so mutations bypass RLS.
 */
export function createSupabaseServer(): SupabaseClient {
  const { url } = requireUrlAndAnon();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured on the server.",
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
