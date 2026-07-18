import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "aTelier 0.1.5 Release Notes | KreyAI",
  description: "Release notes for aTelier 0.1.5, including reliable in-app update checks on macOS.",
  alternates: { canonical: "/atelier/releases/0.1.5" },
};

const NOTES = [
  "Fixed update checks in the packaged macOS app by using the bundled trusted certificate store.",
  "The Check for Updates button now reliably returns to its normal state after every check.",
  "Includes the editor and Settings refinements introduced in 0.1.3.",
];

export default function AtelierReleasePage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">Release notes</p>
          <h1 className="page-title">aTelier 0.1.5</h1>
          <p className="page-lede">This macOS update restores reliable in-app update checks.</p>
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
