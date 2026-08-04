import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import ChassisNumberCheckerClientEs from './client';

export const metadata: Metadata = {
  title: 'Verificar Número de Chasis Gratis — Consulta VIN Online | Naira Autos',
  description: 'Verifica el número de chasis (o bastidor) de cualquier auto gratis. Obtén marca, modelo, año, motor y país de origen al instante — sin registro ni pago. Funciona para Toyota, Honda, Ford y más.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/verificar-numero-de-chasis',
    languages: {
      en: 'https://www.naira.autos/tools/chassis-number-check',
      es: 'https://www.naira.autos/tools/verificar-numero-de-chasis',
      'x-default': 'https://www.naira.autos/tools/chassis-number-check',
    },
  },
  openGraph: {
    title: 'Verificar Número de Chasis Gratis | Naira Autos',
    description: 'Consulta gratis el número de chasis o bastidor de cualquier auto — marca, modelo, año, motor y origen al instante.',
    url: 'https://www.naira.autos/tools/verificar-numero-de-chasis',
  },
  keywords: [
    'verificar número de chasis',
    'número de bastidor gratis',
    'consultar número de chasis',
    'qué es el número de chasis',
    'número de chasis vs VIN',
    'cómo saber si el chasis fue clonado',
    'decodificador de VIN gratis',
    'número de chasis México',
    'consultar VIN de un auto',
  ].join(', '),
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/verificar-numero-de-chasis',
      name: 'Verificar Número de Chasis Gratis — Consulta VIN Online',
      description: 'Verifica el número de chasis (o bastidor) de cualquier auto gratis. Obtén marca, modelo, año, motor y país de origen al instante.',
      url: 'https://www.naira.autos/tools/verificar-numero-de-chasis',
      inLanguage: 'es',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: '¿Qué es el número de chasis?', acceptedAnswer: { '@type': 'Answer', text: 'Es el código de 17 caracteres que el fabricante graba en la estructura del auto desde la línea de ensamblaje. Identifica de forma permanente la marca, el modelo, el motor, el año y la planta donde se armó ese vehículo específico. A diferencia de las placas, nunca cambia aunque el auto se revenda o se registre en otro país.' } },
        { '@type': 'Question', name: '¿El número de chasis es lo mismo que el VIN?', acceptedAnswer: { '@type': 'Answer', text: 'En la práctica sí — "VIN" es el término usado internacionalmente y en Estados Unidos, mientras que "número de chasis" es como se le conoce comúnmente en gran parte de Latinoamérica. Técnicamente el VIN completo tiene 17 caracteres y el número de chasis a veces se refiere solo a la parte final (los últimos 8), pero ambos identifican al mismo vehículo.' } },
        { '@type': 'Question', name: '¿Qué es el número de bastidor?', acceptedAnswer: { '@type': 'Answer', text: 'Es el mismo identificador de 17 caracteres, pero es el término oficial usado en España — aparece así en la ficha técnica, el permiso de circulación y la tarjeta ITV. "Chasis", "bastidor" y "VIN" describen el mismo código, solo cambia la palabra según el país.' } },
        { '@type': 'Question', name: '¿Cómo verifico el número de chasis gratis?', acceptedAnswer: { '@type': 'Answer', text: 'Ingresa el código de 17 caracteres en el buscador de esta página y presiona Decodificar. La herramienta consulta la base de datos pública NHTSA y devuelve marca, modelo, año, motor y planta de origen — gratis, sin cuenta ni pago.' } },
        { '@type': 'Question', name: '¿Cómo saber si el número de chasis fue clonado o alterado?', acceptedAnswer: { '@type': 'Answer', text: 'Compara el número grabado en el chasis, la placa del tablero y la etiqueta del marco de la puerta — los tres deben ser idénticos. Una discrepancia entre ellos, o un grabado con tipografía distinta o señales de lijado alrededor, es una alerta seria de que el número fue alterado.' } },
        { '@type': 'Question', name: '¿Funciona para autos comprados en México o importados de Estados Unidos?', acceptedAnswer: { '@type': 'Answer', text: 'Sí, siempre que el vehículo haya sido fabricado originalmente para el mercado de Estados Unidos, Canadá o México — lo cual describe a la gran mayoría de los autos importados que circulan en México y Centroamérica. Vehículos fabricados exclusivamente para otros mercados regionales pueden mostrar datos limitados.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Verificación Gratuita de Número de Chasis', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function VerificarNumeroDeChasisPage() {
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
              <span className="text-white/50">Verificar Número de Chasis</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">100% Gratis</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Con datos de NHTSA</span>
              <Link href="/tools/chassis-number-check" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Verifica el Número<br /><span className="text-blue-400">de Chasis Gratis</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Confirma el chasis (o bastidor) de cualquier auto en segundos.</p>
            <p className="text-white/75 text-sm leading-relaxed">Ingresa el número de 17 caracteres grabado bajo el cofre, en la placa del tablero o en el marco de la puerta. Obtén marca, modelo, año, motor y país de origen al instante — sin registro, sin pagar.</p>
          </div>
        </div>
      </div>

      <ChassisNumberCheckerClientEs />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>¿Qué Es el Número de Chasis?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>El <strong className="text-foreground">número de chasis</strong> es el código de 17 caracteres que el fabricante graba directamente en la estructura del vehículo durante el ensamblaje. En Latinoamérica se le conoce comúnmente como &ldquo;número de chasis&rdquo;; en España, el término oficial en la documentación es <strong className="text-foreground">&ldquo;número de bastidor&rdquo;</strong>. Internacionalmente se le llama VIN (Vehicle Identification Number). Los tres nombres describen exactamente el mismo código.</p>
                  <p>Esto es lo que muchos compradores confunden: el número de chasis <strong className="text-foreground">no es lo mismo</strong> que la placa o el número de registro. La placa la asigna una autoridad local y puede cambiar cada vez que el auto se reregistra en otro estado o país. El número de chasis se graba una sola vez, en la fábrica, y acompaña a ese auto específico durante toda su vida.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Número de Chasis vs VIN — ¿Son lo Mismo?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Para efectos prácticos, sí. Desde que la industria adoptó el estándar de 17 caracteres a inicios de los años 80, el <strong className="text-foreground">número de chasis y el VIN son el mismo código</strong>, leído de la misma forma, con la misma información codificada. No hay un segundo número escondido en otra parte del auto.</p>
                  <p>La diferencia es puramente regional. &ldquo;VIN&rdquo; es el término usado en Estados Unidos y en la documentación internacional. &ldquo;Número de chasis&rdquo; es el término del día a día en México, Colombia, Perú y gran parte de Latinoamérica. &ldquo;Número de bastidor&rdquo; es el término oficial en España, usado en la tarjeta ITV y el permiso de circulación. Si un mecánico te pide el número de chasis y un importador te pide el VIN, ambos están pidiendo ver los mismos 17 caracteres.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Dónde Encontrar y Cómo Verificar tu Número de Chasis</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Búscalo en tres lugares: grabado directamente en el chasis bajo el cofre, en una placa visible a través del parabrisas del lado del conductor, y en una etiqueta dentro del marco de la puerta del conductor. Un vehículo genuino y sin alteraciones mostrará exactamente los mismos 17 caracteres en los tres sitios.</p>
                  <p>Si estás comprando un auto usado o importado, revisar los tres lugares antes de pagar es una de las formas más simples de detectar una placa de chasis alterada. Una discrepancia entre la placa del tablero y el número realmente grabado en el chasis es una de las señales más claras de que la identidad del vehículo fue modificada, a menudo para ocultar un accidente o daño por inundación.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Verificación de Chasis para Autos Importados de EE.UU.</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">México, Centroamérica y el Caribe</strong> — una parte importante de los autos usados que circulan en estos mercados llegaron originalmente de subastas en Estados Unidos, ya sea por importación directa o a través de la frontera. Eso significa que esta herramienta devuelve especificaciones completas para una porción grande de los vehículos que realmente se compran y venden en la región. Autos fabricados exclusivamente para mercados europeos o asiáticos pueden quedar fuera de esta base de datos específica.</p>
                  <p>Antes de cerrar la compra de un auto con historial de importación, verificar el chasis contra la factura de venta y los documentos de nacionalización evita sorpresas — un número que no coincide es motivo suficiente para alejarse del trato.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Funciona con Toyota, Honda, Ford y Cualquier Marca</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Esta no es una herramienta de una sola marca. Un chasis de <strong className="text-foreground">Toyota</strong> se decodifica exactamente igual que uno de Ford, Honda, Nissan, Chevrolet o Jeep — la herramienta lee directamente de la base de datos compartida de NHTSA y aplica el esquema correcto según el propio código. Toyota es una de las marcas más consultadas aquí, lo cual refleja qué tan dominante es en los mercados de autos usados que esta herramienta atiende.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Número de Chasis vs Número de Motor</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Son dos números distintos, grabados en dos lugares distintos. El <strong className="text-foreground">número de chasis</strong> identifica al vehículo completo y es lo que esta herramienta decodifica. El <strong className="text-foreground">número de motor</strong> va grabado por separado en el bloque del motor e identifica solo esa pieza específica — esta herramienta no lo decodifica, y no es intercambiable con el número de chasis. Un auto con el motor cambiado puede tener legítimamente un número de chasis y un número de motor que no coinciden entre sí; siempre conviene verificar ambos contra los documentos del vehículo, no solo uno de los dos.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Antes de Comprar: Revisa También el Kilometraje</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Verificar el chasis confirma qué auto es realmente — pero no confirma qué tanto se usó. Una vez que confirmes la identidad del vehículo, vale la pena poner el kilometraje del odómetro en contexto con nuestra <Link href="/tools/calculadora-de-kilometraje" className="text-foreground underline underline-offset-2">calculadora de kilometraje</Link>, que te dice si la lectura es razonable para la edad del auto.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Verificar Número de Chasis — Preguntas Frecuentes</h2>
            <div className="space-y-2">
              {[
                { q: '¿Qué es el número de chasis?', a: 'El código de 17 caracteres grabado en la estructura del auto desde fábrica, que identifica su marca, modelo, motor, año y planta de ensamblaje. No es un número de registro local — es un identificador de manufactura permanente.' },
                { q: '¿El número de chasis es lo mismo que el VIN?', a: 'Sí, en la práctica describen el mismo código de 17 caracteres. "VIN" es el término internacional; "número de chasis" es el término común en Latinoamérica para el mismo identificador.' },
                { q: '¿Qué es el número de bastidor?', a: 'Es el mismo identificador, pero es el término oficial usado en España — aparece así en la ficha técnica, el permiso de circulación y la tarjeta ITV.' },
                { q: '¿Cómo verifico el número de chasis gratis?', a: 'Ingresa el código de 17 caracteres arriba y presiona Decodificar. Esta herramienta consulta la base pública de NHTSA y devuelve marca, modelo, año, motor y origen — gratis, sin cuenta.' },
                { q: '¿Dónde está el número de chasis en el auto?', a: 'En tres lugares: grabado en el chasis bajo el cofre, en la placa del tablero visible por el parabrisas, y en una etiqueta en el marco de la puerta del conductor. Los tres deben coincidir.' },
                { q: '¿Funciona para autos Toyota?', a: 'Sí — Toyota se decodifica igual que cualquier otra marca importante a través de la misma base de datos NHTSA, junto con Ford, Honda, Nissan, Chevrolet y más.' },
                { q: '¿Cómo sé si el número de chasis fue clonado o alterado?', a: 'Compara el número grabado en el chasis, la placa del tablero y la etiqueta de la puerta — deben ser idénticos. Un grabado con tipografía distinta o señales de lijado alrededor es una alerta seria.' },
                { q: '¿El número de motor es igual al número de chasis?', a: 'No. El número de motor va grabado por separado en el bloque del motor e identifica solo esa pieza. El número de chasis identifica al vehículo completo. Pueden no coincidir después de un cambio de motor.' },
                { q: '¿Funciona para autos comprados en México o importados de EE.UU.?', a: 'Sí, para vehículos fabricados originalmente para el mercado de Estados Unidos, Canadá o México — lo cual cubre a la mayoría de los autos importados que circulan en México y Centroamérica.' },
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
              <Link href="/tools/calculadora-de-kilometraje" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Calculadora de Kilometraje</p>
                <ChevronRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/tools/chassis-number-check" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Chassis Number Check (English)</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
