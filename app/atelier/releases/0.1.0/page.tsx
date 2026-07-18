import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "aTelier 0.1.0 Release Notes | KreyAI",
  description:
    "Release notes for aTelier 0.1.0 early access, a local-first CAT tool for translators.",
  alternates: {
    canonical: "/atelier/releases/0.1.0",
  },
};

const NOTES = [
  "Local-first project workspace for professional CAT translation.",
  "Project creation flow with files, language pair, and translation memory setup.",
  "Side-by-side bilingual editor with translation memory suggestions.",
  "Protected inline formatting tags for DOCX workflows.",
  "Translation memory import, glossary, QA, project backup, and DOCX export.",
  "Daily update checks that do not upload client files.",
];

export default function AtelierReleasePage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">Release notes</p>
          <h1 className="page-title">aTelier 0.1.0</h1>
          <p className="page-lede">
            First early-access release for macOS. aTelier is a local-first CAT workspace for translators who need
            translation memory, terminology, QA, backups, and export without sending client files to KreyAI.
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
            This release is meant for real translator testing before a broader public launch. Please keep backups of
            client work and report issues to hello@kreyai.com.
          </p>
          <Link href="/atelier" className="brand-button mt-6 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold">
            Back to aTelier
          </Link>
        </section>
      </section>
    </main>
  );
}
