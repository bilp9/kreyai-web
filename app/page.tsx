"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startJob() {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/?email=${encodeURIComponent(email)}`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error("Failed to create job.");

      const data = await res.json();
      router.push(`/verify?job=${data.job_id}&email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Header />

      {/* Background energy (Echo/Stripe vibe) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute top-10 right-[-120px] h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-[-220px] left-1/3 h-[620px] w-[620px] rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-24">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Left: hero */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              Transcription{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                without compromise.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-xl">
              Accurate, speaker-aware transcripts for multilingual audio.
              Built for professionals who need precision, not summaries.
            </p>

            {/* CTA */}
            <div className="mt-6 w-full max-w-xl rounded-2xl border border-black/10 bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)] p-2">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full flex-1 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 outline-none"
                />

                <button
                  onClick={startJob}
                  disabled={loading}
                  className="rounded-xl bg-neutral-900 px-6 py-3 text-white font-medium hover:bg-black transition disabled:opacity-60"
                >
                  {loading ? "Starting…" : "Get Started"}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <p className="text-sm text-neutral-500">
              No account required • Secure file handling • Time-limited retention
            </p>
          </div>

          {/* Right: demo card */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-fuchsia-500/10 blur-2xl" />

            <div className="relative rounded-3xl border border-black/10 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] p-8">
              <div className="flex items-start justify-between">
                <span className="inline-flex rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-700">
                  SPEAKER 1
                </span>
                <span className="text-xs text-neutral-400">00:00:04</span>
              </div>

              <p className="mt-4 text-neutral-800 leading-relaxed">
                “We needed a transcript that preserved the original meaning.”
              </p>

              <div className="my-6 h-px w-full bg-black/5" />

              <div className="flex items-start justify-between">
                <span className="inline-flex rounded-full bg-fuchsia-600/10 px-3 py-1 text-xs font-semibold tracking-wide text-fuchsia-700">
                  SPEAKER 2
                </span>
                <span className="text-xs text-neutral-400">00:00:12</span>
              </div>

              <p className="mt-4 text-neutral-800 leading-relaxed">
                “Exactly. Accuracy matters when language carries nuance.”
              </p>
            </div>
          </div>
        </div>

        {/* Feature row */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {[
            ["Faithful transcription", "No paraphrasing. No forced rewrites. Just what was said."],
            ["Speaker-aware output", "Structured transcripts for interviews, meetings, and recordings."],
            ["Professional-ready", "TXT, DOCX, SRT, VTT — built for real workflows."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur-xl p-6 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.25)]"
            >
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-neutral-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}