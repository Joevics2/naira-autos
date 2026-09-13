// lib/vehicle-listings.ts
//
// Data layer for the new /vehicle-listings page. Deliberately independent
// from the old marketplace code (lib/-listing-cache.ts, lib/-car-cache.ts,
// the old `Listing` type in lib/supabase.ts) — new tables, new types.

import { supabase } from '@/lib/supabase';

export type VehicleCondition = 'foreign_used' | 'nigerian_used' | 'brand_new';
export type VehicleListingStatus = 'active' | 'sold' | 'draft';

export interface VehicleListing {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  condition: VehicleCondition | null;
  transmission: string | null;
  fuel_type: string | null;
  body_type: string | null;
  color: string | null;
  mileage: number | null;
  location: string | null;
  description: string | null;
  features: string[];
  images: string[];
  video_url: string | null;
  whatsapp: string | null;
  status: VehicleListingStatus;
  is_featured: boolean;
  views: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type VehicleListingInput = Omit<
  VehicleListing,
  'id' | 'views' | 'created_at' | 'updated_at'
>;

export interface VehicleRequest {
  id: string;
  name: string;
  whatsapp: string;
  email: string | null;
  brand: string | null;
  model: string | null;
  budget_min: number | null;
  budget_max: number | null;
  notes: string | null;
  status: 'new' | 'contacted' | 'fulfilled' | 'closed';
  created_at: string;
}

export type VehicleRequestInput = Omit<VehicleRequest, 'id' | 'status' | 'created_at'>;

export type VehicleSort = 'newest' | 'price_asc' | 'price_desc';

export interface VehicleListingFilters {
  brand?: string;
  condition?: VehicleCondition;
  bodyType?: string;
  priceMin?: number;
  priceMax?: number;
  sort?: VehicleSort;
  page?: number;
  pageSize?: number;
}

const DEFAULT_PAGE_SIZE = 12;

export async function getVehicleListings(filters: VehicleListingFilters) {
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = filters.pageSize ?? DEFAULT_PAGE_SIZE;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('vehicle_listings')
    .select('*', { count: 'exact' })
    .eq('status', 'active');

  if (filters.brand) query = query.ilike('brand', filters.brand);
  if (filters.condition) query = query.eq('condition', filters.condition);
  if (filters.bodyType) query = query.ilike('body_type', filters.bodyType);
  if (typeof filters.priceMin === 'number') query = query.gte('price', filters.priceMin);
  if (typeof filters.priceMax === 'number') query = query.lte('price', filters.priceMax);

  switch (filters.sort) {
    case 'price_asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price_desc':
      query = query.order('price', { ascending: false });
      break;
    default:
      query = query.order('is_featured', { ascending: false }).order('created_at', { ascending: false });
  }

  const { data, count, error } = await query.range(from, to);

  if (error) {
    console.error('getVehicleListings error:', error);
    return { listings: [] as VehicleListing[], total: 0, page, pageSize };
  }

  return { listings: (data || []) as VehicleListing[], total: count || 0, page, pageSize };
}

// Distinct brands among active listings, for the filter dropdown.
export async function getVehicleListingBrands(): Promise<string[]> {
  const { data, error } = await supabase
    .from('vehicle_listings')
    .select('brand')
    .eq('status', 'active');

  if (error || !data) return [];
  return Array.from(new Set(data.map((row) => row.brand))).sort();
}

export function formatVehiclePrice(price: number, currency: string = 'NGN') {
  if (currency === 'NGN') {
    return `₦${price.toLocaleString('en-NG')}`;
  }
  return `${currency} ${price.toLocaleString()}`;
}
