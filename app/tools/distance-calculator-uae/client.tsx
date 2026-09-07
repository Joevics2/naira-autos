'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { AE_TOWNS } from '@/lib/distance-towns-ae';
import { AE_CAPITAL_DISTANCE_KM } from '@/lib/ae-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-uae',
  towns: AE_TOWNS,
  verifiedMatrix: AE_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Abu Dhabi', to: 'Dubai' },
    { from: 'Dubai', to: 'Sharjah' },
    { from: 'Dubai', to: 'Al Ain' },
    { from: 'Dubai', to: 'Ras Al Khaimah' },
    { from: 'Abu Dhabi', to: 'Al Ain' },
    { from: 'Dubai', to: 'Fujairah' },
    { from: 'Dubai', to: 'Hatta' },
    { from: 'Sharjah', to: 'Ras Al Khaimah' },
  ],
  defaultFrom: 'Abu Dhabi',
  defaultTo: 'Dubai',
  currencySymbol: 'AED',
  pumpPricePresets: [3.0, 3.25, 3.49, 3.75, 4.0],
  defaultPumpPrice: 3.49,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator-global', label: 'Fuel cost calculator (Global)' },
  ],
};

export default function DistanceCalculatorUaeClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
