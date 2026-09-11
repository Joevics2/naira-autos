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

    // /[type] and /[type]/[brand] listing routes were consolidated into a
    // single searchable /vehicles hub and now 404 (see app/[type]/page.tsx
    // and app/[type]/[brand]/page.tsx — both disabled, originals kept as
    // page.original.tsx). GSC still has several of these indexed as 200s
    // from before the change, so redirect both levels to /vehicles for
    // every vehicle type. `:brand` matches exactly one path segment, so
    // this does not touch the still-active /[type]/[brand]/[model] pages.
    const disabledVehicleListingRedirects = ['cars', 'trucks', 'vans', 'motorcycles', 'buses'].flatMap(type => [
      { source: `/${type}`, destination: '/vehicles', permanent: true },
      { source: `/${type}/:brand`, destination: '/vehicles', permanent: true },
    ]);

    // AI Mechanic tool pages moved out from under the English /tools/
    // prefix into their own native-language tools folder, so each
    // language's tool lives under that language's own index
    // (/herramientas, /adawat, /outils, /ferramentas) instead of the
    // English word. All four were live under the old path before this
    // change, so redirect permanently rather than 404.
    const movedToolPageRedirects = [
      { source: '/tools/mecanico-virtual', destination: '/herramientas/mecanico-virtual', permanent: true },
      { source: '/tools/ai-mechanic-arabic', destination: '/adawat/ai-mechanic-arabic', permanent: true },
      { source: '/tools/mecanicien-virtuel', destination: '/outils/mecanicien-virtuel', permanent: true },
      { source: '/tools/meu-mecanico-virtual', destination: '/ferramentas/meu-mecanico-virtual', permanent: true },
      { source: '/tools/decodificador-de-vin', destination: '/herramientas/decodificador-de-vin', permanent: true },
      { source: '/tools/verificar-numero-de-chasis', destination: '/herramientas/verificar-numero-de-chasis', permanent: true },
      // Distance calculator native-language pages: same issue caught after
      // shipping - built under /tools/ with an English "-arabic" suffix
      // instead of a native slug under the language's own index. These 4
      // were live before the fix, so redirect permanently.
      { source: '/tools/distance-calculator-egypt-arabic', destination: '/adawat/hasbat-al-masafa-masr', permanent: true },
      { source: '/tools/distance-calculator-qatar-arabic', destination: '/adawat/hasbat-al-masafa-qatar', permanent: true },
      { source: '/tools/distance-calculator-saudi-arabia-arabic', destination: '/adawat/hasbat-al-masafa-alsaudiya', permanent: true },
      { source: '/tools/distance-calculator-uae-arabic', destination: '/adawat/hasbat-al-masafa-alemarat', permanent: true },
    ];

    return [
      ...mergedDocumentTemplateRedirects,
      ...disabledVehicleListingRedirects,
      ...movedToolPageRedirects,
    ];
  },
};

module.exports = nextConfig;