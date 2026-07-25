'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle2, XCircle, Info, ShipWheel, Home, Copy, Check } from 'lucide-react';

const AGE_LIMIT = 12;
const GAUGE_MAX = 24; // visual scale ceiling for the gauge (2x the limit)

type Mode = 'import' | 'own';

const PRESETS = [3, 8, 12, 15, 20];

export default function ImportAgeLimitNigeriaClient() {
  const currentYear = new Date().getFullYear();
  const [mode, setMode] = useState<Mode>('import');
  const [year, setYear] = useState(currentYear - AGE_LIMIT);
  const [copied, setCopied] = useState(false);

  const age = currentYear - year;
  const qualifies = age <= AGE_LIMIT;
  const cutoffYear = currentYear - AGE_LIMIT; // oldest importable manufacture year right now
  const lastEligibleYear = year + AGE_LIMIT;   // last calendar year this manufacture year stays importable
  const yearsRemaining = lastEligibleYear - currentYear;
  const yearsOverdue = age - AGE_LIMIT;

  const gaugePct = Math.min(100, Math.max(0, (age / GAUGE_MAX) * 100));
  const cutoffPct = (AGE_LIMIT / GAUGE_MAX) * 100;

  const resultText = useMemo(() => {
    if (mode === 'own') {
      return `${year} vehicle (${age} yrs old) — already in Nigeria: no import age limit applies, it can be owned/driven/resold regardless of age. Checked on naira.autos/tools/import-age-limit/nigeria`;
    }
    return qualifies
      ? `${year} vehicle (${age} yrs old) — IMPORTABLE into Nigeria. Stays eligible until ${lastEligibleYear} (${yearsRemaining} yr${yearsRemaining === 1 ? '' : 's'} left). Checked on naira.autos/tools/import-age-limit/nigeria`
      : `${year} vehicle (${age} yrs old) — BANNED from import into Nigeria. ${yearsOverdue} yr${yearsOverdue === 1 ? '' : 's'} past the 12-year cutoff — will be seized at port. Checked on naira.autos/tools/import-age-limit/nigeria`;
  }, [mode, year, age, qualifies, lastEligibleYear, yearsRemaining, yearsOverdue]);

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  const btnMode = (m: Mode, label: string, Icon: React.ElementType) => (
    <button
      onClick={() => setMode(m)}
      className={`flex-1 flex items-center justify-center gap-2 h-11 px-3 rounded-xl text-sm font-semibold border transition-all ${
        mode === m
          ? 'bg-emerald-600 border-emerald-600 text-white'
          : 'bg-background border-border text-muted-foreground hover:border-foreground/20'
      }`}
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  );

  return (
    <div className="bg-background border-y border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">What are you checking?</label>
              <div className="flex gap-2">
                {btnMode('import', 'Importing a car', ShipWheel)}
                {btnMode('own', 'Already in Nigeria', Home)}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide">
                  Manufacture year (VIN plate)
                </label>
                <span className="text-sm font-black text-foreground">{year}</span>
              </div>
              <input
                type="range"
                min={1985}
                max={currentYear}
                step={1}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                <span>1985</span>
                <span>{currentYear}</span>
              </div>

              {/* Age gauge */}
              <div className="relative mt-4 h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 transition-all ${qualifies ? 'bg-emerald-500' : 'bg-red-500'}`}
                  style={{ width: `${gaugePct}%` }}
                />
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-foreground/60"
                  style={{ left: `${cutoffPct}%` }}
                  title="12-year cutoff"
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>0 yrs</span>
                <span className="font-semibold">12-yr cutoff</span>
                <span>{GAUGE_MAX}+ yrs</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setYear(currentYear - p)}
                    className="px-2.5 py-1 rounded-lg border border-border text-[11px] font-semibold text-muted-foreground hover:border-emerald-500/40 hover:text-foreground transition-all"
                  >
                    {p} yrs old
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                Use the year stamped on the VIN plate, not the &quot;model year&quot; a dealer advertises — Customs goes by the manufacture date.
              </p>
            </div>
          </div>

          {/* ── Verdict ── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-card border border-border overflow-hidden">
              <div className="px-5 py-3 bg-muted/40 border-b border-border flex items-center justify-between gap-2">
                <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                  {year} model — {age} year{age === 1 ? '' : 's'} old
                </span>
                <button
                  onClick={copyResult}
                  className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  {copied ? 'Copied' : 'Copy result'}
                </button>
              </div>

              {mode === 'import' ? (
                <div className="px-5 py-5">
                  <div className={`flex items-start gap-3 p-4 rounded-xl border ${
                    qualifies
                      ? 'border-emerald-500/40 bg-emerald-500/5'
                      : 'border-red-500/40 bg-red-500/5'
                  }`}>
                    {qualifies
                      ? <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      : <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />}
                    <div>
                      <p className={`font-bold ${qualifies ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                        {qualifies ? 'Importable' : 'Banned from import'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {qualifies
                          ? `A ${year} vehicle is within Nigeria's 12-year import limit (must be ${cutoffYear} or newer in ${currentYear}).`
                          : `A ${year} vehicle is ${yearsOverdue} year${yearsOverdue === 1 ? '' : 's'} past Nigeria's 12-year import limit. Nigeria Customs will classify it as a prohibited import — it will be seized at the port and is not released even if duty is offered.`}
                      </p>
                      <p className="text-xs font-semibold mt-2 text-foreground">
                        {qualifies
                          ? yearsRemaining > 0
                            ? `Stays importable through ${lastEligibleYear} — ${yearsRemaining} year${yearsRemaining === 1 ? '' : 's'} left before it ages out.`
                            : `This is the last year this model qualifies — it ages out of the 12-year window after ${currentYear}.`
                          : `It became ineligible in ${lastEligibleYear + 1}.`}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
                    This is the rule for a fresh import cleared through an official seaport (Apapa, Tin Can). It does not apply to a car already registered and circulating inside Nigeria — see the &quot;Already in Nigeria&quot; tab.
                  </p>
                </div>
              ) : (
                <div className="px-5 py-5">
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/5">
                    <Info className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-emerald-600 dark:text-emerald-400">No age limit applies</p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        The 12-year rule only blocks new imports at the point of entry — it doesn&apos;t reach back and ban a car that&apos;s already registered in Nigeria, however old it is. You can legally own, drive, and resell a {year} vehicle regardless of its age.
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
                    One thing worth confirming: that the car was properly customs-cleared when it first entered the country. A car with valid proof of ownership and duty payment documents causes no problems at resale or renewal — one brought in informally through a land border can, even though its age alone isn&apos;t the issue.
                  </p>
                </div>
              )}

              <div className="px-5 py-4 border-t border-border flex flex-wrap items-center gap-3">
                <Link href="/tools/import-duty-calculator" className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground">
                  Estimate customs duty for this vehicle <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
