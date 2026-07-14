// File: app/sitemap-blogs.xml/route.ts
// Accessible at: https://naira.autos/sitemap-blogs.xml

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const siteUrl = 'https://www.naira.autos';

export const revalidate = 86400;

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials not found');
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: blogs, error } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('published', true)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', JSON.stringify(error));
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  const urls = (blogs || [])
    .map((blog) => {
      const lastMod = blog.updated_at
        ? new Date(blog.updated_at).toISOString()
        : new Date().toISOString();
      return `
  <url>
    <loc>${siteUrl}/blog/${blog.slug}</loc>
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