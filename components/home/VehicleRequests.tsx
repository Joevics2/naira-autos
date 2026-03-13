'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function VehicleRequests() {
  const router = useRouter();

  return (
    <section className="py-6 bg-background">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-lg md:text-xl font-bold text-foreground">Looking for a Specific Vehicle?</h2>
          <p className="text-muted-foreground text-sm">
            Can't find what you want? Create a request and let sellers come to you.
          </p>
        </div>
        
        <div className="max-w-lg mx-auto">
          <p className="text-xs text-muted-foreground text-center mb-2">Tell sellers what you want or browse what buyers are looking for</p>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => router.push('/requests/create')}
              className="h-10 text-sm font-medium bg-primary hover:bg-primary/90"
            >
              Create Request
            </Button>
            
            <Button
              onClick={() => router.push('/requests/view')}
              variant="outline"
              className="h-10 text-sm font-medium"
            >
              Browse Requests
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
