import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';
import GeneradorDeDocumentosClienteEs from './client';

export const metadata: Metadata = {
  title: 'Generador de Documentos con IA — Contrato de Compraventa y Más | Naira Autos',
  description: 'Genera un contrato de compraventa de vehículo, contrato de arrendamiento, carta poder y más — gratis, redactado con IA, con los requisitos legales de tu país investigados. Edita y descarga en PDF o Word.',
  keywords: 'generador de contratos con ia, generador de documentos vehiculares, contrato de compraventa de auto gratis, generador de contrato de compraventa, redactor de contratos con inteligencia artificial, crear contrato de auto en línea, generador de carta poder vehículo',
  alternates: {
    canonical: 'https://www.naira.autos/tools/generador-de-documentos-ia',
    languages: {
      en: 'https://www.naira.autos/tools/document-generator',
      es: 'https://www.naira.autos/tools/generador-de-documentos-ia',
      'x-default': 'https://www.naira.autos/tools/document-generator',
    },
  },
  openGraph: {
    title: 'Generador de Documentos con IA | Naira Autos',
    description: 'Elige un tipo de documento y un país. Nuestra IA investiga los requisitos legales reales de tu jurisdicción y redacta un documento completo — gratis, sin registro.',
    url: 'https://www.naira.autos/tools/generador-de-documentos-ia',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/generador-de-documentos-ia',
      name: 'Generador de Documentos con IA',
      description: 'Generador gratuito de documentos vehiculares con IA. Investiga los requisitos legales específicos de cada jurisdicción y redacta un documento completo y con formato, listo para editar y descargar.',
      url: 'https://www.naira.autos/tools/generador-de-documentos-ia',
      inLanguage: 'es',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://www.naira.autos/herramientas' },
          { '@type': 'ListItem', position: 3, name: 'Generador de Documentos', item: 'https://www.naira.autos/tools/generador-de-documentos-ia' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Es un documento legal real?',
          acceptedAnswer: { '@type': 'Answer', text: 'El generador redacta un documento basado en los requisitos legales investigados para el país que elijas, pero es solo informativo, no asesoría legal. Para acuerdos de alto valor o alto riesgo, haz que lo revise un abogado local antes de confiar en él.' },
        },
        {
          '@type': 'Question',
          name: '¿Mi documento se guarda en sus servidores?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. El documento que generas, y cualquier edición que hagas, permanece solo en tu propio navegador. Nunca almacenamos tu nombre, los detalles del trato ni el documento terminado en nuestros servidores.' },
        },
        {
          '@type': 'Question',
          name: '¿En qué formatos puedo descargar?',
          acceptedAnswer: { '@type': 'Answer', text: 'Puedes descargar tu documento terminado en PDF o en Word (.docx), completamente formateado con encabezados y espacios para firmas.' },
        },
        {
          '@type': 'Question',
          name: '¿Es gratis?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sí. Completamente gratis, sin necesidad de registrarte.' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Generador de Documentos con IA — Naira Autos',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'Generador gratuito de documentos vehiculares con IA, con investigación legal específica por jurisdicción.',
      url: 'https://www.naira.autos/tools/generador-de-documentos-ia',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function GeneradorDeDocumentosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <GeneradorDeDocumentosClienteEs />

      {/* ── Contenido SEO — renderizado en el servidor ── */}
      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div className="max-w-screen-lg space-y-10 text-sm text-muted-foreground leading-relaxed">

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                ¿Qué Es el Generador de Documentos con IA?
              </h2>
              <p className="mb-3">Comprar, vender, arrendar o financiar un vehículo casi siempre requiere papeleo — y el papeleo que realmente es válido depende por completo de dónde te encuentres. Un contrato de compraventa perfectamente válido en un país puede faltarle una divulgación obligatoria, la firma de un testigo o un requisito de notarización en otro. Esta herramienta cubre <strong className="text-foreground">57 tipos de documentos en 160 países</strong>, y en lugar de darte una plantilla genérica occidental con el nombre del país cambiado, investiga los requisitos legales reales para el documento y la jurisdicción que elijas antes de redactar nada.</p>
              <p>Algunos documentos (marcados como plantillas) usan un formato estructurado y adaptado a cada jurisdicción. Otros — típicamente los acuerdos más complejos, como planes de pago a plazos, intercambios de auto a cuenta o adendas de venta transfronteriza — se redactan completamente con IA en torno a tus datos específicos después del paso de investigación legal. En cualquier caso, terminas con un documento completo y con formato, no una plantilla en blanco para llenar.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Cómo Funciona
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">1. Elige un tipo de documento y un país.</strong> Desde un contrato de compraventa de vehículo hasta una carta poder o una carta de liberación de gravamen, elige lo que necesitas y dónde ocurre la transacción.</p>
                <p><strong className="text-foreground">2. La IA investiga tu jurisdicción.</strong> Antes de redactar nada, determina qué requiere realmente tu país — cláusulas obligatorias, divulgaciones requeridas, si se necesita notarización o testigo, y cualquier convención de formato específica de esa jurisdicción.</p>
                <p><strong className="text-foreground">3. Llena tus datos.</strong> Ingresa la información del comprador, vendedor y vehículo, o usa datos de ejemplo si solo quieres ver la estructura primero.</p>
                <p><strong className="text-foreground">4. Edita y descarga.</strong> Revisa el documento generado, haz cualquier edición directamente en el navegador, y descárgalo en PDF o Word (.docx) — completamente formateado con encabezados y espacios para firmas.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Documentos Que Puedes Generar
              </h2>
              <p className="mb-4">Los 57 tipos de documentos están organizados en 10 categorías, cubriendo mucho más que una simple venta:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Venta y Transferencia de Propiedad', items: 'Contrato de compraventa de vehículo, acuerdo de compra detallado, plan de pago a plazos, acuerdo de intercambio/trade-in, venta "tal cual"' },
                  { title: 'Arrendamiento y Renta', items: 'Contrato de arrendamiento vehicular, contrato de compra-arrendamiento para conductores de app, contrato de repartidor, renta entre particulares, arrendamiento de flotilla' },
                  { title: 'Estructuras de Propiedad y Financiamiento', items: 'Acuerdo de préstamo y garantía vehicular, préstamo privado con gravamen, acuerdo de consignación, carta de liberación de gravamen' },
                  { title: 'Protección y Disputas', items: 'Reporte de condición/inspección, exención de indemnización, exención de garantía, adenda de contingencia de compra' },
                  { title: 'Divulgación y Cumplimiento', items: 'Divulgación de odómetro, divulgación de historial de daños/accidentes, divulgación de título de salvamento, divulgación de salud de batería EV' },
                  { title: 'Casos Especiales de Propiedad', items: 'Carta poder vehicular, carta de donación, acta de transferencia por fallecimiento del propietario, consentimiento del cónyuge copropietario' },
                  { title: 'Uso Empresarial y de Flotillas', items: 'Política de auto de empresa, acuerdo de asignación de vehículo de flotilla, acuerdo de confidencialidad para negociaciones de venta al mayoreo' },
                  { title: 'Registro y Cumplimiento', items: 'Declaración de importación vehicular, autorización de despacho aduanal, solicitud de certificado de aptitud vial' },
                ].map(({ title, items }) => (
                  <div key={title} className="bg-card border border-border rounded-xl p-4">
                    <p className="font-bold text-foreground text-sm mb-1.5">{title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{items}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Por Qué la Jurisdicción Sí Importa
              </h2>
              <p className="mb-3">Una plantilla genérica de contrato de compraventa descargada de un sitio web cualquiera generalmente asume las reglas de un solo país y las aplica en todas partes sin distinción. Eso puede significar que falte un requisito de notarización que hace que el documento no sea exigible, que se omita una divulgación que tu jurisdicción exige por ley (como la certificación de odómetro o el estatus de título de salvamento), o que se use un formato de testigo que un registro local no acepta. Como esta herramienta investiga el país específico que eliges antes de redactar, esos requisitos quedan incorporados desde el inicio en lugar de que los descubras después.</p>
              <p>Dicho esto, esto es redacción informativa, no asesoría legal. Para transacciones de alto valor o cualquier cosa con riesgo fuera de lo común — un préstamo privado grande garantizado con un vehículo, una venta transfronteriza, un acuerdo a nivel de flotilla — vale la pena que un abogado local revise el documento terminado antes de confiar en él.</p>
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Tus Datos Permanecen en Tu Navegador
              </h2>
              <p className="mb-3">Nada de lo que escribas en esta herramienta — nombres de comprador y vendedor, datos del vehículo, el documento terminado — se almacena en nuestros servidores. Todo, incluyendo tu historial de documentos si generas más de uno, vive únicamente en el almacenamiento local de tu propio navegador. Eso significa que puedes redactar con confianza un documento con nombres reales y términos reales del trato sin preocuparte por dónde termina esa información, y también significa que borrar los datos de tu navegador borrará tu historial guardado, así que descarga lo que quieras conservar.</p>
            </div>

          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Preguntas Frecuentes del Generador de Documentos
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: '¿Es un documento legal real?', a: 'El generador redacta un documento basado en los requisitos legales investigados para el país que elijas, pero es solo informativo, no asesoría legal. Para acuerdos de alto valor o alto riesgo, haz que lo revise un abogado local antes de confiar en él.' },
                { q: '¿Mi documento se guarda en sus servidores?', a: 'No. El documento que generas, y cualquier edición que hagas, permanece solo en tu propio navegador. Nunca almacenamos tu nombre, los detalles del trato ni el documento terminado en nuestros servidores.' },
                { q: '¿En qué formatos puedo descargar?', a: 'PDF o Word (.docx), completamente formateado con encabezados y espacios para firmas.' },
                { q: '¿Es gratis?', a: 'Sí — completamente gratis, sin necesidad de registrarte.' },
                { q: '¿Cuántos tipos de documentos y países cubre?', a: '57 tipos de documentos en 10 categorías, para 160 países. La cobertura va desde un simple contrato de compraventa hasta acuerdos de flotilla, declaraciones de importación y actas de herencia.' },
                { q: '¿Cuál es la diferencia entre una plantilla y un documento redactado con IA?', a: 'Los documentos de plantilla usan un formato estructurado y adaptado a cada jurisdicción para casos sencillos. Los documentos redactados con IA se generan completamente en torno a tus datos específicos después del paso de investigación legal — se usan para acuerdos más complejos como planes a plazos o adendas de venta transfronteriza.' },
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

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Más Herramientas Gratuitas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/documents" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all">
                <p className="text-sm font-bold text-sky-700 dark:text-sky-400">Plantillas de Documentos Gratis</p>
                <ChevronRight className="h-4 w-4 text-sky-500" />
              </Link>
              <Link href="/tools/mecanico-virtual" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Mecánico Virtual con IA</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/cuanto-vale-mi-auto" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">¿Cuánto Vale Mi Auto?</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
