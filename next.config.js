/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },

  async redirects() {
    // Document template duplicates merged into a single canonical slug
    // (same document type + country, previously split across two rows in
    // document_templates — richer content kept under the shorter slug,
    // duplicate row deleted).
    const mergedDocumentTemplateRedirects = [
      ['hire-purchase-agreement-motor-vehicle', 'hire-purchase-agreement', 'ng'],
      ['vehicle-sales-agreement-ethiopia', 'vehicle-sales-agreement', 'et'],
      ['vehicle-sale-warranty-transfer-agreement', 'vehicle-sale-and-warranty-transfer-agreement', 'ng'],
      ['vehicle-sale-contract-qa', 'vehicle-sale-contract', 'qa'],
    ].map(([oldSlug, newSlug, country]) => ({
      source: `/documents/${oldSlug}/${country}`,
      destination: `/documents/${newSlug}/${country}`,
      permanent: true,
    }));

    // /plantillas removed entirely (2026-08-16) — each document's body
    // content is already written in its own country's native language
    // (English for NG, Italian for IT, Arabic for EG/QA/SA, etc.), so a
    // Spanish-chrome'd "translation" of the exact same content was a true
    // duplicate-content page for every single template, not a real
    // localization. Collapses straight to the canonical /documents URL
    // (also applying the slug merges above in one hop where relevant).
    const plantillasRemovedRedirects = [
      { source: '/plantillas', destination: '/documents', permanent: true },
      { source: '/plantillas/hire-purchase-agreement-motor-vehicle/ng', destination: '/documents/hire-purchase-agreement/ng', permanent: true },
      { source: '/plantillas/vehicle-sales-agreement-ethiopia/et', destination: '/documents/vehicle-sales-agreement/et', permanent: true },
      { source: '/plantillas/vehicle-sale-warranty-transfer-agreement/ng', destination: '/documents/vehicle-sale-and-warranty-transfer-agreement/ng', permanent: true },
      { source: '/plantillas/vehicle-sale-contract-qa/qa', destination: '/documents/vehicle-sale-contract/qa', permanent: true },
      { source: '/plantillas/:type/:country', destination: '/documents/:type/:country', permanent: true },
    ];

    return [
      ...mergedDocumentTemplateRedirects,
      ...plantillasRemovedRedirects,
    ];
  },
};

module.exports = nextConfig;