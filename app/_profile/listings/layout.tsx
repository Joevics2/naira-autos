import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Listings | Naira Autos',
  description: 'Manage your car listings on Naira Autos. Edit, pause, or mark your cars as sold.',
};

export default function MyListingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
