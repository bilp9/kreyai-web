import type { Metadata } from "next";
import VocabReviewClient, { type WordCandidate } from "../vocab-review/VocabReviewClient";
import { LOW_WORD_CANDIDATES } from "./lowWords";

export const metadata: Metadata = {
  title: "Adwaz Low-Confidence Vocabulary Review",
  description: "Private Adwaz low-confidence vocabulary review queue.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdwazLowVocabReviewPage() {
  const manualReviewCandidates: WordCandidate[] = [
    {
      word: "chaloska",
      count: 16,
      confidence: "low",
      confidenceScore: 0.32,
      source: "manual_entity_review",
      preferredVariant: "",
      contexts: [
        "Chaloska yo toujou abiye an militè, gwo chapo, gwo bòt, pil meday sou inifòm yo.",
        "Chaloska ! Depi w tande non sa a, ou tou panse a kanaval.",
      ],
    },
    {
      word: "makomè",
      count: 1,
      confidence: "low",
      confidenceScore: 0.32,
      source: "manual_entity_review",
      preferredVariant: "",
      contexts: [
        "Unrica Auguste, alyas Makomè Dreadlocks, ap fè menm travay la depi plizyè lane.",
      ],
    },
    {
      word: "saint",
      count: 1,
      confidence: "low",
      confidenceScore: 0.32,
      source: "manual_entity_review",
      preferredVariant: "",
      contexts: [
        "Non enstitisyon an parèt kòm Hôpital Saint nan tèks sous la.",
      ],
    },
    {
      word: "sainte",
      count: 1,
      confidence: "low",
      confidenceScore: 0.32,
      source: "manual_entity_review",
      preferredVariant: "",
      contexts: [
        "Mo a ka fè pati yon non pwòp fransè, men li pa dwe antre otomatikman nan diksyonè jeneral la.",
      ],
    },
  ];
  const candidates = [
    ...manualReviewCandidates,
    ...LOW_WORD_CANDIDATES.filter(
      (candidate) => !manualReviewCandidates.some((manual) => manual.word === candidate.word),
    ),
  ];

  return (
    <VocabReviewClient
      candidates={candidates}
      title="Low-confidence vocabulary"
      description="Private review page for low-confidence Haitian Creole word candidates after removing words already approved by the engine."
      confidenceLabel="low confidence"
      storageNamespace="low"
      exportSource="podkas_equalhealth_creole_low_confidence_filtered"
      exportFilenamePrefix="adwaz-low"
    />
  );
}
