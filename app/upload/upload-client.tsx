"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function UploadClient() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("job");
  const token = searchParams.get("t");

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const canSubmit = file && jobId && token;

  async function handleUpload() {
    if (!file || !jobId || !token) return;

    setLoading(true);
    setError(null);

    try {
      const API = process.env.NEXT_PUBLIC_API_BASE_URL;

      if (!API) {
        throw new Error("API base URL not configured.");
      }

      // --------------------------------------------------
      // 1️⃣ Request signed resumable start URL
      // --------------------------------------------------
      const initRes = await fetch(
        `${API}/api/jobs/${jobId}/upload-url?filename=${encodeURIComponent(
          file.name
        )}&content_type=${encodeURIComponent(file.type)}`,
        {
          method: "POST",
          headers: {
            "X-Job-Token": token,
          },
        }
      );

      if (!initRes.ok) {
        const text = await initRes.text();
        throw new Error(`Failed to initialize upload: ${text}`);
      }

      const { signed_start_url } = await initRes.json();

      // --------------------------------------------------
      // 2️⃣ Start resumable session (MUST BE POST)
      // --------------------------------------------------
      const startRes = await fetch(signed_start_url, {
        method: "POST",
        headers: {
          "x-goog-resumable": "start",
          "Content-Type": file.type,
        },
      });

      if (!startRes.ok) {
        const text = await startRes.text();
        throw new Error(`Failed to start resumable upload: ${text}`);
      }

      const sessionUrl = startRes.headers.get("Location");

      if (!sessionUrl) {
        throw new Error("No resumable session URL returned.");
      }

      // --------------------------------------------------
      // 3️⃣ Upload file to session URL
      // --------------------------------------------------
      const uploadRes = await fetch(sessionUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) {
        const text = await uploadRes.text();
        throw new Error(`Upload failed: ${text}`);
      }

      // --------------------------------------------------
      // 4️⃣ Finalize upload & queue processing
      // --------------------------------------------------
      const finalizeRes = await fetch(
        `${API}/api/jobs/${jobId}/finalize-upload`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Job-Token": token,
          },
          body: JSON.stringify({
            file_path: `jobs/${jobId}/uploads/${file.name}`,
            size_bytes: file.size,
            content_type: file.type,
          }),
        }
      );

      if (!finalizeRes.ok) {
        const text = await finalizeRes.text();
        throw new Error(`Finalize failed: ${text}`);
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Unexpected error occurred.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-white px-6 py-24">
      <div className="mx-auto max-w-xl space-y-8">
        <h1 className="text-3xl font-semibold text-center">
          Upload Audio or Video
        </h1>

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
          className={`w-full rounded-md px-4 py-2 text-sm font-medium transition ${
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