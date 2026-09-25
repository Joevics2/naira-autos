import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ChevronDown, CheckCircle2, Check } from 'lucide-react';
import AIMechanicClientNL from './client';

// ── Metadata ────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Virtuele Monteur met AI — Gratis Auto Diagnose Online | Naira Autos',
  description: 'Gratis virtuele monteur met kunstmatige intelligentie. Beschrijf de storing, upload foto\'s, geluid of video van het probleem en krijg direct een diagnose met reparatiekosten. Geen registratie nodig.',
  alternates: {
    canonical: 'https://www.naira.autos/gereedschappen/virtuele-monteur',
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
    title: 'Axion — Gratis Virtuele Monteur met AI | Naira Autos',
    description: 'Direct een auto diagnose online, waar je ook bent. Upload motorgeluid, foto\'s of beschrijf de storing. Krijg urgentieniveau, waarschijnlijke oorzaken, vervolgstappen en reparatiekosten. Gratis, geen registratie.',
    url: 'https://www.naira.autos/gereedschappen/virtuele-monteur',
    locale: 'nl',
    type: 'website',
  },
  keywords: ['virtuele monteur', 'gratis monteur online', 'auto diagnose online', 'gratis auto diagnose', 'wat is er mis met mijn auto', 'garage online', 'monteur online vragen', 'reparatiekosten auto berekenen', 'monteur met kunstmatige intelligentie', 'auto controleren online', 'diagnose motorgeluid', 'reparatiekosten schatting auto'],
};

// ── Schema ────────────────────────────────────────────────────────

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/gereedschappen/virtuele-monteur',
      name: 'Virtuele Monteur met AI — Gratis Auto Diagnose Online',
      description: 'Gratis virtuele monteur met kunstmatige intelligentie. Upload motorgeluid, foto\'s, of beschrijf de storing. Krijg direct een diagnose met urgentieniveau en reparatiekosten.',
      url: 'https://www.naira.autos/gereedschappen/virtuele-monteur',
      inLanguage: 'nl',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Startpagina', item: 'https://www.naira.autos/startpagina' },
          { '@type': 'ListItem', position: 2, name: 'Gereedschappen', item: 'https://www.naira.autos/gereedschappen' },
          { '@type': 'ListItem', position: 3, name: 'AI Monteur', item: 'https://www.naira.autos/gereedschappen/virtuele-monteur' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wat is een virtuele monteur en hoe werkt het?',
          acceptedAnswer: { '@type': 'Answer', text: 'Een virtuele monteur is een tool die kunstmatige intelligentie gebruikt om storingen aan je auto op afstand te diagnosticeren. Je beschrijft het probleem, uploadt eventueel foto\'s, geluid of video, en de AI vergelijkt alles met een enorme database van bekende storingspatronen om een diagnose te geven met urgentieniveau en geschatte reparatiekosten.' },
        },
        {
          '@type': 'Question',
          name: 'Kan de AI mijn auto alleen aan het motorgeluid diagnosticeren?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ja. Neem het tikkende, piepende of schurende geluid op — zelfs 10 seconden met je telefoon is genoeg. De AI analyseert het geluidspatroon en kan bepalen of het bijvoorbeeld versleten lagers, versleten remblokken of een andere specifieke storing is.' },
        },
        {
          '@type': 'Question',
          name: 'Is het gratis?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ja. Volledig gratis — geen registratie, geen abonnement, geen betaling. Ga naar de pagina en begin direct met diagnosticeren.' },
        },
        {
          '@type': 'Question',
          name: 'Is de AI-diagnose altijd nauwkeurig?',
          acceptedAnswer: { '@type': 'Answer', text: 'Nee — het is niet 100% van de tijd correct. Het is een uitstekend startpunt op basis van de beschrijving, foto, geluid of video die je aanlevert, maar het kan dingen missen die alleen via een fysieke inspectie met een brug en scanner te vinden zijn. Beschouw het als een eerste mening, niet als het definitieve antwoord, en ga bij rem-, stuur- of brandstofstoringen altijd persoonlijk naar een erkende monteur, ongeacht wat de diagnose zegt.' },
        },
        {
          '@type': 'Question',
          name: 'Werkt het met BMW, Mercedes, Toyota of elk ander merk?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ja. Vraag naar een storing bij BMW, Mercedes, Toyota of elk ander merk — de AI dekt alle grote fabrikanten. De reparatiekosten zijn gekalibreerd op de Nigeriaanse markt; gebruik ze in andere landen als algemene richtlijn, niet als exact lokaal bedrag.' },
        },
        {
          '@type': 'Question',
          name: 'Is dit hetzelfde als vragen in een WhatsApp-groep of autoforum?',
          acceptedAnswer: { '@type': 'Answer', text: 'Het is op meerdere manieren beter. In een forum of WhatsApp-groep krijg je de mening van één persoon op basis van een tekstbeschrijving. Onze virtuele monteur analyseert je beschrijving samen met eventuele foto\'s, geluid of video, vergelijkt dit met duizenden bekende storingspatronen, en geeft een diagnose gerangschikt op waarschijnlijkheid met een zekerheidspercentage.' },
        },
        {
          '@type': 'Question',
          name: 'Wordt mijn gespreksgeschiedenis op jullie servers bewaard?',
          acceptedAnswer: { '@type': 'Answer', text: 'Nee. De volledige geschiedenis wordt alleen op je eigen apparaat bewaard, via de lokale opslag van je browser. We bewaren niets op onze servers behalve het actieve bericht dat je voor de diagnose verstuurt. Je kunt je geschiedenis op elk moment wissen via het zijmenu.' },
        },
        {
          '@type': 'Question',
          name: 'Kan ik reparatiekosten krijgen voor elk automerk?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ja. We dekken Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot en elk ander groot merk, ongeacht waar je rijdt. De kosten zijn een internationale richtprijs.' },
        },
        {
          '@type': 'Question',
          name: 'Wat als ik een mobiele monteur of garage in de buurt nodig heb?',
          acceptedAnswer: { '@type': 'Answer', text: 'Onze tool diagnosticeert het probleem eerst, zodat je precies weet wat je moet vragen voordat je op zoek gaat. Als de storing een fysieke inspectie of speciale apparatuur vereist, vertellen we je dat duidelijk.' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Axion — Virtuele Monteur met AI',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'Gratis virtuele monteur met kunstmatige intelligentie. Beschrijf storingen, upload motorgeluid of foto\'s, krijg direct een diagnose met reparatiekosten gekalibreerd op de Nigeriaanse markt.',
      url: 'https://www.naira.autos/gereedschappen/virtuele-monteur',
      inLanguage: 'nl',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    },
  ],
};

export default function AIMechanicPageNL() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <AIMechanicClientNL />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <p className="text-xs text-muted-foreground">Laatst gecontroleerd: augustus 2026</p>

          {/* Volledige dekking */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Volledige Dekking</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Wat Biedt Onze Virtuele Monteur?
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-10">
              Of je nu snel een reparatiekostenschatting nodig hebt, online een monteur wilt vragen voordat je naar de garage gaat, of wilt berekenen wat het herstellen van je auto gaat kosten — deze tool doet het allemaal, gratis.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Diagnose van Motorstoringen', desc: 'Tikkende geluiden, ontstekingsstoringen, onregelmatig stationair draaien, oververhitting, motorstoringslampjes — de AI wijst de meest waarschijnlijke oorzaken aan, gerangschikt op waarschijnlijkheid.' },
                { title: 'Analyse van Geluid en Audio', desc: 'Upload een opname van het tikkende, piepende of schurende geluid. De AI analyseert het geluidspatroon om de storing te herkennen.' },
                { title: 'Direct Urgentieniveau', desc: 'Elke diagnose krijgt een duidelijk oordeel in vier niveaus: Veilig om te Rijden, Goed in de Gaten Houden, Snel naar een Monteur, of Stop Nu met Rijden.' },
                { title: 'Reparatiekosten Online', desc: 'De kosten zijn gekalibreerd op de Nigeriaanse markt als richtlijn — de werkelijke prijs voor onderdelen en arbeid verschilt per land en stad. Gebruik het als startpunt en vraag daarna een lokale offerte.' },
                { title: 'Zelf Aan de Slag', desc: 'Als een storing iets is dat je zelf kunt controleren of repareren, vertellen we je precies hoe — voordat je geld uitgeeft aan een monteur.' },
                { title: 'Doorlopend Gesprek', desc: 'Stel vervolgvragen en krijg antwoorden met volledige context. Elke sessie wordt op je apparaat opgeslagen.' },
                { title: 'Ondersteuning voor Elk Merk', desc: 'Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot en elk ander merk en elke markt.' },
                { title: 'Diagnose via Foto en Video', desc: 'Stuur een foto van waarschuwingslampjes op het dashboard, een ongewoon lek, of zichtbare schade. Elk extra medium verhoogt de zekerheid van de diagnose aanzienlijk.' },
                { title: 'Identificatie van Onderdelen', desc: 'Elke diagnose bevat de specifieke onderdelen die waarschijnlijk betrokken zijn, zodat je precies weet wat je moet bestellen bij elke garage of onderdelenwinkel.' },
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
                Wat is een virtuele monteur met kunstmatige intelligentie?
              </h2>
              <p className="mb-3">Een <strong className="text-foreground">virtuele monteur</strong> is precies wat het klinkt: een monteur met wie je via tekst, foto, geluid of video praat, in plaats van persoonlijk. Je beschrijft wat er met je auto aan de hand is — dat vreemde tikkende geluid bij een koude start, het motorstoringslampje dat niet uitgaat, de remmen die slap aanvoelen — en binnen enkele seconden krijg je een antwoord gebaseerd op diepgaande kennis van echte auto-storingen.</p>
              <p>Axion, onze <strong className="text-foreground">monteur met kunstmatige intelligentie</strong>, werkt voor elk merk en in elk land, maar heeft een extra voordeel voor wie in Nigeria rijdt: het begrijpt hoe vervalste brandstof injectoren aantast, hoe tropische hitte rubberen afdichtingen sneller doet verslijten, en hoe kuilen in de weg de vering sneller beschadigen dan in andere markten.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Hoe je in minder dan een minuut een autodiagnose krijgt
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">1. Beschrijf de storing.</strong> Schrijf op wat er gebeurt — hoe meer details, hoe beter. Wanneer begon het? Gebeurt het alleen bij koude start, bij optrekken, bij het draaien van het stuur?</p>
                <p><strong className="text-foreground">2. Upload een foto, geluidsopname of video (optioneel, maar erg nuttig).</strong> Een geluidsopname van 10 seconden van het motorgeluid is vaak nuttiger dan een hele alinea tekst.</p>
                <p><strong className="text-foreground">3. Ontvang direct je diagnose.</strong> Urgentieniveau, waarschijnlijke oorzaken gerangschikt op waarschijnlijkheid, wat je zelf kunt controleren, en een reparatiekostenschatting.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Reparatiekosten: voorkom dat je te veel betaalt
              </h2>
              <p className="mb-3">Een van de meest voorkomende manieren waarop je te veel betaalt bij een garage, is aankomen zonder te weten wat de reparatie zou moeten kosten. Gebruik onze <strong className="text-foreground">reparatiekosten</strong>-schatting voordat je een garage bezoekt om te weten wat een eerlijke prijs is — onderdelen en arbeid duidelijk uitgesplitst.</p>
              <p>De schatting houdt rekening met je specifieke voertuig — merk, model, bouwjaar — en de meest waarschijnlijke storing op basis van je beschrijving. Het is geen algemeen getal: een Camry uit 2010 met 180.000 km en een lage oliedruk krijgt een andere schatting dan een Camry uit 2020 met 40.000 km met hetzelfde lampje, omdat de waarschijnlijke oorzaak anders is.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Werkt met elk merk: Toyota, BMW, Mercedes, Honda en meer
              </h2>
              <p className="mb-3">Het maakt niet uit wat je rijdt. De AI heeft specifieke storingspatronen voor elke fabrikant — Toyota, Honda, BMW, Mercedes-Benz, Hyundai, Kia, Nissan, Ford, Mitsubishi, Volkswagen en vrijwel elk ander merk dat vandaag op de weg rijdt. Geef één keer merk, model en bouwjaar op, en de diagnose past zich aan wat bekend is over storingen bij dat specifieke voertuig, op die kilometerstand, in plaats van een generiek antwoord te geven dat op elke auto van toepassing zou zijn.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Waarom diagnose via motorgeluid alles verandert
              </h2>
              <p className="mb-3">Beschrijvingen zijn subjectief — "een raar geluid" betekent voor iedereen iets anders. Geluid niet. Een tikkend geluid bij een koude start klinkt anders dan een piepend geluid bij het remmen, en dat klinkt weer anders dan een schurend geluid bij het sturen. Door een opname van 10 seconden te uploaden, geeft de AI je een veel nauwkeurigere diagnose dan met tekst alleen mogelijk is.</p>
              <p>Je hoeft geen professionele apparatuur te gebruiken. De microfoon van je telefoon is genoeg — houd hem gewoon dicht bij de motor of het geluidsbron terwijl je de motor laat draaien, en upload de opname.</p>
            </div>

          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Ondersteunde Voertuigen</h3>
              <div className="flex flex-wrap gap-1.5">
                {['Toyota', 'Honda', 'Lexus', 'Mercedes', 'BMW', 'Kia', 'Hyundai', 'Innoson', 'Mitsubishi', 'Nissan', 'Ford', 'Peugeot', 'Vrachtwagens', 'Bussen', 'Motoren'].map(v => (
                  <span key={v} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">{v}</span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-3">Belangrijkste Feiten</h3>
              <ul className="space-y-2.5">
                {[
                  '100% gratis — geen abonnement',
                  'Geen account of registratie nodig',
                  'Werkt op mobiel en computer',
                  'Internationale richtprijs voor reparaties',
                  '24/7 beschikbaar — ook op zondag',
                  'Gespreksgeschiedenis lokaal opgeslagen',
                  'Onbeperkt aantal vervolgvragen',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                    <Check className="h-3 w-3 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Ook op Naira Autos</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Gratis auto-waardering', href: '/evaluate-car' },
                  { label: 'Motorgeluid Analyzer', href: '/tools/engine-sound-analyzer' },
                  { label: 'Invoerrechten Calculator', href: '/tools/import-duty-calculator' },
                  { label: 'Documentenchecklist', href: '/tools/vehicle-papers-checklist' },
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

          {/* Extra intelligentie */}
          <section className="bg-[#080C10] rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3 block">Extra Intelligentie</span>
                <h2 className="text-3xl font-black uppercase text-white mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Ook Afgestemd op Lokale Wegomstandigheden
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  De diagnose werkt hetzelfde, waar je ook rijdt. Maar de meeste virtuele-monteurtools zijn alleen getraind op data van westerse garages — ze weten niet dat vervalste brandstof in Nigeria de olieviscositeit 40% sneller laat afnemen dan de fabrikant verwacht, of dat de straten van Lagos een homokinetisch gewricht in 30.000 km kunnen slopen dat 150.000 km zou moeten meegaan.
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Axion weet dit ook. Vraag naar het tikkende geluid van je Toyota Corolla na het tanken, en als je in Nigeria zit, overweegt het vervalste brandstof als eerste — want dat is daar statistisch de meest waarschijnlijke oorzaak.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Vervalste brandstof', desc: 'Begrijpt hoe vervalste brandstof kloppingssensoren, injectoren en olieviscositeit beïnvloedt.' },
                  { title: 'Effecten van tropische hitte', desc: 'Houdt rekening met omgevingstemperaturen van 35°C+ die de slijtage van rubberen afdichtingen versnellen.' },
                  { title: 'Schade door kuilen', desc: 'Herkent storingspatronen van vering en banden die specifiek zijn voor slechte wegen.' },
                  { title: 'Lokale onderdelenprijzen', desc: 'Kostenschattingen berekend met data van onderdelenmarkten en geregistreerde garages.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <p className="text-xs font-bold text-white mb-1">{title}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Vergelijking */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Vergelijking</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Virtuele Monteur vs. Andere Opties
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground text-sm">Kenmerk</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">AI Monteur</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Garagebezoek</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Autogroep/Forum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['24/7 beschikbaar', 'Ja', 'Nee', 'Soms'],
                    ['Gratis', 'Ja', 'Nee', 'Ja'],
                    ['Geen reistijd nodig', 'Ja', 'Nee', 'Ja'],
                    ['Kostenschatting', 'Ja', 'Wisselend', 'Nee'],
                    ['Analyseert audio/video', 'Ja', 'Ja', 'Nee'],
                    ['Direct antwoord', 'Ja', 'Nee', 'Soms'],
                    ['Consistente kwaliteit', 'Ja', 'Wisselend', 'Nee'],
                    ['Bewaart geschiedenis', 'Ja', 'Nee', 'Nee'],
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
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Veelgestelde Vragen</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Veelgestelde Vragen
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'Wat is een virtuele monteur en hoe werkt het?', a: 'Het is een tool die kunstmatige intelligentie gebruikt om storingen aan je auto op afstand te diagnosticeren. Je beschrijft het probleem, uploadt optioneel media, en de AI vergelijkt alles met een enorme database van bekende storingen — met kosten gekalibreerd op de Nigeriaanse markt.' },
                { q: 'Is de AI-diagnose altijd nauwkeurig?', a: 'Nee — het is niet 100% van de tijd correct. Het is een goed startpunt, maar kan dingen missen die alleen via een fysieke inspectie met brug en scanner te vinden zijn. Beschouw het als een eerste mening, en ga bij rem-, stuur- of brandstofstoringen altijd persoonlijk naar een monteur.' },
                { q: 'Werkt het met BMW, Mercedes, Toyota of elk ander merk?', a: 'Ja. Vraag naar elk merk — de AI dekt alle grote fabrikanten. De kosten zijn gekalibreerd op de Nigeriaanse markt; in andere landen gebruik je ze als algemene richtlijn.' },
                { q: 'Is dit hetzelfde als vragen in een WhatsApp-groep?', a: 'Het is op meerdere manieren beter. In een forum krijg je de mening van één persoon. Onze service analyseert je beschrijving plus foto\'s, geluid of video, vergelijkt dit met duizenden storingspatronen, en geeft een gerangschikte diagnose met een zekerheidsniveau.' },
                { q: 'Kan het mijn auto alleen aan het motorgeluid diagnosticeren?', a: 'Ja. Audio is een van onze krachtigste invoertypes. Upload een opname van het tikkende, piepende of schurende geluid — zelfs 10 seconden met je telefoon is genoeg. De AI analyseert het geluidspatroon om de waarschijnlijke storing te herkennen.' },
                { q: 'Moet ik een account aanmaken of inloggen?', a: 'Nee. AI Monteur is volledig gratis en vereist geen account, registratie of persoonlijke gegevens. Je voertuiggegevens worden lokaal op je apparaat opgeslagen.' },
                { q: 'Wordt mijn geschiedenis op jullie servers bewaard?', a: 'Nee. De volledige geschiedenis wordt alleen op je apparaat bewaard via lokale browseropslag. We bewaren niets op onze servers behalve het actieve bericht.' },
                { q: 'Hoe nauwkeurig is de reparatiekostenschatting?', a: 'Het is gebaseerd op data van de Nigeriaanse markt — onderdelen en arbeid in garages in Lagos, Abuja en Port Harcourt, als richtlijn. We geven een bereik (minimum tot maximum) zodat je weet wat redelijk is. Als een garage veel boven ons maximum offreert, is het de moeite waard om dit te onderzoeken.' },
                { q: 'Kan ik reparatiekosten krijgen voor elk automerk?', a: 'Ja. We dekken Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot en elk ander groot merk, ongeacht waar je rijdt. De kosten zijn een internationale richtprijs.' },
                { q: 'Wat als ik een mobiele monteur of garage in de buurt nodig heb?', a: 'Onze tool diagnosticeert het probleem eerst, zodat je precies weet wat je moet vragen voordat je op zoek gaat. Als de storing een fysieke inspectie of speciale apparatuur vereist, vertellen we je dat duidelijk — en welk type monteur of garage je moet zoeken.' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none gap-3">
                    <span className="font-semibold text-foreground text-sm leading-relaxed">{q}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Gecontroleerd door <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>, Automonteur. Diagnoselogica en reparatiekosten geverifieerd op technische juistheid.
          </p>

          {/* Laatste CTA */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Klaar? Diagnosticeer Je Auto Nu.
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Gratis. Direct. Geen registratie. Krijg nu meteen je diagnose.
            </p>
            <a href="#axion-chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
              Start Gratis Diagnose
            </a>
          </section>

          {/* Meer tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Meer Gratis Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/vin-checker',              label: 'VIN Controle',              color: 'blue' },
                { href: '/tools/vehicle-papers-checklist', label: 'Documentenchecklist',       color: 'violet' },
                { href: '/tools/import-duty-calculator',   label: 'Invoerrechten Calculator',  color: 'emerald' },
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
