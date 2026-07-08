import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Hero3D } from "@/components/Hero3D";
import { Reveal } from "@/components/Reveal";

import cambodi from "@/assets/collection-cambodi.jpg";
import gold from "@/assets/collection-gold.jpg";
import noir from "@/assets/collection-noir.jpg";
import gifting from "@/assets/gifting-ritual.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const collections = [
  {
    slug: "midnight-cambodi",
    name: "Midnight Cambodi",
    tag: "Intense · Resinous",
    image: cambodi,
    notes: {
      top: "Saffron, Pink Pepper",
      heart: "Taif Rose, Leather",
      base: "Cambodi Oud, Amber",
    },
  },
  {
    slug: "imperial-gold",
    name: "Imperial Gold",
    tag: "Bright · Opulent",
    image: gold,
    notes: {
      top: "Bergamot, Cardamom",
      heart: "Jasmine Sambac",
      base: "White Oud, Musk",
    },
  },
  {
    slug: "noir-royale",
    name: "Noir Royale",
    tag: "Smoky · Eternal",
    image: noir,
    notes: {
      top: "Incense, Black Plum",
      heart: "Violet Leaf, Cedar",
      base: "Aged Oud, Patchouli",
    },
  },
];

function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* atmosphere */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, rgba(201,162,76,0.18) 0%, rgba(10,23,51,0) 55%)",
          }}
        />
        <Hero3D />

        <div className="relative z-30 text-center px-6 pointer-events-none">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gold uppercase tracking-[0.5em] text-[10px] md:text-xs mb-6"
          >
            The House of Livin'
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tight text-ivory"
          >
            Worth <span className="italic text-gold-shimmer">Gifting</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="mt-6 text-ivory/70 tracking-[0.35em] uppercase text-[10px] md:text-xs"
          >
            Because some gifts become memories.
          </motion.p>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 z-30">
          <div className="w-px h-14 bg-gradient-to-b from-gold to-transparent animate-shimmer" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-gold/80">
            Scroll
          </span>
        </div>
      </section>

      {/* ORNAMENTAL DIVIDER */}
      <div className="py-20 flex items-center justify-center px-12">
        <div className="ornament-line flex-1 opacity-30" />
        <div className="mx-8 text-gold">
          <div className="size-2 rotate-45 border border-gold" />
        </div>
        <div className="ornament-line flex-1 opacity-30" />
      </div>

      {/* HOUSE INTRO */}
      <section className="max-w-4xl mx-auto px-6 text-center pb-32">
        <Reveal>
          <h2 className="font-display italic text-4xl md:text-5xl mb-10 text-gold-shimmer">
            The House of LIVIN'
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="font-display text-2xl md:text-3xl leading-relaxed text-ivory/85 text-pretty">
            Rooted in the ancient heritage of the desert, we curate the most
            profound resins of the world. Each bottle is a vessel of history — a
            symphony of liquid gold distilled for those who understand that true
            luxury is found in the hush of the reveal.
          </p>
        </Reveal>
      </section>

      {/* SIGNATURE COLLECTIONS */}
      <section className="px-6 md:px-10 pb-40">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">
                  The Collection
                </p>
                <h3 className="font-display text-4xl md:text-6xl italic text-ivory">
                  Signature Fragrances
                </h3>
              </div>
              <Link
                to="/collections"
                className="text-[10px] uppercase tracking-[0.3em] text-gold border-b border-gold/40 pb-1 hover:border-gold self-start md:self-auto"
              >
                Discover All
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.12}>
                <article
                  className={`glass-card p-8 flex flex-col gap-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 ${
                    i === 1 ? "md:mt-16" : ""
                  }`}
                >
                  <div className="overflow-hidden aspect-[3/4] bg-navy">
                    <img
                      src={c.image}
                      alt={c.name}
                      width={800}
                      height={1000}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                    />
                  </div>
                  <div>
                    <h4 className="font-display text-3xl text-ivory mb-2">
                      {c.name}
                    </h4>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-5">
                      {c.tag}
                    </p>
                    <div className="text-sm text-ivory/70 space-y-1 font-light">
                      <p>
                        <span className="text-gold/70">Top —</span> {c.notes.top}
                      </p>
                      <p>
                        <span className="text-gold/70">Heart —</span>{" "}
                        {c.notes.heart}
                      </p>
                      <p>
                        <span className="text-gold/70">Base —</span>{" "}
                        {c.notes.base}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GIFTING BAND */}
      <section className="bg-gold text-navy-deep overflow-hidden relative">
        <div className="py-14 border-y border-navy-deep/10">
          <div className="flex whitespace-nowrap animate-marquee gap-16 will-change-transform">
            {[...Array(2)].map((_, k) => (
              <div key={k} className="flex gap-16">
                <span className="font-display italic text-4xl md:text-5xl">
                  Bespoke Gifting
                </span>
                <span className="text-gold">◆</span>
                <span className="font-display italic text-4xl md:text-5xl">
                  Corporate Personalisation
                </span>
                <span className="text-gold">◆</span>
                <span className="font-display italic text-4xl md:text-5xl">
                  The Royal Reveal
                </span>
                <span className="text-gold">◆</span>
                <span className="font-display italic text-4xl md:text-5xl">
                  Silk Ribbon Wrapping
                </span>
                <span className="text-gold">◆</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center py-14">
          <Link
            to="/gifting"
            className="inline-block px-12 py-4 border border-navy-deep/30 hover:bg-navy-deep hover:text-gold transition-all duration-500 uppercase text-[10px] tracking-[0.4em]"
          >
            Inquire for Gifting
          </Link>
        </div>
      </section>

      {/* STORY TEASER */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-40 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="overflow-hidden aspect-[4/5]">
            <img
              src={gifting}
              alt="The gifting ritual — silk ribbon on a navy velvet box"
              width={1200}
              height={1200}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-6">
              The Ritual
            </p>
            <h3 className="font-display italic text-4xl md:text-5xl text-ivory leading-tight mb-8">
              Presentation is a Performance
            </h3>
            <p className="text-ivory/70 leading-relaxed font-light mb-10 max-w-md">
              Every LIVIN' gift arrives in a hand-crafted lacquer box, cushioned
              in silk and accompanied by a wax-sealed note. Because the scent is
              only half the story.
            </p>
            <Link
              to="/story"
              className="inline-block px-10 py-4 border border-gold/50 text-gold text-[10px] uppercase tracking-[0.3em] hover:bg-gold hover:text-navy-deep transition-colors"
            >
              Read Our Story
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
