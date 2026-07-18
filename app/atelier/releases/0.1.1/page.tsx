import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "aTelier 0.1.1 Release Notes | KreyAI",
  description:
    "Release notes for aTelier 0.1.1, a local-first CAT tool for translators.",
  alternates: {
    canonical: "/atelier/releases/0.1.1",
  },
};

const NOTES = [
  "Update checks now time out cleanly instead of leaving the app in a checking state.",
  "Settings now shows a clear update result and keeps the download page available as a fallback.",
  "Build label updated from private beta to early access.",
  "Local-first project workspace for professional CAT translation.",
  "Daily update checks that do not upload client files.",
];

export default function AtelierReleasePage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">Release notes</p>
          <h1 className="page-title">aTelier 0.1.1</h1>
          <p className="page-lede">
            Early-access update for macOS. This release focuses on update-check reliability and clearer status messages
            while keeping the local-first CAT workspace unchanged.
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
