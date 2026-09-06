// File: app/sitemap-static.xml/route.ts
// Accessible at: https://www.naira.autos/sitemap-static.xml

import { NextResponse } from 'next/server';

const siteUrl = 'https://www.naira.autos';

export const revalidate = 86400;

const staticPages = [
  { url: '/',                                   priority: 1.0, changefreq: 'weekly'  },
  { url: '/inicio',                             priority: 0.9, changefreq: 'weekly'  },
  { url: '/sell-for-me',                        priority: 0.9, changefreq: 'weekly'  },
  { url: '/evaluate-used-car',                  priority: 0.9, changefreq: 'weekly'  },
  { url: '/cuanto-vale-mi-auto',                priority: 0.9, changefreq: 'weekly'  },
  { url: '/kam-qeemat-sayarati',                priority: 0.9, changefreq: 'weekly'  },
  { url: '/evaluate-car',                       priority: 0.9, changefreq: 'weekly'  },
  { url: '/blog',                               priority: 0.8, changefreq: 'daily'   },
  // NOTE: /blog-de-autos (Spanish blog index) intentionally not added yet —
  // zero Spanish posts exist. Add once a handful are published, same
  // threshold logic as /herramientas above. Individual Spanish posts
  // don't need this same wait — sitemap-blogs.xml already picks them up
  // dynamically and routes them to /blog-de-autos/[slug] correctly.
  { url: '/vehicles',                           priority: 0.8, changefreq: 'weekly'  },
  { url: '/tools',                              priority: 0.9, changefreq: 'weekly'  },
  { url: '/herramientas',                       priority: 0.9, changefreq: 'weekly'  },
  { url: '/tools/ai-mechanic',                  priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/mecanico-virtual',              priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/ai-mechanic-arabic',            priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/mecanicien-virtuel',            priority: 0.8, changefreq: 'monthly' },
  // /home-arabic, /adawat, /accueil, /outils intentionally NOT added yet —
  // Arabic now has 2 live tools (ai-mechanic-arabic, kam-qeemat-sayarati)
  // and French has 1 (mecanicien-virtuel), both still under the ~5-tool
  // threshold used for /herramientas above. Add each language's home +
  // tools index once a handful more tool pages ship in that language.
  // /blog-arabic and /blog-auto held back for the same reason as
  // /blog-de-autos — zero posts published yet in either language.
  // /herramientas (Spanish tools index) added below — now at 5 live tools
  // (cuanto-vale-mi-auto, mecanico-virtual, calculadora-de-kilometraje,
  // decodificador-de-vin, verificar-numero-de-chasis), past the ~5
  // threshold we'd set for a first crawl to find real substance. Same
  // threshold applies to future language indexes (/outils, /werkzeuge,
  // etc.) as they're built.
  { url: '/tools/engine-sound-analyzer',         priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/engine-sound-analyzer/ticking-noise',   priority: 0.85, changefreq: 'monthly' },
  { url: '/tools/engine-sound-analyzer/knocking-noise',  priority: 0.85, changefreq: 'monthly' },
  { url: '/tools/engine-sound-analyzer/rattling-noise',  priority: 0.75, changefreq: 'monthly' },
  { url: '/tools/import-duty-calculator',       priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/china-car-import-calculator',  priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/import-duty-calculator-countries', priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/import-duty-calculator-ghana', priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/import-duty-calculator-kenya', priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/auto-loan-calculator',         priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/auto-loan-calculator-countries', priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/registration-fee-calculator',  priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/registration-fee-calculator-countries', priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/insurance-calculator',         priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/insurance-calculator-countries', priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/fuel-cost-calculator',         priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/road-trip-calculator',         priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/vin-checker',                  priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/vin-checker-global',            priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/decodificador-de-vin',          priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/chassis-number-check',         priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/verificar-numero-de-chasis',   priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/engine-number-analyzer',       priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/verificar-numero-de-motor',    priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/plate-number-checker',         priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/plate-number-checker/nigeria', priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/vehicle-papers-checklist',     priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/best-car-for',                 priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/car-comparison',               priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/glossary',                     priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/document-generator',           priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/generador-de-documentos-ia',   priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/wiper-blade-size-finder',      priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/headlight-bulb-finder',        priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/fuel-economy-converter',       priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/rideshare-earnings-calculator', priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/import-age-limit',             priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/import-age-limit/nigeria',     priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/vehicle-license',              priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/vehicle-license/nigeria',      priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/import-duty-calculator-south-africa', priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/mileage-explainer',            priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/mileage-explainer-nigeria',    priority: 0.75, changefreq: 'monthly' },
  { url: '/tools/calculadora-de-kilometraje',   priority: 0.8, changefreq: 'monthly' },
  { url: '/documents',                          priority: 0.7, changefreq: 'weekly'  },
  { url: '/about',                              priority: 0.5, changefreq: 'monthly' },
  { url: '/contact',                            priority: 0.5, changefreq: 'monthly' },
  { url: '/faq',                                priority: 0.5, changefreq: 'monthly' },
  { url: '/privacy',                            priority: 0.4, changefreq: 'monthly' },
  { url: '/terms',                              priority: 0.4, changefreq: 'monthly' },
];

export async function GET() {
  const now = new Date().toISOString();

  const urls = staticPages
    .map(
      (page) => `
  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `public, max-age=${revalidate}, stale-while-revalidate`,
    },
  });
}