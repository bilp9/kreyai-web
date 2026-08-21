import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "aTelier 0.1.12 Release Notes | KreyAI",
  description:
    "Release notes for aTelier 0.1.12, improving license compatibility and providing current signed installers for macOS and Windows.",
  alternates: { canonical: "/atelier/releases/0.1.12" },
};

const NOTES = [
  "Activate standard and Linguist Partner licenses more reliably.",
  "Install the current signed and notarized macOS release or signed Windows release.",
  "Keep the document fidelity, local spelling assistance, navigation, QA, and translation automation improvements introduced in recent builds.",
];

export default function AtelierReleasePage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">Release notes</p>
          <h1 className="page-title">aTelier 0.1.12</h1>
          <p className="page-lede">
            Improved license compatibility and current desktop installers for macOS and Windows.
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
