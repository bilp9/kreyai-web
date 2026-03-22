"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyClient() {
  const router = useRouter();
  const params = useSearchParams();

  const jobId = params.get("job");
  const email = params.get("email");
  const codeFromUrl = params.get("code");

  const [code, setCode] = useState(codeFromUrl || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoVerifying, setAutoVerifying] = useState(false);

  function getErrorMessage(err: unknown): string {
    if (err instanceof Error) {
      return err.message;
    }
    return "Verification failed.";
  }

  const verify = useCallback(async (verificationCode?: string) => {
    if (!jobId) return;

    const finalCode = verificationCode || code;
    if (!finalCode) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verify?job_id=${jobId}&code=${finalCode}`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error("Verification failed.");

      const data = await res.json();
      const t = data.access_token;
      router.push(`/upload?job=${jobId}&t=${encodeURIComponent(t)}`);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
      setLoading(false);
      setAutoVerifying(false);
    }
  }, [code, jobId, router]);

  useEffect(() => {
    if (jobId && codeFromUrl) {
      setAutoVerifying(true);
      void verify(codeFromUrl);
    }
  }, [codeFromUrl, jobId, verify]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f2e8]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,rgba(255,248,216,0.9)_0%,rgba(247,242,232,0)_72%)]" />
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#e7b56e]/18 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-md px-6 py-20">
        <div className="space-y-6 rounded-[32px] border border-[#cdb892] bg-[linear-gradient(180deg,rgba(255,253,249,0.98)_0%,rgba(250,246,239,0.98)_100%)] p-10 shadow-[0_28px_90px_rgba(61,45,22,0.14)]">
          <div className="space-y-3 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8a5a2b]">
              Verify Access
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Confirm your email and continue.
            </h1>
            {email && (
              <p className="text-sm text-neutral-500">
                Verification for {email}
              </p>
            )}
            <p className="text-sm leading-6 text-neutral-500">
              Use the code from your email, or continue automatically if you opened the secure verification link.
            </p>
          </div>

          {!jobId && (
            <div className="rounded-2xl border border-[#d7c59e] bg-[#fff4de] px-4 py-4 text-center text-sm text-[#7a4c18]">
              This verification link is missing its job reference. Return to the original email and open the latest link.
            </div>
          )}

          {autoVerifying && (
            <div className="rounded-2xl border border-[#d7c59e] bg-[#fff4de] px-4 py-4 text-center text-sm text-[#7a4c18]">
              Checking your secure verification link…
            </div>
          )}

          {!autoVerifying && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  Verification code
                </label>
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={loading || !jobId}
                  className="w-full rounded-2xl border border-[#d8cab3] bg-white px-4 py-3 text-sm tracking-[0.25em] focus:outline-none focus:ring-2 focus:ring-[#c7772a]/20 disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>

              <button
                onClick={() => {
                  void verify();
                }}
                disabled={loading || !jobId || !code.trim()}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#231f1b] px-6 py-3 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Verifying secure access…
                  </>
                ) : (
                  "Verify and continue"
                )}
              </button>

              <p className="text-center text-xs leading-6 text-neutral-500">
                If the email is slow to arrive, wait a moment and check your spam or promotions folder.
              </p>
            </>
          )}

          {error && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-center text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
