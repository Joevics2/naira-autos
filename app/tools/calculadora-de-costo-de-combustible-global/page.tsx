import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, Globe2 } from 'lucide-react';
import GlobalFuelCostClientEs from './client';

export const metadata: Metadata = {
  title: 'Calculadora de Costo de Combustible — Gratis, en Tu Propia Moneda',
  description: 'Calcula el costo de combustible de cualquier auto en euros, pesos mexicanos, pesos argentinos, pesos colombianos, pesos chilenos y más. Rutas reales en España, México, Argentina, Colombia y Chile.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/calculadora-de-costo-de-combustible-global',
    languages: {
      en: 'https://www.naira.autos/tools/fuel-cost-calculator-global',
      es: 'https://www.naira.autos/tools/calculadora-de-costo-de-combustible-global',
      'x-default': 'https://www.naira.autos/tools/fuel-cost-calculator-global',
    },
  },
  openGraph: {
    title: 'Calculadora de Costo de Combustible | Naira Autos',
    description: 'Calcula el gasto de gasolina o diésel de cualquier auto, en tu propia moneda, con rutas reales entre ciudades hispanohablantes.',
    url: 'https://www.naira.autos/tools/calculadora-de-costo-de-combustible-global',
  },
  keywords: [
    'calculadora de costo de combustible', 'calculadora de gasolina', 'cuánto gasto en gasolina',
    'cuánto cuesta un viaje en gasolina', 'calculadora de gasto de gasolina por viaje',
    'cuántos litros de gasolina por km', 'cuántos km por litro de gasolina', 'cuántos km por litro diésel',
    'precio de la gasolina por litro', 'cuánto cuesta llenar el tanque',
    'calculadora de combustible México', 'calculadora de nafta Argentina', 'calculadora de gasolina España',
    'calculadora de gasolina Colombia', 'calculadora de bencina Chile', 'gasto de gasolina por hora de manejo',
  ].join(', '),
};

const LAST_UPDATED = '2026-08-28';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/calculadora-de-costo-de-combustible-global',
      name: 'Calculadora de Costo de Combustible — Gratis, en Tu Propia Moneda',
      description: 'Calcula el costo de combustible de cualquier auto en tu propia moneda, con rutas reales en países hispanohablantes.',
      url: 'https://www.naira.autos/tools/calculadora-de-costo-de-combustible-global',
      datePublished: '2026-08-28',
      dateModified: LAST_UPDATED,
      inLanguage: 'es',
      author: { '@type': 'Organization', name: 'Equipo Editorial de Naira Autos', url: 'https://www.naira.autos/about' },
      publisher: { '@type': 'Organization', name: 'Naira Autos', logo: { '@type': 'ImageObject', url: 'https://www.naira.autos/logo.png' } },
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://www.naira.autos/herramientas' },
        { '@type': 'ListItem', position: 3, name: 'Calculadora de Costo de Combustible', item: 'https://www.naira.autos/tools/calculadora-de-costo-de-combustible-global' },
      ]},
    },
    {
      '@type': 'HowTo',
      name: 'Cómo estimar el costo de combustible de un viaje',
      description: 'Un método simple de tres pasos para calcular cuánta gasolina o diésel costará un viaje, en cualquier moneda.',
      totalTime: 'PT2M',
      step: [
        { '@type': 'HowToStep', name: 'Obtén la distancia', text: 'Elige una ruta predefinida o ingresa una distancia personalizada en kilómetros.' },
        { '@type': 'HowToStep', name: 'Encuentra el rendimiento de tu auto', text: 'Busca el consumo de tu auto en litros por 100km (ciudad, carretera o mixto) en la lista de modelos.' },
        { '@type': 'HowToStep', name: 'Multiplica por el precio del litro', text: 'Litros necesarios = (rendimiento ÷ 100) × distancia. Costo de combustible = litros × precio actual por litro en tu moneda.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: '¿Cómo estimo el costo de combustible de un viaje?', acceptedAnswer: { '@type': 'Answer', text: 'Multiplica la distancia de tu ruta (km) por el rendimiento de tu auto (L/100km), divide entre 100 para obtener los litros necesarios, y multiplica por el precio actual del litro. Esta calculadora hace esa cuenta al instante para más de 100 modelos, en tu propia moneda.' } },
        { '@type': 'Question', name: '¿El estilo de manejo cambia mucho el costo de combustible?', acceptedAnswer: { '@type': 'Answer', text: 'Sí, de forma significativa. El tráfico de ciudad con paradas constantes, las aceleraciones y frenadas bruscas, y el uso continuo del aire acondicionado pueden aumentar el consumo real 25–40% por encima de la cifra de carretera. Por eso esta calculadora permite alternar entre modo Ciudad, Mixto y Carretera.' } },
        { '@type': 'Question', name: '¿Cuántos litros de gasolina se usan por kilómetro?', acceptedAnswer: { '@type': 'Answer', text: 'La mayoría de los autos de gasolina usan entre 0,06 y 0,12 litros por km (6–12L/100km), según el tamaño del motor y las condiciones de manejo. Divide la cifra de L/100km entre 100 para obtener litros por km.' } },
        { '@type': 'Question', name: '¿Cuántos kilómetros por litro de diésel rinde un auto?', acceptedAnswer: { '@type': 'Answer', text: 'Un auto diésel típico rinde entre 11 y 20 km por litro (100 ÷ L/100km). Un SUV diésel a 7L/100km, por ejemplo, rinde cerca de 14,3 km por litro — los motores diésel suelen ser 15–25% más eficientes que sus equivalentes de gasolina.' } },
        { '@type': 'Question', name: '¿Cuánto cuesta un tanque de 50 litros de gasolina?', acceptedAnswer: { '@type': 'Answer', text: 'Depende del país: en España, a €1,60/litro, un tanque de 50L cuesta unos €80. En México, a $24 MXN/litro, cuesta unos $1.200 MXN. En Chile, a $1.480 CLP/litro, cuesta unos $74.000 CLP. Usa el selector de moneda arriba para ver el costo exacto en tu país.' } },
        { '@type': 'Question', name: '¿Cuánto cuesta la gasolina en México, España, Argentina, Colombia y Chile?', acceptedAnswer: { '@type': 'Answer', text: 'A finales de agosto de 2026: México ronda los $24 MXN/litro (gasolina Magna); España cerca de €1,60/litro; Argentina entre $2.000 y $2.250 ARS/litro (muy volátil); Colombia cerca de $4.200 COP/litro; y Chile cerca de $1.480 CLP/litro. Estos precios cambian con frecuencia — ajusta el control deslizante para tu precio actual.' } },
        { '@type': 'Question', name: '¿Cuánto gasto en gasolina para un viaje de Madrid a Barcelona?', acceptedAnswer: { '@type': 'Answer', text: 'La distancia por carretera es de aproximadamente 620km. Un auto con consumo mixto de 7L/100km necesitaría unos 43 litros — alrededor de €69 a €1,60/litro.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Calculadora de Costo de Combustible', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function CalculadoraDeCostoDeCombustibleGlobalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── Hero oscuro ── */}
      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/herramientas" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Atrás">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/herramientas" className="hover:text-white/60 transition-colors">Herramientas</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Calculadora de Costo de Combustible</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Globe2 className="h-3 w-3" />
                Herramienta Gratuita
              </span>
              <Link href="/tools/fuel-cost-calculator-global" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read this in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Calculadora de<br /><span className="text-emerald-400">Costo de Combustible</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">¿Cuánto te va a costar ese viaje en gasolina?</p>
            <p className="text-white/75 text-sm leading-relaxed">Elige tu auto, selecciona una ruta real o ingresa una distancia personalizada, y ajusta el precio por litro en tu propia moneda — euros, pesos mexicanos, pesos argentinos, pesos colombianos, pesos chilenos y más.</p>
          </div>
        </div>
      </div>

      <GlobalFuelCostClientEs />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          {/* EEAT: autoría, metodología, actualidad */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground border border-border rounded-xl bg-card px-4 py-3">
            <p><strong className="text-foreground">Revisado por:</strong> Equipo Editorial de Naira Autos — datos e investigación automotriz</p>
            <p><strong className="text-foreground">Última actualización:</strong> 28 de agosto de 2026</p>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Cómo Estimar el Costo de Combustible de un Viaje
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>El método es simple — puedes hacerlo a mano en menos de un minuto, o dejar que la herramienta de arriba lo haga al instante para tu auto y moneda exactos:</p>
                <ol className="list-decimal list-inside space-y-1.5">
                  <li><strong className="text-foreground">Obtén la distancia.</strong> Elige una ruta predefinida o ingresa una distancia personalizada en kilómetros.</li>
                  <li><strong className="text-foreground">Encuentra el rendimiento de tu auto.</strong> Busca su cifra de ciudad, carretera o mixto en L/100km en la lista de modelos.</li>
                  <li><strong className="text-foreground">Multiplica por el precio del litro.</strong> Litros necesarios = (rendimiento ÷ 100) × distancia. Costo = litros × precio actual por litro.</li>
                </ol>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Como el precio de la gasolina cambia con frecuencia y varía por país — y en el caso de Argentina, incluso mes a mes — no fijamos un único &ldquo;precio actual&rdquo;. El control deslizante te permite ajustar el precio exacto que pagas hoy, en cualquier país hispanohablante.</p>
                <p>Esta calculadora prioriza España, México, Argentina, Colombia y Chile con precios de referencia reales, pero el selector de moneda y de ruta también da acceso a las otras 48 monedas y países que cubre la versión completa — más de 200 ciudades en total.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Precio de la Gasolina en Países Hispanohablantes
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-3xl">
              El precio del combustible varía muchísimo entre países hispanohablantes — no solo por el valor de cada moneda, sino por impuestos, subsidios y regulación local. Esta es una referencia de precios reales investigados a finales de agosto de 2026:
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-4 py-3 font-bold text-foreground">País</th>
                    <th className="text-center px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">Precio de referencia</th>
                    <th className="text-center px-4 py-3 font-bold text-muted-foreground">Nota</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['España', '≈ €1,60 / litro', 'Gasolina 95 octanos, promedio nacional'],
                    ['México', '≈ $24 MXN / litro', 'Gasolina Magna (regular), promedio Pemex/CRE'],
                    ['Argentina', '≈ $2.000–2.250 ARS / litro', 'Nafta Súper, muy volátil — ajusta con frecuencia'],
                    ['Colombia', '≈ $4.200 COP / litro', 'Gasolina corriente, regulada por la CREG'],
                    ['Chile', '≈ $1.480 CLP / litro', 'Bencina 93 octanos, regulada por ENAP/MEPCO'],
                  ].map(([country, price, note]) => (
                    <tr key={country} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2.5 font-medium text-foreground text-sm">{country}</td>
                      <td className="px-4 py-2.5 text-center text-emerald-600 dark:text-emerald-400 font-bold">{price}</td>
                      <td className="px-4 py-2.5 text-center text-muted-foreground text-xs">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Precios de referencia — cambian con frecuencia. Usa el control deslizante en la calculadora de arriba para ingresar el precio exacto que pagas hoy en tu estación de servicio.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Litros por KM vs KM por Litro — Gasolina y Diésel
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <div className="space-y-3">
                <p>Los fabricantes suelen dar el rendimiento en <strong className="text-foreground">litros por 100km (L/100km)</strong> — un número más bajo significa mejor rendimiento. Para obtener <strong className="text-foreground">litros por km</strong>, simplemente divide entre 100: un auto de 8L/100km usa 0,08 litros por km. La mayoría de los autos de gasolina están en el rango de <strong className="text-foreground">6–12L/100km</strong>.</p>
                <p>Para saber cuántos <strong className="text-foreground">km rinde 1 litro</strong> — la pregunta más intuitiva — divide 100 entre la cifra de L/100km. Un auto de 8L/100km rinde 100 ÷ 8 = <strong className="text-foreground">12,5 km por litro</strong>.</p>
              </div>
              <div className="space-y-3">
                <p>Los motores diésel suelen ser <strong className="text-foreground">15–25% más eficientes</strong> que un motor de gasolina comparable. Un auto diésel usa comúnmente <strong className="text-foreground">5–9L/100km</strong>, lo que equivale a unos <strong className="text-foreground">11–20 km por litro de diésel</strong> — notablemente más que el equivalente en gasolina.</p>
                <p>Por eso el diésel suele preferirse para trayectos largos y de alto kilometraje, aunque el precio del litro de diésel a veces sea más alto que el de la gasolina, dependiendo del país.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: '¿Cómo estimo el costo de combustible de un viaje?', a: 'Multiplica la distancia (km) por el rendimiento de tu auto (L/100km), divide entre 100 para obtener los litros, y multiplica por el precio del litro. Esta calculadora lo hace al instante para más de 100 modelos, en tu propia moneda.' },
                { q: '¿El estilo de manejo cambia mucho el costo de combustible?', a: 'Sí, significativamente. El tráfico de ciudad, las frenadas bruscas y el uso constante del aire acondicionado pueden aumentar el consumo real 25–40% sobre la cifra de carretera. Alterna entre modo Ciudad, Mixto y Carretera para ver la diferencia.' },
                { q: '¿Cuántos litros de gasolina se usan por kilómetro?', a: 'Entre 0,06 y 0,12 litros por km (6–12L/100km), según el motor y las condiciones de manejo. Divide la cifra de L/100km entre 100 para obtener litros por km.' },
                { q: '¿Cuántos km por litro rinde un auto diésel?', a: 'Entre 11 y 20 km por litro, calculado como 100 ÷ L/100km. Un SUV diésel a 7L/100km rinde cerca de 14,3 km por litro.' },
                { q: '¿Cuánto cuesta la gasolina en México?', a: 'La gasolina Magna (regular) ronda los $24 MXN por litro a finales de agosto de 2026, según datos de Pemex/CRE. La Premium ronda los $28–29 MXN.' },
                { q: '¿Cuánto cuesta la nafta en Argentina?', a: 'La Nafta Súper de YPF rondaba entre $2.000 y $2.250 ARS por litro en agosto de 2026 en Buenos Aires. El precio en Argentina es muy volátil — verifica el precio actual antes de calcular.' },
                { q: '¿Cuánto cuesta la gasolina en España?', a: 'La gasolina 95 octanos ronda los €1,60 por litro en promedio nacional, aunque varía por comunidad autónoma y estación de servicio.' },
                { q: '¿Cuánto cuesta la gasolina en Colombia?', a: 'La gasolina corriente, regulada por la CREG, rondaba los $4.200 COP por litro (unos $15.900–16.000 COP por galón) a mediados de 2026.' },
                { q: '¿Cuánto cuesta la bencina en Chile?', a: 'La bencina de 93 octanos, regulada por ENAP/MEPCO, rondaba los $1.480 CLP por litro a finales de agosto de 2026.' },
                { q: '¿Cuánto gasto en gasolina de Ciudad de México a Guadalajara?', a: 'La distancia por carretera es de aproximadamente 540km. Un auto con consumo mixto de 9L/100km necesitaría unos 49 litros — alrededor de $1.170 MXN a $24 MXN/litro.' },
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
              <Link href="/tools/calculadora-de-kilometraje" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Calculadora de Kilometraje</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/tools/decodificador-de-vin" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Decodificador de VIN</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
