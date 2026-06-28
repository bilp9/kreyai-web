"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type DekkPlan = {
  id: string;
  name: string;
  price_cents: number;
  price_usd: string;
  label: string;
  description: string;
};

type DekkConfig = {
  checkout_enabled: boolean;
  plans: DekkPlan[];
};

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/i;

export default function DekkPurchasePanel() {
  const params = useSearchParams();
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [config, setConfig] = useState<DekkConfig | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const downloadUrl = process.env.NEXT_PUBLIC_DEKK_DOWNLOAD_URL;
  const trackedDownloadUrl = "/dekk/download?source=website";
  const normalizedEmail = email.trim().toLowerCase();
  const hasValidEmail = EMAIL_PATTERN.test(normalizedEmail);
  const success = params.get("success") === "1";
  const canceled = params.get("canceled") === "1";
  const checkoutEmail = email || params.get("email") || "the checkout email";

  useEffect(() => {
    if (!apiBase) {
      setError("API base URL is not configured.");
      return;
    }

    async function loadConfig() {
      const res = await fetch(`${apiBase}/api/dekk/config`, { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Unable to load Dekk checkout configuration.");
      }
      setConfig((await res.json()) as DekkConfig);
      setError(null);
    }

    void loadConfig().catch((err: unknown) => {
      setError(err instanceof Error ? err.message : "Unable to load Dekk checkout configuration.");
    });
  }, [apiBase]);

  async function startCheckout(plan: string) {
    if (!apiBase) {
      setError("API base URL is not configured.");
      return;
    }
    if (!hasValidEmail) {
      setError("Enter a valid email to continue.");
      return;
    }

    setLoadingPlan(plan);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/api/dekk/checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, plan }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(typeof data?.detail === "string" ? data.detail : "Unable to start checkout.");
      }
      window.location.href = data.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to start checkout.");
      setLoadingPlan(null);
    }
  }

  return (
    <section className="surface-panel mt-10 rounded-[30px] p-7">
      {success ? (
        <div className="mb-8 rounded-[26px] border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
          <p className="text-xs font-semibold uppercase tracking-[0.16em]">Payment complete</p>
          <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Your Dekk license is on its way.</h2>
              <p className="mt-2 text-sm leading-7">
                We emailed the license key to {checkoutEmail}. Download Dekk, open the app, then choose{" "}
                <span className="font-semibold">Help &gt; Activate License</span> and paste the key.
              </p>
            </div>
            {downloadUrl ? (
              <a href={trackedDownloadUrl} className="brand-button inline-flex rounded-2xl px-5 py-3 text-sm font-semibold">
                Download Dekk for macOS
              </a>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="page-eyebrow !text-[0.68rem]">Download</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            {success ? "Download and activate Dekk." : "Start with a 14-day free trial."}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
            {success
              ? "Use the download below if the app is not installed yet. Your license key unlocks Dekk after the trial."
              : "Download Dekk and try it free for 14 days. No email or account required."}
          </p>

          {downloadUrl ? (
            <a href={trackedDownloadUrl} className="brand-button mt-5 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold">
              Download Dekk for macOS
            </a>
          ) : (
            <div className="surface-callout mt-5 rounded-[22px] p-5">
              <p className="text-sm leading-7 text-[var(--brand-blue-deep)]">
                Download delivery is being configured for this environment.
              </p>
            </div>
          )}
        </div>

        <div>
          <p className="page-eyebrow !text-[0.68rem]">Buy a license</p>
          <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
            Ready to keep using Dekk after the trial? Purchase a one-time license below.
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
              Payment received. Your Dekk license key has been sent to {checkoutEmail}. Download Dekk from this page if
              you have not installed it yet.
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

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {(config?.plans ?? []).map((plan) => (
              <article key={plan.id} className="surface-muted rounded-[24px] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{plan.name.replace("Dekk ", "")}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue)]">
                      {plan.label}
                    </p>
                  </div>
                  <p className="text-lg font-semibold">${plan.price_usd}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">{plan.description}</p>
                <button
                  type="button"
                  onClick={() => void startCheckout(plan.id)}
                  disabled={!config?.checkout_enabled || loadingPlan !== null}
                  className="brand-button mt-5 w-full rounded-2xl px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadingPlan === plan.id ? "Redirecting..." : `Buy ${plan.name.replace("Dekk ", "")}`}
                </button>
              </article>
            ))}
          </div>

          <div className="surface-muted mt-4 rounded-[24px] p-5">
            <h3 className="text-lg font-semibold">Team</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
              Need multi-seat or site licensing? We can handle team licensing manually.
            </p>
            <a href="mailto:hello@kreyai.com" className="mt-4 inline-flex text-sm font-semibold text-[var(--brand-blue)] underline underline-offset-4">
              Contact for team licensing
            </a>
          </div>

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
