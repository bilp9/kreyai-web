import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import DekkPurchasePanel from "./DekkPurchasePanel";

export const metadata: Metadata = {
  title: "Dekk",
  description:
    "Dekk is local desktop playback software from KreyAI for transcription work, hands-on-keyboard audio control, and focused typing workflows.",
  alternates: {
    canonical: "/dekk",
  },
  openGraph: {
    title: "Dekk | KreyAI",
    description:
      "Local playback software for transcription work, keyboard-controlled audio, and focused typing workflows.",
    url: "/dekk",
  },
};

const AUDIENCES = [
  "Professional transcribers",
  "Interpreters and translators transcribing source media",
  "Researchers and journalists typing interviews",
  "Creators and teams producing transcripts from recordings",
];

const FEATURES = [
  "Play audio and video files locally",
  "Control playback without leaving your typing workspace",
  "Use hotkeys for play, pause, seeking, and track changes",
  "Adjust speed and pause rewind for transcription rhythm",
];

const LICENSES = [
  {
    name: "Personal",
    price: "$39",
    description: "For individual transcription work and local playback control.",
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

type DekkPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function DekkPage({ searchParams }: DekkPageProps) {
  const resolvedParams = await searchParams;
  const success = getSingleParam(resolvedParams?.success) === "1";
  const email = getSingleParam(resolvedParams?.email);
  const downloadUrl = process.env.NEXT_PUBLIC_DEKK_DOWNLOAD_URL;
  const trackedDownloadUrl = "/dekk/download?source=website";

  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap">
        {success ? (
          <section className="surface-callout mb-8 rounded-[30px] p-7">
            <p className="page-eyebrow !text-[0.68rem]">Payment complete</p>
            <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-[var(--brand-blue-deep)]">
                  Your Dekk license key is on its way.
                </h1>
                <p className="mt-3 text-sm leading-7 text-[var(--brand-blue-deep)]">
                  We emailed the license key to {email || "the checkout email"}. Download Dekk, open the app, then use{" "}
                  <span className="font-semibold">Help &gt; Activate License</span>.
                </p>
              </div>
              {downloadUrl ? (
                <a href={trackedDownloadUrl} className="brand-button inline-flex rounded-2xl px-5 py-3 text-sm font-semibold">
                  Download Dekk for macOS
                </a>
              ) : (
                <Link
                  href="#download"
                  className="inline-flex rounded-2xl border border-[#d6dbea] bg-white px-5 py-3 text-sm font-semibold text-[#101426] hover:border-[#bfc7de]"
                >
                  Go to download
                </Link>
              )}
            </div>
          </section>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div className="page-header">
            <p className="page-eyebrow">Dekk</p>
            <h1 className="page-title">Playback built for people who transcribe.</h1>
            <p className="page-lede">
              Dekk lets transcribers control audio and video locally while staying focused on typing. Play, pause,
              seek, and adjust speed without bouncing between windows or hunting for playback controls.
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
              Download Dekk for macOS, use the local trial, and activate a one-time license when it becomes part of
              your transcription workflow.
            </p>
          </aside>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <section className="surface-panel rounded-[30px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">What Dekk is</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Dekk is a focused playback app for transcription. It keeps media controls close, predictable, and
              keyboard-friendly so you can listen, pause, rewind, and keep typing without navigating multiple pages or
              switching between heavy production tools.
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
              Dekk is for people who need to produce transcripts from recordings and want playback to feel like part of
              the typing process instead of a separate task.
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
