const CREDIT_PACKS = [
  {
    name: "Free",
    price: "$0",
    label: "Get started",
    credits: "30 minutes included",
    description:
      "A simple starting allowance for testing KreyAI and running your first transcription jobs.",
    points: [
      "One-time free usage",
      "Good for short interviews, clips, and quick trials",
      "No subscription required",
    ],
  },
  {
    name: "Starter Pack",
    price: "$10",
    label: "Popular",
    credits: "120 minutes",
    description:
      "A straightforward credit pack for regular transcription work without any recurring commitment.",
    points: [
      "Prepaid credits",
      "Great for podcasts, interviews, and meetings",
      "Credits do not expire",
    ],
  },
  {
    name: "Growth Pack",
    price: "$25",
    label: "Best value",
    credits: "330 minutes",
    description:
      "Built for heavier workflows that need a better effective rate while keeping the product simple.",
    points: [
      "Lower effective cost per minute",
      "Fits ongoing editorial and research work",
      "No seats or subscriptions",
    ],
  },
];

const HOW_CREDITS_WORK = [
  "KreyAI uses a prepaid credit system.",
  "Credits are deducted based on the duration of the audio you submit.",
  "Credits are only the public pricing model. There are no subscriptions or seat licenses.",
  "Credits do not expire and can be used anytime.",
];

const PAYMENT_POLICY = [
  "Credits are purchased in advance and used to process audio files.",
  "Payments are processed securely through third-party providers such as Stripe.",
  "All prices are listed in USD unless otherwise specified.",
];

const REFUND_POLICY = [
  "Unused credits may be eligible for a refund at our discretion.",
  "Used credits are non-refundable once processing has occurred.",
  "In cases of technical issues or service errors, KreyAI may restore credits or issue a refund.",
];

export default function PricingPage() {
  return (
    <main className="page-shell text-[#101426]">
      <section className="page-wrap">
        <div className="page-header">
          <p className="page-eyebrow">Pricing</p>
          <h1 className="page-title">Simple prepaid credits for transcription.</h1>
          <p className="page-lede">
            KreyAI uses a credits-first pricing model. Buy credits in advance, use them as you need them, and avoid
            subscriptions or seat-based complexity.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {CREDIT_PACKS.map((pack) => (
            <article
              key={pack.name}
              className="surface-panel rounded-[30px] p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold">{pack.name}</p>
                  <p className="mt-1 text-sm text-[var(--brand-blue)]">{pack.label}</p>
                </div>
                <p className="text-right text-lg font-semibold">{pack.price}</p>
              </div>

              <p className="mt-5 text-3xl font-semibold tracking-tight">{pack.credits}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">{pack.description}</p>

              <div className="mt-6 space-y-3">
                {pack.points.map((point) => (
                  <div key={point} className="surface-muted rounded-2xl px-4 py-3 text-sm text-[var(--brand-muted)]">
                    {point}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="surface-panel mt-14 rounded-[30px] p-7">
          <h2 className="text-2xl font-semibold tracking-tight">How credits work</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {HOW_CREDITS_WORK.map((item) => (
              <div
                key={item}
                className="surface-muted rounded-2xl px-5 py-4 text-sm leading-7 text-[var(--brand-muted)]"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-[#7a8098]">
            Final turnaround and transcript quality still depend on audio quality, speaker overlap, and source language mix.
          </p>
        </div>

        <div className="surface-panel mt-10 rounded-[30px] p-7">
          <h2 className="text-2xl font-semibold tracking-tight">Payments & Refunds</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="page-eyebrow !text-[0.68rem]">
                Payments
              </p>
              <div className="mt-4 space-y-3">
                {PAYMENT_POLICY.map((item) => (
                  <div
                    key={item}
                    className="surface-muted rounded-2xl px-5 py-4 text-sm leading-7 text-[var(--brand-muted)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="page-eyebrow !text-[0.68rem]">
                Refunds
              </p>
              <div className="mt-4 space-y-3">
                {REFUND_POLICY.map((item) => (
                  <div
                    key={item}
                    className="surface-muted rounded-2xl px-5 py-4 text-sm leading-7 text-[var(--brand-muted)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="surface-callout mt-6 rounded-[22px] p-5">
            <p className="text-sm leading-7 text-[var(--brand-blue-deep)]">
              We may provide account credits instead of monetary refunds when appropriate.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
