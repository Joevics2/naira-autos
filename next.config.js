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
    // duplicate row deleted). Applies to both /documents and /plantillas
    // since both routes serve the same underlying rows.
    const mergedDocumentTemplateRedirects = [
      ['hire-purchase-agreement-motor-vehicle', 'hire-purchase-agreement', 'ng'],
      ['vehicle-sales-agreement-ethiopia', 'vehicle-sales-agreement', 'et'],
      ['vehicle-sale-warranty-transfer-agreement', 'vehicle-sale-and-warranty-transfer-agreement', 'ng'],
      ['vehicle-sale-contract-qa', 'vehicle-sale-contract', 'qa'],
    ].flatMap(([oldSlug, newSlug, country]) => [
      { source: `/documents/${oldSlug}/${country}`, destination: `/documents/${newSlug}/${country}`, permanent: true },
      { source: `/plantillas/${oldSlug}/${country}`, destination: `/plantillas/${newSlug}/${country}`, permanent: true },
    ]);

    return [
      ...mergedDocumentTemplateRedirects,
    ];
  },
};

module.exports = nextConfig;