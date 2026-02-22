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
    <main className="relative min-h-screen bg-black text-white px-6 py-32 overflow-hidden">

      {/* Ambient Glow Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 
                        w-[900px] h-[900px] 
                        bg-white/5 
                        rounded-full 
                        blur-3xl" />

        <div className="absolute bottom-10 right-10 
                        w-[400px] h-[400px] 
                        bg-indigo-500/10 
                        rounded-full 
                        blur-3xl" />

      </div>

      <div className="mx-auto max-w-5xl space-y-32">

        {/* Hero */}
        <section className="text-center space-y-10">

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight">
            Language, captured with precision.
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Secure transcription and language intelligence for Haitian Creole
            and multilingual audio.
          </p>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Designed for professionals, researchers, and organizations that
            require accuracy, discretion, and clarity.
          </p>

          {/* Glass CTA Panel */}
          <div className="pt-12 flex justify-center">
            <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl space-y-6">

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-black/40 border border-white/20 px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white"
              />

              <button
                onClick={startJob}
                disabled={loading}
                className="w-full rounded-xl bg-white px-6 py-3 text-base font-medium text-black hover:bg-gray-200 transition-all duration-200"
              >
                {loading ? "Starting…" : "Start transcription"}
              </button>

              {error && (
                <p className="text-red-400 text-sm text-center">
                  {error}
                </p>
              )}

              <p className="text-xs text-gray-400 text-center">
                No account required • Secure • Time-limited retention
              </p>

              <div className="flex justify-center">
                <span className="rounded-full border border-white/20 px-4 py-1.5 text-xs tracking-wide text-gray-400">
                  Private beta
                </span>
              </div>

            </div>
          </div>

        </section>

        {/* What */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <h2 className="text-4xl font-semibold">
            Accurate transcription, without compromise.
          </h2>

          <p className="text-gray-300 text-lg">
            Kreyai transforms audio and video into high-quality transcripts,
            with a focus on Haitian Creole and mixed-language speech. Our system
            is built to respect how people actually speak — including code-switching,
            accents, and conversational rhythm.
          </p>

          <p className="text-gray-300 text-lg">
            Whether handling interviews, meetings, podcasts, or sensitive recordings,
            Kreyai prioritizes fidelity over shortcuts.
          </p>
        </section>

        {/* Why */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <h2 className="text-4xl font-semibold">
            Built for real-world language.
          </h2>

          <ul className="space-y-4 text-gray-300 text-lg list-disc list-inside">
            <li>Faithful transcription — not paraphrasing</li>
            <li>Speaker-aware output for multi-speaker recordings</li>
            <li>Human-review–friendly by design</li>
            <li>No forced over-correction of meaning</li>
          </ul>
        </section>

        {/* Security */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <h2 className="text-4xl font-semibold">
            Security & responsibility.
          </h2>

          <p className="text-gray-300 text-lg">
            Kreyai is built with privacy and responsibility at its core.
          </p>

          <ul className="space-y-4 text-gray-300 text-lg list-disc list-inside">
            <li>Secure file handling</li>
            <li>Time-limited retention options</li>
            <li>Clear job identifiers for follow-up and support</li>
            <li>No use of customer content for model training</li>
          </ul>
        </section>

        {/* Closing */}
        <section className="text-center space-y-6 pt-20">
          <p className="text-2xl text-gray-300">
            A new standard for Creole-first language technology.
          </p>

          <p className="text-gray-500 italic text-lg">
            Accuracy is not optional. Language deserves care.
          </p>
        </section>

      </div>
    </main>
  );
}