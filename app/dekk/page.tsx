import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import DekkPurchasePanel from "./DekkPurchasePanel";

export const metadata: Metadata = {
  title: "Dekk Transcription Playback Software",
  description:
    "Download Dekk by KreyAI, local transcription playback software for audio and video control, hotkeys, foot pedals, variable speed, and focused typing workflows.",
  keywords: [
    "Dekk",
    "KreyAI Dekk",
    "transcription playback software",
    "audio playback for transcribers",
    "video playback for transcription",
    "foot pedal transcription software",
    "transcription hotkeys",
    "local media playback",
    "transcription software for Mac",
    "audio control for transcription",
    "variable speed transcription player",
    "pause rewind transcription",
  ],
  alternates: {
    canonical: "/dekk",
  },
  openGraph: {
    title: "Dekk | Transcription Playback Software by KreyAI",
    description:
      "Local desktop playback software for transcribers who need hotkeys, pedal-ready controls, variable speed, and focused typing workflows.",
    url: "/dekk",
    type: "website",
    images: [
      {
        url: "/og-kreyai.jpg",
        width: 1200,
        height: 630,
        alt: "KreyAI Dekk transcription playback software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dekk | Transcription Playback Software",
    description:
      "Local playback software for transcription work, hotkeys, pedal-ready controls, and focused typing.",
    images: ["/og-kreyai.jpg"],
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

const DEKK_FAQS = [
  {
    question: "What is Dekk used for?",
    answer:
      "Dekk is desktop playback software for people who transcribe audio or video. It keeps playback controls, hotkeys, speed control, and pause rewind close so transcribers can stay focused on typing.",
  },
  {
    question: "Does Dekk upload my media files?",
    answer:
      "No. Dekk plays audio and video locally on your device. The desktop app does not upload your media files to KreyAI.",
  },
  {
    question: "Does Dekk work with foot pedals?",
    answer:
      "Yes. Dekk is pedal-ready for pedals that send keyboard shortcuts. Map your pedal buttons to the same hotkeys you choose in Dekk settings.",
  },
  {
    question: "What permissions are needed for global hotkeys on macOS?",
    answer:
      "Global hotkeys on macOS need both Accessibility and Input Monitoring permissions in System Settings. Hotkeys still work inside the app window without background control.",
  },
];

const DEKK_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Dekk",
    alternateName: "KreyAI Dekk",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Transcription playback software",
    operatingSystem: "macOS",
    url: "https://www.kreyai.com/dekk",
    downloadUrl: "https://www.kreyai.com/dekk/download?source=seo",
    softwareVersion: process.env.NEXT_PUBLIC_DEKK_VERSION || "0.1.6",
    publisher: {
      "@type": "Organization",
      name: "KreyAI",
      legalName: "KreyAI Technologies LLC",
      url: "https://www.kreyai.com",
      email: "hello@kreyai.com",
    },
    description:
      "Local desktop playback software for transcription work, audio and video control, hotkeys, pedal-ready workflows, variable speed, and pause rewind.",
    offers: [
      {
        "@type": "Offer",
        name: "Dekk Personal",
        price: "39",
        priceCurrency: "USD",
        url: "https://www.kreyai.com/dekk#pricing",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Dekk Business",
        price: "89",
        priceCurrency: "USD",
        url: "https://www.kreyai.com/dekk#pricing",
        availability: "https://schema.org/InStock",
      },
    ],
    featureList: [
      "Local audio and video playback",
      "Global hotkeys",
      "Foot pedal-ready keyboard mapping",
      "Variable speed playback",
      "Pause rewind",
      "14-day free trial",
      "One-time license",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: DEKK_FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Products",
        item: "https://www.kreyai.com/products",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Dekk",
        item: "https://www.kreyai.com/dekk",
      },
    ],
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

  return (
    <main className="page-shell text-[#13172b]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DEKK_SCHEMA) }}
      />
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
              <div className="flex flex-wrap gap-3">
                <a
                  href="/dekk/download?source=checkout&platform=macos"
                  className="brand-button inline-flex rounded-2xl px-5 py-3 text-sm font-semibold"
                >
                  Download for macOS
                </a>
                <a
                  href="/dekk/download?source=checkout&platform=windows"
                  className="brand-button inline-flex rounded-2xl px-5 py-3 text-sm font-semibold"
                >
                  Download for Windows
                </a>
              </div>
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
              Download Dekk for macOS or Windows, use the local trial, and activate a one-time license when it becomes part of
              your transcription workflow.
            </p>
          </aside>
        </div>

        <div className="surface-panel mt-10 overflow-hidden rounded-[28px] p-2">
          <Image
            src="/dekk/screenshots/player.png"
            alt="Dekk showing a multi-track playback session with hotkeys, speed control, and pause rewind"
            width={2191}
            height={1166}
            className="w-full rounded-[22px]"
            priority
          />
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
