import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import AutoImporterenNederlandClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/gereedschappen/auto-importeren-calculator-nederland';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'Auto importeren naar Nederland 2026 — Calculator voor invoerrecht, btw en BPM',
  description: 'Gratis calculator voor het importeren van een auto naar Nederland: 10 % invoerrecht, 21 % btw, BPM-tarieven 2026 met dieseltoeslag en forfaitaire afschrijving, Japan en de VS tegen 0 %, Chinese elektrische auto’s. Bijgewerkt oktober 2026.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'Auto importeren naar Nederland: calculator | Naira Autos',
    description: 'Bereken invoerrecht, btw en BPM voor een geïmporteerde auto in Nederland.',
    url: URL, siteName: 'Naira Autos', locale: 'nl_NL', type: 'website',
  },
  keywords: [
    'auto importeren kosten Nederland', 'bpm berekenen 2026 import', 'rest bpm forfaitaire tabel', 'invoerrecht auto buiten EU 10 procent',
    'btw auto importeren 21 procent', 'auto importeren uit Duitsland bpm', 'auto importeren uit Amerika 2026', 'auto uit Japan importeren invoerrecht',
    'dieseltoeslag bpm 2026',
  ].join(', '),
};

const FAQ = [
  { q: 'Welke belastingen betaal ik als ik een auto naar Nederland importeer?', a: 'Komt de auto van buiten de EU, dan betaal je 10 % invoerrecht over de douanewaarde (prijs, vracht en verzekering tot de EU-grens) en daarna 21 % btw over die waarde plus het recht. Daarbovenop komt bij inschrijving in het kentekenregister de BPM, die afhangt van de CO2-uitstoot en bij een gebruikte auto wordt verminderd met een afschrijving. Een auto uit een ander EU-land betaalt geen invoerrecht.' },
  { q: 'Hoeveel BPM betaal ik in 2026?', a: 'Het starttarief is 687 euro. Daarbovenop geldt een tarief per gram CO2 in vijf schijven: 2 euro tot 77 g/km, 82 euro tot 100 g/km, 181 euro tot 139 g/km, 297 euro tot 155 g/km en 594 euro erboven. Een benzineauto met 130 g/km betaalt 8.157 euro bruto, het voorbeeld dat de Belastingdienst zelf gebruikt. Diesels betalen daarbovenop 114,83 euro per gram boven 69 g/km.' },
  { q: 'Is het dieseltoeslagtarief 83,87 euro of 114,83 euro?', a: 'In 2026 is het 114,83 euro per gram CO2 boven 69 g/km. Sommige gidsen noemen nog 83,87 euro boven 70 g/km, een vroeger tarief, en een voorstel met vier schijven en een starttarief van 667 euro dat evenmin meer klopt. De calculator gebruikt de tarieven van de Belastingdienst voor 2026.' },
  { q: 'Hoe werkt de afschrijving van de BPM bij een gebruikte auto?', a: 'Je betaalt rest-BPM: de bruto BPM min een afschrijving die je kiest uit de forfaitaire tabel, een koerslijst of een taxatierapport. De forfaitaire tabel loopt sinds 1 juli 2023 van 12 % na één maand tot 33 % na negen maanden, 51 % na tweeënhalf jaar en 81 % na negen en een half jaar, met een opslag voor elke begonnen maand. Op de oude tabel van 2012, met 92 % vanaf negen en een half jaar, zie je nog veel websites.' },
  { q: 'Betaalt een elektrische auto BPM?', a: 'Ja, sinds 1 januari 2025. Een auto zonder uitstoot valt in de eerste schijf en betaalt het starttarief van 687 euro in 2026, waarop bij een gebruikte auto nog afschrijving komt. Het nihiltarief is dus vervallen. Een Chinese elektrische auto betaalt bij binnenkomst in de EU bovendien 10 % invoerrecht en een compenserend recht van 7,8 % tot 35,3 %, afhankelijk van de fabrikant.' },
  { q: 'Betaal ik invoerrecht op een Amerikaanse of Japanse auto?', a: 'Niet altijd. Sinds 1 juli 2026 schaft Verordening (EU) 2026/1455 de rechten op industriële producten van Amerikaanse oorsprong af, wat 0 % mogelijk maakt voor een in de VS gebouwde auto met bewezen oorsprong en rechtstreeks vervoer. Japanse auto’s vallen sinds 1 februari 2026 onder 0 % na de laatste stap van het EU-Japan-akkoord. Zuid-Korea heeft 0 % door het vrijhandelsakkoord. Zonder bewijs geldt 10 %, en de btw van 21 % betaal je altijd.' },
  { q: 'Moet ik btw betalen over een auto uit een ander EU-land?', a: 'Alleen als de auto voor de btw nieuw is: hooguit zes maanden oud of hooguit 6.000 kilometer. Dan betaal je 21 % Nederlandse btw, ook als particulier. Een occasion die beide grenzen overschrijdt en waarover in het koopland al btw is betaald, kent geen Nederlandse btw. BPM blijft in beide gevallen verschuldigd.' },
  { q: 'Wat als de datum eerste toelating vóór 1 juli 2020 ligt?', a: 'Dan gelden oudere tarieven op basis van de NEDC-meetmethode, en die zitten niet in deze calculator. Je kunt het bruto BPM-bedrag zelf invullen. Een auto van 25 jaar of ouder betaalt geen BPM, maar je doet wel aangifte. Volgens de forfaitaire tabel ben je al na 17 jaar en 10 maanden vrij van BPM.' },
  { q: 'Welke kosten komen er bij de RDW bij?', a: 'Een auto van buiten de EU wordt uitgebreid gekeurd, meestal in Lelystad, en de RDW rekent ook kosten als hij de auto afkeurt. Daarnaast betaal je voor de kentekencard en de tenaamstelling, bijvoorbeeld 39,80 euro voor een kentekencard en 13,10 euro voor tenaamstelling in 2026, plus de kentekenplaten, WA-verzekering en motorrijtuigenbelasting. Vul die kosten in bij overige kosten.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'Auto importeren naar Nederland — calculator voor invoerrecht, btw en BPM',
      description: 'Gratis calculator voor invoerrecht, btw en BPM bij het importeren van een auto naar Nederland.',
      url: URL, inLanguage: 'nl-NL', dateModified: '2026-10-20',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Oprichter', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Startpagina', item: 'https://www.naira.autos/startpagina' },
          { '@type': 'ListItem', position: 2, name: 'Gereedschappen', item: 'https://www.naira.autos/gereedschappen' },
          { '@type': 'ListItem', position: 3, name: 'Auto importeren naar Nederland', item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', inLanguage: 'nl-NL', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'SoftwareApplication', name: 'Calculator auto importeren naar Nederland', inLanguage: 'nl-NL', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';

export default function AutoImporterenCalculatorNederlandPage() {
  return (
    <div lang="nl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link prefetch={false} href="/gereedschappen" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="Terug">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Kruimelpad" className="flex items-center gap-1.5 text-xs text-white/30 flex-wrap">
              <Link prefetch={false} href="/startpagina" className="hover:text-white/60 transition-colors">Startpagina</Link>
              <ChevronRight className="h-3 w-3" />
              <Link prefetch={false} href="/gereedschappen" className="hover:text-white/60 transition-colors">Gereedschappen</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇳🇱 Auto importeren</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">100% gratis</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">BPM-tarieven 2026</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Gecontroleerd: oktober 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Auto importeren<br /><span className="text-blue-400">naar Nederland</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Wat kost een geïmporteerde auto echt, BPM inbegrepen?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Kies de herkomst, de datum van eerste toelating en de CO2-uitstoot en zie het invoerrecht, de btw en de BPM met afschrijving.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Slechts een schatting.</strong> De BPM-tarieven veranderen elke 1 januari en in 2027 en 2028 volgen nieuwe wijzigingen. Veel websites noemen nog verouderde tarieven. Controleer het bedrag in de aangifte van de Belastingdienst voordat je koopt.
          </p>
        </div>
      </div>

      <AutoImporterenNederlandClient />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>Invoerrecht, btw en BPM: zo bouwt de prijs zich op</h2>
            <p className={`${p} mb-6 max-w-3xl`}>
              Een auto importeren naar Nederland kent drie kostenlagen. De eerste is douane: geen invoerrecht binnen de Europese Unie en 10 % over de douanewaarde voor een auto uit een derde land, tenzij een handelsakkoord met oorsprongsbewijs het op nul zet. De tweede is de btw van 21 %, berekend over de douanewaarde plus het invoerrecht. De derde is typisch Nederlands: de BPM, een eenmalige belasting bij inschrijving in het kentekenregister die vooral afhangt van de CO2-uitstoot. Voor een gebruikte auto trek je daar een afschrijving vanaf, zodat je rest-BPM betaalt. De calculator telt alles op in de volgorde waarin de overheid het berekent.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Invoerrecht (buiten de EU)', rate: '10 %', base: 'over de douanewaarde', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'Btw bij invoer', rate: '21 %', base: 'douanewaarde + recht', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/5', border: 'border-blue-200 dark:border-blue-500/20' },
                { label: 'Japan, Korea, VS', rate: '0 %', base: 'recht, met oorsprongsbewijs', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
                { label: 'Starttarief BPM 2026', rate: '€ 687', base: 'plus tarief per gram CO2', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
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
                <h2 className={h2} style={heading}>Wat er in 2025 en 2026 veranderde</h2>
                <div className="space-y-3">
                  <p className={p}><strong className="text-foreground">BPM omhoog:</strong> per 1 januari 2026 stijgt het starttarief van 667 naar 687 euro, dalen de CO2-grenzen van de schijven en stijgen de tarieven. De dieseltoeslag is 114,83 euro per gram boven 69 g/km. Volgens de KVK volgen in 2027 en 2028 weer nieuwe wijzigingen, dus controleer de tarieven als je later inschrijft.</p>
                  <p className={p}><strong className="text-foreground">Elektrisch niet meer gratis:</strong> sinds 2025 betalen ook elektrische auto’s en waterstofauto’s het starttarief. Plug-in hybrides hebben geen apart tarief meer.</p>
                  <p className={p}><strong className="text-foreground">Nieuwe afschrijvingstabel:</strong> sinds 1 juli 2023 geldt een nieuwe forfaitaire tabel die jonge auto’s meer en oude auto’s minder korting geeft dan de tabel van 2012.</p>
                  <p className={p}><strong className="text-foreground">Verenigde Staten:</strong> sinds 1 juli 2026 schaft Verordening (EU) 2026/1455 de rechten op industriële producten van Amerikaanse oorsprong af. Voor een auto moet je de VS als productieland en het rechtstreekse vervoer bewijzen.</p>
                  <p className={p}><strong className="text-foreground">Japan:</strong> de stapsgewijze verlaging van het recht op Japanse auto’s eindigt op 1 februari 2026, met 0 % onder een oorsprongsverklaring.</p>
                  <p className={p}><strong className="text-foreground">China:</strong> Chinese elektrische auto’s betalen 10 % plus een compenserend recht: BYD 17 %, Geely 18,8 %, SAIC 35,3 %, Tesla Shanghai 7,8 %. In februari 2026 werd een eerste prijsverbintenis aanvaard voor de Cupra Tavascan.</p>
                  <p className={p}><strong className="text-foreground">Verenigd Koninkrijk:</strong> Britse auto’s komen tegen 0 % binnen met oorsprongsbewijs. Voor elektrische auto’s worden vanaf 1 januari 2027 strengere oorsprongsregels verwacht.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Voorbeeld 1: gebruikte auto uit de Emiraten, zonder akkoord</h2>
                <p className={p}>Een auto kost 20.000 euro met 1.500 euro vracht en verzekering, dus de douanewaarde is 21.500 euro. Het invoerrecht van 10 % is 2.150 euro. De btw van 21 % over 23.650 euro is 4.966,50 euro. De auto kreeg op 15 januari 2024 zijn eerste toelating, stoot 130 g/km uit en wordt op 20 oktober 2026 goedgekeurd. De bruto BPM is 8.157 euro. De leeftijd is twee jaar en negen maanden: 51 % plus vier begonnen maanden van 0,5 % is 53 % afschrijving, een korting van 4.323,21 euro. De rest-BPM is 3.833,79 euro en de belastingen samen zijn 10.950,29 euro.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Voorbeeld 2: Japanse auto met en zonder oorsprongsbewijs</h2>
                <p className={p}>Een auto van 15.000 euro met 1.200 euro vracht heeft een douanewaarde van 16.200 euro. Met de oorsprongsverklaring is er geen invoerrecht en bedraagt de btw 3.402 euro. Zonder document kost het recht 1.620 euro en stijgt de btw over 17.820 euro naar 3.742,20 euro. Samen is dat 5.362,20 euro, dus het ontbrekende papier kost 1.960,20 euro.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Voorbeeld 3: Duitse occasion van drie jaar</h2>
                <p className={p}>Een auto van 26.000 euro, eerste toelating 10 maart 2023, met 110 g/km, wordt op 20 oktober 2026 goedgekeurd. De bruto BPM is 2.727 plus 10 gram keer 181 euro, samen 4.537 euro. Na drie jaar en zeven maanden is de afschrijving 57 % plus twee begonnen maanden van 0,42 %, dus 57,84 %. De rest-BPM is 1.912,80 euro. Er is geen invoerrecht en geen Nederlandse btw, omdat het geen nieuwe auto meer is.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Voorbeeld 4: benzine tegenover diesel</h2>
                <p className={p}>Dezelfde auto met 130 g/km heeft als benzine een bruto BPM van 8.157 euro en als diesel 15.161,63 euro, omdat 61 gram boven 69 g/km elk 114,83 euro extra kost. Met dezelfde afschrijving van 53 % blijft er 3.833,79 euro rest-BPM voor de benzine en 7.125,97 euro voor de diesel.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Voorbeeld 5: Chinese elektrische BYD</h2>
                <p className={p}>Voor 30.000 euro met 1.500 euro vracht is de douanewaarde 31.500 euro. Het invoerrecht is 3.150 euro en het compenserende recht van 17 % is 5.355 euro. De btw van 21 % over 40.005 euro is 8.401,05 euro. Daarbij komt de BPM van 687 euro, samen 17.593,05 euro aan belastingen.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Stappenplan: een auto importeren</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Zoek de datum eerste toelating, de CO2-uitstoot en het chassisnummer op het buitenlandse kentekenbewijs of het Certificaat van Overeenstemming.</li>
                  <li>Controleer het productieland en vraag het oorsprongsbewijs als een akkoord het recht op 0 % zet.</li>
                  <li>Buiten de EU: doe aangifte bij de douane en betaal invoerrecht en btw. Uit de EU: betaal btw alleen als de auto nieuw is.</li>
                  <li>Maak een afspraak bij de RDW voor de keuring of identificatie en vraag een Nederlands kenteken aan.</li>
                  <li>Doe daarna aangifte BPM bij de Belastingdienst, betaal en wacht op de goedkeuring.</li>
                  <li>Laat platen maken, verzeker de auto (WA) en let op de rekening voor motorrijtuigenbelasting.</li>
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>Veelgemaakte fouten</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Rekenen met oude BPM-tarieven of de afschrijvingstabel van 2012.</li>
                  <li>De btw vergeten over het invoerrecht uit te rekenen.</li>
                  <li>Rekenen op 0 % zonder oorsprongsbewijs of zonder bewezen rechtstreeks vervoer uit de VS.</li>
                  <li>Aannemen dat een elektrische auto geen BPM betaalt: dat nihiltarief bestaat sinds 2025 niet meer.</li>
                  <li>De CO2-waarde niet kennen: de Belastingdienst rekent dan met 550 of 395 gram per kilometer.</li>
                  <li>Vergeten dat de peildatum voor de afschrijving de dag van de RDW-goedkeuring is, niet de dag van aangifte.</li>
                </ul>
              </div>
              <div>
                <h2 className={h2} style={heading}>Wat de calculator niet dekt</h2>
                <p className={p}>De calculator dekt geen bestelauto’s, motoren, doorschuifregelingen, de gehandicaptenregeling, verhuizingen met vrijstelling of de keuze voor een ouder tarief dat tot twee maanden vóór de eerste toelating gold. Hij rekent met de forfaitaire tabel, niet met een koerslijst of taxatierapport, die vaak voordeliger uitpakken voor auto’s die dure opties hebben of schade. Motorrijtuigenbelasting, verzekering, platen en btw over een handelaarsmarge zijn niet meegeteld.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={heading}>Veelgestelde vragen</h2>
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
            Gecontroleerd door <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Oprichter. Bronnen: Belastingdienst (tarieven BPM 2026, aangifteformulieren en forfaitaire afschrijvingstabel), Wet BPM 1992 en Uitvoeringsregeling BPM 1992 artikel 8, RDW (auto importeren en tarieven 2026), KVK en Rijksoverheid over importeren, Gemeenschappelijk Douanetarief van de EU (TARIC), Verordening (EU) 2026/1455, Uitvoeringsverordening (EU) 2024/2754, het EU-Japan-partnerschapsakkoord en het handels- en samenwerkingsakkoord EU-VK. Laatst gecontroleerd: oktober 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
