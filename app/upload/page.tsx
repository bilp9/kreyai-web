"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function UploadClient() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("job");

  const [language, setLanguage] = useState("en");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const canSubmit = file && jobId;

  async function handleUpload() {
    if (!file || !jobId) return;

    setLoading(true);
    setError(null);

    try {
      const API = process.env.NEXT_PUBLIC_API_BASE_URL;

      // 1️⃣ Get resumable upload URL
      const res = await fetch(
        `${API}/api/jobs/${jobId}/upload-url?filename=${encodeURIComponent(
          file.name
        )}&content_type=${encodeURIComponent(file.type)}`,
        { method: "POST" }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to initialize upload.");
      }

      const { upload_url } = await res.json();

      // 2️⃣ Upload file directly to GCS
      const uploadRes = await fetch(upload_url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("Upload failed.");
      }

      // 3️⃣ Trigger processing
      const processRes = await fetch(
        `${API}/api/jobs/${jobId}/process`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ language }),
        }
      );

      if (!processRes.ok) {
        throw new Error("Processing failed.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-white px-6 py-24">
      <div className="mx-auto max-w-xl space-y-8">

        <h1 className="text-3xl font-semibold text-center">
          Upload Audio or Video
        </h1>

        {/* Language Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            Language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="ht">Haitian Creole</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            File
          </label>

          <input
            type="file"
            accept="audio/*,video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-sm"
          />
        </div>

        {file && (
          <div className="text-sm text-neutral-600">
            Selected: {file.name}
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="text-sm text-green-600">
            Upload successful. Processing has started.
          </div>
        )}

        <button
          disabled={!canSubmit || loading}
          onClick={handleUpload}
          className={`w-full rounded-md px-4 py-2 text-sm font-medium transition
            ${
              canSubmit && !loading
                ? "bg-black text-white hover:bg-neutral-800"
                : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
            }`}
        >
          {loading ? "Uploading..." : "Upload & Start Processing"}
        </button>

      </div>
    </main>
  );
}