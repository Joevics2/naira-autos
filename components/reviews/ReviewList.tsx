'use client';

import { useEffect, useState } from 'react';
import { supabase, Review } from '@/lib/supabase';
import { Star } from 'lucide-react';

interface ReviewListProps {
  sellerId: string;
}

export function ReviewList({ sellerId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    loadReviews();
  }, [sellerId]);

  const loadReviews = async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('reviews')
      .select('*, profiles!reviews_reviewer_id_fkey(*)')
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false });

    if (data) {
      setReviews(data as Review[]);
      setReviewCount(data.length);
      
      if (data.length > 0) {
        const totalRating = data.reduce((sum, r) => sum + r.rating, 0);
        setRating(totalRating / data.length);
      }
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${
                star <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {rating.toFixed(1)} ({reviewCount} reviews)
        </span>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {review.profiles?.profile_photo ? (
                    <img
                      src={review.profiles.profile_photo}
                      alt={review.profiles.full_name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-primary">
                      {review.profiles?.full_name?.charAt(0) || '?'}
                    </span>
                  )}
                </div>
                <span className="font-medium">{review.profiles?.full_name || 'Anonymous'}</span>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            {review.comment && (
              <p className="text-muted-foreground text-sm">{review.comment}</p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(review.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
