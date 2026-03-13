import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saved Cars | Naira Autos',
  description: 'View your saved car listings. Keep track of vehicles you like and contact sellers.',
};

export default function SavedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
