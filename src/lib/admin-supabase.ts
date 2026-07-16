// Admin-side helpers backed by Supabase.
//
// - saveCollectionFn: server function that verifies the caller's Supabase
//   access token, then upserts the collection row via the service_role
//   client. RLS is bypassed intentionally — the auth check gates access.

import { createServerFn } from "@tanstack/react-start";
import type { Collection } from "@/data/collections";

async function assertAuthenticated(accessToken: unknown): Promise<void> {
  if (typeof accessToken !== "string" || !accessToken) {
    throw new Error("Not authorised — no session token provided.");
  }
  const { createSupabaseServer } = await import("./supabase");
  const client = createSupabaseServer();
  const { data, error } = await client.auth.getUser(accessToken);
  if (error || !data?.user) {
    throw new Error("Not authorised — session token invalid or expired.");
  }
}

/**
 * Server function: upsert a collection into the `collections` table.
 * Caller must be an authenticated Supabase user. `isNew` guards against
 * accidentally overwriting an existing slug.
 */
export const saveCollectionFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (
      typeof data !== "object" ||
      data === null ||
      typeof (data as { accessToken?: unknown }).accessToken !== "string" ||
      typeof (data as { collection?: unknown }).collection !== "object" ||
      (data as { collection?: object }).collection === null
    ) {
      throw new Error("Invalid payload.");
    }
    const collection = (data as { collection: Record<string, unknown> })
      .collection;
    if (typeof collection.slug !== "string" || !collection.slug) {
      throw new Error("Collection is missing a slug.");
    }
    return {
      accessToken: (data as { accessToken: string }).accessToken,
      collection: collection as unknown as Collection,
      isNew: !!(data as { isNew?: boolean }).isNew,
    };
  })
  .handler(async ({ data }) => {
    await assertAuthenticated(data.accessToken);

    const { createSupabaseServer } = await import("./supabase");
    const client = createSupabaseServer();
    const slug = data.collection.slug;

    if (data.isNew) {
      const { data: existing, error: readErr } = await client
        .from("collections")
        .select("slug")
        .eq("slug", slug)
        .maybeSingle();
      if (readErr) throw new Error(`Read failed: ${readErr.message}`);
      if (existing) {
        throw new Error(`Slug "${slug}" already exists. Pick a different slug.`);
      }
    }

    const { error } = await client
      .from("collections")
      .upsert({ slug, data: data.collection }, { onConflict: "slug" });
    if (error) throw new Error(`Save failed: ${error.message}`);

    return {
      ok: true as const,
      message: data.isNew
        ? "Collection created. It's live now."
        : "Saved. Changes are live.",
    };
  });
