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
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-400 text-lg">{error}</p>
      </main>
    );
  }

  const isCompleted = job?.status?.toLowerCase() === "completed";
  const isFailed = job?.status?.toLowerCase() === "failed";

  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-32 overflow-hidden">

      {/* Floating Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        {/* Base ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-[700px] h-[700px] 
                     bg-white/5 
                     rounded-full 
                     blur-3xl 
                     transition-all duration-1000 ease-out"
        />

        {/* Expanded glow when completed */}
        {isCompleted && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                       w-[1100px] h-[1100px] 
                       bg-white/10 
                       rounded-full 
                       blur-3xl 
                       transition-all duration-1000 ease-out"
          />
        )}
      </div>

      <div className="mx-auto max-w-2xl space-y-14 text-center">

        {/* Success Header */}
        {isCompleted && (
          <div className="space-y-6">

            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm shadow-xl">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight">
              Transcription Complete
            </h1>

            <p className="text-gray-400 text-sm">
              Job {jobId}
            </p>
          </div>
        )}

        {!isCompleted && (
          <h1 className="text-3xl font-semibold tracking-tight">
            Job {jobId}
          </h1>
        )}

        {/* Status Card */}
        {job && (
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-2xl space-y-10 text-left">

            {/* Status & Progress */}
            <div className="space-y-6">

              <div className="flex justify-between text-sm text-gray-400">
                <span>Status</span>
                <span className="capitalize text-white font-medium">
                  {job.status}
                </span>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${job.progress}%` }}
                />
              </div>

              <div className="text-right text-xs text-gray-500">
                {job.progress}% complete
              </div>

            </div>

            {/* Downloads */}
            {isCompleted && (
              <div className="space-y-8 pt-4 text-center">

                {/* Primary Download */}
                <a
                  href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${jobId}/txt?t=${token}`}
                  className="block w-full rounded-xl bg-white text-black px-6 py-4 text-center font-medium hover:bg-gray-200 transition-all duration-200"
                >
                  Download Transcript
                </a>

                {/* Secondary Formats */}
                <div className="grid grid-cols-2 gap-4">
                  {["docx", "srt", "vtt"].map((ext) => (
                    <a
                      key={ext}
                      href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${jobId}/${ext}?t=${token}`}
                      className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-3 text-center hover:bg-white/10 transition-all duration-200"
                    >
                      {ext.toUpperCase()}
                    </a>
                  ))}
                </div>

                <p className="text-xs text-gray-500">
                  Files are retained for 7 days.
                </p>

              </div>
            )}

            {isFailed && (
              <div className="pt-6 text-center text-red-400 text-sm">
                Processing failed. Please upload again.
              </div>
            )}

          </div>
        )}

        {!job && (
          <p className="text-gray-400 text-center text-lg">Loading...</p>
        )}

      </div>
    </main>
  );
}