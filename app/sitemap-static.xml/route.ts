// File: app/sitemap-static.xml/route.ts
// Accessible at: https://naira.autos/sitemap-static.xml

import { NextResponse } from 'next/server';

const siteUrl = 'https://naira.autos';

export const revalidate = 86400;

const staticPages = [
  { url: '/', priority: 1, changefreq: 'weekly' },
  { url: '/search', priority: 0.9, changefreq: 'daily' },
  { url: '/add-listing', priority: 0.8, changefreq: 'weekly' },
  { url: '/sell-for-me', priority: 0.8, changefreq: 'weekly' },
  { url: '/saved', priority: 0.7, changefreq: 'weekly' },
  { url: '/requests', priority: 0.7, changefreq: 'daily' },
  { url: '/requests/create', priority: 0.6, changefreq: 'weekly' },
  { url: '/requests/view', priority: 0.6, changefreq: 'daily' },
  { url: '/blog', priority: 0.7, changefreq: 'daily' },
  { url: '/store', priority: 0.7, changefreq: 'weekly' },
  { url: '/profile', priority: 0.5, changefreq: 'weekly' },
  { url: '/profile/listings', priority: 0.5, changefreq: 'weekly' },
  { url: '/profile/settings', priority: 0.4, changefreq: 'monthly' },
  { url: '/profile/verification', priority: 0.4, changefreq: 'monthly' },
  { url: '/profile/notifications', priority: 0.4, changefreq: 'weekly' },
];

export async function GET() {
  const now = new Date().toISOString();

  const urls = staticPages
    .map(
      (page) => `
  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
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