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
        <header className="w-full border-b border-neutral-200 bg-white">
  <div className="mx-auto max-w-6xl px-6 h-20 flex items-center justify-between">

    <a href="/" className="flex items-center">
      <img
        src="/logo.svg"
        alt="KreyAI"
        className="h-10 md:h-12 w-auto"
      />
    </a>

  </div>
</header>

        {/* Page Content */}
        <main>{children}</main>

      </body>
    </html>
  );
}