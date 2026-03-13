'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
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
import { Edit, Trash2, CheckCircle, Clock, XCircle, MessageSquarePlus } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Cars & SUVs
const BRANDS = [
  'Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Lexus', 'Nissan', 'Ford', 'Hyundai',
  'Kia', 'Volkswagen', 'Audi', 'Land Rover', 'Mazda', 'Peugeot', 'Mitsubishi',
  'Chevrolet', 'Subaru', 'Isuzu', 'Jeep', 'Volvo', 'Infiniti', 'Acura', 'Porsche',
  'Range Rover', 'Jaguar', 'Suzuki', 'Fiat', 'Renault', 'Opel', 'MG',
  'Chery', 'BYD', 'Haval', 'GAC', 'JAC', 'Innoson',
  'MAN', 'Scania', 'Hino', 'FUSO', 'Sinotruk', 'Shacman', 'Dongfeng', 'Foton',
  'Yutong', 'King Long', 'Higer', 'Ashok Leyland',
  'Yamaha', 'Bajaj', 'TVS', 'Haojue',
  'Other',

];

const NIGERIAN_STATES = [
  'Lagos', 'Abuja FCT', 'Kano', 'Rivers', 'Oyo', 'Kaduna', 'Ogun', 'Edo', 'Delta', 'Anambra',
  'Imo', 'Katsina', 'Enugu', 'Bauchi', 'Plateau', 'Cross River', 'Akwa Ibom', 'Borno', 'Osun',
  'Ondo', 'Kwara', 'Benue', 'Abia', 'Sokoto', 'Nasarawa', 'Adamawa', 'Kebbi', 'Taraba',
  'Niger', 'Gombe', 'Jigawa', 'Yobe', 'Zamfara', 'Ekiti', 'Bayelsa', 'Ebonyi', 'Kogi'
];

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

export default function MyRequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editRequest, setEditRequest] = useState<Request | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadRequests();
    }
  }, [user]);

  const loadRequests = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('email', user.email)
      .order('created_at', { ascending: false });

    if (data) {
      setRequests(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('requests')
      .delete()
      .eq('id', id)
      .eq('email', user?.email);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete request',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Request deleted successfully',
      });
      loadRequests();
    }
    setDeleteId(null);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editRequest) return;

    setEditLoading(true);
    try {
      const { error } = await supabase
        .from('requests')
        .update({
          state: editRequest.state || null,
          vehicle_type: editRequest.vehicle_type,
          brand: editRequest.brand || null,
          model: editRequest.model || null,
          year_from: editRequest.year_from || null,
          year_to: editRequest.year_to || null,
          budget_min: editRequest.budget_min || null,
          budget_max: editRequest.budget_max || null,
          additional_details: editRequest.additional_details,
        })
        .eq('id', editRequest.id)
        .eq('email', user?.email);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Request updated successfully',
      });
      setEditRequest(null);
      loadRequests();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setEditLoading(false);
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 mb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
<h1 className="text-3xl font-bold text-foreground mb-2">My Buyer Requests</h1>
          <p className="text-muted-foreground">Vehicle requests you've made</p>
        </div>
        <Button onClick={() => router.push('/requests/create')} className="bg-primary hover:bg-primary/90">
          <MessageSquarePlus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
<MessageSquarePlus className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Requests Yet</h3>
            <p className="text-muted-foreground mb-4">Create a request and let sellers come to you</p>
            <Button onClick={() => router.push('/requests/create')} className="bg-primary hover:bg-primary/90">
              Create Request
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
<h3 className="text-lg font-semibold text-foreground">
                      {request.brand} {request.model}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Posted {format(new Date(request.created_at), 'MMM d, yyyy')}
                    </p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>

<div className="grid grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground">Vehicle Type:</span> {request.vehicle_type}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Location:</span> {request.state}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Year Range:</span> {request.year_from || 'Any'} - {request.year_to || 'Any'}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Budget:</span> {request.budget_min ? `₦${request.budget_min.toLocaleString()} - ₦${request.budget_max?.toLocaleString()}` : 'Not specified'}
                  </div>
                </div>

                {request.additional_details && (
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg mb-4">
                    {request.additional_details}
                  </p>
                )}

                <div className="flex gap-2">
                  {request.status === 'approved' && (
                    <Badge className="bg-primary/10 text-primary">
                      Visible to sellers
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditRequest(request)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => setDeleteId(request.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
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
              This action cannot be undone. This will permanently delete your request.
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

      <AlertDialog open={!!editRequest} onOpenChange={() => setEditRequest(null)}>
        <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Request</AlertDialogTitle>
          </AlertDialogHeader>
          {editRequest && (
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <Label>State *</Label>
                <Select value={editRequest.state || ''} onValueChange={(v) => setEditRequest({ ...editRequest, state: v })} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {NIGERIAN_STATES.map((st) => (
                      <SelectItem key={st} value={st}>{st}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Vehicle Type *</Label>
                <Select value={editRequest.vehicle_type} onValueChange={(v) => setEditRequest({ ...editRequest, vehicle_type: v })} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Brand</Label>
                  <Select value={editRequest.brand || ''} onValueChange={(v) => setEditRequest({ ...editRequest, brand: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {BRANDS.map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Model</Label>
                  <Input
                    value={editRequest.model || ''}
                    onChange={(e) => setEditRequest({ ...editRequest, model: e.target.value })}
                    placeholder="e.g., Camry, Accord"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Year Range (From)</Label>
                  <Input
                    type="number"
                    value={editRequest.year_from || ''}
                    onChange={(e) => setEditRequest({ ...editRequest, year_from: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="e.g., 2015"
                    min="1990"
                    max={new Date().getFullYear()}
                  />
                </div>
                <div>
                  <Label>Year Range (To)</Label>
                  <Input
                    type="number"
                    value={editRequest.year_to || ''}
                    onChange={(e) => setEditRequest({ ...editRequest, year_to: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="e.g., 2020"
                    min="1990"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Budget Min (₦)</Label>
                  <Input
                    type="number"
                    value={editRequest.budget_min || ''}
                    onChange={(e) => setEditRequest({ ...editRequest, budget_min: e.target.value ? parseFloat(e.target.value) : null })}
                    placeholder="e.g., 2000000"
                    min="0"
                  />
                </div>
                <div>
                  <Label>Budget Max (₦)</Label>
                  <Input
                    type="number"
                    value={editRequest.budget_max || ''}
                    onChange={(e) => setEditRequest({ ...editRequest, budget_max: e.target.value ? parseFloat(e.target.value) : null })}
                    placeholder="e.g., 5000000"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <Label>Additional Details</Label>
                <Textarea
                  value={editRequest.additional_details || ''}
                  onChange={(e) => setEditRequest({ ...editRequest, additional_details: e.target.value })}
                  rows={5}
                  placeholder="Describe what you're looking for..."
                />
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                <Button type="submit" disabled={editLoading}>
                  {editLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </AlertDialogFooter>
            </form>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
