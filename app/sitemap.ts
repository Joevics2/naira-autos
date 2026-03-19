// File: app/sitemap.ts
// Accessible at: https://naira.autos/sitemap.xml (Next.js handles this automatically)
// This is a sitemap INDEX — it lists all your other sitemaps, not individual pages.

import { MetadataRoute } from 'next';

const siteUrl = 'https://naira.autos';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/sitemap-static.xml`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/sitemap-listings.xml`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${siteUrl}/sitemap-search.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/sitemap-sellers.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/sitemap-blogs.xml`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];
}

export const revalidate = 3600;