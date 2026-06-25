import Link from "next/link";

export type LanguageLandingContent = {
  language: string;
  eyebrow: string;
  h1: string;
  lede: string;
  slug: string;
  code: string;
  locale: string;
  proofPoints: string[];
  useCases: Array<{
    title: string;
    description: string;
  }>;
  workflow: Array<{
    title: string;
    description: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

function buildFaqSchema(content: LanguageLandingContent) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function buildServiceSchema(content: LanguageLandingContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${content.language} audio transcription`,
    serviceType: "Audio transcription",
    provider: {
      "@type": "Organization",
      name: "KreyAI",
      url: "https://kreyai.com",
    },
    areaServed: "Worldwide",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `https://kreyai.com/${content.slug}`,
    },
    description: content.lede,
    inLanguage: content.code,
  };
}

export default function LanguageLandingPage({
  content,
}: {
  content: LanguageLandingContent;
}) {
  return (
    <main className="brand-page text-[#101426]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify([buildServiceSchema(content), buildFaqSchema(content)]) }}
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-18 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="page-eyebrow">{content.eyebrow}</p>
          <h1 className="mt-5 text-5xl font-bold leading-[0.98] tracking-[-0.05em] text-[#101426] md:text-7xl">
            {content.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--brand-muted)]">{content.lede}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/transcription" className="brand-button inline-flex justify-center rounded-2xl px-6 py-3.5 text-sm font-semibold">
              Start transcription
            </Link>
            <Link
              href="/pricing"
              className="inline-flex justify-center rounded-2xl border border-[var(--brand-border-strong)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--brand-blue)] hover:border-[var(--brand-blue)]"
            >
              See pricing
            </Link>
          </div>
        </div>

        <aside className="brand-panel rounded-[34px] p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-blue)]">
            Built for usable transcripts
          </p>
          <div className="mt-6 grid gap-4">
            {content.proofPoints.map((point) => (
              <div key={point} className="surface-muted rounded-2xl px-5 py-4 text-sm leading-7 text-[var(--brand-muted)]">
                {point}
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="border-y border-[var(--brand-border)] bg-white/70">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="page-eyebrow">Use cases</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              Transcription for work that needs context.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {content.useCases.map((item) => (
              <article key={item.title} className="brand-card rounded-[28px] p-6">
                <h3 className="text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-18 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="page-eyebrow">Workflow</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Upload once. Download the format you need.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[var(--brand-muted)]">
            KreyAI keeps the process simple: choose a language, upload audio, then download transcript and subtitle
            outputs after processing.
          </p>
        </div>

        <div className="grid gap-5">
          {content.workflow.map((item, index) => (
            <article key={item.title} className="surface-panel rounded-[28px] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7a8098]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--brand-border)] bg-white/70">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="page-eyebrow">Privacy</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              Private by design for every language.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {[
              "Audio and transcripts are never used to train AI models.",
              "Files stay available for 7 days, then are scheduled for deletion from active storage.",
              "No traditional login is required, reducing unnecessary personal data collection.",
            ].map((item) => (
              <div key={item} className="rounded-[24px] border border-[var(--brand-border)] bg-white p-5 text-sm leading-7 text-[var(--brand-muted)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-18 md:py-24">
        <p className="page-eyebrow">FAQ</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
          Questions about {content.language} transcription.
        </h2>
        <div className="mt-10 grid gap-5">
          {content.faq.map((item) => (
            <details key={item.question} className="surface-panel group rounded-[28px] p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-semibold tracking-tight">
                <span>{item.question}</span>
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--brand-blue-soft)] text-base text-[var(--brand-blue)] group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
