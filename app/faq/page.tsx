const FAQS = [
  {
    question: "What is KreyAI best suited for?",
    answer:
      "KreyAI is designed for transcription workflows where readability matters: interviews, meetings, field recordings, media production, research, and multilingual conversations.",
  },
  {
    question: "What languages does KreyAI support?",
    answer:
      "KreyAI is built for multilingual transcription and is especially focused on Haitian Creole and mixed-language speech. Language availability and quality can vary by source material.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. You can begin with your email, verify access, upload your file, and retrieve outputs through a secure job link.",
  },
  {
    question: "Can I upload video files?",
    answer:
      "Yes. Video uploads are supported when the file type is accepted by the upload flow. KreyAI extracts and processes the audio track for transcription.",
  },
  {
    question: "What formats can I download?",
    answer:
      "Depending on the workflow, outputs can include TXT, DOCX, SRT, VTT, and HTML transcript exports.",
  },
  {
    question: "Is speaker labeling always exact?",
    answer:
      "Speaker diarization is useful for separating voices, but it is still an automated system. It can group speakers well without necessarily knowing their real names or roles.",
  },
  {
    question: "Is my data used to train models?",
    answer:
      "Customer content is processed to deliver the requested transcript and is not intended for model training. If you have stricter requirements, contact support before uploading sensitive material.",
  },
  {
    question: "How long are files retained?",
    answer:
      "KreyAI is designed around temporary retention rather than indefinite storage. Operational retention details may vary by deployment and workflow.",
  },
];

export default function FAQPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f2e8] text-neutral-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-110px] top-24 h-[320px] w-[320px] rounded-full bg-[#84a98c]/18 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-5xl px-6 pb-24 pt-18">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8a5a2b]">
            FAQ
          </p>
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
            Questions customers usually ask first.
          </h1>
          <p className="text-lg leading-8 text-neutral-700">
            The goal is to keep KreyAI simple to start and predictable to use. These are the details people usually want before they upload.
          </p>
        </div>

        <div className="mt-14 grid gap-5">
          {FAQS.map((item) => (
            <article
              key={item.question}
              className="rounded-[26px] border border-black/5 bg-white/75 p-6 shadow-[0_18px_50px_rgba(59,43,22,0.08)]"
            >
              <h2 className="text-xl font-semibold tracking-tight">{item.question}</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{item.answer}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-[28px] border border-black/5 bg-white/70 p-7 shadow-[0_18px_50px_rgba(59,43,22,0.08)]">
          <h2 className="text-2xl font-semibold tracking-tight">Need a specific answer?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600">
            If you need clarity on privacy, workflow fit, or a higher-stakes use case, contact{" "}
            <span className="font-medium text-neutral-900">support@kreyai.com</span> before uploading.
          </p>
        </div>
      </section>
    </main>
  );
}
