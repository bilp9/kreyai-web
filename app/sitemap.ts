import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://kreyai.com/",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://kreyai.com/pricing",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://kreyai.com/faq",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://kreyai.com/billing",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://kreyai.com/privacy",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://kreyai.com/terms",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
