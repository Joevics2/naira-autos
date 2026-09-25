import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, CheckCircle2, Check } from 'lucide-react';
import AIMechanicClientIT from './client';

export const metadata: Metadata = {
  title: 'Meccanico Virtuale IA — Diagnosi Auto Gratis Online | Naira Autos',
  description: "Meccanico virtuale gratuito con intelligenza artificiale. Descrivi il guasto della tua auto, oppure carica una foto, il suono del motore o un video, e ricevi una diagnosi istantanea con stima del costo di riparazione. Senza registrazione, pensato per l'Italia.",
  alternates: {
    canonical: 'https://www.naira.autos/strumenti/meccanico-virtuale',
    languages: {
      'en': 'https://www.naira.autos/tools/ai-mechanic',
      'es': 'https://www.naira.autos/herramientas/mecanico-virtual',
      'ar': 'https://www.naira.autos/adawat/mikaniki-iftiradi',
      'fr': 'https://www.naira.autos/outils/mecanicien-virtuel',
      'pt': 'https://www.naira.autos/ferramentas/meu-mecanico-virtual',
      'de': 'https://www.naira.autos/werkzeuge/virtueller-mechaniker',
      'ja': 'https://www.naira.autos/tsuru/ai-shindan',
      'it': 'https://www.naira.autos/strumenti/meccanico-virtuale',
      'nl': 'https://www.naira.autos/gereedschappen/virtuele-monteur',
      'tr': 'https://www.naira.autos/araclar/sanal-usta',
      'vi': 'https://www.naira.autos/cong-cu/tho-may-ao',
      'id': 'https://www.naira.autos/alat/montir-virtual',
      'th': 'https://www.naira.autos/khrueang-mue/mo-rot-ai',
      'x-default': 'https://www.naira.autos/tools/ai-mechanic',
    },
  },
  openGraph: {
    title: 'Axion — Meccanico Virtuale Gratuito con IA | Naira Autos',
    description: "Diagnosi istantanea della tua auto online, ovunque tu sia. Carica il suono del motore, una foto, oppure descrivi il guasto. Ricevi il livello di urgenza, le cause probabili, cosa puoi fare da solo, e una stima del costo di riparazione. 100% gratuito, senza registrazione.",
    url: 'https://www.naira.autos/strumenti/meccanico-virtuale',
  },
  keywords: ['meccanico virtuale', 'diagnosi auto online', 'diagnosi auto IA', 'guasto auto', 'meccanico online gratis', 'costo riparazione auto', 'diagnosi auto gratuita', 'meccanico virtuale Italia'],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/strumenti/meccanico-virtuale',
      name: 'Meccanico Virtuale IA — Diagnosi Auto Gratis Online',
      description: 'Meccanico virtuale gratuito con intelligenza artificiale. Carica il suono del motore, una foto, oppure descrivi il guasto. Ricevi una diagnosi istantanea con livello di urgenza e stima del costo di riparazione.',
      url: 'https://www.naira.autos/strumenti/meccanico-virtuale',
      inLanguage: 'it',
      dateModified: '2026-09-10',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos/inizio' },
          { '@type': 'ListItem', position: 2, name: 'Strumenti', item: 'https://www.naira.autos/strumenti' },
          { '@type': 'ListItem', position: 3, name: 'Meccanico IA', item: 'https://www.naira.autos/strumenti/meccanico-virtuale' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Cos\'è il meccanico virtuale e come funziona?',
          acceptedAnswer: { '@type': 'Answer', text: "Il meccanico virtuale è uno strumento che usa l'intelligenza artificiale per diagnosticare i guasti della tua auto a distanza. Descrivi il problema, carichi facoltativamente una foto, il suono del motore o un video, e l'IA analizza tutto confrontandolo con un enorme database di guasti automobilistici noti, per darti una diagnosi con livello di urgenza e stima del costo di riparazione." },
        },
        {
          '@type': 'Question',
          name: 'Funziona in Italia?',
          acceptedAnswer: { '@type': 'Answer', text: "Sì. Lo strumento funziona da qualsiasi paese di lingua italiana e utilizza un italiano naturale, non una traduzione letterale. La stima del costo è un riferimento internazionale approssimativo in dollari, non un prezzo locale esatto — i costi reali variano in base alla regione e all'officina." },
        },
        {
          '@type': 'Question',
          name: "L'IA può diagnosticare la mia auto solo dal suono del motore?",
          acceptedAnswer: { '@type': 'Answer', text: "Sì. Registra il rumore metallico, il cigolio o lo sfregamento — bastano anche 10 secondi registrati con il telefono. L'IA analizza il pattern sonoro e può stabilire se il problema riguarda i cuscinetti, le pastiglie dei freni, o un altro guasto specifico." },
        },
        {
          '@type': 'Question',
          name: 'Questo servizio è gratuito?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sì, completamente gratuito — senza registrazione, senza abbonamento, senza alcun pagamento. Apri la pagina e inizia subito la tua diagnosi.' },
        },
        {
          '@type': 'Question',
          name: "La diagnosi dell'IA è sempre precisa?",
          acceptedAnswer: { '@type': 'Answer', text: "No — non sempre precisa al 100%. È un ottimo punto di partenza basato sulla descrizione, foto, audio o video forniti, ma potrebbe non cogliere cose che solo un'ispezione fisica sul ponte sollevatore con diagnostica potrebbe rilevare. Trattala come un primo parere, non una risposta definitiva, e consulta sempre un professionista qualificato di persona per problemi a freni, sterzo o impianto carburante." },
        },
        {
          '@type': 'Question',
          name: 'Funziona con Fiat, Volkswagen, BMW o altre marche?',
          acceptedAnswer: { '@type': 'Answer', text: "Sì. Chiedi di un guasto su Fiat, Volkswagen, BMW, Mercedes o qualsiasi altra marca — l'IA copre tutti i principali costruttori. La stima del costo resta un riferimento internazionale approssimativo in dollari, non un prezzo locale." },
        },
        {
          '@type': 'Question',
          name: 'Le mie conversazioni vengono salvate sui vostri server?',
          acceptedAnswer: { '@type': 'Answer', text: "No. L'intera cronologia della conversazione viene salvata solo sul tuo dispositivo, tramite l'archiviazione locale del browser. Non conserviamo nulla sui nostri server a parte il messaggio attivo che invii per la diagnosi. Puoi cancellare la cronologia in qualsiasi momento dal menu laterale." },
        },
        {
          '@type': 'Question',
          name: 'Devo creare un account o accedere?',
          acceptedAnswer: { '@type': 'Answer', text: "No. Il meccanico virtuale è completamente gratuito e non richiede account, accesso, né alcuna informazione personale. I dati del tuo veicolo vengono salvati localmente sul tuo dispositivo, solo per tua comodità." },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Axion — Meccanico Virtuale IA',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'Meccanico virtuale gratuito con intelligenza artificiale. Descrivi il guasto, carica il suono del motore o una foto, e ricevi una diagnosi istantanea con stima del costo di riparazione.',
      url: 'https://www.naira.autos/strumenti/meccanico-virtuale',
      inLanguage: 'it',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ],
};

export default function AIMechanicPageIT() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <AIMechanicClientIT />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <p className="text-xs text-muted-foreground">Ultimo aggiornamento: settembre 2026</p>

          {/* Coverage */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Copertura completa</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Cosa offre il meccanico virtuale?
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-10">
              Che tu voglia una stima rapida del costo di riparazione, fare una domanda a un meccanico online prima di andare in officina, o semplicemente sapere quanto costerà la riparazione — questo strumento copre tutto, gratuitamente.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Diagnosi dei guasti al motore', desc: 'Rumore metallico, mancate accensioni, minimo irregolare, surriscaldamento, spia motore accesa — l\'IA identifica le cause più probabili, ordinate per probabilità.' },
                { title: 'Analisi del suono', desc: "Carica una registrazione del rumore metallico, cigolio o sfregamento. L'IA analizza il pattern sonoro per identificare il guasto." },
                { title: 'Livello di urgenza immediato', desc: 'Ogni diagnosi include un giudizio chiaro in quattro livelli: sicuro da guidare, da tenere sotto controllo, vai presto dal meccanico, o smetti subito di guidare.' },
                { title: 'Stima del costo di riparazione', desc: "La stima è un riferimento internazionale approssimativo in dollari — il costo reale di pezzi e manodopera varia in base al paese e alla città. Usala come punto di partenza e poi chiedi un preventivo locale." },
                { title: 'Cosa puoi fare da solo', desc: 'Quando il guasto è qualcosa che puoi controllare o riparare da solo, ti diciamo esattamente come — prima di pagare un meccanico.' },
                { title: 'Conversazione con follow-up', desc: 'Fai domande di follow-up e ricevi risposte basate sul contesto completo. Ogni sessione viene salvata sul tuo dispositivo.' },
                { title: 'Supporto per tutte le marche', desc: 'Fiat, Volkswagen, Toyota, Mercedes, BMW, Renault, Peugeot, Ford, e qualsiasi altra marca o mercato.' },
                { title: 'Diagnosi tramite foto e video', desc: 'Invia una foto di una spia accesa sul cruscotto, una perdita insolita, o un danno visibile. Ogni contenuto multimediale aggiuntivo migliora notevolmente la precisione della diagnosi.' },
                { title: 'Identificazione dei pezzi necessari', desc: "Ogni diagnosi include i pezzi specifici più probabilmente responsabili, per sapere esattamente cosa chiedere in officina o in un negozio di ricambi." },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-card border border-border rounded-2xl p-5 hover:border-emerald-500/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-sm">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 max-w-screen-lg space-y-10 text-sm text-muted-foreground leading-relaxed">

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Cos'è il meccanico virtuale con IA?
              </h2>
              <p className="mb-3"><strong className="text-foreground">Il meccanico virtuale</strong> è esattamente ciò che il nome suggerisce: un meccanico con cui parli tramite testo, foto, audio o video invece di andare di persona in officina. Descrivi cosa sta succedendo alla tua auto — quel rumore strano all'avviamento a freddo, la spia motore che non si spegne, i freni che sembrano molli — e in pochi secondi ricevi una risposta basata su una conoscenza approfondita dei guasti automobilistici reali.</p>
              <p>Axion, <strong className="text-foreground">il nostro meccanico con IA</strong>, funziona con qualsiasi marca e in qualsiasi paese, ma è stato scritto in un italiano naturale e reale — non una traduzione dall'inglese.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Come ottenere una diagnosi per la tua auto in meno di un minuto
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">1. Descrivi il guasto.</strong> Scrivi cosa sta succedendo — più dettagli fornisci, meglio è. Quando è iniziato il problema? Si verifica solo a freddo, in accelerazione, o girando il volante?</p>
                <p><strong className="text-foreground">2. Carica una foto, un audio o un video (facoltativo, ma molto utile).</strong> Una registrazione di dieci secondi del rumore del motore è spesso più utile di un intero paragrafo di descrizione.</p>
                <p><strong className="text-foreground">3. Ricevi subito la tua diagnosi.</strong> Livello di urgenza, cause probabili ordinate per probabilità, cosa puoi controllare da solo, e una stima del costo di riparazione.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Stima del costo di riparazione: evita di pagare troppo in officina
              </h2>
              <p className="mb-3">Uno dei modi più comuni in cui i clienti vengono raggirati in officina è andarci senza sapere in anticipo quanto dovrebbe costare la riparazione. Prima di andare in officina, usa la nostra <strong className="text-foreground">stima del costo di riparazione</strong> per sapere qual è un prezzo giusto — pezzi e manodopera, chiaramente indicati.</p>
              <p>La stima tiene conto della tua auto specifica — marca, modello e anno — e del guasto più probabile in base alla tua descrizione. Non è un numero generico: una Panda del 2010 con 180.000 km che mostra un calo della pressione dell'olio riceve una stima diversa rispetto a una Panda del 2020 con 40.000 km e la stessa spia accesa, perché la causa probabile è diversa.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Funziona con qualsiasi marca: Fiat, Volkswagen, BMW, Mercedes e altre
              </h2>
              <p className="mb-3">Non importa cosa guidi. L'IA conosce i pattern di guasto specifici di ogni costruttore — Fiat, Volkswagen, Toyota, Mercedes, BMW, Renault, Peugeot, Ford, e praticamente ogni altra marca in circolazione oggi. Indica marca, modello e anno una sola volta, e la diagnosi si adatta ai guasti noti di quella specifica auto, a quel chilometraggio, invece di darti una risposta generica valida per qualsiasi auto.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Perché la diagnosi tramite suono del motore cambia tutto
              </h2>
              <p className="mb-3">Un meccanico esperto spesso riesce a capire il guasto di un'auto solo dal suono, prima ancora di aprire il cofano. La nostra IA fa lo stesso: carica una registrazione del suono — rumore metallico, cigolio, sfregamento — e il sistema analizza il pattern sonoro confrontandolo con migliaia di guasti noti. Una registrazione di dieci secondi dal telefono è spesso sufficiente per distinguere un problema serio da qualcosa che può aspettare.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Esempio: solo testo contro testo con audio
              </h2>
              <p>La Honda Civic di Marco ha iniziato a fare un leggero rumore metallico all'avviamento a freddo. Descrivendo solo con il testo ("rumore metallico all'avviamento al mattino"), l'IA ha restituito un elenco ampio — livello dell'olio basso, rumore dei bilancieri, o scudo termico allentato — con circa il 60% di sicurezza. Ha quindi registrato 12 secondi di audio con il telefono e li ha caricati. Con l'audio, la diagnosi si è affinata: rumore dei bilancieri idraulici dovuto a un cambio olio in ritardo, con oltre l'85% di sicurezza, un intervallo di costo specifico, e la conferma che era sicuro continuare a guidare per un breve periodo in attesa di prenotare il cambio olio.</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-4">Precisione della diagnosi in base al tipo di input</h3>
              <div className="space-y-3">
                {[
                  { label: 'Solo descrizione testuale', pct: 60, color: 'bg-orange-500' },
                  { label: '+ Foto allegata', pct: 75, color: 'bg-amber-500' },
                  { label: '+ Registrazione audio', pct: 85, color: 'bg-emerald-500' },
                  { label: '+ Video', pct: 90, color: 'bg-emerald-600' },
                ].map(({ label, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{label}</span>
                      <span className="font-bold text-foreground">~{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${color}`} style={{ width: pct + '%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Veicoli supportati</h3>
              <div className="flex flex-wrap gap-1.5">
                {['Fiat', 'Volkswagen', 'Toyota', 'Mercedes', 'BMW', 'Renault', 'Peugeot', 'Ford', 'Audi', 'Alfa Romeo', 'Lancia', 'Camion', 'Autobus', 'Moto'].map(v => (
                  <span key={v} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">{v}</span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-3">Punti chiave</h3>
              <ul className="space-y-2.5">
                {[
                  '100% gratuito — senza abbonamento',
                  'Nessun account né registrazione richiesti',
                  'Funziona su cellulare e computer',
                  'Stima del costo di riferimento internazionale',
                  'Disponibile 24 ore su 24, anche la domenica',
                  'Cronologia della conversazione salvata localmente',
                  'Domande di follow-up illimitate',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                    <Check className="h-3 w-3 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Anche su Naira Autos</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Valutazione gratuita auto', href: '/evaluate-car' },
                  { label: 'Analizzatore suono motore', href: '/tools/engine-sound-analyzer' },
                  { label: 'Calcolatore dazi doganali', href: '/tools/import-duty-calculator' },
                  { label: 'Checklist documenti veicolo', href: '/tools/vehicle-papers-checklist' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="flex items-center justify-between text-xs text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group">
                      <span>{label}</span>
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </section>

          {/* Comparison */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Confronto</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Meccanico virtuale contro le altre opzioni
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground text-sm">Funzionalità</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">Meccanico IA</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Visita in officina</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Forum/gruppo auto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Disponibile 24 ore su 24', 'Sì', 'No', 'A volte'],
                    ['Gratuito', 'Sì', 'No', 'Sì'],
                    ['Nessuno spostamento necessario', 'Sì', 'No', 'Sì'],
                    ['Stima del costo', 'Sì', 'Variabile', 'No'],
                    ['Analisi audio e video', 'Sì', 'Sì', 'No'],
                    ['Risposta immediata', 'Sì', 'No', 'A volte'],
                    ['Qualità costante', 'Sì', 'Variabile', 'No'],
                    ['Cronologia salvata', 'Sì', 'No', 'No'],
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
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Domande frequenti</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Domande frequenti
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: "Cos'è il meccanico virtuale e come funziona?", a: "Uno strumento che usa l'IA per diagnosticare i guasti della tua auto a distanza. Descrivi il problema, carichi contenuti multimediali facoltativi, e l'IA analizza tutto confrontandolo con un enorme database di guasti noti — con una stima del costo di riferimento internazionale." },
                { q: 'Funziona in Italia?', a: "Sì. Lo strumento usa un italiano naturale, non una traduzione letterale. La stima del costo resta un riferimento internazionale approssimativo, non un prezzo locale esatto." },
                { q: "La diagnosi dell'IA è sempre precisa?", a: "No — non sempre precisa al 100%. Un buon punto di partenza, ma potrebbe non cogliere qualcosa che un'ispezione fisica sul ponte sollevatore rileverebbe. Trattala come un primo parere, e consulta sempre un meccanico di persona per freni, sterzo o carburante." },
                { q: 'Funziona con Fiat, Volkswagen, BMW o altre marche?', a: "Sì. Chiedi di qualsiasi marca — l'IA copre tutti i principali costruttori. La stima del costo è un riferimento internazionale approssimativo in dollari, non un prezzo locale." },
                { q: 'Può diagnosticare la mia auto solo dal suono del motore?', a: "Sì. Il suono è uno dei nostri input più potenti. Carica una registrazione di rumore metallico, cigolio o sfregamento — bastano 10 secondi dal telefono. L'IA analizza il pattern sonoro per identificare il guasto probabile." },
                { q: 'Devo creare un account o accedere?', a: 'No. Il meccanico virtuale è completamente gratuito e non richiede account, registrazione, né informazioni personali. I dati del veicolo vengono salvati localmente sul tuo dispositivo.' },
                { q: 'Le mie conversazioni vengono salvate sui vostri server?', a: "No. L'intera cronologia viene salvata solo localmente sul tuo dispositivo tramite l'archiviazione del browser. Non conserviamo nulla sui nostri server a parte il messaggio attivo." },
                { q: 'Quanto è precisa la stima del costo di riparazione?', a: "Serve come riferimento internazionale approssimativo, tenendo conto delle differenze di prezzo tra paesi per pezzi e manodopera. Diamo un intervallo (dal minimo al massimo) per sapere cosa è ragionevole. Se un'officina propone un prezzo ben oltre il massimo, vale la pena verificare." },
                { q: 'Posso ottenere una stima del costo per qualsiasi marca di auto?', a: "Sì. Copriamo Fiat, Volkswagen, Toyota, Mercedes, BMW, Renault, Peugeot, Ford, e qualsiasi altra grande marca, ovunque tu guidi. Le stime restano un riferimento internazionale approssimativo." },
                { q: 'Cosa fare se ho bisogno di un meccanico mobile o di un\'officina vicino a me?', a: "Il nostro strumento diagnostica prima il problema, così sai esattamente cosa chiedere prima di iniziare la ricerca. Se il guasto richiede un'ispezione fisica o attrezzatura specializzata, te lo diciamo chiaramente — e spieghiamo che tipo di meccanico o officina cercare." },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none gap-3">
                    <span className="font-semibold text-foreground text-sm leading-relaxed">{q}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Verificato da <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>, meccanico automobilistico. La logica di diagnosi e gli intervalli di costo di riparazione sono stati verificati per la loro accuratezza tecnica.
          </p>

          {/* Final CTA */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Pronto? Diagnostica la tua auto adesso.
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Gratuito. Istantaneo. Senza registrazione. Ricevi subito la tua diagnosi.
            </p>
            <a href="#axion-chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
              Inizia la mia diagnosi gratuita
            </a>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Altri strumenti gratuiti
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/strumenti/verifica-numero-di-telaio', label: 'Verifica numero di telaio (VIN)', color: 'blue' },
                { href: '/tools/vehicle-papers-checklist', label: 'Checklist documenti veicolo',      color: 'violet' },
                { href: '/tools/import-duty-calculator',   label: 'Calcolatore dazi doganali',         color: 'emerald' },
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
