"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

type LanguageOption = {
  code: string;
  label: string;
};

const FALLBACK_LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "ht", label: "Haitian Creole" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "pt", label: "Portuguese" },
];

const FEATURES = [
  "Clean transcripts for straightforward recordings",
  "Speaker labels for interviews, meetings, and conversations",
  "Subtitle exports for production and accessibility workflows",
  "Prepaid credits with no required subscription",
];

const TRUST_ITEMS = [
  "Files stay available for up to seven days, then are scheduled for deletion.",
  "Audio and transcripts are never used to train AI models.",
  "No traditional account is required to start a job.",
];

function filterSelectableLanguages(options: LanguageOption[]): LanguageOption[] {
  return options.filter((option) => option.code !== "auto");
}

export default function TranscriptionClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState(FALLBACK_LANGUAGE_OPTIONS[0]?.code ?? "en");
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

        const selectableLanguages = filterSelectableLanguages(data.languages ?? []);

        if (!active || selectableLanguages.length === 0) {
          return;
        }

        setLanguageOptions(selectableLanguages);

        const nextDefaultLanguage = selectableLanguages.some((option) => option.code === data.default_language)
          ? data.default_language!
          : selectableLanguages[0].code;
        const nextLanguageIsAvailable = selectableLanguages.some((option) => option.code === language);

        if (!nextLanguageIsAvailable) {
          setLanguage(nextDefaultLanguage);
        }
      } catch {
        // Keep fallback options if public config is unavailable.
      }
    }

    loadPublicConfig();

    return () => {
      active = false;
    };
  }, [language]);

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
    <main className="page-shell text-[#101426]">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_420px] lg:items-start">
        <div>
          <p className="page-eyebrow">KreyAI Transcription</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[0.98] tracking-[-0.05em] md:text-7xl">
            Turn audio and video into review-ready text.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--brand-muted)]">
            Generate transcripts, speaker labels, subtitle exports, and clean text for interviews, meetings, podcasts,
            research, and production workflows.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {FEATURES.map((feature) => (
              <div key={feature} className="surface-panel rounded-[24px] p-5 text-sm leading-7 text-[var(--brand-muted)]">
                {feature}
              </div>
            ))}
          </div>

          <div className="surface-callout mt-8 rounded-[24px] p-5">
            <p className="text-sm leading-7 text-[var(--brand-blue-deep)]">
              Need to buy minutes or check your balance? Visit{" "}
              <Link href="/billing" className="font-semibold underline underline-offset-4">
                Billing
              </Link>{" "}
              and enter your email.
            </p>
          </div>
        </div>

        <section className="brand-panel rounded-[34px] p-7" aria-busy={loading}>
          <div className="space-y-7">
            <div>
              <p className="page-eyebrow !text-[0.68rem]">Start</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">New transcription request</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">
                Choose your language now. On the next step, you can upload the file and choose output options.
              </p>
            </div>

            <div className="grid gap-5">
              <label className="space-y-2 text-sm text-[#3a425d]">
                <span className="ml-1 font-semibold">Email</span>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="brand-input w-full rounded-2xl border-slate-200 px-4 py-3.5 outline-none transition-all placeholder:text-[#8b92ab] focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-70"
                />
              </label>

              <label className="space-y-2 text-sm text-[#3a425d]">
                <span className="ml-1 font-semibold">Language</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  disabled={loading}
                  className="brand-input w-full appearance-none rounded-2xl border-slate-200 px-4 py-3.5 outline-none disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {languageOptions.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-[13px] leading-relaxed text-slate-600">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  disabled={loading}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>I agree to the Terms of Service.</span>
              </label>
            </div>

            <button
              onClick={startJob}
              disabled={loading}
              className="brand-button w-full rounded-2xl py-4 text-sm font-bold text-white transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Starting..." : "Start transcription"}
            </button>

            {error && <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-medium text-red-600">{error}</div>}
          </div>
        </section>
      </section>

      <section className="border-y border-[var(--brand-border)] bg-white/70">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-12 md:grid-cols-3">
          {TRUST_ITEMS.map((item) => (
            <article key={item} className="rounded-[24px] border border-[var(--brand-border)] bg-white p-5">
              <p className="text-sm leading-7 text-[var(--brand-muted)]">{item}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
