import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { collections } from "@/data/collections";


export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main>
      {/* HERO — editorial composition with a soft slanted feather */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#FCFBF8" }}
      >
        <div className="relative grid grid-cols-1 md:grid-cols-[minmax(0,44%)_minmax(0,56%)] items-stretch">
          {/* Left — copy */}
          <div className="flex items-center order-2 md:order-1 pt-12 md:pt-40 pb-16 md:pb-20 pl-4 md:pl-[calc(2.5rem+20px)] pr-6">
            <div className="w-full max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-navy-deep"
            >
              <span className="md:block">Some gifts are opened.</span>{" "}
              <span className="md:block">The best ones are</span>{" "}
              <span className="italic text-gold-shimmer md:block">
                remembered.
              </span>
            </motion.h1>

            {/* Line + diamond + line divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="mt-8 mb-8 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-gold" />
              <span className="block size-1.5 rotate-45 border border-gold" />
              <span className="h-px w-10 bg-gold" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.55 }}
              className="max-w-md font-display text-navy-deep/75 leading-relaxed text-xl md:text-2xl"
            >
              Every Livin' experience is thoughtfully curated to help you
              express love, gratitude, and celebration in a way that lingers
              long after the moment has passed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.8 }}
              className="mt-10"
            >
              <Link
                to="/collections"
                className="inline-flex items-center gap-3 bg-navy-deep text-white px-10 py-4 text-[11px] uppercase tracking-[0.35em] hover:bg-navy transition-colors"
              >
                Explore Collections
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </motion.div>
            </div>
          </div>

          {/* Right — product photo. Mobile: clean image on top. Desktop: slanted feather mask + overlap. */}
          <div className="order-1 md:order-2 pt-32 md:pt-0 md:h-full [&>*]:md:h-full">
            <Reveal delay={0.15}>
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[620px] w-full md:-ml-24 lg:-ml-32 md:w-[calc(100%+6rem)] lg:w-[calc(100%+8rem)]">
                <img
                  src="/hero-image.avif"
                  alt="LIVIN' bottle presented in its navy velvet box with a hand-written gift note"
                  className="hero-image-mask absolute inset-0 h-full w-full object-cover object-center"
                />
              </div>
            </Reveal>
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

      {/* HOUSE INTRO */}
      <section className="max-w-4xl mx-auto px-6 text-center pb-32">
        <Reveal>
          <h2 className="font-display italic text-4xl md:text-5xl mb-10 text-gold-shimmer">
            Best gifts are remembered
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="font-display text-2xl md:text-3xl leading-relaxed text-navy-deep/85 text-pretty">
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


      {/* THE LIVIN' EXPERIENCE */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
          <div>
            <Reveal>
              <h2 className="font-display italic text-4xl md:text-6xl text-navy-deep leading-[1.05] mb-14">
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
                      <h3 className="font-display italic text-2xl md:text-3xl text-navy-deep mb-2">
                        {item.label}
                      </h3>
                      <p className="font-display text-xl md:text-2xl text-navy-deep/70 leading-relaxed">
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
            <div className="relative overflow-hidden aspect-[4/5] glass-card">
              <img
                src="/livin-flatlay.jpg"
                alt="The Livin' experience — gold wrapping, velvet pouch, and thank-you card"
                width={1200}
                height={1500}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SIGNATURE COLLECTIONS */}
      <section className="px-6 md:px-10 pb-40">
        <div className={`mx-auto ${collections.length <= 2 ? "max-w-5xl" : "max-w-7xl"}`}>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <h3 className="font-display text-4xl md:text-6xl italic text-navy-deep">
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

          <div
            className={`grid grid-cols-1 gap-8 ${
              collections.length <= 2 ? "md:grid-cols-2" : "md:grid-cols-3"
            }`}
          >
            {collections.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.12}>
                <Link
                  to="/collections/$slug"
                  params={{ slug: c.slug }}
                  className={`group glass-card p-8 flex flex-col gap-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 ${
                    collections.length >= 3 && i === 1 ? "md:mt-16" : ""
                  }`}
                >
                  <div className="overflow-hidden aspect-square bg-ivory">
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
                    <h4 className="font-display text-3xl text-navy-deep mb-5">
                      {c.name}
                    </h4>
                    <div className="text-xl md:text-2xl text-navy-deep/70 space-y-1 font-display mb-6">
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
          <div className="font-display text-2xl md:text-3xl leading-relaxed text-navy-deep/85 text-pretty space-y-6">
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
              src="/livin-gift-box.jpg"
              alt="Livin' navy gift box tied with a gold satin bow"
              width={1200}
              height={1500}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div>
            <h3 className="font-display italic text-4xl md:text-5xl text-navy-deep leading-tight mb-8">
              More Than a Gift. A Moment to Hold On To.
            </h3>
            <p className="text-navy-deep/70 leading-relaxed font-display text-xl md:text-2xl mb-10 max-w-md">
              Every meaningful relationship deserves to be celebrated. Whenever
              you're ready, we'll help you create a moment worth remembering.
            </p>
            <Link
              to="/collections"
              className="inline-block px-10 py-4 border border-navy-deep/40 text-navy-deep text-[10px] uppercase tracking-[0.3em] hover:bg-navy-deep hover:text-white transition-colors"
            >
              Explore Collections
            </Link>
          </div>
        </Reveal>
      </section>

      {/* WHY LIVIN' EXISTS — editorial card (entire card is clickable) */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-40">
        <Reveal>
          <Link
            to="/story"
            className="group relative block overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(20,42,92,0.08)] border border-navy-deep/5 transition-shadow duration-500 hover:shadow-[0_28px_80px_rgba(20,42,92,0.15)]"
            style={{ backgroundColor: "#FCFBF8" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
              {/* Left — copy */}
              <div className="flex items-center px-8 md:px-12 lg:px-16 py-12 md:py-16">
                <div className="max-w-md">
                  <p className="text-sm uppercase tracking-[0.4em] text-gold mb-6">
                    Our Story
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-navy-deep leading-[1.1] mb-6">
                    Why Livin' Exists
                  </h2>
                  <div className="h-px w-12 bg-gold mb-8" />
                  <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-gold group-hover:text-navy-deep transition-colors">
                    Read the Livin' Story
                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </div>

              {/* Right — photograph */}
              <div className="relative min-h-[280px] md:min-h-[360px]">
                <img
                  src="/livin-flatlay.jpg"
                  alt="Livin' packaging — gold wrapping, velvet pouch, and a thank-you card"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </div>
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
