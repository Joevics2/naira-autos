'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MessageSquarePlus, Calendar, MapPin, DollarSign, Car, User, Phone, Mail, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

interface Request {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  state: string;
  vehicle_type: string;
  brand: string;
  model: string;
  year_from: number | null;
  year_to: number | null;
  budget_min: number | null;
  budget_max: number | null;
  additional_details: string;
  created_at: string;
  status: string;
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (data) {
      setRequests(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 mb-20">
      <div className="mb-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Buyer Requests</h1>
          <p className="text-muted-foreground">Active requests from buyers looking for specific vehicles</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => router.push('/requests/create')} className="bg-primary hover:bg-primary/90 flex-1">Create Request</Button>
          <Button onClick={() => router.push('/requests/view')} variant="outline" className="flex-1">View My Requests</Button>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800">
          <strong>Disclaimer:</strong> Buyer requests are posted by users. Always verify vehicle details and seller information before making any payments or commitments.
        </p>
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <MessageSquarePlus className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Requests Yet</h3>
            <p className="text-muted-foreground mb-4">Be the first to post a buyer request</p>
            <Button onClick={() => router.push('/requests/create')} className="bg-primary hover:bg-primary/90">
              Create Request
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">
                      {request.brand || 'Any'} {request.model || 'Vehicle'}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Posted {format(new Date(request.created_at), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/10">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground capitalize">{request.vehicle_type || 'Any'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{request.state || 'Any'}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {(request.year_from || request.year_to) && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Year: {request.year_from || 'Any'} - {request.year_to || 'Any'}
                      </span>
                    </div>
                  )}
                  {(request.budget_min || request.budget_max) && (
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Budget: ₦{request.budget_min?.toLocaleString() || 'Any'} - ₦{request.budget_max?.toLocaleString() || 'Any'}
                      </span>
                    </div>
                  )}
                </div>

                <Button onClick={() => setSelectedRequest(request)} className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">
                    {selectedRequest.brand || 'Any'} {selectedRequest.model || 'Vehicle'}
                  </h3>
                  <p className="text-muted-foreground capitalize">{selectedRequest.vehicle_type || 'Any'}</p>
                </div>
                <Badge className="bg-green-500/10 text-green-600">Active</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedRequest.state || 'Any'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedRequest.year_from || 'Any'} - {selectedRequest.year_to || 'Any'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>₦{(selectedRequest.budget_min || 0).toLocaleString()} - ₦{(selectedRequest.budget_max || 0).toLocaleString()}</span>
                </div>
              </div>

              {selectedRequest.additional_details && (
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm font-medium mb-1">Additional Details:</p>
                  <p className="text-sm">{selectedRequest.additional_details}</p>
                </div>
              )}

              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Contact Information:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedRequest.full_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedRequest.phone}</span>
                  </div>
                  {selectedRequest.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedRequest.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
