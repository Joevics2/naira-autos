'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { AU_TOWNS } from '@/lib/distance-towns-au';
import { AU_CAPITAL_DISTANCE_KM } from '@/lib/au-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-australia',
  towns: AU_TOWNS,
  verifiedMatrix: AU_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Sydney', to: 'Melbourne' },
    { from: 'Sydney', to: 'Brisbane' },
    { from: 'Brisbane', to: 'Cairns' },
    { from: 'Melbourne', to: 'Perth' },
    { from: 'Sydney', to: 'Perth' },
    { from: 'Sydney', to: 'Canberra' },
    { from: 'Melbourne', to: 'Adelaide' },
    { from: 'Perth', to: 'Adelaide' },
  ],
  defaultFrom: 'Sydney',
  defaultTo: 'Melbourne',
  currencySymbol: 'A$',
  pumpPricePresets: [1.80, 1.95, 2.05, 2.20, 2.35],
  defaultPumpPrice: 2.05,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator-global', label: 'Fuel cost calculator (Global)' },
  ],
};

export default function DistanceCalculatorAustraliaClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
