// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";

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
      <body className="bg-white text-black">

        {/* Global Header */}
        <header className="border-b border-neutral-200">
          <div className="mx-auto max-w-6xl px-8 py-4">
            <img
              src="/logo.svg"
              alt="KreyAI"
              className="h-8"
            />
          </div>
        </header>

        {/* Page Content */}
        <main>{children}</main>

      </body>
    </html>
  );
}