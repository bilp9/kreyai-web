import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About KreyAI",
  description:
    "KreyAI builds practical software for language professionals across transcription, translation, writing review, playback control, and multilingual workflows.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About KreyAI",
    description:
      "KreyAI builds practical software for translators, transcriptionists, reviewers, writers, researchers, educators, and multilingual teams.",
    url: "/about",
  },
};

const PRODUCT_POINTS = [
  {
    name: "aTelier",
    description:
      "A local-first translation workbench for modern linguists, with translation memory, terminology, side-by-side editing, QA checks, and export workflows.",
  },
  {
    name: "Dekk",
    description:
      "Local playback software built for transcribers who need keyboard-friendly audio and video control while they type.",
  },
  {
    name: "Adwaz",
    description:
      "A Haitian Creole writing assistant for grammar, spelling, style suggestions, consistency checks, and dictionary-supported review.",
  },
  {
    name: "KreyAI Transcription",
    description:
      "AI transcription and speech-to-text for audio and video files, with speaker labels, subtitles, and export-ready text.",
  },
];

const APPROACH_POINTS = [
  "Focused tools instead of bloated platforms",
  "Professional language technology that is more accessible and affordable",
  "Support for multilingual and mixed-language workflows",
  "Human judgment stays in control of the final result",
  "Local-first workflows whenever files do not need to leave the device",
];

const AUDIENCES = [
  "Translators and localization teams",
  "Interpreters and transcriptionists",
  "Researchers, journalists, and educators",
  "Writers, reviewers, and multilingual organizations",
];

export default function AboutPage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">About KreyAI</p>
          <h1 className="page-title">Practical software for language professionals.</h1>
          <p className="page-lede">
            KreyAI supports transcription, translation, writing review, playback control, and multilingual workflows.
          </p>
        </div>

        <div className="mt-14 grid gap-5">
          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Built by a working linguist</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              KreyAI is built by someone who does this work, not just studies it. Our founder is a working
              multilingual interpreter and has worked as an analytical linguist supporting detail-critical work for
              federal agencies, where a single mistranslated word has real consequences.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              That experience shapes how KreyAI is built: tools designed around what the work actually requires, by
              someone who has done real-time interpreting and high-stakes linguistic analysis, not just imagined it
              from the outside.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              That's paired with a background in business operations and continuity planning, including hands-on
              work building AI-assisted workflows to analyze historical records and improve triage accuracy. The
              result is software built by someone who understands the linguistic work, the operational discipline
              behind running it, and how to build practical AI tools without overpromising what they can do.
            </p>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">What KreyAI Builds</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              KreyAI builds practical software for people who work with language every day. We started with
              transcription, but the mission is broader: make professional language technology more useful, more
              accessible, and more affordable.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Whether you are a translator, interpreter, transcriptionist, researcher, journalist, educator, or
              localization team, KreyAI aims to provide tools that fit the way language work actually happens.
            </p>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Who We Build For</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {AUDIENCES.map((item) => (
                <p key={item} className="surface-muted rounded-2xl px-5 py-4 text-sm text-[var(--brand-muted)]">
                  {item}
                </p>
              ))}
            </div>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Our Products</h2>
            <div className="mt-5 grid gap-4">
              {PRODUCT_POINTS.map((item) => (
                <article key={item.name} className="surface-muted rounded-[22px] p-5">
                  <h3 className="text-lg font-semibold tracking-tight text-[#13172b]">{item.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Why KreyAI Exists</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Language work often crosses tools and formats. A project may begin as audio, become a transcript, move
              into translation, require focused playback control, and finish as polished writing. Many existing tools are either
              too generic, too expensive, or too disconnected from the actual workflow.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              KreyAI was created to build software that stays closer to the work: clear interfaces, practical outputs,
              multilingual awareness, and workflows where people remain in control.
            </p>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Our Approach</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--brand-muted)]">
              {APPROACH_POINTS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--brand-blue)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Privacy by Design</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Sensitive audio, transcripts, translation projects, and language review data deserve careful handling by
              default. KreyAI products are designed to process your work, not turn it into a product.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              We keep data collection minimal, avoid using customer audio or transcript data to train AI models, and
              prefer local workflows when files do not need to leave the device.
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
