import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="pt-32 pb-16 px-6 md:px-10 border-t border-gold/10 bg-navy-deep">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="font-display italic text-4xl text-gold-shimmer mb-6">
            LIVIN'
          </div>
          <p className="max-w-sm text-ivory/50 text-sm leading-relaxed font-display font-light">
            Purveyors of the rarest oud, bottled for the connoisseur. Every
            flacon a private audience with the desert's oldest secret.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold">
            House
          </h4>
          <ul className="space-y-2 text-sm text-ivory/70 font-display font-light">
            <li>
              <Link to="/collections" className="hover:text-gold transition-colors">
                Collections
              </Link>
            </li>
            <li>
              <Link to="/gifting" className="hover:text-gold transition-colors">
                Gifting
              </Link>
            </li>
            <li>
              <Link to="/story" className="hover:text-gold transition-colors">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold transition-colors">
                Concierge
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold">
            Ateliers
          </h4>
          <p className="text-sm text-ivory/70 font-display font-light leading-relaxed">
            London
            <br />
            Dubai
            <br />
            Paris
          </p>
        </div>
      </div>
      <div className="mt-20 text-[10px] uppercase tracking-[0.4em] text-ivory/30 text-center">
        &copy; {new Date().getFullYear()} LIVIN' Oud Royale &middot; All Rights
        Reserved
      </div>
    </footer>
  );
}
