'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FileText, RotateCcw, ChevronRight, Info } from 'lucide-react';
import { NIGERIA_STATES as STATES, ALL_NIGERIA_STATES as ALL_STATES } from '@/lib/nigeria-vehicle-fees';

type VehicleType    = 'standard' | 'suv' | 'motorcycle' | 'tricycle' | 'commercial' | 'articulated';
type TransactionType = 'new_registration' | 'change_ownership' | 'licence_renewal' | 'roadworthiness' | 'drivers_licence';
type LicenceDuration = '3year' | '5year';
type PlateType      = 'standard' | 'fancy' | 'out_of_series';
interface LineItem   { label: string; amount: number; note?: string; confirmed: boolean; }

const FRSC_PLATE: Record<PlateType, number>          = { standard:30000, fancy:400000, out_of_series:150000 };
const FRSC_LICENCE_MOTOR: Record<LicenceDuration, number> = { '3year':15000, '5year':21000 };
const FRSC_LICENCE_MOTO:  Record<LicenceDuration, number> = { '3year':7000,  '5year':11000 };
const FRSC_MOTO_PLATE = 12000;

const TRANSACTION_OPTIONS: { key:TransactionType; label:string; icon:string }[] = [
  { key:'new_registration',  label:'New Registration',    icon:'🆕' },
  { key:'change_ownership',  label:'Change of Ownership', icon:'🔄' },
  { key:'licence_renewal',   label:'Licence Renewal',     icon:'♻️' },
  { key:'roadworthiness',    label:'Roadworthiness Only', icon:'🔍' },
  { key:'drivers_licence',   label:"Driver's Licence",    icon:'🪪' },
];

function fmt(n:number) { return '₦'+Math.round(n).toLocaleString('en-NG'); }
function fmtRange([lo,hi]:[number,number]) { return lo===hi ? fmt(lo) : `${fmt(lo)} – ${fmt(hi)}`; }

export default function RegistrationFeeClient() {
  const [state,setState]                       = useState('Lagos');
  const [transaction,setTransaction]           = useState<TransactionType>('new_registration');
  const [vehicleType,setVehicleType]           = useState<VehicleType>('standard');
  const [plateType,setPlateType]               = useState<PlateType>('standard');
  const [licenceDuration,setLicenceDuration]   = useState<LicenceDuration>('5year');
  const [includeInsurance,setIncludeInsurance] = useState(false);
  const [includeAgent,setIncludeAgent]         = useState(false);

  const stateData     = STATES[state];
  const isMotorcycle  = vehicleType==='motorcycle'||vehicleType==='tricycle';
  const isArticulated = vehicleType==='articulated';

  const calc: LineItem[] = useMemo(()=>{
    if(!stateData) return [];
    const items:LineItem[] = [];
    if(transaction==='drivers_licence'){
      const table = isMotorcycle ? FRSC_LICENCE_MOTO : FRSC_LICENCE_MOTOR;
      items.push({ label:`FRSC Driver's Licence (${licenceDuration==='3year'?'3-year':'5-year'})`, amount:table[licenceDuration], note:'National fee — same in all 36 states', confirmed:true });
      items.push({ label:'Bank/portal processing fee', amount:450, note:'Approximate; varies by channel', confirmed:false });
      return items;
    }
    if(transaction==='roadworthiness'){
      items.push({ label:'Roadworthiness certificate (state)', amount:(stateData.roadworthiness[0]+stateData.roadworthiness[1])/2, note:fmtRange(stateData.roadworthiness), confirmed:stateData.confidence==='high' });
      if(includeInsurance) items.push({ label:'Third-party insurance (minimum)', amount:15000, note:'National minimum; varies by insurer', confirmed:false });
      return items;
    }
    if(transaction==='licence_renewal'){
      items.push({ label:'Vehicle licence renewal (state)', amount:(stateData.licenceRenewal[0]+stateData.licenceRenewal[1])/2, note:fmtRange(stateData.licenceRenewal), confirmed:stateData.confidence==='high' });
      items.push({ label:'Roadworthiness certificate', amount:(stateData.roadworthiness[0]+stateData.roadworthiness[1])/2, note:fmtRange(stateData.roadworthiness), confirmed:stateData.confidence==='high' });
      if(includeInsurance) items.push({ label:'Third-party insurance', amount:15000, confirmed:false });
      if(includeAgent) items.push({ label:'Agent fee (unofficial)', amount:15000, note:'₦10,000–₦30,000 typical', confirmed:false });
      return items;
    }
    if(transaction==='change_ownership'){
      const plateFee = isArticulated?90000:isMotorcycle?FRSC_MOTO_PLATE:FRSC_PLATE.standard;
      items.push({ label:`FRSC number plate (${isArticulated?'articulated':isMotorcycle?'motorcycle':'standard'})`, amount:plateFee, note:'National fee — nvis.frsc.gov.ng', confirmed:true });
      items.push({ label:'Change of ownership fees (state)', amount:(stateData.changeOwnershipAddon[0]+stateData.changeOwnershipAddon[1])/2, note:fmtRange(stateData.changeOwnershipAddon), confirmed:stateData.confidence==='high' });
      items.push({ label:'Roadworthiness certificate', amount:(stateData.roadworthiness[0]+stateData.roadworthiness[1])/2, note:fmtRange(stateData.roadworthiness), confirmed:stateData.confidence==='high' });
      if(includeInsurance) items.push({ label:'Third-party insurance', amount:15000, confirmed:false });
      if(includeAgent) items.push({ label:'Agent fee (unofficial)', amount:15000, note:'₦10,000–₦30,000 typical', confirmed:false });
      return items;
    }
    // new_registration
    const plateFee = isArticulated?90000:isMotorcycle?FRSC_MOTO_PLATE:FRSC_PLATE[plateType];
    items.push({ label:`FRSC number plate (${plateType.replace('_','-')})`, amount:plateFee, note:'National fee — nvis.frsc.gov.ng', confirmed:true });
    items.push({ label:'State registration add-ons (MVAA/BIR)', amount:(stateData.newRegAddon[0]+stateData.newRegAddon[1])/2, note:fmtRange(stateData.newRegAddon), confirmed:stateData.confidence==='high' });
    items.push({ label:'Roadworthiness certificate', amount:(stateData.roadworthiness[0]+stateData.roadworthiness[1])/2, note:fmtRange(stateData.roadworthiness), confirmed:stateData.confidence==='high' });
    items.push({ label:'Vehicle licence (initial)', amount:(stateData.licenceRenewal[0]+stateData.licenceRenewal[1])/2, note:fmtRange(stateData.licenceRenewal), confirmed:stateData.confidence==='high' });
    items.push({ label:'CMR / police clearance', amount:8000, note:'₦5,000–₦12,000 typical nationwide', confirmed:false });
    if(includeInsurance) items.push({ label:'Third-party insurance', amount:15000, note:'National minimum; comprehensive is higher', confirmed:false });
    if(includeAgent) items.push({ label:'Agent fee (unofficial)', amount:20000, note:'₦10,000–₦30,000 typical', confirmed:false });
    return items;
  },[state,transaction,vehicleType,plateType,licenceDuration,includeInsurance,includeAgent,stateData,isMotorcycle,isArticulated]);

  const total = calc.reduce((s,i)=>s+i.amount,0);
  const reset = ()=>{ setState('Lagos');setTransaction('new_registration');setVehicleType('standard');setPlateType('standard');setLicenceDuration('5year');setIncludeInsurance(false);setIncludeAgent(false); };

  const sel = 'w-full h-11 px-3 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all cursor-pointer';
  const lbl = 'block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5';

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* ── Inputs: 2×2 on mobile ── */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-3 mb-3">

              {/* Transaction dropdown */}
              <div className="col-span-2 sm:col-span-1">
                <label className={lbl}>Transaction</label>
                <select value={transaction} onChange={e=>setTransaction(e.target.value as TransactionType)} className={sel}>
                  {TRANSACTION_OPTIONS.map(({key,label,icon})=>(
                    <option key={key} value={key}>{icon} {label}</option>
                  ))}
                </select>
              </div>

              {/* State dropdown */}
              <div className="col-span-2 sm:col-span-1">
                <label className={lbl}>State</label>
                <select value={state} onChange={e=>setState(e.target.value)} className={sel}>
                  {ALL_STATES.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
                <p className={`text-xs mt-1 ${stateData.confidence==='high'?'text-emerald-600 dark:text-emerald-400':stateData.confidence==='medium'?'text-amber-600 dark:text-amber-400':'text-muted-foreground'}`}>
                  {stateData.confidence==='high'?'✓ Official fee schedule':stateData.confidence==='medium'?'~ Portal data + reports':'~ National average estimate'}
                </p>
              </div>

              {/* Vehicle type */}
              {transaction!=='drivers_licence' && (
                <div className="col-span-2 sm:col-span-1">
                  <label className={lbl}>Vehicle Type</label>
                  <select value={vehicleType} onChange={e=>setVehicleType(e.target.value as VehicleType)} className={sel}>
                    <option value="standard">Car / Saloon / Sedan</option>
                    <option value="suv">SUV / Jeep</option>
                    <option value="commercial">Commercial / Bus</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="tricycle">Tricycle (Keke)</option>
                    <option value="articulated">Articulated / Truck</option>
                  </select>
                </div>
              )}

              {/* Plate type */}
              {transaction==='new_registration' && !isMotorcycle && !isArticulated && (
                <div className="col-span-2 sm:col-span-1">
                  <label className={lbl}>Plate Type</label>
                  <select value={plateType} onChange={e=>setPlateType(e.target.value as PlateType)} className={sel}>
                    <option value="standard">Standard (₦30,000)</option>
                    <option value="fancy">Fancy (₦400,000)</option>
                    <option value="out_of_series">Out-of-Series (₦150,000)</option>
                  </select>
                </div>
              )}

              {/* Licence duration */}
              {transaction==='drivers_licence' && (
                <div className="col-span-2 sm:col-span-1">
                  <label className={lbl}>Validity</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['3year','5year'] as const).map(d=>(
                      <button key={d} onClick={()=>setLicenceDuration(d)}
                        className={`h-11 rounded-xl text-sm font-bold border transition-all ${licenceDuration===d?'bg-blue-500 border-blue-500 text-white':'bg-card border-border text-muted-foreground hover:border-blue-500/50'}`}>
                        {d==='3year'?'3 Years':'5 Years'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Optional extras — side by side cards */}
            {transaction!=='drivers_licence' && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                <label className="flex items-start gap-2 cursor-pointer bg-card border border-border rounded-xl px-3 py-2.5">
                  <input type="checkbox" checked={includeInsurance} onChange={e=>setIncludeInsurance(e.target.checked)} className="accent-blue-500 w-4 h-4 mt-0.5 shrink-0" />
                  <span className="text-xs text-foreground leading-snug">Add insurance (~₦15,000)</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer bg-card border border-border rounded-xl px-3 py-2.5">
                  <input type="checkbox" checked={includeAgent} onChange={e=>setIncludeAgent(e.target.checked)} className="accent-blue-500 w-4 h-4 mt-0.5 shrink-0" />
                  <span className="text-xs text-foreground leading-snug">Add agent fee (~₦18,000)</span>
                </label>
              </div>
            )}

            <button onClick={reset} className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-3 space-y-3">

            <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/25">
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">
                {TRANSACTION_OPTIONS.find(t=>t.key===transaction)?.icon}{' '}
                {TRANSACTION_OPTIONS.find(t=>t.key===transaction)?.label} · {state}
              </p>
              <p className="text-4xl font-black text-blue-600 dark:text-blue-400 leading-none" style={{fontFamily:"'Barlow Condensed',Impact,sans-serif"}}>
                {fmt(total)}
              </p>
              <p className="text-xs text-blue-700/60 dark:text-blue-400/60 mt-1.5">
                {stateData.confidence==='high'?'Based on official MVAA schedule':stateData.confidence==='medium'?'Based on portal data + user reports':'Based on national average — verify locally'}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border bg-muted/30">
                <p className="text-xs font-bold text-foreground uppercase tracking-wide">Itemised Breakdown</p>
              </div>
              <div className="divide-y divide-border">
                {calc.map((item,i)=>(
                  <div key={i} className="px-4 py-3 flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        {item.confirmed
                          ?<span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold shrink-0">OFFICIAL</span>
                          :<span className="text-[10px] text-muted-foreground font-medium shrink-0">EST.</span>}
                      </div>
                      {item.note&&<p className="text-xs text-muted-foreground mt-0.5">{item.note}</p>}
                    </div>
                    <p className="text-sm font-bold text-foreground shrink-0">{fmt(item.amount)}</p>
                  </div>
                ))}
                <div className="px-4 py-3 bg-blue-500/5 flex items-center justify-between">
                  <p className="text-sm font-black text-foreground uppercase tracking-wide">Total Estimate</p>
                  <p className="text-lg font-black text-blue-600 dark:text-blue-400" style={{fontFamily:"'Barlow Condensed',Impact,sans-serif"}}>{fmt(total)}</p>
                </div>
              </div>
            </div>

            {stateData.note&&(
              <div className="flex gap-2.5 p-3 rounded-xl bg-muted/50 border border-border">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0"/>
                <p className="text-xs text-muted-foreground leading-relaxed">{stateData.note}</p>
              </div>
            )}
            {stateData.portal&&(
              <div className="flex gap-2.5 p-3 rounded-xl bg-blue-500/5 border border-blue-500/15">
                <FileText className="h-4 w-4 text-blue-500 mt-0.5 shrink-0"/>
                <p className="text-xs text-muted-foreground">Official {state} portal: <strong className="text-foreground">{stateData.portal}</strong></p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Link href="/tools/import-duty-calculator" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all">
                <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Import duty calculator</p>
                <ChevronRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-500"/>
              </Link>
              <Link href="/tools/vehicle-papers-checklist" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all">
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Papers checklist</p>
                <ChevronRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}