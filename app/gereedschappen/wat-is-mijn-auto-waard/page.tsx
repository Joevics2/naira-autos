import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { WatIsMijnAutoWaardClient } from './client';

export const metadata: Metadata = {
  title: 'Wat Is Mijn Auto Waard? Gratis AI-Taxatie | Naira Autos',
  description: 'Taxeer uw auto gratis met AI, in uw eigen valuta. Upload één foto, ontvang direct een prijs — Nederland en wereldwijd.',
  keywords: 'wat is mijn auto waard, gratis autotaxatie, prijs tweedehands auto, autotaxatie met ai, auto waarde berekenen',
  openGraph: {
    title: 'Wat Is Mijn Auto Waard? Gratis AI-Taxatie',
    description: 'Taxeer uw auto met AI, in uw eigen valuta. Upload één foto, ontvang direct een prijsindicatie — volledig gratis.',
    url: 'https://www.naira.autos/gereedschappen/wat-is-mijn-auto-waard',
    siteName: 'Naira Autos',
    locale: 'nl_NL',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/gereedschappen/wat-is-mijn-auto-waard',
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
  name: 'Wat Is Mijn Auto Waard? Gratis AI-Taxatie',
  description: 'Gratis AI-tool voor autotaxatie. Ontvang direct een schatting in uw valuta, afgestemd op de markt in uw land.',
  url: 'https://www.naira.autos/gereedschappen/wat-is-mijn-auto-waard',
  inLanguage: 'nl',
  dateModified: '2026-09-20',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'AI-Autotaxatie — Naira Autos',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0' },
    description: 'Upload een foto van uw auto en ontvang direct een schatting van de marktwaarde met AI, in uw eigen valuta.',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startpagina', item: 'https://www.naira.autos/startpagina' },
      { '@type': 'ListItem', position: 2, name: 'Gereedschappen', item: 'https://www.naira.autos/gereedschappen' },
      { '@type': 'ListItem', position: 3, name: 'Wat Is Mijn Auto Waard', item: 'https://www.naira.autos/gereedschappen/wat-is-mijn-auto-waard' },
    ],
  },
  faqPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Wat is mijn tweedehands auto waard?', acceptedAnswer: { '@type': 'Answer', text: 'Dit hangt af van merk, model, bouwjaar, uitvoering, kilometerstand en algemene staat, evenals de huidige verkoopprijzen van vergelijkbare auto\u2019s in uw land. Upload hierboven een foto en selecteer uw land — de AI herkent uw auto en geeft een prijsklasse in uw valuta, gebaseerd op echte advertenties in die markt.' } },
      { '@type': 'Question', name: 'Welke factoren beïnvloeden de taxatie van een tweedehands auto?', acceptedAnswer: { '@type': 'Answer', text: 'De belangrijkste factoren zijn: (1) Merk en model — sommige auto\u2019s behouden hun waarde beter, afhankelijk van de markt. (2) Bouwjaar, uitvoering en kilometerstand. (3) Staat van carrosserie en lak. (4) Mechanische staat en onderhoudsgeschiedenis. (5) Volledige documentatie en registratie. (6) Lokale vraag en aanbod — dezelfde auto kan in verschillende landen een andere waarde hebben.' } },
      { '@type': 'Question', name: 'Heeft mijn land invloed op de taxatie?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, aanzienlijk. Invoerrechten, lokale vraag naar bepaalde merken, de kracht van de valuta en de omvang van de tweedehandsmarkt zorgen voor grote prijsverschillen tussen landen. Onze tool ondersteunt meerdere landen en geeft een schatting in de lokale valuta, afgestemd op die markt in plaats van een wereldwijd gemiddelde.' } },
      { '@type': 'Question', name: 'Hoe nauwkeurig is een AI-taxatie?', acceptedAnswer: { '@type': 'Answer', text: 'Onze tool gebruikt computer vision-technologie om merk, model, bouwjaar en uitvoering nauwkeurig te herkennen op basis van uw foto, en vergelijkt dit vervolgens met echte advertentiegegevens in het door u gekozen land om een prijsklasse te geven in plaats van één enkel getal. Beschouw dit als een betrouwbaar startpunt voor onderhandeling, geen exacte prijs — de werkelijke waarde hangt altijd af van persoonlijke inspectie en onderhandeling.' } },
      { '@type': 'Question', name: 'Is deze taxatietool echt gratis?', acceptedAnswer: { '@type': 'Answer', text: 'Ja. Geen kosten, geen account nodig, en geen limiet op het aantal keren dat u de tool gebruikt.' } },
    ],
  },
};

const VALUATION_FACTORS = [
  { icon: TrendingUp, title: 'Merk en Restwaarde', body: 'Het behoud van restwaarde verschilt per markt — Toyota en Honda behouden hun waarde vaak goed in veel regio\u2019s, terwijl Duitse luxemerken sneller in waarde kunnen dalen in markten met hoge onderhoudskosten. Lokale vraag is net zo belangrijk als de merknaam.' },
  { icon: Shield, title: 'Kilometerstand en Onderhoudsgeschiedenis', body: 'Een lage kilometerstand en een vastgelegde onderhoudsgeschiedenis zijn de twee meest betrouwbare indicatoren van een goed onderhouden auto, waar ook ter wereld. Consistente onderhoudsdocumentatie kan meer waard zijn dan een auto die een jaar jonger is.' },
  { icon: CheckCircle2, title: 'Documentatie en Eigendom', body: 'Volledige, geldige documentatie en een actuele registratie zijn essentieel om de beste prijs te krijgen op elke markt. Onvolledige documenten of importproblemen kunnen de prijs met 15% tot 25% verlagen.' },
  { icon: AlertCircle, title: 'Algemene Staat', body: 'Een schone carrosserie zonder krassen, roest of verbleekte lak, samen met een mechanisch goed functionerende motor, levert consequent 10% tot 15% meer op dan een vergelijkbare auto met duidelijke gebruikssporen.' },
];

const FAQ_ITEMS = [
  { q: 'Wat is mijn tweedehands auto waard?', a: 'Hangt af van merk, model, bouwjaar, uitvoering, kilometerstand en staat — evenals de huidige verkoopprijzen van vergelijkbare auto\u2019s in uw land. Upload een foto en selecteer uw land voor een AI-schatting in uw valuta.' },
  { q: 'Welke factoren beïnvloeden de taxatie van een tweedehands auto?', a: 'Merk en model, bouwjaar en uitvoering, kilometerstand, staat van carrosserie en motor, volledige documentatie, en vraag en aanbod op uw markt.' },
  { q: 'Heeft mijn land invloed op de taxatie?', a: 'Ja — invoerrechten, lokale vraag naar bepaalde merken, de kracht van de valuta en de marktomvang zorgen voor prijsverschillen tussen landen. Wij ondersteunen meerdere landen en geven prijzen in uw lokale valuta.' },
  { q: 'Hoe bepaal ik de juiste vraagprijs voordat ik verkoop?', a: 'Gebruik onze gratis AI-taxatietool voor een referentiegetal, en controleer vervolgens actieve advertenties van vergelijkbare auto\u2019s in uw regio. Een vraagprijs van 5-10% boven het laagste bedrag dat u accepteert laat meestal ruimte voor onderhandeling.' },
  { q: 'Hoe nauwkeurig is een AI-taxatie?', a: 'Gebruikt computer vision om uw auto nauwkeurig te herkennen op basis van een foto, en vergelijkt dit met echte advertentiegegevens in het door u gekozen land. Beschouw dit als een betrouwbaar startpunt, geen exacte prijs — de werkelijke waarde hangt af van inspectie en onderhandeling.' },
  { q: 'Is deze autotaxatietool gratis?', a: 'Ja — geen kosten, geen account nodig, geen gebruikslimiet.' },
];

export default function WatIsMijnAutoWaardPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-background">

        {/* ── Dark hero ── */}
        <div className="bg-[#080C10] pt-16 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center gap-3 mb-6 text-left">
              <Link href="/gereedschappen" className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/15 hover:border-amber-400/40 text-white/60 hover:text-amber-400 transition-all flex-shrink-0" aria-label="Terug">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
              <nav aria-label="Broodkruimelpad" className="flex items-center gap-1.5 text-xs text-white/30">
                <Link href="/startpagina" className="hover:text-white/60 transition-colors">Startpagina</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/gereedschappen" className="hover:text-white/60 transition-colors">Gereedschappen</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/50">Wat Is Mijn Auto Waard</span>
              </nav>
            </div>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                Met AI · Gratis
              </span>
              <Link href="/evaluate-used-car" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)' }}>
              Wat is uw auto<br /><span className="text-amber-400">écht waard?</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
              Upload één foto — ontvang direct een schatting van de marktwaarde in uw valuta, gebaseerd op echte advertentiegegevens en AI.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/30 text-xs font-medium">
              <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-amber-400" /> Analyse op basis van foto</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span>Nederland en wereldwijd</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span className="text-amber-400 font-semibold">100% Gratis</span>
            </div>
          </div>
        </div>

        {/* ── Taxatietool ── */}
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <WatIsMijnAutoWaardClient />
          </div>
        </div>

        {/* ── SEO-content ── */}
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16 space-y-14">

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">De waarde van uw auto begrijpen</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              Wat bepaalt de prijs van een tweedehands auto?
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
              Autotaxatie: de volledige gids
            </h2>

            <p>Het kennen van de werkelijke marktwaarde van uw auto is de belangrijkste stap voordat u een advertentie plaatst, gaat inruilen of onderhandelt over een aankoop, waar u ook ter wereld bent. Een te hoge vraagprijs zorgt ervoor dat uw advertentie wordt genegeerd en blijft liggen. Een te lage vraagprijs betekent dat u echt geld laat liggen. Het probleem is dat <strong className="text-foreground">&ldquo;marktwaarde&rdquo; geen vast getal is</strong> — het verandert per land, valuta, lokale vraag naar een specifiek merk, en de unieke geschiedenis en staat van elke auto.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Waarom Dezelfde Auto Niet Overal Dezelfde Waarde Heeft</h3>
            <p>Een vijf jaar oude Toyota Corolla in goede staat kan in verschillende landen een behoorlijk andere waarde hebben, zelfs vóór valutaomrekening. Invoerrechten en lokale belastingen op tweedehands auto&rsquo;s verschillen sterk per land. Sommige markten hebben een sterke lokale vraag naar bepaalde merken, waardoor de restwaarde hoog blijft. In andere markten zorgt een groter aanbod van nieuwe auto&rsquo;s ervoor dat kopers minder geïnteresseerd zijn in tweedehands auto&rsquo;s, wat de restwaarde verlaagt. Daarom werkt één wereldwijde prijsgids niet — taxaties moeten per land worden afgestemd.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Kilometerstand en Onderhoudsgeschiedenis</h3>
            <p>Op vrijwel elke markt zijn kilometerstand en vastgelegde onderhoudsgeschiedenis veel betrouwbaardere indicatoren van de staat van een auto dan een foto kan tonen. Een auto met een lagere kilometerstand en volledige onderhoudsdocumentatie heeft doorgaans een duidelijk prijsvoordeel ten opzichte van een vergelijkbare auto met een hogere kilometerstand, zelfs als ze er op foto&rsquo;s hetzelfde uitzien. Een ontbrekende of onvolledige onderhoudsgeschiedenis is een van de snelste manieren waarop een verkoper onderhandelingskracht verliest.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Eigendom, Registratie en Documentatie</h3>
            <p>In elk land dat wij ondersteunen, is <strong className="text-foreground">volledige en geldige documentatie essentieel om de beste waarde te krijgen</strong>. Kopers bieden terecht minder voor auto&rsquo;s met onvolledige documenten, onbetaalde invoerrechten of een onvolledige registratie, omdat het risico op eigendomsoverdrachtsproblemen in elk land reëel is. Het oplossen van documentatieproblemen vóór het plaatsen van een advertentie is meestal veel goedkoper dan de korting die een koper anders zal eisen.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Algemene Staat en Presentatie</h3>
            <p>Een schone carrosserie zonder krassen, roest of verbleekte lak, met een motor en transmissie die mechanisch goed functioneren, levert consequent een hogere prijs op, of de auto nu in Amsterdam, Rotterdam of elders wordt verkocht, vergeleken met een vergelijkbare auto met duidelijke gebruikssporen. Kleine, goedkope reparaties — een grondige schoonmaakbeurt, het verhelpen van kleine krasjes, het vervangen van een kapot lampje — leveren bij de uiteindelijke verkoopprijs vaak een veelvoud van hun kosten op.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Valuta en Markttiming</h3>
            <p>In landen die sterk afhankelijk zijn van geïmporteerde tweedehands auto&rsquo;s, is de autoprijs nauw verbonden met wisselkoersschommelingen — een zwakkere lokale valuta verhoogt de importkosten en drijft de prijzen van tweedehands auto&rsquo;s omhoog, terwijl een sterkere valuta het tegenovergestelde effect heeft. Dit betekent dat een taxatie van een of twee jaar geleden misschien niet meer betrouwbaar is voor de huidige prijs. Controleer altijd de meest recente marktgegevens, in plaats van te vertrouwen op oude prijsgidsen of het bedrag dat een vorige eigenaar heeft betaald.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Hoe Deze Tool Werkt</h3>
            <p>Upload een scherpe foto van uw auto en selecteer uw land. De AI (Gemini Vision) herkent merk, model, bouwjaar en uitvoering op basis van de foto, en vergelijkt dit vervolgens met recente, echte advertentiegegevens in de door u gekozen markt om een prijsklasse te geven in uw valuta, in plaats van één enkel getal. Het resultaat bevat specifieke factoren die de taxatie beïnvloeden, zodat u begrijpt waarom dat getal wordt gegeven. Deze tool is bedoeld als een snel, gratis startpunt voor onderhandeling, geen vervanging voor persoonlijke inspectie.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Veelgemaakte Fouten die de Waarde van uw Auto Verlagen</h3>
            <p>Veel verkopers benadelen zichzelf onbewust door hun prijs slechts te vergelijken met één of twee oude advertenties, zonder naar de actuele marktomstandigheden te kijken. Een andere veelgemaakte fout is het niet vermelden van de onderhoudsgeschiedenis in de advertentie — simpelweg &ldquo;goed onderhouden&rdquo; schrijven zonder bewijs wekt twijfel bij kopers, die dan vaak lager bieden. Onscherpe foto&rsquo;s of foto&rsquo;s met slecht licht maken het voor kopers ook moeilijker om de werkelijke staat te beoordelen, waardoor ze vermoeden dat er iets wordt verborgen. Een vraagprijs die te dicht bij de minimale schatting ligt, laat bovendien geen ruimte voor de onderhandeling die kopers redelijkerwijs verwachten, waardoor de verkoop al vanaf het begin stroef kan verlopen.</p>
          </section>

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Veelgestelde vragen</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              De meest gestelde vragen
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
              Andere gratis tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/gereedschappen" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Alle gereedschappen</p>
                <ArrowRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/startpagina" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Nederlandse Startpagina</p>
                <ArrowRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
