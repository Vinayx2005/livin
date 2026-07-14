import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/data/collections";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — LIVIN' Oud Royale" },
      {
        name: "description",
        content:
          "Review your LIVIN' selection — bespoke fragrance gifts prepared with intention.",
      },
      { property: "og:title", content: "Your Bag — LIVIN' Oud Royale" },
      { property: "og:url", content: "/cart" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, bump, remove, hydrated } = useCart();

  return (
    <main className="pt-[calc(5rem+50px)] pb-40 min-h-screen">
      <section className="max-w-4xl mx-auto px-6 md:px-10">
        <Reveal>
          <h1 className="font-display italic text-5xl md:text-7xl text-navy-deep leading-[0.95] mb-16 text-center">
            A Quiet Ceremony
          </h1>
        </Reveal>

        {hydrated && lines.length === 0 ? (
          <EmptyBag />
        ) : (
          <Reveal delay={0.1}>
            <div className="divide-y divide-gold/10 border-y border-gold/10">
              {lines.map(({ item, product }) => (
                <div
                  key={item.slug}
                  className="grid grid-cols-[80px_1fr_auto] md:grid-cols-[120px_1fr_auto_auto] gap-4 md:gap-8 py-8 items-center"
                >
                  <Link
                    to="/collections/$slug"
                    params={{ slug: product.slug }}
                    className="block overflow-hidden aspect-square bg-ivory border border-gold/15"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="min-w-0">
                    <Link
                      to="/collections/$slug"
                      params={{ slug: product.slug }}
                      className="font-display italic text-xl md:text-2xl text-navy-deep hover:text-gold-shimmer transition-colors block truncate"
                    >
                      {product.name}
                    </Link>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80 mt-1">
                      {product.tag}
                    </p>
                    <p className="font-display text-lg text-gold-shimmer mt-3 md:hidden">
                      {formatPrice(product.priceValue * item.qty)}
                    </p>
                  </div>
                  <div className="col-start-3 flex items-center gap-2 md:gap-3 border border-gold/25 rounded-full px-1 py-1 self-center">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => bump(item.slug, -1)}
                      className="size-7 flex items-center justify-center rounded-full text-gold/80 hover:text-gold hover:bg-gold/10 transition"
                    >
                      <Minus size={12} strokeWidth={1.5} />
                    </button>
                    <span className="text-navy-deep text-sm w-5 text-center tabular-nums">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => bump(item.slug, 1)}
                      className="size-7 flex items-center justify-center rounded-full text-gold/80 hover:text-gold hover:bg-gold/10 transition"
                    >
                      <Plus size={12} strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="hidden md:flex md:col-start-4 items-center gap-6">
                    <span className="font-display text-2xl text-gold-shimmer tabular-nums">
                      {formatPrice(product.priceValue * item.qty)}
                    </span>
                    <button
                      type="button"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => remove(item.slug)}
                      className="text-navy-deep/50 hover:text-navy-deep transition-colors"
                    >
                      <X size={16} strokeWidth={1.25} />
                    </button>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${product.name}`}
                    onClick={() => remove(item.slug)}
                    className="md:hidden col-start-3 mt-3 text-[10px] uppercase tracking-[0.3em] text-navy-deep/60 hover:text-navy-deep text-right"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-8 items-end">
              <div className="flex items-baseline gap-8">
                <span className="text-[10px] uppercase tracking-[0.4em] text-gold/80">
                  Subtotal
                </span>
                <span className="font-display text-4xl text-gold-shimmer tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-navy-deep/50">
                Shipping & taxes calculated at checkout
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  to="/collections"
                  className="px-8 py-4 border border-navy-deep/40 text-navy-deep text-[10px] uppercase tracking-[0.3em] hover:bg-navy-deep hover:text-white transition-colors text-center"
                >
                  Continue Browsing
                </Link>
                <Link
                  to="/contact"
                  className="px-10 py-4 bg-navy-deep text-white text-[10px] uppercase tracking-[0.3em] hover:bg-navy transition-colors text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </Reveal>
        )}
      </section>
    </main>
  );
}

function EmptyBag() {
  return (
    <Reveal delay={0.15}>
      <div className="flex flex-col items-center gap-8 py-16 text-center">
        <div className="size-20 rounded-full border border-gold/30 flex items-center justify-center">
          <ShoppingBag size={28} strokeWidth={1} className="text-gold/80" />
        </div>
        <p className="font-display text-xl md:text-2xl text-navy-deep/75 max-w-md leading-relaxed">
          Your bag awaits its first bottle. Choose a signature from the
          collection to begin the reveal.
        </p>
        <Link
          to="/collections"
          className="inline-block px-10 py-4 border border-navy-deep/40 text-navy-deep text-[10px] uppercase tracking-[0.3em] hover:bg-navy-deep hover:text-white transition-colors mt-4"
        >
          Explore the Collection
        </Link>
      </div>
    </Reveal>
  );
}
