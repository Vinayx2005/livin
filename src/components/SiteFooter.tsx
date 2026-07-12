import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/collections", label: "Gifting Collections" },
  { to: "/story", label: "Livin' Story" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="pt-24 pb-14 px-6 md:px-10 border-t border-gold/10 bg-navy-deep">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-14 md:gap-20 items-start">
        <div>
          <img
            src="/livin-logo.png"
            alt="Livin'"
            width={280}
            height={90}
            className="h-10 md:h-12 w-auto mb-6"
          />
          <p className="max-w-md text-ivory/70 text-sm md:text-base leading-relaxed font-display">
            All rights reserved · Made with love, for those who wish to become
            part of the memories their loved ones hold most dear.
          </p>
        </div>

        <nav aria-label="Footer" className="md:justify-self-end">
          <h4 className="text-[10px] uppercase tracking-[0.35em] text-gold mb-5">
            Explore
          </h4>
          <ul className="space-y-3 text-sm md:text-base text-ivory/80 font-display">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="hover:text-gold transition-colors"
                  activeOptions={l.to === "/" ? { exact: true } : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-16 pt-8 border-t border-ivory/10 text-[10px] uppercase tracking-[0.4em] text-ivory/40 text-center">
        &copy; {new Date().getFullYear()} Livin'
      </div>
    </footer>
  );
}
