'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { MessageSquarePlus, ArrowLeft } from 'lucide-react';

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

export default function CreateRequestPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, profile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactWhatsApp, setContactWhatsApp] = useState('');

  const [state, setState] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  useEffect(() => {
    if (profile) {
      setContactName(profile.full_name || '');
      setContactPhone(profile.phone || '');
      setContactWhatsApp(profile.whatsapp ? String(profile.whatsapp) : '');
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user && (!contactName.trim() || !contactPhone.trim())) {
      toast({
        title: 'Contact Information Required',
        description: 'Please provide your name and phone number',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const whatsappValue = user
        ? (profile?.whatsapp ? Number(profile.whatsapp) : null)
        : contactWhatsApp.trim() ? Number(contactWhatsApp.trim()) : null;

      const { error } = await supabase.from('requests').insert({
        full_name: user
          ? (profile?.full_name || user.email?.split('@')[0] || 'User')
          : contactName.trim(),
        email: user?.email || null,
        phone: user
          ? (profile?.phone || null)
          : contactPhone.trim() || null,
        whatsapp: whatsappValue,
        state: state || null,
        vehicle_type: vehicleType,
        brand: brand || null,
        model: model || null,
        year_from: yearFrom ? parseInt(yearFrom) : null,
        year_to: yearTo ? parseInt(yearTo) : null,
        budget_min: budgetMin ? parseFloat(budgetMin) : null,
        budget_max: budgetMax ? parseFloat(budgetMax) : null,
        additional_details: additionalDetails,
        status: 'pending',
      });

      if (error) throw error;

      toast({
        title: 'Request Submitted!',
        description: 'Your request has been submitted. Sellers will contact you if they have matching vehicles.',
      });

      router.push('/requests');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-24 md:pb-8">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <MessageSquarePlus className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Create Vehicle Request</h1>
        </div>
        <p className="text-muted-foreground">
          Tell us what you're looking for and we'll help you find the perfect vehicle
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!user && (
          <Card>
            <CardHeader>
              <CardTitle>Your Contact Information</CardTitle>
              <CardDescription>Sellers will contact you with matching vehicles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name *</Label>
                  <Input
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label>Phone Number *</Label>
                  <Input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="e.g., 08012345678"
                    required
                  />
                </div>
              </div>
              <div>
                <Label>WhatsApp Number (Optional)</Label>
                <Input
                  type="tel"
                  value={contactWhatsApp}
                  onChange={(e) => setContactWhatsApp(e.target.value)}
                  placeholder="e.g., 08012345678"
                />
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Preferences</CardTitle>
            <CardDescription>What vehicle are you looking for?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>State *</Label>
              <Select value={state} onValueChange={setState} required>
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
              <Select value={vehicleType} onValueChange={setVehicleType} required>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Brand (Optional)</Label>
                <Select value={brand} onValueChange={setBrand}>
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
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g., Camry, Accord"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Year Range (From)</Label>
                <Input
                  type="number"
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  placeholder="e.g., 2015"
                  min="1990"
                  max={new Date().getFullYear()}
                />
              </div>
              <div>
                <Label>Year Range (To)</Label>
                <Input
                  type="number"
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                  placeholder="e.g., 2020"
                  min="1990"
                  max={new Date().getFullYear()}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Budget Min (₦)</Label>
                <Input
                  type="number"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  placeholder="e.g., 2000000"
                  min="0"
                />
              </div>
              <div>
                <Label>Budget Max (₦)</Label>
                <Input
                  type="number"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  placeholder="e.g., 5000000"
                  min="0"
                />
              </div>
            </div>

            <div>
              <Label>Additional Details</Label>
              <Textarea
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                rows={5}
                placeholder="Describe what you're looking for... Include preferences like color, transmission, fuel type, condition, etc."
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </form>
    </div>
  );
}