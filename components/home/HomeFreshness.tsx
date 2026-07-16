'use client';

import { useEffect } from 'react';

// The homepage is a fully static server component with no client state,
// which makes it a prime candidate for the browser's back/forward cache
// (bfcache) — and, on mobile, for being frozen in the background and
// silently resumed later. When that happens the browser repaints the
// exact DOM/CSS snapshot it froze earlier instead of doing a fresh
// navigation, which is what causes the "disfigured" layout users see when
// they reopen a tab that's been idle for a while. A normal in-app
// navigation (click to another page and back) forces React to re-render
// from scratch, which is why that "fixes" it.
//
// The standard fix is to detect a bfcache restore via the `pageshow`
// event's `persisted` flag, and to detect a long-idle tab resuming via
// `visibilitychange`, then force a real reload in both cases so the user
// always lands on a freshly rendered page.

const STALE_AFTER_MS = 5 * 60 * 1000; // 5 minutes hidden counts as "idle"

export function HomeFreshness() {
  useEffect(() => {
    let hiddenAt: number | null = null;

    function handlePageShow(event: PageTransitionEvent) {
      // event.persisted is true when the page was restored from bfcache
      // rather than freshly loaded/rendered.
      if (event.persisted) {
        window.location.reload();
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        hiddenAt = Date.now();
      } else if (document.visibilityState === 'visible' && hiddenAt !== null) {
        const hiddenFor = Date.now() - hiddenAt;
        hiddenAt = null;
        if (hiddenFor > STALE_AFTER_MS) {
          window.location.reload();
        }
      }
    }

    window.addEventListener('pageshow', handlePageShow);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}
