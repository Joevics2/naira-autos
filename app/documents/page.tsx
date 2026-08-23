import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Home, FileCheck2 } from 'lucide-react';
import { getAllPublishedTemplates } from '@/lib/document-templates-data';
import DocumentsIndexClient from '@/components/documents/DocumentsIndexClient';

export const revalidate = 86400; // ISR: 24h revalidation — see the matching note in app/documents/[type]/[country]/page.tsx

export const metadata: Metadata = {
  title: 'Free Vehicle Document Templates | Naira Autos',
  description: 'Free, ready-to-use vehicle document templates by country — bill of sale, gift affidavits, inspection reports, and more. Fill in your details and download as PDF or Word.',
  alternates: {
    canonical: 'https://www.naira.autos/documents',
    languages: {
      en: 'https://www.naira.autos/documents',
      es: 'https://www.naira.autos/plantillas',
      'x-default': 'https://www.naira.autos/documents',
    },
  },
};

export default async function DocumentsIndexPage() {
  const templates = await getAllPublishedTemplates();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-sky-500/10 border border-border hover:border-sky-500/40 text-muted-foreground hover:text-sky-600 dark:hover:text-sky-400 transition-all flex-shrink-0" aria-label="Back">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground flex items-center gap-1"><Home className="h-3.5 w-3.5" />Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Document Templates</span>
          </nav>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <FileCheck2 className="h-4 w-4 text-sky-500" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Free · No Sign-Up</span>
            <Link href="/plantillas" className="text-[11px] text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors ml-2">
              Leer en Español →
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Vehicle Document Templates</h1>
          <p className="text-muted-foreground leading-relaxed">
            Ready-made, country-specific vehicle document templates. Fill in your details and download as PDF or Word — instantly, no wait. Need a document that isn't listed here yet?{' '}
            <Link href="/tools/document-generator" className="text-sky-500 hover:underline">Try the Axios Document Generator</Link> instead.
          </p>
        </div>

        {templates.length === 0 ? (
          <p className="text-sm text-muted-foreground">No templates published yet — check back soon.</p>
        ) : (
          <DocumentsIndexClient templates={templates} />
        )}
      </div>
    </div>
  );
}

