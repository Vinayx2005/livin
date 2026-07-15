import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { collections } from "@/data/collections";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Gifting Collections | Thoughtfully Curated by Livin'" },
      {
        name: "description",
        content:
          "Explore Livin's thoughtfully curated gifting collections featuring luxury fragrances, personalized notes, and premium presentation for every meaningful occasion.",
      },
      {
        name: "keywords",
        content:
          "Luxury gift collections, Premium gifting, Gift collections, Luxury perfume gift, Personalized gifting, Birthday gift, Anniversary gift, Luxury fragrance, Luxury gift box, Meaningful gifts, Curated gifts, Livin collections",
      },
      {
        property: "og:title",
        content: "Gifting Collections | Thoughtfully Curated by Livin'",
      },
      {
        property: "og:description",
        content:
          "Explore Livin's thoughtfully curated gifting collections featuring luxury fragrances, personalized notes, and premium presentation for every meaningful occasion.",
      },
      { property: "og:url", content: "/collections" },
    ],
    links: [{ rel: "canonical", href: "/collections" }],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  return (
    <main className="pt-[calc(5rem+50px)] pb-40">
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left — copy */}
          <div>
            <Reveal>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl italic text-navy-deep leading-[1.05]">
                Every Gift Begins with Someone
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 space-y-6 font-display text-xl md:text-2xl text-navy-deep/75 leading-relaxed text-pretty">
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
          </div>

          {/* Right — photograph */}
          <Reveal delay={0.2}>
            <div className="relative overflow-hidden aspect-[4/5] rounded-2xl shadow-[0_20px_60px_rgba(20,42,92,0.12)]">
              <img
                src="/livin-bottle-box.jpg"
                alt="LIVIN' bottle presented in a navy velvet gift box"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Navy invitation banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-navy-deep px-8 md:px-16 py-16 md:py-24 shadow-[0_20px_60px_rgba(20,42,92,0.15)]">
            <h2 className="font-display italic text-3xl md:text-4xl text-ivory leading-[1.05] text-center">
              Before choosing, think about the person.
            </h2>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-14 bg-gold" />
              <span className="block size-2 rotate-45 border border-gold" />
              <span className="h-px w-14 bg-gold" />
            </div>
          </div>
        </Reveal>
      </section>

      <div
        id="collection-grid"
        className={`mx-auto px-6 md:px-10 scroll-mt-32 ${
          collections.length <= 2 ? "max-w-5xl" : "max-w-7xl"
        }`}
      >
        <div
          className={`grid grid-cols-1 gap-8 md:gap-10 ${
            collections.length <= 2 ? "md:grid-cols-2" : "md:grid-cols-3"
          }`}
        >
          {collections.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.1}>
              <Link
                to="/collections/$slug"
                params={{ slug: item.slug }}
                className={`group glass-card p-6 flex flex-col gap-6 transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 ${
                  collections.length >= 3 && i === 1 ? "md:mt-14" : ""
                }`}
              >
                <div className="overflow-hidden aspect-square bg-ivory">
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
                  <h2 className="font-display italic text-3xl md:text-4xl text-navy-deep mb-3">
                    {item.name}
                  </h2>
                  <p className="font-display text-xl md:text-2xl text-navy-deep/70 leading-snug">
                    {item.story}
                  </p>
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
