import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haitian Creole Transcription FAQ",
  description:
    "Read common questions about KreyAI transcription, Adwaz Haitian Creole writing assistance, multilingual accuracy, credits, file privacy, and subtitle exports.",
  keywords: [
    "Haitian Creole transcription FAQ",
    "KreyAI FAQ",
    "transcription privacy",
    "speaker labels",
    "subtitle export formats",
    "mobile audio transcription",
    "French transcription FAQ",
    "Haitian Creole transcription FAQ",
    "Spanish transcription FAQ",
    "Portuguese transcription FAQ",
    "transkripsyon kreyol FAQ",
    "transcription audio francais FAQ",
    "transcripcion de audio en espanol FAQ",
    "transcricao de audio em portugues FAQ",
    "Adwaz FAQ",
    "Haitian Creole writing assistant FAQ",
  ],
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "KreyAI Haitian Creole Transcription FAQ",
    description:
      "Answers about Haitian Creole transcription, Adwaz writing assistance, subtitle exports, privacy, credits, speaker labels, and mobile uploads.",
    url: "/faq",
    alternateLocale: ["fr_FR", "ht_HT", "es_ES", "pt_PT"],
  },
  other: {
    "content-language": "en, fr, ht, es, pt",
    "target-languages": "French, Haitian Creole, Spanish, Portuguese",
  },
};

const FAQS = [
  {
    question: "What is KreyAI?",
    answer:
      "KreyAI builds language tools for Haitian Creole and multilingual work, including transcription, Adwaz writing review, and Dekk local media review.",
  },
  {
    question: "What is Adwaz?",
    answer:
      "Adwaz is KreyAI's Haitian Creole writing assistant. It reviews text for spelling, accents, grammar patterns, unknown words, and explainable correction suggestions.",
  },
  {
    question: "Is Adwaz included in transcription credits?",
    answer:
      "No. Adwaz is separate from KreyAI transcription credits because it serves a different writing-review workflow.",
  },
  {
    question: "Does Adwaz store my writing?",
    answer:
      "Adwaz sends text to the Adwaz API for review, but submitted text is not saved by default. We track privacy-safe metadata and optional feedback reports to improve quality.",
  },
  {
    question: "How does it work?",
    steps: [
      "Enter your email.",
      "Upload your audio file.",
      "We process and generate your transcript.",
      "Download your results.",
    ],
    answer: "No account or login is required.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No. KreyAI works without accounts.",
    bullets: [
      "Your email is used only to access your files.",
      "Your email is used only to track your usage and credits.",
    ],
  },
  {
    question: "How does pricing work?",
    answer: "KreyAI uses a credit-based system:",
    bullets: [
      "New emails receive a one-time 30-minute starter allowance.",
      "You can purchase additional minutes as needed.",
      "Credits are deducted based on the length of your audio.",
    ],
  },
  {
    question: "Do credits expire?",
    answer: "No. Your credits never expire and can be used anytime.",
  },
  {
    question: "Can I get a refund?",
    bullets: [
      "Unused credits may be eligible for a refund.",
      "Credits used to process audio are non-refundable.",
      "In case of technical issues, we may restore credits or issue a refund.",
    ],
  },
  {
    question: "How accurate are the transcriptions?",
    answer: "KreyAI uses advanced AI to generate transcripts, but accuracy may vary depending on:",
    bullets: [
      "Audio quality.",
      "Background noise.",
      "Accents or dialects.",
    ],
    closing:
      "We recommend reviewing transcripts before using them in critical contexts.",
  },
  {
    question: "Do you support multiple languages?",
    answer:
      "Yes. KreyAI supports multiple languages, and we expand public language availability carefully as quality reaches our bar.",
  },
  {
    question: "How does KreyAI handle Haitian Creole differently?",
    answer:
      "KreyAI aims to preserve Kreyòl speech and code-switching as a useful draft for review instead of translating or over-cleaning the transcript.",
  },
  {
    question: "Are my files private?",
    answer: "Yes.",
    bullets: [
      "Your files are used only for transcription.",
      "We do not use your data for training or any other purpose.",
      "Files are automatically deleted after 7 days.",
    ],
  },
  {
    question: "How long are my files available?",
    answer: "Your files are available for 7 days, after which they are permanently deleted.",
  },
  {
    question: "What file formats do you support?",
    answer: "KreyAI supports common audio formats such as:",
    bullets: [
      "MP3.",
      "WAV.",
      "M4A.",
      "Other standard audio formats.",
    ],
  },
  {
    question: "What formats can I download?",
    answer: "You can download transcripts for editing and subtitle files for video production, including:",
    bullets: [
      "TXT.",
      "DOCX.",
      "SRT / VTT.",
      "HTML.",
    ],
  },
  {
    question: "Can I use KreyAI on my mobile device?",
    answer:
      "Yes. KreyAI is web-based and responsive, so you can upload audio recorded on your phone directly from the field.",
  },
  {
    question: "What happens if my job fails?",
    answer: "If a job fails due to a system issue:",
    bullets: [
      "You will not be charged.",
      "Your credits will be restored.",
    ],
  },
  {
    question: "Can I delete my files sooner?",
    answer:
      "Yes. You can request immediate deletion from your job page. Once deleted, download links stop working right away, and you must submit a new request if you need the files again.",
  },
];

function buildAnswerText(item: (typeof FAQS)[number]): string {
  return [item.answer, item.steps?.join(" "), item.bullets?.join(" "), item.closing].filter(Boolean).join(" ");
}

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: buildAnswerText(item),
    },
  })),
};

export default function FAQPage() {
  return (
    <main className="page-shell text-[#13172b]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">FAQ</p>
          <h1 className="page-title">Questions people ask before they upload.</h1>
          <p className="page-lede">Simple, private, and built for real language.</p>
        </div>

        <div className="mt-14 grid gap-5">
          {FAQS.map((item) => (
            <details
              key={item.question}
              className="surface-panel group rounded-[28px] p-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-semibold tracking-tight">
                <span>{item.question}</span>
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--brand-blue-soft)] text-base text-[var(--brand-blue)] group-open:rotate-45">
                  +
                </span>
              </summary>
              {item.answer ? (
                <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{item.answer}</p>
              ) : null}
              {item.steps ? (
                <ol className="mt-4 space-y-3 text-sm leading-7 text-[var(--brand-muted)]">
                  {item.steps.map((step, index) => (
                    <li key={step} className="flex gap-3">
                      <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--brand-blue-soft)] text-xs font-semibold text-[var(--brand-blue)]">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              ) : null}
              {item.bullets ? (
                <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--brand-muted)]">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--brand-blue)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {item.closing ? (
                <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">{item.closing}</p>
              ) : null}
            </details>
          ))}
        </div>

        <div className="surface-panel mt-12 rounded-[30px] p-7">
          <h2 className="text-2xl font-semibold tracking-tight">Still have questions?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--brand-muted)]">
            Reach us at <span className="font-medium text-[#13172b]">support@kreyai.com</span>.
          </p>
        </div>
      </section>
    </main>
  );
}
