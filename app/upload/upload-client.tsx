"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type UploadStage = "idle" | "preparing" | "uploading" | "finalizing" | "done";
type SpeakerMode = "single" | "multi" | "unsure";

export default function UploadClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("job");
  const token = searchParams.get("t");

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadStage, setUploadStage] = useState<UploadStage>("idle");
  const [speakerMode, setSpeakerMode] = useState<SpeakerMode>("single");

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
            speaker_mode: speakerMode,
          }),
        }
      );

      if (!finalizeRes.ok) {
        const text = await finalizeRes.text();
        throw new Error(`Finalize failed: ${text}`);
      }

      setUploadStage("done");
      setSuccess(true);
      router.push(`/jobs/${jobId}?t=${encodeURIComponent(token)}`);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
      setUploadStage("idle");
    }

    setLoading(false);
  }

  return (
    <main className="page-shell px-6 py-20 text-[#13172b]">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-6">
          <p className="page-eyebrow">
            Secure Upload
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Upload your audio and start processing.
          </h1>
          <p className="max-w-xl text-base leading-7 text-[var(--brand-muted)] md:text-lg">
            Upload your file, confirm your choices, and we will take it from there.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Formats", "Audio and video files are accepted when supported by the upload flow."],
              ["Access", "This page is linked to your request and upload."],
              ["Next step", "Processing starts as soon as your upload finishes."],
            ].map(([title, description]) => (
              <div key={title} className="surface-panel rounded-2xl p-4">
                <p className="text-sm font-semibold text-[#13172b]">{title}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="brand-panel rounded-[36px] border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-900/5 md:p-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-[#717a99]">Job reference</p>
              <p className="mt-1 break-all font-mono text-sm text-[#13172b]">{jobId ?? "Missing job ID"}</p>
            </div>

            {!jobId || !token ? (
              <div className="brand-note rounded-2xl px-4 py-4 text-sm leading-6">
                This upload link is incomplete or expired. Return to your email and open the latest link again.
              </div>
            ) : null}

            <div className="rounded-2xl border border-dashed border-[rgba(40,41,126,0.18)] bg-white/72 p-5">
              <label className="block text-sm font-semibold text-[#3d4564]">
                Choose file
              </label>
              <p className="mt-1 text-sm text-[#717a99]">
                Select the recording you want transcribed. Keep the browser open until the upload finishes.
              </p>

              <input
                type="file"
                accept="audio/*,video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                disabled={loading || success || !jobId || !token}
                className="mt-4 block w-full text-sm text-[#4f5879] file:mr-4 file:rounded-full file:border-0 file:bg-[#28297e] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#17195b] disabled:cursor-not-allowed disabled:opacity-70"
              />

              {file && (
                <div className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-[#59627f] shadow-sm">
                  Selected: <span className="font-medium text-[#13172b]">{file.name}</span>
                  <span className="block pt-1 text-xs text-[#717a99]">
                    {(file.size / (1024 * 1024)).toFixed(1)} MB
                  </span>
                </div>
              )}
            </div>

            <div className="surface-muted rounded-2xl px-4 py-4 text-sm leading-6 text-[var(--brand-muted)]">
              Once processing begins, you can follow progress and download your files from the same flow.
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <div>
                <p className="text-sm font-semibold text-[#13172b]">Speakers</p>
                <p className="mt-1 text-sm leading-6 text-[var(--brand-muted)]">
                  Choose speaker labels for interviews, meetings, and conversations. For one-person recordings, a clean
                  transcript is usually the best fit.
                </p>
              </div>

              <div className="grid gap-3">
                {[
                  ["single", "One speaker", "Returns a clean transcript without speaker labels."],
                  ["multi", "More than one speaker", "Adds speaker labels to make conversations easier to follow."],
                  ["unsure", "Not sure", "We will treat it like a conversation to help keep the result readable."],
                ].map(([value, label, description]) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  >
                    <input
                      type="radio"
                      name="speaker_mode"
                      value={value}
                      checked={speakerMode === value}
                      onChange={() => setSpeakerMode(value as SpeakerMode)}
                      disabled={loading || success || !jobId || !token}
                      className="mt-1 h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>
                      <span className="block font-medium text-[#13172b]">{label}</span>
                      <span className="mt-1 block text-[13px] leading-5 text-[var(--brand-muted)]">
                        {description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
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
              <div className="brand-note space-y-3 rounded-2xl px-4 py-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span>
                    {uploadStage === "preparing" && "Preparing upload…"}
                    {uploadStage === "uploading" && "Uploading file…"}
                    {uploadStage === "finalizing" && "Finalizing and starting processing…"}
                    {uploadStage === "done" && "Upload complete."}
                  </span>
                  <span className="font-medium tabular-nums">
                    {uploadStage === "uploading" ? `${uploadPercent}%` : ""}
                  </span>
                </div>

                <div className="brand-progress-track h-2 overflow-hidden rounded-full">
                  <div
                    className="brand-progress-fill h-full rounded-full transition-all duration-300"
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

                <p className="text-xs leading-5 text-[#17195b]/80">
                  Large files can take longer to transfer and may take an extra moment before the job status page updates.
                </p>
              </div>
            )}

            <button
              disabled={!canSubmit || loading || success}
              onClick={handleUpload}
              className={`flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-3 text-sm font-medium transition ${
                canSubmit && !loading && !success
                  ? "brand-button text-white"
                  : "cursor-not-allowed bg-neutral-200 text-neutral-500"
              }`}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Uploading file…
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
