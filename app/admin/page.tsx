'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, Profile } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Eye, EyeOff, Users, AlertCircle, Car } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { VehicleListingsAdmin } from './VehicleListingsAdmin';

export default function AdminPage() {
  const { profile, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<Profile[]>([]);
  const [verificationRequests, setVerificationRequests] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin-data');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch admin data');
      }

      if (data.users) {
        setUsers(data.users);
        const pendingVerifications = data.users.filter((u: Profile) =>
          (u.id_document_url && !u.id_verified) || (u.cac_document_url && !u.dealer_verified)
        );
        setVerificationRequests(pendingVerifications);
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
    const { error } = await supabase.from('profiles').update(updateData).eq('id', userId);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: `${type === 'id' ? 'ID' : 'Dealer'} verification ${action}d successfully` });
      loadAdminData();
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

  useEffect(() => {
    loadAdminData();
  }, []);

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

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Verifications</p>
                <p className="text-3xl font-bold text-orange-600">{verificationRequests.length}</p>
              </div>
              <AlertCircle className="h-10 w-10 text-orange-600" />
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
      </div>

      {/* Tabs */}
      <Tabs defaultValue="vehicle-listings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vehicle-listings">
            <Car className="h-4 w-4 mr-2" /> Vehicle Listings
          </TabsTrigger>
          <TabsTrigger value="verifications">
            Verifications ({verificationRequests.length})
          </TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicle-listings">
          <VehicleListingsAdmin />
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
                      <a href={user.id_document_url || ''} target="_blank" rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm">View Document →</a>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleVerificationAction(user.id, 'id', 'approve')}>
                          <Check className="h-4 w-4 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="destructive"
                          onClick={() => handleVerificationAction(user.id, 'id', 'reject')}>
                          <X className="h-4 w-4 mr-1" /> Reject
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
                      <a href={user.cac_document_url || ''} target="_blank" rel="noopener noreferrer"
                        className="text-purple-600 hover:underline text-sm">View Document →</a>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleVerificationAction(user.id, 'dealer', 'approve')}>
                          <Check className="h-4 w-4 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="destructive"
                          onClick={() => handleVerificationAction(user.id, 'dealer', 'reject')}>
                          <X className="h-4 w-4 mr-1" /> Reject
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
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
      </Tabs>
    </div>
  );
}
