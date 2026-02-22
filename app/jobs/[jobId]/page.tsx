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

  useEffect(() => {
    if (!token) {
      setError("Access token missing.");
      return;
    }

    let interval: NodeJS.Timeout;

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
          clearInterval(interval);
        }
      } catch (err: any) {
        setError(err.message);
        clearInterval(interval);
      }
    }

    fetchStatus();
    interval = setInterval(fetchStatus, 3000);

    return () => clearInterval(interval);
  }, [jobId, token]);

  if (error) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-white text-neutral-900 overflow-hidden">

      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl animate-pulse" />
      </div>

      <section className="relative mx-auto max-w-3xl px-6 pt-28 pb-32 space-y-12">

        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            Job {jobId}
          </h1>
          <p className="text-neutral-500 text-sm">
            Track your transcription progress below.
          </p>
        </div>

        {job ? (
          <div className="space-y-8">

            {/* Status */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-500">Status</span>
              <span className="capitalize font-medium">
                {job.status}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-neutral-500">
                <span>Progress</span>
                <span>{job.progress}%</span>
              </div>

              <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-neutral-900 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${job.progress}%` }}
                />
              </div>
            </div>

            {/* Completed */}
            {job.status?.toLowerCase() === "completed" && (
              <div className="space-y-6 pt-6">

                <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-6">
                  <p className="font-medium">
                    Your transcript is ready.
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Download your files below.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {["txt", "srt", "vtt", "docx"].map((ext) => (
                    <a
                      key={ext}
                      href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${jobId}/${ext}?t=${token}`}
                      className="rounded-xl border border-neutral-300 px-4 py-3 text-center text-sm font-medium hover:bg-neutral-100 transition"
                    >
                      Download {ext.toUpperCase()}
                    </a>
                  ))}
                </div>

                <p className="text-xs text-neutral-500">
                  Files are retained for 7 days.
                </p>

              </div>
            )}

            {/* Failed */}
            {job.status?.toLowerCase() === "failed" && (
              <div className="text-red-600 pt-6">
                Processing failed. Please upload again.
              </div>
            )}

          </div>
        ) : (
          <p className="text-neutral-500">Loading...</p>
        )}

      </section>
    </main>
  );
}