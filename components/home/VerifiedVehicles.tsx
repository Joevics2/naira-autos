'use client';

import { useEffect, useState } from 'react';
import { supabase, Listing } from '@/lib/supabase';
import { ListingCard } from '@/components/listings/ListingCard';
import { Shield } from 'lucide-react';

const CACHE_DURATION = 3 * 60 * 60 * 1000; // 3 hours

export function VerifiedVehicles() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVerifiedListings();
  }, []);

  const loadVerifiedListings = async () => {
    const cacheKey = 'home_verified_vehicles';
    const cacheTimeKey = 'home_verified_vehicles_time';
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);
    
    if (cachedData && cachedTime) {
      const timeDiff = Date.now() - parseInt(cachedTime);
      if (timeDiff < CACHE_DURATION) {
        setListings(JSON.parse(cachedData));
        setLoading(false);
        return;
      }
    }
    
    const { data, error } = await supabase
      .from('listings')
      .select('*, profiles(*)')
      .eq('status', 'approved')
      .eq('verification_level', 'premium_verified')
      .order('created_at', { ascending: false })
      .limit(6);

    if (data) {
      setListings(data as any);
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheTimeKey, Date.now().toString());
    }
    setLoading(false);
  };

  if (loading) {
    return null;
  }

  if (listings.length === 0) {
    return null;
  }

  return (
<section className="py-12 bg-background">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-green-600" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Premium Verified Vehicles
          </h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Vehicles with complete 4-step video verification for maximum transparency
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
