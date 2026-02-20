"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UploadClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const jobFromUrl = searchParams.get("job");

  const [jobId, setJobId] = useState(jobFromUrl || "");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (jobFromUrl) {
      setJobId(jobFromUrl);
    }
  }, [jobFromUrl]);

  async function handleUpload() {
    if (!jobId || !file) {
      setMessage("Please select a file to upload.");
      return;
    }

    setStatus("uploading");
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

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Upload failed.");
      }

      const tokenRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${jobId}/access`,
        { method: "POST" }
      );

      if (!tokenRes.ok) {
        throw new Error("Failed to generate secure access link.");
      }

      const tokenData = await tokenRes.json();

      router.push(`/jobs/${jobId}?t=${tokenData.access_token}`);

    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong.");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="mx-auto max-w-xl space-y-10">

        <h1 className="text-3xl font-semibold text-center">
          Upload your file
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            value={jobId}
            readOnly
            className="w-full rounded bg-gray-900 border border-gray-700 px-4 py-3 text-white font-mono"
          />

          <label className="block w-full border border-gray-700 rounded-lg px-4 py-6 text-center cursor-pointer hover:border-gray-500 transition">
            {file ? (
              <span className="text-green-400">Selected: {file.name}</span>
            ) : (
              <span className="text-gray-400">
                Click to choose audio or video file
              </span>
            )}
            <input
              type="file"
              accept="audio/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || status === "uploading"}
          className={`w-full rounded-lg px-6 py-3 font-medium transition ${
            !file || status === "uploading"
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-200"
          }`}
        >
          {status === "uploading" ? "Uploading..." : "Upload file"}
        </button>

        {message && (
          <p className="text-red-400 text-sm text-center pt-4">
            {message}
          </p>
        )}

      </div>
    </main>
  );
}