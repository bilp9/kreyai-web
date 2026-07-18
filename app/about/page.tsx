import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About KreyAI",
  description:
    "KreyAI builds practical software for translators, interpreters, transcriptionists, localization teams, researchers, journalists, educators, and multilingual organizations.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About KreyAI",
    description: "Practical software for language professionals, built around real transcription, translation, review, and writing workflows.",
    url: "/about",
  },
};

const PRODUCTS = [
  {
    name: "KreyAI Transcription",
    href: "/transcription",
    description:
      "Fast, multilingual speech-to-text for audio and video, with speaker identification, subtitles, and export-ready transcripts.",
  },
  {
    name: "aTelier",
    href: "/atelier",
    description:
      "A modern translation workbench with translation memory, terminology management, quality assurance, and side-by-side editing.",
  },
  {
    name: "Dekk",
    href: "/dekk",
    description:
      "Keyboard-first media playback designed for transcription, review, and multilingual quality assurance.",
  },
  {
    name: "Adwaz",
    href: "/adwaz",
    description:
      "A writing assistant for Haitian Creole that supports spelling, grammar, style, consistency, and dictionary-backed review.",
  },
];

const AUDIENCES = [
  "Translators and localization teams",
  "Interpreters and transcriptionists",
  "Researchers, journalists, and educators",
  "Writers and multilingual organizations",
];

const APPROACH = [
  "Focused tools instead of bloated platforms",
  "Practical AI that supports human expertise—not replaces it",
  "Multilingual workflows designed for real-world language use",
  "Local-first processing whenever files don’t need to leave your device",
  "Professional tools that remain accessible and affordable",
];

export default function AboutPage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">About KreyAI</p>
          <h1 className="page-title">Practical software for language professionals.</h1>
          <p className="page-lede">
            Language work rarely happens in a single application. KreyAI exists to make the full workflow simpler.
          </p>
        </div>

        <div className="mt-14 grid gap-5">
          <section className="surface-panel rounded-[28px] p-7">
            <p className="text-sm leading-7 text-[var(--brand-muted)]">
              An interview becomes a transcript. A transcript becomes a translation. A translation requires research,
              playback, review, editing, and quality assurance before it&apos;s ready to deliver.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              We build practical software for translators, interpreters, transcriptionists, localization teams,
              researchers, journalists, educators, and anyone whose work depends on language. Our goal is
              straightforward: create tools that solve real problems without adding unnecessary complexity.
            </p>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Built from real language work</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              KreyAI wasn&apos;t created in a boardroom.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              It grew out of years of professional work in interpreting, multilingual communication, transcription,
              and analytical linguistics, where accuracy, context, and consistency matter. Those experiences exposed
              a common frustration: professional language work often relies on software that is either expensive,
              disconnected, or designed for very different users.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              That perspective continues to shape every product we build.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Alongside a background in business operations, continuity planning, and AI-assisted workflow design, we
              focus on software that combines practical workflows with thoughtful use of artificial intelligence—helping
              professionals work more efficiently while keeping human judgment at the center.
            </p>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">What we build</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              We started with transcription, but our vision is broader. KreyAI is building an ecosystem of connected
              tools that support the full language workflow—from audio to finished content.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {PRODUCTS.map((product) => (
                <Link
                  key={product.name}
                  href={product.href}
                  className="surface-muted rounded-[22px] p-5 transition hover:-translate-y-0.5 hover:border-[var(--brand-border-strong)]"
                >
                  <h3 className="text-lg font-semibold tracking-tight text-[#13172b]">{product.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{product.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Built for professionals</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Our software is designed for people who work with language every day, including:
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {AUDIENCES.map((audience) => (
                <p key={audience} className="surface-muted rounded-2xl px-5 py-4 text-sm text-[var(--brand-muted)]">
                  {audience}
                </p>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--brand-muted)]">
              Whether you&apos;re processing interviews, translating legal documents, reviewing subtitles, or editing
              multilingual content, our goal is to build tools that fit naturally into the way you already work.
            </p>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Our approach</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              We believe good language software should stay out of the way. That means:
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--brand-muted)]">
              {APPROACH.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--brand-blue)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Privacy by design</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Language data deserves careful handling. KreyAI products are designed to process your work—not turn it
              into a product.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              We collect as little information as possible, do not use customer files to train AI models, and prefer
              local processing whenever practical. When cloud services are required, they&apos;re used only to perform the
              task you&apos;ve requested.
            </p>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Looking ahead</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Language technology is evolving quickly, but the need for thoughtful tools remains the same.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Our ambition is to build the everyday software toolkit for language professionals—helping people move
              seamlessly from transcription to translation, review, writing, and whatever comes next.
            </p>
          </section>
        </div>

        <div className="surface-panel mt-12 rounded-[30px] p-7">
          <h2 className="text-2xl font-semibold tracking-tight">Get in touch</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--brand-muted)]">
            Questions, feedback, or product ideas? We&apos;d love to hear from you.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/products" className="brand-button inline-flex rounded-2xl px-5 py-3 text-sm font-semibold">
              View products
            </Link>
            <a
              className="inline-flex rounded-2xl border border-[#d6dbea] bg-white px-5 py-3 text-sm font-semibold text-[#101426] hover:border-[#bfc7de]"
              href="mailto:hello@kreyai.com"
            >
              Contact KreyAI
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
