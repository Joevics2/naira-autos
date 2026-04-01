'use client';

import { usePathname } from 'next/navigation';
import { BottomNav } from '@/components/layout/BottomNav';

export function ConditionalBottomNav() {
  const pathname = usePathname();
  
  const hideOnPaths = [
    '/listing/',           // All individual listing pages (e.g. /listing/abc-123)
    '/add-listing',        // Create new listing
    '/app/evaluate-car',
    '/cars/',
    '/trucks/',
    '/vans/',
    '/motorcycles/',
    '/listing/edit',       // Edit listing
    '/requests/create',    // Create request

    // === NEW PAGES TO HIDE BOTTOM NAV ===
    '/evaluate-car',
    '/tools/ai-mechanic',
    '/tools/import-duty-calculator',
    '/tools/auto-loan-calculator',
    '/tools/best-car-for',
    '/tools/car-comparison',
    '/tools/fuel-cost-calculator',
    '/tools/insurance-calculator',
    '/tools/registration-fee-calculator',
    '/tools/road-trip-calculator',
    '/tools/vehicle-papers-checklist',
    '/tools/vin-checker',
    '/tools/glossary',
    '/blog',
  ];
  
  const shouldHide = hideOnPaths.some(path => pathname.startsWith(path));
  
  if (shouldHide) return null;
  
  return <BottomNav />;
}