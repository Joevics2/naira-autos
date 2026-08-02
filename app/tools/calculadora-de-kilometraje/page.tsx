import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, Globe2 } from 'lucide-react';
import MileageExplainerClientEs from '@/components/MileageExplainerClientEs';
import { globalLandmarkCities } from '@/lib/mileage-cities';

export const metadata: Metadata = {
  title: 'Calculadora de Kilometraje — ¿Es Mucho para un Auto? | Naira Autos',
  description: 'Calculadora gratuita de kilometraje que pone cualquier lectura del odómetro en contexto real — distancia entre ciudades, vueltas a la Tierra, viajes a la Luna. Descubre si el kilometraje de un auto es normal para su edad.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/calculadora-de-kilometraje',
    languages: {
      en: 'https://www.naira.autos/tools/mileage-explainer',
      es: 'https://www.naira.autos/tools/calculadora-de-kilometraje',
      'x-default': 'https://www.naira.autos/tools/mileage-explainer',
    },
  },
  openGraph: {
    title: 'Calculadora de Kilometraje | Naira Autos',
    description: '¿Qué significa realmente 160,000 km? Una herramienta gratuita que convierte cualquier lectura del odómetro en comparaciones de distancia reales.',
    url: 'https://www.naira.autos/tools/calculadora-de-kilometraje',
  },
  keywords: [
    'cuánto kilometraje es mucho para un auto',
    'kilometraje promedio por año',
    'qué es un buen kilometraje auto usado',
    'calculadora de kilometraje',
    'kilometraje ideal para comprar auto usado',
    'cuántos kilómetros debe tener un auto usado',
    'kilometraje alto qué significa',
    'cómo saber si el kilometraje es real',
  ].join(', '),
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/calculadora-de-kilometraje',
      name: 'Calculadora de Kilometraje — ¿Es Mucho para un Auto?',
      description: 'Calculadora gratuita de kilometraje que pone cualquier lectura del odómetro en contexto real — distancia entre ciudades, vueltas a la Tierra, viajes a la Luna.',
      url: 'https://www.naira.autos/tools/calculadora-de-kilometraje',
      inLanguage: 'es',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: '¿Cuánto kilometraje es mucho para un auto?', acceptedAnswer: { '@type': 'Answer', text: 'La mayoría de los conductores recorren entre 15.000 y 20.000 kilómetros al año, aunque esto varía según el país. Como referencia general, un auto de 5 años con 75.000–100.000 km está dentro de lo típico, y uno de 10 años con 150.000–200.000 km tampoco es inusual. Lo que más importa es si el kilometraje coincide con la edad del auto, no el número por sí solo.' } },
        { '@type': 'Question', name: '¿Qué se considera un buen kilometraje en un auto usado?', acceptedAnswer: { '@type': 'Answer', text: 'No hay un número mágico — depende del tipo de auto, cómo fue conducido y qué tan bien fue mantenido. Un auto usado principalmente en carretera suele tener menos desgaste que uno usado en ciudad con el mismo kilometraje. Un historial de mantenimiento completo suele ser más revelador que el odómetro solo.' } },
        { '@type': 'Question', name: '¿Cómo sé si el kilometraje de un auto es real?', acceptedAnswer: { '@type': 'Answer', text: 'Compara la lectura actual con los registros de mantenimiento, revisiones técnicas o el historial del VIN. Una lectura sospechosamente baja para la edad del auto, junto con desgaste visible en pedales, asiento o volante que no coincide, es una señal común de manipulación del odómetro.' } },
        { '@type': 'Question', name: '¿Cuál es el kilometraje promedio por año?', acceptedAnswer: { '@type': 'Answer', text: 'A nivel general, entre 15.000 y 20.000 kilómetros al año se considera un uso típico, aunque varía bastante según el país — el tráfico, la disponibilidad de transporte público y la distancia de los trayectos diarios influyen mucho en esta cifra.' } },
      ],
    },
  ],
};

// Ciudad por defecto: Ciudad de México ↔ Los Ángeles — un corredor muy
// reconocible para la audiencia hispanohablante, y ambas ciudades ya
// están en el conjunto de "ciudades globales" curado.
const CITIES = globalLandmarkCities();

export default function CalculadoraDeKilometrajePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── Hero oscuro ── */}
      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Atrás">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Herramientas</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Calculadora de Kilometraje</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Globe2 className="h-3 w-3" />
                Herramienta Gratuita
              </span>
              <Link href="/tools/mileage-explainer" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read this in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              ¿Ese Kilometraje<br /><span className="text-emerald-400">Es Mucho o Normal?</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">160.000 km no significa mucho como número. Como distancia, sí.</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Ingresa cualquier lectura del odómetro y compárala con distancias reales entre ciudades — o con cuántas veces le darías la vuelta al mundo.
            </p>
          </div>
        </div>
      </div>

      {/* ── Calculadora interactiva ── */}
      <MileageExplainerClientEs
        defaultUnit="km"
        cities={CITIES}
        defaultFromName="Mexico City"
        defaultToName="Los Angeles"
        enableCountrySelect
        vehicleCheckHref="/tools/vin-checker-global"
      />

      {/* ── Contenido SEO ── */}
      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="max-w-3xl">
            <h2 className="text-2xl font-black uppercase text-foreground mb-4"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Por Qué el Kilometraje Es Difícil de Interpretar
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Un anuncio dice &ldquo;160.000 km&rdquo; y la mayoría de los compradores reaccionan igual: una sensación vaga de que está bien o de que es un problema, sin mucho en qué basar esa impresión. El número por sí solo no dice demasiado — un auto que recorrió 160.000 km en 15 años de uso ocasional los fines de semana tuvo una vida muy distinta a uno que llegó a esa cifra en solo 4 años de manejo diario en autopista.
              </p>
              <p>
                Lo que realmente importa es <strong className="text-foreground">el kilometraje en relación con la edad del auto</strong>. La mayoría de los conductores recorre entre 15.000 y 20.000 kilómetros al año, aunque esto varía bastante según el país — el tráfico, el transporte público disponible, la calidad de las carreteras y el precio del combustible influyen mucho en esa cifra. Un auto con kilometraje muy por debajo de lo esperado para su edad tampoco es necesariamente buena noticia — puede significar un uso genuinamente bajo, pero también es uno de los indicios clásicos de manipulación del odómetro, donde el vendedor retrocede la lectura para que un auto de alto kilometraje parezca mejor de lo que es.
              </p>
              <p>
                Esta herramienta no reemplaza ese criterio — te da un punto de referencia. Ingresa la lectura del odómetro, opcionalmente la edad del auto, y verás tanto una comparación de distancia real como, en las versiones específicas por país de esta herramienta, una verificación contra los promedios de uso típico local.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground mb-2" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Qué Significa Realmente &ldquo;Kilometraje Alto&rdquo;
              </h2>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>No existe un punto de corte universal donde un auto pasa de &ldquo;normal&rdquo; a &ldquo;kilometraje alto&rdquo; — depende del vehículo, de cómo fue conducido y de qué tan bien fue mantenido. Un motor diésel diseñado para trayectos largos en carretera puede superar cómodamente los 300.000 km con mantenimiento regular, mientras que un auto usado principalmente en trayectos cortos de ciudad puede mostrar desgaste bastante antes de llegar a las seis cifras.</p>
                <p>Como punto de partida, muchos compradores tratan el kilometraje elevado como una señal que merece una revisión más cuidadosa — no como motivo automático de descarte — una vez que supera claramente el promedio anual típico multiplicado por la edad del auto. Un historial de mantenimiento completo que coincida con el kilometraje es una señal mucho más confiable que el número por sí solo.</p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground mb-2" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Cómo Saber Si el Kilometraje Es Real
              </h2>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>La manipulación del odómetro — retroceder el kilometraje de un auto antes de venderlo — sigue siendo lo suficientemente común como para verificarla activamente, en lugar de confiar solo en el número del tablero. Algunas verificaciones prácticas: compara la lectura actual con los registros de mantenimiento, revisiones técnicas o el historial del VIN; revisa el desgaste del volante, los pedales y el asiento del conductor, que debería coincidir aproximadamente con la distancia declarada; y desconfía especialmente de un kilometraje que parezca implausiblemente bajo para la edad del auto sin una explicación clara.</p>
                <p>Si algo no coincide, un <Link href="/tools/vin-checker-global" className="text-foreground underline underline-offset-2">chequeo del VIN</Link> suele ser la forma más rápida de ver si la lectura actual coincide con lo registrado anteriormente.</p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              El Kilometraje y el Valor de Reventa
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                El kilometraje es uno de los factores que más pesan al negociar el precio de un auto usado, junto con el año, la versión y el estado general. Un auto con kilometraje claramente documentado y creíble suele obtener un mejor precio que uno con una lectura difícil de verificar o sospechosa, incluso si la condición mecánica real es similar.
              </p>
              <p>
                Si estás vendiendo, ser transparente sobre cómo se acumuló el kilometraje — por ejemplo, si fue principalmente en carretera o en trayectos cortos de ciudad — puede ayudar a que la venta avance más rápido y con menos objeciones del comprador.
              </p>
            </div>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              El Kilometraje Varía Según el País
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                Lo que se considera un kilometraje &ldquo;normal&rdquo; no es igual en todos lados. En México, donde muchos conductores enfrentan trayectos largos entre ciudades y tráfico intenso en zonas metropolitanas, el rango de 15.000 a 20.000 km al año es una referencia común. En España, con ciudades más compactas y buen transporte público, algunos conductores urbanos recorren bastante menos, mientras que en Argentina y otros países con grandes distancias entre ciudades, el promedio puede ser más alto.
              </p>
              <p>
                Por eso, además de esta calculadora global, el selector de país en la parte superior te permite comparar la lectura del odómetro contra ciudades específicas de más de 30 países — útil si estás evaluando un auto que se usó principalmente en otro país o si simplemente quieres una referencia más cercana a tu propia región.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Calculadora de Kilometraje — Preguntas Frecuentes
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: '¿Cuánto kilometraje es mucho para un auto?', a: 'La mayoría recorre entre 15.000 y 20.000 km al año. Un auto de 5 años con 75.000–100.000 km es típico; uno de 10 años con 150.000–200.000 km tampoco es inusual. Lo importante es si el kilometraje coincide con la edad del auto.' },
                { q: '¿Qué es un buen kilometraje en un auto usado?', a: 'No hay un número fijo — depende del tipo de auto, cómo fue conducido y su mantenimiento. Un auto de carretera suele desgastarse menos que uno de ciudad con el mismo kilometraje.' },
                { q: '¿Cómo sé si el kilometraje es real?', a: 'Compara la lectura con registros de mantenimiento, revisiones técnicas o el historial del VIN. Un kilometraje sospechosamente bajo para la edad del auto es una señal común de manipulación.' },
                { q: '¿Cuál es el kilometraje promedio por año?', a: 'En general, entre 15.000 y 20.000 km al año, aunque varía según el país — el tráfico y la distancia de los trayectos diarios influyen bastante.' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3">
                    <span className="text-sm font-semibold text-foreground">{q}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-180 transition-transform" />
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
              <Link href="/tools/vin-checker-global" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Chequeo del VIN (Global)</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/tools/mileage-explainer" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Mileage Explainer (English)</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
