'use client';

import { useEffect, useState } from 'react';
import { supabase, Listing } from '@/lib/supabase';
import { ListingCard } from '@/components/listings/ListingCard';
import { Flame } from 'lucide-react';
import Link from 'next/link';

const CACHE_DURATION = 3 * 60 * 60 * 1000;

export function HotDeals() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    loadHotDeals();
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    if (!navigator.onLine) setIsOffline(true);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadHotDeals = async () => {
    setLoading(true);
    const cacheKey = 'home_hot_deals';
    const cacheTimeKey = 'home_hot_deals_time';
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);

    if (cachedData && cachedTime && Date.now() - parseInt(cachedTime) < CACHE_DURATION) {
      setListings(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    try {
      const { data: trendingData } = await supabase
        .from('listings').select('*, profiles(*)')
        .eq('status', 'approved')
        .order('views_count', { ascending: false })
        .order('contact_clicks', { ascending: false })
        .order('saves_count', { ascending: false })
        .limit(6);

      const { data: newestData } = await supabase
        .from('listings').select('*, profiles(*)')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(6);

      let combined: Listing[] = [];
      if (trendingData) {
        combined = trendingData.filter((l: any) => l.views_count > 10 || l.contact_clicks > 2 || l.saves_count > 3);
      }
      if (newestData) {
        const ids = new Set(combined.map(l => l.id));
        combined = [...combined, ...newestData.filter((l: any) => !ids.has(l.id))];
      }

      const result = combined.filter((item, i, self) => i === self.findIndex(t => t.id === item.id)).slice(0, 6) as any;
      setListings(result);
      localStorage.setItem(cacheKey, JSON.stringify(result));
      localStorage.setItem(cacheTimeKey, Date.now().toString());
      setIsOffline(false);
    } catch (error) {
      console.error('Error loading hot deals:', error);
      if (cachedData) { setListings(JSON.parse(cachedData)); setIsOffline(true); }
    }
    setLoading(false);
  };

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
            {isOffline && (
              <span className="text-[10px] font-semibold tracking-wide uppercase bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20 px-2 py-1 rounded-full">
                Cached
              </span>
            )}
            <Link href="/search" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-semibold tracking-wide uppercase transition-colors flex items-center gap-1">
              View all <span className="text-base leading-none">→</span>
            </Link>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="rounded-2xl h-72 bg-muted animate-pulse border border-border" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && listings.length === 0 && (
          <div className="text-center py-16 border border-border rounded-2xl bg-muted">
            <Flame className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              {isOffline ? 'No cached listings. Check your connection.' : 'No listings available right now. Check your connection.'}
            </p>
          </div>
        )}

        {/* Listings grid */}
        {!loading && listings.length > 0 && (
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