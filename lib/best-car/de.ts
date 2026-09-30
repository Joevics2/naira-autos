// lib/best-car/de.ts — German strings for "Bestes Auto Für Sie" (/werkzeuge/bestes-auto-fuer-sie)
import type { BestCarStrings } from '@/lib/best-car/types';

export const de: BestCarStrings = {
  lang: 'de',
  locale: 'de-DE',
  localeByCountry: { de: 'de-DE', at: 'de-AT', ch: 'de-CH' },
  dir: 'ltr',
  latin: true,
  symbolAfter: true,

  path: '/werkzeuge/bestes-auto-fuer-sie',
  homePath: '/startseite',
  hubPath: '/werkzeuge',
  aboutPath: '/about',
  comparePath: '/tools/car-comparison',
  fuelPath: '/tools/fuel-cost-calculator-global',
  valuationPath: '/werkzeuge/was-ist-mein-auto-wert',

  defaultCountry: 'de',
  priorityCountries: ['de', 'at', 'ch', 'nl', 'be', 'pl', 'it', 'fr'],
  picksCountry: 'de',

  nav: { home: 'Startseite', tools: 'Werkzeuge', current: 'Bestes Auto Für Sie', back: 'Zurück zu den Werkzeugen', breadcrumb: 'Brotkrümelnavigation' },

  meta: {
    title: 'Bestes Auto Für Sie 2026 — Autoberater nach Verwendungszweck, {countries} Länder',
    description:
      'Finden Sie das beste Auto für Ihre Bedürfnisse, mit Preisen in Ihrer Währung in {countries} Ländern. Wählen Sie Ihren Einsatzzweck — Familienauto, Gewerbe, Autobahn, kleines Budget, Gelände, Business oder erstes Auto — und erhalten Sie eine Top-5-Rangliste aus {globalCars} Modellen, bewertet nach Wartungskosten, Ersatzteilen und Verbrauch.',
    keywords: [
      'bestes auto kaufen 2026', 'bestes familienauto', 'bestes auto für gewerbliche nutzung', 'autoberater',
      'welches auto soll ich kaufen', 'bester suv 2026', 'auto mit günstigsten wartungskosten', 'bestes erstes auto',
      'bestes auto für die autobahn', 'bestes businessauto', 'sparsamstes auto', 'autoempfehlung',
      'bestes günstiges auto', 'bestes geländewagen', 'bestes auto deutschland', 'bestes auto österreich',
      'bestes auto schweiz', 'auto kaufberatung', 'zuverlässigstes auto', 'naira autos',
    ],
    ogTitle: 'Bestes Auto Für Sie 2026 — Autoberater | Naira Autos',
    ogDescription: 'Globaler Autoberater mit lokalen Preisen in {countries} Ländern. Wählen Sie Ihren Einsatzzweck und erhalten Sie die Top 5, geordnet nach Wartungskosten, Verbrauch und Ersatzteilverfügbarkeit.',
    ogLocale: 'de_DE',
  },

  hero: {
    badge: 'Kostenloses Werkzeug',
    verified: 'Preise geprüft',
    h1: 'Bestes Auto Für Sie',
    intro:
      'Wählen Sie Ihr Land und Ihren Einsatzzweck und erhalten Sie eine Rangliste mit Preisen in Ihrer Währung in {countries} Ländern — bewertet nach Wartungskosten, Ersatzteilverfügbarkeit, Verbrauch und Bodenfreiheit. {globalCars} Modelle, vom Toyota Corolla bis zum Bugatti Chiron.',
  },

  ui: {
    countryLabel: 'Land & Währung',
    popularCountries: 'Wichtige Märkte',
    otherCountries: 'Alle anderen Länder',
    africaNote: 'Enthält {usedCars} ältere Gebrauchtimport-Modelle dieser Region zusätzlich zu den {globalCars} globalen Modellen.',
    prompt: 'Wofür brauchen Sie das Auto?',
    rankedBy: 'Bewertet nach:',
    topRecs: 'Top {n} Empfehlungen — {country}',
    emptyState: 'Wählen Sie oben einen Einsatzzweck, um Empfehlungen zu sehen',
    match: 'Passung',
    electric: 'Elektrisch',
    electricMotor: 'Elektromotor',
    seatsFmt: '{n} Sitze',
    bootFmt: '{n} L Kofferraum',
    consumptionUnit: 'L/100 km',
    showDetails: 'Details ansehen — Schwachstellen & Hinweise',
    hideDetails: 'Details ausblenden',
    commonIssues: 'Häufige Probleme:',
    estIn: 'geschätzt in {country}',
    copyLink: 'Link kopieren',
    linkCopied: 'Link kopiert',
  },

  enums: {
    maintenance: { Low: 'Niedrig', Medium: 'Mittel', High: 'Hoch', 'Very High': 'Sehr hoch' },
    spareParts: { Easy: 'Leicht', Moderate: 'Mittel', Hard: 'Schwierig' },
    bodyType: {
      Sedan: 'Limousine', Convertible: 'Cabrio', Coupe: 'Coupé', SUV: 'SUV', Pickup: 'Pick-up',
      Hatchback: 'Schrägheck', Wagon: 'Kombi', Minivan: 'Van', Bus: 'Bus',
    },
    fuelType: { Petrol: 'Benzin', Hybrid: 'Hybrid', 'Petrol Hybrid': 'Benzin-Hybrid', Electric: 'Elektro', Diesel: 'Diesel' },
    transmission: {
      Automatic: 'Automatik', Manual: 'Schaltgetriebe', CVT: 'CVT', eCVT: 'eCVT', DCT: 'DCT', PDK: 'PDK', DSG: 'DSG',
      'Single-speed': 'Ein-Gang-Getriebe', '8-speed DCT': '8-Gang-DCT', '2-speed (rear)': '2-Gang (hinten)',
      'Single/2-speed': 'Ein-/2-Gang', 'Single / dual-motor': 'Ein- / Doppelmotor',
      'Single-speed (simulated gears)': 'Ein-Gang (simulierte Gänge)',
    },
  },

  useCases: {
    family:        { label: 'Familienauto', icon: '👨‍👩‍👧‍👦', description: 'Platz, Sicherheit und Zuverlässigkeit für die ganze Familie', priorities: 'Sitze · Kofferraum · Zuverlässigkeit · Preis', pickTitle: 'Bestes Familienauto' },
    commercial:    { label: 'Gewerbe / Fahrdienst', icon: '🚖', description: 'Gebaut für den täglichen Einsatz mit hoher Laufleistung', priorities: 'Haltbarkeit · Günstige Teile · Verbrauch', pickTitle: 'Bestes für Gewerbe' },
    highway:       { label: 'Autobahn & Langstrecke', icon: '🛣️', description: 'Komfortabel und stabil auf langen Strecken', priorities: 'Verbrauch · Motorleistung · Zuverlässigkeit', pickTitle: 'Bestes für die Autobahn' },
    budget:        { label: 'Kleines Budget', icon: '💰', description: 'Bestes Preis-Leistungs-Verhältnis, wenn das Geld knapp ist', priorities: 'Niedriger Kaufpreis · Geringe Wartung', pickTitle: 'Bester Budget-Kauf' },
    offroad:       { label: 'Gelände / schlechte Straßen', icon: '🪨', description: 'Hohe Bodenfreiheit für schwieriges Terrain und schlechte Straßen', priorities: 'Bodenfreiheit · Haltbarkeit · Teile', pickTitle: 'Bestes Geländeauto' },
    executive:     { label: 'Business / Repräsentation', icon: '💼', description: 'Präsenz, Komfort und Markenimage für Berufstätige', priorities: 'Prestige · Motor · Betriebskosten', pickTitle: 'Bestes Businessauto' },
    firstcar:      { label: 'Erstes Auto', icon: '🎓', description: 'Leicht zu fahren, fehlerverzeihend und günstig im Unterhalt', priorities: 'Geringe Wartung · Leichte Teile · Zuverlässigkeit', pickTitle: 'Bestes erstes Auto' },
    fuelefficient: { label: 'Sparsam / Effizient', icon: '⛽', description: 'Die niedrigsten Betriebskosten pro Kilometer', priorities: 'Kraftstoff- oder Energieverbrauch · Wartung · Teile', pickTitle: 'Am sparsamsten' },
  },

  seo: {
    reviewedByLabel: 'Geprüft von:',
    reviewer: 'Redaktionsteam von Naira Autos',
    updatedLabel: 'Inhalt aktualisiert:',
    picksHeading: 'Beste Autos nach Einsatzzweck — 2026',
    picksNote:
      'Diese Listen werden mit derselben Bewertung erzeugt wie das Werkzeug selbst, für einen Referenzmarkt. Die genaue Rangfolge und die Preise passen sich dem oben gewählten Land an; für afrikanische Länder kommen ältere Gebrauchtimport-Modelle hinzu.',
    faqHeading: 'Häufige Fragen',
    moreToolsHeading: 'Weitere kostenlose Werkzeuge',
    disclaimer:
      'Preise sind Schätzungen für {countries} Märkte, keine Angebote. Die Bewertungen von Wartung und Ersatzteilen sind redaktionelle Einschätzungen und können je nach Markt abweichen. Prüfen Sie ein Auto immer persönlich, lassen Sie sich die Fahrzeughistorie zeigen und holen Sie vor dem Kauf ein lokales Angebot ein.',
    sections: [
      {
        h2: 'So funktioniert der Autoberater',
        paragraphs: [
          '„Bestes Auto Für Sie“ ordnet {totalCars} Fahrzeuge danach, wie Sie ein Auto tatsächlich nutzen werden. Sie wählen ein Land und einen Einsatzzweck — Familie, Gewerbe oder Fahrdienst, Autobahn, kleines Budget, Gelände, Business, erstes Auto oder Sparsamkeit — und das Werkzeug bewertet jedes Modell, das in diesem Markt verkauft oder häufig importiert wird, und zeigt die besten fünf. Jede Bewertung reicht von 0 bis 100 und kombiniert ausschließlich messbare Faktoren: Wartungskosten, Ersatzteilverfügbarkeit, Kraftstoff- oder Energieverbrauch, Bodenfreiheit, Sitzplätze, Kofferraumvolumen, Motorgröße und Kaufpreis.',
          'Die Gewichtung ändert sich mit dem Einsatzzweck. Bei einem Taxi oder Lieferwagen machen Wartung und Teileverfügbarkeit 70 % der Bewertung aus. Für das Gelände zählt allein die Bodenfreiheit zur Hälfte. Beim ersten Auto sind Zuverlässigkeit und leicht erhältliche Teile viel wichtiger als Leistung.',
          'Die Rangfolge ist in jedem Land bewusst dieselbe. Die Bewertung nutzt den Basispreis jedes Autos in US-Dollar; ein Wechsel von München nach Zürich ändert also den angezeigten Preis, nicht die Reihenfolge. So bleibt die Empfehlung eine Aussage über das Auto selbst, während sich die Schätzung unter jedem Ergebnis an Ihre Währung und die typischen Steuern und Abgaben Ihres Marktes anpasst. Das Werkzeug deckt {countries} Länder ab: {globalCars} Modelle werden überall verglichen, in afrikanischen Märkten kommen {usedCars} ältere Gebrauchtimporte hinzu.',
        ],
      },
      {
        h2: 'Zuerst der Alltag, dann das Datenblatt',
        paragraphs: [
          'Welches Auto das beste für Sie ist, hängt weniger von den technischen Daten ab als von Ihrem **tatsächlichen Alltag**. Ein Auto, das auf dem Papier glänzt, kann die falsche Wahl sein, wenn die nächste Werkstatt mit Erfahrung weit entfernt ist oder die geringe Bodenfreiheit Ihren Arbeitsweg zum Hindernislauf macht.',
          'Im **gewerblichen Einsatz und bei Fahrdiensten** entscheiden Zuverlässigkeit bei hoher Laufleistung und niedrige Teilekosten pro Kilometer. Toyota Corolla und Toyota Camry sind in vielen Ländern in Taxi- und Lieferflotten zu finden, weil ihre Motoren einfach sind, einen verpassten Service verzeihen und fast jede Werkstatt sie reparieren kann.',
          'Im **Business-Einsatz** zählt das Markenimage tatsächlich, sollte aber die Betriebskosten nicht überstimmen. Die Mercedes-Benz S-Klasse ist hier bei der Wartung mit „Sehr hoch“ eingestuft: Luftfederung und komplexe Elektronik können aus einer einzelnen Reparatur eine Rechnung im vierstelligen Bereich machen. Viele Berufstätige fahren mit einer gepflegten Mittelklasse-Limousine besser als mit einem Luxusauto mit hoher Laufleistung und wachsenden Reparaturkosten.',
          'Für **Fahranfänger und Erstkäufer** ist entscheidend, dass die Werkstatt das Auto kennt. Ein Fahrzeug, dessen Fehler eine Spezialdiagnose brauchen, wird langsamer und teurer repariert. Toyota- und Honda-Modelle mit Motoren unter 2,5 Litern haben weltweit das größte Umfeld aus Teilen, Werkstätten und Ratgebern im Internet.',
          'Für **Familien** zählen Sitze und Kofferraum, aber auch der Preis eines dreireihigen SUV, den Sie vielleicht gar nicht brauchen. Deshalb belohnt die Familienbewertung auch einen niedrigeren Kaufpreis: Ein fünfsitziger Crossover bedient eine vierköpfige Familie oft so gut wie ein deutlich größeres Fahrzeug, zu einem Bruchteil der Kosten.',
          'Bei **Gelände und schlechten Straßen** zählt zuerst die Bodenfreiheit, dann der Antrieb. Rund 250 mm machen Schlaglöcher, überflutete Straßen und unbefestigte Wege beherrschbar, während eine Limousine mit 140 mm in der Stadt bei vorsichtiger Fahrweise funktionieren kann — Bremsschwellen und Hochwasser bleiben aber ein dauerndes Ärgernis.',
        ],
      },
      {
        h2: 'Gesamtkosten zählen mehr als der Preis auf dem Schild',
        paragraphs: [
          'Ein günstigeres Auto ist nicht immer das billigere. Über fünf Jahre können Kraftstoff, Service, Versicherung, Reifen und Reparaturen den Kaufpreis erreichen, besonders in Märkten, in denen importierte Teile lange brauchen. Zwei Autos zum ähnlichen Preis können sich um Tausende Euro im Unterhalt unterscheiden, nur weil sich das eine Teile mit Millionen anderer Fahrzeuge teilt und das andere ein Bauteil braucht, das es nur beim Vertragshändler gibt.',
          'Nutzen Sie die Wartungs- und Teile-Hinweise bei jedem Ergebnis als Abkürzung für diese versteckten Kosten und rechnen Sie Ihre engere Auswahl anschließend im [Kraftstoffkosten-Rechner](/tools/fuel-cost-calculator-global) durch, um den Verbrauch in monatliche Kosten für Ihre Fahrstrecke zu übersetzen. Auch der Wiederverkaufswert zählt: In vielen Märkten halten gängige japanische und koreanische Modelle ihren Wert besser als Nischen- oder wartungsintensive Marken, was die tatsächlichen Kosten des Besitzes senkt.',
        ],
      },
      {
        h2: 'Deutschland, Österreich, Schweiz: Was vor Ort zählt',
        paragraphs: [
          'In Deutschland, Österreich und der Schweiz kommen zur Modellwahl Regeln hinzu, die in anderen Märkten kaum eine Rolle spielen. In Deutschland ist die Hauptuntersuchung (HU) in der Regel alle zwei Jahre fällig, bei Neuwagen erstmals nach drei Jahren; Fahrzeuge mit hohem Reparaturstau fallen hier schnell durch. In vielen Innenstädten gelten Umweltzonen mit Plakettenpflicht, und für ältere Dieselmodelle bestehen örtlich Einschränkungen. Wer viel pendelt, sollte außerdem die Kfz-Steuer, die sich an Hubraum und CO₂-Ausstoß orientiert, in die Rechnung einbeziehen.',
          'In Österreich sind die Vignette für Autobahnen und die Normverbrauchsabgabe (NoVA) beim Kauf wichtige Kostenfaktoren, die sparsame Modelle begünstigen. In der Schweiz liegen sowohl Fahrzeugpreise als auch Werkstattsätze hoch, während Kaufpreise in Schweizer Franken den Vergleich mit Nachbarländern erschweren; ein Gebrauchtwagen aus Deutschland kann dort dennoch attraktiv sein, wenn Zoll und Abgaben berücksichtigt werden. Für den Alltag auf der Autobahn, wo in Deutschland abschnittsweise kein generelles Tempolimit gilt, lohnen sich ein stabiles Fahrwerk, gute Bremsen und ein Motor, der bei hohem Tempo nicht außer Atem gerät.',
          'Außerhalb Europas sieht der Markt anders aus: In vielen afrikanischen Ländern sind Gebrauchtimporte, oft zehn bis zwanzig Jahre alt, der Normalfall. Bei Auswahl eines solchen Landes fügt das Werkzeug deshalb {usedCars} ältere Modelle mit typischen Problemen und Prüftipps für Gebrauchtkäufer hinzu. Die Golfstaaten kombinieren niedrige Steuern mit günstigem Kraftstoff, was große SUV und V6-Motoren anders bewertet als in Hochsteuerländern. Deshalb gibt es die Länderauswahl: Dasselbe Auto kann in einem Markt eine vernünftige Anschaffung und im anderen ein teurer Luxus sein.',
        ],
      },
      {
        h2: 'So lesen Sie die Bewertung von Wartung und Ersatzteilen',
        paragraphs: [
          '**Wartungskosten** bewerten die typischen laufenden Kosten, ein Modell auf der Straße zu halten, im Vergleich zu den anderen: Niedrig, Mittel, Hoch oder Sehr hoch. **Ersatzteilverfügbarkeit** bewertet, wie leicht sich Ersatzteile finden lassen: Leicht, Mittel oder Schwierig. Beides sind redaktionelle Einschätzungen auf Grundlage von Ruf des Modells, üblichen Servicepreisen und Teilenetzen. Sie sind kein Angebot einer Werkstatt und können je nach Markt abweichen.',
          'Werten Sie „Niedrig“ und „Leicht“ als starkes Signal. Werten Sie „Hoch“ oder „Schwierig“ als Anlass, vor der Entscheidung örtliche Werkstätten zu fragen. Jedes Ergebnis nennt außerdem häufige Probleme und einen modellspezifischen Hinweis — lesen Sie beides, bevor Sie das Auto besichtigen.',
        ],
      },
      {
        h2: 'Wie die Länderpreise geschätzt werden — und wo die Grenzen liegen',
        paragraphs: [
          'Jedes Auto hat einen Basispreis in US-Dollar, eine ungefähre Zahl für die Einstiegsausstattung 2025–2026. Für einen lokalen Preis multipliziert das Werkzeug diesen Basispreis mit einem länderspezifischen Marktfaktor — einer groben Schätzung von Zoll, Sondersteuern, Mehrwertsteuer und üblichem Händleraufschlag — und mit einem Wechselkurs. Da sich Wechselkurse und Steuerregeln ändern, verstehen Sie das Ergebnis als Startpunkt für Ihr Budget, nicht als Angebot.',
          'Manche Modelle werden in einigen Ländern gar nicht neu verkauft, und Ausstattung, Optionen und Zustand eines Gebrauchten können den echten Preis weit von diesen Schätzungen entfernen. Bestätigen Sie den Preis mit lokalen Anzeigen oder einem Händler, bevor Sie Ihr endgültiges Budget festlegen.',
        ],
      },
      {
        h2: 'Von der engeren Auswahl zur Entscheidung',
        paragraphs: [
          'Wählen Sie Ihren Einsatzzweck, öffnen Sie bei den Top-Ergebnissen jeweils **Details ansehen** und notieren Sie die häufigen Probleme. Vergleichen Sie Ihre zwei Favoriten direkt mit dem [Autovergleich](/tools/car-comparison). Bevor Sie für ein Gebrauchtfahrzeug zahlen, prüfen Sie die Historie mit der [Fahrgestellnummer-Prüfung](/werkzeuge/fahrgestellnummer-pruefen) und lassen Sie eine unabhängige technische Prüfung durchführen. Haben Sie das Auto, hilft Ihnen [Was ist mein Auto wert?](/werkzeuge/was-ist-mein-auto-wert) dabei, den Wert im Blick zu behalten. Mit **Link kopieren** teilen Sie Ihr gewähltes Land und Ihren Einsatzzweck mit Ihrem Partner oder Ihrer Werkstatt.',
        ],
      },
    ],
    exampleTitle: 'Beispiel: das Auto zum tatsächlichen Einsatz passend wählen',
    exampleBody:
      'Illustratives Szenario, keine Kundenfallstudie. Stellen Sie sich den Inhaber eines kleinen Kurierdienstes in einer Großstadt vor, der von einem siebensitzigen SUV wegen des Laderaums angezogen wird. In der gewerblichen Rangliste schneiden Toyota Corolla und Toyota RAV4 jedoch besser ab als größere Fahrzeuge, weil seine echten Routen kurze Stop-and-go-Fahrten mit mittleren Lasten sind, bei denen Teilekosten pro Kilometer und Verbrauch schwerer wiegen als reines Ladevolumen. Die Bewertung sagt nicht, dass das SUV schlecht ist — sie sagt, dass es zu diesem Nutzungsmuster schlechter passt. Das gesparte Geld bei Kaufpreis und Kraftstoff kann als Betriebskapital im Geschäft bleiben.',
  },

  related: { compare: 'Autovergleich', fuel: 'Kraftstoffkosten-Rechner', valuation: 'Was ist mein Auto wert?' },

  faqs: [
    { q: 'Zeigt das Werkzeug echte Preise für mein Land?', a: 'Es zeigt eine Schätzung, kein Live-Angebot. Jedes Auto hat einen Basispreis in US-Dollar; mit der Länderwahl werden der typische Steuer- und Zollfaktor dieses Marktes sowie ein Wechselkurs angewendet. Bestätigen Sie beim Händler oder in lokalen Anzeigen, bevor Sie genau budgetieren.' },
    { q: 'Wie werden die Autos bewertet?', a: 'Jedes Auto erhält je Einsatzzweck eine Punktzahl von 0 bis 100 aus messbaren Faktoren — Wartungskosten, Teileverfügbarkeit, Verbrauch, Bodenfreiheit, Sitze, Kofferraum, Motorgröße und Kaufpreis — mit unterschiedlicher Gewichtung je Zweck. Die Rangfolge ändert sich nicht mit dem Land, nur der angezeigte Preis.' },
    { q: 'Was ist das beste Familienauto?', a: 'In unserer Rangliste führen {picks:family} beim Familieneinsatz, mit einer Balance aus Sitzen, Kofferraum, Zuverlässigkeit und Preis. Große Familien sollten die Sitzzahl in den Details jedes Ergebnisses prüfen.' },
    { q: 'Was ist das beste Auto für Gewerbe oder Fahrdienst?', a: 'Für den gewerblichen Einsatz mit hoher Laufleistung sind die ersten drei {picks:commercial}. Sie vereinen niedrige Wartungskosten, leicht erhältliche Ersatzteile und moderaten Verbrauch, was die Kosten pro Kilometer niedrig hält.' },
    { q: 'Was ist das beste Auto für schlechte oder unbefestigte Straßen?', a: 'Bodenfreiheit und Haltbarkeit führen diese Rangliste an. Die derzeitigen Top drei sind {picks:offroad}. Nur in der Stadt reicht eine Limousine bei vorsichtiger Fahrweise, doch Hochwasser und Bremsschwellen fordern tiefe Autos.' },
    { q: 'Was ist das beste erste Auto?', a: 'Die besten Erstwagen sind {picks:firstcar}: geringe Wartung, leichte Teile und Werkstätten, die sie überall kennen. Meiden Sie exotische und ultra-luxuriöse Marken als erstes Auto — die Teile sind teuer und Sie brauchen Spezialwerkstätten.' },
    { q: 'Welche Autos sind am sparsamsten im Kraftstoff- oder Energieverbrauch?', a: 'Hybride und Elektroautos führen: {picks:fuelefficient}. Ein Elektroauto lohnt sich nur, wenn zuverlässiges Laden dort möglich ist, wo Sie wohnen und fahren — prüfen Sie die Ladeinfrastruktur vor der Entscheidung.' },
    { q: 'Warum zeigen afrikanische Länder ältere Gebrauchtmodelle?', a: 'In vielen afrikanischen Märkten sind Gebrauchtimporte der übliche Weg zum Auto. Bei Wahl eines afrikanischen Landes fügt das Werkzeug {usedCars} ältere Modelle mit typischen Gebrauchtproblemen und Prüftipps hinzu, zusätzlich zu den {globalCars} globalen Modellen.' },
  ],

  schema: {
    appName: 'Bestes Auto Für Sie — Autoberater nach Einsatzzweck',
    appDescription: 'Kostenloser Autoberater: Land und Einsatzzweck wählen und eine Top-5-Rangliste aus {totalCars} Autos erhalten, mit geschätzten lokalen Preisen in {countries} Ländern.',
    publisher: 'Naira Autos',
    author: 'Redaktionsteam von Naira Autos',
  },
};
