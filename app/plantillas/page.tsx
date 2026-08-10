import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Home, FileCheck2 } from 'lucide-react';
import { getAllPublishedTemplates } from '@/lib/document-templates-data';
import DocumentsIndexClientEs from '@/components/documents/DocumentsIndexClientEs';

export const revalidate = 86400; // ISR: 24h revalidation — see the matching note in app/documents/[type]/[country]/page.tsx

export const metadata: Metadata = {
  title: 'Plantillas de Documentos Vehiculares Gratis | Naira Autos',
  description: 'Plantillas gratis de documentos vehiculares por país — contrato de compraventa, carta de donación, reporte de inspección y más. Llena tus datos y descarga en PDF o Word.',
  keywords: 'plantillas de auto gratis, formato de compraventa de auto, contrato de compraventa de vehículo, plantilla de contrato de auto, formatos vehiculares gratis, plantilla carta de donación auto, documentos para vender un auto',
  alternates: {
    canonical: 'https://www.naira.autos/plantillas',
    languages: {
      en: 'https://www.naira.autos/documents',
      es: 'https://www.naira.autos/plantillas',
      'x-default': 'https://www.naira.autos/documents',
    },
  },
};

export default async function PlantillasIndexPage() {
  const templates = await getAllPublishedTemplates();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-sky-500/10 border border-border hover:border-sky-500/40 text-muted-foreground hover:text-sky-600 dark:hover:text-sky-400 transition-all flex-shrink-0" aria-label="Atrás">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground flex items-center gap-1"><Home className="h-3.5 w-3.5" />Inicio</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Plantillas de Documentos</span>
          </nav>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <FileCheck2 className="h-4 w-4 text-sky-500" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Gratis · Sin Registro</span>
            <Link href="/documents" className="text-[11px] text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors ml-2">
              Read in English →
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Plantillas de Documentos Vehiculares</h1>
          <p className="text-muted-foreground leading-relaxed">
            Plantillas listas y específicas por país — contrato de compraventa, carta de donación, reporte de inspección y más. Llena tus datos y descarga en PDF o Word, al instante, sin esperar a la IA. ¿Necesitas un documento que no está en esta lista?{' '}
            <Link href="/tools/generador-de-documentos-ia" className="text-sky-500 hover:underline">Prueba el Redactor de Documentos con IA</Link> en su lugar.
          </p>
        </div>

        {templates.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todavía no hay plantillas publicadas — vuelve pronto.</p>
        ) : (
          <DocumentsIndexClientEs templates={templates} />
        )}
      </div>
    </div>
  );
}
