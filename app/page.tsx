import { HeroSearch } from '@/components/home/HeroSearch';
import { BudgetFilter } from '@/components/home/BudgetFilter';
import { BrowseByType } from '@/components/home/BrowseByType';
import { VehicleRequests } from '@/components/home/VehicleRequests';
import { HotDeals } from '@/components/home/HotDeals';
import { ToolsSection } from '@/components/home/ToolsSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Naira Autos - Nigeria\'s Auto Marketplace | Buy & Sell Cars',
  description: 'Buy or sell cars, trucks, buses, vans with video verification. Every listing includes video proof for complete transparency.',
  keywords: 'cars for sale Nigeria, buy car Lagos, sell car Nigeria, car marketplace, used cars Nigeria, tokunbo cars, video car listings',
  openGraph: {
    title: 'Naira Autos - Nigeria\'s Best Car Marketplace',
    description: 'Buy and sell cars with video proof. Zero guesswork.',
    url: 'https://Naira.autos',
    siteName: 'Naira Autos',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function Home() {
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
      <HeroSearch />
      <BudgetFilter />
      <BrowseByType />
      <VehicleRequests />
      <HotDeals />
      <ToolsSection />
    </main>
  );
}