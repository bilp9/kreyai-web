const PRIVACY_SECTIONS = [
  {
    title: "What KreyAI collects",
    body:
      "KreyAI may collect the email address you provide, the files you upload for transcription, job metadata needed to deliver the service, and operational logs that help keep the system reliable and secure.",
  },
  {
    title: "How customer content is used",
    body:
      "Uploaded audio, video, and transcript outputs are processed for the purpose of delivering the requested transcription workflow. Customer content is not intended to be used for model training.",
  },
  {
    title: "Retention and storage",
    body:
      "KreyAI is designed around temporary retention rather than permanent file hosting. Exact retention behavior may vary by deployment and operational policy, but the service is not positioned as long-term storage.",
  },
  {
    title: "Sharing and subprocessors",
    body:
      "Customer data may be handled by infrastructure and service providers required to run the product, such as hosting, storage, email delivery, and transcription-related systems. Data is not sold.",
  },
  {
    title: "Security",
    body:
      "KreyAI uses secure application workflows, access tokens, and controlled file handling as part of normal operations. No system can promise absolute security, so highly sensitive use cases should be reviewed before use.",
  },
  {
    title: "Questions or requests",
    body:
      "If you have questions about data handling or need to raise a privacy concern, contact support@kreyai.com before or after using the service.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f2e8] text-neutral-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-24 h-[320px] w-[320px] rounded-full bg-[#e7b56e]/16 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-5xl px-6 pb-24 pt-18">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8a5a2b]">
            Privacy
          </p>
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
            Privacy information in plain language.
          </h1>
          <p className="text-lg leading-8 text-neutral-700">
            This page is meant to explain, at a practical level, how KreyAI handles customer information and uploaded transcription material.
          </p>
        </div>

        <div className="mt-14 grid gap-5">
          {PRIVACY_SECTIONS.map((section) => (
            <article
              key={section.title}
              className="rounded-[26px] border border-black/5 bg-white/75 p-6 shadow-[0_18px_50px_rgba(59,43,22,0.08)]"
            >
              <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{section.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-[28px] border border-[#d7c59e] bg-[#fff4de] p-7 shadow-[0_18px_50px_rgba(59,43,22,0.08)]">
          <p className="text-sm leading-7 text-[#7a4c18]">
            This page is a customer-facing summary, not a jurisdiction-specific legal opinion. If you need custom privacy terms or a stricter data handling review, contact{" "}
            <span className="font-medium text-neutral-900">support@kreyai.com</span>.
          </p>
        </div>
      </section>
    </main>
  );
}
