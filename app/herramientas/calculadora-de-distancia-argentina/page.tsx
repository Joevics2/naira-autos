// app/herramientas/calculadora-de-distancia-argentina/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorArgentinaClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { AR_TOWNS, findTown } from '@/lib/distance-towns-ar';
import { AR_CAPITAL_DISTANCE_KM } from '@/lib/ar-distance-matrix';

export const metadata: Metadata = {
  title: 'Calculadora de Distancia Argentina 2026 — Distancia por Ruta Entre Ciudades',
  description: 'Calcula la distancia por ruta y el tiempo de viaje entre 26 ciudades argentinas — Buenos Aires, Córdoba, Mendoza y más. Distancias oficiales, tiempo de viaje y costo de combustible.',
  alternates: {
    canonical: 'https://www.naira.autos/herramientas/calculadora-de-distancia-argentina',
    languages: { 'x-default': 'https://www.naira.autos/herramientas/calculadora-de-distancia-argentina' },
  },
  openGraph: {
    title: 'Calculadora de Distancia Argentina 2026',
    description: 'Distancia por ruta y tiempo de viaje entre 26 ciudades argentinas, con calculadora de costo de combustible.',
    url: 'https://www.naira.autos/herramientas/calculadora-de-distancia-argentina',
    locale: 'es',
  },
  keywords: [
    'calculadora de distancia argentina', 'distancia buenos aires córdoba', 'distancia buenos aires mendoza',
    'calculadora distancia ruta argentina', 'costo de nafta buenos aires córdoba', 'distancia córdoba mendoza',
  ],
};

const buenosAires = findTown('Buenos Aires')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/herramientas/calculadora-de-distancia-argentina',
      name: 'Calculadora de Distancia Argentina 2026 — Distancia por Ruta Entre Ciudades',
      description: 'Calcula la distancia por ruta y el tiempo de viaje entre 26 ciudades argentinas, con calculadora de costo de combustible.',
      url: 'https://www.naira.autos/herramientas/calculadora-de-distancia-argentina',
      dateModified: '2026-09-14',
      inLanguage: 'es',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: '¿Qué distancia hay entre Buenos Aires y Córdoba?', acceptedAnswer: { '@type': 'Answer', text: 'Unos 715 km por ruta, según la propia página oficial del gobierno argentino (argentina.gob.ar) — normalmente un viaje de 7 a 9 horas.' } },
        { '@type': 'Question', name: '¿Existe una tabla de distancias oficial del gobierno argentino?', acceptedAnswer: { '@type': 'Answer', text: 'Sí, en parte: el gobierno publica la distancia por ruta desde Córdoba a cada una de las otras 22 capitales provinciales, usada aquí directamente para 22 rutas verificadas.' } },
        { '@type': 'Question', name: '¿Qué distancia hay entre Buenos Aires y Mendoza?', acceptedAnswer: { '@type': 'Answer', text: 'Unos 1.050 km por la Ruta Nacional 7, cifra confirmada por dos fuentes independientes — normalmente un viaje de 11 a 14 horas.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Calculadora de Distancia Argentina',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function DistanceCalculatorArgentinaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div lang="es" className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex items-center gap-3">
            <Link
              href="/tools/distance-calculator-countries"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-white/60 hover:text-amber-400 transition-all"
              aria-label="Volver"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/inicio" className="hover:text-white/60 transition-colors">Inicio</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/herramientas" className="hover:text-white/60 transition-colors">Herramientas</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">🇦🇷 Argentina</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Gratis · 26 Ciudades</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Última verificación: septiembre 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Calculadora de Distancia
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Distancia por ruta y tiempo de viaje entre dos de 26 ciudades argentinas — todas las 23 capitales provinciales más Buenos Aires, Rosario y Mar del Plata.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorArgentinaClient />
          </div>
        </div>
      </div>

      <div lang="es" className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              De dónde vienen estos números
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>Argentina tiene, sorprendentemente, uno de los mejores conjuntos de datos oficiales de cualquier país incluido en esta herramienta hasta ahora. La propia página oficial del gobierno argentino (argentina.gob.ar), en su sección sobre cómo llegar a Córdoba, publica la distancia por ruta desde Córdoba capital hasta cada una de las otras 22 capitales provinciales del país &mdash; desde los 330&nbsp;km a Santa Fe hasta los 3.635&nbsp;km a Río Gallegos. Esta herramienta usa esas 22 cifras oficiales directamente, dándole a Argentina 22 rutas verificadas desde una única fuente gubernamental, algo que solo Nigeria (con su matriz completa) y Egipto (con la matriz de la ONU) superan entre los países de esta herramienta.</p>
              <p>Una ruta más &mdash; Buenos Aires a Mendoza &mdash; se verificó por separado: la primera búsqueda arrojó una cifra de 1.942&nbsp;km que resultó ser un trayecto claramente indirecto (vía Catamarca), muy alejado de la ruta habitual. En lugar de usar ese dato dudoso, se buscó y confirmó por separado con dos fuentes independientes que coinciden en unos 1.050&nbsp;km por la Ruta Nacional 7, la ruta directa y más utilizada. Cualquier otra ruta entre las 26 ciudades de esta herramienta usa la estimación GPS basada en la fórmula de Haversine, calibrada con la matriz vial completa y verificada de Nigeria.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Qué retrasa realmente tu viaje en las rutas argentinas
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Muchas rutas nacionales argentinas, incluida buena parte de la Ruta 9 entre Buenos Aires y Córdoba, atraviesan localidades en lugar de circunvalarlas, lo que añade semáforos, tránsito local y velocidades reducidas no reflejadas en la distancia sola. El estado del pavimento varía mucho según la provincia y la época del año; verano e invierno traen temporadas altas de tráfico hacia la Patagonia y el norte respectivamente. Las rutas patagónicas (hacia Río Gallegos o Ushuaia) cruzan tramos muy largos con estaciones de servicio escasas, por lo que planificar la carga de combustible con anticipación es esencial. Como con cualquier calculadora, considera estas cifras como una base de planificación y verificá el estado de las rutas con Vialidad Nacional antes de un viaje largo.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Verificado por <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, experta en ventas de automóviles. Rutas verificadas con datos oficiales del gobierno argentino (argentina.gob.ar) y una cifra cruzada con dos fuentes independientes para Buenos Aires-Mendoza. Todas las demás rutas son estimaciones basadas en Haversine.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distancia de Buenos Aires a cada ciudad, ordenada
            </h2>
            <p className="text-sm text-gray-500 mb-4">Las otras 25 ciudades de esta herramienta, de la más cercana a la más lejana de Buenos Aires.</p>
            <DistanceTable hub={buenosAires} towns={AR_TOWNS} verifiedMatrix={AR_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Preguntas Frecuentes — Calculadora de Distancia Argentina
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: '¿Qué distancia hay entre Buenos Aires y Córdoba?', a: 'Unos 715 km por ruta, según la página oficial del gobierno argentino — normalmente 7 a 9 horas.' },
                { q: '¿Existe una tabla de distancias oficial?', a: 'Sí, parcialmente: el gobierno publica la distancia desde Córdoba a las otras 22 capitales provinciales, usada aquí directamente.' },
                { q: '¿Qué distancia hay entre Buenos Aires y Mendoza?', a: 'Unos 1.050 km por la Ruta Nacional 7, confirmado por dos fuentes independientes — normalmente 11 a 14 horas.' },
                { q: '¿Qué distancia hay entre Córdoba y Mendoza?', a: 'Unos 670 km, cifra oficial del gobierno argentino.' },
                { q: '¿Puedo calcular el costo del combustible?', a: 'Sí — elige un tipo de vehículo y el precio actual (pesos/litro) arriba; la herramienta convierte la distancia directamente en litros y costo estimados.' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3 hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-semibold text-gray-900">{q}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4"><p className="text-sm text-gray-600 leading-relaxed">{a}</p></div>
                </details>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
