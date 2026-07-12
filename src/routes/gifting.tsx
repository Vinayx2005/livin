import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import gifting from "@/assets/gifting-ritual.jpg";

export const Route = createFileRoute("/gifting")({
  head: () => ({
    meta: [
      { title: "Bespoke Gifting — LIVIN' Oud Royale" },
      {
        name: "description",
        content:
          "Corporate and personal gifting from LIVIN' Oud Royale. Hand-tied silk ribbons, wax-sealed notes and concierge personalization.",
      },
      { property: "og:title", content: "Bespoke Gifting — LIVIN' Oud Royale" },
      {
        property: "og:description",
        content:
          "Hand-tied silk, wax-sealed notes, concierge personalization — the LIVIN' gifting ritual.",
      },
      { property: "og:url", content: "/gifting" },
    ],
    links: [{ rel: "canonical", href: "/gifting" }],
  }),
  component: GiftingPage,
});

const services = [
  {
    title: "Personal Gifting",
    text: "Hand-written calligraphy card, wax-sealed presentation and signature LIVIN' velvet box.",
  },
  {
    title: "Corporate Editions",
    text: "Custom-engraved flacons, embossed logos and curated fragrance sets for the most discerning gestures.",
  },
  {
    title: "Bespoke Composition",
    text: "Reserve an hour with our master perfumer to compose a private fragrance for a single recipient.",
  },
];

function GiftingPage() {
  return (
    <main className="pt-[calc(5rem+50px)] pb-40">
      <section className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6">
              The Ritual
            </p>
            <h1 className="font-display text-6xl md:text-7xl italic text-navy-deep leading-[0.95] mb-8">
              The Art of Gifting
            </h1>
            <p className="font-display text-xl md:text-2xl text-navy-deep/75 leading-relaxed max-w-md">
              Presentation is a performance. Every reveal at LIVIN' is
              choreographed — from the weight of the box to the whisper of silk.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="overflow-hidden aspect-square">
            <img
              src={gifting}
              alt="Hands tying a gold silk ribbon on a navy velvet gift box"
              width={1200}
              height={1200}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-40 grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.12}>
            <div className="glass-card p-10 h-full">
              <div className="text-gold text-2xl mb-6">◆</div>
              <h3 className="font-display italic text-3xl text-navy-deep mb-4">
                {s.title}
              </h3>
              <p className="text-navy-deep/70 font-display font-light leading-relaxed">
                {s.text}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-6 mt-40 text-center">
        <Reveal>
          <h2 className="font-display italic text-4xl md:text-5xl text-gold-shimmer mb-8">
            Speak With Our Concierge
          </h2>
          <p className="text-navy-deep/70 leading-relaxed font-display font-light mb-10 max-w-xl mx-auto">
            Whether a single reveal or a hundred, our concierge team will orchestrate
            every detail — from packaging to delivery to the whispered card that
            accompanies each vessel.
          </p>
          <Link
            to="/contact"
            className="inline-block px-12 py-4 bg-navy-deep text-white text-[10px] uppercase tracking-[0.4em] hover:bg-navy transition-colors"
          >
            Begin Enquiry
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
