'use client';

import { ListingCard } from '@/components/listings/ListingCard';
import { Flame } from 'lucide-react';
import Link from 'next/link';

interface HotDealsProps {
  listings: any[];
}

export function HotDeals({ listings }: HotDealsProps) {
  return (
    <section className="py-10 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-orange-500 dark:text-orange-400 text-xs font-semibold tracking-widest uppercase mb-1 flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5" /> Trending Now
            </p>
            <h2
              className="font-black uppercase text-foreground leading-none"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(26px, 3.5vw, 40px)' }}
            >
              Hot Deals
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/search" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-semibold tracking-wide uppercase transition-colors flex items-center gap-1">
              View all <span className="text-base leading-none">→</span>
            </Link>
          </div>
        </div>

        {/* Empty state */}
        {listings.length === 0 && (
          <div className="text-center py-16 border border-border rounded-2xl bg-muted">
            <Flame className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              No listings available right now.
            </p>
          </div>
        )}

        {/* Listings grid */}
        {listings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
