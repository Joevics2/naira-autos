'use client';

import Link from 'next/link';
import { MapPin, Gauge, Heart, Video, ShieldCheck, Star, Zap } from 'lucide-react';
import { Listing } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type ListingCardProps = {
  listing: Listing;
  showActions?: boolean;
  variant?: 'grid' | 'list';
};

const verificationConfig = {
  premium_verified: {
    label: 'Premium',
    icon: Star,
    classes: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25',
  },
  video_verified: {
    label: 'Verified',
    icon: ShieldCheck,
    classes: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
  },
  basic: {
    label: 'Basic',
    icon: ShieldCheck,
    classes: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/20',
  },
};

export function ListingCard({ listing, showActions = false, variant = 'grid' }: ListingCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const isCompact = variant === 'list';

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
        localStorage.setItem('saved_listings', JSON.stringify(saved.filter((id: string) => id !== listing.id)));
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

  const mainImage =
    Array.isArray(listing.images) && listing.images.length > 0
      ? listing.images[0]
      : 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600';

  const slugYear = listing.year || 'unknown';
  const slugBrand = (listing.brand || 'car').toLowerCase().replace(/\s+/g, '-');
  const slugModel = (listing.model || 'vehicle').toLowerCase().replace(/\s+/g, '-');
  const listingSlug = `${slugYear}-${slugBrand}-${slugModel}-${listing.id}`;

  const verification = verificationConfig[listing.verification_level];
  const VerifyIcon = verification.icon;

  if (isCompact) {
    return (
      <Link href={`/listing/${listingSlug}`} className="block group">
        <div className="flex gap-3 bg-card border border-border rounded-2xl overflow-hidden hover:border-emerald-500/40 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-200">
          {/* Thumbnail */}
          <div className="relative w-36 sm:w-44 flex-shrink-0 overflow-hidden bg-muted">
            <img
              src={mainImage}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {listing.video_url && (
              <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-md text-[10px] font-semibold flex items-center gap-1">
                <Video className="h-2.5 w-2.5" /> VIDEO
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-3 min-w-0 flex flex-col justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-0.5 truncate">
                {listing.year} · {listing.brand}
              </p>
              <h3 className="font-bold text-sm text-foreground line-clamp-1 leading-snug">
                {listing.brand} {listing.model} {listing.year}
              </h3>
            </div>
            <div>
              <p className="text-base font-black text-emerald-600 dark:text-emerald-400 leading-tight">
                ₦{listing.price.toLocaleString()}
                {listing.negotiable && (
                  <span className="text-[10px] font-semibold text-muted-foreground ml-1.5">neg.</span>
                )}
              </p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                {listing.mileage && listing.mileage > 0 && (
                  <span className="flex items-center gap-0.5"><Gauge className="h-3 w-3" />{listing.mileage.toLocaleString()} km</span>
                )}
                {(listing.location_lga || listing.location_state) && (
                  <span className="flex items-center gap-0.5 truncate">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    {listing.location_lga || listing.location_state}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Save button */}
          <div className="flex items-start p-2">
            <button
              onClick={toggleSave}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
            >
              <Heart className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/listing/${listingSlug}`} className="block group">
      <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-emerald-500/40 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/25 transition-all duration-200 hover:-translate-y-0.5">

        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={mainImage}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Gradient overlay for bottom badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Save button — top right */}
          <button
            onClick={toggleSave}
            className="absolute top-3 right-3 bg-black/40 dark:bg-black/50 backdrop-blur-sm hover:bg-black/60 p-2 rounded-full transition-all duration-150 hover:scale-110"
          >
            <Heart className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>

          {/* Urgent badge — top left */}
          {listing.urgent_sale && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
              <Zap className="h-3 w-3" /> Distress Sale
            </div>
          )}

          {/* Bottom row: video + verification */}
          <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 flex items-end justify-between">
            {listing.video_url ? (
              <div className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                <Video className="h-3 w-3" /> Video
              </div>
            ) : <div />}
            <div className={`text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full flex items-center gap-1 border backdrop-blur-sm ${verification.classes}`}>
              <VerifyIcon className="h-3 w-3" /> {verification.label}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3
            className="font-black uppercase text-foreground leading-tight line-clamp-1 mb-0.5"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(16px, 2vw, 19px)' }}
          >
            {listing.brand} {listing.model}
          </h3>

          {/* Year + condition chips */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {listing.year && (
              <span className="text-[11px] font-semibold bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                {listing.year}
              </span>
            )}
            {listing.condition && (
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                listing.condition === 'foreign_used'
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                  : listing.condition === 'brand_new'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                  : 'bg-muted text-muted-foreground border-border'
              }`}>
                {listing.condition === 'foreign_used' ? 'Foreign Used' : 
                 listing.condition === 'brand_new' ? 'Brand New' : 
                 listing.condition === 'nigerian_used' ? 'Nigerian Used' : listing.condition}
              </span>
            )}
            {listing.transmission && (
              <span className="text-[11px] font-semibold bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border capitalize">
                {listing.transmission}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
              ₦{listing.price.toLocaleString()}
            </span>
            {listing.negotiable && (
              <span className="text-xs font-semibold text-muted-foreground">Negotiable</span>
            )}
          </div>

          {/* Meta row */}
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              {listing.mileage && listing.mileage > 0 && (
                <span className="flex items-center gap-1">
                  <Gauge className="h-3 w-3 flex-shrink-0" />
                  {listing.mileage.toLocaleString()} km
                </span>
              )}
              {(listing.location_lga || listing.location_state) && (
                <span className="flex items-center gap-1 truncate max-w-[120px]">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  {listing.location_lga || listing.location_state}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}