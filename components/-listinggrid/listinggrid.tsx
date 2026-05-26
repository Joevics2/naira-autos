'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ListingCard } from '@/components/listings/ListingCard';
import type { Listing } from '@/lib/supabase';

interface ListingsGridProps {
  listings: Listing[];
  total: number;
}

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low', value: 'price_asc' },
  { label: 'Price: High', value: 'price_desc' },
  { label: 'Most Viewed', value: 'views' },
] as const;

type SortValue = typeof SORT_OPTIONS[number]['value'];

export default function ListingsGrid({ listings, total }: ListingsGridProps) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortValue>('newest');

  const filtered = useMemo(() => {
    let list = [...listings];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.brand.toLowerCase().includes(q) ||
          l.model.toLowerCase().includes(q) ||
          l.location_state.toLowerCase().includes(q) ||
          l.location_lga.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case 'price_asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price_desc': list.sort((a, b) => b.price - a.price); break;
      case 'views':      list.sort((a, b) => b.views_count - a.views_count); break;
      case 'newest':
      default:
        list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return list;
  }, [listings, query, sort]);

  return (
    <div className="bg-muted min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by brand, model, location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-background border border-border focus:border-emerald-500/50 focus:outline-none rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div className="flex gap-1.5">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
                    sort === opt.value
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'bg-background text-muted-foreground border-border hover:text-foreground hover:border-emerald-500/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Count */}
        <p className="text-muted-foreground text-xs mb-5">
          Showing {filtered.length} of {total} listings
          {query && ` matching "${query}"`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Search className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No listings found</h3>
            <p className="text-muted-foreground text-sm">Try adjusting your search or check back later.</p>
          </div>
        )}

      </div>
    </div>
  );
}
