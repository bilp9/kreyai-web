import type { Metadata } from "next";

import LinguistPartnerForm from "./LinguistPartnerForm";


export const metadata: Metadata = {
  title: "Linguist Partner Program",
  description:
    "Apply to test KreyAI language software in real professional workflows and help shape aTelier and Dekk.",
  alternates: { canonical: "/linguist-partner" },
  openGraph: {
    title: "KreyAI Linguist Partner Program",
    description: "Professional language software shaped with working linguists.",
    url: "/linguist-partner",
  },
};


const EXPECTATIONS = [
  "Use aTelier or Dekk in genuine professional work",
  "Share practical feedback when something helps—or gets in the way",
  "Report problems with enough context for us to reproduce them",
  "Keep client files private; KreyAI does not ask you to submit client content",
];


export default function LinguistPartnerPage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">Linguist Partner Program</p>
          <h1 className="page-title">Help shape tools made for language professionals.</h1>
          <p className="page-lede">
            We’re inviting a small group of working linguists to use KreyAI products at no cost and share honest,
            occasional feedback from real workflows.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <aside>
            <h2 className="text-2xl font-semibold tracking-tight">The partnership</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Selected partners receive complimentary access to the products they evaluate. In return, we ask for
              thoughtful feedback—not promotion, quotas, or formal reports.
            </p>
            <div className="mt-7 border-t border-[var(--brand-border)] pt-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brand-muted)]">What we ask</h3>
              <ul className="mt-4 space-y-4 text-sm leading-6 text-[var(--brand-muted)]">
                {EXPECTATIONS.map((expectation) => (
                  <li key={expectation} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--brand-blue)]" />
                    <span>{expectation}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-7 text-xs leading-6 text-[#7a8098]">
              Applications are reviewed individually. Applying does not guarantee selection, and client documents
              should never be included with your application or feedback.
            </p>
          </aside>

          <LinguistPartnerForm />
        </div>
      </section>
    </main>
  );
}
