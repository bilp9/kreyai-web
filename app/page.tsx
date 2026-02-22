"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <main className="relative min-h-screen bg-neutral-950 text-white">

      {/* Top soft gradient */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 py-32 space-y-40">

        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-16 items-center">

          <div className="space-y-8">

            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
              AI transcription built for real-world language.
            </h1>

            <p className="text-xl text-gray-300">
              Accurate, speaker-aware transcripts for multilingual audio —
              designed for professionals who value precision.
            </p>

            <div className="pt-6 flex gap-4">

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl bg-neutral-900 border border-neutral-700 px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white"
              />

              <button
                onClick={startJob}
                disabled={loading}
                className="rounded-xl bg-white px-6 py-3 text-base font-medium text-black hover:bg-gray-200 transition"
              >
                {loading ? "Starting…" : "Start"}
              </button>

            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <p className="text-sm text-gray-400">
              No account required • Secure file handling • Time-limited retention
            </p>

          </div>

          {/* Visual Block */}
          <div className="hidden md:block">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 space-y-4 shadow-2xl">

              <div className="flex justify-between text-sm text-gray-400">
                <span>Speaker 1</span>
                <span>00:00</span>
              </div>

              <p className="text-gray-200">
                We needed a transcript that preserved the original meaning,
                not something rewritten or summarized.
              </p>

              <div className="flex justify-between text-sm text-gray-400 pt-4">
                <span>Speaker 2</span>
                <span>00:12</span>
              </div>

              <p className="text-gray-200">
                Exactly. Accuracy matters when language carries nuance.
              </p>

            </div>
          </div>

        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-12">

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Faithful transcription</h3>
            <p className="text-gray-400">
              No paraphrasing. No forced rewrites. Just what was actually said.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Speaker-aware output</h3>
            <p className="text-gray-400">
              Structured transcripts for interviews, meetings, and recordings.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Built for professionals</h3>
            <p className="text-gray-400">
              Designed for research, legal, academic, and production workflows.
            </p>
          </div>

        </section>

        {/* Closing */}
        <section className="text-center space-y-6">

          <p className="text-2xl text-gray-300">
            Language deserves precision.
          </p>

          <p className="text-gray-500">
            A modern standard for AI transcription.
          </p>

        </section>

      </div>
    </main>
  );
}