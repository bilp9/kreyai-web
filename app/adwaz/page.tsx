import type { Metadata } from "next";
import AdwazClient from "./AdwazClient";

export const metadata: Metadata = {
  title: "Adwaz | Haitian Creole Writing Assistant",
  description:
    "Write Haitian Creole with confidence. Adwaz is an intelligent assistant for better Haitian Creole writing, powered by KreyAI.",
  alternates: {
    canonical: "/adwaz",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Adwaz | Write Haitian Creole with confidence",
    description: "Asistan entèlijan pou ekri pi byen an kreyòl. Powered by KreyAI.",
    url: "https://www.kreyai.com/adwaz",
    siteName: "KreyAI",
    type: "website",
  },
};

export default function AdwazPage() {
  return <AdwazClient />;
}
