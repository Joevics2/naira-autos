import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TOOLS_ES } from '@/lib/tools-list-es';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Naira Autos en Español — Herramientas Gratis para tu Auto',
  description: 'Herramientas automotrices gratuitas en español — mecánico virtual con IA, calculadora de kilometraje, verificación de número de chasis, y más. Sin registro, sin costo.',
  keywords: 'herramientas para autos gratis, mecánico virtual, calculadora de kilometraje, número de chasis, naira autos español',
  openGraph: {
    title: 'Naira Autos en Español',
    description: 'Herramientas gratuitas para comprar, vender y mantener tu auto — en español, sin registro.',
    url: 'https://www.naira.autos/inicio',
    siteName: 'Naira Autos',
    locale: 'es',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/inicio',
    languages: {
      en: 'https://naira.autos/',
      es: 'https://www.naira.autos/inicio',
      'x-default': 'https://naira.autos/',
    },
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Naira Autos en Español',
  description: 'Herramientas automotrices gratuitas en español — mecánico virtual con IA, calculadora de kilometraje, verificación de número de chasis, y más.',
  url: 'https://www.naira.autos/inicio',
  inLanguage: 'es',
  publisher: {
    '@type': 'Organization',
    name: 'Naira Autos',
    logo: { '@type': 'ImageObject', url: 'https://naira.autos/logo.png' },
  },
};

export default function InicioPage() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <h1 className="sr-only">Naira Autos en Español — Herramientas Gratis para tu Auto</h1>

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              Sitio en Español
            </span>
            <Link href="/" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              Read in English →
            </Link>
          </div>
          <p
            className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5vw, 68px)' }}
          >
            HERRAMIENTAS<br /><span className="text-emerald-400">PARA TU AUTO</span>
          </p>
          <p className="text-white/70 text-base md:text-lg font-medium max-w-2xl leading-relaxed mb-3">
            Naira Autos ofrece herramientas gratuitas para quienes compran, venden o le dan mantenimiento a un auto — un mecánico virtual con inteligencia artificial, calculadoras y verificadores de datos del vehículo, sin registro y sin costo.
          </p>
          <p className="text-white/50 text-sm max-w-2xl leading-relaxed">
            Empezamos atendiendo el mercado nigeriano, y ahora estamos llevando las mismas herramientas a más países e idiomas. Esta sección en español está creciendo — seguiremos agregando herramientas, guías y artículos con el tiempo.
          </p>
        </div>
      </div>

      {/* ── Featured Spanish tools ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-black uppercase text-foreground leading-none"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
          >
            Herramientas Disponibles
          </h2>
          <Link href="/herramientas" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            Ver todas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS_ES.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:border-emerald-500/40 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-bold text-sm text-foreground leading-tight">{tool.label}</p>
                    {tool.badge && (
                      <span className={`flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-wider ${tool.badgeColor}`}>
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{tool.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Qué es Naira Autos ── */}
      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-14">
          <div className="max-w-2xl">
            <h2
              className="font-black uppercase text-foreground leading-none mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
            >
              ¿Qué es Naira Autos?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Naira Autos es una plataforma de herramientas automotrices gratuitas pensada para resolver problemas reales al comprar, vender o mantener un auto — sin necesidad de crear una cuenta ni pagar nada.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Esta versión en español está en sus primeras etapas. Por ahora incluye un mecánico virtual con inteligencia artificial, una calculadora de kilometraje y un verificador de número de chasis — iremos sumando más herramientas, artículos y contenido con el tiempo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
