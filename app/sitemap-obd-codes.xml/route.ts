// File: app/sitemap-obd-codes.xml/route.ts
// Accessible at: https://naira.autos/sitemap-obd-codes.xml

import { NextResponse } from 'next/server';
import { getObdCodesSitemapEntries } from '@/lib/obd-codes';

const siteUrl = 'https://naira.autos';
export const revalidate = 604800; // 1 week

export async function GET() {
  const codes = await getObdCodesSitemapEntries();

  const entries: { path: string; lastmod: string; priority: number; changefreq: string }[] = [
    { path: 'tools/obd-codes', lastmod: new Date().toISOString(), priority: 0.8, changefreq: 'weekly' },
    ...codes.map(c => ({
      path: `tools/obd-codes/${c.slug}`,
      lastmod: c.updated_at,
      priority: 0.6,
      changefreq: 'monthly',
    })),
  ];

  const urls = entries
    .map(
      (e) => `
  <url>
    <loc>${siteUrl}/${e.path}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `public, max-age=${revalidate}, stale-while-revalidate`,
    },
  });
}
