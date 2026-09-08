'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { NL_TOWNS } from '@/lib/distance-towns-nl';
import { NL_CAPITAL_DISTANCE_KM } from '@/lib/nl-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-netherlands',
  towns: NL_TOWNS,
  verifiedMatrix: NL_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Amsterdam', to: 'Rotterdam' },
    { from: 'Amsterdam', to: 'Utrecht' },
    { from: 'Amsterdam', to: 'Eindhoven' },
    { from: 'Utrecht', to: 'Groningen' },
    { from: 'Amsterdam', to: 'The Hague' },
    { from: 'Amsterdam', to: 'Maastricht' },
    { from: 'Rotterdam', to: 'Eindhoven' },
    { from: 'Amsterdam', to: 'Groningen' },
  ],
  defaultFrom: 'Amsterdam',
  defaultTo: 'Rotterdam',
  currencySymbol: '€',
  pumpPricePresets: [1.85, 2.00, 2.10, 2.25, 2.40],
  defaultPumpPrice: 2.10,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator-global', label: 'Fuel cost calculator (Global)' },
  ],
};

export default function DistanceCalculatorNetherlandsClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
