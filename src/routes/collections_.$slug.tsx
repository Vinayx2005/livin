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

export const Route = createFileRoute("/collections_/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    return collection;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — LIVIN'" }] };
    }
    const title = `${loaderData.name} | Gifting Collection by Livin'`;
    const description = `Experience the ${loaderData.name} gifting collection by Livin'. Thoughtfully curated with luxury fragrance, personalized notes, and elegant presentation to create unforgettable moments.`;
    const keywords = `${loaderData.name}, Luxury gift, Luxury perfume, Luxury gift box, Gift for her, Gift for him, Premium gifting, Personalized gift, Luxury fragrance, Curated gift, Livin`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: keywords },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/collections/${loaderData.slug}` },
      ],
      links: [{ rel: "canonical", href: `/collections/${loaderData.slug}` }],
    };
  },
  component: CollectionDetailPage,
  notFoundComponent: NotFoundPage,
});

function OrnamentalDivider() {
  return (
    <div className="pb-24 flex items-center justify-center px-12">
      <div className="ornament-line flex-1 opacity-30" />
      <div className="mx-8 text-gold">
        <div className="size-2 rotate-45 border border-gold" />
      </div>
      <div className="ornament-line flex-1 opacity-30" />
    </div>
  );
}

function Paragraphs({
  paragraphs,
  highlightIndex,
}: {
  paragraphs: string[];
  highlightIndex?: number;
}) {
  return (
    <>
      {paragraphs
        .filter((p) => p && p.trim().length > 0)
        .map((p, i) => (
          <p
            key={i}
            className={
              highlightIndex === i ? "italic text-gold-shimmer" : undefined
            }
          >
            {p}
          </p>
        ))}
    </>
  );
}

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
    // buyNowUrl can be an internal path or an external URL
    if (item.buyNowUrl.startsWith("http")) {
      window.location.href = item.buyNowUrl;
    } else {
      navigate({ to: item.buyNowUrl });
    }
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

      <div className="py-24" />
      <OrnamentalDivider />

      {/* The Story Behind This Collection */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 text-center pb-24">
        <Reveal>
          <h2 className="font-display italic text-3xl md:text-5xl text-navy-deep leading-tight mb-12">
            {item.storyBehind.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-6 font-display text-xl md:text-2xl text-navy-deep/80 leading-relaxed text-pretty">
            <Paragraphs
              paragraphs={item.storyBehind.paragraphs}
              highlightIndex={item.storyBehind.highlightIndex}
            />
          </div>
        </Reveal>
      </section>

      <OrnamentalDivider />

      {/* What's Included */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <div className="relative overflow-hidden aspect-[4/5] glass-card">
              <img
                src={item.whatsIncluded.photo}
                alt={`${item.name} — What's included`}
                width={1200}
                height={1500}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
<h2 className="font-display italic text-4xl md:text-5xl text-navy-deep leading-tight mb-8">
                {item.whatsIncluded.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-display text-xl md:text-2xl text-navy-deep/80 leading-relaxed mb-8">
                {item.whatsIncluded.intro}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="space-y-4 mb-10">
                {item.whatsIncluded.items
                  .filter((it) => it && it.trim().length > 0)
                  .map((it) => (
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
                {item.whatsIncluded.closer}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <OrnamentalDivider />

      {/* Make It Personal */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="md:order-2">
            <Reveal>
<h2 className="font-display italic text-4xl md:text-5xl text-navy-deep leading-tight mb-10">
                {item.makeItPersonal.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6 font-display text-xl md:text-2xl text-navy-deep/80 leading-relaxed text-pretty">
                <Paragraphs
                  paragraphs={item.makeItPersonal.paragraphs}
                  highlightIndex={item.makeItPersonal.highlightIndex}
                />
              </div>
            </Reveal>
          </div>

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
                    <p>&ldquo;{item.makeItPersonal.notePreview}&rdquo;</p>
                    <p className="text-navy-deep/30">
                      — your handwritten words —
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gold/15 flex items-center justify-between">
                    <p className="text-[9px] uppercase tracking-[0.4em] text-gold/60">
                      Sealed for
                    </p>
                    <p className="font-display italic text-navy-deep/60 text-lg">
                      {item.makeItPersonal.noteRecipient}
                    </p>
                  </div>
                </div>
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

      <OrnamentalDivider />

      {/* Fragrance Details */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 pb-40">
        <Reveal>
<h2 className="font-display italic text-4xl md:text-5xl text-navy-deep leading-tight mb-10 text-center">
            {item.fragranceDetails.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="max-w-2xl mx-auto space-y-6 font-display text-xl md:text-2xl text-navy-deep/80 leading-relaxed text-pretty text-center mb-14">
            {item.fragranceDetails.paragraphs
              .filter((p) => p && p.trim().length > 0)
              .map((p, i, arr) => (
                <p
                  key={i}
                  className={
                    i === arr.length - 1
                      ? "italic text-gold-shimmer"
                      : undefined
                  }
                >
                  {p}
                </p>
              ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {item.fragranceDetails.specs
              .filter((s) => s.label && s.value)
              .map((spec) => (
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

      <OrnamentalDivider />

      {/* The Livin' Experience */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 pb-40 text-center">
        <Reveal>
<h2 className="font-display italic text-4xl md:text-5xl text-navy-deep leading-tight mb-14">
            {item.livinExperience.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-8 font-display text-xl md:text-2xl text-navy-deep/85 leading-relaxed text-pretty">
            {item.livinExperience.paragraphs
              .filter((p) => p && p.trim().length > 0)
              .map((p, i) => (
                <p key={i}>{p}</p>
              ))}
          </div>
        </Reveal>
        {item.livinExperience.closer && (
          <Reveal delay={0.25}>
            <p className="mt-12 font-display italic text-3xl md:text-5xl text-gold-shimmer leading-[1.1]">
              {item.livinExperience.closer}
            </p>
          </Reveal>
        )}
      </section>

      <OrnamentalDivider />

      {/* Frequently Asked Questions */}
      {item.faq.filter((f) => f.q && f.a).length > 0 && (
        <>
          <section className="max-w-3xl mx-auto px-6 md:px-10 pb-40">
            <Reveal>
<h2 className="font-display italic text-4xl md:text-5xl text-navy-deep leading-tight mb-14 text-center">
                Frequently Asked Questions
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="w-full">
                {item.faq
                  .filter((f) => f.q && f.a)
                  .map((faq, i) => (
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

          <OrnamentalDivider />
        </>
      )}

      {/* Ready to Make Someone Smile? */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Image — top on mobile, right on desktop */}
          <Reveal className="md:order-2">
            <div className="overflow-hidden aspect-[4/5] glass-card">
              <img
                src={item.readyToMakeSmile.photo}
                alt={`${item.name} — Ready to make someone smile`}
                width={1200}
                height={1500}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          {/* Text — bottom on mobile, left on desktop */}
          <div className="md:order-1 text-left">
            <Reveal>
              <h2 className="font-display italic text-4xl md:text-6xl text-gold-shimmer leading-[1.05] mb-10">
                {item.readyToMakeSmile.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6 font-display text-xl md:text-2xl text-navy-deep/80 leading-relaxed text-pretty mb-12">
                {item.readyToMakeSmile.paragraphs
                  .filter((p) => p && p.trim().length > 0)
                  .map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                {item.readyToMakeSmile.closer && (
                  <p className="italic text-gold-shimmer">
                    {item.readyToMakeSmile.closer}
                  </p>
                )}
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
          </div>
        </div>
      </section>

      {/* Other signatures */}
      {others.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-10 pt-16 border-t border-gold/10">
          <Reveal>
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
                  <div className="overflow-hidden aspect-square bg-ivory">
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
                    <h3 className="font-display italic text-3xl text-navy-deep mb-3">
                      {o.name}
                    </h3>
                    <p className="font-display text-xl md:text-2xl text-navy-deep/70 leading-snug">
                      {o.story}
                    </p>
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
