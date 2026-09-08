'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { US_TOWNS } from '@/lib/distance-towns-us';
import { US_CAPITAL_DISTANCE_KM } from '@/lib/us-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-usa',
  towns: US_TOWNS,
  verifiedMatrix: US_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'New York City', to: 'Los Angeles' },
    { from: 'Chicago', to: 'Houston' },
    { from: 'Chicago', to: 'Miami' },
    { from: 'Los Angeles', to: 'San Francisco' },
    { from: 'New York City', to: 'Philadelphia' },
    { from: 'Dallas', to: 'Houston' },
    { from: 'Seattle', to: 'Portland' },
    { from: 'New York City', to: 'Chicago' },
  ],
  defaultFrom: 'New York City',
  defaultTo: 'Los Angeles',
  currencySymbol: '$',
  pumpPricePresets: [0.90, 1.00, 1.10, 1.20, 1.35],
  defaultPumpPrice: 1.10,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator-global', label: 'Fuel cost calculator (Global)' },
  ],
};

export default function DistanceCalculatorUsaClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
