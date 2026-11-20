'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle } from 'lucide-react';
import { calcPl, OPLATY_REJESTRACJA_DOMYSLNE, type PlDrive, type PlOrigin, type PlRoute } from '@/lib/pl-import-duty';

type Cur = 'PLN' | 'EUR' | 'USD' | 'JPY' | 'KRW' | 'GBP' | 'CNY' | 'CHF' | 'AED' | 'CAD';
const CURRENCIES: Cur[] = ['PLN', 'EUR', 'USD', 'JPY', 'KRW', 'GBP', 'CNY', 'CHF', 'AED', 'CAD'];
// Wartości przybliżone (jednostek za 1 PLN), używane tylko gdy nie uda się pobrać kursu na żywo.
const FALLBACK: Record<Cur, number> = { PLN: 1, EUR: 0.235, USD: 0.273, JPY: 40.9, KRW: 383, GBP: 0.205, CNY: 1.95, CHF: 0.219, AED: 1.0, CAD: 0.376 };

const ORIGINS: { value: PlOrigin; label: string }[] = [
  { value: 'us', label: 'Stany Zjednoczone (auto wyprodukowane w USA)' },
  { value: 'jp', label: 'Japonia' },
  { value: 'kr', label: 'Korea Południowa' },
  { value: 'uk', label: 'Wielka Brytania' },
  { value: 'cn_ice', label: 'Chiny (benzyna, diesel lub hybryda)' },
  { value: 'cn_bev', label: 'Chiny (w pełni elektryczne)' },
  { value: 'other', label: 'Inny kraj (ZEA, Kanada, Szwajcaria…)' },
];
const CVD: { pct: number; label: string }[] = [
  { pct: 17, label: 'BYD – 17 %' },
  { pct: 18.8, label: 'Geely / Zeekr – 18,8 %' },
  { pct: 7.8, label: 'Tesla Szanghaj – 7,8 %' },
  { pct: 20.7, label: 'Pozostali współpracujący producenci – 20,7 %' },
  { pct: 35.3, label: 'SAIC / MG i niewspółpracujący – 35,3 %' },
  { pct: 0, label: 'Zobowiązanie cenowe przyjęte – 0 %' },
];

const pln = (n: number) => n.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' });
const toNum = (v: string) => {
  const t = v.trim().replace(/\s/g, '');
  const normalized = t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : /^\d{1,3}(\.\d{3})+$/.test(t) ? t.replace(/\./g, '') : t;
  const n = parseFloat(normalized);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};
const pctPl = (n: number) => n.toLocaleString('pl-PL', { maximumFractionDigits: 2 });

export default function KalkulatorImportuPolskaClient() {
  const [route, setRoute] = useState<PlRoute>('ue');
  const [origin, setOrigin] = useState<PlOrigin>('us');
  const [proof, setProof] = useState(true);
  const [cvd, setCvd] = useState('17');
  const [cur, setCur] = useState<Cur>('EUR');
  const [price, setPrice] = useState('18000');
  const [transport, setTransport] = useState('600');
  const [dest, setDest] = useState('');
  const [nowy, setNowy] = useState(false);
  const [drive, setDrive] = useState<PlDrive>('spalinowy');
  const [cc, setCc] = useState('1998');
  const [prywatny, setPrywatny] = useState(true);
  const [rejestracja, setRejestracja] = useState(String(OPLATY_REJESTRACJA_DOMYSLNE));
  const [inne, setInne] = useState('');
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/PLN');
      const data = await res.json();
      if (data?.rates?.EUR) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString('pl-PL'));
      }
    } catch { /* zostaje kurs zapasowy */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const perPln = rates[cur];
  const cenaPLN = toNum(price) / perPln;
  const transportPLN = toNum(transport) / perPln;
  const poza = route === 'poza-ue';
  const kursEur = 1 / rates.EUR;

  const res = useMemo(() => {
    if (cenaPLN <= 0) return null;
    return calcPl({
      route, origin, hasOriginProof: proof, cvdPct: toNum(cvd), cenaPLN, transportPLN, kosztyDoCelu: toNum(dest), nowyUE: nowy,
      drive, cc: toNum(cc), sprzedawcaPrywatny: prywatny, oplatyRejestracjaPLN: toNum(rejestracja), inneKosztyPLN: toNum(inne),
    });
  }, [route, origin, proof, cvd, cenaPLN, transportPLN, dest, nowy, drive, cc, prywatny, rejestracja, inne]);

  const reset = () => {
    setRoute('ue'); setOrigin('us'); setProof(true); setCvd('17'); setCur('EUR'); setPrice('18000'); setTransport('600'); setDest('');
    setNowy(false); setDrive('spalinowy'); setCc('1998'); setPrywatny(true); setRejestracja(String(OPLATY_REJESTRACJA_DOMYSLNE)); setInne('');
  };

  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';
  const check = 'flex items-start gap-2 text-sm text-foreground cursor-pointer';
  const proofRelevant = poza && ['us', 'jp', 'kr', 'uk'].includes(origin);

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Kalkulator" lang="pl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div>
            <label className={label}>Rodzaj importu</label>
            <select className={field} value={route} onChange={(e) => setRoute(e.target.value as PlRoute)}>
              <option value="ue">Zakup w Unii Europejskiej</option>
              <option value="poza-ue">Zakup spoza Unii Europejskiej (cło + VAT)</option>
            </select>
          </div>
          {poza && (
            <div>
              <label className={label}>Kraj produkcji auta</label>
              <select className={field} value={origin} onChange={(e) => setOrigin(e.target.value as PlOrigin)}>
                {ORIGINS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <p className="text-[11px] text-muted-foreground mt-1.5">Liczy się kraj produkcji, a nie kraj zakupu.</p>
            </div>
          )}
          {proofRelevant && (
            <label className={check}>
              <input type="checkbox" checked={proof} onChange={(e) => setProof(e.target.checked)} className="mt-0.5" />
              <span>Ważny dowód pochodzenia (0 % zamiast 10 % cła)
                <span className="block text-[11px] text-muted-foreground">W przypadku USA trzeba też udowodnić transport bezpośredni.</span></span>
            </label>
          )}
          {poza && origin === 'cn_bev' && (
            <div>
              <label className={label}>Cło wyrównawcze producenta</label>
              <select className={field} value={cvd} onChange={(e) => setCvd(e.target.value)}>
                {CVD.map((c) => <option key={c.label} value={c.pct}>{c.label}</option>)}
              </select>
            </div>
          )}
          {!poza && (
            <label className={check}>
              <input type="checkbox" checked={nowy} onChange={(e) => setNowy(e.target.checked)} className="mt-0.5" />
              <span>Nowy środek transportu (do 6 miesięcy LUB do 6 000 km)</span>
            </label>
          )}

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>Waluta</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={label}>Cena zakupu (netto)</label>
              <input className={field} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>{poza ? `Fracht + ubezpieczenie do granicy UE (${cur})` : `Transport (${cur})`}</label>
              <input className={field} inputMode="decimal" value={transport} onChange={(e) => setTransport(e.target.value)} />
            </div>
            {poza && (
              <div>
                <label className={label}>Transport w UE do celu (zł)</label>
                <input className={field} inputMode="decimal" value={dest} onChange={(e) => setDest(e.target.value)} />
              </div>
            )}
          </div>

          <div className="border-t border-border pt-4 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wide text-foreground">Samochód</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Napęd</label>
                <select className={field} value={drive} onChange={(e) => setDrive(e.target.value as PlDrive)}>
                  <option value="spalinowy">Benzyna, diesel lub LPG</option>
                  <option value="hev">Hybryda bez ładowania z gniazdka (HEV, MHEV)</option>
                  <option value="phev">Hybryda plug-in (PHEV)</option>
                  <option value="bev">Elektryczny lub wodorowy</option>
                </select>
              </div>
              {drive !== 'bev' && (
                <div>
                  <label className={label}>Pojemność silnika (cm³)</label>
                  <input className={field} inputMode="decimal" value={cc} onChange={(e) => setCc(e.target.value)} />
                </div>
              )}
            </div>
            <label className={check}>
              <input type="checkbox" checked={prywatny} onChange={(e) => setPrywatny(e.target.checked)} className="mt-0.5" />
              <span>Kupuję od osoby prywatnej (PCC 2 % od ceny)
                <span className="block text-[11px] text-muted-foreground">Odznacz przy zakupie od firmy z fakturą VAT lub VAT-marża.</span></span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Opłaty rejestracyjne (zł)</label>
              <input className={field} inputMode="decimal" value={rejestracja} onChange={(e) => setRejestracja(e.target.value)} />
            </div>
            <div>
              <label className={label}>Inne koszty (zł): tłumaczenia, badanie, agent</label>
              <input className={field} inputMode="decimal" value={inne} onChange={(e) => setInne(e.target.value)} />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>1 EUR = {kursEur.toLocaleString('pl-PL', { maximumFractionDigits: 3 })} zł{live ? ` · kurs na żywo ${live}` : ' · kurs zapasowy'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Odśwież</button>
          </div>
          <p className="text-[11px] text-muted-foreground">Urząd celny przelicza wartość po kursie NBP z dnia poprzedzającego powstanie obowiązku podatkowego, który może się różnić od kursu rynkowego.</p>
        </div>

        <div className="space-y-4">
          {res ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Szacowany koszt importu</h2>
              <div className="space-y-2 text-sm">
                <Row k={poza ? 'Wartość celna (cena + fracht + ubezpieczenie)' : 'Cena zakupu (netto)'} v={pln(res.wartoscCelna)} />
                {res.lines.map((l) => <Row key={l.key} k={l.pct != null ? `${l.label} — ${pctPl(l.pct)} %` : l.label} v={pln(l.amount)} />)}
                <Row k={`Podatki razem (${pctPl(res.podatkiPctCeny)} % ceny)`} v={pln(res.podatki)} bold hi />
                <Row k="Całkowity koszt z rejestracją" v={pln(res.razem)} bold />
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                {res.notatki.map((n) => <li key={n}>{n}</li>)}
                {poza && <li>VAT liczony jest od wartości celnej, cła i akcyzy, a akcyza od wartości celnej powiększonej o cło.</li>}
                <li>Nie wlicza: ubezpieczenia OC, tłumaczeń przysięgłych, badania technicznego (jeśli nie dodano w innych kosztach) i podatku od środków transportowych.</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Resetuj</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Drukuj</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Tylko szacunek. Ostateczne kwoty ustala urząd celno-skarbowy po złożeniu deklaracji AKC-U.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Wpisz cenę zakupu, aby zobaczyć obliczenia.</div>
          )}
          <div className="flex gap-2 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            Akcyzę trzeba zapłacić przed pierwszą rejestracją w Polsce, a deklarację AKC-U złożyć zazwyczaj w ciągu 14 dni od wprowadzenia auta do kraju. Pominięcie terminu grozi karami.
          </div>
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
