'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle } from 'lucide-react';
import { calcFr, defaultMassReduction, scaleFor, type FrApproval, type FrEnergy, type FrOrigin, type FrRoute } from '@/lib/fr-import-duty';

type Cur = 'EUR' | 'USD' | 'JPY' | 'GBP' | 'CHF' | 'KRW' | 'AED' | 'CAD' | 'AUD' | 'CNY';
const CURRENCIES: Cur[] = ['EUR', 'USD', 'JPY', 'GBP', 'CHF', 'KRW', 'AED', 'CAD', 'AUD', 'CNY'];
// Valeurs approximatives (unités pour 1 EUR), utilisées uniquement si le taux en direct ne peut pas être chargé.
const FALLBACK: Record<Cur, number> = { EUR: 1, USD: 1.16, JPY: 174, GBP: 0.87, CHF: 0.93, KRW: 1630, AED: 4.26, CAD: 1.6, AUD: 1.77, CNY: 8.3 };

const ORIGINS: { value: FrOrigin; label: string }[] = [
  { value: 'us', label: 'États-Unis (véhicule construit aux États-Unis)' },
  { value: 'jp', label: 'Japon' },
  { value: 'kr', label: 'Corée du Sud' },
  { value: 'uk', label: 'Royaume-Uni' },
  { value: 'cn_ice', label: 'Chine (thermique ou hybride)' },
  { value: 'cn_bev', label: 'Chine (100 % électrique)' },
  { value: 'other', label: 'Autre pays (Émirats, Australie, Canada…)' },
];
const CVD: { pct: number; label: string }[] = [
  { pct: 17, label: 'BYD – 17 %' },
  { pct: 18.8, label: 'Geely / Zeekr – 18,8 %' },
  { pct: 7.8, label: 'Tesla Shanghai – 7,8 %' },
  { pct: 20.7, label: 'Autres constructeurs coopérants – 20,7 %' },
  { pct: 35.3, label: 'SAIC / MG et non coopérants – 35,3 %' },
  { pct: 0, label: 'Engagement de prix accepté – 0 %' },
];
const ENERGIES: { value: FrEnergy; label: string }[] = [
  { value: 'thermique', label: 'Essence, diesel, GPL' },
  { value: 'micro', label: 'Micro-hybride (moteur électrique < 30 kW)' },
  { value: 'hev', label: 'Hybride non rechargeable (≥ 30 kW)' },
  { value: 'phev', label: 'Hybride rechargeable (> 50 km en mode électrique)' },
  { value: 'bev', label: '100 % électrique ou hydrogène' },
];
const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const YEARS = Array.from({ length: 2026 - 1980 + 1 }, (_, k) => 2026 - k);

const eur = (n: number) => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
const toNum = (v: string) => { const n = parseFloat(v.replace(/\s/g, '').replace(',', '.')); return Number.isFinite(n) && n > 0 ? n : 0; };
const pctFr = (n: number) => n.toLocaleString('fr-FR', { maximumFractionDigits: 1 });

export default function CalculateurImportationFranceClient() {
  const [route, setRoute] = useState<FrRoute>('hors-ue');
  const [origin, setOrigin] = useState<FrOrigin>('us');
  const [proof, setProof] = useState(true);
  const [cvd, setCvd] = useState('17');
  const [cur, setCur] = useState<Cur>('USD');
  const [price, setPrice] = useState('20000');
  const [freight, setFreight] = useState('1500');
  const [dest, setDest] = useState('');
  const [neuf, setNeuf] = useState(false);
  const [firstYear, setFirstYear] = useState(2023);
  const [firstMonth, setFirstMonth] = useState(6);
  const [approval, setApproval] = useState<FrApproval>('none');
  const [energy, setEnergy] = useState<FrEnergy>('thermique');
  const [co2, setCo2] = useState('150');
  const [cv, setCv] = useState('8');
  const [mass, setMass] = useState('1900');
  const [massRed, setMassRed] = useState('');
  const [manual, setManual] = useState('');
  const [tarifCV, setTarifCV] = useState('45');
  const [autres, setAutres] = useState('');
  const [now, setNow] = useState({ y: 2026, m: 10 });
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { const d = new Date(); setNow({ y: d.getFullYear(), m: d.getMonth() + 1 }); }, []);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/EUR');
      const data = await res.json();
      if (data?.rates?.USD) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString('fr-FR'));
      }
    } catch { /* le taux de secours reste affiché */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const rate = rates[cur];
  const prixEUR = toNum(price) / rate;
  const fretEUR = toNum(freight) / rate;
  const massKg = toNum(mass);
  const autoRed = defaultMassReduction(energy, massKg);
  const massReductionKg = massRed === '' ? autoRed : toNum(massRed);
  const scale = scaleFor(firstYear, firstMonth);
  const nonUE = route !== 'ue';

  const res = useMemo(() => {
    if (prixEUR <= 0) return null;
    return calcFr({
      route, origin, hasOriginProof: proof, cvdPct: toNum(cvd), prixEUR, fretEUR, fraisDestEUR: toNum(dest), neufUE: neuf,
      firstYear: route === 'collection' ? Math.min(firstYear, 2014) : firstYear, firstMonth, regYear: now.y, regMonth: now.m,
      approval, co2: toNum(co2), cv: toNum(cv), massKg, energy, massReductionKg, manualMalusEUR: toNum(manual),
      tarifCV: toNum(tarifCV), autresFraisEUR: toNum(autres),
    });
  }, [route, origin, proof, cvd, prixEUR, fretEUR, dest, neuf, firstYear, firstMonth, now, approval, co2, cv, massKg, energy, massReductionKg, manual, tarifCV, autres]);

  const reset = () => {
    setRoute('hors-ue'); setOrigin('us'); setProof(true); setCvd('17'); setCur('USD'); setPrice('20000'); setFreight('1500'); setDest('');
    setNeuf(false); setFirstYear(2023); setFirstMonth(6); setApproval('none'); setEnergy('thermique'); setCo2('150'); setCv('8');
    setMass('1900'); setMassRed(''); setManual(''); setTarifCV('45'); setAutres('');
  };

  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';
  const check = 'flex items-start gap-2 text-sm text-foreground cursor-pointer';
  const proofRelevant = route === 'hors-ue' && ['us', 'jp', 'kr', 'uk'].includes(origin);

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Calculateur" lang="fr">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div>
            <label className={label}>Type d’importation</label>
            <select className={field} value={route} onChange={(e) => setRoute(e.target.value as FrRoute)}>
              <option value="hors-ue">Achat hors Union européenne (droit de douane + TVA)</option>
              <option value="ue">Achat dans l’Union européenne</option>
              <option value="collection">Véhicule de collection de plus de 30 ans (TVA 5,5 %)</option>
              <option value="demenagement">Transfert de résidence en France (franchise)</option>
            </select>
          </div>

          {route === 'hors-ue' && (
            <div>
              <label className={label}>Pays de fabrication du véhicule</label>
              <select className={field} value={origin} onChange={(e) => setOrigin(e.target.value as FrOrigin)}>
                {ORIGINS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <p className="text-[11px] text-muted-foreground mt-1.5">Seul compte le pays de fabrication, pas le pays d’achat.</p>
            </div>
          )}
          {proofRelevant && (
            <label className={check}>
              <input type="checkbox" checked={proof} onChange={(e) => setProof(e.target.checked)} className="mt-0.5" />
              <span>Preuve d’origine valable (0 % au lieu de 10 % de droit)
                <span className="block text-[11px] text-muted-foreground">Pour les États-Unis, il faut aussi prouver le transport direct.</span></span>
            </label>
          )}
          {route === 'hors-ue' && origin === 'cn_bev' && (
            <div>
              <label className={label}>Droit compensateur du constructeur</label>
              <select className={field} value={cvd} onChange={(e) => setCvd(e.target.value)}>
                {CVD.map((c) => <option key={c.label} value={c.pct}>{c.label}</option>)}
              </select>
            </div>
          )}
          {route === 'ue' && (
            <label className={check}>
              <input type="checkbox" checked={neuf} onChange={(e) => setNeuf(e.target.checked)} className="mt-0.5" />
              <span>Véhicule neuf au sens de la TVA (moins de 6 mois OU moins de 6 000 km)</span>
            </label>
          )}

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>Devise</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={label}>Prix d’achat (hors taxes)</label>
              <input className={field} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>{nonUE ? `Fret + assurance jusqu’à la frontière UE (${cur})` : `Transport (${cur})`}</label>
              <input className={field} inputMode="decimal" value={freight} onChange={(e) => setFreight(e.target.value)} />
            </div>
            {nonUE && (
              <div>
                <label className={label}>Transport jusqu’à destination dans l’UE (€)</label>
                <input className={field} inputMode="decimal" value={dest} onChange={(e) => setDest(e.target.value)} />
              </div>
            )}
          </div>

          <div className="border-t border-border pt-4 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wide text-foreground">Le véhicule (certificat d’immatriculation ou COC)</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>1re immatriculation : mois (B)</label>
                <select className={field} value={firstMonth} onChange={(e) => setFirstMonth(Number(e.target.value))}>
                  {MONTHS.map((m, k) => <option key={m} value={k + 1}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className={label}>1re immatriculation : année</label>
                <select className={field} value={firstYear} onChange={(e) => setFirstYear(Number(e.target.value))}>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className={label}>Motorisation</label>
              <select className={field} value={energy} onChange={(e) => { setEnergy(e.target.value as FrEnergy); setMassRed(''); }}>
                {ENERGIES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Réception du véhicule</label>
              <select className={field} value={approval} onChange={(e) => setApproval(e.target.value as FrApproval)}>
                <option value="wltp">Réception UE, émissions mesurées en WLTP (case V.7)</option>
                <option value="nedc">Réception UE, émissions mesurées en NEDC</option>
                <option value="none">Sans réception UE (États-Unis, Japon, etc.) : barème par puissance</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {approval !== 'none' && (
                <div>
                  <label className={label}>CO2 (g/km)</label>
                  <input className={field} inputMode="decimal" value={co2} onChange={(e) => setCo2(e.target.value)} />
                </div>
              )}
              <div>
                <label className={label}>Puissance fiscale (CV)</label>
                <input className={field} inputMode="decimal" value={cv} onChange={(e) => setCv(e.target.value)} />
              </div>
              <div>
                <label className={label}>Masse en ordre de marche (kg)</label>
                <input className={field} inputMode="decimal" value={mass} onChange={(e) => setMass(e.target.value)} />
              </div>
            </div>
            {(energy === 'hev' || energy === 'micro' || energy === 'phev') && (
              <div>
                <label className={label}>Abattement de masse (kg) — valeur 2026, modifiable</label>
                <input className={field} inputMode="decimal" placeholder={String(Math.round(autoRed))} value={massRed} onChange={(e) => setMassRed(e.target.value)} />
              </div>
            )}
            {scale === 'manual' && (
              <div>
                <label className={label}>Malus théorique de l’année d’origine (€) — barèmes 2015-2020 non intégrés</label>
                <input className={field} inputMode="decimal" value={manual} onChange={(e) => setManual(e.target.value)} />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Tarif régional du cheval fiscal (€)</label>
              <input className={field} inputMode="decimal" value={tarifCV} onChange={(e) => setTarifCV(e.target.value)} />
              <p className="text-[11px] text-muted-foreground mt-1">Fixé par chaque région : remplacez par le tarif de votre département.</p>
            </div>
            <div>
              <label className={label}>Autres frais (€) : réception, contrôle technique, transitaire</label>
              <input className={field} inputMode="decimal" value={autres} onChange={(e) => setAutres(e.target.value)} />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>1 EUR = {rate.toLocaleString('fr-FR', { maximumFractionDigits: 3 })} {cur}{live ? ` · taux en direct ${live}` : ' · taux de secours'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Actualiser</button>
          </div>
          <p className="text-[11px] text-muted-foreground">La douane applique le taux de change officiel du mois, qui peut différer légèrement du taux du marché.</p>
        </div>

        <div className="space-y-4">
          {res ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Coût estimé de l’importation</h2>
              <div className="space-y-2 text-sm">
                <Row k={nonUE ? 'Valeur en douane (prix + fret + assurance)' : 'Prix d’achat (hors taxes)'} v={eur(res.valeurDouane)} />
                {res.lines.map((l) => <Row key={l.key} k={l.pct != null ? `${l.label} — ${pctFr(l.pct)} %` : l.label} v={eur(l.amount)} />)}
                <Row k="Taxes, malus et carte grise" v={eur(res.taxesEtMalus)} bold hi />
                <Row k="Coût total tout compris" v={eur(res.total)} bold />
                {res.decote > 0 && res.decote < 100 && <Row k={`Décote d’ancienneté sur le malus (${res.ageMonths} mois)`} v={`${res.decote} %`} />}
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                {res.notes.map((n) => <li key={n}>{n}</li>)}
                {nonUE && <li>La TVA est calculée sur la valeur en douane, le droit de douane et les frais jusqu’au premier lieu de destination.</li>}
                <li>Non inclus : assurance, plaques, prestataire d’immatriculation, malus pour famille nombreuse ou carte mobilité inclusion.</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Réinitialiser</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Imprimer</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Simple estimation. Le montant définitif est fixé par la douane française et l’ANTS.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Saisissez un prix d’achat pour voir le calcul.</div>
          )}
          {nonUE && (
            <div className="flex gap-2 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              Un véhicule sans réception européenne demande en général une réception à titre isolé (DREAL), un contrôle technique français et parfois des modifications (éclairage, compteur en km/h). Ajoutez ces coûts dans « Autres frais ».
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
