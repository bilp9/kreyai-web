import type { LanguageLandingContent } from "./components/LanguageLandingPage";

export const LANGUAGE_LANDING_CONTENT = {
  haitianCreole: {
    language: "Haitian Creole",
    eyebrow: "Haitian Creole transcription beta",
    h1: "Haitian Creole transcription for review-ready drafts.",
    lede:
      "KreyAI helps journalists, researchers, creators, and organizations turn Haitian Creole audio into draft transcripts, subtitles, and speaker-labeled outputs for human review.",
    slug: "haitian-creole-transcription",
    code: "ht",
    locale: "ht_HT",
    proofPoints: [
      "Haitian Creole support is in beta, with review recommended for noisy audio, long files, and mixed-language moments.",
      "Speaker labels and subtitle exports help interviews, podcasts, and video projects move faster.",
      "Private by design: no training on your audio, no traditional login, and 7-day file availability.",
    ],
    useCases: [
      {
        title: "Journalism & media",
        description:
          "Create draft transcripts for field interviews, oral histories, podcasts, and documentary audio with speaker labels and subtitle-ready output.",
      },
      {
        title: "Legal & public work",
        description:
          "Review sensitive Haitian Creole recordings with a privacy-focused workflow and downloadable files intended for careful human review.",
      },
      {
        title: "Education & research",
        description:
          "Turn lectures, participant interviews, and field research into structured drafts that are easier to review and analyze.",
      },
    ],
    workflow: [
      {
        title: "Choose Haitian Creole",
        description:
          "Start a request with your email, select the best available language option, and upload your audio from desktop or mobile.",
      },
      {
        title: "Pick the output style",
        description:
          "Use one-speaker draft output for straightforward audio or choose speaker labels when multiple voices need to stay separate.",
      },
      {
        title: "Download transcript and subtitles",
        description:
          "Export text for editing or SRT/VTT subtitle files for video publishing and accessibility workflows.",
      },
    ],
    faq: [
      {
        question: "Can KreyAI transcribe Haitian Creole audio?",
        answer:
          "Yes. Haitian Creole support is available in beta. Outputs are designed as useful drafts for review, especially when the audio includes regional speech, background noise, or code-switching.",
      },
      {
        question: "Does it support speaker labels?",
        answer:
          "Yes. Speaker-labeled output is available for interviews, meetings, podcasts, and other conversations where separating voices makes review easier. Multi-speaker Haitian Creole may need extra review while the feature is in beta.",
      },
      {
        question: "Can I export Haitian Creole subtitles?",
        answer:
          "Yes. After processing, you can download subtitle files such as SRT and VTT for video workflows.",
      },
      {
        question: "Is Haitian Creole audio used for training?",
        answer:
          "No. KreyAI does not use your audio or generated transcripts to train AI models.",
      },
    ],
  },
  french: {
    language: "French",
    eyebrow: "French transcription",
    h1: "French audio transcription for interviews, media, and research.",
    lede:
      "KreyAI turns French audio into structured transcripts, subtitle files, and speaker-labeled outputs for teams working across media, education, research, and professional review.",
    slug: "french-transcription",
    code: "fr",
    locale: "fr_FR",
    proofPoints: [
      "Useful for French interviews, lectures, podcasts, meetings, and mixed-language recordings.",
      "Download clean transcript files or subtitle exports for editing and publishing.",
      "Designed with privacy-first retention and a no-training policy for your audio.",
    ],
    useCases: [
      {
        title: "Media production",
        description:
          "Prepare French interviews, podcasts, and video recordings for editing, publishing, and caption workflows.",
      },
      {
        title: "Research",
        description:
          "Create transcripts from French field recordings, participant interviews, and academic material for faster review.",
      },
      {
        title: "Professional review",
        description:
          "Use structured French transcripts to review meetings, calls, and multilingual conversations with less manual cleanup.",
      },
    ],
    workflow: [
      {
        title: "Upload French audio",
        description:
          "Start with an email address, choose French when available, and upload common audio formats from your browser.",
      },
      {
        title: "Choose transcript detail",
        description:
          "Select a clean transcript for direct recordings or speaker labels for conversations with multiple voices.",
      },
      {
        title: "Export your files",
        description:
          "Download transcript and subtitle outputs for editing, archiving, publication, or accessibility.",
      },
    ],
    faq: [
      {
        question: "What French audio can I transcribe?",
        answer:
          "KreyAI can process French interviews, podcasts, lectures, meetings, and other spoken recordings, with accuracy depending on audio quality and clarity.",
      },
      {
        question: "Can French transcripts include speaker labels?",
        answer:
          "Yes. Speaker labels are available when you need to separate voices in interviews, meetings, or panel discussions.",
      },
      {
        question: "Can I export French subtitles?",
        answer:
          "Yes. KreyAI supports subtitle exports such as SRT and VTT after processing.",
      },
      {
        question: "How long are French files available?",
        answer:
          "Files are available for 7 days after processing, then scheduled for deletion from active storage.",
      },
    ],
  },
  spanish: {
    language: "Spanish",
    eyebrow: "Spanish transcription",
    h1: "Spanish audio transcription for real working recordings.",
    lede:
      "KreyAI helps you transcribe Spanish interviews, podcasts, meetings, lectures, and field recordings into clean text, subtitles, and speaker-labeled outputs.",
    slug: "spanish-transcription",
    code: "es",
    locale: "es_ES",
    proofPoints: [
      "Built for practical Spanish transcription workflows across media, research, and professional review.",
      "Speaker labels help keep interviews, meetings, and multi-person recordings easy to follow.",
      "Private by design with no model training on your files and automatic 7-day file availability.",
    ],
    useCases: [
      {
        title: "Interviews",
        description:
          "Turn Spanish interview recordings into structured transcripts that are easier to edit, quote, and review.",
      },
      {
        title: "Podcasts & video",
        description:
          "Create transcript and subtitle files for Spanish audio and video projects without a manual first pass.",
      },
      {
        title: "Meetings & research",
        description:
          "Review Spanish meetings, lectures, and participant recordings with clean outputs and optional speaker labels.",
      },
    ],
    workflow: [
      {
        title: "Submit Spanish audio",
        description:
          "Enter your email, choose Spanish when available, and upload your recording from desktop or mobile.",
      },
      {
        title: "Select clean or speaker-labeled output",
        description:
          "Keep simple recordings lean or add speaker separation for interviews and group conversations.",
      },
      {
        title: "Download transcript or subtitles",
        description:
          "Export files for editing, publication, captions, internal notes, or review.",
      },
    ],
    faq: [
      {
        question: "Can KreyAI transcribe Spanish audio?",
        answer:
          "Yes. KreyAI supports Spanish audio transcription for interviews, podcasts, meetings, lectures, and similar recordings.",
      },
      {
        question: "Does Spanish transcription support subtitles?",
        answer:
          "Yes. You can download subtitle formats such as SRT and VTT after processing.",
      },
      {
        question: "Can I use Spanish transcription on mobile?",
        answer:
          "Yes. KreyAI is web-based and responsive, so you can upload recordings from your phone browser.",
      },
      {
        question: "Are Spanish files private?",
        answer:
          "Yes. Your files are used only to provide the transcription service and are not used for model training.",
      },
    ],
  },
  portuguese: {
    language: "Portuguese",
    eyebrow: "Portuguese transcription",
    h1: "Portuguese audio transcription with clean exports.",
    lede:
      "KreyAI converts Portuguese audio into readable transcripts, subtitles, and speaker-labeled files for interviews, media, education, research, and professional workflows.",
    slug: "portuguese-transcription",
    code: "pt",
    locale: "pt_PT",
    proofPoints: [
      "Useful for Portuguese interviews, podcasts, lectures, meetings, and multilingual audio.",
      "Download transcript files for editing or subtitle files for video workflows.",
      "No traditional account required, no training on your files, and short file retention.",
    ],
    useCases: [
      {
        title: "Content production",
        description:
          "Prepare Portuguese podcasts, videos, interviews, and social clips with transcript and subtitle outputs.",
      },
      {
        title: "Education",
        description:
          "Transcribe Portuguese lectures, seminars, and learning material into reviewable text.",
      },
      {
        title: "Business & research",
        description:
          "Review Portuguese meetings, calls, field recordings, and participant interviews with cleaner structure.",
      },
    ],
    workflow: [
      {
        title: "Upload Portuguese audio",
        description:
          "Start a request, select Portuguese when available, and upload your audio in a common file format.",
      },
      {
        title: "Choose the right output",
        description:
          "Use clean transcription for direct recordings or speaker labels for multi-person conversations.",
      },
      {
        title: "Download and review",
        description:
          "Export transcript and subtitle files, then edit or publish them in your existing workflow.",
      },
    ],
    faq: [
      {
        question: "Can KreyAI transcribe Portuguese audio?",
        answer:
          "Yes. KreyAI supports Portuguese transcription for interviews, podcasts, meetings, lectures, and media recordings.",
      },
      {
        question: "Can Portuguese transcripts include speaker labels?",
        answer:
          "Yes. Speaker labels are available for conversations where multiple voices need to be separated.",
      },
      {
        question: "What can I export?",
        answer:
          "You can download transcript files and subtitle formats such as SRT and VTT after processing.",
      },
      {
        question: "Does KreyAI train on Portuguese uploads?",
        answer:
          "No. KreyAI does not use your uploaded audio or transcripts to train AI models.",
      },
    ],
  },
} satisfies Record<string, LanguageLandingContent>;
