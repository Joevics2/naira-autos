'use client';

import { useEffect, useState } from 'react';
import { supabase, Listing } from '@/lib/supabase';
import { ListingCard } from '@/components/listings/ListingCard';
import { CheckCircle } from 'lucide-react';

export function RecentlyApproved() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentListings();
  }, []);

  const loadRecentListings = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*, profiles(*)')
      .eq('status', 'approved')
      .not('approved_at', 'is', null)
      .order('approved_at', { ascending: false })
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
          <CheckCircle className="h-8 w-8 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Recently Approved
          </h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Latest quality-checked listings on the marketplace
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
