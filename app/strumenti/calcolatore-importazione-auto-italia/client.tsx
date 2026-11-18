'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle } from 'lucide-react';
import { calcIt, type ItOrigin, type ItRoute } from '@/lib/it-import-duty';

type Cur = 'EUR' | 'USD' | 'JPY' | 'GBP' | 'CHF' | 'KRW' | 'AED' | 'CAD' | 'AUD' | 'CNY';
const CURRENCIES: Cur[] = ['EUR', 'USD', 'JPY', 'GBP', 'CHF', 'KRW', 'AED', 'CAD', 'AUD', 'CNY'];
// Valori approssimativi (unità per 1 EUR), usati solo se il cambio in tempo reale non è disponibile.
const FALLBACK: Record<Cur, number> = { EUR: 1, USD: 1.16, JPY: 174, GBP: 0.87, CHF: 0.93, KRW: 1630, AED: 4.26, CAD: 1.6, AUD: 1.77, CNY: 8.3 };

const ORIGINS: { value: ItOrigin; label: string }[] = [
  { value: 'us', label: 'Stati Uniti (auto costruita negli USA)' },
  { value: 'jp', label: 'Giappone' },
  { value: 'kr', label: 'Corea del Sud' },
  { value: 'uk', label: 'Regno Unito' },
  { value: 'cn_ice', label: 'Cina (benzina, diesel o ibrida)' },
  { value: 'cn_bev', label: 'Cina (100 % elettrica)' },
  { value: 'other', label: 'Altro Paese (Emirati, Svizzera, Canada…)' },
];
const CVD: { pct: number; label: string }[] = [
  { pct: 17, label: 'BYD – 17 %' },
  { pct: 18.8, label: 'Geely / Zeekr – 18,8 %' },
  { pct: 7.8, label: 'Tesla Shanghai – 7,8 %' },
  { pct: 20.7, label: 'Altri costruttori collaboranti – 20,7 %' },
  { pct: 35.3, label: 'SAIC / MG e non collaboranti – 35,3 %' },
  { pct: 0, label: 'Impegno sui prezzi accettato – 0 %' },
];

const eur = (n: number) => n.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
const toNum = (v: string) => {
  const t = v.trim().replace(/\s/g, '');
  const normalized = t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : /^\d{1,3}(\.\d{3})+$/.test(t) ? t.replace(/\./g, '') : t;
  const n = parseFloat(normalized);
  return Number.isFinite(n) && n > 0 ? n : 0;
};
const pctIt = (n: number) => n.toLocaleString('it-IT', { maximumFractionDigits: 2 });

export default function CalcolatoreImportazioneItaliaClient() {
  const [route, setRoute] = useState<ItRoute>('extra-ue');
  const [origin, setOrigin] = useState<ItOrigin>('us');
  const [proof, setProof] = useState(true);
  const [cvd, setCvd] = useState('17');
  const [cur, setCur] = useState<Cur>('USD');
  const [price, setPrice] = useState('20000');
  const [freight, setFreight] = useState('1500');
  const [dest, setDest] = useState('');
  const [nuovo, setNuovo] = useState(false);
  const [kw, setKw] = useState('110');
  const [magg, setMagg] = useState('30');
  const [altre, setAltre] = useState('');
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
        setLive(new Date().toLocaleTimeString('it-IT'));
      }
    } catch { /* resta il cambio di riserva */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const rate = rates[cur];
  const prezzoEUR = toNum(price) / rate;
  const noloEUR = toNum(freight) / rate;
  const extra = route === 'extra-ue';

  const res = useMemo(() => {
    if (prezzoEUR <= 0) return null;
    return calcIt({
      route, origin, hasOriginProof: proof, cvdPct: toNum(cvd), prezzoEUR, noloEUR, speseDestinazioneEUR: toNum(dest), nuovoUE: nuovo,
      kw: toNum(kw), maggiorazioneProvPct: toNum(magg), altreSpeseEUR: toNum(altre),
    });
  }, [route, origin, proof, cvd, prezzoEUR, noloEUR, dest, nuovo, kw, magg, altre]);

  const reset = () => {
    setRoute('extra-ue'); setOrigin('us'); setProof(true); setCvd('17'); setCur('USD'); setPrice('20000'); setFreight('1500'); setDest('');
    setNuovo(false); setKw('110'); setMagg('30'); setAltre('');
  };

  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';
  const check = 'flex items-start gap-2 text-sm text-foreground cursor-pointer';
  const proofRelevant = extra && ['us', 'jp', 'kr', 'uk'].includes(origin);

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Calcolatore" lang="it">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div>
            <label className={label}>Tipo di importazione</label>
            <select className={field} value={route} onChange={(e) => setRoute(e.target.value as ItRoute)}>
              <option value="extra-ue">Acquisto fuori dall’Unione Europea (dazio + IVA)</option>
              <option value="ue">Acquisto nell’Unione Europea</option>
            </select>
          </div>

          {extra && (
            <div>
              <label className={label}>Paese di costruzione dell’auto</label>
              <select className={field} value={origin} onChange={(e) => setOrigin(e.target.value as ItOrigin)}>
                {ORIGINS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <p className="text-[11px] text-muted-foreground mt-1.5">Conta il Paese di costruzione, non quello di acquisto.</p>
            </div>
          )}
          {proofRelevant && (
            <label className={check}>
              <input type="checkbox" checked={proof} onChange={(e) => setProof(e.target.checked)} className="mt-0.5" />
              <span>Prova di origine valida (0 % invece del 10 % di dazio)
                <span className="block text-[11px] text-muted-foreground">Per gli USA va provato anche il trasporto diretto.</span></span>
            </label>
          )}
          {extra && origin === 'cn_bev' && (
            <div>
              <label className={label}>Dazio compensativo del costruttore</label>
              <select className={field} value={cvd} onChange={(e) => setCvd(e.target.value)}>
                {CVD.map((c) => <option key={c.label} value={c.pct}>{c.label}</option>)}
              </select>
            </div>
          )}
          {!extra && (
            <label className={check}>
              <input type="checkbox" checked={nuovo} onChange={(e) => setNuovo(e.target.checked)} className="mt-0.5" />
              <span>Veicolo nuovo ai fini IVA (meno di 6 mesi OPPURE meno di 6.000 km)</span>
            </label>
          )}

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>Valuta</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={label}>Prezzo di acquisto (IVA esclusa)</label>
              <input className={field} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>{extra ? `Nolo + assicurazione fino al confine UE (${cur})` : `Trasporto (${cur})`}</label>
              <input className={field} inputMode="decimal" value={freight} onChange={(e) => setFreight(e.target.value)} />
            </div>
            {extra && (
              <div>
                <label className={label}>Trasporto nell’UE fino a destinazione (€)</label>
                <input className={field} inputMode="decimal" value={dest} onChange={(e) => setDest(e.target.value)} />
              </div>
            )}
          </div>

          <div className="border-t border-border pt-4 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wide text-foreground">L’auto e la tua provincia</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Potenza in kW (campo P.2)</label>
                <input className={field} inputMode="decimal" value={kw} onChange={(e) => setKw(e.target.value)} />
              </div>
              <div>
                <label className={label}>Maggiorazione IPT della provincia (%)</label>
                <input className={field} inputMode="decimal" value={magg} onChange={(e) => setMagg(e.target.value)} />
                <p className="text-[11px] text-muted-foreground mt-1">0 % ad Aosta, Bolzano e Trento; fino a 30 % altrove.</p>
              </div>
            </div>
          </div>

          <div>
            <label className={label}>Altre spese (€): targhe, agenzia, omologazione, spedizioniere</label>
            <input className={field} inputMode="decimal" value={altre} onChange={(e) => setAltre(e.target.value)} />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>1 EUR = {rate.toLocaleString('it-IT', { maximumFractionDigits: 3 })} {cur}{live ? ` · cambio live ${live}` : ' · cambio di riserva'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Aggiorna</button>
          </div>
          <p className="text-[11px] text-muted-foreground">La dogana usa il cambio ufficiale mensile, che può differire leggermente da quello di mercato.</p>
        </div>

        <div className="space-y-4">
          {res ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Costo stimato dell’importazione</h2>
              <div className="space-y-2 text-sm">
                <Row k={extra ? 'Valore in dogana (prezzo + nolo + assicurazione)' : 'Prezzo di acquisto (IVA esclusa)'} v={eur(res.valoreDogana)} />
                {res.lines.map((l) => <Row key={l.key} k={l.pct != null ? `${l.label} — ${pctIt(l.pct)} %` : l.label} v={eur(l.amount)} />)}
                <Row k="Imposte e spese di immatricolazione" v={eur(res.tasseTotale)} bold hi />
                <Row k="Costo totale tutto compreso" v={eur(res.totale)} bold />
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                {res.note.map((n) => <li key={n}>{n}</li>)}
                {extra && <li>L’IVA è calcolata su valore in dogana, dazio e spese fino al primo luogo di destinazione.</li>}
                <li>L’IPT base è {eur(res.iptBase)}: 150,81 € fino a 53 kW, oltre 3,5119 € per ogni kW di potenza.</li>
                <li>Non incluso: bollo auto annuale, superbollo, assicurazione e premi per la rottamazione.</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Reimposta</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Stampa</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Solo una stima. L’importo definitivo lo stabiliscono la dogana, il PRA e la Motorizzazione.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Inserisci un prezzo di acquisto per vedere il calcolo.</div>
          )}
          {extra && (
            <div className="flex gap-2 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              Un’auto senza omologazione europea richiede la visita alla Motorizzazione per ottenere l’omologazione italiana e può richiedere modifiche. Inserisci questi costi in “Altre spese”.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Row({ k, v, bold, hi }: { k: string; v: string; bold?: boolean; hi?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${hi ? 'rounded-lg bg-blue-500/10 px-3 py-2' : ''}`}>
      <span className={bold ? 'font-semibold text-foreground' : 'text-muted-foreground'}>{k}</span>
      <span className={`tabular-nums text-right ${bold ? 'font-bold text-foreground' : 'text-foreground'}`}>{v}</span>
    </div>
  );
}
