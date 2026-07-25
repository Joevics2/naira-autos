'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ExternalLink, ChevronRight, ChevronDown, CheckCircle2, Circle, MapPin, AlertCircle, CalendarClock } from 'lucide-react';
import { NIGERIA_STATES, ALL_NIGERIA_STATES, fmtNaira } from '@/lib/nigeria-vehicle-fees';

type VehicleType = 'saloon' | 'suv' | 'commercial';

const VEHICLE_MULTIPLIER: Record<VehicleType, number> = { saloon: 1, suv: 1.15, commercial: 1.6 };
const VEHICLE_LABEL: Record<VehicleType, string> = { saloon: 'Saloon Car', suv: 'SUV / Jeep', commercial: 'Commercial' };

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

function fmtDate(d: Date) {
  return d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function VehicleLicenseNigeriaClient() {
  const [state, setState] = useState('Lagos');
  const [vehicleType, setVehicleType] = useState<VehicleType>('saloon');
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [expiryDate, setExpiryDate] = useState('');
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [showSteps, setShowSteps] = useState(false);

  const data = useMemo(() => NIGERIA_STATES[state], [state]);
  const mult = VEHICLE_MULTIPLIER[vehicleType];

  const breakdown = useMemo(() => {
    const licenseAvg = ((data.licenceRenewal[0] + data.licenceRenewal[1]) / 2) * mult;
    const roadworthyAvg = ((data.roadworthiness[0] + data.roadworthiness[1]) / 2) * mult;
    const insuranceAvg = includeInsurance ? 10000 : 0;
    const items = [
      { label: `Vehicle license (${VEHICLE_LABEL[vehicleType]})`, amount: licenseAvg },
      { label: 'Roadworthiness certificate', amount: roadworthyAvg },
      ...(includeInsurance ? [{ label: 'Third-party insurance (minimum)', amount: insuranceAvg }] : []),
    ];
    const total = items.reduce((s, i) => s + i.amount, 0);
    return { items, total };
  }, [data, mult, includeInsurance, vehicleType]);

  const expiryStatus = useMemo(() => {
    if (!expiryDate) return null;
    const exp = new Date(expiryDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const days = Math.round((exp.getTime() - now.getTime()) / 86400000);
    if (days < 0) {
      const finePerDoc = [5000, 15000];
      return { days, label: `Expired ${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'} ago`, tone: 'red' as const, fineLow: finePerDoc[0] * 2, fineHigh: finePerDoc[1] * 2 };
    }
    if (days <= 30) return { days, label: `Due in ${days} day${days === 1 ? '' : 's'} — renew now`, tone: 'amber' as const };
    return { days, label: `Due in ${days} days — ${fmtDate(exp)}`, tone: 'green' as const };
  }, [expiryDate]);

  const toggle = (doc: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(doc) ? next.delete(doc) : next.add(doc);
      return next;
    });
  };

  const sel = 'w-full h-11 px-3 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all cursor-pointer';
  const lbl = 'block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5';

  return (
    <div className="bg-background border-y border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>State</label>
                <select value={state} onChange={(e) => setState(e.target.value)} className={sel}>
                  {ALL_NIGERIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Vehicle Type</label>
                <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value as VehicleType)} className={sel}>
                  {(Object.keys(VEHICLE_LABEL) as VehicleType[]).map(v => <option key={v} value={v}>{VEHICLE_LABEL[v]}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className={lbl}>Current license expiry date (optional)</label>
              <div className="relative">
                <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className={`${sel} pl-9`}
                />
              </div>
            </div>

            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-border bg-card cursor-pointer">
              <input
                type="checkbox"
                checked={includeInsurance}
                onChange={(e) => setIncludeInsurance(e.target.checked)}
                className="h-4 w-4 rounded accent-emerald-600"
              />
              <span className="text-sm text-foreground">Include third-party insurance in total</span>
            </label>

            {expiryStatus && (
              <div className={`flex items-start gap-2.5 p-3 rounded-xl border text-sm ${
                expiryStatus.tone === 'red'   ? 'border-red-500/40 bg-red-500/5 text-red-700 dark:text-red-400' :
                expiryStatus.tone === 'amber' ? 'border-amber-500/40 bg-amber-500/5 text-amber-700 dark:text-amber-400' :
                                                 'border-emerald-500/40 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400'
              }`}>
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{expiryStatus.label}</p>
                  {expiryStatus.tone === 'red' && (
                    <p className="text-xs mt-0.5 opacity-80">Estimated fine exposure: {fmtNaira(expiryStatus.fineLow!)}–{fmtNaira(expiryStatus.fineHigh!)} across license + roadworthiness. Renew as soon as possible.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Live cost breakdown ── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-card border border-border overflow-hidden">
              <div className="px-5 py-3 bg-muted/40 border-b border-border flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">{state} — {data.zone} — {VEHICLE_LABEL[vehicleType]}</span>
              </div>

              <div className="divide-y divide-border">
                {breakdown.items.map(item => (
                  <div key={item.label} className="flex items-center justify-between px-5 py-3">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <span className="text-sm font-bold text-foreground">{fmtNaira(item.amount)}</span>
                  </div>
                ))}
              </div>

              <div className="px-5 py-4 bg-emerald-500/5 border-t border-emerald-500/20 flex items-center justify-between">
                <span className="text-sm font-bold text-foreground uppercase tracking-wide">Estimated Total</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{fmtNaira(breakdown.total)}</span>
              </div>

              {data.confidence !== 'high' && (
                <p className="px-5 py-2 text-[11px] text-amber-600 dark:text-amber-400 bg-amber-500/5 border-t border-amber-500/20">Estimated for {state} — confirm exact figure on your state portal.</p>
              )}

              <div className="px-5 py-4 border-t border-border flex flex-wrap items-center gap-3">
                {data.portal ? (
                  <a
                    href={`https://${data.portal}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
                  >
                    {data.onlineRenewal ? 'Renew Online' : 'Visit Official Portal'} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <p className="text-xs text-muted-foreground">No confirmed online portal for {state} — visit your state MVAA/VIO office.</p>
                )}
                <Link href="/tools/registration-fee-calculator" className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground ml-auto">
                  Full breakdown incl. new registration <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {data.note && <p className="px-5 pb-4 text-[11px] text-muted-foreground leading-relaxed">{data.note}</p>}
            </div>
          </div>
        </div>

        {/* ── Checklist ── */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Documents Checklist</h3>
            <span className="text-xs text-muted-foreground">{checked.size}/{REQUIRED_DOCS.length} ready</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {REQUIRED_DOCS.map(doc => {
              const done = checked.has(doc);
              return (
                <button
                  key={doc}
                  onClick={() => toggle(doc)}
                  className={`flex items-start gap-2.5 text-left p-3 rounded-xl border text-sm transition-all ${
                    done ? 'border-emerald-500/40 bg-emerald-500/5 text-foreground' : 'border-border bg-card text-muted-foreground hover:border-foreground/20'
                  }`}
                >
                  {done ? <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" /> : <Circle className="h-4 w-4 text-muted-foreground/40 flex-shrink-0 mt-0.5" />}
                  <span className={done ? 'line-through decoration-emerald-500/50' : ''}>{doc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Steps (collapsible) ── */}
        <div className="mt-4">
          <button
            onClick={() => setShowSteps(s => !s)}
            className="flex items-center justify-between w-full text-left px-4 py-3 rounded-xl bg-card border border-border"
          >
            <span className="text-sm font-bold text-foreground uppercase tracking-wide">Renewal Process — 6 Steps</span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${showSteps ? 'rotate-180' : ''}`} />
          </button>
          {showSteps && (
            <div className="space-y-2 mt-2">
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
          )}
        </div>
      </div>
    </div>
  );
}
