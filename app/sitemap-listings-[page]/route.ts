import { createClient } from '@supabase/supabase-js';
import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nairaautos.com';
const LISTINGS_PER_SITEMAP = 1000;

export async function generateStaticParams() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return [{ page: '1' }];
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { count, error } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved');

  if (error || !count) {
    console.error('Error counting listings:', error);
    return [{ page: '1' }];
  }

  const numberOfSitemaps = Math.ceil(count / LISTINGS_PER_SITEMAP);
  const pages = [];

  for (let i = 1; i <= numberOfSitemaps; i++) {
    pages.push({ page: String(i) });
  }

  return pages;
}

export default async function sitemap({ params }: { params: { page: string } }): Promise<MetadataRoute.Sitemap> {
  const page = parseInt(params.page) || 1;
  const start = (page - 1) * LISTINGS_PER_SITEMAP;
  const end = start + LISTINGS_PER_SITEMAP - 1;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials not found');
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, updated_at, brand, model, year')
    .eq('status', 'approved')
    .order('updated_at', { ascending: false })
    .range(start, end);

  if (error) {
    console.error('Error fetching listings:', JSON.stringify(error));
    return [];
  }

  if (!listings || listings.length === 0) {
    return [];
  }

  return listings.map((listing) => ({
    url: `${siteUrl}/listing/${listing.id}`,
    lastModified: listing.updated_at ? new Date(listing.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
}

export const revalidate = 3600;
