import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — LIVIN'" },
      {
        name: "description",
        content:
          "Livin' wasn't born in a boardroom. It started with a feeling that stayed long after a gift had been given — a founder's story.",
      },
      { property: "og:title", content: "Our Story — LIVIN'" },
      {
        property: "og:description",
        content:
          "The story behind Livin' — a founder's belief that every meaningful relationship deserves more than just a gift.",
      },
      { property: "og:url", content: "/story" },
    ],
    links: [{ rel: "canonical", href: "/story" }],
  }),
  component: StoryPage,
});

function Divider() {
  return (
    <div className="py-16 flex items-center justify-center px-12">
      <div className="ornament-line flex-1 opacity-30" />
      <div className="mx-8 text-gold">
        <div className="size-2 rotate-45 border border-gold" />
      </div>
      <div className="ornament-line flex-1 opacity-30" />
    </div>
  );
}

function Chapter({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-10 text-center">
      <Reveal>
        <h2 className="font-display italic text-3xl md:text-5xl text-navy-deep leading-tight mb-10">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="space-y-6 font-display text-xl md:text-2xl text-navy-deep/80 leading-relaxed text-pretty">
          {children}
        </div>
      </Reveal>
    </section>
  );
}

function StoryPage() {
  return (
    <main className="pt-[calc(5rem+50px)] pb-40">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 text-center pb-24">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-8">
            Livin' Story
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display italic text-4xl md:text-6xl lg:text-7xl text-navy-deep leading-[1.05] mb-12">
            Every Great Story Begins with a Feeling
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="max-w-2xl mx-auto space-y-6 font-display text-xl md:text-2xl text-navy-deep/80 leading-relaxed text-pretty">
            <p>
              Livin' wasn't born in a boardroom, nor did it begin as a business
              idea. It started with a feeling that stayed long after a gift had
              been given.
            </p>
            <p>
              A quiet thought kept returning:{" "}
              <span className="italic text-gold-shimmer">
                &ldquo;This moment could have been even more meaningful.&rdquo;
              </span>
            </p>
            <p>That single realization became the beginning of everything.</p>
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* It Started with a Gift */}
      <Chapter title="It Started with a Gift">
        <p>
          A few years ago, I chose a perfume for someone I deeply loved. I spent
          time finding something that felt right because I wanted it to mean
          more than just another present.
        </p>
        <p>
          When the gift was finally opened, there was happiness, appreciation,
          and a beautiful moment we shared together.
        </p>
        <p>Yet later, I couldn't stop thinking about something.</p>
        <p>
          The gift had expressed my intention, but I felt there was still an
          opportunity to make the entire experience even more personal —
          something that would stay with her long after the moment had passed.
        </p>
        <p className="italic text-gold-shimmer text-center pt-4">
          That thought never left me.
        </p>
      </Chapter>

      <Divider />

      {/* The Next Gift Changed Everything */}
      <Chapter title="The Next Gift Changed Everything">
        <p>The next time, I approached gifting differently.</p>
        <p>
          Instead of beginning with the gift itself, I began with the feeling I
          wanted to leave behind.
        </p>
        <p>
          I wrote small, personal messages — memories, thoughts, little
          reminders of moments only we understood. I rolled each note carefully
          and placed them inside the gift so they would appear one by one as it
          was opened.
        </p>
        <p>
          Before the actual gift was even discovered, there was curiosity. Then
          came smiles. Then came emotions.
        </p>
        <p>
          The fragrance was still there, but it had become part of a much
          larger story.
        </p>
        <p className="italic text-gold-shimmer text-center pt-4">
          That experience stayed with both of us.
          <br />
          It also stayed with me.
        </p>
      </Chapter>

      <Divider />

      {/* That's When Livin' Began */}
      <Chapter title="That's When Livin' Began">
        <p>Livin' wasn't created to become another fragrance brand.</p>
        <p>
          It was created from a simple belief that every meaningful
          relationship deserves more than just a gift.
        </p>
        <ul className="space-y-3 not-italic list-none text-center py-4">
          <li className="italic text-gold-shimmer text-2xl md:text-3xl">
            It deserves intention.
          </li>
          <li className="italic text-gold-shimmer text-2xl md:text-3xl">
            It deserves thoughtfulness.
          </li>
          <li className="italic text-gold-shimmer text-2xl md:text-3xl">
            It deserves an experience that begins long before the gift is fully
            revealed.
          </li>
        </ul>
      </Chapter>

      <Divider />

      {/* What We Believe */}
      <Chapter title="What We Believe">
        <p>We believe people rarely remember the price of a gift.</p>
        <p className="italic text-gold-shimmer">
          They remember how someone made them feel.
        </p>
        <p>
          A meaningful gift isn't defined by its cost or its luxury. It is
          defined by the care, thought, and emotion behind every detail.
        </p>
        <p>That's the belief that guides everything we create.</p>
      </Chapter>

      <Divider />

      {/* Every Detail Has a Purpose */}
      <Chapter title="Every Detail Has a Purpose">
        <p>
          Nothing becomes part of a Livin' experience unless it adds meaning.
        </p>
        <p>
          Whether it's a personalized note, a carefully written story, the
          presentation, or the fragrance itself, every element is chosen with
          intention.
        </p>
        <p>Because the goal has never been to impress someone.</p>
        <p className="italic text-gold-shimmer">
          The goal is to help them feel loved, appreciated, remembered, and
          understood.
        </p>
      </Chapter>

      <Divider />

      {/* Looking Ahead */}
      <Chapter title="Looking Ahead">
        <p>
          Today, Livin' begins with thoughtfully curated fragrance experiences.
        </p>
        <p>Tomorrow, it may grow into something much bigger.</p>
        <p>
          But our purpose will always remain the same: to help people express
          what words alone sometimes cannot, and to make every meaningful
          occasion feel just a little more unforgettable.
        </p>
      </Chapter>

      <Divider />

      {/* A Letter from the Founder */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6">
            A Letter from the Founder
          </p>
          <h2 className="font-display italic text-3xl md:text-5xl text-navy-deep leading-tight mb-14">
            To the one who is thinking of someone.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-6 font-display text-xl md:text-2xl text-navy-deep/80 leading-relaxed text-pretty">
            <p>
              If you've found your way here, there's a good chance you're
              thinking about someone who matters deeply to you.
            </p>
            <p>
              A partner. A parent. A friend. A mentor. Someone whose presence
              has made your life better.
            </p>
            <p>
              Thank you for trusting Livin' to become a small part of that
              story.
            </p>
            <p>Everything we create begins with one simple question:</p>
            <p className="italic text-gold-shimmer text-3xl md:text-4xl text-center py-4">
              &ldquo;How do you want them to feel?&rdquo;
            </p>
            <p>
              Because when we start with that question, every decision that
              follows becomes much more meaningful.
            </p>
            <p>One day, you may forget which fragrance you chose.</p>
            <p className="italic">
              We simply hope they'll never forget how you made them feel.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-16 pt-10 border-t border-gold/15 text-center">
            <p className="font-display italic text-2xl md:text-3xl text-gold-shimmer mb-2">
              Betha Sai Likitha
            </p>
            <p className="text-[10px] uppercase tracking-[0.4em] text-navy-deep/60">
              Founder, Livin'
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
