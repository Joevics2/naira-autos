import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile | Naira Autos',
  description: 'Manage your Naira Autos profile, view your listings, reviews, and settings.',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
