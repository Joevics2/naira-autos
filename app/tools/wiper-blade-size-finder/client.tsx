'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Droplets, RotateCcw, ChevronRight, Info } from 'lucide-react';

// ── Dataset ───────────────────────────────────────────────────────
// Sizes are OEM reference sizes in inches. Always confirm against your
// vehicle's existing blades or owner's manual before ordering — some
// trims and model years vary.

interface WiperFitment {
  driver: number;    // inches
  passenger: number; // inches
  rear?: number;      // inches
  connector: string;
}

const CONNECTOR_KEYS = [
  'Hook (U-Slot)',
  'Pinch Tab',
  'Side Pin',
  'Bayonet',
] as const;

const CONNECTOR_INFO: Record<string, string> = {
  'Hook (U-Slot)': 'The most common fitting worldwide. A J-shaped hook on the wiper arm slots into a U-shaped channel on the blade. Fits most universal replacement blades.',
  'Pinch Tab': 'A push-button tab on the underside of the blade squeezes to release from a flat hook arm. Common on newer Ford, GM, and European models.',
  'Side Pin': 'A small pin on the arm slots through a side hole in the blade — common on Honda, Nissan, and Subaru. Needs a side-pin-specific or universal adapter.',
  'Bayonet': 'A flat, wide arm with a locking bayonet clip — standard on Volkswagen, Audi, and most modern European cars.',
};

const WIPER_DATA: Record<string, Record<string, WiperFitment>> = {
  Toyota: {
    'Camry (2007–2011)':   { driver: 24, passenger: 21, connector: 'Hook (U-Slot)' },
    'Camry (2012–2017)':   { driver: 26, passenger: 20, connector: 'Hook (U-Slot)' },
    'Camry (2018–2024)':   { driver: 26, passenger: 19, connector: 'Pinch Tab' },
    'Corolla (2014–2019)': { driver: 26, passenger: 16, connector: 'Hook (U-Slot)' },
    'Corolla (2020–2024)': { driver: 26, passenger: 16, rear: 12, connector: 'Pinch Tab' },
    'RAV4 (2013–2018)':    { driver: 26, passenger: 16, rear: 12, connector: 'Hook (U-Slot)' },
    'RAV4 (2019–2024)':    { driver: 26, passenger: 16, rear: 12, connector: 'Pinch Tab' },
    'Highlander (2014–2019)': { driver: 26, passenger: 20, rear: 12, connector: 'Hook (U-Slot)' },
    'Land Cruiser 200':    { driver: 26, passenger: 20, connector: 'Hook (U-Slot)' },
    'Land Cruiser Prado':  { driver: 22, passenger: 20, rear: 12, connector: 'Hook (U-Slot)' },
    'Hilux (2016–2024)':   { driver: 24, passenger: 18, connector: 'Hook (U-Slot)' },
    'Yaris':                { driver: 24, passenger: 14, connector: 'Hook (U-Slot)' },
    'Sienna':               { driver: 26, passenger: 21, rear: 14, connector: 'Hook (U-Slot)' },
    'Hiace':                { driver: 22, passenger: 22, connector: 'Hook (U-Slot)' },
  },
  Honda: {
    'Accord (2008–2012)': { driver: 26, passenger: 19, connector: 'Side Pin' },
    'Accord (2013–2017)': { driver: 26, passenger: 19, connector: 'Side Pin' },
    'Accord (2018–2024)': { driver: 26, passenger: 19, connector: 'Side Pin' },
    'Civic (2012–2015)':  { driver: 26, passenger: 16, connector: 'Side Pin' },
    'Civic (2016–2021)':  { driver: 26, passenger: 16, connector: 'Side Pin' },
    'Civic (2022–2024)':  { driver: 26, passenger: 16, connector: 'Pinch Tab' },
    'CR-V (2012–2016)':   { driver: 26, passenger: 16, rear: 14, connector: 'Side Pin' },
    'CR-V (2017–2022)':   { driver: 26, passenger: 16, rear: 12, connector: 'Side Pin' },
    'Pilot':                { driver: 26, passenger: 20, rear: 14, connector: 'Side Pin' },
    'Odyssey':              { driver: 26, passenger: 24, rear: 12, connector: 'Side Pin' },
    'HR-V':                 { driver: 26, passenger: 16, rear: 12, connector: 'Side Pin' },
  },
  Ford: {
    'F-150 (2015–2020)':  { driver: 24, passenger: 24, connector: 'Hook (U-Slot)' },
    'F-150 (2021–2024)':  { driver: 24, passenger: 24, connector: 'Hook (U-Slot)' },
    'Focus':                { driver: 24, passenger: 17, connector: 'Pinch Tab' },
    'Fusion':               { driver: 26, passenger: 17, connector: 'Hook (U-Slot)' },
    'Escape (2013–2019)': { driver: 28, passenger: 28, connector: 'Pinch Tab' },
    'Escape (2020–2024)': { driver: 28, passenger: 28, connector: 'Pinch Tab' },
    'Explorer':             { driver: 26, passenger: 24, rear: 16, connector: 'Pinch Tab' },
    'Edge':                 { driver: 26, passenger: 19, connector: 'Pinch Tab' },
    'Ranger':               { driver: 20, passenger: 20, connector: 'Hook (U-Slot)' },
  },
  Chevrolet: {
    'Silverado 1500 (2014–2018)': { driver: 26, passenger: 22, connector: 'Hook (U-Slot)' },
    'Silverado 1500 (2019–2024)': { driver: 26, passenger: 22, connector: 'Hook (U-Slot)' },
    'Malibu':          { driver: 26, passenger: 22, connector: 'Pinch Tab' },
    'Cruze':            { driver: 26, passenger: 18, connector: 'Pinch Tab' },
    'Equinox':          { driver: 26, passenger: 20, connector: 'Pinch Tab' },
    'Tahoe / Suburban': { driver: 22, passenger: 22, connector: 'Hook (U-Slot)' },
    'Camaro':           { driver: 24, passenger: 20, connector: 'Pinch Tab' },
  },
  Nissan: {
    'Altima (2013–2018)': { driver: 26, passenger: 18, connector: 'Hook (U-Slot)' },
    'Altima (2019–2024)': { driver: 26, passenger: 18, connector: 'Hook (U-Slot)' },
    'Sentra':               { driver: 24, passenger: 16, connector: 'Hook (U-Slot)' },
    'Rogue':                { driver: 26, passenger: 16, rear: 12, connector: 'Hook (U-Slot)' },
    'Pathfinder':           { driver: 26, passenger: 18, rear: 14, connector: 'Hook (U-Slot)' },
    'Patrol':               { driver: 24, passenger: 20, connector: 'Hook (U-Slot)' },
    'Navara / Frontier':    { driver: 20, passenger: 18, connector: 'Hook (U-Slot)' },
  },
  Hyundai: {
    'Elantra (2017–2020)': { driver: 26, passenger: 14, connector: 'Hook (U-Slot)' },
    'Elantra (2021–2024)': { driver: 26, passenger: 16, connector: 'Hook (U-Slot)' },
    'Sonata':                { driver: 24, passenger: 16, connector: 'Hook (U-Slot)' },
    'Tucson':                { driver: 26, passenger: 16, rear: 12, connector: 'Hook (U-Slot)' },
    'Santa Fe':              { driver: 26, passenger: 18, rear: 14, connector: 'Hook (U-Slot)' },
    'Accent':                { driver: 24, passenger: 14, connector: 'Hook (U-Slot)' },
    'i10':                   { driver: 20, passenger: 14, connector: 'Hook (U-Slot)' },
    'i20':                   { driver: 24, passenger: 14, connector: 'Hook (U-Slot)' },
  },
  Kia: {
    'Optima / K5':   { driver: 24, passenger: 16, connector: 'Hook (U-Slot)' },
    'Sportage':       { driver: 24, passenger: 16, rear: 12, connector: 'Hook (U-Slot)' },
    'Sorento':        { driver: 26, passenger: 18, rear: 14, connector: 'Hook (U-Slot)' },
    'Rio':             { driver: 24, passenger: 14, connector: 'Hook (U-Slot)' },
    'Picanto':         { driver: 18, passenger: 16, connector: 'Hook (U-Slot)' },
    'Cerato / Forte':  { driver: 24, passenger: 14, connector: 'Hook (U-Slot)' },
  },
  Volkswagen: {
    'Golf':    { driver: 24, passenger: 19, connector: 'Bayonet' },
    'Jetta':    { driver: 24, passenger: 19, connector: 'Bayonet' },
    'Passat':   { driver: 24, passenger: 21, connector: 'Bayonet' },
    'Tiguan':   { driver: 24, passenger: 21, rear: 12, connector: 'Bayonet' },
    'Polo':     { driver: 24, passenger: 16, connector: 'Bayonet' },
  },
  BMW: {
    '3 Series': { driver: 24, passenger: 21, connector: 'Pinch Tab' },
    '5 Series': { driver: 24, passenger: 21, connector: 'Pinch Tab' },
    'X3':        { driver: 24, passenger: 21, connector: 'Pinch Tab' },
    'X5':        { driver: 26, passenger: 21, rear: 14, connector: 'Pinch Tab' },
  },
  'Mercedes-Benz': {
    'C-Class (W205)': { driver: 24, passenger: 24, connector: 'Pinch Tab' },
    'E-Class (W213)': { driver: 26, passenger: 26, connector: 'Pinch Tab' },
    'GLE / ML':         { driver: 28, passenger: 28, rear: 12, connector: 'Pinch Tab' },
    'GLC':               { driver: 24, passenger: 24, rear: 12, connector: 'Pinch Tab' },
  },
  Audi: {
    'A4': { driver: 24, passenger: 19, connector: 'Bayonet' },
    'A6': { driver: 25, passenger: 19, connector: 'Bayonet' },
    'Q5': { driver: 25, passenger: 19, rear: 12, connector: 'Bayonet' },
  },
  Mazda: {
    'Mazda3': { driver: 26, passenger: 14, connector: 'Hook (U-Slot)' },
    'Mazda6': { driver: 26, passenger: 18, connector: 'Hook (U-Slot)' },
    'CX-5':    { driver: 26, passenger: 17, rear: 12, connector: 'Hook (U-Slot)' },
  },
  Subaru: {
    'Outback':  { driver: 26, passenger: 17, rear: 16, connector: 'Side Pin' },
    'Forester': { driver: 26, passenger: 17, rear: 16, connector: 'Side Pin' },
    'Impreza':  { driver: 26, passenger: 16, rear: 15, connector: 'Side Pin' },
  },
  Lexus: {
    'RX 350': { driver: 26, passenger: 20, connector: 'Pinch Tab' },
    'ES 350': { driver: 26, passenger: 20, connector: 'Pinch Tab' },
    'GX 460': { driver: 22, passenger: 20, connector: 'Pinch Tab' },
  },
  Peugeot: {
    '208': { driver: 26, passenger: 14, connector: 'Pinch Tab' },
    '308': { driver: 28, passenger: 26, connector: 'Pinch Tab' },
  },
  Mitsubishi: {
    'Lancer':            { driver: 24, passenger: 16, connector: 'Hook (U-Slot)' },
    'Outlander':          { driver: 26, passenger: 16, rear: 12, connector: 'Hook (U-Slot)' },
    'Pajero / Montero':   { driver: 21, passenger: 21, connector: 'Hook (U-Slot)' },
  },
  Suzuki: {
    'Swift':  { driver: 20, passenger: 14, connector: 'Hook (U-Slot)' },
    'Vitara': { driver: 20, passenger: 20, connector: 'Hook (U-Slot)' },
  },
};

function cm(inches: number) { return (inches * 2.54).toFixed(0); }

export default function WiperBladeClient() {
  const [selectedBrand, setSelectedBrand] = useState('Toyota');
  const [selectedModel, setSelectedModel] = useState('Camry (2012–2017)');

  useEffect(() => {
    const models = Object.keys(WIPER_DATA[selectedBrand] || {});
    if (models.length > 0 && !WIPER_DATA[selectedBrand]?.[selectedModel]) setSelectedModel(models[0]);
  }, [selectedBrand]);

  const brands = Object.keys(WIPER_DATA).sort();
  const models = Object.keys(WIPER_DATA[selectedBrand] || {});
  const fit = WIPER_DATA[selectedBrand]?.[selectedModel];

  const reset = () => { setSelectedBrand('Toyota'); setSelectedModel('Camry (2012–2017)'); };
  const selectCls = 'w-full h-11 px-3 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all cursor-pointer';

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
                Sizes are OEM reference sizes and can vary by trim. Measure your existing blade or check your owner&apos;s manual to confirm before ordering.
              </p>
            </div>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-3 space-y-3">
            {!fit ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                  <Droplets className="h-6 w-6 text-emerald-500/50" />
                </div>
                <p className="text-xs text-muted-foreground">Select a make and model — sizes update live.</p>
              </div>
            ) : (
              <>
                {/* Hero */}
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">
                    {selectedBrand} {selectedModel}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-emerald-700/70 dark:text-emerald-400/60 mb-0.5">Driver side</p>
                      <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                        {fit.driver}&Prime;
                      </p>
                      <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-0.5">{cm(fit.driver)}cm</p>
                    </div>
                    <div>
                      <p className="text-xs text-emerald-700/70 dark:text-emerald-400/60 mb-0.5">Passenger side</p>
                      <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                        {fit.passenger}&Prime;
                      </p>
                      <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-0.5">{cm(fit.passenger)}cm</p>
                    </div>
                    {fit.rear && (
                      <div>
                        <p className="text-xs text-emerald-700/70 dark:text-emerald-400/60 mb-0.5">Rear</p>
                        <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                          {fit.rear}&Prime;
                        </p>
                        <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-0.5">{cm(fit.rear)}cm</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Connector */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Connector / Fitting Type</p>
                  <p className="text-sm font-bold text-foreground mb-1.5">{fit.connector}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{CONNECTOR_INFO[fit.connector]}</p>
                </div>

                {/* Shopping list summary */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-2">Your Shopping List</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• 1x <strong>{fit.driver}&Prime;</strong> driver-side blade</li>
                    <li>• 1x <strong>{fit.passenger}&Prime;</strong> passenger-side blade</li>
                    {fit.rear && <li>• 1x <strong>{fit.rear}&Prime;</strong> rear blade</li>}
                    <li className="text-muted-foreground text-xs pt-1">Fitting: {fit.connector}</li>
                  </ul>
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/tools/obd-codes" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">OBD-II code lookup</p>
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
