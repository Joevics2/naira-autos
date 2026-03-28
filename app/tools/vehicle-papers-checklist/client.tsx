'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, ChevronRight, Printer, AlertTriangle, Info, ChevronDown } from 'lucide-react';

type ScenarioKey  = 'buy_tokunbo' | 'buy_nigerian_used' | 'buy_new' | 'sell' | 'import' | 'change_ownership';
type CategoryKey  = 'mandatory' | 'strongly_recommended' | 'optional';

interface ChecklistItem {
  id: string; document: string; description: string;
  issuedBy: string; category: CategoryKey; tip?: string;
}
interface Scenario { label:string; icon:string; intro:string; items:ChecklistItem[]; }

const SCENARIOS: Record<ScenarioKey, Scenario> = {
  buy_tokunbo: {
    label:'Buy — Tokunbo (Imported)', icon:'🚢',
    intro:'When buying a Tokunbo (foreign-used) car in Nigeria, verify these documents before you hand over any money. The Proof of Ownership / Customs paper is the most critical — without it you cannot legally transfer the car to your name.',
    items:[
      { id:'bt-01', document:'Proof of Ownership (Customs Paper)', description:'Original document from Nigeria Customs Service confirming the car was legally imported and all duties fully paid.', issuedBy:'Nigeria Customs Service (NCS)', category:'mandatory', tip:'This is the single most important document. A seller who cannot produce it may not have cleared the car properly. Verify via the NCS portal or a FRSC office.' },
      { id:'bt-02', document:'Vehicle Registration Certificate', description:'Current registration showing plate number, owner name, engine number, and chassis number.', issuedBy:'FRSC / State MVAA', category:'mandatory', tip:'Confirm the chassis and engine numbers on the certificate match the physical car. Fraudsters sometimes swap papers between vehicles.' },
      { id:'bt-03', document:'Roadworthiness Certificate', description:'Annual certificate from state MVAA/VIO confirming the vehicle is mechanically fit for Nigerian roads.', issuedBy:'State MVAA / VIO', category:'mandatory', tip:'Check the expiry date. An expired certificate means the seller was driving illegally and the car has not been recently inspected.' },
      { id:'bt-04', document:'Insurance Certificate', description:'Valid third-party motor insurance at minimum. Comprehensive cover is preferable.', issuedBy:'NAICOM-licensed insurer', category:'mandatory', tip:'Minimum third-party is required by law. Verify via the insurer or NAICOM portal.' },
      { id:'bt-05', document:'Number Plates (front and rear)', description:'Physical plates matching the registration documents.', issuedBy:'FRSC', category:'mandatory', tip:'Both plates must be present and undamaged. Mismatched or missing plates are an immediate red flag.' },
      { id:'bt-06', document:'Purchase Agreement / Receipt', description:'Signed sales agreement documenting price, car details, seller ID, and date.', issuedBy:'Seller or dealer', category:'mandatory', tip:'Always demand a written receipt even from private sellers. Photograph the seller\'s ID to attach to the agreement.' },
      { id:'bt-07', document:'Seller\'s Valid ID / Driver\'s Licence', description:'Government-issued ID matching the name on registration documents.', issuedBy:'FRSC / NIMC / Passport Authority', category:'mandatory', tip:'The seller\'s ID name must match the registration certificate. If it doesn\'t, you are not buying from the registered owner.' },
      { id:'bt-08', document:'CMR (Central Motor Registry) Check', description:'National vehicle database confirmation that the car is not stolen.', issuedBy:'FRSC (CMR)', category:'strongly_recommended', tip:'Increasingly required at registration offices. Obtain a CMR printout at any FRSC service centre before paying.' },
      { id:'bt-09', document:'Pre-Purchase Mechanic Inspection', description:'Independent mechanic assessment of condition, identifying faults, accident history, or flood damage.', issuedBy:'Independent certified mechanic', category:'strongly_recommended', tip:'₦5,000–₦20,000 for a pre-purchase inspection can save millions. Especially important for flood-risk cars from US imports.' },
      { id:'bt-10', document:'VIN / Chassis Verification', description:'Verification that the VIN matches manufacturer records and is not cloned.', issuedBy:'NHTSA (online) or FRSC', category:'optional', tip:'Use the free NHTSA decoder at vpic.nhtsa.dot.gov or our VIN Decoder tool. Takes 30 seconds and can identify a cloned vehicle.' },
    ],
  },
  buy_nigerian_used: {
    label:'Buy — Nigerian Used (Locally Used)', icon:'🚗',
    intro:'Buying a locally used Nigerian car is simpler than a Tokunbo, but ownership legitimacy and outstanding issues must still be verified before any money changes hands.',
    items:[
      { id:'bn-01', document:'Vehicle Registration Certificate', description:'Current registration with plate number, owner name, engine and chassis numbers.', issuedBy:'FRSC / State MVAA', category:'mandatory', tip:'Confirm engine and chassis numbers physically match the car. Cloned registrations are not uncommon.' },
      { id:'bn-02', document:'Proof of Ownership', description:'Evidence of legal ownership — Customs paper if Tokunbo origin, manufacturer certificate, or previous purchase agreement chain.', issuedBy:'NCS / Manufacturer / Previous owner', category:'mandatory', tip:'Even locally used cars are often Tokunbo at their origin. Ask for the original Customs paper if the car was imported.' },
      { id:'bn-03', document:'Roadworthiness Certificate', description:'Valid annual state MVAA certificate confirming road fitness.', issuedBy:'State MVAA / VIO', category:'mandatory' },
      { id:'bn-04', document:'Insurance Certificate', description:'Valid third-party or comprehensive motor insurance.', issuedBy:'NAICOM-licensed insurer', category:'mandatory' },
      { id:'bn-05', document:'Number Plates (front and rear)', description:'Both plates matching the registration documents.', issuedBy:'FRSC', category:'mandatory' },
      { id:'bn-06', document:'Seller\'s Valid Government ID', description:'Government ID matching the name on registration documents.', issuedBy:'FRSC / NIMC', category:'mandatory' },
      { id:'bn-07', document:'Purchase Agreement / Receipt', description:'Signed document recording the sale, price, car details, and both parties.', issuedBy:'Seller', category:'mandatory' },
      { id:'bn-08', document:'CMR (Central Motor Registry) Check', description:'Database confirmation the car is not stolen or encumbered.', issuedBy:'FRSC', category:'strongly_recommended', tip:'Stolen car incidents are increasing. A ₦1,000 CMR check can prevent a total loss.' },
      { id:'bn-09', document:'Mechanic Pre-Purchase Inspection', description:'Independent assessment of mechanical and bodywork condition.', issuedBy:'Independent mechanic', category:'strongly_recommended' },
    ],
  },
  buy_new: {
    label:'Buy — Brand New (Dealer)', icon:'✨',
    intro:'When buying a new car from a Nigerian dealer, most documents are handled by the dealer. Verify which are included in the purchase price and which you need to obtain separately.',
    items:[
      { id:'bnd-01', document:"Manufacturer's Certificate of Origin", description:'Factory-issued certificate confirming the vehicle is new and identifying the manufacturer.', issuedBy:'Manufacturer / Authorised dealer', category:'mandatory', tip:'Ensure you receive the original physical document, not a photocopy.' },
      { id:'bnd-02', document:'Customs Duty Clearance Certificate', description:'For imported vehicles, confirmation that all import duties have been paid.', issuedBy:'Nigeria Customs Service', category:'mandatory', tip:'Ask the dealer explicitly for this. Some dealers delay handing it over after full payment.' },
      { id:'bnd-03', document:'New Vehicle Registration Certificate', description:'Registration of the car in your name at the state MVAA.', issuedBy:'State MVAA / FRSC', category:'mandatory', tip:'Confirm whether registration is included in the purchase price or charged separately.' },
      { id:'bnd-04', document:'New Number Plates', description:'FRSC plates issued in your name at the time of registration.', issuedBy:'FRSC', category:'mandatory' },
      { id:'bnd-05', document:'Insurance Certificate', description:'Third-party or comprehensive insurance before the car leaves the dealer lot.', issuedBy:'NAICOM-licensed insurer', category:'mandatory', tip:'Arrange before collection — driving off the lot without insurance is illegal.' },
      { id:'bnd-06', document:'Roadworthiness Certificate', description:'State MVAA vehicle inspection certificate.', issuedBy:'State MVAA / VIO', category:'mandatory' },
      { id:'bnd-07', document:'Dealer Sales Agreement / Invoice', description:'Itemised agreement covering price, extras, and any included registration or insurance.', issuedBy:'Authorised dealer', category:'mandatory', tip:'Read all line items. Some dealers add unofficial registration fees on top of the ₦30,000 FRSC plate cost.' },
      { id:'bnd-08', document:'Warranty Documentation', description:'Manufacturer warranty booklet, service schedule, and activation confirmation.', issuedBy:'Manufacturer / Dealer', category:'strongly_recommended', tip:'Ensure warranty is registered in your name and confirm authorised service centres in your state.' },
    ],
  },
  sell: {
    label:'Sell Your Car', icon:'🤝',
    intro:'As a seller, having all documents ready before listing speeds up the transaction, builds buyer confidence, and protects you legally if disputes arise after the sale.',
    items:[
      { id:'s-01', document:'Original Vehicle Registration Certificate', description:'Current registration in your name, to be transferred to the buyer.', issuedBy:'FRSC / State MVAA', category:'mandatory' },
      { id:'s-02', document:'Proof of Ownership (Customs Paper)', description:'Original NCS clearance or manufacturer certificate.', issuedBy:'Nigeria Customs Service / Manufacturer', category:'mandatory', tip:'Without this, the buyer cannot register the car in their name. Its absence will significantly reduce offers or kill the deal.' },
      { id:'s-03', document:'Valid Number Plates', description:'Both plates present. Plates transfer with the vehicle at sale.', issuedBy:'FRSC', category:'mandatory' },
      { id:'s-04', document:'Your Valid Driver\'s Licence / Government ID', description:'Proof of your identity for signing purchase agreement and COO forms.', issuedBy:'FRSC / NIMC', category:'mandatory' },
      { id:'s-05', document:'Roadworthiness Certificate', description:'Some buyers and states require a current cert at point of sale.', issuedBy:'State MVAA / VIO', category:'strongly_recommended', tip:'A valid cert signals the car has been recently inspected and builds buyer confidence.' },
      { id:'s-06', document:'Insurance Certificate', description:'Valid insurance certificate typically stays with the car until expiry.', issuedBy:'NAICOM-licensed insurer', category:'strongly_recommended' },
      { id:'s-07', document:'Sales Receipt / Purchase Agreement', description:'Written agreement documenting agreed price, both parties, and transfer of ownership.', issuedBy:'Seller (you)', category:'mandatory', tip:'Keep a signed copy for yourself. This is your proof you no longer own the car if issues arise post-sale.' },
      { id:'s-08', document:'Service History / Maintenance Records', description:'Records of oil changes, repairs, and scheduled maintenance.', issuedBy:'Service centres / Mechanic', category:'optional', tip:'A documented service history can add ₦50,000–₦200,000 to the resale price.' },
    ],
  },
  import: {
    label:'Import a Tokunbo Car', icon:'⚓',
    intro:'Importing a Tokunbo car through Apapa or Tin Can Island port requires a specific sequence of documents. Most must be in place BEFORE the car ships — not after it arrives.',
    items:[
      { id:'i-01', document:'Form M (CBN Pre-Import Approval)', description:'CBN approval for the foreign exchange transaction, obtained through your bank before shipment.', issuedBy:'Central Bank of Nigeria (CBN) via commercial bank', category:'mandatory', tip:'Form M must be obtained BEFORE the car ships. Customs will not release the vehicle without it regardless of other documents.' },
      { id:'i-02', document:'Bill of Lading (Original)', description:'Original shipping contract between the cargo owner and the ocean carrier.', issuedBy:'Shipping company / freight forwarder', category:'mandatory', tip:'Originals only. Some ports accept telex release but this must be arranged in advance with the shipping line.' },
      { id:'i-03', document:'CCVO (Combined Certificate of Value and Origin)', description:'Customs document certifying the declared CIF value and country of origin.', issuedBy:'Shipper / Exporter', category:'mandatory', tip:'The CCVO value is what import duty is calculated on. Under-declaration is a criminal offence under CEMA.' },
      { id:'i-04', document:'Packing List', description:'Itemised list of the shipment including VIN, make, model, year, and colour.', issuedBy:'Shipper / Exporter', category:'mandatory' },
      { id:'i-05', document:'Marine / Cargo Insurance Certificate', description:'Insurance covering the vehicle during sea transit, from loading port to Nigeria.', issuedBy:'NAICOM-licensed Nigerian insurer', category:'mandatory', tip:'Nigerian law requires cargo insurance through a Nigerian insurer or via one.' },
      { id:'i-06', document:'CED (Combined Exit Document)', description:'Exit document from the country of export confirming the vehicle lawfully left that country.', issuedBy:'Export authority of origin country', category:'mandatory' },
      { id:'i-07', document:'Nigeria Customs SAD Form', description:'Nigerian import declaration submitted to Customs via the NICIS II electronic system.', issuedBy:'Nigeria Customs Service via licensed agent', category:'mandatory', tip:'Engage a licensed Customs clearing agent. They handle this for ₦50,000–₦150,000.' },
      { id:'i-08', document:'Duty Assessment / Payment Receipt', description:'Customs assessment of import duty and levies, and proof of payment.', issuedBy:'Nigeria Customs Service', category:'mandatory', tip:'Import duty on vehicles is 35% of CIF value. Use our Import Duty Calculator for an estimate.' },
      { id:'i-09', document:'Final Release Order / Customs Clearance Certificate', description:'NCS document confirming the vehicle is inspected, duties paid, and cleared for release.', issuedBy:'Nigeria Customs Service', category:'mandatory', tip:'This becomes your Proof of Ownership / Customs Paper. Keep the original — you need it for registration and any future sale.' },
      { id:'i-10', document:'Port Handling Receipts (NPA / Terminal)', description:'Payment receipts for port charges, terminal handling, and demurrage if applicable.', issuedBy:'NPA / Terminal operator', category:'strongly_recommended', tip:'Demurrage accumulates daily after the free period expires. Clear quickly to avoid runaway port costs.' },
    ],
  },
  change_ownership: {
    label:'Change of Ownership', icon:'📋',
    intro:'Change of ownership is processed at the state MVAA or FRSC office. Both buyer and seller typically need to be present or provide notarised documents.',
    items:[
      { id:'co-01', document:'Existing Vehicle Registration Certificate (original)', description:'The current registration in the seller\'s name, surrendered for re-issue in the buyer\'s name.', issuedBy:'FRSC / State MVAA', category:'mandatory' },
      { id:'co-02', document:'Proof of Ownership (Customs Paper)', description:'Original NCS document or manufacturer certificate — must transfer with the vehicle.', issuedBy:'Nigeria Customs Service', category:'mandatory', tip:'If the seller cannot produce this, the MVAA may refuse to process the change of ownership.' },
      { id:'co-03', document:"Seller's Valid Government ID", description:'Registered owner\'s ID matching the registration certificate.', issuedBy:'FRSC / NIMC / Passport Authority', category:'mandatory' },
      { id:'co-04', document:"Buyer's Valid Government ID", description:'New owner\'s ID for MVAA application forms.', issuedBy:'FRSC / NIMC / Passport Authority', category:'mandatory' },
      { id:'co-05', document:'Purchase Agreement / Sales Receipt', description:'Signed document proving the transaction between seller and buyer.', issuedBy:'Seller / Buyer', category:'mandatory', tip:'Some state offices require this to be notarised by a lawyer before processing.' },
      { id:'co-06', document:'CMR Clearance Certificate', description:'Central Motor Registry confirmation the vehicle is not stolen.', issuedBy:'FRSC (CMR)', category:'mandatory', tip:'Increasingly mandatory at most MVAA offices. Obtain at any FRSC service centre.' },
      { id:'co-07', document:'New Number Plate (FRSC)', description:'New plate issued in the buyer\'s state at ownership transfer. Fee: ₦30,000.', issuedBy:'FRSC', category:'mandatory' },
      { id:'co-08', document:'Roadworthiness Certificate (current)', description:'Some states require a valid cert to process change of ownership.', issuedBy:'State MVAA / VIO', category:'strongly_recommended' },
      { id:'co-09', document:'Insurance Certificate', description:'Valid insurance in buyer\'s name or transfer of existing policy.', issuedBy:'NAICOM-licensed insurer', category:'strongly_recommended' },
    ],
  },
};

// ── Card colour palettes — deliberately varied, non-AI ──────────────
// mandatory: slate-900 border-l-4 accent; strongly_rec: stone; optional: zinc
const CARD_STYLE: Record<CategoryKey, { wrapper:string; badge:string; badgeText:string; icon:string; tip:string }> = {
  mandatory: {
    wrapper:   'bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 border-l-4 border-l-rose-500',
    badge:     'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300',
    badgeText: 'MUST HAVE',
    icon:      'text-rose-500',
    tip:       'bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/40 text-rose-700 dark:text-rose-300',
  },
  strongly_recommended: {
    wrapper:   'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 border-l-4 border-l-amber-500',
    badge:     'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
    badgeText: 'RECOMMENDED',
    icon:      'text-amber-500',
    tip:       'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 text-amber-700 dark:text-amber-300',
  },
  optional: {
    wrapper:   'bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700 border-l-4 border-l-zinc-400',
    badge:     'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400',
    badgeText: 'OPTIONAL',
    icon:      'text-zinc-400',
    tip:       'bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400',
  },
};

const SCENARIO_KEYS = Object.keys(SCENARIOS) as ScenarioKey[];

export default function VehiclePapersClient() {
  const [scenario,setScenario]   = useState<ScenarioKey>('buy_tokunbo');
  const [checked,setChecked]     = useState<Record<string,boolean>>({});
  const [filterCat,setFilterCat] = useState<CategoryKey|'all'>('all');

  const scenarioData = SCENARIOS[scenario];

  const visibleItems = useMemo(()=>
    filterCat==='all' ? scenarioData.items : scenarioData.items.filter(i=>i.category===filterCat),
  [scenarioData,filterCat]);

  const totalItems   = scenarioData.items.length;
  const checkedCount = scenarioData.items.filter(i=>checked[i.id]).length;
  const progress     = totalItems>0?(checkedCount/totalItems)*100:0;
  const mandatoryLeft = scenarioData.items.filter(i=>i.category==='mandatory'&&!checked[i.id]).length;

  const toggleItem=(id:string)=>setChecked(prev=>({...prev,[id]:!prev[id]}));
  const resetChecked=()=>setChecked({});
  const handleScenarioChange=(key:ScenarioKey)=>{ setScenario(key);setChecked({});setFilterCat('all'); };

  const sel = 'w-full h-11 px-3 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all cursor-pointer';

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* ── Inputs: 2×2 on mobile ── */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-3 mb-3">

              {/* Scenario dropdown */}
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Transaction</label>
                <select value={scenario} onChange={e=>handleScenarioChange(e.target.value as ScenarioKey)} className={sel}>
                  {SCENARIO_KEYS.map(k=><option key={k} value={k}>{SCENARIOS[k].icon} {SCENARIOS[k].label}</option>)}
                </select>
              </div>

              {/* Filter */}
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Filter by Priority</label>
                <select value={filterCat} onChange={e=>setFilterCat(e.target.value as CategoryKey|'all')} className={sel}>
                  <option value="all">All documents</option>
                  <option value="mandatory">Must have only</option>
                  <option value="strongly_recommended">Recommended</option>
                  <option value="optional">Optional only</option>
                </select>
              </div>
            </div>

            {/* Progress */}
            <div className="p-4 rounded-xl border border-border bg-card space-y-3 mb-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-foreground uppercase tracking-wide">Your Progress</p>
                <span className="text-sm font-black text-violet-600 dark:text-violet-400" style={{fontFamily:"'Barlow Condensed',Impact,sans-serif"}}>
                  {checkedCount}/{totalItems}
                </span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${progress===100?'bg-emerald-500':'bg-violet-500'}`} style={{width:`${progress}%`}}/>
              </div>
              {mandatoryLeft>0 ? (
                <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0"/>
                  {mandatoryLeft} must-have{mandatoryLeft>1?'s':''} still outstanding
                </p>
              ) : checkedCount===totalItems ? (
                <p className="text-xs text-emerald-600 dark:text-emerald-400">✓ All documents accounted for</p>
              ) : (
                <p className="text-xs text-muted-foreground">{totalItems-checkedCount} remaining</p>
              )}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button onClick={()=>window.print()}
                className="flex items-center justify-center gap-1.5 h-10 rounded-xl text-xs font-medium bg-violet-500/10 border border-violet-500/20 text-violet-700 dark:text-violet-400 hover:bg-violet-500/20 transition-all">
                <Printer className="h-3.5 w-3.5"/> Print / PDF
              </button>
              <button onClick={resetChecked}
                className="flex items-center justify-center gap-2 h-10 rounded-xl text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
                Clear ticks
              </button>
            </div>
          </div>

          {/* ── Checklist ── */}
          <div className="lg:col-span-3 space-y-3">

            {/* Intro banner */}
            <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
              <p className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wide mb-1.5">
                {scenarioData.icon} {scenarioData.label}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{scenarioData.intro}</p>
            </div>

            {/* Category count badges */}
            <div className="flex gap-2 flex-wrap">
              {(['mandatory','strongly_recommended','optional'] as CategoryKey[]).map(cat=>{
                const count=scenarioData.items.filter(i=>i.category===cat).length;
                if(!count) return null;
                const style=CARD_STYLE[cat];
                return (
                  <button key={cat} onClick={()=>setFilterCat(filterCat===cat?'all':cat)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-full border transition-all ${filterCat===cat?`${style.badge} border-transparent`:'bg-card border-border text-muted-foreground hover:border-violet-500/30'}`}>
                    {cat==='mandatory'?'🔴':cat==='strongly_recommended'?'🟡':'⚪'} {style.badgeText} ({count})
                  </button>
                );
              })}
            </div>

            {/* Checklist items */}
            <div className="space-y-2">
              {visibleItems.map(item=>{
                const isChecked=!!checked[item.id];
                const style=CARD_STYLE[item.category];
                return (
                  <div key={item.id} onClick={()=>toggleItem(item.id)}
                    className={`rounded-xl p-4 cursor-pointer transition-all ${isChecked?'opacity-50 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30':style.wrapper}`}>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        {isChecked
                          ?<CheckCircle2 className="h-5 w-5 text-emerald-500"/>
                          :<Circle className={`h-5 w-5 ${style.icon}`}/>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className={`text-sm font-bold leading-snug ${isChecked?'line-through text-muted-foreground':'text-foreground'}`}>
                            {item.document}
                          </p>
                          <span className={`text-[10px] font-black shrink-0 mt-0.5 px-1.5 py-0.5 rounded-full ${style.badge}`}>
                            {style.badgeText}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-1">{item.description}</p>
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold">Issued by:</span> {item.issuedBy}
                        </p>
                        {item.tip&&(
                          <div className={`flex items-start gap-1.5 mt-2 p-2 rounded-lg ${style.tip}`}>
                            <Info className="h-3.5 w-3.5 mt-0.5 shrink-0"/>
                            <p className="text-xs leading-relaxed">{item.tip}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link href="/tools/import-duty-calculator" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20 transition-all">
                <p className="text-xs font-bold text-violet-700 dark:text-violet-400">Import duty calculator</p>
                <ChevronRight className="h-3.5 w-3.5 text-violet-600 dark:text-violet-500"/>
              </Link>
              <Link href="/tools/registration-fee-calculator" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all">
                <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Registration fees</p>
                <ChevronRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-500"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}