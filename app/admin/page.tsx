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
import { Check, X, Pause, Eye, EyeOff, Users, Car, AlertCircle, MessageSquare } from 'lucide-react';
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
        setPendingListings(all.filter((l: Listing) => l.status === 'pending'));
      }

      if (usersRes.data) {
        setUsers(usersRes.data);
        const pendingVerifications = usersRes.data.filter((u: Profile) =>
          (u.id_document_url && !u.id_verified) || (u.cac_document_url && !u.dealer_verified)
        );
        setVerificationRequests(pendingVerifications);
      }

      if (requestsRes.data) {
        setRequests(requestsRes.data);
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load admin data. Please refresh the page.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationAction = async (userId: string, type: 'id' | 'dealer', action: 'approve' | 'reject') => {
    const updateData: any = {};

    if (type === 'id') {
      updateData.id_verified = action === 'approve';
    } else {
      updateData.dealer_verified = action === 'approve';
    }

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `${type === 'id' ? 'ID' : 'Dealer'} verification ${action}d successfully`,
      });
      loadAdminData();
    }
  };

  const handleListingAction = async (listingId: string, action: 'approve' | 'reject' | 'pause' | 'suspend') => {
    const statusMap = {
      approve: 'approved',
      reject: 'rejected',
      pause: 'paused',
      suspend: 'suspended',
    };

    const updateData: any = { status: statusMap[action] };
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
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `Listing ${action}d successfully`,
      });
      loadAdminData();
    }
  };

  const handleRequestAction = async (requestId: string, action: 'approve' | 'pause' | 'delete') => {
    console.log('handleRequestAction called:', { requestId, action });
    
    if (action === 'delete') {
      const { error } = await supabase
        .from('requests')
        .delete()
        .eq('id', requestId);
      if (error) {
        console.error('Delete error:', error);
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Request deleted' });
        loadAdminData();
      }
    } else {
      const status = action === 'approve' ? 'approved' : 'paused';
      console.log('Updating request status:', { requestId, status });
      const { error } = await supabase
        .from('requests')
        .update({ status })
        .eq('id', requestId);
      if (error) {
        console.error('Update error:', error);
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: `Request ${status}` });
        loadAdminData();
      }
    }
  };

  const toggleShowViews = async (userId: string, currentValue: boolean) => {
    const { error } = await supabase
      .from('profiles')
      .update({ show_views: !currentValue })
      .eq('id', userId);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: `Views ${!currentValue ? 'enabled' : 'disabled'} for this user` });
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
        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-gray-600 mt-2">You don't have permission to access this page</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approval</p>
                <p className="text-3xl font-bold text-orange-600">{pendingListings.length}</p>
              </div>
              <AlertCircle className="h-10 w-10 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
<div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Listings</p>
                <p className="text-3xl font-bold text-primary">{allListings.length}</p>
              </div>
              <Car className="h-10 w-10 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-green-600">{users.length}</p>
              </div>
              <Users className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Buyer Requests</p>
                <p className="text-3xl font-bold text-purple-600">{requests.length}</p>
              </div>
              <MessageSquare className="h-10 w-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pending Approval ({pendingListings.length})
          </TabsTrigger>
          <TabsTrigger value="verifications">
            Verifications ({verificationRequests.length})
          </TabsTrigger>
          <TabsTrigger value="all">All Listings</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="requests">Buyer Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingListings.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <p className="text-lg text-gray-600">No pending listings</p>
              </CardContent>
            </Card>
          ) : (
            pendingListings.map((listing) => (
              <Card key={listing.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-48 aspect-video bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {listing.images[0] && (
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
<h3 className="text-xl font-bold text-foreground">{listing.title}</h3>
                          <p className="text-lg font-bold text-primary">
                            ₦{listing.price.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Seller: {listing.profiles?.full_name} ({listing.profiles?.role})
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className="bg-green-600">
                            {listing.verification_level.replace('_', ' ')}
                          </Badge>
                          <Badge variant="outline">{listing.ownership_type}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{listing.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleListingAction(listing.id, 'approve')}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleListingAction(listing.id, 'reject')}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        const slugYear = listing.year || 'unknown';
                        const slugBrand = (listing.brand || 'car').toLowerCase().replace(/\s+/g, '-');
                        const slugModel = (listing.model || 'vehicle').toLowerCase().replace(/\s+/g, '-');
                        <a href={`/listing/${slugYear}-${slugBrand}-${slugModel}-${listing.id}`} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="verifications" className="space-y-4">
          {verificationRequests.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <p className="text-lg text-gray-600">No pending verifications</p>
              </CardContent>
            </Card>
          ) : (
            verificationRequests.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{user.full_name || user.email}</CardTitle>
                  <p className="text-sm text-gray-600">{user.email} - {user.phone}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.id_document_url && !user.id_verified && (
                    <div className="border rounded-lg p-4 bg-blue-50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">ID Verification</h4>
                          <p className="text-sm text-gray-600">Government-issued ID document</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
                      </div>
                        <a
                          href={user.id_document_url || ''}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          View Document →
                        </a>
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleVerificationAction(user.id, 'id', 'approve')}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleVerificationAction(user.id, 'id', 'reject')}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  )}

                  {user.cac_document_url && !user.dealer_verified && (
                    <div className="border rounded-lg p-4 bg-purple-50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">Dealer Verification</h4>
                          <p className="text-sm text-gray-600">CAC certificate document</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
                      </div>
                      <a
                        href={user.cac_document_url || ''}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline text-sm"
                      >
                        View Document →
                      </a>
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleVerificationAction(user.id, 'dealer', 'approve')}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleVerificationAction(user.id, 'dealer', 'reject')}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {allListings.map((listing) => (
            <Card key={listing.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{listing.title}</h3>
                    <p className="text-sm text-gray-600">
                      {listing.profiles?.full_name} - {listing.location_state}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={
                      listing.status === 'approved' ? 'bg-green-600' :
                      listing.status === 'pending' ? 'bg-yellow-600' :
                      listing.status === 'rejected' ? 'bg-red-600' :
                      'bg-gray-600'
                    }>
                      {listing.status}
                    </Badge>
                    {listing.status === 'approved' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleListingAction(listing.id, 'pause')}
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{user.full_name}</h3>
                    <p className="text-sm text-gray-600">{user.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={user.show_views !== false}
                        onCheckedChange={() => toggleShowViews(user.id, user.show_views !== false)}
                      />
                      <span className="text-sm text-muted-foreground">
                        {user.show_views !== false ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </span>
                    </div>
                    <Badge variant="outline" className="capitalize">{user.role}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          {requests.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-lg text-gray-600">No buyer requests yet</p>
              </CardContent>
            </Card>
          ) : (
            requests.map((request) => (
              <Card key={request.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{request.name}</h3>
                      <p className="text-sm text-gray-600">{request.email} - {request.phone}</p>
                      {request.state && (
                        <p className="text-sm text-gray-600">Location: {request.state}</p>
                      )}
                      {request.vehicle_type && (
                        <p className="text-sm text-gray-700 mt-2">
                          Vehicle Type: {request.vehicle_type}
                        </p>
                      )}
                      {request.brand && (
                        <p className="text-sm text-gray-700">
                          Looking for: {request.brand} {request.model}
                        </p>
                      )}
                      {(request.year_from || request.year_to) && (
                        <p className="text-sm text-foreground">
                          Year: {request.year_from || 'Any'} - {request.year_to || 'Any'}
                        </p>
                      )}
                      {(request.budget_min || request.budget_max) && (
                        <p className="text-sm text-foreground">
                          Budget: ₦{request.budget_min?.toLocaleString() || 'Any'} - ₦{request.budget_max?.toLocaleString() || 'Any'}
                        </p>
                      )}
                      {request.additional_details && (
                        <p className="text-sm text-foreground mt-2">{request.additional_details}</p>
                      )}
                    </div>
                    <Badge className={
                      request.status === 'pending' ? 'bg-yellow-600' :
                      request.status === 'approved' ? 'bg-green-600' :
                      request.status === 'paused' ? 'bg-orange-600' :
                      'bg-gray-600'
                    }>
                      {request.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {request.status === 'pending' && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleRequestAction(request.id, 'approve')}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    )}
                    {request.status === 'approved' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRequestAction(request.id, 'pause')}
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    )}
                    {request.status === 'paused' && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleRequestAction(request.id, 'approve')}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Reactivate
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRequestAction(request.id, 'delete')}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
