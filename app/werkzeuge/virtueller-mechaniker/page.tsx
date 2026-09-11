import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, CheckCircle2, Check } from 'lucide-react';
import AIMechanicClientDE from './client';

export const metadata: Metadata = {
  title: 'Virtueller KI-Mechaniker — Kostenlose Auto-Diagnose Online | Naira Autos',
  description: 'Kostenloser virtueller Mechaniker mit KI. Beschreiben Sie das Problem, oder laden Sie ein Foto, Motorgeräusch oder Video hoch, und erhalten Sie sofort eine Diagnose mit geschätzten Reparaturkosten. Ohne Registrierung, für Deutschland.',
  alternates: {
    canonical: 'https://www.naira.autos/werkzeuge/virtueller-mechaniker',
    languages: {
      'en': 'https://www.naira.autos/tools/ai-mechanic',
      'es': 'https://www.naira.autos/herramientas/mecanico-virtual',
      'ar': 'https://www.naira.autos/adawat/mikaniki-iftiradi',
      'fr': 'https://www.naira.autos/outils/mecanicien-virtuel',
      'pt': 'https://www.naira.autos/ferramentas/meu-mecanico-virtual',
      'de': 'https://www.naira.autos/werkzeuge/virtueller-mechaniker',
      'ja': 'https://www.naira.autos/tsuru/ai-shindan',
      'x-default': 'https://www.naira.autos/tools/ai-mechanic',
    },
  },
  openGraph: {
    title: 'Axion — Kostenloser Virtueller Mechaniker mit KI | Naira Autos',
    description: 'Sofortige Auto-Diagnose online, wo immer Sie sind. Laden Sie ein Motorgeräusch, ein Foto hoch, oder beschreiben Sie das Problem. Erhalten Sie eine Dringlichkeitsstufe, wahrscheinliche Ursachen, Schritte zum Selbermachen und eine Kostenschätzung. 100% kostenlos, ohne Registrierung.',
    url: 'https://www.naira.autos/werkzeuge/virtueller-mechaniker',
  },
  keywords: ['virtueller Mechaniker', 'Auto-Diagnose online', 'KI Fahrzeugdiagnose', 'Autoproblem', 'Mechaniker online kostenlos', 'Reparaturkosten Auto', 'kostenlose Fahrzeugdiagnose', 'virtueller Mechaniker Deutschland'],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/werkzeuge/virtueller-mechaniker',
      name: 'Virtueller KI-Mechaniker — Kostenlose Auto-Diagnose Online',
      description: 'Kostenloser virtueller Mechaniker mit KI. Laden Sie ein Motorgeräusch, ein Foto hoch, oder beschreiben Sie das Problem. Erhalten Sie sofort eine Diagnose mit Dringlichkeitsstufe und Kostenschätzung.',
      url: 'https://www.naira.autos/werkzeuge/virtueller-mechaniker',
      inLanguage: 'de',
      dateModified: '2026-09-08',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://www.naira.autos/startseite' },
          { '@type': 'ListItem', position: 2, name: 'Werkzeuge', item: 'https://www.naira.autos/werkzeuge' },
          { '@type': 'ListItem', position: 3, name: 'KI-Mechaniker', item: 'https://www.naira.autos/werkzeuge/virtueller-mechaniker' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Was ist der virtuelle Mechaniker und wie funktioniert er?',
          acceptedAnswer: { '@type': 'Answer', text: 'Der virtuelle Mechaniker ist ein Werkzeug, das künstliche Intelligenz nutzt, um Ihr Autoproblem aus der Ferne zu diagnostizieren. Sie beschreiben das Problem, laden optional ein Foto, ein Motorgeräusch oder ein Video hoch, und die KI analysiert alles im Vergleich zu einer riesigen Datenbank bekannter Fahrzeugfehler, um Ihnen eine Diagnose mit Dringlichkeitsstufe und geschätzten Reparaturkosten zu geben.' },
        },
        {
          '@type': 'Question',
          name: 'Funktioniert das Werkzeug in Deutschland?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ja. Das Werkzeug funktioniert aus jedem deutschsprachigen Land und nutzt echtes, standardsprachliches Deutsch — keine wörtliche Übersetzung. Die Kostenschätzung ist eine ungefähre internationale Referenz in US-Dollar, kein exakter lokaler Preis — die tatsächlichen Kosten variieren je nach Werkstatt und Region.' },
        },
        {
          '@type': 'Question',
          name: 'Kann die KI mein Auto nur anhand des Motorgeräuschs diagnostizieren?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ja. Nehmen Sie das Klopfen, Quietschen oder Schleifen auf — schon 10 Sekunden mit dem Handy aufgenommen helfen erheblich. Die KI analysiert das Klangmuster und kann feststellen, ob das Problem bei den Lagern, den Bremsbelägen oder einem anderen spezifischen Defekt liegt.' },
        },
        {
          '@type': 'Question',
          name: 'Ist dieser Service kostenlos?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ja, vollständig kostenlos — ohne Registrierung, ohne Abonnement, ohne jegliche Zahlung. Öffnen Sie die Seite und starten Sie Ihre Diagnose sofort.' },
        },
        {
          '@type': 'Question',
          name: 'Ist die KI-Diagnose immer genau?',
          acceptedAnswer: { '@type': 'Answer', text: 'Nein — nicht immer zu 100% genau. Es ist ein hervorragender Ausgangspunkt basierend auf der Beschreibung, dem Foto, dem Ton oder dem Video, das Sie bereitstellen, aber es kann Dinge übersehen, die nur eine physische Inspektion auf der Hebebühne mit Diagnosegerät erkennen würde. Behandeln Sie es als erste Einschätzung, nicht als endgültige Antwort, und lassen Sie sich bei Bremsen-, Lenkungs- oder Kraftstoffproblemen immer persönlich von einer qualifizierten Fachkraft bestätigen.' },
        },
        {
          '@type': 'Question',
          name: 'Funktioniert es mit VW, BMW, Mercedes oder anderen Marken?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ja. Fragen Sie zu einem Defekt bei VW, BMW, Mercedes, Audi oder jeder anderen Marke — die KI deckt alle großen Hersteller ab. Die Kostenschätzung bleibt eine ungefähre internationale Referenz in US-Dollar, kein lokaler Preis.' },
        },
        {
          '@type': 'Question',
          name: 'Werden meine Unterhaltungen auf Ihren Servern gespeichert?',
          acceptedAnswer: { '@type': 'Answer', text: 'Nein. Der gesamte Gesprächsverlauf wird ausschließlich auf Ihrem Gerät gespeichert, über den lokalen Speicher des Browsers. Wir speichern nichts auf unseren Servern außer der aktiven Nachricht, die Sie für die Diagnose senden. Sie können Ihren Verlauf jederzeit über das Seitenmenü löschen.' },
        },
        {
          '@type': 'Question',
          name: 'Muss ich ein Konto erstellen oder mich anmelden?',
          acceptedAnswer: { '@type': 'Answer', text: 'Nein. Der virtuelle Mechaniker ist vollständig kostenlos und erfordert weder Konto noch Anmeldung noch persönliche Daten. Die Angaben zu Ihrem Fahrzeug werden nur zu Ihrer Bequemlichkeit lokal auf Ihrem Gerät gespeichert.' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Axion — Virtueller KI-Mechaniker',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'Kostenloser virtueller Mechaniker mit KI. Beschreiben Sie das Problem, laden Sie ein Motorgeräusch oder ein Foto hoch, und erhalten Sie sofort eine Diagnose mit geschätzten Reparaturkosten.',
      url: 'https://www.naira.autos/werkzeuge/virtueller-mechaniker',
      inLanguage: 'de',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ],
};

export default function AIMechanicPageDE() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <AIMechanicClientDE />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <p className="text-xs text-muted-foreground">Letzte Aktualisierung: September 2026</p>

          {/* Coverage */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Vollständige Abdeckung</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Was bietet der virtuelle Mechaniker?
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-10">
              Ob Sie eine schnelle Kostenschätzung möchten, einem Online-Mechaniker eine Frage stellen wollen, bevor Sie in die Werkstatt fahren, oder einfach wissen möchten, was die Reparatur kosten wird — dieses Werkzeug deckt das alles ab, kostenlos.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Diagnose von Motorproblemen', desc: 'Klopfen, Zündaussetzer, unregelmäßiger Leerlauf, Überhitzung, Motorkontrollleuchte — die KI identifiziert die wahrscheinlichsten Ursachen, nach Wahrscheinlichkeit sortiert.' },
                { title: 'Klanganalyse', desc: 'Laden Sie eine Aufnahme des Klopfens, Quietschens oder Schleifens hoch. Die KI analysiert das Klangmuster, um den Defekt zu identifizieren.' },
                { title: 'Sofortige Dringlichkeitsstufe', desc: 'Jede Diagnose enthält ein klares Urteil in vier Stufen: sicher zu fahren, genau beobachten, bald zur Werkstatt, oder sofort anhalten.' },
                { title: 'Geschätzte Reparaturkosten', desc: 'Die Schätzung ist eine ungefähre internationale Referenz in US-Dollar — die tatsächlichen Kosten für Teile und Arbeit variieren je nach Land und Werkstatt. Nutzen Sie sie als Ausgangspunkt und holen Sie dann ein lokales Angebot ein.' },
                { title: 'Was Sie selbst tun können', desc: 'Wenn der Defekt etwas ist, das Sie selbst prüfen oder reparieren können, sagen wir Ihnen genau wie — bevor Sie für einen Mechaniker bezahlen.' },
                { title: 'Anschlussfragen', desc: 'Stellen Sie Anschlussfragen und erhalten Sie Antworten basierend auf dem vollständigen Kontext. Jede Sitzung wird auf Ihrem Gerät gespeichert.' },
                { title: 'Unterstützung für alle Marken', desc: 'VW, BMW, Mercedes, Audi, Opel, Ford, Skoda, Seat, und jede andere Marke oder jeden Markt.' },
                { title: 'Diagnose per Foto und Video', desc: 'Senden Sie ein Foto einer Warnleuchte im Armaturenbrett, eines ungewöhnlichen Lecks oder eines sichtbaren Schadens. Jedes zusätzliche Medium verbessert die Diagnosegenauigkeit erheblich.' },
                { title: 'Identifikation der benötigten Teile', desc: 'Jede Diagnose enthält die spezifischen Teile, die am wahrscheinlichsten die Ursache sind, damit Sie genau wissen, was Sie bei einer Werkstatt oder einem Teilehändler bestellen müssen.' },
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
                Was ist der virtuelle KI-Mechaniker?
              </h2>
              <p className="mb-3"><strong className="text-foreground">Der virtuelle Mechaniker</strong> ist genau das, wonach er klingt: ein Mechaniker, mit dem Sie per Text, Foto, Ton oder Video sprechen, statt persönlich vorbeizukommen. Sie beschreiben, was mit Ihrem Auto los ist — dieses seltsame Geräusch beim Kaltstart, die Motorkontrollleuchte, die nicht ausgeht, die Bremse, die sich weich anfühlt — und erhalten innerhalb von Sekunden eine Antwort, die auf fundiertem Wissen über echte Fahrzeugdefekte basiert.</p>
              <p>Axion, <strong className="text-foreground">unser KI-Mechaniker</strong>, funktioniert mit jeder Marke und in jedem Land, wurde aber mit echtem, für deutsche Leser geschriebenem Deutsch entwickelt — keine Übersetzung aus dem Englischen.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                So erhalten Sie in unter einer Minute eine Diagnose für Ihr Auto
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">1. Beschreiben Sie das Problem.</strong> Schreiben Sie, was passiert — je mehr Details, desto besser. Wann hat das Problem begonnen? Tritt es nur bei Kälte auf, beim Beschleunigen, oder beim Lenken?</p>
                <p><strong className="text-foreground">2. Laden Sie ein Foto, einen Ton oder ein Video hoch (optional, aber sehr hilfreich).</strong> Eine zehnsekündige Aufnahme des Motorgeräuschs ist oft nützlicher als ein ganzer Absatz Beschreibung.</p>
                <p><strong className="text-foreground">3. Erhalten Sie Ihre Diagnose sofort.</strong> Dringlichkeitsstufe, wahrscheinliche Ursachen nach Wahrscheinlichkeit sortiert, was Sie selbst prüfen können, und eine geschätzte Reparaturkosten.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Kostenschätzung: Vermeiden Sie überhöhte Werkstattpreise
              </h2>
              <p className="mb-3">Einer der häufigsten Wege, wie Kunden in der Werkstatt zu viel bezahlen, ist der Besuch ohne vorherige Kenntnis der zu erwartenden Reparaturkosten. Nutzen Sie vor dem Werkstattbesuch unsere <strong className="text-foreground">Kostenschätzung</strong>, um zu wissen, was ein fairer Preis ist — Teile und Arbeit, klar aufgeschlüsselt.</p>
              <p>Die Schätzung berücksichtigt Ihr spezifisches Auto — Marke, Modell und Baujahr — und den wahrscheinlichsten Defekt basierend auf Ihrer Beschreibung. Es ist keine generische Zahl: Ein VW Golf Baujahr 2010 mit 180.000 km und fallendem Öldruck erhält eine andere Schätzung als ein Golf Baujahr 2020 mit 40.000 km und derselben Leuchte, weil die wahrscheinliche Ursache eine andere ist.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Funktioniert mit jeder Marke: VW, BMW, Mercedes, Audi und mehr
              </h2>
              <p className="mb-3">Es spielt keine Rolle, was Sie fahren. Die KI kennt die spezifischen Fehlermuster jedes Herstellers — VW, BMW, Mercedes, Audi, Opel, Ford, Skoda, Seat, und praktisch jede andere Marke, die heute auf den Straßen unterwegs ist. Geben Sie einmal Marke, Modell und Baujahr an, und die Diagnose passt sich den bekannten Defekten genau dieses Fahrzeugs bei diesem Kilometerstand an, statt Ihnen eine generische Antwort zu geben, die für jedes Auto gleichermaßen gelten würde.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Warum die Diagnose per Motorgeräusch alles verändert
              </h2>
              <p className="mb-3">Ein erfahrener Mechaniker kann oft schon am Geräusch erkennen, was mit einem Auto los ist, bevor er die Motorhaube öffnet. Unsere KI macht dasselbe: Laden Sie eine Aufnahme des Geräuschs hoch — Klopfen, Quietschen, Schleifen — und das System analysiert das Klangmuster im Vergleich zu Tausenden bekannter Defekte. Eine zehnsekündige Aufnahme mit dem Handy reicht oft aus, um zwischen einem ernsten Problem und etwas, das warten kann, zu unterscheiden.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Beispiel: Nur Text gegen Text mit Ton
              </h2>
              <p>Der VW Golf von Markus begann beim Kaltstart leicht zu klopfen. Bei der Beschreibung nur per Text ("Klopfgeräusch beim morgendlichen Starten") gab die KI eine breite Liste zurück — niedriger Ölstand, Ventilstößel-Geräusch, oder locker sitzender Hitzeschutz — mit etwa 60% Sicherheit. Er nahm dann 12 Sekunden Ton mit dem Handy auf und lud sie hoch. Mit dem Ton wurde die Diagnose präzise: Geräusch der hydraulischen Ventilstößel wegen verspätetem Ölwechsel, mit über 85% Sicherheit, einer konkreten Kostenspanne, und der Bestätigung, dass es sicher war, kurzzeitig weiterzufahren, während er einen Ölwechseltermin vereinbarte.</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-4">Diagnosegenauigkeit nach Eingabeart</h3>
              <div className="space-y-3">
                {[
                  { label: 'Nur Textbeschreibung', pct: 60, color: 'bg-orange-500' },
                  { label: '+ Foto beigefügt', pct: 75, color: 'bg-amber-500' },
                  { label: '+ Audioaufnahme', pct: 85, color: 'bg-emerald-500' },
                  { label: '+ Video', pct: 90, color: 'bg-emerald-600' },
                ].map(({ label, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{label}</span>
                      <span className="font-bold text-foreground">~{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${color}`} style={{ width: pct + '%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Unterstützte Fahrzeuge</h3>
              <div className="flex flex-wrap gap-1.5">
                {['VW', 'BMW', 'Mercedes', 'Audi', 'Opel', 'Ford', 'Skoda', 'Seat', 'Toyota', 'Renault', 'Peugeot', 'Lkw', 'Busse', 'Motorräder'].map(v => (
                  <span key={v} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">{v}</span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-3">Auf einen Blick</h3>
              <ul className="space-y-2.5">
                {[
                  '100% kostenlos — ohne Abonnement',
                  'Kein Konto, keine Registrierung nötig',
                  'Funktioniert auf Handy und Computer',
                  'Kostenschätzung als internationale Referenz',
                  'Rund um die Uhr verfügbar, auch sonntags',
                  'Gesprächsverlauf lokal gespeichert',
                  'Unbegrenzte Anschlussfragen',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                    <Check className="h-3 w-3 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Auch bei Naira Autos</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Kostenlose Fahrzeugbewertung', href: '/evaluate-car' },
                  { label: 'Motorgeräusch-Analysator', href: '/tools/engine-sound-analyzer' },
                  { label: 'Einfuhrzoll-Rechner', href: '/tools/import-duty-calculator' },
                  { label: 'Fahrzeugpapiere-Checkliste', href: '/tools/vehicle-papers-checklist' },
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

          {/* Comparison */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Vergleich</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Virtueller Mechaniker im Vergleich zu anderen Optionen
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground text-sm">Funktion</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">KI-Mechaniker</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Werkstattbesuch</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Forum/Gruppe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Rund um die Uhr verfügbar', 'Ja', 'Nein', 'Manchmal'],
                    ['Kostenlos', 'Ja', 'Nein', 'Ja'],
                    ['Kein Weg nötig', 'Ja', 'Nein', 'Ja'],
                    ['Kostenschätzung', 'Ja', 'Unterschiedlich', 'Nein'],
                    ['Ton- und Videoanalyse', 'Ja', 'Ja', 'Nein'],
                    ['Sofortige Antwort', 'Ja', 'Nein', 'Manchmal'],
                    ['Gleichbleibende Qualität', 'Ja', 'Unterschiedlich', 'Nein'],
                    ['Verlauf gespeichert', 'Ja', 'Nein', 'Nein'],
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
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Häufige Fragen</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Häufige Fragen
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'Was ist der virtuelle Mechaniker und wie funktioniert er?', a: 'Ein Werkzeug, das KI nutzt, um Ihr Autoproblem aus der Ferne zu diagnostizieren. Sie beschreiben das Problem, laden optionale Medien hoch, und die KI analysiert alles im Vergleich zu einer riesigen Datenbank bekannter Defekte — mit einer Kostenschätzung als internationale Referenz.' },
                { q: 'Funktioniert das Werkzeug in Deutschland?', a: 'Ja. Das Werkzeug nutzt echtes, standardsprachliches Deutsch, keine wörtliche Übersetzung. Die Kostenschätzung bleibt eine ungefähre internationale Referenz, kein exakter lokaler Preis.' },
                { q: 'Ist die KI-Diagnose immer genau?', a: 'Nein — nicht immer zu 100% genau. Ein guter Ausgangspunkt, aber möglicherweise übersieht sie etwas, das eine physische Inspektion auf der Hebebühne erkennen würde. Behandeln Sie es als erste Einschätzung, und lassen Sie sich bei Bremsen-, Lenkungs- oder Kraftstoffproblemen immer persönlich von einem Mechaniker bestätigen.' },
                { q: 'Funktioniert es mit VW, BMW, Mercedes oder anderen Marken?', a: 'Ja. Fragen Sie zu jeder Marke — die KI deckt alle großen Hersteller ab. Die Kostenschätzung ist eine ungefähre internationale Referenz in US-Dollar, kein lokaler Preis.' },
                { q: 'Kann es mein Auto nur anhand des Motorgeräuschs diagnostizieren?', a: 'Ja. Ton ist eine unserer stärksten Eingaben. Laden Sie eine Aufnahme von Klopfen, Quietschen oder Schleifen hoch — schon 10 Sekunden mit dem Handy. Die KI analysiert das Klangmuster, um den wahrscheinlichen Defekt zu identifizieren.' },
                { q: 'Muss ich ein Konto erstellen oder mich anmelden?', a: 'Nein. Der virtuelle Mechaniker ist vollständig kostenlos und erfordert weder Konto noch Registrierung noch persönliche Daten. Die Fahrzeugdaten werden lokal auf Ihrem Gerät gespeichert.' },
                { q: 'Werden meine Unterhaltungen auf Ihren Servern gespeichert?', a: 'Nein. Der gesamte Verlauf wird ausschließlich lokal auf Ihrem Gerät über den Browser-Speicher gespeichert. Wir speichern nichts auf unseren Servern außer der aktiven Nachricht.' },
                { q: 'Wie genau ist die Kostenschätzung für die Reparatur?', a: 'Sie dient als ungefähre internationale Referenz, unter Berücksichtigung unterschiedlicher Preise für Teile und Arbeit zwischen Ländern. Wir geben eine Spanne (vom Minimum bis zum Maximum) an, damit Sie wissen, was angemessen ist. Wenn eine Werkstatt deutlich über dem Maximum liegt, lohnt sich eine Nachfrage.' },
                { q: 'Kann ich eine Kostenschätzung für jede Automarke erhalten?', a: 'Ja. Wir decken VW, BMW, Mercedes, Audi, Opel, Ford, Skoda, Seat und jede andere große Marke ab, egal wo Sie fahren. Die Schätzungen bleiben eine ungefähre internationale Referenz.' },
                { q: 'Was tun, wenn ich einen mobilen Mechaniker oder eine Werkstatt in meiner Nähe brauche?', a: 'Unser Werkzeug diagnostiziert zuerst das Problem, damit Sie genau wissen, wonach Sie fragen müssen, bevor Sie mit der Suche beginnen. Wenn der Defekt eine physische Inspektion oder Spezialausrüstung erfordert, sagen wir Ihnen das klar — und erklären, welche Art von Mechaniker oder Werkstatt Sie suchen sollten.' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none gap-3">
                    <span className="font-semibold text-foreground text-sm leading-relaxed">{q}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Geprüft von <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>, Kfz-Mechaniker. Die Diagnoselogik und die Reparaturkosten-Spannen wurden auf technische Genauigkeit geprüft.
          </p>

          {/* Final CTA */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Bereit? Diagnostizieren Sie Ihr Auto jetzt.
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Kostenlos. Sofort. Ohne Registrierung. Holen Sie sich jetzt Ihre Diagnose.
            </p>
            <a href="#axion-chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
              Kostenlose Diagnose starten
            </a>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Weitere kostenlose Werkzeuge
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/vin-checker',              label: 'Fahrgestellnummer-Prüfer (VIN)', color: 'blue' },
                { href: '/tools/vehicle-papers-checklist', label: 'Fahrzeugpapiere-Checkliste',     color: 'violet' },
                { href: '/tools/import-duty-calculator',   label: 'Einfuhrzoll-Rechner',            color: 'emerald' },
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
