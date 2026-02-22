// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kreyai",
  description: "Structured multilingual transcription",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900">

        {/* Minimal Header */}
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">

            <a href="/" className="flex items-center">
              <img
                src="/logo.svg"
                alt="Kreyai"
                className="h-12 w-auto"
              />
            </a>

            <nav className="hidden md:flex gap-8 text-sm font-medium text-neutral-600">
              <a href="/faq" className="hover:text-neutral-900 transition">
                FAQ
              </a>
              <a href="/privacy" className="hover:text-neutral-900 transition">
                Privacy
              </a>
              <a href="/terms" className="hover:text-neutral-900 transition">
                Terms
              </a>
            </nav>

          </div>
        </header>

        <main>{children}</main>

      </body>
    </html>
  );
}