import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDocumentTemplate, getAllPublishedTemplateParams } from '@/lib/document-templates-data';
import { getDocumentType, getDocumentCountry, type DocumentTypeDef, type DocumentCountryDef } from '@/lib/document-types';
import TemplateDocumentClientEs from './client';

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
  if (!template) return { title: 'Documento No Encontrado | Naira Autos' };

  const docType = resolveDocType(params.type, template.title);
  const docCountry = resolveDocCountry(params.country);

  const title = `Plantilla de ${docType.label} para ${docCountry.name} (Gratis) | Naira Autos`;
  const description = `Plantilla gratis y lista para usar de ${docType.label} para ${docCountry.name}. Llena tus datos, edita en línea y descarga en PDF o Word — sin registro.`;
  const url = `https://www.naira.autos/plantillas/${params.type}/${params.country}`;
  const enUrl = `https://www.naira.autos/documents/${params.type}/${params.country}`;

  return {
    title,
    description,
    // The document body itself (title/intro/sections) is identical to the
    // English page — this route only translates the surrounding page
    // chrome (labels, buttons) for people who prefer a Spanish UI. Since
    // the actual content is a duplicate, canonical points at the English
    // original and this page is kept out of search results — the feature
    // stays live and linkable for users, it just doesn't compete with (or
    // dilute) the English page in search.
    alternates: { canonical: enUrl },
    robots: { index: false, follow: true },
    openGraph: { title, description, url, type: 'article' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

function TemplateSchema({
  docTypeLabel, countryName, url,
}: { docTypeLabel: string; countryName: string; url: string }) {
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': url,
      name: `Plantilla de ${docTypeLabel} para ${countryName}`,
      url,
      inLanguage: 'es',
      isPartOf: { '@type': 'WebSite', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Plantillas de Documentos', item: 'https://www.naira.autos/plantillas' },
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

export default async function PlantillaDocumentoPage({
  params,
}: {
  params: { type: string; country: string };
}) {
  const template = await getDocumentTemplate(params.type, params.country);
  if (!template) notFound();

  const docType = resolveDocType(params.type, template.title);
  const docCountry = resolveDocCountry(params.country);
  const url = `https://www.naira.autos/plantillas/${params.type}/${params.country}`;

  return (
    <>
      <TemplateSchema docTypeLabel={docType.label} countryName={docCountry.name} url={url} />
      <TemplateDocumentClientEs template={template} docType={docType} docCountry={docCountry} />
    </>
  );
}
