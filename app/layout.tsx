// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kreyai",
  description: "Transcribe, refine, and understand audio with precision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased">
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
              <Link href="/pricing" className="transition hover:text-[#13172b]">
                Pricing
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
