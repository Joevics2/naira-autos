'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Gauge, MapPin, MessageCircle, Phone, Search, ShoppingBag, SlidersHorizontal, Tag, X } from 'lucide-react';
import { formatVehiclePrice, VehicleListing } from '@/lib/vehicle-listings';

const WHATSAPP_NUMBER = '2349032047288';

// Shared dark-theme overrides — the shadcn Input/Select defaults are
// light-mode (white bg, dark text), which read as washed-out boxes on
// this page's dark background. These match the rest of the page's
// bg-white/5 + border-white/10 styling instead.
const darkFieldClass =
  'bg-white/5 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-amber-400/50';

interface Filters {
  q?: string;
  brand?: string;
  condition?: string;
  bodyType?: string;
  priceMin?: number;
  priceMax?: number;
  sort?: string;
}

interface Props {
  initialListings: VehicleListing[];
  total: number;
  page: number;
  pageSize: number;
  brands: string[];
  filters: Filters;
}

const CONDITION_LABELS: Record<string, string> = {
  foreign_used: 'Foreign Used (Tokunbo)',
  nigerian_used: 'Nigerian Used',
  brand_new: 'Brand New',
};

export function VehicleListingsClient({ initialListings, total, page, pageSize, brands, filters }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.q || '');

  const activeFilterCount = [filters.brand, filters.condition, filters.priceMin, filters.priceMax].filter(
    Boolean
  ).length;

  function updateQuery(next: Partial<Filters & { page: number }>) {
    const params = new URLSearchParams();
    const merged = { ...filters, page: 1, ...next };

    if (merged.q) params.set('q', merged.q);
    if (merged.brand) params.set('brand', merged.brand);
    if (merged.condition) params.set('condition', merged.condition);
    if (merged.bodyType) params.set('body_type', merged.bodyType);
    if (merged.priceMin) params.set('price_min', String(merged.priceMin));
    if (merged.priceMax) params.set('price_max', String(merged.priceMax));
    if (merged.sort && merged.sort !== 'newest') params.set('sort', merged.sort);
    if (merged.page && merged.page > 1) params.set('page', String(merged.page));

    router.push(`${pathname}?${params.toString()}`);
  }

  function runSearch() {
    updateQuery({ q: searchTerm.trim() || undefined });
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-20">
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/"
            className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/15 hover:border-amber-400/40 text-white/60 hover:text-amber-400 transition-all flex-shrink-0"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
          <span className="text-xs text-white/30">Home / Vehicle Listings</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-2">Vehicle Listings</h1>
        <p className="text-white/50 text-sm mb-6">
          Vehicles curated and verified by the Naira Autos team.
        </p>

        {/* Search + Filter toggle + Sort — compact row, filters stay hidden until asked for */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <Input
              placeholder="Search by make, model..."
              className={`pl-9 ${darkFieldClass}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && runSearch()}
              onBlur={runSearch}
            />
          </div>
          <Button
            variant="outline"
            className={`flex-shrink-0 gap-2 ${activeFilterCount > 0 ? 'border-amber-400/50 text-amber-400' : ''}`}
            onClick={() => setShowFilters((v) => !v)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
            {activeFilterCount > 0 && <span className="text-xs">({activeFilterCount})</span>}
          </Button>
        </div>

        {showFilters && (
          <FilterBar brands={brands} filters={filters} onChange={updateQuery} onClose={() => setShowFilters(false)} />
        )}

        <div className="grid sm:grid-cols-2 gap-3 mt-4 mb-6">
          <RequestCarCard />
          <SellYourCarCard />
        </div>

        {initialListings.length === 0 ? (
          <div className="text-center py-16 text-white/40">
            No vehicles match these filters right now. Try widening your search.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {initialListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => updateQuery({ page: page - 1 })}
            >
              Previous
            </Button>
            <span className="text-sm text-white/50 px-2">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => updateQuery({ page: page + 1 })}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterBar({
  brands,
  filters,
  onChange,
  onClose,
}: {
  brands: string[];
  filters: Filters;
  onChange: (next: Partial<Filters & { page: number }>) => void;
  onClose: () => void;
}) {
  return (
    <Card className="bg-white/5 border-white/10 mt-3">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-white/70">Filters</span>
          <div className="flex items-center gap-3">
            <button
              className="text-xs text-white/40 hover:text-white/70"
              onClick={() => onChange({ brand: undefined, condition: undefined, priceMin: undefined, priceMax: undefined })}
            >
              Clear all
            </button>
            <button onClick={onClose} className="text-white/40 hover:text-white/70">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-3">
          <Select value={filters.brand || 'all'} onValueChange={(v) => onChange({ brand: v === 'all' ? undefined : v })}>
            <SelectTrigger className={darkFieldClass}><SelectValue placeholder="Brand" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((b) => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.condition || 'all'}
            onValueChange={(v) => onChange({ condition: v === 'all' ? undefined : v })}
          >
            <SelectTrigger className={darkFieldClass}><SelectValue placeholder="Condition" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Condition</SelectItem>
              {Object.entries(CONDITION_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Min price (₦)"
            className={darkFieldClass}
            defaultValue={filters.priceMin || ''}
            onBlur={(e) => onChange({ priceMin: e.target.value ? Number(e.target.value) : undefined })}
          />

          <Input
            type="number"
            placeholder="Max price (₦)"
            className={darkFieldClass}
            defaultValue={filters.priceMax || ''}
            onBlur={(e) => onChange({ priceMax: e.target.value ? Number(e.target.value) : undefined })}
          />

          <Select value={filters.sort || 'newest'} onValueChange={(v) => onChange({ sort: v })}>
            <SelectTrigger className={darkFieldClass}><SelectValue placeholder="Sort" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

function ListingCard({ listing }: { listing: VehicleListing }) {
  const image = listing.images?.[0];
  const whatsapp = listing.whatsapp || '+2349032047288';
  const waLink = `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hi, I'm interested in the ${listing.title} listed on Naira Autos.`
  )}`;

  return (
    <Card className="bg-white/5 border-white/10 overflow-hidden">
      <div className="aspect-video bg-white/10 relative">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={listing.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">No image</div>
        )}
        {listing.is_featured && (
          <span className="absolute top-2 left-2 bg-amber-400 text-black text-xs font-semibold px-2 py-0.5 rounded">
            Featured
          </span>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-white leading-snug">{listing.title}</h3>
        <p className="text-amber-400 font-bold mt-1">{formatVehiclePrice(listing.price, listing.currency)}</p>
        <div className="flex items-center gap-3 text-xs text-white/40 mt-2">
          {listing.mileage != null && (
            <span className="flex items-center gap-1"><Gauge className="h-3 w-3" />{listing.mileage.toLocaleString()} km</span>
          )}
          {(listing.lga || listing.state) && (
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{[listing.lga, listing.state].filter(Boolean).join(', ')}</span>
          )}
        </div>

        <Accordion type="single" collapsible className="mt-3">
          <AccordionItem value="details" className="border-white/10">
            <AccordionTrigger className="text-sm text-white/70 hover:text-amber-400 py-2">
              See Details
            </AccordionTrigger>
            <AccordionContent>
              <dl className="grid grid-cols-2 gap-y-1.5 text-xs text-white/60 mb-3">
                {listing.condition && (
                  <>
                    <dt className="text-white/30">Condition</dt>
                    <dd>{CONDITION_LABELS[listing.condition] || listing.condition}</dd>
                  </>
                )}
                {listing.transmission && (
                  <>
                    <dt className="text-white/30">Transmission</dt>
                    <dd>{listing.transmission}</dd>
                  </>
                )}
                {listing.fuel_type && (
                  <>
                    <dt className="text-white/30">Fuel</dt>
                    <dd>{listing.fuel_type}</dd>
                  </>
                )}
                {listing.body_type && (
                  <>
                    <dt className="text-white/30">Body Type</dt>
                    <dd>{listing.body_type}</dd>
                  </>
                )}
                {listing.color && (
                  <>
                    <dt className="text-white/30">Color</dt>
                    <dd>{listing.color}</dd>
                  </>
                )}
                <dt className="text-white/30">Year</dt>
                <dd>{listing.year}</dd>
              </dl>

              {listing.description && (
                <p className="text-sm text-white/70 mb-3 whitespace-pre-line">{listing.description}</p>
              )}

              {listing.features?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {listing.features.map((f) => (
                    <span key={f} className="text-[11px] bg-white/10 rounded-full px-2 py-0.5 text-white/60">
                      {f}
                    </span>
                  ))}
                </div>
              )}

              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Phone className="h-4 w-4 mr-2" /> Contact on WhatsApp
                </Button>
              </a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

function RequestCarCard() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', whatsapp: '', brand: '', model: '', budget_max: '', notes: '' });

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi, I'm looking for a car and couldn't find what I want on Naira Autos. Can you help me find one?"
  )}`;

  async function submit() {
    if (!form.name || !form.whatsapp) {
      toast({ title: 'Missing info', description: 'Name and WhatsApp number are required.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/vehicle-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, budget_max: form.budget_max ? Number(form.budget_max) : undefined }),
      });
      if (!res.ok) throw new Error();
      toast({ title: 'Request sent', description: "We'll reach out on WhatsApp when we find a match." });
      setForm({ name: '', whatsapp: '', brand: '', model: '', budget_max: '', notes: '' });
      setOpen(false);
    } catch {
      toast({ title: 'Something went wrong', description: 'Please try again.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setShowForm(false); }}>
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-amber-400/10 flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="h-4 w-4 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white leading-tight">Buy For Me</p>
            <p className="text-xs text-white/40 truncate">Can't find your car? We'll source it.</p>
          </div>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="flex-shrink-0 border-amber-400/40 text-amber-400 hover:bg-amber-400/10">
              Ask
            </Button>
          </DialogTrigger>
        </CardContent>
      </Card>

      <DialogContent className="bg-[#0f0f16] border-white/10 text-white max-w-sm">
        <DialogHeader>
          <DialogTitle>Buy For Me</DialogTitle>
        </DialogHeader>

        {!showForm ? (
          <div className="space-y-3">
            <p className="text-sm text-white/60">
              Tell us what car you're after and we'll help you find it. Fastest way is WhatsApp.
            </p>
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </Button>
            </a>
            <button
              onClick={() => setShowForm(true)}
              className="w-full text-center text-xs text-white/40 hover:text-white/70 py-1"
            >
              Or fill a quick form instead
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Input placeholder="Your name" className={darkFieldClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="WhatsApp number" className={darkFieldClass} value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Brand" className={darkFieldClass} value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
              <Input placeholder="Model" className={darkFieldClass} value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
            </div>
            <Input placeholder="Max budget (₦)" type="number" className={darkFieldClass} value={form.budget_max} onChange={(e) => setForm({ ...form, budget_max: e.target.value })} />
            <Textarea placeholder="Anything else we should know?" className={darkFieldClass} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} />
            <Button onClick={submit} disabled={submitting} className="w-full">
              {submitting ? 'Sending...' : 'Send Request'}
            </Button>
            <button
              onClick={() => setShowForm(false)}
              className="w-full text-center text-xs text-white/40 hover:text-white/70 py-1"
            >
              Back to WhatsApp option
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SellYourCarCard() {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="p-3 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-amber-400/10 flex items-center justify-center flex-shrink-0">
          <Tag className="h-4 w-4 text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white leading-tight">Sell Your Car</p>
          <p className="text-xs text-white/40 truncate">We market it and handle buyers for you.</p>
        </div>
        <Link href="/sell-for-me" className="flex-shrink-0">
          <Button size="sm" variant="outline" className="border-amber-400/40 text-amber-400 hover:bg-amber-400/10">
            Sell
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
