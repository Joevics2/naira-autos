// app/outils/calculateur-de-distance-france/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorFranceFrenchClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { FR_TOWNS, findTown } from '@/lib/distance-towns-fr';
import { FR_CAPITAL_DISTANCE_KM } from '@/lib/fr-distance-matrix';

export const metadata: Metadata = {
  title: 'Calculateur de Distance France 2026 — Distance Routière Entre Deux Villes',
  description: 'Calculez la distance routière et le temps de trajet entre 34 villes françaises — Paris, Lyon, Marseille, Toulouse, Bordeaux et plus. Distances autoroutières vérifiées, temps de trajet et coût du carburant.',
  alternates: {
    canonical: 'https://www.naira.autos/outils/calculateur-de-distance-france',
    languages: { en: 'https://www.naira.autos/tools/distance-calculator-france' , 'x-default': 'https://www.naira.autos/tools/distance-calculator-france' },
  },
  openGraph: {
    title: 'Calculateur de Distance France 2026',
    description: 'Distance routière et temps de trajet entre 34 villes françaises, avec estimateur de coût de carburant.',
    url: 'https://www.naira.autos/outils/calculateur-de-distance-france',
    locale: 'fr',
  },
  keywords: [
    'calculateur de distance france', 'distance paris lyon', 'distance paris marseille',
    'calculateur distance autoroute', 'coût carburant paris lyon', 'distance bordeaux toulouse',
  ],
};

const paris = findTown('Paris')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/outils/calculateur-de-distance-france',
      name: 'Calculateur de Distance France 2026 — Distance Routière Entre Deux Villes',
      description: 'Calculez la distance routière et le temps de trajet entre 34 villes françaises, avec estimateur de coût de carburant.',
      url: 'https://www.naira.autos/outils/calculateur-de-distance-france',
      dateModified: '2026-09-09',
      inLanguage: 'fr',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Quelle est la distance entre Paris et Lyon ?', acceptedAnswer: { '@type': 'Answer', text: 'Environ 460 km par l\u2019A6, un chiffre recoupé entre plusieurs sources indépendantes — généralement un trajet de 4h30.' } },
        { '@type': 'Question', name: 'Quelle est la distance entre Lyon et Marseille ?', acceptedAnswer: { '@type': 'Answer', text: 'Environ 306 km par l\u2019A7 (Autoroute du Soleil), la longueur officielle documentée sur Wikipédia.' } },
        { '@type': 'Question', name: 'Existe-t-il un tableau de distances officiel du gouvernement français ?', acceptedAnswer: { '@type': 'Answer', text: 'Aucun organisme ne publie de matrice officielle ville à ville, mais les autoroutes françaises sont documentées individuellement sur Wikipédia avec leur longueur officielle, utilisée directement ici lorsqu\u2019une autoroute relie deux grandes villes de bout en bout.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Calculateur de Distance France',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function DistanceCalculatorFranceFrenchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div lang="fr" className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex items-center gap-3">
            <Link
              href="/tools/distance-calculator-countries"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-white/60 hover:text-amber-400 transition-all"
              aria-label="Retour"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/outils" className="hover:text-white/60 transition-colors">Outils</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">🇫🇷 France</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Gratuit · 34 Villes</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Dernière vérification : septembre 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Calculateur de Distance
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Distance routière et temps de trajet entre deux des 34 villes françaises — Paris, Lyon, Marseille, Toulouse, Bordeaux et principaux centres régionaux.
            </p>
            <Link href="/tools/distance-calculator-france" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              English version →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorFranceFrenchClient />
          </div>
        </div>
      </div>

      <div lang="fr" className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              D&rsquo;où viennent ces chiffres
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>La France ne publie pas de matrice gouvernementale des distances routières entre ses principales villes, mais son réseau autoroutier est particulièrement bien documenté sur Wikipédia, avec la longueur officielle de presque chaque autoroute numérotée. Deux des itinéraires vérifiés de cet outil proviennent directement de ces longueurs officielles&nbsp;: Lyon-Marseille parcourt l&rsquo;intégralité de l&rsquo;A7 (l&rsquo;&laquo;&nbsp;Autoroute du Soleil&nbsp;&raquo;), officiellement 306&nbsp;km, et Bordeaux-Toulouse parcourt l&rsquo;intégralité de l&rsquo;A62, officiellement 231&nbsp;km.</p>
              <p>Paris-Lyon et Paris-Strasbourg ne suivent pas une autoroute unique aussi nettement, donc ces deux trajets sont recoupés entre plusieurs sources indépendantes de distance routière — convergeant vers environ 460&nbsp;km (A6) et 487&nbsp;km (A4) respectivement. Tout autre trajet parmi les 34 villes de cet outil utilise l&rsquo;estimation GPS basée sur la formule de Haversine, calibrée sur la matrice routière complète et vérifiée du Nigeria.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Ce qui ralentit vraiment votre trajet sur les routes françaises
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              La plupart des autoroutes françaises sont à péage, et les péages ajoutent un coût réel même sans ajouter de temps — un trajet complet Calais-Marseille peut coûter plus de 90&nbsp;€ rien qu&rsquo;en péages. Le périphérique parisien est notoirement encombré à presque toute heure, et le système Bison Futé existe précisément parce que les week-ends de vacances (surtout le samedi autour du 15&nbsp;août) voient des bouchons nationaux sévères, tout le pays semblant descendre vers le sud en même temps. Presque toutes les grandes villes françaises, y compris Paris, Lyon, Marseille et Bordeaux, appliquent désormais une Zone à Faibles Émissions nécessitant une vignette Crit&rsquo;Air, à commander en ligne à l&rsquo;avance. Comme pour tout calculateur, considérez ces chiffres comme une base de planification et vérifiez l&rsquo;état du trafic et des péages avant un long trajet.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Vérifié par <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, experte en vente automobile. Itinéraires vérifiés à partir des longueurs officielles d&rsquo;autoroutes sur Wikipédia et de guides de distance recoupés. Tous les autres itinéraires sont des estimations basées sur Haversine — voir la FAQ ci-dessous.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance de Paris à chaque ville, classée
            </h2>
            <p className="text-sm text-gray-500 mb-4">Les 33 autres villes de cet outil, de la plus proche à la plus éloignée de Paris.</p>
            <DistanceTable hub={paris} towns={FR_TOWNS} verifiedMatrix={FR_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              FAQ — Calculateur de Distance France
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'Quelle est la distance entre Paris et Lyon ?', a: 'Environ 460 km par l\u2019A6, recoupée entre plusieurs sources — généralement 4h30 de trajet.' },
                { q: 'Quelle est la distance entre Lyon et Marseille ?', a: 'Environ 306 km par l\u2019A7 (Autoroute du Soleil), une longueur officielle documentée sur Wikipédia.' },
                { q: 'Existe-t-il un tableau de distances officiel ?', a: 'Aucune matrice gouvernementale unique, mais les autoroutes françaises ont des longueurs officielles documentées, utilisées ici directement pour les grands trajets.' },
                { q: 'Quelle est la distance entre Bordeaux et Toulouse ?', a: 'Environ 231 km par l\u2019A62, une longueur officielle.' },
                { q: 'Puis-je calculer le coût du carburant ?', a: 'Oui — choisissez un type de véhicule et le prix actuel du carburant (€/litre) ci-dessus ; l\u2019outil convertit directement la distance en litres et coût estimés (péages non inclus).' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3 hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-semibold text-gray-900">{q}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4"><p className="text-sm text-gray-600 leading-relaxed">{a}</p></div>
                </details>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
