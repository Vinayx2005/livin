import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/collections", label: "Collections" },
  { to: "/gifting", label: "Gifting" },
  { to: "/story", label: "Story" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      <nav
        className={`fixed top-0 z-50 w-full px-6 md:px-10 py-5 flex justify-between items-center transition-all duration-500 ${
          scrolled
            ? "bg-navy-deep/85 backdrop-blur-md border-b border-gold/10"
            : "bg-gradient-to-b from-navy-deep/70 to-transparent"
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
        <div className="hidden md:flex gap-4 md:gap-8 text-[10px] md:text-[11px] uppercase tracking-[0.2em]">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-ivory/80 hover:text-gold transition-colors duration-300"
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-gold/90 hover:text-gold p-1 -mr-1"
        >
          {open ? <X size={22} strokeWidth={1.25} /> : <Menu size={22} strokeWidth={1.25} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 z-40 bg-navy-deep/95 backdrop-blur-lg flex flex-col items-center justify-center gap-10 px-8"
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
                    className="font-display italic text-4xl text-ivory hover:text-gold-shimmer transition-colors"
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
