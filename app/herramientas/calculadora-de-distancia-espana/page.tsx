// app/herramientas/calculadora-de-distancia-espana/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorSpainSpanishClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { ES_TOWNS, findTown } from '@/lib/distance-towns-es';
import { ES_CAPITAL_DISTANCE_KM } from '@/lib/es-distance-matrix';

export const metadata: Metadata = {
  title: 'Calculadora de Distancia España 2026 — Distancia por Carretera Entre Dos Ciudades',
  description: 'Calcula la distancia por carretera y el tiempo de conducción entre 40 ciudades españolas — Madrid, Barcelona, Valencia, Sevilla y más. Distancias oficiales de autovía, tiempo de viaje y costo de combustible.',
  alternates: {
    canonical: 'https://www.naira.autos/herramientas/calculadora-de-distancia-espana',
    languages: { en: 'https://www.naira.autos/tools/distance-calculator-spain' , 'x-default': 'https://www.naira.autos/tools/distance-calculator-spain' },
  },
  openGraph: {
    title: 'Calculadora de Distancia España 2026',
    description: 'Distancia por carretera y tiempo de conducción entre 40 ciudades españolas, con calculadora de costo de combustible.',
    url: 'https://www.naira.autos/herramientas/calculadora-de-distancia-espana',
    locale: 'es',
  },
  keywords: [
    'calculadora de distancia españa', 'distancia madrid barcelona', 'distancia madrid valencia',
    'calculadora distancia autovía', 'costo combustible madrid barcelona', 'distancia valencia sevilla',
  ],
};

const madrid = findTown('Madrid')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/herramientas/calculadora-de-distancia-espana',
      name: 'Calculadora de Distancia España 2026 — Distancia por Carretera Entre Dos Ciudades',
      description: 'Calcula la distancia por carretera y el tiempo de conducción entre 40 ciudades españolas, con calculadora de costo de combustible.',
      url: 'https://www.naira.autos/herramientas/calculadora-de-distancia-espana',
      dateModified: '2026-09-09',
      inLanguage: 'es',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: '¿Qué distancia hay entre Madrid y Barcelona?', acceptedAnswer: { '@type': 'Answer', text: 'Unos 504 km por la A-2/AP-2, la longitud oficial de la autovía española, que también coincide exactamente con una guía independiente de alquiler de coches — normalmente más de 6 horas cruzando el Sistema Ibérico.' } },
        { '@type': 'Question', name: '¿Existe una tabla de distancias oficial del gobierno español?', acceptedAnswer: { '@type': 'Answer', text: 'No hay una matriz pública ciudad a ciudad, pero el Ministerio de Transportes y Movilidad Sostenible mantiene longitudes oficiales para las seis autovías radiales desde Madrid, usadas aquí directamente.' } },
        { '@type': 'Question', name: '¿Qué distancia hay entre Madrid y Valencia?', acceptedAnswer: { '@type': 'Answer', text: 'Unos 355 km por la A-3, una longitud oficial de autovía — la más corta de las seis radiales de Madrid.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Calculadora de Distancia España',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function DistanceCalculatorSpainSpanishPage() {
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
              <span className="text-white/60">🇪🇸 España</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Gratis · 40 Ciudades</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Última verificación: septiembre 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Calculadora de Distancia
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Distancia por carretera y tiempo de conducción entre dos de 40 ciudades españolas — Madrid, Barcelona, Valencia, Sevilla y principales centros regionales.
            </p>
            <Link href="/tools/distance-calculator-spain" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              English version →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorSpainSpanishClient />
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
              <p>España no publica una matriz pública de distancias por carretera entre sus ciudades, pero su red de autovías tiene una estructura inusualmente clara que facilita la verificación: seis autovías radiales (A-1 a A-6) parten de Madrid hacia el resto del país, cada una con una longitud oficial documentada por el Ministerio de Transportes y Movilidad Sostenible. Esta herramienta usa tres directamente: Madrid a Valencia por la A-3 (355&nbsp;km, la más corta de las seis), Madrid a Barcelona por la A-2 (504&nbsp;km, que también coincide exactamente con la cifra de una guía independiente de alquiler de coches para la misma ruta), y Madrid a A Coruña por la A-6 (590&nbsp;km).</p>
              <p>Valencia a Sevilla (541&nbsp;km) no sigue una única autovía radial, así que se obtiene de una guía detallada de distancia por carretera. Cualquier otra ruta entre las 40 ciudades de esta herramienta usa la estimación GPS basada en la fórmula de Haversine, calibrada con la matriz vial completa y verificada de Nigeria.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Qué retrasa realmente tu viaje en las carreteras españolas
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              La red de autovías españolas es generalmente excelente y, a diferencia de muchos países de la UE, mayormente libre de peajes — las autopistas AP más antiguas que sí cobran peaje suelen tener una autovía alternativa gratuita en paralelo. El verano (julio-agosto) trae tráfico intenso de vacaciones hacia la costa mediterránea y el sur, y la Dirección General de Tráfico (DGT) publica un calendario de previsión de la &laquo;operación salida&raquo; para los peores días de viaje. Los puertos de montaña que cruzan el Sistema Ibérico (entre Madrid y la costa este) y Sierra Morena (entre el centro y Andalucía) pueden añadir tiempo con mal tiempo. Como con cualquier calculadora, considera estas cifras como una base de planificación y consulta el estado del tráfico de la DGT antes de un viaje largo.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Verificado por <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, experta en ventas de automóviles. Rutas verificadas con longitudes oficiales de autovías españolas (Ministerio de Transportes, vía Wikipedia). Todas las demás rutas son estimaciones basadas en Haversine — ver las preguntas frecuentes a continuación.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distancia de Madrid a cada ciudad, ordenada
            </h2>
            <p className="text-sm text-gray-500 mb-4">Las otras 39 ciudades de esta herramienta, de la más cercana a la más lejana de Madrid.</p>
            <DistanceTable hub={madrid} towns={ES_TOWNS} verifiedMatrix={ES_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Preguntas Frecuentes — Calculadora de Distancia España
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: '¿Qué distancia hay entre Madrid y Barcelona?', a: 'Unos 504 km por la A-2/AP-2, una longitud oficial que también coincide con una fuente independiente — normalmente más de 6 horas.' },
                { q: '¿Qué distancia hay entre Madrid y Valencia?', a: 'Unos 355 km por la A-3, la más corta de las seis autovías radiales de Madrid.' },
                { q: '¿Existe una tabla de distancias oficial española?', a: 'No hay matriz pública, pero el Ministerio de Transportes documenta longitudes oficiales de las seis autovías radiales desde Madrid, usadas aquí directamente.' },
                { q: '¿Qué distancia hay entre Madrid y Sevilla?', a: 'Esta ruta usa actualmente la estimación GPS de esta herramienta en lugar de una cifra verificada — confirma con una app de navegación en vivo.' },
                { q: '¿Puedo calcular el costo del combustible?', a: 'Sí — elige un tipo de vehículo y el precio actual (€/litro) arriba; la herramienta convierte la distancia directamente en litros y costo estimados.' },
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
