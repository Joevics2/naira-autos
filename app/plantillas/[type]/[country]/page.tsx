import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDocumentTemplate, getAllPublishedTemplateParams } from '@/lib/document-templates-data';
import { getDocumentType, getDocumentCountry, type DocumentTypeDef, type DocumentCountryDef } from '@/lib/document-types';
import TemplateDocumentClient from '../../../documents/[type]/[country]/client';

// This route is a plain alias of /documents/:type/:country — same data,
// same component, same text. The document itself has no language
// dimension (it's just whatever language it was written in per country),
// so there's nothing here to "translate"; a separate Spanish-chrome'd
// version of the exact same content was a duplicate page, not a real
// localization. Kept as a live URL (not redirected) with noindex +
// canonical pointing at the English URL, so it's reachable but doesn't
// compete with the original in search.

export async function generateStaticParams() {
  const params = await getAllPublishedTemplateParams();
  return params;
}

export const revalidate = 86400; // ISR: 24h revalidation — see the matching note in app/documents/[type]/[country]/page.tsx

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
  const enUrl = `https://www.naira.autos/documents/${params.type}/${params.country}`;

  return {
    title,
    description,
    alternates: { canonical: enUrl },
    robots: { index: false, follow: true },
    openGraph: { title, description, url: enUrl, type: 'article' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function PlantillaDocumentoPage({
  params,
}: {
  params: { type: string; country: string };
}) {
  const template = await getDocumentTemplate(params.type, params.country);
  if (!template) notFound();

  const docType = resolveDocType(params.type, template.title);
  const docCountry = resolveDocCountry(params.country);

  return <TemplateDocumentClient template={template} docType={docType} docCountry={docCountry} />;
}
