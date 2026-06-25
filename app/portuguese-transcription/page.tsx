import type { Metadata } from "next";
import LanguageLandingPage from "../components/LanguageLandingPage";
import { LANGUAGE_LANDING_CONTENT } from "../languageLandingContent";

const content = LANGUAGE_LANDING_CONTENT.portuguese;

export const metadata: Metadata = {
  title: "Portuguese Audio Transcription",
  description:
    "Transcribe Portuguese audio into clean transcripts, speaker labels, and SRT/VTT subtitle files for media, education, research, and meetings.",
  keywords: [
    "Portuguese transcription",
    "Portuguese audio transcription",
    "Portuguese speech to text",
    "transcricao de audio em portugues",
    "Portuguese subtitles",
    "Portuguese interview transcription",
  ],
  alternates: {
    canonical: `/${content.slug}`,
  },
  openGraph: {
    title: "Portuguese Audio Transcription | KreyAI",
    description:
      "Clean Portuguese transcripts, subtitle exports, and speaker-labeled output for media, education, research, and professional workflows.",
    url: `/${content.slug}`,
    locale: content.locale,
  },
};

export default function PortugueseTranscriptionPage() {
  return <LanguageLandingPage content={content} />;
}
