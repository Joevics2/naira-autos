import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import BelgiumImportCalculator from '@/components/BelgiumImportCalculator';
import { alternatesFor } from '@/lib/hreflang';

const PATH = "/gereedschappen/auto-importeren-calculator-belgie";
const URL = 'https://www.naira.autos' + PATH;
const C = {
  "lang": "nl",
  "locale": "nl_BE",
  "ld": "nl-BE",
  "hubName": "Gereedschappen",
  "hubPath": "/gereedschappen",
  "homeName": "Startpagina",
  "homePath": "/startpagina",
  "path": "/gereedschappen/auto-importeren-calculator-belgie",
  "jobTitle": "Oprichter",
  "title": "Auto importeren naar België 2026 — Calculator voor invoerrecht, btw en BIV",
  "desc": "Gratis calculator voor het importeren van een auto naar België: 10 % invoerrecht, 21 % btw, BIV voor Vlaanderen, Wallonië en Brussel met leeftijdsvermindering, Japan en de VS tegen 0 %, Chinese elektrische auto’s. Tarieven 2026-2027.",
  "ogTitle": "Auto importeren naar België: calculator | Naira Autos",
  "ogDesc": "Bereken invoerrecht, btw en BIV voor een geïmporteerde auto in België.",
  "keywords": "auto importeren kosten België, BIV berekenen 2026 invoer, belasting op inverkeerstelling tweedehands, invoerrecht auto buiten EU, btw auto importeren 21 procent, auto importeren uit Duitsland BIV, auto importeren uit Amerika 2026, Waalse TMC 2025 formule, BIV Vlaanderen elektrisch 2026",
  "crumbBack": "Terug",
  "crumbNav": "Kruimelpad",
  "crumbLabel": "🇧🇪 Auto importeren",
  "badge1": "100% gratis",
  "badge2": "BIV-tarieven 2026-2027",
  "badge3": "Gecontroleerd: november 2026",
  "h1a": "Auto importeren",
  "h1b": "naar België",
  "sub": "Wat kost een geïmporteerde auto echt, BIV inbegrepen?",
  "lead": "Kies de herkomst, je gewest en de gegevens van de auto en zie invoerrecht, btw en de regionale belasting op inverkeerstelling met leeftijdsvermindering.",
  "warnStrong": "Slechts een schatting.",
  "warn": "De BIV is een gewestelijke belasting met drie verschillende formules die elk jaar op 1 juli worden geïndexeerd. Veel websites tonen nog verouderde regels. Controleer het bedrag bij de belastingdienst van je gewest voordat je koopt.",
  "introH": "Invoerrecht, btw en BIV: zo bouwt de prijs zich op",
  "intro": "Een auto importeren naar België kent drie kostenlagen. De eerste is douane: geen invoerrecht binnen de Europese Unie en 10 % over de douanewaarde voor een auto uit een derde land, tenzij een handelsakkoord met oorsprongsbewijs het op nul zet. De tweede is de btw van 21 %, berekend over de douanewaarde plus het invoerrecht. De derde is typisch Belgisch: de belasting op inverkeerstelling, in Wallonië en Brussel TMC genoemd, die je één keer betaalt bij de inschrijving en die per gewest anders wordt berekend. Voor een gebruikte auto neemt de BIV af met de leeftijd, gerekend vanaf de eerste inschrijving waar ook ter wereld.",
  "cards": [
    [
      "Invoerrecht (buiten de EU)",
      "10 %",
      "over de douanewaarde",
      "orange"
    ],
    [
      "Btw bij invoer",
      "21 %",
      "douanewaarde + recht",
      "blue"
    ],
    [
      "Japan, Korea, VS",
      "0 %",
      "recht, met oorsprongsbewijs",
      "sky"
    ],
    [
      "BIV Vlaanderen 2026",
      "58–14.539 €",
      "CO2, brandstof, leeftijd",
      "amber"
    ]
  ],
  "changedH": "Wat er in 2025 en 2026 veranderde",
  "changed": [
    [
      "Wallonië:",
      "sinds 1 juli 2025 berekent het gewest de TMC met een formule: basisbedrag volgens het vermogen × CO2 gedeeld door 136 × massa gedeeld door 1.838, met een minimum van 50 € en een maximum van 9.000 €. De ecomalus is afgeschaft."
    ],
    [
      "Vlaanderen:",
      "de vrijstelling voor elektrische auto’s is afgeschaft. Wie vanaf 1 januari 2026 inschrijft, betaalt een forfait van 61,50 € in plaats van niets. Voor andere auto’s geldt de formule met factor 1,245 voor 2026."
    ],
    [
      "Brussel:",
      "de tabel op basis van kW of fiscale pk, waarvan het hoogste bedrag telt, wordt elk jaar op 1 juli geïndexeerd. Een elektrische auto betaalt het minimum van 78,88 €."
    ],
    [
      "Verenigde Staten:",
      "sinds 1 juli 2026 schaft Verordening (EU) 2026/1455 de rechten op industriële producten van Amerikaanse oorsprong af. Voor een auto moet je de VS als productieland en het rechtstreekse vervoer bewijzen."
    ],
    [
      "Japan:",
      "de stapsgewijze verlaging van het recht op Japanse auto’s eindigt op 1 februari 2026, met 0 % onder een oorsprongsverklaring."
    ],
    [
      "China:",
      "Chinese elektrische auto’s betalen 10 % plus een compenserend recht: BYD 17 %, Geely 18,8 %, SAIC 35,3 %, Tesla Shanghai 7,8 %. Voor de Cupra Tavascan werd in februari 2026 een eerste prijsverbintenis aanvaard."
    ]
  ],
  "examples": [
    [
      "Voorbeeld 1: gebruikte auto uit de Emiraten, ingeschreven in Vlaanderen",
      "Een benzineauto kost 20.000 € met 1.500 € vracht en verzekering, dus de douanewaarde is 21.500 €. Het invoerrecht van 10 % is 2.150 €. De btw van 21 % over 23.650 € is 4.966,50 €. De auto stoot 118 g/km uit en is veertien maanden oud. De Vlaamse BIV voor een nieuwe wagen is 232,67 €, na 90 % leeftijdsvermindering 209,40 €. Samen is dat 7.325,90 €, of 34,1 % van de douanewaarde."
    ],
    [
      "Voorbeeld 2: Japanse auto met en zonder oorsprongsbewijs",
      "Een auto van 15.000 € met 1.200 € vracht heeft een douanewaarde van 16.200 €. Met de oorsprongsverklaring is er geen invoerrecht en bedraagt de btw 3.402 €. Zonder document kost het recht 1.620 € en stijgt de btw over 17.820 € naar 3.742,20 €. Samen is dat 5.362,20 €, dus het ontbrekende papier kost 1.960,20 €."
    ],
    [
      "Voorbeeld 3: dezelfde auto in drie gewesten",
      "Een auto van drie jaar en zes maanden uit een EU-land, met 118 g/km, 90 kW, 8 fiscale pk en 1.838 kg. Vlaanderen rekent 232,67 € voor een nieuwe auto, na 70 % leeftijdsvermindering 162,87 €. Brussel rekent 634,89 € voor de trap van 86 tot 100 kW, na 70 % is dat 444,42 €. Wallonië rekent 515,20 € × 118/136 = 447,01 € voor een nieuwe auto, en 312,91 € na 70 %. Het gewest van inschrijving verdubbelt of verdrievoudigt dus de belasting."
    ],
    [
      "Voorbeeld 4: nieuwe SUV uit de EU",
      "Een nieuwe SUV van 40.000 € met 160 g/km, 110 kW en 12 fiscale pk betaalt 21 % Belgische btw, dus 8.400 €. De Vlaamse BIV is 1.297,18 €. Brussel vraagt 1.112,01 €. Wallonië vraagt 1.212,94 € bij een massa van 2.100 kg."
    ],
    [
      "Voorbeeld 5: Chinese elektrische BYD",
      "Voor 30.000 € met 1.500 € vracht is de douanewaarde 31.500 €. Het invoerrecht is 3.150 € en het compenserend recht van 17 % is 5.355 €. De btw van 21 % over 40.005 € is 8.401,05 €. De BIV is 61,50 € in Vlaanderen, 78,88 € in Brussel en 50 € in Wallonië. In Vlaanderen is het totaal aan belastingen 16.967,55 €."
    ]
  ],
  "stepsH": "Stappenplan: een auto importeren naar België",
  "steps": [
    "Zoek de datum van eerste inschrijving, de CO2-uitstoot, het vermogen en de massa op het buitenlandse inschrijvingsbewijs of het Certificaat van Overeenstemming.",
    "Controleer het productieland en vraag het oorsprongsbewijs als een akkoord het recht op 0 % zet.",
    "Buiten de EU: doe aangifte bij de douane en betaal invoerrecht en btw. Uit de EU: betaal btw alleen als de auto nieuw is.",
    "Laat de auto technisch keuren en vraag een typegoedkeuring of individuele goedkeuring als er geen Europees COC is.",
    "Schrijf de auto in bij de DIV en betaal de BIV of TMC van je gewest.",
    "Laat platen maken en verzeker de auto voor je ermee rijdt."
  ],
  "mistakesH": "Veelgemaakte fouten",
  "mistakes": [
    "Rekenen met de oude Waalse regels met ecomalus: sinds 1 juli 2025 geldt een formule met CO2, massa en vermogen.",
    "Aannemen dat een elektrische auto in Vlaanderen nog vrijgesteld is: dat eindigde met de inschrijvingen van 2026.",
    "De btw vergeten over het invoerrecht uit te rekenen.",
    "Het gewest vergeten: dezelfde auto kost in Brussel of Wallonië een heel ander bedrag dan in Vlaanderen.",
    "Rekenen op 0 % zonder oorsprongsbewijs of zonder bewezen rechtstreeks vervoer uit de VS.",
    "De leeftijd van de auto rekenen vanaf de datum van aankoop in plaats van de datum van eerste inschrijving."
  ],
  "notH": "Wat de calculator niet dekt",
  "notP": "De calculator dekt geen leasingvoertuigen, bestelwagens, motoren, de vrijstellingen voor grote gezinnen of mindervaliden en geen verhuizing met vrijstelling. De luchtcomponent van de Vlaamse formule staat standaard op de waarde voor Euro 6 en kun je aanpassen voor een andere Euronorm. De waarde voor diesel is afgeleid uit de voorbeeldbedragen van een secundaire bron en is niet bevestigd door de Vlaamse Belastingdienst. De fiscale pk voor Brussel en Wallonië vul je zelf in. Elektrische auto’s in Wallonië rekenen we tegen het minimum van 50 €, omdat de coëfficiënt per vermogen niet is ingebouwd. Jaarlijkse verkeersbelasting, verzekering, platen en homologatiekosten zijn niet meegeteld.",
  "faqH": "Veelgestelde vragen",
  "faq": [
    [
      "Welke belastingen betaal ik als ik een auto naar België importeer?",
      "Komt de auto van buiten de EU, dan betaal je 10 % invoerrecht over de douanewaarde (prijs, vracht en verzekering tot de EU-grens) en daarna 21 % btw over die waarde plus het recht. Bij inschrijving komt daar de gewestelijke belasting op inverkeerstelling bij. Een auto uit een ander EU-land betaalt geen invoerrecht."
    ],
    [
      "Hoeveel BIV betaal ik in Vlaanderen in 2026?",
      "De Vlaamse BIV volgt de formule ((CO2 × 1,245) / 246)^6 × 4.500 plus een luchtcomponent, vermenigvuldigd met een leeftijdscorrectie. Een nieuwe Euro 6-benzineauto met 118 g/km betaalt 232,67 €. De belasting is begrensd tot minimaal 58,16 € en maximaal 14.539,31 €, en daalt met 10 procentpunten per jaar tot 10 % na meer dan negen jaar."
    ],
    [
      "Hoe wordt de Waalse TMC berekend sinds 2025?",
      "Sinds 1 juli 2025 is de TMC het basisbedrag van het vermogen, vermenigvuldigd met CO2 gedeeld door 136 en met de massa gedeeld door 1.838, met een coëfficiënt van 0,8 voor een hybride. Het resultaat ligt tussen 50 € en 9.000 €. Het basisbedrag daalt met de leeftijd van de auto, van 100 % naar 10 % na veertien jaar."
    ],
    [
      "Hoe werkt de BIV in Brussel?",
      "Brussel gebruikt een tabel met zeven trappen op basis van kW of fiscale pk, waarbij het hoogste bedrag telt. De trappen lopen van 78,88 € tot 6.357,85 € voor een nieuwe auto en de tabel wordt elk jaar op 1 juli geïndexeerd. Een gebruikte auto krijgt dezelfde leeftijdsvermindering als in Wallonië."
    ],
    [
      "Betaalt een elektrische auto BIV in België?",
      "Ja, in alle drie de gewesten, al is het weinig. Vlaanderen rekent 61,50 € voor inschrijvingen vanaf 2026, na de afschaffing van de vrijstelling. Brussel rekent het minimum van 78,88 € en Wallonië minstens 50 €. Een Chinese elektrische auto betaalt bovendien 10 % invoerrecht plus een compenserend recht van 7,8 % tot 35,3 %."
    ],
    [
      "Betaal ik btw op een auto uit een ander EU-land?",
      "Alleen als de auto voor de btw nieuw is: hooguit zes maanden oud of hooguit 6.000 kilometer. Dan betaal je 21 % Belgische btw, ook als particulier. Een occasion die beide grenzen overschrijdt en waarover in het koopland al btw is betaald, kent geen Belgische btw. De BIV blijft in beide gevallen verschuldigd."
    ],
    [
      "Betaal ik invoerrecht op een Amerikaanse of Japanse auto?",
      "Niet altijd. Sinds 1 juli 2026 schaft Verordening (EU) 2026/1455 de rechten op industriële producten van Amerikaanse oorsprong af, wat 0 % mogelijk maakt voor een in de VS gebouwde auto met bewezen oorsprong en rechtstreeks vervoer. Japanse auto’s vallen sinds 1 februari 2026 onder 0 %. Zuid-Korea heeft 0 % door het vrijhandelsakkoord. Zonder bewijs geldt 10 %, en de btw van 21 % betaal je altijd."
    ],
    [
      "Wat is het verschil met de oude cijfers die ik online zie?",
      "Veel sites tonen een Vlaamse BIV-grens van 13.250 € of kennen nog de Waalse ecomalus en de Vlaamse vrijstelling voor elektrisch. De tarieven van 1 juli 2026 tot 30 juni 2027 zijn: maximum 14.539,31 € in Vlaanderen, 9.000 € in Wallonië en 6.357,85 € in Brussel. De calculator gebruikt die geïndexeerde tarieven."
    ]
  ],
  "sourcesPre": "Gecontroleerd door",
  "sourcesName": "Joshua Victor",
  "sourcesPost": ", Oprichter. Bronnen: Vlaamse Belastingdienst (tarief BIV niet-leasingwagens en leeftijdscorrectie), SPW Finances (Waalse TMC sinds 1 juli 2025), Brussel Fiscaliteit (BIV-tabel), FOD Financiën (btw bij invoer), Gemeenschappelijk Douanetarief van de EU (TARIC), Verordening (EU) 2026/1455, Uitvoeringsverordening (EU) 2024/2754, het EU-Japan-partnerschapsakkoord en het handels- en samenwerkingsakkoord EU-VK. De geïndexeerde tabellen komen uit de gepubliceerde tarieven 2026-2027; het BIV-bedrag in Vlaanderen voor diesel is afgeleid uit voorbeeldbedragen. Laatst gecontroleerd: november 2026.",
  "dateModified": "2026-11-18",
  "jsonName": "Auto importeren naar België — calculator voor invoerrecht, btw en BIV",
  "jsonDesc": "Gratis calculator voor invoerrecht, btw en BIV bij het importeren van een auto naar België.",
  "appName": "Calculator auto importeren naar België",
  "crumbTitle": "Auto importeren naar België"
};

export const metadata: Metadata = {
  title: C.title,
  description: C.desc,
  alternates: alternatesFor(PATH),
  openGraph: { title: C.ogTitle, description: C.ogDesc, url: URL, siteName: 'Naira Autos', locale: C.locale, type: 'website' },
  keywords: C.keywords,
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL, name: C.jsonName, description: C.jsonDesc, url: URL, inLanguage: C.ld, dateModified: C.dateModified,
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: C.jobTitle, url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: C.homeName, item: 'https://www.naira.autos' + C.homePath },
          { '@type': 'ListItem', position: 2, name: C.hubName, item: 'https://www.naira.autos' + C.hubPath },
          { '@type': 'ListItem', position: 3, name: C.crumbTitle, item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', inLanguage: C.ld, mainEntity: C.faq.map((f) => ({ '@type': 'Question', name: f[0], acceptedAnswer: { '@type': 'Answer', text: f[1] } })) },
    { '@type': 'SoftwareApplication', name: C.appName, inLanguage: C.ld, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';
const COLORS: Record<string, { color: string; bg: string; border: string }> = {
  orange: { color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
  blue: { color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/5', border: 'border-blue-200 dark:border-blue-500/20' },
  sky: { color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
  amber: { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
};

export default function Page() {
  return (
    <div lang={C.lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link prefetch={false} href={C.hubPath} className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label={C.crumbBack}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label={C.crumbNav} className="flex items-center gap-1.5 text-xs text-white/30 flex-wrap">
              <Link prefetch={false} href={C.homePath} className="hover:text-white/60 transition-colors">{C.homeName}</Link>
              <ChevronRight className="h-3 w-3" />
              <Link prefetch={false} href={C.hubPath} className="hover:text-white/60 transition-colors">{C.hubName}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">{C.crumbLabel}</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">{C.badge1}</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">{C.badge2}</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">{C.badge3}</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              {C.h1a}<br /><span className="text-blue-400">{C.h1b}</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">{C.sub}</p>
            <p className="text-white/75 text-sm leading-relaxed">{C.lead}</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed"><strong className="text-amber-900 dark:text-amber-300">{C.warnStrong}</strong> {C.warn}</p>
        </div>
      </div>

      <BelgiumImportCalculator lang={C.lang as 'nl' | 'fr'} />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>{C.introH}</h2>
            <p className={`${p} mb-6 max-w-3xl`}>{C.intro}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {C.cards.map(([label, rate, base, tone]) => (
                <div key={label} className={`p-5 rounded-2xl ${COLORS[tone].bg} border ${COLORS[tone].border}`}>
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className={`text-3xl font-black ${COLORS[tone].color}`} style={heading}>{rate}</p>
                  <p className="text-xs text-muted-foreground mt-1">{base}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>{C.changedH}</h2>
                <div className="space-y-3">
                  {C.changed.map(([k, v]) => <p key={k} className={p}><strong className="text-foreground">{k}</strong> {v}</p>)}
                </div>
              </div>
              {C.examples.map(([k, v]) => (
                <div key={k}>
                  <h2 className={h2} style={heading}>{k}</h2>
                  <p className={p}>{v}</p>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>{C.stepsH}</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  {C.steps.map((s) => <li key={s}>{s}</li>)}
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>{C.mistakesH}</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  {C.mistakes.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
              <div>
                <h2 className={h2} style={heading}>{C.notH}</h2>
                <p className={p}>{C.notP}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={heading}>{C.faqH}</h2>
            <div className="space-y-3 max-w-3xl">
              {C.faq.map((f) => (
                <details key={f[0]} className="group rounded-xl border border-border bg-card px-4 py-3">
                  <summary className="cursor-pointer text-sm font-semibold text-foreground list-none">{f[0]}</summary>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">{f[1]}</p>
                </details>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            {C.sourcesPre} <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">{C.sourcesName}</Link>{C.sourcesPost}
          </p>
        </div>
      </div>
    </div>
  );
}
