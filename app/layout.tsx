// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Analytics from "./analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://kreyai.com"),
  title: {
    default: "KreyAI | Practical Language Tools",
    template: "%s | KreyAI",
  },
  description:
    "KreyAI builds practical software for transcription, translation, media review, writing support, and multilingual workflows.",
  keywords: [
    "haitian creole transcription",
    "haitian creole writing assistant",
    "haitian creole grammar checker",
    "Adwaz",
    "KreyAI Adwaz",
    "kreyol transcription",
    "kreyol audio transcription",
    "transcription kreyol",
    "transkripsyon kreyol",
    "transcription audio francais",
    "transcription francaise",
    "transcripcion de audio en espanol",
    "transcripcion en espanol",
    "transcricao de audio em portugues",
    "transcricao em portugues",
    "French transcription",
    "Spanish transcription",
    "Portuguese transcription",
    "audio transcription",
    "speaker labeled transcription",
    "multilingual transcription",
    "AI transcription",
    "speech to text",
    "subtitle generator",
    "SRT export",
    "VTT export",
    "podcast transcript",
    "interview transcription",
    "journalism transcription",
    "legal transcription",
    "research transcription",
    "meeting transcription",
    "translation software",
    "CAT tool",
    "media review software",
    "subtitle review software",
    "KreyAI Dekk",
    "aTelier CAT tool",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://kreyai.com",
    siteName: "KreyAI",
    title: "KreyAI | Practical Language Tools",
    description:
      "Practical software for transcription, translation, media review, writing support, and multilingual workflows.",
    locale: "en_US",
    alternateLocale: ["fr_FR", "ht_HT", "es_ES", "pt_PT"],
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
    card: "summary_large_image",
    title: "KreyAI | Practical Language Tools",
    description:
      "Software for transcription, translation, media review, writing support, and multilingual workflows.",
    images: ["/og-kreyai.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "content-language": "en, fr, ht, es, pt",
    "available-languages": "English, French, Haitian Creole, Spanish, Portuguese",
    "target-languages": "French, Haitian Creole, Spanish, Portuguese",
    "language-support":
      "French transcription, Haitian Creole transcription, Spanish transcription, Portuguese transcription",
  },
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KreyAI",
  legalName: "KreyAI Technologies LLC",
  url: "https://kreyai.com",
  logo: "https://kreyai.com/icon.svg",
  email: "support@kreyai.com",
  sameAs: ["https://kreyai.com"],
};

const SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "KreyAI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://kreyai.com",
  description:
    "Language workflow software for transcription, translation, writing support, media review, and multilingual work.",
  inLanguage: ["en", "fr", "ht", "es", "pt"],
  availableLanguage: [
    {
      "@type": "Language",
      name: "English",
      alternateName: "en",
    },
    {
      "@type": "Language",
      name: "French",
      alternateName: "fr",
    },
    {
      "@type": "Language",
      name: "Haitian Creole",
      alternateName: "ht",
    },
    {
      "@type": "Language",
      name: "Spanish",
      alternateName: "es",
    },
    {
      "@type": "Language",
      name: "Portuguese",
      alternateName: "pt",
    },
  ],
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "0",
    description: "One-time starter allowance with prepaid transcription credit packs available.",
  },
  featureList: [
    "Haitian Creole transcription",
    "Multilingual transcription",
    "Speaker-labeled transcripts",
    "TXT and DOCX transcript downloads",
    "SRT and VTT subtitle exports",
    "7-day file availability",
    "No-training privacy policy",
    "Adwaz Haitian Creole writing assistant",
    "KreyAI Dekk local media review",
    "aTelier translation workbench",
    "Translation memory and terminology management",
  ],
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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify([ORGANIZATION_SCHEMA, SOFTWARE_SCHEMA]) }}
        />
        <header className="sticky top-0 z-50 border-b border-[var(--brand-border)] bg-[rgba(248,250,252,0.86)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
            <Link href="/" className="flex items-center">
              <div className="logo-container">
                <Image src="/icon.svg" alt="KreyAI logo" width={52} height={52} className="logo-icon" priority />
                <div className="logo-text">
                  <h1>KreyAI</h1>
                  <p>Language workflow software.</p>
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--brand-muted)] md:flex">
              <Link href="/products" className="transition hover:text-[#13172b]">
                Products
              </Link>
              <Link href="/about" className="transition hover:text-[#13172b]">
                About
              </Link>
              <Link href="/pricing" className="transition hover:text-[#13172b]">
                Pricing
              </Link>
              <Link href="/dekk" className="transition hover:text-[#13172b]">
                Dekk
              </Link>
              <Link href="/adwaz" className="transition hover:text-[#13172b]">
                Adwaz
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
                href="/transcription"
                className="rounded-full brand-button px-4 py-2 transition"
              >
                Start transcription
              </Link>
            </nav>

            <nav className="flex w-full flex-wrap gap-4 border-t border-[var(--brand-border)] pt-3 text-sm font-medium text-[var(--brand-muted)] md:hidden">
              <Link href="/products" className="transition hover:text-[#13172b]">
                Products
              </Link>
              <Link href="/about" className="transition hover:text-[#13172b]">
                About
              </Link>
              <Link href="/transcription" className="transition hover:text-[#13172b]">
                Transcription
              </Link>
              <Link href="/dekk" className="transition hover:text-[#13172b]">
                Dekk
              </Link>
              <Link href="/billing" className="transition hover:text-[#13172b]">
                Billing
              </Link>
              <Link href="/adwaz" className="transition hover:text-[#13172b]">
                Adwaz
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
              <Link href="/products" className="transition hover:text-[#13172b]">
                Products
              </Link>
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
