'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#080C10] border-t border-white/10 px-4 py-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-white/60 max-w-xl">
        We use cookies for analytics and to serve relevant ads via Google AdSense.{' '}
        <Link href="/privacy" className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300 transition-colors">
          Learn more
        </Link>
      </p>
      <button
        onClick={accept}
        className="shrink-0 bg-emerald-600 hover:bg-emerald-500 transition-colors text-white text-xs font-semibold px-5 py-2 rounded-md"
      >
        Got it
      </button>
    </div>
  );
}
