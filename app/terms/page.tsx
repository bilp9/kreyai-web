const TERMS_SECTIONS = [
  {
    title: "Service scope",
    body:
      "KreyAI provides automated transcription-related services, including file intake, processing workflows, and transcript exports. Features, outputs, and availability may evolve over time.",
  },
  {
    title: "Your responsibility for uploaded content",
    body:
      "By using the service, you confirm that you have the right to upload, process, and receive transcripts for the content you submit. You are responsible for complying with any confidentiality, consent, or copyright obligations tied to that material.",
  },
  {
    title: "Accuracy and limitations",
    body:
      "KreyAI is intended to produce useful, professional transcripts, but automated output may still contain mistakes. Accuracy can vary based on audio quality, speaker overlap, accents, language mix, and recording conditions.",
  },
  {
    title: "Appropriate use",
    body:
      "You may not use KreyAI for unlawful activity, abusive conduct, or workflows that would violate the rights of others. We may restrict access if the service is used in a way that creates operational, legal, or safety risk.",
  },
  {
    title: "Availability and changes",
    body:
      "We aim to provide a reliable service, but uptime, processing speed, and specific features are not guaranteed in every circumstance. KreyAI may update workflows, pricing, limits, or policies as the product develops.",
  },
  {
    title: "Support",
    body:
      "For commercial, operational, or policy questions, contact support@kreyai.com.",
  },
];

export default function TermsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f2e8] text-neutral-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-100px] top-28 h-[320px] w-[320px] rounded-full bg-[#84a98c]/16 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-5xl px-6 pb-24 pt-18">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8a5a2b]">
            Terms
          </p>
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
            Simple terms for using KreyAI.
          </h1>
          <p className="text-lg leading-8 text-neutral-700">
            These terms are intended to set practical expectations about what the service does, what you are responsible for, and where automated transcription still has limits.
          </p>
        </div>

        <div className="mt-14 grid gap-5">
          {TERMS_SECTIONS.map((section) => (
            <article
              key={section.title}
              className="rounded-[26px] border border-black/5 bg-white/75 p-6 shadow-[0_18px_50px_rgba(59,43,22,0.08)]"
            >
              <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{section.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-[28px] border border-black/5 bg-white/70 p-7 shadow-[0_18px_50px_rgba(59,43,22,0.08)]">
          <p className="text-sm leading-7 text-neutral-600">
            If you need custom commercial terms, a higher-assurance workflow, or a review for a sensitive deployment, contact{" "}
            <span className="font-medium text-neutral-900">support@kreyai.com</span>.
          </p>
        </div>
      </section>
    </main>
  );
}
