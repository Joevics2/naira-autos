'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { QA_TOWNS } from '@/lib/distance-towns-qa';
import { QA_CAPITAL_DISTANCE_KM } from '@/lib/qa-distance-matrix';
import { AR_STRINGS } from '@/lib/distance-strings-ar';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-qatar-arabic',
  towns: QA_TOWNS,
  verifiedMatrix: QA_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Doha', to: 'Al Khor' },
    { from: 'Doha', to: 'Al Wakrah' },
    { from: 'Doha', to: 'Al Ruwais' },
    { from: 'Doha', to: 'Dukhan' },
    { from: 'Doha', to: 'Mesaieed' },
    { from: 'Doha', to: 'Al Shahaniya' },
  ],
  defaultFrom: 'Doha',
  defaultTo: 'Al Khor',
  currencySymbol: 'ر.ق',
  pumpPricePresets: [1.8, 1.9, 2.1, 2.3, 2.5],
  defaultPumpPrice: 2.1,
  strings: AR_STRINGS,
  dir: 'rtl',
  relatedTools: [
    { href: '/tools/distance-calculator-qatar', label: 'English version', highlight: true },
  ],
};

export default function DistanceCalculatorQatarArabicClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
