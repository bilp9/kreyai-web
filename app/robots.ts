import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/products",
          "/atelier",
          "/atelier/releases/0.1.0",
          "/atelier/releases/0.1.1",
          "/atelier/releases/0.1.2",
          "/atelier/releases/0.1.3",
          "/atelier/releases/0.1.5",
          "/atelier/releases/0.1.6",
          "/dekk",
          "/transcription",
          "/about",
          "/haitian-creole-transcription",
          "/french-transcription",
          "/spanish-transcription",
          "/portuguese-transcription",
          "/pricing",
          "/faq",
          "/privacy",
          "/terms",
          "/transcription/billing",
        ],
        disallow: ["/upload", "/verify", "/recover", "/ops", "/jobs/", "/dekk/download", "/atelier/download"],
      },
    ],
    sitemap: "https://www.kreyai.com/sitemap.xml",
    host: "https://www.kreyai.com",
  };
}
