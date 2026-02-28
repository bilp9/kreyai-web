"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("en");
  const [acceptedTerms, setAcceptedTerms] = useState(true); // ON by default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            language,
            accepted_terms: acceptedTerms,
          }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to create job.");
      }

      const data = await res.json();

      router.push(
        `/verify?job=${data.job_id}&email=${encodeURIComponent(email)}`
      );
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-white text-neutral-900 overflow-hidden">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl animate-pulse" />
        <div className="absolute top-10 right-[-150px] h-[500px] w-[500px] rounded-full bg-fuchsia-500/10 blur-3xl animate-pulse" />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 pt-28 pb-32">

        <div className="max-w-3xl space-y-8">

          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Precision transcription,{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              built for professionals.
            </span>
          </h1>

          <p className="text-xl text-neutral-600 leading-relaxed">
            Accurate multilingual transcripts with speaker structure and clean formatting.
            Designed for teams that require clarity, not approximation.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-4">

            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-[360px] rounded-xl border border-neutral-300 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />

            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full sm:w-[360px] rounded-xl border border-neutral-300 px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="ht">Haitian Creole</option>
            </select>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-3 text-sm text-neutral-600 max-w-md">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>
                I agree to the Terms of Service and acknowledge that my files will be
                processed securely and retained temporarily.
              </span>
            </label>

            <button
              onClick={startJob}
              disabled={loading}
              className="w-full sm:w-[360px] rounded-xl bg-neutral-900 px-6 py-3 text-white font-medium hover:bg-black transition disabled:opacity-60"
            >
              {loading ? "Starting…" : "Start transcription"}
            </button>

          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <p className="text-sm text-neutral-500 pt-2">
            No account required • Secure handling • Time-limited retention
          </p>

        </div>

        {/* Divider */}
        <div className="mt-24 h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

        {/* Features */}
        <div className="mt-20 grid gap-12 md:grid-cols-3">

          {[
            ["Faithful transcription", "No paraphrasing. Just what was said — clearly formatted."],
            ["Speaker aware", "Multi-speaker audio structured cleanly for readability."],
            ["Export ready", "TXT, DOCX, SRT, and VTT formats for professional workflows."],
          ].map(([title, desc]) => (
            <div key={title} className="space-y-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-neutral-600 leading-relaxed">{desc}</p>
            </div>
          ))}

        </div>

      </section>
    </main>
  );
}