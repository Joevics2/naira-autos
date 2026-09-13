'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { CA_TOWNS } from '@/lib/distance-towns-ca';
import { CA_CAPITAL_DISTANCE_KM } from '@/lib/ca-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-canada',
  towns: CA_TOWNS,
  verifiedMatrix: CA_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Toronto', to: 'Montreal' },
    { from: 'Toronto', to: 'Windsor' },
    { from: 'Calgary', to: 'Edmonton' },
    { from: 'Toronto', to: 'Vancouver' },
    { from: 'Quebec City', to: 'Montreal' },
    { from: 'Montreal', to: 'Calgary' },
    { from: 'Toronto', to: 'Ottawa' },
    { from: 'Vancouver', to: 'Victoria' },
  ],
  defaultFrom: 'Toronto',
  defaultTo: 'Montreal',
  currencySymbol: 'C$',
  pumpPricePresets: [1.60, 1.70, 1.82, 1.95, 2.10],
  defaultPumpPrice: 1.82,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator-global', label: 'Fuel cost calculator (Global)' },
  ],
};

export default function DistanceCalculatorCanadaClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
