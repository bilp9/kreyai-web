export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="mx-auto max-w-4xl space-y-20">

        {/* Hero */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Language, captured with precision.
          </h1>

          <p className="text-xl text-gray-300">
            Secure transcription and language intelligence for Haitian Creole and multilingual audio.
          </p>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Designed for professionals, researchers, and organizations that require accuracy,
            discretion, and clarity.
          </p>

          {/* Primary CTA */}
          <div className="pt-8 flex flex-col items-center gap-4">
            <a
              href="/upload"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-medium text-black hover:bg-gray-200 transition"
            >
              Upload audio or video
            </a>

            <p className="text-sm text-gray-400">
              No account required • Secure • Time-limited retention
            </p>

            <span className="mt-2 inline-block rounded-full border border-gray-600 px-4 py-1.5 text-xs text-gray-400">
              Private beta
            </span>
          </div>
        </section>

        {/* What */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">
            Accurate transcription, without compromise.
          </h2>

          <p className="text-gray-300">
            Kreyai transforms audio and video into high-quality transcripts, with a focus on Haitian
            Creole and mixed-language speech. Our system is built to respect how people actually speak —
            including code-switching, accents, and conversational rhythm.
          </p>

          <p className="text-gray-300">
            Whether you are handling interviews, meetings, podcasts, or sensitive recordings, Kreyai
            prioritizes fidelity over shortcuts.
          </p>
        </section>

        {/* Why */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">
            Built for real-world language.
          </h2>

          <ul className="space-y-3 text-gray-300 list-disc list-inside">
            <li>Faithful transcription — not paraphrasing</li>
            <li>Speaker-aware output for multi-speaker recordings</li>
            <li>Human-review–friendly by design</li>
            <li>No forced “over-correction” of meaning</li>
          </ul>
        </section>

        {/* Security */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">
            Security & responsibility.
          </h2>

          <p className="text-gray-300">
            Kreyai is built with privacy and responsibility at its core.
          </p>

          <ul className="space-y-3 text-gray-300 list-disc list-inside">
            <li>Secure file handling</li>
            <li>Time-limited retention options</li>
            <li>Clear job identifiers for follow-up and support</li>
            <li>No use of customer content for model training</li>
          </ul>
        </section>

        {/* Audience */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">
            Who it’s for.
          </h2>

          <p className="text-gray-300">
            Kreyai is built for language professionals, researchers, journalists, legal and academic
            teams, and creators working in multilingual environments.
          </p>

          <p className="text-gray-300">
            If accuracy matters more than speed, Kreyai is for you.
          </p>
        </section>

        {/* Closing */}
        <section className="text-center space-y-4 pt-12">
          <p className="text-xl text-gray-300">
            A new standard for Creole-first language technology.
          </p>

          <p className="text-gray-500 italic">
            Accuracy is not optional. Language deserves care.
          </p>
        </section>

      </div>
    </main>
  );
}
