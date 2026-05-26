'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default function FeaturedPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Featured Listings</h1>
        <p className="text-muted-foreground">Promote your listings to get more visibility</p>
      </div>

      <Card>
        <CardContent className="pt-6 text-center py-12">
          <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Featured Listings</h3>
          <p className="text-muted-foreground mb-4">
            Currently, all listings with videos are automatically featured and rotated every 24 hours at no cost.
          </p>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-primary">
              Add a video to your listing to be automatically included in the featured rotation!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
