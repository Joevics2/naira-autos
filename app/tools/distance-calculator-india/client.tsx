'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { IN_TOWNS } from '@/lib/distance-towns-in';
import { IN_CAPITAL_DISTANCE_KM } from '@/lib/in-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-india',
  towns: IN_TOWNS,
  verifiedMatrix: IN_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Delhi', to: 'Mumbai' },
    { from: 'Mumbai', to: 'Chennai' },
    { from: 'Chennai', to: 'Kolkata' },
    { from: 'Kolkata', to: 'Delhi' },
    { from: 'Bengaluru', to: 'Chennai' },
    { from: 'Delhi', to: 'Jaipur' },
    { from: 'Mumbai', to: 'Pune' },
    { from: 'Bengaluru', to: 'Hyderabad' },
  ],
  defaultFrom: 'Delhi',
  defaultTo: 'Mumbai',
  currencySymbol: '₹',
  pumpPricePresets: [95, 100, 105, 110, 115],
  defaultPumpPrice: 105,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator-global', label: 'Fuel cost calculator (Global)' },
  ],
};

export default function DistanceCalculatorIndiaClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
