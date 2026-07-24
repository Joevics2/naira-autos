'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MapPin, RotateCcw, ChevronRight, ArrowRight } from 'lucide-react';

const FUEL_DATA: Record<string, Record<string, { city: number; hwy: number; tank: number }>> = {
  Toyota: {
    'Camry 2.4 (2007–2011)':      { city:11.2, hwy:7.8,  tank:70 },
    'Camry 2.5 (2012–2017)':      { city:10.5, hwy:7.2,  tank:70 },
    'Camry 2.5 (2018–2024)':      { city:9.8,  hwy:6.7,  tank:60 },
    'Corolla 1.6 (2003–2008)':    { city:9.5,  hwy:6.8,  tank:50 },
    'Corolla 1.8 (2009–2013)':    { city:9.8,  hwy:7.0,  tank:55 },
    'Corolla 1.8 (2014–2019)':    { city:9.2,  hwy:6.5,  tank:50 },
    'Corolla 2.0 (2020–2024)':    { city:8.8,  hwy:6.2,  tank:50 },
    'Highlander 3.5 (2008–2013)': { city:14.2, hwy:10.5, tank:72 },
    'Highlander 3.5 (2014–2019)': { city:13.5, hwy:9.8,  tank:72 },
    'Highlander 3.5 (2020–2024)': { city:12.8, hwy:9.2,  tank:72 },
    'RAV4 2.5 (2013–2018)':       { city:11.2, hwy:8.0,  tank:60 },
    'RAV4 2.5 (2019–2024)':       { city:10.5, hwy:7.5,  tank:55 },
    'Land Cruiser 4.6 V8':        { city:18.5, hwy:13.5, tank:93 },
    'Land Cruiser Prado 4.0':     { city:16.2, hwy:11.8, tank:87 },
    'Fortuner 2.7':               { city:13.5, hwy:10.2, tank:80 },
    'Venza 3.5':                  { city:12.5, hwy:9.0,  tank:70 },
    'Avalon 3.5':                 { city:11.5, hwy:7.8,  tank:68 },
    'Sienna 3.5':                 { city:13.8, hwy:10.2, tank:77 },
    '4Runner 4.0':                { city:15.5, hwy:11.8, tank:87 },
  },
  Honda: {
    'Accord 2.4 (2008–2012)':   { city:10.5, hwy:7.5,  tank:65 },
    'Accord 2.4 (2013–2017)':   { city:10.0, hwy:7.0,  tank:65 },
    'Accord 1.5T (2018–2024)':  { city:9.2,  hwy:6.5,  tank:56 },
    'CR-V 2.4 (2007–2011)':     { city:11.0, hwy:8.2,  tank:58 },
    'CR-V 2.4 (2012–2016)':     { city:10.5, hwy:7.8,  tank:58 },
    'CR-V 1.5T (2017–2022)':    { city:9.8,  hwy:7.2,  tank:57 },
    'Pilot 3.5 (2016–2022)':    { city:13.0, hwy:9.8,  tank:73 },
    'Civic 1.5T (2016–2021)':   { city:8.5,  hwy:6.2,  tank:47 },
    'Civic 1.5T (2022–2024)':   { city:8.2,  hwy:5.8,  tank:47 },
    'Odyssey 3.5':              { city:13.5, hwy:10.0, tank:76 },
    'Passport 3.5':             { city:13.0, hwy:9.8,  tank:69 },
  },
  Lexus: {
    'ES 350 (2013–2018)':  { city:11.5, hwy:8.0,  tank:70 },
    'ES 350 (2019–2024)':  { city:10.8, hwy:7.5,  tank:60 },
    'RX 350 (2013–2015)':  { city:13.0, hwy:9.5,  tank:72 },
    'RX 350 (2016–2022)':  { city:12.5, hwy:9.0,  tank:72 },
    'RX 350 (2023–2024)':  { city:11.8, hwy:8.5,  tank:65 },
    'GX 460':              { city:16.5, hwy:12.5, tank:87 },
    'LX 570':              { city:19.0, hwy:14.5, tank:93 },
    'NX 200t':             { city:10.5, hwy:7.8,  tank:60 },
    'IS 350':              { city:12.5, hwy:9.0,  tank:66 },
  },
  'Mercedes-Benz': {
    'C 300 (W204)':  { city:12.5, hwy:8.8,  tank:66 },
    'C 300 (W205)':  { city:11.8, hwy:8.2,  tank:66 },
    'E 350 (W212)':  { city:13.5, hwy:9.5,  tank:80 },
    'E 350 (W213)':  { city:12.5, hwy:8.8,  tank:80 },
    'GLE 350':       { city:14.5, hwy:10.8, tank:80 },
    'GLC 300':       { city:12.5, hwy:9.0,  tank:66 },
    'GLS 450':       { city:15.5, hwy:11.5, tank:100 },
    'ML 350':        { city:14.0, hwy:10.2, tank:95 },
    'G-Wagon 5.5':   { city:20.0, hwy:15.5, tank:96 },
  },
  BMW: {
    '3 Series 328i (F30)': { city:11.5, hwy:8.0,  tank:60 },
    '5 Series 528i (F10)': { city:12.5, hwy:8.8,  tank:70 },
    '5 Series 530i (G30)': { city:11.5, hwy:8.0,  tank:68 },
    'X3 xDrive28i':        { city:12.0, hwy:8.5,  tank:67 },
    'X5 xDrive35i':        { city:14.5, hwy:10.5, tank:85 },
    'X6 xDrive35i':        { city:15.0, hwy:11.0, tank:85 },
    '7 Series 750i':       { city:15.5, hwy:11.0, tank:82 },
  },
  Hyundai: {
    'Sonata 2.4 (2011–2014)':   { city:10.5, hwy:7.2,  tank:70 },
    'Sonata 2.5 (2020–2024)':   { city:9.5,  hwy:6.8,  tank:65 },
    'Santa Fe 2.4 (2013–2018)': { city:12.0, hwy:8.8,  tank:71 },
    'Santa Fe 2.5 (2019–2024)': { city:11.5, hwy:8.5,  tank:67 },
    'Tucson 2.0':               { city:10.5, hwy:7.8,  tank:62 },
    'Palisade 3.8':             { city:14.0, hwy:10.5, tank:80 },
  },
  Kia: {
    'Sorento 2.4 (2011–2015)':  { city:12.0, hwy:8.8,  tank:68 },
    'Sorento 3.3 (2016–2020)':  { city:13.5, hwy:9.8,  tank:73 },
    'Sportage 2.0 (2011–2016)': { city:10.5, hwy:7.8,  tank:55 },
    'Telluride 3.8':            { city:14.0, hwy:10.5, tank:80 },
    'Optima 2.4':               { city:10.5, hwy:7.5,  tank:70 },
  },
  Nissan: {
    'Altima 2.5 (2013–2018)':     { city:10.2, hwy:7.2,  tank:68 },
    'Altima 2.5 (2019–2024)':     { city:9.8,  hwy:6.8,  tank:60 },
    'Pathfinder 3.5 (2013–2021)': { city:13.8, hwy:10.5, tank:80 },
    'Murano 3.5':                 { city:12.5, hwy:9.2,  tank:71 },
    'Armada 5.6':                 { city:17.5, hwy:13.5, tank:98 },
    'Xterra 4.0':                 { city:14.5, hwy:11.0, tank:80 },
  },
  Jeep: {
    'Grand Cherokee 3.6 (2011–2021)': { city:14.5, hwy:10.8, tank:83 },
    'Grand Cherokee 5.7 (Hemi)':      { city:17.5, hwy:13.0, tank:83 },
    'Wrangler 3.6':                    { city:15.5, hwy:12.0, tank:70 },
    'Commander 4.7':                   { city:16.5, hwy:12.5, tank:87 },
  },
  'Land Rover': {
    'Range Rover Sport 3.0': { city:16.0, hwy:12.0, tank:105 },
    'Range Rover 4.4 D':     { city:15.5, hwy:11.5, tank:105 },
    'Discovery 3.0':         { city:15.0, hwy:11.0, tank:90 },
    'Defender 90 2.0T':      { city:13.5, hwy:10.0, tank:90 },
  },
};

const ALL_ROUTES: Array<{ from:string; to:string; km:number }> = [
  { from:'Lagos',        to:'Abuja',         km:791 },
  { from:'Lagos',        to:'Port Harcourt', km:669 },
  { from:'Lagos',        to:'Ibadan',        km:128 },
  { from:'Lagos',        to:'Benin City',    km:320 },
  { from:'Lagos',        to:'Warri',         km:352 },
  { from:'Lagos',        to:'Ondo',          km:282 },
  { from:'Lagos',        to:'Abeokuta',      km:105 },
  { from:'Lagos',        to:'Ilorin',        km:306 },
  { from:'Lagos',        to:'Enugu',         km:518 },
  { from:'Lagos',        to:'Onitsha',       km:465 },
  { from:'Lagos',        to:'Owerri',        km:603 },
  { from:'Lagos',        to:'Calabar',       km:730 },
  { from:'Lagos',        to:'Aba',           km:585 },
  { from:'Abuja',        to:'Kaduna',        km:187 },
  { from:'Abuja',        to:'Kano',          km:370 },
  { from:'Abuja',        to:'Jos',           km:295 },
  { from:'Abuja',        to:'Enugu',         km:370 },
  { from:'Abuja',        to:'Minna',         km:155 },
  { from:'Abuja',        to:'Benin City',    km:487 },
  { from:'Abuja',        to:'Makurdi',       km:262 },
  { from:'Abuja',        to:'Lafia',         km:185 },
  { from:'Abuja',        to:'Port Harcourt', km:660 },
  { from:'Port Harcourt',to:'Calabar',       km:212 },
  { from:'Port Harcourt',to:'Owerri',        km:112 },
  { from:'Port Harcourt',to:'Aba',           km:75  },
  { from:'Port Harcourt',to:'Warri',         km:177 },
  { from:'Enugu',        to:'Onitsha',       km:72  },
  { from:'Enugu',        to:'Aba',           km:200 },
  { from:'Kano',         to:'Maiduguri',     km:550 },
  { from:'Kano',         to:'Kaduna',        km:188 },
  { from:'Kano',         to:'Sokoto',        km:430 },
  { from:'Kano',         to:'Zaria',         km:88  },
  { from:'Kaduna',       to:'Jos',           km:192 },
  { from:'Ibadan',       to:'Ilorin',        km:164 },
  { from:'Ibadan',       to:'Osogbo',        km:98  },
];

const ALL_CITIES = Array.from(new Set(ALL_ROUTES.flatMap(r=>[r.from,r.to]))).sort();

function fmt(n:number){ return '₦'+Math.round(n).toLocaleString('en-NG'); }

// Average effective speed on Nigerian interstate routes — accounts for traffic,
// checkpoints, and road conditions, not just open-highway cruising speed.
const AVG_KMH = 65;
function estimateDriveTime(km: number): string {
  const totalHours = km / AVG_KMH;
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
}

export default function RoadTripClient() {
  const [origin,setOrigin]             = useState('Lagos');
  const [destination,setDestination]   = useState('Abuja');
  const [useCustom,setUseCustom]       = useState(false);
  const [customKm,setCustomKm]         = useState('');
  const [selectedBrand,setSelectedBrand] = useState('Toyota');
  const [selectedModel,setSelectedModel] = useState('Camry 2.5 (2012–2017)');
  const [driveMode,setDriveMode]       = useState<'city'|'highway'|'mixed'>('mixed');
  const [pumpPrice,setPumpPrice]       = useState(1000);

  const brands = Object.keys(FUEL_DATA).sort();
  const models = Object.keys(FUEL_DATA[selectedBrand]||{});
  const carData = FUEL_DATA[selectedBrand]?.[selectedModel];

  const handleBrandChange = (b:string)=>{ setSelectedBrand(b); const first=Object.keys(FUEL_DATA[b]||{})[0]; if(first) setSelectedModel(first); };

  const routeEntry = useMemo(()=>{
    if(useCustom) return null;
    return ALL_ROUTES.find(r=>(r.from===origin&&r.to===destination)||(r.from===destination&&r.to===origin))||null;
  },[origin,destination,useCustom]);

  const distance = useCustom ? parseFloat(customKm)||0 : routeEntry?.km??0;

  const calc = useMemo(()=>{
    if(!carData||!distance||!pumpPrice) return null;
    const rate = driveMode==='city'?carData.city:driveMode==='highway'?carData.hwy:(carData.city+carData.hwy)/2;
    const litres=(rate/100)*distance;
    const cost=litres*pumpPrice;
    return { litres,cost,rate,cityL:carData.city,hwyL:carData.hwy,tank:carData.tank };
  },[carData,distance,pumpPrice,driveMode]);

  const reset=()=>{ setOrigin('Lagos');setDestination('Abuja');setUseCustom(false);setCustomKm('');setSelectedBrand('Toyota');setSelectedModel('Camry 2.5 (2012–2017)');setDriveMode('mixed');setPumpPrice(1000); };

  const sel = 'w-full h-11 px-3 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all cursor-pointer';
  const lbl = 'block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5';

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* ── Inputs: 2×2 grid on mobile ── */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-3 mb-3">

              {/* Origin */}
              <div>
                <label className={lbl}>From</label>
                {!useCustom ? (
                  <select value={origin} onChange={e=>{setOrigin(e.target.value);if(e.target.value===destination)setDestination(ALL_CITIES.find(c=>c!==e.target.value)||'Abuja');}} className={sel}>
                    {ALL_CITIES.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                ) : (
                  <div className="relative">
                    <input type="number" value={customKm} onChange={e=>setCustomKm(e.target.value)} placeholder="Distance in km"
                      className="w-full h-11 pl-4 pr-10 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-amber-500 transition-all" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">km</span>
                  </div>
                )}
              </div>

              {/* Destination */}
              <div>
                <label className={lbl}>
                  {!useCustom ? 'To' : (
                    <button onClick={()=>{setUseCustom(false);setCustomKm('');}} className="text-amber-500 normal-case font-medium tracking-normal">← Use city selector</button>
                  )}
                </label>
                {!useCustom ? (
                  <select value={destination} onChange={e=>setDestination(e.target.value)} className={sel}>
                    {ALL_CITIES.filter(c=>c!==origin).map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                ) : (
                  <div className="h-11 rounded-xl border border-border bg-muted/30 flex items-center px-3">
                    <span className="text-xs text-muted-foreground">Custom distance</span>
                  </div>
                )}
              </div>

              {!useCustom && !routeEntry && (
                <div className="col-span-2">
                  <button onClick={()=>setUseCustom(true)} className="text-xs text-amber-500 underline hover:text-amber-400">
                    Route not found — enter distance manually
                  </button>
                </div>
              )}
              {!useCustom && routeEntry && (
                <div className="col-span-2 -mt-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1 flex-wrap">
                    <ArrowRight className="h-3 w-3 text-amber-500 shrink-0"/>
                    {origin} to {destination}: <strong className="text-foreground ml-1">{routeEntry.km.toLocaleString()}km</strong>
                    <span className="text-muted-foreground/50">·</span>
                    <strong className="text-foreground">~{estimateDriveTime(routeEntry.km)}</strong> drive
                    <button onClick={()=>setUseCustom(true)} className="ml-2 text-amber-500 underline">custom</button>
                  </p>
                </div>
              )}

              {/* Brand */}
              <div>
                <label className={lbl}>Brand</label>
                <select value={selectedBrand} onChange={e=>handleBrandChange(e.target.value)} className={sel}>
                  {brands.map(b=><option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Model */}
              <div>
                <label className={lbl}>Model &amp; Year</label>
                <select value={selectedModel} onChange={e=>setSelectedModel(e.target.value)} className={sel}>
                  {models.map(m=><option key={m} value={m}>{m}</option>)}
                </select>
                {carData&&<p className="text-xs text-muted-foreground mt-1">City: <strong className="text-foreground">{carData.city}</strong> · Hwy: <strong className="text-foreground">{carData.hwy}</strong> L/100km</p>}
              </div>
            </div>

            {/* Drive mode — 3 buttons full width */}
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {([
                {key:'city',    label:'🏙 City',    sub:'Stop-start'},
                {key:'mixed',   label:'⚡ Mixed',   sub:'Default'},
                {key:'highway', label:'🛣 Highway', sub:'Open road'},
              ] as const).map(({key,label,sub})=>(
                <button key={key} onClick={()=>setDriveMode(key)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${driveMode===key?'bg-amber-500 border-amber-500 text-white':'bg-card border-border text-muted-foreground hover:border-amber-500/50'}`}>
                  <div>{label}</div>
                  <div className="font-normal opacity-70 text-[10px]">{sub}</div>
                </button>
              ))}
            </div>

            {/* Pump price slider */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <label className={lbl}>Pump Price / Litre</label>
                <span className="text-sm font-black text-amber-600 dark:text-amber-400">₦{pumpPrice.toLocaleString()}</span>
              </div>
              <input type="range" min={500} max={2000} step={50} value={pumpPrice} onChange={e=>setPumpPrice(Number(e.target.value))}
                className="w-full accent-amber-500 h-2 rounded-full mb-2" />
              <div className="flex gap-1.5">
                {[800,950,1000,1100,1500].map(p=>(
                  <button key={p} onClick={()=>setPumpPrice(p)}
                    className={`text-xs py-1 rounded-lg border transition-all font-medium flex-1 ${pumpPrice===p?'bg-amber-500 border-amber-500 text-white':'bg-card border-border text-muted-foreground hover:border-amber-500/50'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={reset} className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
              <RotateCcw className="h-3.5 w-3.5"/> Reset
            </button>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-3 space-y-3">
            {!calc ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3">
                  <MapPin className="h-6 w-6 text-amber-500/50"/>
                </div>
                <p className="text-xs text-muted-foreground">{!distance?'Select a route or enter a distance.':'Select a car to see your fuel cost.'}</p>
              </div>
            ) : (
              <>
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25">
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-1">
                    Fuel Cost — {useCustom?`${distance}km custom`:`${origin} → ${destination} (${distance}km)`}
                  </p>
                  <p className="text-4xl font-black text-amber-600 dark:text-amber-400 leading-none" style={{fontFamily:"'Barlow Condensed',Impact,sans-serif"}}>
                    {fmt(calc.cost)}
                  </p>
                  <p className="text-xs text-amber-700/60 dark:text-amber-400/60 mt-1.5">
                    {calc.litres.toFixed(1)}L × ₦{pumpPrice.toLocaleString()}/L · {driveMode==='city'?'City':driveMode==='highway'?'Highway':'Mixed'} · {calc.rate.toFixed(1)}L/100km
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    {label:'Drive time',   val:estimateDriveTime(distance)},
                    {label:'Litres needed', val:`${calc.litres.toFixed(1)}L`},
                    {label:'Cost per km',   val:`₦${(calc.cost/distance).toFixed(0)}`},
                    {label:'Tank fill-ups', val:calc.tank>0?`${Math.ceil(calc.litres/calc.tank)}x`:'—'},
                  ].map(({label,val})=>(
                    <div key={label} className="p-3 rounded-xl bg-card border border-border text-center">
                      <p className="text-xs text-muted-foreground mb-1">{label}</p>
                      <p className="text-xl font-black text-foreground" style={{fontFamily:"'Barlow Condensed',Impact,sans-serif"}}>{val}</p>
                    </div>
                  ))}
                </div>

                {calc.tank>0&&(
                  <div className="rounded-xl border border-border bg-card p-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>Tank usage</span>
                      <span>{((calc.litres/calc.tank)*100).toFixed(0)}% of {calc.tank}L tank</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${calc.litres/calc.tank>0.9?'bg-red-500':calc.litres/calc.tank>0.6?'bg-amber-500':'bg-emerald-500'}`}
                        style={{width:`${Math.min((calc.litres/calc.tank)*100,100)}%`}}/>
                    </div>
                    {calc.litres>calc.tank&&(
                      <p className="text-xs text-red-500 mt-1">⚠ Needs {Math.ceil(calc.litres/calc.tank)} fill-ups — plan fuel stops en route</p>
                    )}
                  </div>
                )}

                <div className="rounded-xl border border-border bg-card p-3">
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-2.5">City vs Highway Breakdown</p>
                  <div className="space-y-2">
                    {[
                      {label:'🏙 City',    rate:calc.cityL},
                      {label:'⚡ Mixed',   rate:(calc.cityL+calc.hwyL)/2},
                      {label:'🛣 Highway', rate:calc.hwyL},
                    ].map(({label,rate})=>{
                      const cost=(rate/100)*distance*pumpPrice;
                      return (
                        <div key={label} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-foreground font-medium w-20">{label}</span>
                            <span className="text-xs text-muted-foreground">{rate.toFixed(1)}L/100km</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-foreground">{fmt(cost)}</span>
                            <span className="text-xs text-muted-foreground ml-2">{((rate/100)*distance).toFixed(1)}L</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link href="/tools/fuel-cost-calculator" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all">
                    <p className="text-xs font-bold text-amber-700 dark:text-amber-400">Fuel cost calculator</p>
                    <ChevronRight className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500"/>
                  </Link>
                  <Link href="/tools/auto-loan-calculator" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Loan calculator</p>
                    <ChevronRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500"/>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}