"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const VERIFICATION_WINDOW_MINUTES = 15;

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
    <main className="page-shell">
      <div className="mx-auto max-w-md px-6 py-20">
        <div className="brand-panel space-y-6 rounded-[36px] border border-slate-200 bg-white p-10 shadow-xl shadow-indigo-900/5">
          <div className="space-y-3 text-center">
            <p className="page-eyebrow">
              Verify Access
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-[#101426]">
              Confirm your email and continue.
            </h1>
            {email && (
              <p className="text-sm text-[#717a99]">
                Verification for {email}
              </p>
            )}
            <p className="text-sm leading-6 text-[var(--brand-muted)]">
              Use the code from your email, or continue automatically if you opened the link from your message.
            </p>
            <p className="text-xs leading-6 text-[#717a99]">
              Your verification code is valid for {VERIFICATION_WINDOW_MINUTES} minutes.
            </p>
          </div>

          {!jobId && (
            <div className="brand-note rounded-2xl px-4 py-4 text-center text-sm">
              This verification link is incomplete. Return to your email and open the latest link.
            </div>
          )}

          {autoVerifying && (
            <div className="brand-note rounded-2xl px-4 py-4 text-center text-sm">
              Checking your link…
            </div>
          )}

          {!autoVerifying && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3d4564]">
                  Verification code
                </label>
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={loading || !jobId}
                  className="brand-input w-full rounded-2xl border-slate-200 px-4 py-3 text-sm tracking-[0.25em] disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>

              <button
                onClick={() => {
                  void verify();
                }}
                disabled={loading || !jobId || !code.trim()}
                className="brand-button flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-3.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Verifying…
                  </>
                ) : (
                  "Verify and continue"
                )}
              </button>

              <p className="text-center text-xs leading-6 text-[#717a99]">
                If the email is slow to arrive, wait a moment and check your spam or promotions folder. The code expires after {VERIFICATION_WINDOW_MINUTES} minutes.
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
