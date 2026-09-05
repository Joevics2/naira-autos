'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { GH_TOWNS } from '@/lib/distance-towns-gh';
import { GH_CAPITAL_DISTANCE_KM } from '@/lib/gh-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-ghana',
  towns: GH_TOWNS,
  verifiedMatrix: GH_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Accra', to: 'Kumasi' },
    { from: 'Accra', to: 'Tamale' },
    { from: 'Accra', to: 'Sekondi-Takoradi' },
    { from: 'Accra', to: 'Cape Coast' },
    { from: 'Kumasi', to: 'Tamale' },
    { from: 'Accra', to: 'Ho' },
    { from: 'Accra', to: 'Wa' },
    { from: 'Kumasi', to: 'Bolgatanga' },
  ],
  defaultFrom: 'Accra',
  defaultTo: 'Kumasi',
  currencySymbol: 'GH₵',
  pumpPricePresets: [12, 14, 16, 18, 20],
  defaultPumpPrice: 16,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator-global', label: 'Fuel cost calculator (Global)' },
  ],
};

export default function DistanceCalculatorGhanaClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
