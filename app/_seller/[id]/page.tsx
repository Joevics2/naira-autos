'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase, Listing, Profile, Review } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ListingCard } from '@/components/listings/ListingCard';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { MapPin, Phone, MessageCircle, Shield, Check, Star, Briefcase, Clock, Car, Award } from 'lucide-react';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import { ReviewList } from '@/components/reviews/ReviewList';
import { useAuth } from '@/contexts/AuthContext';

export default function SellerProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [seller, setSeller] = useState<Profile | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
    if (id) loadSellerData();
  }, [id]);

  const loadSellerData = async () => {
    setLoading(true);
    const { data: sellerData } = await supabase
      .from('profiles').select('*').eq('id', id).maybeSingle();

    if (sellerData) {
      setSeller(sellerData as Profile);
      const [listingsData, reviewsData] = await Promise.all([
        supabase.from('listings').select('*, profiles(*)')
          .eq('user_id', id).eq('status', 'approved')
          .order('created_at', { ascending: false }),
        supabase.from('reviews').select('*, profiles!reviews_reviewer_id_fkey(*)')
          .eq('seller_id', id).order('created_at', { ascending: false }),
      ]);
      if (listingsData.data) setListings(listingsData.data as any);
      if (reviewsData.data) {
        setReviews(reviewsData.data as Review[]);
        setReviewCount(reviewsData.data.length);
        if (reviewsData.data.length > 0) {
          const total = reviewsData.data.reduce((s, r) => s + r.rating, 0);
          setRating(total / reviewsData.data.length);
        }
      }
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f1a14]">
        <div className="h-52 bg-gray-200 dark:bg-[#1a2a1e] animate-pulse" />
        <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-4">
          <div className="h-32 bg-white dark:bg-[#1a2a1e] animate-pulse rounded-2xl border border-gray-200" />
          <div className="h-64 bg-white dark:bg-[#1a2a1e] animate-pulse rounded-2xl border border-gray-200" />
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f1a14] flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-400 dark:text-gray-500">Seller not found</p>
      </div>
    );
  }

  const verificationStats = [
    { label: 'Phone', verified: seller.phone_verified },
    { label: 'ID', verified: seller.id_verified },
    { label: 'Dealer', verified: seller.dealer_verified },
  ];
  const verifiedCount = verificationStats.filter(v => v.verified).length;
  const initials = seller.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'S';
  const memberYear = new Date(seller.created_at).getFullYear();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f1a14]">

      {/* ── Banner ── */}
      <div className="relative h-44 sm:h-56 overflow-hidden bg-green-600 dark:bg-[#1a3d22]">
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-[#0f1a14]/60 to-transparent" />
      </div>

      <div className="max-w-screen-xl mx-auto px-4">

        {/* ── Profile header — overlaps banner ── */}
        <div
          className="relative -mt-16 sm:-mt-20 mb-6 transition-all duration-500"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(12px)' }}
        >
          <div className="bg-white dark:bg-[#1a2a1e] border border-gray-200 dark:border-[#2a3f2e] rounded-2xl shadow-lg dark:shadow-none overflow-hidden">
            <div className="p-5 sm:p-7">
              <div className="flex flex-col sm:flex-row gap-5 items-start">

                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-primary/10 flex items-center justify-center ring-4 ring-white dark:ring-[#0f1a14] shadow-md">
                    {seller.profile_photo ? (
                      <img src={seller.profile_photo} alt={seller.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl sm:text-3xl font-black text-primary">{initials}</span>
                    )}
                  </div>
                  {seller.dealer_verified && (
                    <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-[#0f1a14]">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Name + meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">{seller.full_name}</h1>
                    {seller.dealer_verified && (
                      <span className="inline-flex items-center gap-1 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200 dark:border-green-500/20">
                        <Shield className="w-3 h-3" /> Verified Dealer
                      </span>
                    )}
                  </div>

                  {seller.business_name && (
                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm mb-2">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{seller.business_name}</span>
                    </div>
                  )}

                  {/* Stars */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`w-4 h-4 ${s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {rating > 0 ? rating.toFixed(1) : 'No rating'} · {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
                    </span>
                  </div>

                  {/* Verification badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {verificationStats.map(stat => (
                      <span
                        key={stat.label}
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${
                          stat.verified
                            ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20'
                            : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-white/10'
                        }`}
                      >
                        {stat.verified && <Check className="w-2.5 h-2.5" />}
                        {stat.label} {stat.verified ? 'Verified' : 'Unverified'}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                  {seller.phone && (
                    <a href={`tel:${seller.phone}`} className="flex-1 sm:flex-none">
                      <Button variant="outline" className="w-full sm:w-36 gap-2 border-gray-300 dark:border-[#2a3f2e] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5">
                        <Phone className="w-4 h-4" /> Call
                      </Button>
                    </a>
                  )}
                  {seller.whatsapp && (
                    <a href={`https://wa.me/${seller.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                      <Button className="w-full sm:w-36 gap-2 bg-green-600 hover:bg-green-700 text-white">
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </Button>
                    </a>
                  )}
                </div>
              </div>

              {/* Bio */}
              {(seller.bio || seller.seller_description) && (
                <div className="mt-5 pt-5 border-t border-gray-200 dark:border-[#2a3f2e]">
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {seller.bio || seller.seller_description}
                  </p>
                </div>
              )}
            </div>

            {/* ── Stats bar ── */}
            <div className="border-t border-gray-200 dark:border-[#2a3f2e] bg-gray-50 dark:bg-[#162019] grid grid-cols-2 divide-x divide-gray-200 dark:divide-[#2a3f2e]">
              {[
                { icon: Car, value: listings.length, label: 'Active Listings', color: 'text-primary' },
                { icon: Award, value: seller.cars_sold_count || 0, label: 'Cars Sold', color: 'text-green-600 dark:text-green-500' },
              ].map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="flex flex-col items-center justify-center py-4 gap-0.5">
                  <span className={`text-2xl font-black ${color}`}>{value}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Listings ── */}
        <div
          className="mb-10 transition-all duration-500 delay-100"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(12px)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Listings <span className="text-gray-400 dark:text-gray-500 font-normal text-base">({listings.length})</span>
            </h2>
            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Member since {memberYear}
            </span>
          </div>

          {listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-gray-300 dark:border-[#2a3f2e] rounded-2xl py-14 text-center bg-white dark:bg-[#1a2a1e]">
              <Car className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-500 text-sm">No active listings at the moment</p>
            </div>
          )}
        </div>

        {/* ── Reviews ── */}
        <div
          className="mb-12 transition-all duration-500 delay-150"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(12px)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Reviews <span className="text-gray-400 dark:text-gray-500 font-normal text-base">({reviewCount})</span>
            </h2>
            {reviewCount > 0 && (
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'}`} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {user && user.id !== id && (
            <div className="mb-4">
              {showReviewForm ? (
                <div className="bg-white dark:bg-[#1a2a1e] border border-gray-300 dark:border-[#2a3f2e] rounded-2xl p-5">
                  <ReviewForm
                    sellerId={id}
                    onReviewSubmitted={() => { setShowReviewForm(false); loadSellerData(); }}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="w-full border border-dashed border-gray-300 dark:border-[#2a3f2e] hover:border-primary hover:bg-primary/5 rounded-2xl py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary transition-all duration-200 bg-white dark:bg-[#1a2a1e]"
                >
                  + Write a Review
                </button>
              )}
            </div>
          )}

          <div className="bg-white dark:bg-[#1a2a1e] border border-gray-200 dark:border-[#2a3f2e] rounded-2xl p-5">
            <ReviewList sellerId={id} />
          </div>
        </div>

      </div>
    </div>
  );
}