import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Review how KreyAI handles transcription uploads, aTelier and Dekk local data, Adwaz review text, billing records, retention, and deletion.",
  alternates: {
    canonical: "/privacy",
  },
};

const PRIVACY_SECTIONS = [
  {
    title: "1. Information We Collect",
    intro: "We collect only the information necessary to provide our services:",
    items: [
      "User-provided information: email address for job access and delivery, audio files you upload, and optional metadata you provide.",
      "Generated data: transcripts and output files generated from your uploads, along with processing metadata such as duration, language detection, and timestamps.",
      "Adwaz text: text you submit for writing review is processed to return corrections and is not saved by default.",
      "KreyAI Dekk desktop data: files opened in KreyAI Dekk remain on your device. The desktop app may store local file paths, playback positions, hotkey settings, theme preferences, and diagnostic logs on your device.",
      "aTelier desktop data: project files, source and target text, translation memories, glossaries, backups, preferences, and diagnostic logs are stored locally on your device.",
      "Desktop licensing data: aTelier and Dekk activation may send a license key, a device identifier, app version, and limited purchase metadata needed to validate and manage a license.",
      "Billing information: transaction and purchase metadata needed to confirm credit purchases, process refunds, prevent abuse, and support billing operations.",
      "Technical data: basic system logs like request timestamps and job IDs, Dekk download event counts using hashed request metadata, plus privacy-safe Adwaz review metadata such as text length, word count, issue count, latency, and optional feedback reports.",
      "We do not collect unnecessary personal data.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    intro: "Your data is used strictly to operate the service:",
    items: [
      "Process and transcribe your audio files.",
      "Generate downloadable outputs such as TXT, DOCX, and SRT files.",
      "Review Haitian Creole writing in Adwaz and return correction suggestions.",
      "Support local KreyAI Dekk workflows such as playback resume, hotkey preferences, and diagnostic troubleshooting.",
      "Validate desktop licenses, prevent activation abuse, and provide update availability and release notes.",
      "Deliver job results and notifications.",
      "Process payments, credit purchases, refunds, and fraud-prevention checks.",
      "Measure Dekk download activity and product adoption without storing raw IP addresses in the download event record.",
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
      "Uploaded files and generated outputs are retained for a 7-day availability window after job completion.",
      "After that period, files are scheduled for automatic deletion from active storage.",
      "KreyAI does not keep customer files for ongoing operational access after that 7-day period.",
      "If you need access again after 7 days, you must submit a new job.",
      "Temporary processing data is deleted once jobs are completed or expired.",
      "Adwaz review text is not stored by default; privacy-safe telemetry and optional feedback reports may be retained for quality and reliability review.",
      "KreyAI Dekk diagnostic logs and app state are stored locally on your device and are not sent automatically.",
      "aTelier projects, translation memories, glossaries, backups, preferences, and diagnostic logs remain locally stored until you remove or export them.",
      "Logs may be retained longer for operational and security purposes, but do not contain your file content.",
    ],
  },
  {
    title: "4. KreyAI Dekk Desktop App",
    intro: "KreyAI Dekk is designed as a local desktop playback tool for transcription:",
    items: [
      "Audio and video files opened in KreyAI Dekk stay on your device and are not uploaded to KreyAI by the desktop app.",
      "The app may remember local file paths, track order, playback positions, hotkey settings, theme preference, and similar local state.",
      "Diagnostic logs are stored locally and are not sent automatically.",
      "Global hotkeys may require macOS Accessibility permission so the app can listen for configured playback shortcuts or pedal mappings.",
      "If you choose to send logs for support, you are responsible for reviewing what you share.",
    ],
  },
  {
    title: "5. aTelier Desktop App",
    intro: "aTelier is designed as a local-first professional translation workspace:",
    items: [
      "Project files, source and target text, translation memories, glossaries, and backups are not uploaded to KreyAI by the normal translation workflow.",
      "Update checks retrieve release information and do not include project or translation content.",
      "License activation may send the license key and a device identifier needed to validate the purchased license.",
      "Diagnostic logs remain on your device unless you choose to send them to KreyAI for support.",
      "You are responsible for maintaining backups of local aTelier projects and language resources.",
    ],
  },
  {
    title: "6. Data Storage & Security",
    intro: "We implement appropriate technical measures to protect your data:",
    items: [
      "Secure cloud storage, including encrypted storage systems.",
      "Time-limited, signed access links.",
      "Restricted internal access to systems.",
      "While we take strong precautions, no system is 100% secure. We continuously improve our safeguards.",
    ],
  },
  {
    title: "7. Data Sharing",
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
    title: "8. Payments & Billing",
    items: [
      "Payments are processed by third-party providers such as Stripe.",
      "KreyAI does not receive or store full payment card numbers on its own systems unless explicitly stated otherwise.",
      "We may receive limited billing details such as payment status, transaction identifiers, card brand, and partial card information from payment providers.",
      "Billing data is used only for purchase confirmation, support, refunds, accounting, and fraud prevention.",
    ],
  },
  {
    title: "9. Your Rights & Control",
    items: [
      "You may choose not to upload sensitive content.",
      "You may download your files at any time within the 7-day availability window.",
      "You may delete eligible transcription-job files immediately from the job page or contact support@kreyai.com for help with an early deletion request.",
      "You can remove locally stored aTelier and Dekk data using the app or your operating system.",
    ],
  },
  {
    title: "10. Third-Party Services",
    items: [
      "KreyAI relies on trusted third-party infrastructure providers such as cloud hosting, storage, email, and payment services.",
      "These providers process data only as required to deliver the service.",
    ],
  },
  {
    title: "11. Children's Privacy",
    items: [
      "KreyAI is not intended for use by individuals under the age of 13.",
      "We do not knowingly collect data from children.",
    ],
  },
  {
    title: "12. Changes to This Policy",
    items: [
      'We may update this Privacy Policy from time to time. Updates will be reflected with a revised "Effective Date."',
    ],
  },
  {
    title: "13. Contact",
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
          <p className="page-meta">Effective Date: August 13, 2026</p>
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
