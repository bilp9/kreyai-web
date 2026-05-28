import type { Metadata } from "next";
import LanguageLandingPage from "../components/LanguageLandingPage";
import { LANGUAGE_LANDING_CONTENT } from "../languageLandingContent";

const content = LANGUAGE_LANDING_CONTENT.spanish;

export const metadata: Metadata = {
  title: "Spanish Audio Transcription",
  description:
    "Transcribe Spanish audio into clean transcripts, speaker-labeled output, and SRT/VTT subtitle files with KreyAI.",
  keywords: [
    "Spanish transcription",
    "Spanish audio transcription",
    "Spanish speech to text",
    "transcripcion de audio en espanol",
    "Spanish subtitles",
    "Spanish interview transcription",
  ],
  alternates: {
    canonical: `/${content.slug}`,
  },
  openGraph: {
    title: "Spanish Audio Transcription | KreyAI",
    description:
      "Clean Spanish transcripts, subtitle exports, and speaker-labeled output for interviews, podcasts, meetings, and research.",
    url: `/${content.slug}`,
    locale: content.locale,
  },
};

export default function SpanishTranscriptionPage() {
  return <LanguageLandingPage content={content} />;
}
