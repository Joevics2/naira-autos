import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sell Your Car in Nigeria | We Sell It For You - Naira Autos',
  description: 'Sell your car hassle-free in Nigeria. We market your car, screen buyers, and ensure you get paid. No sale, no fee. Get a free car valuation today.',
  keywords: 'sell car Nigeria, sell my car Lagos, car valuation Nigeria, we sell your car, car dealer Nigeria, sell used car, car selling service Nigeria',
  openGraph: {
    title: 'Sell Your Car in Nigeria | We Sell It For You',
    description: 'Sell your car hassle-free. We market, screen buyers, and ensure you get paid. No sale, no fee.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://naira.autos/sell-for-me',
  },
};

export default function DealsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
