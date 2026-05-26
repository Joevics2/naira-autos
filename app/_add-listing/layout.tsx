import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'List Your Car for Sale in Nigeria | Naira Autos',
  description: 'Sell your car in Nigeria with video verification. Create a listing in minutes and reach thousands of buyers. Free listing with video upload.',
  keywords: 'sell car Nigeria, list car for sale, car dealer Nigeria, sell used car, car selling tips Nigeria',
};

export default function AddListingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
