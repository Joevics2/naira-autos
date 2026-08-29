import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VerificarNumeroDeMotorClient from './client';

export const metadata: Metadata = {
  title: 'Verificar Número de Motor Gratis — Analizador de Código de Motor | Naira Autos',
  description: 'Verifica el número de motor de cualquier vehículo gratis. Ingresa el número o código de motor y obtén marca, cilindrada, configuración y aplicaciones comunes al instante — sin registro ni pago. Funciona para Toyota, Honda, BMW, Nissan y más.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/verificar-numero-de-motor',
    languages: {
      en: 'https://www.naira.autos/tools/engine-number-analyzer',
      es: 'https://www.naira.autos/tools/verificar-numero-de-motor',
      'x-default': 'https://www.naira.autos/tools/engine-number-analyzer',
    },
  },
  openGraph: {
    title: 'Verificar Número de Motor Gratis | Naira Autos',
    description: 'Ingresa cualquier número o código de motor y obtén marca, cilindrada, configuración y aplicaciones comunes — gratis, instantáneo.',
    url: 'https://www.naira.autos/tools/verificar-numero-de-motor',
  },
  keywords: [
    'verificador de número de motor',
    'analizador de número de motor',
    'buscador de código de motor',
    'qué significa mi número de motor',
    'decodificador de número de motor',
    'verificación del número de motor del vehículo',
    'verificación de número de motor',
    'verificar número de motor del vehículo en línea',
    'verificar número de motor gratis',
    'consultar número de motor en línea',
    'cómo verificar el número de motor en línea',
    'significado del código de motor',
    'qué te dice el número de motor',
    'búsqueda de número de motor',
    'decodificar número de motor',
    'código de familia del motor',
    'número de motor 2JZ',
    'código de motor K20A',
    'número de motor B58',
    'número de motor vs número de chasis',
    'pueden ser diferentes el número de motor y el número de chasis',
  ].join(', '),
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/verificar-numero-de-motor',
      name: 'Verificar Número de Motor Gratis — Analizador de Código de Motor',
      description: 'Verifica el número de motor de cualquier vehículo gratis. Ingresa el número o código de motor y obtén marca, cilindrada, configuración y aplicaciones comunes al instante.',
      url: 'https://www.naira.autos/tools/verificar-numero-de-motor',
      inLanguage: 'es',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: '¿Para qué sirve el número de motor?', acceptedAnswer: { '@type': 'Answer', text: 'Identifica el motor de un vehículo — su familia y diseño mediante el código grabado, y la unidad individual mediante el número de serie que sigue. Se usa para confirmar que los papeles coinciden, pedir las piezas correctas, y detectar cambios de motor no declarados.' } },
        { '@type': 'Question', name: '¿Pueden ser diferentes el número de motor y el número de chasis?', acceptedAnswer: { '@type': 'Answer', text: 'Sí, de forma legítima. El número de chasis (VIN) identifica todo el vehículo; el número de motor identifica solo el bloque del motor. Un cambio de motor genuino después de una falla puede dejar los dos números sin coincidir, sin que haya pasado nada indebido.' } },
        { '@type': 'Question', name: '¿Cómo verifico mi número de motor en línea gratis?', acceptedAnswer: { '@type': 'Answer', text: 'Ingresa el número o código grabado en tu bloque de motor en el buscador de esta página. Esta herramienta lo compara contra códigos de familia de motor conocidos y muestra marca, cilindrada, configuración y aplicaciones comunes — gratis, sin necesidad de cuenta.' } },
        { '@type': 'Question', name: '¿Qué te dice el número de motor?', acceptedAnswer: { '@type': 'Answer', text: 'La parte del código de familia te dice el fabricante, la familia del motor, la cilindrada y la configuración. No revela kilometraje, historial de servicio, estatus de robo, ni validez de registro.' } },
        { '@type': 'Question', name: '¿Es este un servicio de verificación oficial?', acceptedAnswer: { '@type': 'Answer', text: 'No — es una herramienta educativa e informativa que compara la parte del código de familia contra una base de datos pública de referencia. No confirma originalidad, estatus de robo ni validez de registro. Para una verificación oficial, contacta al fabricante o a la autoridad de tránsito correspondiente.' } },
        { '@type': 'Question', name: '¿Dónde está el número de motor en un auto?', acceptedAnswer: { '@type': 'Answer', text: 'Grabado directamente en el bloque del motor — usualmente cerca de donde se une con la caja de transmisión, o en una superficie plana y elevada al costado del bloque. La ubicación exacta varía según el fabricante; revisa un manual de taller para tu modelo específico si no es obvio.' } },
        { '@type': 'Question', name: '¿Puede esta herramienta decodificar el número de serie completo?', acceptedAnswer: { '@type': 'Answer', text: 'No. Solo la parte del código de familia (ej. 2JZ-GTE, K20A, B58) está documentada públicamente. El número de serie único que sigue identifica a un motor específico y nunca se publica en ningún lado — solo el fabricante puede verificarlo.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Verificación Gratuita de Número de Motor', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function VerificarNumeroDeMotorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/herramientas" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-sky-500/20 border border-white/15 hover:border-sky-500/40 text-white/60 hover:text-sky-400 transition-all" aria-label="Atrás">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/herramientas" className="hover:text-white/60 transition-colors">Herramientas</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Verificar Número de Motor</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-sky-500 px-3 py-1 rounded-full">100% Gratis</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Coincidencia de Código de Familia</span>
              <Link href="/tools/engine-number-analyzer" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Verificar Número<br /><span className="text-sky-400">de Motor Gratis</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">¿Qué significa mi número de motor?</p>
            <p className="text-white/75 text-sm leading-relaxed">Ingresa el número o código grabado en tu bloque de motor. Obtén la marca, la familia del motor, la cilindrada, la configuración y las aplicaciones comunes al instante. Sin registro, sin pago, ya sea que estés en Ciudad de México, Bogotá, Lima o Madrid.</p>
          </div>
        </div>
      </div>

      <VerificarNumeroDeMotorClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>¿Para Qué Sirve el Número de Motor?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>El <strong className="text-foreground">número de motor</strong> se graba directamente en el bloque del motor desde fábrica, y cumple dos funciones a la vez. La primera parte — el <strong className="text-foreground">código de familia del motor</strong>, algo como <span className="font-mono">2JZ-GTE</span>, <span className="font-mono">K20A</span> o <span className="font-mono">B58</span> — identifica el diseño, la cilindrada y la configuración del motor. Los dígitos que siguen son un número de serie único para esa pieza física específica, algo similar en espíritu al número de chasis, pero solo para el motor.</p>
                  <p>La gente hace una <strong className="text-foreground">verificación del número de motor del vehículo</strong> por razones prácticas: confirmar que el motor coincide con lo que dicen los documentos de registro del auto, pedir las piezas de repuesto correctas, y entender qué es exactamente lo que están viendo al comprar un motor usado, una importación o un proyecto de reconstrucción. Para eso exactamente sirve este <strong className="text-foreground">verificador de número de motor</strong> — una forma rápida y gratuita de hacer una <strong className="text-foreground">verificación de número de motor</strong> antes de entregar tu dinero.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Cómo Verificar el Número de Motor en Línea Gratis</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Consultar número de motor en línea</strong> solía significar buscar en foros o pagar por un reporte que probablemente no necesitabas. Esta herramienta funciona como un <strong className="text-foreground">decodificador de número de motor</strong> directo: escribe lo que está grabado en el bloque, y obtienes al instante la marca, la familia, la cilindrada y la configuración — sin cuenta, sin tarjeta, sin esperas.</p>
                  <p>Si has estado buscando <strong className="text-foreground">cómo verificar el número de motor en línea</strong>, o una forma de <strong className="text-foreground">verificar número de motor del vehículo en línea</strong> sin descargar una app, el proceso aquí son los mismos tres pasos siempre: encuentra el grabado, escríbelo, lee el resultado. Funciona como un <strong className="text-foreground">verificar número de motor gratis</strong> para cualquier marca en la base de datos, ya sea que estés confirmando un auto que vas a comprar en Ciudad de México, una importación que despachas en la frontera, o un proyecto de reconstrucción en tu propio taller.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Número de Motor vs Número de Chasis — ¿Pueden Ser Diferentes?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Sí, y esto confunde constantemente a la gente. El <strong className="text-foreground">número de chasis (VIN)</strong> identifica al vehículo completo tal como salió de fábrica. El <strong className="text-foreground">número de motor</strong> identifica solo el bloque del motor, grabado por separado. Un auto que tuvo un cambio de motor legítimo — después de una falla grave, por ejemplo — puede mostrar legítimamente un <strong className="text-foreground">número de motor vs número de chasis</strong> que ya no coincide con lo que registraron los papeles originales, aunque no haya pasado nada indebido.</p>
                  <p>Dicho esto, un número de motor que se ve alterado, lijado o regrabado sí es una alerta real, especialmente en una importación usada. Si una <strong className="text-foreground">búsqueda de número de motor</strong> no coincide en absoluto con el número en la tarjeta de circulación, eso es exactamente lo que parece un cambio de motor genuino y documentado — no es automáticamente fraude, pero siempre vale la pena pedir los papeles.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Dónde Encontrar tu Número de Motor</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>El número de motor está grabado directamente en el bloque del motor — comúnmente cerca de donde el bloque se une con la caja de transmisión, o en una superficie plana y elevada al costado del bloque. La ubicación exacta varía bastante según el fabricante e incluso según la generación del modelo, así que un manual de taller, un concesionario o un <strong className="text-foreground">buscador de código de motor</strong> para tu marca y modelo específico es la forma más confiable de encontrarlo si no es obvio a simple vista.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>¿Qué Te Dice el Número de Motor? El Significado del Código de Motor</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Entonces, <strong className="text-foreground">¿qué te dice el número de motor</strong> exactamente? La parte del código de familia es una lectura directa del <strong className="text-foreground">significado del código de motor</strong>: marca, generación, cilindrada y configuración, todo empacado en un puñado de caracteres. Un código Nissan como <span className="font-mono">RB26DETT</span> te dice 2.6 litros, seis cilindros en línea, doble turbo, en tres segundos — sin necesitar manual. Un código Toyota como <span className="font-mono">2JZ-GTE</span> cuenta una historia parecida: 3.0 litros, seis en línea, doble turbo, y una reputación que lo precede.</p>
                  <p>Lo que no te puede decir es nada sobre la unidad individual — ni el kilometraje, ni el historial de servicio, ni la confirmación de que el bloque no fue cambiado, ni nada que cuente como <strong className="text-foreground">verificación de número de motor</strong> legal para seguros o aduanas. Piensa en este analizador como un <strong className="text-foreground">decodificador de número de motor</strong> solo para la capa del código de familia. Intentar <strong className="text-foreground">decodificar número de motor</strong> hasta el nivel del número de serie individual no es algo que ninguna base de datos pública — esta incluida — pueda hacer, porque esa información nunca se publicó en ningún lado fuera de los registros del propio fabricante.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Códigos de Motor Populares que la Gente Busca</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Tres códigos representan una parte desproporcionada de las búsquedas que ve esta herramienta. Un <strong className="text-foreground">número de motor 2JZ</strong> casi siempre significa que alguien está revisando un Toyota Supra, un Aristo, o un Lexus equipado con el legendario seis en línea de 3.0 litros con doble turbo. Un <strong className="text-foreground">código de motor K20A</strong> apunta al motor de alto régimen i-VTEC de Honda, presente en el Integra Type R, el Civic Type R (EP3) y el Accord Euro R. Y un <strong className="text-foreground">número de motor B58</strong> identifica el moderno motor turbo modular de seis cilindros de BMW, usado en el 340i, 440i, 540i, y el X3/X4/X5 M40i — y, curiosamente, en el Toyota Supra actual (A90), donde Toyota le pidió prestado el motor a BMW en lugar de revivir el 2JZ. Escribe cualquiera de los tres en el buscador de arriba y obtendrás el desglose completo al instante.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Cómo Funciona Este Analizador</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Escribe el número de motor o código que tengas — funciona tanto el grabado completo como solo la parte del <strong className="text-foreground">código de familia del motor</strong>. Este <strong className="text-foreground">analizador de número de motor</strong> lo compara contra una base de datos de referencia de códigos de familia conocidos y devuelve las coincidencias más cercanas con un nivel de confianza, junto con marca, cilindrada, configuración y los vehículos que comúnmente usan ese motor — una verdadera <strong className="text-foreground">búsqueda de número de motor</strong> sin la espera.</p>
                  <p><strong className="text-foreground">Importante:</strong> esto es solo una coincidencia de código de familia. El número de serie único después del código de familia es específico de un motor físico y nunca se publica en ningún lado — ninguna herramienta pública, esta incluida, puede decodificarlo, confirmar la originalidad de un motor, revisar su estatus de robo, o validar el registro. Verifica siempre esos detalles con el fabricante o con los documentos oficiales de tu vehículo.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Verificar Número de Motor — Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: '¿Para qué sirve el número de motor?', a: 'Identifica el motor de un vehículo — su familia y diseño mediante el código grabado, y la unidad individual mediante el número de serie que sigue. Se usa para confirmar que los papeles coinciden, pedir las piezas correctas, y detectar cambios de motor no declarados.' },
                { q: '¿Pueden ser diferentes el número de motor y el número de chasis?', a: 'Sí, de forma legítima. El número de chasis (VIN) identifica todo el vehículo; el número de motor identifica solo el bloque del motor. Un cambio de motor genuino después de una falla puede dejar los dos números sin coincidir, sin que haya pasado nada indebido.' },
                { q: '¿Cómo verifico mi número de motor en línea gratis?', a: 'Ingresa el número o código grabado en tu bloque de motor arriba. Esta herramienta lo compara contra códigos de familia de motor conocidos y muestra marca, cilindrada, configuración y aplicaciones comunes — gratis, sin necesidad de cuenta.' },
                { q: '¿Qué te dice el número de motor?', a: 'La parte del código de familia te dice el fabricante, la familia del motor, la cilindrada y la configuración. No revela kilometraje, historial de servicio, estatus de robo, ni validez de registro.' },
                { q: '¿Es este un servicio de verificación oficial?', a: 'No — es una herramienta educativa e informativa que compara la parte del código de familia contra una base de datos pública de referencia. No confirma originalidad, estatus de robo ni validez de registro. Para una verificación oficial, contacta al fabricante o a la autoridad de tránsito correspondiente.' },
                { q: '¿Dónde está el número de motor en un auto?', a: 'Grabado directamente en el bloque del motor — usualmente cerca de la caja de transmisión o en una superficie plana y elevada al costado del bloque. La ubicación exacta varía según el fabricante; revisa un manual de taller para tu modelo específico si no es obvio.' },
                { q: '¿Puede esta herramienta decodificar el número de serie completo?', a: 'No. Solo la parte del código de familia (ej. 2JZ-GTE, K20A, B58) está documentada públicamente. El número de serie único que sigue identifica a un motor específico y nunca se publica — solo el fabricante puede verificarlo.' },
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/tools/verificar-numero-de-chasis" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Verificar Número de Chasis</p>
                <ChevronRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/tools/decodificador-de-vin" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all">
                <p className="text-sm font-bold text-sky-700 dark:text-sky-400">Decodificador de VIN</p>
                <ChevronRight className="h-4 w-4 text-sky-500" />
              </Link>
              <Link href="/tools/mecanico-virtual" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Mecánico Virtual con IA</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/tools/engine-number-analyzer" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Engine Number Analyzer (English)</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
