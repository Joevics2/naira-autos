'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle2, XCircle, Info, ShipWheel, Home } from 'lucide-react';

const AGE_LIMIT = 12;

type Mode = 'import' | 'own';

export default function ImportAgeLimitNigeriaClient() {
  const currentYear = new Date().getFullYear();
  const [mode, setMode] = useState<Mode>('import');
  const [year, setYear] = useState(currentYear - AGE_LIMIT);

  const years = useMemo(() => {
    const arr: number[] = [];
    for (let y = currentYear; y >= 1985; y--) arr.push(y);
    return arr;
  }, [currentYear]);

  const age = currentYear - year;
  const qualifies = age <= AGE_LIMIT;
  const cutoffYear = currentYear - AGE_LIMIT;

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
          <div className="lg:col-span-2 space-y-3">
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">What are you checking?</label>
              <div className="flex gap-2">
                {btnMode('import', 'Importing a car', ShipWheel)}
                {btnMode('own', 'Already in Nigeria', Home)}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">
                Manufacture year (from VIN plate)
              </label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full h-11 px-3 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all cursor-pointer"
              >
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                Use the year stamped on the VIN plate, not the &quot;model year&quot; a dealer advertises — Customs goes by the manufacture date.
              </p>
            </div>
          </div>

          {/* ── Verdict ── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-card border border-border overflow-hidden">
              <div className="px-5 py-3 bg-muted/40 border-b border-border flex items-center gap-2">
                <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                  {year} model — {age} year{age === 1 ? '' : 's'} old
                </span>
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
                          : `A ${year} vehicle is ${age - AGE_LIMIT} year${age - AGE_LIMIT === 1 ? '' : 's'} past Nigeria's 12-year import limit. Nigeria Customs will classify it as a prohibited import — it will be seized at the port and is not released even if duty is offered.`}
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
