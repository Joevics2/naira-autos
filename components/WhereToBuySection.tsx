'use client';

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { WHERE_TO_BUY_COUNTRIES, WHERE_TO_BUY_BY_COUNTRY } from '@/lib/vehicle-helpers';

export function WhereToBuySection() {
  const [country, setCountry] = useState<string>('global');
  const places = WHERE_TO_BUY_BY_COUNTRY[country] ?? WHERE_TO_BUY_BY_COUNTRY.global;

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-3">Where to Buy Parts</h2>

      {/* Country selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 hide-scrollbar">
        {WHERE_TO_BUY_COUNTRIES.map((c) => (
          <button
            key={c.code}
            onClick={() => setCountry(c.code)}
            className={`flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap ${
              country === c.code
                ? 'bg-foreground text-background border-foreground'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
            }`}
          >
            <span>{c.flag}</span> {c.name}
          </button>
        ))}
      </div>

      {/* Marketplace cards — remounts on country change so the slide-in animation replays */}
      <div key={country} className="grid gap-2 mt-3 animate-in slide-in-from-right-6 fade-in duration-300">
        {places.map((m) => (
          <div key={m.name} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card">
            <ShoppingBag className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
