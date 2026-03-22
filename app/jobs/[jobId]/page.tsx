"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

type JobStatus = {
  job_id: string;
  status: string;
  progress: number;
  attempts?: number;
  completed_at?: string;
};

export default function JobPage() {
  const { jobId } = useParams() as { jobId: string };
  const searchParams = useSearchParams();
  const token = searchParams.get("t");

  const [job, setJob] = useState<JobStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const statusText: Record<string, string> = {
    pending_verification: "Waiting for email verification.",
    verified: "Verified and ready for upload.",
    queued: "Upload received. Waiting to start processing.",
    processing: "Processing is underway.",
    completed: "Your transcript is ready to download.",
    failed: "Processing did not complete successfully.",
  };

  function getErrorMessage(err: unknown): string {
    if (err instanceof Error) {
      return err.message;
    }
    return "Unable to load job status.";
  }

  useEffect(() => {
    if (!token) {
      setError("Access token missing.");
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
    }, 3000);

    return () => clearInterval(intervalId);
  }, [jobId, token]);

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f2e8]">
        <p className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600">
          {error}
        </p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f2e8] text-neutral-900">

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,rgba(255,248,216,0.9)_0%,rgba(247,242,232,0)_72%)]" />
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[#84a98c]/16 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-3xl px-6 pt-28 pb-32 space-y-12">

        <div className="space-y-3">
          <h1 className="break-all text-4xl font-semibold tracking-tight">
            Job {jobId}
          </h1>
          <p className="text-neutral-500 text-sm">
            Track your transcription progress below. This page refreshes automatically while your job is active.
          </p>
        </div>

        {job ? (
          <div className="space-y-8 rounded-[32px] border border-[#cdb892] bg-[linear-gradient(180deg,rgba(255,253,249,0.98)_0%,rgba(250,246,239,0.98)_100%)] p-8 shadow-[0_28px_90px_rgba(61,45,22,0.14)]">

            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-500">Status</span>
              <span className="break-all text-right capitalize font-medium">
                {job.status}
              </span>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white/70 px-4 py-4 text-sm text-neutral-700">
              {statusText[job.status?.toLowerCase()] ?? "Checking your latest job status."}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm text-neutral-500">
                <span>Progress</span>
                <span>{job.progress}%</span>
              </div>

              <div className="w-full h-3 overflow-hidden rounded-full bg-[#e8d8b8]">
                <div
                  className="h-3 rounded-full bg-[#8a5a2b] transition-all duration-700 ease-out"
                  style={{ width: `${job.progress}%` }}
                />
              </div>
            </div>

            {job.status?.toLowerCase() === "completed" && (
              <div className="space-y-6 pt-6">

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                  <p className="font-medium">
                    Your transcript is ready.
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Download your files below.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {["txt", "srt", "vtt", "docx", "html"].map((ext) => (
                    <a
                      key={ext}
                      href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${jobId}/${ext}?t=${token}`}
                      className="rounded-xl border border-[#d8cab3] bg-white px-4 py-3 text-center text-sm font-medium transition hover:bg-[#f8f4ec]"
                    >
                      Download {ext.toUpperCase()}
                    </a>
                  ))}
                </div>

                <p className="text-xs text-neutral-500">
                  Files are typically retained for 7 days from completion.
                </p>

              </div>
            )}

            {job.status?.toLowerCase() === "failed" && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600">
                Processing failed. Please upload again.
              </div>
            )}

          </div>
        ) : (
          <div className="rounded-[32px] border border-[#cdb892] bg-[linear-gradient(180deg,rgba(255,253,249,0.98)_0%,rgba(250,246,239,0.98)_100%)] p-8 shadow-[0_28px_90px_rgba(61,45,22,0.14)]">
            <p className="text-neutral-500">Loading...</p>
          </div>
        )}

      </section>
    </main>
  );
}
