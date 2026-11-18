'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle } from 'lucide-react';
import { calcBe, volleMaanden, VL_C_BENZINE, VL_C_DIESEL, type BeFuel, type BeOrigin, type BeRegion, type BeRoute, type DateParts } from '@/lib/be-import-duty';

type Lang = 'nl' | 'fr';
type Cur = 'EUR' | 'USD' | 'JPY' | 'GBP' | 'CHF' | 'KRW' | 'AED' | 'CAD' | 'AUD' | 'CNY';
const CURRENCIES: Cur[] = ['EUR', 'USD', 'JPY', 'GBP', 'CHF', 'KRW', 'AED', 'CAD', 'AUD', 'CNY'];
// Approximate units per 1 EUR, used only if the live rate cannot be loaded.
const FALLBACK: Record<Cur, number> = { EUR: 1, USD: 1.16, JPY: 174, GBP: 0.87, CHF: 0.93, KRW: 1630, AED: 4.26, CAD: 1.6, AUD: 1.77, CNY: 8.3 };
const CVD = [17, 18.8, 7.8, 20.7, 35.3, 0];

const T = {
  nl: {
    loc: 'nl-BE', route: 'Soort import', rBuiten: 'Aankoop buiten de Europese Unie (invoerrecht + btw)', rEu: 'Aankoop in de Europese Unie',
    origin: 'Land waar de auto is gebouwd', originNote: 'Het productieland telt, niet het land van aankoop.',
    origins: { us: 'Verenigde Staten (in de VS gebouwd)', jp: 'Japan', kr: 'Zuid-Korea', uk: 'Verenigd Koninkrijk', cn_ice: 'China (benzine, diesel of hybride)', cn_bev: 'China (volledig elektrisch)', other: 'Ander land (VAE, Australië, Canada…)' },
    proof: 'Geldig oorsprongsbewijs (0 % in plaats van 10 % invoerrecht)', proofNote: 'Voor de VS moet ook het rechtstreekse vervoer worden bewezen.',
    cvd: 'Compenserend recht van de fabrikant', cvdOpts: ['BYD – 17 %', 'Geely / Zeekr – 18,8 %', 'Tesla Shanghai – 7,8 %', 'Overige meewerkende fabrikanten – 20,7 %', 'SAIC / MG en niet-meewerkende – 35,3 %', 'Prijsverbintenis aanvaard – 0 %'],
    nieuw: 'Nieuw voertuig voor de btw (hooguit 6 maanden oud OF hooguit 6.000 km)', cur: 'Valuta', price: 'Aankoopprijs (excl. btw)',
    freightB: 'Vracht + verzekering tot de EU-grens', freightE: 'Transport', dest: 'Vervoer binnen de EU tot bestemming (€)',
    car: 'De auto en je gewest', region: 'Gewest van inschrijving', regions: { vl: 'Vlaanderen (BIV)', wa: 'Wallonië (TMC)', bxl: 'Brussel (BIV)' },
    fuel: 'Brandstof', fuels: { benzine: 'Benzine', diesel: 'Diesel', hybride: 'Hybride', elektrisch: 'Volledig elektrisch' },
    first: 'Datum eerste inschrijving (waar ook ter wereld)', reg: 'Datum inschrijving in België', co2: 'CO2 (g/km, WLTP)', kw: 'Vermogen (kW)', pk: 'Fiscale pk', mtm: 'Maximaal toegelaten massa (kg)',
    nedc: 'CO2 gemeten volgens NEDC', air: 'Luchtcomponent c (€) — Euronorm', airNote: 'Standaard voor Euro 6. Pas aan voor een andere Euronorm of een voertuig zonder roetfilter.',
    other: 'Overige kosten (€): keuring, DIV, platen, importeur', title: 'Geschatte importkosten', cv: 'Douanewaarde (prijs + vracht + verzekering)', price0: 'Aankoopprijs (excl. btw)',
    duty: 'Invoerrecht', cvdL: 'Compenserend recht (China, EV)', vat: 'Btw bij invoer', vatBE: 'Belgische btw', bivL: 'Belasting op inverkeerstelling (BIV)', taxes: 'Belastingen samen', total: 'Totale kosten, alles inbegrepen',
    noteNoProof: 'Zonder geldig oorsprongsbewijs geldt het gewone invoerrecht van 10 %.', noteUS: 'Verenigde Staten: 0 % sinds 1 juli 2026 (Verordening (EU) 2026/1455), alleen voor in de VS gebouwde auto’s met bewezen rechtstreeks vervoer.', noteJP: 'Japan: 0 % sinds 1 februari 2026 (EU-Japan-partnerschapsakkoord), met oorsprongsverklaring.',
    noteCN: 'Chinese elektrische auto’s: 10 % invoerrecht plus een compenserend recht per fabrikant.', noteNew: 'Nieuw voertuig voor de btw: 21 % Belgische btw, ook als particulier.', noteUsed: 'Gebruikte auto uit de EU (meer dan 6 maanden én meer dan 6.000 km): geen Belgische btw als in het aankoopland al btw is betaald.',
    noteEV: 'Elektrische auto’s zijn niet vrijgesteld: Brussel rekent 78,88 €, Wallonië minimaal 50 € en Vlaanderen 61,50 € voor inschrijvingen vanaf 2026.', noteVl: 'Vlaanderen: formule met CO2, brandstof, Euronorm en leeftijd; minimum 58,16 € en maximum 14.539,31 €.', noteWa: 'Wallonië: basisbedrag × CO2/136 × massa/1.838, tussen 50 € en 9.000 €.', noteBxl: 'Brussel: tabel op het hoogste van kW en fiscale pk, verminderd met de leeftijd.',
    vatNote: 'De btw wordt berekend over douanewaarde, invoerrecht en kosten tot de eerste bestemming.', notIncl: 'Niet inbegrepen: jaarlijkse verkeersbelasting, verzekering en een eventuele homologatie.',
    reset: 'Herstellen', print: 'Afdrukken', est: 'Slechts een schatting. De regionale belastingdienst stelt het definitieve BIV-bedrag vast.', empty: 'Vul een aankoopprijs in om de berekening te zien.',
    rate: (r: number, c: string, live: string | null) => `1 EUR = ${r.toLocaleString('nl-BE', { maximumFractionDigits: 3 })} ${c}${live ? ` · actuele koers ${live}` : ' · terugvalkoers'}`, refresh: 'Vernieuwen', fxNote: 'De douane hanteert de officiële maandkoers, die licht kan afwijken van de marktkoers.',
    warn: 'Een auto van buiten de EU heeft meestal een Europese typegoedkeuring (COC) of een individuele goedkeuring nodig voor de inschrijving. Reken die kosten mee onder “Overige kosten”.',
  },
  fr: {
    loc: 'fr-BE', route: 'Type d’importation', rBuiten: 'Achat hors Union européenne (droit de douane + TVA)', rEu: 'Achat dans l’Union européenne',
    origin: 'Pays de fabrication de la voiture', originNote: 'Seul compte le pays de fabrication, pas celui d’achat.',
    origins: { us: 'États-Unis (voiture construite aux États-Unis)', jp: 'Japon', kr: 'Corée du Sud', uk: 'Royaume-Uni', cn_ice: 'Chine (essence, diesel ou hybride)', cn_bev: 'Chine (100 % électrique)', other: 'Autre pays (Émirats, Australie, Canada…)' },
    proof: 'Preuve d’origine valable (0 % au lieu de 10 % de droit)', proofNote: 'Pour les États-Unis, il faut aussi prouver le transport direct.',
    cvd: 'Droit compensateur du constructeur', cvdOpts: ['BYD – 17 %', 'Geely / Zeekr – 18,8 %', 'Tesla Shanghai – 7,8 %', 'Autres constructeurs coopérants – 20,7 %', 'SAIC / MG et non coopérants – 35,3 %', 'Engagement de prix accepté – 0 %'],
    nieuw: 'Véhicule neuf pour la TVA (au plus 6 mois OU au plus 6 000 km)', cur: 'Devise', price: 'Prix d’achat (hors TVA)',
    freightB: 'Fret + assurance jusqu’à la frontière de l’UE', freightE: 'Transport', dest: 'Transport dans l’UE jusqu’à destination (€)',
    car: 'La voiture et votre région', region: 'Région d’immatriculation', regions: { vl: 'Flandre (BIV)', wa: 'Wallonie (TMC)', bxl: 'Bruxelles (TMC)' },
    fuel: 'Carburant', fuels: { benzine: 'Essence', diesel: 'Diesel', hybride: 'Hybride', elektrisch: '100 % électrique' },
    first: 'Date de première immatriculation (n’importe où dans le monde)', reg: 'Date d’immatriculation en Belgique', co2: 'CO2 (g/km, WLTP)', kw: 'Puissance (kW)', pk: 'Chevaux fiscaux', mtm: 'Masse maximale autorisée (kg)',
    nedc: 'CO2 mesuré selon la norme NEDC', air: 'Composante air c (€) — norme Euro', airNote: 'Valeur standard pour l’Euro 6. À modifier pour une autre norme Euro ou un véhicule sans filtre à particules.',
    other: 'Autres frais (€) : contrôle, DIV, plaques, importateur', title: 'Coût estimé de l’importation', cv: 'Valeur en douane (prix + fret + assurance)', price0: 'Prix d’achat (hors TVA)',
    duty: 'Droit de douane', cvdL: 'Droit compensateur (Chine, VE)', vat: 'TVA à l’importation', vatBE: 'TVA belge', bivL: 'Taxe de mise en circulation (TMC)', taxes: 'Taxes au total', total: 'Coût total, tout compris',
    noteNoProof: 'Sans preuve d’origine valable, le droit normal de 10 % s’applique.', noteUS: 'États-Unis : 0 % depuis le 1er juillet 2026 (règlement (UE) 2026/1455), pour les voitures construites aux États-Unis avec transport direct prouvé.', noteJP: 'Japon : 0 % depuis le 1er février 2026 (accord de partenariat UE-Japon), avec preuve d’origine.',
    noteCN: 'Voitures électriques chinoises : 10 % de droit plus un droit compensateur selon le constructeur.', noteNew: 'Véhicule neuf pour la TVA : TVA belge de 21 %, même entre particuliers.', noteUsed: 'Occasion de l’UE (plus de 6 mois et plus de 6 000 km) : pas de TVA belge si la taxe a déjà été payée dans le pays d’achat.',
    noteEV: 'Les voitures électriques ne sont pas exonérées : Bruxelles 78,88 €, Wallonie 50 € minimum et Flandre 61,50 € pour les immatriculations depuis 2026.', noteVl: 'Flandre : formule avec CO2, carburant, norme Euro et âge ; minimum 58,16 € et maximum 14 539,31 €.', noteWa: 'Wallonie : montant de base × CO2/136 × masse/1 838, entre 50 € et 9 000 €.', noteBxl: 'Bruxelles : barème selon le plus élevé de kW et de chevaux fiscaux, réduit selon l’âge.',
    vatNote: 'La TVA est calculée sur la valeur en douane, le droit et les frais jusqu’au premier lieu de destination.', notIncl: 'Non inclus : taxe de circulation annuelle, assurance et éventuelle homologation.',
    reset: 'Réinitialiser', print: 'Imprimer', est: 'Simple estimation. L’administration fiscale régionale fixe le montant définitif de la TMC.', empty: 'Saisissez un prix d’achat pour voir le calcul.',
    rate: (r: number, c: string, live: string | null) => `1 EUR = ${r.toLocaleString('fr-BE', { maximumFractionDigits: 3 })} ${c}${live ? ` · taux en direct ${live}` : ' · taux de secours'}`, refresh: 'Actualiser', fxNote: 'La douane applique le taux de change officiel du mois, qui peut différer légèrement du taux du marché.',
    warn: 'Une voiture hors UE nécessite en général une réception européenne (COC) ou une réception à titre individuel avant l’immatriculation. Ajoutez ces coûts dans « Autres frais ».',
  },
} as const;

const toNum = (v: string) => {
  const t = v.trim().replace(/\s/g, '');
  const normalized = t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : /^\d{1,3}(\.\d{3})+$/.test(t) ? t.replace(/\./g, '') : t;
  const n = parseFloat(normalized);
  return Number.isFinite(n) && n > 0 ? n : 0;
};
const parseDate = (s: string): DateParts | null => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  return m ? { y: Number(m[1]), m: Number(m[2]), d: Number(m[3]) } : null;
};
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export default function BelgiumImportCalculator({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [route, setRoute] = useState<BeRoute>('buiten-eu');
  const [origin, setOrigin] = useState<BeOrigin>('us');
  const [proof, setProof] = useState(true);
  const [cvd, setCvd] = useState('17');
  const [cur, setCur] = useState<Cur>('USD');
  const [price, setPrice] = useState('20000');
  const [freight, setFreight] = useState('1500');
  const [dest, setDest] = useState('');
  const [nieuwEU, setNieuwEU] = useState(false);
  const [region, setRegion] = useState<BeRegion>('vl');
  const [fuel, setFuel] = useState<BeFuel>('benzine');
  const [first, setFirst] = useState('2024-01-15');
  const [regDate, setRegDate] = useState('2026-11-18');
  const [co2, setCo2] = useState('118');
  const [kw, setKw] = useState('90');
  const [pk, setPk] = useState('8');
  const [mtm, setMtm] = useState('1838');
  const [nedc, setNedc] = useState(false);
  const [air, setAir] = useState('');
  const [other, setOther] = useState('');
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { setRegDate(iso(new Date())); }, []);
  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/EUR');
      const data = await res.json();
      if (data?.rates?.USD) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString(t.loc));
      }
    } catch { /* keep fallback */ } finally { setLoading(false); }
  }, [t.loc]);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const rate = rates[cur];
  const prijsEUR = toNum(price) / rate;
  const vrachtEUR = toNum(freight) / rate;
  const buiten = route === 'buiten-eu';
  const fDate = parseDate(first);
  const rDate = parseDate(regDate);
  const defaultAir = fuel === 'diesel' ? VL_C_DIESEL : VL_C_BENZINE;

  const res = useMemo(() => {
    if (prijsEUR <= 0 || !fDate || !rDate) return null;
    const r = calcBe({
      route, origin, hasOriginProof: proof, cvdPct: toNum(cvd), prijsEUR, vrachtEUR, kostenBestemmingEUR: toNum(dest), nieuwEU, overigeKostenEUR: toNum(other),
      region, fuel, co2: toNum(co2), kw: toNum(kw), pk: toNum(pk), mtmKg: toNum(mtm), nedc, maanden: volleMaanden(fDate, rDate),
      luchtComponent: air.trim() === '' ? defaultAir : toNum(air), inschrijving2026: rDate.y >= 2026,
    });
    return r;
  }, [route, origin, proof, cvd, prijsEUR, vrachtEUR, dest, nieuwEU, region, fuel, co2, kw, pk, mtm, nedc, fDate, rDate, air, defaultAir, other]);

  const reset = () => {
    setRoute('buiten-eu'); setOrigin('us'); setProof(true); setCvd('17'); setCur('USD'); setPrice('20000'); setFreight('1500'); setDest('');
    setNieuwEU(false); setRegion('vl'); setFuel('benzine'); setFirst('2024-01-15'); setRegDate(iso(new Date())); setCo2('118'); setKw('90'); setPk('8');
    setMtm('1838'); setNedc(false); setAir(''); setOther('');
  };

  const eur = (n: number) => n.toLocaleString(t.loc, { style: 'currency', currency: 'EUR' });
  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';
  const check = 'flex items-start gap-2 text-sm text-foreground cursor-pointer';
  const proofRelevant = buiten && ['us', 'jp', 'kr', 'uk'].includes(origin);
  const notes: string[] = [];
  if (res) {
    if (buiten) {
      if (origin === 'cn_bev') notes.push(t.noteCN);
      if (['us', 'jp', 'kr', 'uk'].includes(origin) && !proof) notes.push(t.noteNoProof);
      if (origin === 'us' && proof) notes.push(t.noteUS);
      if (origin === 'jp' && proof) notes.push(t.noteJP);
    } else notes.push(nieuwEU ? t.noteNew : t.noteUsed);
    notes.push(region === 'vl' ? t.noteVl : region === 'wa' ? t.noteWa : t.noteBxl);
    if (fuel === 'elektrisch') notes.push(t.noteEV);
  }

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Calculator" lang={lang}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div>
            <label className={label}>{t.route}</label>
            <select className={field} value={route} onChange={(e) => setRoute(e.target.value as BeRoute)}>
              <option value="buiten-eu">{t.rBuiten}</option>
              <option value="eu">{t.rEu}</option>
            </select>
          </div>
          {buiten && (
            <div>
              <label className={label}>{t.origin}</label>
              <select className={field} value={origin} onChange={(e) => setOrigin(e.target.value as BeOrigin)}>
                {(Object.keys(t.origins) as BeOrigin[]).map((k) => <option key={k} value={k}>{t.origins[k]}</option>)}
              </select>
              <p className="text-[11px] text-muted-foreground mt-1.5">{t.originNote}</p>
            </div>
          )}
          {proofRelevant && (
            <label className={check}>
              <input type="checkbox" checked={proof} onChange={(e) => setProof(e.target.checked)} className="mt-0.5" />
              <span>{t.proof}<span className="block text-[11px] text-muted-foreground">{t.proofNote}</span></span>
            </label>
          )}
          {buiten && origin === 'cn_bev' && (
            <div>
              <label className={label}>{t.cvd}</label>
              <select className={field} value={cvd} onChange={(e) => setCvd(e.target.value)}>
                {CVD.map((p, k) => <option key={t.cvdOpts[k]} value={p}>{t.cvdOpts[k]}</option>)}
              </select>
            </div>
          )}
          {!buiten && (
            <label className={check}>
              <input type="checkbox" checked={nieuwEU} onChange={(e) => setNieuwEU(e.target.checked)} className="mt-0.5" />
              <span>{t.nieuw}</span>
            </label>
          )}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>{t.cur}</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={label}>{t.price}</label>
              <input className={field} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>{(buiten ? t.freightB : t.freightE) + ` (${cur})`}</label>
              <input className={field} inputMode="decimal" value={freight} onChange={(e) => setFreight(e.target.value)} />
            </div>
            {buiten && (
              <div>
                <label className={label}>{t.dest}</label>
                <input className={field} inputMode="decimal" value={dest} onChange={(e) => setDest(e.target.value)} />
              </div>
            )}
          </div>

          <div className="border-t border-border pt-4 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wide text-foreground">{t.car}</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>{t.region}</label>
                <select className={field} value={region} onChange={(e) => setRegion(e.target.value as BeRegion)}>
                  {(Object.keys(t.regions) as BeRegion[]).map((k) => <option key={k} value={k}>{t.regions[k]}</option>)}
                </select>
              </div>
              <div>
                <label className={label}>{t.fuel}</label>
                <select className={field} value={fuel} onChange={(e) => { setFuel(e.target.value as BeFuel); setAir(''); }}>
                  {(Object.keys(t.fuels) as BeFuel[]).map((k) => <option key={k} value={k}>{t.fuels[k]}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>{t.first}</label>
                <input type="date" className={field} value={first} onChange={(e) => setFirst(e.target.value)} />
              </div>
              <div>
                <label className={label}>{t.reg}</label>
                <input type="date" className={field} value={regDate} onChange={(e) => setRegDate(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {fuel !== 'elektrisch' && (
                <div>
                  <label className={label}>{t.co2}</label>
                  <input className={field} inputMode="decimal" value={co2} onChange={(e) => setCo2(e.target.value)} />
                </div>
              )}
              {region !== 'vl' && (
                <>
                  <div>
                    <label className={label}>{t.kw}</label>
                    <input className={field} inputMode="decimal" value={kw} onChange={(e) => setKw(e.target.value)} />
                  </div>
                  <div>
                    <label className={label}>{t.pk}</label>
                    <input className={field} inputMode="decimal" value={pk} onChange={(e) => setPk(e.target.value)} />
                  </div>
                </>
              )}
            </div>
            {region === 'wa' && fuel !== 'elektrisch' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={label}>{t.mtm}</label>
                  <input className={field} inputMode="decimal" value={mtm} onChange={(e) => setMtm(e.target.value)} />
                </div>
                <label className={`${check} items-center pt-5`}>
                  <input type="checkbox" checked={nedc} onChange={(e) => setNedc(e.target.checked)} />
                  <span>{t.nedc}</span>
                </label>
              </div>
            )}
            {region === 'vl' && fuel !== 'elektrisch' && (
              <div>
                <label className={label}>{t.air}</label>
                <input className={field} inputMode="decimal" placeholder={String(defaultAir)} value={air} onChange={(e) => setAir(e.target.value)} />
                <p className="text-[11px] text-muted-foreground mt-1">{t.airNote}</p>
              </div>
            )}
          </div>

          <div>
            <label className={label}>{t.other}</label>
            <input className={field} inputMode="decimal" value={other} onChange={(e) => setOther(e.target.value)} />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>{t.rate(rate, cur, live)}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />{t.refresh}</button>
          </div>
          <p className="text-[11px] text-muted-foreground">{t.fxNote}</p>
        </div>

        <div className="space-y-4">
          {res ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{t.title}</h2>
              <div className="space-y-2 text-sm">
                <Row k={buiten ? t.cv : t.price0} v={eur(res.douanewaarde)} />
                {buiten && <Row k={`${t.duty} — ${res.rechtPct} %`} v={eur(res.recht)} />}
                {res.cvdPct > 0 && <Row k={`${t.cvdL} — ${res.cvdPct.toLocaleString(t.loc)} %`} v={eur(res.cvd)} />}
                <Row k={`${buiten ? t.vat : t.vatBE} — ${res.btwPct} %`} v={eur(res.btw)} />
                <Row k={t.bivL} v={eur(res.biv)} />
                <Row k={t.taxes} v={eur(res.belastingTotaal)} bold hi />
                <Row k={t.total} v={eur(res.totaal)} bold />
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                {notes.map((n) => <li key={n}>{n}</li>)}
                {buiten && <li>{t.vatNote}</li>}
                <li>{t.notIncl}</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />{t.reset}</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />{t.print}</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">{t.est}</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">{t.empty}</div>
          )}
          {buiten && (
            <div className="flex gap-2 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              {t.warn}
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
