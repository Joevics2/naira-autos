import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import CalculadoraImportacionColombiaClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/herramientas/calculadora-importacion-carros-colombia';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'Calculadora de importación de carros a Colombia 2026 — Arancel, IVA e impuesto al consumo',
  description: 'Calculadora gratuita para importar un carro nuevo a Colombia: arancel de 40 % para gasolina y diésel desde 2026, IVA de 19 %, impuesto al consumo de 8 % o 16 %, eléctricos con arancel 0 %, TLC con Estados Unidos. Resultado en pesos y dólares.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'Calculadora de importación de carros a Colombia | Naira Autos',
    description: 'Calcula arancel, IVA e impuesto al consumo de un carro importado a Colombia.',
    url: URL, siteName: 'Naira Autos', locale: 'es_CO', type: 'website',
  },
  keywords: [
    'importar carro a Colombia costo 2026', 'arancel 40 carros gasolina Colombia', 'impuesto al consumo 8 16 vehículos importados',
    'IVA carro importado 19', 'importar carro eléctrico Colombia arancel 0', 'importar carro de Estados Unidos a Colombia TLC',
    'decreto 1432 de 2025 arancel vehículos', 'cupo híbridos arancel 5 decreto 595 de 2026', 'importar carro usado Colombia prohibido',
  ].join(', '),
};

const FAQ = [
  { q: '¿Qué impuestos paga un carro importado a Colombia?', a: 'Tres tributos sobre el valor CIF: el arancel, el IVA de 19 % calculado sobre el CIF más el arancel y el impuesto nacional al consumo, que es de 8 % si el valor FOB es menor a US$30.000 y de 16 % desde US$30.000. Los carros eléctricos de batería pagan arancel 0 %, IVA de 5 % y no pagan impuesto al consumo. Al valor se suman la agencia de aduanas, el flete y la matrícula.' },
  { q: '¿El arancel de los carros de gasolina es de 35 % o de 40 %?', a: 'Es de 40 % para carros de gasolina y diésel de países sin TLC. El Decreto 1432 del 24 de diciembre de 2025 subió el arancel de 35 % a 40 % para 13 subpartidas de vehículos de combustión y empezó a regir en enero de 2026. Varias guías todavía lo muestran como un borrador o repiten el 35 %, y por eso la calculadora usa 40 % y te deja cambiarlo.' },
  { q: '¿Se puede importar un carro usado a Colombia?', a: 'Por regla general no. La norma andina y la Ley 769 de 2002 impiden el registro inicial de carros usados, y solo se admiten vehículos nuevos del año modelo en que se importan o del siguiente. Las excepciones son los clásicos de 35 años o más, los vehículos adaptados para personas con discapacidad y los casos diplomáticos. Una guía afirma que se pueden importar usados de hasta 10 años, pero no cita una norma y contradice a las demás fuentes.' },
  { q: '¿Qué carros pagan arancel 0 %?', a: 'Los eléctricos de batería importados terminados pagan 0 % sin límite de unidades desde el Decreto 2051 de 2019, sin importar su origen. Un carro ensamblado en Estados Unidos con certificado de origen paga 0 % por el TLC. Otros TLC, como los de Corea, la Unión Europea o México, tienen sus propios cronogramas, así que debes ingresar el arancel preferente que corresponda a tu subpartida.' },
  { q: '¿Qué pasa con los híbridos?', a: 'Pagan el arancel general de 35 % y, por una sola fuente, IVA de 5 %. El Decreto 0595 de 2026 abrió un cupo de 20.000 unidades para 2026 y otras 20.000 para 2027 con arancel de 5 %, no acumulables entre años. Si obtienes ese cupo, escribe 5 en el campo de arancel propio. Si tu subpartida paga IVA de 19 %, corrígelo en el campo de IVA.' },
  { q: '¿Por qué un carro de US$30.000 cuesta mucho más de impuestos que uno de US$29.900?', a: 'Porque el impuesto al consumo salta de 8 % a 16 % cuando el valor FOB llega a US$30.000. Para un carro de gasolina de un país sin TLC, pasar de FOB de US$29.900 a US$30.100 aumenta los tributos de US$24.429,20 a US$28.124 con US$1.500 de flete. Declara siempre el valor real pagado: la DIAN puede verificarlo y sanciona la subvaloración.' },
  { q: '¿Sobre qué valor se calculan el IVA y el impuesto al consumo?', a: 'Sobre el valor CIF más el arancel. El FOB solo sirve para decidir si el impuesto al consumo es de 8 % o de 16 %. Algunas guías parecen aplicar el impuesto al consumo sobre el CIF sin arancel, pero los ejemplos que cuadran con las tarifas oficiales usan la misma base para el IVA y para el consumo.' },
  { q: '¿Qué gastos no incluye la calculadora?', a: 'No incluye los honorarios de la agencia de aduanas, el visto bueno ambiental de la ANLA, la homologación, la matrícula en el RUNT, el SOAT, el impuesto vehicular anual ni el seguro del trayecto. Agrégalos en el campo de otros gastos en pesos.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'Calculadora de importación de carros a Colombia — arancel, IVA e impuesto al consumo',
      description: 'Calculadora gratuita de arancel, IVA e impuesto al consumo para un carro nuevo importado a Colombia.',
      url: URL, inLanguage: 'es-CO', dateModified: '2026-11-18',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Fundador', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.naira.autos/inicio' },
          { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://www.naira.autos/herramientas' },
          { '@type': 'ListItem', position: 3, name: 'Calculadora de importación de carros a Colombia', item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', inLanguage: 'es-CO', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'SoftwareApplication', name: 'Calculadora de importación de carros a Colombia', inLanguage: 'es-CO', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'COP' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';

export default function CalculadoraImportacionCarrosColombiaPage() {
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
              <span className="text-white/50">🇨🇴 Calculadora de importación</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100 % gratis</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Arancel de 40 % desde 2026</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Verificado: noviembre de 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Importar un carro<br /><span className="text-emerald-400">a Colombia</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">¿Cuántos impuestos se pagan de verdad por un carro importado?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Elige la motorización y el origen, escribe el precio FOB y el flete, y obtén el arancel, el IVA y el impuesto al consumo en pesos y en dólares.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Solo una estimación.</strong> Los aranceles de los vehículos cambiaron por decreto en 2025 y 2026 y muchas guías en línea están desactualizadas. Confirma la subpartida, el arancel y el cupo con un agente de aduanas antes de comprar.
          </p>
        </div>
      </div>

      <CalculadoraImportacionColombiaClient />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>Arancel, IVA e impuesto al consumo: cómo se forma el costo</h2>
            <p className={`${p} mb-6 max-w-3xl`}>
              Importar un carro nuevo a Colombia suma tres tributos que se calculan en orden. Primero el arancel, que depende de la motorización y del origen y se aplica sobre el valor CIF, es decir, el precio FOB más el flete y el seguro. Luego el IVA de 19 %, que se calcula sobre el CIF más el arancel. Por último el impuesto nacional al consumo, que usa la misma base y vale 8 % cuando el FOB es menor a US$30.000 y 16 % desde US$30.000. Los eléctricos de batería quedan casi libres: arancel 0 %, IVA de 5 % y sin impuesto al consumo. El resultado típico de un carro de gasolina de un país sin TLC es que los tributos superan el 75 % del valor CIF.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Arancel gasolina o diésel', rate: '40 %', base: 'sin TLC, desde enero de 2026', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'IVA', rate: '19 %', base: 'sobre CIF + arancel', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
                { label: 'Impuesto al consumo', rate: '8 % o 16 %', base: 'según FOB menor o mayor a US$30.000', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'Eléctricos de batería', rate: '0 %', base: 'arancel, con IVA de 5 %', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
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
                <h2 className={h2} style={heading}>Qué cambió en 2025 y 2026</h2>
                <div className="space-y-3">
                  <p className={p}><strong className="text-foreground">Arancel de 40 %:</strong> el Decreto 1432 del 24 de diciembre de 2025 modifica el artículo 10 del Decreto 1881 de 2021 y sube a 40 % el arancel de 13 subpartidas de carros de gasolina y diésel. Empezó a regir 15 días después de su publicación, en enero de 2026. Las motos de combustión pasaron a 35 % desde el 1 de abril de 2026.</p>
                  <p className={p}><strong className="text-foreground">Cupo para híbridos:</strong> el Decreto 0595 de 2026 abre 20.000 cupos con arancel de 5 % para vehículos electrificados terminados en 2026 y otros 20.000 en 2027, no acumulables entre años.</p>
                  <p className={p}><strong className="text-foreground">Eléctricos:</strong> el arancel de 0 % para eléctricos de batería sigue vigente sin límite de unidades según el Decreto 2051 de 2019. Para un particular que importa un eléctrico nuevo, el IVA y los demás costos se aplican como en cualquier otra importación.</p>
                  <p className={p}><strong className="text-foreground">Estados Unidos:</strong> el TLC permite arancel de 0 % solo para carros ensamblados en EE. UU. con certificado de origen. El mismo modelo ensamblado en Japón, México o Alemania paga el arancel general.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Ejemplo 1: carro de gasolina de Japón, sin TLC</h2>
                <p className={p}>Un carro cuesta US$20.000 FOB y el flete con seguro suma US$1.500, así que el CIF es US$21.500. El arancel de 40 % son US$8.600. El IVA de 19 % sobre US$30.100 son US$5.719 y el impuesto al consumo de 8 %, porque el FOB es menor a US$30.000, son US$2.408. Los tributos suman US$16.727, el 77,8 % del CIF.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Ejemplo 2: cuánto cuesta una guía desactualizada</h2>
                <p className={p}>Con el mismo carro y el arancel viejo de 35 %, el arancel es US$7.525, el IVA US$5.514,75 y el consumo US$2.322, para un total de US$15.361,75. La diferencia con el arancel vigente es de US$1.365,25 que una guía desactualizada no te anticipa.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Ejemplo 3: SUV ensamblado en Estados Unidos</h2>
                <p className={p}>Un SUV de US$35.000 FOB con US$2.000 de flete tiene un CIF de US$37.000. Con certificado de origen el arancel es cero, el IVA de 19 % son US$7.030 y el consumo de 16 %, por ser el FOB de US$30.000 o más, son US$5.920. Los tributos suman US$12.950, el 35 % del CIF.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Ejemplo 4: eléctrico de batería</h2>
                <p className={p}>Un eléctrico de US$30.000 FOB con US$2.000 de flete tiene un CIF de US$32.000. No paga arancel ni impuesto al consumo, y el IVA de 5 % son US$1.600, apenas el 5 % del CIF. Frente a los US$16.727 del ejemplo de gasolina, la diferencia es enorme.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Ejemplo 5: híbrido con y sin cupo</h2>
                <p className={p}>Un híbrido de US$25.000 FOB con US$1.500 de flete tiene un CIF de US$26.500. Con el arancel general de 35 % son US$9.275, y con IVA de 5 % y consumo de 8 % los tributos suman US$13.925,75. Con el cupo de arancel de 5 %, el arancel baja a US$1.325 y los tributos a US$4.942,25, un ahorro de US$8.983,50.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Ejemplo 6: el salto de los US$30.000</h2>
                <p className={p}>Un carro de gasolina con FOB de US$29.900 y US$1.500 de flete paga US$24.429,20 de tributos, con impuesto al consumo de 8 %. Con FOB de US$30.100 el consumo salta a 16 % y los tributos suben a US$28.124. Son US$3.694,80 más por US$200 de diferencia en el precio.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Paso a paso: importar un carro a Colombia</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Confirma que el carro es nuevo y de año modelo en curso o siguiente, y averigua la subpartida arancelaria y el país de ensamble.</li>
                  <li>Si quieres arancel preferente, consigue el certificado de origen antes de embarcar.</li>
                  <li>Tramita el visto bueno ambiental de la ANLA y la homologación, si aplican a tu vehículo.</li>
                  <li>Contrata una agencia de aduanas para presentar la declaración de importación ante la DIAN.</li>
                  <li>Paga arancel, IVA e impuesto al consumo, y nacionaliza el carro.</li>
                  <li>Matricula el vehículo en el RUNT y contrata el SOAT.</li>
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>Errores frecuentes</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Usar el arancel de 35 % para un carro de gasolina o diésel de un país sin TLC cuando ya es de 40 %.</li>
                  <li>Pensar que un carro comprado en Estados Unidos paga 0 %: solo cuenta el país de ensamble.</li>
                  <li>Calcular el IVA sobre el FOB y no sobre el CIF más el arancel.</li>
                  <li>Ignorar el salto del impuesto al consumo al llegar a US$30.000 de FOB.</li>
                  <li>Querer importar un carro usado sin una de las excepciones legales.</li>
                  <li>Dejar fuera la agencia de aduanas, la ANLA, la homologación y la matrícula del presupuesto.</li>
                </ul>
              </div>
              <div>
                <h2 className={h2} style={heading}>Lo que la calculadora no cubre</h2>
                <p className={p}>La calculadora no cubre carros usados, clásicos de 35 años o más, vehículos para personas con discapacidad, vehículos diplomáticos ni importaciones temporales. Tampoco calcula los cronogramas de desgravación de cada TLC, así que el arancel preferente lo ingresas tú, ni motos, camionetas de carga o vehículos comerciales. No incluye honorarios de agencia, ANLA, homologación, matrícula, SOAT ni el impuesto vehicular. El IVA de 5 % para híbridos viene de una sola fuente, por eso puedes cambiarlo.</p>
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
            Revisado por <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Fundador. Fuentes: Decreto 1432 de 2025 del Ministerio de Comercio, Industria y Turismo, Decreto 1881 de 2021 (Arancel de Aduanas), Decreto 0595 de 2026, Decreto 2051 de 2019, Ley 1819 de 2016 (impuesto nacional al consumo), Ley 769 de 2002, DIAN, TLC Colombia-Estados Unidos y guías de importadores que se citan solo para confirmar tarifas. Última verificación: noviembre de 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
