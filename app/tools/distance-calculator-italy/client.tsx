'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { IT_TOWNS } from '@/lib/distance-towns-it';
import { IT_CAPITAL_DISTANCE_KM } from '@/lib/it-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-italy',
  towns: IT_TOWNS,
  verifiedMatrix: IT_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Milan', to: 'Naples' },
    { from: 'Milan', to: 'Turin' },
    { from: 'Milan', to: 'Bologna' },
    { from: 'Milan', to: 'Genoa' },
    { from: 'Rome', to: 'Milan' },
    { from: 'Rome', to: 'Naples' },
    { from: 'Rome', to: 'Florence' },
    { from: 'Milan', to: 'Venice' },
  ],
  defaultFrom: 'Milan',
  defaultTo: 'Naples',
  currencySymbol: '€',
  pumpPricePresets: [1.60, 1.75, 1.90, 2.05, 2.20],
  defaultPumpPrice: 1.90,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator-global', label: 'Fuel cost calculator (Global)' },
  ],
};

export default function DistanceCalculatorItalyClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
