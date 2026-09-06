'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { SA_TOWNS } from '@/lib/distance-towns-sa';
import { SA_CAPITAL_DISTANCE_KM } from '@/lib/sa-distance-matrix';
import { AR_STRINGS } from '@/lib/distance-strings-ar';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-saudi-arabia-arabic',
  towns: SA_TOWNS,
  verifiedMatrix: SA_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Riyadh', to: 'Jeddah' },
    { from: 'Makkah', to: 'Madinah' },
    { from: 'Riyadh', to: 'Dammam' },
    { from: 'Jeddah', to: 'Madinah' },
    { from: 'Riyadh', to: 'Makkah' },
    { from: 'Makkah', to: 'Jeddah' },
    { from: 'Riyadh', to: 'Buraydah' },
    { from: "Makkah", to: "Ta'if" },
  ],
  defaultFrom: 'Riyadh',
  defaultTo: 'Jeddah',
  currencySymbol: 'ر.س',
  pumpPricePresets: [2.0, 2.15, 2.33, 2.5, 3.0],
  defaultPumpPrice: 2.33,
  strings: AR_STRINGS,
  dir: 'rtl',
  relatedTools: [
    { href: '/tools/distance-calculator-saudi-arabia', label: 'English version', highlight: true },
  ],
};

export default function DistanceCalculatorSaudiArabiaArClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
