import type { Metadata } from "next";
import VocabReviewClient from "./VocabReviewClient";
import { MEDIUM_WORD_CANDIDATES } from "./mediumWords";

export const metadata: Metadata = {
  title: "Adwaz Vocabulary Review",
  description: "Private Adwaz medium-confidence vocabulary review queue.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdwazVocabReviewPage() {
  return (
    <VocabReviewClient
      candidates={MEDIUM_WORD_CANDIDATES}
      title="Medium-confidence vocabulary"
      description="Private review page for medium-confidence Haitian Creole word candidates."
      confidenceLabel="medium confidence"
      storageNamespace="medium"
      exportSource="podkas_equalhealth_creole_medium_confidence"
      exportFilenamePrefix="adwaz-medium"
    />
  );
}
