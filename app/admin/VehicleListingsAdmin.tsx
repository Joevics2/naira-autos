'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadImagesToR2 } from '@/lib/r2';
import { VehicleListing, VehicleListingInput, VehicleRequest } from '@/lib/vehicle-listings';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Pencil, Plus, Trash2, Upload, X } from 'lucide-react';

const EMPTY_FORM: VehicleListingInput = {
  title: '', brand: '', model: '', year: new Date().getFullYear(),
  price: 0, currency: 'NGN', condition: 'foreign_used', transmission: '',
  fuel_type: '', body_type: '', color: '', mileage: null, location: '',
  description: '', features: [], images: [], video_url: '', whatsapp: '',
  status: 'active', is_featured: false, created_by: null,
};

async function authedFetch(url: string, options: RequestInit = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token || ''}`,
    },
  });
}

export function VehicleListingsAdmin() {
  const { toast } = useToast();
  const [listings, setListings] = useState<VehicleListing[]>([]);
  const [requests, setRequests] = useState<VehicleRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<VehicleListingInput>(EMPTY_FORM);
  const [images, setImages] = useState<string[]>([]);
  const [manualImageUrl, setManualImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [featuresText, setFeaturesText] = useState('');
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const [listingsRes, requestsRes] = await Promise.all([
        authedFetch('/api/vehicle-listings'),
        authedFetch('/api/vehicle-requests'),
      ]);
      const listingsData = await listingsRes.json();
      const requestsData = await requestsRes.json();
      setListings(listingsData.listings || []);
      setRequests(requestsData.requests || []);
    } catch {
      toast({ title: 'Error', description: 'Failed to load vehicle data', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImages([]);
    setFeaturesText('');
    setDialogOpen(true);
  }

  function openEdit(listing: VehicleListing) {
    setEditingId(listing.id);
    setForm(listing);
    setImages(listing.images || []);
    setFeaturesText((listing.features || []).join(', '));
    setDialogOpen(true);
  }

  async function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      // Uploads to R2 first; uploadImagesToR2 automatically falls back to
      // Supabase storage per-file if R2 isn't configured or a PUT fails.
      const urls = await uploadImagesToR2(files);
      if (urls.length < files.length) {
        toast({
          title: 'Some images failed to upload',
          description: `${urls.length} of ${files.length} uploaded.`,
          variant: 'destructive',
        });
      }
      setImages((prev) => [...prev, ...urls]);
    } catch {
      toast({ title: 'Upload failed', description: 'Please try again.', variant: 'destructive' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  function addManualImageUrl() {
    if (!manualImageUrl.trim()) return;
    setImages((prev) => [...prev, manualImageUrl.trim()]);
    setManualImageUrl('');
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((u) => u !== url));
  }

  async function save() {
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        year: Number(form.year),
        mileage: form.mileage ? Number(form.mileage) : null,
        images,
        features: featuresText.split(',').map((s) => s.trim()).filter(Boolean),
      };

      const res = await authedFetch('/api/vehicle-listings', {
        method: editingId ? 'PATCH' : 'POST',
        body: JSON.stringify(editingId ? { id: editingId, ...payload } : payload),
      });
      if (!res.ok) throw new Error((await res.json()).error);

      toast({ title: 'Saved', description: `Listing ${editingId ? 'updated' : 'created'}.` });
      setDialogOpen(false);
      load();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to save listing', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this listing? This cannot be undone.')) return;
    const res = await authedFetch(`/api/vehicle-listings?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast({ title: 'Deleted' });
      load();
    } else {
      toast({ title: 'Error', description: 'Failed to delete listing', variant: 'destructive' });
    }
  }

  async function setStatus(id: string, status: VehicleListing['status']) {
    const res = await authedFetch('/api/vehicle-listings', { method: 'PATCH', body: JSON.stringify({ id, status }) });
    if (res.ok) {
      toast({ title: 'Updated', description: `Marked as ${status}.` });
      load();
    }
  }

  if (loading) return <p className="text-muted-foreground text-sm">Loading...</p>;

  return (
    <Tabs defaultValue="listings" className="space-y-4">
      <TabsList>
        <TabsTrigger value="listings">Listings ({listings.length})</TabsTrigger>
        <TabsTrigger value="requests">Buyer Requests ({requests.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="listings" className="space-y-4">
        <div className="flex justify-end">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate}><Plus className="h-4 w-4 mr-2" /> Add Listing</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Listing' : 'New Listing'}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Title (e.g. 2015 Toyota Camry)" className="col-span-2"
                  value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <Input placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
                <Input placeholder="Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
                <Input placeholder="Year" type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
                <Input placeholder="Price (₦)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />

                <Select value={form.condition || ''} onValueChange={(v) => setForm({ ...form, condition: v as any })}>
                  <SelectTrigger><SelectValue placeholder="Condition" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="foreign_used">Foreign Used</SelectItem>
                    <SelectItem value="nigerian_used">Nigerian Used</SelectItem>
                    <SelectItem value="brand_new">Brand New</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Body type (e.g. SUV)" value={form.body_type || ''} onChange={(e) => setForm({ ...form, body_type: e.target.value })} />
                <Input placeholder="Transmission" value={form.transmission || ''} onChange={(e) => setForm({ ...form, transmission: e.target.value })} />
                <Input placeholder="Fuel type" value={form.fuel_type || ''} onChange={(e) => setForm({ ...form, fuel_type: e.target.value })} />
                <Input placeholder="Color" value={form.color || ''} onChange={(e) => setForm({ ...form, color: e.target.value })} />
                <Input placeholder="Mileage (km)" type="number" value={form.mileage || ''} onChange={(e) => setForm({ ...form, mileage: Number(e.target.value) })} />
                <Input placeholder="Location" value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                <Input placeholder="Seller WhatsApp (optional override)" value={form.whatsapp || ''} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />

                <Textarea placeholder="Description" className="col-span-2" rows={3}
                  value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <Textarea placeholder="Features, comma separated (e.g. Reverse camera, Leather seats)" className="col-span-2" rows={2}
                  value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} />
                <div className="col-span-2 space-y-2">
                  <div className="flex gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploading ? (
                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Uploading...</>
                      ) : (
                        <><Upload className="h-4 w-4 mr-2" /> Upload Images</>
                      )}
                    </Button>
                    <Input
                      placeholder="...or paste an image URL"
                      value={manualImageUrl}
                      onChange={(e) => setManualImageUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addManualImageUrl())}
                    />
                    <Button type="button" variant="outline" onClick={addManualImageUrl}>Add</Button>
                  </div>
                  {images.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {images.map((url) => (
                        <div key={url} className="relative w-16 h-16 rounded overflow-hidden border">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(url)}
                            className="absolute top-0 right-0 bg-black/70 text-white rounded-bl p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save Listing'}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {listings.map((listing) => (
          <Card key={listing.id}>
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{listing.title}</p>
                <p className="text-sm text-muted-foreground">
                  ₦{listing.price.toLocaleString()} · {listing.year} · {listing.location || '—'}
                </p>
                <Badge variant={listing.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                  {listing.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {listing.status !== 'sold' && (
                  <Button size="sm" variant="outline" onClick={() => setStatus(listing.id, 'sold')}>Mark Sold</Button>
                )}
                {listing.status !== 'active' && (
                  <Button size="sm" variant="outline" onClick={() => setStatus(listing.id, 'active')}>Activate</Button>
                )}
                <Button size="sm" variant="outline" onClick={() => openEdit(listing)}><Pencil className="h-4 w-4" /></Button>
                <Button size="sm" variant="destructive" onClick={() => remove(listing.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {listings.length === 0 && <p className="text-muted-foreground text-sm">No listings yet.</p>}
      </TabsContent>

      <TabsContent value="requests" className="space-y-4">
        {requests.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{r.name} · {r.whatsapp}</p>
                  <p className="text-sm text-muted-foreground">
                    {[r.brand, r.model].filter(Boolean).join(' ') || 'Any brand/model'}
                    {r.budget_max ? ` · up to ₦${Number(r.budget_max).toLocaleString()}` : ''}
                  </p>
                  {r.notes && <p className="text-sm mt-1">{r.notes}</p>}
                </div>
                <Badge variant="secondary">{r.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
        {requests.length === 0 && <p className="text-muted-foreground text-sm">No requests yet.</p>}
      </TabsContent>
    </Tabs>
  );
}
