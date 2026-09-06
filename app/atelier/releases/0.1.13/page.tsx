import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "aTelier 0.1.13 Release Notes | KreyAI",
  description:
    "Release notes for aTelier 0.1.13, improving translation memory relevance and document formatting fidelity.",
  alternates: { canonical: "/atelier/releases/0.1.13" },
};

const NOTES = [
  "Show more relevant translation memory suggestions and suppress weak matches that share only a few words.",
  "Preserve protected shapes and formatting when exact translation memory matches are reused.",
  "Display underlined fill-in fields imported from Word documents and retain them during export.",
  "Reduce unnecessary visual-formatting QA findings for consistently styled segments.",
];

export default function AtelierReleasePage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">Release notes</p>
          <h1 className="page-title">aTelier 0.1.13</h1>
          <p className="page-lede">
            More reliable translation memory suggestions and better Word document fidelity.
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
