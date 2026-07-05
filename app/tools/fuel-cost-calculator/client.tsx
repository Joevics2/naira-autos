'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Fuel, RotateCcw, ChevronRight, Zap } from 'lucide-react';
import { CURRENCIES, symbolFor, type CurrencyCode } from '@/lib/currencies';

// ── Dataset ───────────────────────────────────────────────────────

const FUEL_DATA: Record<string, Record<string, { city: number; hwy: number; tank: number }>> = {
  Toyota: {
    'Camry 2.4 (2007–2011)':      { city: 11.2, hwy: 7.8,  tank: 70 },
    'Camry 2.5 (2012–2017)':      { city: 10.5, hwy: 7.2,  tank: 70 },
    'Camry 2.5 (2018–2024)':      { city: 9.8,  hwy: 6.7,  tank: 60 },
    'Corolla 1.6 (2003–2008)':    { city: 9.5,  hwy: 6.8,  tank: 50 },
    'Corolla 1.8 (2009–2013)':    { city: 9.8,  hwy: 7.0,  tank: 55 },
    'Corolla 1.8 (2014–2019)':    { city: 9.2,  hwy: 6.5,  tank: 50 },
    'Corolla 2.0 (2020–2024)':    { city: 8.8,  hwy: 6.2,  tank: 50 },
    'Highlander 3.5 (2008–2013)': { city: 14.2, hwy: 10.5, tank: 72 },
    'Highlander 3.5 (2014–2019)': { city: 13.5, hwy: 9.8,  tank: 72 },
    'Highlander 3.5 (2020–2024)': { city: 12.8, hwy: 9.2,  tank: 72 },
    'RAV4 2.5 (2013–2018)':       { city: 11.2, hwy: 8.0,  tank: 60 },
    'RAV4 2.5 (2019–2024)':       { city: 10.5, hwy: 7.5,  tank: 55 },
    'Land Cruiser 4.6 V8':        { city: 18.5, hwy: 13.5, tank: 93 },
    'Land Cruiser Prado 4.0':     { city: 16.2, hwy: 11.8, tank: 87 },
    'Fortuner 2.7':               { city: 13.5, hwy: 10.2, tank: 80 },
    'Venza 3.5':                  { city: 12.5, hwy: 9.0,  tank: 70 },
    'Avalon 3.5':                 { city: 11.5, hwy: 7.8,  tank: 68 },
    'Sienna 3.5':                 { city: 13.8, hwy: 10.2, tank: 77 },
    '4Runner 4.0':                { city: 15.5, hwy: 11.8, tank: 87 },
    'Tacoma 3.5':                 { city: 13.2, hwy: 10.0, tank: 61 },
    'Tundra 5.7':                 { city: 17.0, hwy: 13.5, tank: 100 },
    'Sequoia 5.7':                { city: 18.0, hwy: 14.2, tank: 100 },
  },
  Honda: {
    'Accord 2.4 (2008–2012)':   { city: 10.5, hwy: 7.5,  tank: 65 },
    'Accord 2.4 (2013–2017)':   { city: 10.0, hwy: 7.0,  tank: 65 },
    'Accord 1.5T (2018–2024)':  { city: 9.2,  hwy: 6.5,  tank: 56 },
    'Accord 2.0T (2018–2024)':  { city: 10.5, hwy: 7.5,  tank: 56 },
    'CR-V 2.4 (2007–2011)':     { city: 11.0, hwy: 8.2,  tank: 58 },
    'CR-V 2.4 (2012–2016)':     { city: 10.5, hwy: 7.8,  tank: 58 },
    'CR-V 1.5T (2017–2022)':    { city: 9.8,  hwy: 7.2,  tank: 57 },
    'CR-V 2.0 (2023–2024)':     { city: 9.5,  hwy: 6.8,  tank: 57 },
    'Pilot 3.5 (2009–2015)':    { city: 13.8, hwy: 10.2, tank: 73 },
    'Pilot 3.5 (2016–2022)':    { city: 13.0, hwy: 9.8,  tank: 73 },
    'Civic 1.5T (2016–2021)':   { city: 8.5,  hwy: 6.2,  tank: 47 },
    'Civic 1.5T (2022–2024)':   { city: 8.2,  hwy: 5.8,  tank: 47 },
    'Odyssey 3.5':              { city: 13.5, hwy: 10.0, tank: 76 },
    'HR-V 1.8':                 { city: 9.2,  hwy: 6.8,  tank: 50 },
    'Passport 3.5':             { city: 13.0, hwy: 9.8,  tank: 69 },
  },
  Lexus: {
    'ES 350 (2007–2012)':  { city: 12.0, hwy: 8.5,  tank: 70 },
    'ES 350 (2013–2018)':  { city: 11.5, hwy: 8.0,  tank: 70 },
    'ES 350 (2019–2024)':  { city: 10.8, hwy: 7.5,  tank: 60 },
    'RX 350 (2007–2012)':  { city: 13.5, hwy: 10.0, tank: 72 },
    'RX 350 (2013–2015)':  { city: 13.0, hwy: 9.5,  tank: 72 },
    'RX 350 (2016–2022)':  { city: 12.5, hwy: 9.0,  tank: 72 },
    'RX 350 (2023–2024)':  { city: 11.8, hwy: 8.5,  tank: 65 },
    'GX 460':              { city: 16.5, hwy: 12.5, tank: 87 },
    'LX 570':              { city: 19.0, hwy: 14.5, tank: 93 },
    'LX 600':              { city: 17.5, hwy: 13.0, tank: 93 },
    'NX 200t':             { city: 10.5, hwy: 7.8,  tank: 60 },
    'IS 250':              { city: 11.5, hwy: 8.2,  tank: 66 },
    'IS 350':              { city: 12.5, hwy: 9.0,  tank: 66 },
    'LS 460':              { city: 13.5, hwy: 9.5,  tank: 84 },
  },
  'Mercedes-Benz': {
    'C 300 (W204)':  { city: 12.5, hwy: 8.8,  tank: 66 },
    'C 300 (W205)':  { city: 11.8, hwy: 8.2,  tank: 66 },
    'C 300 (W206)':  { city: 11.0, hwy: 7.8,  tank: 66 },
    'E 350 (W212)':  { city: 13.5, hwy: 9.5,  tank: 80 },
    'E 350 (W213)':  { city: 12.5, hwy: 8.8,  tank: 80 },
    'GLE 350':       { city: 14.5, hwy: 10.8, tank: 80 },
    'GLC 300':       { city: 12.5, hwy: 9.0,  tank: 66 },
    'GLS 450':       { city: 15.5, hwy: 11.5, tank: 100 },
    'ML 350':        { city: 14.0, hwy: 10.2, tank: 95 },
    'GL 450':        { city: 16.0, hwy: 12.0, tank: 100 },
    'S 500':         { city: 15.0, hwy: 10.5, tank: 90 },
    'G-Wagon 5.5':   { city: 20.0, hwy: 15.5, tank: 96 },
  },
  BMW: {
    '3 Series 328i (F30)': { city: 11.5, hwy: 8.0,  tank: 60 },
    '3 Series 330i (G20)': { city: 10.8, hwy: 7.5,  tank: 59 },
    '5 Series 528i (F10)': { city: 12.5, hwy: 8.8,  tank: 70 },
    '5 Series 530i (G30)': { city: 11.5, hwy: 8.0,  tank: 68 },
    'X3 xDrive28i':        { city: 12.0, hwy: 8.5,  tank: 67 },
    'X5 xDrive35i':        { city: 14.5, hwy: 10.5, tank: 85 },
    'X5 xDrive40i':        { city: 13.8, hwy: 9.8,  tank: 83 },
    'X6 xDrive35i':        { city: 15.0, hwy: 11.0, tank: 85 },
    '7 Series 750i':       { city: 15.5, hwy: 11.0, tank: 82 },
    'X1 xDrive28i':        { city: 10.8, hwy: 7.8,  tank: 55 },
  },
  Hyundai: {
    'Sonata 2.4 (2011–2014)':   { city: 10.5, hwy: 7.2,  tank: 70 },
    'Sonata 2.5 (2015–2019)':   { city: 10.0, hwy: 7.0,  tank: 65 },
    'Sonata 2.5 (2020–2024)':   { city: 9.5,  hwy: 6.8,  tank: 65 },
    'Elantra 1.8 (2011–2016)':  { city: 9.2,  hwy: 6.5,  tank: 53 },
    'Elantra 2.0 (2017–2020)':  { city: 9.0,  hwy: 6.2,  tank: 53 },
    'Santa Fe 2.4 (2013–2018)': { city: 12.0, hwy: 8.8,  tank: 71 },
    'Santa Fe 2.5 (2019–2024)': { city: 11.5, hwy: 8.5,  tank: 67 },
    'Tucson 2.0':               { city: 10.5, hwy: 7.8,  tank: 62 },
    'Palisade 3.8':             { city: 14.0, hwy: 10.5, tank: 80 },
  },
  Kia: {
    'Sorento 2.4 (2011–2015)':  { city: 12.0, hwy: 8.8,  tank: 68 },
    'Sorento 3.3 (2016–2020)':  { city: 13.5, hwy: 9.8,  tank: 73 },
    'Sorento 2.5 (2021–2024)':  { city: 11.5, hwy: 8.5,  tank: 67 },
    'Sportage 2.0 (2011–2016)': { city: 10.5, hwy: 7.8,  tank: 55 },
    'Sportage 1.6T (2017–2022)':{ city: 9.8,  hwy: 7.2,  tank: 55 },
    'Telluride 3.8':            { city: 14.0, hwy: 10.5, tank: 80 },
    'Optima 2.4':               { city: 10.5, hwy: 7.5,  tank: 70 },
    'Carnival 3.5':             { city: 14.5, hwy: 11.0, tank: 77 },
  },
  Nissan: {
    'Altima 2.5 (2013–2018)':      { city: 10.2, hwy: 7.2,  tank: 68 },
    'Altima 2.5 (2019–2024)':      { city: 9.8,  hwy: 6.8,  tank: 60 },
    'Pathfinder 3.5 (2013–2021)':  { city: 13.8, hwy: 10.5, tank: 80 },
    'Pathfinder 3.5 (2022–2024)':  { city: 13.0, hwy: 9.8,  tank: 80 },
    'Murano 3.5':                  { city: 12.5, hwy: 9.2,  tank: 71 },
    'Armada 5.6':                  { city: 17.5, hwy: 13.5, tank: 98 },
    'Titan 5.6':                   { city: 17.0, hwy: 13.5, tank: 98 },
    'Xterra 4.0':                  { city: 14.5, hwy: 11.0, tank: 80 },
  },
  Ford: {
    'Explorer 3.5 (2011–2015)':  { city: 14.0, hwy: 10.5, tank: 72 },
    'Explorer 3.5T (2016–2019)': { city: 13.5, hwy: 10.0, tank: 72 },
    'Explorer 3.0T (2020–2024)': { city: 13.0, hwy: 9.5,  tank: 72 },
    'Edge 2.0T':                 { city: 12.0, hwy: 8.8,  tank: 68 },
    'F-150 3.5T':                { city: 14.5, hwy: 11.0, tank: 100 },
    'Expedition 3.5T':           { city: 16.0, hwy: 12.0, tank: 104 },
    'Escape 1.5T':               { city: 10.5, hwy: 7.8,  tank: 57 },
    'Ranger 2.3T':               { city: 12.5, hwy: 9.5,  tank: 65 },
  },
  Chevrolet: {
    'Malibu 1.5T':      { city: 9.8,  hwy: 6.8,  tank: 63 },
    'Traverse 3.6':     { city: 14.5, hwy: 11.0, tank: 83 },
    'Equinox 1.5T':     { city: 10.5, hwy: 7.8,  tank: 60 },
    'Tahoe 5.3 (2015–2020)': { city: 17.5, hwy: 13.5, tank: 98 },
    'Tahoe 5.3 (2021–2024)': { city: 17.0, hwy: 13.0, tank: 98 },
    'Suburban 5.3':     { city: 17.8, hwy: 14.0, tank: 117 },
    'Silverado 5.3':    { city: 16.5, hwy: 13.0, tank: 98 },
    'Captiva 2.4':      { city: 12.0, hwy: 9.0,  tank: 67 },
    'Trailblazer 1.3T': { city: 9.8,  hwy: 7.2,  tank: 45 },
  },
  Jeep: {
    'Grand Cherokee 3.6 (2011–2021)': { city: 14.5, hwy: 10.8, tank: 83 },
    'Grand Cherokee 3.6 (2022–2024)': { city: 14.0, hwy: 10.5, tank: 80 },
    'Grand Cherokee 5.7 (Hemi)':      { city: 17.5, hwy: 13.0, tank: 83 },
    'Wrangler 3.6': { city: 15.5, hwy: 12.0, tank: 70 },
    'Compass 2.4':  { city: 12.0, hwy: 8.8,  tank: 56 },
    'Commander 4.7':{ city: 16.5, hwy: 12.5, tank: 87 },
  },
  'Land Rover': {
    'Range Rover Sport 3.0': { city: 16.0, hwy: 12.0, tank: 105 },
    'Range Rover 4.4 D':     { city: 15.5, hwy: 11.5, tank: 105 },
    'Discovery Sport 2.0T':  { city: 12.5, hwy: 9.5,  tank: 65 },
    'Discovery 3.0':         { city: 15.0, hwy: 11.0, tank: 90 },
    'Defender 90 2.0T':      { city: 13.5, hwy: 10.0, tank: 90 },
    'LR4 3.0':               { city: 16.0, hwy: 12.0, tank: 90 },
  },
  Acura: {
    'MDX 3.5 (2014–2020)': { city: 13.0, hwy: 9.5,  tank: 73 },
    'MDX 3.5 (2021–2024)': { city: 12.5, hwy: 9.0,  tank: 73 },
    'RDX 2.0T':            { city: 11.0, hwy: 8.0,  tank: 57 },
    'TLX 2.0T':            { city: 10.5, hwy: 7.5,  tank: 57 },
    'TSX 2.4':             { city: 10.0, hwy: 7.2,  tank: 65 },
    'TL 3.5':              { city: 11.5, hwy: 8.2,  tank: 70 },
  },
  Infiniti: {
    'QX60 3.5':  { city: 13.5, hwy: 10.0, tank: 80 },
    'QX80 5.6':  { city: 17.5, hwy: 13.5, tank: 98 },
    'QX50 2.0T': { city: 11.0, hwy: 8.0,  tank: 62 },
    'Q50 3.0T':  { city: 12.0, hwy: 8.5,  tank: 65 },
    'FX35':      { city: 13.5, hwy: 10.2, tank: 80 },
  },
  Volkswagen: {
    'Tiguan 2.0T (2009–2017)': { city: 12.5, hwy: 9.2,  tank: 64 },
    'Tiguan 2.0T (2018–2024)': { city: 11.8, hwy: 8.8,  tank: 59 },
    'Touareg 3.6':             { city: 14.5, hwy: 10.8, tank: 90 },
    'Passat 2.5':              { city: 11.5, hwy: 8.0,  tank: 70 },
    'Atlas 2.0T':              { city: 13.5, hwy: 10.0, tank: 70 },
  },
  Peugeot: {
    '504 2.0 (Classic)': { city: 13.5, hwy: 10.5, tank: 65 },
    '508 1.6T':          { city: 10.5, hwy: 7.8,  tank: 65 },
    '3008 1.6T':         { city: 11.0, hwy: 8.2,  tank: 52 },
    '5008 2.0':          { city: 12.5, hwy: 9.5,  tank: 73 },
    '2008 1.2T':         { city: 9.5,  hwy: 7.0,  tank: 50 },
    '407 2.0':           { city: 11.5, hwy: 8.5,  tank: 65 },
  },
  Mitsubishi: {
    'Outlander 2.4 (2007–2013)': { city: 12.0, hwy: 8.8, tank: 60 },
    'Outlander 2.4 (2014–2021)': { city: 11.5, hwy: 8.5, tank: 60 },
    'Pajero 3.8 V6':             { city: 16.5, hwy: 12.5, tank: 90 },
    'Montero Sport 3.0':         { city: 15.0, hwy: 11.5, tank: 75 },
    'Lancer 2.0':                { city: 10.5, hwy: 7.2,  tank: 59 },
  },
  Porsche: {
    'Cayenne 3.0T (2011–2017)': { city: 15.5, hwy: 11.0, tank: 100 },
    'Cayenne 3.0T (2018–2024)': { city: 14.0, hwy: 10.0, tank: 90 },
    'Macan S 3.0':              { city: 13.5, hwy: 10.0, tank: 65 },
    'Panamera 4.8':             { city: 16.0, hwy: 11.5, tank: 80 },
  },
};

const PUMP_PRICE_CONFIG: Record<CurrencyCode, { min: number; max: number; step: number; presets: number[]; default: number }> = {
  NGN: { min: 500, max: 2000, step: 50,  presets: [800, 950, 1000, 1100, 1500], default: 1000 },
  USD: { min: 0.5, max: 3,    step: 0.05, presets: [0.9, 1.1, 1.3, 1.5, 2.0],   default: 1.3 },
  GBP: { min: 1,   max: 2.5,  step: 0.05, presets: [1.3, 1.4, 1.5, 1.6, 1.8],   default: 1.5 },
  EUR: { min: 1,   max: 2.5,  step: 0.05, presets: [1.4, 1.5, 1.6, 1.7, 1.9],   default: 1.6 },
  CAD: { min: 1,   max: 2.5,  step: 0.05, presets: [1.3, 1.4, 1.5, 1.6, 1.8],   default: 1.5 },
  AUD: { min: 1,   max: 3,    step: 0.05, presets: [1.6, 1.8, 1.9, 2.0, 2.2],   default: 1.9 },
  ZAR: { min: 10,  max: 35,   step: 0.5,  presets: [20, 22, 23, 24, 26],        default: 23 },
  INR: { min: 60,  max: 150,  step: 1,    presets: [90, 95, 100, 105, 110],     default: 100 },
  AED: { min: 1.5, max: 4,    step: 0.05, presets: [2.4, 2.6, 2.8, 3.0, 3.2],   default: 2.8 },
};

const CITY_ROUTES: Record<string, number> = {
  'Lagos → Abuja': 791,
  'Lagos → Ibadan': 128,
  'Lagos → Benin City': 320,
  'Lagos → Port Harcourt': 669,
  'Lagos → Warri': 352,
  'Lagos → Ondo': 282,
  'Abuja → Kaduna': 187,
  'Abuja → Kano': 370,
  'Abuja → Jos': 295,
  'Abuja → Enugu': 370,
  'Abuja → Minna': 155,
  'Port Harcourt → Calabar': 212,
  'Kano → Maiduguri': 550,
  'Enugu → Onitsha': 72,
  'Custom distance': 0,
};

function fmt(n: number, symbol: string) { return symbol + Math.round(n).toLocaleString('en-US'); }

export default function FuelCostClient() {
  const [currency, setCurrency] = useState<CurrencyCode>('NGN');
  const symbol = symbolFor(currency);
  const [selectedBrand, setSelectedBrand] = useState('Toyota');
  const [selectedModel, setSelectedModel] = useState('Camry 2.5 (2012–2017)');
  const [selectedRoute, setSelectedRoute] = useState('Lagos → Abuja');
  const [customDistance, setCustomDistance] = useState('');
  const [driveMode, setDriveMode] = useState<'city' | 'highway' | 'mixed'>('mixed');
  const [pumpPrice, setPumpPrice] = useState(1000);
  const priceConfig = PUMP_PRICE_CONFIG[currency];

  useEffect(() => {
    setPumpPrice(PUMP_PRICE_CONFIG[currency].default);
  }, [currency]);

  useEffect(() => {
    const models = Object.keys(FUEL_DATA[selectedBrand] || {});
    if (models.length > 0 && !FUEL_DATA[selectedBrand]?.[selectedModel]) setSelectedModel(models[0]);
  }, [selectedBrand]);

  const brands = Object.keys(FUEL_DATA).sort();
  const models = Object.keys(FUEL_DATA[selectedBrand] || {});
  const carData = FUEL_DATA[selectedBrand]?.[selectedModel];
  const isEV = carData?.city === 0 && carData?.hwy === 0;

  const distance = selectedRoute === 'Custom distance' ? parseFloat(customDistance) || 0 : CITY_ROUTES[selectedRoute] || 0;

  const calc = useMemo(() => {
    if (!carData || isEV || !distance || !pumpPrice) return null;
    const rate = driveMode === 'city' ? carData.city : driveMode === 'highway' ? carData.hwy : (carData.city + carData.hwy) / 2;
    const litres = (rate / 100) * distance;
    const cost = litres * pumpPrice;
    return { litres, cost, rate, cityL: carData.city, hwyL: carData.hwy, tank: carData.tank };
  }, [carData, isEV, distance, pumpPrice, driveMode]);

  const reset = () => { setSelectedBrand('Toyota'); setSelectedModel('Camry 2.5 (2012–2017)'); setSelectedRoute('Lagos → Abuja'); setCustomDistance(''); setDriveMode('mixed'); setPumpPrice(priceConfig.default); };
  const selectCls = 'w-full h-11 px-3 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all cursor-pointer';

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Currency */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Currency</label>
              <select value={currency} onChange={e => setCurrency(e.target.value as CurrencyCode)} className={selectCls}>
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.symbol} {c.code} — {c.label}</option>
                ))}
              </select>
            </div>

            {/* Brand + Model */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Brand</label>
                <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)} className={selectCls}>
                  {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Model &amp; Year</label>
                <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)} className={selectCls}>
                  {models.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                {carData && !isEV && (
                  <p className="text-xs text-muted-foreground mt-1">City: <strong className="text-foreground">{carData.city}</strong> · Hwy: <strong className="text-foreground">{carData.hwy}</strong> L/100km</p>
                )}
              </div>
            </div>

            {/* Drive mode */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Driving Condition</label>
              <div className="grid grid-cols-3 gap-1.5">
                {([
                  { key: 'city', label: '🏙 City', sub: 'Stop-start' },
                  { key: 'mixed', label: '⚡ Mixed', sub: 'Default' },
                  { key: 'highway', label: '🛣 Highway', sub: 'Open road' },
                ] as const).map(({ key, label, sub }) => (
                  <button key={key} onClick={() => setDriveMode(key)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${driveMode === key ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    <div>{label}</div>
                    <div className="font-normal opacity-70 text-[10px]">{sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Route + Custom */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Route</label>
              <select value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)} className={`${selectCls} mb-2`}>
                {Object.entries(CITY_ROUTES).map(([route, km]) => (
                  <option key={route} value={route}>{route}{km > 0 ? ` — ${km}km` : ''}</option>
                ))}
              </select>
              {selectedRoute === 'Custom distance' && (
                <div className="relative">
                  <input type="number" value={customDistance} onChange={e => setCustomDistance(e.target.value)} placeholder="Enter distance in km"
                    className="w-full h-11 pl-4 pr-10 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-emerald-500 transition-all" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">km</span>
                </div>
              )}
            </div>

            {/* Pump price slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Pump Price / Litre</label>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{symbol}{pumpPrice.toLocaleString()}</span>
              </div>
              <input type="range" min={priceConfig.min} max={priceConfig.max} step={priceConfig.step} value={pumpPrice} onChange={e => setPumpPrice(Number(e.target.value))} className="w-full accent-emerald-500 h-2 rounded-full mb-2" />
              <div className="flex gap-1.5">
                {priceConfig.presets.map(p => (
                  <button key={p} onClick={() => setPumpPrice(p)}
                    className={`text-xs py-1 rounded-lg border transition-all font-medium flex-1 ${pumpPrice === p ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={reset} className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-3 space-y-3">
            {isEV ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-3">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-sm font-bold text-foreground mb-1">Electric Vehicle</p>
                <p className="text-xs text-muted-foreground">No fuel cost to calculate for this model.</p>
              </div>
            ) : !calc ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                  <Fuel className="h-6 w-6 text-emerald-500/50" />
                </div>
                <p className="text-xs text-muted-foreground">Select a car and route — results update live.</p>
              </div>
            ) : (
              <>
                {/* Hero */}
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">
                    Fuel Cost — {selectedRoute !== 'Custom distance' ? selectedRoute : `${distance}km`}
                  </p>
                  <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 leading-none"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    {fmt(calc.cost, symbol)}
                  </p>
                  <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-1.5">
                    {calc.litres.toFixed(1)}L × {symbol}{pumpPrice.toLocaleString()}/L · {driveMode === 'city' ? 'City' : driveMode === 'highway' ? 'Highway' : 'Mixed'} · {calc.rate.toFixed(1)}L/100km
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-card border border-border text-center">
                    <p className="text-xs text-muted-foreground mb-1">Litres</p>
                    <p className="text-xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{calc.litres.toFixed(1)}L</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border text-center">
                    <p className="text-xs text-muted-foreground mb-1">Per km</p>
                    <p className="text-xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{symbol}{(calc.cost / distance).toFixed(0)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border text-center">
                    <p className="text-xs text-muted-foreground mb-1">Tank fill</p>
                    <p className="text-xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                      {calc.tank > 0 ? `${Math.ceil(calc.litres / calc.tank)}x` : '—'}
                    </p>
                  </div>
                </div>

                {/* Tank bar */}
                {calc.tank > 0 && (
                  <div className="rounded-xl border border-border bg-card p-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>Tank usage</span>
                      <span>{((calc.litres / calc.tank) * 100).toFixed(0)}% of {calc.tank}L</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${calc.litres / calc.tank > 0.9 ? 'bg-red-500' : calc.litres / calc.tank > 0.6 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.min((calc.litres / calc.tank) * 100, 100)}%` }} />
                    </div>
                    {calc.litres > calc.tank && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">Needs {Math.ceil(calc.litres / calc.tank)} fill-ups for this route</p>
                    )}
                  </div>
                )}

                {/* City vs Highway comparison */}
                <div className="rounded-xl border border-border bg-card p-3">
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-2.5">City vs Highway</p>
                  <div className="space-y-2">
                    {[
                      { label: '🏙 City', rate: calc.cityL },
                      { label: '⚡ Mixed', rate: (calc.cityL + calc.hwyL) / 2 },
                      { label: '🛣 Highway', rate: calc.hwyL },
                    ].map(({ label, rate }) => {
                      const cost = (rate / 100) * distance * pumpPrice;
                      return (
                        <div key={label} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-foreground font-medium w-20">{label}</span>
                            <span className="text-xs text-muted-foreground">{rate.toFixed(1)}L/100km</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-foreground">{fmt(cost, symbol)}</span>
                            <span className="text-xs text-muted-foreground ml-2">{((rate / 100) * distance).toFixed(1)}L</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/tools/auto-loan-calculator" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Loan calculator</p>
                    <ChevronRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                  </Link>
                  <Link href="/listings" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group">
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Browse cars</p>
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