import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Buying Guides — Comparisons, How-Tos & Ownership Tips | Naira Autos',
  description: 'Practical car buying guides: comparisons, how-to articles, ownership tips and more. Everything you need to buy, own, and maintain a car with confidence.',
  alternates: {
    canonical: 'https://www.naira.autos/guides',
  },
  openGraph: {
    title: 'Car Buying Guides — Comparisons, How-Tos & Ownership Tips | Naira Autos',
    description: 'Practical car buying guides: comparisons, how-to articles, ownership tips and more.',
    url: 'https://www.naira.autos/guides',
    siteName: 'Naira Autos',
    locale: 'en',
    type: 'website',
  },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
