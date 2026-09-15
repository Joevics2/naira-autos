'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { PH_TOWNS } from '@/lib/distance-towns-ph';
import { PH_CAPITAL_DISTANCE_KM } from '@/lib/ph-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-philippines',
  towns: PH_TOWNS,
  verifiedMatrix: PH_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Manila', to: 'Baguio' },
    { from: 'Manila', to: 'Legazpi' },
    { from: 'Manila', to: 'Batangas' },
    { from: 'Manila', to: 'Angeles City' },
    { from: 'Manila', to: 'Lucena' },
    { from: 'Cebu City', to: 'Lapu-Lapu City' },
    { from: 'Davao', to: 'General Santos' },
    { from: 'Manila', to: 'Olongapo' },
  ],
  defaultFrom: 'Manila',
  defaultTo: 'Baguio',
  currencySymbol: '₱',
  pumpPricePresets: [70, 80, 90, 100, 110],
  defaultPumpPrice: 82,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator-global', label: 'Fuel cost calculator (Global)' },
  ],
};

export default function DistanceCalculatorPhilippinesClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
