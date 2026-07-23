"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type AtelierPlan = {
  id: string;
  name: string;
  price_cents: number;
  price_usd: string;
  label: string;
  description: string;
};

type AtelierConfig = {
  checkout_enabled: boolean;
  plans: AtelierPlan[];
};

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/i;

export default function AtelierPurchasePanel() {
  const params = useSearchParams();
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [config, setConfig] = useState<AtelierConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const normalizedEmail = email.trim().toLowerCase();
  const hasValidEmail = EMAIL_PATTERN.test(normalizedEmail);
  const success = params.get("success") === "1";
  const canceled = params.get("canceled") === "1";
  const checkoutEmail = email || params.get("email") || "the checkout email";
  const plan = config?.plans?.[0];

  useEffect(() => {
    if (!apiBase) {
      setError("API base URL is not configured.");
      return;
    }

    async function loadConfig() {
      const res = await fetch(`${apiBase}/api/atelier/config`, { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Unable to load aTelier checkout configuration.");
      }
      setConfig((await res.json()) as AtelierConfig);
      setError(null);
    }

    void loadConfig().catch((err: unknown) => {
      setError(err instanceof Error ? err.message : "Unable to load aTelier checkout configuration.");
    });
  }, [apiBase]);

  async function startCheckout() {
    if (!apiBase) {
      setError("API base URL is not configured.");
      return;
    }
    if (!hasValidEmail) {
      setError("Enter a valid email to continue.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/api/atelier/checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(typeof data?.detail === "string" ? data.detail : "Unable to start checkout.");
      }
      window.location.href = data.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to start checkout.");
      setLoading(false);
    }
  }

  return (
    <section id="buy" className="surface-panel mt-10 scroll-mt-28 rounded-[30px] p-7">
      {success ? (
        <div className="mb-8 rounded-[26px] border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
          <p className="text-xs font-semibold uppercase tracking-[0.16em]">Payment complete</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Your aTelier license is on its way.</h2>
          <p className="mt-2 text-sm leading-7">
            We emailed the license key to {checkoutEmail}. Open aTelier, go to{" "}
            <span className="font-semibold">Settings &gt; License</span>, and paste the key in.
          </p>
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="page-eyebrow !text-[0.68rem]">Download</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            {success ? "Download and activate aTelier." : "Start with a 30-day free trial."}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
            {success
              ? "Use the download below if aTelier is not installed yet. Your license key unlocks it after the trial."
              : "Download aTelier and try it free for 30 days. No payment required to start."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="/atelier/download?source=checkout&platform=macos"
              className="brand-button inline-flex rounded-2xl px-5 py-3 text-sm font-semibold"
            >
              Download for macOS
            </a>
            <a
              href="/atelier/download?source=checkout&platform=windows"
              className="brand-button inline-flex rounded-2xl px-5 py-3 text-sm font-semibold"
            >
              Download for Windows
            </a>
          </div>
        </div>

        <div>
          <p className="page-eyebrow !text-[0.68rem]">Buy a license</p>
          <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
            Ready to keep using aTelier after the trial? Purchase a one-time license below.
          </p>
          <label className="mt-4 block space-y-2 text-sm">
            <span className="font-semibold text-[#13172b]">Email for license delivery</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
              className="brand-input w-full rounded-2xl border-slate-200 px-4 py-3.5 outline-none"
            />
          </label>

          {success ? (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
              Payment received. Your aTelier license key has been sent to {checkoutEmail}.
            </div>
          ) : null}

          {canceled ? (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900">
              Checkout was canceled. No license was purchased.
            </div>
          ) : null}

          {error ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {plan ? (
            <article className="surface-muted mt-5 rounded-[24px] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue)]">
                    {plan.label}
                  </p>
                </div>
                <p className="text-lg font-semibold">${plan.price_usd}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">{plan.description}</p>
              <button
                type="button"
                onClick={() => void startCheckout()}
                disabled={!config?.checkout_enabled || loading}
                className="brand-button mt-5 w-full rounded-2xl px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Redirecting..." : `Buy ${plan.name}`}
              </button>
            </article>
          ) : null}

          {!config?.checkout_enabled ? (
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Online checkout is temporarily unavailable. Contact KreyAI for a license.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
