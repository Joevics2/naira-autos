import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import ImportacionAutosMexicoClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/herramientas/calculadora-importacion-autos-mexico';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'Calculadora de Importación de Autos a México 2026 — Arancel, IVA y DTA',
  description: 'Calculadora gratuita para importar un auto a México en 2026: arancel de 10 % o 1 % para usados según el decreto, hasta 50 % para autos nuevos de países sin tratado, IVA de 16 %, DTA y requisitos de antigüedad. Actualizada en octubre de 2026.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'Calculadora de Importación de Autos a México | Naira Autos',
    description: 'Calcula arancel, IVA, DTA y costo total para importar un auto usado o nuevo a México.',
    url: URL, siteName: 'Naira Autos', locale: 'es_MX', type: 'website',
  },
  keywords: [
    'calculadora importación autos méxico', 'cuánto cuesta importar un auto a méxico 2026', 'decreto importación vehículos usados 2026',
    'arancel autos usados méxico 10%', 'franja fronteriza arancel 1% autos', 'autos chocolate 2026', 'arancel 50% autos china méxico',
    'impuestos importar auto de estados unidos', 'dta iva importación vehículo',
  ].join(', '),
};

const FAQ = [
  { q: '¿Cuánto cuesta importar un auto usado a México en 2026?', a: 'Con el decreto vigente hasta el 30 de noviembre de 2026, el arancel es de 10 % para autos con ocho o más años de antigüedad en el resto del país, y de 1 % en la franja fronteriza para autos de cinco a nueve años. A eso se suman el DTA de 8 al millar y el IVA de 16 % sobre valor, arancel y DTA. En total los impuestos rondan entre 18 % y 29 % del valor del auto.' },
  { q: '¿Siguen existiendo los autos chocolate?', a: 'El programa de regularización de 2022 solo cubría vehículos que ya estaban en el país antes del 19 de octubre de 2021 y ya concluyó. Hoy quien quiera traer un auto usado de procedencia extranjera debe hacerlo mediante la importación definitiva bajo el decreto de 2024, renovado en noviembre de 2025, pagando arancel e impuestos.' },
  { q: '¿Qué autos usados puedo importar?', a: 'El Número de Identificación Vehicular debe corresponder a fabricación o ensamble en México, Estados Unidos o Canadá. En el resto del país la antigüedad mínima es de ocho años de año-modelo, y en la franja fronteriza de cinco. Un auto japonés o alemán usado, aunque lo compres en Estados Unidos, no entra bajo este decreto.' },
  { q: '¿Qué cambió el 1 de enero de 2026 para los autos nuevos?', a: 'México aprobó aranceles de entre 5 % y 50 % sobre más de mil fracciones arancelarias de países sin tratado de libre comercio, entre ellos China, India, Corea del Sur, Tailandia e Indonesia. Para autos ligeros, el arancel general de 20 % subió hasta 50 %. Los vehículos originarios de Estados Unidos y Canadá con certificado T-MEC conservan arancel de 0 %.' },
  { q: '¿Cómo se calcula el IVA al importar un auto?', a: 'El IVA de 16 % se aplica sobre el valor en aduana más el arancel y el DTA. Eso significa que pagas impuesto sobre el impuesto: con un arancel de 10 %, el IVA efectivo sobre el precio del auto es cercano a 18 %. Si el valor en aduana es de 150,000 pesos, el IVA es de 26,592 pesos.' },
  { q: '¿Qué es el DTA?', a: 'El Derecho de Trámite Aduanero es una cuota que cobra la aduana por el uso de sus sistemas, normalmente de 8 al millar (0.8 %) del valor en aduana. En algunos casos con certificado de origen T-MEC aplica una cuota fija menor. El calculador te permite editar el porcentaje.' },
  { q: '¿Necesito un agente aduanal?', a: 'Sí. La importación definitiva requiere un agente aduanal autorizado que presente el pedimento. Además debes contar con el título de propiedad original, baja de placas del país de origen, comprobante de domicilio, inscripción en el REPUVE y cumplir las condiciones físicas, mecánicas y ambientales que pide la norma.' },
  { q: '¿Se paga ISAN al importar un auto?', a: 'El Impuesto sobre Automóviles Nuevos se calcula con una tarifa por rangos de precio y puede aplicar a autos nuevos y a modelos recientes. Para vehículos usados de varios años de antigüedad suele resultar en cero, pero las fuentes difieren, por eso la calculadora no lo incluye y conviene que lo confirmes con tu agente aduanal.' },
  { q: '¿Qué pasa con la importación temporal?', a: 'Si solo visitas México, puedes ingresar tu auto de forma temporal sin pagar arancel ni IVA. El permiso para turistas dura 180 días y los residentes temporales pueden obtener plazos mayores. El auto conserva placas extranjeras, no puede venderse en México y debe salir antes de que venza el permiso.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'Calculadora de Importación de Autos a México — Arancel, IVA y DTA',
      description: 'Calculadora gratuita de arancel, IVA, DTA y costo total para importar autos usados o nuevos a México.',
      url: URL, inLanguage: 'es-MX', dateModified: '2026-10-09',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Fundador', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.naira.autos/inicio' },
          { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://www.naira.autos/herramientas' },
          { '@type': 'ListItem', position: 3, name: 'Importación de autos a México', item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', inLanguage: 'es-MX', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'SoftwareApplication', name: 'Calculadora de Importación de Autos a México', inLanguage: 'es-MX', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'MXN' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';

export default function CalculadoraImportacionAutosMexicoPage() {
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
              <span className="text-white/50">🇲🇽 Importación de autos a México</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100 % gratis</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Decreto vigente hasta 30-nov-2026</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Verificado: octubre 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Calculadora de Importación<br /><span className="text-emerald-400">de Autos a México</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">¿Cuánto cuesta realmente traer un auto a México?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Elige si es usado o nuevo, la antigüedad y el origen, y obtén arancel, DTA, IVA y el costo total, con las reglas de la franja fronteriza y los nuevos aranceles de 2026.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Solo una estimación.</strong> El decreto de autos usados se renueva cada año y varios sitios aún publican cifras anteriores. Confirma antigüedad, origen del NIV y tarifas con un agente aduanal antes de comprar.
          </p>
        </div>
      </div>

      <ImportacionAutosMexicoClient />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>¿Cuánto cuesta importar un auto a México en 2026?</h2>
            <p className={`${p} mb-6 max-w-3xl`}>
              El costo de importar un auto a México depende de tres decisiones: si es usado o nuevo, qué antigüedad tiene y en qué país se fabricó. Para los usados, un decreto presidencial fija un arancel bajo, de 1 % o 10 %, y exime del certificado de origen. Para los nuevos, el arancel va de 0 % con T-MEC hasta 50 % si el auto viene de un país sin tratado. En ambos casos se suman el Derecho de Trámite Aduanero y el IVA de 16 %, que se calcula también sobre el arancel. La calculadora aplica estos pasos en el orden que usa la aduana.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Usados (resto del país)', rate: '10 %', base: '8 años o más', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'Usados en la frontera', rate: '1 %', base: 'de 5 a 9 años', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'Nuevos sin tratado', rate: '50 %', base: 'China, India, Corea…', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
                { label: 'IVA', rate: '16 %', base: 'sobre valor + arancel + DTA', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
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
                <h2 className={h2} style={heading}>Autos usados: el decreto vigente hasta el 30 de noviembre de 2026</h2>
                <div className="space-y-3">
                  <p className={p}>La Secretaría de Hacienda confirmó el 5 de enero de 2026 que la importación definitiva de vehículos usados sigue disponible al amparo del decreto publicado el 4 de noviembre de 2024 y renovado el 5 de noviembre de 2025, con vigencia hasta el 30 de noviembre de 2026. Ya no existe la regularización de los llamados autos chocolate: el decreto de 2022 solo aplicó a vehículos que estaban en el país antes del 19 de octubre de 2021 y se cerró después de legalizar casi tres millones de unidades.</p>
                  <p className={p}><strong className="text-foreground">Resto del país:</strong> arancel de 10 % para vehículos con ocho o más años de antigüedad, medida como la diferencia entre el año de importación y el año-modelo. Un auto modelo 2018 importado en 2026 cumple con ocho años.</p>
                  <p className={p}><strong className="text-foreground">Franja y región fronteriza:</strong> arancel de 1 % para autos de cinco a nueve años y de 10 % para los de diez años o más. Estos vehículos deben cumplir los requisitos aduaneros si después quieren internarse al resto del país.</p>
                  <p className={p}><strong className="text-foreground">Origen del vehículo:</strong> el Número de Identificación Vehicular debe indicar fabricación o ensamble en México, Estados Unidos o Canadá. No se exige certificado de origen, pero el auto debe cumplir condiciones físicas, mecánicas y de protección al ambiente.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Autos nuevos: los aranceles de 2026</h2>
                <div className="space-y-3">
                  <p className={p}>Desde el 1 de enero de 2026 México aplica aranceles de entre 5 % y 50 % a importaciones de países con los que no tiene tratado de libre comercio, entre ellos China, India, Corea del Sur, Tailandia, Indonesia y Turquía. En autos ligeros el arancel general de 20 % pasó hasta 50 %. La medida llegó en el contexto de la revisión del T-MEC, y el gobierno chino pidió corregirla.</p>
                  <p className={p}>Los autos fabricados en Estados Unidos, Canadá o México conservan arancel de 0 % si el importador presenta un certificado de origen T-MEC válido. Sin certificado se aplica el arancel general de 20 %. Para países con otros tratados, como Japón o la Unión Europea, el arancel depende de la fracción y del calendario de desgravación, por lo que la calculadora te deja capturarlo.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Ejemplo 1: auto usado de Estados Unidos en el interior</h2>
                <div className="space-y-2">
                  <p className={p}>Un auto modelo 2016 fabricado en Estados Unidos se importa en 2026 con un valor en aduana de 150,000 pesos. El arancel de 10 % es de 15,000 pesos y el DTA de 8 al millar de 1,200 pesos.</p>
                  <p className={p}>El IVA de 16 % se calcula sobre 166,200 pesos y suma 26,592 pesos. Los impuestos y derechos totales son 42,792 pesos, cerca de 28.5 % del valor en aduana.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Ejemplo 2: auto usado en la franja fronteriza</h2>
                <div className="space-y-2">
                  <p className={p}>Un auto modelo 2020 se importa en 2026 a la franja fronteriza con un valor en aduana de 200,000 pesos. Tiene seis años, así que el arancel es de 1 %: 2,000 pesos. El DTA es de 1,600 pesos y el IVA sobre 203,600 pesos es de 32,576 pesos. Los impuestos suman 36,176 pesos, cerca de 18.1 % del valor.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Ejemplo 3: auto nuevo, con y sin tratado</h2>
                <div className="space-y-2">
                  <p className={p}>Un auto nuevo con valor en aduana de 400,000 pesos fabricado en un país sin tratado paga 50 % de arancel, es decir 200,000 pesos. Con DTA de 3,200 pesos, el IVA de 16 % sobre 603,200 pesos es de 96,512 pesos y el total de impuestos llega a 299,712 pesos, casi 75 % del valor.</p>
                  <p className={p}>El mismo valor con certificado T-MEC paga 0 % de arancel, 3,200 pesos de DTA y 64,512 pesos de IVA: 67,712 pesos en total, cerca de 17 %. La diferencia entre ambos casos es de más de 230,000 pesos.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Paso a paso para importar un auto a México</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Confirma la antigüedad, el origen del NIV y si circulará en la franja fronteriza o en el interior.</li>
                  <li>Reúne el título de propiedad original sin reporte de robo, identificación oficial, comprobante de domicilio y la baja de placas del país de origen.</li>
                  <li>Contrata un agente aduanal autorizado, que presentará el pedimento y calculará arancel, DTA e IVA.</li>
                  <li>Paga los impuestos y deja que la aduana libere el vehículo.</li>
                  <li>Inscribe el auto en el REPUVE, contrata seguro mexicano y tramita placas y tarjeta de circulación en tu estado.</li>
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>Errores comunes al importar un auto</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Usar cifras de 2022 o 2023, cuando la importación todavía era un trámite de regularización más barato.</li>
                  <li>Comprar un auto de menos de ocho años para el interior, que no cumple el decreto.</li>
                  <li>Creer que un auto europeo o japonés usado puede entrar porque lo compraste en Estados Unidos: el NIV decide, no el lugar de compra.</li>
                  <li>Olvidar que el IVA se cobra también sobre el arancel.</li>
                  <li>Ignorar los gastos de agente aduanal, prevalidación, placas y verificación.</li>
                  <li>No revisar si el decreto se renueva: vence el 30 de noviembre de 2026.</li>
                </ul>
              </div>
              <div>
                <h2 className={h2} style={heading}>Lo que la calculadora no incluye</h2>
                <p className={p}>No se calculan el ISAN, la tenencia o refrendo estatal, el costo de placas, el seguro ni las modificaciones para pasar la verificación ambiental. Tampoco se consideran regímenes especiales, vehículos de carga ni importaciones temporales. La aduana puede determinar el valor con base en su propia referencia de precios si la factura parece demasiado baja.</p>
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
            Revisado por <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Fundador. Fuentes: comunicado de la Secretaría de Hacienda del 5 de enero de 2026, Decreto por el que se regula la importación definitiva de vehículos usados (DOF 4 de noviembre de 2024 y 5 de noviembre de 2025), reforma a la Ley de los Impuestos Generales de Importación y de Exportación aprobada en diciembre de 2025 y guías de la ANAM. Última verificación: octubre de 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
