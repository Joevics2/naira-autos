// File: app/sitemap.ts

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
    // sitemap-search.xml temporarily disabled
    // {
    //   url: `${siteUrl}/sitemap-search.xml`,
    //   lastModified: new Date(),
    //   changeFrequency: 'daily',
    //   priority: 0.9,
    // },
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