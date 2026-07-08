import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import oud from "@/assets/story-oud.jpg";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — LIVIN' Oud Royale" },
      {
        name: "description",
        content:
          "The heritage of LIVIN' Oud Royale — a house rooted in ancient agarwood, master perfumery and the ritual of the reveal.",
      },
      { property: "og:title", content: "Our Story — LIVIN' Oud Royale" },
      {
        property: "og:description",
        content:
          "Heritage, provenance and the ritual of the reveal — the story of the House of LIVIN'.",
      },
      { property: "og:url", content: "/story" },
    ],
    links: [{ rel: "canonical", href: "/story" }],
  }),
  component: StoryPage,
});

const chapters = [
  {
    n: "I",
    title: "From the Forests",
    text: "Our agarwood is sourced from the oldest sustainably managed forests of Cambodia, Assam and Kalimantan — trees whose resin has been aged inside their own hearts for decades.",
  },
  {
    n: "II",
    title: "In the Atelier",
    text: "Every composition is blended by hand in our Dubai atelier and cellar-aged in French oak for a minimum of nine months, until the oud settles into its full baritone.",
  },
  {
    n: "III",
    title: "At the Reveal",
    text: "Each flacon is presented as a moment: a hand-tied silk ribbon, a wax-sealed note, and a bottle cradled in navy velvet — the hush before the pour.",
  },
];

function StoryPage() {
  return (
    <main className="pt-32 pb-40">
      <section className="max-w-4xl mx-auto px-6 text-center pb-24">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6">
            Our Heritage
          </p>
          <h1 className="font-display italic text-6xl md:text-8xl text-ivory leading-[0.95]">
            A Century of Resin
          </h1>
        </Reveal>
      </section>

      <Reveal>
        <div className="max-w-6xl mx-auto px-6 mb-32 overflow-hidden aspect-[16/9]">
          <img
            src={oud}
            alt="Aged agarwood logs and oud chips on a dark surface"
            width={1400}
            height={900}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </Reveal>

      <div className="max-w-4xl mx-auto px-6 space-y-24">
        {chapters.map((c, i) => (
          <Reveal key={c.n} delay={i * 0.1}>
            <div className="grid grid-cols-[auto_1fr] gap-10 items-start">
              <div className="font-display italic text-6xl text-gold-shimmer leading-none">
                {c.n}
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-ivory mb-5">
                  {c.title}
                </h2>
                <p className="text-ivory/75 leading-relaxed font-light text-lg">
                  {c.text}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="max-w-3xl mx-auto px-6 text-center mt-40">
        <Reveal>
          <blockquote className="font-display italic text-3xl md:text-4xl text-ivory/85 leading-relaxed">
            "A great oud does not announce itself — it is remembered before it
            is smelled."
          </blockquote>
          <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-gold">
            — House Motto
          </p>
        </Reveal>
      </section>
    </main>
  );
}
