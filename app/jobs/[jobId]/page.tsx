"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

type JobStatus = {
  job_id: string;
  status: string;
  progress: number;
  status_message?: string;
  attempts?: number;
  completed_at?: string;
  files_deleted_at?: string;
};

export default function JobPage() {
  const { jobId } = useParams() as { jobId: string };
  const searchParams = useSearchParams();
  const token = searchParams.get("t");

  const [job, setJob] = useState<JobStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const statusText: Record<string, string> = {
    pending_verification: "Waiting for email verification.",
    verified: "Verified and ready for upload.",
    queued: "Your file has been uploaded successfully. Processing will begin shortly.",
    processing: "Processing is underway.",
    completed: "Your transcript is ready to download.",
    failed: "Processing did not complete successfully.",
    customer_deleted: "Files were deleted from active storage at your request.",
  };

  function getErrorMessage(err: unknown): string {
    if (err instanceof Error) {
      return err.message;
    }
    return "Unable to load job status.";
  }

  useEffect(() => {
    if (!token) {
      setError("This page link is incomplete.");
      return;
    }

    async function fetchStatus() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${jobId}?t=${token}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Access denied or job not found.");

        const data = await res.json();
        setJob(data);

        if (
          data.status?.toLowerCase() === "completed" ||
          data.status?.toLowerCase() === "failed"
        ) {
          clearInterval(intervalId);
        }
      } catch (err: unknown) {
        setError(getErrorMessage(err));
        clearInterval(intervalId);
      }
    }

    void fetchStatus();
    const intervalId = setInterval(() => {
      void fetchStatus();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [jobId, token]);

  async function handleDeleteFiles() {
    if (!token || !job) return;

    const confirmed = window.confirm(
      "Deleting these files will stop all downloads immediately. If you need them again, you will have to submit a new request."
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setDeleteMessage(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${jobId}/delete-files?t=${token}`,
        { method: "POST" }
      );
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(typeof data?.detail === "string" ? data.detail : "Unable to delete files.");
      }

      setJob((current) =>
        current
          ? {
              ...current,
              status: "customer_deleted",
              status_message:
                "Files were deleted from active storage at your request. Download links no longer work. If you need them again, please submit a new request.",
              files_deleted_at: data?.files_deleted_at,
            }
          : current
      );
      setDeleteMessage(
        "Files deleted. Download links no longer work, and a new request is required if you need the files again."
      );
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  }

  if (error) {
    return (
      <main className="page-shell flex min-h-screen items-center justify-center">
        <p className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600">
          {error}
        </p>
      </main>
    );
  }

  return (
    <main className="page-shell text-[#13172b]">
      <section className="mx-auto max-w-4xl space-y-12 px-6 pb-32 pt-24">
        <div className="space-y-3">
          <p className="page-eyebrow">Job Status</p>
          <h1 className="break-all text-4xl font-bold tracking-tight">
            Job {jobId}
          </h1>
          <p className="text-sm text-[#717a99]">
            Follow your progress here. This page updates automatically while your job is running.
          </p>
        </div>

        {job ? (
          <div className="brand-panel space-y-8 rounded-[36px] border border-slate-200 bg-white p-8 shadow-xl shadow-indigo-900/5">

            <div className="flex justify-between items-center">
              <span className="text-sm text-[#717a99]">Status</span>
              <span className="break-all text-right capitalize font-medium">
                {job.status}
              </span>
            </div>

            <div className="surface-muted rounded-2xl px-4 py-4 text-sm text-[var(--brand-muted)]">
              {job.status_message || statusText[job.status?.toLowerCase()] || "Checking your latest job status."}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm text-[#717a99]">
                <span>Progress</span>
                <span>{job.progress}%</span>
              </div>

              <div className="brand-progress-track w-full h-3 overflow-hidden rounded-full">
                <div
                  className="brand-progress-fill h-3 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${job.progress}%` }}
                />
              </div>
            </div>

            {(job.status?.toLowerCase() === "completed" || job.status?.toLowerCase() === "customer_deleted") && (
              <div className="space-y-6 pt-6">

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                  <p className="font-medium">
                    Your transcript is ready.
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Download your files below.
                  </p>
                </div>

                {!job.files_deleted_at ? (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {["txt", "srt", "vtt", "docx", "html"].map((ext) => (
                        <a
                          key={ext}
                          href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${jobId}/${ext}?t=${token}`}
                          className="rounded-xl border border-[rgba(40,41,126,0.14)] bg-white px-4 py-3 text-center text-sm font-medium text-[#28297e] transition hover:bg-[#eef1ff]"
                        >
                          Download {ext.toUpperCase()}
                        </a>
                      ))}
                    </div>

                    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
                      <p className="font-medium">Want your files deleted sooner?</p>
                      <p className="mt-1 leading-6">
                        If you delete them now, all download links will stop working immediately. If you need the files
                        again, you will have to submit a new request.
                      </p>
                      <button
                        type="button"
                        onClick={() => void handleDeleteFiles()}
                        disabled={deleting}
                        className="mt-4 rounded-xl border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-900 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deleting ? "Deleting…" : "Delete my files now"}
                      </button>
                    </div>

                    <p className="text-xs text-[#717a99]">
                      Download links expire after 7 days.
                    </p>
                  </>
                ) : (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-900">
                    <p className="font-medium">Files deleted</p>
                    <p className="mt-1 text-sm leading-6">
                      These files were removed from active storage at your request. Downloads no longer work. If you
                      need them again, please submit a new request.
                    </p>
                  </div>
                )}

                {deleteMessage ? (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
                    {deleteMessage}
                  </div>
                ) : null}

              </div>
            )}

            {job.status?.toLowerCase() === "failed" && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600">
                Processing failed. Please upload again.
              </div>
            )}

          </div>
        ) : (
          <div className="brand-panel rounded-[36px] border border-slate-200 bg-white p-8 shadow-xl shadow-indigo-900/5">
            <p className="text-[#717a99]">Loading...</p>
          </div>
        )}
      </section>
    </main>
  );
}
