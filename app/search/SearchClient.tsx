'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase, Listing } from '@/lib/supabase';
import { ListingCard } from '@/components/listings/ListingCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, Grid, List, X, ArrowUpDown, MapPin, ChevronRight, Video, Zap, User, Building2, Handshake } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// ─── Constants ────────────────────────────────────────────────────────────────

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Abuja FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];

const BRANDS = [
  'Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Lexus', 'Nissan', 'Ford', 'Hyundai',
  'Kia', 'Volkswagen', 'Audi', 'Land Rover', 'Mazda', 'Peugeot', 'Mitsubishi',
  'Chevrolet', 'Subaru', 'Isuzu', 'Jeep', 'Volvo', 'Infiniti', 'Acura', 'Porsche',
  'Range Rover', 'Jaguar', 'Suzuki', 'Fiat', 'Renault', 'MG', 'Chery', 'BYD', 'Haval',
];

const VEHICLE_TYPES = ['car', 'suv', 'truck', 'van', 'bus', 'bike'];

const CITIES_BY_STATE: Record<string, string[]> = {
  'Lagos':     ['Ikeja', 'Victoria Island', 'Lekki', 'Ikoyi', 'Surulere', 'Yaba', 'Ajah', 'Festac', 'Apapa', 'Oshodi', 'Ikorodu', 'Mushin'],
  'Abuja FCT': ['Central Business District', 'Maitama', 'Wuse', 'Garki', 'Gwarinpa', 'Kubwa', 'Lugbe', 'Asokoro'],
  'Rivers':    ['Port Harcourt', 'Obio-Akpor', 'Eleme', 'Oyigbo', 'Okrika', 'Bonny'],
  'Oyo':       ['Ibadan', 'Ogbomoso', 'Oyo', 'Iseyin', 'Saki', 'Eruwa'],
  'Kano':      ['Kano Municipal', 'Fagge', 'Dala', 'Kano New Layout', 'Nassarawa', 'Gwale'],
  'Kaduna':    ['Kaduna North', 'Kaduna South', 'Tudun Wada', 'Makera', 'Chikun'],
  'Ogun':      ['Abeokuta', 'Sagamu', 'Ijebu-Ode', 'Ota', 'Ilaro'],
  'Delta':     ['Asaba', 'Warri', 'Ughelli', 'Sapele', 'Agbor'],
  'Edo':       ['Benin City', 'Auchi', 'Ekpoma', 'Uromi'],
  'Anambra':   ['Awka', 'Onitsha', 'Nnewi', 'Ekwulobia'],
  'Enugu':     ['Enugu', 'Nsukka', 'Agbani', 'Oji River'],
  'Imo':       ['Owerri', 'Orlu', 'Okigwe', 'Oguta'],
};

const PRICE_STEPS = [
  0, 500000, 1000000, 1500000, 2000000, 3000000, 5000000,
  7000000, 10000000, 15000000, 20000000, 30000000, 50000000,
];
const MAX_PRICE = PRICE_STEPS[PRICE_STEPS.length - 1];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(val: number): string {
  if (val >= 1_000_000) return `\u20a6${(val / 1_000_000).toFixed(val % 1_000_000 === 0 ? 0 : 1)}M`;
  if (val >= 1_000)     return `\u20a6${(val / 1_000).toFixed(0)}K`;
  return `\u20a6${val}`;
}

function snapToStep(raw: number): number {
  return PRICE_STEPS.reduce((prev, curr) =>
    Math.abs(curr - raw) < Math.abs(prev - raw) ? curr : prev,
  );
}

type PrimaryFilter = 'brand' | 'location' | 'price' | 'type' | 'none';

function getPrimaryFilter(brand?: string, state?: string, pmin?: number, pmax?: number, type?: string): PrimaryFilter {
  if (brand) return 'brand';
  if (state) return 'location';
  if ((pmin && pmin > 0) || (pmax && pmax < MAX_PRICE)) return 'price';
  if (type)  return 'type';
  return 'none';
}

// ─── Price Slider ─────────────────────────────────────────────────────────────

function PriceSlider({ minVal, maxVal, onChange }: {
  minVal: number; maxVal: number; onChange: (min: number, max: number) => void;
}) {
  const toPercent = (v: number) => (v / MAX_PRICE) * 100;
  return (
    <div className="px-1">
      <div className="flex justify-between mb-3">
        <span className="text-sm font-semibold text-foreground">{formatPrice(minVal)}</span>
        <span className="text-sm font-semibold text-foreground">
          {maxVal >= MAX_PRICE ? `${formatPrice(MAX_PRICE)}+` : formatPrice(maxVal)}
        </span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="absolute w-full h-1.5 bg-muted rounded-full" />
        <div className="absolute h-1.5 bg-primary rounded-full"
          style={{ left: `${toPercent(minVal)}%`, right: `${100 - toPercent(maxVal)}%` }} />
        <input type="range" min={0} max={MAX_PRICE} step={100000} value={minVal}
          onChange={(e) => { const s = snapToStep(Number(e.target.value)); if (s < maxVal) onChange(s, maxVal); }}
          className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
          style={{ zIndex: minVal > MAX_PRICE * 0.9 ? 5 : 3 }} />
        <input type="range" min={0} max={MAX_PRICE} step={100000} value={maxVal}
          onChange={(e) => { const s = snapToStep(Number(e.target.value)); if (s > minVal) onChange(minVal, s); }}
          className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
          style={{ zIndex: 4 }} />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[10px] text-muted-foreground">\u20a60</span>
        <span className="text-[10px] text-muted-foreground">\u20a650M+</span>
      </div>
    </div>
  );
}

// ─── Toggle chip ──────────────────────────────────────────────────────────────

function ToggleChip({ active, onClick, icon, label }: {
  active: boolean; onClick: () => void; icon?: React.ReactNode; label: string;
}) {
  return (
    <button onClick={onClick} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border shrink-0 transition-all ${
      active ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
    }`}>
      {icon}{label}
    </button>
  );
}

// ─── Similar section ──────────────────────────────────────────────────────────

interface SimilarGroup {
  label: string;
  href: string;
  listings: Listing[];
}

function SimilarSection({ groups, onNavigate }: { groups: SimilarGroup[]; onNavigate: (href: string) => void; }) {
  const hasAny = groups.some(g => g.listings.length > 0);
  if (!hasAny) return null;

  return (
    <div className="border-t pt-8 mt-6">
      <div className="mb-6">
        <h2 className="text-base font-bold text-foreground">You might also like</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Similar listings based on your search</p>
      </div>
      <div className="space-y-8">
        {groups.filter(g => g.listings.length > 0).map(group => (
          <div key={group.label}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">{group.label}</h3>
              <button onClick={() => onNavigate(group.href)}
                className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                See all <ChevronRight className="h-3 w-3" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.listings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [listings,     setListings]     = useState<Listing[]>([]);
  const [similarGroups, setSimilarGroups] = useState<SimilarGroup[]>([]);
  const [loading,      setLoading]      = useState(true);

  // Filter state — mirrors URL on mount
  const [searchTerm,  setSearchTerm]  = useState(searchParams.get('q')      || '');
  const [state,       setState]       = useState(searchParams.get('state')   || '');
  const [area,        setArea]        = useState(searchParams.get('area')    || '');
  const [brand,       setBrand]       = useState(searchParams.get('brand')   || '');
  const [vehicleType, setVehicleType] = useState(searchParams.get('type')    || '');
  const [ownerType,   setOwnerType]   = useState(searchParams.get('owner')   || '');
  const [withVideo,   setWithVideo]   = useState(searchParams.get('video')   === '1');
  const [urgentSale,  setUrgentSale]  = useState(searchParams.get('urgent')  === '1');
  const [priceMin,    setPriceMin]    = useState(() => Number(searchParams.get('pmin') || 0));
  const [priceMax,    setPriceMax]    = useState(() => Number(searchParams.get('pmax') || MAX_PRICE));
  const [sortBy,      setSortBy]      = useState(searchParams.get('sort')    || 'newest');
  const [viewMode,    setViewMode]    = useState<'grid' | 'list'>(
    searchParams.get('view') === 'list' ? 'list' : 'grid'
  );
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSugg,    setShowSugg]    = useState(false);

  const availableAreas = state ? CITIES_BY_STATE[state] || [] : [];

  // ── Suggestions ───────────────────────────────────────────────────────────

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    if (val.length > 1) {
      const lo = val.toLowerCase();
      setSuggestions([
        ...BRANDS.filter(b => b.toLowerCase().includes(lo)),
        ...VEHICLE_TYPES.filter(t => t.toLowerCase().includes(lo)),
      ].slice(0, 6));
      setShowSugg(true);
    } else { setSuggestions([]); setShowSugg(false); }
  };

  // ── Build params helper ───────────────────────────────────────────────────

  const buildParams = useCallback((overrides: Record<string, string> = {}) => {
    const vals: Record<string, string> = {
      q:      searchTerm,
      state,
      area:   area && !area.startsWith('all-') ? area : '',
      brand,
      type:   vehicleType,
      owner:  ownerType,
      video:  withVideo   ? '1' : '',
      urgent: urgentSale  ? '1' : '',
      pmin:   priceMin > 0            ? String(priceMin) : '',
      pmax:   priceMax < MAX_PRICE    ? String(priceMax) : '',
      sort:   sortBy !== 'newest'     ? sortBy           : '',
      view:   viewMode !== 'grid'     ? viewMode         : '',
      ...overrides,
    };
    const p = new URLSearchParams();
    Object.entries(vals).forEach(([k, v]) => { if (v) p.set(k, v); });
    return p;
  }, [searchTerm, state, area, brand, vehicleType, ownerType, withVideo, urgentSale, priceMin, priceMax, sortBy, viewMode]);

  // ── Fetch similar — no duplicates ─────────────────────────────────────────

  const fetchSimilar = useCallback(async (
    excludeIds: Set<string>,
    sp: string | null, bp: string | null, tp: string | null, pmin: number, pmax: number,
  ): Promise<SimilarGroup[]> => {
    const primary = getPrimaryFilter(bp || undefined, sp || undefined, pmin, pmax, tp || undefined);
    const groups: SimilarGroup[] = [];

    // Fetch helper with proper typing
    const fetchGroup = async (q: any): Promise<Listing[]> => {
      const { data } = await q.order('created_at', { ascending: false }).limit(15);
      return ((data as Listing[]) || []).filter(l => !excludeIds.has(l.id)).slice(0, 3);
    };

    if (primary === 'brand') {
      const candidates = BRANDS.filter(b => b.toLowerCase() !== (bp || '').toLowerCase())
        .sort(() => Math.random() - 0.5).slice(0, 5);

      for (const b of candidates) {
        let q = supabase.from('listings').select('*, profiles(*)').eq('status', 'approved').ilike('brand', b);
        if (tp) q = q.eq('vehicle_type', tp.toLowerCase()) as any;
        const ls = await fetchGroup(q);
        if (ls.length) {
          const label = tp ? `${b} ${tp.charAt(0).toUpperCase() + tp.slice(1)}s` : `${b} listings`;
          groups.push({ label, href: `/search?brand=${encodeURIComponent(b)}${tp ? `&type=${tp}` : ''}`, listings: ls });
          ls.forEach(l => excludeIds.add(l.id));
          if (groups.length >= 2) break;
        }
      }
    }

    else if (primary === 'location') {
      const candidates = NIGERIAN_STATES.filter(s => s !== sp)
        .sort(() => Math.random() - 0.5).slice(0, 5);

      for (const s of candidates) {
        let q = supabase.from('listings').select('*, profiles(*)').eq('status', 'approved').eq('location_state', s);
        if (bp) q = q.ilike('brand', bp) as any;
        if (tp) q = q.eq('vehicle_type', tp.toLowerCase()) as any;
        const ls = await fetchGroup(q);
        if (ls.length) {
          const ctx = bp ? `${bp} in ` : tp ? `${tp.charAt(0).toUpperCase() + tp.slice(1)}s in ` : 'Cars in ';
          groups.push({ label: `${ctx}${s}`, href: `/search?state=${encodeURIComponent(s)}`, listings: ls });
          ls.forEach(l => excludeIds.add(l.id));
          if (groups.length >= 2) break;
        }
      }
    }

    else if (primary === 'price') {
      const mid = (pmin + pmax) / 2;
      const idx = PRICE_STEPS.findIndex(s => s >= mid);

      const ranges = [
        idx < PRICE_STEPS.length - 2 ? {
          label: `${formatPrice(PRICE_STEPS[idx])}\u2013${formatPrice(PRICE_STEPS[idx + 1])}`,
          min: PRICE_STEPS[idx], max: PRICE_STEPS[idx + 1],
        } : null,
        idx > 1 ? {
          label: `${formatPrice(PRICE_STEPS[idx - 2])}\u2013${formatPrice(PRICE_STEPS[idx - 1])}`,
          min: PRICE_STEPS[idx - 2], max: PRICE_STEPS[idx - 1],
        } : null,
      ].filter(Boolean) as { label: string; min: number; max: number }[];

      for (const range of ranges) {
        let q = supabase.from('listings').select('*, profiles(*)').eq('status', 'approved')
          .gte('price', range.min).lte('price', range.max);
        if (tp) q = q.eq('vehicle_type', tp.toLowerCase()) as any;
        if (bp) q = q.ilike('brand', bp) as any;
        const ls = await fetchGroup(q);
        if (ls.length) {
          const typeCtx = tp ? `${tp.charAt(0).toUpperCase() + tp.slice(1)}s` : 'Cars';
          groups.push({
            label: `${typeCtx} in the ${range.label} range`,
            href: `/search?pmin=${range.min}&pmax=${range.max}${tp ? `&type=${tp}` : ''}`,
            listings: ls,
          });
          ls.forEach(l => excludeIds.add(l.id));
        }
      }
    }

    else if (primary === 'type') {
      const otherTypes = VEHICLE_TYPES.filter(t => t !== tp?.toLowerCase());

      for (const t of otherTypes) {
        let q = supabase.from('listings').select('*, profiles(*)').eq('status', 'approved').eq('vehicle_type', t);
        if (sp) q = q.eq('location_state', sp) as any;
        if (bp) q = q.ilike('brand', bp) as any;
        const ls = await fetchGroup(q);
        if (ls.length) {
          const typeLabel = t.charAt(0).toUpperCase() + t.slice(1) + (t === 'bus' ? 'es' : 's');
          const ctx = sp ? ` in ${sp}` : '';
          groups.push({ label: `${typeLabel}${ctx}`, href: `/search?type=${t}${sp ? `&state=${encodeURIComponent(sp)}` : ''}`, listings: ls });
          ls.forEach(l => excludeIds.add(l.id));
          if (groups.length >= 2) break;
        }
      }
    }

    return groups;
  }, []);

  // ── Main search ───────────────────────────────────────────────────────────

  const performSearch = useCallback(async () => {
    setLoading(true);
    setSimilarGroups([]);

    const q   = searchParams.get('q');
    const sp  = searchParams.get('state');
    const ap  = searchParams.get('area');
    const bp  = searchParams.get('brand');
    const tp  = searchParams.get('type');
    const op  = searchParams.get('owner');
    const vp  = searchParams.get('video')  === '1';
    const up  = searchParams.get('urgent') === '1';
    const pmin = Number(searchParams.get('pmin') || 0);
    const pmax = Number(searchParams.get('pmax') || MAX_PRICE);
    const sort = searchParams.get('sort') || 'newest';

    let query = supabase.from('listings').select('*, profiles(*)').eq('status', 'approved');

    if (q)                          query = query.or(`brand.ilike.%${q}%,model.ilike.%${q}%,trim.ilike.%${q}%`);
    if (sp)                         query = query.eq('location_state', sp);
    if (ap && !ap.startsWith('all-')) query = query.eq('location_lga', ap);
    if (bp)                         query = query.ilike('brand', bp);
    if (tp)                         query = query.eq('vehicle_type', tp.toLowerCase());
    if (op)                         query = query.eq('seller_type', op);
    if (vp)                         query = query.not('video_url', 'is', null);
    if (up)                         query = query.eq('urgent_sale', true);
    if (pmin > 0)                   query = query.gte('price', pmin);
    if (pmax < MAX_PRICE)           query = query.lte('price', pmax);

    if (sort === 'price_low')       query = query.order('price', { ascending: true });
    else if (sort === 'price_high') query = query.order('price', { ascending: false });
    else                            query = query.order('created_at', { ascending: false });

    const { data } = await query.limit(50);
    const mainListings = (data as Listing[]) || [];
    setListings(mainListings);

    const excludeIds = new Set(mainListings.map(l => l.id));

    const primary = getPrimaryFilter(bp || undefined, sp || undefined, pmin, pmax, tp || undefined);
    if (primary !== 'none') {
      const groups = await fetchSimilar(excludeIds, sp, bp, tp, pmin, pmax);
      setSimilarGroups(groups);
    }

    setLoading(false);
  }, [searchParams, fetchSimilar]);

  useEffect(() => { performSearch(); }, [performSearch]);

  // ── Apply / clear ─────────────────────────────────────────────────────────

  const applyFilters = (overrideQ?: string) => {
    const q = overrideQ !== undefined ? overrideQ : searchTerm;
    const params = new URLSearchParams();
    if (q)                           params.set('q',      q);
    if (state)                       params.set('state',  state);
    if (area && !area.startsWith('all-')) params.set('area', area);
    if (brand)                       params.set('brand',  brand);
    if (vehicleType)                 params.set('type',   vehicleType);
    if (ownerType)                   params.set('owner',  ownerType);
    if (withVideo)                   params.set('video',  '1');
    if (urgentSale)                  params.set('urgent', '1');
    if (priceMin > 0)                params.set('pmin',   String(priceMin));
    if (priceMax < MAX_PRICE)        params.set('pmax',   String(priceMax));
    if (sortBy !== 'newest')         params.set('sort',   sortBy);
    if (viewMode !== 'grid')         params.set('view',   viewMode);
    router.push(`/search?${params.toString()}`);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setState(''); setArea(''); setBrand(''); setVehicleType('');
    setOwnerType(''); setWithVideo(false); setUrgentSale(false);
    setPriceMin(0); setPriceMax(MAX_PRICE); setSearchTerm('');
    router.push('/search');
  };

  const hasPriceFilter   = priceMin > 0 || priceMax < MAX_PRICE;
  const hasActiveFilters = !!(state || area || brand || vehicleType || ownerType || withVideo || urgentSale || searchTerm || hasPriceFilter);
  const activeCount      = [state, brand, vehicleType, ownerType, hasPriceFilter, withVideo, urgentSale, searchTerm].filter(Boolean).length;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background">

      {/* Sticky bar */}
      <div className="bg-background border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3">

          {/* Search input */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search by make, model..." value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                onBlur={() => setTimeout(() => setShowSugg(false), 150)}
                className="pl-9 pr-9 h-10" />
              {searchTerm && (
                <button onClick={() => { setSearchTerm(''); applyFilters(''); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              {showSugg && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-background border rounded-lg mt-1 shadow-xl z-30 overflow-hidden">
                  {suggestions.map((s, i) => (
                    <button key={i} onMouseDown={() => { setSearchTerm(s); setShowSugg(false); applyFilters(s); }}
                      className="w-full text-left px-4 py-2.5 hover:bg-muted text-sm flex items-center gap-2">
                      <Search className="h-3.5 w-3.5 text-muted-foreground" />{s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button onClick={() => applyFilters()} className="h-10 px-4"><Search className="h-4 w-4" /></Button>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}
              className={`h-10 px-3 ${showFilters ? 'bg-primary text-primary-foreground border-primary' : ''}`}>
              <SlidersHorizontal className="h-4 w-4" />
              {activeCount > 0 && (
                <span className={`ml-1.5 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center ${showFilters ? 'bg-primary-foreground text-primary' : 'bg-primary text-white'}`}>
                  {activeCount}
                </span>
              )}
            </Button>
          </div>

          {/* Quick chips */}
          <div className="flex items-center gap-2 mt-2.5 overflow-x-auto pb-0.5 no-scrollbar">
            <ToggleChip active={withVideo} label="With Video" icon={<Video className="h-3 w-3" />}
              onClick={() => { const nv = !withVideo; setWithVideo(nv); router.push(`/search?${buildParams({ video: nv ? '1' : '' })}`); }} />
            <ToggleChip active={urgentSale} label="Urgent Sale" icon={<Zap className="h-3 w-3" />}
              onClick={() => { const nu = !urgentSale; setUrgentSale(nu); router.push(`/search?${buildParams({ urgent: nu ? '1' : '' })}`); }} />
            <div className="w-px h-4 bg-border shrink-0" />
            <ToggleChip active={ownerType === 'owner'}  label="Owner"  icon={<User className="h-3 w-3" />}
              onClick={() => { const v = ownerType === 'owner' ? '' : 'owner'; setOwnerType(v); router.push(`/search?${buildParams({ owner: v })}`); }} />
            <ToggleChip active={ownerType === 'agent'}  label="Agent"  icon={<Handshake className="h-3 w-3" />}
              onClick={() => { const v = ownerType === 'agent' ? '' : 'agent'; setOwnerType(v); router.push(`/search?${buildParams({ owner: v })}`); }} />
            <ToggleChip active={ownerType === 'dealer'} label="Dealer" icon={<Building2 className="h-3 w-3" />}
              onClick={() => { const v = ownerType === 'dealer' ? '' : 'dealer'; setOwnerType(v); router.push(`/search?${buildParams({ owner: v })}`); }} />
          </div>

          {/* Sort & view */}
          <div className="flex items-center justify-between mt-2.5">
            <p className="text-sm text-muted-foreground">
              {loading ? 'Searching\u2026' : `${listings.length} result${listings.length !== 1 ? 's' : ''}`}
              {state && !loading && <span className="text-foreground font-medium"> in {state}</span>}
            </p>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={(val) => { setSortBy(val); router.push(`/search?${buildParams({ sort: val !== 'newest' ? val : '' })}`); }}>
                <SelectTrigger className="h-8 w-[9.5rem] text-xs">
                  <ArrowUpDown className="h-3 w-3 mr-1 shrink-0" /><SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price_low">Price: Low \u2192 High</SelectItem>
                  <SelectItem value="price_high">Price: High \u2192 Low</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md overflow-hidden">
                <button onClick={() => { setViewMode('grid'); router.push(`/search?${buildParams({ view: '' })}`); }}
                  className={`p-1.5 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground'}`}>
                  <Grid className="h-4 w-4" />
                </button>
                <button onClick={() => { setViewMode('list'); router.push(`/search?${buildParams({ view: 'list' })}`); }}
                  className={`p-1.5 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-muted-foreground'}`}>
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <Card className="mt-3 border shadow-lg">
              <CardContent className="pt-4 pb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> State
                    </label>
                    <Select value={state} onValueChange={(v) => { setState(v); setArea(''); }}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Any State" /></SelectTrigger>
                      <SelectContent className="max-h-56">
                        {NIGERIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Area / LGA</label>
                    <Select value={area} onValueChange={setArea} disabled={!state || availableAreas.length === 0}>
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder={state && availableAreas.length === 0 ? 'N/A' : 'Any Area'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={`all-${state}`}>All {state}</SelectItem>
                        {availableAreas.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Brand</label>
                    <Select value={brand} onValueChange={setBrand}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Any Brand" /></SelectTrigger>
                      <SelectContent className="max-h-56">
                        {BRANDS.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Type</label>
                    <Select value={vehicleType} onValueChange={setVehicleType}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Any Type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="car">Car</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="bus">Bus</SelectItem>
                        <SelectItem value="bike">Bike</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-muted-foreground mb-3 block">Price Range</label>
                    <PriceSlider minVal={priceMin} maxVal={priceMax}
                      onChange={(min, max) => { setPriceMin(min); setPriceMax(max); }} />
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-3 border-t">
                  <Button onClick={() => applyFilters()} className="flex-1 h-9">Apply Filters</Button>
                  {hasActiveFilters && <Button variant="outline" onClick={clearFilters} className="h-9 px-4">Clear All</Button>}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Active filter badges */}
      {hasActiveFilters && (
        <div className="bg-muted/40 border-b px-4 py-2 flex flex-wrap gap-1.5 items-center">
          <span className="text-xs text-muted-foreground mr-0.5">Filters:</span>
          {searchTerm && (
            <Badge variant="secondary" className="text-xs gap-1 pr-1">
              &ldquo;{searchTerm}&rdquo;
              <button onClick={() => { setSearchTerm(''); applyFilters(''); }} className="ml-0.5 hover:text-destructive"><X className="h-2.5 w-2.5" /></button>
            </Badge>
          )}
          {state && (
            <Badge variant="secondary" className="text-xs gap-1 pr-1">
              <MapPin className="h-2.5 w-2.5" />{area && !area.startsWith('all-') ? `${area}, ` : ''}{state}
              <button onClick={() => { setState(''); setArea(''); applyFilters(); }} className="ml-0.5 hover:text-destructive"><X className="h-2.5 w-2.5" /></button>
            </Badge>
          )}
          {brand && (
            <Badge variant="secondary" className="text-xs gap-1 pr-1">
              {brand}
              <button onClick={() => { setBrand(''); applyFilters(); }} className="ml-0.5 hover:text-destructive"><X className="h-2.5 w-2.5" /></button>
            </Badge>
          )}
          {vehicleType && (
            <Badge variant="secondary" className="text-xs gap-1 pr-1 capitalize">
              {vehicleType}
              <button onClick={() => { setVehicleType(''); applyFilters(); }} className="ml-0.5 hover:text-destructive"><X className="h-2.5 w-2.5" /></button>
            </Badge>
          )}
          {ownerType && (
            <Badge variant="secondary" className="text-xs gap-1 pr-1 capitalize">
              {ownerType}
              <button onClick={() => { setOwnerType(''); applyFilters(); }} className="ml-0.5 hover:text-destructive"><X className="h-2.5 w-2.5" /></button>
            </Badge>
          )}
          {withVideo && (
            <Badge variant="secondary" className="text-xs gap-1 pr-1">
              <Video className="h-2.5 w-2.5" /> With Video
              <button onClick={() => { setWithVideo(false); applyFilters(); }} className="ml-0.5 hover:text-destructive"><X className="h-2.5 w-2.5" /></button>
            </Badge>
          )}
          {urgentSale && (
            <Badge variant="secondary" className="text-xs gap-1 pr-1">
              <Zap className="h-2.5 w-2.5" /> Urgent Sale
              <button onClick={() => { setUrgentSale(false); applyFilters(); }} className="ml-0.5 hover:text-destructive"><X className="h-2.5 w-2.5" /></button>
            </Badge>
          )}
          {hasPriceFilter && (
            <Badge variant="secondary" className="text-xs gap-1 pr-1">
              {formatPrice(priceMin)} &ndash; {priceMax >= MAX_PRICE ? `${formatPrice(MAX_PRICE)}+` : formatPrice(priceMax)}
              <button onClick={() => { setPriceMin(0); setPriceMax(MAX_PRICE); applyFilters(); }} className="ml-0.5 hover:text-destructive"><X className="h-2.5 w-2.5" /></button>
            </Badge>
          )}
        </div>
      )}

      {/* Results */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {loading ? (
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[1,2,3,4,5,6].map(i => <div key={i} className="bg-card rounded-xl h-52 animate-pulse border" />)}
          </div>
        ) : listings.length === 0 ? (
          <Card>
            <CardContent className="text-center py-16">
              <Search className="h-14 w-14 text-muted-foreground mx-auto mb-4 opacity-40" />
              <p className="text-base font-semibold text-foreground mb-1">No vehicles found</p>
              <p className="text-sm text-muted-foreground mb-4">Try adjusting or clearing your filters</p>
              {hasActiveFilters && <Button variant="outline" onClick={clearFilters} size="sm">Clear All Filters</Button>}
            </CardContent>
          </Card>
        ) : (
          <>
            {similarGroups.some(g => g.listings.length > 0) && (
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Search Results &middot; {listings.length} listing{listings.length !== 1 ? 's' : ''}
              </p>
            )}
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {listings.map(listing => (
                <ListingCard key={listing.id} listing={listing} variant={viewMode} />
              ))}
            </div>
          </>
        )}

        {!loading && (
          <>
            <SimilarSection groups={similarGroups} onNavigate={(href) => router.push(href)} />

            <div className="mt-10 pt-8 border-t">
              <div className="bg-muted/30 rounded-xl p-6 text-center">
                <h3 className="text-base font-bold text-foreground mb-1">Can&apos;t find what you&apos;re looking for?</h3>
                <p className="text-sm text-muted-foreground mb-4">Post a request and let sellers bring matching vehicles to you.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => router.push('/requests/create')}>Create a Request</Button>
                  <Button variant="outline" onClick={() => router.push('/requests/view')}>Browse Requests</Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}