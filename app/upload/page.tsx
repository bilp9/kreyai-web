export default function Upload() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="mx-auto max-w-3xl space-y-16">

        {/* Header */}
        <section className="space-y-4">
          <h1 className="text-4xl font-semibold">
            Upload your audio or video
          </h1>

          <p className="text-gray-300">
            Secure transcription for Haitian Creole and multilingual speech.
            Built for accuracy, context, and professional use.
          </p>
        </section>

        {/* Flow */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">
            What happens next
          </h2>

          <ol className="space-y-4 text-gray-300 list-decimal list-inside">
            <li>
              You upload an audio or video file.
            </li>
            <li>
              The file is securely processed and transcribed.
            </li>
            <li>
              You receive a downloadable transcript.
            </li>
            <li>
              Files are retained for up to <strong>7 days</strong> for support purposes,
              then automatically deleted.
            </li>
          </ol>
        </section>

        {/* Retention */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Data retention & privacy
          </h2>

          <p className="text-gray-300">
            To support delivery verification and limited follow-up requests,
            uploaded files and transcripts are retained for up to <strong>7 days</strong>.
          </p>

          <p className="text-gray-300">
            After that period, all files are permanently deleted.
            Kreyai does not use customer content for model training.
          </p>
        </section>

        {/* Accounts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Guest or account
          </h2>

          <p className="text-gray-300">
            You may upload and receive a transcript without creating an account.
          </p>

          <p className="text-gray-300">
            Accounts (coming later) will offer faster checkout,
            job history, and follow-up convenience.
          </p>
        </section>

        {/* Formats */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Supported formats
          </h2>

          <p className="text-gray-300">
            Common audio and video formats are supported, including:
          </p>

          <p className="text-gray-400">
            MP3, WAV, M4A, MP4, MOV
          </p>
        </section>

        {/* CTA placeholder */}
        <section className="pt-6 space-y-3">
          <div className="rounded-lg border border-gray-700 px-6 py-4 text-gray-400">
            Upload functionality will be available here.
          </div>

          <p className="text-sm text-gray-500">
            Save your Job ID for follow-up within the 7-day retention window.
          </p>
        </section>

      </div>
    </main>
  );
}
