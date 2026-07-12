// Server-side helpers for committing collection JSON back to GitHub.
// The admin form calls saveCollectionFn which:
//   1. Verifies the admin token.
//   2. Loads the existing file's SHA (if any).
//   3. PUTs the new content via GitHub Contents API.
// Vercel picks up the push and redeploys automatically.

import { createServerFn } from "@tanstack/react-start";
import { assertAdminToken } from "./admin-auth";

function getEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} env var is not configured.`);
  return v;
}

function ghHeaders() {
  const token = getEnv("GITHUB_TOKEN");
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

function contentPath(slug: string) {
  return `content/collections/${slug}.json`;
}

async function getExistingSha(slug: string): Promise<string | undefined> {
  const repo = getEnv("GITHUB_REPO"); // e.g., "Vinayx2005/livin"
  const branch = process.env.GITHUB_BRANCH || "main";
  const url = `https://api.github.com/repos/${repo}/contents/${contentPath(
    slug,
  )}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, { headers: ghHeaders() });
  if (res.status === 404) return undefined;
  if (!res.ok) {
    throw new Error(`GitHub read failed (${res.status}): ${await res.text()}`);
  }
  const body = (await res.json()) as { sha: string };
  return body.sha;
}

async function commitFile(opts: {
  slug: string;
  content: string;
  message: string;
  sha?: string;
}): Promise<{ commitSha: string }> {
  const repo = getEnv("GITHUB_REPO");
  const branch = process.env.GITHUB_BRANCH || "main";
  const url = `https://api.github.com/repos/${repo}/contents/${contentPath(
    opts.slug,
  )}`;
  const body: Record<string, unknown> = {
    message: opts.message,
    content: Buffer.from(opts.content, "utf8").toString("base64"),
    branch,
  };
  if (opts.sha) body.sha = opts.sha;
  const res = await fetch(url, {
    method: "PUT",
    headers: ghHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`GitHub write failed (${res.status}): ${await res.text()}`);
  }
  const json = (await res.json()) as { commit: { sha: string } };
  return { commitSha: json.commit.sha };
}

/**
 * Server function: commits the provided collection JSON to
 * content/collections/<slug>.json on GitHub. Handles create + update.
 */
export const saveCollectionFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (
      typeof data !== "object" ||
      data === null ||
      typeof (data as { token?: unknown }).token !== "string" ||
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
      token: (data as { token: string }).token,
      collection,
      isNew: !!(data as { isNew?: boolean }).isNew,
    };
  })
  .handler(async ({ data }) => {
    await assertAdminToken(data.token);
    const { collection, isNew } = data;
    const slug = collection.slug as string;
    const contentText = JSON.stringify(collection, null, 2) + "\n";

    let sha: string | undefined;
    try {
      sha = await getExistingSha(slug);
    } catch (err) {
      throw new Error(
        `Could not read existing collection on GitHub: ${
          err instanceof Error ? err.message : String(err)
        }`,
      );
    }

    if (isNew && sha) {
      throw new Error(
        `Slug "${slug}" already exists on GitHub. Pick a different slug.`,
      );
    }

    const message = sha
      ? `admin: update ${slug} collection`
      : `admin: add ${slug} collection`;

    const { commitSha } = await commitFile({
      slug,
      content: contentText,
      message,
      sha,
    });

    return {
      ok: true as const,
      commitSha,
      message: sha
        ? "Saved. Vercel will redeploy in a minute or two."
        : "Created. Vercel will redeploy in a minute or two.",
    };
  });
