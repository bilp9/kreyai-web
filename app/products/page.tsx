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
    status: "Beta",
    href: "mailto:hello@kreyai.com?subject=aTelier%20access",
    cta: "Ask about aTelier",
    description:
      "A professional CAT environment for translators and language teams who need translation memory, terminology, QA, and a focused bilingual editor.",
    features: [
      "Translation memory",
      "Terminology management",
      "Side-by-side editor",
      "QA checks",
      "AI-assisted suggestions",
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
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="page-header">
            <p className="page-eyebrow">Products</p>
            <h1 className="page-title">Practical software for language work.</h1>
            <p className="page-lede">
              KreyAI products support transcription, translation, playback control, writing review, and multilingual
              workflows without turning every task into a bloated platform.
            </p>
          </div>

          <div className="surface-callout rounded-[30px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--brand-blue-deep)]">
              One company, focused tools.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--brand-blue-deep)]">
              Use the product that fits the task, whether you are translating, transcribing recordings, improving writing, or
              producing transcripts.
            </p>
          </div>
        </div>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          {PRODUCTS.map((product) => (
            <article id={product.id} key={product.name} className="surface-panel scroll-mt-28 rounded-[30px] p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="page-eyebrow !text-[0.68rem]">{product.category}</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{product.name}</h2>
                </div>
                <span className="rounded-full bg-[var(--brand-blue-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand-blue)]">
                  {product.status}
                </span>
              </div>

              <p className="mt-4 text-lg font-semibold tracking-tight text-[#13172b]">{product.tagline}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{product.description}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <p key={feature} className="surface-muted rounded-2xl px-4 py-3 text-sm text-[var(--brand-muted)]">
                    {feature}
                  </p>
                ))}
              </div>

              <Link href={product.href} className="brand-button mt-6 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold">
                {product.cta}
              </Link>
            </article>
          ))}
        </section>

        <section className="surface-panel mt-10 rounded-[30px] p-7 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="page-eyebrow !text-[0.68rem]">Product architecture</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                A software family for real multilingual workflows.
              </h2>
            </div>
            <div className="grid gap-3">
              {ECOSYSTEM.map((item) => (
                <p key={item} className="surface-muted rounded-2xl px-5 py-4 text-sm text-[var(--brand-muted)]">
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
