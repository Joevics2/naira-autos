import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDocumentTemplate, getAllPublishedTemplateParams } from '@/lib/document-templates-data';
import { getDocumentType, getDocumentCountry, type DocumentTypeDef, type DocumentCountryDef } from '@/lib/document-types';
import TemplateDocumentClient from './client';

// ── Static params (ISR) ───────────────────────────────────────────
export async function generateStaticParams() {
  const params = await getAllPublishedTemplateParams();
  return params;
}

// ISR: statically generate every known template at build time, then
// revalidate once every 24h so a newly-published template shows up within
// a day without every request hitting Supabase directly. (Was force-dynamic
// + revalidate 0 while templates were being added daily — reverted now
// that's settled down; see the git history on this line if it needs to go
// back to force-dynamic during another active-adding period.)
export const revalidate = 86400;

// Supabase is the real source of truth for whether a template page exists —
// DOCUMENT_TYPES/DOCUMENT_COUNTRIES are only used to enrich a page when the
// slug happens to match one of the site's known labels/categories. When it
// doesn't match (e.g. a template was added with a slug not yet in that
// list), the page still renders using the template's own title/country code
// instead of 404ing.
function resolveDocType(slug: string, templateTitle: string): DocumentTypeDef {
  return getDocumentType(slug) ?? {
    slug,
    label: templateTitle,
    description: '',
    tier: 'template',
    category: 'Other',
    popular: false,
  };
}

function resolveDocCountry(code: string): DocumentCountryDef {
  return getDocumentCountry(code) ?? {
    code,
    name: code.toUpperCase(),
    flag: '\u{1F30D}',
    region: 'Other',
    popular: false,
  };
}

// ── Metadata ──────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { type: string; country: string };
}): Promise<Metadata> {
  const template = await getDocumentTemplate(params.type, params.country);
  if (!template) return { title: 'Document Not Found | Naira Autos' };

  const docType = resolveDocType(params.type, template.title);
  const docCountry = resolveDocCountry(params.country);

  const title = `${docType.label} Template for ${docCountry.name} (Free) | Naira Autos`;
  const description = `Free, ready-to-use ${docType.label} for ${docCountry.name}. Fill in your details, edit inline, then download as PDF or Word — no sign-up required.`;
  const url = `https://www.naira.autos/documents/${params.type}/${params.country}`;
  const esUrl = `https://www.naira.autos/plantillas/${params.type}/${params.country}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: url, es: esUrl, 'x-default': url },
    },
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
  // Supabase decides existence now, not the fixed DOCUMENT_TYPES list.
  const template = await getDocumentTemplate(params.type, params.country);
  if (!template) notFound();

  const docType = resolveDocType(params.type, template.title);
  const docCountry = resolveDocCountry(params.country);
  const url = `https://www.naira.autos/documents/${params.type}/${params.country}`;

  return (
    <>
      <TemplateSchema docTypeLabel={docType.label} countryName={docCountry.name} url={url} />
      <TemplateDocumentClient template={template} docType={docType} docCountry={docCountry} />
    </>
  );
}
