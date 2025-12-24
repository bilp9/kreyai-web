"use client";

import { useState } from "react";

export default function VerifyPage() {
  const [jobId, setJobId] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setMessage(null);
    setSuccess(false);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/jobs/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_id: jobId.trim(),
          code: code.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Verification failed.");
      }

      setSuccess(true);
      setMessage("Email verified successfully. You may continue.");
    } catch (err: any) {
      setMessage(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="mx-auto max-w-md space-y-8">

        <h1 className="text-3xl font-semibold text-center">
          Verify your email
        </h1>

        <p className="text-gray-400 text-center">
          Enter the job ID and verification code sent to your email.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Job ID (e.g. KR-123456)"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="w-full rounded-md bg-gray-900 border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />

          <input
            type="text"
            placeholder="6-digit verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full rounded-md bg-gray-900 border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />

          <button
            onClick={handleVerify}
            disabled={loading || !jobId || !code}
            className="w-full rounded-md bg-white text-black py-3 font-medium hover:bg-gray-200 disabled:opacity-50"
          >
            {loading ? "Verifying…" : "Verify"}
          </button>
        </div>

        {message && (
          <div
            className={`text-center text-sm ${
              success ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        {success && (
          <div className="text-center text-gray-400 text-sm">
            You may now return to your upload page.
          </div>
        )}

      </div>
    </main>
  );
}
