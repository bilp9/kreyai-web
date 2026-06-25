import type { Metadata } from "next";
import LanguageLandingPage from "../components/LanguageLandingPage";
import { LANGUAGE_LANDING_CONTENT } from "../languageLandingContent";

const content = LANGUAGE_LANDING_CONTENT.french;

export const metadata: Metadata = {
  title: "French Audio Transcription",
  description:
    "Transcribe French audio into clean transcripts, speaker labels, and SRT/VTT subtitle files for interviews, podcasts, meetings, and research.",
  keywords: [
    "French transcription",
    "French audio transcription",
    "French speech to text",
    "transcription audio francais",
    "French subtitles",
    "French interview transcription",
  ],
  alternates: {
    canonical: `/${content.slug}`,
  },
  openGraph: {
    title: "French Audio Transcription | KreyAI",
    description:
      "Clean French transcripts, subtitle exports, and speaker-labeled output for interviews, media, meetings, and research.",
    url: `/${content.slug}`,
    locale: content.locale,
  },
};

export default function FrenchTranscriptionPage() {
  return <LanguageLandingPage content={content} />;
}
