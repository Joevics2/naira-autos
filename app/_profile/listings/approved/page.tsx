'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, Listing } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Eye, CheckCircle, ArrowLeft, Copy, Check } from 'lucide-react';

export default function ApprovedListingsPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadListings();
    }
  }, [user]);

  const loadListings = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('listings')
        .select('id, title, price, status, location_state, transmission, fuel_type, images, created_at, social_post')
        .eq('user_id', user.id)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (data) {
        setListings(data as any);
      }
    } catch (error) {
      console.error('Error loading listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id)
      .eq('user_id', user?.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete listing',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Listing deleted successfully',
      });
      loadListings();
    }
    setDeleteId(null);
  };

  const handleMarkAsSold = async (id: string) => {
    const { error } = await supabase
      .from('listings')
      .update({ status: 'sold' })
      .eq('id', id)
      .eq('user_id', user?.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to mark as sold',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Listing marked as sold',
      });
      loadListings();
    }
  };

  const handleCopySocialPost = async (post: string | null | undefined, id: string) => {
    if (!post) return;
    try {
      await navigator.clipboard.writeText(post);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      toast({ title: 'Copied!', description: 'Social post copied to clipboard' });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to copy', variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 mb-20">
      <Button variant="ghost" onClick={() => router.push('/profile/listings')} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to All Listings
      </Button>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Approved Listings</h1>
          <p className="text-muted-foreground">Live and visible to buyers</p>
        </div>
        <Button onClick={() => router.push('/add-listing')} className="bg-primary hover:bg-primary/90">
          Add New Listing
        </Button>
      </div>

      {listings.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <h3 className="text-xl font-semibold text-foreground mb-2">No Approved Listings</h3>
            <p className="text-muted-foreground mb-4">Your approved listings will appear here</p>
            <Button onClick={() => router.push('/add-listing')} className="bg-primary hover:bg-primary/90">
              Add New Listing
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="h-24 w-32 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                    {listing.images && listing.images.length > 0 ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="mb-2">
                      <Badge className="bg-green-500/10 text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approved
                      </Badge>
                    </div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{listing.title}</h3>
                        <p className="text-2xl font-bold text-primary">₦{listing.price.toLocaleString()}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                      {listing.location_state} • {listing.transmission} • {listing.fuel_type}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/listing/${listing.year}-${listing.brand.toLowerCase()}-${listing.model.toLowerCase().replace(/\s+/g, '-')}-${listing.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/listing/edit/${listing.id}`)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkAsSold(listing.id)}
                      >
                        Mark as Sold
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => setDeleteId(listing.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>

                    {listing.social_post && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-1 font-medium">Social Post:</p>
                        <div className="bg-muted rounded-lg p-3 text-sm whitespace-pre-wrap text-foreground">
                          {listing.social_post}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2"
                          onClick={() => handleCopySocialPost(listing.social_post!, listing.id)}
                        >
                          {copiedId === listing.id ? (
                            <><Check className="h-4 w-4 mr-1" /> Copied</>
                          ) : (
                            <><Copy className="h-4 w-4 mr-1" /> Copy Post</>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your listing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
