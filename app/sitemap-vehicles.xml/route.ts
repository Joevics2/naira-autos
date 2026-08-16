// File: app/sitemap-vehicles.xml/route.ts
// Accessible at: https://www.naira.autos/sitemap-vehicles.xml
//
// Builds every reachable vehicle URL directly from vehicle_parts /
// vehicle_problems / vehicle_maintenance (the source of truth for what's
// "active"), same logic as generateStaticParams on the actual pages — so
// this sitemap never lists a URL that would 404.
//
// NOTE (2026-08-16): the /type and /type/brand hub/browse pages are
// temporarily disabled in favor of the single /vehicles search hub (see
// their page.original.tsx files), so this sitemap intentionally omits
// those two URL levels and lists /vehicles instead. Model detail pages
// and their parts/problems/maintenance pages are still live and listed
// as before.

import { NextResponse } from 'next/server';
import { getSupabase, TYPE_SLUG_TO_DB } from '@/lib/vehicle-helpers';

const siteUrl = 'https://www.naira.autos';
export const revalidate = 0; // fetch fresh every request while content is actively changing

const DB_TO_TYPE_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(TYPE_SLUG_TO_DB).map(([slug, db]) => [db, slug])
);

export async function GET() {
  const supabase = getSupabase();

  const [{ data: parts }, { data: problems }, { data: maintenance }] = await Promise.all([
    supabase.from('vehicle_parts').select('brand_slug, model_name, vehicle_type, year').eq('is_published', true),
    supabase.from('vehicle_problems').select('brand_slug, model_name, vehicle_type, year').eq('is_published', true),
    supabase.from('vehicle_maintenance').select('brand_slug, model_name, vehicle_type, year').eq('is_published', true),
  ]);

  const modelSet = new Set<string>();
  const partUrls = new Set<string>();
  const problemUrls = new Set<string>();
  const maintenanceUrls = new Set<string>();

  for (const row of (parts || [])) {
    const typeSlug = DB_TO_TYPE_SLUG[row.vehicle_type] ?? row.vehicle_type;
    modelSet.add(`${typeSlug}/${row.brand_slug}/${row.model_name}`);
    partUrls.add(`${typeSlug}/${row.brand_slug}/${row.model_name}/${row.year}/parts`);
  }
  for (const row of (problems || [])) {
    const typeSlug = DB_TO_TYPE_SLUG[row.vehicle_type] ?? row.vehicle_type;
    modelSet.add(`${typeSlug}/${row.brand_slug}/${row.model_name}`);
    problemUrls.add(`${typeSlug}/${row.brand_slug}/${row.model_name}/${row.year}/problems`);
  }
  for (const row of (maintenance || [])) {
    const typeSlug = DB_TO_TYPE_SLUG[row.vehicle_type] ?? row.vehicle_type;
    modelSet.add(`${typeSlug}/${row.brand_slug}/${row.model_name}`);
    maintenanceUrls.add(`${typeSlug}/${row.brand_slug}/${row.model_name}/${row.year}/maintenance`);
  }

  const entries: { path: string; priority: number; changefreq: string }[] = [
    { path: 'vehicles', priority: 0.8, changefreq: 'weekly' },
    ...Array.from(modelSet).map(path => ({ path, priority: 0.7, changefreq: 'weekly' })),
    ...Array.from(partUrls).map(path => ({ path, priority: 0.6, changefreq: 'monthly' })),
    ...Array.from(problemUrls).map(path => ({ path, priority: 0.6, changefreq: 'monthly' })),
    ...Array.from(maintenanceUrls).map(path => ({ path, priority: 0.6, changefreq: 'monthly' })),
  ];

  const now = new Date().toISOString();
  const urls = entries
    .map(
      (e) => `
  <url>
    <loc>${siteUrl}/${e.path}</loc>
    <lastmod>${now}</lastmod>
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
