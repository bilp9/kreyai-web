"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          {/* If your logo is an SVG with whitespace, bump size and make it optically bigger */}
          <Image
            src="/logo.png"          // <-- adjust if it's /logo.svg
            alt="Kreyai"
            width={140}              // <-- bigger than before
            height={36}
            priority
            className="h-9 w-auto"   // <-- forces visible height
          />
        </Link>

        <nav className="flex items-center gap-6 text-sm text-neutral-600">
          <Link href="/faq" className="hover:text-neutral-900 transition">FAQ</Link>
          <Link href="/privacy" className="hover:text-neutral-900 transition">Privacy</Link>
          <Link href="/terms" className="hover:text-neutral-900 transition">Terms</Link>
        </nav>
      </div>
    </header>
  );
}