import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VINCheckerClientNl from '@/components/VINCheckerClientNl';
import { alternatesFor } from '@/lib/hreflang';
import LanguagePills from '@/components/ui/LanguagePills';

export const metadata: Metadata = {
  title: 'Chassisnummer (VIN) Gratis Controleren — Merk, Model, Bouwjaar & Herkomst',
  description: 'Controleer het chassisnummer (VIN) van elke auto gratis. Zie merk, model, bouwjaar, motor en land van herkomst in seconden — zonder registratie. Handig bij import uit de VS, in Nederland en België.',
  keywords: ['chassisnummer controleren gratis', 'vin check gratis', 'chassisnummer check', 'vin decoder nederlands', 'chassisnummer auto waar staat het', 'import auto vs chassisnummer', 'vin nummer opzoeken', 'chassisnummer en kenteken', 'amerikaanse auto chassisnummer', 'vin of chassisnummer verschil'],
  alternates: alternatesFor('/gereedschappen/chassisnummer-controleren'),
  openGraph: {
    title: 'Chassisnummer (VIN) Gratis Controleren | Naira Autos',
    description: 'Zie merk, model, bouwjaar, motor en herkomst van elke auto aan de hand van het chassisnummer — gratis en direct.',
    url: 'https://www.naira.autos/gereedschappen/chassisnummer-controleren',
    locale: 'nl_NL',
    type: 'website',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/gereedschappen/chassisnummer-controleren',
      name: 'Chassisnummer (VIN) Gratis Controleren — Merk, Model, Bouwjaar & Herkomst',
      description: 'Controleer het chassisnummer (VIN) van elke auto gratis — merk, model, bouwjaar, motor en land van herkomst.',
      url: 'https://www.naira.autos/gereedschappen/chassisnummer-controleren',
      inLanguage: 'nl',
      dateModified: '2026-10-24',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startpagina', item: 'https://www.naira.autos/startpagina' },
        { '@type': 'ListItem', position: 2, name: 'Gereedschappen', item: 'https://www.naira.autos/gereedschappen' },
        { '@type': 'ListItem', position: 3, name: 'Chassisnummer controleren', item: 'https://www.naira.autos/gereedschappen/chassisnummer-controleren' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Wat is het chassisnummer (VIN) van een auto?', acceptedAnswer: { '@type': 'Answer', text: 'Het chassisnummer, internationaal VIN (Vehicle Identification Number), is een unieke code van 17 tekens die elk voertuig bij de productie krijgt. Het bevat het land van herkomst, de fabrikant, het voertuigtype, de motor, het modeljaar, de assemblagefabriek en een uniek serienummer. In Nederland staat het in het kentekenbewijs; in België in het inschrijvingsbewijs.' } },
        { '@type': 'Question', name: 'Hoe controleer ik een chassisnummer gratis?', acceptedAnswer: { '@type': 'Answer', text: 'Vul het chassisnummer van 17 tekens hierboven in en klik op "Decoderen". Onze gratis tool gebruikt de openbare database van de NHTSA (de Amerikaanse verkeersveiligheidsautoriteit) en toont merk, model, bouwjaar, motorspecificaties, transmissie en productiefabriek — volledig gratis, zonder registratie, vanuit elk land.' } },
        { '@type': 'Question', name: 'Waar vind ik het chassisnummer op de auto?', acceptedAnswer: { '@type': 'Answer', text: 'Het chassisnummer staat op drie plekken: op het dashboard (zichtbaar door de voorruit aan de bestuurderskant), op een sticker in de deurstijl van de bestuurder en ingeslagen in het chassis in de motorruimte. Ook staat het in het kentekenbewijs. Alle plekken moeten exact overeenkomen.' } },
        { '@type': 'Question', name: 'Is een chassisnummer hetzelfde als een VIN?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, het is exact dezelfde code van 17 tekens. "VIN" is de internationale term, "chassisnummer" is de gangbare Nederlandse benaming. Ook "VIN-nummer" wordt veel gebruikt.' } },
        { '@type': 'Question', name: 'Werkt deze tool voor auto’s die uit de VS naar Nederland of België zijn geïmporteerd?', acceptedAnswer: { '@type': 'Answer', text: 'Ja — dat is het meest voorkomende gebruik. Voertuigen die oorspronkelijk voor de Amerikaanse, Canadese of Mexicaanse markt zijn gebouwd, worden normaal gedecodeerd, waaronder veel pick-ups, SUV’s en klassiekers uit Amerikaanse veilingen. Voertuigen die uitsluitend voor Europa zijn gebouwd, staan meestal niet in de NHTSA-database; gebruik dan het kentekenbewijs en de RDW (Nederland) of de DIV (België).' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Chassisnummer (VIN) Gratis Controleren', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function ChassisnummerControlerenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link href="/gereedschappen" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="Terug">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/startpagina" className="hover:text-white/60 transition-colors">Startpagina</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/gereedschappen" className="hover:text-white/60 transition-colors">Gereedschappen</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Chassisnummer controleren</span>
            </nav>
            <LanguagePills path="/gereedschappen/chassisnummer-controleren" className="ms-auto" />
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">100% Gratis</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">NHTSA-data</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(28px, 5vw, 56px)' }}>
              Chassisnummer (VIN)<br /><span className="text-blue-400">Gratis en Direct Controleren</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Zie in seconden wat een auto werkelijk is, aan de hand van het chassisnummer.</p>
            <p className="text-white/75 text-sm leading-relaxed">Vul het chassisnummer van 17 tekens in uit het dashboard, de deurstijl of het chassis. Krijg merk, model, bouwjaar, motorspecificaties en land van herkomst — gratis, zonder registratie. Handig als je een geïmporteerde auto koopt in Nederland of België.</p>
          </div>
        </div>
      </div>

      <VINCheckerClientNl />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Gratis Chassisnummer Check voor Elke Tweedehands Auto</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Onze <strong className="text-foreground">gratis VIN-decoder</strong> gebruikt de openbare database van de NHTSA, de Amerikaanse verkeersveiligheidsautoriteit. Een <strong className="text-foreground">gratis chassisnummer check</strong> levert merk, model, bouwjaar, motorspecificaties, transmissie, carrosserietype en assemblagefabriek op — alles wat je nodig hebt om vóór aankoop vast te stellen of een tweedehands auto werkelijk is wat de verkoper beweert.</p>
                  <p>De occasionmarkt is steeds internationaler. Auto’s die voor de Verenigde Staten, Canada of Mexico zijn gebouwd, worden voortdurend geëxporteerd en opnieuw geregistreerd — als importauto naar Nederland of België, als Amerikaanse klassieker, of als pick-up of SUV die via een veiling binnenkomt. Omdat het chassisnummer in de fabriek wordt ingeslagen en nooit verandert, werkt een gratis check hetzelfde, ongeacht in welk land de auto terechtkomt — zolang hij oorspronkelijk voor de Noord-Amerikaanse markt is gebouwd.</p>
                  <p>Dit is het belangrijkste om te begrijpen: het chassisnummer is geen kenteken dat jouw land toekent — het is een productie-identiteit die aan de lopende band wordt aangebracht, lang voordat de auto de fabriek verlaat. Het verandert niet bij export, herregistratie, een nieuw kenteken of meerdere eigenaarswisselingen. Daarom kan een gratis chassisnummer check een auto over grenzen heen volgen op een manier die een kenteken nooit kan.</p>
                  <p>De meeste mensen controleren het chassisnummer pas nadat de prijs al is onderhandeld — terwijl je het juist vóór de bezichtiging doet, vóór je een aanbetaling overmaakt, en nog eens na de aankoop om te bevestigen dat er bij de overdracht niets is verwisseld. Het kost niets en duurt minder dan een minuut.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Importauto Kopen? Doe Dit Eerst</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Een importauto kopen brengt een extra risico met zich mee dat een lokale aankoop niet heeft: de papieren, de verkoper en de werkelijke staat van de auto kunnen uit een land komen dat je nooit hebt bezocht. Een gratis chassisnummer check vervangt geen keuring, maar is het goedkoopste eerste filter dat er bestaat — zonder kosten, voordat je verder gaat.</p>
                  <p>Decodeer eerst het chassisnummer en vergelijk het resultaat — bouwjaar, model, motor, uitvoering — exact met wat de verkoper heeft opgegeven. Elk verschil, zelfs een klein verschil zoals een andere motor, is vaak het eerste teken dat de foto’s in de advertentie en de echte papieren niet bij dezelfde auto horen. Controleer daarna fysiek of het nummer op het dashboard overeenkomt met dat in het chassis en op de sticker in de deurstijl, en met het kentekenbewijs. Een afwijking tussen deze plekken is een van de duidelijkste signalen van een vervalst chassisnummer.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Chassisnummer in Nederland en België</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Nederland</strong> — het chassisnummer staat in het kentekenbewijs (deel 1B of de kentekencard) en wordt door de RDW geregistreerd. De RDW toont publiek niet het volledige chassisnummer, dus de koppeling tussen auto en papieren controleer je fysiek: vergelijk het nummer op de auto met dat op het kentekenbewijs. Is het nummer onleesbaar of ontbreekt het, dan kan de RDW een identiteitsonderzoek uitvoeren. Bij import komt de auto na keuring bij de RDW op Nederlands kenteken.</p>
                  <p><strong className="text-foreground">België</strong> — de DIV (Dienst voor Inschrijving van Voertuigen) registreert het chassisnummer in het inschrijvingsbewijs. Voor de kilometerstand speelt Car-Pass een rol, maar zoals bij elke importauto geldt: zonder zekerheid over de oorsprong is een eerste, gratis controle van de fabrieksspecificaties een slimme stap, vooral bij Amerikaanse pick-ups en SUV’s.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Chassisnummer vs VIN vs Motornummer — Wat is het Verschil?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Chassisnummer en VIN zijn exact dezelfde code van 17 tekens. <strong className="text-foreground">VIN</strong> is de internationale term, <strong className="text-foreground">chassisnummer</strong> (of VIN-nummer) de Nederlandse. Het <strong className="text-foreground">motornummer</strong> is iets anders: het staat op het motorblok zelf en identificeert alleen die motor, niet het hele voertuig. Is een motor ooit rechtmatig vervangen, dan kan het motornummer afwijken, terwijl het chassisnummer het hele leven van de auto hetzelfde blijft. Deze tool decodeert het chassisnummer, niet het motornummer.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Zo Lees je een Chassisnummer: Wat Elk Deel Betekent</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>De 17 tekens zijn niet willekeurig. Positie 1–3 geven de fabrikant en het land van assemblage aan — zo weet de decoder of een auto in de VS, Canada, Mexico of elders is gebouwd. Positie 4–8 beschrijven het voertuig: carrosserie, motor en serie. Positie 9 is een wiskundig berekend controlecijfer waarmee een verkeerd overgenomen of vervalst nummer wordt opgespoord. Positie 10 codeert het modeljaar en positie 12–17 vormen het unieke productienummer van het voertuig.</p>
                  <p>Zelf deze delen kunnen lezen blijft nuttig, ook met een decoder bij de hand, omdat je het resultaat in seconden kunt controleren. Toont positie 10 een modeljaar 2015 terwijl de verkoper 2018 opgeeft, vraag er dan direct naar — dat is geen beschuldiging, maar een gratis controle van dertig seconden.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Voor Alle Merken — Ford, Toyota, Honda, Chevrolet en Meer</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Dit is geen tool voor één merk. Omdat hij rechtstreeks uit de fabrikantendatabase van de NHTSA leest, werkt dezelfde decoder voor Ford, Toyota, Honda, Chevrolet, GMC, Nissan, Jeep, Hyundai en elk ander merk dat op de Noord-Amerikaanse markt wordt verkocht. Plak gewoon de code van 17 tekens — de decoder herkent automatisch het juiste fabrikantschema, zonder dat je het merk hoeft op te geven.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Chassisnummer Check vs Volledig Voertuigrapport</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Een <strong className="text-foreground">gratis chassisnummer check</strong> laat zien hoe de auto de fabriek verliet — de productiespecificaties. Wat er sindsdien is gebeurd — ongevallen, een teruggedraaide kilometerstand, total loss of waterschade — zie je alleen in een betaald <strong className="text-foreground">voertuigrapport</strong> zoals Carfax of AutoCheck. Bij elke tweedehands aankoop van enige waarde raden we een betaald rapport sterk aan, naast deze gratis specificatiecontrole.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Chassisnummer Controleren — Veelgestelde Vragen</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: 'Is deze chassisnummer check echt gratis?', a: 'Ja. 100% gratis via de openbare NHTSA-API. Geen account of login nodig. Je kunt zoveel checks doen als je wilt, vanuit elk land.' },
                { q: 'Waarvoor dient het chassisnummer van een auto?', a: 'Het chassisnummer identificeert één specifiek voertuig voor het controleren van specificaties, het opzoeken van de historie, registratie, verzekering en terugroepacties. In Nederland en België moet het overeenkomen met de officiële papieren bij elke registratie en overschrijving.' },
                { q: 'Kan ik specificaties via het chassisnummer gratis opvragen?', a: 'Ja. Onze gratis tool geeft merk, model, bouwjaar, motor, carrosserietype, transmissie en herkomst rechtstreeks uit de NHTSA-fabrikantendatabase, zonder kosten, voor voertuigen met Amerikaanse, Canadese of Mexicaanse specificatie.' },
                { q: 'Werkt het voor auto’s die uit de VS naar Nederland of België zijn geïmporteerd?', a: 'Ja, voor elk voertuig dat oorspronkelijk voor de Noord-Amerikaanse markt is gebouwd — een veelvoorkomend geval bij importeurs van pick-ups en klassiekers. Voertuigen met uitsluitend Europese specificatie verschijnen mogelijk niet.' },
                { q: 'Hoe weet ik of een chassisnummer echt is?', a: 'Een geldig chassisnummer heeft precies 17 tekens — letters (A–Z, zonder I, O, Q) en cijfers. Positie 9 is een wiskundig controlecijfer. Klopt dat niet, dan is het nummer gemanipuleerd. Deze tool controleert dit automatisch.' },
                { q: 'Wat als de check geen resultaat geeft?', a: 'Meestal betekent dit dat het voertuig van Europese of Aziatische herkomst is, of een specificatie voor een andere markt heeft — buiten de NHTSA-database. Het modeljaar wordt wel gedecodeerd uit positie 10. Neem dan contact op met de officiële VIN-service van de fabrikant of raadpleeg de RDW.' },
                { q: 'Is het motornummer hetzelfde als het chassisnummer?', a: 'Nee. Het motornummer staat op het motorblok en identificeert alleen die motor; het chassisnummer identificeert het hele voertuig. Deze tool decodeert het chassisnummer, niet het afzonderlijke motornummer.' },
                { q: 'Beïnvloedt het chassisnummer de invoerrechten?', a: 'Indirect wel. Veel landen berekenen invoerrechten op basis van leeftijd en cilinderinhoud, beide bevestigd door het chassisnummer. Juist decoderen vóór je de rechten berekent, voorkomt dat je met verkeerde cijfers plant.' },
                { q: 'Laat de check zien of de auto een ongeluk heeft gehad?', a: 'Nee. De gratis check toont alleen productiespecificaties — merk, model, bouwjaar, motor en herkomst. Schadehistorie, kilometerstand en total-lossstatus vereisen een betaald rapport zoals Carfax of AutoCheck.' },
                { q: 'Kan ik via het chassisnummer zien of een auto gestolen is?', a: 'Niet met deze tool. Het opsporen van gestolen voertuigen is een taak van politie en verzekeraars — het NICB (de Amerikaanse instantie tegen verzekeringsfraude) biedt hiervoor de gratis tool VINCheck aan, los van een specificatiedecoder. Twijfel je in Nederland aan de herkomst, meld het dan bij de politie of de RDW.' },
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
              Meer Gratis Gereedschappen
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/gereedschappen/virtuele-monteur" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Virtuele AI-Monteur</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/gereedschappen/wat-is-mijn-auto-waard" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Wat is Mijn Auto Waard?</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
              <Link href="/gereedschappen/afstandscalculator-nederland" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all">
                <p className="text-sm font-bold text-sky-700 dark:text-sky-400">Afstandscalculator Nederland</p>
                <ChevronRight className="h-4 w-4 text-sky-500" />
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
