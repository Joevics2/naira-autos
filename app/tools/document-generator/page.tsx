import type { Metadata } from 'next';
import DocumentGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'AI Vehicle Document Generator — Bill of Sale & More | Naira Autos',
  description: 'Generate a jurisdiction-correct vehicle bill of sale, loan agreement, lease, power of attorney, and more — free, AI-drafted, with legal requirements researched for your country. Edit, then download as PDF or Word.',
  alternates: { canonical: 'https://www.naira.autos/tools/document-generator' },
  openGraph: {
    title: 'AI Vehicle Document Generator | Naira Autos',
    description: 'Pick a document type and country. Our AI researches the real legal requirements for your jurisdiction and drafts a complete, formatted document — free, no login.',
    url: 'https://www.naira.autos/tools/document-generator',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/document-generator',
      name: 'AI Vehicle Document Generator',
      description: 'Free AI-powered vehicle document generator. Researches jurisdiction-specific legal requirements and drafts a complete, formatted document ready to edit and download.',
      url: 'https://www.naira.autos/tools/document-generator',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Document Generator', item: 'https://www.naira.autos/tools/document-generator' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is this a real legal document?',
          acceptedAnswer: { '@type': 'Answer', text: 'The generator drafts a document based on researched legal requirements for your chosen country, but it is informational only and not legal advice. For high-value or high-risk agreements, have it reviewed by a local attorney before you rely on it.' },
        },
        {
          '@type': 'Question',
          name: 'Is my document saved on your servers?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. The document you generate, and any edits you make, stay only in your own browser. We never store your name, deal details, or the finished document on our servers.' },
        },
        {
          '@type': 'Question',
          name: 'What formats can I download?',
          acceptedAnswer: { '@type': 'Answer', text: 'You can download your finished document as a PDF or as a Word (.docx) file, fully formatted with headings and signature blocks.' },
        },
        {
          '@type': 'Question',
          name: 'Is this free?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Completely free, no login required.' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'AI Vehicle Document Generator — Naira Autos',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'Free AI-powered vehicle document generator with jurisdiction-specific legal research.',
      url: 'https://www.naira.autos/tools/document-generator',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    },
  ],
};

export default function DocumentGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <DocumentGeneratorClient />
    </>
  );
}
