import type { Metadata } from "next";
import ApprovedWordsClient from "./ApprovedWordsClient";

export const metadata: Metadata = {
  title: "Adwaz Approved Words",
  description: "Private Adwaz approved-word admin panel.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdwazApprovedWordsPage() {
  return <ApprovedWordsClient />;
}
