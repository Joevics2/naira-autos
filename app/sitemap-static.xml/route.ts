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
  { url: '/herramientas/mecanico-virtual',              priority: 0.8, changefreq: 'monthly' },
  { url: '/adawat/ai-mechanic-arabic',            priority: 0.8, changefreq: 'monthly' },
  { url: '/outils/mecanicien-virtuel',            priority: 0.8, changefreq: 'monthly' },
  { url: '/outils/combien-vaut-ma-voiture',       priority: 0.9, changefreq: 'weekly'  },
  { url: '/outils/decodeur-vin',                  priority: 0.8, changefreq: 'monthly' },
  { url: '/ferramentas/meu-mecanico-virtual',          priority: 0.8, changefreq: 'monthly' },
  { url: '/ferramentas/quanto-vale-meu-carro',    priority: 0.9, changefreq: 'weekly'  },
  { url: '/werkzeuge/virtueller-mechaniker',           priority: 0.8, changefreq: 'monthly' },
  { url: '/werkzeuge/was-ist-mein-auto-wert',     priority: 0.9, changefreq: 'weekly'  },
  { url: '/tsuru/ai-shindan',                          priority: 0.8, changefreq: 'monthly' },
  { url: '/tsuru/kuruma-satei',                   priority: 0.9, changefreq: 'weekly'  },
  // /home-arabic, /adawat, /accueil, /outils, /pagina-inicial,
  // /ferramentas, /startseite, /werkzeuge, /homu, /tsuru intentionally
  // NOT added yet — Arabic has 2 live tools (ai-mechanic-arabic,
  // kam-qeemat-sayarati), French has 3 (mecanicien-virtuel,
  // combien-vaut-ma-voiture, decodeur-vin), Portuguese has 2 (meu-mecanico-virtual,
  // quanto-vale-meu-carro), German has 2 (virtueller-mechaniker,
  // was-ist-mein-auto-wert), and Japanese now has 2 (ai-shindan,
  // kuruma-satei), all still
  // under
  // the ~5-tool threshold used for /herramientas above. Add each
  // language's home + tools index once a handful more tool pages ship
  // in that language. /blog-arabic, /blog-auto, /blog-de-carros,
  // /autoblog, and /kuruma-burogu held back for the same reason as
  // /blog-de-autos — zero posts published yet in any of the five.
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
  { url: '/tools/distance-calculator-countries', priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/distance-calculator',          priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-ghana',    priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-kenya',    priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-south-africa', priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-egypt',    priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-qatar',    priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-saudi-arabia', priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-uae',      priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-uk',       priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-usa',      priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-germany',  priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-france',   priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-italy',    priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-spain',    priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-netherlands', priority: 0.7, changefreq: 'monthly' },
  // Native-language distance calculator pages, under each language's own
  // index per the path convention above (not /tools/).
  { url: '/adawat/hasbat-al-masafa-masr',        priority: 0.7, changefreq: 'monthly' },
  { url: '/adawat/hasbat-al-masafa-qatar',       priority: 0.7, changefreq: 'monthly' },
  { url: '/adawat/hasbat-al-masafa-alsaudiya',   priority: 0.7, changefreq: 'monthly' },
  { url: '/adawat/hasbat-al-masafa-alemarat',    priority: 0.7, changefreq: 'monthly' },
  { url: '/herramientas/calculadora-de-distancia-espana', priority: 0.7, changefreq: 'monthly' },
  { url: '/outils/calculateur-de-distance-france', priority: 0.7, changefreq: 'monthly' },
  // /entfernungsrechner-deutschland and /calcolatore-di-distanza-italia are
  // root-level (no German/Italian tools index exists yet - held back until
  // each language reaches the ~5-tool threshold, same logic as /herramientas
  // above).
  { url: '/entfernungsrechner-deutschland',      priority: 0.7, changefreq: 'monthly' },
  { url: '/calcolatore-di-distanza-italia',      priority: 0.7, changefreq: 'monthly' },
  { url: '/afstandscalculator-nederland',        priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/vin-checker',                  priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/vin-checker-global',            priority: 0.8, changefreq: 'monthly' },
  { url: '/herramientas/decodificador-de-vin',          priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/chassis-number-check',         priority: 0.8, changefreq: 'monthly' },
  { url: '/herramientas/verificar-numero-de-chasis',   priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/engine-number-analyzer',       priority: 0.8, changefreq: 'monthly' },
  { url: '/herramientas/verificar-numero-de-motor',    priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/plate-number-checker',         priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/plate-number-checker/nigeria', priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/vehicle-papers-checklist',     priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/best-car-for',                 priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/car-comparison',               priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/glossary',                     priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/document-generator',           priority: 0.8, changefreq: 'monthly' },
  { url: '/herramientas/generador-de-documentos-ia',   priority: 0.8, changefreq: 'monthly' },
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
  { url: '/herramientas/calculadora-de-kilometraje',   priority: 0.8, changefreq: 'monthly' },
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