// File: app/sitemap.ts
// Accessible at: https://naira.autos/sitemap.xml (Next.js handles this automatically)
// This is a sitemap INDEX — it lists all your other sitemaps, not individual pages.

import { createClient } from '@supabase/supabase-js';
import { MetadataRoute } from 'next';

const siteUrl = 'https://naira.autos';
const LISTINGS_PER_SITEMAP = 1000;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseSitemaps: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/sitemap-static.xml`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
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

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase credentials not found');
      return baseSitemaps;
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { count: listingsCount, error: listingsError } = await supabase
      .from('listings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved');

    if (listingsError) {
      console.error('Error counting listings:', JSON.stringify(listingsError));
      return baseSitemaps;
    }

    const sitemapEntries: MetadataRoute.Sitemap = [];

    if (listingsCount && listingsCount > 0) {
      const numberOfListingsSitemaps = Math.ceil(listingsCount / LISTINGS_PER_SITEMAP);
      console.log(`Total listings: ${listingsCount}, creating ${numberOfListingsSitemaps} listing sitemaps`);

      for (let i = 1; i <= numberOfListingsSitemaps; i++) {
        sitemapEntries.push({
          url: `${siteUrl}/sitemap-listings-${i}.xml`,
          lastModified: new Date(),
          changeFrequency: 'hourly',
          priority: 1,
        });
      }
    } else {
      console.warn('No approved listings found');
    }

    return [...baseSitemaps, ...sitemapEntries];
  } catch (error) {
    console.error('Error generating sitemap index:', error);
    return baseSitemaps;
  }
}

export const revalidate = 3600;