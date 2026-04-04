// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Analytics from "./analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://kreyai.com"),
  title: {
    default: "KreyAI | Audio Transcription With Speaker Labels and Credits",
    template: "%s | KreyAI",
  },
  description:
    "KreyAI turns audio into clean transcripts, subtitles, and speaker-labeled outputs for interviews, podcasts, meetings, and multilingual recordings.",
  keywords: [
    "audio transcription",
    "speaker labeled transcription",
    "multilingual transcription",
    "podcast transcript",
    "interview transcription",
    "meeting transcription",
    "subtitle export",
    "haitian creole transcription",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://kreyai.com",
    siteName: "KreyAI",
    title: "KreyAI | Audio Transcription With Speaker Labels and Credits",
    description:
      "Transcribe interviews, podcasts, meetings, and real conversations with clean exports and speaker-labeled premium output.",
    images: [
      {
        url: "/og-kreyai.jpg",
        width: 1200,
        height: 630,
        alt: "KreyAI",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "KreyAI | Audio Transcription With Speaker Labels and Credits",
    description:
      "Clean transcripts, subtitle exports, and speaker-labeled premium output for real-world audio.",
    images: ["/og-kreyai.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased">
        <Analytics measurementId={measurementId} />
        <header className="sticky top-0 z-50 border-b border-[var(--brand-border)] bg-[rgba(248,250,252,0.86)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
            <Link href="/" className="flex items-center">
              <div className="logo-container">
                <Image src="/icon.svg" alt="KreyAI logo" width={52} height={52} className="logo-icon" priority />
                <div className="logo-text">
                  <h1>Kreyai</h1>
                  <p>Beyond transcription.</p>
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--brand-muted)] md:flex">
              <Link href="/about" className="transition hover:text-[#13172b]">
                About
              </Link>
              <Link href="/pricing" className="transition hover:text-[#13172b]">
                Pricing
              </Link>
              <Link href="/billing" className="transition hover:text-[#13172b]">
                Billing
              </Link>
              <Link href="/faq" className="transition hover:text-[#13172b]">
                FAQ
              </Link>
              <Link href="/privacy" className="transition hover:text-[#13172b]">
                Privacy
              </Link>
              <Link href="/terms" className="transition hover:text-[#13172b]">
                Terms
              </Link>
              <Link
                href="/"
                className="rounded-full brand-button px-4 py-2 transition"
              >
                Start
              </Link>
            </nav>

            <nav className="flex w-full flex-wrap gap-4 border-t border-[var(--brand-border)] pt-3 text-sm font-medium text-[var(--brand-muted)] md:hidden">
              <Link href="/about" className="transition hover:text-[#13172b]">
                About
              </Link>
              <Link href="/billing" className="transition hover:text-[#13172b]">
                Billing
              </Link>
              <Link href="/faq" className="transition hover:text-[#13172b]">
                FAQ
              </Link>
              <Link href="/pricing" className="transition hover:text-[#13172b]">
                Pricing
              </Link>
              <Link href="/privacy" className="transition hover:text-[#13172b]">
                Privacy
              </Link>
              <Link href="/terms" className="transition hover:text-[#13172b]">
                Terms
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>
        <footer className="border-t border-[var(--brand-border)] bg-white/70">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-sm text-[var(--brand-muted)] md:flex-row md:items-center md:justify-between">
            <p>© 2026 KreyAI Technologies LLC. All rights reserved.</p>
            <nav className="flex flex-wrap items-center gap-5">
              <Link href="/about" className="transition hover:text-[#13172b]">
                About
              </Link>
              <Link href="/privacy" className="transition hover:text-[#13172b]">
                Privacy
              </Link>
              <Link href="/terms" className="transition hover:text-[#13172b]">
                Terms
              </Link>
              <a href="mailto:support@kreyai.com" className="transition hover:text-[#13172b]">
                Contact
              </a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
