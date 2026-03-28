const PRIVACY_SECTIONS = [
  {
    title: "1. Information We Collect",
    intro: "We collect only the information necessary to provide our services:",
    items: [
      "User-provided information: email address for job access and delivery, audio files you upload, and optional metadata you provide.",
      "Generated data: transcripts and output files generated from your uploads, along with processing metadata such as duration, language detection, and timestamps.",
      "Billing information: transaction and purchase metadata needed to confirm credit purchases, process refunds, prevent abuse, and support billing operations.",
      "Technical data: basic system logs like request timestamps and job IDs, plus error logs used for debugging and service reliability.",
      "We do not collect unnecessary personal data.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    intro: "Your data is used strictly to operate the service:",
    items: [
      "Process and transcribe your audio files.",
      "Generate downloadable outputs such as TXT, DOCX, and SRT files.",
      "Deliver job results and notifications.",
      "Process payments, credit purchases, refunds, and fraud-prevention checks.",
      "Maintain system performance and reliability.",
    ],
    calloutTitle: "We do not use your data for:",
    calloutItems: [
      "Training AI or machine learning models.",
      "Marketing or advertising.",
      "Selling or sharing with third parties.",
    ],
  },
  {
    title: "3. Data Retention",
    items: [
      "All uploaded files and generated outputs are automatically deleted after 7 days.",
      "Temporary processing data is deleted once jobs are completed or expired.",
      "Logs may be retained longer for operational and security purposes, but do not contain your file content.",
    ],
  },
  {
    title: "4. Data Storage & Security",
    intro: "We implement appropriate technical measures to protect your data:",
    items: [
      "Secure cloud storage, including encrypted storage systems.",
      "Time-limited, signed access links.",
      "Restricted internal access to systems.",
      "While we take strong precautions, no system is 100% secure. We continuously improve our safeguards.",
    ],
  },
  {
    title: "5. Data Sharing",
    intro:
      "We do not sell, rent, or trade your data. We only share data when necessary to operate the service, such as:",
    items: [
      "Cloud infrastructure providers for storage and processing.",
      "Email delivery services for notifications.",
      "Payment processors for secure purchase handling and related billing workflows.",
      "These providers are used strictly to deliver the service and are not permitted to use your data for other purposes.",
    ],
  },
  {
    title: "6. Payments & Billing",
    items: [
      "Payments are processed by third-party providers such as Stripe.",
      "KreyAI does not receive or store full payment card numbers on its own systems unless explicitly stated otherwise.",
      "We may receive limited billing details such as payment status, transaction identifiers, card brand, and partial card information from payment providers.",
      "Billing data is used only for purchase confirmation, support, refunds, accounting, and fraud prevention.",
    ],
  },
  {
    title: "7. Your Rights & Control",
    items: [
      "You may choose not to upload sensitive content.",
      "You may download your files at any time within the retention period.",
      "You may request early deletion of your data as a future feature.",
    ],
  },
  {
    title: "8. Third-Party Services",
    items: [
      "KreyAI relies on trusted third-party infrastructure providers such as cloud hosting, storage, email, and payment services.",
      "These providers process data only as required to deliver the service.",
    ],
  },
  {
    title: "9. Children's Privacy",
    items: [
      "KreyAI is not intended for use by individuals under the age of 13.",
      "We do not knowingly collect data from children.",
    ],
  },
  {
    title: "10. Changes to This Policy",
    items: [
      'We may update this Privacy Policy from time to time. Updates will be reflected with a revised "Effective Date."',
    ],
  },
  {
    title: "11. Contact",
    items: [
      "If you have any questions about this Privacy Policy, you may contact us at support@kreyai.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="page-shell text-neutral-900">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">Privacy Policy</p>
          <h1 className="page-title">KreyAI Privacy Policy</h1>
          <p className="page-lede">
            KreyAI is committed to protecting your privacy. This policy explains how we collect, use, store, and
            protect your information when you use our services.
          </p>
          <p className="page-meta">Effective Date: March 26, 2026</p>
        </div>

        <div className="mt-14 grid gap-5">
          {PRIVACY_SECTIONS.map((section) => (
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
                  <ul className="mt-3 space-y-3 text-sm leading-7 text-[var(--brand-blue-deep)]">
                    {section.calloutItems?.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--brand-blue-deep)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <div className="surface-callout mt-12 rounded-[28px] p-7">
          <p className="text-sm leading-7 text-[var(--brand-blue-deep)]">
            Questions about privacy or data handling can be sent to{" "}
            <span className="font-medium text-neutral-900">support@kreyai.com</span>.
          </p>
        </div>
      </section>
    </main>
  );
}
