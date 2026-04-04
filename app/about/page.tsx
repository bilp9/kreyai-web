import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how KreyAI approaches multilingual transcription, privacy, and transcript quality for real-world audio.",
  alternates: {
    canonical: "/about",
  },
};

const APPROACH_POINTS = [
  "clear paragraph structure",
  "optional speaker labeling",
  "support for multilingual and mixed-language audio",
  "export formats suited for subtitles and production workflows",
];

const PRIVACY_POINTS = [
  "Files are stored for up to 7 days to allow re-download, then automatically deleted.",
  "Content is never used to train models.",
  "Access is tied to secure, time-limited links.",
];

export default function AboutPage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">About</p>
          <h1 className="page-title">Built for how people actually speak.</h1>
          <p className="page-lede">
            KreyAI is a transcription platform designed to better reflect how language moves in real conversations.
          </p>
        </div>

        <div className="mt-14 grid gap-5">
          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">About Kreyai</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Kreyai is a transcription platform designed to better reflect how people actually speak.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Most audio is not delivered in a single, uniform language. Conversations move, overlap, and
              shift, especially in multilingual contexts. Kreyai is built to handle that reality with greater care,
              structure, and clarity.
            </p>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Our Approach</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Kreyai focuses on producing transcripts that are not only accurate, but usable.
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--brand-muted)]">
              {APPROACH_POINTS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--brand-blue)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-7 text-[var(--brand-muted)]">
              The goal is simple: output that feels considered, not raw.
            </p>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Privacy by Design</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              We take a minimal and respectful approach to user data.
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--brand-muted)]">
              {PRIVACY_POINTS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--brand-blue)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-7 text-[var(--brand-muted)]">
              Kreyai is built to process your data, not retain it.
            </p>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Why Kreyai Exists</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Language is nuanced. Transcription tools often overlook that nuance, especially when multiple languages are involved.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Kreyai is an attempt to move closer to how language is actually used, with a focus on clarity,
              structure, and real-world application.
            </p>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Built With Intention</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Kreyai is developed with input from real-world language experience across translation,
              interpretation, and multilingual communication.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              It is still evolving, and feedback plays an important role in shaping what comes next.
            </p>
          </section>
        </div>

        <div className="surface-panel mt-12 rounded-[30px] p-7">
          <h2 className="text-2xl font-semibold tracking-tight">Get in touch</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--brand-muted)]">
            If you have feedback or questions, feel free to reach out at{" "}
            <a className="font-medium text-[#13172b] underline decoration-[var(--brand-border)] underline-offset-4" href="mailto:hello@kreyai.com">
              hello@kreyai.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
