// app/afstandscalculator-nederland/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorNetherlandsDutchClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { NL_TOWNS, findTown } from '@/lib/distance-towns-nl';
import { NL_CAPITAL_DISTANCE_KM } from '@/lib/nl-distance-matrix';

export const metadata: Metadata = {
  title: 'Afstandscalculator Nederland 2026 — Reisafstand Tussen Twee Steden',
  description: 'Bereken de reisafstand en rijtijd tussen 32 Nederlandse steden — Amsterdam, Rotterdam, Den Haag, Utrecht en meer. Geverifieerde wegafstanden, rijtijd en brandstofkosten.',
  alternates: {
    canonical: 'https://www.naira.autos/afstandscalculator-nederland',
    languages: {
      en: 'https://www.naira.autos/tools/distance-calculator-netherlands',
      'x-default': 'https://www.naira.autos/tools/distance-calculator-netherlands',
    },
  },
  openGraph: {
    title: 'Afstandscalculator Nederland 2026',
    description: 'Reisafstand en rijtijd tussen 32 Nederlandse steden, met brandstofkosten-calculator.',
    url: 'https://www.naira.autos/afstandscalculator-nederland',
    locale: 'nl',
  },
  keywords: [
    'afstandscalculator nederland', 'afstand amsterdam rotterdam', 'afstand amsterdam utrecht',
    'reisafstand berekenen', 'brandstofkosten amsterdam rotterdam', 'afstand utrecht groningen',
  ],
};

const amsterdam = findTown('Amsterdam')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/afstandscalculator-nederland',
      name: 'Afstandscalculator Nederland 2026 — Reisafstand Tussen Twee Steden',
      description: 'Bereken de reisafstand en rijtijd tussen 32 Nederlandse steden, met brandstofkosten-calculator.',
      url: 'https://www.naira.autos/afstandscalculator-nederland',
      dateModified: '2026-09-09',
      inLanguage: 'nl',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Hoe ver is Amsterdam van Rotterdam?', acceptedAnswer: { '@type': 'Answer', text: 'Ongeveer 77 km, gemiddelde van twee onafhankelijk gepubliceerde rijafstanden — meestal minder dan een uur via de A4.' } },
        { '@type': 'Question', name: 'Hoe ver is Utrecht van Groningen?', acceptedAnswer: { '@type': 'Answer', text: 'Ongeveer 187 km via de A28, de officiële lengte volgens Rijkswaterstaat.' } },
        { '@type': 'Question', name: 'Is er een officiële Nederlandse afstandstabel?', acceptedAnswer: { '@type': 'Answer', text: 'Er is geen openbare stad-tot-stad matrix, maar Rijkswaterstaat documenteert officiële lengtes van snelwegen, gebruikt hier direct voor Utrecht-Groningen.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Afstandscalculator Nederland',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function DistanceCalculatorNetherlandsDutchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div lang="nl" className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex items-center gap-3">
            <Link
              href="/tools/distance-calculator-countries"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-white/60 hover:text-amber-400 transition-all"
              aria-label="Terug"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">🇳🇱 Nederland</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Gratis · 32 Steden</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Laatst gecontroleerd: september 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Afstandscalculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Reisafstand en rijtijd tussen twee van 32 Nederlandse steden — Amsterdam, Rotterdam, Den Haag, Utrecht en belangrijke regionale centra.
            </p>
            <Link href="/tools/distance-calculator-netherlands" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              English version →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorNetherlandsDutchClient />
          </div>
        </div>
      </div>

      <div lang="nl" className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Waar deze cijfers vandaan komen
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>Nederland publiceert geen openbare stad-tot-stad afstandsmatrix. Rijkswaterstaat documenteert wel de officiële lengte van elke genummerde snelweg (A1 tot A99), maar — net als bij de Duitse Autobahnen — beschrijven die lengtes hele routes met tientallen aansluitingen, niet per se de specifieke stad-tot-stad afstand die een bestuurder nodig heeft. De ene duidelijke uitzondering hier is Utrecht-Groningen, dat de volledige A28 volgt met een officiële Rijkswaterstaat-lengte van 187&nbsp;km.</p>
              <p>Amsterdams verbindingen met Rotterdam, Eindhoven en Utrecht zijn elk gemiddeld uit twee onafhankelijk gepubliceerde rijafstanden, aangezien Nederlands korte afstanden betekenen dat kleine meetverschillen (bijvoorbeeld welk exact adres binnen elke stad) een cijfer met 10-15% kunnen laten verschuiven zonder dat een van beide bronnen fout is. Gezien de compacte omvang van het land — minder dan 300&nbsp;km van kust tot kust — benadert de GPS-schatting op basis van Haversine die deze tool gebruikt voor elke andere route de werkelijke rijafstand vaak toch al goed.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Wat uw reis echt vertraagt op Nederlandse wegen
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Nederland heeft een van de dichtste en drukst bereden snelwegnetten van Europa, en verschillende trajecten — de A2 bij Utrecht, de A4 en A13 rond Den Haag en Rotterdam, en de A10 ring rond Amsterdam — behoren tijdens de spits tot de meest verstopte wegen van Europa, ondanks de kleine omvang van het land. De verkeersinformatiedienst van Rijkswaterstaat en apps zoals ANWB Onderweg bieden actuele filegegevens, de moeite waard om te controleren voor elke rit door de Randstad (Amsterdam-Rotterdam-Den Haag-Utrecht). Zoals bij elke rekentool: beschouw deze cijfers als een planningsbasis en controleer de actuele verkeerssituatie voor het vertrek, vooral tijdens de spits op werkdagen.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Gecontroleerd door <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, auto-verkoopexpert. Geverifieerde routes gebaseerd op de officiële A28-lengte van Rijkswaterstaat en vergeleken rijafstand-gidsen. Alle andere routes zijn schattingen op basis van Haversine — zie de veelgestelde vragen hieronder.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Afstand van Amsterdam tot elke stad, gesorteerd
            </h2>
            <p className="text-sm text-gray-500 mb-4">Alle 31 andere steden in deze tool, van dichtstbij tot verst van Amsterdam.</p>
            <DistanceTable hub={amsterdam} towns={NL_TOWNS} verifiedMatrix={NL_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Veelgestelde Vragen — Afstandscalculator Nederland
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'Hoe ver is Amsterdam van Rotterdam?', a: 'Ongeveer 77 km, gemiddelde van twee onafhankelijke bronnen — meestal minder dan een uur via de A4.' },
                { q: 'Hoe ver is Utrecht van Groningen?', a: 'Ongeveer 187 km via de A28, de officiële lengte volgens Rijkswaterstaat.' },
                { q: 'Is er een officiële Nederlandse afstandstabel?', a: 'Geen openbare matrix, maar Rijkswaterstaat documenteert officiële snelweglengtes, hier gebruikt voor Utrecht-Groningen. De kleine omvang van het land betekent dat andere schattingen de werkelijkheid goed benaderen.' },
                { q: 'Hoe ver is Amsterdam van Eindhoven?', a: 'Ongeveer 123 km, gemiddelde van twee onafhankelijke rijafstand-bronnen.' },
                { q: 'Kan ik de brandstofkosten berekenen?', a: 'Ja — kies hierboven een voertuigtype en de huidige literprijs (€); de tool zet de afstand direct om in geschatte liters en kosten.' },
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
