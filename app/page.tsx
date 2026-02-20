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
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="mx-auto max-w-4xl space-y-20">

        {/* Hero */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
            Language, captured with precision.
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Secure transcription and language intelligence for Haitian Creole and multilingual audio.
          </p>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Designed for professionals, researchers, and organizations that require accuracy,
            discretion, and clarity.
          </p>

          {/* Primary CTA */}
          <div className="pt-8 flex flex-col items-center gap-4">

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full max-w-md rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white"
            />

            <button
              onClick={startJob}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-medium text-black hover:bg-gray-200 transition"
            >
              {loading ? "Starting…" : "Start transcription"}
            </button>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <p className="text-sm text-gray-400">
              No account required • Secure • Time-limited retention
            </p>

            <span className="mt-2 inline-block rounded-full border border-gray-700 px-4 py-1.5 text-xs tracking-wide text-gray-400">
              Private beta
            </span>
          </div>
        </section>

        {/* What */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">
            Accurate transcription, without compromise.
          </h2>

          <p className="text-gray-300">
            Kreyai transforms audio and video into high-quality transcripts, with a focus on Haitian
            Creole and mixed-language speech. Our system is built to respect how people actually speak —
            including code-switching, accents, and conversational rhythm.
          </p>

          <p className="text-gray-300">
            Whether you are handling interviews, meetings, podcasts, or sensitive recordings, Kreyai
            prioritizes fidelity over shortcuts.
          </p>
        </section>

        {/* Why */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">
            Built for real-world language.
          </h2>

          <ul className="space-y-3 text-gray-300 list-disc list-inside">
            <li>Faithful transcription — not paraphrasing</li>
            <li>Speaker-aware output for multi-speaker recordings</li>
            <li>Human-review–friendly by design</li>
            <li>No forced “over-correction” of meaning</li>
          </ul>
        </section>

        {/* Security */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">
            Security & responsibility.
          </h2>

          <p className="text-gray-300">
            Kreyai is built with privacy and responsibility at its core.
          </p>

          <ul className="space-y-3 text-gray-300 list-disc list-inside">
            <li>Secure file handling</li>
            <li>Time-limited retention options</li>
            <li>Clear job identifiers for follow-up and support</li>
            <li>No use of customer content for model training</li>
          </ul>
        </section>

        {/* Audience */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">
            Who it’s for.
          </h2>

          <p className="text-gray-300">
            Kreyai is built for language professionals, researchers, journalists, legal and academic
            teams, and creators working in multilingual environments.
          </p>

          <p className="text-gray-300">
            If accuracy matters more than speed, Kreyai is for you.
          </p>
        </section>

        {/* Closing */}
        <section className="text-center space-y-4 pt-12">
          <p className="text-xl text-gray-300">
            A new standard for Creole-first language technology.
          </p>

          <p className="text-gray-500 italic">
            Accuracy is not optional. Language deserves care.
          </p>
        </section>

      </div>
    </main>
  );
}