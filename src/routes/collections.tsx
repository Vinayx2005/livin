import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import cambodi from "@/assets/collection-cambodi.jpg";
import gold from "@/assets/collection-gold.jpg";
import noir from "@/assets/collection-noir.jpg";

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

const items = [
  {
    name: "Midnight Cambodi",
    tag: "Intense · Resinous",
    price: "£420",
    image: cambodi,
    story:
      "A grand, moonlit interpretation of Cambodian oud aged in ancient cedar barrels for eighteen seasons.",
    notes: ["Saffron", "Pink Pepper", "Taif Rose", "Leather", "Cambodi Oud", "Amber"],
  },
  {
    name: "Imperial Gold",
    tag: "Bright · Opulent",
    price: "£380",
    image: gold,
    story:
      "A crown of citrus and white flowers laid upon a bed of white oud — an homage to the golden hours of a royal court.",
    notes: ["Bergamot", "Cardamom", "Jasmine Sambac", "White Oud", "Musk", "Sandalwood"],
  },
  {
    name: "Noir Royale",
    tag: "Smoky · Eternal",
    price: "£460",
    image: noir,
    story:
      "Aged oud drawn from the deepest resin veins, wrapped in incense smoke and violet leaf.",
    notes: ["Incense", "Black Plum", "Violet Leaf", "Cedar", "Aged Oud", "Patchouli"],
  },
];

function CollectionsPage() {
  return (
    <main className="pt-32 pb-40">
      <section className="max-w-6xl mx-auto px-6 md:px-10 text-center pb-24">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6">
            The Reserve
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-6xl md:text-8xl italic text-ivory leading-[0.95]">
            The Collection
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl mx-auto font-display text-xl md:text-2xl text-ivory/70 leading-relaxed">
            Three signatures. One heritage. Each vessel a chapter in the long
            history of oud.
          </p>
        </Reveal>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-32">
        {items.map((item, i) => (
          <Reveal key={item.name}>
            <article
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="overflow-hidden aspect-[4/5] glass-card p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">
                  {item.tag}
                </p>
                <h2 className="font-display italic text-5xl md:text-6xl text-ivory mb-6">
                  {item.name}
                </h2>
                <p className="text-ivory/70 leading-relaxed font-light mb-10 max-w-md">
                  {item.story}
                </p>
                <div className="mb-10">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80 mb-4">
                    Notes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.notes.map((n) => (
                      <span
                        key={n}
                        className="text-xs px-3 py-1.5 border border-gold/25 text-ivory/80 rounded-full"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="font-display text-3xl text-gold-shimmer">
                    {item.price}
                  </span>
                  <Link
                    to="/contact"
                    className="px-8 py-3 border border-gold/50 text-gold text-[10px] uppercase tracking-[0.3em] hover:bg-gold hover:text-navy-deep transition-colors"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
