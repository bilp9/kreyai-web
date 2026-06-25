import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/products",
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
        disallow: ["/upload", "/verify", "/recover", "/ops", "/jobs/"],
      },
    ],
    sitemap: "https://kreyai.com/sitemap.xml",
    host: "https://kreyai.com",
  };
}
