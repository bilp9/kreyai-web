// app/jobs/[jobId]/page.tsx

import { notFound } from "next/navigation";

type JobStatus = "processing" | "completed" | "failed" | "expired";

interface JobResponse {
  status: JobStatus;
  expires_at?: string;
  transcript_preview?: string;
  formats?: string[];
}

async function fetchJob(jobId: string, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${jobId}?t=${token}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function JobPage(props: any) {
  // 🔥 Next.js 16 requires awaiting these
  const params = await props.params;
  const searchParams = await props.searchParams;

  const jobId = params.jobId;
  const token = searchParams?.t;

  if (!token) return notFound();

  const job = await fetchJob(jobId, token);
  if (!job) return notFound();

  const isExpired = job.status === "expired";

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-neutral-200 px-8 py-4">
        <div className="max-w-6xl">
          <img src="/logo.svg" alt="KreyAI" className="h-10" />
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-3xl px-8 py-12 space-y-6">

        {/* Job Meta */}
        <div className="space-y-2">
          <p className="text-sm text-neutral-500">Job ID</p>
          <p className="text-base font-medium">{jobId}</p>

          <StatusBadge status={job.status} />

          {job.expires_at && !isExpired && (
            <p className="text-sm text-neutral-500 mt-2">
              Available until{" "}
              {new Date(job.expires_at).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* States */}
        {job.status === "processing" && (
          <p className="text-neutral-600">
            Your transcript is being generated.
          </p>
        )}

        {job.status === "failed" && (
          <p className="text-neutral-600">
            Processing failed. If this persists, contact support.
          </p>
        )}

        {job.status === "completed" && job.transcript_preview && (
          <>
            <TranscriptPreview text={job.transcript_preview} />
            <DownloadButtons
              jobId={jobId}
              token={token}
              formats={job.formats || []}
            />
          </>
        )}

        {isExpired && (
          <div>
            <p className="font-medium">Access expired.</p>
            <p className="text-neutral-600">
              This transcript is no longer available.
              Files are retained for 7 days after processing.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <span className="inline-block border border-black px-3 py-1 text-xs uppercase tracking-wide">
      {status}
    </span>
  );
}

function TranscriptPreview({ text }: { text: string }) {
  return (
    <div>
      <h2 className="text-sm uppercase tracking-wide text-neutral-500 mb-4">
        Transcript
      </h2>
      <div className="border border-neutral-200 rounded-lg p-6 whitespace-pre-wrap text-[15px] leading-relaxed">
        {text}
      </div>
    </div>
  );
}

function DownloadButtons({
  jobId,
  token,
  formats,
}: {
  jobId: string;
  token: string;
  formats: string[];
}) {
  return (
    <div>
      <h2 className="text-sm uppercase tracking-wide text-neutral-500 mb-4">
        Download
      </h2>

      <div className="flex gap-4 flex-wrap">
        {formats.map((format) => (
          <a
            key={format}
            href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${jobId}/${format}?t=${token}`}
            className="border border-black px-4 py-2 rounded-md text-sm hover:bg-neutral-100 transition"
          >
            {format.toUpperCase()}
          </a>
        ))}
      </div>

      <p className="text-xs text-neutral-500 mt-6">
        Files are retained for 7 days after processing.
      </p>
    </div>
  );
}