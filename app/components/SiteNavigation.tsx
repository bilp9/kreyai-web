"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/products", label: "Products" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const activeClass = "text-[#13172b] underline decoration-[#28297e] decoration-2 underline-offset-8";
  const inactiveClass = "transition hover:text-[#13172b]";

  return (
    <>
      <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm font-medium text-[var(--brand-muted)] md:flex">
        {links.map((link) => {
          const active = isCurrentPath(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={active ? activeClass : inactiveClass}
            >
              {link.label}
            </Link>
          );
        })}
        <Link
          href="/transcription"
          aria-current={isCurrentPath(pathname, "/transcription") ? "page" : undefined}
          className="brand-button rounded-xl px-4 py-2 transition"
        >
          Start transcription
        </Link>
      </nav>

      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        className="inline-flex items-center gap-2 rounded-xl border border-[var(--brand-border)] bg-white px-3 py-2 text-sm font-semibold text-[#13172b] md:hidden"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true" className="text-base leading-none">{isOpen ? "×" : "☰"}</span>
        {isOpen ? "Close" : "Menu"}
      </button>

      {isOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="flex w-full flex-col gap-1 border-t border-[var(--brand-border)] pt-3 text-sm font-medium text-[var(--brand-muted)] md:hidden"
        >
          {links.map((link) => {
            const active = isCurrentPath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-2 ${active ? "bg-[var(--brand-blue-soft)] text-[#13172b]" : "transition hover:bg-slate-50 hover:text-[#13172b]"}`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/transcription"
            aria-current={isCurrentPath(pathname, "/transcription") ? "page" : undefined}
            className="rounded-lg px-3 py-2 transition hover:bg-slate-50 hover:text-[#13172b]"
          >
            Start transcription
          </Link>
        </nav>
      ) : null}
    </>
  );
}
