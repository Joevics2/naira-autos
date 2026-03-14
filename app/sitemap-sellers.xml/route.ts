import { createClient } from '@supabase/supabase-js';
import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nairaautos.com';
const SELLERS_PER_SITEMAP = 500;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials not found');
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Get sellers who have at least one approved listing
  const { data: sellers, error } = await supabase
    .from('profiles')
    .select('id, created_at')
    .order('created_at', { ascending: false })
    .limit(SELLERS_PER_SITEMAP);

  if (error) {
    console.error('Error fetching sellers:', JSON.stringify(error));
    return [];
  }

  if (!sellers || sellers.length === 0) {
    console.warn('No sellers found');
    return [];
  }

  return sellers.map((seller) => ({
    url: `${siteUrl}/seller/${seller.id}`,
    lastModified: seller.created_at ? new Date(seller.created_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
}

export const revalidate = 86400;
