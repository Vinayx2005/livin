// Stateless admin auth. On successful login the server issues an HMAC token
// that the client stores in localStorage. Every mutating server function
// re-verifies the token, so a stolen token grants access only until
// AUTH_SECRET is rotated. Sufficient for a single-founder admin.
//
// node:crypto is imported dynamically inside handler bodies so Vite does not
// try to bundle it into the client build.

import { createServerFn } from "@tanstack/react-start";

const TOKEN_STORAGE_KEY = "livin:admin-token";
const TOKEN_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "AUTH_SECRET env var missing or too short (need >=16 chars).",
    );
  }
  return secret;
}

function getAdminPassword(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD env var is not configured.");
  return pw;
}

async function signToken(payload: string): Promise<string> {
  const { createHmac } = await import("node:crypto");
  const mac = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${mac}`;
}

async function verifyToken(token: unknown): Promise<boolean> {
  if (typeof token !== "string" || !token.includes(".")) return false;
  const lastDot = token.lastIndexOf(".");
  const payload = token.slice(0, lastDot);
  const providedMac = token.slice(lastDot + 1);

  const { createHmac, timingSafeEqual } = await import("node:crypto");
  let expected: string;
  try {
    expected = createHmac("sha256", getSecret()).update(payload).digest("hex");
  } catch {
    return false;
  }
  if (providedMac.length !== expected.length) return false;
  const a = Buffer.from(providedMac, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) return false;
  if (!timingSafeEqual(a, b)) return false;

  const [role, expStr] = payload.split(":");
  if (role !== "admin") return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  return true;
}

/** Server function: verify password and issue a signed token. */
export const adminLoginFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (
      typeof data !== "object" ||
      data === null ||
      typeof (data as { password?: unknown }).password !== "string"
    ) {
      throw new Error("Password required.");
    }
    return { password: (data as { password: string }).password };
  })
  .handler(async ({ data }) => {
    const { timingSafeEqual } = await import("node:crypto");
    const expected = getAdminPassword();
    const provided = data.password;
    const a = Buffer.from(provided, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      throw new Error("Incorrect password.");
    }
    const payload = `admin:${Date.now() + TOKEN_TTL_MS}`;
    return { token: await signToken(payload) };
  });

/** Called from mutating server functions to guard access. */
export async function assertAdminToken(token: unknown): Promise<void> {
  if (!(await verifyToken(token))) {
    throw new Error("Not authorised — admin token missing or invalid.");
  }
}

/** Client-side helpers. Safe to call from any React component. */
export const adminTokenStorage = {
  key: TOKEN_STORAGE_KEY,
  get(): string | null {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  },
  set(token: string): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } catch {
      // storage disabled — fail silently
    }
  },
  clear(): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {
      // ignore
    }
  },
};
