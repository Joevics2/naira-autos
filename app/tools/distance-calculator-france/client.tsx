'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { FR_TOWNS } from '@/lib/distance-towns-fr';
import { FR_CAPITAL_DISTANCE_KM } from '@/lib/fr-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-france',
  towns: FR_TOWNS,
  verifiedMatrix: FR_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Paris', to: 'Lyon' },
    { from: 'Lyon', to: 'Marseille' },
    { from: 'Paris', to: 'Marseille' },
    { from: 'Bordeaux', to: 'Toulouse' },
    { from: 'Paris', to: 'Strasbourg' },
    { from: 'Paris', to: 'Bordeaux' },
    { from: 'Paris', to: 'Nice' },
    { from: 'Paris', to: 'Nantes' },
  ],
  defaultFrom: 'Paris',
  defaultTo: 'Lyon',
  currencySymbol: '€',
  pumpPricePresets: [1.55, 1.70, 1.85, 2.00, 2.15],
  defaultPumpPrice: 1.85,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator-global', label: 'Fuel cost calculator (Global)' },
  ],
};

export default function DistanceCalculatorFranceClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
