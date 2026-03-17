// app/ai-mechanic/layout.tsx
// Static metadata for the AI Mechanic page — handles <title>, <meta>, OG tags.
// The JSON-LD schema is injected by the page component directly.

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Mechanic — Free Car Diagnostic Tool Nigeria | Naira Autos',
  description:
    'Get instant AI-powered vehicle diagnostics in Nigeria. Upload a photo, record your engine sound, or describe your car problem. Free tool — no login required.',
  keywords: [
    'AI mechanic Nigeria',
    'car diagnostic tool Nigeria',
    'engine sound diagnosis',
    'car problem Nigeria',
    'free car diagnosis Lagos',
    'vehicle diagnostic AI',
    'car knocking sound diagnosis',
    'check engine light Nigeria',
    'mechanic AI tool',
    'Naira Autos AI mechanic',
  ].join(', '),
  openGraph: {
    title: 'AI Mechanic — Free Car Diagnostic Tool Nigeria',
    description:
      'Describe your car problem, upload a photo or engine sound. Get instant AI-powered insight on causes, urgency, and repair costs.',
    url: 'https://nairaautos.com/tools/ai-mechanic',
    siteName: 'Naira Autos',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Mechanic — Free Car Diagnostic Tool Nigeria',
    description:
      'Upload a photo or record your engine sound. Get instant AI diagnosis — free on Naira Autos.',
  },
  alternates: {
    canonical: 'https://nairaautos.com/tools/ai-mechanic',
  },
};

export default function AIMechanicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}