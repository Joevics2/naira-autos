// app/entfernungsrechner-deutschland/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorGermanyGermanClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { DE_TOWNS, findTown } from '@/lib/distance-towns-de';
import { DE_CAPITAL_DISTANCE_KM } from '@/lib/de-distance-matrix';

export const metadata: Metadata = {
  title: 'Entfernungsrechner Deutschland 2026 — Straßenentfernung zwischen zwei Städten',
  description: 'Berechnen Sie die Straßenentfernung und Fahrzeit zwischen 40 deutschen Städten — Berlin, München, Hamburg, Frankfurt, Köln und mehr. Geprüfte Autobahnentfernungen, Fahrzeit und Kraftstoffkosten.',
  alternates: {
    canonical: 'https://www.naira.autos/entfernungsrechner-deutschland',
    languages: { en: 'https://www.naira.autos/tools/distance-calculator-germany' , 'x-default': 'https://www.naira.autos/tools/distance-calculator-germany' },
  },
  openGraph: {
    title: 'Entfernungsrechner Deutschland 2026',
    description: 'Straßenentfernung und Fahrzeit zwischen 40 deutschen Städten, mit Kraftstoffkosten-Rechner.',
    url: 'https://www.naira.autos/entfernungsrechner-deutschland',
    locale: 'de',
  },
  keywords: [
    'entfernungsrechner deutschland', 'entfernung berlin münchen', 'entfernung hamburg frankfurt',
    'entfernungsrechner autobahn', 'kraftstoffkosten berlin münchen', 'entfernung berlin köln',
  ],
};

const berlin = findTown('Berlin')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/entfernungsrechner-deutschland',
      name: 'Entfernungsrechner Deutschland 2026 — Straßenentfernung zwischen zwei Städten',
      description: 'Berechnen Sie die Straßenentfernung und Fahrzeit zwischen 40 deutschen Städten, mit Kraftstoffkosten-Rechner.',
      url: 'https://www.naira.autos/entfernungsrechner-deutschland',
      dateModified: '2026-09-09',
      inLanguage: 'de',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Wie weit ist Berlin von München entfernt?', acceptedAnswer: { '@type': 'Answer', text: 'Etwa 585 km über die A9, abgeglichen mit einem detaillierten Fahrtenführer — normalerweise eine Fahrzeit von 5,5 bis 6,5 Stunden.' } },
        { '@type': 'Question', name: 'Gibt es eine offizielle deutsche Entfernungstabelle?', acceptedAnswer: { '@type': 'Answer', text: 'Keine einzelne Bundesbehörde veröffentlicht eine öffentliche Stadt-zu-Stadt-Matrix. Die geprüften Strecken in diesem Tool stammen aus abgeglichenen Fahrtenführer-Angaben für benannte Autobahnrouten.' } },
        { '@type': 'Question', name: 'Wie weit ist Hamburg von Frankfurt entfernt?', acceptedAnswer: { '@type': 'Answer', text: 'Etwa 490 km über die A7/A5, normalerweise eine Fahrzeit von 4,5 bis 5,5 Stunden.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Entfernungsrechner Deutschland',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function DistanceCalculatorGermanyGermanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div lang="de" className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex items-center gap-3">
            <Link
              href="/tools/distance-calculator-countries"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-white/60 hover:text-amber-400 transition-all"
              aria-label="Zurück"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Startseite</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Werkzeuge</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">🇩🇪 Deutschland</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Kostenlos · 40 Städte</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Zuletzt geprüft: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Entfernungsrechner
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Straßenentfernung und Fahrzeit zwischen zwei von 40 deutschen Städten — Berlin, München, Hamburg, Frankfurt, Köln und weitere Regionalzentren.
            </p>
            <Link href="/tools/distance-calculator-germany" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              English version →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorGermanyGermanClient />
          </div>
        </div>
      </div>

      <div lang="de" className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Woher diese Zahlen stammen
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>Keine einzelne deutsche Bundesbehörde veröffentlicht eine öffentliche Stadt-zu-Stadt-Entfernungstabelle. Das Autobahnnetz selbst ist akribisch dokumentiert — Wikipedia verzeichnet die offizielle Länge jeder nummerierten Bundesautobahn —, aber diese Längen beschreiben ganze Autobahnen von Anfang bis Ende, nicht unbedingt die konkrete Städtepaar-Entfernung, die ein Fahrer nachschlagen möchte.</p>
              <p>Die 6 geprüften Strecken dieses Tools stammen daher aus einem detaillierten Fahrtenführer von 2026, der Streckenentfernungen direkt nennt: Berlin nach München (585 km über die A9), Hamburg nach Frankfurt (490 km über die A7/A5), Berlin nach Köln (570 km über die A2), München nach Hamburg (780 km über die A7 bzw. A9/A1) und Frankfurt nach Dresden (430 km über die A4) — plus München nach Köln (455 km über die A9/A3) aus einer unabhängigen Autovermietungsquelle. Jede andere Strecke unter den 40 Städten dieses Tools nutzt die GPS-basierte Schätzung auf Basis der Haversine-Formel, kalibriert an Nigerias vollständig geprüfter Straßenmatrix.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Was Ihre Fahrt auf deutschen Straßen wirklich verlangsamt
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Die berühmten Hochgeschwindigkeitsabschnitte der Autobahn werden oft durch ebenso berühmte Staus ausgeglichen — Deutschland verzeichnet täglich zehntausende Stau-Kilometer, mit Brennpunkten wie der A3 zwischen Frankfurt und Köln, der A1 bei Hamburg, der A8 bei München und der A9 vor Berlin. Baustellen sind ein ständiges Merkmal von Langstreckenfahrten, mit verpflichtenden 80-km/h-Zonen, die per Section Control überwacht werden. Feiertage, Sommerwochenenden und die Wochen um die Schulferien sind besonders anfällig für schwere Verzögerungen — der ADAC-Staumelder und Echtzeit-Navigations-Apps liefern aktuelle Updates. Wie bei jedem Rechner sollten Sie diese Zahlen als Planungsgrundlage betrachten und vor einer längeren Fahrt die aktuelle Verkehrslage prüfen.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Geprüft von <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto-Verkaufsexpertin. Geprüfte Strecken abgeglichen mit unabhängigen Fahrtenführer-Quellen. Alle anderen Strecken sind Haversine-basierte Schätzungen — siehe FAQ unten.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Entfernung von Berlin zu jeder Stadt, sortiert
            </h2>
            <p className="text-sm text-gray-500 mb-4">Alle 39 weiteren Städte in diesem Tool, von der nächstgelegenen bis zur am weitesten entfernten.</p>
            <DistanceTable hub={berlin} towns={DE_TOWNS} verifiedMatrix={DE_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Häufige Fragen — Entfernungsrechner Deutschland
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'Wie weit ist Berlin von München entfernt?', a: 'Etwa 585 km über die A9, abgeglichen mit einem Fahrtenführer — normalerweise 5,5 bis 6,5 Stunden Fahrzeit.' },
                { q: 'Gibt es eine offizielle deutsche Entfernungstabelle?', a: 'Keine einzelne Bundesbehörde veröffentlicht eine solche. Dieses Tool nutzt abgeglichene Fahrtenführer-Angaben für benannte Autobahnrouten.' },
                { q: 'Wie weit ist Hamburg von Frankfurt entfernt?', a: 'Etwa 490 km über die A7/A5, normalerweise 4,5 bis 5,5 Stunden.' },
                { q: 'Wie weit ist München von Köln entfernt?', a: 'Etwa 455 km über die A9/A3, normalerweise unter 6 Stunden.' },
                { q: 'Kann ich die Kraftstoffkosten berechnen?', a: 'Ja — wählen Sie oben einen Fahrzeugtyp und den aktuellen Literpreis; das Tool berechnet daraus direkt den geschätzten Verbrauch und die Kosten.' },
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
