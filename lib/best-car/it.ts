// lib/best-car/it.ts — Italian strings for "Migliore Auto Per Te" (/strumenti/migliore-auto-per-te)
import type { BestCarStrings } from '@/lib/best-car/types';

export const it: BestCarStrings = {
  lang: 'it',
  locale: 'it-IT',
  localeByCountry: { it: 'it-IT', ch: 'it-CH' },
  dir: 'ltr',
  latin: true,
  symbolAfter: true,

  path: '/strumenti/migliore-auto-per-te',
  homePath: '/inizio',
  hubPath: '/strumenti',
  aboutPath: '/about',
  comparePath: '/tools/car-comparison',
  fuelPath: '/tools/fuel-cost-calculator-global',
  valuationPath: '/strumenti/quanto-vale-la-mia-auto',

  defaultCountry: 'it',
  priorityCountries: ['it', 'ch', 'de', 'fr', 'es', 'gb', 'us'],
  picksCountry: 'it',

  nav: { home: 'Home', tools: 'Strumenti', current: 'Migliore Auto Per Te', back: 'Torna agli Strumenti', breadcrumb: 'Percorso di navigazione' },

  meta: {
    title: 'Migliore Auto Per Te 2026 — Consigliere Auto per Uso, {countries} Paesi',
    description:
      'Trova la migliore auto per le tue esigenze, con prezzi nella tua valuta in {countries} paesi. Scegli come la userai — auto di famiglia, uso professionale, autostrada, budget ridotto, fuoristrada, rappresentanza, prima auto o risparmio di carburante — e ottieni una top 5 tra {globalCars} modelli, valutati per costi di manutenzione, ricambi e consumi.',
    keywords: [
      'migliore auto da comprare 2026', 'migliore auto per famiglia', 'migliore auto per uso professionale', 'consigliere auto',
      'quale auto comprare', 'miglior suv 2026', 'auto con manutenzione economica', 'migliore prima auto',
      'migliore auto per autostrada', 'migliore auto di rappresentanza', 'auto più economica nei consumi', 'consigli acquisto auto',
      'migliore auto economica', 'migliore fuoristrada', 'migliore auto italia', 'migliore auto svizzera',
      'auto più affidabile', 'quale auto scegliere', 'naira autos',
    ],
    ogTitle: 'Migliore Auto Per Te 2026 — Consigliere Auto | Naira Autos',
    ogDescription: 'Consigliere auto globale con prezzi locali in {countries} paesi. Scegli come userai l’auto e ottieni la top 5 ordinata per manutenzione, consumi e disponibilità dei ricambi.',
    ogLocale: 'it_IT',
  },

  hero: {
    badge: 'Strumento Gratuito',
    verified: 'Prezzi verificati',
    h1: 'Migliore Auto Per Te',
    intro:
      'Scegli il tuo paese e l’uso che ne farai e ottieni consigli ordinati con prezzi nella tua valuta in {countries} paesi — valutati per costi di manutenzione, disponibilità dei ricambi, consumi e altezza da terra. {globalCars} modelli, dalla Toyota Corolla alla Bugatti Chiron.',
  },

  ui: {
    countryLabel: 'Paese e Valuta',
    popularCountries: 'Mercati principali',
    otherCountries: 'Tutti gli altri paesi',
    africaNote: 'Include {usedCars} modelli usati d’importazione tipici di questa regione, oltre ai {globalCars} modelli globali.',
    prompt: 'Per cosa ti serve l’auto?',
    rankedBy: 'Ordinato per:',
    topRecs: 'Top {n} consigli — {country}',
    emptyState: 'Seleziona un uso qui sopra per vedere i consigli',
    match: 'Affinità',
    electric: 'Elettrica',
    electricMotor: 'Motore elettrico',
    seatsFmt: '{n} posti',
    bootFmt: 'Bagagliaio {n} L',
    consumptionUnit: 'L/100 km',
    showDetails: 'Vedi dettagli — problemi e avvertenze',
    hideDetails: 'Nascondi dettagli',
    commonIssues: 'Problemi comuni:',
    estIn: 'stima in {country}',
    copyLink: 'Copia link',
    linkCopied: 'Link copiato',
  },

  enums: {
    maintenance: { Low: 'Bassa', Medium: 'Media', High: 'Alta', 'Very High': 'Molto alta' },
    spareParts: { Easy: 'Facile', Moderate: 'Media', Hard: 'Difficile' },
    bodyType: {
      Sedan: 'Berlina', Convertible: 'Cabrio', Coupe: 'Coupé', SUV: 'SUV', Pickup: 'Pick-up',
      Hatchback: 'Hatchback', Wagon: 'Station wagon', Minivan: 'Monovolume', Bus: 'Autobus',
    },
    fuelType: { Petrol: 'Benzina', Hybrid: 'Ibrida', 'Petrol Hybrid': 'Benzina ibrida', Electric: 'Elettrica', Diesel: 'Diesel' },
    transmission: {
      Automatic: 'Automatico', Manual: 'Manuale', CVT: 'CVT', eCVT: 'eCVT', DCT: 'DCT', PDK: 'PDK', DSG: 'DSG',
      'Single-speed': 'Monomarcia', '8-speed DCT': 'DCT a 8 rapporti', '2-speed (rear)': '2 rapporti (posteriore)',
      'Single/2-speed': 'Monomarcia/2 rapporti', 'Single / dual-motor': 'Mono / doppio motore',
      'Single-speed (simulated gears)': 'Monomarcia (marce simulate)',
    },
  },

  useCases: {
    family:        { label: 'Auto di Famiglia', icon: '👨‍👩‍👧‍👦', description: 'Spazio, sicurezza e affidabilità per tutta la famiglia', priorities: 'Posti · Bagagliaio · Affidabilità · Prezzo', pickTitle: 'Migliore Auto di Famiglia' },
    commercial:    { label: 'Uso Professionale / NCC', icon: '🚖', description: 'Pensata per l’uso quotidiano intensivo e molti chilometri', priorities: 'Durata · Ricambi economici · Consumi', pickTitle: 'Migliore per Uso Professionale' },
    highway:       { label: 'Autostrada e Lunghi Viaggi', icon: '🛣️', description: 'Comoda e stabile nei viaggi lunghi', priorities: 'Consumi · Potenza · Affidabilità', pickTitle: 'Migliore per l’Autostrada' },
    budget:        { label: 'Budget Ridotto', icon: '💰', description: 'Il miglior rapporto qualità-prezzo quando i soldi sono contati', priorities: 'Prezzo basso · Manutenzione ridotta', pickTitle: 'Miglior Acquisto Economico' },
    offroad:       { label: 'Fuoristrada / Strade Dissestate', icon: '🪨', description: 'Altezza da terra elevata per terreni difficili e strade rovinate', priorities: 'Altezza da terra · Durata · Ricambi', pickTitle: 'Migliore Fuoristrada' },
    executive:     { label: 'Rappresentanza / Business', icon: '💼', description: 'Presenza, comfort e immagine per i professionisti', priorities: 'Prestigio · Motore · Costi di gestione', pickTitle: 'Migliore Auto di Rappresentanza' },
    firstcar:      { label: 'Prima Auto', icon: '🎓', description: 'Facile da guidare, perdona gli errori ed economica da mantenere', priorities: 'Poca manutenzione · Ricambi facili · Affidabilità', pickTitle: 'Migliore Prima Auto' },
    fuelefficient: { label: 'Risparmio di Carburante / Energia', icon: '⛽', description: 'Il costo di gestione più basso per chilometro', priorities: 'Consumo di carburante o energia · Manutenzione · Ricambi', pickTitle: 'Più Economica nei Consumi' },
  },

  seo: {
    reviewedByLabel: 'Revisione a cura di:',
    reviewer: 'Redazione di Naira Autos',
    updatedLabel: 'Contenuto aggiornato:',
    picksHeading: 'Le Migliori Auto per Uso — 2026',
    picksNote:
      'Queste liste sono generate con lo stesso punteggio usato dallo strumento, per un mercato di riferimento. L’ordine esatto e i prezzi si adattano al paese scelto qui sopra, e per i paesi africani si aggiungono modelli usati d’importazione.',
    faqHeading: 'Domande Frequenti',
    moreToolsHeading: 'Altri strumenti gratuiti',
    disclaimer:
      'I prezzi sono stime per {countries} mercati, non preventivi. Le valutazioni di manutenzione e ricambi sono giudizi editoriali e possono variare da un mercato all’altro. Ispeziona sempre l’auto, verifica la sua storia e chiedi un preventivo locale prima di acquistare.',
    sections: [
      {
        h2: 'Come funziona il consigliere auto',
        paragraphs: [
          '«Migliore Auto Per Te» ordina {totalCars} veicoli in base a come userai davvero l’auto. Scegli un paese e un uso — famiglia, professionale o NCC, autostrada, budget ridotto, fuoristrada, rappresentanza, prima auto o risparmio di carburante — e lo strumento valuta ogni modello venduto o importato di frequente in quel mercato e mostra i cinque migliori. Ogni punteggio va da 0 a 100 e combina solo fattori misurabili: costo di manutenzione, disponibilità dei ricambi, consumo di carburante o energia, altezza da terra, numero di posti, capacità del bagagliaio, cilindrata e prezzo d’acquisto.',
          'I pesi cambiano in base all’uso. Per un taxi o un’auto da consegne, manutenzione e ricambi valgono il 70% del punteggio. Per chi cerca un fuoristrada, la sola altezza da terra vale metà. Per una prima auto, affidabilità e ricambi facili contano molto più della potenza.',
          'La classifica è la stessa in ogni paese, di proposito. Il punteggio usa il prezzo base in dollari di ogni auto, quindi passare da Milano a Lugano cambia il prezzo che vedi, non l’ordine della lista. Così il consiglio riguarda l’auto in sé, mentre la stima sotto ogni risultato si adatta alla tua valuta e alle tasse e ai dazi tipici del tuo mercato. Lo strumento copre {countries} paesi: {globalCars} modelli sono confrontati ovunque e nei mercati africani si aggiungono {usedCars} modelli usati d’importazione.',
        ],
      },
      {
        h2: 'Parti dall’uso quotidiano, non dalla scheda tecnica',
        paragraphs: [
          'La migliore auto per te dipende meno dalle specifiche e più dal tuo **uso quotidiano reale**. Un’auto ottima sulla carta può essere una cattiva scelta se l’officina che la conosce è lontana o se la poca altezza da terra trasforma il tragitto casa-lavoro in una corsa a ostacoli.',
          'Per **uso professionale e NCC** contano affidabilità con molti chilometri e basso costo dei ricambi per chilometro. Toyota Corolla e Toyota Camry sono una presenza fissa nelle flotte di taxi e consegne in molti paesi perché i loro motori sono semplici, tollerano un tagliando saltato e quasi qualsiasi meccanico sa ripararli.',
          'Per **l’uso di rappresentanza** l’immagine del marchio conta davvero, ma non dovrebbe prevalere sui costi di gestione. La Mercedes-Benz Classe S qui ha una manutenzione «Molto alta»: sospensioni pneumatiche ed elettronica complessa possono trasformare una sola riparazione in un conto a quattro cifre. Molti professionisti stanno meglio con una berlina di fascia media ben tenuta che con un’auto di lusso ad alto chilometraggio e costi di riparazione crescenti.',
          'Per **chi compra la prima auto** la cosa più importante è che il meccanico conosca il modello. Un’auto i cui guasti richiedono diagnosi specialistiche costa di più e ci vuole più tempo a ripararla. I modelli Toyota e Honda con motori sotto i 2,5 litri hanno il più vasto ecosistema di ricambi, officine e consigli online, ovunque tu compri.',
          'Per **le famiglie** contano posti e bagagliaio, ma anche il prezzo di un SUV a tre file che forse non ti serve. Per questo il punteggio famiglia premia anche un prezzo d’acquisto più basso: un crossover a cinque posti spesso serve una famiglia di quattro persone bene quanto un veicolo molto più grande, a una frazione del costo.',
          'Per **strade dissestate e fuoristrada** guarda prima l’altezza da terra, poi la trazione. Circa 250 mm rendono gestibili buche, strade allagate e sterrati, mentre una berlina da 140 mm può andare bene in città con una guida attenta, ma dossi e allagamenti restano un problema ricorrente.',
        ],
      },
      {
        h2: 'Il costo totale di possesso conta più del prezzo di listino',
        paragraphs: [
          'Un’auto più economica non è sempre la scelta più conveniente. In cinque anni carburante, tagliandi, assicurazione, pneumatici e riparazioni possono eguagliare il prezzo d’acquisto, soprattutto nei mercati in cui i ricambi importati arrivano lentamente. Due auto dal prezzo simile possono differire di migliaia di euro nel costo di possesso solo perché una condivide i pezzi con milioni di altri veicoli e l’altra richiede un componente disponibile solo in concessionaria.',
          'Usa le etichette di manutenzione e ricambi di ogni risultato come scorciatoia per questo costo nascosto, poi passa la tua rosa ristretta nel [Calcolatore del Costo del Carburante](/tools/fuel-cost-calculator-global) per trasformare i consumi in una stima mensile in base ai tuoi chilometri. Conta anche il valore di rivendita: in molti mercati i modelli giapponesi e coreani più diffusi mantengono il valore meglio dei marchi di nicchia o costosi da mantenere, il che riduce il costo reale del possesso.',
        ],
      },
      {
        h2: 'Italia e dintorni: che cosa cambia a livello locale',
        paragraphs: [
          'In Italia alla scelta del modello si aggiungono regole che altrove pesano poco. Il bollo auto dipende da potenza e classe ambientale, la prima revisione è prevista dopo quattro anni dall’immatricolazione e poi ogni due, e l’assicurazione RC auto varia molto tra province e profili di guida, con costi spesso alti per i neopatentati. Molte città hanno zone a traffico limitato (ZTL) e limitazioni per i veicoli più inquinanti, quindi chi vive in centro dovrebbe controllare le regole del proprio comune prima di scegliere un diesel datato o un’auto di grandi dimensioni. I pedaggi autostradali e le strade strette dei centri storici favoriscono auto compatte, sobrie nei consumi e facili da parcheggiare.',
          'In Svizzera, dove si parla italiano in Ticino e nei Grigioni meridionali, i prezzi di auto e officine sono più alti e i prezzi in franchi rendono meno immediato il confronto con l’Italia; un’auto usata importata dai paesi vicini può essere interessante, se si considerano dazi e omologazione. Nei mercati dove pesano di più le tasse sul carburante, l’ibrido e l’elettrico diventano più convenienti con chilometraggi alti, a patto di avere una ricarica affidabile.',
          'Fuori dall’Europa il quadro cambia: in molti paesi africani gran parte delle auto in circolazione sono usate d’importazione, spesso di dieci o venti anni. Scegliendo uno di quei paesi lo strumento aggiunge {usedCars} modelli più vecchi con problemi tipici e consigli di ispezione per chi compra usato. I paesi del Golfo combinano tasse basse e carburante economico, il che cambia il valore dei grandi SUV e dei motori V6 rispetto ai mercati ad alta tassazione. Ecco perché esiste il selettore del paese: la stessa auto può essere un acquisto sensato in un mercato e un lusso costoso in un altro.',
        ],
      },
      {
        h2: 'Come leggere le valutazioni di manutenzione e ricambi',
        paragraphs: [
          'Il **costo di manutenzione** indica la spesa abituale per mantenere in strada un modello rispetto agli altri: Bassa, Media, Alta o Molto alta. La **disponibilità dei ricambi** indica quanto è facile trovare i pezzi: Facile, Media o Difficile. Entrambe sono valutazioni editoriali basate sulla reputazione del modello, sui prezzi di assistenza abituali e sulle reti di ricambi. Non sono un preventivo di alcuna officina e possono variare da un mercato all’altro.',
          'Considera «Bassa» e «Facile» un buon segnale. Considera «Alta» o «Difficile» un invito a chiedere ai meccanici locali prima di impegnarti. Ogni risultato riporta anche i problemi comuni e un’avvertenza specifica per quel modello: leggili prima di andare a vedere l’auto.',
        ],
      },
      {
        h2: 'Come si stimano i prezzi per paese e quali sono i limiti',
        paragraphs: [
          'Ogni auto ha un prezzo base in dollari, una cifra approssimativa per l’allestimento d’ingresso 2025–2026. Per mostrare un prezzo locale lo strumento moltiplica quel valore per un moltiplicatore di mercato specifico del paese — una stima indicativa di dazi, accise, IVA e ricarico tipico del concessionario — e per un tasso di cambio. Poiché cambi e regole fiscali variano, considera il risultato un punto di partenza per il budget, non un preventivo.',
          'Alcuni modelli non si vendono nuovi in certi paesi, e allestimenti, optional e condizioni di un usato possono allontanare molto il prezzo reale da queste stime. Conferma con annunci locali o con un concessionario prima di fissare il budget definitivo.',
        ],
      },
      {
        h2: 'Dalla rosa ristretta alla decisione',
        paragraphs: [
          'Scegli il tuo uso, apri **Vedi dettagli** su ciascuno dei primi risultati e annota i problemi comuni. Confronta i tuoi due preferiti fianco a fianco con il [Confronto Auto](/tools/car-comparison). Prima di pagare un’auto usata, controlla la sua storia con la [Verifica del Numero di Telaio](/strumenti/verifica-numero-di-telaio) e fai fare un’ispezione meccanica indipendente. Una volta che hai l’auto, [Quanto vale la mia auto?](/strumenti/quanto-vale-la-mia-auto) ti aiuta a seguirne il valore. Con **Copia link** puoi condividere con il partner o con il meccanico esattamente il paese e l’uso che hai scelto.',
        ],
      },
    ],
    exampleTitle: 'Esempio: abbinare l’auto all’uso reale',
    exampleBody:
      'Scenario illustrativo, non un caso reale di cliente. Immagina il titolare di una piccola attività di consegne in una grande città, attratto da un SUV a sette posti per il suo spazio di carico. Nella classifica per uso professionale, però, Toyota Corolla e Toyota RAV4 ottengono punteggi più alti dei veicoli più grandi, perché i suoi percorsi reali sono brevi, con molte fermate e carichi moderati, dove costo dei ricambi per chilometro e consumi pesano più del volume di carico. I punteggi non dicono che il SUV sia un cattivo veicolo: dicono che si adatta peggio a quel modo d’uso. Il denaro risparmiato su acquisto e carburante può restare nell’attività come capitale circolante.',
  },

  related: { compare: 'Confronto Auto', fuel: 'Calcolatore Costo Carburante', valuation: 'Quanto vale la mia auto?' },

  faqs: [
    { q: 'Questo strumento mostra prezzi reali per il mio paese?', a: 'Mostra una stima, non un preventivo in tempo reale. Ogni auto ha un prezzo base in dollari; scegliendo il paese si applicano il moltiplicatore tipico di dazi e tasse di quel mercato e un tasso di cambio per stimare il prezzo locale. Conferma con un concessionario o un annuncio locale prima di fare un budget preciso.' },
    { q: 'Come vengono valutate le auto?', a: 'Ogni auto riceve un punteggio da 0 a 100 per uso, basato su fattori misurabili — costo di manutenzione, disponibilità dei ricambi, consumi, altezza da terra, posti, bagagliaio, cilindrata e prezzo d’acquisto — con pesi diversi per ogni uso. La classifica non cambia con il paese; cambia solo il prezzo mostrato.' },
    { q: 'Qual è la migliore auto di famiglia da comprare?', a: 'Nella nostra classifica {picks:family} sono in testa per l’uso familiare, bilanciando posti, bagagliaio, affidabilità e prezzo. Le famiglie numerose dovrebbero controllare il numero di posti nei dettagli di ogni risultato.' },
    { q: 'Qual è la migliore auto per uso professionale o NCC?', a: 'Per l’uso professionale intensivo i primi tre sono {picks:commercial}. Uniscono bassa manutenzione, ricambi facili e consumi ragionevoli, che è ciò che mantiene basso il costo per chilometro.' },
    { q: 'Qual è la migliore auto per strade dissestate o sterrate?', a: 'Altezza da terra e robustezza guidano questa classifica. I primi tre attuali sono {picks:offroad}. Solo per la città una berlina va bene con guida attenta, ma allagamenti e dossi mettono alla prova le auto basse.' },
    { q: 'Qual è la migliore prima auto?', a: 'Le migliori scelte per una prima auto sono {picks:firstcar}: poca manutenzione, ricambi facili e meccanici che le conoscono ovunque. Evita i marchi esotici e di ultra-lusso come prima auto: i ricambi costano molto e servono meccanici specializzati.' },
    { q: 'Quali auto consumano meno carburante o energia?', a: 'In testa ci sono ibride ed elettriche: {picks:fuelefficient}. Un’elettrica ha senso solo se puoi ricaricare in modo affidabile dove vivi e guidi, quindi verifica la copertura delle colonnine prima di decidere.' },
    { q: 'Perché i paesi africani mostrano modelli usati più vecchi?', a: 'In molti mercati africani l’usato d’importazione è il modo più comune di comprare un’auto. Scegliendo un paese africano lo strumento aggiunge {usedCars} modelli più vecchi con problemi tipici dell’usato e consigli di ispezione, oltre ai {globalCars} modelli globali.' },
  ],

  schema: {
    appName: 'Migliore Auto Per Te — consigliere auto per uso',
    appDescription: 'Consigliere auto gratuito: scegli paese e uso e ottieni una top 5 tra {totalCars} auto, con prezzi locali stimati in {countries} paesi.',
    publisher: 'Naira Autos',
    author: 'Redazione di Naira Autos',
  },
};
