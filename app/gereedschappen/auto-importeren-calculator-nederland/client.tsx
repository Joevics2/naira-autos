'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle } from 'lucide-react';
import { calcNl, forfaitKorting, type DateParts, type NlFuel, type NlOrigin, type NlRoute } from '@/lib/nl-import-duty';

type Cur = 'EUR' | 'USD' | 'JPY' | 'GBP' | 'CHF' | 'KRW' | 'AED' | 'CAD' | 'AUD' | 'CNY';
const CURRENCIES: Cur[] = ['EUR', 'USD', 'JPY', 'GBP', 'CHF', 'KRW', 'AED', 'CAD', 'AUD', 'CNY'];
// Globale benadering (eenheden per 1 EUR), alleen gebruikt als de actuele koers niet kan worden geladen.
const FALLBACK: Record<Cur, number> = { EUR: 1, USD: 1.16, JPY: 174, GBP: 0.87, CHF: 0.93, KRW: 1630, AED: 4.26, CAD: 1.6, AUD: 1.77, CNY: 8.3 };

const ORIGINS: { value: NlOrigin; label: string }[] = [
  { value: 'us', label: 'Verenigde Staten (in de VS gebouwd)' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'Zuid-Korea' },
  { value: 'uk', label: 'Verenigd Koninkrijk' },
  { value: 'cn_ice', label: 'China (benzine, diesel of hybride)' },
  { value: 'cn_bev', label: 'China (volledig elektrisch)' },
  { value: 'other', label: 'Ander land (VAE, Australië, Canada…)' },
];
const CVD: { pct: number; label: string }[] = [
  { pct: 17, label: 'BYD – 17 %' },
  { pct: 18.8, label: 'Geely / Zeekr – 18,8 %' },
  { pct: 7.8, label: 'Tesla Shanghai – 7,8 %' },
  { pct: 20.7, label: 'Overige meewerkende fabrikanten – 20,7 %' },
  { pct: 35.3, label: 'SAIC / MG en niet-meewerkende – 35,3 %' },
  { pct: 0, label: 'Prijsverbintenis aanvaard – 0 %' },
];

const eur = (n: number) => n.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });
const toNum = (v: string) => {
  const t = v.trim().replace(/\s/g, '');
  const normalized = t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : /^\d{1,3}(\.\d{3})+$/.test(t) ? t.replace(/\./g, '') : t;
  const n = parseFloat(normalized);
  return Number.isFinite(n) && n > 0 ? n : 0;
};
const pctNl = (n: number) => n.toLocaleString('nl-NL', { maximumFractionDigits: 2 });
const parseDate = (s: string): DateParts | null => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  return m ? { y: Number(m[1]), m: Number(m[2]), d: Number(m[3]) } : null;
};
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export default function AutoImporterenNederlandClient() {
  const [route, setRoute] = useState<NlRoute>('buiten-eu');
  const [origin, setOrigin] = useState<NlOrigin>('us');
  const [proof, setProof] = useState(true);
  const [cvd, setCvd] = useState('17');
  const [cur, setCur] = useState<Cur>('USD');
  const [price, setPrice] = useState('20000');
  const [freight, setFreight] = useState('1500');
  const [dest, setDest] = useState('');
  const [nieuwEU, setNieuwEU] = useState(false);
  const [gebruikt, setGebruikt] = useState(true);
  const [toelating, setToelating] = useState('2024-01-15');
  const [keuring, setKeuring] = useState('2026-10-20');
  const [fuel, setFuel] = useState<NlFuel>('benzine');
  const [co2, setCo2] = useState('130');
  const [co2Onbekend, setCo2Onbekend] = useState(false);
  const [handmatig, setHandmatig] = useState('');
  const [overig, setOverig] = useState('');
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { setKeuring(iso(new Date())); }, []);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/EUR');
      const data = await res.json();
      if (data?.rates?.USD) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString('nl-NL'));
      }
    } catch { /* de terugvalkoers blijft staan */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const rate = rates[cur];
  const prijsEUR = toNum(price) / rate;
  const vrachtEUR = toNum(freight) / rate;
  const buiten = route === 'buiten-eu';
  const tDate = parseDate(toelating);
  const kDate = parseDate(keuring);

  const res = useMemo(() => {
    if (prijsEUR <= 0 || !tDate || !kDate) return null;
    return calcNl({
      route, origin, hasOriginProof: proof, cvdPct: toNum(cvd), prijsEUR, vrachtEUR, kostenBestemmingEUR: toNum(dest), nieuwEU,
      gebruikt, toelating: tDate, keuring: kDate, fuel, co2: toNum(co2), co2Onbekend, brutoBpmHandmatig: toNum(handmatig), overigeKostenEUR: toNum(overig),
    });
  }, [route, origin, proof, cvd, prijsEUR, vrachtEUR, dest, nieuwEU, gebruikt, tDate, kDate, fuel, co2, co2Onbekend, handmatig, overig]);

  const reset = () => {
    setRoute('buiten-eu'); setOrigin('us'); setProof(true); setCvd('17'); setCur('USD'); setPrice('20000'); setFreight('1500'); setDest('');
    setNieuwEU(false); setGebruikt(true); setToelating('2024-01-15'); setKeuring(iso(new Date())); setFuel('benzine'); setCo2('130');
    setCo2Onbekend(false); setHandmatig(''); setOverig('');
  };

  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';
  const check = 'flex items-start gap-2 text-sm text-foreground cursor-pointer';
  const proofRelevant = buiten && ['us', 'jp', 'kr', 'uk'].includes(origin);
  const kortingInfo = gebruikt && tDate && kDate ? forfaitKorting(tDate, kDate) : null;

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Calculator" lang="nl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div>
            <label className={label}>Soort import</label>
            <select className={field} value={route} onChange={(e) => setRoute(e.target.value as NlRoute)}>
              <option value="buiten-eu">Aankoop buiten de Europese Unie (invoerrecht + btw)</option>
              <option value="eu">Aankoop in de Europese Unie</option>
            </select>
          </div>

          {buiten && (
            <div>
              <label className={label}>Land waar de auto is gebouwd</label>
              <select className={field} value={origin} onChange={(e) => setOrigin(e.target.value as NlOrigin)}>
                {ORIGINS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <p className="text-[11px] text-muted-foreground mt-1.5">Het productieland telt, niet het land van aankoop.</p>
            </div>
          )}
          {proofRelevant && (
            <label className={check}>
              <input type="checkbox" checked={proof} onChange={(e) => setProof(e.target.checked)} className="mt-0.5" />
              <span>Geldig oorsprongsbewijs (0 % in plaats van 10 % invoerrecht)
                <span className="block text-[11px] text-muted-foreground">Voor de VS moet ook het rechtstreekse vervoer worden bewezen.</span></span>
            </label>
          )}
          {buiten && origin === 'cn_bev' && (
            <div>
              <label className={label}>Compenserend recht van de fabrikant</label>
              <select className={field} value={cvd} onChange={(e) => setCvd(e.target.value)}>
                {CVD.map((c) => <option key={c.label} value={c.pct}>{c.label}</option>)}
              </select>
            </div>
          )}
          {!buiten && (
            <label className={check}>
              <input type="checkbox" checked={nieuwEU} onChange={(e) => setNieuwEU(e.target.checked)} className="mt-0.5" />
              <span>Nieuw voertuig voor de btw (hooguit 6 maanden oud OF hooguit 6.000 km)</span>
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
              <label className={label}>Aankoopprijs (excl. btw)</label>
              <input className={field} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>{buiten ? `Vracht + verzekering tot de EU-grens (${cur})` : `Transport (${cur})`}</label>
              <input className={field} inputMode="decimal" value={freight} onChange={(e) => setFreight(e.target.value)} />
            </div>
            {buiten && (
              <div>
                <label className={label}>Vervoer binnen de EU tot bestemming (€)</label>
                <input className={field} inputMode="decimal" value={dest} onChange={(e) => setDest(e.target.value)} />
              </div>
            )}
          </div>

          <div className="border-t border-border pt-4 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wide text-foreground">De auto (buitenlands kentekenbewijs of CvO)</p>
            <label className={check}>
              <input type="checkbox" checked={gebruikt} onChange={(e) => setGebruikt(e.target.checked)} className="mt-0.5" />
              <span>Gebruikte auto (meer dan 3.000 km): BPM-afschrijving van toepassing</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Datum eerste toelating</label>
                <input type="date" className={field} value={toelating} onChange={(e) => setToelating(e.target.value)} />
              </div>
              <div>
                <label className={label}>Datum RDW-goedkeuring (peildatum)</label>
                <input type="date" className={field} value={keuring} onChange={(e) => setKeuring(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Brandstof</label>
                <select className={field} value={fuel} onChange={(e) => setFuel(e.target.value as NlFuel)}>
                  <option value="benzine">Benzine of hybride</option>
                  <option value="diesel">Diesel</option>
                  <option value="elektrisch">Volledig elektrisch</option>
                </select>
              </div>
              {fuel !== 'elektrisch' && (
                <div>
                  <label className={label}>CO2 (g/km, WLTP)</label>
                  <input className={field} inputMode="decimal" value={co2} onChange={(e) => setCo2(e.target.value)} disabled={co2Onbekend} />
                </div>
              )}
            </div>
            {fuel !== 'elektrisch' && (
              <label className={check}>
                <input type="checkbox" checked={co2Onbekend} onChange={(e) => setCo2Onbekend(e.target.checked)} className="mt-0.5" />
                <span>CO2-uitstoot onbekend (de Belastingdienst gebruikt dan 550 g/km benzine of 395 g/km diesel)</span>
              </label>
            )}
            <div>
              <label className={label}>Bruto BPM zelf invullen (€) — optioneel</label>
              <input className={field} inputMode="decimal" value={handmatig} onChange={(e) => setHandmatig(e.target.value)} />
              <p className="text-[11px] text-muted-foreground mt-1">Nodig bij een eerste toelating vóór 1 juli 2020 (oudere NEDC-tarieven). Anders leeg laten.</p>
            </div>
          </div>

          <div>
            <label className={label}>Overige kosten (€): RDW-keuring, kentekencard, platen, importeur</label>
            <input className={field} inputMode="decimal" value={overig} onChange={(e) => setOverig(e.target.value)} />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>1 EUR = {rate.toLocaleString('nl-NL', { maximumFractionDigits: 3 })} {cur}{live ? ` · actuele koers ${live}` : ' · terugvalkoers'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Vernieuwen</button>
          </div>
          <p className="text-[11px] text-muted-foreground">De douane hanteert de officiële maandkoers, die licht kan afwijken van de marktkoers.</p>
        </div>

        <div className="space-y-4">
          {res ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Geschatte importkosten</h2>
              <div className="space-y-2 text-sm">
                <Row k={buiten ? 'Douanewaarde (prijs + vracht + verzekering)' : 'Aankoopprijs (excl. btw)'} v={eur(res.douanewaarde)} />
                {res.lines.map((l) => <Row key={l.key} k={l.pct != null ? `${l.label} — ${pctNl(l.pct)} %` : l.label} v={eur(l.amount)} />)}
                {res.korting > 0 && <Row k={`Bruto BPM ${eur(res.brutoBpm)} min ${pctNl(res.korting)} % afschrijving`} v={`− ${eur(res.kortingBedrag)}`} />}
                <Row k="Belastingen en BPM samen" v={eur(res.belastingTotaal)} bold hi />
                <Row k="Totale kosten, alles inbegrepen" v={eur(res.totaal)} bold />
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                {res.notities.map((n) => <li key={n}>{n}</li>)}
                {buiten && <li>De btw wordt berekend over douanewaarde, invoerrecht en kosten tot de eerste bestemming.</li>}
                {kortingInfo && <li>{kortingInfo.maanden} maand(en) (deels) verstreken in de huidige tabelregel van de forfaitaire tabel.</li>}
                <li>Niet inbegrepen: motorrijtuigenbelasting, verzekering en de btw over een eventuele handelaarsmarge.</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Herstellen</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Afdrukken</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Slechts een schatting. Het definitieve bedrag stelt de Belastingdienst vast na je aangifte.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Vul een aankoopprijs en geldige datums in om de berekening te zien.</div>
          )}
          {buiten && (
            <div className="flex gap-2 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              Een auto van buiten de EU krijgt een uitgebreide RDW-keuring, meestal in Lelystad, en wordt ook gekeurd als de RDW hem afkeurt. Reken die kosten mee onder “Overige kosten”.
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
