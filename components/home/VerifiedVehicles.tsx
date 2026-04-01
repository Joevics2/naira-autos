'use client';

import { useEffect, useState } from 'react';
import { supabase, Listing } from '@/lib/supabase';
import { ListingCard } from '@/components/listings/ListingCard';
import { Shield } from 'lucide-react';

export function VerifiedVehicles() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVerifiedListings();
  }, []);

  const loadVerifiedListings = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*, profiles(*)')
      .eq('status', 'approved')
      .eq('verification_level', 'premium_verified')
      .order('created_at', { ascending: false })
      .limit(6);

    if (data) {
      setListings(data as any);
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
