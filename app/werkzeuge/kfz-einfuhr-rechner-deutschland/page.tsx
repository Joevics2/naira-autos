import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import KfzEinfuhrRechnerClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/werkzeuge/kfz-einfuhr-rechner-deutschland';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'Kfz-Einfuhr-Rechner Deutschland 2026 — Zoll, Einfuhrumsatzsteuer & Gesamtkosten',
  description: 'Kostenloser Auto-Import-Rechner für Deutschland: Zoll, Einfuhrumsatzsteuer, Erwerbsteuer bei EU-Neufahrzeugen, Oldtimer mit 7 %, Japan und USA mit 0 % Zoll sowie Ausgleichszölle auf chinesische Elektroautos. Stand Oktober 2026.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'Kfz-Einfuhr-Rechner Deutschland | Naira Autos',
    description: 'Berechnen Sie Zoll, Einfuhrumsatzsteuer und Gesamtkosten beim Autoimport nach Deutschland.',
    url: URL, siteName: 'Naira Autos', locale: 'de_DE', type: 'website',
  },
  keywords: [
    'auto import zoll rechner', 'einfuhrumsatzsteuer auto rechner', 'auto aus den usa importieren kosten 2026',
    'auto aus japan importieren zoll 0 prozent', 'oldtimer import 7 prozent einfuhrumsatzsteuer', 'auto aus der eu importieren mehrwertsteuer',
    'übersiedlungsgut auto zollfrei', 'chinesische elektroautos zoll ausgleichszoll', 'einzelabnahme § 21 stvzo kosten',
  ].join(', '),
};

const FAQ = [
  { q: 'Wie hoch ist der Zoll auf ein importiertes Auto in Deutschland?', a: 'Für Personenkraftwagen aus Ländern ohne Handelsabkommen gilt der EU-Zollsatz von 10 Prozent auf den Zollwert, also auf Kaufpreis plus Fracht und Versicherung bis zur EU-Grenze. Danach kommen 19 Prozent Einfuhrumsatzsteuer auf Zollwert und Zoll hinzu. Aus der EU eingeführte Autos sind zollfrei.' },
  { q: 'Stimmt es, dass der Zoll nur 6,5 Prozent beträgt?', a: 'Nein. Einzelne Seiten nennen 6,5 Prozent, doch der gemeinsame Zolltarif der EU sieht für Personenkraftwagen der Position 8703 einheitlich 10 Prozent vor. Dieser Satz gilt, solange Sie keinen Ursprungsnachweis für ein Abkommensland vorlegen können. Der Rechner verwendet deshalb 10 Prozent.' },
  { q: 'Zahle ich auf Autos aus den USA seit 2026 keinen Zoll mehr?', a: 'Seit dem 1. Juli 2026 gilt die Verordnung (EU) 2026/1455, die für Industriewaren mit Ursprung in den USA einen Zollsatz von 0 Prozent vorsieht, auch für Pkw. Der Zollvorteil gilt aber nur für Fahrzeuge, die tatsächlich in den USA hergestellt wurden, und erfordert Nachweise zu Ursprung und Direkttransport. Ein in Deutschland gebautes Auto, das in den USA gekauft wurde, zahlt weiter 10 Prozent. Die Einfuhrumsatzsteuer bleibt in jedem Fall bestehen.' },
  { q: 'Wie viel Zoll zahle ich auf Autos aus Japan?', a: 'Seit dem 1. Februar 2026 sind japanische Pkw nach dem Wirtschaftspartnerschaftsabkommen EU-Japan zollfrei, wenn Sie den Ursprung nachweisen, zum Beispiel mit einer Ursprungserklärung des Exporteurs auf der Rechnung. Ohne Nachweis gelten 10 Prozent. Die Einfuhrumsatzsteuer von 19 Prozent fällt trotzdem an.' },
  { q: 'Muss ich beim Kauf in der EU Mehrwertsteuer in Deutschland zahlen?', a: 'Nur bei Neufahrzeugen im Sinne des Umsatzsteuerrechts, also bei Autos, die jünger als sechs Monate sind oder weniger als 6.000 Kilometer gefahren wurden. Dann fallen 19 Prozent deutsche Umsatzsteuer an, auch bei einem Privatkauf, und Sie melden sie beim Finanzamt an. Gebrauchte Fahrzeuge, die älter als sechs Monate sind und mehr als 6.000 Kilometer haben, sind in der Regel nicht betroffen.' },
  { q: 'Welche Regeln gelten für Oldtimer?', a: 'Fahrzeuge ab 30 Jahren, die als Sammlungsstück gelten, werden unter der Position 9705 mit 0 Prozent Zoll und einer ermäßigten Einfuhrumsatzsteuer von 7 Prozent abgefertigt. Das Fahrzeug sollte im Originalzustand sein und nicht mehr hergestellt werden. Bei einem gewöhnlichen alten Auto ohne Sammlerwert bleibt es bei 10 Prozent Zoll und 19 Prozent Umsatzsteuer.' },
  { q: 'Wann ist der Import von Umzugsgut zollfrei?', a: 'Wer seinen Wohnsitz nach Deutschland verlegt, kann sein Auto als Übersiedlungsgut ohne Zoll und Einfuhrumsatzsteuer einführen. Voraussetzung ist unter anderem, dass Sie es vor dem Umzug mindestens sechs Monate besessen und genutzt haben und dass Sie zuvor mindestens zwölf Monate außerhalb der EU gelebt haben. Das Fahrzeug darf nach der Einfuhr eine Zeit lang nicht verkauft oder verliehen werden. Klären Sie die Einzelheiten vorab mit dem Zoll.' },
  { q: 'Welche Zölle gelten für Elektroautos aus China?', a: 'Chinesische Elektroautos zahlen die üblichen 10 Prozent Zoll plus einen Ausgleichszoll, der je nach Hersteller zwischen 7,8 und 35,3 Prozent liegt. BYD zahlt 17 Prozent, Geely 18,8 Prozent, SAIC 35,3 Prozent und Tesla Shanghai 7,8 Prozent. Für ein Modell mit akzeptierter Preisverpflichtung, wie den Cupra Tavascan von VW Anhui, entfällt der Ausgleichszoll.' },
  { q: 'Wie wird die Einfuhrumsatzsteuer berechnet?', a: 'Die Bemessungsgrundlage ist der Zollwert plus der festgesetzte Zoll, außerdem Kosten für den Transport bis zum ersten Bestimmungsort in der EU. Auf diese Summe werden 19 Prozent erhoben, bei Oldtimern 7 Prozent. Weil der Zoll in die Basis eingeht, liegt die Gesamtbelastung bei 10 Prozent Zoll bei rund 30,9 Prozent des Zollwerts.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'Kfz-Einfuhr-Rechner Deutschland — Zoll, Einfuhrumsatzsteuer & Gesamtkosten',
      description: 'Kostenloser Rechner für Zoll, Einfuhrumsatzsteuer und Gesamtkosten beim Autoimport nach Deutschland.',
      url: URL, inLanguage: 'de-DE', dateModified: '2026-10-08',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Gründer', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://www.naira.autos/startseite' },
          { '@type': 'ListItem', position: 2, name: 'Werkzeuge', item: 'https://www.naira.autos/werkzeuge' },
          { '@type': 'ListItem', position: 3, name: 'Kfz-Einfuhr-Rechner Deutschland', item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', inLanguage: 'de-DE', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'SoftwareApplication', name: 'Kfz-Einfuhr-Rechner Deutschland', inLanguage: 'de-DE', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';

export default function KfzEinfuhrRechnerDeutschlandPage() {
  return (
    <div lang="de">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link prefetch={false} href="/werkzeuge" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Zurück">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Brotkrumen" className="flex items-center gap-1.5 text-xs text-white/30 flex-wrap">
              <Link prefetch={false} href="/startseite" className="hover:text-white/60 transition-colors">Startseite</Link>
              <ChevronRight className="h-3 w-3" />
              <Link prefetch={false} href="/werkzeuge" className="hover:text-white/60 transition-colors">Werkzeuge</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇩🇪 Kfz-Einfuhr-Rechner</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100 % kostenlos</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Japan und USA: 0 % Zoll möglich</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Geprüft: Oktober 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Kfz-Einfuhr-Rechner<br /><span className="text-emerald-400">Deutschland</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Was kostet es wirklich, ein Auto nach Deutschland zu importieren?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Wählen Sie Herkunft und Art der Einfuhr und sehen Sie Zoll, Einfuhrumsatzsteuer und Gesamtkosten, mit Sonderfällen für Oldtimer, Umzugsgut, EU-Neufahrzeuge und chinesische Elektroautos.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Nur eine Schätzung.</strong> Zollsätze und Handelsabkommen ändern sich, und viele Ratgeber im Netz nennen noch veraltete Werte. Prüfen Sie Ursprung, Zolltarifnummer und Nachweise vor dem Kauf mit dem Zoll oder einem Zollagenten.
          </p>
        </div>
      </div>

      <KfzEinfuhrRechnerClient />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>Wie hoch sind Zoll und Steuer beim Autoimport nach Deutschland?</h2>
            <p className={`${p} mb-6 max-w-3xl`}>
              Beim Autoimport nach Deutschland entscheidet zuerst das Herkunftsland des Fahrzeugs, dann das Kaufland und zuletzt das Alter des Autos. Innerhalb der EU fällt kein Zoll an. Aus Drittländern wird der EU-Zollsatz von 10 Prozent auf den Zollwert fällig, sofern kein Handelsabkommen mit Ursprungsnachweis greift. Darauf erhebt der Zoll 19 Prozent Einfuhrumsatzsteuer, und zwar auf Zollwert plus Zoll. Eine Verbrauchsteuer auf Pkw gibt es in Deutschland nicht. Der Rechner bildet diese Reihenfolge nach und zeigt Ihnen, wie sich Sonderregeln auswirken.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Zoll (Drittland)', rate: '10 %', base: 'auf den Zollwert', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'Einfuhrumsatzsteuer', rate: '19 %', base: 'auf Zollwert + Zoll', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
                { label: 'Japan und USA', rate: '0 %', base: 'Zoll mit Ursprungsnachweis', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
                { label: 'Oldtimer', rate: '0 % + 7 %', base: 'Zoll + EUSt', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
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
                <h2 className={h2} style={heading}>Was sich 2026 geändert hat</h2>
                <div className="space-y-3">
                  <p className={p}><strong className="text-foreground">Japan:</strong> Das Wirtschaftspartnerschaftsabkommen EU-Japan baut den Autozoll schrittweise ab. Seit dem 1. Februar 2026 gilt für japanische Pkw ein Präferenzzollsatz von 0 Prozent. Sie brauchen dafür einen Ursprungsnachweis, in der Regel eine Erklärung des Exporteurs auf der Rechnung. Ein europäisches Modell, das nur in Japan verkauft wurde, zählt nicht als japanisches Erzeugnis.</p>
                  <p className={p}><strong className="text-foreground">USA:</strong> Seit dem 1. Juli 2026 gilt die Verordnung (EU) 2026/1455. Sie senkt die Zölle auf Industriewaren mit US-Ursprung auf 0 Prozent. Für Autos ist das ein großer Unterschied, denn viele Ratgeber nennen noch die alten 10 Prozent. Der Nullzollsatz ist nicht automatisch: Das Auto muss in den USA hergestellt sein, und Sie müssen den Ursprung und den Direkttransport belegen.</p>
                  <p className={p}><strong className="text-foreground">Südkorea und Vereinigtes Königreich:</strong> Koreanische Autos sind aufgrund des Freihandelsabkommens zollfrei, britische Autos nach dem Handels- und Kooperationsabkommen, jeweils mit gültigem Ursprungsnachweis. Auch bei britischen Autos müssen die Ursprungsregeln erfüllt sein, sonst bleibt es bei 10 Prozent.</p>
                  <p className={p}><strong className="text-foreground">China:</strong> Chinesische Elektroautos zahlen zusätzlich zum Normalzoll einen Ausgleichszoll. BYD liegt bei 17 Prozent, Geely bei 18,8 Prozent und SAIC bei 35,3 Prozent. Hersteller mit akzeptierter Preisverpflichtung sind ausgenommen.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Beispiel 1: Auto aus den Emiraten ohne Abkommen</h2>
                <div className="space-y-2">
                  <p className={p}>Ein Pkw kostet 20.000 Euro, Fracht und Versicherung betragen 1.500 Euro. Der Zollwert liegt bei 21.500 Euro. Zoll zu 10 Prozent: 2.150 Euro. Die Einfuhrumsatzsteuer beträgt 19 Prozent von 23.650 Euro, also 4.493,50 Euro.</p>
                  <p className={p}>Die Abgaben summieren sich auf 6.643,50 Euro, rund 30,9 Prozent des Zollwerts. Hinzu kommen Einzelabnahme und mögliche Umrüstung.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Beispiel 2: Japanischer Import mit Ursprungsnachweis</h2>
                <div className="space-y-2">
                  <p className={p}>Ein Auto aus Japan kostet 15.000 Euro, die Fracht 1.200 Euro, der Zollwert also 16.200 Euro. Mit Ursprungsnachweis beträgt der Zoll 0 Euro. Die Einfuhrumsatzsteuer von 19 Prozent ergibt 3.078 Euro. Ohne den Nachweis kämen 1.620 Euro Zoll und 3.385,80 Euro Einfuhrumsatzsteuer dazu, zusammen 5.005,80 Euro.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Beispiel 3: Oldtimer und chinesisches Elektroauto</h2>
                <div className="space-y-2">
                  <p className={p}><strong className="text-foreground">Oldtimer:</strong> Ein Auto von 1990 mit einem Zollwert von 32.000 Euro zahlt 0 Prozent Zoll und 7 Prozent Einfuhrumsatzsteuer, also 2.240 Euro, wenn es als Sammlungsstück anerkannt wird.</p>
                  <p className={p}><strong className="text-foreground">BYD aus China:</strong> Bei 30.000 Euro Kaufpreis und 1.500 Euro Fracht sind es 31.500 Euro Zollwert. Zoll 10 Prozent: 3.150 Euro. Ausgleichszoll 17 Prozent: 5.355 Euro. Die Einfuhrumsatzsteuer beträgt 19 Prozent auf 40.005 Euro, also 7.600,95 Euro. Die Abgaben liegen bei 16.105,95 Euro, rund 51 Prozent.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Kauf in der EU: Wann Umsatzsteuer anfällt</h2>
                <div className="space-y-3">
                  <p className={p}>Wer ein Auto in einem anderen EU-Land kauft, zahlt keinen Zoll. Für die Umsatzsteuer kommt es darauf an, ob das Fahrzeug steuerrechtlich neu ist. Das ist der Fall, wenn es jünger als sechs Monate ist oder weniger als 6.000 Kilometer gefahren wurde. Dann fallen 19 Prozent deutsche Umsatzsteuer an, die Sie innerhalb von zehn Tagen beim Finanzamt melden, auch beim Privatkauf. Der Händler im Kaufland stellt die Rechnung dann ohne dortige Mehrwertsteuer aus.</p>
                  <p className={p}>Bei einem Gebrauchtwagen, der älter als sechs Monate ist und mehr als 6.000 Kilometer hat, entfällt die deutsche Umsatzsteuer meist. Dann ist die Steuer des Kauflandes im Preis enthalten, oder es gilt die Differenzbesteuerung des Händlers. Der Rechner fragt deshalb nach dem Neufahrzeug-Status.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Umzug nach Deutschland: Übersiedlungsgut</h2>
                <p className={p}>Wer seinen Wohnsitz nach Deutschland verlegt, kann sein persönliches Auto unter bestimmten Bedingungen als Übersiedlungsgut abgabenfrei einführen. Üblich sind eine Besitz- und Nutzungsdauer von mindestens sechs Monaten vor dem Umzug, ein vorheriger Wohnsitz außerhalb der EU von mindestens zwölf Monaten und eine Sperrfrist für den Verkauf nach der Einfuhr. Wer das Auto erst im Ausland gekauft hat und dann importiert, zahlt dagegen die normalen Abgaben.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Schritt für Schritt: Auto nach Deutschland importieren</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Herkunftsland des Fahrzeugs und Alter klären, am besten über die Fahrgestellnummer.</li>
                  <li>Ursprungsnachweis vom Verkäufer verlangen, wenn ein Abkommen den Zoll auf 0 Prozent senken soll.</li>
                  <li>Fahrzeug verschiffen und beim Zoll anmelden. Zoll und Einfuhrumsatzsteuer sind vor der Freigabe zu zahlen.</li>
                  <li>Fehlt die EU-Typgenehmigung, eine Einzelabnahme nach § 21 StVZO beim TÜV oder der Dekra machen lassen und nötige Umrüstungen erledigen.</li>
                  <li>Fahrzeug bei der Zulassungsstelle anmelden und Kfz-Steuer sowie Versicherung abschließen.</li>
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>Häufige Fehler beim Autoimport</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Veraltete Zollsätze aus alten Ratgebern verwenden, etwa 10 Prozent für Autos aus den USA oder Japan trotz geltender Abkommen.</li>
                  <li>Ohne Ursprungsnachweis auf 0 Prozent Zoll hoffen. Ohne Dokument gilt der Normalsatz.</li>
                  <li>Vergessen, dass die Einfuhrumsatzsteuer auch auf den Zoll erhoben wird.</li>
                  <li>Ein Auto kaufen, das sich nicht zulassen lässt, weil Einzelabnahme oder Umrüstung unwirtschaftlich sind.</li>
                  <li>Den Neufahrzeug-Status bei EU-Käufen übersehen und die Umsatzsteuer nicht anmelden.</li>
                  <li>Einen gewöhnlichen alten Wagen als Oldtimer deklarieren, obwohl er nicht als Sammlungsstück anerkannt wird.</li>
                </ul>
              </div>
              <div>
                <h2 className={h2} style={heading}>Was der Rechner nicht abdeckt</h2>
                <p className={p}>Nicht enthalten sind Kfz-Steuer, Versicherung, Kennzeichen, Reparaturen und die Kosten der Zulassung. Auch Sonderfälle wie Motorräder, Nutzfahrzeuge, vorübergehende Verwendung oder Zollverfahren mit Zollaufschub werden nicht berechnet. Der Zoll kann den Zollwert abweichend von der Rechnung festsetzen, wenn der Preis ungewöhnlich niedrig erscheint.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={heading}>Häufig gestellte Fragen</h2>
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
            Geprüft von <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Gründer. Quellen: Gemeinsamer Zolltarif der EU (TARIC), Verordnung (EU) 2026/1455, Wirtschaftspartnerschaftsabkommen EU-Japan, Durchführungsverordnung (EU) 2024/2754 zu Ausgleichszöllen, Umsatzsteuergesetz und Zollinformationen für Fahrzeugimporte. Stand: Oktober 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
