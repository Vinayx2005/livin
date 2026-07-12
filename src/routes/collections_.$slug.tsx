import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  collections,
  getCollection,
  getOtherCollections,
} from "@/data/collections";
import { useCart } from "@/lib/cart";

const productFaqs = [
  {
    q: "Can I include a personalized message?",
    a: "Yes. Every collection allows you to include a heartfelt message that becomes part of the gifting experience.",
  },
  {
    q: "Do you deliver across India?",
    a: "Yes. We currently ship across India.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders are usually delivered within 5–7 business days.",
  },
  {
    q: "Can I return my order?",
    a: "We currently do not offer returns. Replacements are available only for products damaged during transit.",
  },
];

export const Route = createFileRoute("/collections_/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    return collection;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found — LIVIN' Oud Royale" }],
      };
    }
    const title = `${loaderData.name} — LIVIN' Oud Royale`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.story },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.story },
        {
          property: "og:url",
          content: `/collections/${loaderData.slug}`,
        },
      ],
      links: [
        {
          rel: "canonical",
          href: `/collections/${loaderData.slug}`,
        },
      ],
    };
  },
  component: CollectionDetailPage,
  notFoundComponent: NotFoundPage,
});

function CollectionDetailPage() {
  const item = Route.useLoaderData();
  const others = getOtherCollections(item.slug);
  const { add } = useCart();
  const navigate = useNavigate();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    add(item.slug);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  const handleBuy = () => {
    add(item.slug);
    navigate({ to: "/cart" });
  };

  return (
    <main className="pt-[calc(5rem+50px)] pb-40">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-12">
        <Link
          to="/collections"
          className="text-[10px] uppercase tracking-[0.4em] text-gold/70 hover:text-gold transition-colors"
        >
          ← The Collection
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal>
            <div className="overflow-hidden aspect-[4/5] glass-card p-4">
              <img
                src={item.image}
                alt={item.name}
                width={1000}
                height={1250}
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6">
                {item.tag}
              </p>
              <h1 className="font-display italic text-5xl md:text-7xl text-navy-deep leading-[0.95] mb-8">
                {item.name}
              </h1>
              <p className="font-display text-xl md:text-2xl text-navy-deep/75 leading-relaxed mb-10 max-w-md">
                {item.story}
              </p>
              <div className="mb-10">
                <span className="font-display text-4xl text-gold-shimmer block mb-6">
                  {item.price}
                </span>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <button
                    type="button"
                    onClick={handleBuy}
                    className="flex-1 px-8 py-4 bg-navy-deep text-white text-[10px] uppercase tracking-[0.3em] hover:bg-navy transition-colors"
                  >
                    Buy Now
                  </button>
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="flex-1 px-8 py-4 border border-navy-deep/40 text-navy-deep text-[10px] uppercase tracking-[0.3em] hover:bg-navy-deep hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    {justAdded ? (
                      <>
                        <Check size={14} strokeWidth={1.5} /> Added
                      </>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ornamental divider */}
      <div className="py-24 flex items-center justify-center px-12">
        <div className="ornament-line flex-1 opacity-30" />
        <div className="mx-8 text-gold">
          <div className="size-2 rotate-45 border border-gold" />
        </div>
        <div className="ornament-line flex-1 opacity-30" />
      </div>

      {/* The Story Behind This Collection */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 text-center pb-24">
        <Reveal>
          <h2 className="font-display italic text-3xl md:text-5xl text-navy-deep leading-tight mb-12">
            The Story Behind This Collection
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-6 font-display text-xl md:text-2xl text-navy-deep/80 leading-relaxed text-pretty">
            <p>
              A meaningful gift is never about the product alone. It's about
              the pause before it's opened. The anticipation of discovering
              what's inside.
            </p>
            <p className="italic text-gold-shimmer">
              The smile that appears while reading a heartfelt note. The quiet
              realization that someone cared enough to make this moment
              special.
            </p>
            <p>
              This collection was created to celebrate those moments. Because
              long after the fragrance fades, it's the feeling that remains.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Ornamental divider */}
      <div className="pb-24 flex items-center justify-center px-12">
        <div className="ornament-line flex-1 opacity-30" />
        <div className="mx-8 text-gold">
          <div className="size-2 rotate-45 border border-gold" />
        </div>
        <div className="ornament-line flex-1 opacity-30" />
      </div>

      {/* What's Included */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: contents photo */}
          <Reveal>
            <div className="relative overflow-hidden aspect-[4/5] glass-card">
              <img
                src="/livin-flatlay.jpg"
                alt="Everything included in a Livin' collection — gold wrapping, velvet pouch, and thank-you card"
                width={1200}
                height={1500}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          {/* Right: content */}
          <div>
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6">
                The Experience
              </p>
              <h2 className="font-display italic text-4xl md:text-5xl text-navy-deep leading-tight mb-8">
                What's Included
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-display text-xl md:text-2xl text-navy-deep/80 leading-relaxed mb-8">
                Every Livin' collection is thoughtfully curated to create a
                complete gifting experience.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold/80 mb-5">
                Inside you'll find
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "A carefully selected luxury fragrance",
                  "Personalized gift note",
                  "Elegant presentation",
                  "Story card",
                  "Signature Livin' experience",
                ].map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-4 text-xl md:text-2xl text-navy-deep/85 font-display"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 rotate-45 border border-gold/70 shrink-0"
                    />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-display italic text-xl md:text-2xl text-gold-shimmer leading-relaxed">
                Every detail has been included with intention, ensuring the
                experience feels as meaningful as the gift itself.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ornamental divider */}
      <div className="pb-24 flex items-center justify-center px-12">
        <div className="ornament-line flex-1 opacity-30" />
        <div className="mx-8 text-gold">
          <div className="size-2 rotate-45 border border-gold" />
        </div>
        <div className="ornament-line flex-1 opacity-30" />
      </div>

      {/* Make It Personal */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Right side (order-2 on desktop): copy */}
          <div className="md:order-2">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6">
                Your Words
              </p>
              <h2 className="font-display italic text-4xl md:text-5xl text-navy-deep leading-tight mb-10">
                Make It Personal
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6 font-display text-xl md:text-2xl text-navy-deep/80 leading-relaxed text-pretty">
                <p>
                  Some of the most meaningful gifts are remembered because
                  they carry a part of the person who gave them.
                </p>
                <p>
                  Add your own heartfelt message and let your words become
                  part of the experience.
                </p>
                <p className="italic text-gold-shimmer">
                  Because no one can tell your story better than you.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Left side (order-1 on desktop): note card mockup */}
          <Reveal>
            <div className="md:order-1 relative">
              <div
                className="relative overflow-hidden aspect-[4/5] p-8 md:p-10"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f5eedc 100%)",
                  border: "1px solid rgba(201,162,76,0.25)",
                }}
              >
                <div className="h-full flex flex-col">
                  <p className="text-[9px] uppercase tracking-[0.5em] text-gold/70 mb-6">
                    A note from you
                  </p>
                  <div className="flex-1 space-y-4 font-display italic text-navy-deep/40 text-lg md:text-xl leading-loose">
                    <p>
                      &ldquo;For every quiet moment we've shared, every
                      celebration still to come…&rdquo;
                    </p>
                    <p className="text-navy-deep/30">— your handwritten words —</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gold/15 flex items-center justify-between">
                    <p className="text-[9px] uppercase tracking-[0.4em] text-gold/60">
                      Sealed for
                    </p>
                    <p className="font-display italic text-navy-deep/60 text-lg">
                      Someone dear
                    </p>
                  </div>
                </div>
                {/* wax seal */}
                <div className="absolute -bottom-4 -right-4 size-16 rounded-full bg-gold/80 flex items-center justify-center shadow-[0_6px_20px_rgba(201,162,76,0.35)]">
                  <span className="font-display italic text-navy-deep text-2xl">
                    L
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ornamental divider */}
      <div className="pb-24 flex items-center justify-center px-12">
        <div className="ornament-line flex-1 opacity-30" />
        <div className="mx-8 text-gold">
          <div className="size-2 rotate-45 border border-gold" />
        </div>
        <div className="ornament-line flex-1 opacity-30" />
      </div>

      {/* Fragrance Details */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 pb-40">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6 text-center">
            Specifications
          </p>
          <h2 className="font-display italic text-4xl md:text-5xl text-navy-deep leading-tight mb-10 text-center">
            Fragrance Details
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="max-w-2xl mx-auto space-y-6 font-display text-xl md:text-2xl text-navy-deep/80 leading-relaxed text-pretty text-center mb-14">
            <p>
              Every fragrance in our collections is carefully chosen for its
              character, craftsmanship, and lasting impression.
            </p>
            <p>
              Here you'll find everything you'd like to know, including
              fragrance family, notes, longevity, and other product
              specifications.
            </p>
            <p className="italic text-gold-shimmer">
              These details help you choose the fragrance that best
              complements the moment you're creating.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {(
              [
                { label: "Family", value: item.tag },
                { label: "Concentration", value: "Extrait de Parfum" },
                { label: "Top Notes", value: item.layers.top },
                { label: "Heart Notes", value: item.layers.heart },
                { label: "Base Notes", value: item.layers.base },
                { label: "Longevity", value: "8–10 hours" },
                { label: "Volume", value: "50 ml" },
                { label: "Origin", value: item.origin },
              ] as const
            ).map((spec) => (
              <div
                key={spec.label}
                className="flex flex-col gap-2 pb-6 border-b border-gold/15"
              >
                <dt className="text-[10px] uppercase tracking-[0.4em] text-gold/80">
                  {spec.label}
                </dt>
                <dd className="font-display text-xl md:text-2xl text-navy-deep/90 leading-relaxed">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Ornamental divider */}
      <div className="pb-24 flex items-center justify-center px-12">
        <div className="ornament-line flex-1 opacity-30" />
        <div className="mx-8 text-gold">
          <div className="size-2 rotate-45 border border-gold" />
        </div>
        <div className="ornament-line flex-1 opacity-30" />
      </div>

      {/* The Livin' Experience */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 pb-40 text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6">
            The Ritual
          </p>
          <h2 className="font-display italic text-4xl md:text-5xl text-navy-deep leading-tight mb-14">
            The Livin' Experience
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-8 font-display text-xl md:text-2xl text-navy-deep/85 leading-relaxed text-pretty">
            <p>
              At Livin', the experience begins long before the fragrance is
              discovered.
            </p>
            <p>
              From the moment the ribbon is untied to the final note inside
              the box, every detail is designed with one purpose — to make
              someone feel genuinely loved.
            </p>
            <p>
              Because thoughtful gifting isn't measured by what's inside the
              bottle.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-12 font-display italic text-3xl md:text-5xl text-gold-shimmer leading-[1.1]">
            It's measured by what stays in someone's heart.
          </p>
        </Reveal>
      </section>

      {/* Ornamental divider */}
      <div className="pb-24 flex items-center justify-center px-12">
        <div className="ornament-line flex-1 opacity-30" />
        <div className="mx-8 text-gold">
          <div className="size-2 rotate-45 border border-gold" />
        </div>
        <div className="ornament-line flex-1 opacity-30" />
      </div>

      {/* Frequently Asked Questions */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 pb-40">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6 text-center">
            Answers
          </p>
          <h2 className="font-display italic text-4xl md:text-5xl text-navy-deep leading-tight mb-14 text-center">
            Frequently Asked Questions
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {productFaqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className="border-b border-gold/15"
              >
                <AccordionTrigger className="font-display text-xl md:text-2xl text-navy-deep hover:no-underline hover:text-gold-shimmer py-6 text-left [&>svg]:text-gold [&>svg]:h-5 [&>svg]:w-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xl md:text-2xl text-navy-deep/75 leading-relaxed font-display pb-8 pr-8">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      {/* Ornamental divider */}
      <div className="pb-24 flex items-center justify-center px-12">
        <div className="ornament-line flex-1 opacity-30" />
        <div className="mx-8 text-gold">
          <div className="size-2 rotate-45 border border-gold" />
        </div>
        <div className="ornament-line flex-1 opacity-30" />
      </div>

      {/* Ready to Make Someone Smile? — CTA */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 pb-40 text-center">
        <Reveal>
          <h2 className="font-display italic text-4xl md:text-6xl text-gold-shimmer leading-[1.05] mb-12">
            Ready to Make Someone Smile?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-6 font-display text-xl md:text-2xl text-navy-deep/80 leading-relaxed text-pretty mb-14">
            <p>
              The most meaningful gifts aren't remembered because they were
              expensive.
            </p>
            <p>
              They're remembered because someone took the time to make another
              person feel truly special.
            </p>
            <p className="italic text-gold-shimmer">
              Whenever you're ready, we'll help you create that moment.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-12 py-5 bg-navy-deep text-white text-[11px] uppercase tracking-[0.4em] hover:bg-navy transition-colors"
          >
            {justAdded ? (
              <>
                <Check size={16} strokeWidth={1.5} /> Added
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        </Reveal>
      </section>

      {/* Other signatures */}
      {others.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-10 pt-16 border-t border-gold/10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4 text-center">
              Also of the House
            </p>
            <h2 className="font-display italic text-3xl md:text-5xl text-navy-deep text-center mb-16">
              Other Signatures
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.1}>
                <Link
                  to="/collections/$slug"
                  params={{ slug: o.slug }}
                  className="group glass-card p-6 flex flex-col gap-6 transition-all duration-500 hover:-translate-y-2 hover:border-gold/40"
                >
                  <div className="overflow-hidden aspect-[3/4] bg-ivory">
                    <img
                      src={o.image}
                      alt={o.name}
                      width={800}
                      height={1000}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3">
                      {o.tag}
                    </p>
                    <h3 className="font-display italic text-3xl text-navy-deep mb-4">
                      {o.name}
                    </h3>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gold/15">
                      <span className="font-display text-xl text-gold-shimmer">
                        {o.price}
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
        </section>
      )}
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="pt-[calc(5rem+50px)] pb-40 min-h-screen">
      <section className="max-w-3xl mx-auto px-6 md:px-10 text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6">
          Not Found
        </p>
        <h1 className="font-display italic text-5xl md:text-7xl text-navy-deep leading-[0.95] mb-8">
          A Silent Vessel
        </h1>
        <p className="font-display text-xl md:text-2xl text-navy-deep/70 leading-relaxed mb-12">
          We couldn't find that signature. It may have been renamed or moved.
        </p>
        <Link
          to="/collections"
          className="inline-block px-10 py-4 border border-navy-deep/40 text-navy-deep text-[10px] uppercase tracking-[0.3em] hover:bg-navy-deep hover:text-white transition-colors"
        >
          View the Collection
        </Link>
      </section>
    </main>
  );
}

// Silence unused-import warning; used implicitly via loader/data.
void collections;
