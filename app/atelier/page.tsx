import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import AtelierPurchasePanel from "./AtelierPurchasePanel";

export const metadata: Metadata = {
  title: "aTelier CAT Tool for macOS | Local Translation Memory Software",
  description:
    "Download aTelier by KreyAI, a local-first CAT tool for professional translators with translation memory, bilingual editing, QA, backup, and DOCX export workflows.",
  keywords: [
    "aTelier",
    "KreyAI aTelier",
    "CAT tool",
    "computer assisted translation",
    "translation memory",
    "local translation software",
    "translator software",
    "Haitian Creole translation memory",
    "DOCX translation tool",
    "offline CAT tool",
    "translation memory software for Mac",
    "Trados alternative",
  ],
  alternates: {
    canonical: "/atelier",
  },
  openGraph: {
    title: "aTelier | Local-first CAT Tool for Professional Translators",
    description:
      "Professional translation workspace for translators who need translation memory, terminology, QA, backups, and export.",
    url: "/atelier",
    type: "website",
    images: [
      {
        url: "/og-kreyai.jpg",
        width: 1200,
        height: 630,
        alt: "KreyAI aTelier CAT tool",
      },
    ],
  },
};

const FEATURES = [
  ["Project workflow", "Create local jobs, add files, and keep every client project organized."],
  ["Translation memory", "Import, search, and update one or more memories as you confirm work."],
  ["Bilingual editor", "Translate source and target side by side with tags, QA, and export."],
];

const DOWNLOADS = [
  {
    platform: "macOS",
    status: "Available now",
    href: "/atelier/download?source=website&platform=macos",
    action: "Download for macOS",
    body: "Signed desktop build for local project work.",
    active: true,
  },
  {
    platform: "Windows",
    status: "Coming soon",
    href: "mailto:hello@kreyai.com?subject=aTelier%20for%20Windows",
    action: "Get Windows update",
    body: "PC build is being prepared for testing.",
    active: false,
  },
];

const PRIVACY_POINTS = [
  "Client files stay on the translator's computer.",
  "Translation memories are stored locally unless the user exports or moves them.",
  "Update checks look for a release manifest; they do not upload project data.",
];

const FAQ = [
  [
    "Does aTelier upload client files?",
    "No. aTelier is designed as a local desktop CAT workspace. Project files, translation memories, and backups stay on the computer unless the user exports or moves them.",
  ],
  [
    "Is aTelier a machine translation app?",
    "No. aTelier Classic is a CAT tool for human translators. It focuses on translation memory, bilingual editing, QA, project files, and export workflows.",
  ],
  [
    "Is Windows supported?",
    "macOS is available first. A Windows build is planned and the download flow is already prepared for it.",
  ],
  [
    "Is aTelier a subscription?",
    "No. aTelier Classic is a one-time purchase. Pay once, activate on one machine, and receive free updates — no recurring fees or seat licenses.",
  ],
];

const INSTALL_STEPS = [
  "Download the macOS DMG.",
  "Open the DMG and drag aTelier into Applications.",
  "Launch aTelier from Applications and create your first local project.",
];

const ATELIER_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "aTelier",
  alternateName: "KreyAI aTelier",
  applicationCategory: "BusinessApplication",
  operatingSystem: ["macOS", "Windows"],
  url: "https://www.kreyai.com/atelier",
  downloadUrl: "https://www.kreyai.com/atelier/download?platform=macos",
  softwareVersion: "0.1.2",
  description:
    "Local-first CAT tool for professional translators with translation memory, bilingual editing, QA, backup, and export workflows.",
  offers: {
    "@type": "Offer",
    price: "149.00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    category: "One-time single-user license",
  },
};

export default function AtelierPage() {
  return (
    <main className="page-shell text-[#13172b]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ATELIER_SCHEMA) }}
      />
      <section className="page-wrap">
        <div className="max-w-4xl">
          <p className="page-eyebrow">aTelier</p>
          <h1 className="page-title">A local CAT workspace for professional translators.</h1>
          <p className="page-lede">
            Import client files, work segment by segment, use translation memory and glossary support, then export
            finished work from a local-first desktop app. Free for 30 days, then a one-time $149 license — no
            subscription.
          </p>
        </div>

        <div className="surface-panel mt-10 overflow-hidden rounded-[28px] p-2">
          <Image
            src="/atelier/screenshots/editor.png"
            alt="aTelier's bilingual editor showing an English-to-Spanish project with translation memory and QA panels"
            width={1440}
            height={900}
            className="w-full rounded-[22px]"
            priority
          />
        </div>

        <section id="download" className="mt-12 grid gap-4 lg:grid-cols-[1fr_0.72fr]">
          <div className="surface-panel rounded-[28px] p-6 md:p-7">
            <p className="page-eyebrow !text-[0.68rem]">Download</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">Local desktop workspace.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--brand-muted)]">
              aTelier is installed on the translator&apos;s computer. Project files, TMs, backups, and exports stay local.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {DOWNLOADS.map((download) => (
                <div
                  key={download.platform}
                  className={`download-option rounded-[22px] p-5 ${download.active ? "is-active" : ""}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{download.platform}</h3>
                      <p className="mt-1 text-sm text-[var(--brand-muted)]">{download.body}</p>
                    </div>
                    <span className="rounded-full bg-[var(--brand-blue-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand-blue-deep)]">
                      {download.status}
                    </span>
                  </div>
                  <Link
                    href={download.href}
                    className={
                      download.active
                        ? "brand-button mt-5 inline-flex rounded-xl px-5 py-3 text-sm font-semibold"
                        : "mt-5 inline-flex rounded-xl border border-[var(--brand-border)] bg-white px-5 py-3 text-sm font-semibold text-[#101426] hover:border-[var(--brand-border-strong)]"
                    }
                  >
                    {download.action}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <aside className="surface-callout rounded-[28px] p-6 md:p-7">
            <p className="page-eyebrow !text-[0.68rem]">Release</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--brand-blue-deep)]">
              Built for private client work.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--brand-blue-deep)]">
              The app can check once a day for updates, but client files and translation memories are not uploaded by the
              desktop workflow.
            </p>
            <Link
              href="/atelier/releases/0.1.2"
              className="mt-5 inline-flex rounded-xl border border-[rgba(40,41,126,0.18)] bg-white/70 px-5 py-3 text-sm font-semibold text-[var(--brand-blue-deep)] hover:border-[rgba(40,41,126,0.32)]"
            >
              View release notes
            </Link>
          </aside>
        </section>

        <section className="mt-14 border-y border-[var(--brand-border)] py-10">
          <div className="grid gap-8 md:grid-cols-3">
            {FEATURES.map(([title, body]) => (
              <article key={title}>
                <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="page-eyebrow !text-[0.68rem]">Install</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Download, install, start locally.</h2>
          </div>
          <div className="divide-y divide-[var(--brand-border)]">
            {INSTALL_STEPS.map((step, index) => (
              <div key={step} className="grid gap-4 py-4 sm:grid-cols-[3rem_1fr]">
                <span className="text-sm font-semibold text-[var(--brand-muted)]">{String(index + 1).padStart(2, "0")}</span>
                <p className="text-sm leading-7 text-[var(--brand-muted)]">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 border-b border-[var(--brand-border)] pb-12">
          <p className="page-eyebrow !text-[0.68rem]">Pricing</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">One-time purchase. No subscription.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--brand-muted)]">
            aTelier Classic is priced below mature enterprise CAT suites, and it stays that way: try it free for 30
            days, then pay once, own the license, and get free updates.
          </p>
          <Suspense
            fallback={
              <div className="surface-panel mt-10 rounded-[30px] p-7 text-sm text-[var(--brand-muted)]">
                Loading aTelier checkout...
              </div>
            }
          >
            <AtelierPurchasePanel />
          </Suspense>
        </section>

        <section className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="page-eyebrow !text-[0.68rem]">Local-first</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--brand-blue-deep)]">
              Built for confidential client work.
            </h2>
          </div>
          <div className="grid gap-4">
            {PRIVACY_POINTS.map((point) => (
              <p key={point} className="border-b border-[var(--brand-border)] pb-4 text-sm leading-7 text-[var(--brand-muted)]">
                {point}
              </p>
            ))}
            <Link
              href="mailto:hello@kreyai.com?subject=aTelier%20feedback"
              className="mt-2 inline-flex w-fit rounded-xl border border-[#dfe3eb] bg-white px-5 py-3 text-sm font-semibold text-[#101426] hover:border-[#bfc7de]"
            >
              Send feedback
            </Link>
          </div>
        </section>

        <section className="mt-12 border-t border-[var(--brand-border)] pt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Common questions</h2>
          <div className="mt-6 divide-y divide-[var(--brand-border)]">
            {FAQ.map(([question, answer]) => (
              <div key={question} className="grid gap-3 py-5 md:grid-cols-[0.8fr_1.2fr]">
                <h3 className="font-semibold tracking-tight">{question}</h3>
                <p className="text-sm leading-7 text-[var(--brand-muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
