"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type LanguageOption = {
  code: string;
  label: string;
};

function filterSelectableLanguages(options: LanguageOption[]): LanguageOption[] {
  return options.filter((option) => option.code !== "auto");
}

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Upload your file",
    description: "Enter your email and send your audio. No account required.",
  },
  {
    step: "02",
    title: "Choose how it should read",
    description: "Pick a clean transcript for straightforward recordings or speaker labels for interviews, meetings, and conversations.",
  },
  {
    step: "03",
    title: "Download your transcript",
    description: "Get clean, structured output ready for editing, sharing, or publishing.",
  },
];

const TRUST_ITEMS = [
  {
    title: "Private by design",
    description: "Your files are used only for transcription and never for training or sharing.",
  },
  {
    title: "7-day file access",
    description: "Files stay available for 7 days, then are scheduled for automatic deletion from active storage.",
  },
  {
    title: "No login required",
    description: "Start and finish your workflow without creating an account.",
  },
];

const PRICING_ITEMS = [
  {
    title: "Standard transcription",
    description: "A clean transcript for single-speaker and straightforward recordings at the lowest cost.",
  },
  {
    title: "Speaker-labeled premium",
    description: "Best for interviews, meetings, and conversations where separating speakers makes review easier.",
  },
];

const INDUSTRY_SOLUTIONS = [
  {
    title: "Journalism & Media",
    description:
      "Get clean, speaker-labeled transcripts for interviews and podcasts within minutes. Subtitle exports help make video content accessible faster.",
  },
  {
    title: "Legal & Government",
    description:
      "Private by design for sensitive work, with automatic 7-day deletion and a strict no-training policy so your data stays yours.",
  },
  {
    title: "Education & Research",
    description:
      "Transcribe lectures, oral histories, and field research with care, even when participants move between languages or dialects.",
  },
];

const SECURITY_ITEMS = [
  {
    title: "Zero-training policy",
    description: "We never use your audio or transcripts to train AI models. Your intellectual property remains private.",
  },
  {
    title: "Automatic deletion",
    description:
      "Files stay in secure active storage for 7 days, long enough to finish your work, then are scheduled for deletion.",
  },
  {
    title: "Anonymous workflow",
    description:
      "No traditional login means less personal data collected. Enter your email, upload your file, and get to work.",
  },
];

const LANGUAGE_PAGES = [
  {
    title: "Haitian Creole",
    href: "/haitian-creole-transcription",
    description: "Beta Kreyòl draft transcripts, subtitles, and speaker labels.",
  },
  {
    title: "French",
    href: "/french-transcription",
    description: "French audio transcripts and subtitle exports.",
  },
  {
    title: "Spanish",
    href: "/spanish-transcription",
    description: "Spanish interviews, podcasts, meetings, and lectures.",
  },
  {
    title: "Portuguese",
    href: "/portuguese-transcription",
    description: "Portuguese transcript and subtitle outputs.",
  },
];

const PRODUCT_FAMILY = [
  {
    title: "KreyAI Transcription",
    href: "/",
    description: "Audio-to-text workflows for transcripts, subtitles, speaker labels, and multilingual recordings.",
    status: "Public",
  },
  {
    title: "Adwaz",
    href: "/adwaz",
    description: "Haitian Creole writing assistance for spelling, accents, grammar patterns, and explainable review.",
    status: "Private beta",
  },
];

const FALLBACK_LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "ht", label: "Haitian Creole" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "pt", label: "Portuguese" },
];

function TranscriptPreview() {
  return (
    <div className="relative group">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative space-y-8 rounded-2xl border border-white/40 bg-white/70 p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="rounded-md border border-indigo-100/50 bg-indigo-50/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600">
              Speaker 1
            </span>
            <span className="font-mono text-[11px] font-medium tabular-nums text-slate-400">
              00:00:04.250
            </span>
          </div>
          <p className="border-l-2 border-indigo-500/10 pl-1 text-[15px] leading-relaxed font-medium italic text-slate-800">
            &ldquo;We needed a transcript that preserved the original meaning, not something rewritten or summarized by
            a generic model.&rdquo;
          </p>
        </div>

        <div className="space-y-3 border-t border-slate-100/60 pt-6">
          <div className="flex items-center justify-between">
            <span className="rounded-md border border-purple-100/50 bg-purple-50/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600">
              Speaker 2
            </span>
            <span className="font-mono text-[11px] font-medium tabular-nums text-slate-400">
              00:00:12.840
            </span>
          </div>
          <p className="border-l-2 border-purple-500/10 pl-1 text-[15px] leading-relaxed font-medium italic text-slate-800">
            &ldquo;Exactly. Precision in language is everything, especially when you&apos;re dealing with technical
            nuance or multiple dialects.&rdquo;
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <div className="flex gap-1.5">
            <span className="h-1 w-1 rounded-full bg-slate-200" />
            <span className="h-1 w-1 rounded-full bg-slate-200" />
            <span className="h-1 w-1 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
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
        // Keep the fallback options if public config is unavailable.
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
    <main className="brand-page bg-[#F8FAFC]">
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:pb-32 md:pt-20">
        <div className="grid gap-20 lg:grid-cols-[1fr_400px] lg:items-start">
          <div className="space-y-12">
            <div className="brand-kicker inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
              <span className="brand-dot mr-2 bg-indigo-600" />
              Language-aware transcription
            </div>

            <div className="max-w-3xl space-y-8">
              <h1 className="text-6xl leading-[0.95] font-bold tracking-[-0.05em] text-[#101426] md:text-8xl">
                KreyAI
                <span className="mt-4 block text-[#28297e] opacity-90">Beyond transcription.</span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-slate-500 md:text-xl">
                KreyAI is built for interviews in the field, podcasts, journalism, meetings, and real conversations.
                Clean transcripts you can use without reworking.
              </p>

              <div className="max-w-2xl rounded-2xl border border-[#d9def1] bg-white/70 px-5 py-4 text-sm leading-7 text-[#4f5879] shadow-sm">
                Need to buy minutes or check what is left on your account? Visit the Billing page and enter your email
                to view your available balance.
              </div>
            </div>
          </div>

          <section
            className="brand-panel rounded-[40px] border border-slate-200 bg-white p-8 shadow-xl shadow-indigo-900/5"
            aria-busy={loading}
          >
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600">Get started</p>
                <h2 className="text-2xl font-bold tracking-tight text-[#101426]">New Request</h2>
                <p className="max-w-sm text-sm leading-6 text-[var(--brand-muted)]">
                  Choose your language now. On the next step, you can decide whether you want a clean transcript or
                  speaker labels.
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
                className="brand-button w-full rounded-2xl bg-[#101426] py-4 text-sm font-bold text-white transition-all hover:bg-black active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? "Starting..." : "Start transcription"}
              </button>

              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-medium text-red-600">
                  {error}
                </div>
              )}

              <div className="border-t border-slate-100 pt-4">
                <p className="text-sm leading-6 text-[var(--brand-muted)]">
                  Transcript and subtitle exports are available after processing, with speaker labels when you choose
                  them.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-3">
          {TRUST_ITEMS.map((item) => (
            <article key={item.title} className="group cursor-default">
              <h3 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-18 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#28297e]">Product family</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#101426] md:text-5xl">
            Practical language tools under one roof.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[var(--brand-muted)]">
            KreyAI starts with transcription and expands into writing support through Adwaz, a focused Haitian Creole
            assistant powered by the same language-services mindset.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {PRODUCT_FAMILY.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="brand-card rounded-[28px] p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#101426]">{item.title}</h3>
                <span className="rounded-full bg-[var(--brand-blue-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand-blue)]">
                  {item.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-18 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#28297e]">How it works</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#101426] md:text-5xl">
            A simple flow, without the clutter.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <article key={item.step} className="brand-card rounded-[30px] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7a8098]">{item.step}</p>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em] text-[#101426]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-18 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#28297e]">Industry solutions</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#101426] md:text-5xl">
              Built for the people who need every word to hold up.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[var(--brand-muted)]">
              KreyAI supports real working audio: interviews, public records, lectures, research sessions, and
              multilingual conversations where context matters.
            </p>
          </div>

          <div className="grid gap-5">
            {INDUSTRY_SOLUTIONS.map((item) => (
              <article key={item.title} className="brand-card rounded-[28px] p-6">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#101426]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--brand-border)] bg-white/70">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-18 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#28297e]">Security & privacy</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#101426] md:text-5xl">
              Your data is a guest, not a product.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[var(--brand-muted)]">
              Security should not be a premium feature. KreyAI is designed to process your files for transcription,
              keep them available briefly, and avoid collecting more personal data than the workflow needs.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1">
            {SECURITY_ITEMS.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-[var(--brand-border)] bg-white p-6">
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#101426]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-18 md:py-24">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#28297e]">Languages</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#101426] md:text-4xl">
            Supported transcription languages.
          </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[var(--brand-muted)]">
            KreyAI is built for multilingual audio, with focused support pages for common transcription workflows.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LANGUAGE_PAGES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[22px] border border-[var(--brand-border)] bg-white/75 p-5 transition hover:border-[var(--brand-border-strong)] hover:bg-white"
            >
              <h3 className="text-base font-semibold tracking-[-0.02em] text-[#101426]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-18 md:grid-cols-[0.9fr_1.1fr] md:py-24">
        <article className="rounded-[34px] border border-[var(--brand-border)] bg-white px-7 py-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#28297e]">Pricing</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#101426]">Simple by design.</h2>
          <div className="mt-8 space-y-5">
            {PRICING_ITEMS.map((item) => (
              <div key={item.title} className="rounded-3xl border border-[var(--brand-border)] px-5 py-5">
                <h3 className="text-lg font-semibold text-[#101426]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">{item.description}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[34px] border border-[var(--brand-border)] bg-[linear-gradient(180deg,#ffffff_0%,#fafbff_100%)] px-7 py-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#28297e]">Output preview</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#101426]">
            See exactly what you’ll get.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--brand-muted)]">
            Choose a clean transcript for straightforward recordings, or speaker labels when multiple voices need to be
            easy to follow.
          </p>

          <div className="mt-8">
            <TranscriptPreview />
          </div>
        </article>
      </section>

    </main>
  );
}
