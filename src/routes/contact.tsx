import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — LIVIN'" },
      {
        name: "description",
        content:
          "Reach the Livin' team — about an order, delivery, or one of our collections.",
      },
      { property: "og:title", content: "Contact — LIVIN'" },
      {
        property: "og:description",
        content:
          "Get in touch with the Livin' team by email or WhatsApp.",
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
            <h1 className="font-display italic text-5xl md:text-7xl text-ivory leading-[0.95] mb-8">
              Have a question?
            </h1>
            <div className="font-display text-xl md:text-2xl text-ivory/75 leading-relaxed mb-12 space-y-4">
              <p>
                About an order, delivery, or one of our collections?
              </p>
              <p className="italic text-gold-shimmer">
                Our team is here to help.
              </p>
            </div>
            <div className="space-y-6 text-sm text-ivory/80 font-light">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
                  Email
                </p>
                <a
                  href="mailto:hello@livin.com"
                  className="hover:text-gold transition-colors"
                >
                  hello@livin.com
                </a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/917075314435"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  +91 70753 14435
                </a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3">
                  Social
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://instagram.com/livin.gifting"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Livin' on Instagram"
                    className="inline-flex items-center justify-center size-10 rounded-full border border-gold/30 text-gold/80 hover:text-gold hover:border-gold hover:bg-gold/5 transition-colors"
                  >
                    <Instagram size={18} strokeWidth={1.25} />
                  </a>
                </div>
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
                  Our team will be in touch within one working day.
                </p>
              </div>
            ) : (
              <>
                <Field label="Full Name" name="name" />
                <Field label="Email" name="email" type="email" />
                <Field
                  label="Contact Number"
                  name="phone"
                  type="tel"
                  placeholder="+91 —"
                />
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
                  Send Message
                </button>
              </>
            )}
          </form>
        </Reveal>
      </section>

      {/* ORNAMENTAL DIVIDER */}
      <div className="max-w-6xl mx-auto py-24 flex items-center justify-center px-12">
        <div className="ornament-line flex-1 opacity-30" />
        <div className="mx-8 text-gold">
          <div className="size-2 rotate-45 border border-gold" />
        </div>
        <div className="ornament-line flex-1 opacity-30" />
      </div>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 md:px-10">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6 text-center">
            Answers
          </p>
          <h2 className="font-display italic text-4xl md:text-5xl text-ivory leading-tight mb-14 text-center">
            Frequently Asked Questions
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className="border-b border-gold/15"
              >
                <AccordionTrigger className="font-display text-xl md:text-2xl text-ivory hover:no-underline hover:text-gold-shimmer py-6 text-left [&>svg]:text-gold [&>svg]:h-5 [&>svg]:w-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-ivory/75 leading-relaxed font-light pb-8 pr-8">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>
    </main>
  );
}

const faqs = [
  {
    q: "Where do you deliver?",
    a: "We currently deliver across India.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders are typically delivered within 5–7 business days.",
  },
  {
    q: "Can I add a personalized gift note?",
    a: "Yes. Every order can include a heartfelt personalized message to make your gift even more meaningful.",
  },
  {
    q: "Do you accept returns?",
    a: "We currently do not accept returns. If your order arrives damaged, we'll gladly assist you with a replacement.",
  },
];

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
