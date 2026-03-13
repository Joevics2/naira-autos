'use client';

import { usePathname } from 'next/navigation';
import { BottomNav } from '@/components/layout/BottomNav';

export function ConditionalBottomNav() {
  const pathname = usePathname();
  
  const hideOnPaths = [
    '/listing/',
    '/add-listing',
    '/listing/edit',
    '/requests/create',
  ];
  
  const shouldHide = hideOnPaths.some(path => pathname.startsWith(path));
  
  if (shouldHide) return null;
  
  return <BottomNav />;
}
