// File: app/sitemap-vehicles.xml/route.ts
// Accessible at: https://naira.autos/sitemap-vehicles.xml
//
// TEMPORARILY SIMPLIFIED (2026-08-16) — the granular /type, /type/brand,
// /type/brand/model, and /type/brand/model/year/(parts|problems|maintenance)
// routes are disabled (see their page.original.tsx files) while vehicle
// content is consolidated into a single searchable hub at /vehicles.
// Listing hundreds of URLs here that now 404 would hurt more than help,
// so this sitemap lists just the hub page until those routes come back.
//
// Full original per-model/per-year sitemap generator preserved in
// ./route.original.ts — restore by deleting this file and renaming that
// one back to route.ts.

import { NextResponse } from 'next/server';

const siteUrl = 'https://www.naira.autos';
export const revalidate = 0;

export async function GET() {
  const now = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/vehicles</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `public, max-age=${revalidate}, stale-while-revalidate`,
    },
  });
}
