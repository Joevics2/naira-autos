import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import CalculadoraImportacionEspanaClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/herramientas/calculadora-importacion-coches-espana';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'Calculadora de importación de coches a España 2026 — Arancel, IVA e impuesto de matriculación',
  description: 'Calculadora gratuita para importar un coche a España: arancel del 10 %, IVA del 21 %, impuesto de matriculación (IEDMT) por emisiones de CO2 con depreciación de Hacienda, tasa DGT, Japón y EE. UU. al 0 %, eléctricos chinos. Actualizada en octubre de 2026.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'Calculadora de importación de coches a España | Naira Autos',
    description: 'Calcula arancel, IVA, impuesto de matriculación y tasa DGT para un coche importado a España.',
    url: URL, siteName: 'Naira Autos', locale: 'es_ES', type: 'website',
  },
  keywords: [
    'importar un coche a España coste', 'impuesto de matriculación 2026 coche importado', 'arancel coche fuera de la UE 10 %',
    'IVA importación coche 21 %', 'modelo 576 coche importado', 'importar coche de Estados Unidos a España 2026',
    'importar coche de Japón arancel 0', 'matricular coche alemán en España', 'depreciación Hacienda coche usado importado',
  ].join(', '),
};

const FAQ = [
  { q: '¿Qué impuestos se pagan al importar un coche a España?', a: 'Si el coche viene de fuera de la Unión Europea, se paga un arancel del 10 % sobre el valor en aduana (precio, flete y seguro hasta la frontera de la UE) y después el IVA del 21 % sobre ese valor más el arancel. Además, al matricular se liquida el impuesto de matriculación (IEDMT) según las emisiones de CO2 y la tasa de la DGT de 99,77 euros. Un coche comprado en otro país de la UE no paga arancel.' },
  { q: '¿Cuánto se paga de impuesto de matriculación?', a: 'Depende de las emisiones oficiales de CO2 de la ficha técnica: 0 % hasta 120 g/km inclusive, 4,75 % por encima de 120 y por debajo de 160, 9,75 % desde 160 y por debajo de 200, y 14,75 % desde 200 g/km. Los límites son literales: 120 exactos están exentos y 160 exactos ya pagan el 9,75 %. Un coche sin emisiones acreditadas tributa al tipo más alto.' },
  { q: '¿Es cierto que importar cuesta un 23,2 % del valor del coche?', a: 'No. Varias guías repiten esa cifra, pero con un arancel del 10 % y un IVA del 21 % calculado sobre el valor más el arancel, el total es del 33,1 % del valor en aduana, antes del impuesto de matriculación y la tasa de la DGT. El calculador usa la fórmula completa.' },
  { q: '¿Cómo calcula Hacienda la base del impuesto de matriculación de un usado?', a: 'Toma el precio medio del modelo que publica cada año la Orden de precios medios de venta (para 2026, la Orden HAC/1501/2025), le aplica un porcentaje de depreciación según los años de uso, del 100 % hasta un año al 10 % después de doce, y si el coche ya estuvo matriculado en el extranjero resta los impuestos indirectos residuales dividiendo entre uno más el IVA y el tipo del impuesto. Por eso el precio que pagaste no es necesariamente la base.' },
  { q: '¿Una comunidad autónoma puede cambiar el tipo del impuesto?', a: 'Sí. Las comunidades de régimen común pueden aumentar los tipos hasta un 15 % como máximo. Una guía señala que Andalucía, Cataluña, Asturias, Baleares, la Comunidad Valenciana, Murcia y Cantabria suben el tramo más alto, entre el 15 % y el 16,9 %, pero otra fuente discrepa en el caso de Andalucía, así que el calculador te deja introducir el tipo de tu comunidad y conviene confirmarlo en el modelo 576.' },
  { q: '¿Un coche estadounidense paga todavía el 10 % de arancel?', a: 'No necesariamente. Desde el 1 de julio de 2026, el Reglamento (UE) 2026/1455 elimina los aranceles de los productos industriales de origen estadounidense, lo que permite un 0 % para un coche fabricado en Estados Unidos si se acredita el origen y el transporte directo. Un coche europeo comprado en Estados Unidos mantiene el 10 %. El IVA del 21 % se paga en cualquier caso.' },
  { q: '¿Y los coches de Japón o Corea del Sur?', a: 'Los coches japoneses tienen un 0 % desde el 1 de febrero de 2026, cuando termina la reducción gradual del acuerdo de asociación UE-Japón, con prueba de origen. Los coreanos están al 0 % por el acuerdo de libre comercio, también con prueba de origen. Sin documento válido se aplica el 10 %.' },
  { q: '¿Tengo que pagar IVA por un coche comprado en otro país de la UE?', a: 'Solo si es nuevo a efectos fiscales: menos de 6 meses de antigüedad o menos de 6.000 kilómetros. En ese caso el IVA del 21 % se paga en España, incluso si compras a un particular. Un usado que supera ambos límites y que ya tributó en el país del vendedor no paga IVA español. El impuesto de matriculación se paga siempre.' },
  { q: '¿Los coches eléctricos pagan el impuesto de matriculación?', a: 'Un coche con 0 g/km de emisiones queda exento, y también los híbridos enchufables cuya ficha técnica indica 120 g/km o menos. En cambio, un eléctrico chino paga a su entrada en la UE el arancel del 10 % más un derecho compensatorio de entre el 7,8 % y el 35,3 % según el fabricante, salvo que se acepte un compromiso de precios.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'Calculadora de importación de coches a España — arancel, IVA e impuesto de matriculación',
      description: 'Calculadora gratuita de arancel, IVA, impuesto de matriculación y tasa DGT para un coche importado a España.',
      url: URL, inLanguage: 'es-ES', dateModified: '2026-10-14',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Fundador', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.naira.autos/inicio' },
          { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://www.naira.autos/herramientas' },
          { '@type': 'ListItem', position: 3, name: 'Calculadora de importación de coches a España', item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', inLanguage: 'es-ES', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'SoftwareApplication', name: 'Calculadora de importación de coches a España', inLanguage: 'es-ES', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';

export default function CalculadoraImportacionCochesEspanaPage() {
  return (
    <div lang="es">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link prefetch={false} href="/herramientas" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Volver">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Migas de pan" className="flex items-center gap-1.5 text-xs text-white/30 flex-wrap">
              <Link prefetch={false} href="/inicio" className="hover:text-white/60 transition-colors">Inicio</Link>
              <ChevronRight className="h-3 w-3" />
              <Link prefetch={false} href="/herramientas" className="hover:text-white/60 transition-colors">Herramientas</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇪🇸 Calculadora de importación</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100 % gratis</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">IEDMT con depreciación de Hacienda</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Verificado: octubre de 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Importar un coche<br /><span className="text-emerald-400">a España</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">¿Cuánto cuesta de verdad matricular un coche importado?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Elige el origen, el estado y las emisiones del vehículo y obtén el arancel, el IVA, el impuesto de matriculación con su depreciación y la tasa de la DGT.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Solo una estimación.</strong> Calcula para la Península y Baleares. Hacienda puede comprobar la base del impuesto de matriculación con sus tablas, y las comunidades autónomas pueden subir el tipo. Confirma el importe en el modelo 576 de la Agencia Tributaria antes de comprar.
          </p>
        </div>
      </div>

      <CalculadoraImportacionEspanaClient />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>Arancel, IVA e impuesto de matriculación: cómo se forma el coste</h2>
            <p className={`${p} mb-6 max-w-3xl`}>
              Importar un coche a España suma tres capas de costes. La primera es aduanera: ningún arancel dentro de la Unión Europea y un 10 % del valor en aduana para un vehículo de un país tercero, salvo que un acuerdo comercial con prueba de origen lo rebaje a cero. La segunda es el IVA del 21 %, calculado sobre el valor en aduana más el arancel. La tercera es propia de España: el impuesto de matriculación, que se paga una sola vez y depende de las emisiones de CO2, más la tasa de la DGT de 99,77 euros. El calculador suma todo en el orden en que lo aplica la administración.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Arancel (fuera de la UE)', rate: '10 %', base: 'sobre el valor en aduana', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'IVA a la importación', rate: '21 %', base: 'valor en aduana + arancel', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
                { label: 'Japón, Corea, EE. UU.', rate: '0 %', base: 'arancel, con prueba de origen', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
                { label: 'IEDMT por CO2', rate: '0–14,75 %', base: 'cuatro tramos de emisiones', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
              ].map(({ label, rate, base, color, bg, border }) => (
                <div key={label} className={`p-5 rounded-2xl ${bg} border ${border}`}>
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className={`text-3xl font-black ${color}`} style={heading}>{rate}</p>
                  <p className="text-xs text-muted-foreground mt-1">{base}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Novedades de 2025 y 2026</h2>
                <div className="space-y-3">
                  <p className={p}><strong className="text-foreground">Tramos del IEDMT:</strong> no han cambiado en 2026. Hasta 120 g/km el tipo es 0 %, de más de 120 a menos de 160 es 4,75 %, de 160 a menos de 200 es 9,75 % y desde 200 g/km es 14,75 %. Los coches sin emisiones acreditadas, como muchos modelos de fuera de Europa, pagan el 14,75 %.</p>
                  <p className={p}><strong className="text-foreground">Tablas de Hacienda:</strong> la Orden HAC/1501/2025 actualiza para 2026 los precios medios de los usados, identifica por separado los híbridos enchufables y mantiene la tabla de depreciación de siempre.</p>
                  <p className={p}><strong className="text-foreground">Estados Unidos:</strong> desde el 1 de julio de 2026, el Reglamento (UE) 2026/1455 elimina los aranceles de los productos industriales de origen estadounidense. Para un coche hay que probar la fabricación en Estados Unidos y el transporte directo.</p>
                  <p className={p}><strong className="text-foreground">Japón:</strong> la rebaja gradual del arancel de los coches japoneses termina el 1 de febrero de 2026, con un 0 % bajo declaración de origen.</p>
                  <p className={p}><strong className="text-foreground">China:</strong> los eléctricos chinos pagan el 10 % más un derecho compensatorio: BYD 17 %, Geely 18,8 %, SAIC 35,3 %, Tesla Shanghái 7,8 %. En febrero de 2026 se aceptó el primer compromiso de precios, para el Cupra Tavascan.</p>
                  <p className={p}><strong className="text-foreground">Reino Unido:</strong> los coches británicos entran al 0 % con prueba de origen. Para los eléctricos se prevén reglas de origen más estrictas desde el 1 de enero de 2027.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Ejemplo 1: coche nuevo de los Emiratos, sin acuerdo</h2>
                <p className={p}>Un coche cuesta 20.000 € con 1.500 € de flete y seguro. El valor en aduana es 21.500 € y el arancel del 10 % son 2.150 €. El IVA del 21 % se calcula sobre 23.650 € y suma 4.966,50 €. Con 140 g/km, el impuesto de matriculación del 4,75 % sobre 23.650 € son 1.123,38 €. Arancel e IVA suponen el 33,1 % del valor en aduana, no el 23,2 % que repiten algunas guías.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Ejemplo 2: coche japonés con y sin prueba de origen</h2>
                <p className={p}>Un coche de 15.000 € con 1.200 € de flete tiene un valor en aduana de 16.200 €. Con la declaración de origen no hay arancel y el IVA son 3.402 €. Sin el documento, el arancel de 1.620 € eleva la base del IVA a 17.820 € y el IVA a 3.742,20 €. Esa sola hoja de papel cuesta 1.960,20 €. Con 110 g/km, el impuesto de matriculación es cero en ambos casos.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Ejemplo 3: usado alemán de tres años</h2>
                <p className={p}>Un coche comprado por 26.000 € en Alemania, con 138 g/km y tres años de uso, cuyo precio medio de Hacienda es 42.000 €. La depreciación de tres años es del 67 %, así que el valor de mercado es 28.140 €. Al venir matriculado en el extranjero, la base es 28.140 € entre 1,2575 (uno más el IVA del 21 % y el tipo del 4,75 %), es decir 22.377,73 €. El impuesto es 1.062,94 €. No hay IVA español porque ya no es un coche nuevo.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Ejemplo 4: SUV nuevo comprado en la UE</h2>
                <p className={p}>Un SUV nuevo de 40.000 € emite 171 g/km. Paga IVA español del 21 %, que son 8.400 €, y el tipo del 9,75 % del impuesto de matriculación, que son 3.900 €. Los impuestos suman 12.300 € antes de la tasa de la DGT. Tres gramos menos de CO2, por debajo de 160 g/km, habrían reducido el impuesto a la mitad.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Ejemplo 5: eléctrico chino de BYD</h2>
                <p className={p}>Por 30.000 € con 1.500 € de flete, el valor en aduana es 31.500 €. El arancel del 10 % son 3.150 € y el derecho compensatorio del 17 % son 5.355 €. El IVA del 21 % sobre 40.005 € son 8.401,05 €. Juntos suman 16.906,05 €, cerca del 54 % del valor en aduana. El impuesto de matriculación es cero.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Paso a paso: importar un coche a España</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Consigue la ficha técnica o el certificado de conformidad, la factura y el permiso de circulación extranjero. Anota las emisiones de CO2.</li>
                  <li>Comprueba el país de fabricación y pide la prueba de origen si un acuerdo reduce el arancel a cero.</li>
                  <li>Fuera de la UE, presenta el despacho de aduanas y paga arancel e IVA. En la UE, paga el IVA si el coche es nuevo.</li>
                  <li>Liquida el impuesto de matriculación con el modelo 576 en la Agencia Tributaria, antes de matricular.</li>
                  <li>Pasa la inspección técnica de importación, obtén la ficha ITV y solicita la matriculación en la DGT con la tasa de 99,77 €.</li>
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>Errores frecuentes</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Creer que el impuesto de matriculación se calcula sobre el precio pagado. En un usado se parte del precio medio de Hacienda depreciado.</li>
                  <li>Olvidar que el IVA se calcula también sobre el arancel.</li>
                  <li>Contar con el 0 % sin prueba de origen o sin transporte directo desde Estados Unidos.</li>
                  <li>Comprar un coche sin homologación europea sin presupuestar la homologación individual, que además se trata como emisiones no acreditadas.</li>
                  <li>Ignorar que el tipo del impuesto lo pueden subir las comunidades autónomas.</li>
                  <li>Dar por hecho que un usado de la UE nunca lleva IVA: si tiene menos de 6 meses o menos de 6.000 km, se considera nuevo.</li>
                </ul>
              </div>
              <div>
                <h2 className={h2} style={heading}>Lo que la calculadora no cubre</h2>
                <p className={p}>No cubre Canarias, Ceuta ni Melilla, que tienen un régimen fiscal distinto, ni los vehículos históricos, los traslados de residencia con franquicia, las exenciones por discapacidad o familia numerosa, las motos ni los vehículos comerciales. Tampoco calcula el seguro, las matrículas, el impuesto municipal de circulación, las ayudas del Plan Moves ni la posible zona de bajas emisiones de tu ciudad. Si tu coche tiene más de doce años, la depreciación mínima del 10 % es un suelo, no una estimación del mercado.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={heading}>Preguntas frecuentes</h2>
            <div className="space-y-3 max-w-3xl">
              {FAQ.map((f) => (
                <details key={f.q} className="group rounded-xl border border-border bg-card px-4 py-3">
                  <summary className="cursor-pointer text-sm font-semibold text-foreground list-none">{f.q}</summary>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Revisado por <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Fundador. Fuentes: Ley 38/1992 de Impuestos Especiales (artículos 65 a 70), Orden HAC/1501/2025 de precios medios de venta para 2026 y su anexo IV, Ley 22/2009, Agencia Tributaria (modelo 576), sede electrónica de la DGT, arancel aduanero común de la UE (TARIC), Reglamento (UE) 2026/1455, Reglamento de Ejecución (UE) 2024/2754, acuerdo de asociación UE-Japón y acuerdo de comercio y cooperación UE-Reino Unido. Última verificación: octubre de 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
