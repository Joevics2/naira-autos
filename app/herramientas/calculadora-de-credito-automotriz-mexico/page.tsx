import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import CreditoAutomotrizMexicoClient from './client';
import { alternatesFor } from '@/lib/hreflang';
import LanguagePills from '@/components/ui/LanguagePills';

export const metadata: Metadata = {
  title: 'Calculadora de Crédito Automotriz México 2026 — Tasa, CAT y Enganche',
  description: 'Calculadora gratuita de crédito automotriz en México con tasas 2026, el CAT real (CONDUSEF) y cómo tu enganche cambia la tasa preferencial en bancos como BBVA, Banorte y Afirme.',
  alternates: alternatesFor('/herramientas/calculadora-de-credito-automotriz-mexico'),
  openGraph: {
    title: 'Calculadora de Crédito Automotriz México 2026 | Naira Autos',
    description: 'Calculadora gratuita de crédito automotriz \u2014 mensualidad, CAT y cómo tu enganche cambia la tasa que te ofrecen los bancos mexicanos.',
    url: 'https://www.naira.autos/herramientas/calculadora-de-credito-automotriz-mexico',
    locale: 'es',
  },
  keywords: [
    'crédito automotriz méxico', 'calculadora crédito auto', 'tasa de interés crédito automotriz 2026',
    'CAT crédito automotriz', 'enganche crédito auto', 'BBVA crédito de auto', 'mejor crédito automotriz méxico',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/herramientas/calculadora-de-credito-automotriz-mexico',
      name: 'Calculadora de Crédito Automotriz México 2026 — Tasa, CAT y Enganche',
      description: 'Calculadora gratuita de crédito automotriz en México con tasas 2026, el CAT real y cómo tu enganche cambia la tasa preferencial.',
      url: 'https://www.naira.autos/herramientas/calculadora-de-credito-automotriz-mexico',
      dateModified: '2026-09-29',
      inLanguage: 'es',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: '¿Cuál es una buena tasa de crédito automotriz en México en 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Afirme ofrece la tasa bancaria más baja, desde 11.90% (CAT desde 17.5%). BBVA va desde 12.99% para híbridos/eléctricos, y Banorte desde 13.49% con nómina domiciliada. El rango general del mercado bancario va de 9% a 18% anual.' } },
        { '@type': 'Question', name: '¿Cómo afecta mi enganche a la tasa de interés?', acceptedAnswer: { '@type': 'Answer', text: 'En varios bancos, incluyendo BBVA, el porcentaje de enganche determina directamente qué tasa preferencial te ofrecen: un enganche del 50% da acceso a la tasa más baja, 30-40% a una tasa intermedia, y 20% a la tasa estándar.' } },
        { '@type': 'Question', name: '¿Qué es el CAT y por qué debo revisarlo?', acceptedAnswer: { '@type': 'Answer', text: 'El Costo Anual Total (CAT) es el indicador regulado por CONDUSEF que incluye la tasa de interés más comisiones, seguros e IVA en un solo porcentaje. Dos créditos con la misma tasa nominal pueden tener un CAT muy distinto, por eso es el número real a comparar.' } },
        { '@type': 'Question', name: '¿Es buena idea un plazo de 72 meses?', acceptedAnswer: { '@type': 'Answer', text: 'Generalmente no es lo más recomendable. Reduce la mensualidad, pero incrementa de forma importante el costo total en intereses y mantiene al comprador debiendo más de lo que el auto vale durante más tiempo. Varias guías financieras recomiendan 36 a 48 meses en su lugar.' } },
        { '@type': 'Question', name: '¿Estoy obligado a contratar el seguro con el mismo banco del crédito?', acceptedAnswer: { '@type': 'Answer', text: 'No. Aunque la mayoría de los créditos automotrices exige un seguro de daños y vida como condición, la Ley para la Transparencia y Ordenamiento de los Servicios Financieros te da el derecho de elegir tu propia aseguradora.' } },
        { '@type': 'Question', name: '¿Necesito un enganche más alto para un auto seminuevo?', acceptedAnswer: { '@type': 'Answer', text: 'Generalmente sí. La mayoría de los bancos pide un enganche mínimo más alto para autos usados (comúnmente desde 30%) que para nuevos, y limita el plazo máximo según la antigüedad del vehículo.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Calculadora de Crédito Automotriz México', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function CreditoAutomotrizMexicoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div lang="es" className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link href="/herramientas" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Volver">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/inicio" className="hover:text-white/60 transition-colors">Inicio</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/herramientas" className="hover:text-white/60 transition-colors">Herramientas</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇲🇽 Crédito Automotriz</span>
            </nav>
            <LanguagePills path="/herramientas/calculadora-de-credito-automotriz-mexico" className="ms-auto" />
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">Gratis</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Tasas 2026: 9%\u201318%</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Última revisión: septiembre 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Crédito Automotriz<br /><span className="text-emerald-400">México</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Tu enganche cambia la tasa que te ofrecen.</p>
            <p className="text-white/75 text-sm leading-relaxed">Elige tu nivel de enganche y mira cómo cambia la tasa preferencial, la mensualidad y el costo total — siguiendo el patrón real de promociones bancarias en México.</p>
          </div>
        </div>
      </div>

      <CreditoAutomotrizMexicoClient />

      <div lang="es" className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-10">

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Crédito Automotriz en México — Tasas, y Cómo tu Enganche Cambia las Reglas</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <p>Más del 72% de los autos nuevos en México se compran a crédito, según la <a href="https://financera.mx/prestamos/credito-automotriz/" target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-foreground">AMDA</a> (Asociación Mexicana de Distribuidores de Automotores), y las tasas de interés en 2026 van del 9% al 18% anual dependiendo de la institución, aunque el rango real entre bancos es todavía más amplio. Afirme ofrece la tasa más baja del mercado bancario, desde <strong className="text-foreground">11.90%</strong> (CAT desde 17.5%), seguido de cerca por BBVA desde 12.99% para híbridos y eléctricos, 13.99% en general. Banorte ofrece desde 13.49% para clientes con nómina domiciliada.</p>
              <p>Las sofomes (sociedades financieras de objeto múltiple) y financieras no bancarias pueden llegar a tasas mucho más altas —algunas comparadoras reportan hasta 500% anual en el extremo más riesgoso del mercado—, así que comparar antes de firmar no es opcional, es la diferencia entre un crédito razonable y uno abusivo.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>El Enganche No Solo Reduce tu Deuda — Cambia tu Tasa</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Un mecanismo que pocos compradores conocen hasta que lo ven en la letra chica: el tamaño de tu enganche no solo reduce el monto a financiar, en varios bancos determina directamente a qué tasa preferencial tienes acceso. BBVA, por ejemplo, estructura sus promociones de Crédito de Auto exactamente así: un enganche del 50% da acceso a la tasa más baja disponible, un enganche del 30% o 40% a una tasa intermedia, y un enganche del 20% a la tasa estándar, dentro de un rango publicado que va de 12.99% hasta 18.99% según el perfil. No es solo &ldquo;entre más das, menos debes&rdquo; —es &ldquo;entre más das, menos tasa te cobran&rdquo;, dos ahorros distintos en la misma decisión.</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '72%', desc: 'de autos nuevos en México se compran a crédito (AMDA)', color: 'text-emerald-600 dark:text-emerald-400' },
              { label: '11.90%', desc: 'Tasa bancaria más baja del mercado (Afirme, 2026)', color: 'text-blue-600 dark:text-blue-400' },
              { label: '36–48m', desc: 'Plazo recomendado \u2014 evita los 72 meses', color: 'text-amber-600 dark:text-amber-400' },
            ].map(({ label, desc, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-card border border-border text-center">
                <p className={`text-2xl font-black mb-2 ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>El CAT, No la Tasa, es lo que Realmente Debes Comparar</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">La tasa de interés nominal no es el número que realmente debes comparar. El CAT (Costo Anual Total) es el indicador regulado por la CONDUSEF que incluye la tasa de interés más comisiones, seguros obligatorios e IVA en un solo porcentaje, precisamente para que dos créditos con la misma tasa nominal —pero diferentes comisiones ocultas— no parezcan iguales cuando no lo son. La propia CONDUSEF ofrece un simulador oficial de crédito automotriz gratuito, y su recomendación es simple: compara siempre el CAT, nunca solo la tasa. Un crédito con tasa más baja pero CAT más alto puede terminar costando más que uno con tasa aparentemente peor.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>El Plazo: Donde la Mensualidad Baja Sale Cara</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">El plazo es otra decisión donde la tentación de la mensualidad baja puede salir cara. Aunque la mayoría de los bancos ofrece plazos de 12 a 72 meses, varias guías financieras mexicanas recomiendan explícitamente evitar los 72 meses y quedarse en 36 a 48, ya que un plazo más largo reduce el pago mensual pero incrementa de forma importante el costo total en intereses, y deja al comprador debiendo más de lo que el auto vale durante más tiempo —el mismo riesgo de &ldquo;estar atrás del auto&rdquo; que en otros mercados se conoce como capital negativo.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Tu Derecho a Elegir tu Propia Aseguradora</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Un derecho que la ley mexicana te garantiza y que muchos bancos prefieren no mencionar: aunque la mayoría de los créditos automotrices exige contratar un seguro de daños y vida como condición del crédito, la Ley para la Transparencia y Ordenamiento de los Servicios Financieros establece que tienes derecho a elegir tu propia aseguradora, no estás obligado a contratar el seguro con el mismo banco que te da el crédito. Contratar el seguro por tu cuenta, comparando entre aseguradoras, puede representar un ahorro real frente al paquete que el banco ofrece por default —vale la pena preguntarlo antes de firmar, no después.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Ejemplo: 30% de Enganche vs. 50% de Enganche</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Rosa gana 28,000 pesos netos al mes y quiere un auto de 350,000 pesos. Con un enganche del 30% (105,000 pesos) accede a la tasa intermedia de BBVA, alrededor de 15.5%, y financia 245,000 pesos a 48 meses: la mensualidad resulta de aproximadamente 6,881 pesos, cerca del 24.6% de su ingreso neto. Si en cambio diera un enganche del 50% (175,000 pesos), financiaría solo 175,000 pesos a la tasa preferencial de 13%, con una mensualidad de alrededor de 4,695 pesos —16.8% de su ingreso— y varios miles de pesos menos en intereses totales, aunque signifique ahorrar más antes de comprar.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Autos Seminuevos Siguen Reglas Distintas</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Los autos seminuevos siguen reglas ligeramente distintas a las de un auto nuevo. La mayoría de los bancos exige un enganche más alto para vehículos usados —comúnmente a partir del 30%, frente al 20% mínimo que algunos ofrecen en nuevos— y limita el plazo máximo según la antigüedad del auto, de forma que el crédito termine antes de que el vehículo se vuelva difícil de revender. Las tasas también tienden a ser ligeramente más altas en seminuevos, ya que el banco asume más incertidumbre sobre el valor de reventa del auto frente a uno que sale directo de agencia. Pedir una valuación independiente antes de solicitar el crédito —en lugar de confiar solo en el precio que pide el vendedor— ayuda a negociar mejores condiciones y evita pagar de más por un auto sobrevaluado.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: '¿Cuál es una buena tasa de crédito automotriz en 2026?', a: 'Afirme ofrece la tasa bancaria más baja, desde 11.90% (CAT desde 17.5%). BBVA va desde 12.99% para híbridos/eléctricos, y Banorte desde 13.49% con nómina domiciliada.' },
                { q: '¿Cómo afecta mi enganche a la tasa de interés?', a: 'En varios bancos, incluyendo BBVA, el porcentaje de enganche determina directamente la tasa preferencial: 50% da acceso a la tasa más baja, 30-40% a una intermedia, y 20% a la estándar.' },
                { q: '¿Qué es el CAT y por qué debo revisarlo?', a: 'El Costo Anual Total (CAT), regulado por CONDUSEF, incluye tasa + comisiones + seguros + IVA en un solo porcentaje. Es el número real a comparar, no solo la tasa nominal.' },
                { q: '¿Es buena idea un plazo de 72 meses?', a: 'Generalmente no. Reduce la mensualidad pero incrementa de forma importante el costo total en intereses. Varias guías recomiendan 36 a 48 meses en su lugar.' },
                { q: '¿Estoy obligado a contratar el seguro con el banco del crédito?', a: 'No. La Ley para la Transparencia y Ordenamiento de los Servicios Financieros te da el derecho de elegir tu propia aseguradora.' },
                { q: '¿Necesito un enganche más alto para un auto seminuevo?', a: 'Generalmente sí \u2014 la mayoría de los bancos pide desde 30% para usados, y limita el plazo máximo según la antigüedad del vehículo.' },
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

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Revisado por <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Evelyn John</Link>, Auto Sales Expert. Tasas y datos verificados con publicaciones de BBVA, Banorte, Afirme, AMDA y el simulador oficial de CONDUSEF.
          </p>

        </div>
      </div>
    </>
  );
}
