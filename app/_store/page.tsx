'use client';

import { useEffect, useState } from 'react';
import { supabase, Listing } from '@/lib/supabase';
import { ListingCard } from '@/components/listings/ListingCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Store as StoreIcon, Phone, MessageCircle } from 'lucide-react';

export default function StorePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadStoreListings();
  }, [filter]);

  const loadStoreListings = async () => {
    let query = supabase
      .from('listings')
      .select('*, profiles(*)')
      .eq('status', 'approved')
      .eq('is_our_store', true)
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('vehicle_type', filter);
    }

    const { data } = await query;

    if (data) {
      setListings(data as any);
    }
    setLoading(false);
  };

  return (
<div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <StoreIcon className="h-12 w-12" />
            <div>
              <h1 className="text-4xl font-bold">Our Cars</h1>
              <p className="text-primary-foreground/80 text-lg">Quality verified vehicles from our dealership</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="bg-card rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">About Our Store</h2>
          <p className="text-muted-foreground mb-4">
            We offer quality vehicles with full transparency. Every car in our inventory includes comprehensive video documentation.
            Contact us to list your vehicle or inquire about our current stock.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-600 hover:bg-green-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp Us
              </Button>
            </a>
            <a href="tel:+2348000000000">
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call Us
              </Button>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Vehicles ({listings.length})
          </h2>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vehicles</SelectItem>
              <SelectItem value="car">Cars</SelectItem>
              <SelectItem value="truck">Trucks</SelectItem>
              <SelectItem value="van">Vans</SelectItem>
              <SelectItem value="bus">Buses</SelectItem>
              <SelectItem value="bike">Bikes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse" />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <StoreIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg text-gray-600">No vehicles available at the moment</p>
            <p className="text-gray-500 mt-2">Check back soon for new inventory</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} showActions />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
