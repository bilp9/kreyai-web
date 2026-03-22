// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KreyAI",
  description: "Structured multilingual transcription",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f7f2e8] text-neutral-900 antialiased">

        <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="KreyAI"
                width={220}
                height={124}
                priority
                className="h-14 w-auto md:h-16"
              />
            </Link>

            <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-600 md:flex">
              <Link href="/pricing" className="hover:text-neutral-900 transition">
                Pricing
              </Link>
              <Link href="/faq" className="hover:text-neutral-900 transition">
                FAQ
              </Link>
              <Link href="/privacy" className="hover:text-neutral-900 transition">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-neutral-900 transition">
                Terms
              </Link>
              <Link
                href="/"
                className="rounded-full bg-[#231f1b] px-4 py-2 text-white transition hover:bg-black"
              >
                Start
              </Link>
            </nav>

            <nav className="flex w-full flex-wrap gap-4 border-t border-black/5 pt-3 text-sm font-medium text-neutral-600 md:hidden">
              <Link href="/faq" className="hover:text-neutral-900 transition">
                FAQ
              </Link>
              <Link href="/pricing" className="hover:text-neutral-900 transition">
                Pricing
              </Link>
              <Link href="/privacy" className="hover:text-neutral-900 transition">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-neutral-900 transition">
                Terms
              </Link>
            </nav>

          </div>
        </header>

        <main>{children}</main>

      </body>
    </html>
  );
}
