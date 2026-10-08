'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle } from 'lucide-react';
import { calcDe, type DeOrigin, type DeRoute } from '@/lib/de-import-duty';

type Cur = 'EUR' | 'USD' | 'JPY' | 'GBP' | 'CHF' | 'KRW' | 'AED' | 'CAD' | 'AUD' | 'CNY';
const CURRENCIES: Cur[] = ['EUR', 'USD', 'JPY', 'GBP', 'CHF', 'KRW', 'AED', 'CAD', 'AUD', 'CNY'];
// Näherungswerte (Einheiten je 1 EUR), nur als Reserve, falls der Live-Kurs nicht geladen werden kann.
const FALLBACK: Record<Cur, number> = { EUR: 1, USD: 1.16, JPY: 174, GBP: 0.87, CHF: 0.93, KRW: 1630, AED: 4.26, CAD: 1.6, AUD: 1.77, CNY: 8.3 };

const ORIGINS: { value: DeOrigin; label: string }[] = [
  { value: 'us', label: 'USA (in den USA gebaut)' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'Südkorea' },
  { value: 'uk', label: 'Vereinigtes Königreich' },
  { value: 'cn_ice', label: 'China (Verbrenner/Hybrid)' },
  { value: 'cn_bev', label: 'China (Elektroauto)' },
  { value: 'other', label: 'Anderes Land (z. B. VAE, Australien)' },
];

const CVD: { pct: number; label: string }[] = [
  { pct: 17, label: 'BYD – 17 %' },
  { pct: 18.8, label: 'Geely/Zeekr/Polestar-China – 18,8 %' },
  { pct: 7.8, label: 'Tesla Shanghai – 7,8 %' },
  { pct: 20.7, label: 'Kooperierende Hersteller (z. B. Xpeng, Nio) – 20,7 %' },
  { pct: 35.3, label: 'SAIC/MG und übrige Hersteller – 35,3 %' },
  { pct: 0, label: 'Mit akzeptierter Preisverpflichtung – 0 %' },
];

const eur = (n: number) => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
const toNum = (v: string) => { const n = parseFloat(v.replace(',', '.')); return Number.isFinite(n) && n > 0 ? n : 0; };
const pctDe = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });

export default function KfzEinfuhrRechnerClient() {
  const [route, setRoute] = useState<DeRoute>('drittland');
  const [origin, setOrigin] = useState<DeOrigin>('us');
  const [proof, setProof] = useState(true);
  const [cvd, setCvd] = useState('17');
  const [cur, setCur] = useState<Cur>('USD');
  const [price, setPrice] = useState('20000');
  const [freight, setFreight] = useState('1500');
  const [neben, setNeben] = useState('');
  const [weitere, setWeitere] = useState('');
  const [neu, setNeu] = useState(false);
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/EUR');
      const data = await res.json();
      if (data?.rates?.USD) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString('de-DE'));
      }
    } catch { /* Reservekurs bleibt */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const kaufEUR = toNum(price) / rates[cur];
  const frachtEUR = toNum(freight) / rates[cur];

  const res = useMemo(() => {
    if (kaufEUR <= 0) return null;
    return calcDe({
      route, origin, hasOriginProof: proof, cvdPct: toNum(cvd), kaufpreisEUR: kaufEUR, frachtEUR,
      nebenkostenEUR: toNum(neben), euNeufahrzeug: neu, weitereKostenEUR: toNum(weitere),
    });
  }, [route, origin, proof, cvd, kaufEUR, frachtEUR, neben, neu, weitere]);

  const reset = () => {
    setRoute('drittland'); setOrigin('us'); setProof(true); setCvd('17'); setCur('USD'); setPrice('20000');
    setFreight('1500'); setNeben(''); setWeitere(''); setNeu(false);
  };

  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';
  const check = 'flex items-start gap-2 text-sm text-foreground cursor-pointer';
  const proofRelevant = route === 'drittland' && ['us', 'jp', 'kr', 'uk'].includes(origin);

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Rechner" lang="de">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div>
            <label className={label}>Art der Einfuhr</label>
            <select className={field} value={route} onChange={(e) => setRoute(e.target.value as DeRoute)}>
              <option value="drittland">Kauf außerhalb der EU (Zoll + Einfuhrumsatzsteuer)</option>
              <option value="eu">Kauf in der EU (Binnenmarkt)</option>
              <option value="oldtimer">Oldtimer ab 30 Jahren (7 % EUSt)</option>
              <option value="umzug">Übersiedlungsgut (Umzug nach Deutschland)</option>
            </select>
          </div>

          {route === 'drittland' && (
            <div>
              <label className={label}>Land, in dem das Auto gebaut wurde</label>
              <select className={field} value={origin} onChange={(e) => setOrigin(e.target.value as DeOrigin)}>
                {ORIGINS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <p className="text-[11px] text-muted-foreground mt-1.5">Maßgeblich ist das Herstellungsland, nicht das Land, in dem Sie kaufen.</p>
            </div>
          )}

          {proofRelevant && (
            <label className={check}>
              <input type="checkbox" checked={proof} onChange={(e) => setProof(e.target.checked)} className="mt-0.5" />
              <span>Gültiger Ursprungsnachweis liegt vor (0 % statt 10 % Zoll)
                <span className="block text-[11px] text-muted-foreground">Bei den USA zusätzlich: Direkttransport nachgewiesen.</span></span>
            </label>
          )}
          {route === 'drittland' && origin === 'cn_bev' && (
            <div>
              <label className={label}>Ausgleichszoll des Herstellers</label>
              <select className={field} value={cvd} onChange={(e) => setCvd(e.target.value)}>
                {CVD.map((c) => <option key={c.label} value={c.pct}>{c.label}</option>)}
              </select>
            </div>
          )}
          {route === 'eu' && (
            <label className={check}>
              <input type="checkbox" checked={neu} onChange={(e) => setNeu(e.target.checked)} className="mt-0.5" />
              <span>Neufahrzeug im EU-Sinn (unter 6 Monate alt ODER unter 6.000 km)</span>
            </label>
          )}

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>Währung</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={label}>Kaufpreis (netto)</label>
              <input className={field} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          {route !== 'eu' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Fracht + Versicherung bis EU-Grenze ({cur})</label>
                <input className={field} inputMode="decimal" value={freight} onChange={(e) => setFreight(e.target.value)} />
              </div>
              <div>
                <label className={label}>Transport bis Zielort in der EU (€)</label>
                <input className={field} inputMode="decimal" value={neben} onChange={(e) => setNeben(e.target.value)} />
              </div>
            </div>
          )}
          <div>
            <label className={label}>Weitere Kosten in € (Einzelabnahme, Umrüstung, Zulassung, Zollagent)</label>
            <input className={field} inputMode="decimal" value={weitere} onChange={(e) => setWeitere(e.target.value)} />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>1 EUR = {rates[cur].toLocaleString('de-DE', { maximumFractionDigits: 3 })} {cur}{live ? ` · live ${live}` : ' · Reservekurs'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Aktualisieren</button>
          </div>
          <p className="text-[11px] text-muted-foreground">Der Zoll rechnet mit dem monatlich festgesetzten Umrechnungskurs der EU-Kommission, der vom Marktkurs leicht abweichen kann.</p>
        </div>

        <div className="space-y-4">
          {res ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Voraussichtliche Einfuhrkosten</h2>
              <div className="space-y-2 text-sm">
                <Row k={route === 'eu' ? 'Kaufpreis (netto)' : 'Zollwert (Preis + Fracht + Versicherung)'} v={eur(route === 'eu' ? kaufEUR : res.zollwert)} />
                {res.lines.map((l) => <Row key={l.key} k={l.pct != null ? `${l.label} — ${pctDe(l.pct)} %` : l.label} v={eur(l.amount)} />)}
                <Row k="Abgaben gesamt" v={eur(res.abgaben)} bold hi />
                <Row k="Gesamtkosten inkl. Fracht und Zusatzkosten" v={eur(res.gesamt)} bold />
                <Row k="Abgaben in % des Zollwerts" v={pctDe(res.effektivPct) + ' %'} />
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                {res.hinweise.map((n) => <li key={n}>{n}</li>)}
                <li>Die Einfuhrumsatzsteuer wird auch auf den bereits berechneten Zoll erhoben.</li>
                <li>Nicht enthalten: Kfz-Steuer, Versicherung, Kennzeichen und Reparaturen für die Zulassung.</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Zurücksetzen</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Drucken</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Nur eine Schätzung. Die endgültige Festsetzung erfolgt durch den deutschen Zoll.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Geben Sie einen Kaufpreis ein, um die Berechnung zu sehen.</div>
          )}
          {route === 'drittland' && (
            <div className="flex gap-2 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              Fahrzeuge ohne EU-Typgenehmigung brauchen meist eine Einzelabnahme nach § 21 StVZO und oft technische Anpassungen (Beleuchtung, Tacho in km/h). Rechnen Sie diese Kosten im Feld „Weitere Kosten“ ein.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Row({ k, v, bold, hi }: { k: string; v: string; bold?: boolean; hi?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${hi ? 'rounded-lg bg-emerald-500/10 px-3 py-2' : ''}`}>
      <span className={bold ? 'font-semibold text-foreground' : 'text-muted-foreground'}>{k}</span>
      <span className={`tabular-nums text-right ${bold ? 'font-bold text-foreground' : 'text-foreground'}`}>{v}</span>
    </div>
  );
}
