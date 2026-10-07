import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import AutokreditRechnerClient from './client';
import { alternatesFor } from '@/lib/hreflang';
import LanguagePills from '@/components/ui/LanguagePills';

export const metadata: Metadata = {
  title: 'Autokredit Rechner 2026 — Ratenkredit, Ballon & 3-Wege-Finanzierung',
  description: 'Kostenloser Autokredit-Rechner mit aktuellen Zinsen 2026: vergleichen Sie Ratenkredit, Ballonfinanzierung und 3-Wege-Finanzierung, inklusive Schlussrate und Widerrufsrecht.',
  alternates: alternatesFor('/werkzeuge/autokredit-rechner'),
  openGraph: {
    title: 'Autokredit Rechner 2026 | Naira Autos',
    description: 'Kostenloser Autokredit-Rechner \u2014 Monatsrate, Schlussrate und Gesamtkosten für Ratenkredit, Ballonfinanzierung und 3-Wege-Finanzierung.',
    url: 'https://www.naira.autos/werkzeuge/autokredit-rechner',
    locale: 'de',
  },
  keywords: [
    'autokredit rechner', 'autokredit zinsen 2026', '3-wege-finanzierung rechner',
    'ballonfinanzierung rechner', 'autokredit vergleich', 'effektiver jahreszins autokredit',
    'widerrufsrecht autokredit', 'schlussrate berechnen',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/werkzeuge/autokredit-rechner',
      name: 'Autokredit Rechner 2026 — Ratenkredit, Ballon & 3-Wege-Finanzierung',
      description: 'Kostenloser Autokredit-Rechner mit aktuellen Zinsen 2026: Ratenkredit, Ballonfinanzierung und 3-Wege-Finanzierung im Vergleich.',
      url: 'https://www.naira.autos/werkzeuge/autokredit-rechner',
      dateModified: '2026-09-29',
      inLanguage: 'de',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Was ist ein guter Zinssatz für einen Autokredit 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Der Marktdurchschnitt lag Mitte 2026 bei rund 5,9 % effektivem Jahreszins (Verivox-Verbraucheratlas). Direktbanken wie die Postbank oder Targobank starten bei bonitätsstarken Kunden bei 3,25\u20133,49 %, während schwächere Bonität schnell zweistellige Zinssätze bedeuten kann.' } },
        { '@type': 'Question', name: 'Was ist der Unterschied zwischen Ballonfinanzierung und 3-Wege-Finanzierung?', acceptedAnswer: { '@type': 'Answer', text: 'Beide senken die Monatsrate durch eine hohe Schlussrate am Ende. Bei der reinen Ballonfinanzierung gibt es nur zwei Optionen am Ende: zahlen oder umfinanzieren. Die 3-Wege-Finanzierung bietet zusätzlich die Möglichkeit, das Fahrzeug einfach zurückzugeben.' } },
        { '@type': 'Question', name: 'Welche Finanzierungsart ist am günstigsten?', acceptedAnswer: { '@type': 'Answer', text: 'Laut Stiftung Warentest ist der klassische Ratenkredit über die gesamte Laufzeit meist am günstigsten, die 3-Wege-Finanzierung am teuersten \u2014 die niedrigere Monatsrate bei Ballon- und 3-Wege-Finanzierung wird durch höhere Gesamtzinskosten erkauft.' } },
        { '@type': 'Question', name: 'Wie lange kann ich einen Autokreditvertrag widerrufen?', acceptedAnswer: { '@type': 'Answer', text: 'Nach § 355 Abs. 2 BGB haben Sie 14 Tage Zeit, den Darlehensvertrag zu widerrufen, beginnend erst, nachdem alle Pflichtangaben nach § 492 Abs. 2 BGB vollständig erteilt wurden. War die Widerrufsbelehrung fehlerhaft, kann die Frist in Ausnahmefällen gar nicht erst zu laufen beginnen.' } },
        { '@type': 'Question', name: 'Was ist der effektive Jahreszins und warum ist er wichtig?', acceptedAnswer: { '@type': 'Answer', text: 'Der effektive Jahreszins (im Gegensatz zum Sollzins) berücksichtigt Gebühren und den Zinseszins-Effekt und muss nach § 6 PAngV bei jedem Kreditangebot verpflichtend angegeben werden \u2014 er ist die einzige Zahl, die verschiedene Angebote wirklich vergleichbar macht.' } },
        { '@type': 'Question', name: 'Lohnt sich eine 0-%-Finanzierung beim Händler?', acceptedAnswer: { '@type': 'Answer', text: 'Oft ja, besonders wenn der Barzahler-Rabatt auf den gleichen Wagen niedrig ausfällt. Bei hohem Barzahler-Rabatt kann ein klassischer Autokredit mit Rabatt in der Gesamtrechnung trotzdem günstiger sein \u2014 ein direkter Vergleich beider Optionen lohnt sich immer.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Autokredit Rechner', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function AutokreditRechnerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div lang="de" className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link prefetch={false} href="/werkzeuge" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Zurück">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/30">
              <Link prefetch={false} href="/startseite" className="hover:text-white/60 transition-colors">Startseite</Link>
              <ChevronRight className="h-3 w-3" />
              <Link prefetch={false} href="/werkzeuge" className="hover:text-white/60 transition-colors">Werkzeuge</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Autokredit Rechner</span>
            </nav>
            <LanguagePills path="/werkzeuge/autokredit-rechner" className="ms-auto" />
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">Kostenlos</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Marktdurchschnitt: 5,9 % eff.</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Zuletzt geprüft: September 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Autokredit<br /><span className="text-emerald-400">Rechner</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Ratenkredit, Ballon oder 3-Wege-Finanzierung im Vergleich.</p>
            <p className="text-white/75 text-sm leading-relaxed">Wählen Sie Ihre Finanzierungsart und sehen Sie sofort Monatsrate, Schlussrate und Gesamtkosten — mit aktuellen Zinsbändern und dem gesetzlichen Widerrufsrecht erklärt.</p>
          </div>
        </div>
      </div>

      <AutokreditRechnerClient />

      <div lang="de" className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-10">

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Autokredit in Deutschland — Zinsen, und warum die Finanzierungsart über die Gesamtkosten entscheidet</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <p>Ein Autokredit in Deutschland wird fast immer als effektiver Jahreszins angegeben, und der Marktdurchschnitt lag laut <a href="https://www.capitalo.de/anbieter/ing/news/ing-autokredit-zinsen" target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-foreground">Verivox-Verbraucheratlas</a> Mitte 2026 bei rund <strong className="text-foreground">5,9 %</strong> — bonitätsabhängig und mit großer Spannweite zwischen den Anbietern. Direktbanken unterbieten sich dabei regelmäßig: Die Postbank startete im Sommer 2026 bei 3,25 % effektiv, die Targobank bei 3,49 %, die ING bei 3,99 % (nach einer Zinserhöhung am 20. Juli 2026, als Reaktion auf die EZB-Leitzinsanhebung im Juni). Wer eine schwächere Bonität hat, landet dagegen schnell im zweistelligen Bereich — bei der ING etwa bis zu 10,99 % effektiv im selben Angebot.</p>
              <p>Entscheidender als die Bank ist aber oft die Finanzierungsart selbst, denn davon hängt ab, wie die Gesamtkosten am Ende tatsächlich aussehen. Der effektive Jahreszins muss nach § 6 der Preisangabenverordnung (PAngV) bei jedem Kreditangebot verpflichtend ausgewiesen werden — anders als der reine Sollzins, der die tatsächlichen Kosten unterschätzt, weil er Gebühren und den Zinseszins-Effekt nicht einrechnet. Ab November 2026 verschärft sich das noch einmal: Die neue EU-Verbraucherkreditrichtlinie (CCD II) tritt dann in deutsches Recht um und bringt zusätzliche Informationspflichten für Kreditgeber mit sich.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Drei-Wege-Finanzierung — die einzige Option mit Rückgabe-Recht</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Drei Finanzierungsarten teilen sich den Markt, und sie sind keineswegs austauschbar: der klassische Ratenkredit tilgt den vollen Betrag in gleichbleibenden Raten bis auf null; die Ballonfinanzierung senkt die Monatsrate, indem ein großer Teil der Schuld — die Schlussrate — erst am Ende fällig wird, mit nur zwei Optionen: zahlen oder teuer umfinanzieren; die 3-Wege-Finanzierung (auch Vario-Finanzierung genannt) funktioniert genauso, bietet am Laufzeitende aber zusätzlich die Möglichkeit, das Fahrzeug einfach zurückzugeben. Laut Stiftung Warentest ist der klassische Ratenkredit über die gesamte Laufzeit gerechnet meist die günstigste Variante, die 3-Wege-Finanzierung dagegen die teuerste — genau der Tausch, den die niedrigere Monatsrate am Ende kostet.</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '5,9 %', desc: 'Marktdurchschnitt eff. Jahreszins, Mitte 2026', color: 'text-emerald-600 dark:text-emerald-400' },
              { label: '14 Tage', desc: 'Widerrufsrecht für den Darlehensvertrag (§ 355 BGB)', color: 'text-blue-600 dark:text-blue-400' },
              { label: '19 %', desc: 'MwSt. bereits im Fahrzeugpreis enthalten', color: 'text-amber-600 dark:text-amber-400' },
            ].map(({ label, desc, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-card border border-border text-center">
                <p className={`text-2xl font-black mb-2 ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Das 14-tägige Widerrufsrecht — Ihr gesetzlicher Rücktritt vom Darlehensvertrag</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Ein gesetzliches Recht kennen viele Käufer nicht, bis sie es brauchen: Nach § 355 Abs. 2 BGB haben Verbraucher ein 14-tägiges Widerrufsrecht für den Darlehensvertrag, beginnend erst, nachdem alle Pflichtangaben nach § 492 Abs. 2 BGB vollständig erteilt wurden. Wichtig ist die Unterscheidung: Widerrufen werden kann der Darlehensvertrag, nicht automatisch der Kaufvertrag über das Fahrzeug selbst — rechtlich sind das zwei getrennte Verträge, die als &bdquo;verbundenes Geschäft&ldquo; wirtschaftlich zusammenhängen, sodass ein wirksamer Widerruf des Kredits in der Praxis meist auch den Autokauf rückabwickelt. War die Widerrufsbelehrung der Bank fehlerhaft oder unvollständig — ein Streitpunkt, der deutsche Gerichte seit Jahren beschäftigt —, kann die 14-Tage-Frist sogar überhaupt nicht zu laufen beginnen, was in Einzelfällen noch Jahre nach Vertragsschluss zum Widerruf berechtigt hat.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Beispielrechnung: Ratenkredit vs. 3-Wege-Finanzierung</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Ein Rechenbeispiel zeigt den Unterschied konkret: Bei einem Fahrzeugpreis von 25.000 €, einer Anzahlung von 2.500 € und einem Zinssatz von 5,9 % effektiv ergibt sich für einen klassischen Ratenkredit über 48 Monate eine Monatsrate von rund 527 € — am Ende ist das Auto vollständig abbezahlt, bei Gesamtkosten von etwa 27.814 €. Entscheidet man sich stattdessen für eine 3-Wege-Finanzierung mit 30 % Schlussrate (7.500 €) bei gleichem Zinssatz und gleicher Laufzeit, sinkt die Monatsrate auf etwa 388 € — fast 140 € weniger im Monat —, aber die Gesamtkosten steigen auf rund 28.646 €, zusätzlich zu der Schlussrate, die am Ende noch bezahlt, zurückfinanziert oder durch Rückgabe des Fahrzeugs beglichen werden muss.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Gebrauchtwagen und die SCHUFA-Auskunft</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Gebrauchtwagen werden in Deutschland fast genauso oft finanziert wie Neuwagen. Ein Gebrauchtwagen kostete 2025 im Schnitt 18.310 € (DAT-Report 2026), und rund die Hälfte aller privaten Käufer finanziert diesen Betrag über einen Kredit statt bar zu zahlen. Die Zinsen fallen bei Gebrauchtwagen tendenziell etwas höher aus als bei Neuwagen, weil die Bank das Ausfallrisiko über die Restlaufzeit schwerer einschätzen kann, und manche Anbieter verlangen bei älteren Fahrzeugen eine höhere Anzahlung oder verkürzen die maximale Laufzeit. Vor der Kreditentscheidung lohnt sich außerdem ein Blick auf die eigene Bonität: Banken prüfen vor jeder Zusage die SCHUFA-Auskunft, und ein negativer oder lückenhafter Eintrag kann selbst bei stabilem Einkommen zu einer schlechteren Zinszusage oder einer Ablehnung führen — ein kostenloser Blick in die eigene Selbstauskunft vor der Kreditanfrage schützt davor, böse Überraschungen erst beim Händler zu erleben.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Wo Deutsche tatsächlich einen Autokredit abschließen</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Finanziert wird in Deutschland über drei unterschiedliche Kanäle. Direktbanken wie ING, Postbank, Targobank und die Bank of Scotland bieten reine Online-Abwicklung und zählen regelmäßig zu den günstigsten Anbietern. Herstellerbanken — Volkswagen Bank, Mercedes-Benz Bank, BMW Bank und ähnliche — sind direkt beim Autohändler eingebunden und locken gelegentlich mit echten 0-%-Finanzierungen, die sich besonders bei niedrigem Rabatt auf den Barpreis lohnen können. Und die klassische Hausbank oder Sparkasse bietet oft einen zweckgebundenen Autokredit an, der günstiger ist als ein freier Ratenkredit, weil das Fahrzeug selbst als Sicherheit dient. Sondertilgungen — außerplanmäßige Zahlungen, die den Kredit schneller tilgen — sind bei den meisten Direktbank-Autokrediten kostenlos möglich, oft bis zu 20 % der Restschuld pro Jahr, wie es etwa die Bank of Scotland anbietet. Das lohnt sich besonders bei einer 3-Wege-Finanzierung oder Ballonfinanzierung, wo eine frühzeitige Teiltilgung die spätere Schlussrate spürbar senken kann.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Häufige Fragen zum Autokredit</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'Was ist ein guter Zinssatz für einen Autokredit 2026?', a: 'Der Marktdurchschnitt lag Mitte 2026 bei rund 5,9 % effektivem Jahreszins. Direktbanken starten bei bonitätsstarken Kunden bei 3,25\u20133,49 %, schwächere Bonität kann schnell zweistellige Zinssätze bedeuten.' },
                { q: 'Was ist der Unterschied zwischen Ballonfinanzierung und 3-Wege-Finanzierung?', a: 'Bei der Ballonfinanzierung gibt es am Ende nur zwei Optionen: zahlen oder umfinanzieren. Die 3-Wege-Finanzierung bietet zusätzlich die Möglichkeit, das Fahrzeug zurückzugeben.' },
                { q: 'Welche Finanzierungsart ist am günstigsten?', a: 'Laut Stiftung Warentest ist der klassische Ratenkredit über die gesamte Laufzeit meist am günstigsten, die 3-Wege-Finanzierung am teuersten.' },
                { q: 'Wie lange kann ich einen Autokreditvertrag widerrufen?', a: 'Nach § 355 Abs. 2 BGB haben Sie 14 Tage Zeit für den Darlehensvertrag, beginnend erst nach vollständiger Pflichtangabe gemäß § 492 Abs. 2 BGB. Bei fehlerhafter Belehrung kann die Frist in Ausnahmefällen gar nicht erst beginnen.' },
                { q: 'Was ist der effektive Jahreszins und warum ist er wichtig?', a: 'Er berücksichtigt Gebühren und den Zinseszins-Effekt und muss nach § 6 PAngV verpflichtend angegeben werden \u2014 die einzige Zahl, die Angebote wirklich vergleichbar macht.' },
                { q: 'Lohnt sich eine 0-%-Finanzierung beim Händler?', a: 'Oft ja, besonders bei niedrigem Barzahler-Rabatt. Bei hohem Rabatt kann ein klassischer Autokredit trotzdem günstiger sein \u2014 ein Vergleich lohnt sich immer.' },
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

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Geprüft von <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Evelyn John</Link>, Auto Sales Expert. Zinsen und Rechtsgrundlagen abgeglichen mit dem Verivox-Verbraucheratlas, aktuellen Konditionsmitteilungen der Direktbanken, Stiftung Warentest und dem Bürgerlichen Gesetzbuch (BGB).
          </p>

        </div>
      </div>
    </>
  );
}
