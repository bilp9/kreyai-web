import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/pricing", "/faq", "/privacy", "/terms", "/billing"],
        disallow: ["/upload", "/verify", "/ops", "/jobs/"],
      },
    ],
    sitemap: "https://kreyai.com/sitemap.xml",
    host: "https://kreyai.com",
  };
}
