'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { EG_TOWNS } from '@/lib/distance-towns-eg';
import { EG_CAPITAL_DISTANCE_KM } from '@/lib/eg-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-egypt',
  towns: EG_TOWNS,
  verifiedMatrix: EG_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Cairo', to: 'Alexandria' },
    { from: 'Cairo', to: 'Luxor' },
    { from: 'Cairo', to: 'Aswan' },
    { from: 'Cairo', to: 'Hurghada' },
    { from: 'Cairo', to: 'Sharm El Sheikh' },
    { from: 'Luxor', to: 'Aswan' },
    { from: 'Cairo', to: 'Port Said' },
    { from: 'Hurghada', to: 'Luxor' },
  ],
  defaultFrom: 'Cairo',
  defaultTo: 'Alexandria',
  currencySymbol: 'E£',
  pumpPricePresets: [15, 18, 21, 24, 27],
  defaultPumpPrice: 21,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator-global', label: 'Fuel cost calculator (Global)' },
  ],
};

export default function DistanceCalculatorEgyptClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
