import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Transcription Pricing | KreyAI",
  description:
    "Simple prepaid transcription credits from KreyAI. Buy minutes when you need them with no subscriptions or seat licenses.",
  keywords: [
    "transcription pricing",
    "Haitian Creole transcription pricing",
    "AI transcription credits",
    "speaker labeled transcription pricing",
    "subtitle transcription pricing",
    "French transcription pricing",
    "Spanish transcription pricing",
    "Portuguese transcription pricing",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Transcription Pricing | KreyAI",
    description:
      "Simple prepaid transcription credits from KreyAI. Buy minutes when you need them with no subscriptions or seat licenses.",
    url: "/pricing",
    alternateLocale: ["fr_FR", "ht_HT", "es_ES", "pt_PT"],
  },
  other: {
    "content-language": "en, fr, ht, es, pt",
    "target-languages": "French, Haitian Creole, Spanish, Portuguese",
  },
};

const CREDIT_PACKS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    label: "Get started",
    credits: "30 minutes included",
    description: "A one-time starter allowance for testing KreyAI with short audio files.",
    points: ["One-time starter credit", "Good for short files", "No subscription required"],
  },
  {
    id: "starter",
    name: "Starter Pack",
    price: "$10",
    label: "Popular",
    credits: "120 minutes",
    description: "A prepaid pack for interviews, meetings, podcasts, and regular transcription work.",
    points: ["Prepaid credits", "Good for regular jobs", "Credits do not expire"],
  },
  {
    id: "growth",
    name: "Growth Pack",
    price: "$25",
    label: "Best value",
    credits: "330 minutes",
    description: "More minutes at a lower effective rate for heavier transcription workflows.",
    points: ["Lower effective rate", "More transcription minutes", "No seat licenses"],
  },
];

const HOW_CREDITS_WORK = [
  "Credits are deducted based on audio duration.",
  "New users receive a one-time 30-minute starter allowance.",
  "Credits do not expire.",
  "Adwaz and Dekk are separate from transcription credits.",
];

export default function PricingPage() {
  return (
    <main className="page-shell text-[#101426]">
      <section className="page-wrap">
        <div className="page-header">
          <p className="page-eyebrow">Pricing</p>
          <h1 className="page-title">Simple prepaid credits for transcription.</h1>
          <p className="page-lede">
            Buy credits when you need them. No subscriptions, no seat licenses, and no recurring commitment.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {CREDIT_PACKS.map((pack) => (
            <article key={pack.name} className="surface-panel rounded-[30px] p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold">{pack.name}</p>
                  <p className="mt-1 text-sm text-[var(--brand-blue)]">{pack.label}</p>
                </div>
                <p className="text-right text-lg font-semibold">{pack.price}</p>
              </div>

              <p className="mt-5 text-3xl font-semibold tracking-tight">{pack.credits}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">{pack.description}</p>

              <div className="mt-6 space-y-3">
                {pack.points.map((point) => (
                  <div key={point} className="surface-muted rounded-2xl px-4 py-3 text-sm text-[var(--brand-muted)]">
                    {point}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href={pack.id === "free" ? "/transcription" : `/billing?pack=${encodeURIComponent(pack.id)}`}
                  className="brand-button inline-flex w-full items-center justify-center rounded-2xl px-5 py-3.5 text-sm font-semibold"
                >
                  {pack.id === "free" ? "Start free" : `Buy ${pack.name}`}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="surface-panel mt-14 rounded-[30px] p-7">
          <h2 className="text-2xl font-semibold tracking-tight">How credits work</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {HOW_CREDITS_WORK.map((item) => (
              <div key={item} className="surface-muted rounded-2xl px-5 py-4 text-sm leading-7 text-[var(--brand-muted)]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="surface-callout rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--brand-blue-deep)]">
              Dekk is priced separately.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--brand-blue-deep)]">
              KreyAI Dekk is desktop software for local transcription playback. It is licensed separately from
              transcription credits.
            </p>
            <Link href="/dekk" className="brand-button mt-5 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold">
              Learn about Dekk
            </Link>
          </div>

          <div className="surface-callout rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--brand-blue-deep)]">
              Adwaz is priced separately.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--brand-blue-deep)]">
              Adwaz is separate from transcription credits and is built for Haitian Creole writing review, spelling,
              grammar, and orthography workflows.
            </p>
            <Link href="/adwaz" className="brand-button mt-5 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold">
              Open Adwaz
            </Link>
          </div>
        </div>

        <div className="surface-panel mt-10 rounded-[30px] p-7">
          <h2 className="text-2xl font-semibold tracking-tight">Payments & refunds</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--brand-muted)]">
            Payments are processed securely through third-party providers. Used credits are generally non-refundable
            once processing has occurred. See Terms for full details.
          </p>
          <Link href="/terms" className="mt-5 inline-flex text-sm font-semibold text-[var(--brand-blue)] underline underline-offset-4">
            View Terms
          </Link>
        </div>
      </section>
    </main>
  );
}
