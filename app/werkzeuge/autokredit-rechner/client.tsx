'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator, ChevronDown, RotateCcw, ChevronRight, ExternalLink, AlertTriangle, Info
} from 'lucide-react';

type Modell = 'raten' | 'ballon' | 'drei_wege';

// Illustrative Bonitäts-Bänder — es gibt keine einzige, bundesweit
// veröffentlichte Zinstabelle wie bei SBI oder Experian; der Marktdurchschnitt
// (Verivox-Verbraucheratlas) lag Mitte 2026 bei rund 5,9 % effektiv.
const BONITAET = [
  { key: 'sehr_gut', label: 'Sehr gute Bonität', zins: 3.99 },
  { key: 'gut',       label: 'Durchschnittliche Bonität', zins: 5.9 },
  { key: 'schwach',   label: 'Schwächere Bonität', zins: 9.5 },
] as const;

const ANBIETER = [
  { name: 'ING Autokredit', note: 'Ab 3,99 % eff. Jahreszins (Stand: Juli 2026).', url: 'https://www.ing.de/kredite/autokredit/' },
  { name: 'Postbank Autokredit', note: 'Eine der günstigsten Direktbanken, ab 3,25 % eff.', url: 'https://www.postbank.de/privatkunden/produkte/kredit/autokredit.html' },
  { name: 'Targobank Autokredit', note: 'Ab 3,49 % eff., Laufzeiten bis 120 Monate.', url: 'https://www.targobank.de/de/kredit/autokredit/' },
  { name: 'Bank of Scotland Autokredit', note: '5,19\u20136,29 % eff., 20 % kostenlose Sondertilgung pro Jahr.', url: 'https://www.bankofscotland.de/autokredit/' },
  { name: 'Volkswagen Bank / Mercedes-Benz Bank / BMW Bank', note: 'Herstellerbanken \u2014 oft mit Sonderaktionen, teils 0 %-Finanzierung.', url: 'https://www.vwfs.de/' },
  { name: 'Hausbank / Sparkasse', note: 'Zweckgebundener Autokredit meist günstiger als ein freier Ratenkredit.', url: 'https://www.sparkasse.de/' },
];

function fmtEUR(n: number) { return n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }); }

export default function AutokreditRechnerClient() {
  const [fahrzeugpreis, setFahrzeugpreis] = useState('25000');
  const [modell, setModell] = useState<Modell>('raten');
  const [anzahlung, setAnzahlung] = useState('2500');
  const [schlussratePct, setSchlussratePct] = useState('30');
  const [bonitaet, setBonitaet] = useState<typeof BONITAET[number]['key'] | null>('gut');
  const [zinssatz, setZinssatz] = useState('5.9');
  const [laufzeitMonate, setLaufzeitMonate] = useState('60');
  const [nettoeinkommen, setNettoeinkommen] = useState('');
  const [zeigeAnbieter, setZeigeAnbieter] = useState(false);

  const pickBonitaet = (key: typeof BONITAET[number]['key']) => {
    setBonitaet(key);
    setZinssatz(String(BONITAET.find(b => b.key === key)!.zins));
  };

  const hatSchlussrate = modell !== 'raten';

  const calc = useMemo(() => {
    const preis = parseFloat(fahrzeugpreis) || 0;
    const az = parseFloat(anzahlung) || 0;
    const schlussPct = hatSchlussrate ? Math.min(Math.max(parseFloat(schlussratePct) || 0, 0), 60) : 0;
    const jahreszins = parseFloat(zinssatz) || 0;
    const monate = parseInt(laufzeitMonate) || 0;
    const einkommen = parseFloat(nettoeinkommen) || 0;
    if (preis <= 0 || monate <= 0 || jahreszins < 0) return null;

    const kreditbetrag = Math.max(preis - az, 0);
    const schlussrate = (preis * schlussPct) / 100;
    const mr = jahreszins / 100 / 12;
    let rate: number;
    if (mr === 0) {
      rate = Math.max(kreditbetrag - schlussrate, 0) / monate;
    } else {
      const pow = Math.pow(1 + mr, monate);
      rate = (kreditbetrag * mr * pow - schlussrate * mr) / (pow - 1);
    }
    const gesamtRaten = rate * monate;
    const gesamtkosten = gesamtRaten + schlussrate + az;
    const zinskosten = gesamtRaten + schlussrate - kreditbetrag;

    return {
      rate, gesamtkosten, zinskosten, kreditbetrag, schlussrate,
      anzahlungPct: preis > 0 ? (az / preis) * 100 : 0,
      einkommensanteil: einkommen > 0 ? rate / einkommen : 0,
      einkommen, az,
    };
  }, [fahrzeugpreis, anzahlung, schlussratePct, hatSchlussrate, zinssatz, laufzeitMonate, nettoeinkommen]);

  const reset = () => {
    setFahrzeugpreis('25000'); setModell('raten'); setAnzahlung('2500'); setSchlussratePct('30');
    setBonitaet('gut'); setZinssatz('5.9'); setLaufzeitMonate('60'); setNettoeinkommen('');
  };
  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Eingaben ── */}
          <div className="lg:col-span-2 space-y-4">

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Finanzierungsart</label>
              <div className="grid grid-cols-1 gap-1.5">
                {([
                  { k: 'raten' as const, l: 'Klassischer Ratenkredit', d: 'Volltilgung, keine Schlussrate' },
                  { k: 'ballon' as const, l: 'Ballonfinanzierung', d: 'Niedrige Raten, hohe Schlussrate' },
                  { k: 'drei_wege' as const, l: '3-Wege-Finanzierung', d: 'Wie Ballon, plus Rückgabe-Option' },
                ]).map(({ k, l, d }) => (
                  <button key={k} onClick={() => setModell(k)}
                    className={`text-left px-3 py-2 rounded-lg text-xs border transition-all ${modell === k ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    <span className="font-bold block">{l}</span>
                    <span className={modell === k ? 'text-white/80' : 'text-muted-foreground/70'}>{d}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Fahrzeugpreis (€, inkl. 19 % MwSt.) <span className="text-red-500">*</span></label>
              <input type="number" value={fahrzeugpreis} onChange={e => setFahrzeugpreis(e.target.value)} placeholder="25000" className={iCls} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Anzahlung</label>
                {calc && <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{calc.anzahlungPct.toFixed(0)}%</span>}
              </div>
              <input type="number" value={anzahlung} onChange={e => setAnzahlung(e.target.value)} placeholder="2500" className={iCls} />
            </div>

            {hatSchlussrate && (
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Schlussrate</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[20, 30, 40, 50].map(s => (
                    <button key={s} onClick={() => setSchlussratePct(String(s))}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${schlussratePct === String(s) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                      {s}%
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{modell === 'drei_wege' ? 'Am Ende: zahlen, zurückgeben oder umfinanzieren' : 'Am Ende: zahlen oder umfinanzieren (keine Rückgabe)'}</p>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Bonität</label>
                <span className="text-xs text-muted-foreground">Marktdurchschnitt: 5,9 %</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {BONITAET.map(b => (
                  <button key={b.key} onClick={() => pickBonitaet(b.key)}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border transition-all ${bonitaet === b.key ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    <span className="font-bold">{b.label}</span>
                    <span className={bonitaet === b.key ? 'text-white/80' : 'text-muted-foreground/70'}>{b.zins}%</span>
                  </button>
                ))}
              </div>
              <div className="relative mt-2">
                <input type="number" value={zinssatz} onChange={e => { setZinssatz(e.target.value); setBonitaet(null); }} step="0.01" min="0" max="20" className={`${iCls} pl-4 pr-28`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">% eff. Jahreszins</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Laufzeit</label>
                <div className="grid grid-cols-3 gap-1">
                  {[24, 36, 48, 60, 84, 120].map(t => (
                    <button key={t} onClick={() => setLaufzeitMonate(String(t))}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${laufzeitMonate === String(t) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                      {t}M
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Nettoeinkommen <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input type="number" value={nettoeinkommen} onChange={e => setNettoeinkommen(e.target.value)} placeholder="2800" className={iCls} />
              </div>
            </div>

            <button onClick={reset} className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
              <RotateCcw className="h-3.5 w-3.5" /> Zurücksetzen
            </button>
          </div>

          {/* ── Ergebnis ── */}
          <div className="lg:col-span-3 space-y-3">
            {!calc ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                  <Calculator className="h-5 w-5 text-emerald-500/50" />
                </div>
                <p className="text-sm text-muted-foreground">Felder ausfüllen \u2014 das Ergebnis aktualisiert sich live.</p>
              </div>
            ) : (
              <>
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">Monatsrate</p>
                  <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 leading-none"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    {fmtEUR(calc.rate)}
                  </p>
                  <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-1.5">{laufzeitMonate} Monate \u00b7 {zinssatz}% eff. Jahreszins</p>
                </div>

                {calc.schlussrate > 0 && (
                  <p className="text-xs text-muted-foreground px-1">Zusätzlich fällt am Ende eine Schlussrate von <strong className="text-foreground">{fmtEUR(calc.schlussrate)}</strong> an \u2014 {modell === 'drei_wege' ? 'zahlen, zurückgeben oder umfinanzieren' : 'zahlen oder umfinanzieren'}.</p>
                )}

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Kreditbetrag</p>
                    <p className="text-sm font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtEUR(calc.kreditbetrag)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Zinskosten</p>
                    <p className="text-sm font-black text-red-600 dark:text-red-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtEUR(calc.zinskosten)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Gesamtkosten</p>
                    <p className="text-sm font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtEUR(calc.gesamtkosten)}</p>
                  </div>
                </div>

                {modell !== 'raten' && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-200/80">Laut Stiftung Warentest ist der klassische Ratenkredit meist die günstigere Variante \u2014 {modell === 'drei_wege' ? 'die 3-Wege-Finanzierung' : 'die Ballonfinanzierung'} kostet über die Laufzeit in der Regel mehr.</p>
                  </div>
                )}

                <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/25">
                  <Info className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800 dark:text-blue-200/80">Sie haben nach Vertragsschluss ein 14-tägiges Widerrufsrecht (§ 355 BGB) für den Darlehensvertrag.</p>
                </div>

                {calc.einkommen > 0 && (
                  <div className="p-4 rounded-2xl border border-border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Rate / Nettoeinkommen</p>
                      <p className="text-2xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                        {(calc.einkommensanteil * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${Math.min(calc.einkommensanteil * 400, 100)}%` }} />
                    </div>
                    <p className="text-xs mt-2 text-muted-foreground">Es gibt keine einzige offizielle deutsche Faustregel \u2014 als grobe Orientierung sollten alle Kfz-Kosten (Rate, Versicherung, Sprit, Wartung) zusammen etwa 15\u201320 % des Nettoeinkommens nicht übersteigen.</p>
                  </div>
                )}

                <button onClick={() => setZeigeAnbieter(v => !v)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-border bg-card hover:border-emerald-500/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                  <span>Autokredit-Anbieter in Deutschland</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${zeigeAnbieter ? 'rotate-180' : ''}`} />
                </button>
                {zeigeAnbieter && (
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-3 py-2 bg-muted/50 border-b border-border">
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide">Autokredit-Anbieter</p>
                    </div>
                    <div className="divide-y divide-border">
                      {ANBIETER.map(l => (
                        <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-between px-3 py-2.5 hover:bg-muted/30 transition-colors group gap-3">
                          <div>
                            <p className="text-xs font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{l.name}</p>
                            <p className="text-xs text-muted-foreground">{l.note}</p>
                          </div>
                          <ExternalLink className="h-3 w-3 text-muted-foreground/40 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <Link prefetch={false} href="/vehicles" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Fahrzeuge ansehen</p>
                    <ChevronRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                  </Link>
                  <Link prefetch={false} href="/werkzeuge/fahrgestellnummer-pruefen" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group">
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-400">FIN prüfen</p>
                    <ChevronRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-500" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
