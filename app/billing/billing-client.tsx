"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type CreditPack = {
  id: string;
  name: string;
  price_cents: number;
  credits_minutes: number;
  price_usd: string;
  label: string;
  description: string;
};

type BillingConfig = {
  stripe_enabled: boolean;
  packs: CreditPack[];
};

type BalanceResponse = {
  email: string;
  balance_minutes: number;
  total_purchased_minutes: number;
  total_consumed_minutes: number;
  total_refunded_minutes: number;
  stripe_customer_id?: string | null;
};

export default function BillingClient() {
  const params = useSearchParams();
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [config, setConfig] = useState<BillingConfig | null>(null);
  const [balance, setBalance] = useState<BalanceResponse | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [loadingCheckoutId, setLoadingCheckoutId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedPack = params.get("pack");
  const jobId = params.get("job");
  const jobToken = params.get("t");
  const success = params.get("success") === "1";
  const canceled = params.get("canceled") === "1";

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  const highlightedPackId = useMemo(() => selectedPack?.toLowerCase() ?? null, [selectedPack]);

  useEffect(() => {
    if (!apiBase) {
      setError("API base URL not configured.");
      return;
    }

    async function loadConfig() {
      const res = await fetch(`${apiBase}/api/billing/config`, { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Unable to load billing configuration.");
      }
      const data = (await res.json()) as BillingConfig;
      setConfig(data);
    }

    void loadConfig().catch((err: unknown) => {
      setError(err instanceof Error ? err.message : "Unable to load billing configuration.");
    });
  }, [apiBase]);

  useEffect(() => {
    if (email || !jobId || !jobToken || !apiBase) {
      return;
    }

    async function loadJobEmail() {
      const headers = new Headers();
      if (jobToken) {
        headers.set("X-Job-Token", jobToken);
      }
      const res = await fetch(`${apiBase}/api/jobs/${jobId}`, {
        headers,
        cache: "no-store",
      });
      if (!res.ok) {
        return;
      }
      const data = (await res.json()) as { email?: string };
      if (data.email) {
        setEmail(data.email);
      }
    }

    void loadJobEmail();
  }, [apiBase, email, jobId, jobToken]);

  useEffect(() => {
    if (!email || !apiBase) {
      setBalance(null);
      return;
    }

    let active = true;
    async function loadBalance() {
      setLoadingBalance(true);
      try {
        const res = await fetch(`${apiBase}/api/billing/balance?email=${encodeURIComponent(email)}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Unable to load credit balance.");
        }
        const data = (await res.json()) as BalanceResponse;
        if (active) {
          setBalance(data);
        }
      } catch (err: unknown) {
        if (active) {
          setError(err instanceof Error ? err.message : "Unable to load credit balance.");
        }
      } finally {
        if (active) {
          setLoadingBalance(false);
        }
      }
    }

    void loadBalance();
    return () => {
      active = false;
    };
  }, [apiBase, email, success]);

  async function startCheckout(packId: string) {
    if (!apiBase) {
      setError("API base URL not configured.");
      return;
    }
    if (!email.trim()) {
      setError("Enter your email to continue.");
      return;
    }

    setLoadingCheckoutId(packId);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/api/billing/checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          pack_id: packId,
          job_id: jobId,
          job_token: jobToken,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(typeof data?.detail === "string" ? data.detail : "Unable to start checkout.");
      }

      window.location.href = data.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to start checkout.");
      setLoadingCheckoutId(null);
    }
  }

  return (
    <section className="surface-panel rounded-[28px] p-6 md:p-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="page-eyebrow !text-[0.68rem]">Credits</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Buy minutes before you queue jobs.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--brand-muted)]">
            Purchase a credit pack, then use your balance across future uploads. Credits are deducted from the audio
            duration before processing begins.
          </p>
        </div>

        {jobId && jobToken ? (
          <Link
            href={`/upload?job=${encodeURIComponent(jobId)}&t=${encodeURIComponent(jobToken)}`}
            className="inline-flex rounded-full border border-[var(--brand-border)] px-4 py-2 text-sm font-medium text-[#13172b] transition hover:border-[#13172b]"
          >
            Return to upload
          </Link>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-[#13172b]">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@company.com"
            className="brand-input w-full rounded-2xl border-slate-200 px-4 py-3.5 outline-none"
          />
        </label>

        <div className="surface-muted rounded-2xl px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#717a99]">Balance</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-[#13172b]">
            {loadingBalance ? "…" : balance ? `${balance.balance_minutes} min` : "0 min"}
          </p>
          <p className="mt-1 text-sm text-[var(--brand-muted)]">Available for future uploads under this email.</p>
        </div>
      </div>

      {success ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
          Payment received. Your credits should now be available.
        </div>
      ) : null}

      {canceled ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900">
          Checkout was canceled. Your balance has not changed.
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {config?.packs.map((pack) => {
          const highlighted = highlightedPackId === pack.id;
          return (
            <article
              key={pack.id}
              className={`rounded-[26px] border p-6 shadow-sm transition ${
                highlighted
                  ? "border-[#13172b] bg-white shadow-[0_16px_40px_rgba(16,20,38,0.08)]"
                  : "border-[var(--brand-border)] bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold text-[#13172b]">{pack.name}</p>
                  <p className="mt-1 text-sm text-[var(--brand-blue)]">{pack.label}</p>
                </div>
                <p className="text-lg font-semibold text-[#13172b]">${pack.price_usd}</p>
              </div>

              <p className="mt-5 text-3xl font-semibold tracking-tight text-[#13172b]">{pack.credits_minutes} minutes</p>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{pack.description}</p>

              <button
                type="button"
                onClick={() => void startCheckout(pack.id)}
                disabled={!config?.stripe_enabled || loadingCheckoutId !== null}
                className="brand-button mt-6 w-full rounded-2xl px-5 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingCheckoutId === pack.id ? "Redirecting…" : `Buy ${pack.name}`}
              </button>
            </article>
          );
        })}
      </div>

      {!config?.stripe_enabled ? (
        <p className="mt-5 text-sm leading-7 text-[var(--brand-muted)]">
          Stripe checkout is not configured yet. Add the Stripe environment variables to enable purchases.
        </p>
      ) : null}
    </section>
  );
}
