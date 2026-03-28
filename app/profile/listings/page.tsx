'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, Listing } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Eye, CheckCircle, Clock, XCircle, Share2, Copy, Check, PartyPopper } from 'lucide-react';

// Extended listing type to include social_post
interface ListingWithSocial extends Listing {
  social_post?: string | null;
}

export default function MyListingsPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<ListingWithSocial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  // Social post modal
  const [socialModalListing, setSocialModalListing] = useState<ListingWithSocial | null>(null);
  const [copied, setCopied] = useState(false);
  // Congratulations popup for newly approved listings
  const [congratsListing, setCongratsListing] = useState<ListingWithSocial | null>(null);
  // Track which listing IDs we've already shown the congrats for (per session)
  const [seenApprovals, setSeenApprovals] = useState<Set<string>>(new Set());

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
        .select('id, title, price, status, location_state, transmission, fuel_type, images, created_at, year, brand, model, social_post')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) {
        const fetched = data as ListingWithSocial[];
        setListings(fetched);

        // Check for newly approved listings we haven't congratulated yet this session
        const stored = sessionStorage.getItem('seen_approvals');
        const seen: string[] = stored ? JSON.parse(stored) : [];
        const seenSet = new Set(seen);

        const newlyApproved = fetched.find(
          l => l.status === 'approved' && !seenSet.has(l.id)
        );

        if (newlyApproved) {
          seenSet.add(newlyApproved.id);
          setSeenApprovals(seenSet);
          sessionStorage.setItem('seen_approvals', JSON.stringify([...seenSet]));
          setCongratsListing(newlyApproved);
        }
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
      toast({ title: 'Error', description: 'Failed to delete listing', variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Listing deleted successfully' });
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
      toast({ title: 'Error', description: 'Failed to mark as sold', variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Listing marked as sold' });
      loadListings();
    }
  };

  const handleCopySocialPost = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500/10 text-green-600"><CheckCircle className="h-3 w-3 mr-1" /> Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/10 text-yellow-600"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/10 text-red-600"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
      case 'sold':
        return <Badge className="bg-muted text-muted-foreground">Sold</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const pendingListings = listings.filter(l => l.status === 'pending');
  const approvedListings = listings.filter(l => l.status === 'approved');

  const renderList = (listToRender: ListingWithSocial[], showStatus: boolean = true) => {
    if (listToRender.length === 0) {
      return (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <h3 className="text-xl font-semibold text-foreground mb-2">No Listings Found</h3>
            <p className="text-muted-foreground mb-4">Create your first listing to get started</p>
            <Button onClick={() => router.push('/add-listing')} className="bg-primary hover:bg-primary/90">
              Add Listing
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        {listToRender.map((listing) => (
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
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  {showStatus && (
                    <div className="mb-2">
                      {getStatusBadge(listing.status)}
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{listing.title}</h3>
                      <p className="text-2xl font-bold text-primary">₦{listing.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {listing.location_state} • {listing.transmission} • {listing.fuel_type}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {listing.status === 'approved' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/listing/${listing.year}-${listing.brand?.toLowerCase()}-${listing.model?.toLowerCase().replace(/\s+/g, '-')}-${listing.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(`/listing/edit/${listing.id}`)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    {listing.status === 'approved' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkAsSold(listing.id)}
                      >
                        Mark as Sold
                      </Button>
                    )}
                    {/* Social Post button — only visible for approved listings */}
                    {listing.status === 'approved' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-emerald-600 border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                        onClick={() => { setCopied(false); setSocialModalListing(listing); }}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share Post
                      </Button>
                    )}
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
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 mb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Listings</h1>
          <p className="text-muted-foreground">Manage your vehicle listings</p>
        </div>
        <Button onClick={() => router.push('/add-listing')} className="bg-primary hover:bg-primary/90">
          Add New Listing
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All ({listings.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Approved ({approvedListings.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending ({pendingListings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {renderList(listings)}
        </TabsContent>
        <TabsContent value="approved">
          {renderList(approvedListings, false)}
        </TabsContent>
        <TabsContent value="pending">
          {renderList(pendingListings, false)}
        </TabsContent>
      </Tabs>

      {/* ── Delete confirmation ── */}
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

      {/* ── Congratulations popup ── */}
      <Dialog open={!!congratsListing} onOpenChange={() => setCongratsListing(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-600">
              <PartyPopper className="h-5 w-5" />
              Your listing is live! 🎉
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{congratsListing?.title}</span> has been approved and is now visible to buyers on Naira Autos.
            </p>
            {congratsListing?.social_post && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Your ready-to-share social post:</p>
                <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-4">
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{congratsListing.social_post}</p>
                </div>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                  onClick={() => handleCopySocialPost(congratsListing.social_post!)}
                >
                  {copied ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy Post</>}
                </Button>
                <p className="text-xs text-center text-muted-foreground">Paste into WhatsApp, Facebook, or Instagram to get more eyes on your car</p>
              </div>
            )}
            {!congratsListing?.social_post && (
              <p className="text-xs text-muted-foreground">
                Tip: Use the <span className="font-semibold">Share Post</span> button on your listing to generate a social media post anytime.
              </p>
            )}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setCongratsListing(null)}>
                Close
              </Button>
              <Button
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => {
                  setCongratsListing(null);
                  if (congratsListing) {
                    router.push(`/listing/${congratsListing.year}-${congratsListing.brand?.toLowerCase()}-${congratsListing.model?.toLowerCase().replace(/\s+/g, '-')}-${congratsListing.id}`);
                  }
                }}
              >
                View Listing
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Social Post modal (per listing) ── */}
      <Dialog open={!!socialModalListing} onOpenChange={() => setSocialModalListing(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-emerald-600" />
              Share Your Listing
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {socialModalListing?.title}
            </p>
            {socialModalListing?.social_post ? (
              <>
                <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-4">
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{socialModalListing.social_post}</p>
                </div>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                  onClick={() => handleCopySocialPost(socialModalListing.social_post!)}
                >
                  {copied ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy Post</>}
                </Button>
                <p className="text-xs text-center text-muted-foreground">Paste into WhatsApp, Facebook, Instagram, or Twitter to reach more buyers</p>
              </>
            ) : (
              <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
                <p className="text-sm text-muted-foreground">No social post available for this listing yet.</p>
                <p className="text-xs text-muted-foreground mt-1">It will be generated automatically on your next listing update.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}