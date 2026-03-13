'use client';

import Link from 'next/link';
import { MapPin, Calendar, Gauge, Phone, MessageCircle, Heart, Shield, Video } from 'lucide-react';
import { Listing } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type ListingCardProps = {
  listing: Listing;
  showActions?: boolean;
  variant?: 'grid' | 'list';
};

export function ListingCard({ listing, showActions = false, variant = 'grid' }: ListingCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      checkIfSaved();
    } else {
      const saved = JSON.parse(localStorage.getItem('saved_listings') || '[]');
      setIsSaved(saved.includes(listing.id));
    }
  }, [user, listing.id]);

  const checkIfSaved = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('saved_listings')
      .select('id')
      .eq('user_id', user.id)
      .eq('listing_id', listing.id)
      .maybeSingle();
    setIsSaved(!!data);
  };

  const toggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      const saved = JSON.parse(localStorage.getItem('saved_listings') || '[]');
      if (isSaved) {
        const newSaved = saved.filter((id: string) => id !== listing.id);
        localStorage.setItem('saved_listings', JSON.stringify(newSaved));
        setIsSaved(false);
        toast({ title: 'Removed from saved' });
      } else {
        saved.push(listing.id);
        localStorage.setItem('saved_listings', JSON.stringify(saved));
        setIsSaved(true);
        toast({ title: 'Saved successfully' });
      }
      return;
    }

    if (isSaved) {
      await supabase.from('saved_listings').delete().eq('user_id', user.id).eq('listing_id', listing.id);
      await supabase.from('listings').update({ saves_count: Math.max(0, listing.saves_count - 1) }).eq('id', listing.id);
      setIsSaved(false);
      toast({ title: 'Removed from saved' });
    } else {
      await supabase.from('saved_listings').insert({ user_id: user.id, listing_id: listing.id });
      await supabase.from('listings').update({ saves_count: listing.saves_count + 1 }).eq('id', listing.id);
      setIsSaved(true);
      toast({ title: 'Saved successfully' });
    }
  };

  const handleWhatsAppClick = async () => {
    await supabase.from('listings').update({ contact_clicks: listing.contact_clicks + 1 }).eq('id', listing.id);
  };

  const mainImage = Array.isArray(listing.images) && listing.images.length > 0
    ? listing.images[0]
    : 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600';

  const verificationBadge = {
    premium_verified: { label: 'Premium', color: 'bg-green-600' },
    video_verified: { label: 'Video', color: 'bg-blue-600' },
    basic: { label: 'Basic', color: 'bg-gray-600' },
  };

  const isCompact = variant === 'list';

  // Generate descriptive URL slug: year-brand-model-id (with fallbacks)
  const slugYear = listing.year || 'unknown';
  const slugBrand = (listing.brand || 'car').toLowerCase().replace(/\s+/g, '-');
  const slugModel = (listing.model || 'vehicle').toLowerCase().replace(/\s+/g, '-');
  const listingSlug = `${slugYear}-${slugBrand}-${slugModel}-${listing.id}`;

  return (
    <Link href={`/listing/${listingSlug}`} className="block group">
      <div className={`bg-card rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden border border-border ${isCompact ? 'flex' : ''}`}>
        <div className={`relative overflow-hidden bg-muted ${isCompact ? 'w-48 h-32 flex-shrink-0' : 'aspect-video'}`}>
          <img src={mainImage} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          {listing.video_url && (
            <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-0.5 rounded text-xs flex items-center gap-1">
              <Video className="h-3 w-3" /> Video
            </div>
          )}
          <button onClick={toggleSave} className="absolute top-2 right-2 bg-background/80 hover:bg-background p-1.5 rounded-full transition-colors">
            <Heart className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
          </button>
          {listing.urgent_sale && (
            <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-0.5 rounded text-xs font-semibold">Urgent</div>
          )}
          <Badge className={`absolute bottom-2 right-2 ${verificationBadge[listing.verification_level].color} text-white text-xs`}>
            {verificationBadge[listing.verification_level].label}
          </Badge>
        </div>

        <div className={`p-3 ${isCompact ? 'flex-1' : ''}`}>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={`font-bold text-foreground line-clamp-1 ${isCompact ? 'text-sm' : 'text-lg'}`}>
              {listing.brand} {listing.model} {listing.year}
            </h3>
          </div>

          <div className={`font-bold text-primary mb-2 ${isCompact ? 'text-lg' : 'text-xl'}`}>
            ₦{listing.price.toLocaleString()}
            {listing.negotiable && <span className="text-sm text-muted-foreground ml-2">Negotiable</span>}
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {listing.year && (
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {listing.year}</span>
            )}
            {listing.mileage && listing.mileage > 0 && (
              <span className="flex items-center gap-1"><Gauge className="h-3 w-3" /> {listing.mileage.toLocaleString()} km</span>
            )}
            {(listing.location_lga || listing.location_state) && (
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {listing.location_lga}{listing.location_lga && listing.location_state ? ', ' : ''}{listing.location_state}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
