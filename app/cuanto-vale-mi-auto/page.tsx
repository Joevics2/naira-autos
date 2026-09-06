import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ChevronRight } from 'lucide-react';
import { EvaluarMiAutoClient } from './client';

export const metadata: Metadata = {
  title: '¿Cuánto Vale Mi Auto? Tasación Gratis con IA | Naira Autos',
  description: 'Tasación de auto gratis con inteligencia artificial, en tu propia moneda. Sube una foto y recibe una cotización instantánea — México, España, Argentina, Colombia, Chile y más de 50 países.',
  keywords: [
    'cuánto vale mi auto',
    'tasación de auto gratis',
    'tasar mi coche',
    'cotizar mi auto',
    'valuar mi auto usado',
    'cotización de auto gratis',
    'tasación de coche online',
    'calculadora de valor de auto',
    'precio de auto usado',
    'cuánto vale mi coche',
    'valor de mercado de mi auto',
  ].join(', '),
  openGraph: {
    title: '¿Cuánto Vale Mi Auto? Tasación Gratis con IA',
    description: 'Tasación de auto con IA en tu propia moneda, en más de 50 países. Sube una foto y recibe una estimación instantánea. 100% gratis.',
    url: 'https://www.naira.autos/cuanto-vale-mi-auto',
    siteName: 'Naira Autos',
    locale: 'es_ES',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/cuanto-vale-mi-auto',
    languages: {
      en: 'https://www.naira.autos/evaluate-used-car',
      es: 'https://www.naira.autos/cuanto-vale-mi-auto',
      ar: 'https://www.naira.autos/kam-qeemat-sayarati',
      'x-default': 'https://www.naira.autos/evaluate-used-car',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '¿Cuánto Vale Mi Auto? Tasación Gratis con IA',
  description: 'Herramienta gratuita de tasación de autos con inteligencia artificial. Cotización instantánea en tu propia moneda, calibrada al mercado de tu país entre más de 50 países.',
  url: 'https://www.naira.autos/cuanto-vale-mi-auto',
  inLanguage: 'es',
  dateModified: '2026-08-05',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'Tasación de Auto con IA — Naira Autos',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0' },
    description: 'Sube una foto de tu auto y recibe una tasación de mercado instantánea con IA, calibrada a las tasas de mercado actuales de tu país.',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.naira.autos' },
      { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://www.naira.autos/herramientas' },
      { '@type': 'ListItem', position: 3, name: 'Tasación de Auto con IA', item: 'https://www.naira.autos/cuanto-vale-mi-auto' },
    ],
  },
  faqPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: '¿Cuánto vale mi auto usado?', acceptedAnswer: { '@type': 'Answer', text: 'Depende de la marca, modelo, año, versión, kilometraje y condición, además de lo que se están vendiendo autos similares en tu país en este momento. Sube una foto arriba y selecciona tu país — nuestra IA identifica tu auto y devuelve un rango de precio en tu moneda local, contrastado contra anuncios actuales en ese mercado.' } },
      { '@type': 'Question', name: '¿Qué factores afectan la tasación de un auto usado?', acceptedAnswer: { '@type': 'Answer', text: 'Los factores principales son: (1) marca y modelo — algunos conservan mejor su valor de reventa según el mercado. (2) Año, versión y kilometraje. (3) Condición de carrocería y pintura. (4) Estado mecánico e historial de servicio. (5) Papeles completos de título, registro y propiedad. (6) Oferta y demanda local — el mismo auto puede valer distinto en diferentes países y ciudades.' } },
      { '@type': 'Question', name: '¿Mi país afecta la tasación?', acceptedAnswer: { '@type': 'Answer', text: 'Sí, de forma significativa. Los aranceles de importación, la demanda local de ciertas marcas, la fortaleza de la moneda y el tamaño del mercado de usados cambian los precios entre países. Nuestra herramienta cubre más de 50 países y devuelve una estimación en la moneda local correcta, ajustada a ese mercado y no a un promedio global.' } },
      { '@type': 'Question', name: '¿Qué tan precisa es una tasación con inteligencia artificial?', acceptedAnswer: { '@type': 'Answer', text: 'Nuestra herramienta usa Gemini Vision para identificar la marca, modelo, año y versión exactos a partir de tu foto, y luego contrasta datos reales de anuncios en tu país seleccionado para generar un rango de precio, no un número único. Considéralo un punto de partida bien informado, no un precio de contrato — el valor final siempre depende de una inspección en persona y la negociación.' } },
      { '@type': 'Question', name: '¿Esta herramienta de tasación es realmente gratis?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. No tiene costo, no requiere cuenta y no hay límite de usos.' } },
    ],
  },
};

const VALUATION_FACTORS = [
  { icon: TrendingUp, title: 'Marca y Valor de Reventa', body: 'La fortaleza de reventa varía por mercado — Toyota y Honda mantienen su valor en la mayoría de las regiones, mientras que las marcas premium alemanas se deprecian más rápido en mercados con costos de mantenimiento altos. La demanda local importa tanto como el emblema.' },
  { icon: Shield, title: 'Kilometraje e Historial', body: 'Un kilometraje bajo y un historial de servicio documentado son las dos señales más fuertes de un auto bien cuidado en cualquier parte del mundo. Un historial limpio puede valer más que un modelo un año más nuevo.' },
  { icon: CheckCircle2, title: 'Título y Documentación', body: 'Un título limpio, registro vigente y papeles de propiedad completos son innegociables para obtener el valor máximo en cualquier mercado. Títulos de pérdida total, complicaciones de importación o papeles faltantes suelen reducir el precio alcanzable entre 15% y 25%.' },
  { icon: AlertCircle, title: 'Condición', body: 'Un exterior limpio sin golpes, óxido ni pintura desgastada, junto con un motor mecánicamente sano, consistentemente añade entre 10% y 15% al valor de mercado frente a un equivalente visiblemente desgastado.' },
];

const FAQ_ITEMS = [
  { q: '¿Cuánto vale mi auto usado?', a: 'Depende de la marca, modelo, año, versión, kilometraje y condición — además de lo que se están vendiendo autos similares en tu país ahora mismo. Sube una foto arriba y selecciona tu país para una estimación con IA en tu moneda local.' },
  { q: '¿Qué factores afectan la tasación de un auto usado?', a: 'Marca y modelo, año y versión, kilometraje, condición de carrocería y mecánica, papeles de título/registro completos, y la oferta y demanda local en tu mercado específico.' },
  { q: '¿Mi país afecta la tasación?', a: 'Sí — los aranceles de importación, la demanda local de marcas, la fortaleza de la moneda y el tamaño del mercado cambian los precios entre países. Cubrimos más de 50 países y cotizamos en tu moneda local, no en un promedio global.' },
  { q: '¿Cómo cotizo mi auto correctamente antes de venderlo?', a: 'Usa nuestra herramienta gratuita de tasación con IA para una estimación, y después revisa anuncios locales activos de autos comparables. Cotizar entre 5% y 10% por encima de tu precio mínimo aceptable es práctica estándar en la mayoría de los mercados, para dejar margen de negociación.' },
  { q: '¿Qué tan precisa es una tasación con inteligencia artificial?', a: 'Usa Gemini Vision para identificar tu auto exacto a partir de la foto, y luego contrasta datos reales de anuncios en tu país seleccionado. Considéralo un punto de partida confiable, no un precio de contrato — el valor final depende de la inspección y la negociación.' },
  { q: '¿La herramienta de tasación de auto es gratis?', a: 'Sí — sin costo, sin cuenta, y sin límite de usos.' },
];

export default function CuantoValeMiAutoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-background">

        {/* ── Hero oscuro ── */}
        <div className="bg-[#080C10] pt-16 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                Con IA · Gratis
              </span>
              <Link href="/evaluate-used-car" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)' }}>
              ¿CUÁNTO VALE<br /><span className="text-amber-400">TU AUTO?</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
              Sube una foto — recibe una tasación de mercado instantánea en tu propia moneda, con datos reales de anuncios e inteligencia artificial.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/30 text-xs font-medium">
              <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-amber-400" /> Análisis por foto</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span>México · España · Argentina · Colombia · Chile y más</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span className="text-amber-400 font-semibold">100% Gratis</span>
            </div>
          </div>
        </div>

        {/* ── Widget de tasación ── */}
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <EvaluarMiAutoClient />
          </div>
        </div>

        {/* ── Contenido SEO ── */}
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16 space-y-14">

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Entendiendo el Valor</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              ¿QUÉ DETERMINA EL PRECIO DE UN AUTO USADO?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUATION_FACTORS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm mb-1">{title}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-5">
            <h2 className="font-black uppercase text-foreground not-prose leading-none mb-4" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              TASACIÓN DE AUTOS USADOS: LA GUÍA COMPLETA
            </h2>

            <p>Saber el valor de mercado real de tu auto es el paso más importante antes de publicarlo en venta, entregarlo a cuenta de otro o negociar una compra — en cualquier parte del mundo. Cotizar muy alto deja tu anuncio sin vender. Cotizar muy bajo deja dinero real sobre la mesa. El reto es que el <strong className="text-foreground">"valor de mercado" no es un solo número</strong> — cambia por país, por moneda, por la demanda local de una marca específica, y por el historial y condición del auto en particular.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Por Qué el Mismo Auto Vale Distinto en Cada País</h3>
            <p>Un Toyota Corolla de cinco años en buena condición puede valer una cantidad muy distinta en España, México, Argentina y Colombia — incluso antes de convertir monedas. Los aranceles de importación y los impuestos locales sobre vehículos usados varían enormemente entre países. Algunos mercados tienen fuerte demanda doméstica por ciertas marcas (las marcas japonesas en gran parte de Latinoamérica, por ejemplo), lo que sostiene precios de reventa más altos. Otros tienen mercados de autos nuevos más grandes que alejan compradores de los usados, suavizando su valor de reventa. Por eso una sola guía de precios global no funciona — la tasación tiene que calibrarse por país.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Kilometraje e Historial de Servicio</h3>
            <p>En prácticamente todos los mercados, el kilometraje y el historial de servicio documentado son los dos predictores más fuertes de la condición de un auto, más allá de lo que muestra una foto. Un auto con menor kilometraje y récord de servicio completo típicamente obtiene una prima considerable sobre un equivalente de mayor kilometraje del mismo año, aunque ambos se vean parecidos en fotos. Un historial de servicio incompleto o faltante es una de las formas más rápidas de perder poder de negociación como vendedor.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Título, Registro y Documentación</h3>
            <p>En cada país que cubrimos, <strong className="text-foreground">tener los papeles limpios y completos es innegociable para obtener el valor máximo</strong>. Los compradores razonablemente descuentan autos con títulos de pérdida total, cadenas de propiedad incompletas, aranceles de importación sin pagar o registro faltante, porque el riesgo de complicaciones durante la transferencia es real sin importar la jurisdicción. Resolver problemas de documentación antes de publicar el anuncio casi siempre sale más barato que el descuento que de otra forma exigirán los compradores.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Condición y Presentación</h3>
            <p>Un exterior limpio sin golpes, óxido ni pintura desgastada, combinado con un motor y transmisión mecánicamente sanos, consistentemente añade al precio alcanzable frente a un equivalente visiblemente desgastado — esto se cumple ya sea que el auto se venda en Madrid, Ciudad de México o Buenos Aires. Arreglos simples y de bajo costo (una limpieza a fondo, retocar rayones menores, cambiar un foco fundido) suelen pagarse varias veces en el precio final de venta.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Moneda y Momento de Mercado</h3>
            <p>En países que dependen fuertemente de vehículos usados importados, los precios de los autos están estrechamente ligados a los movimientos del tipo de cambio — una moneda local más débil eleva el costo de las importaciones y empuja los precios de usados hacia arriba, mientras que una moneda más fuerte tiene el efecto contrario. Esto significa que una tasación de hace un año o dos puede ser una mala guía para los precios actuales. Siempre verifica contra datos de mercado actuales en vez de guías de precios desactualizadas o la venta de un conocido del año pasado.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Cómo Funciona Esta Herramienta</h3>
            <p>Sube una foto clara de tu auto y selecciona tu país. Nuestra IA (Gemini Vision) identifica la marca, modelo, año y versión a partir de la imagen, y luego contrasta datos actuales de anuncios en tu mercado seleccionado para generar un rango de precio en tu moneda local — no solo una estimación única. El resultado incluye los factores específicos que influyeron en la estimación, para que veas por qué se llegó a ese número. Está diseñado como un punto de partida rápido y gratuito para negociar, no como sustituto de una inspección en persona.</p>
          </section>

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Preguntas Comunes</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              PREGUNTAS FRECUENTES
            </h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map(({ q, a }) => (
                <details key={q} className="group border border-border rounded-xl overflow-hidden bg-card">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-foreground text-sm select-none list-none">
                    {q}
                    <span className="ml-4 flex-shrink-0 text-muted-foreground text-lg leading-none group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <p className="px-5 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Más Herramientas Gratuitas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/tools/mecanico-virtual" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Mecánico Virtual con IA</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/tools/decodificador-de-vin" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Decodificador de VIN</p>
                <ChevronRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/tools/calculadora-de-kilometraje" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Calculadora de Kilometraje</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
