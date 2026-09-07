import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import MejorAutoParaTiClient from './client';

export const metadata: Metadata = {
  title: 'Mejor Auto Para Ti 2026 — Recomendador por Caso de Uso, 50 Países',
  description: 'Encuentra el mejor auto para tus necesidades, con precios en tu propia moneda en 50 países. Elige tu caso de uso — auto familiar, uso comercial, carretera, presupuesto ajustado, todoterreno, ejecutivo o primer auto — y recibe recomendaciones ordenadas entre 50 modelos, desde el Toyota Corolla hasta el Bugatti Chiron, con costo de mantenimiento y disponibilidad de repuestos.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/mejor-auto-para-ti',
    languages: {
      en: 'https://www.naira.autos/tools/best-car-for',
      es: 'https://www.naira.autos/tools/mejor-auto-para-ti',
      'x-default': 'https://www.naira.autos/tools/best-car-for',
    },
  },
  openGraph: {
    title: 'Mejor Auto Para Ti 2026 — Recomendador de Autos | Naira Autos',
    description: 'Recomendador de autos global con precios locales en 50 países. Elige tu caso de uso y recibe el top 5 ordenado por precio, mantenimiento, consumo y disponibilidad de repuestos.',
    url: 'https://www.naira.autos/tools/mejor-auto-para-ti',
  },
  keywords: [
    'mejor auto para comprar 2026', 'mejor auto familiar', 'mejor auto para uso comercial',
    'recomendador de autos', 'qué auto debería comprar', 'mejor suv 2026',
    'auto más barato de mantener', 'mejor primer auto', 'mejor auto para carretera',
    'mejor auto ejecutivo', 'auto más eficiente en combustible', 'recomendación de auto',
    'mejor auto económico', 'mejor auto todoterreno', 'mejor auto españa',
    'mejor auto méxico', 'mejor auto argentina', 'mejor auto colombia', 'mejor auto chile',
    'qué auto comprar con poco presupuesto', 'naira autos',
  ],
};

const LAST_UPDATED = '2026-09-06';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/mejor-auto-para-ti',
      name: 'Mejor Auto Para Ti 2026 — Recomendador por Caso de Uso, 50 Países',
      description: 'Recomendaciones de autos ordenadas por caso de uso, con precios en tu propia moneda en 50 países.',
      url: 'https://www.naira.autos/tools/mejor-auto-para-ti',
      datePublished: '2026-09-06',
      dateModified: LAST_UPDATED,
      inLanguage: 'es',
      author: { '@type': 'Organization', name: 'Equipo Editorial de Naira Autos', url: 'https://www.naira.autos/about' },
      publisher: { '@type': 'Organization', name: 'Naira Autos', logo: { '@type': 'ImageObject', url: 'https://www.naira.autos/logo.png' } },
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://www.naira.autos/herramientas' },
        { '@type': 'ListItem', position: 3, name: 'Mejor Auto Para Ti', item: 'https://www.naira.autos/tools/mejor-auto-para-ti' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Esta herramienta muestra precios reales para mi país?',
          acceptedAnswer: { '@type': 'Answer', text: 'Es una estimación, no una cotización en vivo. Cada uno de los 50 autos tiene un precio base en USD; al elegir tu país se aplica el multiplicador típico de impuestos/aranceles de importación de ese país y el tipo de cambio actual para estimar un precio local. Confirma con un concesionario o publicación local antes de presupuestar con exactitud.' },
        },
        {
          '@type': 'Question',
          name: '¿Cuál es el mejor auto familiar para comprar?',
          acceptedAnswer: { '@type': 'Answer', text: 'El Toyota Camry Híbrido ofrece la mejor combinación de espacio, fiabilidad y bajo costo de mantenimiento en un sedán familiar. El Toyota RAV4 y el Honda CR-V son las mejores SUV familiares — ambas con buena altura al piso y redes de repuestos bien surtidas. Para familias numerosas, la minivan híbrida Toyota Sienna tiene 8 asientos.' },
        },
        {
          '@type': 'Question',
          name: '¿Cuál es el mejor auto para uso comercial?',
          acceptedAnswer: { '@type': 'Answer', text: 'El Toyota Corolla es el más popular para uso comercial en todo el mundo por buenas razones — es extremadamente confiable con alto kilometraje, tiene costo de mantenimiento Bajo, y sus repuestos se consiguen casi en cualquier lugar. Para necesidades de mayor capacidad, el Toyota Land Cruiser y el Ford F-150 son caballos de batalla comprobados.' },
        },
        {
          '@type': 'Question',
          name: '¿Cuál es el mejor auto para caminos en mal estado?',
          acceptedAnswer: { '@type': 'Answer', text: 'La altura al piso y la fiabilidad son los dos factores más importantes. El Toyota Land Cruiser (225mm) y el Jeep Wrangler (252mm) lideran el ranking, seguidos del Land Rover Range Rover (218mm) y el Ford Bronco (216mm). Para uso principalmente urbano, un Toyota Camry o Corolla es manejable con precaución.' },
        },
        {
          '@type': 'Question',
          name: '¿Cuál es el mejor primer auto para comprar?',
          acceptedAnswer: { '@type': 'Answer', text: 'El Toyota Corolla y el Honda Civic son las mejores recomendaciones para un primer auto — ambos con costo de mantenimiento Bajo, repuestos Fáciles de conseguir, mecánica simple que cualquier mecánico puede reparar, y buen valor de reventa. El Toyota GR86/Subaru BRZ y el MINI Cooper son opciones más deportivas para quien busca más diversión al manejar. Evita marcas exóticas y de ultra lujo como primer auto.' },
        },
        {
          '@type': 'Question',
          name: '¿Cuál auto es mejor para manejar en carretera?',
          acceptedAnswer: { '@type': 'Answer', text: 'El Toyota Camry y el BMW 3 Series son excelentes opciones para un manejo cómodo y estable en carretera. Los eléctricos como el Tesla Model 3 y el Hyundai Ioniq 5 ofrecen buena comodidad y bajo costo de uso, siempre que exista infraestructura de carga en tu ruta.' },
        },
      ],
    },
  ],
};

export default function MejorAutoParaTiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex items-center gap-3">
            <Link
              href="/herramientas"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all"
              aria-label="Volver a Herramientas"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/inicio" className="hover:text-white/60 transition-colors">Inicio</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/herramientas" className="hover:text-white/60 transition-colors">Herramientas</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">Mejor Auto Para Ti</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Herramienta Gratis</span>
              </span>
              <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Última verificación: septiembre 2026</span>
              <Link href="/tools/best-car-for" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              Mejor Auto Para Ti
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Elige tu caso de uso y tu país, y recibe recomendaciones de autos ordenadas con precios en tu propia moneda en 50 países — puntuadas por costo de mantenimiento, disponibilidad de repuestos, consumo de combustible y altura al piso. 50 modelos cubiertos, desde el Toyota Corolla hasta el Bugatti Chiron.
            </p>
          </div>
        </div>
      </div>

      <MejorAutoParaTiClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground border border-border rounded-xl bg-card px-4 py-3">
            <p><strong className="text-foreground">Revisado por:</strong> Equipo Editorial de Naira Autos — datos e investigación automotriz</p>
            <p><strong className="text-foreground">Última actualización:</strong> 6 de septiembre de 2026</p>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Cómo Elegir el Auto Correcto Para Tus Necesidades
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Esta herramienta cubre 50 autos populares — desde sedanes económicos hasta crossovers eléctricos y superdeportivos de siete cifras — con precios que se ajustan a la moneda y el nivel típico de impuestos de importación de tu país, en 50 países. Elige tu país en el selector antes de elegir un caso de uso, para que los precios reflejen tu mercado y no una simple conversión de dólares.
                </p>
                <p>
                  El mejor auto para ti depende menos de la ficha técnica y más de tu <strong className="text-foreground">patrón de uso diario real</strong>. Un auto excelente en papel puede ser mala elección si el mecánico más cercano no lo conoce bien, o si su altura al piso convierte tu trayecto diario en un obstáculo constante.
                </p>
                <p>
                  Para <strong className="text-foreground">uso comercial</strong>, los factores determinantes son la fiabilidad con alto kilometraje y el bajo costo de repuestos por kilómetro. El Toyota Corolla y el Toyota Camry dominan las flotas comerciales en todo el mundo por esta razón.
                </p>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Para <strong className="text-foreground">uso ejecutivo</strong>, la percepción de marca es real pero no debería superar la realidad financiera. Un Mercedes-Benz S-Class tiene costo de mantenimiento Muy Alto — las reparaciones de suspensión neumática y electrónica cuestan miles. El Toyota Camry o el BMW 3 Series ofrecen presencia ejecutiva a una fracción del costo.
                </p>
                <p>
                  Para <strong className="text-foreground">compradores primerizos</strong>, el factor más importante es la familiaridad del mecánico. Un auto cuyas fallas requieren diagnóstico especializado significa reparaciones más lentas y costosas. Mantente en Toyota y Honda con motores de menos de 2.5L para tu primer auto.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Mejores Autos por Caso de Uso — 2026
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: '👨‍👩‍👧‍👦', title: 'Mejor Auto Familiar',        picks: ['Toyota Camry', 'Toyota RAV4', 'Honda CR-V', 'Toyota Sienna'] },
                { icon: '🚖', title: 'Mejor Uso Comercial',      picks: ['Toyota Corolla', 'Toyota RAV4', 'Toyota Land Cruiser', 'Ford F-150'] },
                { icon: '🛣️',  title: 'Mejor Para Carretera',      picks: ['Toyota Camry', 'BMW 3 Series', 'Tesla Model 3', 'Hyundai Ioniq 5'] },
                { icon: '💰', title: 'Mejor Compra Económica',    picks: ['Toyota Corolla', 'Honda Civic'] },
                { icon: '🪨', title: 'Mejor Todoterreno',         picks: ['Toyota Land Cruiser', 'Jeep Wrangler', 'Range Rover', 'Ford Bronco'] },
                { icon: '💼', title: 'Mejor Auto Ejecutivo',      picks: ['Mercedes-Benz S-Class', 'BMW 3 Series', 'Genesis G90', 'Range Rover'] },
                { icon: '🎓', title: 'Mejor Primer Auto',         picks: ['Toyota Corolla', 'Honda Civic', 'Toyota GR86 / Subaru BRZ', 'MINI Cooper'] },
                { icon: '⛽', title: 'Más Eficiente en Combustible', picks: ['Toyota Camry Híbrido', 'Tesla Model 3', 'Toyota Corolla', 'Hyundai Ioniq 5'] },
              ].map(({ icon, title, picks }) => (
                <div key={title} className="bg-card border border-border rounded-xl p-4">
                  <p className="text-lg mb-1">{icon}</p>
                  <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2">{title}</h3>
                  <ol className="space-y-1">
                    {picks.map((p, i) => (
                      <li key={p} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="text-muted-foreground/50 font-bold w-3">{i + 1}.</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">Los precios y el orden exacto se ajustan a tu país seleccionado en la herramienta de arriba.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Preguntas Frecuentes
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: '¿Esta herramienta muestra precios reales para mi país?', a: 'Es una estimación, no una cotización en vivo — cada auto tiene un precio base en USD, ajustado por el multiplicador de tu país y el tipo de cambio actual. Confirma con un concesionario local antes de presupuestar con exactitud.' },
                { q: '¿Cuál es el mejor auto familiar?', a: 'El Toyota Camry para sedán familiar; el Toyota RAV4 y el Honda CR-V para SUV familiar. Para familias grandes, el Toyota Sienna (8 asientos, híbrido).' },
                { q: '¿Cuál es el mejor auto para uso comercial?', a: 'El Toyota Corolla — extremadamente confiable con alto kilometraje, costo de mantenimiento Bajo, repuestos disponibles casi en cualquier lugar.' },
                { q: '¿Cuál es el mejor auto para caminos en mal estado?', a: 'El Jeep Wrangler (252mm) y el Toyota Land Cruiser (225mm) lideran en altura al piso. El Land Rover Range Rover y el Ford Bronco también destacan.' },
                { q: '¿Cuál es el mejor primer auto?', a: 'Toyota Corolla y Honda Civic — mantenimiento Bajo, repuestos Fáciles, mecánicos disponibles en todas partes. Evita marcas exóticas y de ultra lujo como primer auto.' },
                { q: '¿Cuál auto es mejor para carretera?', a: 'Toyota Camry y BMW 3 Series para manejo cómodo y estable. Tesla Model 3 e Hyundai Ioniq 5 son buenas opciones eléctricas donde haya infraestructura de carga.' },
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
              <Link href="/tools/comparador-de-autos" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Comparador de Autos</p>
                <ChevronRight className="h-4 w-4 text-blue-500" />
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
