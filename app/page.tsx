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
    <main className="relative min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-5%] right-[-5%] w-[60%] h-[40%] 
                        bg-gradient-to-br from-indigo-100/40 via-purple-50/30 to-transparent 
                        blur-[100px] rounded-full" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20 space-y-24">

        {/* --- BRAND HEADER --- */}
        <header className="flex items-center justify-between">
          <div className="group cursor-pointer">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-slate-950 flex items-center gap-1">
              Echo<span className="text-indigo-600">.</span>
            </h2>
            <div className="h-0.5 w-0 group-hover:w-full bg-indigo-600 transition-all duration-300" />
          </div>
        </header>

        {/* Hero Section */}
        <section className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] text-slate-950">
                Transcription <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  without compromise.
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                Accurate, speaker-aware transcripts for multilingual audio. 
                Built for professionals who need precision, not summaries.
              </p>
            </div>

            <div className="max-w-md">
              <div className="group relative flex items-center p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-500 transition-all duration-300">
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-3 outline-none text-slate-900 placeholder:text-slate-400"
                />
                <button
                  onClick={startJob}
                  disabled={loading}
                  className="rounded-xl bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? "..." : "Get Started"}
                </button>
              </div>
              
              {error && <p className="mt-3 text-red-500 text-sm font-medium ml-2">{error}</p>}
            </div>
          </div>

          {/* Transcript Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-10 blur-2xl rounded-3xl" />
            <div className="relative rounded-2xl border border-white/40 bg-white/80 backdrop-blur-xl p-8 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Speaker 1</span>
                  <span className="text-xs font-mono text-slate-400">00:00:04</span>
                </div>
                <p className="text-[15px] leading-relaxed text-slate-700 font-medium italic">
                  "We needed a transcript that preserved the original meaning."
                </p>
              </div>

              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Speaker 2</span>
                  <span className="text-xs font-mono text-slate-400">00:00:12</span>
                </div>
                <p className="text-[15px] leading-relaxed text-slate-700 font-medium italic">
                  "Exactly. Accuracy matters when language carries nuance."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="grid md:grid-cols-3 gap-12 border-t border-slate-100 pt-20">
          {[
            { title: "Faithful Transcription", desc: "No paraphrasing. Just the raw, human truth." },
            { title: "Speaker-Aware", desc: "Intelligent diarization for interviews and meetings." },
            { title: "Secure Files", desc: "Encrypted handling with time-limited data retention." }
          ].map((f, i) => (
            <div key={i} className="group cursor-default">
              <h3 className="text-lg font-bold text-slate-950 group-hover:text-indigo-600 transition-colors">{f.title}</h3>
              <p className="mt-2 text-slate-500 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}