import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Requests in Nigeria | Naira Autos',
  description: 'Browse car buyer requests in Nigeria. Find buyers looking for your type of car and get direct inquiries.',
  keywords: 'car request Nigeria, buyer looking for car, car wanted Nigeria, car inquiry Nigeria',
};

export default function RequestsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
