'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { KE_TOWNS } from '@/lib/distance-towns-ke';
import { KE_CAPITAL_DISTANCE_KM } from '@/lib/ke-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-kenya',
  towns: KE_TOWNS,
  verifiedMatrix: KE_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Nairobi', to: 'Mombasa' },
    { from: 'Nairobi', to: 'Kisumu' },
    { from: 'Nairobi', to: 'Nakuru' },
    { from: 'Nairobi', to: 'Eldoret' },
    { from: 'Mombasa', to: 'Malindi' },
    { from: 'Nairobi', to: 'Nyeri' },
    { from: 'Nairobi', to: 'Garissa' },
    { from: 'Mombasa', to: 'Garissa' },
  ],
  defaultFrom: 'Nairobi',
  defaultTo: 'Mombasa',
  currencySymbol: 'KSh',
  pumpPricePresets: [180, 200, 215, 230, 250],
  defaultPumpPrice: 215,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator-global', label: 'Fuel cost calculator (Global)' },
  ],
};

export default function DistanceCalculatorKenyaClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
