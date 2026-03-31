import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the KreyAI terms covering transcription use, credits, payments, refunds, file retention, and service limitations.",
  alternates: {
    canonical: "/terms",
  },
};

const TERMS_SECTIONS = [
  {
    title: "1. Overview",
    items: [
      "KreyAI provides transcription and language-processing services for audio content.",
      "By accessing or using KreyAI, you agree to comply with these Terms of Service.",
    ],
  },
  {
    title: "2. Use of the Service",
    intro: "You agree to use KreyAI only for lawful purposes. You must not:",
    items: [
      "Upload content that violates any laws or regulations.",
      "Upload content you do not have the right to use.",
      "Use the service to process harmful, abusive, or illegal material.",
      "Attempt to interfere with or disrupt the platform.",
      "You are solely responsible for the content you upload.",
    ],
  },
  {
    title: "3. User Content & Ownership",
    items: [
      "You retain full ownership of your audio files and generated transcripts.",
      "By using the service, you grant KreyAI a limited, temporary right to process your content solely to provide the transcription service.",
    ],
    calloutTitle: "We do not:",
    calloutItems: [
      "Claim ownership of your data.",
      "Use your data for training models.",
      "Sell or share your data.",
    ],
  },
  {
    title: "4. Data Handling & Retention",
    items: [
      "Uploaded files and generated outputs are available for download for 7 days after job completion.",
      "Access is provided through secure, time-limited links during that 7-day window.",
      "After that period, files are scheduled for automatic deletion from active storage.",
      "KreyAI does not keep customer files for ongoing operational access after that period.",
      "If you need access again after 7 days, you must submit a new job.",
      "You are responsible for downloading your files within the 7-day availability period.",
    ],
  },
  {
    title: "5. Service Availability",
    intro: "We aim to provide a reliable service, but we do not guarantee:",
    items: [
      "Continuous, uninterrupted availability.",
      "Error-free processing.",
      "KreyAI may experience downtime, maintenance, or unexpected issues.",
    ],
  },
  {
    title: "6. Accuracy Disclaimer",
    intro: "KreyAI uses advanced AI models to generate transcriptions, but:",
    items: [
      "Transcriptions may contain errors or inaccuracies.",
      "Language detection, speaker identification, and formatting are not guaranteed to be perfect.",
    ],
    calloutTitle: "Users are responsible for reviewing and verifying outputs before relying on them.",
    calloutItems: [],
  },
  {
    title: "7. Limitation of Liability",
    intro: "To the maximum extent permitted by law:",
    items: [
      "KreyAI is not liable for any indirect, incidental, or consequential damages.",
      "We are not responsible for loss of data, missed deadlines, or decisions made based on generated outputs.",
      "Use of the service is at your own risk.",
    ],
  },
  {
    title: "8. Third-Party Services",
    items: [
      "KreyAI relies on third-party infrastructure providers such as cloud storage, processing, email delivery, and payment processing.",
      "We are not responsible for failures or issues originating from those services.",
    ],
  },
  {
    title: "9. Payments, Credits & Refunds",
    items: [
      "KreyAI uses a prepaid credit model for public access to paid transcription services.",
      "Credits are purchased in advance, deducted based on submitted audio duration, and do not expire unless stated otherwise at purchase.",
      "Used credits are generally non-refundable once processing has occurred.",
      "Unused credits may be eligible for refunds or account credit at KreyAI's discretion.",
      "If a job fails because of a verified service issue, KreyAI may restore credits, retry processing, or issue a refund or account credit.",
      "Prices may change from time to time, but pricing changes apply only to future purchases.",
    ],
  },
  {
    title: "10. Payment Processing",
    items: [
      "Payments are processed by third-party payment providers such as Stripe.",
      "By completing a purchase, you authorize KreyAI and its payment processors to charge the selected amount, applicable taxes, and related fees.",
      "KreyAI does not store full payment card details on its own systems unless explicitly stated otherwise.",
    ],
  },
  {
    title: "11. Termination",
    intro: "We reserve the right to:",
    items: [
      "Suspend or terminate access to the service at any time.",
      "Remove content that violates these terms.",
    ],
  },
  {
    title: "12. Changes to the Terms",
    items: [
      "We may update these Terms of Service from time to time.",
      "Continued use of the service after updates constitutes acceptance of the revised terms.",
    ],
  },
  {
    title: "13. Governing Law",
    items: [
      "These Terms are governed by the laws of the State of Arizona, without regard to conflict of law principles.",
    ],
  },
  {
    title: "14. Contact",
    items: [
      "For questions regarding these Terms, email support@kreyai.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="page-shell text-neutral-900">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">Terms of Service</p>
          <h1 className="page-title">KreyAI Terms of Service</h1>
          <p className="page-lede">
            Welcome to KreyAI. By using our services, you agree to these terms. If you do not agree, please do not use
            the service.
          </p>
          <p className="page-meta">Effective Date: March 26, 2026</p>
        </div>

        <div className="mt-14 grid gap-5">
          {TERMS_SECTIONS.map((section) => (
            <article
              key={section.title}
              className="surface-panel rounded-[28px] p-6"
            >
              <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
              {section.intro ? (
                <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{section.intro}</p>
              ) : null}
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--brand-muted)]">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--brand-blue)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {section.calloutTitle ? (
                <div className="surface-callout mt-5 rounded-[20px] p-5">
                  <p className="text-sm font-semibold text-[var(--brand-blue-deep)]">{section.calloutTitle}</p>
                  {section.calloutItems.length > 0 ? (
                    <ul className="mt-3 space-y-3 text-sm leading-7 text-[var(--brand-blue-deep)]">
                      {section.calloutItems.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--brand-blue-deep)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <div className="surface-panel mt-12 rounded-[28px] p-7">
          <p className="text-sm leading-7 text-[var(--brand-muted)]">
            Questions regarding these terms can be sent to{" "}
            <span className="font-medium text-neutral-900">support@kreyai.com</span>.
          </p>
        </div>
      </section>
    </main>
  );
}
