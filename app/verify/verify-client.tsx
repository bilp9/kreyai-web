"use client";

import { useState, useEffect } from "react";
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

  async function verify(verificationCode?: string) {
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
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      setAutoVerifying(false);
    }
  }

  useEffect(() => {
    if (jobId && codeFromUrl) {
      setAutoVerifying(true);
      verify(codeFromUrl);
    }
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-md px-6 py-20">
        <div className="bg-white border border-neutral-200 rounded-xl p-10 space-y-8">

          <h1 className="text-xl font-semibold text-center">
            Verify your email
          </h1>

          {email && (
            <p className="text-sm text-neutral-500 text-center">
              Verification for {email}
            </p>
          )}

          {autoVerifying && (
            <p className="text-sm text-neutral-500 text-center">
              Verifying…
            </p>
          )}

          {!autoVerifying && (
            <>
              <input
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />

              <button
                onClick={() => verify()}
                disabled={loading}
                className="w-full border border-black rounded-lg px-6 py-3 text-sm font-medium hover:bg-neutral-100 transition"
              >
                {loading ? "Verifying…" : "Verify"}
              </button>
            </>
          )}

          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

        </div>
      </div>
    </main>
  );
}