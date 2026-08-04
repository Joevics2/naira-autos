import { HomePage } from '@/components/home/HomePage';
import { Metadata } from 'next';

// Force this route to render fresh on every request instead of being
// statically generated once at build time and cached. A fully static
// homepage can end up serving an old cached HTML snapshot after a
// redeploy — including stale references like the PWA manifest link
// below, which is why disabling it in layout.tsx didn't always stick
// on a page a visitor had cached from before that change went out.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Naira Autos - Free Car Tools & Guides',
  description: 'Free automotive tools and guides — import duty calculator, AI mechanic, auto loan calculator, VIN checker, fuel cost estimator, and more for car buyers worldwide.',
  keywords: 'car tools, import duty calculator, auto loan calculator, AI mechanic, VIN checker, fuel cost calculator, car guides, car valuation',
  openGraph: {
    title: 'Naira Autos - Free Car Tools & Guides',
    description: 'Every tool you need to buy, own, and maintain a car — all free, accessible worldwide.',
    url: 'https://naira.autos',
    siteName: 'Naira Autos',
    locale: 'en_NG',
    type: 'website',
  },
  alternates: {
    canonical: 'https://naira.autos/',
    languages: {
      en: 'https://naira.autos/',
      es: 'https://www.naira.autos/inicio',
      'x-default': 'https://naira.autos/',
    },
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Naira Autos',
    description: 'Free automotive tools and guides — import duty, AI mechanic, loan calculator, VIN checker, and more',
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
      <h1 className="sr-only">Free Car Tools & Guides Worldwide — Naira Autos</h1>
      <HomePage />
    </>
  );
}