'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { NG_TOWNS } from '@/lib/distance-towns-ng';
import { NG_CAPITAL_DISTANCE_KM } from '@/lib/ng-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator',
  towns: NG_TOWNS,
  verifiedMatrix: NG_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Lagos', to: 'Abuja' },
    { from: 'Lagos', to: 'Port Harcourt' },
    { from: 'Abuja', to: 'Kano' },
    { from: 'Lagos', to: 'Ibadan' },
    { from: 'Enugu', to: 'Abuja' },
    { from: 'Benin City', to: 'Warri' },
    { from: 'Kano', to: 'Port Harcourt' },
    { from: 'Abuja', to: 'Maiduguri' },
  ],
  defaultFrom: 'Lagos',
  defaultTo: 'Abuja',
  currencySymbol: '₦',
  pumpPricePresets: [800, 950, 1000, 1100, 1500],
  defaultPumpPrice: 1000,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator', label: 'Fuel cost calculator' },
  ],
};

export default function DistanceCalculatorClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
