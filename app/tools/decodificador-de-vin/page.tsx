import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VINCheckerClientEs from '@/components/VINCheckerClientEs';

export const metadata: Metadata = {
  title: 'Decodificador de VIN Gratis — Consulta VIN y Número de Chasis',
  description: 'Decodificador de VIN gratis para cualquier auto. Consulta el VIN, NIV o número de chasis — marca, modelo, año, motor y país de origen. Ideal para autos importados de EE.UU. a México y Latinoamérica.',
  keywords: ['decodificador de vin gratis', 'consulta de vin', 'consultar vin gratis', 'verificar vin', 'qué es el niv de un auto', 'consulta niv', 'número de chasis', 'número de serie del auto', 'historial del vehículo por vin', 'vin decoder gratis', 'decodificador vin méxico'],
  alternates: {
    canonical: 'https://www.naira.autos/tools/decodificador-de-vin',
    languages: {
      en: 'https://www.naira.autos/tools/vin-checker-global',
      es: 'https://www.naira.autos/tools/decodificador-de-vin',
      'x-default': 'https://www.naira.autos/tools/vin-checker-global',
    },
  },
  openGraph: {
    title: 'Decodificador de VIN Gratis | Naira Autos',
    description: 'Consulta gratis el VIN, NIV o número de chasis de cualquier auto — marca, modelo, año, motor y origen, al instante.',
    url: 'https://www.naira.autos/tools/decodificador-de-vin',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/decodificador-de-vin',
      name: 'Decodificador de VIN Gratis — Consulta VIN y Número de Chasis',
      description: 'Decodificador de VIN gratis para cualquier auto — marca, modelo, año, motor y país de origen.',
      url: 'https://www.naira.autos/tools/decodificador-de-vin',
      inLanguage: 'es',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://www.naira.autos/herramientas' },
        { '@type': 'ListItem', position: 3, name: 'Decodificador de VIN', item: 'https://www.naira.autos/tools/decodificador-de-vin' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: '¿Qué es el VIN de un auto?', acceptedAnswer: { '@type': 'Answer', text: 'El VIN (Vehicle Identification Number) es un código único de 17 caracteres asignado a cada vehículo en la fábrica. Codifica el país de origen, fabricante, tipo de vehículo, motor, año del modelo, planta de ensamblaje y un número de serie único. En México también se le conoce como NIV (Número de Identificación Vehicular), y en muchos países se usa el término "número de chasis" o "número de serie".' } },
        { '@type': 'Question', name: '¿Cómo hago una consulta de VIN gratis?', acceptedAnswer: { '@type': 'Answer', text: 'Ingresa el VIN de 17 caracteres arriba y presiona "Decodificar". Nuestro decodificador gratuito usa la base de datos pública de NHTSA (EE.UU.) para mostrar marca, modelo, año, especificaciones del motor, tipo de tracción y planta de origen — completamente gratis, sin registro, desde cualquier país.' } },
        { '@type': 'Question', name: '¿Dónde está el número de VIN en un auto?', acceptedAnswer: { '@type': 'Answer', text: 'El VIN aparece en tres lugares: la placa del tablero (visible por el parabrisas), la etiqueta dentro del marco de la puerta del conductor, y grabado en el chasis bajo el capó. Los tres deben coincidir exactamente.' } },
        { '@type': 'Question', name: '¿Es lo mismo el VIN que el NIV?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. VIN es la sigla en inglés (Vehicle Identification Number); NIV es su equivalente en español (Número de Identificación Vehicular), el término oficial usado en México. Es exactamente el mismo código de 17 caracteres.' } },
        { '@type': 'Question', name: '¿Este decodificador de VIN funciona para autos importados a México?', acceptedAnswer: { '@type': 'Answer', text: 'Sí, siempre que el vehículo haya sido fabricado originalmente para el mercado de Estados Unidos, Canadá o México, que es el caso de la gran mayoría de los autos importados legalmente a México desde el norte. Vehículos fabricados exclusivamente para Europa o Asia pueden no aparecer en la base de datos de NHTSA.' } },
        { '@type': 'Question', name: '¿Funciona para autos en España o Sudamérica?', acceptedAnswer: { '@type': 'Answer', text: 'Depende del origen del vehículo, no del país donde esté registrado. Un auto fabricado para el mercado norteamericano y luego importado a España, Argentina, Chile o Colombia sí decodifica normalmente. Un auto de fabricación europea o asiática, registrado originalmente en esos países, generalmente no aparece en esta base de datos — en España, lo habitual para ese caso es una consulta directa en la DGT.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Decodificador de VIN Gratis', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function DecodificadorDeVinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/herramientas" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="Atrás">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/herramientas" className="hover:text-white/60 transition-colors">Herramientas</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Decodificador de VIN</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">100% Gratis</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Con datos de NHTSA</span>
              <Link href="/tools/vin-checker-global" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Decodificador de VIN<br /><span className="text-blue-400">Gratis y Número de Chasis</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Consulta el VIN o NIV de cualquier auto, en segundos.</p>
            <p className="text-white/75 text-sm leading-relaxed">Ingresa el VIN de 17 caracteres del tablero, marco de la puerta o chasis. Obtén marca, modelo, año, especificaciones del motor y país de origen — gratis, sin registro. Ideal si estás comprando un auto importado a México, España o cualquier país de Latinoamérica.</p>
          </div>
        </div>
      </div>

      <VINCheckerClientEs />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Consulta de VIN Gratis para Cualquier Auto Usado</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Nuestro <strong className="text-foreground">decodificador de VIN gratis</strong> usa la base de datos pública de NHTSA (la autoridad de tránsito de EE.UU.). Una <strong className="text-foreground">consulta de VIN gratuita</strong> te da marca, modelo, año, especificaciones del motor, tipo de tracción, clase de carrocería y planta de ensamblaje — todo lo que necesitas para confirmar qué es realmente un auto usado antes de comprarlo.</p>
                  <p>El mercado de autos usados es cada vez más internacional. Vehículos fabricados para Estados Unidos, Canadá y México se exportan y re-registran constantemente — como importaciones legales a México desde el norte, como autos de colección llevados a España, o como camionetas y SUVs que llegan a Sudamérica. Como el VIN se graba en fábrica y nunca cambia, una sola consulta de VIN gratis funciona igual sin importar en qué país termine el auto, siempre que haya sido fabricado originalmente para el mercado norteamericano.</p>
                  <p>Ese último punto es clave. El VIN no es un número de placas que asigna tu gobierno local — es una huella de fabricación aplicada en la línea de ensamblaje, mucho antes de que el auto saliera de la fábrica. No cambia cuando el vehículo se exporta, se re-registra, se le ponen placas nuevas o se revende varias veces. Por eso una consulta de VIN gratis puede seguir a un auto a través de fronteras de una manera que un número de placas nunca podría.</p>
                  <p>La mayoría de la gente consulta el VIN justo cuando ya acordó un precio — pero lo más inteligente es hacerlo antes de ir a ver el auto en persona, antes de dar un anticipo, y de nuevo después de la compra para confirmar que nada se cambió en la entrega. No cuesta nada y toma menos de un minuto.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Consultas de VIN por País</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">México</strong> — la gran mayoría de los autos importados legalmente al país desde Estados Unidos o Canadá fueron fabricados para ese mercado, así que decodifican con precisión total: versión, motor, transmisión, y en muchos casos las opciones de fábrica. Términos como "<strong className="text-foreground">consulta NIV</strong>" y "<strong className="text-foreground">verificar número de serie</strong>" son de las búsquedas más comunes entre compradores de autos importados o de subastas tipo Copart — este decodificador gratuito responde exactamente a esa necesidad, antes de pagar un anticipo.</p>
                  <p><strong className="text-foreground">España y Europa</strong> — los autos registrados originalmente en España o el resto de la Unión Europea usan un sistema de matriculación distinto, así que el historial completo normalmente pasa por la DGT o el organismo de tránsito correspondiente. Donde esta herramienta sí es útil en España es con vehículos importados desde Norteamérica — un caso sorprendentemente común entre autos clásicos y camionetas estadounidenses que llegan como importación de coleccionista.</p>
                  <p><strong className="text-foreground">Argentina, Chile, Colombia y el resto de Sudamérica</strong> — donde se compren o importen vehículos originalmente fabricados para Norteamérica, el mismo VIN de 17 dígitos decodifica igual. Si estás comprando de forma particular un pickup o SUV que llegó como importación desde EE.UU., consultar el VIN antes de ver el auto en persona es un hábito que vale la pena — en el momento en que un auto cruza una frontera, la descripción del vendedor se vuelve más difícil de verificar a simple vista.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>¿Comprando un Auto Importado? Haz Esto Primero</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Comprar un auto importado tiene un riesgo extra que una compra local no tiene: el papeleo, el vendedor y el estado real del vehículo pueden haber tenido origen en un país que nunca has visitado. Una consulta gratuita de VIN o número de chasis no reemplaza una inspección, pero es el primer filtro más barato que existe, y no cuesta nada usarlo antes de avanzar.</p>
                  <p>Empieza decodificando el VIN y comparando el resultado — año, modelo, motor, versión — contra lo que el vendedor anunció exactamente. Una discordancia aquí, aunque sea pequeña como el motor equivocado, suele ser la primera señal de que las fotos del anuncio y el papeleo real no son del mismo auto. Después, revisa físicamente que el VIN del tablero coincida con el grabado en el chasis y el de la etiqueta de la puerta; una discordancia entre estos tres lugares es una de las señales más claras de una placa cambiada.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>VIN vs. NIV vs. Número de Chasis — ¿Son lo Mismo?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Sí, con matices de terminología regional. <strong className="text-foreground">VIN</strong> es el término internacional (Vehicle Identification Number). <strong className="text-foreground">NIV</strong> (Número de Identificación Vehicular) es el término oficial usado en México para exactamente el mismo código. <strong className="text-foreground">Número de chasis</strong> y <strong className="text-foreground">número de serie</strong> son los términos más comunes en el resto de Latinoamérica. En España, también se usa "número de bastidor". Todos se refieren al mismo código de 17 caracteres grabado en la fábrica.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Cómo Leer un VIN: Qué Significa Cada Sección</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Los 17 caracteres no son aleatorios. Las posiciones 1–3 identifican al fabricante y país de ensamblaje — así es como el decodificador sabe si un auto se fabricó en EE.UU., Canadá, México u otro lugar. Las posiciones 4–8 describen el vehículo: carrocería, motor y serie. La posición 9 es un dígito verificador matemático usado para detectar un VIN mal escrito o alterado. La posición 10 codifica el año del modelo, y las posiciones 12–17 son el número de producción único del vehículo.</p>
                  <p>Saber leer estas secciones tú mismo es útil incluso con un decodificador enfrente, porque te permite verificar los resultados en segundos. Si la posición 10 dice que el auto es un modelo 2015 pero el vendedor lo anunció como 2018, vale la pena preguntar directamente — no es una acusación, es una diligencia que no cuesta nada y toma treinta segundos.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Funciona para Cualquier Marca — Ford, Toyota, Honda, Chevrolet y Más</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>No es una herramienta de una sola marca. Como lee directamente de la base de datos de fabricantes de NHTSA, el mismo decodificador funciona para Ford, Toyota, Honda, Chevrolet, GMC, Nissan, Jeep, Hyundai y cualquier otra marca vendida en el mercado norteamericano. Solo pega el código de 17 caracteres y el decodificador identifica automáticamente el esquema del fabricante correcto — no necesitas indicar qué marca estás consultando.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Consulta de VIN vs. Reporte de Historial del Vehículo</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Una <strong className="text-foreground">consulta de VIN gratuita</strong> te dice qué era el auto cuando salió de la fábrica: especificaciones de fabricación. Para saber qué le ha pasado desde entonces — accidentes, kilometraje real, estatus del título (pérdida total, inundación, reconstruido) — necesitas un <strong className="text-foreground">reporte de historial del vehículo</strong> pagado, como Carfax o AutoCheck. Para cualquier compra de auto usado de valor considerable, un reporte de historial pagado es muy recomendable además de esta consulta gratuita de especificaciones.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Verifica el VIN Antes de Calcular Impuestos de Importación</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>En países donde el impuesto de importación de vehículos usados puede ser considerable, tener la especificación equivocada sale caro dos veces. Primero pagas de más por un auto que no es lo que anunciaban, y después puede que tu cálculo de aranceles se haya basado en el motor o la versión equivocada — muchos esquemas de aranceles dependen directamente del tamaño del motor y la edad del vehículo. Decodificar el VIN antes de comprar te da el año y motor correctos para calcular con precisión, en vez de confiar en un dato que el vendedor escribió en el anuncio.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Decodificador de VIN — Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: '¿Esta consulta de VIN es realmente gratis?', a: 'Sí. 100% gratis, usando la API pública de NHTSA. No requiere cuenta ni inicio de sesión. Puedes hacer todas las consultas que necesites, desde cualquier país.' },
                { q: '¿Para qué sirve el número de VIN de un auto?', a: 'El VIN identifica un vehículo específico para verificar especificaciones, revisar historial, registro, seguro y avisos de retiro (recalls). En México, el NIV es requerido para el trámite de importación y cambio de propietario.' },
                { q: '¿Puedo consultar especificaciones por VIN gratis?', a: 'Sí. Nuestro decodificador gratuito devuelve marca, modelo, año, motor, tipo de carrocería, tracción y origen desde la base de datos de fabricantes de NHTSA, sin costo, para vehículos de especificación estadounidense, canadiense o mexicana.' },
                { q: '¿Funciona para autos importados a México desde Estados Unidos?', a: 'Sí, para cualquier vehículo fabricado originalmente para el mercado norteamericano — la gran mayoría de las importaciones legales a México. Vehículos de especificación exclusivamente europea o asiática pueden no aparecer.' },
                { q: '¿Cómo sé si un VIN es válido?', a: 'Un VIN válido tiene exactamente 17 caracteres — letras (A–Z, sin I, O, Q) y números. La posición 9 es un dígito verificador matemático. Si no coincide, el VIN fue alterado. Esta herramienta lo valida automáticamente.' },
                { q: '¿Qué hago si el decodificador no muestra resultados?', a: 'Generalmente significa que el vehículo es de origen europeo, asiático o de especificación exclusiva para otro mercado — fuera de la base de datos de NHTSA. Aun así decodificamos el año del modelo a partir de la posición 10 del VIN. Para esos casos, contacta el servicio oficial de VIN del fabricante.' },
                { q: '¿Es lo mismo el número de motor que el VIN?', a: 'No. El número de motor está grabado en el bloque del motor e identifica ese motor específico, mientras que el VIN/NIV identifica el vehículo completo. Esta herramienta decodifica el VIN, no el número de motor por separado.' },
                { q: '¿El VIN afecta cuánto pago de impuestos de importación?', a: 'Indirectamente, sí. Muchos países calculan el arancel de importación usando la edad y el tamaño del motor del vehículo, ambos confirmados por el VIN. Decodificarlo correctamente antes de calcular tus impuestos te ayuda a evitar presupuestar con cifras equivocadas.' },
                { q: '¿Puedo saber si un auto tuvo un accidente con esta consulta de VIN?', a: 'No. El decodificador gratuito solo devuelve especificaciones de fábrica — marca, modelo, año, motor y origen. El historial de accidentes, kilometraje y estatus del título requieren un reporte de historial pagado como Carfax o AutoCheck.' },
                { q: '¿Puedo saber si un VIN corresponde a un auto robado?', a: 'No con esta herramienta. Una búsqueda de vehículo robado es una consulta policial y de la industria aseguradora — el NICB (National Insurance Crime Bureau) ofrece una herramienta gratuita de VINCheck para ese propósito específico, distinta de un decodificador de especificaciones.' },
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/tools/mecanico-virtual" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Mecánico Virtual con IA</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/tools/calculadora-de-kilometraje" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Calculadora de Kilometraje</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
              <Link href="/tools/vin-checker-global" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">VIN Checker (English)</p>
                <ChevronRight className="h-4 w-4 text-blue-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
