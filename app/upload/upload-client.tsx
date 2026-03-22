"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type UploadStage = "idle" | "preparing" | "uploading" | "finalizing" | "done";

export default function UploadClient() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("job");
  const token = searchParams.get("t");

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadStage, setUploadStage] = useState<UploadStage>("idle");

  const canSubmit = file && jobId && token;

  function getErrorMessage(err: unknown): string {
    if (err instanceof Error) {
      return err.message;
    }
    return "Unexpected error occurred.";
  }

  function uploadFileWithProgress(sessionUrl: string, selectedFile: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("PUT", sessionUrl);
      xhr.setRequestHeader("Content-Type", selectedFile.type || "application/octet-stream");

      xhr.upload.onprogress = (event) => {
        if (!event.lengthComputable) {
          return;
        }

        const percent = Math.min(100, Math.round((event.loaded / event.total) * 100));
        setUploadPercent(percent);
      };

      xhr.onerror = () => {
        reject(new Error("Upload failed due to a network error."));
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadPercent(100);
          resolve();
          return;
        }

        reject(new Error(`Upload failed: ${xhr.responseText || xhr.statusText}`));
      };

      xhr.send(selectedFile);
    });
  }

  async function handleUpload() {
    if (!file || !jobId || !token) return;

    setLoading(true);
    setError(null);
    setSuccess(false);
    setUploadPercent(0);
    setUploadStage("preparing");

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
      setUploadStage("uploading");
      await uploadFileWithProgress(sessionUrl, file);

      // --------------------------------------------------
      // 4️⃣ Finalize upload & queue processing
      // --------------------------------------------------
      setUploadStage("finalizing");
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

      setUploadStage("done");
      setSuccess(true);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
      setUploadStage("idle");
    }

    setLoading(false);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f2e8] px-6 py-20 text-neutral-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,rgba(255,248,216,0.9)_0%,rgba(247,242,232,0)_72%)]" />
        <div className="absolute -top-24 left-0 h-[420px] w-[420px] rounded-full bg-[#e7b56e]/20 blur-3xl" />
        <div className="absolute right-[-120px] top-24 h-[420px] w-[420px] rounded-full bg-[#84a98c]/16 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-5xl gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8a5a2b]">
            Secure Upload
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Upload your audio and start processing.
          </h1>
          <p className="max-w-xl text-base leading-7 text-neutral-600 md:text-lg">
            We keep the handoff simple: upload once, confirm the file, and we queue the job immediately.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Formats", "Audio and video files are accepted when supported by the upload flow."],
              ["Security", "Access stays tied to your signed job link."],
              ["Next step", "We start processing as soon as the upload finalizes."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-black/5 bg-white/80 p-4 shadow-[0_18px_50px_rgba(59,43,22,0.08)]">
                <p className="text-sm font-semibold text-neutral-900">{title}</p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-[#cdb892] bg-[linear-gradient(180deg,rgba(255,253,249,0.98)_0%,rgba(250,246,239,0.98)_100%)] p-6 shadow-[0_28px_90px_rgba(61,45,22,0.14)] md:p-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-neutral-500">Job reference</p>
              <p className="mt-1 break-all font-mono text-sm text-neutral-800">{jobId ?? "Missing job ID"}</p>
            </div>

            {!jobId || !token ? (
              <div className="rounded-2xl border border-[#d7c59e] bg-[#fff4de] px-4 py-4 text-sm leading-6 text-[#7a4c18]">
                This upload link is incomplete or expired. Return to the verification step and open the latest secure upload link again.
              </div>
            ) : null}

            <div className="rounded-2xl border border-dashed border-[#d8cab3] bg-white/70 p-5">
              <label className="block text-sm font-medium text-neutral-700">
                Choose file
              </label>
              <p className="mt-1 text-sm text-neutral-500">
                Select the recording you want transcribed. Keep the browser open until the upload finishes.
              </p>

              <input
                type="file"
                accept="audio/*,video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                disabled={loading || success || !jobId || !token}
                className="mt-4 block w-full text-sm text-neutral-700 file:mr-4 file:rounded-full file:border-0 file:bg-[#231f1b] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-black disabled:cursor-not-allowed disabled:opacity-70"
              />

              {file && (
                <div className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-neutral-600 shadow-sm">
                  Selected: <span className="font-medium text-neutral-900">{file.name}</span>
                  <span className="block pt-1 text-xs text-neutral-500">
                    {(file.size / (1024 * 1024)).toFixed(1)} MB
                  </span>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-black/5 bg-white/70 px-4 py-4 text-sm leading-6 text-neutral-600">
              Your upload is attached to this secure job link. Once processing starts, you can track status and download results from the same flow.
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
                Upload complete. Processing has started.
                {jobId && token && (
                  <div className="mt-3">
                    <Link
                      href={`/jobs/${jobId}?t=${encodeURIComponent(token)}`}
                      className="font-medium text-emerald-900 underline underline-offset-4"
                    >
                      View live job status
                    </Link>
                  </div>
                )}
              </div>
            )}

            {loading && (
              <div className="space-y-3 rounded-2xl border border-[#d7c59e] bg-[#fff4de] px-4 py-4 text-sm text-[#7a4c18]">
                <div className="flex items-center justify-between gap-4">
                  <span>
                    {uploadStage === "preparing" && "Preparing secure upload…"}
                    {uploadStage === "uploading" && "Uploading file…"}
                    {uploadStage === "finalizing" && "Finalizing and starting processing…"}
                    {uploadStage === "done" && "Upload complete."}
                  </span>
                  <span className="font-medium tabular-nums">
                    {uploadStage === "uploading" ? `${uploadPercent}%` : ""}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#e8d8b8]">
                  <div
                    className="h-full rounded-full bg-[#8a5a2b] transition-all duration-300"
                    style={{
                      width:
                        uploadStage === "preparing"
                          ? "12%"
                          : uploadStage === "uploading"
                            ? `${uploadPercent}%`
                            : uploadStage === "finalizing"
                              ? "96%"
                              : uploadStage === "done"
                                ? "100%"
                                : "0%",
                    }}
                />
                </div>

                <p className="text-xs leading-5 text-[#7a4c18]/90">
                  Large files can take longer to transfer and may take an extra moment before the job status page updates.
                </p>
              </div>
            )}

            <button
              disabled={!canSubmit || loading || success}
              onClick={handleUpload}
              className={`flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-3 text-sm font-medium transition ${
                canSubmit && !loading && !success
                  ? "bg-[#231f1b] text-white hover:bg-black"
                  : "cursor-not-allowed bg-neutral-200 text-neutral-500"
              }`}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Uploading secure file…
                </>
              ) : success ? (
                "Upload complete"
              ) : (
                "Upload and start processing"
              )}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
