import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Concierge — LIVIN' Oud Royale" },
      {
        name: "description",
        content:
          "Enquire with the LIVIN' Oud Royale concierge — bespoke gifting, corporate editions and private fragrance appointments.",
      },
      { property: "og:title", content: "Concierge — LIVIN' Oud Royale" },
      {
        property: "og:description",
        content:
          "Reach the LIVIN' concierge — for bespoke gifting, corporate editions and private appointments.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <main className="pt-32 pb-40">
      <section className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-20">
        <Reveal>
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6">
              Concierge
            </p>
            <h1 className="font-display italic text-5xl md:text-7xl text-ivory leading-[0.95] mb-8">
              A Private Audience
            </h1>
            <p className="font-display text-xl md:text-2xl text-ivory/75 leading-relaxed mb-12">
              Share the occasion. Our concierge will respond within one working
              day with a curated proposal.
            </p>
            <div className="space-y-6 text-sm text-ivory/80 font-light">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
                  Email
                </p>
                <a
                  href="mailto:concierge@livinoud.com"
                  className="hover:text-gold transition-colors"
                >
                  concierge@livinoud.com
                </a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
                  Ateliers
                </p>
                <p>London · Dubai · Paris</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
                  Private Line
                </p>
                <p>+44 20 7946 0000</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="glass-card p-8 md:p-10 space-y-6"
          >
            {sent ? (
              <div className="py-16 text-center">
                <div className="text-gold text-4xl mb-6">◆</div>
                <h3 className="font-display italic text-3xl text-ivory mb-4">
                  Thank you
                </h3>
                <p className="text-ivory/70 font-light">
                  Our concierge will be in touch within one working day.
                </p>
              </div>
            ) : (
              <>
                <Field label="Full Name" name="name" />
                <Field label="Email" name="email" type="email" />
                <Field label="Occasion" name="occasion" placeholder="Gifting · Corporate · Private" />
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gold block mb-3">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full bg-transparent border-b border-gold/25 focus:border-gold text-ivory pb-3 outline-none transition-colors font-light"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full py-4 border border-gold bg-gold/5 text-gold text-[10px] uppercase tracking-[0.4em] hover:bg-gold hover:text-navy-deep transition-colors"
                >
                  Request Consultation
                </button>
              </>
            )}
          </form>
        </Reveal>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[10px] uppercase tracking-[0.3em] text-gold block mb-3"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-gold/25 focus:border-gold text-ivory pb-3 outline-none transition-colors font-light placeholder:text-ivory/30"
      />
    </div>
  );
}
