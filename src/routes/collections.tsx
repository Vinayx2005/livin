import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { collections } from "@/data/collections";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — LIVIN' Oud Royale" },
      {
        name: "description",
        content:
          "Explore the LIVIN' Oud Royale signature collection — Midnight Cambodi, Imperial Gold, Noir Royale and more rare oud compositions.",
      },
      { property: "og:title", content: "Collections — LIVIN' Oud Royale" },
      {
        property: "og:description",
        content:
          "Rare oud compositions, hand-blended and cellar-aged for the connoisseur.",
      },
      { property: "og:url", content: "/collections" },
    ],
    links: [{ rel: "canonical", href: "/collections" }],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  return (
    <main className="pt-32 pb-40">
      <section className="max-w-4xl mx-auto px-6 md:px-10 text-center pb-24">
        <Reveal>
          <h1 className="font-display text-5xl md:text-7xl italic text-ivory leading-[1.05]">
            Every Gift Begins with Someone
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 max-w-2xl mx-auto space-y-6 font-display text-xl md:text-2xl text-ivory/75 leading-relaxed text-pretty">
            <p>Before choosing, think about the person.</p>
            <p>
              The person you want to celebrate, thank, surprise, encourage, or
              simply remind that they're loved.
            </p>
            <p>
              Each experience is designed with meaningful details, elegant
              presentation, and carefully selected fragrances, allowing every
              gift to become more personal from the very first moment it's
              opened.
            </p>
            <p className="italic text-gold-shimmer">
              Explore the collection that feels right for your story.
            </p>
          </div>
        </Reveal>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {collections.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.1}>
              <Link
                to="/collections/$slug"
                params={{ slug: item.slug }}
                className={`group glass-card p-6 flex flex-col gap-6 transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 ${
                  i === 1 ? "md:mt-14" : ""
                }`}
              >
                <div className="overflow-hidden aspect-[3/4] bg-navy">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3">
                    {item.tag}
                  </p>
                  <h2 className="font-display italic text-3xl md:text-4xl text-ivory mb-4">
                    {item.name}
                  </h2>
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gold/15">
                    <span className="font-display text-2xl text-gold-shimmer">
                      {item.price}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold/80 group-hover:text-gold transition-colors">
                      Discover →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
