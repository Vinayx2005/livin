import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/collections", label: "Collections" },
  { to: "/gifting", label: "Gifting" },
  { to: "/story", label: "Story" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
      >
        LIVIN'
      </Link>
      <div className="flex gap-4 md:gap-8 text-[10px] md:text-[11px] uppercase tracking-[0.2em]">
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
    </nav>
  );
}
