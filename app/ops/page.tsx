import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Ops",
  robots: {
    index: false,
    follow: false,
  },
};

type OpsJob = {
  job_id: string;
  email?: string;
  status?: string;
  progress: number;
  status_message?: string;
  language?: string;
  language_requested?: string;
  language_final?: string;
  language_detected?: string;
  created_at?: string;
  updated_at?: string;
  completed_at?: string;
  audio_duration_seconds?: number | null;
  processing_time_seconds?: number | null;
  estimated_cost_usd?: number | null;
  realtime_factor?: number | null;
  attempts?: number;
  speaker_mode?: string;
  processing_tier?: string;
  execution_lane?: string;
  requires_diarization?: boolean;
  worker_job_name?: string;
  worker_job_region?: string;
  routing_reason?: string;
};

type OpsFilters = {
  limit: number;
  status?: string | null;
  language?: string | null;
  email?: string | null;
};

type OpsDashboardResponse = {
  viewer: {
    id: string;
    name?: string;
    email?: string;
    plan?: string;
  };
  filters: OpsFilters;
  summary: {
    recent_jobs_count: number;
    recent_completed_jobs: number;
    recent_failed_jobs: number;
    recent_audio_minutes: number;
    recent_estimated_cost_usd: number;
    avg_processing_time_seconds: number | null;
    avg_realtime_factor: number | null;
    status_counts: Record<string, number>;
    lane_counts: Record<string, number>;
    tier_counts: Record<string, number>;
  };
  jobs: OpsJob[];
};

type OpsBillingLedgerEntry = {
  id: string;
  email: string;
  entry_type: string;
  delta_minutes: number;
  balance_after_minutes: number;
  source: string;
  description: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
};

type OpsBillingResponse = {
  viewer: {
    id: string;
    email?: string;
  };
  email: string;
  account: {
    email: string;
    balance_minutes: number;
    total_purchased_minutes: number;
    total_granted_minutes: number;
    total_consumed_minutes: number;
    total_refunded_minutes: number;
    stripe_customer_id?: string | null;
    updated_at?: string | null;
  };
  access_decision: {
    allowed: boolean;
    source: string;
    reason: string;
    credits_to_deduct: number;
    requires_credit_check: boolean;
    available_credits: number;
    missing_credits: number;
  };
  partner_access?: {
    active?: boolean;
  };
  ledger: OpsBillingLedgerEntry[];
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "pending_verification", label: "Pending verification" },
  { value: "verified", label: "Verified" },
  { value: "queued", label: "Queued" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "failed", label: "Failed" },
  { value: "expired", label: "Expired" },
];

const LIMIT_OPTIONS = [10, 25, 50, 100];
const BILLING_LEDGER_LIMIT = 50;

function getSingleParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }
  return value?.trim() ?? "";
}

function normalizeText(value?: string | null): string {
  return (value ?? "").trim().toLowerCase();
}

function formatDate(value?: string): string {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleString();
}

function formatSeconds(value?: number | null): string {
  if (typeof value !== "number") return "—";
  if (value < 60) return `${value.toFixed(1)}s`;
  return `${(value / 60).toFixed(1)}m`;
}

function formatPercent(value?: number | null): string {
  if (typeof value !== "number") return "—";
  return `${value.toFixed(3)}x`;
}

function formatDelta(value?: number | null): string {
  if (typeof value !== "number") return "—";
  return `${value > 0 ? "+" : ""}${value} min`;
}

function getViewerLabel(viewer: OpsDashboardResponse["viewer"]): string {
  const email = normalizeText(viewer.email) ? viewer.email! : "";
  if (email) {
    return email;
  }

  const name = (viewer.name ?? "").trim();
  if (name) {
    return name;
  }

  return "Authenticated user";
}

function getStatusTone(status?: string) {
  switch (normalizeText(status)) {
    case "completed":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";
    case "failed":
      return "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200";
    case "processing":
      return "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200";
    case "queued":
      return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";
    case "verified":
      return "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200";
    default:
      return "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200";
  }
}

function getLaneTone(lane?: string) {
  switch (normalizeText(lane)) {
    case "gpu":
      return "bg-fuchsia-50 text-fuchsia-700 ring-1 ring-inset ring-fuchsia-200";
    case "cpu":
      return "bg-cyan-50 text-cyan-700 ring-1 ring-inset ring-cyan-200";
    default:
      return "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200";
  }
}

function getTierTone(tier?: string) {
  switch (normalizeText(tier)) {
    case "premium":
      return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";
    case "standard":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";
    default:
      return "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200";
  }
}

function buildDashboardUrl(filters: {
  limit: number;
  status?: string;
  language?: string;
  email?: string;
}) {
  const params = new URLSearchParams();
  params.set("limit", String(filters.limit));
  if (filters.status) {
    params.set("status", filters.status);
  }
  if (filters.language) {
    params.set("language", filters.language);
  }
  if (filters.email) {
    params.set("email", filters.email);
  }
  return `/ops/dashboard?${params.toString()}`;
}

function buildBillingUrl(email: string) {
  const params = new URLSearchParams();
  params.set("email", email);
  params.set("limit", String(BILLING_LEDGER_LIMIT));
  return `/ops/billing?${params.toString()}`;
}

function buildOpsPageHref(options: {
  tab?: string;
  limit?: number;
  status?: string;
  language?: string;
  email?: string;
  billingEmail?: string;
  billingNotice?: string;
  billingError?: string;
}) {
  const params = new URLSearchParams();

  if (options.tab) {
    params.set("tab", options.tab);
  }
  if (typeof options.limit === "number") {
    params.set("limit", String(options.limit));
  }
  if (options.status) {
    params.set("status", options.status);
  }
  if (options.language) {
    params.set("language", options.language);
  }
  if (options.email) {
    params.set("email", options.email);
  }
  if (options.billingEmail) {
    params.set("billing_email", options.billingEmail);
  }
  if (options.billingNotice) {
    params.set("billing_notice", options.billingNotice);
  }
  if (options.billingError) {
    params.set("billing_error", options.billingError);
  }

  const query = params.toString();
  return query ? `/ops?${query}` : "/ops";
}

async function getDashboardData(filters: {
  limit: number;
  status?: string;
  language?: string;
  email?: string;
}): Promise<{ data?: OpsDashboardResponse; error?: string }> {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiKey = process.env.KREYAI_OPS_API_KEY;

  if (!apiBase) {
    return { error: "NEXT_PUBLIC_API_BASE_URL is not configured." };
  }

  if (!apiKey) {
    return { error: "KREYAI_OPS_API_KEY is not configured for the ops dashboard." };
  }

  try {
    const res = await fetch(`${apiBase}${buildDashboardUrl(filters)}`, {
      cache: "no-store",
      headers: {
        "X-API-Key": apiKey,
      },
    });

    if (!res.ok) {
      return { error: `Ops dashboard request failed (${res.status}).` };
    }

    return {
      data: (await res.json()) as OpsDashboardResponse,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to load ops dashboard.",
    };
  }
}

async function getBillingData(email: string): Promise<{ data?: OpsBillingResponse; error?: string }> {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiKey = process.env.KREYAI_OPS_API_KEY;

  if (!apiBase) {
    return { error: "NEXT_PUBLIC_API_BASE_URL is not configured." };
  }

  if (!apiKey) {
    return { error: "KREYAI_OPS_API_KEY is not configured for the ops dashboard." };
  }

  try {
    const res = await fetch(`${apiBase}${buildBillingUrl(email)}`, {
      cache: "no-store",
      headers: {
        "X-API-Key": apiKey,
      },
    });

    if (!res.ok) {
      return { error: `Ops billing request failed (${res.status}).` };
    }

    return {
      data: (await res.json()) as OpsBillingResponse,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to load ops billing view.",
    };
  }
}

function applyJobFilters(
  jobs: OpsJob[],
  filters: {
    limit: number;
    status?: string;
    language?: string;
    email?: string;
  },
): OpsJob[] {
  const filtered = jobs.filter((job) => {
    if (filters.status && normalizeText(job.status) !== normalizeText(filters.status)) {
      return false;
    }

    if (filters.language && normalizeText(job.language) !== normalizeText(filters.language)) {
      return false;
    }

    if (filters.email && !normalizeText(job.email).includes(normalizeText(filters.email))) {
      return false;
    }

    return true;
  });

  return filtered.slice(0, filters.limit);
}

function getDisplayLanguage(job: OpsJob): string {
  return job.language_final || job.language_requested || job.language || job.language_detected || "auto";
}

function summarizeJobs(jobs: OpsJob[]) {
  const completedJobs = jobs.filter((job) => normalizeText(job.status) === "completed");
  const failedJobs = jobs.filter((job) => normalizeText(job.status) === "failed");
  const audioMinutes = jobs.reduce(
    (sum, job) => sum + ((job.audio_duration_seconds ?? 0) / 60),
    0,
  );
  const estimatedCost = jobs.reduce(
    (sum, job) => sum + (job.estimated_cost_usd ?? 0),
    0,
  );

  const processingValues = completedJobs
    .map((job) => job.processing_time_seconds)
    .filter((value): value is number => typeof value === "number");
  const realtimeValues = completedJobs
    .map((job) => job.realtime_factor)
    .filter((value): value is number => typeof value === "number");

  const average = (values: number[]) =>
    values.length
      ? Number(
          (
            values.reduce((sum, value) => sum + value, 0) / values.length
          ).toFixed(3),
        )
      : null;

  const countBy = (values: Array<string | undefined>) =>
    values.reduce<Record<string, number>>((acc, value) => {
      const key = normalizeText(value) || "unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

  return {
    recent_jobs_count: jobs.length,
    recent_completed_jobs: completedJobs.length,
    recent_failed_jobs: failedJobs.length,
    recent_audio_minutes: Number(audioMinutes.toFixed(1)),
    recent_estimated_cost_usd: Number(estimatedCost.toFixed(2)),
    avg_processing_time_seconds: average(processingValues),
    avg_realtime_factor: average(realtimeValues),
    lane_counts: countBy(jobs.map((job) => job.execution_lane)),
    tier_counts: countBy(jobs.map((job) => job.processing_tier)),
  };
}

function StatusCountCard({
  status,
  count,
}: {
  status: string;
  count: number;
}) {
  return (
    <div className="rounded-3xl border border-[var(--brand-border)] bg-white px-4 py-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm capitalize text-[var(--brand-muted)]">
          {status.replaceAll("_", " ")}
        </span>
        <span className="text-lg font-semibold text-[#101426]">{count}</span>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[var(--brand-border)] bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(40,41,126,0),rgba(40,41,126,0.28),rgba(40,41,126,0))]" />
      <p className="text-xs uppercase tracking-[0.18em] text-[#7a8098]">{label}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-[#101426]">{value}</p>
      <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">{detail}</p>
    </div>
  );
}

function BillingMetricCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-3xl border border-[var(--brand-border)] bg-white px-5 py-5 shadow-sm">
      <p className="text-[11px] uppercase tracking-[0.2em] text-[#7a8098]">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-[#101426]">{value}</p>
    </div>
  );
}

function SectionShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[34px] border border-[var(--brand-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(249,250,255,0.96))] shadow-[0_22px_60px_rgba(15,23,42,0.06)]">
      <div className="border-b border-[var(--brand-border)] px-6 py-6">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#5b62d6]">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#101426]">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">{description}</p>
      </div>
      <div className="px-6 py-6">{children}</div>
    </section>
  );
}

export default async function OpsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  async function applyBillingAdjustment(formData: FormData) {
    "use server";

    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    const apiKey = process.env.KREYAI_OPS_API_KEY;
    const email = getSingleParam(formData.get("email")?.toString());
    const action = getSingleParam(formData.get("action")?.toString());
    const minutes = getSingleParam(formData.get("minutes")?.toString());
    const notes = getSingleParam(formData.get("notes")?.toString());

    if (!apiBase || !apiKey) {
      redirect(`/ops?tab=billing&billing_email=${encodeURIComponent(email)}&billing_error=${encodeURIComponent("Ops billing is not configured.")}`);
    }

    const res = await fetch(`${apiBase}/ops/billing/adjust`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        email,
        action,
        minutes: Number.parseInt(minutes, 10),
        notes,
      }),
    });

    if (!res.ok) {
      let detail = "Unable to apply adjustment.";
      try {
        const payload = (await res.json()) as { detail?: string };
        if (typeof payload.detail === "string" && payload.detail) {
          detail = payload.detail;
        }
      } catch {}
      redirect(`/ops?tab=billing&billing_email=${encodeURIComponent(email)}&billing_error=${encodeURIComponent(detail)}`);
    }

    redirect(`/ops?tab=billing&billing_email=${encodeURIComponent(email)}&billing_notice=${encodeURIComponent(`Applied ${action} of ${minutes} minutes.`)}`);
  }

  const resolvedParams = await searchParams;
  const tab = getSingleParam(resolvedParams.tab) || "jobs";
  const billingEmail = getSingleParam(resolvedParams.billing_email);
  const billingNotice = getSingleParam(resolvedParams.billing_notice);
  const billingError = getSingleParam(resolvedParams.billing_error);

  const limitParam = Number.parseInt(getSingleParam(resolvedParams.limit), 10);
  const filters = {
    limit: LIMIT_OPTIONS.includes(limitParam) ? limitParam : 25,
    status: getSingleParam(resolvedParams.status),
    language: getSingleParam(resolvedParams.language),
    email: getSingleParam(resolvedParams.email),
  };

  const { data, error } = await getDashboardData(filters);
  const filteredJobs = data ? applyJobFilters(data.jobs, filters) : [];
  const filteredSummary = data ? summarizeJobs(filteredJobs) : null;
  const billingResult = billingEmail ? await getBillingData(billingEmail) : { data: undefined, error: undefined };
  const billingData = billingResult.data;
  const billingLookupError = billingResult.error;
  const jobsHref = buildOpsPageHref({
    tab: "jobs",
    limit: filters.limit,
    status: filters.status,
    language: filters.language,
    email: filters.email,
  });
  const billingHref = buildOpsPageHref({
    tab: "billing",
    billingEmail,
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f8fb] text-[#101426]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(40,41,126,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_24%),linear-gradient(180deg,#fbfcff_0%,#f7f8fb_52%,#f4f6fb_100%)]" />
        <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute right-[-4rem] top-40 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,rgba(255,255,255,0.65),transparent)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(16,20,38,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(16,20,38,0.22) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      </div>

      <section className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:py-16">
        <div className="overflow-hidden rounded-[40px] border border-[var(--brand-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(248,250,255,0.95))] p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] md:p-10">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.34em] text-[#5b62d6]">
                KreyAI Internal Ops
              </p>
              <div className="space-y-3">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[#101426] md:text-5xl">
                  Operational view for jobs, balances, and support actions.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-[var(--brand-muted)] md:text-base">
                  Keep an eye on processing health, inspect customer balances, and resolve credit issues without leaving the dashboard.
                </p>
              </div>
            </div>

            {tab === "jobs" && data && (
              <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[420px]">
                <div className="rounded-3xl border border-[var(--brand-border)] bg-[#fbfcff] px-5 py-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#7a8098]">
                    Viewer
                  </p>
                  <p className="mt-2 truncate text-sm font-medium text-[#101426]">
                    {getViewerLabel(data.viewer)}
                  </p>
                </div>
                <div className="rounded-3xl border border-[var(--brand-border)] bg-[#fbfcff] px-5 py-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#7a8098]">
                    Plan
                  </p>
                  <p className="mt-2 text-sm font-medium capitalize text-[#28297e]">
                    {data.viewer.plan || "unknown"}
                  </p>
                </div>
                <div className="rounded-3xl border border-[var(--brand-border)] bg-[#fbfcff] px-5 py-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#7a8098]">
                    Active Slice
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#101426]">
                    {filteredSummary ? `${filteredSummary.recent_jobs_count} jobs` : "—"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div className="grid gap-4 md:grid-cols-2">
            <a
              href={jobsHref}
              className={`rounded-[28px] border px-5 py-5 transition ${
                tab === "jobs"
                  ? "border-[var(--brand-border-strong)] bg-[linear-gradient(135deg,rgba(243,244,255,0.96),rgba(236,244,255,0.96))] shadow-[0_18px_50px_rgba(40,41,126,0.08)]"
                  : "border-[var(--brand-border)] bg-white hover:bg-[#fafbff]"
              }`}
            >
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#5b62d6]">Tab</p>
              <h2 className="mt-2 text-lg font-semibold text-[#101426]">Jobs</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
                Queue health, throughput, routing mix, and recent execution details.
              </p>
            </a>

            <a
              href={billingHref}
              className={`rounded-[28px] border px-5 py-5 transition ${
                tab === "billing"
                  ? "border-[var(--brand-border-strong)] bg-[linear-gradient(135deg,rgba(243,244,255,0.96),rgba(236,244,255,0.96))] shadow-[0_18px_50px_rgba(40,41,126,0.08)]"
                  : "border-[var(--brand-border)] bg-white hover:bg-[#fafbff]"
              }`}
            >
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#5b62d6]">Tab</p>
              <h2 className="mt-2 text-lg font-semibold text-[#101426]">Billing</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
                Customer balances, ledger history, manual adjustments, and dispute resolution.
              </p>
            </a>
          </div>

          <a
            href={tab === "billing" ? billingHref : jobsHref}
            className="inline-flex items-center justify-center rounded-full border border-[var(--brand-border)] bg-white px-5 py-3 text-sm font-medium text-[#101426] transition hover:bg-[#fafbff]"
          >
            Refresh now
          </a>
        </div>

        {tab === "jobs" && (
          <SectionShell
            eyebrow="Filters"
            title="Queue slice"
            description="Narrow the jobs view by status, language, and customer email so active incidents are easier to isolate."
          >
            <form
              method="GET"
              className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"
            >
              <input type="hidden" name="tab" value="jobs" />
              <label className="space-y-2 text-sm">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Status
                </span>
                <select
                  name="status"
                  defaultValue={filters.status}
                  className="w-full rounded-2xl border border-[var(--brand-border)] bg-white px-4 py-3 text-sm text-[#101426] outline-none transition focus:border-[var(--brand-border-strong)]"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value} className="bg-white text-[#101426]">
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Language
                </span>
                <input
                  name="language"
                  defaultValue={filters.language}
                  placeholder="en, fr, ht..."
                  className="w-full rounded-2xl border border-[var(--brand-border)] bg-white px-4 py-3 text-sm text-[#101426] placeholder:text-[#8b92ab] outline-none transition focus:border-[var(--brand-border-strong)]"
                />
              </label>

              <label className="space-y-2 text-sm">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Email Search
                </span>
                <input
                  name="email"
                  defaultValue={filters.email}
                  placeholder="billy@kreyai.com"
                  className="w-full rounded-2xl border border-[var(--brand-border)] bg-white px-4 py-3 text-sm text-[#101426] placeholder:text-[#8b92ab] outline-none transition focus:border-[var(--brand-border-strong)]"
                />
              </label>

              <label className="space-y-2 text-sm">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Rows
                </span>
                <select
                  name="limit"
                  defaultValue={String(filters.limit)}
                  className="w-full rounded-2xl border border-[var(--brand-border)] bg-white px-4 py-3 text-sm text-[#101426] outline-none transition focus:border-[var(--brand-border-strong)]"
                >
                  {LIMIT_OPTIONS.map((option) => (
                    <option key={option} value={option} className="bg-white text-[#101426]">
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex items-end gap-3">
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[#28297e] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(40,41,126,0.16)] transition hover:bg-[#17195b]"
                >
                  Apply
                </button>
                <a
                  href="/ops?tab=jobs"
                  className="w-full rounded-2xl border border-[var(--brand-border)] bg-white px-4 py-3 text-center text-sm font-medium text-[#101426] transition hover:bg-[#fafbff]"
                >
                  Reset
                </a>
              </div>
            </form>
          </SectionShell>
        )}

        {tab === "billing" && (
          <section className="space-y-6">
            <SectionShell
              eyebrow="Lookup"
              title="Customer billing account"
              description="Search any customer by email to review balance, ledger history, and manual support actions."
            >
              <form
                method="GET"
                className="grid gap-4 md:grid-cols-[1fr_auto]"
              >
                <input type="hidden" name="tab" value="billing" />
                <label className="space-y-2 text-sm">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    Customer Email
                  </span>
                  <input
                    name="billing_email"
                    defaultValue={billingEmail}
                    placeholder="name@company.com"
                    className="w-full rounded-2xl border border-[var(--brand-border)] bg-white px-4 py-3 text-sm text-[#101426] placeholder:text-[#8b92ab] outline-none transition focus:border-[var(--brand-border-strong)]"
                  />
                </label>

                <div className="flex items-end gap-3">
                  <button
                    type="submit"
                    className="rounded-2xl bg-[#28297e] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(40,41,126,0.16)] transition hover:bg-[#17195b]"
                  >
                    Load account
                  </button>
                </div>
              </form>
            </SectionShell>

            {billingNotice ? (
              <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-6 py-5 text-sm text-emerald-800 shadow-[0_18px_40px_rgba(16,185,129,0.08)]">
                {billingNotice}
              </div>
            ) : null}

            {(billingError || billingLookupError) ? (
              <div className="rounded-[28px] border border-rose-200 bg-rose-50 px-6 py-5 text-sm text-rose-700 shadow-[0_18px_40px_rgba(190,24,93,0.08)]">
                {billingError || billingLookupError}
              </div>
            ) : null}

            {billingData ? (
              <>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  <BillingMetricCard label="Balance" value={`${billingData.account.balance_minutes} min`} />
                  <BillingMetricCard label="Purchased" value={`${billingData.account.total_purchased_minutes} min`} />
                  <BillingMetricCard label="Granted" value={`${billingData.account.total_granted_minutes} min`} />
                  <BillingMetricCard label="Consumed" value={`${billingData.account.total_consumed_minutes} min`} />
                  <BillingMetricCard label="Refunded" value={`${billingData.account.total_refunded_minutes} min`} />
                </div>

                <div className="grid gap-5 xl:grid-cols-[1.05fr,0.95fr]">
                  <div className="rounded-[34px] border border-[var(--brand-border)] bg-white p-6 shadow-[0_22px_60px_rgba(15,23,42,0.06)]">
                    <div className="space-y-2">
                      <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#5b62d6]">Account</p>
                      <h2 className="text-2xl font-semibold tracking-tight text-[#101426]">{billingData.email}</h2>
                      <p className="text-sm leading-6 text-[var(--brand-muted)]">
                        Stripe customer: {billingData.account.stripe_customer_id || "Not linked"} • Last updated {formatDate(billingData.account.updated_at || undefined)}
                      </p>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl border border-[var(--brand-border)] bg-[#fbfcff] px-5 py-4">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-[#7a8098]">Access decision</p>
                        <p className="mt-2 text-lg font-semibold text-[#101426]">
                          {billingData.access_decision.allowed ? "Allowed" : "Blocked"}
                        </p>
                        <p className="mt-1 text-sm text-[var(--brand-muted)]">
                          {billingData.access_decision.reason.replaceAll("_", " ")}
                        </p>
                      </div>
                      <div className="rounded-3xl border border-[var(--brand-border)] bg-[#fbfcff] px-5 py-4">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-[#7a8098]">Partner plan</p>
                        <p className="mt-2 text-lg font-semibold text-[#101426]">
                          {billingData.partner_access?.active ? "Active" : "No"}
                        </p>
                        <p className="mt-1 text-sm text-[var(--brand-muted)]">
                          Available now: {billingData.access_decision.available_credits} min
                        </p>
                      </div>
                    </div>

                    <form action={applyBillingAdjustment} className="mt-6 space-y-4 rounded-[28px] border border-[var(--brand-border)] bg-[#fafbff] p-5">
                      <input type="hidden" name="email" value={billingData.email} />
                      <div className="space-y-2">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#5b62d6]">Manual adjustment</p>
                        <p className="text-sm leading-6 text-[var(--brand-muted)]">
                          Use grant for goodwill, refund for restored minutes, and debit when reversing a mistaken balance.
                        </p>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="space-y-2 text-sm">
                          <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Action</span>
                          <select
                            name="action"
                            defaultValue="grant"
                            className="w-full rounded-2xl border border-[var(--brand-border)] bg-white px-4 py-3 text-sm text-[#101426] outline-none transition focus:border-[var(--brand-border-strong)]"
                          >
                            <option value="grant">Grant credits</option>
                            <option value="refund">Refund credits</option>
                            <option value="debit">Debit credits</option>
                          </select>
                        </label>

                        <label className="space-y-2 text-sm">
                          <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Minutes</span>
                          <input
                            type="number"
                            min="1"
                            step="1"
                            name="minutes"
                            placeholder="30"
                            className="w-full rounded-2xl border border-[var(--brand-border)] bg-white px-4 py-3 text-sm text-[#101426] placeholder:text-[#8b92ab] outline-none transition focus:border-[var(--brand-border-strong)]"
                          />
                        </label>
                      </div>

                      <label className="space-y-2 text-sm">
                        <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Reason / note</span>
                        <textarea
                          name="notes"
                          rows={3}
                          placeholder="Support adjustment for customer dispute, manual restoration after issue, courtesy grant..."
                          className="w-full rounded-2xl border border-[var(--brand-border)] bg-white px-4 py-3 text-sm text-[#101426] placeholder:text-[#8b92ab] outline-none transition focus:border-[var(--brand-border-strong)]"
                        />
                      </label>

                      <button
                        type="submit"
                        className="rounded-2xl bg-[#28297e] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(40,41,126,0.16)] transition hover:bg-[#17195b]"
                      >
                        Apply adjustment
                      </button>
                    </form>
                  </div>

                  <div className="overflow-hidden rounded-[34px] border border-[var(--brand-border)] bg-white shadow-[0_22px_60px_rgba(15,23,42,0.06)]">
                    <div className="border-b border-[var(--brand-border)] px-6 py-6">
                      <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#5b62d6]">Ledger</p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#101426]">Transaction history</h2>
                      <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
                        Every credit change is recorded here, including purchases, starter grants, debits, refunds, and manual ops adjustments.
                      </p>
                    </div>

                    {billingData.ledger.length === 0 ? (
                      <div className="px-6 py-14 text-center">
                        <div className="mx-auto max-w-md rounded-[28px] border border-dashed border-[var(--brand-border)] bg-[#fbfcff] px-6 py-10">
                          <p className="text-lg font-medium text-[#101426]">No transactions yet</p>
                          <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">
                            This customer has no ledger entries yet beyond the current account snapshot.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                          <thead className="bg-[#f8f9fd] text-[11px] uppercase tracking-[0.2em] text-[#7a8098]">
                            <tr>
                              <th className="px-6 py-4 font-medium">When</th>
                              <th className="px-4 py-4 font-medium">Type</th>
                              <th className="px-4 py-4 font-medium">Delta</th>
                              <th className="px-4 py-4 font-medium">Balance</th>
                              <th className="px-6 py-4 font-medium">Details</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[var(--brand-border)]">
                            {billingData.ledger.map((entry) => (
                              <tr key={entry.id} className="align-top transition hover:bg-[#fafbff]">
                                <td className="px-6 py-5 text-[#3a425d]">{formatDate(entry.created_at)}</td>
                                <td className="px-4 py-5">
                                  <div className="font-medium text-[#101426]">{entry.entry_type.replaceAll("_", " ")}</div>
                                  <div className="mt-1 text-xs text-[#7a8098]">{entry.source || "—"}</div>
                                </td>
                                <td className={`px-4 py-5 font-medium ${entry.delta_minutes >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                                  {formatDelta(entry.delta_minutes)}
                                </td>
                                <td className="px-4 py-5 text-[#3a425d]">{entry.balance_after_minutes} min</td>
                                <td className="px-6 py-5">
                                  <div className="text-[#3a425d]">{entry.description || "—"}</div>
                                  {"approved_by" in (entry.metadata || {}) ? (
                                    <div className="mt-1 text-xs text-[#7a8098]">
                                      By {String(entry.metadata?.approved_by || "ops")}
                                    </div>
                                  ) : null}
                                  {"notes" in (entry.metadata || {}) && String(entry.metadata?.notes || "").trim() ? (
                                    <div className="mt-1 text-xs leading-5 text-[#7a8098]">
                                      {String(entry.metadata?.notes || "")}
                                    </div>
                                  ) : null}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </section>
        )}

        {tab === "jobs" && error && (
          <div className="rounded-[28px] border border-rose-200 bg-rose-50 px-6 py-5 text-sm text-rose-700 shadow-[0_18px_40px_rgba(190,24,93,0.08)]">
            {error}
          </div>
        )}

        {tab === "jobs" && data && filteredSummary && (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="Filtered Jobs"
                value={filteredSummary.recent_jobs_count}
                detail={`Completed ${filteredSummary.recent_completed_jobs} • Failed ${filteredSummary.recent_failed_jobs}`}
              />
              <MetricCard
                label="Audio Minutes"
                value={filteredSummary.recent_audio_minutes.toFixed(1)}
                detail={`Estimated cost $${filteredSummary.recent_estimated_cost_usd.toFixed(2)}`}
              />
              <MetricCard
                label="Average Processing"
                value={formatSeconds(filteredSummary.avg_processing_time_seconds)}
                detail={`Realtime factor ${formatPercent(filteredSummary.avg_realtime_factor)}`}
              />
              <MetricCard
                label="Current Scope"
                value={filters.status ? filters.status.replaceAll("_", " ") : "All jobs"}
                detail={filters.email ? `Email contains "${filters.email}"` : "No email slice applied"}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="CPU Lane"
                value={filteredSummary.lane_counts.cpu || 0}
                detail={`Filtered slice • Global ${data.summary.lane_counts.cpu || 0}`}
              />
              <MetricCard
                label="GPU Lane"
                value={filteredSummary.lane_counts.gpu || 0}
                detail={`Filtered slice • Global ${data.summary.lane_counts.gpu || 0}`}
              />
              <MetricCard
                label="Standard Tier"
                value={filteredSummary.tier_counts.standard || 0}
                detail={`Filtered slice • Global ${data.summary.tier_counts.standard || 0}`}
              />
              <MetricCard
                label="Premium Tier"
                value={filteredSummary.tier_counts.premium || 0}
                detail={`Filtered slice • Global ${data.summary.tier_counts.premium || 0}`}
              />
            </div>

            <div className="grid gap-5 xl:grid-cols-[320px,minmax(0,1fr)]">
              <div className="rounded-[34px] border border-[var(--brand-border)] bg-white p-6 shadow-[0_22px_60px_rgba(15,23,42,0.06)]">
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#5b62d6]">
                    System State
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#101426]">
                    Status counts
                  </h2>
                  <p className="text-sm leading-6 text-[var(--brand-muted)]">
                    Global counts stay unfiltered so you always have system-wide context while drilling into a slice.
                  </p>
                </div>

                <div className="mt-6 grid gap-3">
                  {Object.entries(data.summary.status_counts).map(([status, count]) => (
                    <StatusCountCard key={status} status={status} count={count} />
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-[34px] border border-[var(--brand-border)] bg-white shadow-[0_22px_60px_rgba(15,23,42,0.06)]">
                <div className="flex flex-col gap-3 border-b border-[var(--brand-border)] px-6 py-6 md:flex-row md:items-end md:justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#5b62d6]">
                      Recent Jobs
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight text-[#101426]">
                      Filtered queue slice
                    </h2>
                    <p className="text-sm leading-6 text-[var(--brand-muted)]">
                      Narrow by status, language, and customer email to isolate bad runs quickly.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--brand-border)] bg-[#fbfcff] px-4 py-3 text-sm text-[var(--brand-muted)]">
                    Showing <span className="font-semibold text-[#101426]">{filteredJobs.length}</span> of{" "}
                    <span className="font-semibold text-[#101426]">{data.jobs.length}</span> fetched jobs
                  </div>
                </div>

                {filteredJobs.length === 0 ? (
                  <div className="px-6 py-14 text-center">
                    <div className="mx-auto max-w-md rounded-[28px] border border-dashed border-[var(--brand-border)] bg-[#fbfcff] px-6 py-10">
                      <p className="text-lg font-medium text-[#101426]">No jobs matched this slice</p>
                      <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">
                        Try loosening one of the filters or reset back to the full dashboard view.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead className="bg-[#f8f9fd] text-[11px] uppercase tracking-[0.2em] text-[#7a8098]">
                        <tr>
                          <th className="px-6 py-4 font-medium">Job</th>
                          <th className="px-4 py-4 font-medium">Status</th>
                          <th className="px-4 py-4 font-medium">Routing</th>
                          <th className="px-4 py-4 font-medium">Progress</th>
                          <th className="px-4 py-4 font-medium">Language</th>
                          <th className="px-4 py-4 font-medium">Audio</th>
                          <th className="px-4 py-4 font-medium">Processing</th>
                          <th className="px-6 py-4 font-medium">Updated</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--brand-border)]">
                        {filteredJobs.map((job) => (
                          <tr
                            key={job.job_id}
                            className="align-top transition hover:bg-[#fafbff]"
                          >
                            <td className="px-6 py-5">
                              <div className="space-y-1.5">
                                <div className="font-semibold text-[#101426]">{job.job_id}</div>
                                <div className="text-xs text-[#7a8098]">{job.email || "—"}</div>
                                <div className="max-w-md text-xs leading-5 text-[#7a8098]">
                                  {job.status_message || "—"}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-5">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusTone(job.status)}`}
                              >
                                {(job.status || "unknown").replaceAll("_", " ")}
                              </span>
                            </td>
                            <td className="px-4 py-5">
                              <div className="space-y-2">
                                <div className="flex flex-wrap gap-2">
                                  <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium uppercase ${getLaneTone(job.execution_lane)}`}
                                  >
                                    {job.execution_lane || "unknown"}
                                  </span>
                                  <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${getTierTone(job.processing_tier)}`}
                                  >
                                    {job.processing_tier || "unknown"}
                                  </span>
                                </div>
                                <div className="text-xs leading-5 text-[#7a8098]">
                                  {job.worker_job_region || "—"} • {job.speaker_mode || "—"}
                                </div>
                                <div className="text-xs leading-5 text-[#7a8098]">
                                  {job.routing_reason || "No routing note"}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-5">
                              <div className="min-w-32">
                                <div className="mb-2 flex items-center justify-between text-xs text-[#7a8098]">
                                  <span>{job.progress}%</span>
                                  <span>{job.attempts || 0} tries</span>
                                </div>
                                <div className="h-2.5 overflow-hidden rounded-full bg-[rgba(40,41,126,0.12)]">
                                  <div
                                    className="h-2.5 rounded-full bg-[linear-gradient(90deg,#28297e,#5a66dc)]"
                                    style={{ width: `${job.progress}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-5 text-[#3a425d]">
                              {getDisplayLanguage(job)}
                            </td>
                            <td className="px-4 py-5 text-[#3a425d]">
                              {formatSeconds(job.audio_duration_seconds)}
                            </td>
                            <td className="px-4 py-5">
                              <div className="text-[#101426]">
                                {formatSeconds(job.processing_time_seconds)}
                              </div>
                              <div className="mt-1 text-xs text-[#7a8098]">
                                Cost{" "}
                                {typeof job.estimated_cost_usd === "number"
                                  ? `$${job.estimated_cost_usd.toFixed(2)}`
                                  : "—"}
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="text-[#3a425d]">
                                {formatDate(job.updated_at || job.created_at)}
                              </div>
                              <div className="mt-1 text-xs text-[#7a8098]">
                                Done {formatDate(job.completed_at)}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
