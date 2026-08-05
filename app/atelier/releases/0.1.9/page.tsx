import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "aTelier 0.1.9 Release Notes | KreyAI",
  description: "Release notes for aTelier 0.1.9, improving exports, portable project backups, formatting QA, and editor tools.",
  alternates: { canonical: "/atelier/releases/0.1.9" },
};

const NOTES = [
  "Save translated files through the native macOS Save dialog instead of relying on embedded-browser downloads.",
  "Back up projects with their linked translation-memory entries and restore them on another computer.",
  "Keep the Export dialog reliable across repeated export attempts.",
  "Copy protected document-structure tags, including shapes, from source to target.",
  "Avoid false extra-formatting QA warnings when a full-segment style is correctly preserved.",
  "Keep tag chips consistently sized and make very light or dark source text readable in the editor without changing exported formatting.",
  "Open project search with Command-F or Control-F, and access Search and file-wide QA directly from the editor toolbar.",
  "Open the local aTelier data folder and create portable project backups from Settings.",
];

export default function AtelierReleasePage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">Release notes</p>
          <h1 className="page-title">aTelier 0.1.9</h1>
          <p className="page-lede">More reliable exports, project transfer, formatting QA, and everyday editor controls.</p>
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
