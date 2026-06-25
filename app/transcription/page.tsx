import type { Metadata } from "next";
import TranscriptionClient from "./transcription-client";

export const metadata: Metadata = {
  title: "Transcription",
  description:
    "Start a KreyAI transcription job for audio and video files, with speaker labels, subtitles, and export-ready transcript formats.",
  alternates: {
    canonical: "/transcription",
  },
};

export default function TranscriptionPage() {
  return <TranscriptionClient />;
}
