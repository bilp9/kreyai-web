import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About KreyAI Language Tools",
  description:
    "Learn how KreyAI supports Haitian Creole, multilingual transcription, Adwaz writing assistance, private workflows, and useful language outputs.",
  keywords: [
    "about KreyAI",
    "Haitian Creole transcription company",
    "underrepresented language transcription",
    "multilingual speech to text",
    "French speech to text",
    "Haitian Creole speech to text",
    "Spanish speech to text",
    "Portuguese speech to text",
    "transcription audio francais",
    "transkripsyon kreyol",
    "transcripcion de audio en espanol",
    "transcricao de audio em portugues",
    "private AI transcription",
    "Adwaz Haitian Creole writing assistant",
    "Haitian Creole writing tool",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About KreyAI Haitian Creole Language Tools",
    description:
      "KreyAI builds private language-aware tools for Haitian Creole, including transcription and Adwaz writing assistance.",
    url: "/about",
    alternateLocale: ["fr_FR", "ht_HT", "es_ES", "pt_PT"],
  },
  other: {
    "content-language": "en, fr, ht, es, pt",
    "target-languages": "French, Haitian Creole, Spanish, Portuguese",
  },
};

const PRODUCT_POINTS = [
  "KreyAI transcription for audio, subtitles, speaker labels, and transcript exports",
  "Adwaz private beta for Haitian Creole writing review, spelling, grammar, and orthography",
  "A shared privacy posture: process the work, avoid unnecessary retention, and never use customer content for model training",
];

const APPROACH_POINTS = [
  "clear paragraph structure",
  "optional speaker labeling",
  "support for multilingual and mixed-language audio",
  "export formats suited for subtitles and production workflows",
];

const PRIVACY_POINTS = [
  "Files are stored in active storage for up to 7 days to allow re-download, then scheduled for automatic deletion.",
  "Audio and transcripts are never used to train AI models.",
  "The email-based workflow avoids traditional account creation and reduces unnecessary personal data collection.",
];

export default function AboutPage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">About</p>
          <h1 className="page-title">Language tools for every voice.</h1>
          <p className="page-lede">
            KreyAI was founded to bridge the gap in language technology for Haitian Creole, underrepresented
            languages, and real-world multilingual communication.
          </p>
        </div>

        <div className="mt-14 grid gap-5">
          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">About KreyAI</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              KreyAI is a language technology company building practical tools for Haitian Creole and multilingual
              work. The first product is transcription for audio, subtitles, and speaker-labeled transcripts. Adwaz is
              the private-beta writing assistant for Haitian Creole.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Most services struggle when language moves outside a narrow mainstream pattern. We build KreyAI products
              to preserve meaning, structure, and cultural context for journalists, legal professionals, researchers,
              educators, creators, interpreters, translators, and community organizations.
            </p>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Product Family</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--brand-muted)]">
              {PRODUCT_POINTS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--brand-blue)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Our Approach</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              KreyAI focuses on producing language output that is not only accurate, but usable.
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
              Your data is a guest, not a product. We take a minimal and respectful approach to user data because
              sensitive audio deserves careful handling by default.
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
              KreyAI is built to process your data, not retain it.
            </p>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Why KreyAI Exists</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Language is nuanced. Transcription tools often overlook that nuance, especially when multiple languages are involved.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              KreyAI is an attempt to move closer to how language is actually used, with a focus on clarity,
              structure, and real-world application.
            </p>
          </section>

          <section className="surface-panel rounded-[28px] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Built With Intention</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              KreyAI is developed with input from real-world language experience across translation,
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
