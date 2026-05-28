"use client";

import { useState } from "react";

export default function RecoverJobPage() {
  const [jobId, setJobId] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${encodeURIComponent(jobId.trim())}/resend-access`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      );

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(typeof data?.detail === "string" ? data.detail : "Unable to resend your job link.");
      }

      setMessage(typeof data?.message === "string" ? data.message : "A fresh job link was sent to your email.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to resend your job link.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="page-shell text-[#13172b]">
      <section className="mx-auto max-w-2xl space-y-8 px-6 pb-28 pt-24">
        <div className="space-y-3">
          <p className="page-eyebrow">Recover Job</p>
          <h1 className="text-4xl font-bold tracking-tight">Get your job page link back</h1>
          <p className="text-sm text-[#717a99]">
            Enter your job ID and the same email address used for the order. We&apos;ll send you a fresh link to reopen the job page.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="brand-panel space-y-5 rounded-[36px] border border-slate-200 bg-white p-8 shadow-xl shadow-indigo-900/5"
        >
          <label className="block space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Job ID</span>
            <input
              value={jobId}
              onChange={(event) => setJobId(event.target.value)}
              placeholder="KR-123ABC"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#101426] outline-none transition focus:border-[#5b62d6]"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#101426] outline-none transition focus:border-[#5b62d6]"
            />
          </label>

          <button
            type="submit"
            disabled={busy}
            className="rounded-2xl bg-[#28297e] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(40,41,126,0.16)] transition hover:bg-[#17195b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Sending…" : "Email me a fresh job link"}
          </button>
        </form>

        {message ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
            {message}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
            {error}
          </div>
        ) : null}
      </section>
    </main>
  );
}
