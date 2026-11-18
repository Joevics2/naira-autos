import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import CalcolatoreImportazioneItaliaClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/strumenti/calcolatore-importazione-auto-italia';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'Importare un’auto in Italia 2026 — Calcolatore di dazio, IVA e IPT',
  description: 'Calcolatore gratuito per importare un’auto in Italia: dazio del 10 %, IVA del 22 %, IPT con maggiorazione provinciale calcolata sui kW, spese di immatricolazione, Giappone e Stati Uniti allo 0 %, elettriche cinesi. Aggiornato a ottobre 2026.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'Importare un’auto in Italia: calcolatore | Naira Autos',
    description: 'Calcola dazio, IVA, IPT e spese di immatricolazione per un’auto importata in Italia.',
    url: URL, siteName: 'Naira Autos', locale: 'it_IT', type: 'website',
  },
  keywords: [
    'importare auto in Italia costi', 'calcolo IPT auto importata', 'dazio auto extra UE 10 per cento',
    'IVA importazione auto 22 per cento', 'immatricolare auto estera in Italia', 'importare auto dagli Stati Uniti 2026',
    'importare auto dal Giappone dazio 0', 'IPT maggiorazione provinciale 30', 'auto fiscalmente nuova 6 mesi 6000 km',
  ].join(', '),
};

const FAQ = [
  { q: 'Quali imposte si pagano importando un’auto in Italia?', a: 'Se l’auto arriva da fuori dell’Unione Europea si paga il dazio del 10 % sul valore in dogana (prezzo, nolo e assicurazione fino al confine UE) e poi l’IVA del 22 % su quel valore più il dazio. All’immatricolazione si aggiunge l’IPT, l’imposta provinciale di trascrizione, più le spese fisse di 85,20 euro tra emolumenti ACI, diritti della Motorizzazione e bolli. Un’auto acquistata in un altro Paese UE non paga dazio.' },
  { q: 'Il dazio sulle auto è del 10 % o del 6,5 %?', a: 'Il dazio dell’Unione Europea sulle autovetture è del 10 %. Qualche guida online riporta il 6,5 %, che non corrisponde alla tariffa doganale comune per le autovetture. Il calcolatore usa il 10 %, e lo riduce solo quando un accordo con prova di origine lo azzera.' },
  { q: 'Come si calcola l’IPT di un’auto importata?', a: 'Fino a 53 kW l’IPT è un importo fisso di 150,81 euro. Oltre i 53 kW si pagano 3,5119 euro per ogni kW di potenza dell’auto, contando tutti i kW. Le province possono poi maggiorare l’importo fino al 30 %, mentre Aosta, Bolzano e Trento applicano la tariffa base. Molti siti riportano una formula in cui si pagano solo i kW eccedenti i 53, ma la tabella pubblicata dall’ACI per il 2026 corrisponde al calcolo sull’intera potenza.' },
  { q: 'Quando devo pagare l’IVA su un’auto comprata in un altro Paese UE?', a: 'Solo se il veicolo è nuovo ai fini fiscali: meno di 6 mesi dalla prima immatricolazione oppure meno di 6.000 km. In quel caso si versa l’IVA italiana del 22 % anche se l’auto è venduta da un privato. Un’usata oltre entrambe le soglie, per cui l’imposta è già stata assolta nel Paese del venditore, non paga IVA in Italia. L’IPT è dovuta in entrambi i casi.' },
  { q: 'Un’auto americana paga ancora il 10 % di dazio?', a: 'Non necessariamente. Dal 1° luglio 2026 il Regolamento (UE) 2026/1455 azzera i dazi sui prodotti industriali di origine statunitense, quindi un’auto costruita negli Stati Uniti può entrare a 0 % se provi l’origine e il trasporto diretto. Un’auto europea o giapponese comprata negli USA paga ancora il 10 %. L’IVA del 22 % si paga in ogni caso.' },
  { q: 'E le auto giapponesi o coreane?', a: 'Le auto giapponesi sono allo 0 % dal 1° febbraio 2026, quando termina la riduzione graduale prevista dall’accordo di partenariato UE-Giappone, con una dichiarazione di origine. Quelle coreane sono allo 0 % grazie all’accordo di libero scambio, sempre con prova di origine. Senza documento valido si applica il 10 %.' },
  { q: 'Le auto elettriche pagano meno?', a: 'L’IPT di un’auto elettrica si calcola sui kW come le altre, ma alcune province la riducono o la azzerano, quindi conviene verificarlo nella tua provincia. Un’elettrica cinese paga inoltre, all’ingresso nell’UE, il 10 % di dazio più un dazio compensativo tra il 7,8 % e il 35,3 % a seconda del costruttore, salvo impegno sui prezzi accettato.' },
  { q: 'Che cosa non include il calcolatore?', a: 'Non include il bollo auto annuale, il superbollo per le potenze elevate, l’assicurazione, le targhe, la parcella dell’agenzia di pratiche auto e i costi dell’omologazione per le auto senza certificato di conformità europeo. Questi ultimi vanno inseriti nel campo “Altre spese”.' },
  { q: 'Quanto costa in totale la burocrazia di immatricolazione?', a: 'Le spese fisse nazionali sono 85,20 euro, a cui si somma l’IPT, che varia con kW e provincia. Per una berlina da 110 kW in una provincia con maggiorazione del 30 % l’IPT è di 502,20 euro. Alle spese di legge si aggiunge la parcella dell’agenzia, che di solito va da 50 a 150 euro.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'Importare un’auto in Italia — calcolatore di dazio, IVA e IPT',
      description: 'Calcolatore gratuito di dazio, IVA, IPT e spese di immatricolazione per un’auto importata in Italia.',
      url: URL, inLanguage: 'it-IT', dateModified: '2026-11-18',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Fondatore', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos/inizio' },
          { '@type': 'ListItem', position: 2, name: 'Strumenti', item: 'https://www.naira.autos/strumenti' },
          { '@type': 'ListItem', position: 3, name: 'Importare un’auto in Italia', item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', inLanguage: 'it-IT', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'SoftwareApplication', name: 'Calcolatore importazione auto in Italia', inLanguage: 'it-IT', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';

export default function CalcolatoreImportazioneAutoItaliaPage() {
  return (
    <div lang="it">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link prefetch={false} href="/strumenti" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="Indietro">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Percorso di navigazione" className="flex items-center gap-1.5 text-xs text-white/30 flex-wrap">
              <Link prefetch={false} href="/inizio" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link prefetch={false} href="/strumenti" className="hover:text-white/60 transition-colors">Strumenti</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇮🇹 Importare un’auto</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">100% gratuito</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">IPT con tabella ACI</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Verificato: novembre 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Importare un’auto<br /><span className="text-blue-400">in Italia</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Quanto costa davvero immatricolare un’auto importata?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Scegli l’origine, la potenza in kW e la provincia per vedere dazio, IVA, IPT e spese fisse di immatricolazione.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Solo una stima.</strong> La maggiorazione dell’IPT cambia da provincia a provincia e molte guide online riportano formule o dazi sbagliati. Verifica l’importo con il PRA, una delegazione ACI o un’agenzia di pratiche auto prima di acquistare.
          </p>
        </div>
      </div>

      <CalcolatoreImportazioneItaliaClient />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>Dazio, IVA e IPT: come si forma il costo di un’auto importata</h2>
            <p className={`${p} mb-6 max-w-3xl`}>
              Importare un’auto in Italia somma tre strati di costo. Il primo è doganale: nessun dazio dentro l’Unione Europea e il 10 % del valore in dogana per un’auto che arriva da un Paese terzo, a meno che un accordo commerciale con prova di origine lo azzeri. Il secondo è l’IVA del 22 %, calcolata sul valore in dogana più il dazio. Il terzo è tipicamente italiano: l’imposta provinciale di trascrizione, l’IPT, che si paga alla prima iscrizione al PRA e dipende dai kW dell’auto e dalla provincia in cui risiedi, oltre a 85,20 euro di spese fisse. Il calcolatore somma tutto nell’ordine in cui lo applica l’amministrazione.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Dazio (extra UE)', rate: '10 %', base: 'sul valore in dogana', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'IVA all’importazione', rate: '22 %', base: 'valore in dogana + dazio', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/5', border: 'border-blue-200 dark:border-blue-500/20' },
                { label: 'Giappone, Corea, USA', rate: '0 %', base: 'dazio, con prova di origine', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
                { label: 'IPT oltre 53 kW', rate: '€ 3,5119', base: 'per ogni kW, fino a +30 %', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
              ].map(({ label, rate, base, color, bg, border }) => (
                <div key={label} className={`p-5 rounded-2xl ${bg} border ${border}`}>
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className={`text-3xl font-black ${color}`} style={heading}>{rate}</p>
                  <p className="text-xs text-muted-foreground mt-1">{base}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Cosa è cambiato nel 2025 e nel 2026</h2>
                <div className="space-y-3">
                  <p className={p}><strong className="text-foreground">Stati Uniti:</strong> dal 1° luglio 2026 il Regolamento (UE) 2026/1455 elimina i dazi sui prodotti industriali di origine statunitense, auto comprese. Serve provare che l’auto è stata costruita negli USA e che è arrivata con trasporto diretto.</p>
                  <p className={p}><strong className="text-foreground">Giappone:</strong> la riduzione graduale del dazio sulle auto giapponesi si chiude il 1° febbraio 2026, con 0 % su dichiarazione di origine.</p>
                  <p className={p}><strong className="text-foreground">Cina:</strong> le elettriche cinesi pagano il 10 % più un dazio compensativo: BYD 17 %, Geely 18,8 %, SAIC 35,3 %, Tesla Shanghai 7,8 %. A febbraio 2026 è stato accettato il primo impegno sui prezzi, per la Cupra Tavascan.</p>
                  <p className={p}><strong className="text-foreground">Regno Unito:</strong> le auto britanniche entrano a 0 % con prova di origine. Per le elettriche sono previste regole di origine più severe dal 1° gennaio 2027.</p>
                  <p className={p}><strong className="text-foreground">Sportello Online ACI:</strong> dal 1° aprile 2026 il nuovo canale digitale per i servizi dei PRA affianca gli sportelli telematici, con pagamenti tramite pagoPA.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Esempio 1: un’auto dagli Emirati, senza accordo</h2>
                <p className={p}>Un’auto costa 20.000 € con 1.500 € di nolo e assicurazione, quindi il valore in dogana è 21.500 €. Il dazio del 10 % è 2.150 €. L’IVA del 22 % su 23.650 € è 5.203 €. Con 110 kW in una provincia con maggiorazione del 30 %, l’IPT è 3,5119 × 110 = 386,31 €, che diventano 502,20 €. Aggiungendo 85,20 € di spese fisse, le imposte e le spese di immatricolazione sono 7.940,40 €, il 36,9 % del valore in dogana.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Esempio 2: un’auto giapponese con e senza prova di origine</h2>
                <p className={p}>Un’auto da 15.000 € con 1.200 € di nolo ha un valore in dogana di 16.200 €. Con la dichiarazione di origine il dazio è zero e l’IVA è 3.564 €. Senza, il dazio di 1.620 € porta la base IVA a 17.820 € e l’IVA a 3.920,40 €: in tutto 5.540,40 €. Quel documento mancante costa 1.976,40 €.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Esempio 3: usata tedesca da 96 kW</h2>
                <p className={p}>Un’auto usata da 26.000 €, con oltre 6 mesi e oltre 6.000 km, importata dalla Germania e immatricolata in una provincia con maggiorazione del 20 %. Non ci sono né dazio né IVA italiana. L’IPT è 3,5119 × 96 = 337,14 €, che diventano 404,57 € con la maggiorazione. Con 85,20 € di spese fisse, il conto delle imposte è 489,77 €.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Esempio 4: SUV nuovo acquistato nell’UE</h2>
                <p className={p}>Un SUV nuovo da 40.000 € e 150 kW paga l’IVA italiana del 22 %, cioè 8.800 €. L’IPT è 3,5119 × 150 = 526,79 €, che diventano 684,83 € con il 30 % di maggiorazione. Con le spese fisse le imposte sommano 9.570,03 €.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Esempio 5: elettrica cinese BYD</h2>
                <p className={p}>Per 30.000 € con 1.500 € di nolo, il valore in dogana è 31.500 €. Il dazio del 10 % vale 3.150 € e il dazio compensativo del 17 % vale 5.355 €. L’IVA del 22 % su 40.005 € vale 8.801,10 €. Con un’auto da 150 kW si aggiungono 684,83 € di IPT e 85,20 € di spese fisse, per un totale di 18.076,13 € di imposte.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Esempio 6: quanto pesa la provincia</h2>
                <p className={p}>Un’auto da 74 kW ha un IPT base di 259,88 €. Ad Aosta, Bolzano o Trento resta tale. In una provincia con maggiorazione del 30 % sale a 337,84 €, cioè 77,96 € in più per la stessa auto.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Passo dopo passo: importare un’auto</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Ottieni il documento di circolazione estero, il certificato di conformità (COC) se esiste e la fattura. Annota i kW.</li>
                  <li>Controlla il Paese di costruzione e chiedi la prova di origine se un accordo azzera il dazio.</li>
                  <li>Fuori dall’UE, fai la dichiarazione doganale e paga dazio e IVA. Nell’UE, versa l’IVA solo se l’auto è nuova.</li>
                  <li>Senza omologazione europea, prenota la visita alla Motorizzazione per l’omologazione italiana.</li>
                  <li>Presenta la richiesta di immatricolazione al PRA o a un’agenzia di pratiche auto, pagando IPT, emolumenti e bolli.</li>
                  <li>Ritira targhe e documento unico e attiva l’assicurazione.</li>
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>Errori comuni</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Usare un dazio del 6,5 %, che non è la tariffa per le autovetture.</li>
                  <li>Calcolare l’IPT solo sui kW oltre i 53, invece che su tutta la potenza.</li>
                  <li>Dimenticare che l’IVA all’importazione si calcola anche sul dazio.</li>
                  <li>Contare sullo 0 % senza prova di origine o senza trasporto diretto dagli Stati Uniti.</li>
                  <li>Credere che un’usata UE non paghi mai IVA: sotto i 6 mesi o i 6.000 km è considerata nuova.</li>
                  <li>Non considerare la maggiorazione provinciale, che può arrivare al 30 %.</li>
                </ul>
              </div>
              <div>
                <h2 className={h2} style={heading}>Cosa non copre il calcolatore</h2>
                <p className={p}>Il calcolatore non copre le auto storiche, i trasferimenti di residenza con franchigia, le agevolazioni per la disabilità, moto e veicoli commerciali. Non calcola il bollo auto, il superbollo, l’assicurazione, le targhe né l’omologazione individuale, che dipende dal singolo veicolo. Non applica le riduzioni dell’IPT che alcune province riconoscono alle auto elettriche: se ne hai diritto, riduci tu la maggiorazione.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={heading}>Domande frequenti</h2>
            <div className="space-y-3 max-w-3xl">
              {FAQ.map((f) => (
                <details key={f.q} className="group rounded-xl border border-border bg-card px-4 py-3">
                  <summary className="cursor-pointer text-sm font-semibold text-foreground list-none">{f.q}</summary>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Verificato da <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Fondatore. Fonti: ACI (tariffe IPT, D.M. 27 novembre 1998 n. 435 e costi del passaggio di proprietà 2026), tariffa doganale comune dell’UE (TARIC), D.L. 331/1993 sulle operazioni intracomunitarie, Regolamento (UE) 2026/1455, Regolamento di esecuzione (UE) 2024/2754, accordo di partenariato UE-Giappone e accordo di commercio e cooperazione UE-Regno Unito. Ultima verifica: novembre 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
