import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VINCheckerClientIt from '@/components/VINCheckerClientIt';

export const metadata: Metadata = {
  title: 'Verifica Numero di Telaio (VIN) Gratis — Decodifica VIN Online',
  description: 'Verifica gratis il numero di telaio (VIN) di qualsiasi auto. Marca, modello, anno, motore e Paese di origine in pochi secondi — senza registrazione. Per Italia, Svizzera e San Marino.',
  keywords: ['verifica numero di telaio gratis', 'controllo vin gratuito', 'decodifica vin', 'numero telaio auto', 'verifica vin gratis', 'controllo telaio auto importata', 'numero di telaio dove si trova', 'decodificatore vin online', 'controllo vin senza registrazione', 'vin vs numero motore'],
  alternates: {
    canonical: 'https://www.naira.autos/strumenti/verifica-numero-di-telaio',
    languages: {
      en: 'https://www.naira.autos/tools/vin-checker-global',
      es: 'https://www.naira.autos/herramientas/decodificador-de-vin',
      fr: 'https://www.naira.autos/outils/decodeur-vin',
      ar: 'https://www.naira.autos/adawat/fahs-raqm-alhaykal',
      pt: 'https://www.naira.autos/ferramentas/decodificador-de-chassi',
      de: 'https://www.naira.autos/werkzeuge/fahrgestellnummer-pruefen',
      ja: 'https://www.naira.autos/tsuru/vin-code-shirabe',
      it: 'https://www.naira.autos/strumenti/verifica-numero-di-telaio',
      'x-default': 'https://www.naira.autos/tools/vin-checker-global',
    },
  },
  openGraph: {
    title: 'Verifica Numero di Telaio (VIN) Gratis | Naira Autos',
    description: 'Marca, modello, anno, motore e origine di qualsiasi auto dal numero di telaio, gratis e all\'istante.',
    url: 'https://www.naira.autos/strumenti/verifica-numero-di-telaio',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/strumenti/verifica-numero-di-telaio',
      name: 'Verifica Numero di Telaio (VIN) Gratis — Decodifica VIN Online',
      description: 'Verifica gratis il numero di telaio (VIN) di qualsiasi auto — marca, modello, anno, motore e Paese di origine.',
      url: 'https://www.naira.autos/strumenti/verifica-numero-di-telaio',
      inLanguage: 'it',
      dateModified: '2026-09-14',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos/inizio' },
        { '@type': 'ListItem', position: 2, name: 'Strumenti', item: 'https://www.naira.autos/strumenti' },
        { '@type': 'ListItem', position: 3, name: 'Verifica Numero di Telaio', item: 'https://www.naira.autos/strumenti/verifica-numero-di-telaio' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: "Cos'è il numero di telaio (VIN) di un'auto?", acceptedAnswer: { '@type': 'Answer', text: 'Il numero di telaio, o VIN (Vehicle Identification Number), è un codice univoco di 17 caratteri assegnato a ogni veicolo al momento della produzione. Codifica il Paese di origine, il costruttore, il tipo di veicolo, il motore, l\'anno modello, lo stabilimento di montaggio e un numero di serie univoco. In Italia si trova alla voce E del libretto di circolazione.' } },
        { '@type': 'Question', name: 'Come faccio una verifica gratuita del numero di telaio?', acceptedAnswer: { '@type': 'Answer', text: 'Inserisci il numero di telaio di 17 caratteri qui sopra e clicca su "Decodifica". Il nostro decodificatore gratuito utilizza il database pubblico NHTSA (l\'autorità statunitense per la sicurezza stradale) per mostrare marca, modello, anno, specifiche del motore, tipo di cambio e stabilimento di produzione — completamente gratis, senza registrazione, da qualsiasi Paese.' } },
        { '@type': 'Question', name: 'Dove si trova il numero di telaio sull\'auto?', acceptedAnswer: { '@type': 'Answer', text: 'Il numero di telaio compare in tre punti: sul cruscotto (visibile attraverso il parabrezza lato guida), su un\'etichetta nel montante della portiera lato guida, e punzonato sul telaio nel vano motore. È inoltre riportato alla voce E del libretto di circolazione. Tutti i punti devono corrispondere esattamente.' } },
        { '@type': 'Question', name: 'Numero di telaio e VIN sono la stessa cosa?', acceptedAnswer: { '@type': 'Answer', text: 'Sì, sono esattamente lo stesso codice di 17 caratteri. VIN (Vehicle Identification Number) è il termine internazionale; in Italia si usa più comunemente "numero di telaio" nel linguaggio quotidiano, anche se sui documenti ufficiali si trova spesso indicato semplicemente come VIN.' } },
        { '@type': 'Question', name: "Questo strumento funziona per le auto importate dagli USA in Italia o Svizzera?", acceptedAnswer: { '@type': 'Answer', text: "Sì — è proprio il caso d'uso più comune. I veicoli originariamente costruiti per il mercato statunitense, canadese o messicano vengono decodificati normalmente, il che copre buona parte dei pickup e delle auto d'epoca americane importate. I veicoli costruiti esclusivamente per il mercato europeo di solito non compaiono nel database NHTSA; in quei casi conviene fare riferimento al libretto di circolazione e, per la storia del veicolo, al Portale dell'Automobilista di ACI o al PRA." } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Verifica Numero di Telaio (VIN) Gratis', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function VerificaNumeroDiTelaioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/strumenti" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="Indietro">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/inizio" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/strumenti" className="hover:text-white/60 transition-colors">Strumenti</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Verifica Numero di Telaio</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">100% Gratis</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Dati NHTSA</span>
              <Link href="/tools/vin-checker-global" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(30px, 5vw, 58px)' }}>
              Verifica Numero di Telaio<br /><span className="text-blue-400">Gratis e Immediata</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Scopri i dati di qualsiasi auto dal numero di telaio, in pochi secondi.</p>
            <p className="text-white/75 text-sm leading-relaxed">Inserisci il numero di telaio a 17 caratteri dal cruscotto, dalla portiera o dal telaio stesso. Ottieni marca, modello, anno, specifiche del motore e Paese di origine — gratis, senza registrazione. Utile se stai comprando un'auto importata in Italia, Svizzera o San Marino.</p>
          </div>
        </div>
      </div>

      <VINCheckerClientIt />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Verifica Gratuita del Numero di Telaio per Qualsiasi Auto Usata</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Il nostro <strong className="text-foreground">decodificatore VIN gratuito</strong> utilizza il database pubblico NHTSA, l'autorità statunitense per la sicurezza stradale. Una <strong className="text-foreground">verifica gratuita del numero di telaio</strong> restituisce marca, modello, anno, specifiche del motore, tipo di cambio, categoria di carrozzeria e stabilimento di montaggio — tutto ciò che serve per confermare cosa sia realmente un'auto usata prima di acquistarla.</p>
                  <p>Il mercato dell'usato è sempre più internazionale. Veicoli costruiti per Stati Uniti, Canada o Messico vengono esportati e reimmatricolati di continuo — che si tratti di importazioni verso l'Italia, di auto d'epoca acquistate in Svizzera, o di pickup e SUV che arrivano a San Marino. Poiché il numero di telaio viene punzonato in fabbrica e non cambia mai, una semplice verifica gratuita funziona allo stesso modo indipendentemente dal Paese in cui finisce l'auto, purché sia stata costruita originariamente per il mercato nordamericano.</p>
                  <p>Questo è il punto fondamentale da capire: il numero di telaio non è una targa assegnata dal tuo Paese — è un'impronta di fabbricazione applicata sulla linea di montaggio, molto prima che l'auto lasci lo stabilimento. Non cambia quando il veicolo viene esportato, reimmatricolato, riceve nuove targhe o passa di proprietario più volte. Per questo una verifica gratuita del numero di telaio può seguire un'auto oltre i confini in un modo che una targa non potrà mai fare.</p>
                  <p>La maggior parte delle persone verifica il numero di telaio solo dopo aver già trattato il prezzo — ma la cosa giusta da fare è farlo prima ancora di andare a vedere l'auto, prima di versare una caparra, e di nuovo dopo l'acquisto per confermare che non sia stato cambiato nulla alla consegna. Non costa nulla e richiede meno di un minuto.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Verifica del Numero di Telaio per Paese</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Italia</strong> — il numero di telaio si trova alla voce E del libretto di circolazione e deve corrispondere esattamente a quello punzonato sul veicolo. Poiché una parte consistente delle auto importate dagli Stati Uniti — soprattutto pickup e auto d'epoca — è stata costruita originariamente per il Nord America, questa verifica gratuita dà risultati affidabili ancora prima di rivolgerti al PRA o al Portale dell'Automobilista di ACI.</p>
                  <p><strong className="text-foreground">Svizzera (incluso il Ticino)</strong> — il documento di riferimento è la licenza di circolazione, e la Svizzera è tradizionalmente un mercato importante per le auto importate dagli USA. Questo strumento è particolarmente utile prima dell'omologazione presso l'Ufficio della circolazione, soprattutto per veicoli fuoristrada e pickup americani.</p>
                  <p><strong className="text-foreground">San Marino</strong> — il parco auto è strettamente legato al mercato italiano, e le stesse considerazioni sulle importazioni dagli Stati Uniti si applicano. Una verifica gratuita del numero di telaio prima di versare una caparra a un venditore è uno dei controlli più economici e utili che si possano fare.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Compri un'Auto Importata? Fai Prima Questo</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Comprare un'auto importata comporta un rischio in più che un acquisto locale non ha: documenti, venditore e stato reale del veicolo possono provenire da un Paese che non hai mai visitato. La verifica gratuita del numero di telaio non sostituisce un'ispezione, ma è il primo filtro più economico che esista, e non costa nulla usarlo prima di procedere oltre.</p>
                  <p>Inizia decodificando il numero di telaio e confronta il risultato — anno, modello, motore, allestimento — con esattamente ciò che il venditore ha dichiarato. Qualsiasi discrepanza qui, anche piccola come un motore sbagliato, è spesso il primo segnale che le foto dell'annuncio e i documenti reali non appartengono alla stessa auto. Dopodiché, verifica fisicamente che il numero sul cruscotto corrisponda a quello punzonato sul telaio e a quello sull'etichetta della portiera; una discrepanza tra questi tre punti è uno dei segnali più chiari di un numero di telaio manomesso.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Numero di Telaio vs VIN vs Numero di Motore — È la Stessa Cosa?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Numero di telaio e VIN sì, sono esattamente lo stesso codice di 17 caratteri punzonato in fabbrica. Il <strong className="text-foreground">numero di motore</strong> è invece diverso: è punzonato sul blocco motore stesso e identifica solo quel motore, non l'intero veicolo. Se un'auto ha avuto un cambio motore regolare (documentato), il numero di motore può differire da quello originale, mentre il numero di telaio resta sempre lo stesso per tutta la vita del veicolo.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Come Leggere un Numero di Telaio: Cosa Significa Ogni Sezione</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>I 17 caratteri non sono casuali. Le posizioni 1-3 identificano il costruttore e il Paese di montaggio — così il decodificatore sa se un'auto è stata costruita negli Stati Uniti, in Canada, in Messico o altrove. Le posizioni 4-8 descrivono il veicolo: carrozzeria, motore e serie. La posizione 9 è una cifra di controllo calcolata matematicamente, usata per individuare un numero di telaio trascritto male o manomesso. La posizione 10 codifica l'anno modello, e le posizioni 12-17 formano il numero di produzione univoco del veicolo.</p>
                  <p>Saper leggere queste sezioni da soli resta utile anche con un decodificatore a disposizione, perché permette di verificare il risultato in pochi secondi. Se la posizione 10 indica un modello 2015 mentre il venditore lo ha proposto come 2018, vale la pena chiedere direttamente — non è un'accusa, è una verifica che non costa nulla e richiede trenta secondi.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Funziona per Tutte le Marche — Ford, Toyota, Honda, Chevrolet e Altre</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Non è uno strumento dedicato a una singola marca. Poiché legge direttamente dal database dei costruttori NHTSA, lo stesso decodificatore funziona per Ford, Toyota, Honda, Chevrolet, GMC, Nissan, Jeep, Hyundai e qualsiasi altra marca venduta sul mercato nordamericano. Basta incollare il codice di 17 caratteri — il decodificatore identifica automaticamente lo schema corretto del costruttore, senza bisogno di specificare la marca.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Verifica del Numero di Telaio vs Report Completo sulla Storia del Veicolo</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Una <strong className="text-foreground">verifica gratuita del numero di telaio</strong> indica com'era l'auto all'uscita dalla fabbrica — le specifiche di produzione. Per sapere cosa è successo da allora — incidenti, chilometraggio manomesso, stato di rottamazione o allagamento — serve un <strong className="text-foreground">report sulla storia del veicolo</strong> a pagamento, come Carfax o carVertical. Per qualsiasi acquisto di un'auto usata di valore importante, un report a pagamento è vivamente consigliato in aggiunta a questa verifica gratuita delle specifiche.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Verifica Numero di Telaio — Domande Frequenti</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: 'Questa verifica del numero di telaio è davvero gratuita?', a: 'Sì. 100% gratuita, tramite l\'API pubblica NHTSA. Non serve account né accesso. Puoi fare tutte le verifiche che vuoi, da qualsiasi Paese.' },
                { q: "A cosa serve il numero di telaio di un'auto?", a: "Il numero di telaio identifica in modo univoco un veicolo per verificarne le specifiche, controllarne la storia, immatricolarlo, assicurarlo e verificare eventuali richiami. In Italia è riportato alla voce E del libretto di circolazione ed è richiesto per ogni passaggio di proprietà." },
                { q: 'Posso consultare le specifiche dal numero di telaio gratis?', a: 'Sì. Il nostro decodificatore gratuito restituisce marca, modello, anno, motore, tipo di carrozzeria, cambio e origine direttamente dal database dei costruttori NHTSA, senza costi, per veicoli con specifiche statunitensi, canadesi o messicane.' },
                { q: 'Funziona per le auto importate dagli USA in Italia o Svizzera?', a: "Sì, per qualsiasi veicolo costruito originariamente per il mercato nordamericano — un caso comune tra chi importa pickup e auto d'epoca. I veicoli con specifiche esclusivamente europee potrebbero non comparire." },
                { q: 'Come faccio a sapere se un numero di telaio è autentico?', a: 'Un numero di telaio valido ha esattamente 17 caratteri — lettere (A-Z, senza I, O, Q) e numeri. La posizione 9 è una cifra di controllo matematica. Se non corrisponde, il numero è stato manomesso. Questo strumento lo verifica automaticamente.' },
                { q: 'Cosa succede se la verifica non restituisce risultati?', a: "Di solito significa che il veicolo è di origine europea, asiatica o di specifiche esclusive di un altro mercato — fuori dal database NHTSA. L'anno modello viene comunque decodificato dalla posizione 10 del numero di telaio. In questi casi, contatta il servizio VIN ufficiale del costruttore." },
                { q: 'Il numero di motore è la stessa cosa del numero di telaio?', a: 'No. Il numero di motore è punzonato sul blocco motore stesso e identifica solo quel motore, mentre il numero di telaio identifica l\'intero veicolo. Questo strumento decodifica il numero di telaio, non il numero di motore separato.' },
                { q: 'Il numero di telaio influisce sui dazi doganali?', a: "Indirettamente sì. Molti Paesi calcolano i dazi d'importazione in base all'età e alla cilindrata del veicolo, entrambe confermate dal numero di telaio. Decodificarlo correttamente prima di calcolare i dazi evita di pianificare con cifre sbagliate." },
                { q: "Questa verifica mi dice se l'auto ha avuto un incidente?", a: "No. La verifica gratuita mostra solo le specifiche di produzione — marca, modello, anno, motore e origine. Storia degli incidenti, chilometraggio e stato di rottamazione richiedono un report a pagamento come Carfax o carVertical." },
                { q: 'Posso sapere se un\'auto è rubata dal numero di telaio?', a: "Non con questo strumento. La verifica dei veicoli rubati è di competenza delle forze dell'ordine e delle assicurazioni — il NICB (l'ente antifrode assicurativo statunitense) offre uno strumento gratuito chiamato VINCheck proprio a questo scopo, distinto da un decodificatore di specifiche." },
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

          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Altri Strumenti Gratuiti
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/strumenti/meccanico-virtuale" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Meccanico Virtuale IA</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/werkzeuge/fahrgestellnummer-pruefen" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all">
                <p className="text-sm font-bold text-sky-700 dark:text-sky-400">Fahrgestellnummer (Deutsch)</p>
                <ChevronRight className="h-4 w-4 text-sky-500" />
              </Link>
              <Link href="/outils/decodeur-vin" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Décodeur VIN (Français)</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
              <Link href="/tools/vin-checker-global" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">VIN Checker (English)</p>
                <ChevronRight className="h-4 w-4 text-blue-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
