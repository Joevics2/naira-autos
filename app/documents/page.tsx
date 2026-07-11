import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home, FileCheck2 } from 'lucide-react';
import { getAllPublishedTemplates } from '@/lib/document-templates-data';
import { getDocumentType, getDocumentCountry } from '@/lib/document-types';

export const revalidate = 0;
// TEMPORARY: see the matching note in app/documents/[type]/[country]/page.tsx
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Free Vehicle Document Templates | Naira Autos',
  description: 'Free, ready-to-use vehicle document templates by country — bill of sale, gift affidavits, inspection reports, and more. Fill in your details and download as PDF or Word.',
  alternates: { canonical: 'https://www.naira.autos/documents' },
};

export default async function DocumentsIndexPage() {
  const templates = await getAllPublishedTemplates();

  const grouped = new Map<string, typeof templates>();
  for (const t of templates) {
    const docType = getDocumentType(t.document_type);
    const category = docType?.category || 'Other';
    if (!grouped.has(category)) grouped.set(category, []);
    grouped.get(category)!.push(t);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-6 space-y-6">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground flex items-center gap-1"><Home className="h-3.5 w-3.5" />Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Document Templates</span>
        </nav>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <FileCheck2 className="h-4 w-4 text-sky-500" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Free · No Sign-Up</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Vehicle Document Templates</h1>
          <p className="text-muted-foreground leading-relaxed">
            Ready-made, country-specific vehicle document templates. Fill in your details and download as PDF or Word — instantly, no AI wait. Need a document that isn't listed here yet?{' '}
            <Link href="/tools/document-generator" className="text-sky-500 hover:underline">Try the AI Document Generator</Link> instead.
          </p>
        </div>

        {templates.length === 0 && (
          <p className="text-sm text-muted-foreground">No templates published yet — check back soon.</p>
        )}

        <div className="space-y-8">
          {Array.from(grouped.entries()).map(([category, items]) => (
            <section key={category}>
              <h2 className="text-xs font-bold tracking-widest uppercase text-sky-600 dark:text-sky-400 mb-3">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map(t => {
                  const docType = getDocumentType(t.document_type);
                  const docCountry = getDocumentCountry(t.country);
                  if (!docType || !docCountry) return null;
                  return (
                    <Link
                      key={t.id}
                      href={`/documents/${t.document_type}/${t.country}`}
                      className="bg-card border border-border hover:border-foreground/30 rounded-xl p-4 transition-colors"
                    >
                      <p className="font-semibold text-foreground text-sm">{docType.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{docCountry.flag} {docCountry.name}</p>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
