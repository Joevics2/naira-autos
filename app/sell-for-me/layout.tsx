import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Deals & Discounts in Nigeria | Naira Autos',
  description: 'Find the best car deals and discounts in Nigeria. Great prices on verified cars from trusted dealers.',
  keywords: 'car deals Nigeria, discounted cars, cheap cars Lagos, car promotions Nigeria, best car prices',
};

export default function DealsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
