import { HomePage } from '@/components/home/HomePage';
import { Metadata } from 'next';
import { alternatesFor } from '@/lib/hreflang';

// ISR: cache the homepage and re-render at most hourly (was force-dynamic,
// which ran a serverless function on every single visit and bot hit).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Naira Autos - Free Car Tools & Guides',
  description: 'Free automotive tools and guides — import duty calculator, AI mechanic, auto loan calculator, VIN checker, fuel cost estimator, and more for car buyers worldwide.',
  keywords: 'car tools, import duty calculator, auto loan calculator, AI mechanic, VIN checker, fuel cost calculator, car guides, car valuation',
  openGraph: {
    title: 'Naira Autos - Free Car Tools & Guides',
    description: 'Every tool you need to buy, own, and maintain a car — all free, accessible worldwide.',
    url: 'https://www.naira.autos',
    siteName: 'Naira Autos',
    locale: 'en_NG',
    type: 'website',
  },
  alternates: alternatesFor('/'),
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Naira Autos',
    description: 'Free automotive tools and guides — import duty, AI mechanic, loan calculator, VIN checker, and more',
    url: 'https://www.naira.autos',
    publisher: {
      '@type': 'Organization',
      name: 'Naira Autos',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.naira.autos/logo.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Free Car Tools & Guides Worldwide — Naira Autos</h1>
      <HomePage />
    </>
  );
}