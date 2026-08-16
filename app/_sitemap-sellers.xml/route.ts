// File: app/sitemap-sellers.xml/route.ts
// Accessible at: https://www.naira.autos/sitemap-sellers.xml

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const siteUrl = 'https://www.naira.autos';
const SELLERS_PER_SITEMAP = 500;

export const revalidate = 86400;

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials not found');
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: sellers, error } = await supabase
    .from('profiles')
    .select('id, created_at')
    .order('created_at', { ascending: false })
    .limit(SELLERS_PER_SITEMAP);

  if (error) {
    console.error('Error fetching sellers:', JSON.stringify(error));
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  const urls = (sellers || [])
    .map((seller) => {
      const lastMod = seller.created_at
        ? new Date(seller.created_at).toISOString()
        : new Date().toISOString();
      return `
  <url>
    <loc>${siteUrl}/seller/${seller.id}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
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