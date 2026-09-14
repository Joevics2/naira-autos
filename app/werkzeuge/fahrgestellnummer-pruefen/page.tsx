import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VINCheckerClientDe from '@/components/VINCheckerClientDe';

export const metadata: Metadata = {
  title: 'Fahrgestellnummer kostenlos prüfen — VIN / FIN Decoder online',
  description: 'Fahrgestellnummer (VIN/FIN) kostenlos prüfen. Marke, Modell, Baujahr, Motor und Herstellungsland sofort abrufen — ohne Anmeldung. Für Deutschland, Österreich und die Schweiz.',
  keywords: ['fahrgestellnummer kostenlos prüfen', 'vin decoder kostenlos', 'fin abfrage', 'fahrgestellnummer prüfen', 'vin nummer prüfen', 'fahrgestellnummer decodieren', 'fin check gratis', 'fahrgestellnummer finden auto', 'vin abfrage deutschland', 'fahrzeug identifizierungsnummer prüfen'],
  alternates: {
    canonical: 'https://www.naira.autos/werkzeuge/fahrgestellnummer-pruefen',
    languages: {
      en: 'https://www.naira.autos/tools/vin-checker-global',
      es: 'https://www.naira.autos/herramientas/decodificador-de-vin',
      fr: 'https://www.naira.autos/outils/decodeur-vin',
      ar: 'https://www.naira.autos/adawat/fahs-raqm-alhaykal',
      pt: 'https://www.naira.autos/ferramentas/decodificador-de-chassi',
      de: 'https://www.naira.autos/werkzeuge/fahrgestellnummer-pruefen',
      'x-default': 'https://www.naira.autos/tools/vin-checker-global',
    },
  },
  openGraph: {
    title: 'Fahrgestellnummer kostenlos prüfen | Naira Autos',
    description: 'Marke, Modell, Baujahr, Motor und Herkunft jedes Fahrzeugs per Fahrgestellnummer — kostenlos und sofort.',
    url: 'https://www.naira.autos/werkzeuge/fahrgestellnummer-pruefen',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/werkzeuge/fahrgestellnummer-pruefen',
      name: 'Fahrgestellnummer kostenlos prüfen — VIN / FIN Decoder online',
      description: 'Fahrgestellnummer (VIN/FIN) kostenlos prüfen — Marke, Modell, Baujahr, Motor und Herstellungsland.',
      url: 'https://www.naira.autos/werkzeuge/fahrgestellnummer-pruefen',
      inLanguage: 'de',
      dateModified: '2026-09-14',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://www.naira.autos/startseite' },
        { '@type': 'ListItem', position: 2, name: 'Werkzeuge', item: 'https://www.naira.autos/werkzeuge' },
        { '@type': 'ListItem', position: 3, name: 'Fahrgestellnummer prüfen', item: 'https://www.naira.autos/werkzeuge/fahrgestellnummer-pruefen' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Was ist die Fahrgestellnummer (VIN) eines Autos?', acceptedAnswer: { '@type': 'Answer', text: 'Die Fahrgestellnummer, offiziell Fahrzeug-Identifizierungsnummer (FIN), international VIN, ist ein einzigartiger 17-stelliger Code, den jedes Fahrzeug bei der Herstellung erhält. Sie codiert Herstellungsland, Hersteller, Fahrzeugtyp, Motor, Baujahr, Montagewerk und eine eindeutige Seriennummer. In Deutschland steht sie in Feld E der Zulassungsbescheinigung Teil I.' } },
        { '@type': 'Question', name: 'Wie prüfe ich die Fahrgestellnummer kostenlos?', acceptedAnswer: { '@type': 'Answer', text: 'Gib die 17-stellige Fahrgestellnummer oben ein und klicke auf „Decodieren". Unser kostenloser Decoder nutzt die öffentliche NHTSA-Datenbank der US-Verkehrssicherheitsbehörde und zeigt Marke, Modell, Baujahr, Motordaten, Getriebeart und Herstellungswerk — komplett kostenlos, ohne Anmeldung, aus jedem Land.' } },
        { '@type': 'Question', name: 'Wo finde ich die Fahrgestellnummer am Auto?', acceptedAnswer: { '@type': 'Answer', text: 'Die Fahrgestellnummer steht an drei Stellen: auf dem Armaturenbrett (sichtbar durch die Windschutzscheibe), auf einem Aufkleber im Türrahmen der Fahrertür, und eingestanzt im Rahmen unter der Motorhaube. Außerdem steht sie in Feld E der Zulassungsbescheinigung Teil I. Alle Fundstellen müssen exakt übereinstimmen.' } },
        { '@type': 'Question', name: 'Ist FIN dasselbe wie VIN?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, exakt derselbe 17-stellige Code. VIN (Vehicle Identification Number) ist der internationale Fachbegriff, FIN (Fahrzeug-Identifizierungsnummer) die offizielle deutsche Übersetzung. Umgangssprachlich sagt man meist einfach „Fahrgestellnummer".' } },
        { '@type': 'Question', name: 'Funktioniert das Tool für Importfahrzeuge aus den USA nach Deutschland, Österreich oder in die Schweiz?', acceptedAnswer: { '@type': 'Answer', text: 'Ja — das ist sogar der häufigste Anwendungsfall. Fahrzeuge, die ursprünglich für den US-amerikanischen, kanadischen oder mexikanischen Markt gebaut wurden, decodieren normal, was einen großen Teil der aus US-Auktionen importierten Pickups und Oldtimer abdeckt. Fahrzeuge, die ausschließlich für den europäischen Markt gebaut wurden, erscheinen meist nicht in der NHTSA-Datenbank — hier hilft die Zulassungsbescheinigung Teil I weiter.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Fahrgestellnummer kostenlos prüfen', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function FahrgestellnummerPruefenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/werkzeuge" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="Zurück">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/startseite" className="hover:text-white/60 transition-colors">Startseite</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/werkzeuge" className="hover:text-white/60 transition-colors">Werkzeuge</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Fahrgestellnummer prüfen</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">100% Kostenlos</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">NHTSA-Daten</span>
              <Link href="/tools/vin-checker-global" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(30px, 5vw, 58px)' }}>
              Fahrgestellnummer<br /><span className="text-blue-400">Kostenlos Prüfen</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Fahrzeugdaten per VIN/FIN in Sekunden abrufen.</p>
            <p className="text-white/75 text-sm leading-relaxed">Gib die 17-stellige Fahrgestellnummer vom Armaturenbrett, der Tür oder dem Rahmen ein. Erhalte Marke, Modell, Baujahr, Motordaten und Herstellungsland — kostenlos, ohne Anmeldung. Nützlich beim Kauf eines Importfahrzeugs in Deutschland, Österreich oder der Schweiz.</p>
          </div>
        </div>
      </div>

      <VINCheckerClientDe />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Kostenlose Fahrgestellnummer-Prüfung für jeden Gebrauchtwagen</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Unser <strong className="text-foreground">kostenloser Fahrgestellnummer-Decoder</strong> nutzt die öffentliche Datenbank der NHTSA, der US-amerikanischen Verkehrssicherheitsbehörde. Eine <strong className="text-foreground">kostenlose FIN-Abfrage</strong> liefert dir Marke, Modell, Baujahr, Motordaten, Getriebeart, Karosserieklasse und Montagewerk — alles, was du brauchst, um vor dem Kauf zu prüfen, ob der Gebrauchtwagen wirklich das ist, was er zu sein scheint.</p>
                  <p>Der Gebrauchtwagenmarkt ist zunehmend international. Fahrzeuge, die für die USA, Kanada oder Mexiko gebaut wurden, werden ständig exportiert und neu zugelassen — sei es als Importfahrzeug nach Deutschland, als US-Youngtimer in Österreich, oder als Pickup, der über einen Schweizer Importeur ins Land kommt. Da die Fahrgestellnummer werkseitig eingestanzt wird und sich nie ändert, funktioniert eine kostenlose Prüfung genau gleich, egal in welchem Land das Fahrzeug landet — solange es ursprünglich für den nordamerikanischen Markt gebaut wurde.</p>
                  <p>Das ist der entscheidende Punkt: Die Fahrgestellnummer ist kein Kennzeichen, das dein Land vergibt — sie ist ein Herstellungsstempel, der am Fließband angebracht wird, lange bevor das Fahrzeug das Werk verlässt. Sie ändert sich nicht beim Export, bei der Neuzulassung, bei neuen Kennzeichen oder bei mehrfachem Besitzerwechsel. Deshalb kann eine kostenlose Fahrgestellnummer-Prüfung ein Fahrzeug über Ländergrenzen hinweg verfolgen — etwas, das ein Kennzeichen niemals leisten kann.</p>
                  <p>Die meisten Menschen prüfen die Fahrgestellnummer erst, nachdem der Preis schon verhandelt wurde — richtig ist aber, das schon vor der Besichtigung zu tun, vor jeder Anzahlung, und nach dem Kauf noch einmal, um sicherzugehen, dass bei der Übergabe nichts ausgetauscht wurde. Es kostet nichts und dauert weniger als eine Minute.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Fahrgestellnummer-Prüfung je nach Land</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Deutschland</strong> — die Fahrgestellnummer steht in Feld E der Zulassungsbescheinigung Teil I (früher Fahrzeugbrief) und muss bei jeder Zulassung mit dem Fahrzeug übereinstimmen. Da ein erheblicher Teil der aus den USA importierten Fahrzeuge — vor allem Pickups und Youngtimer — ursprünglich für Nordamerika gebaut wurde, liefert diese kostenlose Prüfung hier zuverlässige Ergebnisse, noch bevor du zur Zulassungsstelle gehst.</p>
                  <p><strong className="text-foreground">Österreich</strong> — die Fahrgestellnummer wird im Zulassungsschein geführt, und die Systematik ähnelt der deutschen. Importierte US-Fahrzeuge, insbesondere Oldtimer und Geländewagen, sind ein fester Bestandteil des österreichischen Gebrauchtwagenmarkts, wofür dieses Tool besonders hilfreich ist.</p>
                  <p><strong className="text-foreground">Schweiz</strong> — hier heißt das Dokument Fahrzeugausweis, und die Nummer wird als Stammnummer bzw. Fahrgestellnummer geführt. Da die Schweiz traditionell ein wichtiger Importmarkt für US-Fahrzeuge ist, ist eine kostenlose Vorabprüfung der Fahrgestellnummer vor dem MFK-Termin (Motorfahrzeugkontrolle) ein sinnvoller erster Schritt.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Du kaufst ein Importfahrzeug? Das solltest du zuerst tun</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Der Kauf eines Importfahrzeugs birgt ein zusätzliches Risiko, das ein lokaler Kauf nicht hat: Papiere, Verkäufer und der tatsächliche Zustand des Fahrzeugs können aus einem Land stammen, das du nie besucht hast. Die kostenlose Fahrgestellnummer-Prüfung ersetzt keine technische Untersuchung, ist aber der günstigste erste Filter, den es gibt — und kostet nichts, bevor du weitermachst.</p>
                  <p>Decodiere zunächst die Fahrgestellnummer und vergleiche das Ergebnis — Baujahr, Modell, Motor, Ausstattungslinie — genau mit dem, was der Verkäufer angegeben hat. Jede Abweichung hier, selbst ein falscher Motor, ist oft das erste Anzeichen dafür, dass die Fotos im Inserat und die tatsächlichen Papiere nicht zum selben Fahrzeug gehören. Prüfe anschließend physisch, ob die Nummer am Armaturenbrett mit der im Rahmen eingestanzten und der auf dem Türaufkleber übereinstimmt; eine Abweichung zwischen diesen drei Stellen ist eines der klarsten Anzeichen für eine ausgetauschte Nummer.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Fahrgestellnummer vs. FIN vs. VIN — Ist das dasselbe?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Ja, mit kleinen sprachlichen Unterschieden. <strong className="text-foreground">VIN</strong> (Vehicle Identification Number) ist der internationale Fachbegriff. <strong className="text-foreground">FIN</strong> (Fahrzeug-Identifizierungsnummer) ist die offizielle deutsche Bezeichnung, wie sie auch in der Zulassungsbescheinigung steht. <strong className="text-foreground">Fahrgestellnummer</strong> ist der Begriff, den die meisten Menschen im Alltag verwenden. Alle drei meinen exakt denselben werkseitig eingestanzten 17-stelligen Code.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Fahrgestellnummer lesen: Was jeder Abschnitt bedeutet</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Die 17 Zeichen sind nicht zufällig. Die Positionen 1 bis 3 bestimmen Hersteller und Herstellungsland — so erkennt der Decoder, ob ein Fahrzeug in den USA, Kanada, Mexiko oder anderswo gebaut wurde. Die Positionen 4 bis 8 beschreiben das Fahrzeug: Karosserie, Motor und Baureihe. Position 9 ist eine mathematisch berechnete Prüfziffer, mit der eine falsch abgeschriebene oder manipulierte Nummer erkannt wird. Position 10 codiert das Baujahr, und die Positionen 12 bis 17 bilden die eindeutige Produktionsnummer des Fahrzeugs.</p>
                  <p>Diese Abschnitte selbst lesen zu können, ist auch mit einem fertigen Decoder nützlich, weil du das Ergebnis in Sekunden gegenprüfen kannst. Zeigt Position 10 ein Baujahr 2015, während der Verkäufer 2018 angegeben hat, lohnt es sich, direkt nachzufragen — das ist kein Vorwurf, sondern eine kostenlose Prüfung, die dreißig Sekunden dauert.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Funktioniert für alle Marken — Ford, Toyota, Honda, Chevrolet und mehr</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Dies ist kein Tool für nur eine Marke. Da es direkt aus der Herstellerdatenbank der NHTSA liest, funktioniert derselbe Decoder für Ford, Toyota, Honda, Chevrolet, GMC, Nissan, Jeep, Hyundai und jede andere Marke, die auf dem nordamerikanischen Markt verkauft wird. Einfach den 17-stelligen Code einfügen — der Decoder erkennt automatisch das richtige Herstellerschema, ohne dass du die Marke angeben musst.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Fahrgestellnummer-Prüfung vs. vollständiger Fahrzeughistorienbericht</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Eine <strong className="text-foreground">kostenlose Fahrgestellnummer-Prüfung</strong> zeigt dir, wie das Fahrzeug bei der Fertigstellung im Werk war — die Herstellungsdaten. Was seitdem passiert ist — Unfälle, manipulierter Kilometerstand, Totalschaden oder Wiederaufbau — verrät nur ein kostenpflichtiger <strong className="text-foreground">Fahrzeughistorienbericht</strong> wie Carfax oder carVertical. Bei jedem höherpreisigen Gebrauchtwagenkauf ist ein kostenpflichtiger Historienbericht zusätzlich zu dieser kostenlosen Datenprüfung dringend empfohlen.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Fahrgestellnummer prüfen — Häufige Fragen</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: 'Ist diese Fahrgestellnummer-Prüfung wirklich kostenlos?', a: 'Ja. 100% kostenlos über die öffentliche NHTSA-Schnittstelle. Kein Konto, keine Anmeldung nötig. Du kannst so viele Abfragen machen, wie du brauchst, aus jedem Land.' },
                { q: 'Wofür brauche ich die Fahrgestellnummer eines Autos?', a: 'Die Fahrgestellnummer identifiziert ein bestimmtes Fahrzeug eindeutig — für Zulassung, Versicherung, Rückrufaktionen und zur Überprüfung technischer Daten. In Deutschland, Österreich und der Schweiz wird sie bei jeder Zulassung und jedem Besitzerwechsel geprüft.' },
                { q: 'Kann ich technische Daten per Fahrgestellnummer kostenlos abrufen?', a: 'Ja. Unser kostenloser Decoder liefert Marke, Modell, Baujahr, Motor, Karosserietyp, Getriebeart und Herkunft direkt aus der NHTSA-Herstellerdatenbank, ohne Kosten, für Fahrzeuge mit US-, kanadischer oder mexikanischer Spezifikation.' },
                { q: 'Funktioniert das Tool für Importfahrzeuge nach Deutschland oder Österreich?', a: 'Ja, für jedes Fahrzeug, das ursprünglich für den nordamerikanischen Markt gebaut wurde — ein häufiger Fall bei Importeuren von Pickups und Oldtimern. Fahrzeuge mit ausschließlich europäischer Spezifikation erscheinen möglicherweise nicht.' },
                { q: 'Wie erkenne ich, ob eine Fahrgestellnummer echt ist?', a: 'Eine gültige Fahrgestellnummer hat genau 17 Zeichen — Buchstaben (A-Z, ohne I, O, Q) und Ziffern. Position 9 ist eine mathematische Prüfziffer. Stimmt sie nicht, wurde die Nummer manipuliert. Dieses Tool prüft das automatisch.' },
                { q: 'Was, wenn die Prüfung kein Ergebnis liefert?', a: 'Das bedeutet meist, dass das Fahrzeug europäischer, asiatischer oder sonstiger Herkunft ist — außerhalb der NHTSA-Datenbank. Das Baujahr wird trotzdem aus Position 10 der Nummer ermittelt. In diesen Fällen hilft der offizielle FIN-Service des Herstellers weiter.' },
                { q: 'Ist die Motornummer dasselbe wie die Fahrgestellnummer?', a: 'Nein. Die Motornummer ist auf dem Motorblock selbst eingestanzt und identifiziert nur diesen Motor, während die Fahrgestellnummer das gesamte Fahrzeug identifiziert. Dieses Tool decodiert die Fahrgestellnummer, nicht die separate Motornummer.' },
                { q: 'Beeinflusst die Fahrgestellnummer die Einfuhrabgaben?', a: 'Indirekt ja. Viele Länder berechnen Einfuhrabgaben anhand von Fahrzeugalter und Hubraum — beides wird durch die Fahrgestellnummer bestätigt. Eine korrekte Decodierung vor der Berechnung verhindert eine Planung mit falschen Zahlen.' },
                { q: 'Zeigt die Fahrgestellnummer-Prüfung, ob das Auto einen Unfall hatte?', a: 'Nein. Die kostenlose Prüfung zeigt nur Herstellungsdaten — Marke, Modell, Baujahr, Motor und Herkunft. Unfallhistorie, Kilometerstand und Totalschaden erfordern einen kostenpflichtigen Bericht wie Carfax oder carVertical.' },
                { q: 'Kann ich per Fahrgestellnummer prüfen, ob ein Auto gestohlen wurde?', a: 'Nicht mit diesem Tool. Die Prüfung auf gestohlene Fahrzeuge ist Sache von Polizei und Versicherern — das NICB (US-Versicherungsbetrugs­behörde) bietet dafür ein kostenloses Tool namens VINCheck an, getrennt von einem Datendecoder.' },
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
              Weitere Kostenlose Werkzeuge
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/werkzeuge/virtueller-mechaniker" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Virtueller KI-Mechaniker</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/werkzeuge/was-ist-mein-auto-wert" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Was ist mein Auto wert?</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
              <Link href="/werkzeuge/entfernungsrechner-deutschland" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all">
                <p className="text-sm font-bold text-sky-700 dark:text-sky-400">Entfernungsrechner Deutschland</p>
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
