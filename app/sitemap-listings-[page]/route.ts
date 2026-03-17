// File: app/sitemap-listings-[page].xml/route.ts
// Accessible at: https://naira.autos/sitemap-listings-1.xml, /sitemap-listings-2.xml, etc.
// The index in app/sitemap.ts generates the correct links automatically based on listing count.

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const siteUrl = 'https://naira.autos';
const LISTINGS_PER_SITEMAP = 1000;

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: { page: string } },
) {
  const page = parseInt(params.page) || 1;
  const start = (page - 1) * LISTINGS_PER_SITEMAP;
  const end = start + LISTINGS_PER_SITEMAP - 1;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials not found');
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, updated_at')
    .eq('status', 'approved')
    .order('updated_at', { ascending: false })
    .range(start, end);

  if (error) {
    console.error('Error fetching listings:', JSON.stringify(error));
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  const urls = (listings || [])
    .map((listing) => {
      const lastMod = listing.updated_at
        ? new Date(listing.updated_at).toISOString()
        : new Date().toISOString();
      return `
  <url>
    <loc>${siteUrl}/listing/${listing.id}</loc>
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