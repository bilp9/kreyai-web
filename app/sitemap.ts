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
      url: "https://kreyai.com/products",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://kreyai.com/dekk",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: "https://kreyai.com/transcription",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: "https://kreyai.com/about",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://kreyai.com/haitian-creole-transcription",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: "https://kreyai.com/french-transcription",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://kreyai.com/spanish-transcription",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://kreyai.com/portuguese-transcription",
      lastModified: now,
      changeFrequency: "monthly",
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
