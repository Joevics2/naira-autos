'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { ZA_TOWNS } from '@/lib/distance-towns-za';
import { ZA_CAPITAL_DISTANCE_KM } from '@/lib/za-distance-matrix';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tools/distance-calculator-south-africa',
  towns: ZA_TOWNS,
  verifiedMatrix: ZA_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Johannesburg', to: 'Durban' },
    { from: 'Cape Town', to: 'Johannesburg' },
    { from: 'Johannesburg', to: 'Pretoria' },
    { from: 'Bloemfontein', to: 'Gqeberha' },
    { from: 'Durban', to: 'Cape Town' },
    { from: 'Bloemfontein', to: 'Polokwane' },
    { from: 'Mahikeng', to: 'Bloemfontein' },
    { from: 'Bloemfontein', to: 'Mbombela' },
  ],
  defaultFrom: 'Johannesburg',
  defaultTo: 'Durban',
  currencySymbol: 'R',
  pumpPricePresets: [22, 24, 26, 28, 30],
  defaultPumpPrice: 26,
  relatedTools: [
    { href: '/tools/road-trip-calculator', label: 'Road trip calculator', highlight: true },
    { href: '/tools/fuel-cost-calculator-global', label: 'Fuel cost calculator (Global)' },
  ],
};

export default function DistanceCalculatorSouthAfricaClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
