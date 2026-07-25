'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ExternalLink, ChevronRight, CheckCircle2, Circle, RotateCcw, MapPin } from 'lucide-react';
import { NIGERIA_STATES, ALL_NIGERIA_STATES, fmtNairaRange } from '@/lib/nigeria-vehicle-fees';

const REQUIRED_DOCS = [
  'Expiring/current vehicle license',
  'Valid vehicle insurance (third-party or comprehensive)',
  'Roadworthiness certificate (or proof of upcoming inspection)',
  'Proof of ownership (registration certificate / purchase receipt)',
  "Valid ID — NIN, voter's card, or international passport",
  'Plate number and VIN/chassis number',
  'Proof of payment for any outstanding fines',
];

const STEPS = [
  { title: 'Verify your vehicle details', body: 'Check your plate number and current document status on the FRSC NVIS portal (nvis.frsc.gov.ng) before starting.' },
  { title: 'Renew or confirm your insurance', body: 'Get valid third-party or comprehensive insurance if you don\u2019t already have it — most states won\u2019t process renewal without it.' },
  { title: 'Clear any outstanding fines', body: 'Unpaid fines block renewal in most states. Check and settle these first.' },
  { title: 'Get your roadworthiness certificate', body: 'Visit a VIO/VIS inspection center. They check brakes, lights, and emissions before issuing the certificate — often renewed together with your license.' },
  { title: 'Submit documents & pay', body: 'Online where available (see your state\u2019s portal below) or in person at your state MVAA/VIO office.' },
  { title: 'Collect your renewed sticker', body: 'Same-day in fast-processing states, or 48 hours–7 days elsewhere. Double-check your plate/VIN match before leaving.' },
];

export default function VehicleLicenseNigeriaClient() {
  const [state, setState] = useState('Lagos');
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const data = useMemo(() => NIGERIA_STATES[state], [state]);
  const totalDone = checked.size;

  const toggle = (doc: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(doc) ? next.delete(doc) : next.add(doc);
      return next;
    });
  };

  const reset = () => setChecked(new Set());

  return (
    <div className="bg-background border-y border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── State picker + summary ── */}
          <div className="lg:col-span-1 space-y-4">
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Your State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full h-11 px-3 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all cursor-pointer"
              >
                {ALL_NIGERIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {state} — {data.zone}
              </div>

              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Typical renewal cost</p>
                <p className="text-lg font-black text-foreground">
                  {fmtNairaRange(data.licenceRenewal)} <span className="text-xs font-normal text-muted-foreground">license</span>
                </p>
                <p className="text-sm text-muted-foreground">+ {fmtNairaRange(data.roadworthiness)} roadworthiness</p>
                {data.confidence !== 'high' && (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1">Estimated — confirm on your state portal.</p>
                )}
              </div>

              <Link
                href="/tools/registration-fee-calculator"
                className="flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline pt-1"
              >
                Get an exact breakdown <ChevronRight className="h-3.5 w-3.5" />
              </Link>

              {data.portal ? (
                <a
                  href={`https://${data.portal}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
                >
                  {data.onlineRenewal ? 'Renew Online' : 'Visit Official Portal'} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                  No confirmed online portal for {state} — visit your state MVAA/VIO office in person.
                </p>
              )}

              {data.note && <p className="text-[11px] text-muted-foreground leading-relaxed border-t border-border pt-2">{data.note}</p>}
            </div>
          </div>

          {/* ── Checklist + steps ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Checklist */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Documents Checklist</h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{totalDone}/{REQUIRED_DOCS.length} ready</span>
                  {totalDone > 0 && (
                    <button onClick={reset} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                      <RotateCcw className="h-3 w-3" /> Reset
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {REQUIRED_DOCS.map(doc => {
                  const done = checked.has(doc);
                  return (
                    <button
                      key={doc}
                      onClick={() => toggle(doc)}
                      className={`flex items-start gap-2.5 text-left p-3 rounded-xl border text-sm transition-all ${
                        done
                          ? 'border-emerald-500/40 bg-emerald-500/5 text-foreground'
                          : 'border-border bg-card text-muted-foreground hover:border-foreground/20'
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={done ? 'line-through decoration-emerald-500/50' : ''}>{doc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Steps */}
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">Renewal Process — 6 Steps</h3>
              <div className="space-y-2">
                {STEPS.map((step, i) => (
                  <div key={step.title} className="flex gap-3 p-3 rounded-xl bg-card border border-border">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{step.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
