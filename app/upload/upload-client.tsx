"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function UploadClient() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("job");

  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  async function startJob() {
    if (!email) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${API_BASE}/api/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to create job");

      setMessage("Check your email for verification link.");
    } catch (err: any) {
      setMessage(err.message);
    }

    setLoading(false);
  }

  async function uploadFile() {
    if (!file || !jobId) return;

    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `${API_BASE}/api/jobs/${jobId}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || "Upload failed");
      }

      setMessage("File uploaded successfully. Processing has started.");
      setFile(null);
    } catch (err: any) {
      setMessage(err.message);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-md px-6 py-20">
        <div className="bg-white border border-neutral-200 rounded-xl p-10 space-y-8">

          {!jobId ? (
            <>
              <h1 className="text-xl font-semibold text-center">
                Secure transcription
              </h1>

              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />

              <button
                onClick={startJob}
                disabled={!email || loading}
                className="w-full border border-black rounded-lg px-6 py-3 text-sm font-medium hover:bg-neutral-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Please wait…" : "Continue"}
              </button>
            </>
          ) : (
            <>
              <h1 className="text-xl font-semibold text-center">
                Upload your file
              </h1>

              <p className="text-sm text-neutral-500 text-center">
                Job ID: <strong>{jobId}</strong>
              </p>

              <input
                type="file"
                accept="audio/*,video/*"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) {
                    setFile(selected);
                    setMessage(null);
                  }
                }}
                className="w-full text-sm"
              />

              {file && (
                <p className="text-sm text-neutral-500 text-center">
                  Selected file: <strong>{file.name}</strong>
                </p>
              )}

              <button
                onClick={uploadFile}
                disabled={!file || loading}
                className="w-full border border-black rounded-lg px-6 py-3 text-sm font-medium hover:bg-neutral-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Uploading…" : "Upload file"}
              </button>
            </>
          )}

          {message && (
            <p className="text-sm text-center text-neutral-600">
              {message}
            </p>
          )}

        </div>
      </div>
    </main>
  );
}