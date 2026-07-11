import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDocumentTemplate, getAllPublishedTemplateParams } from '@/lib/document-templates-data';
import { getDocumentType, getDocumentCountry } from '@/lib/document-types';
import TemplateDocumentClient from './client';

// ── Static params (ISR) ───────────────────────────────────────────
export async function generateStaticParams() {
  const params = await getAllPublishedTemplateParams();
  return params;
}

export const revalidate = 0; // fetch fresh every request while the template library is actively growing

// TEMPORARY: forces every request to hit Supabase directly with zero caching,
// so newly-added templates show up immediately without a redeploy. Because
// this page also uses generateStaticParams, revalidate=0 alone isn't
// reliable once a page has been statically generated on Vercel — this is
// the actual override. Remove this line once you're done adding templates
// daily and want normal ISR caching back.
export const dynamic = 'force-dynamic';

// ── Metadata ──────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { type: string; country: string };
}): Promise<Metadata> {
  const docType = getDocumentType(params.type);
  const docCountry = getDocumentCountry(params.country);
  if (!docType || !docCountry) return { title: 'Document Not Found | Naira Autos' };

  const title = `${docType.label} Template for ${docCountry.name} (Free) | Naira Autos`;
  const description = `Free, ready-to-use ${docType.label} for ${docCountry.name}. Fill in your details, edit inline, then download as PDF or Word — no sign-up required.`;
  const url = `https://www.naira.autos/documents/${params.type}/${params.country}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'article' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

// ── JSON-LD ───────────────────────────────────────────────────────
function TemplateSchema({
  docTypeLabel, countryName, url,
}: { docTypeLabel: string; countryName: string; url: string }) {
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': url,
      name: `${docTypeLabel} Template for ${countryName}`,
      url,
      isPartOf: { '@type': 'WebSite', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Document Templates', item: 'https://www.naira.autos/documents' },
        { '@type': 'ListItem', position: 3, name: `${docTypeLabel} — ${countryName}`, item: url },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}

export default async function TemplateDocumentPage({
  params,
}: {
  params: { type: string; country: string };
}) {
  const docType = getDocumentType(params.type);
  const docCountry = getDocumentCountry(params.country);
  if (!docType || !docCountry) notFound();

  const template = await getDocumentTemplate(params.type, params.country);
  if (!template) notFound();

  const url = `https://www.naira.autos/documents/${params.type}/${params.country}`;

  return (
    <>
      <TemplateSchema docTypeLabel={docType.label} countryName={docCountry.name} url={url} />
      <TemplateDocumentClient template={template} docType={docType} docCountry={docCountry} />
    </>
  );
}
