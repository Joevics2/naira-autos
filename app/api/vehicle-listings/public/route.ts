import { NextRequest, NextResponse } from 'next/server';
import { getVehicleListings, VehicleCondition, VehicleSort } from '@/lib/vehicle-listings';

// Public, CDN-cached listing search. Filtered views of /vehicle-listings
// fetch from here so the page itself can stay statically cached.
export const revalidate = 300;

const ALLOWED_SORTS: VehicleSort[] = ['newest', 'price_asc', 'price_desc'];
const ALLOWED_CONDITIONS: VehicleCondition[] = ['foreign_used', 'nigerian_used', 'brand_new'];

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const condition = sp.get('condition') as VehicleCondition;
  const sort = sp.get('sort') as VehicleSort;
  const priceMin = Number(sp.get('price_min'));
  const priceMax = Number(sp.get('price_max'));
  const page = Number(sp.get('page'));

  const result = await getVehicleListings({
    q: sp.get('q') || undefined,
    brand: sp.get('brand') || undefined,
    condition: ALLOWED_CONDITIONS.includes(condition) ? condition : undefined,
    bodyType: sp.get('body_type') || undefined,
    priceMin: sp.get('price_min') && Number.isFinite(priceMin) ? priceMin : undefined,
    priceMax: sp.get('price_max') && Number.isFinite(priceMax) ? priceMax : undefined,
    sort: ALLOWED_SORTS.includes(sort) ? sort : 'newest',
    page: Number.isFinite(page) && page > 1 ? page : 1,
  });

  return NextResponse.json(result, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
  });
}
