import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { adminLoginFn, adminTokenStorage } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin · Sign in — LIVIN'" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // If we already have a token, jump straight to /admin.
  useEffect(() => {
    if (adminTokenStorage.get()) {
      navigate({ to: "/admin" });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const result = await adminLoginFn({ data: { password } });
      adminTokenStorage.set(result.token);
      navigate({ to: "/admin" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to sign in.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 bg-ivory">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-4">
            Livin'
          </p>
          <h1 className="font-display italic text-4xl md:text-5xl text-navy-deep leading-tight">
            Admin
          </h1>
          <p className="mt-6 font-display text-navy-deep/70 text-lg">
            Sign in to manage the Gifting Collection.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card p-8 md:p-10 space-y-6"
        >
          <div>
            <label
              htmlFor="password"
              className="text-[10px] uppercase tracking-[0.3em] text-gold block mb-3"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoFocus
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-gold/25 focus:border-gold text-navy-deep pb-3 outline-none transition-colors font-display text-lg"
            />
          </div>
          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting || !password}
            className="w-full py-4 bg-navy-deep text-white text-[10px] uppercase tracking-[0.4em] hover:bg-navy disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
