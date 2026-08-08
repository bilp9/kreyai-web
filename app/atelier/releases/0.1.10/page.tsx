import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "aTelier 0.1.10 Release Notes | KreyAI",
  description:
    "Release notes for aTelier 0.1.10, improving document fidelity, local spelling assistance, editor navigation, and translation automation.",
  alternates: { canonical: "/atelier/releases/0.1.10" },
};

const NOTES = [
  "Preserve DOCX headers, footers, formatting structure, and hyperlinks more reliably during translation and export.",
  "Keep linked text and the rest of its translated sentence intact in exported DOCX files.",
  "Check Haitian Creole spelling locally, with personal dictionary entries that remain on your computer.",
  "Carry exact numbers, phone-like values, and numeric ranges into the target automatically.",
  "Move through long files more smoothly with clearer page and segment navigation.",
  "Keep project completion percentages current when returning from the editor.",
  "Use file-wide QA with clearer issue handling and fewer duplicate controls.",
  "Work with more reliable inline formatting tags, source selection, and confirmed-segment status changes after edits.",
];

export default function AtelierReleasePage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">Release notes</p>
          <h1 className="page-title">aTelier 0.1.10</h1>
          <p className="page-lede">
            Better document fidelity, local language assistance, and a smoother professional translation workflow.
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
        <Link href="/atelier" className="brand-button mt-8 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold">
          Back to aTelier
        </Link>
      </section>
    </main>
  );
}
