'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { QA_TOWNS } from '@/lib/distance-towns-qa';
import { QA_CAPITAL_DISTANCE_KM } from '@/lib/qa-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-qatar',
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
  currencySymbol: 'QAR',
  pumpPricePresets: [1.8, 1.9, 2.1, 2.3, 2.5],
  defaultPumpPrice: 2.1,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator-global', label: 'Fuel cost calculator (Global)' },
  ],
};

export default function DistanceCalculatorQatarClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
