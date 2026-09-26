import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { QuantoValeLaMiaAutoClient } from './client';

export const metadata: Metadata = {
  title: 'Quanto Vale la Mia Auto? Valutazione Gratuita con IA | Naira Autos',
  description: 'Valuta la tua auto gratis con l\u2019IA, nella tua valuta locale. Carica una foto e ricevi subito un prezzo — Italia e non solo.',
  keywords: 'quanto vale la mia auto, valutazione auto gratis, prezzo auto usata, valutazione auto IA, valutare la mia auto online, calcolare il valore dell\u2019auto',
  openGraph: {
    title: 'Quanto Vale la Mia Auto? Valutazione Gratuita con IA',
    description: 'Valuta la tua auto con l\u2019IA nella tua valuta locale. Carica una foto e ricevi subito una stima — completamente gratis.',
    url: 'https://www.naira.autos/strumenti/quanto-vale-la-mia-auto',
    siteName: 'Naira Autos',
    locale: 'it',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/strumenti/quanto-vale-la-mia-auto',
    languages: {
      en: 'https://www.naira.autos/evaluate-used-car',
      es: 'https://www.naira.autos/cuanto-vale-mi-auto',
      ar: 'https://www.naira.autos/kam-qeemat-sayarati',
      fr: 'https://www.naira.autos/outils/combien-vaut-ma-voiture',
      pt: 'https://www.naira.autos/ferramentas/quanto-vale-meu-carro',
      de: 'https://www.naira.autos/werkzeuge/was-ist-mein-auto-wert',
      ja: 'https://www.naira.autos/tsuru/kuruma-satei',
      tr: 'https://www.naira.autos/araclar/arabam-ne-kadar-eder',
      it: 'https://www.naira.autos/strumenti/quanto-vale-la-mia-auto',
      vi: 'https://www.naira.autos/cong-cu/xe-cua-toi-dang-gia-bao-nhieu',
      th: 'https://www.naira.autos/khrueang-mue/rot-khong-chan-rakha-thaorai',
      id: 'https://www.naira.autos/alat/berapa-harga-mobil-saya',
      nl: 'https://www.naira.autos/gereedschappen/wat-is-mijn-auto-waard',
      'x-default': 'https://www.naira.autos/evaluate-used-car',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Quanto Vale la Mia Auto? Valutazione Gratuita con IA',
  description: 'Strumento gratuito di valutazione auto con IA. Stima istantanea nella tua valuta locale, calibrata sul mercato del tuo paese.',
  url: 'https://www.naira.autos/strumenti/quanto-vale-la-mia-auto',
  inLanguage: 'it',
  dateModified: '2026-09-11',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'Valutazione Auto con IA — Naira Autos',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0' },
    description: 'Carica una foto della tua auto e ricevi subito una stima del prezzo di mercato con l\u2019IA, nella tua valuta.',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos/inizio' },
      { '@type': 'ListItem', position: 2, name: 'Strumenti', item: 'https://www.naira.autos/strumenti' },
      { '@type': 'ListItem', position: 3, name: 'Quanto Vale la Mia Auto', item: 'https://www.naira.autos/strumenti/quanto-vale-la-mia-auto' },
    ],
  },
  faqPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Quanto vale la mia auto usata?', acceptedAnswer: { '@type': 'Answer', text: 'Dipende da marca, modello, anno, allestimento, chilometraggio e stato generale, oltre ai prezzi di vendita attuali di auto simili nel tuo paese. Carica una foto qui sopra e scegli il tuo paese — l\u2019IA identifica la tua auto e ti fornisce una fascia di prezzo nella tua valuta locale, basata su annunci reali di quel mercato.' } },
      { '@type': 'Question', name: 'Quali fattori influenzano la valutazione di un\u2019auto usata?', acceptedAnswer: { '@type': 'Answer', text: 'I fattori principali sono: (1) marca e modello — alcuni mantengono meglio il valore a seconda del mercato. (2) Anno, allestimento e chilometraggio. (3) Stato della carrozzeria e della vernice. (4) Stato meccanico e cronologia di manutenzione. (5) Completezza dei documenti e dell\u2019immatricolazione. (6) Domanda e offerta locale — la stessa auto può valere diversamente a seconda del paese.' } },
      { '@type': 'Question', name: 'Il mio paese influisce sulla valutazione?', acceptedAnswer: { '@type': 'Answer', text: 'Sì, molto. Dazi doganali, domanda locale per determinate marche, forza della valuta e dimensione del mercato dell\u2019usato fanno variare notevolmente i prezzi tra i paesi. Il nostro strumento copre molti paesi e ti offre una stima nella valuta locale corretta, calibrata su quel mercato invece che su una media globale.' } },
      { '@type': 'Question', name: 'Quanto è precisa la valutazione con IA?', acceptedAnswer: { '@type': 'Answer', text: 'Il nostro strumento utilizza la visione artificiale per identificare con precisione marca, modello, anno e allestimento dalla tua foto, poi li confronta con dati reali di annunci nel paese scelto per darti una fascia di prezzo, non un numero unico. Consideralo un punto di partenza affidabile per negoziare, non un prezzo finale — il valore reale dipende sempre da un\u2019ispezione di persona e dalla trattativa.' } },
      { '@type': 'Question', name: 'Questo strumento di valutazione è davvero gratuito?', acceptedAnswer: { '@type': 'Answer', text: 'Sì. Nessun costo, nessun account da creare e nessun limite di utilizzo.' } },
    ],
  },
};

const VALUATION_FACTORS = [
  { icon: TrendingUp, title: 'Marca e valore di rivendita', body: 'La forza di rivendita varia a seconda del mercato — Toyota e Honda mantengono bene il loro valore nella maggior parte delle regioni, mentre le marche di lusso tedesche perdono valore più rapidamente nei mercati con costi di manutenzione elevati. La domanda locale conta quanto il marchio.' },
  { icon: Shield, title: 'Chilometraggio e cronologia di manutenzione', body: 'Un chilometraggio basso e una cronologia di manutenzione documentata sono i due indicatori più forti di un\u2019auto ben curata, ovunque nel mondo. Un tagliando in regola può valere più di un modello di un anno più recente.' },
  { icon: CheckCircle2, title: 'Documenti e proprietà', body: 'Documenti completi e in regola e un\u2019immatricolazione valida sono imprescindibili per ottenere il massimo valore in qualsiasi mercato. Documenti incompleti o problemi di importazione possono far scendere il prezzo del 15-25%.' },
  { icon: AlertCircle, title: 'Stato generale', body: 'Una carrozzeria pulita senza graffi, ruggine o vernice consumata, con un motore meccanicamente sano, aumenta costantemente il valore di mercato del 10-15% rispetto a un\u2019auto simile con segni di usura visibili.' },
];

const FAQ_ITEMS = [
  { q: 'Quanto vale la mia auto usata?', a: 'Dipende da marca, modello, anno, allestimento, chilometraggio e stato — oltre ai prezzi di vendita attuali di auto simili nel tuo paese. Carica una foto qui sopra e scegli il tuo paese per una stima con IA nella tua valuta locale.' },
  { q: 'Quali fattori influenzano la valutazione di un\u2019auto usata?', a: 'Marca e modello, anno e allestimento, chilometraggio, stato della carrozzeria e della meccanica, completezza dei documenti e dell\u2019immatricolazione, oltre a domanda e offerta locale nel tuo mercato specifico.' },
  { q: 'Il mio paese influisce sulla valutazione?', a: 'Sì — dazi doganali, domanda locale per determinate marche, forza della valuta e dimensione del mercato fanno variare i prezzi tra i paesi. Copriamo molti paesi e ti diamo il prezzo nella tua valuta locale, non una media globale.' },
  { q: 'Come fisso correttamente il prezzo della mia auto prima di venderla?', a: 'Usa il nostro strumento gratuito di valutazione con IA per avere un numero, poi controlla gli annunci attivi localmente per auto simili. Fissare un prezzo del 5-10% superiore al minimo che accetteresti di solito lascia margine per trattare.' },
  { q: 'Quanto è precisa la valutazione con IA?', a: 'Usa la visione artificiale per identificare con precisione la tua auto dalla foto, poi la confronta con dati reali di annunci nel paese scelto. Consideralo un punto di partenza affidabile, non un prezzo finale — il valore reale dipende da ispezione e trattativa.' },
  { q: 'Lo strumento di valutazione auto è gratuito?', a: 'Sì — nessun costo, nessun account, nessun limite di utilizzo.' },
];

export default function QuantoValeLaMiaAutoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-background">

        {/* ── Hero scuro ── */}
        <div className="bg-[#080C10] pt-16 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center gap-3 mb-6 text-left">
              <Link href="/strumenti" className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/15 hover:border-amber-400/40 text-white/60 hover:text-amber-400 transition-all flex-shrink-0" aria-label="Torna agli strumenti">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
              <nav aria-label="Percorso di navigazione" className="flex items-center gap-1.5 text-xs text-white/30">
                <Link href="/inizio" className="hover:text-white/60 transition-colors">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/strumenti" className="hover:text-white/60 transition-colors">Strumenti</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/50">Quanto Vale la Mia Auto</span>
              </nav>
            </div>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                Con IA · Gratis
              </span>
              <Link href="/evaluate-used-car" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)' }}>
              Quanto vale<br /><span className="text-amber-400">la tua auto?</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
              Carica una foto — ricevi subito una valutazione di mercato nella tua valuta locale, basata su dati reali di annunci e sull\u2019IA.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/30 text-xs font-medium">
              <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-amber-400" /> Analisi da foto</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span>Italia e molti altri paesi</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span className="text-amber-400 font-semibold">100% Gratis</span>
            </div>
          </div>
        </div>

        {/* ── Strumento di valutazione ── */}
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <QuantoValeLaMiaAutoClient />
          </div>
        </div>

        {/* ── Contenuto SEO ── */}
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16 space-y-14">

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Capire il valore</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              Cosa determina il prezzo di un\u2019auto usata?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUATION_FACTORS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm mb-1">{title}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-5">
            <h2 className="font-black uppercase text-foreground not-prose leading-none mb-4" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              Valutazione auto usate: la guida completa
            </h2>

            <p>Conoscere il vero valore di mercato della tua auto è il passo più importante prima di metterla in vendita, darla in permuta o negoziarne l\u2019acquisto — ovunque nel mondo. Un prezzo troppo alto lascia il tuo annuncio invenduto. Un prezzo troppo basso ti fa perdere soldi reali. La difficoltà è che <strong className="text-foreground">il &laquo;valore di mercato&raquo; non è un numero unico</strong> — varia in base al paese, alla valuta, alla domanda locale per una determinata marca e alla storia e allo stato individuale di ogni auto.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Perché la stessa auto non vale lo stesso in paesi diversi</h3>
            <p>Una Toyota Corolla di cinque anni in buone condizioni può valere un importo molto diverso in Italia rispetto ad altri paesi — ancor prima della conversione valutaria. I dazi doganali e le tasse locali sulle auto usate variano molto da paese a paese. Alcuni mercati hanno una forte domanda locale per determinate marche, il che mantiene alti i prezzi di rivendita. Altri mercati hanno un mercato dell\u2019usato più ampio che allontana gli acquirenti dall\u2019usato, riducendone il valore di rivendita. Ecco perché una guida ai prezzi unica e globale non funziona — la valutazione deve essere calibrata per paese.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Chilometraggio e cronologia di manutenzione</h3>
            <p>In quasi tutti i mercati, il chilometraggio e una cronologia di manutenzione documentata sono indicatori più affidabili dello stato di un\u2019auto rispetto a quanto può mostrare una foto. Un\u2019auto con chilometraggio più basso e tagliandi completi ottiene generalmente un premio di prezzo notevole rispetto a un\u2019auto simile dello stesso anno con chilometraggio più alto, anche se sembrano simili in foto. Una cronologia di manutenzione incompleta o mancante è uno dei modi più rapidi per perdere potere contrattuale come venditore.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Proprietà, immatricolazione e documenti</h3>
            <p>In ogni paese che copriamo, <strong className="text-foreground">documenti puliti e completi sono imprescindibili per ottenere il massimo valore</strong>. Gli acquirenti, giustamente, scontano il valore delle auto con documenti incompleti, dazi doganali non pagati o immatricolazione incompleta, perché il rischio di complicazioni durante il trasferimento di proprietà è reale in qualsiasi paese. Risolvere i problemi di documentazione prima di pubblicare l\u2019annuncio costa generalmente molto meno dello sconto che gli acquirenti altrimenti richiederebbero.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Stato generale e presentazione</h3>
            <p>Una carrozzeria pulita senza graffi, ruggine o vernice consumata, con motore e cambio meccanicamente sani, aumenta costantemente il prezzo rispetto a un\u2019auto simile con segni di usura visibili — che l\u2019auto venga venduta a Roma, Milano o altrove. Riparazioni semplici e poco costose (una pulizia approfondita, riparare piccoli graffi, sostituire una lampadina bruciata) spesso si ripagano più volte nel prezzo di vendita finale.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Valuta e tempistica di mercato</h3>
            <p>Nei paesi molto dipendenti dalle auto usate importate, i prezzi delle auto sono strettamente legati ai movimenti del tasso di cambio — una valuta locale debole aumenta il costo di importazione e spinge verso l\u2019alto i prezzi dell\u2019usato, mentre una valuta più forte ha l\u2019effetto opposto. Questo significa che una valutazione di uno o due anni fa potrebbe non essere una guida affidabile per i prezzi attuali. Controlla sempre i dati di mercato attuali invece di affidarti a una vecchia guida ai prezzi o a quanto ha pagato un proprietario precedente.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Come funziona questo strumento</h3>
            <p>Carica una foto nitida della tua auto e scegli il tuo paese. L\u2019IA (Gemini Vision) identifica marca, modello, anno e allestimento dalla foto, poi li confronta con dati reali e aggiornati di annunci nel mercato scelto per darti una fascia di prezzo nella tua valuta locale — non solo una singola stima. Il risultato include i fattori specifici che hanno influenzato la valutazione, così puoi capire perché si è arrivati a quel numero. Pensato come un punto di partenza rapido e gratuito per negoziare, non come sostituto di un\u2019ispezione di persona.</p>
          </section>

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Domande frequenti</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              Le domande più frequenti
            </h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map(({ q, a }) => (
                <details key={q} className="group border border-border rounded-xl overflow-hidden bg-card">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-foreground text-sm select-none list-none">
                    {q}
                    <span className="ml-4 flex-shrink-0 text-muted-foreground text-lg leading-none group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <p className="px-5 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Altri strumenti gratuiti
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/strumenti/meccanico-virtuale" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Meccanico Virtuale IA</p>
                <ArrowRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/strumenti" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Tutti gli strumenti</p>
                <ArrowRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/inizio" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Home in Italiano</p>
                <ArrowRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
