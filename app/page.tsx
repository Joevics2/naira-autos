import { HeroSearch } from '@/components/home/HeroSearch';
import { BudgetFilter } from '@/components/home/BudgetFilter';
import { BrowseByType } from '@/components/home/BrowseByType';
import { VehicleRequests } from '@/components/home/VehicleRequests';
import { HotDeals } from '@/components/home/HotDeals';
import { ToolsSection } from '@/components/home/ToolsSection';
import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';

export const revalidate = 3600;

const HOT_DEALS_KEY = 'home:hot_deals';
const HOT_DEALS_TTL = 60 * 60 * 3;

async function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function getRedis() {
  return Redis.fromEnv();
}

async function getHotDealsData() {
  try {
    const redis = getRedis();
    const cached = await redis.get<any[]>(HOT_DEALS_KEY);
    if (cached && cached.length > 0) return cached;
  } catch {}

  const supabase = await getSupabase();

  const { data: trendingData } = await supabase
    .from('listings')
    .select('*, profiles(*)')
    .eq('status', 'approved')
    .order('views_count', { ascending: false })
    .order('contact_clicks', { ascending: false })
    .order('saves_count', { ascending: false })
    .limit(6);

  const { data: newestData } = await supabase
    .from('listings')
    .select('*, profiles(*)')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(6);

  let combined: any[] = [];
  if (trendingData) {
    combined = trendingData.filter((l: any) => l.views_count > 10 || l.contact_clicks > 2 || l.saves_count > 3);
  }
  if (newestData) {
    const ids = new Set(combined.map(l => l.id));
    combined = [...combined, ...newestData.filter((l: any) => !ids.has(l.id))];
  }

  const result = combined.filter((item, i, self) => i === self.findIndex(t => t.id === item.id)).slice(0, 6);

  try {
    const redis = getRedis();
    await redis.set(HOT_DEALS_KEY, result, { ex: HOT_DEALS_TTL });
  } catch {}

  return result;
}

export const metadata: Metadata = {
  title: 'Naira Autos - Nigeria\'s Auto Marketplace | Buy & Sell Cars',
  description: 'Buy or sell cars, trucks, buses, vans with video verification. Every listing includes video proof for complete transparency.',
  keywords: 'cars for sale Nigeria, buy car Lagos, sell car Nigeria, car marketplace, used cars Nigeria, tokunbo cars, video car listings',
  openGraph: {
    title: 'Naira Autos - Nigeria\'s Best Car Marketplace',
    description: 'Buy and sell cars with video proof. Zero guesswork.',
    url: 'https://naira.autos',
    siteName: 'Naira Autos',
    locale: 'en_NG',
    type: 'website',
  },
  alternates: {
    canonical: 'https://naira.autos/',
  },
};

export default async function Home() {
  const hotDeals = await getHotDealsData();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Naira Autos',
    description: 'Nigeria\'s premier car marketplace with video listings',
    url: 'https://Naira.autos',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://naira.autos/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Naira Autos',
      logo: {
        '@type': 'ImageObject',
        url: 'https://naira.autos/logo.png'
      }
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Buy and Sell Cars in Nigeria with Video Verification | Naira Autos</h1>
      <HeroSearch />
      <BudgetFilter />
      <BrowseByType />
      <VehicleRequests />
      <HotDeals listings={hotDeals} />
      <ToolsSection />
    </main>
  );
}