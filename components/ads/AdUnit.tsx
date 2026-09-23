'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdUnitProps {
  /** data-ad-slot value from the AdSense unit */
  slot: string;
  /** data-ad-format value. Defaults to 'auto' (standard display unit). */
  format?: string;
  /** data-ad-layout value, e.g. 'in-article'. Omit for standard display units. */
  layout?: string;
  /** Adds data-full-width-responsive="true". Defaults on for display units. */
  fullWidthResponsive?: boolean;
  className?: string;
}

function AdUnitInner({
  slot,
  format = 'auto',
  layout,
  fullWidthResponsive = true,
  className = '',
}: AdUnitProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // adsbygoogle.js may not have loaded yet (blocked, slow network,
      // consent denied) — fail silently rather than crash the page.
      console.error('AdSense push failed', e);
    }
    // Mount-only: this component is remounted per-route by the `key` set
    // in the exported AdUnit wrapper below, so this effect firing once
    // per mount is exactly one push per route, which is what AdSense expects.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: 'block' }}
      data-ad-client="ca-pub-2042049454847724"
      data-ad-slot={slot}
      data-ad-format={format}
      {...(layout ? { 'data-ad-layout': layout } : {})}
      {...(fullWidthResponsive ? { 'data-full-width-responsive': 'true' } : {})}
    />
  );
}

// Next.js client-side navigation keeps this component's underlying DOM
// node alive across route changes instead of unmounting it (no full page
// reload). AdSense's adsbygoogle.push({}) call fills a slot exactly once
// per <ins> element — call it twice on the same node and it throws
// "already have ads in this slot" and stops serving. Keying on pathname
// forces React to tear down and recreate a fresh <ins> on every route
// change, so each page genuinely gets its own single push.
export function AdUnit(props: AdUnitProps) {
  const pathname = usePathname();
  return <AdUnitInner key={pathname} {...props} />;
}
