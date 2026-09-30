'use client';

// Shared interactive part of "Best Car For…" — used by EVERY language.
// All prose comes from `c` (lib/best-car/{lang}.ts) and optional per-car text;
// all numbers/scoring come from the shared dataset. No language-specific logic
// lives here, so a scoring fix is made once.

import { useEffect, useMemo, useState } from 'react';
import { ChevronRight, AlertTriangle, Fuel, Wrench, Package, ArrowUpDown, Globe2, Zap, Link2, Check } from 'lucide-react';
import { USE_CASE_META, AFRICA_CODES, type CarData, type UseCaseTag } from '@/app/tools/cars-data';
import { CAR_COUNTRIES, getCarCountry, localPriceRange, type CarCountry } from '@/lib/car-country-pricing';
import { rankCars } from '@/lib/best-car/scoring';
import { countryName, fill, formatPrice, templateVars, translateEnum } from '@/lib/best-car/helpers';
import type { BestCarStrings, CarText } from '@/lib/best-car/types';

const USE_CASE_TAGS = Object.keys(USE_CASE_META) as UseCaseTag[];
const HEADING_FONT = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;

// Badge colours are keyed on the underlying English enum, never on the
// translated label (the old Spanish client keyed on 'Baja' / 'Fácil', so
// renaming a label silently broke the styling).
const MAINT_STYLE: Record<string, string> = {
  Low: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
  Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
  High: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/25',
  'Very High': 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/25',
};
const PARTS_STYLE: Record<string, string> = {
  Easy: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
  Moderate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
  Hard: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/25',
};

function Badge({ style, label }: { style: string; label: string }) {
  return <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${style}`}>{label}</span>;
}

function ScoreBar({ score, rank }: { score: number; rank: number }) {
  const colors = ['bg-yellow-400', 'bg-muted-foreground/40', 'bg-amber-700/70'];
  const color = colors[rank] ?? 'bg-emerald-500/50';
  return (
    <div className="flex items-center gap-2" dir="ltr">
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-[10px] text-muted-foreground w-6 text-end">{score}</span>
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 0) return <span className="text-sm" aria-label="1">🥇</span>;
  if (rank === 1) return <span className="text-sm" aria-label="2">🥈</span>;
  if (rank === 2) return <span className="text-sm" aria-label="3">🥉</span>;
  return <span className="text-xs text-muted-foreground font-bold">#{rank + 1}</span>;
}

const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='100' viewBox='0 0 140 100'%3E%3Crect width='140' height='100' fill='%23e5e7eb'/%3E%3C/svg%3E";

function CarResultCard({
  c, car, score, rank, country, text, countryLabel,
}: {
  c: BestCarStrings; car: CarData; score: number; rank: number; country: CarCountry; text?: CarText; countryLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const price = localPriceRange(car.basePriceUSD, country);
  const { ui, enums } = c;
  const engine = car.isElectric
    ? ui.electricMotor
    : `${(car.engineCC / 1000).toFixed(1)}L ${translateEnum(car.fuelType, enums.fuelType)}`;
  const detailParts = [
    fill(ui.seatsFmt, { n: String(car.seats) }),
    translateEnum(car.bodyType, enums.bodyType),
    engine,
    translateEnum(car.transmission, enums.transmission),
    ...(car.bootSpace > 0 ? [fill(ui.bootFmt, { n: String(car.bootSpace) })] : []),
  ];

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${rank === 0 ? 'border-yellow-500/40 bg-yellow-500/5' : 'border-border bg-card'}`}>
      <div className="flex gap-0 sm:gap-3">
        <div className="w-28 sm:w-36 flex-shrink-0 overflow-hidden bg-muted">
          <img
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG; }}
          />
        </div>

        <div className="flex-1 p-3 sm:p-4 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <RankBadge rank={rank} />
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{car.brand}</p>
                {car.isElectric && <Zap className="h-3 w-3 text-blue-500" aria-label={ui.electric} />}
              </div>
              <p className="text-base sm:text-lg font-black text-foreground leading-tight" style={c.latin ? HEADING_FONT : undefined} dir="ltr">
                {car.model}
              </p>
            </div>
            <div className="text-end flex-shrink-0">
              <p className="text-xs text-muted-foreground">{ui.match}</p>
              <p className={`text-xl font-black leading-none ${rank === 0 ? 'text-yellow-500' : 'text-muted-foreground'}`} style={c.latin ? HEADING_FONT : undefined}>
                {score}
              </p>
            </div>
          </div>

          <ScoreBar score={score} rank={rank} />

          <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2.5">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Fuel className="h-3 w-3 text-muted-foreground/50" />
              <span>{car.isElectric ? ui.electric : `${car.fuelConsumption} ${ui.consumptionUnit}`}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpDown className="h-3 w-3 text-muted-foreground/50" />
              <span dir="ltr">{car.groundClearance}mm</span>
            </div>
            <div className="flex items-center gap-1">
              <Wrench className="h-3 w-3 text-muted-foreground/50" />
              <Badge style={MAINT_STYLE[car.maintenanceCost] ?? ''} label={c.enums.maintenance[car.maintenanceCost]} />
            </div>
            <div className="flex items-center gap-1">
              <Package className="h-3 w-3 text-muted-foreground/50" />
              <Badge style={PARTS_STYLE[car.spareParts] ?? ''} label={c.enums.spareParts[car.spareParts]} />
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            <span className="text-foreground font-semibold" dir="ltr">
              {formatPrice(price.min, country, c)} – {formatPrice(price.max, country, c)}
            </span>{' '}
            <span className="text-muted-foreground/70">{fill(ui.estIn, { country: countryLabel })}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="w-full flex items-center justify-between px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
        >
          <span>{open ? ui.hideDetails : ui.showDetails}</span>
          <ChevronRight className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-90' : 'rtl:rotate-180'}`} />
        </button>
        {open && (
          <div className="px-4 pb-4 space-y-2">
            <div className="text-xs text-muted-foreground leading-relaxed">
              <span className="text-foreground font-semibold">{ui.commonIssues} </span>
              {text?.commonIssues ?? car.commonIssues}
            </div>
            <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
              <AlertTriangle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-amber-500" />
              <span>{text?.watchOut ?? car.watchOut}</span>
            </div>
            <div className="text-xs text-muted-foreground">{detailParts.join(' · ')}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BestCarClient({ c, carText }: { c: BestCarStrings; carText?: Record<string, CarText> }) {
  const { ui } = c;
  const [countryCode, setCountryCode] = useState(c.defaultCountry);
  const [selected, setSelected] = useState<UseCaseTag | null>(null);
  const [copied, setCopied] = useState(false);
  const vars = useMemo(templateVars, []);

  const country = useMemo(() => getCarCountry(countryCode), [countryCode]);
  const label = useMemo(() => countryName(country, c.locale), [country, c.locale]);

  // Restore shared state from the URL (?use=family&country=gb); otherwise
  // pre-select the visitor's country if it is one of this language's markets.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const use = params.get('use') as UseCaseTag | null;
    const cc = params.get('country')?.toLowerCase();
    if (use && USE_CASE_TAGS.includes(use)) setSelected(use);
    if (cc && CAR_COUNTRIES.some((x) => x.code === cc)) {
      setCountryCode(cc);
    } else {
      const regions = (navigator.languages?.length ? navigator.languages : [navigator.language])
        .map((l) => l?.split('-')[1]?.toLowerCase())
        .filter(Boolean) as string[];
      const hit = regions.find((r) => c.priorityCountries.includes(r) && CAR_COUNTRIES.some((x) => x.code === r));
      if (hit) setCountryCode(hit);
    }
  }, [c.priorityCountries]);

  // Keep the URL shareable without adding history entries.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selected) url.searchParams.set('use', selected); else url.searchParams.delete('use');
    if (countryCode !== c.defaultCountry) url.searchParams.set('country', countryCode); else url.searchParams.delete('country');
    window.history.replaceState(null, '', url.toString());
  }, [selected, countryCode, c.defaultCountry]);

  const results = useMemo(() => (selected ? rankCars(selected, countryCode, 5) : []), [selected, countryCode]);
  const meta = selected ? c.useCases[selected] : null;

  const { popular, others } = useMemo(() => {
    const byCode = new Map(CAR_COUNTRIES.map((x) => [x.code, x]));
    const pop = c.priorityCountries.map((code) => byCode.get(code)).filter(Boolean) as CarCountry[];
    const rest = CAR_COUNTRIES.filter((x) => !c.priorityCountries.includes(x.code));
    const collator = new Intl.Collator(c.locale);
    const sorted = [...rest].sort((a, b) => collator.compare(countryName(a, c.locale), countryName(b, c.locale)));
    return { popular: pop, others: sorted };
  }, [c.priorityCountries, c.locale]);

  const option = (x: CarCountry) => (
    <option key={x.code} value={x.code}>{x.flag} {countryName(x, c.locale)} — {x.currency}</option>
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable — ignore */ }
  };

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Country selector */}
        <div>
          <div className="max-w-sm">
            <label htmlFor="best-car-country" className="text-xs font-bold text-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <Globe2 className="h-3 w-3" /> {ui.countryLabel}
            </label>
            <select
              id="best-car-country"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              suppressHydrationWarning
              className="w-full h-11 px-3 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all cursor-pointer"
            >
              <optgroup label={ui.popularCountries}>{popular.map(option)}</optgroup>
              <optgroup label={ui.otherCountries}>{others.map(option)}</optgroup>
            </select>
          </div>
          {AFRICA_CODES.includes(countryCode) && (
            <p className="text-[11px] text-muted-foreground mt-1.5 max-w-sm">{fill(ui.africaNote, vars)}</p>
          )}
        </div>

        {/* Use case selector */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-3">{ui.prompt}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {USE_CASE_TAGS.map((tag) => {
              const m = c.useCases[tag];
              const isActive = selected === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelected(isActive ? null : tag)}
                  className={`flex flex-col items-start gap-1 rounded-xl border px-3 py-3 text-start transition-all ${
                    isActive
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-foreground'
                      : 'bg-card border-border text-muted-foreground hover:border-emerald-500/30 hover:text-foreground'
                  }`}
                >
                  <span className="text-lg leading-none">{m.icon}</span>
                  <span className="text-xs font-bold leading-tight">{m.label}</span>
                  <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block">{m.priorities}</span>
                </button>
              );
            })}
          </div>
        </div>

        {meta && (
          <div className="flex items-start gap-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-4 py-3">
            <span className="text-xl leading-none mt-0.5">{meta.icon}</span>
            <div>
              <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{meta.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{meta.description}</p>
              <p className="text-[10px] text-muted-foreground/70 mt-1">{ui.rankedBy} {meta.priorities}</p>
            </div>
          </div>
        )}

        <div aria-live="polite">
          {results.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                  {fill(ui.topRecs, { n: String(results.length), country: label })}
                </p>
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground border border-border rounded-full px-3 py-1 transition-colors"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Link2 className="h-3 w-3" />}
                  {copied ? ui.linkCopied : ui.copyLink}
                </button>
              </div>
              {results.map(({ car, score }, i) => (
                <CarResultCard key={car.id} c={c} car={car} score={score} rank={i} country={country} text={carText?.[car.id]} countryLabel={label} />
              ))}
            </div>
          )}

          {!selected && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-3xl mb-3">🚗</p>
              <p className="text-sm text-muted-foreground">{ui.emptyState}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
