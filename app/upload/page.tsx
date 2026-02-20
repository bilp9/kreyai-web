"use client";

import { useState } from "react";

type Stage = "email" | "verify" | "upload";

export default function UploadPage() {
  const [stage, setStage] = useState<Stage>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [jobId, setJobId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "uploaded"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function createJob() {
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/?email=${encodeURIComponent(
          email
        )}`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error("Failed to create job.");

      const data = await res.json();
      setJobId(data.job_id);
      setStage("verify");
      setStatus("idle");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  async function verifyJob() {
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verify?job_id=${jobId}&code=${code}`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error("Verification failed.");

      setStage("upload");
      setStatus("idle");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  async function uploadFile() {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${jobId}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed.");

      setStatus("uploaded");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <div className="bg-white border border-neutral-200 rounded-xl p-12 space-y-10">

          <h1 className="text-2xl font-semibold text-center">
            Secure transcription
          </h1>

          {stage === "email" && (
            <div className="space-y-6">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm"
              />
              <button
                onClick={createJob}
                className="w-full border border-black rounded-lg px-6 py-3 text-sm font-medium hover:bg-neutral-100"
              >
                Continue
              </button>
            </div>
          )}

          {stage === "verify" && (
            <div className="space-y-6">
              <p className="text-sm text-neutral-500 text-center">
                A verification code was sent to {email}.
              </p>
              <input
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm"
              />
              <button
                onClick={verifyJob}
                className="w-full border border-black rounded-lg px-6 py-3 text-sm font-medium hover:bg-neutral-100"
              >
                Verify
              </button>
            </div>
          )}

          {stage === "upload" && (
            <div className="space-y-6">
              <input
                type="file"
                accept="audio/*,video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full text-sm"
              />
              <button
                onClick={uploadFile}
                className="w-full border border-black rounded-lg px-6 py-3 text-sm font-medium hover:bg-neutral-100"
              >
                Upload file
              </button>
            </div>
          )}

          {status === "loading" && (
            <p className="text-sm text-neutral-500 text-center">
              Processing…
            </p>
          )}

          {status === "uploaded" && (
            <div className="border border-neutral-200 rounded-lg p-6 text-center">
              <p className="font-medium">
                File uploaded successfully.
              </p>
              <p className="text-sm text-neutral-500">
                Job ID: <span className="font-mono">{jobId}</span>
              </p>
            </div>
          )}

          {message && (
            <p className="text-sm text-red-500 text-center">
              {message}
            </p>
          )}

        </div>
      </div>
    </main>
  );
}