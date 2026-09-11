import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { WasIstMeinAutoWertClient } from './client';

export const metadata: Metadata = {
  title: 'Was ist mein Auto wert? Kostenlose KI-Bewertung | Naira Autos',
  description: 'Bewerten Sie Ihr Auto kostenlos mit KI, in Ihrer lokalen Währung. Laden Sie ein Foto hoch und erhalten Sie sofort einen Preis — Deutschland, Österreich, Schweiz und mehr.',
  keywords: 'was ist mein auto wert, kostenlose autobewertung, gebrauchtwagen preis, autobewertung KI, auto online bewerten, autowert berechnen',
  openGraph: {
    title: 'Was ist mein Auto wert? Kostenlose KI-Bewertung',
    description: 'Bewerten Sie Ihr Auto per KI, in Ihrer lokalen Währung, in Deutschland, Österreich und der Schweiz. Laden Sie ein Foto hoch und erhalten Sie eine sofortige Schätzung — völlig kostenlos.',
    url: 'https://www.naira.autos/werkzeuge/was-ist-mein-auto-wert',
    siteName: 'Naira Autos',
    locale: 'de',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/werkzeuge/was-ist-mein-auto-wert',
    languages: {
      en: 'https://www.naira.autos/evaluate-used-car',
      es: 'https://www.naira.autos/cuanto-vale-mi-auto',
      ar: 'https://www.naira.autos/kam-qeemat-sayarati',
      fr: 'https://www.naira.autos/outils/combien-vaut-ma-voiture',
      pt: 'https://www.naira.autos/ferramentas/quanto-vale-meu-carro',
      de: 'https://www.naira.autos/werkzeuge/was-ist-mein-auto-wert',
      ja: 'https://www.naira.autos/tsuru/kuruma-satei',
      'x-default': 'https://www.naira.autos/evaluate-used-car',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Was ist mein Auto wert? Kostenlose KI-Bewertung',
  description: 'Kostenloses KI-Tool zur Autobewertung. Sofortige Schätzung in Ihrer lokalen Währung, kalibriert auf den Markt Ihres Landes.',
  url: 'https://www.naira.autos/werkzeuge/was-ist-mein-auto-wert',
  inLanguage: 'de',
  dateModified: '2026-09-09',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'KI-Autobewertung — Naira Autos',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0' },
    description: 'Laden Sie ein Foto Ihres Autos hoch und erhalten Sie sofort eine Marktpreis-Schätzung per KI, in Ihrer Währung.',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://www.naira.autos/startseite' },
      { '@type': 'ListItem', position: 2, name: 'Werkzeuge', item: 'https://www.naira.autos/werkzeuge' },
      { '@type': 'ListItem', position: 3, name: 'Was ist mein Auto wert', item: 'https://www.naira.autos/werkzeuge/was-ist-mein-auto-wert' },
    ],
  },
  faqPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Was ist mein Gebrauchtwagen wert?', acceptedAnswer: { '@type': 'Answer', text: 'Das hängt von Marke, Modell, Baujahr, Ausstattung, Kilometerstand und allgemeinem Zustand ab, sowie den aktuellen Verkaufspreisen ähnlicher Fahrzeuge in Ihrem Land. Laden Sie oben ein Foto hoch und wählen Sie Ihr Land — die KI identifiziert Ihr Auto und gibt Ihnen eine Preisspanne in Ihrer lokalen Währung, basierend auf echten Inseraten aus diesem Markt.' } },
      { '@type': 'Question', name: 'Welche Faktoren beeinflussen die Bewertung eines Gebrauchtwagens?', acceptedAnswer: { '@type': 'Answer', text: 'Die wichtigsten Faktoren sind: (1) Marke und Modell — manche behalten je nach Markt besser ihren Wert. (2) Baujahr, Ausstattung und Kilometerstand. (3) Zustand von Karosserie und Lack. (4) Mechanischer Zustand und Wartungshistorie. (5) Vollständige Papiere und Zulassung. (6) Lokales Angebot und Nachfrage — dasselbe Auto kann je nach Land unterschiedlich viel wert sein.' } },
      { '@type': 'Question', name: 'Beeinflusst mein Land die Bewertung?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, erheblich. Einfuhrabgaben, lokale Nachfrage nach bestimmten Marken, Währungsstärke und die Größe des Gebrauchtwagenmarkts lassen die Preise zwischen Ländern stark variieren. Unser Tool deckt Deutschland, Österreich und die Schweiz ab und gibt Ihnen eine Schätzung in der richtigen lokalen Währung, kalibriert auf diesen Markt statt auf einen globalen Durchschnitt.' } },
      { '@type': 'Question', name: 'Wie genau ist die KI-Bewertung?', acceptedAnswer: { '@type': 'Answer', text: 'Unser Tool nutzt Computer Vision, um Marke, Modell, Baujahr und Ausstattung präzise aus Ihrem Foto zu erkennen, und vergleicht sie dann mit echten Inseratsdaten im gewählten Land, um Ihnen eine Preisspanne zu geben — keine einzelne Zahl. Betrachten Sie es als verlässlichen Ausgangspunkt für Verhandlungen, nicht als Endpreis — der tatsächliche Wert hängt immer von einer persönlichen Besichtigung und Verhandlung ab.' } },
      { '@type': 'Question', name: 'Ist dieses Bewertungstool wirklich kostenlos?', acceptedAnswer: { '@type': 'Answer', text: 'Ja. Ohne jegliche Kosten, ohne Konto und ohne Nutzungslimit.' } },
    ],
  },
};

const VALUATION_FACTORS = [
  { icon: TrendingUp, title: 'Marke und Wiederverkaufswert', body: 'Die Wiederverkaufsstärke variiert je nach Markt — Toyota und Honda behalten in den meisten Regionen gut ihren Wert, während deutsche Luxusmarken in Märkten mit hohen Wartungskosten schneller an Wert verlieren. Die lokale Nachfrage zählt genauso viel wie das Markenemblem.' },
  { icon: Shield, title: 'Kilometerstand und Wartungshistorie', body: 'Ein niedriger Kilometerstand und eine dokumentierte Wartungshistorie sind weltweit die beiden zuverlässigsten Indikatoren für ein gut gepflegtes Auto. Eine lückenlose Historie kann mehr wert sein als ein ein Jahr jüngeres Modell.' },
  { icon: CheckCircle2, title: 'Eigentum und Dokumentation', body: 'Saubere, vollständige Fahrzeugpapiere und eine gültige Zulassung sind für den besten Wert in jedem Markt nicht verhandelbar. Unvollständige Papiere oder Importprobleme können den Preis um 15 bis 25 % senken.' },
  { icon: AlertCircle, title: 'Allgemeiner Zustand', body: 'Eine saubere Karosserie ohne Kratzer, Rost oder abgenutzten Lack, mit mechanisch einwandfreiem Motor, erhöht den Marktwert im Vergleich zu einem ähnlichen Auto mit sichtbaren Gebrauchsspuren durchgängig um 10 bis 15 %.' },
];

const FAQ_ITEMS = [
  { q: 'Was ist mein Gebrauchtwagen wert?', a: 'Das hängt von Marke, Modell, Baujahr, Ausstattung, Kilometerstand und Zustand ab — sowie den aktuellen Verkaufspreisen ähnlicher Fahrzeuge in Ihrem Land. Laden Sie oben ein Foto hoch und wählen Sie Ihr Land für eine KI-Schätzung in Ihrer lokalen Währung.' },
  { q: 'Welche Faktoren beeinflussen die Bewertung eines Gebrauchtwagens?', a: 'Marke und Modell, Baujahr und Ausstattung, Kilometerstand, Zustand von Karosserie und Mechanik, vollständige Papiere und Zulassung, sowie lokales Angebot und Nachfrage in Ihrem spezifischen Markt.' },
  { q: 'Beeinflusst mein Land die Bewertung?', a: 'Ja — Einfuhrabgaben, lokale Nachfrage nach bestimmten Marken, Währungsstärke und Marktgröße lassen die Preise zwischen Ländern variieren. Wir decken Deutschland, Österreich und die Schweiz ab und geben Ihnen den Preis in Ihrer lokalen Währung, nicht in einem globalen Durchschnitt.' },
  { q: 'Wie bepreise ich mein Auto richtig, bevor ich es verkaufe?', a: 'Nutzen Sie unser kostenloses KI-Bewertungstool für eine Zahl, und prüfen Sie dann aktuelle Inserate ähnlicher Autos in Ihrer Region. Ein Preis 5 bis 10 % über dem Mindestbetrag, den Sie akzeptieren würden, lässt meist Verhandlungsspielraum.' },
  { q: 'Wie genau ist die KI-Bewertung?', a: 'Sie nutzt Computer Vision, um Ihr Auto präzise aus dem Foto zu erkennen, und vergleicht es dann mit echten Inseratsdaten im gewählten Land. Betrachten Sie es als verlässlichen Ausgangspunkt, nicht als Endpreis — der tatsächliche Wert hängt von Besichtigung und Verhandlung ab.' },
  { q: 'Ist das Autobewertungstool kostenlos?', a: 'Ja — ohne Kosten, ohne Konto und ohne Nutzungslimit.' },
];

export default function WasIstMeinAutoWertPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-background">

        {/* ── Dunkler Hero ── */}
        <div className="bg-[#080C10] pt-16 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center gap-3 mb-6 text-left">
              <Link href="/werkzeuge" className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/15 hover:border-amber-400/40 text-white/60 hover:text-amber-400 transition-all flex-shrink-0" aria-label="Zurück">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/30">
                <Link href="/startseite" className="hover:text-white/60 transition-colors">Startseite</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/werkzeuge" className="hover:text-white/60 transition-colors">Werkzeuge</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/50">Was ist mein Auto wert</span>
              </nav>
            </div>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                Mit KI · Kostenlos
              </span>
              <Link href="/evaluate-used-car" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)' }}>
              Was ist<br /><span className="text-amber-400">Ihr Auto wert?</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
              Laden Sie ein Foto hoch — erhalten Sie eine sofortige Marktbewertung in Ihrer lokalen Währung, basierend auf echten Inseratsdaten und KI.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/30 text-xs font-medium">
              <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-amber-400" /> Fotoanalyse</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span>Deutschland · Österreich · Schweiz</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span className="text-amber-400 font-semibold">100 % kostenlos</span>
            </div>
          </div>
        </div>

        {/* ── Bewertungstool ── */}
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <WasIstMeinAutoWertClient />
          </div>
        </div>

        {/* ── SEO-Inhalt ── */}
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16 space-y-14">

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Den Wert verstehen</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              Was bestimmt den Preis eines Gebrauchtwagens?
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
              Gebrauchtwagenbewertung: der vollständige Leitfaden
            </h2>

            <p>Den wahren Marktwert Ihres Autos zu kennen ist der wichtigste Schritt, bevor Sie es zum Verkauf anbieten, in Zahlung geben oder einen Kauf verhandeln — überall auf der Welt. Ein zu hoher Preis lässt Ihr Inserat unverkauft liegen. Ein zu niedriger Preis lässt echtes Geld auf dem Tisch liegen. Die Herausforderung ist, dass der &bdquo;Marktwert&ldquo; keine einzelne Zahl ist — er variiert je nach Land, Währung, lokaler Nachfrage nach einer bestimmten Marke sowie der individuellen Historie und dem Zustand jedes Autos.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Warum dasselbe Auto in verschiedenen Ländern nicht denselben Preis hat</h3>
            <p>Ein fünf Jahre alter Toyota Corolla in gutem Zustand kann in Deutschland, Österreich oder der Schweiz einen ganz unterschiedlichen Betrag wert sein — schon vor der Währungsumrechnung. Einfuhrabgaben und lokale Steuern auf Gebrauchtwagen variieren stark zwischen Ländern. Manche Märkte haben eine starke lokale Nachfrage nach bestimmten Marken, was höhere Wiederverkaufspreise erhält. Andere Märkte haben einen größeren Neuwagenmarkt, der Käufer vom Gebrauchtwagenmarkt fernhält, was dessen Wiederverkaufswert senkt. Deshalb funktioniert ein einziger, globaler Preisleitfaden nicht — die Bewertung muss pro Land kalibriert werden.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Kilometerstand und Wartungshistorie</h3>
            <p>In fast allen Märkten sind Kilometerstand und eine dokumentierte Wartungshistorie zuverlässigere Indikatoren für den Zustand eines Autos, als ein Foto zeigen kann. Ein Auto mit niedrigerem Kilometerstand und lückenlosem Wartungsheft erzielt in der Regel einen deutlichen Preisaufschlag gegenüber einem vergleichbaren Auto desselben Baujahrs mit höherem Kilometerstand, selbst wenn sie auf Fotos ähnlich aussehen. Eine unvollständige oder fehlende Wartungshistorie ist einer der schnellsten Wege, als Verkäufer Verhandlungsmacht zu verlieren.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Eigentum, Zulassung und Dokumentation</h3>
            <p>In jedem Land, das wir abdecken, sind <strong className="text-foreground">saubere, vollständige Papiere für den besten Wert nicht verhandelbar</strong>. Käufer ziehen zu Recht Wert von Autos mit unvollständigen Papieren, ausstehenden Einfuhrabgaben oder unvollständiger Zulassung ab, da das Risiko von Komplikationen bei der Eigentumsübertragung in jedem Land real ist. Dokumentationsprobleme vor der Anzeigenschaltung zu klären, kostet in der Regel deutlich weniger als der Preisabschlag, den Käufer sonst verlangen würden.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Allgemeiner Zustand und Präsentation</h3>
            <p>Eine saubere Karosserie ohne Kratzer, Rost oder abgenutzten Lack, mit mechanisch einwandfreiem Motor und Getriebe, erhöht durchgängig den Preis im Vergleich zu einem ähnlichen Auto mit sichtbaren Gebrauchsspuren — egal ob das Auto in Berlin, Wien oder Zürich verkauft wird. Einfache, kostengünstige Reparaturen (eine gründliche Reinigung, kleine Kratzer ausbessern, eine durchgebrannte Glühbirne wechseln) zahlen sich im Verkaufspreis oft mehrfach aus.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Währung und Markttiming</h3>
            <p>In Ländern, die stark von importierten Gebrauchtwagen abhängen, sind die Autopreise eng an Wechselkursbewegungen gekoppelt — eine schwächere lokale Währung erhöht die Importkosten und treibt die Gebrauchtwagenpreise nach oben, während eine stärkere Währung den gegenteiligen Effekt hat. Das bedeutet, eine ein oder zwei Jahre alte Bewertung ist möglicherweise kein verlässlicher Leitfaden für aktuelle Preise mehr. Prüfen Sie immer aktuelle Marktdaten, statt sich auf einen alten Preisleitfaden oder den Kaufpreis eines Vorbesitzers zu verlassen.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Wie dieses Tool funktioniert</h3>
            <p>Laden Sie ein scharfes Foto Ihres Autos hoch und wählen Sie Ihr Land. Die KI (Gemini Vision) identifiziert Marke, Modell, Baujahr und Ausstattung aus dem Foto und vergleicht sie dann mit echten, aktuellen Inseratsdaten im gewählten Markt, um Ihnen eine Preisspanne in Ihrer lokalen Währung zu geben — nicht nur eine einzelne Schätzung. Das Ergebnis enthält die spezifischen Faktoren, die die Bewertung beeinflusst haben, damit Sie verstehen, warum diese Zahl zustande kam. Gedacht als schneller, kostenloser Ausgangspunkt für Verhandlungen, nicht als Ersatz für eine persönliche Besichtigung.</p>
          </section>

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Häufig gestellte Fragen</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              Häufigste Fragen
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
              Weitere kostenlose Werkzeuge
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/werkzeuge/virtueller-mechaniker" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Virtueller KI-Mechaniker</p>
                <ArrowRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/werkzeuge" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Alle Werkzeuge</p>
                <ArrowRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/startseite" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Startseite auf Deutsch</p>
                <ArrowRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
