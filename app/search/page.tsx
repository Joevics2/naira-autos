'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase, Listing } from '@/lib/supabase';
import { ListingCard } from '@/components/listings/ListingCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, Grid, List, X, ArrowUpDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const NIGERIAN_STATES = [
  'Lagos', 'Abuja FCT', 'Kano', 'Rivers', 'Oyo', 'Kaduna', 'Ogun', 'Edo', 'Delta', 'Anambra',
  'Imo', 'Katsina', 'Enugu', 'Plateau', 'Cross River', 'Akwa Ibom', 'Borno', 'Osun',
  'Ondo', 'Kwara', 'Benue', 'Abia', 'Sokoto', 'Nasarawa', 'Adamawa', 'Kebbi', 'Taraba',
  'Niger', 'Gombe', 'Jigawa', 'Yobe', 'Zamfara', 'Ekiti', 'Bayelsa', 'Ebonyi', 'Kogi'
];

const BRANDS = [
  'Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Lexus', 'Nissan', 'Ford', 'Hyundai',
  'Kia', 'Volkswagen', 'Audi', 'Land Rover', 'Mazda', 'Peugeot', 'Mitsubishi',
  'Chevrolet', 'Subaru', 'Isuzu', 'Jeep', 'Volvo', 'Infiniti', 'Acura', 'Porsche',
  'Range Rover', 'Jaguar', 'Suzuki', 'Fiat', 'Renault', 'MG', 'Chery', 'BYD', 'Haval'
];

const VEHICLE_TYPES = ['car', 'suv', 'truck', 'van', 'bus', 'bike'];

const CITIES_BY_STATE: Record<string, string[]> = {
  'Lagos': ['Ikeja', 'Victoria Island', 'Lekki', 'Ikoyi', 'Surulere', 'Yaba', 'Ajah', 'Festac', 'Apapa', 'Oshodi'],
  'Abuja FCT': ['Central Business District', 'Maitama', 'Wuse', 'Garki', 'Gwarinpa', 'Kubwa'],
  'Rivers': ['Port Harcourt', 'Obio-Akpor', 'Eleme', 'Oyigbo', 'Okrika'],
  'Oyo': ['Ibadan', 'Ogbomoso', 'Oyo', 'Iseyin', 'Saki'],
  'Kano': ['Kano Municipal', 'Fagge', 'Dala', 'Kano New Layout'],
  'Kaduna': ['Kaduna North', 'Kaduna South', 'Tudun Wada', 'Makera'],
};

const PRICE_RANGES = [
  { label: 'Any', min: 0, max: null },
  { label: 'Under ₦1M', min: 0, max: 1000000 },
  { label: '₦1M - ₦3M', min: 1000000, max: 3000000 },
  { label: '₦3M - ₦5M', min: 3000000, max: 5000000 },
  { label: '₦5M - ₦10M', min: 5000000, max: 10000000 },
  { label: '₦10M - ₦20M', min: 10000000, max: 20000000 },
  { label: 'Above ₦20M', min: 20000000, max: null },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [discoverByLocation, setDiscoverByLocation] = useState<Listing[]>([]);
  const [discoverByBrand, setDiscoverByBrand] = useState<Listing[]>([]);
  const [discoverByPrice, setDiscoverByPrice] = useState<Listing[]>([]);
  const [discoverByType, setDiscoverByType] = useState<Listing[]>([]);
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const [state, setState] = useState(searchParams.get('state') || localStorage.getItem('user_state') || '');
  const [area, setArea] = useState(searchParams.get('area') || localStorage.getItem('user_area') || '');
  const [brand, setBrand] = useState(searchParams.get('brand') || '');
  const [vehicleType, setVehicleType] = useState(searchParams.get('type') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || '');
  
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(searchParams.get('view') === 'list' ? 'list' : 'grid');

  const availableAreas = state ? CITIES_BY_STATE[state] || [] : [];

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.length > 1) {
      const searchLower = value.toLowerCase();
      const brandMatches = BRANDS.filter(b => b.toLowerCase().includes(searchLower));
      const typeMatches = VEHICLE_TYPES.filter(t => t.toLowerCase().includes(searchLower));
      setSuggestions([...brandMatches, ...typeMatches].slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    performSearch();
  };

  const clearSearch = () => {
    setSearchTerm('');
    localStorage.removeItem('user_state');
    localStorage.removeItem('user_area');
    router.push('/search');
  };

  useEffect(() => {
    performSearch();
  }, [searchParams, sortBy]);

  const performSearch = async () => {
    setLoading(true);
    const savedState = localStorage.getItem('user_state');
    const savedArea = localStorage.getItem('user_area');

    let query = supabase.from('listings').select('*, profiles(*)').eq('status', 'approved');

    const q = searchParams.get('q');
    if (q) {
      query = query.or(`brand.ilike.%${q}%,model.ilike.%${q}%`);
    }

    const stateParam = searchParams.get('state') || savedState;
    if (stateParam) {
      query = query.eq('location_state', stateParam);
    }

    const areaParam = searchParams.get('area') || savedArea;
    if (areaParam && !areaParam.startsWith('all-')) {
      query = query.eq('location_lga', areaParam);
    }

    const br = searchParams.get('brand');
    if (br) {
      query = query.ilike('brand', br);
    }

    const type = searchParams.get('type');
    if (type) {
      if (type.toLowerCase() === 'car' || type.toLowerCase() === 'suv' || type.toLowerCase() === 'truck' || type.toLowerCase() === 'van' || type.toLowerCase() === 'bus' || type.toLowerCase() === 'bike') {
        query = query.eq('vehicle_type', type.toLowerCase());
      } else {
        query = query.ilike('vehicle_type', `%${type}%`);
      }
    }

    const price = searchParams.get('price');
    if (price) {
      const range = PRICE_RANGES.find(r => r.label === price);
      if (range) {
        if (range.min) query = query.gte('price', range.min);
        if (range.max) query = query.lte('price', range.max);
      }
    }

    const sort = searchParams.get('sort') || 'newest';
    if (sort === 'price_low') query = query.order('price', { ascending: true });
    else if (sort === 'price_high') query = query.order('price', { ascending: false });
    else query = query.order('created_at', { ascending: false });

    const { data } = await query.limit(50);

    setListings((data as any) || []);

    // Run all discovery fetches in parallel
    const [locResult, brandResult, priceResult, typeResult] = await Promise.all([
      // By location — latest 10 in that state
      stateParam
        ? supabase.from('listings').select('*, profiles(*)')
            .eq('status', 'approved').eq('location_state', stateParam)
            .order('created_at', { ascending: false }).limit(10)
        : Promise.resolve({ data: [] }),

      // By brand — latest 10 of that brand
      br
        ? supabase.from('listings').select('*, profiles(*)')
            .eq('status', 'approved').ilike('brand', br)
            .order('created_at', { ascending: false }).limit(10)
        : Promise.resolve({ data: [] }),

      // By price range — latest 10 in that range
      (() => {
        const priceParam = searchParams.get('price');
        const range = priceParam ? PRICE_RANGES.find(r => r.label === priceParam) : null;
        if (!range) return Promise.resolve({ data: [] });
        let q = supabase.from('listings').select('*, profiles(*)')
          .eq('status', 'approved');
        if (range.min) q = q.gte('price', range.min);
        if (range.max) q = q.lte('price', range.max);
        return q.order('created_at', { ascending: false }).limit(10);
      })(),

      // By vehicle type — latest 10 of that type
      searchParams.get('type')
        ? supabase.from('listings').select('*, profiles(*)')
            .eq('status', 'approved').eq('vehicle_type', searchParams.get('type')!.toLowerCase())
            .order('created_at', { ascending: false }).limit(10)
        : Promise.resolve({ data: [] }),
    ]);

    setDiscoverByLocation((locResult.data as any) || []);
    setDiscoverByBrand((brandResult.data as any) || []);
    setDiscoverByPrice((priceResult.data as any) || []);
    setDiscoverByType((typeResult.data as any) || []);

    setLoading(false);
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (state) params.set('state', state);
    if (area && !area.startsWith('all-')) params.set('area', area);
    if (brand) params.set('brand', brand);
    if (vehicleType) params.set('type', vehicleType);
    if (priceRange) params.set('price', priceRange);
    if (sortBy !== 'newest') params.set('sort', sortBy);
    if (viewMode !== 'grid') params.set('view', viewMode);

    router.push(`/search?${params.toString()}`);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setState(localStorage.getItem('user_state') || '');
    setArea(localStorage.getItem('user_area') || '');
    setBrand('');
    setVehicleType('');
    setPriceRange('');
    setSearchTerm('');
    localStorage.removeItem('user_state');
    localStorage.removeItem('user_area');
    router.push('/search');
  };

  const hasActiveFilters = state || area || brand || vehicleType || priceRange || searchTerm;

  return (
    <div className="min-h-screen bg-background">
      {/* Search Bar */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                className="pl-10 pr-10"
              />
              {searchTerm && (
                <button onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-background border rounded-md mt-1 shadow-lg z-20">
                  {suggestions.map((suggestion, index) => (
                    <button key={index} onClick={() => handleSuggestionClick(suggestion)} className="w-full text-left px-4 py-2 hover:bg-muted text-foreground">{suggestion}</button>
                  ))}
                </div>
              )}
            </div>
            <Button onClick={performSearch}><Search className="h-5 w-5" /></Button>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className={showFilters ? 'bg-primary text-primary-foreground' : ''}>
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Sort & View Toggle */}
          <div className="flex items-center justify-between mt-3">
            <p className="text-sm text-muted-foreground">{listings.length} results</p>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={(val) => { setSortBy(val); const params = new URLSearchParams(searchParams); params.set('sort', val); router.push(`/search?${params}`); }}>
                <SelectTrigger className="h-8 w-40 text-xs"><ArrowUpDown className="h-3 w-3 mr-1" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md">
                <button onClick={() => { setViewMode('grid'); const params = new URLSearchParams(searchParams); params.set('view', 'grid'); router.push(`/search?${params}`); }} className={`p-1.5 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground'}`}><Grid className="h-4 w-4" /></button>
                <button onClick={() => { setViewMode('list'); const params = new URLSearchParams(searchParams); params.set('view', 'list'); router.push(`/search?${params}`); }} className={`p-1.5 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-muted-foreground'}`}><List className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <Card className="mt-3">
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-3">
                  {/* Location */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">State</label>
                    <Select value={state} onValueChange={(val) => { setState(val); setArea(''); }}>
                      <SelectTrigger><SelectValue placeholder="Any State" /></SelectTrigger>
                      <SelectContent>{NIGERIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Area</label>
                    <Select value={area} onValueChange={setArea} disabled={!state}>
                      <SelectTrigger><SelectValue placeholder="Any Area" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value={`all-${state}`}>All {state}</SelectItem>
                        {availableAreas.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Brand/Type */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Brand</label>
                    <Select value={brand} onValueChange={setBrand}>
                      <SelectTrigger><SelectValue placeholder="Any Brand" /></SelectTrigger>
                      <SelectContent>{BRANDS.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Type</label>
                    <Select value={vehicleType} onValueChange={setVehicleType}>
                      <SelectTrigger><SelectValue placeholder="Any Type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="car">Car</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="bus">Bus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Price */}
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Price Range</label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger><SelectValue placeholder="Any Price" /></SelectTrigger>
                      <SelectContent>
                        {PRICE_RANGES.map(p => <SelectItem key={p.label} value={p.label}>{p.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={applyFilters} className="flex-1">Apply Filters</Button>
                  {hasActiveFilters && <Button variant="outline" onClick={clearFilters}>Clear All</Button>}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="bg-muted/30 px-4 py-2 flex flex-wrap gap-2 items-center">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {searchTerm && <Badge variant="secondary" className="text-xs">Search: {searchTerm} <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => { setSearchTerm(''); performSearch(); }} /></Badge>}
          {state && <Badge variant="secondary" className="text-xs">{state} <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => { setState(''); performSearch(); }} /></Badge>}
          {brand && <Badge variant="secondary" className="text-xs">{brand} <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => { setBrand(''); performSearch(); }} /></Badge>}
          {vehicleType && <Badge variant="secondary" className="text-xs">{vehicleType} <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => { setVehicleType(''); performSearch(); }} /></Badge>}
          {priceRange && <Badge variant="secondary" className="text-xs">{priceRange} <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => { setPriceRange(''); performSearch(); }} /></Badge>}
        </div>
      )}

      {/* Results */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {loading ? (
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[1,2,3,4,5,6].map(i => <div key={i} className="bg-card rounded-lg h-48 animate-pulse" />)}
          </div>
        ) : listings.length === 0 ? (
          <Card><CardContent className="pt-6 text-center py-12"><Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" /><p className="text-lg text-foreground mb-2">No vehicles found</p><p className="text-muted-foreground text-sm">Try adjusting your filters</p></CardContent></Card>
        ) : (
          <>
            <div className={`grid gap-4 mb-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {listings.map(listing => <ListingCard key={listing.id} listing={listing} variant={viewMode} />)}
            </div>
          </>
        )}

        {/* ── Discovery sections — shown regardless of main results ── */}
        {!loading && (
          <>
                      {/* ── Discovery: by location ── */}
                      {discoverByLocation.length > 0 && (
                        <div className="border-t pt-8 mt-4">
                          <div className="flex items-center justify-between mb-1">
                            <h2 className="text-lg font-bold text-foreground">More in {searchParams.get('state')}</h2>
                            <button
                              onClick={() => router.push(`/search?state=${searchParams.get('state')}`)}
                              className="text-sm text-primary font-medium hover:underline"
                            >See all →</button>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">Latest listings in {searchParams.get('state')}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {discoverByLocation.map(listing => <ListingCard key={listing.id} listing={listing} />)}
                          </div>
                        </div>
                      )}
          
                      {/* ── Discovery: by brand ── */}
                      {discoverByBrand.length > 0 && (
                        <div className="border-t pt-8 mt-4">
                          <div className="flex items-center justify-between mb-1">
                            <h2 className="text-lg font-bold text-foreground">More {searchParams.get('brand')} listings</h2>
                            <button
                              onClick={() => router.push(`/search?brand=${searchParams.get('brand')}`)}
                              className="text-sm text-primary font-medium hover:underline"
                            >See all →</button>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">Latest {searchParams.get('brand')} cars on Naira Autos</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {discoverByBrand.map(listing => <ListingCard key={listing.id} listing={listing} />)}
                          </div>
                        </div>
                      )}
          
                      {/* ── Discovery: by price range ── */}
                      {discoverByPrice.length > 0 && (
                        <div className="border-t pt-8 mt-4">
                          <div className="flex items-center justify-between mb-1">
                            <h2 className="text-lg font-bold text-foreground">More in {searchParams.get('price')}</h2>
                            <button
                              onClick={() => router.push(`/search?price=${encodeURIComponent(searchParams.get('price') || '')}`)}
                              className="text-sm text-primary font-medium hover:underline"
                            >See all →</button>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">Latest listings in this price range</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {discoverByPrice.map(listing => <ListingCard key={listing.id} listing={listing} />)}
                          </div>
                        </div>
                      )}
          
                      {/* ── Discovery: by vehicle type ── */}
                      {discoverByType.length > 0 && (
                        <div className="border-t pt-8 mt-4">
                          <div className="flex items-center justify-between mb-1">
                            <h2 className="text-lg font-bold text-foreground capitalize">More {searchParams.get('type')}s on Naira Autos</h2>
                            <button
                              onClick={() => router.push(`/search?type=${searchParams.get('type')}`)}
                              className="text-sm text-primary font-medium hover:underline"
                            >See all →</button>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">Latest {searchParams.get('type')} listings</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {discoverByType.map(listing => <ListingCard key={listing.id} listing={listing} />)}
                          </div>
                        </div>
                      )}
          
                      {/* Request Buttons */}
                      <div className="mt-12 pt-8 border-t">
                        <div className="bg-muted/30 rounded-xl p-6 text-center">
                          <h3 className="text-lg font-bold text-foreground mb-2">Can't find what you're looking for?</h3>
                          <p className="text-muted-foreground mb-4">Create a request and let sellers come to you with matching vehicles.</p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button onClick={() => router.push('/requests/create')} className="bg-primary hover:bg-primary/90">
                              Create Request
                            </Button>
                            <Button variant="outline" onClick={() => router.push('/requests/view')}>
                              Browse Requests
                            </Button>
                          </div>
                        </div>
                      </div>
          
          </>
        )}
      </div>
    </div>
  );
}