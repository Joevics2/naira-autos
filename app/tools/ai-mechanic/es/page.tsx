import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';
import AIMechanicClientES from './client';

// ── Metadata ────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Mecánico Virtual con IA — Diagnóstico de Auto Online Gratis | Naira Autos',
  description: 'Mecánico virtual gratis con inteligencia artificial. Describe la falla, sube fotos, audio o video del problema y recibe un diagnóstico al instante con presupuesto de reparación. Sin registro.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/ai-mechanic/es',
    languages: {
      'en': 'https://www.naira.autos/tools/ai-mechanic',
      'es': 'https://www.naira.autos/tools/ai-mechanic/es',
      'x-default': 'https://www.naira.autos/tools/ai-mechanic',
    },
  },
  openGraph: {
    title: 'Axion — Mecánico Virtual con IA Gratis | Naira Autos',
    description: 'Diagnóstico de auto online al instante, en cualquier lugar. Sube audio del motor, fotos o describe la falla. Recibe nivel de urgencia, causas probables, pasos a seguir y presupuesto de reparación. Gratis, sin registro.',
    url: 'https://www.naira.autos/tools/ai-mechanic/es',
  },
  keywords: ['mecánico virtual','mecánico online gratis','diagnóstico de auto online','diagnóstico de coche gratis','qué le pasa a mi carro','taller mecánico online','preguntar a un mecánico online','cotización de reparación de auto','mecánico con inteligencia artificial','revisar mi auto online','diagnóstico por sonido del motor','presupuesto de reparación de auto'],
};

// ── Schema ────────────────────────────────────────────────────────

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/ai-mechanic/es',
      name: 'Mecánico Virtual con IA — Diagnóstico de Auto Online Gratis',
      description: 'Mecánico virtual gratuito con inteligencia artificial. Sube audio del motor, fotos, o describe la falla. Recibe un diagnóstico al instante con nivel de urgencia y presupuesto de reparación.',
      url: 'https://www.naira.autos/tools/ai-mechanic/es',
      inLanguage: 'es',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Mecánico IA', item: 'https://www.naira.autos/tools/ai-mechanic/es' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Qué es un mecánico virtual y cómo funciona?',
          acceptedAnswer: { '@type': 'Answer', text: 'Un mecánico virtual es una herramienta que usa inteligencia artificial para diagnosticar problemas de tu auto a distancia. Describes la falla, subes fotos, audio o video si quieres, y la IA analiza todo contra una enorme base de fallas mecánicas conocidas para darte un diagnóstico con nivel de urgencia y presupuesto estimado de reparación.' },
        },
        {
          '@type': 'Question',
          name: '¿Puede la IA diagnosticar mi auto solo con el sonido del motor?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sí. Graba el golpeteo, el chirrido o el ruido de raspado — incluso 10 segundos grabados con el celular alcanzan. La IA analiza el patrón acústico y puede identificar si se trata de rodamientos desgastados, pastillas de freno gastadas, u otra falla específica.' },
        },
        {
          '@type': 'Question',
          name: '¿Es gratis?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sí. Completamente gratis — sin registro, sin suscripción, sin pago. Entra a la página y empieza a diagnosticar de inmediato.' },
        },
        {
          '@type': 'Question',
          name: '¿El diagnóstico de la IA es siempre exacto?',
          acceptedAnswer: { '@type': 'Answer', text: 'No — no es exacto el 100% de las veces. Es un excelente punto de partida basado en la descripción, foto, audio o video que proporciones, pero puede pasar por alto cosas que solo se detectan con una inspección física en un taller con elevador y scanner. Trátalo como una primera opinión, no como la respuesta final, y siempre acude a un mecánico calificado en persona ante fallas de frenos, dirección o combustible, sin importar lo que diga el diagnóstico.' },
        },
        {
          '@type': 'Question',
          name: '¿Funciona con BMW, Mercedes, Toyota o cualquier otra marca?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sí. Pregunta por una falla de BMW, Mercedes, Toyota o cualquier otra marca — la IA cubre todos los fabricantes principales. El presupuesto de reparación está calibrado con precios del mercado nigeriano; si estás en otro país, úsalo como referencia general y no como cifra exacta local.' },
        },
        {
          '@type': 'Question',
          name: '¿Es lo mismo que preguntar en un grupo de WhatsApp o foro de autos?',
          acceptedAnswer: { '@type': 'Answer', text: 'Es mejor en varios sentidos. Cuando preguntas en un foro o grupo de WhatsApp, recibes la opinión de una sola persona basada en una descripción de texto. Nuestro mecánico virtual analiza tu descripción junto con cualquier foto, audio o video que subas, la compara contra miles de patrones de fallas conocidas, y te devuelve un diagnóstico ordenado por probabilidad con un nivel de confianza.' },
        },
        {
          '@type': 'Question',
          name: '¿Se guarda mi historial de conversación en sus servidores?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. Todo el historial se guarda únicamente en tu dispositivo, usando el almacenamiento local de tu navegador. No conservamos nada en nuestros servidores más allá del mensaje activo que envías para el diagnóstico. Puedes borrar tu historial en cualquier momento desde el menú lateral.' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Axion — Mecánico Virtual con IA',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'Mecánico virtual gratuito con inteligencia artificial. Describe fallas, sube audio del motor o fotos, recibe un diagnóstico instantáneo con presupuesto de reparación calibrado a precios del mercado nigeriano.',
      url: 'https://www.naira.autos/tools/ai-mechanic/es',
      inLanguage: 'es',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    },
  ],
};

export default function AIMechanicPageES() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <AIMechanicClientES />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div className="max-w-screen-lg space-y-10 text-sm text-muted-foreground leading-relaxed">

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                ¿Qué es un mecánico virtual con inteligencia artificial?
              </h2>
              <p className="mb-3">Un <strong className="text-foreground">mecánico virtual</strong> es exactamente lo que suena: un mecánico con el que hablas por texto, foto, audio o video, en lugar de en persona. Le describes lo que le pasa a tu auto — ese golpeteo raro al arrancar en frío, la luz de check engine que no se apaga, los frenos que se sienten blandos — y en segundos recibe una respuesta basada en un conocimiento profundo de fallas automotrices reales.</p>
              <p>Axion, nuestro <strong className="text-foreground">mecánico con inteligencia artificial</strong>, funciona con cualquier marca y en cualquier país, aunque tiene un plus para quienes manejan en Nigeria: entiende cómo la gasolina adulterada afecta los inyectores, cómo el calor tropical desgasta los sellos de goma, y cómo los huecos en la vía dañan la suspensión más rápido que en otros mercados.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Cómo obtener un diagnóstico de tu auto en menos de un minuto
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">1. Describe la falla.</strong> Escribe qué está pasando — entre más detalle, mejor. ¿Cuándo empezó? ¿Solo pasa en frío, al acelerar, al girar el volante?</p>
                <p><strong className="text-foreground">2. Sube una foto, audio o video (opcional, pero ayuda mucho).</strong> Un audio de 10 segundos del ruido del motor suele ser más útil que un párrafo entero de descripción.</p>
                <p><strong className="text-foreground">3. Recibe tu diagnóstico al instante.</strong> Nivel de urgencia, causas probables ordenadas por probabilidad, qué puedes revisar tú mismo, y un presupuesto de reparación.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Presupuesto de reparación: evita que te cobren de más
              </h2>
              <p className="mb-3">Una de las formas más comunes en que te cobran de más en un taller es llegando sin saber cuánto debería costar la reparación. Antes de visitar cualquier taller, usa nuestra estimación de <strong className="text-foreground">presupuesto de reparación</strong> para saber qué es un precio justo — piezas y mano de obra, desglosado claramente.</p>
              <p>El presupuesto toma en cuenta tu vehículo específico — marca, modelo, año — y la falla más probable según lo que describiste. No es un número genérico: un Camry 2010 con 180.000 km mostrando baja presión de aceite recibe un presupuesto distinto que un Camry 2020 con 40.000 km con la misma luz encendida, porque la causa probable es diferente.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Funciona con cualquier marca: Toyota, BMW, Mercedes, Honda y más
              </h2>
              <p className="mb-3">No importa qué manejes. La IA tiene patrones de falla específicos para cada fabricante — Toyota, Honda, BMW, Mercedes-Benz, Hyundai, Kia, Nissan, Ford, Mitsubishi, Volkswagen y prácticamente cualquier otra marca que circule hoy. Dale la marca, modelo y año una sola vez, y el diagnóstico se ajusta a lo que se sabe que falla en ese vehículo específico, a ese kilometraje, en lugar de darte una respuesta genérica que aplicaría a cualquier auto por igual.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Por qué el diagnóstico por sonido del motor cambia todo
              </h2>
              <p className="mb-3">Un mecánico con experiencia a menudo puede decir qué falla tiene un auto solo por el sonido, antes de abrir el capó. Nuestra IA hace lo mismo: sube una grabación del ruido — golpeteo, chirrido, traqueteo, raspado — y el sistema analiza el patrón acústico contra miles de fallas conocidas. Un audio de 10 segundos grabado desde el celular suele ser suficiente para distinguir entre un problema serio y algo que puede esperar.</p>
            </div>
          </div>

          {/* Comparación */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Comparación</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Mecánico Virtual vs. Otras Opciones
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground text-sm">Característica</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">Mecánico IA</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Visita al Taller</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Grupo/Foro de Autos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Disponible 24/7', 'Sí', 'No', 'A veces'],
                    ['Gratis', 'Sí', 'No', 'Sí'],
                    ['Sin necesidad de trasladarte', 'Sí', 'No', 'Sí'],
                    ['Presupuesto estimado', 'Sí', 'Varía', 'No'],
                    ['Analiza audio/video', 'Sí', 'Sí', 'No'],
                    ['Respuesta instantánea', 'Sí', 'No', 'A veces'],
                    ['Calidad consistente', 'Sí', 'Varía', 'No'],
                    ['Guarda historial', 'Sí', 'No', 'No'],
                  ].map(([feat, ai, workshop, forum]) => (
                    <tr key={feat} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 text-muted-foreground">{feat}</td>
                      <td className="px-4 py-3 text-center font-bold text-emerald-600 dark:text-emerald-400">{ai}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{workshop}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{forum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Preguntas Frecuentes</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Preguntas Frecuentes
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: '¿Qué es un mecánico virtual y cómo funciona?', a: 'Es una herramienta que usa inteligencia artificial para diagnosticar fallas de tu auto a distancia. Describes el problema, subes medios opcionales, y la IA analiza todo contra una enorme base de fallas conocidas — con presupuesto calibrado a precios del mercado nigeriano.' },
                { q: '¿El diagnóstico de la IA es siempre exacto?', a: 'No — no es exacto el 100% de las veces. Es un buen punto de partida, pero puede pasar por alto cosas que solo detecta una inspección física con elevador y scanner. Trátalo como primera opinión, y siempre acude a un mecánico en persona ante fallas de frenos, dirección o combustible.' },
                { q: '¿Funciona con BMW, Mercedes, Toyota o cualquier otra marca?', a: 'Sí. Pregunta por cualquier marca — la IA cubre todos los fabricantes principales. El presupuesto está calibrado a precios de Nigeria; en otros países, úsalo como referencia general.' },
                { q: '¿Es lo mismo que preguntar en un grupo de WhatsApp?', a: 'Es mejor en varios sentidos. En un foro recibes la opinión de una persona. Nuestro servicio analiza tu descripción más fotos, audio o video, lo compara contra miles de patrones de fallas, y devuelve un diagnóstico ordenado con nivel de confianza.' },
                { q: '¿Puede diagnosticar mi auto solo con el sonido del motor?', a: 'Sí. El audio es una de nuestras entradas más poderosas. Sube una grabación del golpeteo, chirrido o raspado — incluso 10 segundos del celular. La IA analiza el patrón acústico para identificar la falla probable.' },
                { q: '¿Necesito crear una cuenta o iniciar sesión?', a: 'No. El Mecánico IA es completamente gratis y no requiere cuenta, registro, ni información personal. Los datos de tu vehículo se guardan localmente en tu dispositivo.' },
                { q: '¿Se guarda mi historial en sus servidores?', a: 'No. Todo el historial se guarda solo en tu dispositivo mediante el almacenamiento local del navegador. No conservamos nada en nuestros servidores más allá del mensaje activo.' },
                { q: '¿Qué tan preciso es el presupuesto de reparación?', a: 'Se basa en datos del mercado nigeriano — piezas y mano de obra en talleres de Lagos, Abuja y Port Harcourt. Damos un rango (mínimo a máximo) para que sepas qué es razonable. Si un taller cotiza muy por encima de nuestro máximo, vale la pena investigarlo.' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none gap-3">
                    <span className="font-semibold text-foreground text-sm leading-relaxed">{q}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* CTA final */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              ¿Listo? Diagnostica tu Auto Ahora.
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Gratis. Instantáneo. Sin registro. Recibe tu diagnóstico ahora mismo.
            </p>
            <a href="#axion-chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
              Comenzar Diagnóstico Gratis
            </a>
          </section>

          {/* Más herramientas */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Más Herramientas Gratis
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/vin-checker',              label: 'Verificador de VIN',           color: 'blue' },
                { href: '/tools/vehicle-papers-checklist', label: 'Lista de Documentos',          color: 'violet' },
                { href: '/tools/import-duty-calculator',   label: 'Calculadora de Aranceles',     color: 'emerald' },
              ].map(({ href, label, color }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-${color}-50 dark:bg-${color}-500/10 border border-${color}-200 dark:border-${color}-500/20 hover:bg-${color}-100 dark:hover:bg-${color}-500/20 transition-all`}
                >
                  <p className={`text-sm font-bold text-${color}-700 dark:text-${color}-400`}>{label}</p>
                  <ChevronRight className={`h-4 w-4 text-${color}-500`} />
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
