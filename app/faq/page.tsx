import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Read common questions about KreyAI transcription accuracy, credits, file privacy, speaker labels, downloads, and supported formats.",
  alternates: {
    canonical: "/faq",
  },
};

const FAQS = [
  {
    question: "What is Kreyai?",
    answer:
      "Kreyai is a transcription platform designed to produce accurate, structured, and multilingual transcripts from audio files.",
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
    answer: "No. Kreyai works without accounts.",
    bullets: [
      "Your email is used only to access your files.",
      "Your email is used only to track your usage and credits.",
    ],
  },
  {
    question: "How does pricing work?",
    answer: "Kreyai uses a credit-based system:",
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
    answer: "Kreyai uses advanced AI to generate transcripts, but accuracy may vary depending on:",
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
      "Yes. Kreyai supports multiple languages, and we expand public language availability carefully as quality reaches our bar.",
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
    answer: "Kreyai supports common audio formats such as:",
    bullets: [
      "MP3.",
      "WAV.",
      "M4A.",
      "Other standard audio formats.",
    ],
  },
  {
    question: "What formats can I download?",
    answer: "You can download your transcripts in multiple formats, including:",
    bullets: [
      "TXT.",
      "DOCX.",
      "SRT / VTT.",
      "HTML.",
    ],
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

export default function FAQPage() {
  return (
    <main className="page-shell text-[#13172b]">
      <section className="page-wrap-narrow">
        <div className="page-header">
          <p className="page-eyebrow">FAQ</p>
          <h1 className="page-title">Questions people ask before they upload.</h1>
          <p className="page-lede">Simple, private, and built for real language.</p>
        </div>

        <div className="mt-14 grid gap-5">
          {FAQS.map((item) => (
            <article
              key={item.question}
              className="surface-panel rounded-[28px] p-6"
            >
              <h2 className="text-xl font-semibold tracking-tight">{item.question}</h2>
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
            </article>
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
