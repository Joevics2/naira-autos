import type { Metadata } from 'next';
import MyDocumentsClient from '@/components/documents/MyDocumentsClient';

export const metadata: Metadata = {
  title: 'My Documents | Naira Autos',
  description: 'All the vehicle documents you\u2019ve filled in or generated, saved locally on this browser.',
  alternates: { canonical: 'https://www.naira.autos/documents/my-documents' },
  // Personal, browser-local data with no unique public content — keep out of search results.
  robots: { index: false, follow: true },
};

export default function MyDocumentsPage() {
  return <MyDocumentsClient />;
}
