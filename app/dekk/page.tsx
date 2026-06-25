import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import DekkPurchasePanel from "./DekkPurchasePanel";

export const metadata: Metadata = {
  title: "Dekk",
  description:
    "Dekk is local desktop software from KreyAI for audio and video review, transcript verification, subtitle QA, and multilingual media workflows.",
  alternates: {
    canonical: "/dekk",
  },
  openGraph: {
    title: "Dekk | KreyAI",
    description:
      "Local audio and video review software for transcript verification, subtitle QA, and multilingual media workflows.",
    url: "/dekk",
  },
};

const AUDIENCES = [
  "Transcribers and transcript reviewers",
  "Translators, interpreters, and localization teams",
  "Subtitle QA and media production workflows",
  "Researchers, journalists, and creators reviewing source media",
];

const FEATURES = [
  "Review audio and video files locally",
  "Use keyboard shortcuts for playback and seeking",
  "Keep media review separate from cloud editing tools",
  "Support transcript verification and subtitle QA workflows",
];

const LICENSES = [
  {
    name: "Personal",
    price: "$39",
    description: "For individual local media review and transcript QA.",
    points: ["One-time desktop license", "Use by one person", "Free updates for the current major version"],
  },
  {
    name: "Business",
    price: "$89",
    description: "For companies, studios, agencies, and professional client work.",
    points: ["Commercial use", "One named user or workstation", "Priority email support"],
  },
  {
    name: "Team",
    price: "Contact",
    description: "For multi-seat licensing, centralized purchasing, and larger organizations.",
    points: ["Multi-seat or site licensing", "One invoice for the organization", "Custom rollout terms"],
  },
];

export default function DekkPage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div className="page-header">
            <p className="page-eyebrow">Dekk</p>
            <h1 className="page-title">Local media review for transcript and subtitle work.</h1>
            <p className="page-lede">
              Dekk is desktop software for reviewing audio and video during transcript verification, subtitle quality
              assurance, and multilingual media workflows.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#download" className="brand-button inline-flex rounded-2xl px-5 py-3 text-sm font-semibold">
                Download Dekk
              </Link>
              <Link
                href="/products"
                className="inline-flex rounded-2xl border border-[#d6dbea] bg-white px-5 py-3 text-sm font-semibold text-[#101426] hover:border-[#bfc7de]"
              >
                View products
              </Link>
            </div>
          </div>

          <aside className="surface-callout rounded-[30px] p-7">
            <p className="page-eyebrow !text-[0.68rem]">Trial included</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--brand-blue-deep)]">
              Start with 14 days.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--brand-blue-deep)]">
              Download Dekk for macOS, review files locally, and activate a one-time license when it becomes part of
              your regular workflow.
            </p>
          </aside>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <section className="surface-panel rounded-[30px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">What Dekk is</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Dekk gives language and media professionals a focused player for checking source media while reviewing
              transcripts, subtitles, and edits. It is built for the practical review step between raw media and a
              finished deliverable.
            </p>
            <div className="mt-6 grid gap-3">
              {FEATURES.map((feature) => (
                <div key={feature} className="surface-muted rounded-2xl px-5 py-4 text-sm text-[var(--brand-muted)]">
                  {feature}
                </div>
              ))}
            </div>
          </section>

          <section className="surface-panel rounded-[30px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Who it is for</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Dekk is for people who need to verify what was said, compare timing, check subtitles, or review media
              without opening a heavy production suite.
            </p>
            <div className="mt-6 grid gap-3">
              {AUDIENCES.map((audience) => (
                <div key={audience} className="surface-muted rounded-2xl px-5 py-4 text-sm text-[var(--brand-muted)]">
                  {audience}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="surface-panel mt-10 rounded-[30px] p-7">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="page-eyebrow !text-[0.68rem]">Local and private</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Your media stays on your device.</h2>
            </div>
            <p className="text-sm leading-7 text-[var(--brand-muted)]">
              Dekk is designed for local playback. Audio and video files opened in Dekk are not uploaded to KreyAI by
              the desktop app. Local settings, playback state, and diagnostic logs may be stored on your device to help
              the app work and support troubleshooting.
            </p>
          </div>
        </section>

        <section id="pricing" className="mt-10">
          <div className="mb-6">
            <p className="page-eyebrow">Pricing</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">One-time desktop licensing.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {LICENSES.map((license) => (
              <article key={license.name} className="surface-panel rounded-[30px] p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{license.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">{license.description}</p>
                  </div>
                  <p className="shrink-0 text-lg font-semibold">{license.price}</p>
                </div>
                <div className="mt-6 space-y-3">
                  {license.points.map((point) => (
                    <p key={point} className="surface-muted rounded-2xl px-4 py-3 text-sm text-[var(--brand-muted)]">
                      {point}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div id="download">
          <Suspense fallback={<div className="surface-panel mt-10 rounded-[30px] p-7 text-sm text-[var(--brand-muted)]">Loading Dekk checkout...</div>}>
            <DekkPurchasePanel />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
