// File: app/sitemap-documents.xml/route.ts
// Accessible at: https://naira.autos/sitemap-documents.xml

import { NextResponse } from 'next/server';
import { getAllPublishedTemplates } from '@/lib/document-templates-data';

const siteUrl = 'https://naira.autos';
export const revalidate = 0; // fetch fresh every request while the template library is actively growing
// TEMPORARY: see the matching note in app/documents/[type]/[country]/page.tsx
export const dynamic = 'force-dynamic';

export async function GET() {
  const templates = await getAllPublishedTemplates();

  const entries: { path: string; lastmod: string; priority: number; changefreq: string }[] = [
    { path: 'documents', lastmod: new Date().toISOString(), priority: 0.7, changefreq: 'weekly' },
    ...templates.map(t => ({
      path: `documents/${t.document_type}/${t.country}`,
      lastmod: t.updated_at,
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
