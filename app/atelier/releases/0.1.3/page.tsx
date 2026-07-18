import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "aTelier 0.1.3 Release Notes | KreyAI",
  description:
    "Release notes for aTelier 0.1.3, featuring a cleaner and more responsive translation editor.",
  alternates: {
    canonical: "/atelier/releases/0.1.3",
  },
};

const NOTES = [
  "A cleaner editor with compact status counts integrated into segment filters.",
  "Improved active-segment focus and a simpler translation prompt.",
  "Responsive footer navigation that remains clear at narrower window sizes.",
  "Translation-memory review counts that accurately reflect the current selection.",
  "Additional Settings interface polish.",
];

export default function AtelierReleasePage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">Release notes</p>
          <h1 className="page-title">aTelier 0.1.3</h1>
          <p className="page-lede">
            Early-access update for macOS. This release makes the translation editor more focused, compact, and responsive.
          </p>
        </div>

        <section className="surface-panel mt-10 rounded-[30px] p-7">
          <h2 className="text-2xl font-semibold tracking-tight">Included in this release</h2>
          <div className="mt-6 list-stack">
            {NOTES.map((note) => (
              <p key={note} className="list-item">
                <span className="list-bullet" />
                <span>{note}</span>
              </p>
            ))}
          </div>
        </section>

        <section className="surface-callout mt-8 rounded-[30px] p-7">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--brand-blue-deep)]">Early-access notes</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--brand-blue-deep)]">
            Try aTelier free for 30 days. Continue with a one-time $149 license, including all updates for now.
            Please keep backups of client work and report issues to hello@kreyai.com.
          </p>
          <Link href="/atelier" className="brand-button mt-6 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold">
            Back to aTelier
          </Link>
        </section>
      </section>
    </main>
  );
}
