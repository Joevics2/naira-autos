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
  // Document-template hubs (one per language, native URL terms). Index-worthy on their own: each lists live templates and carries unique localized copy.
  { url: '/plantillas',                  priority: 0.8, changefreq: 'weekly'  },
  { url: '/modeles-documents-vehicule',  priority: 0.8, changefreq: 'weekly'  },
  { url: '/modelos-documentos-veiculo',  priority: 0.8, changefreq: 'weekly'  },
  { url: '/kfz-vorlagen',                priority: 0.8, changefreq: 'weekly'  },
  { url: '/fac-simile-documenti-auto',   priority: 0.8, changefreq: 'weekly'  },
  { url: '/voorbeeld-autodocumenten',    priority: 0.8, changefreq: 'weekly'  },
  { url: '/arac-belge-ornekleri',        priority: 0.8, changefreq: 'weekly'  },
  { url: '/namadhij-wathaiq-sayarat',    priority: 0.8, changefreq: 'weekly'  },
  { url: '/gaadi-agreement-format',      priority: 0.8, changefreq: 'weekly'  },
  { url: '/contoh-surat-kendaraan',      priority: 0.8, changefreq: 'weekly'  },
  { url: '/jidosha-keiyakusho-hinagata', priority: 0.8, changefreq: 'weekly'  },
  { url: '/jadongcha-gyeyakseo-yangsik', priority: 0.8, changefreq: 'weekly'  },
  { url: '/mau-hop-dong-xe',             priority: 0.8, changefreq: 'weekly'  },
  { url: '/baepfom-sanya-rot',           priority: 0.8, changefreq: 'weekly'  },
  { url: '/vehicles',                           priority: 0.8, changefreq: 'weekly'  },
  { url: '/tools',                              priority: 0.9, changefreq: 'weekly'  },
  { url: '/herramientas',                       priority: 0.9, changefreq: 'weekly'  },
  { url: '/tools/ai-mechanic',                  priority: 0.8, changefreq: 'monthly' },
  { url: '/herramientas/mecanico-virtual',              priority: 0.8, changefreq: 'monthly' },
  { url: '/herramientas/mejor-auto-para-ti',           priority: 0.8, changefreq: 'monthly' },
  { url: '/herramientas/comparador-de-autos',           priority: 0.8, changefreq: 'monthly' },
  { url: '/herramientas/analizador-de-ruidos-del-motor',                        priority: 0.8,  changefreq: 'monthly' },
  { url: '/herramientas/analizador-de-ruidos-del-motor/ruido-tic-tic-del-motor',     priority: 0.85, changefreq: 'monthly' },
  { url: '/herramientas/analizador-de-ruidos-del-motor/golpeteo-del-motor',          priority: 0.85, changefreq: 'monthly' },
  { url: '/herramientas/analizador-de-ruidos-del-motor/traqueteo-del-motor',         priority: 0.75, changefreq: 'monthly' },
  { url: '/adawat/mikaniki-iftiradi',            priority: 0.8, changefreq: 'monthly' },
  { url: '/adawat/mohallil-sawt-almuharrik', priority: 0.8, changefreq: 'monthly' },
  { url: '/adawat/mohallil-sawt-almuharrik/soat-taqtaqa-almuharrik', priority: 0.85, changefreq: 'monthly' },
  { url: '/adawat/mohallil-sawt-almuharrik/soat-tark-almuharrik', priority: 0.85, changefreq: 'monthly' },
  { url: '/adawat/mohallil-sawt-almuharrik/soat-khashkhasha-almuharrik', priority: 0.75, changefreq: 'monthly' },
  { url: '/adawat/fahs-raqm-alhaykal',            priority: 0.8, changefreq: 'monthly' },
  { url: '/outils/mecanicien-virtuel',            priority: 0.8, changefreq: 'monthly' },
  { url: '/outils/analyseur-de-bruit-moteur', priority: 0.8, changefreq: 'monthly' },
  { url: '/outils/analyseur-de-bruit-moteur/cliquetis-moteur', priority: 0.85, changefreq: 'monthly' },
  { url: '/outils/analyseur-de-bruit-moteur/cognement-moteur', priority: 0.85, changefreq: 'monthly' },
  { url: '/outils/analyseur-de-bruit-moteur/bruit-de-ferraille-moteur', priority: 0.75, changefreq: 'monthly' },
  { url: '/outils/combien-vaut-ma-voiture',       priority: 0.9, changefreq: 'weekly'  },
  { url: '/outils/decodeur-vin',                  priority: 0.8, changefreq: 'monthly' },
  { url: '/adawat/afdal-sayara-lak', priority: 0.8, changefreq: 'monthly' },
  { url: '/werkzeuge/bestes-auto-fuer-sie', priority: 0.8, changefreq: 'monthly' },
  { url: '/strumenti/migliore-auto-per-te', priority: 0.8, changefreq: 'monthly' },
  { url: '/gereedschappen/beste-auto-voor-jou', priority: 0.8, changefreq: 'monthly' },
  { url: '/upkaran/aapke-liye-sabse-achhi-car', priority: 0.8, changefreq: 'monthly' },
  { url: '/alat/mobil-terbaik-untukmu', priority: 0.8, changefreq: 'monthly' },
  { url: '/araclar/size-en-iyi-araba', priority: 0.8, changefreq: 'monthly' },
  { url: '/tsuru/anata-ni-saiteki-na-kuruma', priority: 0.8, changefreq: 'monthly' },
  { url: '/dogu/naege-gajang-joeun-cha', priority: 0.8, changefreq: 'monthly' },
  { url: '/cong-cu/xe-tot-nhat-cho-ban', priority: 0.8, changefreq: 'monthly' },
  { url: '/khrueang-mue/rot-thi-dithisut-samrap-khun', priority: 0.8, changefreq: 'monthly' },
  { url: '/outils/meilleure-voiture-pour-vous', priority: 0.8, changefreq: 'monthly' },
  { url: '/ferramentas/meu-mecanico-virtual',          priority: 0.8, changefreq: 'monthly' },
  { url: '/ferramentas/analisador-de-barulho-do-motor', priority: 0.8, changefreq: 'monthly' },
  { url: '/ferramentas/analisador-de-barulho-do-motor/barulho-de-tucho-batendo', priority: 0.85, changefreq: 'monthly' },
  { url: '/ferramentas/analisador-de-barulho-do-motor/motor-batendo', priority: 0.85, changefreq: 'monthly' },
  { url: '/ferramentas/analisador-de-barulho-do-motor/barulho-de-chocalho-no-motor', priority: 0.75, changefreq: 'monthly' },
  { url: '/ferramentas/quanto-vale-meu-carro',    priority: 0.9, changefreq: 'weekly'  },
  { url: '/ferramentas/decodificador-de-chassi',  priority: 0.8, changefreq: 'monthly' },
  { url: '/ferramentas/melhor-carro-para-voce', priority: 0.8, changefreq: 'monthly' },
  { url: '/werkzeuge/virtueller-mechaniker',           priority: 0.8, changefreq: 'monthly' },
  { url: '/werkzeuge/was-ist-mein-auto-wert',     priority: 0.9, changefreq: 'weekly'  },
  { url: '/werkzeuge/fahrgestellnummer-pruefen',  priority: 0.8, changefreq: 'monthly' },
  { url: '/tsuru/ai-shindan',                          priority: 0.8, changefreq: 'monthly' },
  { url: '/tsuru/kuruma-satei',                   priority: 0.9, changefreq: 'weekly'  },
  { url: '/tsuru/vin-code-shirabe',               priority: 0.8, changefreq: 'monthly' },
  { url: '/strumenti/meccanico-virtuale',               priority: 0.8, changefreq: 'monthly' },
  { url: '/strumenti/quanto-vale-la-mia-auto',     priority: 0.9, changefreq: 'weekly'  },
  { url: '/strumenti/verifica-numero-di-telaio',  priority: 0.8, changefreq: 'monthly' },
  { url: '/araclar/arabam-ne-kadar-eder',          priority: 0.9, changefreq: 'weekly'  },
  { url: '/araclar/sasi-numarasi-sorgulama',       priority: 0.8, changefreq: 'monthly' },
  { url: '/araclar/sanal-usta',                    priority: 0.8, changefreq: 'monthly' },
  { url: '/cong-cu/xe-cua-toi-dang-gia-bao-nhieu', priority: 0.9, changefreq: 'weekly'  },
  { url: '/cong-cu/tho-may-ao',                    priority: 0.8, changefreq: 'monthly' },
  { url: '/gereedschappen/virtuele-monteur',       priority: 0.8, changefreq: 'monthly' },
  { url: '/alat/montir-virtual',                   priority: 0.8, changefreq: 'monthly' },
  { url: '/khrueang-mue/mo-rot-ai',                priority: 0.8, changefreq: 'monthly' },
  { url: '/khrueang-mue/rot-khong-chan-rakha-thaorai', priority: 0.9, changefreq: 'weekly'  },
  { url: '/khrueang-mue/truat-sop-lek-tua-thang',  priority: 0.8, changefreq: 'monthly' },
  { url: '/alat/berapa-harga-mobil-saya', priority: 0.9, changefreq: 'weekly'  },
  { url: '/gereedschappen/wat-is-mijn-auto-waard', priority: 0.9, changefreq: 'weekly'  },
  { url: '/upkaran/aabhasi-mekanik',                priority: 0.8, changefreq: 'monthly' },
  { url: '/dogu/gasang-jeongbisa',                  priority: 0.8, changefreq: 'monthly' },
  { url: '/instrumenty/virtualnyy-mekhanik',         priority: 0.8, changefreq: 'monthly' },
  // /home-arabic, /adawat, /accueil, /outils, /pagina-inicial,
  // /ferramentas, /startseite, /werkzeuge, /homu, /tsuru, /inizio,
  // /strumenti, /ana-sayfa, /araclar, /na-lak, /beranda, /trang-chu,
  // /cong-cu, /khrueang-mue, /alat, /startpagina, /mukhya-prishtha,
  // /upkaran, /hom, /dogu, /glavnaya, /instrumenty intentionally NOT
  // added yet —
  // Arabic has 3
  // live tools (mikaniki-iftiradi, kam-qeemat-sayarati, fahs-raqm-alhaykal)
  // plus 4 distance calculators, French has 3 (mecanicien-virtuel,
  // combien-vaut-ma-voiture, decodeur-vin), Portuguese has 3
  // (meu-mecanico-virtual, quanto-vale-meu-carro, decodificador-de-chassi),
  // German has 3 (virtueller-mechaniker, was-ist-mein-auto-wert,
  // fahrgestellnummer-pruefen) plus entfernungsrechner-deutschland,
  // Japanese has 3 (ai-shindan, kuruma-satei, vin-code-shirabe), Italian
  // now has 3 (meccanico-virtuale, quanto-vale-la-mia-auto,
  // verifica-numero-di-telaio), Turkish now has 3 (arabam-ne-kadar-eder,
  // sasi-numarasi-sorgulama, sanal-usta), Vietnamese now has 2
  // (xe-cua-toi-dang-gia-bao-nhieu, tho-may-ao), Thai now has 3
  // (mo-rot-ai, rot-khong-chan-rakha-thaorai, truat-sop-lek-tua-thang),
  // Indonesian now has 2
  // (montir-virtual, berapa-harga-mobil-saya), and Dutch now has 3
  // (virtuele-monteur, wat-is-mijn-auto-waard,
  // afstandscalculator-nederland), all still under
  // the ~5-tool threshold used for /herramientas above. Hindi
  // (aabhasi-mekanik), Korean (gasang-jeongbisa), and Russian
  // (virtualnyy-mekhanik) each now have their first tool page — same
  // starting state Vietnamese/Thai/Indonesian/Dutch were in before their
  // second tool shipped. Add each
  // language's home + tools index once a handful more tool pages ship
  // in that language. /blog-arabic, /blog-auto, /blog-de-carros,
  // /autoblog, /kuruma-burogu, /blog-motori, /oto-blog, and the
  // Indonesian/Vietnamese/Dutch/Thai/Hindi/Korean/Russian blog indexes
  // held back for the same
  // reason as /blog-de-autos — zero posts published yet in any of
  // them.
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
  { url: '/tools/import-duty-calculator-india', priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/import-duty-calculator-uk', priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/import-duty-calculator-usa', priority: 0.7, changefreq: 'monthly' },
  { url: '/upkaran/car-aayat-shulk-calculator-bharat', priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/auto-loan-calculator',         priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/auto-loan-calculator-countries', priority: 0.8, changefreq: 'monthly' },
  { url: '/tools/auto-loan-calculator-usa',      priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/auto-loan-calculator-india',    priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/auto-loan-calculator-south-africa', priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/auto-loan-calculator-uk',        priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/auto-loan-calculator-ghana',     priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/auto-loan-calculator-canada',    priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/auto-loan-calculator-pakistan',  priority: 0.7, changefreq: 'monthly' },
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
  { url: '/werkzeuge/entfernungsrechner-deutschland', priority: 0.7, changefreq: 'monthly' },
  { url: '/werkzeuge/autokredit-rechner',              priority: 0.7, changefreq: 'monthly' },
  { url: '/herramientas/calculadora-de-credito-automotriz-mexico', priority: 0.7, changefreq: 'monthly' },
  { url: '/adawat/hasbat-tamwil-sayarat-alemarat', priority: 0.7, changefreq: 'monthly' },
  { url: '/calcolatore-di-distanza-italia',      priority: 0.7, changefreq: 'monthly' },
  { url: '/gereedschappen/afstandscalculator-nederland', priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-canada',    priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-australia', priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-india',     priority: 0.7, changefreq: 'monthly' },
  { url: '/tools/distance-calculator-philippines', priority: 0.7, changefreq: 'monthly' },
  { url: '/herramientas/calculadora-de-distancia-mexico', priority: 0.7, changefreq: 'monthly' },
  { url: '/herramientas/calculadora-de-distancia-argentina', priority: 0.7, changefreq: 'monthly' },
  { url: '/tsuru/kyori-keisan',                  priority: 0.7, changefreq: 'monthly' },
  { url: '/araclar/sehirler-arasi-mesafe',       priority: 0.7, changefreq: 'monthly' },
  { url: '/alat/jarak-antar-kota',               priority: 0.7, changefreq: 'monthly' },
  { url: '/instrumenty/kalkulyator-rasstoyaniy-mezhdu-gorodami', priority: 0.7, changefreq: 'monthly' },
  { url: '/dogu/dosi-gan-geori-gyesangi', priority: 0.7, changefreq: 'monthly' },
  { url: '/cong-cu/khoang-cach-giua-cac-thanh-pho', priority: 0.7, changefreq: 'monthly' },
  { url: '/khrueang-mue/khrueang-khamnuan-rayathang-rawang-mueang', priority: 0.7, changefreq: 'monthly' },
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