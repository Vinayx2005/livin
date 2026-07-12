import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-gold-shimmer italic">404</h1>
        <h2 className="mt-6 font-display text-2xl text-navy-deep">
          A page beyond our house
        </h2>
        <p className="mt-3 text-sm text-navy-deep/60 font-display font-light">
          The reveal you seek does not exist within these walls.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-navy-deep/40 px-8 py-3 text-[10px] uppercase tracking-[0.3em] text-navy-deep hover:bg-navy-deep hover:text-white transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-navy-deep italic">
          A moment of silence
        </h1>
        <p className="mt-3 text-sm text-navy-deep/60 font-display font-light">
          Something disturbed the reveal. Please try again.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-navy-deep/40 px-8 py-3 text-[10px] uppercase tracking-[0.3em] text-navy-deep hover:bg-navy-deep hover:text-white transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-navy-deep/20 px-8 py-3 text-[10px] uppercase tracking-[0.3em] text-navy-deep/80 hover:border-navy-deep/60 transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LIVIN' Oud Royale — Luxury Fragrance Gifting" },
      {
        name: "description",
        content:
          "LIVIN' Oud Royale — a house of rare oud fragrances and bespoke gifting. Cinematic reveals, hand-crafted flacons, curated for the connoisseur.",
      },
      { name: "author", content: "LIVIN' Oud Royale" },
      { name: "theme-color", content: "#ffffff" },
      { property: "og:site_name", content: "LIVIN' Oud Royale" },
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content: "LIVIN' Oud Royale — Luxury Fragrance Gifting",
      },
      {
        property: "og:description",
        content:
          "Rare oud, cinematic reveals, and bespoke gifting from the House of LIVIN'.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "LIVIN' Oud Royale — Luxury Fragrance Gifting",
      },
      {
        name: "twitter:description",
        content:
          "Rare oud, cinematic reveals, and bespoke gifting from the House of LIVIN'.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-ivory text-navy-deep">
        <SiteNav />
        <Outlet />
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
