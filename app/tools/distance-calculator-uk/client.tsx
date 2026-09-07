'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { GB_TOWNS } from '@/lib/distance-towns-gb';
import { GB_CAPITAL_DISTANCE_KM } from '@/lib/gb-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-uk',
  towns: GB_TOWNS,
  verifiedMatrix: GB_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'London', to: 'Manchester' },
    { from: 'London', to: 'Edinburgh' },
    { from: 'London', to: 'Birmingham' },
    { from: 'London', to: 'Bristol' },
    { from: 'London', to: 'Glasgow' },
    { from: 'Edinburgh', to: 'Glasgow' },
    { from: 'London', to: 'Cardiff' },
    { from: 'Manchester', to: 'Leeds' },
  ],
  defaultFrom: 'London',
  defaultTo: 'Manchester',
  currencySymbol: '£',
  pumpPricePresets: [1.40, 1.50, 1.63, 1.75, 1.85],
  defaultPumpPrice: 1.63,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator-global', label: 'Fuel cost calculator (Global)' },
  ],
};

export default function DistanceCalculatorUkClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
