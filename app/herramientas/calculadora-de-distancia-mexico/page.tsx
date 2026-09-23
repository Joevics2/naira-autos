// app/herramientas/calculadora-de-distancia-mexico/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorMexicoClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { MX_TOWNS, findTown } from '@/lib/distance-towns-mx';
import { MX_CAPITAL_DISTANCE_KM } from '@/lib/mx-distance-matrix';

export const metadata: Metadata = {
  title: 'Calculadora de Distancia México 2026 — Distancia por Carretera Entre Ciudades',
  description: 'Calcula la distancia por carretera y el tiempo de viaje entre 29 ciudades mexicanas — Ciudad de México, Guadalajara, Monterrey y más. Distancias verificadas, tiempo de viaje y costo de combustible.',
  alternates: {
    canonical: 'https://www.naira.autos/herramientas/calculadora-de-distancia-mexico',
    languages: { 'x-default': 'https://www.naira.autos/herramientas/calculadora-de-distancia-mexico' },
  },
  openGraph: {
    title: 'Calculadora de Distancia México 2026',
    description: 'Distancia por carretera y tiempo de viaje entre 29 ciudades mexicanas, con calculadora de costo de combustible.',
    url: 'https://www.naira.autos/herramientas/calculadora-de-distancia-mexico',
    locale: 'es',
  },
  keywords: [
    'calculadora de distancia méxico', 'distancia ciudad de méxico guadalajara', 'distancia cdmx monterrey',
    'calculadora distancia carretera méxico', 'costo de gasolina cdmx guadalajara', 'distancia guadalajara monterrey',
  ],
};

const cdmx = findTown('Mexico City')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/herramientas/calculadora-de-distancia-mexico',
      name: 'Calculadora de Distancia México 2026 — Distancia por Carretera Entre Ciudades',
      description: 'Calcula la distancia por carretera y el tiempo de viaje entre 29 ciudades mexicanas, con calculadora de costo de combustible.',
      url: 'https://www.naira.autos/herramientas/calculadora-de-distancia-mexico',
      dateModified: '2026-09-14',
      inLanguage: 'es',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: '¿Qué distancia hay entre Ciudad de México y Guadalajara?', acceptedAnswer: { '@type': 'Answer', text: 'Unos 540 km por la Autopista 15D, cifra promediada entre varias fuentes independientes que coinciden dentro de un rango pequeño — normalmente un viaje de 7 a 9 horas.' } },
        { '@type': 'Question', name: '¿Existe una tabla de distancias oficial del gobierno mexicano?', acceptedAnswer: { '@type': 'Answer', text: 'No hay una matriz pública ciudad a ciudad. Las rutas verificadas de esta herramienta se basan en fuentes independientes de planificación de rutas que coinciden entre sí.' } },
        { '@type': 'Question', name: '¿Qué distancia hay entre Ciudad de México y Monterrey?', acceptedAnswer: { '@type': 'Answer', text: 'Unos 900 km, normalmente un viaje de 13 a 14 horas cruzando varios estados del centro-norte del país.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Calculadora de Distancia México',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function DistanceCalculatorMexicoPage() {
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
              <span className="text-white/60">🇲🇽 México</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Gratis · 29 Ciudades</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Última verificación: septiembre 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Calculadora de Distancia
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Distancia por carretera y tiempo de viaje entre dos de 29 ciudades mexicanas — Ciudad de México, Guadalajara, Monterrey y principales centros regionales.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorMexicoClient />
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
              <p>México no publica una matriz gubernamental de distancias por carretera entre sus ciudades. Las 3 rutas verificadas de esta herramienta cubren el llamado &laquo;triángulo dorado&raquo; del centro-norte del país, y provienen de comparar varias fuentes independientes de planificación de rutas en español que coinciden dentro de un margen pequeño entre sí: Ciudad de México a Guadalajara (aproximadamente 540&nbsp;km por la Autopista 15D), Ciudad de México a Monterrey (aproximadamente 900&nbsp;km), y Guadalajara a Monterrey (aproximadamente 800&nbsp;km, vía Zacatecas).</p>
              <p>Cualquier otra ruta entre las 29 ciudades de esta herramienta usa la estimación GPS basada en la fórmula de Haversine, calibrada con la matriz vial completa y verificada de Nigeria. La lista de ciudades cubre las principales metrópolis del país por población; las alcaldías propias de la Ciudad de México (Iztapalapa, Coyoacán, Gustavo A. Madero y similares) y los municipios metropolitanos de Guadalajara y Monterrey (Zapopan, Tlaquepaque, Guadalupe y similares) se excluyen deliberadamente por ser redundantes con la ciudad principal.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Qué retrasa realmente tu viaje en las carreteras mexicanas
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Las autopistas de cuota mexicanas suelen ser más rápidas y seguras que las carreteras libres paralelas, pero implican un costo real en casetas que puede sumar cientos de pesos en un viaje largo — vale la pena comparar ambas opciones según tu presupuesto y tiempo disponible. Temporadas vacacionales (Semana Santa, verano, fin de año) generan tráfico intenso en las rutas hacia zonas turísticas como Acapulco, Cancún y Puerto Vallarta. Algunas carreteras libres, especialmente en zonas rurales o fronterizas, requieren precaución adicional por seguridad; consulta las recomendaciones oficiales antes de viajar por regiones específicas. Como con cualquier calculadora, considera estas cifras como una base de planificación y verifica las condiciones actuales de tráfico y seguridad antes de un viaje largo.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Verificado por <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, experta en ventas de automóviles. Rutas verificadas comparando fuentes independientes de planificación de rutas. Todas las demás rutas son estimaciones basadas en Haversine — ver las preguntas frecuentes a continuación.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distancia de Ciudad de México a cada ciudad, ordenada
            </h2>
            <p className="text-sm text-gray-500 mb-4">Las otras 28 ciudades de esta herramienta, de la más cercana a la más lejana de la Ciudad de México.</p>
            <DistanceTable hub={cdmx} towns={MX_TOWNS} verifiedMatrix={MX_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Preguntas Frecuentes — Calculadora de Distancia México
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: '¿Qué distancia hay entre Ciudad de México y Guadalajara?', a: 'Unos 540 km por la Autopista 15D, promedio de varias fuentes que coinciden entre sí — normalmente 7 a 9 horas.' },
                { q: '¿Existe una tabla de distancias oficial?', a: 'No hay una matriz pública. Esta herramienta compara fuentes independientes de planificación de rutas para sus cifras verificadas.' },
                { q: '¿Qué distancia hay entre Ciudad de México y Monterrey?', a: 'Unos 900 km, normalmente 13 a 14 horas de viaje.' },
                { q: '¿Qué distancia hay entre Guadalajara y Monterrey?', a: 'Unos 800 km vía Zacatecas, normalmente 9 a 12 horas.' },
                { q: '¿Puedo calcular el costo del combustible?', a: 'Sí — elige un tipo de vehículo y el precio actual (pesos/litro) arriba; la herramienta convierte la distancia directamente en litros y costo estimados (casetas no incluidas).' },
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
