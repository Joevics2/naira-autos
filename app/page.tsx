import { HomePage } from '@/components/home/HomePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Naira Autos - Nigeria\'s Car Tools Hub',
  description: 'Free Nigerian automotive tools — import duty calculator, AI mechanic, auto loan calculator, VIN checker, fuel cost estimator, and more.',
  keywords: 'car tools Nigeria, import duty calculator, auto loan calculator, AI mechanic, VIN checker, fuel cost calculator, car valuation Nigeria',
  openGraph: {
    title: 'Naira Autos - Nigeria\'s Car Tools Hub',
    description: 'Every tool you need to buy, own, and maintain a car in Nigeria — all free.',
    url: 'https://naira.autos',
    siteName: 'Naira Autos',
    locale: 'en_NG',
    type: 'website',
  },
  alternates: {
    canonical: 'https://naira.autos/',
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Naira Autos',
    description: 'Free Nigerian automotive tools — import duty, AI mechanic, loan calculator, VIN checker and more',
    url: 'https://naira.autos',
    publisher: {
      '@type': 'Organization',
      name: 'Naira Autos',
      logo: {
        '@type': 'ImageObject',
        url: 'https://naira.autos/logo.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Free Car Tools for Nigeria — Naira Autos</h1>
      <HomePage />
    </>
  );
}