"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type LanguageOption = {
  code: string;
  label: string;
};

const TRUST_POINTS = [
  "No account required",
  "Speaker-aware exports",
  "Time-limited retention",
];

const FEATURE_CARDS = [
  {
    title: "Faithful by default",
    description:
      "Designed for transcripts that preserve what was said instead of sanding it down into generic summaries.",
  },
  {
    title: "Built for mixed-language speech",
    description:
      "Handles multilingual audio, speaker shifts, and professional delivery formats without making the workflow feel heavy.",
  },
  {
    title: "Export ready",
    description:
      "Generate TXT, DOCX, SRT, VTT, and polished HTML outputs that are usable immediately by editors, producers, and teams.",
  },
];

const FALLBACK_LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "auto", label: "Auto Detect" },
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "pt", label: "Portuguese" },
  { code: "ht", label: "Haitian Creole" },
];

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("auto");
  const [languageOptions, setLanguageOptions] = useState<LanguageOption[]>(FALLBACK_LANGUAGE_OPTIONS);
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    router.prefetch("/verify");
  }, [router]);

  useEffect(() => {
    let active = true;

    async function loadPublicConfig() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public-config`, {
          cache: "no-store",
        });

        if (!res.ok) {
          return;
        }

        const data = (await res.json()) as {
          default_language?: string;
          languages?: LanguageOption[];
        };

        if (!active || !Array.isArray(data.languages) || data.languages.length === 0) {
          return;
        }

        setLanguageOptions(data.languages);

        const nextDefaultLanguage = data.default_language ?? "auto";
        const nextLanguageIsAvailable = data.languages.some((option) => option.code === language);

        if (!nextLanguageIsAvailable) {
          setLanguage(nextDefaultLanguage);
        }
      } catch {
        // Keep the fallback options if public config is unavailable.
      }
    }

    loadPublicConfig();

    return () => {
      active = false;
    };
  }, []);

  function getErrorMessage(err: unknown): string {
    if (err instanceof Error) {
      return err.message;
    }
    return "Failed to create job.";
  }

  async function startJob() {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    if (!acceptedTerms) {
      setError("You must accept the Terms of Service.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          language,
          accepted_terms: acceptedTerms,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to create job.");
      }

      const data = await res.json();

      startTransition(() => {
        router.push(`/verify?job=${data.job_id}&email=${encodeURIComponent(email)}`);
      });
    } catch (err: unknown) {
      setError(getErrorMessage(err));
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f2e8] text-neutral-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,#fff8d8_0%,rgba(255,248,216,0.55)_25%,rgba(247,242,232,0)_72%)]" />
        <div className="absolute left-[-120px] top-24 h-[360px] w-[360px] rounded-full bg-[#e7b56e]/20 blur-3xl" />
        <div className="absolute right-[-140px] top-40 h-[420px] w-[420px] rounded-full bg-[#84a98c]/18 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(247,242,232,0)_0%,rgba(240,232,218,0.9)_100%)]" />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-24">
        <div className="grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#cda76e]/40 bg-white/70 px-4 py-2 text-sm text-[#8a5a2b] shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#c7772a]" />
              Structured multilingual transcription
            </div>

            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.97] tracking-tight md:text-7xl">
                Serious transcription
                <span className="block text-[#8a5a2b]">for real-world speech.</span>
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-neutral-700 md:text-xl">
                KreyAI is built for interviews, field recordings, meetings, media, and mixed-language audio that
                needs to come back readable, structured, and usable.
              </p>
            </div>

            <div className="grid max-w-2xl gap-4 sm:grid-cols-3">
              {[
                ["Speaker structure", "Readable segments instead of raw text walls."],
                ["Professional exports", "Ready for editorial, legal, and production workflows."],
                ["Fast handoff", "Start with an email, verify, upload, and track progress."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-[24px] border border-black/5 bg-white/75 p-5 shadow-[0_18px_50px_rgba(59,43,22,0.08)] backdrop-blur"
                >
                  <p className="text-sm font-semibold text-neutral-900">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-neutral-600">
              {TRUST_POINTS.map((point) => (
                <span
                  key={point}
                  className="rounded-full border border-black/8 bg-white/65 px-4 py-2 shadow-sm"
                >
                  {point}
                </span>
              ))}
            </div>
          </div>

          <section className="rounded-[32px] border border-[#cdb892] bg-[linear-gradient(180deg,rgba(255,253,249,0.98)_0%,rgba(250,246,239,0.98)_100%)] p-6 shadow-[0_28px_90px_rgba(61,45,22,0.14)] md:p-8">
            <div className="space-y-6" aria-busy={loading}>
              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#8a5a2b]">
                  Start Securely
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Create your transcription request.
                </h2>
                <p className="text-sm leading-6 text-neutral-600">
                  We’ll create a secure job, send your verification step, and move you straight into upload.
                </p>
              </div>

              <div className="grid gap-4">
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-2xl border border-[#d8cab3] bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#c7772a]/20 disabled:cursor-not-allowed disabled:opacity-70"
                />

                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-2xl border border-[#d8cab3] bg-white px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#c7772a]/20 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {languageOptions.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <label className="flex items-start gap-3 rounded-2xl border border-transparent bg-[#f3ebdf] px-4 py-3 text-sm text-neutral-700">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    disabled={loading}
                    className="mt-1 h-4 w-4 rounded border-neutral-300 text-[#8a5a2b] focus:ring-[#c7772a]"
                  />
                  <span>
                    I agree to the Terms of Service and understand uploaded files are processed securely with temporary retention.
                  </span>
                </label>
              </div>

              <button
                onClick={startJob}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#231f1b] px-6 py-3 text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Starting secure request…
                  </>
                ) : (
                  "Start transcription"
                )}
              </button>

              {loading && (
                <div className="rounded-2xl border border-[#d7c59e] bg-[#fff4de] px-4 py-3 text-sm text-[#7a4c18]">
                  Creating your secure job and preparing the verification step.
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="rounded-[24px] border border-black/5 bg-white/70 p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-neutral-500">Typical flow</p>
                    <p className="mt-1 text-lg font-semibold text-neutral-900">Email → Verify → Upload → Track</p>
                  </div>
                  <p className="text-sm font-medium text-[#8a5a2b]">No account needed</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  After this step, we send you to verification so only you can continue the upload and download flow.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-24 h-px w-full bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(35,31,27,0.16)_50%,rgba(0,0,0,0)_100%)]" />

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {FEATURE_CARDS.map((card) => (
            <article
              key={card.title}
              className="rounded-[28px] border border-black/5 bg-white/70 p-6 shadow-[0_18px_50px_rgba(59,43,22,0.08)] backdrop-blur"
            >
              <p className="text-lg font-semibold text-neutral-900">{card.title}</p>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{card.description}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
