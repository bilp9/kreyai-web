export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">
          Kreyai
        </h1>

        <p className="text-xl text-gray-300">
          Secure transcription and language intelligence for Haitian Creole and beyond.
        </p>

        <p className="text-gray-400">
          Upload audio or video. Receive accurate, speaker-aware transcripts.
        </p>

        <div className="pt-6">
          <span className="inline-block rounded-full border border-gray-600 px-4 py-2 text-sm text-gray-300">
            Private beta — launching soon
          </span>
        </div>
      </div>
    </main>
  );
}
