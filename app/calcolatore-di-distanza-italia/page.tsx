// app/calcolatore-di-distanza-italia/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorItalyItalianClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { IT_TOWNS, findTown } from '@/lib/distance-towns-it';
import { IT_CAPITAL_DISTANCE_KM } from '@/lib/it-distance-matrix';

export const metadata: Metadata = {
  title: 'Calcolatore di Distanza Italia 2026 — Distanza Stradale Tra Due Città',
  description: 'Calcola la distanza stradale e il tempo di percorrenza tra 40 città italiane — Roma, Milano, Napoli, Torino, Firenze e altre. Distanze autostradali verificate, tempo di guida e costo del carburante.',
  alternates: {
    canonical: 'https://www.naira.autos/calcolatore-di-distanza-italia',
    languages: { en: 'https://www.naira.autos/tools/distance-calculator-italy' , 'x-default': 'https://www.naira.autos/tools/distance-calculator-italy' },
  },
  openGraph: {
    title: 'Calcolatore di Distanza Italia 2026',
    description: 'Distanza stradale e tempo di percorrenza tra 40 città italiane, con calcolatore costo carburante.',
    url: 'https://www.naira.autos/calcolatore-di-distanza-italia',
    locale: 'it',
  },
  keywords: [
    'calcolatore di distanza italia', 'distanza milano napoli', 'distanza roma milano',
    'calcolatore distanza autostrada', 'costo carburante milano napoli', 'distanza milano torino',
  ],
};

const milan = findTown('Milan')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/calcolatore-di-distanza-italia',
      name: 'Calcolatore di Distanza Italia 2026 — Distanza Stradale Tra Due Città',
      description: 'Calcola la distanza stradale e il tempo di percorrenza tra 40 città italiane, con calcolatore costo carburante.',
      url: 'https://www.naira.autos/calcolatore-di-distanza-italia',
      dateModified: '2026-09-09',
      inLanguage: 'it',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Quanto dista Milano da Napoli?', acceptedAnswer: { '@type': 'Answer', text: 'Circa 757 km lungo l\u2019A1 (Autostrada del Sole), media di due fonti indipendenti che citano la lunghezza ufficiale dell\u2019autostrada — solitamente 7-8 ore di guida.' } },
        { '@type': 'Question', name: 'Quanto dista Roma da Milano?', acceptedAnswer: { '@type': 'Answer', text: 'Questo percorso è deliberatamente lasciato come stima: la stessa fonte cita due cifre contrastanti (476 km su una pagina, 571 km su un\u2019altra), quindi anziché indovinare quale sia corretta, questo strumento usa la sua stima basata su GPS.' } },
        { '@type': 'Question', name: 'Esiste una tabella ufficiale delle distanze del governo italiano?', acceptedAnswer: { '@type': 'Answer', text: 'Nessun ente pubblica una tabella unica. ANAS mantiene lunghezze ufficiali per le singole autostrade, usate qui per Milano-Napoli tramite l\u2019A1; altri percorsi sono verificati incrociando fonti indipendenti.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Calcolatore di Distanza Italia',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function DistanceCalculatorItalyItalianPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div lang="it" className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex items-center gap-3">
            <Link
              href="/tools/distance-calculator-countries"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-white/60 hover:text-amber-400 transition-all"
              aria-label="Indietro"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Strumenti</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">🇮🇹 Italia</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Gratis · 40 Città</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Ultima verifica: settembre 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Calcolatore di Distanza
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Distanza stradale e tempo di percorrenza tra due delle 40 città italiane — Roma, Milano, Napoli, Torino, Firenze e principali centri regionali.
            </p>
            <Link href="/tools/distance-calculator-italy" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              English version →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorItalyItalianClient />
          </div>
        </div>
      </div>

      <div lang="it" className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Da dove vengono questi numeri
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>L&rsquo;Italia non pubblica una matrice governativa delle distanze stradali tra le sue principali città. ANAS, l&rsquo;ente statale delle strade, mantiene lunghezze ufficiali per le singole autostrade — l&rsquo;A1 &laquo;Autostrada del Sole&raquo;, la più lunga e importante autostrada italiana, collega Milano a Napoli passando per Bologna, Firenze e Roma con una lunghezza ufficiale di circa 760&nbsp;km, confermata indipendentemente da una guida di viaggio del 2026 che cita 754&nbsp;km. La media di questi due valori dà la cifra verificata di questo strumento per Milano-Napoli: 757&nbsp;km. I collegamenti di Milano con Torino, Bologna e Genova provengono ciascuno da un&rsquo;unica guida dettagliata di distanza stradale.</p>
              <p>Vale la pena segnalare direttamente: Roma-Milano è deliberatamente lasciata non verificata dopo aver trovato una vera contraddizione interna — la stessa fonte (una guida di viaggio di un&rsquo;azienda di autonoleggio) cita 476&nbsp;km su una pagina e 571&nbsp;km su un&rsquo;altra per quella che dovrebbe essere la stessa coppia di città. Anziché scegliere una cifra e presentarla con falsa sicurezza, questo percorso usa invece la stima GPS basata su Haversine, lo stesso standard applicato a qualsiasi percorso che questo strumento non può verificare in modo pulito.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Cosa rallenta davvero il viaggio sulle strade italiane
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              L&rsquo;A1 trasporta oltre 120.000 veicoli al giorno solo nel tratto Milano-Bologna, e il traffico del weekend di Ferragosto (15 agosto) è un fenomeno nazionale genuino — il sabato precedente è costantemente il giorno di viaggio più intenso dell&rsquo;anno, insieme al Sabato Santo e ai primi/ultimi sabati delle vacanze scolastiche. Autostrade per l&rsquo;Italia e Viabilità Italia (Ministero dei Trasporti) pubblicano entrambi calendari di previsione del traffico da consultare prima di un lungo viaggio. La maggior parte delle autostrade sono a pedaggio con tariffa per chilometro, aggiungendo un costo reale oltre al carburante. Come per qualsiasi calcolatore, considera queste cifre come base di pianificazione e verifica le previsioni di traffico attuali prima di viaggiare, specialmente ad agosto.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Verificato da <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, esperta di vendita auto. Percorsi verificati dalle lunghezze ufficiali ANAS delle autostrade e da guide di distanza incrociate. Tutti gli altri percorsi, incluso Roma-Milano, sono stime basate su Haversine — vedi le FAQ sotto.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distanza da Milano a ogni città, in ordine
            </h2>
            <p className="text-sm text-gray-500 mb-4">Le altre 39 città di questo strumento, dalla più vicina alla più lontana da Milano.</p>
            <DistanceTable hub={milan} towns={IT_TOWNS} verifiedMatrix={IT_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Domande Frequenti — Calcolatore di Distanza Italia
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'Quanto dista Milano da Napoli?', a: 'Circa 757 km lungo l\u2019A1, media di due fonti che citano la lunghezza ufficiale — solitamente 7-8 ore.' },
                { q: 'Quanto dista Roma da Milano?', a: 'Lasciato come stima qui — una fonte altrimenti affidabile fornisce due cifre contrastanti (476 km e 571 km). Anziché indovinare, si usa la stima GPS.' },
                { q: 'Esiste una tabella ufficiale delle distanze italiane?', a: 'Nessuna matrice governativa unica, ma ANAS documenta lunghezze ufficiali delle autostrade, usate qui per Milano-Napoli tramite l\u2019A1.' },
                { q: 'Quanto dista Milano da Torino?', a: 'Circa 141 km, un tragitto breve e ben noto.' },
                { q: 'Posso calcolare il costo del carburante?', a: 'Sì — scegli un tipo di veicolo e il prezzo attuale (€/litro) sopra; lo strumento converte direttamente la distanza in litri e costo stimati (pedaggi esclusi).' },
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
