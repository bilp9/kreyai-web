import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KreyAI | Practical Language Tools for Real Work",
  description:
    "KreyAI builds practical software for transcription, translation, playback control, writing support, and multilingual workflows.",
};

const PRODUCTS = [
  {
    title: "aTelier",
    category: "Translation and localization",
    href: "/products#atelier",
    description: "A professional CAT tool built for translators and language teams.",
  },
  {
    title: "Dekk",
    category: "Transcription playback",
    href: "/dekk",
    description: "Playback software that helps transcribers stay focused on typing.",
  },
  {
    title: "Adwaz",
    category: "Writing assistant",
    href: "/adwaz",
    description: "Grammar, spelling, and style support for Haitian Creole.",
  },
  {
    title: "KreyAI Transcription",
    category: "Speech to text",
    href: "/transcription",
    description: "Fast transcription, subtitles, and exports for audio and video files.",
  },
];

const PRINCIPLES = [
  "Focused tools instead of bloated platforms",
  "Human judgment stays in control",
  "Privacy is built into the workflow",
];

export default function Home() {
  return (
    <main className="brand-page text-[#101426]">
      <section className="mx-auto max-w-7xl px-6 py-18 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="brand-kicker inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
              <span className="brand-dot mr-2" />
              Practical language tools for real work
            </p>
            <h1 className="mt-8 text-6xl font-bold leading-[0.95] tracking-[-0.05em] md:text-8xl">
              KreyAI builds software for language professionals.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--brand-muted)] md:text-xl">
              Transcribe audio. Control playback. Translate content. Improve writing. Built for translators,
              interpreters, transcriptionists, researchers, and multilingual teams.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/products" className="brand-button inline-flex rounded-2xl px-5 py-3 text-sm font-semibold">
                Explore products
              </Link>
              <Link
                href="/atelier"
                className="inline-flex rounded-2xl border border-[#d6dbea] bg-white px-5 py-3 text-sm font-semibold text-[#101426] hover:border-[#bfc7de]"
              >
                Download aTelier
              </Link>
            </div>
          </div>

          <div className="border-l border-[var(--brand-border)] pl-8">
            <p className="page-eyebrow !text-[0.68rem]">Product family</p>
            <div className="mt-5 divide-y divide-[var(--brand-border)]">
              {PRODUCTS.map((product) => (
                <Link key={product.title} href={product.href} className="block py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue)]">
                    {product.category}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight">{product.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{product.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--brand-border)] bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-[var(--brand-border)] px-6 py-8 md:grid-cols-3 md:divide-x md:divide-y-0">
          {PRINCIPLES.map((principle) => (
            <article key={principle} className="py-5 md:px-6">
              <p className="text-base font-semibold tracking-tight">{principle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-18 md:py-24">
        <div className="text-center">
          <p className="page-eyebrow">aTelier</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            A real translation workspace, not a mockup.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--brand-muted)]">
            Bilingual editing, translation memory, and QA checks in one local desktop app.
          </p>
        </div>
        <div className="surface-panel mt-10 overflow-hidden rounded-[28px] p-2">
          <Image
            src="/atelier/screenshots/editor.png"
            alt="aTelier's bilingual editor showing an English-to-Spanish project with translation memory and QA panels"
            width={1440}
            height={900}
            className="w-full rounded-[22px]"
          />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/atelier" className="brand-button inline-flex rounded-2xl px-5 py-3 text-sm font-semibold">
            Explore aTelier
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-18 text-center md:py-24">
        <p className="page-eyebrow">Why KreyAI</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
          Language work should not require a maze of disconnected tools.
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-[var(--brand-muted)]">
          Many language professionals transcribe in one application, control playback in another, translate in a third, and
          manage writing quality somewhere else. KreyAI builds practical software that supports the real shape of that
          work.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/products" className="brand-button inline-flex rounded-2xl px-5 py-3 text-sm font-semibold">
            Explore products
          </Link>
          <Link
            href="/about"
            className="inline-flex rounded-2xl border border-[#d6dbea] bg-white px-5 py-3 text-sm font-semibold text-[#101426] hover:border-[#bfc7de]"
          >
            About KreyAI
          </Link>
        </div>
      </section>
    </main>
  );
}
