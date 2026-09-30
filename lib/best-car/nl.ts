// lib/best-car/nl.ts — Dutch strings for "Beste Auto Voor Jou" (/gereedschappen/beste-auto-voor-jou)
import type { BestCarStrings } from '@/lib/best-car/types';

export const nl: BestCarStrings = {
  lang: 'nl',
  locale: 'nl-NL',
  localeByCountry: { nl: 'nl-NL', be: 'nl-BE' },
  dir: 'ltr',
  latin: true,

  path: '/gereedschappen/beste-auto-voor-jou',
  homePath: '/startpagina',
  hubPath: '/gereedschappen',
  aboutPath: '/about',
  comparePath: '/tools/car-comparison',
  fuelPath: '/tools/fuel-cost-calculator-global',
  valuationPath: '/gereedschappen/wat-is-mijn-auto-waard',

  defaultCountry: 'nl',
  priorityCountries: ['nl', 'be', 'de', 'fr', 'gb', 'us'],
  picksCountry: 'nl',

  nav: { home: 'Startpagina', tools: 'Gereedschappen', current: 'Beste Auto Voor Jou', back: 'Terug naar Gereedschappen', breadcrumb: 'Kruimelpad' },

  meta: {
    title: 'Beste Auto Voor Jou 2026 — Autoadviseur per Gebruik, {countries} Landen',
    description:
      'Vind de beste auto voor jouw situatie, met prijzen in je eigen valuta in {countries} landen. Kies je gebruik — gezinsauto, zakelijk, snelweg, klein budget, terrein, directie of eerste auto — en krijg een top 5 uit {globalCars} modellen, beoordeeld op onderhoudskosten, onderdelen en verbruik.',
    keywords: [
      'beste auto kopen 2026', 'beste gezinsauto', 'beste auto voor zakelijk gebruik', 'autoadviseur',
      'welke auto moet ik kopen', 'beste suv 2026', 'auto met laagste onderhoudskosten', 'beste eerste auto',
      'beste auto voor de snelweg', 'beste zakelijke auto', 'zuinigste auto', 'autoadvies',
      'beste goedkope auto', 'beste terreinwagen', 'beste auto nederland', 'beste auto belgië',
      'betrouwbaarste auto', 'beste auto kiezen', 'naira autos',
    ],
    ogTitle: 'Beste Auto Voor Jou 2026 — Autoadviseur | Naira Autos',
    ogDescription: 'Wereldwijde autoadviseur met lokale prijzen in {countries} landen. Kies je gebruik en krijg de top 5, gerangschikt op onderhoudskosten, verbruik en beschikbaarheid van onderdelen.',
    ogLocale: 'nl_NL',
  },

  hero: {
    badge: 'Gratis Tool',
    verified: 'Prijzen gecontroleerd',
    h1: 'Beste Auto Voor Jou',
    intro:
      'Kies je land en je gebruik en ontvang een gerangschikt advies met prijzen in je eigen valuta in {countries} landen — beoordeeld op onderhoudskosten, beschikbaarheid van onderdelen, verbruik en bodemvrijheid. {globalCars} modellen, van de Toyota Corolla tot de Bugatti Chiron.',
  },

  ui: {
    countryLabel: 'Land en Valuta',
    popularCountries: 'Belangrijkste markten',
    otherCountries: 'Alle andere landen',
    africaNote: 'Bevat {usedCars} oudere geïmporteerde tweedehands modellen die typisch zijn voor deze regio, naast de {globalCars} wereldwijde modellen.',
    prompt: 'Waarvoor heb je de auto nodig?',
    rankedBy: 'Gerangschikt op:',
    topRecs: 'Top {n} aanbevelingen — {country}',
    emptyState: 'Kies hierboven een gebruik om aanbevelingen te zien',
    match: 'Match',
    electric: 'Elektrisch',
    electricMotor: 'Elektromotor',
    seatsFmt: '{n} zitplaatsen',
    bootFmt: '{n} L kofferbak',
    consumptionUnit: 'L/100 km',
    showDetails: 'Details bekijken — problemen en aandachtspunten',
    hideDetails: 'Details verbergen',
    commonIssues: 'Veelvoorkomende problemen:',
    estIn: 'geschat in {country}',
    copyLink: 'Link kopiëren',
    linkCopied: 'Link gekopieerd',
  },

  enums: {
    maintenance: { Low: 'Laag', Medium: 'Gemiddeld', High: 'Hoog', 'Very High': 'Zeer hoog' },
    spareParts: { Easy: 'Makkelijk', Moderate: 'Gemiddeld', Hard: 'Moeilijk' },
    bodyType: {
      Sedan: 'Sedan', Convertible: 'Cabrio', Coupe: 'Coupé', SUV: 'SUV', Pickup: 'Pick-up',
      Hatchback: 'Hatchback', Wagon: 'Stationwagen', Minivan: 'MPV', Bus: 'Bus',
    },
    fuelType: { Petrol: 'Benzine', Hybrid: 'Hybride', 'Petrol Hybrid': 'Benzine-hybride', Electric: 'Elektrisch', Diesel: 'Diesel' },
    transmission: {
      Automatic: 'Automaat', Manual: 'Handgeschakeld', CVT: 'CVT', eCVT: 'eCVT', DCT: 'DCT', PDK: 'PDK', DSG: 'DSG',
      'Single-speed': 'Eén versnelling', '8-speed DCT': '8-traps DCT', '2-speed (rear)': '2 versnellingen (achter)',
      'Single/2-speed': 'Eén/2 versnellingen', 'Single / dual-motor': 'Enkele / dubbele motor',
      'Single-speed (simulated gears)': 'Eén versnelling (gesimuleerde versnellingen)',
    },
  },

  useCases: {
    family:        { label: 'Gezinsauto', icon: '👨‍👩‍👧‍👦', description: 'Ruimte, veiligheid en betrouwbaarheid voor het hele gezin', priorities: 'Zitplaatsen · Kofferbak · Betrouwbaarheid · Prijs', pickTitle: 'Beste Gezinsauto' },
    commercial:    { label: 'Zakelijk / Taxi', icon: '🚖', description: 'Gebouwd voor dagelijks zakelijk gebruik met veel kilometers', priorities: 'Duurzaamheid · Goedkope onderdelen · Verbruik', pickTitle: 'Beste voor Zakelijk Gebruik' },
    highway:       { label: 'Snelweg en Lange Ritten', icon: '🛣️', description: 'Comfortabel en stabiel op lange afstanden', priorities: 'Verbruik · Motorvermogen · Betrouwbaarheid', pickTitle: 'Beste voor de Snelweg' },
    budget:        { label: 'Klein Budget', icon: '💰', description: 'De beste waarde voor je geld als het krap is', priorities: 'Lage aanschafprijs · Laag onderhoud', pickTitle: 'Beste Budgetkoop' },
    offroad:       { label: 'Terrein / Slechte Wegen', icon: '🪨', description: 'Hoge bodemvrijheid voor lastig terrein en slechte wegen', priorities: 'Bodemvrijheid · Duurzaamheid · Onderdelen', pickTitle: 'Beste Terreinauto' },
    executive:     { label: 'Directie / Zakelijk Representatief', icon: '💼', description: 'Uitstraling, comfort en merkimago voor professionals', priorities: 'Prestige · Motor · Gebruikskosten', pickTitle: 'Beste Directieauto' },
    firstcar:      { label: 'Eerste Auto', icon: '🎓', description: 'Makkelijk te rijden, vergevingsgezind en goedkoop te onderhouden', priorities: 'Laag onderhoud · Makkelijke onderdelen · Betrouwbaarheid', pickTitle: 'Beste Eerste Auto' },
    fuelefficient: { label: 'Zuinig / Energiezuinig', icon: '⛽', description: 'De laagste gebruikskosten per kilometer', priorities: 'Brandstof- of energieverbruik · Onderhoud · Onderdelen', pickTitle: 'Zuinigste' },
  },

  seo: {
    reviewedByLabel: 'Beoordeeld door:',
    reviewer: 'Redactieteam van Naira Autos',
    updatedLabel: 'Inhoud bijgewerkt:',
    picksHeading: 'Beste Auto’s per Gebruik — 2026',
    picksNote:
      'Deze lijsten zijn gemaakt met dezelfde score die de tool zelf gebruikt, voor een referentiemarkt. De exacte rangschikking en prijzen passen zich aan het land aan dat je hierboven kiest; voor Afrikaanse landen komen er oudere geïmporteerde tweedehands modellen bij.',
    faqHeading: 'Veelgestelde Vragen',
    moreToolsHeading: 'Meer gratis tools',
    disclaimer:
      'Prijzen zijn schattingen voor {countries} markten, geen offertes. De beoordelingen van onderhoud en onderdelen zijn redactionele inschattingen en kunnen per markt verschillen. Controleer een auto altijd zelf, bekijk de voertuighistorie en vraag een lokale offerte aan voordat je koopt.',
    sections: [
      {
        h2: 'Zo werkt de autoadviseur',
        paragraphs: [
          '“Beste Auto Voor Jou” rangschikt {totalCars} voertuigen naar de manier waarop je een auto werkelijk gaat gebruiken. Je kiest een land en een gebruik — gezin, zakelijk of taxi, snelweg, klein budget, terrein, directie, eerste auto of zuinigheid — en de tool beoordeelt elk model dat in die markt wordt verkocht of veel wordt geïmporteerd en toont de beste vijf. Elke score loopt van 0 tot 100 en combineert alleen meetbare factoren: onderhoudskosten, beschikbaarheid van onderdelen, brandstof- of energieverbruik, bodemvrijheid, aantal zitplaatsen, kofferbakruimte, motorinhoud en aanschafprijs.',
          'De weging verschilt per gebruik. Voor een taxi of bezorgauto vormen onderhoud en beschikbaarheid van onderdelen samen 70% van de score. Voor wie een terreinauto zoekt, telt bodemvrijheid alleen al voor de helft. Bij een eerste auto wegen betrouwbaarheid en makkelijk verkrijgbare onderdelen veel zwaarder dan vermogen.',
          'De rangschikking is in elk land bewust gelijk. De score gebruikt de basisprijs van elke auto in Amerikaanse dollars, dus van Amsterdam naar Antwerpen wisselen verandert de prijs die je ziet, niet de volgorde van de lijst. Zo blijft het advies over de auto zelf gaan, terwijl de schatting onder elk resultaat meebeweegt met je valuta en met de gebruikelijke belastingen en heffingen van jouw markt. De tool omvat {countries} landen: {globalCars} modellen worden overal vergeleken en in Afrikaanse markten komen er {usedCars} geïmporteerde tweedehands modellen bij.',
        ],
      },
      {
        h2: 'Begin bij je dagelijks gebruik, niet bij het specificatieblad',
        paragraphs: [
          'De beste auto voor jou hangt minder af van de specificaties en meer van je **werkelijke dagelijkse gebruik**. Een auto die op papier schittert, kan een slechte keuze zijn als de dichtstbijzijnde monteur die hem kent ver weg zit, of als de lage bodemvrijheid je dagelijkse rit in een hindernisbaan verandert.',
          'Bij **zakelijk gebruik en taxiritten** gaat het om betrouwbaarheid bij veel kilometers en lage onderdelenkosten per kilometer. De Toyota Corolla en Toyota Camry zie je in veel landen in taxi- en bezorgvloten omdat hun motoren eenvoudig zijn, een overgeslagen beurt verdragen en vrijwel elke monteur ze kan repareren.',
          'Bij **directiegebruik** telt merkimago echt, maar het mag de gebruikskosten niet overrulen. De Mercedes-Benz S-Klasse heeft hier de onderhoudsscore “Zeer hoog”: luchtvering en complexe elektronica kunnen van één reparatie een rekening van vier cijfers maken. Veel professionals zijn beter af met een goed onderhouden gewone sedan dan met een luxe auto met veel kilometers en oplopende reparatiekosten.',
          'Voor **eerste auto’s** is het belangrijkst dat de monteur het model kent. Een auto waarvan de storingen een speciale diagnose vragen, is langzamer en duurder te repareren. Toyota- en Honda-modellen met motoren onder 2,5 liter hebben overal het grootste ecosysteem van onderdelen, garages en online adviezen.',
          'Voor **gezinnen** tellen zitplaatsen en kofferbak, maar ook de prijs van een SUV met drie zitrijen die je misschien niet nodig hebt. Daarom beloont de gezinsscore ook een lagere aanschafprijs: een vijfzits crossover bedient een gezin van vier vaak net zo goed als een veel groter voertuig, voor een fractie van de kosten.',
          'Voor **terrein en slechte wegen** kijk je eerst naar bodemvrijheid en daarna naar de aandrijving. Zo’n 250 mm maakt gaten, overstroomde straten en onverharde wegen beheersbaar, terwijl een sedan van 140 mm in de stad met voorzichtig rijden kan werken — maar drempels en wateroverlast blijven een terugkerend probleem.',
        ],
      },
      {
        h2: 'Totale eigendomskosten wegen zwaarder dan de prijs op het bordje',
        paragraphs: [
          'Een goedkopere auto is niet altijd de voordeligere. Over vijf jaar kunnen brandstof, onderhoud, verzekering, banden en reparaties de aanschafprijs evenaren, vooral in markten waar geïmporteerde onderdelen traag aankomen. Twee auto’s met een vergelijkbare prijs kunnen duizenden euro’s verschillen in eigendomskosten, simpelweg omdat de ene onderdelen deelt met miljoenen andere voertuigen en de andere een onderdeel nodig heeft dat alleen bij de dealer te krijgen is.',
          'Gebruik de onderhouds- en onderdelenlabels bij elk resultaat als snelle indicatie van die verborgen kosten en haal je shortlist daarna door de [Brandstofkostencalculator](/tools/fuel-cost-calculator-global) om het verbruik om te zetten in een maandelijkse schatting voor jouw aantal kilometers. Ook de inruilwaarde telt: in veel markten houden gangbare Japanse en Koreaanse modellen hun waarde beter vast dan niche- of onderhoudsintensieve merken, wat de werkelijke kosten van bezit verlaagt.',
        ],
      },
      {
        h2: 'Nederland en België: wat lokaal meetelt',
        paragraphs: [
          'In Nederland hangt de kostenberekening sterk af van belastingen. Bij aanschaf speelt de BPM een rol, die schonere auto’s bevoordeelt, en daarnaast betaal je motorrijtuigenbelasting die afhangt van gewicht, brandstof en uitstoot. Auto’s moeten periodiek door de APK, en in steeds meer steden gelden milieuzones voor oudere dieselauto’s. Omdat elektrisch rijden en laadpalen in Nederland sterk zijn uitgebouwd, kan een elektrische of hybride auto hier eerder lonen dan in landen met weinig laadinfrastructuur — zeker bij veel woon-werkkilometers.',
          'In België is de salariswagen van de werkgever veel gebruikelijker dan in de meeste andere landen, en die fiscale regels bepalen vaak welke auto je kiest. Steden als Antwerpen, Gent en Brussel hebben lage-emissiezones, en voor particulieren zijn verkeersbelasting en de technische keuring vaste kosten. Wie vaak de grens oversteekt, doet er goed aan te checken of een model in beide landen makkelijk onderhouden en verzekerd kan worden.',
          'Buiten Europa ziet de markt er anders uit: in veel Afrikaanse landen zijn geïmporteerde tweedehands auto’s, vaak tien tot twintig jaar oud, de norm. Kies je zo’n land, dan voegt de tool {usedCars} oudere modellen toe met typische problemen en keuringstips voor tweedehands kopers. De Golfstaten combineren lage belastingen met goedkope brandstof, waardoor grote SUV’s en V6-motoren daar anders uitpakken dan in landen met hoge belastingen. Daarom bestaat de landkeuze: dezelfde auto kan in de ene markt een verstandige aankoop zijn en in de andere een dure luxe.',
        ],
      },
      {
        h2: 'Zo lees je de beoordelingen van onderhoud en onderdelen',
        paragraphs: [
          '**Onderhoudskosten** geven de gebruikelijke lopende kosten weer om een model op de weg te houden, vergeleken met de andere: Laag, Gemiddeld, Hoog of Zeer hoog. **Beschikbaarheid van onderdelen** geeft aan hoe makkelijk vervangende onderdelen te vinden zijn: Makkelijk, Gemiddeld of Moeilijk. Beide zijn redactionele beoordelingen op basis van de reputatie van het model, gebruikelijke servicetarieven en onderdelennetwerken. Het is geen offerte van een garage en kan per markt verschillen.',
          'Zie “Laag” en “Makkelijk” als een sterk signaal. Zie “Hoog” of “Moeilijk” als aanleiding om lokale monteurs te raadplegen voordat je je vastlegt. Elk resultaat toont ook veelvoorkomende problemen en een aandachtspunt voor dat specifieke model — lees ze voordat je de auto gaat bekijken.',
        ],
      },
      {
        h2: 'Hoe landprijzen worden geschat — en wat de grenzen zijn',
        paragraphs: [
          'Elke auto heeft een basisprijs in Amerikaanse dollars, een bij benadering genomen bedrag voor de instapuitvoering 2025–2026. Voor een lokale prijs vermenigvuldigt de tool die basis met een landspecifieke marktfactor — een richtinggevende schatting van invoerrechten, accijnzen, btw en de gebruikelijke dealermarge — en met een wisselkoers. Omdat wisselkoersen en belastingregels veranderen, is het resultaat een startpunt voor je budget, geen offerte.',
          'Sommige modellen worden in bepaalde landen helemaal niet nieuw verkocht, en uitvoeringen, opties en de staat van een tweedehands auto kunnen de echte prijs ver van deze schattingen brengen. Controleer het bij lokale advertenties of een dealer voordat je je definitieve budget vaststelt.',
        ],
      },
      {
        h2: 'Van shortlist naar beslissing',
        paragraphs: [
          'Kies je gebruik, open bij elk van de topresultaten **Details bekijken** en noteer de veelvoorkomende problemen. Vergelijk je twee favorieten naast elkaar met de [Autovergelijker](/tools/car-comparison). Controleer voordat je voor een tweedehands auto betaalt de geschiedenis met de [VIN-checker](/tools/vin-checker-global) en laat een onafhankelijke technische keuring uitvoeren. Heb je de auto eenmaal, dan helpt [Wat is mijn auto waard?](/gereedschappen/wat-is-mijn-auto-waard) je de waarde te volgen. Met **Link kopiëren** deel je precies het gekozen land en gebruik met je partner of monteur.',
        ],
      },
    ],
    exampleTitle: 'Voorbeeld: de auto afstemmen op het werkelijke gebruik',
    exampleBody:
      'Illustratief scenario, geen klantcase. Stel je de eigenaar van een kleine koeriersdienst in een grote stad voor, die zich aangetrokken voelt tot een zeven-zits SUV vanwege de laadruimte. In de zakelijke rangschikking scoren de Toyota Corolla en Toyota RAV4 echter hoger dan grotere voertuigen, omdat zijn werkelijke routes korte stop-and-go-ritten met gemiddelde lading zijn, waarbij onderdelenkosten per kilometer en verbruik zwaarder wegen dan pure laadruimte. De scores zeggen niet dat de SUV een slecht voertuig is — ze zeggen dat hij minder goed past bij dat gebruikspatroon. Het geld dat hij bespaart op aanschaf en brandstof kan als werkkapitaal in het bedrijf blijven.',
  },

  related: { compare: 'Autovergelijker', fuel: 'Brandstofkostencalculator', valuation: 'Wat is mijn auto waard?' },

  faqs: [
    { q: 'Toont deze tool echte prijzen voor mijn land?', a: 'Hij toont een schatting, geen live offerte. Elke auto heeft een basisprijs in Amerikaanse dollars; door je land te kiezen worden de typische belasting- en invoerfactor van die markt en een wisselkoers toegepast om een lokale prijs te schatten. Bevestig het bij een dealer of lokale advertentie voordat je precies begroot.' },
    { q: 'Hoe worden de auto’s beoordeeld?', a: 'Elke auto krijgt per gebruik een score van 0 tot 100 op basis van meetbare factoren — onderhoudskosten, beschikbaarheid van onderdelen, verbruik, bodemvrijheid, zitplaatsen, kofferbak, motorinhoud en aanschafprijs — met een andere weging per gebruik. De rangschikking verandert niet per land, alleen de getoonde prijs.' },
    { q: 'Wat is de beste gezinsauto om te kopen?', a: 'In onze rangschikking staan {picks:family} bovenaan voor gezinsgebruik, met een balans tussen zitplaatsen, kofferbak, betrouwbaarheid en prijs. Grote gezinnen moeten het aantal zitplaatsen in de details van elk resultaat controleren.' },
    { q: 'Wat is de beste auto voor zakelijk gebruik of als taxi?', a: 'Voor zakelijk gebruik met veel kilometers zijn de top drie {picks:commercial}. Ze combineren lage onderhoudskosten, makkelijke onderdelen en redelijk verbruik, wat de kosten per kilometer laag houdt.' },
    { q: 'Wat is de beste auto voor slechte of onverharde wegen?', a: 'Bodemvrijheid en duurzaamheid staan bovenaan deze rangschikking. De huidige top drie is {picks:offroad}. Voor alleen stadsgebruik is een sedan met voorzichtig rijden te doen, maar wateroverlast en drempels zijn een test voor lage auto’s.' },
    { q: 'Wat is de beste eerste auto?', a: 'De beste keuzes voor een eerste auto zijn {picks:firstcar}: laag onderhoud, makkelijke onderdelen en monteurs die ze overal kennen. Vermijd exotische en ultraluxe merken als eerste auto — de onderdelen zijn duur en je hebt gespecialiseerde monteurs nodig.' },
    { q: 'Welke auto’s zijn het zuinigst in brandstof of energie?', a: 'Hybrides en elektrische auto’s staan voorop: {picks:fuelefficient}. Een elektrische auto is alleen zinvol als je betrouwbaar kunt laden waar je woont en rijdt, dus controleer de laaddekking voordat je beslist.' },
    { q: 'Waarom tonen Afrikaanse landen oudere tweedehands modellen?', a: 'In veel Afrikaanse markten zijn geïmporteerde tweedehands auto’s de gebruikelijke manier om een auto te kopen. Kies je een Afrikaans land, dan voegt de tool {usedCars} oudere modellen toe met typische tweedehandsproblemen en keuringstips, naast de {globalCars} wereldwijde modellen.' },
  ],

  schema: {
    appName: 'Beste Auto Voor Jou — autoadviseur per gebruik',
    appDescription: 'Gratis autoadviseur: kies een land en gebruik en krijg een top 5 uit {totalCars} auto’s, met geschatte lokale prijzen in {countries} landen.',
    publisher: 'Naira Autos',
    author: 'Redactieteam van Naira Autos',
  },
};
