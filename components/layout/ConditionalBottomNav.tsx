'use client';

import { usePathname } from 'next/navigation';
import { BottomNav } from '@/components/layout/BottomNav';
import { hasBottomNav } from '@/lib/bottom-nav-routes';

export function ConditionalBottomNav() {
  const pathname = usePathname();
  const shouldShow = hasBottomNav(pathname);
  if (!shouldShow) return null;
  return <BottomNav />;
}