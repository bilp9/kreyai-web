"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UploadClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const jobFromUrl = searchParams.get("job") || "";
  const token = searchParams.get("t") || "";

  const [jobId, setJobId] = useState(jobFromUrl);
  const [file, setFile] = useState<File | null>(null);

  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [pct, setPct] = useState<number>(0);

  useEffect(() => {
    setJobId(jobFromUrl);
  }, [jobFromUrl]);

  async function handleUpload() {
    if (!jobId || !file) {
      setMessage("Please select a file to upload.");
      return;
    }
    if (!token) {
      setMessage("Missing access token. Please verify again.");
      return;
    }

    setStatus("uploading");
    setMessage(null);
    setPct(0);

    try {
      // 1) Ask API for signed resumable session-start URL
      const metaRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${jobId}/upload-url?filename=${encodeURIComponent(
          file.name
        )}&content_type=${encodeURIComponent(file.type || "application/octet-stream")}`,
        {
          method: "POST",
          headers: {
            "X-Job-Token": token,
          },
        }
      );

      if (!metaRes.ok) {
        const data = await metaRes.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to create upload session.");
      }

      const meta = await metaRes.json();
      const signedStartUrl: string = meta.signed_start_url;
      const uploadPath: string = meta.upload_path;

      // 2) Start resumable session (POST with x-goog-resumable:start)
      const startRes = await fetch(signedStartUrl, {
        method: "POST",
        headers: {
          "x-goog-resumable": "start",
          "content-type": file.type || "application/octet-stream",
        },
      });

      if (!startRes.ok) {
        throw new Error("Failed to initiate resumable upload session.");
      }

      const sessionUrl = startRes.headers.get("location");
      if (!sessionUrl) {
        throw new Error("Missing resumable session URL (Location header).");
      }

      // 3) Upload in chunks with Content-Range
      const chunkSize = 8 * 1024 * 1024; // 8MB
      const total = file.size;

      let offset = 0;
      while (offset < total) {
        const end = Math.min(offset + chunkSize, total);
        const chunk = file.slice(offset, end);

        const putRes = await fetch(sessionUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type || "application/octet-stream",
            "Content-Range": `bytes ${offset}-${end - 1}/${total}`,
          },
          body: chunk,
        });

        // Resumable upload responses:
        // - 308 Resume Incomplete for intermediate chunks
        // - 200/201 for final chunk
        if (!(putRes.status === 308 || putRes.ok)) {
          throw new Error(`Chunk upload failed (HTTP ${putRes.status}).`);
        }

        offset = end;
        setPct(Math.round((offset / total) * 100));
      }

      // 4) Finalize upload with API (marks job QUEUED and dispatches worker)
      const finalizeRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${jobId}/finalize-upload?file_path=${encodeURIComponent(
          uploadPath
        )}&size_bytes=${encodeURIComponent(String(file.size))}&content_type=${encodeURIComponent(
          file.type || "application/octet-stream"
        )}`,
        {
          method: "POST",
          headers: { "X-Job-Token": token },
        }
      );

      if (!finalizeRes.ok) {
        const data = await finalizeRes.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to finalize upload.");
      }

      // 5) Go to job page (token already known)
      router.push(`/jobs/${jobId}?t=${encodeURIComponent(token)}`);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong.");
    }
  }

  return (
    <main className="min-h-screen bg-white text-black px-6 py-24">
      <div className="mx-auto max-w-xl space-y-8">
        <h1 className="text-3xl font-semibold text-center">Upload your file</h1>

        <div className="space-y-4">
          <input
            type="text"
            value={jobId}
            readOnly
            className="w-full rounded-lg bg-neutral-50 border border-neutral-200 px-4 py-3 font-mono text-sm"
          />

          <label className="block w-full border border-neutral-200 rounded-xl px-4 py-8 text-center cursor-pointer hover:border-neutral-300 transition bg-white">
            {file ? (
              <span className="text-emerald-700 font-medium">Selected: {file.name}</span>
            ) : (
              <span className="text-neutral-500">Click to choose an audio or video file</span>
            )}
            <input
              type="file"
              accept="audio/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>

          {status === "uploading" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-neutral-600">
                <span>Uploading…</span>
                <span>{pct}%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                <div className="bg-black h-2 rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || status === "uploading"}
          className={`w-full rounded-xl px-6 py-3 font-medium transition ${
            !file || status === "uploading"
              ? "bg-neutral-200 text-neutral-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-neutral-800"
          }`}
        >
          {status === "uploading" ? "Uploading…" : "Upload file"}
        </button>

        {message && <p className="text-red-600 text-sm text-center">{message}</p>}

        <p className="text-xs text-neutral-500 text-center">
          Uploads go directly to secure cloud storage. Retention: 7 days.
        </p>
      </div>
    </main>
  );
}