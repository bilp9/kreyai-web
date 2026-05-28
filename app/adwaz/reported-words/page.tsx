import type { Metadata } from "next";
import ReportedWordsClient from "./ReportedWordsClient";

export const metadata: Metadata = {
  title: "Adwaz Reported Words",
  description: "Private Adwaz reported-word review queue.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdwazReportedWordsPage() {
  return <ReportedWordsClient />;
}
