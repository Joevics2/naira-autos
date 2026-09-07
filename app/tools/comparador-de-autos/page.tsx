import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import ComparadorDeAutosClient from './client';

export const metadata: Metadata = {
  title: 'Comparador de Autos 2026 — Compara Precio, Consumo y Mantenimiento en 50 Países',
  description: 'Compara dos autos lado a lado con precios en tu propia moneda en 50 países — España, México, Argentina, Colombia, Chile y más. Precio, consumo de combustible, costo de mantenimiento, altura al piso, disponibilidad de repuestos y problemas comunes en 50 modelos, desde el Toyota Corolla hasta el Bugatti Chiron.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/comparador-de-autos',
    languages: {
      en: 'https://www.naira.autos/tools/car-comparison',
      es: 'https://www.naira.autos/tools/comparador-de-autos',
      'x-default': 'https://www.naira.autos/tools/car-comparison',
    },
  },
  openGraph: {
    title: 'Comparador de Autos 2026 | Naira Autos',
    description: 'Comparación lado a lado con precios locales en 50 países. Precio, consumo, mantenimiento, altura al piso, disponibilidad de repuestos. 50 modelos, desde el Corolla hasta el Ferrari 296 GTB.',
    url: 'https://www.naira.autos/tools/comparador-de-autos',
  },
  keywords: [
    'comparador de autos', 'comparar autos online', 'toyota corolla vs honda civic',
    'cuál auto comprar 2026', 'comparación de autos españa', 'comparador de coches',
    'comparar carros méxico', 'comparación de autos argentina', 'comparador de autos colombia',
    'comparación de autos chile', 'mejor auto para comprar', 'consumo de combustible autos',
    'auto más barato de mantener', 'toyota vs honda', 'comparación de suv',
    'precio de autos por país', 'auto eléctrico comparación', 'tesla model 3 vs model y',
    'altura al piso autos', 'disponibilidad de repuestos',
  ],
};

const LAST_UPDATED = '2026-09-06';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/comparador-de-autos',
      name: 'Comparador de Autos 2026 — Compara Precio, Consumo y Mantenimiento en 50 Países',
      description: 'Compara dos autos lado a lado con precios en tu propia moneda en 50 países, consumo, mantenimiento, altura al piso y disponibilidad de repuestos.',
      url: 'https://www.naira.autos/tools/comparador-de-autos',
      datePublished: '2026-09-06',
      dateModified: LAST_UPDATED,
      inLanguage: 'es',
      author: { '@type': 'Organization', name: 'Equipo Editorial de Naira Autos', url: 'https://www.naira.autos/about' },
      publisher: { '@type': 'Organization', name: 'Naira Autos', logo: { '@type': 'ImageObject', url: 'https://www.naira.autos/logo.png' } },
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://www.naira.autos/herramientas' },
        { '@type': 'ListItem', position: 3, name: 'Comparador de Autos', item: 'https://www.naira.autos/tools/comparador-de-autos' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Esta herramienta muestra precios reales para mi país?',
          acceptedAnswer: { '@type': 'Answer', text: 'Muestra una estimación, no una cotización en vivo. Cada auto tiene un precio base en USD, ajustado por el multiplicador típico de impuestos/aranceles de importación de tu país y el tipo de cambio actual. Es un buen punto de partida para comparar, pero confirma con un concesionario o publicación local antes de presupuestar con exactitud — los tipos de cambio cambian a diario.' },
        },
        {
          '@type': 'Question',
          name: '¿Cuál es el auto más barato de mantener?',
          acceptedAnswer: { '@type': 'Answer', text: 'El Toyota Corolla tiene costo de mantenimiento Bajo y disponibilidad de repuestos Fácil en casi cualquier mercado, incluyendo España, México, Argentina, Colombia y Chile. El Honda Civic es otra opción sólida en la misma categoría. En general, los autos japoneses con motores pequeños y alto volumen de ventas tienen los costos de mantenimiento más bajos por la disponibilidad de piezas y familiaridad de los mecánicos.' },
        },
        {
          '@type': 'Question',
          name: '¿Qué auto tiene mejor altura al piso para caminos en mal estado?',
          acceptedAnswer: { '@type': 'Answer', text: 'Para caminos irregulares se recomienda una altura al piso de al menos 180mm. El Jeep Wrangler lidera con 252mm, seguido del Toyota Land Cruiser con 225mm. Entre las SUV, el Land Rover Range Rover (218mm) y el Ford Bronco (216mm) también destacan. Los sedanes como el Toyota Camry (140mm) pueden complicarse en caminos muy dañados.' },
        },
        {
          '@type': 'Question',
          name: '¿Cuál es el auto más eficiente en combustible?',
          acceptedAnswer: { '@type': 'Answer', text: 'Entre los autos de combustión, el Toyota Camry Híbrido lidera con aproximadamente 5,2 L/100km combinados. Entre los eléctricos, el Tesla Model 3 y el Hyundai Ioniq 5 no consumen combustible en absoluto. En contraste, hiperautos como el Bugatti Chiron consumen 22 L/100km o más.' },
        },
        {
          '@type': 'Question',
          name: '¿Toyota o Honda, cuál es mejor?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ambas marcas son excelentes y dominan el mercado de autos usados por buenas razones. Toyota tiene una ligera ventaja en disponibilidad de repuestos fuera de las grandes ciudades y en valor de reventa. Honda suele ofrecer una conducción más dinámica a un precio competitivo. Para uso comercial o de alto kilometraje, Toyota suele preferirse.' },
        },
      ],
    },
  ],
};

export default function ComparadorDeAutosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── HERO OSCURO ── breadcrumb + título + herramienta */}
      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex items-center gap-3">
            <Link
              href="/herramientas"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all"
              aria-label="Volver a Herramientas"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/inicio" className="hover:text-white/60 transition-colors">Inicio</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/herramientas" className="hover:text-white/60 transition-colors">Herramientas</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">Comparador de Autos</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Herramienta Gratis</span>
              </span>
              <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Última verificación: septiembre 2026</span>
              <Link href="/tools/car-comparison" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              Comparador de Autos
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Elige dos autos y compáralos lado a lado — precio en tu moneda local en 50 países, consumo de combustible, costo de mantenimiento, altura al piso, disponibilidad de repuestos y problemas conocidos. 50 modelos cubiertos, desde el Toyota Corolla hasta el Bugatti Chiron.
            </p>
          </div>
        </div>
      </div>

      {/* ── HERRAMIENTA INTERACTIVA ── widget claro, adaptado al tema */}
      <ComparadorDeAutosClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground border border-border rounded-xl bg-card px-4 py-3">
            <p><strong className="text-foreground">Revisado por:</strong> Equipo Editorial de Naira Autos — datos e investigación automotriz</p>
            <p><strong className="text-foreground">Última actualización:</strong> 6 de septiembre de 2026</p>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Cómo Comparar Autos en Cualquier País
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Esta herramienta cubre 50 autos populares — desde sedanes económicos hasta crossovers eléctricos y superdeportivos de siete cifras — con precios que se ajustan a la moneda y el nivel típico de impuestos de importación de tu país, en 50 países incluyendo España, México, Argentina, Colombia y Chile. Elige tu país en el selector antes de comparar para ver un precio realista, no solo una conversión directa de dólares.
                </p>
                <p>
                  Tres factores importan más que las especificaciones en papel: la <strong className="text-foreground">disponibilidad de repuestos</strong>, la <strong className="text-foreground">familiaridad de los mecánicos</strong> con el modelo, y la <strong className="text-foreground">altura al piso</strong> si tus caminos no están en buen estado. Un auto impresionante en la ficha técnica puede ser una mala decisión si sus repuestos tardan semanas en llegar o si ningún mecánico cercano lo conoce bien.
                </p>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Para <strong className="text-foreground">uso comercial o de alto kilometraje</strong> (aplicaciones de transporte, flotas), prioriza fiabilidad y bajo costo de repuestos por kilómetro sobre el consumo de combustible — un auto que gasta 1L/100km más pero con pastillas de freno más baratas suele salir más barato a largo plazo.
                </p>
                <p>
                  Para <strong className="text-foreground">uso ejecutivo</strong>, ten cuidado con la percepción de marca frente a la realidad financiera: un Mercedes-Benz S-Class tiene un costo de mantenimiento Muy Alto, mientras que un Toyota Camry o BMW 3 Series ofrecen presencia ejecutiva a una fracción del costo de mantenimiento.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Comparaciones Populares
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                'Toyota Camry vs Honda CR-V', 'Toyota Corolla vs Honda Civic', 'Tesla Model 3 vs Tesla Model Y',
                'Toyota RAV4 vs Mazda CX-5', 'BMW 3 Series vs Mercedes-Benz S-Class', 'Ford F-150 vs Toyota Land Cruiser',
                'Toyota Land Cruiser vs Land Rover Range Rover', 'Hyundai Ioniq 5 vs Kia EV9',
              ].map((pair) => (
                <span key={pair} className="text-xs font-medium text-muted-foreground bg-card border border-border px-3 py-1.5 rounded-full">
                  {pair}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Preguntas Frecuentes
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: '¿Esta herramienta muestra precios reales para mi país?', a: 'Es una estimación, no una cotización en vivo — cada auto tiene un precio base en USD, ajustado por el multiplicador de impuestos/aranceles típico de tu país y el tipo de cambio actual. Confirma con un concesionario o publicación local antes de presupuestar con exactitud.' },
                { q: '¿Cuál es el auto más barato de mantener?', a: 'El Toyota Corolla y el Honda Civic — ambos con costo de mantenimiento Bajo y repuestos Fáciles de conseguir en casi cualquier mercado hispanohablante.' },
                { q: '¿Qué auto tiene mejor altura al piso?', a: 'El Jeep Wrangler (252mm) y el Toyota Land Cruiser (225mm) lideran. El Land Rover Range Rover y el Ford Bronco también destacan para caminos irregulares.' },
                { q: '¿Cuál es el auto más eficiente en combustible?', a: 'El Toyota Camry Híbrido (5,2 L/100km) entre los de combustión. Los eléctricos como el Tesla Model 3 y el Hyundai Ioniq 5 no consumen combustible en absoluto.' },
                { q: '¿Toyota o Honda, cuál es mejor?', a: 'Ambas son excelentes. Toyota tiene ligera ventaja en repuestos y reventa; Honda suele ofrecer una conducción más dinámica al mismo precio.' },
                { q: '¿Puedo comparar autos eléctricos con autos de gasolina?', a: 'Sí — la herramienta muestra "Eléctrico — sin costo de combustible" en lugar de L/100km para los eléctricos, y los compara igualmente en precio, mantenimiento y disponibilidad de repuestos.' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3">
                    <span className="text-sm font-semibold text-foreground">{q}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4"><p className="text-sm text-muted-foreground leading-relaxed">{a}</p></div>
                </details>
              ))}
            </div>
          </div>

          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Más Herramientas Gratuitas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/tools/mejor-auto-para-ti" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Mejor Auto Para Ti</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/tools/calculadora-de-costo-de-combustible-global" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all">
                <p className="text-sm font-bold text-sky-700 dark:text-sky-400">Calculadora de Costo de Combustible</p>
                <ChevronRight className="h-4 w-4 text-sky-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
