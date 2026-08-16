// File: app/sitemap-listings.xml/route.ts
// Accessible at: https://www.naira.autos/sitemap-listings.xml
// Slug format: /{year}-{brand}-{model}-{id} e.g. /listing/2000-toyota-dyna-578849b2-3b3d-4dcc-9b79-fae129640416

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const siteUrl = 'https://www.naira.autos';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

function buildSlug(year: string | number, brand: string, model: string, id: string): string {
  return [year, brand, model]
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')  // replace special chars with hyphens
    .replace(/-+/g, '-')           // collapse multiple hyphens
    .replace(/^-|-$/g, '')         // trim leading/trailing hyphens
    + '-' + id;
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials not found');
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, year, brand, model, updated_at')
    .eq('status', 'approved')
    .order('updated_at', { ascending: false })
    .limit(5000);

  if (error) {
    console.error('Error fetching listings:', JSON.stringify(error));
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  const urls = (listings || [])
    .map((listing) => {
      const slug = buildSlug(listing.year, listing.brand, listing.model, listing.id);
      const lastMod = listing.updated_at
        ? new Date(listing.updated_at).toISOString()
        : new Date().toISOString();
      return `
  <url>
    <loc>${siteUrl}/listing/${slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
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