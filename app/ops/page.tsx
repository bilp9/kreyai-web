export const dynamic = "force-dynamic";

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
      return "bg-emerald-400/15 text-emerald-200 ring-1 ring-inset ring-emerald-400/30";
    case "failed":
      return "bg-rose-400/15 text-rose-200 ring-1 ring-inset ring-rose-400/30";
    case "processing":
      return "bg-sky-400/15 text-sky-200 ring-1 ring-inset ring-sky-400/30";
    case "queued":
      return "bg-amber-300/15 text-amber-100 ring-1 ring-inset ring-amber-300/30";
    case "verified":
      return "bg-indigo-300/15 text-indigo-100 ring-1 ring-inset ring-indigo-300/30";
    default:
      return "bg-white/8 text-slate-200 ring-1 ring-inset ring-white/10";
  }
}

function getLaneTone(lane?: string) {
  switch (normalizeText(lane)) {
    case "gpu":
      return "bg-fuchsia-400/15 text-fuchsia-100 ring-1 ring-inset ring-fuchsia-400/30";
    case "cpu":
      return "bg-cyan-400/15 text-cyan-100 ring-1 ring-inset ring-cyan-400/30";
    default:
      return "bg-white/8 text-slate-200 ring-1 ring-inset ring-white/10";
  }
}

function getTierTone(tier?: string) {
  switch (normalizeText(tier)) {
    case "premium":
      return "bg-amber-300/15 text-amber-100 ring-1 ring-inset ring-amber-300/30";
    case "standard":
      return "bg-emerald-400/15 text-emerald-100 ring-1 ring-inset ring-emerald-400/30";
    default:
      return "bg-white/8 text-slate-200 ring-1 ring-inset ring-white/10";
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
    <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm capitalize text-slate-300">
          {status.replaceAll("_", " ")}
        </span>
        <span className="text-lg font-semibold text-white">{count}</span>
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
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,31,61,0.92),rgba(10,16,35,0.98))] p-6 shadow-[0_30px_80px_rgba(1,6,20,0.45)]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(125,211,252,0),rgba(125,211,252,0.85),rgba(125,211,252,0))]" />
      <p className="text-xs uppercase tracking-[0.18em] text-sky-100/60">{label}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{detail}</p>
    </div>
  );
}

export default async function OpsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedParams = await searchParams;

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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07111f] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.25),transparent_34%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.15),transparent_24%),linear-gradient(180deg,#0a1630_0%,#07111f_45%,#050b16_100%)]" />
        <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-4rem] top-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,rgba(148,163,184,0.08),transparent)]" />
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      </div>

      <section className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:py-16">
        <div className="overflow-hidden rounded-[40px] border border-white/10 bg-[linear-gradient(145deg,rgba(9,20,40,0.9),rgba(4,10,22,0.95))] p-8 shadow-[0_40px_120px_rgba(2,6,23,0.6)] md:p-10">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.34em] text-cyan-200/70">
                KreyAI Internal Ops
              </p>
              <div className="space-y-3">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
                  Mission control for transcript flow, failures, and throughput.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                  Live operational view for queue health, job filtering, and recent processing behavior across the soft-launch system.
                </p>
              </div>
            </div>

            {data && (
              <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[420px]">
                <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Viewer
                  </p>
                  <p className="mt-2 truncate text-sm font-medium text-white">
                    {getViewerLabel(data.viewer)}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Plan
                  </p>
                  <p className="mt-2 text-sm font-medium capitalize text-cyan-100">
                    {data.viewer.plan || "unknown"}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Active Slice
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    {filteredSummary ? `${filteredSummary.recent_jobs_count} jobs` : "—"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <form
          method="GET"
          className="grid gap-4 rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(9,18,35,0.88),rgba(7,12,24,0.92))] p-5 shadow-[0_24px_80px_rgba(2,6,23,0.45)] md:grid-cols-2 xl:grid-cols-5 xl:p-6"
        >
          <label className="space-y-2 text-sm">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              Status
            </span>
            <select
              name="status"
              defaultValue={filters.status}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60 focus:bg-white/10"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-950 text-white">
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
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-300/60 focus:bg-white/10"
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
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-300/60 focus:bg-white/10"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              Rows
            </span>
            <select
              name="limit"
              defaultValue={String(filters.limit)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60 focus:bg-white/10"
            >
              {LIMIT_OPTIONS.map((option) => (
                <option key={option} value={option} className="bg-slate-950 text-white">
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-end gap-3">
            <button
              type="submit"
              className="w-full rounded-2xl bg-[linear-gradient(135deg,#38bdf8,#2563eb)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.35)] transition hover:brightness-110"
            >
              Apply
            </button>
            <a
              href="/ops"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              Reset
            </a>
          </div>
        </form>

        {error && (
          <div className="rounded-[28px] border border-rose-400/25 bg-rose-400/10 px-6 py-5 text-sm text-rose-100 shadow-[0_20px_60px_rgba(136,19,55,0.22)]">
            {error}
          </div>
        )}

        {data && filteredSummary && (
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
              <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,20,39,0.88),rgba(7,12,24,0.94))] p-6 shadow-[0_28px_90px_rgba(2,6,23,0.48)]">
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-cyan-200/70">
                    System State
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Status counts
                  </h2>
                  <p className="text-sm leading-6 text-slate-400">
                    Global counts stay unfiltered so you always have system-wide context while drilling into a slice.
                  </p>
                </div>

                <div className="mt-6 grid gap-3">
                  {Object.entries(data.summary.status_counts).map(([status, count]) => (
                    <StatusCountCard key={status} status={status} count={count} />
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,20,39,0.88),rgba(7,12,24,0.94))] shadow-[0_28px_90px_rgba(2,6,23,0.48)]">
                <div className="flex flex-col gap-3 border-b border-white/10 px-6 py-6 md:flex-row md:items-end md:justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-cyan-200/70">
                      Recent Jobs
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight text-white">
                      Filtered queue slice
                    </h2>
                    <p className="text-sm leading-6 text-slate-400">
                      Narrow by status, language, and customer email to isolate bad runs quickly.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                    Showing <span className="font-semibold text-white">{filteredJobs.length}</span> of{" "}
                    <span className="font-semibold text-white">{data.jobs.length}</span> fetched jobs
                  </div>
                </div>

                {filteredJobs.length === 0 ? (
                  <div className="px-6 py-14 text-center">
                    <div className="mx-auto max-w-md rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] px-6 py-10">
                      <p className="text-lg font-medium text-white">No jobs matched this slice</p>
                      <p className="mt-3 text-sm leading-6 text-slate-400">
                        Try loosening one of the filters or reset back to the full dashboard view.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead className="bg-white/[0.03] text-[11px] uppercase tracking-[0.2em] text-slate-400">
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
                      <tbody className="divide-y divide-white/5">
                        {filteredJobs.map((job) => (
                          <tr
                            key={job.job_id}
                            className="align-top transition hover:bg-white/[0.03]"
                          >
                            <td className="px-6 py-5">
                              <div className="space-y-1.5">
                                <div className="font-semibold text-white">{job.job_id}</div>
                                <div className="text-xs text-slate-400">{job.email || "—"}</div>
                                <div className="max-w-md text-xs leading-5 text-slate-500">
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
                                <div className="text-xs leading-5 text-slate-400">
                                  {job.worker_job_region || "—"} • {job.speaker_mode || "—"}
                                </div>
                                <div className="text-xs leading-5 text-slate-500">
                                  {job.routing_reason || "No routing note"}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-5">
                              <div className="min-w-32">
                                <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                                  <span>{job.progress}%</span>
                                  <span>{job.attempts || 0} tries</span>
                                </div>
                                <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                                  <div
                                    className="h-2.5 rounded-full bg-[linear-gradient(90deg,#38bdf8,#2563eb)]"
                                    style={{ width: `${job.progress}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-5 text-slate-200">
                              {getDisplayLanguage(job)}
                            </td>
                            <td className="px-4 py-5 text-slate-200">
                              {formatSeconds(job.audio_duration_seconds)}
                            </td>
                            <td className="px-4 py-5">
                              <div className="text-slate-100">
                                {formatSeconds(job.processing_time_seconds)}
                              </div>
                              <div className="mt-1 text-xs text-slate-500">
                                Cost{" "}
                                {typeof job.estimated_cost_usd === "number"
                                  ? `$${job.estimated_cost_usd.toFixed(2)}`
                                  : "—"}
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="text-slate-200">
                                {formatDate(job.updated_at || job.created_at)}
                              </div>
                              <div className="mt-1 text-xs text-slate-500">
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
