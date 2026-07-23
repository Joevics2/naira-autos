'use client';

import { ValuationInline } from '@/components/valuation/ValuationFlow';

export function EvaluateCarClient() {
  // ValuationInline already calls /api/car-valuation — same endpoint as the hero
  return <ValuationInline onClose={() => {}} market="ng" />;
}
