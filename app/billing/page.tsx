import { Suspense } from "react";
import BillingClient from "./billing-client";

const BILLING_SECTIONS = [
  {
    title: "1. Pricing Model",
    items: [
      "KreyAI operates on a prepaid credit system.",
      "Users purchase credits in advance.",
      "Credits are used to process audio files.",
      "Credits are deducted based on the duration of the audio submitted.",
    ],
  },
  {
    title: "2. Credit Usage",
    items: [
      "Credits are consumed when a transcription job is processed.",
      "The number of credits deducted corresponds to the length of the audio file.",
      "Once credits are used, they cannot be reversed.",
    ],
  },
  {
    title: "3. Credit Expiration",
    items: [
      "Credits do not expire.",
      "Users may use their credits at any time.",
    ],
  },
  {
    title: "4. Payments",
    items: [
      "Payments are processed securely through third-party providers such as Stripe.",
      "All prices are listed in USD unless otherwise specified.",
      "By completing a purchase, you authorize KreyAI to charge the selected amount.",
    ],
  },
  {
    title: "5. Refund Policy",
    items: [
      "Unused credits may be eligible for a refund, at our discretion.",
      "Used credits are non-refundable, as processing has already occurred.",
      "In cases of technical errors or service issues, we may restore credits or issue a refund.",
      "Refunds may be issued to the original payment method or as account credits.",
    ],
  },
  {
    title: "6. Failed or Interrupted Processing",
    items: [
      "If a job fails due to a system error, credits may be automatically restored.",
      "If a job fails due to a system error, the job may also be retried without additional charge.",
    ],
  },
  {
    title: "7. Pricing Changes",
    items: [
      "KreyAI reserves the right to update pricing at any time.",
      "Changes will not affect credits already purchased.",
      "New pricing will apply only to future purchases.",
    ],
  },
  {
    title: "8. Fraud & Abuse",
    items: [
      "We reserve the right to refuse or cancel transactions suspected of fraud or abuse.",
      "We may limit usage or access where necessary to protect the platform.",
    ],
  },
  {
    title: "9. Contact",
    items: [
      "For billing questions or refund requests, email support@kreyai.com.",
    ],
  },
];

export default function BillingPage() {
  return (
    <main className="page-shell text-neutral-900">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">Billing Policy</p>
          <h1 className="page-title">KreyAI Billing Policy</h1>
          <p className="page-lede">
            This Billing Policy explains how payments, credits, and billing are handled when using KreyAI.
          </p>
          <p className="page-meta">Effective Date: March 26, 2026</p>
        </div>

        <div className="mt-12">
          <Suspense fallback={<div className="surface-panel rounded-[28px] p-6 text-sm text-[var(--brand-muted)]">Loading billing…</div>}>
            <BillingClient />
          </Suspense>
        </div>

        <div className="mt-14 grid gap-5">
          {BILLING_SECTIONS.map((section) => (
            <article
              key={section.title}
              className="surface-panel rounded-[28px] p-6"
            >
              <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--brand-muted)]">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--brand-blue)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="surface-callout mt-12 rounded-[28px] p-7">
          <p className="text-sm leading-7 text-[var(--brand-blue-deep)]">
            Billing questions, credit issues, and refund requests can be sent to{" "}
            <span className="font-medium text-neutral-900">support@kreyai.com</span>.
          </p>
        </div>
      </section>
    </main>
  );
}
