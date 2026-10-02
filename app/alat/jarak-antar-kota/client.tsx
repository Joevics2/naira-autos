'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { ID_TOWNS } from '@/lib/distance-towns-id';
import { ID_CAPITAL_DISTANCE_KM } from '@/lib/id-distance-matrix';
import { ID_STRINGS } from '@/lib/distance-strings-id';

const CONFIG: DistanceCalcConfig = {
  basePath: '/alat/jarak-antar-kota',
  towns: ID_TOWNS,
  verifiedMatrix: ID_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Jakarta', to: 'Bandung' },
    { from: 'Jakarta', to: 'Surabaya' },
    { from: 'Surabaya', to: 'Malang' },
    { from: 'Jakarta', to: 'Semarang' },
    { from: 'Jakarta', to: 'Yogyakarta' },
    { from: 'Bandung', to: 'Yogyakarta' },
    { from: 'Semarang', to: 'Surabaya' },
    { from: 'Jakarta', to: 'Bogor' },
  ],
  defaultFrom: 'Jakarta',
  defaultTo: 'Bandung',
  currencySymbol: 'Rp',
  pumpPricePresets: [10000, 12500, 13000, 14000, 15000],
  defaultPumpPrice: 12500,
  strings: ID_STRINGS,
  relatedTools: [
    { href: '/tools/distance-calculator-countries', label: 'English version', highlight: true },
  ],
};

export default function DistanceCalculatorIndonesiaClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
