'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lightbulb, RotateCcw, ChevronRight, Info, AlertTriangle } from 'lucide-react';

// ── Dataset ───────────────────────────────────────────────────────
// Bulb types are the common factory-fit reference for the base/mid
// trim of each generation. Higher trims often swap to factory LED or
// HID — always confirm against your old bulb or owner's manual.

interface BulbFitment {
  lowBeam: string;
  highBeam: string;
  fogLight?: string;
  note?: string;
}

const BULB_DATA: Record<string, Record<string, BulbFitment>> = {
  Toyota: {
    'Camry (2007–2011)':      { lowBeam: '9006', highBeam: '9005' },
    'Camry (2012–2017)':      { lowBeam: 'H11', highBeam: '9005' },
    'Camry (2018–2024)':      { lowBeam: 'H11', highBeam: '9005', note: 'Higher trims (XSE/XLE) come with factory LED projector headlights — non-serviceable, replace as a full assembly.' },
    'Corolla (2014–2019)':    { lowBeam: 'H11', highBeam: '9005' },
    'Corolla (2020–2024)':    { lowBeam: 'H11', highBeam: '9005', fogLight: 'H16', note: 'LE/XLE trims use factory LED headlights.' },
    'RAV4 (2013–2018)':       { lowBeam: 'H11', highBeam: '9005' },
    'RAV4 (2019–2024)':       { lowBeam: 'H11', highBeam: '9005', note: 'XLE Premium and above use factory LED headlights.' },
    'Highlander (2014–2019)': { lowBeam: 'H11', highBeam: '9005' },
    'Land Cruiser 200':       { lowBeam: 'H11', highBeam: '9005' },
    'Land Cruiser Prado':     { lowBeam: 'H11', highBeam: 'H1' },
    'Hilux (2016–2024)':      { lowBeam: 'H11', highBeam: 'H1', fogLight: 'H16' },
    'Yaris':                    { lowBeam: 'H11', highBeam: 'H1' },
    'Sienna':                   { lowBeam: 'H11', highBeam: '9005' },
    'Hiace':                    { lowBeam: 'H4', highBeam: 'H4', note: 'Single dual-filament bulb handles both low and high beam.' },
  },
  Honda: {
    'Accord (2008–2012)':  { lowBeam: 'H11', highBeam: '9005' },
    'Accord (2013–2017)':  { lowBeam: 'H11', highBeam: '9005' },
    'Accord (2018–2024)':  { lowBeam: 'H11', highBeam: '9005', note: 'Touring trim uses factory LED headlights.' },
    'Civic (2012–2015)':   { lowBeam: 'H11', highBeam: '9005' },
    'Civic (2016–2021)':   { lowBeam: 'H11', highBeam: '9005', fogLight: 'H8' },
    'Civic (2022–2024)':   { lowBeam: 'H11', highBeam: '9005', note: 'Higher trims use factory LED headlights.' },
    'CR-V (2012–2016)':    { lowBeam: 'H11', highBeam: '9005' },
    'CR-V (2017–2022)':    { lowBeam: 'H11', highBeam: '9005' },
    'Pilot':                 { lowBeam: 'H11', highBeam: '9005', fogLight: 'H11' },
    'Odyssey':               { lowBeam: 'H11', highBeam: '9005' },
    'HR-V':                  { lowBeam: 'H11', highBeam: '9005' },
  },
  Ford: {
    'F-150 (2015–2020)': { lowBeam: 'H13', highBeam: 'H13', fogLight: 'H10', note: 'H13 is a dual-filament bulb — one bulb covers both low and high beam on halogen trims.' },
    'F-150 (2021–2024)': { lowBeam: 'H11', highBeam: '9005', note: 'Higher trims use factory LED headlights.' },
    'Focus':                { lowBeam: 'H11', highBeam: '9005' },
    'Fusion':                { lowBeam: 'H11', highBeam: '9005' },
    'Escape (2013–2019)': { lowBeam: 'H11', highBeam: '9005' },
    'Escape (2020–2024)': { lowBeam: 'H11', highBeam: '9005', note: 'Titanium trim uses factory LED headlights.' },
    'Explorer':             { lowBeam: 'H11', highBeam: '9005', fogLight: 'H10' },
    'Edge':                  { lowBeam: 'H11', highBeam: '9005' },
    'Ranger':                { lowBeam: 'H11', highBeam: '9005' },
  },
  Chevrolet: {
    'Silverado 1500 (2014–2018)': { lowBeam: 'H11', highBeam: '9005' },
    'Silverado 1500 (2019–2024)': { lowBeam: 'H11', highBeam: '9005', note: 'High Country trim uses factory LED headlights.' },
    'Malibu':          { lowBeam: 'H11', highBeam: '9005' },
    'Cruze':             { lowBeam: 'H11', highBeam: '9005' },
    'Equinox':           { lowBeam: 'H11', highBeam: '9005' },
    'Tahoe / Suburban':  { lowBeam: 'H11', highBeam: '9005' },
    'Camaro':             { lowBeam: 'H13', highBeam: 'H13', note: 'Base trims use a dual-filament H13 bulb; RS/SS trims use factory LED/HID.' },
  },
  Nissan: {
    'Altima (2013–2018)': { lowBeam: 'H11', highBeam: '9005' },
    'Altima (2019–2024)': { lowBeam: 'H11', highBeam: '9005', note: 'SR/Platinum trims use factory LED headlights.' },
    'Sentra':                { lowBeam: 'H11', highBeam: 'H1' },
    'Rogue':                 { lowBeam: 'H11', highBeam: '9005' },
    'Pathfinder':            { lowBeam: 'H11', highBeam: '9005' },
    'Patrol':                { lowBeam: 'H11', highBeam: 'H1' },
    'Navara / Frontier':     { lowBeam: 'H11', highBeam: 'H1' },
  },
  Hyundai: {
    'Elantra (2017–2020)': { lowBeam: 'H11', highBeam: '9005' },
    'Elantra (2021–2024)': { lowBeam: 'H11', highBeam: '9005', note: 'Limited trim uses factory LED headlights.' },
    'Sonata':                { lowBeam: 'H11', highBeam: '9005' },
    'Tucson':                { lowBeam: 'H11', highBeam: '9005' },
    'Santa Fe':              { lowBeam: 'H11', highBeam: '9005' },
    'Accent':                { lowBeam: 'H11', highBeam: 'H1' },
    'i10':                   { lowBeam: 'H4', highBeam: 'H4', note: 'Single dual-filament bulb handles both low and high beam.' },
    'i20':                   { lowBeam: 'H7', highBeam: 'H1' },
  },
  Kia: {
    'Optima / K5':   { lowBeam: 'H11', highBeam: '9005' },
    'Sportage':       { lowBeam: 'H11', highBeam: '9005' },
    'Sorento':        { lowBeam: 'H11', highBeam: '9005' },
    'Rio':             { lowBeam: 'H11', highBeam: 'H1' },
    'Picanto':         { lowBeam: 'H4', highBeam: 'H4', note: 'Single dual-filament bulb handles both low and high beam.' },
    'Cerato / Forte':  { lowBeam: 'H11', highBeam: '9005' },
  },
  Volkswagen: {
    'Golf':    { lowBeam: 'H7', highBeam: 'H1' },
    'Jetta':    { lowBeam: 'H11', highBeam: '9005' },
    'Passat':   { lowBeam: 'H7', highBeam: 'H1' },
    'Tiguan':   { lowBeam: 'H7', highBeam: 'H1' },
    'Polo':     { lowBeam: 'H7', highBeam: 'H1' },
  },
  BMW: {
    '3 Series': { lowBeam: 'H7', highBeam: 'H1', note: 'M Sport and higher trims often use factory LED or Xenon (D1S) — check your old bulb first.' },
    '5 Series': { lowBeam: 'D3S (Xenon)', highBeam: 'H7', note: 'Factory Xenon on most trims; some later years use full LED.' },
    'X3':        { lowBeam: 'H7', highBeam: 'H1' },
    'X5':        { lowBeam: 'D3S (Xenon)', highBeam: 'H7', note: 'Factory Xenon on most trims; some later years use full LED.' },
  },
  'Mercedes-Benz': {
    'C-Class (W205)': { lowBeam: 'H7', highBeam: 'H1', note: 'AMG Line and higher trims often use factory LED — check your old bulb first.' },
    'E-Class (W213)': { lowBeam: 'D1S (Xenon)', highBeam: 'H7', note: 'Many trims use full LED — non-serviceable, replace as an assembly.' },
    'GLE / ML':         { lowBeam: 'H7', highBeam: 'H1' },
    'GLC':               { lowBeam: 'H7', highBeam: 'H1' },
  },
  Audi: {
    'A4': { lowBeam: 'H7', highBeam: 'H1', note: 'S-Line and higher trims often use factory LED or Xenon — check your old bulb first.' },
    'A6': { lowBeam: 'D3S (Xenon)', highBeam: 'H7', note: 'Many trims use full LED Matrix headlights — non-serviceable.' },
    'Q5': { lowBeam: 'H7', highBeam: 'H1' },
  },
  Mazda: {
    'Mazda3': { lowBeam: 'H11', highBeam: '9005' },
    'Mazda6': { lowBeam: 'H11', highBeam: '9005', note: 'Grand Touring trim uses factory LED headlights.' },
    'CX-5':    { lowBeam: 'H11', highBeam: '9005' },
  },
  Subaru: {
    'Outback':  { lowBeam: 'H11', highBeam: '9005' },
    'Forester': { lowBeam: 'H11', highBeam: '9005' },
    'Impreza':  { lowBeam: 'H11', highBeam: 'H1' },
  },
  Lexus: {
    'RX 350': { lowBeam: 'D4S (Xenon)', highBeam: 'HB3', note: 'F Sport and Luxury trims use factory LED.' },
    'ES 350': { lowBeam: 'D4S (Xenon)', highBeam: 'HB3', note: 'Higher trims use factory LED.' },
    'GX 460': { lowBeam: 'D4S (Xenon)', highBeam: 'HB3' },
  },
  Peugeot: {
    '208': { lowBeam: 'H7', highBeam: 'H1' },
    '308': { lowBeam: 'H7', highBeam: 'H1' },
  },
  Mitsubishi: {
    'Lancer':            { lowBeam: 'H11', highBeam: '9005' },
    'Outlander':          { lowBeam: 'H11', highBeam: '9005' },
    'Pajero / Montero':   { lowBeam: 'H11', highBeam: 'H1' },
  },
  Suzuki: {
    'Swift':  { lowBeam: 'H4', highBeam: 'H4', note: 'Single dual-filament bulb handles both low and high beam.' },
    'Vitara': { lowBeam: 'H4', highBeam: 'H4', note: 'Single dual-filament bulb handles both low and high beam.' },
  },
};

export default function HeadlightBulbClient() {
  const [selectedBrand, setSelectedBrand] = useState('Toyota');
  const [selectedModel, setSelectedModel] = useState('Camry (2012–2017)');

  useEffect(() => {
    const models = Object.keys(BULB_DATA[selectedBrand] || {});
    if (models.length > 0 && !BULB_DATA[selectedBrand]?.[selectedModel]) setSelectedModel(models[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrand]);

  const brands = Object.keys(BULB_DATA).sort();
  const models = Object.keys(BULB_DATA[selectedBrand] || {});
  const fit = BULB_DATA[selectedBrand]?.[selectedModel];

  const reset = () => { setSelectedBrand('Toyota'); setSelectedModel('Camry (2012–2017)'); };
  const selectCls = 'w-full h-11 px-3 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all cursor-pointer';
  const isFactoryLight = fit && (fit.lowBeam.includes('Xenon') || fit.lowBeam.includes('D1S') || fit.lowBeam.includes('D3S') || fit.lowBeam.includes('D4S'));

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Make</label>
                <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)} className={selectCls}>
                  {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Model &amp; Year</label>
                <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)} className={selectCls}>
                  {models.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <button onClick={reset} className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>

            <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Info className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                Bulb types shown are for the common base/mid trim. Higher trims often ship with factory LED or Xenon — pull your old bulb and match the code printed on its base before buying.
              </p>
            </div>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-3 space-y-3">
            {!fit ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3">
                  <Lightbulb className="h-6 w-6 text-amber-500/50" />
                </div>
                <p className="text-xs text-muted-foreground">Select a make and model — bulb types update live.</p>
              </div>
            ) : (
              <>
                {/* Hero */}
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25">
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-1">
                    {selectedBrand} {selectedModel}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-amber-700/70 dark:text-amber-400/60 mb-0.5">Low beam</p>
                      <p className="text-3xl font-black text-amber-600 dark:text-amber-400 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                        {fit.lowBeam}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-amber-700/70 dark:text-amber-400/60 mb-0.5">High beam</p>
                      <p className="text-3xl font-black text-amber-600 dark:text-amber-400 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                        {fit.highBeam}
                      </p>
                    </div>
                    {fit.fogLight && (
                      <div>
                        <p className="text-xs text-amber-700/70 dark:text-amber-400/60 mb-0.5">Fog light</p>
                        <p className="text-3xl font-black text-amber-600 dark:text-amber-400 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                          {fit.fogLight}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {isFactoryLight && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700 dark:text-red-400 leading-relaxed">
                      This trim likely uses factory Xenon/HID headlights. These need HID-rated bulbs and a working ballast — a standard halogen bulb of the same code will not fit or work.
                    </p>
                  </div>
                )}

                {fit.note && (
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Trim note</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{fit.note}</p>
                  </div>
                )}

                {/* Shopping list summary */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-2">Your Shopping List</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• 2x <strong>{fit.lowBeam}</strong> low beam bulbs</li>
                    {fit.highBeam !== fit.lowBeam && <li>• 2x <strong>{fit.highBeam}</strong> high beam bulbs</li>}
                    {fit.fogLight && <li>• 2x <strong>{fit.fogLight}</strong> fog light bulbs</li>}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/tools/wiper-blade-size-finder" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Wiper blade sizes</p>
                    <ChevronRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                  </Link>
                  <Link href="/tools/ai-mechanic" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group">
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Ask AI Mechanic</p>
                    <ChevronRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-500" />
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
