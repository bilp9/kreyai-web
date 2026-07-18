import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KreyAI Products | Language Workflow Software",
  description:
    "Explore KreyAI products for translation, transcription playback, AI transcription, Haitian Creole writing support, and multilingual workflows.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "KreyAI Products",
    description:
      "Practical software for translators, transcriptionists, reviewers, writers, and multilingual teams.",
    url: "/products",
  },
};

const PRODUCTS = [
  {
    id: "atelier",
    name: "aTelier",
    category: "Translation and localization",
    tagline: "Translation workbench built for modern linguists.",
    status: "Early access",
    href: "/atelier",
    cta: "Download aTelier",
    description:
      "A professional CAT environment for translators and language teams who need translation memory, terminology, QA, and a focused bilingual editor.",
    features: [
      "Translation memory",
      "Terminology management",
      "Side-by-side editor",
      "QA checks",
      "Local desktop workflow",
    ],
  },
  {
    id: "dekk",
    name: "Dekk",
    category: "Transcription playback",
    tagline: "Playback built for people who transcribe.",
    status: "Available for macOS",
    href: "/dekk",
    cta: "Download Dekk",
    description:
      "Desktop playback software that helps transcribers control audio and video while staying focused on typing.",
    features: ["Local playback", "Variable speed", "Hotkeys", "Pause rewind", "14-day trial"],
  },
  {
    id: "adwaz",
    name: "Adwaz",
    category: "Writing and language review",
    tagline: "Write with confidence in Haitian Creole.",
    status: "Preview",
    href: "/adwaz",
    cta: "Open Adwaz",
    description:
      "A Haitian Creole writing assistant for spelling, grammar, style, consistency, and language-specific review workflows.",
    features: ["Grammar", "Spelling", "Style suggestions", "Consistency checks", "Dictionary support"],
  },
  {
    id: "transcription",
    name: "KreyAI Transcription",
    category: "AI transcription and speech to text",
    tagline: "Turn audio and video into editable transcripts.",
    status: "Available",
    href: "/transcription",
    cta: "Start transcription",
    description:
      "Fast transcription for audio and video files, with speaker labels, subtitle exports, and prepaid credits.",
    features: ["Audio and video upload", "Speaker labels", "Subtitle exports", "DOCX and TXT exports", "Prepaid credits"],
  },
];

const ECOSYSTEM = [
  "aTelier handles translation workspace needs.",
  "Dekk keeps playback control close while you transcribe.",
  "Adwaz focuses on Haitian Creole writing quality.",
  "KreyAI Transcription turns speech into usable text.",
];

export default function ProductsPage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap">
        <div className="border-b border-[var(--brand-border)] pb-12">
          <div className="max-w-3xl">
            <p className="page-eyebrow">Products</p>
            <h1 className="page-title">Practical software for language work.</h1>
            <p className="page-lede">
              KreyAI products support transcription, translation, playback control, writing review, and multilingual
              workflows without turning every task into a bloated platform.
            </p>
          </div>
        </div>

        <section className="mt-4 divide-y divide-[var(--brand-border)]">
          {PRODUCTS.map((product) => (
            <article
              id={product.id}
              key={product.name}
              className="grid scroll-mt-28 gap-8 py-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="page-eyebrow !text-[0.68rem]">{product.category}</p>
                  <span className="text-xs font-semibold text-[var(--brand-muted)]">{product.status}</span>
                </div>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{product.name}</h2>
                <Link href={product.href} className="brand-button mt-6 inline-flex rounded-xl px-5 py-3 text-sm font-semibold">
                  {product.cta}
                </Link>
              </div>

              <div>
                <p className="text-2xl font-semibold tracking-[-0.035em] text-[#13172b]">{product.tagline}</p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--brand-muted)]">{product.description}</p>
                <ul className="mt-7 grid gap-x-8 gap-y-3 border-t border-[var(--brand-border)] pt-5 sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm font-medium text-[var(--brand-muted)]">
                      <span className="h-px w-5 bg-[var(--brand-border-strong)]" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-10 border-y border-[var(--brand-border)] py-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="page-eyebrow !text-[0.68rem]">Product architecture</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                A software family for real multilingual workflows.
              </h2>
            </div>
            <div className="divide-y divide-[var(--brand-border)]">
              {ECOSYSTEM.map((item) => (
                <p key={item} className="py-4 text-sm leading-7 text-[var(--brand-muted)]">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.04em]">Need help choosing?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[var(--brand-muted)]">
            Tell us what kind of language work you handle, and we can point you to the right KreyAI tool.
          </p>
          <Link
            href="mailto:hello@kreyai.com"
            className="brand-button mt-6 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold"
          >
            Contact KreyAI
          </Link>
        </section>
      </section>
    </main>
  );
}
