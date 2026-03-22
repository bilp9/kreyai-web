const PLANS = [
  {
    name: "Fast",
    price: "$0.12 / minute",
    label: "For drafts",
    description:
      "A lighter option for internal review, rough cuts, and early transcript passes where speed matters most.",
    points: [
      "Good for first-pass transcripts",
      "Best for internal teams and rough edits",
      "Export-ready delivery",
    ],
  },
  {
    name: "Balanced",
    price: "$0.20 / minute",
    label: "Recommended",
    description:
      "Our default choice for production work, editorial workflows, and organizations that need strong accuracy without overbuying.",
    points: [
      "Best fit for most customer work",
      "Strong multilingual and speaker-aware output",
      "Recommended for NGOs, media, and research teams",
    ],
  },
  {
    name: "Best",
    price: "$0.35 / minute",
    label: "Highest fidelity",
    description:
      "For critical material where transcript quality matters most, especially in sensitive, publishable, or archival workflows.",
    points: [
      "Optimized for higher-stakes material",
      "Best for publication, legal review, and formal records",
      "Ideal when cleanup time is expensive",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f2e8] text-neutral-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,rgba(255,248,216,0.95)_0%,rgba(247,242,232,0)_72%)]" />
        <div className="absolute left-[-100px] top-32 h-[300px] w-[300px] rounded-full bg-[#e7b56e]/20 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-18">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8a5a2b]">
            Pricing
          </p>
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
            Simple pricing for real transcription work.
          </h1>
          <p className="text-lg leading-8 text-neutral-700">
            KreyAI uses straightforward usage-based pricing. No subscriptions, no seat licenses, and no required account just to get started.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className="rounded-[28px] border border-black/5 bg-white/75 p-7 shadow-[0_20px_60px_rgba(59,43,22,0.08)] backdrop-blur"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold">{plan.name}</p>
                  <p className="mt-1 text-sm text-[#8a5a2b]">{plan.label}</p>
                </div>
                <p className="text-right text-lg font-semibold">{plan.price}</p>
              </div>

              <p className="mt-5 text-sm leading-7 text-neutral-600">{plan.description}</p>

              <div className="mt-6 space-y-3">
                {plan.points.map((point) => (
                  <div key={point} className="rounded-2xl bg-[#f3ebdf] px-4 py-3 text-sm text-neutral-700">
                    {point}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-[28px] border border-black/5 bg-white/70 p-7 shadow-[0_18px_50px_rgba(59,43,22,0.08)]">
          <h2 className="text-2xl font-semibold tracking-tight">What’s included</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-[#f8f4ec] px-5 py-4 text-sm leading-7 text-neutral-700">
              Speaker-aware formatting, downloadable transcript files, and a simple no-account workflow.
            </div>
            <div className="rounded-2xl bg-[#f8f4ec] px-5 py-4 text-sm leading-7 text-neutral-700">
              Output formats can include TXT, DOCX, SRT, VTT, and HTML depending on the workflow.
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-neutral-500">
            Final turnaround and transcript quality still depend on audio quality, speaker overlap, and source language mix.
          </p>
        </div>
      </section>
    </main>
  );
}
