/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },

  async redirects() {
    // All individual listing slugs
    const listingSlugs = [
      '1995-toyota-dyna-61c97662-c789-421b-98ec-44adf0f30dfb',
      '2000-toyota-dyna-578849b2-3b3d-4dcc-9b79-fae129640416',
      '2000-volkswagen-t3-transporter-07551909-e599-4b51-ab8e-295cea584e59',
      '2001-honda-odyssey-de0f6fa8-c36d-4536-b7c4-2a7c0cda622c',
      '2002-infiniti-qx4-1cef7934-eda2-4c20-bb06-855a581e4bd8',
      '2002-mercedes-benz-c-class-ca3ebd12-f426-4b25-b631-944c8bd7da2c',
      '2002-suzuki-every-3df8c1bb-de71-4717-87ec-c8b097253196',
      '2003-volkswagen-passat-c32c662d-34e1-47a2-8fbd-99e406d4eb94',
      '2004-acura-mdx-7b08f4b0-76a0-4f8a-a5af-2fd8fc8535ee',
      '2004-honda-city-c3fa21e8-ef88-4429-987a-a60c866224f0',
      '2004-honda-cr-v-e3218403-b020-415b-9034-0d2c1ffc9434',
      '2004-toyota-camry-238f6aec-d530-47fc-9f4c-128fee4889a4',
      '2004-toyota-camry-df72150e-e69c-4c4a-8fcc-78952ddc9138',
      '2005-honda-accord-b7f922fc-9014-4be5-997d-de9ca5830d02',
      '2005-honda-pilot-276ef70b-9719-4cae-b5da-a88d4f4c3ed0',
      '2005-toyota-corolla-501ae296-0dbf-4b68-9210-2f757d9be8cb',
      '2005-toyota-corolla-d83dc7e9-0bec-4bca-9604-d91a2bc4eb05',
      '2006-honda-accord-75a41a3e-0795-4b6b-ac29-98bace3cf881',
      '2006-toyota-corolla-0fd7fb39-5d62-4441-9cee-0c966875daff',
      '2006-toyota-corolla-b68fd29d-86f9-4248-a236-9ef1e1f62d8d',
      '2007-honda-accord-203cb16f-1391-496d-85b4-61b04348af0c',
      '2007-peugeot-407-406b7910-3ac5-43ee-964f-3b60101fea1b',
      '2007-suzuki-every-bbc49b69-c391-4f30-b0ec-36850079ce04',
      '2007-toyota-dyna-da09d1bd-9a4f-4af5-b421-d3478bc5ecb0',
      '2008-volkswagen-passat-ca4fa4d9-8a28-4c85-9b85-3c9d74fa0d06',
      '2010-ford-escape-9d45c572-bd04-4f45-991c-9dd98cfa8252',
      '2010-jeep-liberty-c1c8011e-1e9a-4c2b-ad22-61ad80ed58be',
      '2010-toyota-rav4-259692c0-5c36-4b62-9255-c4e32e4705ee',
      '2013-toyota-camry-c64aa03e-ce4c-4bbe-a968-cfb2a7a2cfb7',
      '2015-howo-howo-f097debd-4342-4e93-9b56-73e24c361cec',
    ];

    const listingRedirects = listingSlugs.map((slug) => ({
      source: `/listing/${slug}`,
      destination: '/',
      permanent: true,
    }));

    // All seller profile slugs
    const sellerSlugs = [
      '5f8cae62-d2db-4680-b37b-f0ce58c0ccca',
      '83fdc226-68a8-43e5-b1a5-9d8772bd8a26',
      'a3d38463-1f3d-4f1a-b113-8b523b461d32',
      'd3359eb5-4f33-45fd-9c79-927b86b104a6',
    ];

    const sellerRedirects = sellerSlugs.map((slug) => ({
      source: `/seller/${slug}`,
      destination: '/',
      permanent: true,
    }));

    // Static marketplace + account routes
    const staticRedirects = [
      '/car-dealers',
      '/cheap-cars',
      '/distress-sales',
      '/new-cars',
      '/nigerian-used-cars',
      '/profile',
      '/profile/listings',
      '/profile/notifications',
      '/profile/settings',
      '/profile/verification',
      '/requests',
      '/requests/create',
      '/requests/view',
      '/saved',
      '/search',
      '/store',
      '/tokunbo-cars',
      '/used-cars',
      '/video-verified-cars',
    ].map((source) => ({
      source,
      destination: '/',
      permanent: true,
    }));

    // Wildcard catch-all for any future /listing/* and /seller/* not listed above
    const wildcardRedirects = [
      { source: '/listing/:slug*', destination: '/', permanent: true },
      { source: '/seller/:slug*',  destination: '/', permanent: true },
      { source: '/add-listing',    destination: '/', permanent: true },
      { source: '/listing/edit/:slug*', destination: '/', permanent: true },
    ];

    return [
      ...staticRedirects,
      ...listingRedirects,
      ...sellerRedirects,
      ...wildcardRedirects,
    ];
  },
};

module.exports = nextConfig;