"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";

type JobStatus = {
  job_id: string;
  status: string;
  progress: number;
};

export default function JobPage() {
  const router = useRouter();
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

    async function fetchStatus() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${jobId}?t=${token}`
        );

        if (!res.ok) throw new Error("Access denied or job not found.");

        const data = await res.json();
        setJob(data);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, [jobId, token]);

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="mx-auto max-w-xl space-y-10">

        <h1 className="text-3xl font-semibold text-center">
          Job {jobId}
        </h1>

        {job ? (
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 space-y-6">

            {/* Status */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Status</span>
              <span className="font-medium text-white">{job.status}</span>
            </div>

            {/* Progress */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Progress</span>
              <span className="text-sm">{job.progress}%</span>
            </div>

            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-white h-3 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${job.progress}%` }}
              />
            </div>

            {/* Downloads */}
            {job.status === "COMPLETED" && (
              <div className="pt-6 space-y-3">

                {["txt", "srt", "vtt", "docx"].map((ext) => (
                  <a
                    key={ext}
                    href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${jobId}/${ext}?t=${token}`}
                    className="block rounded-lg bg-white text-black px-4 py-2 text-center hover:bg-gray-200 transition"
                  >
                    Download {ext.toUpperCase()}
                  </a>
                ))}

              </div>
            )}

          </div>
        ) : (
          <p className="text-gray-400 text-center">Loading...</p>
        )}

      </div>
    </main>
  );
}