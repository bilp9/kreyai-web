import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "aTelier 0.1.8 Release Notes | KreyAI",
  description: "Release notes for aTelier 0.1.8, adding professional QA, recovery, reimport, review, search, and XLIFF workflows.",
  alternates: { canonical: "/atelier/releases/0.1.8" },
};

const NOTES = [
  "Run QA across the full file, jump directly to findings, and ignore reviewed occurrences.",
  "Create and restore recovery points, with automatic snapshots before important changes.",
  "Reimport an updated source while carrying exact translations forward and marking changed matches for review.",
  "Search across the project, preview target replacements before applying them, and search translation-memory concordance.",
  "Add and resolve segment review comments, and move segments through review states.",
  "Import and export XLIFF 1.2 and 2.0 files.",
  "Confirm segments with visible formatting warnings instead of being blocked by non-critical tag differences.",
  "Preview translated content in an approximate document view before final export review.",
];

export default function AtelierReleasePage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">Release notes</p>
          <h1 className="page-title">aTelier 0.1.8</h1>
          <p className="page-lede">A more dependable professional translation and review workflow.</p>
        </div>
        <section className="surface-panel mt-10 rounded-[30px] p-7">
          <h2 className="text-2xl font-semibold tracking-tight">Included in this release</h2>
          <div className="mt-6 list-stack">
            {NOTES.map((note) => (
              <p key={note} className="list-item"><span className="list-bullet" /><span>{note}</span></p>
            ))}
          </div>
        </section>
        <Link href="/atelier" className="brand-button mt-8 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold">
          Back to aTelier
        </Link>
      </section>
    </main>
  );
}
