'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, Listing, Profile, Request } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import {
  Check,
  X,
  Pause,
  Eye,
  EyeOff,
  Users,
  Car,
  AlertCircle,
  MessageSquare
} from 'lucide-react';

import { Switch } from '@/components/ui/switch';

export default function AdminPage() {

  const { profile, loading: authLoading } = useAuth();

  const [pendingListings, setPendingListings] = useState<Listing[]>([]);
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [verificationRequests, setVerificationRequests] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {

    if (!authLoading) {

      if (profile?.role !== 'admin') {
        router.push('/');
        return;
      }

      loadAdminData();

    }

  }, [profile, authLoading]);


  const loadAdminData = async () => {

    setLoading(true);

    try {

      const [listingsRes, usersRes, requestsRes] = await Promise.all([

        supabase
          .from('listings')
          .select('*, profiles(*)')
          .order('created_at', { ascending: false })
          .limit(100),

        supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100),

        supabase
          .from('requests')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100),

      ]);

      if (listingsRes.data) {

        const all = listingsRes.data as any;

        setAllListings(all);

        setPendingListings(
          all.filter((l: Listing) => l.status === 'pending')
        );

      }

      if (usersRes.data) {

        setUsers(usersRes.data);

        const pendingVerifications = usersRes.data.filter((u: Profile) =>

          (u.id_document_url && !u.id_verified) ||
          (u.cac_document_url && !u.dealer_verified)

        );

        setVerificationRequests(pendingVerifications);

      }

      if (requestsRes.data) {
        setRequests(requestsRes.data);
      }

    }

    catch (error) {

      console.error('Error loading admin data:', error);

      toast({
        title: 'Error',
        description: 'Failed to load admin data. Please refresh the page.',
        variant: 'destructive',
      });

    }

    finally {
      setLoading(false);
    }

  };


  const handleListingAction = async (
    listingId: string,
    action: 'approve' | 'reject' | 'pause' | 'suspend'
  ) => {

    const statusMap = {
      approve: 'approved',
      reject: 'rejected',
      pause: 'paused',
      suspend: 'suspended',
    };

    const updateData: any = {
      status: statusMap[action]
    };

    if (action === 'approve') {
      updateData.approved_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('listings')
      .update(updateData)
      .eq('id', listingId);

    if (error) {

      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });

    }

    else {

      toast({
        title: 'Success',
        description: `Listing ${action}d successfully`
      });

      loadAdminData();

    }

  };


  const toggleShowViews = async (userId: string, currentValue: boolean) => {

    const { error } = await supabase
      .from('profiles')
      .update({ show_views: !currentValue })
      .eq('id', userId);

    if (error) {

      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });

    }

    else {

      toast({
        title: 'Success',
        description: `Views ${!currentValue ? 'enabled' : 'disabled'}`
      });

      loadAdminData();

    }

  };


  if (authLoading || loading) {

    return (

      <div className="max-w-screen-xl mx-auto px-4 py-8">

        <div className="animate-pulse space-y-4">

          <div className="h-48 bg-gray-200 rounded-lg"></div>

          <div className="h-96 bg-gray-200 rounded-lg"></div>

        </div>

      </div>

    );

  }


  if (profile?.role !== 'admin') {

    return (

      <div className="max-w-screen-xl mx-auto px-4 py-8 text-center">

        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />

        <h1 className="text-2xl font-bold">Access Denied</h1>

        <p>You don't have permission to access this page</p>

      </div>

    );

  }


  return (

    <div className="max-w-screen-xl mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>


      <Tabs defaultValue="pending" className="space-y-4">

        <TabsList>

          <TabsTrigger value="pending">
            Pending ({pendingListings.length})
          </TabsTrigger>

          <TabsTrigger value="users">
            Users
          </TabsTrigger>

        </TabsList>


        <TabsContent value="pending">

          {pendingListings.map((listing) => {

            const slugYear = listing.year || 'unknown';

            const slugBrand = (listing.brand || 'car')
              .toLowerCase()
              .replace(/\s+/g, '-');

            const slugModel = (listing.model || 'vehicle')
              .toLowerCase()
              .replace(/\s+/g, '-');


            return (

              <Card key={listing.id}>

                <CardContent className="pt-6">

                  <div className="flex flex-col md:flex-row gap-4">

                    <div className="w-full md:w-48 aspect-video bg-gray-200 rounded-lg overflow-hidden">

                      {listing.images?.[0] && (

                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />

                      )}

                    </div>


                    <div className="flex-1">

                      <h3 className="text-xl font-bold">
                        {listing.title}
                      </h3>

                      <p className="text-lg font-bold text-primary">

                        ₦{listing.price?.toLocaleString()}

                      </p>


                      <div className="flex flex-wrap gap-2 mt-4">

                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() =>
                            handleListingAction(listing.id, 'approve')
                          }
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </Button>


                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            handleListingAction(listing.id, 'reject')
                          }
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>


                        <Link
                          href={`/listing/${slugYear}-${slugBrand}-${slugModel}-${listing.id}`}
                          target="_blank"
                        >

                          <Button size="sm" variant="outline">

                            <Eye className="h-4 w-4 mr-2" />
                            View

                          </Button>

                        </Link>

                      </div>

                    </div>

                  </div>

                </CardContent>

              </Card>

            );

          })}

        </TabsContent>


        <TabsContent value="users">

          {users.map((user) => (

            <Card key={user.id}>

              <CardContent className="pt-6">

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="font-bold">
                      {user.full_name}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {user.phone}
                    </p>

                  </div>


                  <div className="flex items-center gap-3">

                    <Switch
                      checked={user.show_views !== false}
                      onCheckedChange={() =>
                        toggleShowViews(user.id, user.show_views !== false)
                      }
                    />

                    <Badge variant="outline">
                      {user.role}
                    </Badge>

                  </div>

                </div>

              </CardContent>

            </Card>

          ))}

        </TabsContent>


      </Tabs>

    </div>

  );

}