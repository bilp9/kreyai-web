import type { Metadata } from "next";
import LanguageLandingPage from "../components/LanguageLandingPage";
import { LANGUAGE_LANDING_CONTENT } from "../languageLandingContent";

const content = LANGUAGE_LANDING_CONTENT.haitianCreole;

export const metadata: Metadata = {
  title: "Haitian Creole Transcription",
  description:
    "Transcribe Haitian Creole audio into review-ready draft transcripts, speaker-labeled output, and SRT/VTT subtitles with KreyAI.",
  keywords: [
    "Haitian Creole transcription",
    "Kreyòl transcription",
    "transkripsyon Kreyòl",
    "Haitian Creole speech to text",
    "Haitian Creole subtitles",
    "Kreyòl audio transcription",
  ],
  alternates: {
    canonical: `/${content.slug}`,
  },
  openGraph: {
    title: "Haitian Creole Transcription | KreyAI",
    description:
      "Haitian Creole beta transcription with draft transcripts, subtitles, and speaker-labeled outputs for interviews, media, research, and professional review.",
    url: `/${content.slug}`,
    locale: content.locale,
  },
};

export default function HaitianCreoleTranscriptionPage() {
  return <LanguageLandingPage content={content} />;
}
