'use client';

import { usePathname } from 'next/navigation';
import { BottomNav } from '@/components/layout/BottomNav';

// Bottom nav appears ONLY on these exact routes — not on any sub-pages
const SHOW_ON_PATHS = ['/', '/tools', '/vehicles', '/guides', '/blog'];

export function ConditionalBottomNav() {
  const pathname = usePathname();
  const shouldShow = SHOW_ON_PATHS.includes(pathname);
  if (!shouldShow) return null;
  return <BottomNav />;
}