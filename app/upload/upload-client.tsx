"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type UploadStage = "idle" | "preparing" | "uploading" | "finalizing" | "done";
type SpeakerMode = "single" | "multi" | "unsure";
const LONG_HT_MINUTES = 10;
const LONG_HT_SECONDS = LONG_HT_MINUTES * 60;

type BalanceResponse = {
  email: string;
  balance_minutes: number;
  total_purchased_minutes?: number;
  total_granted_minutes?: number;
  total_consumed_minutes?: number;
  total_refunded_minutes?: number;
};

export default function UploadClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("job");
  const token = searchParams.get("t");
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creditError, setCreditError] = useState<{
    message: string;
    required_minutes?: number;
    available_minutes?: number;
    missing_minutes?: number;
  } | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadStage, setUploadStage] = useState<UploadStage>("idle");
  const [speakerMode, setSpeakerMode] = useState<SpeakerMode>("single");
  const [speakerModeTouched, setSpeakerModeTouched] = useState(false);
  const [jobEmail, setJobEmail] = useState("");
  const [jobLanguage, setJobLanguage] = useState("");
  const [fileDurationSeconds, setFileDurationSeconds] = useState<number | null>(null);
  const [balance, setBalance] = useState<BalanceResponse | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(false);

  const canSubmit = file && jobId && token;

  useEffect(() => {
    if (!apiBase || !jobId || !token) {
      return;
    }

    let active = true;

    async function loadJobEmail() {
      const headers = new Headers();
      headers.set("X-Job-Token", token!);
      const res = await fetch(`${apiBase}/api/jobs/${jobId}`, {
        headers,
        cache: "no-store",
      });

      if (!res.ok) {
        return;
      }

      const data = (await res.json()) as { email?: string; language?: string; language_requested?: string; language_final?: string };
      if (active) {
        if (data.email) {
          setJobEmail(data.email);
        }
        const language = (data.language_final || data.language || data.language_requested || "").toLowerCase();
        setJobLanguage(language);
      }
    }

    void loadJobEmail();
    return () => {
      active = false;
    };
  }, [apiBase, jobId, token]);

  useEffect(() => {
    if (!file) {
      setFileDurationSeconds(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const media = document.createElement(file.type.startsWith("video/") ? "video" : "audio");
    media.preload = "metadata";

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
    };

    media.onloadedmetadata = () => {
      const duration = Number.isFinite(media.duration) ? media.duration : null;
      setFileDurationSeconds(duration);
      cleanup();
    };

    media.onerror = () => {
      setFileDurationSeconds(null);
      cleanup();
    };

    media.src = objectUrl;

    return () => {
      cleanup();
    };
  }, [file]);

  const isHtJob = jobLanguage === "ht";
  const isLongHt = isHtJob && typeof fileDurationSeconds === "number" && fileDurationSeconds >= LONG_HT_SECONDS;

  useEffect(() => {
    if (!isLongHt || speakerModeTouched) {
      return;
    }
    setSpeakerMode("single");
  }, [isLongHt, speakerModeTouched]);

  useEffect(() => {
    if (!apiBase || !jobEmail) {
      setBalance(null);
      return;
    }

    let active = true;

    async function loadBalance() {
      setLoadingBalance(true);
      try {
        const res = await fetch(`${apiBase}/api/billing/balance?email=${encodeURIComponent(jobEmail)}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Unable to load credit balance.");
        }
        const data = (await res.json()) as BalanceResponse;
        if (active) {
          setBalance(data);
        }
      } catch {
        if (active) {
          setBalance(null);
        }
      } finally {
        if (active) {
          setLoadingBalance(false);
        }
      }
    }

    void loadBalance();
    return () => {
      active = false;
    };
  }, [apiBase, jobEmail, creditError]);

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
    setCreditError(null);
    setSuccess(false);
    setUploadPercent(0);
    setUploadStage("preparing");

    try {
      if (!apiBase) {
        throw new Error("API base URL not configured.");
      }

      // --------------------------------------------------
      // 1️⃣ Request signed resumable start URL
      // --------------------------------------------------
      const initRes = await fetch(
        `${apiBase}/api/jobs/${jobId}/upload-url?filename=${encodeURIComponent(
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
        `${apiBase}/api/jobs/${jobId}/finalize-upload`,
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
        const payload = await finalizeRes.json().catch(() => null);
        if (finalizeRes.status === 402 && payload?.detail) {
          const detail = payload.detail;
          setCreditError({
            message: typeof detail?.message === "string" ? detail.message : "Insufficient credits for this upload.",
            required_minutes: detail?.required_minutes,
            available_minutes: detail?.available_minutes,
            missing_minutes: detail?.missing_minutes,
          });
          setUploadStage("idle");
          setLoading(false);
          return;
        }
        const detailText =
          typeof payload?.detail === "string"
            ? payload.detail
            : typeof payload?.detail?.message === "string"
              ? payload.detail.message
              : "Finalize failed.";
        throw new Error(`Finalize failed: ${detailText}`);
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="surface-panel rounded-2xl p-4">
              <p className="text-sm font-semibold text-[#13172b]">Account email</p>
              <p className="mt-2 break-all text-sm leading-6 text-[var(--brand-muted)]">
                {jobEmail || "Loading account email…"}
              </p>
            </div>
            <div className="surface-panel rounded-2xl p-4">
              <p className="text-sm font-semibold text-[#13172b]">Available balance</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-[#13172b]">
                {loadingBalance ? "…" : balance ? `${balance.balance_minutes} min` : "0 min"}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
                Credits for this email are checked before processing starts.
              </p>
            </div>
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
                  {typeof fileDurationSeconds === "number" ? (
                    <span className="block pt-1 text-xs text-[#717a99]">
                      Approx. duration: {(fileDurationSeconds / 60).toFixed(1)} min
                    </span>
                  ) : null}
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
                  Choose speaker labels for interviews, meetings, and conversations. For one-person recordings, a
                  simpler draft transcript is usually the best fit.
                </p>
                {isHtJob ? (
                  <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
                    Haitian Creole is currently in beta. It is billed at the standard credit rate and outputs should be
                    reviewed, especially for noisy, long, or code-switched audio.
                  </p>
                ) : null}
              </div>

              <div className="grid gap-3">
                {[
                  ["single", "One speaker", "Returns a draft transcript without speaker labels."],
                  [
                    "multi",
                    "More than one speaker",
                    isHtJob
                      ? "Adds speaker labels to make conversations easier to follow. Multi-speaker Haitian Creole is beta and may need extra review."
                      : "Adds speaker labels to make conversations easier to follow.",
                  ],
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
                      onChange={() => {
                        setSpeakerMode(value as SpeakerMode);
                        setSpeakerModeTouched(true);
                      }}
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

              {isLongHt ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  Long Haitian Creole detected. Default recommendation is <span className="font-medium">One speaker</span>.
                  {speakerMode === "multi" || speakerMode === "unsure" ? (
                    <span className="block mt-2">
                      Multi-speaker long-form Haitian Creole is in beta. It may be slower and should be reviewed more
                      carefully than the single-speaker path.
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {creditError && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900">
                <p className="font-medium">{creditError.message}</p>
                {typeof creditError.required_minutes === "number" ? (
                  <p className="mt-2 leading-6">
                    Required: {creditError.required_minutes} min. Available: {creditError.available_minutes ?? 0} min.
                  </p>
                ) : null}
                <div className="mt-3">
                  <Link
                    href={`/transcription/billing?job=${encodeURIComponent(jobId ?? "")}&t=${encodeURIComponent(token ?? "")}&email=${encodeURIComponent(jobEmail)}`}
                    className="font-medium underline underline-offset-4"
                  >
                    Buy credits and return to upload
                  </Link>
                </div>
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
