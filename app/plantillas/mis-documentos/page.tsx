import type { Metadata } from 'next';
import MyDocumentsClientEs from '@/components/documents/MyDocumentsClientEs';

export const metadata: Metadata = {
  title: 'Mis Documentos | Naira Autos',
  description: 'Todos los documentos vehiculares que has llenado o generado, guardados localmente en este navegador.',
  alternates: {
    canonical: 'https://www.naira.autos/plantillas/mis-documentos',
    languages: {
      en: 'https://www.naira.autos/documents/my-documents',
      es: 'https://www.naira.autos/plantillas/mis-documentos',
      'x-default': 'https://www.naira.autos/documents/my-documents',
    },
  },
  // Personal, browser-local data with no unique public content — keep out of search results.
  robots: { index: false, follow: true },
};

export default function MisDocumentosPage() {
  return <MyDocumentsClientEs />;
}
