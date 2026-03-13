'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, Listing } from '@/lib/supabase';
import { ListingCard } from '@/components/listings/ListingCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CACHE_DURATION = 3 * 60 * 60 * 1000; // 3 hours

export default function SavedPage() {
  const { user } = useAuth();
  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadSavedListings();
  }, [user]);

  const loadSavedListings = async () => {
    setLoading(true);
    
    if (user) {
      const cachedKey = `saved_listings_${user.id}`;
      const cachedData = localStorage.getItem(cachedKey);
      const cacheTimeKey = `saved_listings_${user.id}_time`;
      const cachedTime = localStorage.getItem(cacheTimeKey);
      
      // Check if cache is valid (less than 30 minutes old)
      if (cachedData && cachedTime) {
        const timeDiff = Date.now() - parseInt(cachedTime);
        if (timeDiff < CACHE_DURATION) {
          setSavedListings(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
      }
      
      try {
        const { data: savedData } = await supabase
          .from('saved_listings')
          .select('listing_id')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (savedData && savedData.length > 0) {
          const listingIds = savedData.map(item => item.listing_id);

          const { data: listingsData } = await supabase
            .from('listings')
            .select('*, profiles(*)')
            .in('id', listingIds)
            .eq('status', 'approved');

          if (listingsData) {
            const listings = listingsData as Listing[];
            setSavedListings(listings);
            localStorage.setItem(cachedKey, JSON.stringify(listings));
            localStorage.setItem(cacheTimeKey, Date.now().toString());
          } else {
            setSavedListings([]);
            localStorage.setItem(cachedKey, JSON.stringify([]));
            localStorage.setItem(cacheTimeKey, Date.now().toString());
          }
        } else {
          setSavedListings([]);
          localStorage.setItem(cachedKey, JSON.stringify([]));
          localStorage.setItem(cacheTimeKey, Date.now().toString());
        }
      } catch (error) {
        console.error('Error loading saved listings:', error);
        if (cachedData) {
          setSavedListings(JSON.parse(cachedData));
        }
      }
    } else {
      const savedIds = JSON.parse(localStorage.getItem('saved_listings') || '[]');
      const cacheTimeKey = 'saved_listings_anon_time';
      const cachedTime = localStorage.getItem(cacheTimeKey);
      
      // Check if cache is valid for anon users too
      if (savedIds.length > 0 && cachedTime) {
        const timeDiff = Date.now() - parseInt(cachedTime);
        if (timeDiff < CACHE_DURATION) {
          const cachedAnon = localStorage.getItem('saved_listings_anon_data');
          if (cachedAnon) {
            setSavedListings(JSON.parse(cachedAnon));
            setLoading(false);
            return;
          }
        }
      }
      
      if (savedIds.length > 0) {
        try {
          const { data: listingsData } = await supabase
            .from('listings')
            .select('*, profiles(*)')
            .in('id', savedIds)
            .eq('status', 'approved');
          
          if (listingsData) {
            setSavedListings(listingsData as Listing[]);
            localStorage.setItem('saved_listings_anon_data', JSON.stringify(listingsData));
            localStorage.setItem(cacheTimeKey, Date.now().toString());
          } else {
            setSavedListings([]);
          }
        } catch (error) {
          console.error('Error loading saved listings:', error);
          setSavedListings([]);
        }
      } else {
        setSavedListings([]);
      }
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Saved Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-card rounded-lg shadow-md h-96 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-8 w-8 text-red-500" />
        <h1 className="text-3xl font-bold text-foreground">Saved Listings</h1>
      </div>

      {savedListings.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-foreground mb-4">You haven't saved any listings yet</p>
            <p className="text-muted-foreground mb-6">Start browsing and save your favorite vehicles</p>
            <Button onClick={() => router.push('/')}>Browse Listings</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} showActions />
          ))}
        </div>
      )}
    </div>
  );
}
