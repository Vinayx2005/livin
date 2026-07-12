import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, LogOut, Pencil } from "lucide-react";
import { adminTokenStorage } from "@/lib/admin-auth";
import { collections } from "@/data/collections";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin — LIVIN'" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!adminTokenStorage.get()) {
      navigate({ to: "/admin/login" });
      return;
    }
    setReady(true);
  }, [navigate]);

  const handleLogout = () => {
    adminTokenStorage.clear();
    navigate({ to: "/admin/login" });
  };

  const handleNewCollection = () => {
    const raw = window.prompt(
      "Slug for the new collection (URL-safe, e.g. 'oud-royale')",
    );
    if (!raw) return;
    const slug = raw
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    if (!slug) {
      window.alert("Slug must contain letters or numbers.");
      return;
    }
    if (collections.some((c) => c.slug === slug)) {
      window.alert(`A collection with slug "${slug}" already exists.`);
      return;
    }
    navigate({ to: "/admin/collections/$slug", params: { slug } });
  };

  if (!ready) return null;

  return (
    <main className="min-h-screen bg-ivory pt-[calc(5rem+50px)] pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <header className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-3">
              Admin
            </p>
            <h1 className="font-display italic text-4xl md:text-5xl text-navy-deep leading-tight">
              Gifting Collection
            </h1>
            <p className="mt-4 font-display text-navy-deep/70 text-lg max-w-xl">
              Edit any collection or add a new one. Saves commit to GitHub;
              Vercel redeploys automatically.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleNewCollection}
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-deep text-white text-[11px] uppercase tracking-[0.3em] hover:bg-navy transition-colors"
            >
              <Plus size={14} strokeWidth={1.5} /> New collection
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-3 border border-navy-deep/30 text-navy-deep text-[11px] uppercase tracking-[0.3em] hover:bg-navy-deep hover:text-white transition-colors"
            >
              <LogOut size={14} strokeWidth={1.5} /> Sign out
            </button>
          </div>
        </header>

        <ul className="divide-y divide-gold/15 border-y border-gold/15">
          {collections.map((c) => (
            <li key={c.slug} className="py-6 flex items-center gap-6">
              <div className="size-20 overflow-hidden bg-ivory border border-gold/15 shrink-0">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-1">
                  {c.tag}
                </p>
                <h2 className="font-display italic text-2xl md:text-3xl text-navy-deep truncate">
                  {c.name}
                </h2>
                <p className="mt-1 text-sm text-navy-deep/60 truncate">
                  /collections/{c.slug} · {c.price}
                </p>
              </div>
              <Link
                to="/admin/collections/$slug"
                params={{ slug: c.slug }}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-navy-deep/30 text-navy-deep text-[11px] uppercase tracking-[0.3em] hover:bg-navy-deep hover:text-white transition-colors"
              >
                <Pencil size={13} strokeWidth={1.5} /> Edit
              </Link>
            </li>
          ))}
        </ul>

        {collections.length === 0 && (
          <p className="text-center text-navy-deep/60 py-16">
            No collections yet. Click "New collection" to add the first one.
          </p>
        )}
      </div>
    </main>
  );
}
