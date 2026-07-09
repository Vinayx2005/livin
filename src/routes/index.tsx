import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Hero3D } from "@/components/Hero3D";
import { Reveal } from "@/components/Reveal";
import { collections } from "@/data/collections";

import gifting from "@/assets/gifting-ritual.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

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
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="mt-10"
          >
            <Link
              to="/collections"
              className="pointer-events-auto inline-block px-10 py-4 border border-gold/50 text-gold text-[10px] uppercase tracking-[0.35em] hover:bg-gold hover:text-navy-deep transition-colors"
            >
              Explore Collection
            </Link>
          </motion.div>
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
            Best gifts are remembered
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="font-display text-2xl md:text-3xl leading-relaxed text-ivory/85 text-pretty">
            Every Livin' experience is thoughtfully curated to help you express
            love, gratitude, and celebration in a way that stays long after the
            moment has passed.
          </p>
        </Reveal>
      </section>

      {/* ORNAMENTAL DIVIDER */}
      <div className="flex items-center justify-center px-12 pb-20">
        <div className="ornament-line flex-1 opacity-30" />
        <div className="mx-8 text-gold">
          <div className="size-2 rotate-45 border border-gold" />
        </div>
        <div className="ornament-line flex-1 opacity-30" />
      </div>

      {/* WHY LIVIN' EXISTS */}
      <section className="max-w-3xl mx-auto px-6 text-center pb-40">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6">
            Our Purpose
          </p>
          <h2 className="font-display italic text-4xl md:text-6xl text-ivory leading-[1.05] mb-12">
            Why Livin' Exists
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="font-display text-xl md:text-2xl italic text-gold-shimmer leading-relaxed mb-10 text-pretty">
            Most gifts end when they're opened. We wanted ours to begin there.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="space-y-8 font-display text-lg md:text-xl text-ivory/80 leading-relaxed text-pretty">
            <p>
              Livin' was born from one simple belief. People rarely remember the
              price of a gift. They remember how someone made them feel.
            </p>
            <p>
              That's why every Livin' experience is designed with thoughtful
              details, from elegant presentation to heartfelt messages, so your
              gift becomes more than something they receive.
            </p>
            <p className="text-gold-shimmer italic">
              It becomes something they feel.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-14">
            <Link
              to="/story"
              className="inline-block px-10 py-4 border border-gold/50 text-gold text-[10px] uppercase tracking-[0.35em] hover:bg-gold hover:text-navy-deep transition-colors"
            >
              Read Our Story
            </Link>
          </div>
        </Reveal>
      </section>

      {/* THE LIVIN' EXPERIENCE */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
          <div>
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6">
                Our Craft
              </p>
              <h2 className="font-display italic text-4xl md:text-6xl text-ivory leading-[1.05] mb-14">
                The Livin' Experience
              </h2>
            </Reveal>
            <div className="space-y-8">
              {[
                {
                  label: "Thoughtfully Curated",
                  body: "Every element is chosen with intention.",
                },
                {
                  label: "Personalized",
                  body: "Because no meaningful relationship is generic.",
                },
                {
                  label: "Emotion First",
                  body: "The fragrance complements the story. It never replaces it.",
                },
                {
                  label: "Designed to be Remembered",
                  body: "The experience continues long after the ribbon is untied.",
                },
              ].map((item, i) => (
                <Reveal key={item.label} delay={0.1 + i * 0.08}>
                  <div className="flex gap-6 border-t border-gold/15 pt-6">
                    <span className="font-display italic text-xl text-gold-shimmer shrink-0 tabular-nums pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display italic text-2xl md:text-3xl text-ivory mb-2">
                        {item.label}
                      </h3>
                      <p className="text-base md:text-lg text-ivory/70 leading-relaxed font-light">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Placeholder photo */}
          <Reveal delay={0.2}>
            <div
              className="relative overflow-hidden aspect-[4/5] glass-card"
              role="img"
              aria-label="Placeholder for Livin' experience photograph"
            >
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 40%, rgba(201,162,76,0.14) 0%, rgba(10,23,51,0.6) 55%, rgba(5,10,25,0.85) 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-gold/60">
                <div className="size-16 border border-gold/30 rounded-full flex items-center justify-center">
                  <div className="size-2 rotate-45 border border-gold/50" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.5em] text-gold/70">
                  Photograph
                </p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-ivory/40">
                  Placeholder — to be replaced
                </p>
              </div>
            </div>
          </Reveal>
        </div>
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
                  Featured Collections
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
                <Link
                  to="/collections/$slug"
                  params={{ slug: c.slug }}
                  className={`group glass-card p-8 flex flex-col gap-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 ${
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
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h4 className="font-display text-3xl text-ivory mb-2">
                      {c.name}
                    </h4>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-5">
                      {c.tag}
                    </p>
                    <div className="text-sm text-ivory/70 space-y-1 font-light mb-6">
                      <p>
                        <span className="text-gold/70">Top —</span>{" "}
                        {c.layers.top}
                      </p>
                      <p>
                        <span className="text-gold/70">Heart —</span>{" "}
                        {c.layers.heart}
                      </p>
                      <p>
                        <span className="text-gold/70">Base —</span>{" "}
                        {c.layers.base}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gold/15">
                      <span className="font-display text-xl text-gold-shimmer">
                        {c.price}
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
      </section>

      {/* ORNAMENTAL DIVIDER */}
      <div className="py-20 flex items-center justify-center px-12">
        <div className="ornament-line flex-1 opacity-30" />
        <div className="mx-8 text-gold">
          <div className="size-2 rotate-45 border border-gold" />
        </div>
        <div className="ornament-line flex-1 opacity-30" />
      </div>

      {/* OUR PROMISE */}
      <section className="max-w-4xl mx-auto px-6 text-center pb-32">
        <Reveal>
          <h2 className="font-display italic text-4xl md:text-5xl mb-10 text-gold-shimmer">
            Our Promise
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="font-display text-2xl md:text-3xl leading-relaxed text-ivory/85 text-pretty space-y-6">
            <p>
              We don't believe expensive gifts create meaningful moments.
              Thoughtful ones do. That's why every Livin' experience begins
              with one question.
            </p>
            <p className="italic">
              &ldquo;How do you want them to feel?&rdquo;
            </p>
            <p>Everything else follows.</p>
          </div>
        </Reveal>
      </section>

      {/* ORNAMENTAL DIVIDER */}
      <div className="pb-20 flex items-center justify-center px-12">
        <div className="ornament-line flex-1 opacity-30" />
        <div className="mx-8 text-gold">
          <div className="size-2 rotate-45 border border-gold" />
        </div>
        <div className="ornament-line flex-1 opacity-30" />
      </div>

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
              More Than a Gift. A Moment to Hold On To.
            </h3>
            <p className="text-ivory/70 leading-relaxed font-light mb-10 max-w-md">
              Every meaningful relationship deserves to be celebrated. Whenever
              you're ready, we'll help you create a moment worth remembering.
            </p>
            <Link
              to="/collections"
              className="inline-block px-10 py-4 border border-gold/50 text-gold text-[10px] uppercase tracking-[0.3em] hover:bg-gold hover:text-navy-deep transition-colors"
            >
              Explore Collections
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
