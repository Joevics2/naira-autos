'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { ES_TOWNS } from '@/lib/distance-towns-es';
import { ES_CAPITAL_DISTANCE_KM } from '@/lib/es-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-spain',
  towns: ES_TOWNS,
  verifiedMatrix: ES_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Madrid', to: 'Barcelona' },
    { from: 'Madrid', to: 'Valencia' },
    { from: 'Valencia', to: 'Seville' },
    { from: 'Madrid', to: 'A Coruña' },
    { from: 'Madrid', to: 'Seville' },
    { from: 'Madrid', to: 'Málaga' },
    { from: 'Barcelona', to: 'Valencia' },
    { from: 'Madrid', to: 'Bilbao' },
  ],
  defaultFrom: 'Madrid',
  defaultTo: 'Barcelona',
  currencySymbol: '€',
  pumpPricePresets: [1.45, 1.60, 1.70, 1.85, 2.00],
  defaultPumpPrice: 1.70,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator-global', label: 'Fuel cost calculator (Global)' },
  ],
};

export default function DistanceCalculatorSpainClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
