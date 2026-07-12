import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/collections", label: "Gifting Collection" },
  { to: "/story", label: "Livin' Story" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        <nav
          className={`w-full px-6 md:px-10 py-5 flex justify-between items-center bg-white transition-shadow duration-500 ${
            scrolled
              ? "shadow-[0_2px_20px_rgba(15,31,61,0.08)] border-b border-gold/15"
              : "border-b border-gold/10"
          }`}
        >
        <Link
          to="/"
          className="font-display italic text-2xl md:text-3xl tracking-[0.15em] text-gold-shimmer"
          onClick={() => setOpen(false)}
        >
          LIVIN'
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4 md:gap-8 text-[10px] md:text-[11px] uppercase tracking-[0.2em]">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-navy-deep/80 hover:text-gold transition-colors duration-300"
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/cart"
            aria-label={count > 0 ? `Cart (${count})` : "Cart"}
            className="relative text-navy-deep/80 hover:text-gold transition-colors duration-300"
            activeProps={{ className: "text-gold" }}
          >
            <ShoppingBag size={18} strokeWidth={1.25} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-gold text-navy-deep text-[9px] font-medium tracking-normal flex items-center justify-center leading-none">
                {count}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <Link
            to="/cart"
            aria-label={count > 0 ? `Cart (${count})` : "Cart"}
            onClick={() => setOpen(false)}
            className="relative text-gold/90 hover:text-gold p-1"
          >
            <ShoppingBag size={20} strokeWidth={1.25} />
            {count > 0 && (
              <span className="absolute top-0 right-0 min-w-[16px] h-[16px] px-1 rounded-full bg-gold text-navy-deep text-[9px] font-medium tracking-normal flex items-center justify-center leading-none">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="text-gold/90 hover:text-gold p-1 -mr-1"
          >
            {open ? <X size={22} strokeWidth={1.25} /> : <Menu size={22} strokeWidth={1.25} />}
          </button>
        </div>
        </nav>

        {/* Announcement bar — sits just below the header */}
        <div className="w-full bg-navy-deep text-ivory/90 text-[10px] md:text-[11px] tracking-[0.15em]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-2.5 flex items-center justify-center gap-6 md:gap-12">
            <span className="flex items-center gap-2">
              <span className="text-gold">◆</span>
              Complimentary gift wrapping on every order
            </span>
            <span className="hidden md:flex items-center gap-2">
              <span className="text-gold">◆</span>
              Free shipping on orders above ₹2,999
            </span>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 z-40 bg-ivory/95 backdrop-blur-lg flex flex-col items-center justify-center gap-10 px-8"
          >
            <ul className="flex flex-col items-center gap-8 text-center">
              {links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="font-display italic text-4xl text-navy-deep hover:text-gold-shimmer transition-colors"
                    activeProps={{ className: "text-gold-shimmer" }}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.4em] text-gold/60"
            >
              Est. MMXXIV
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
