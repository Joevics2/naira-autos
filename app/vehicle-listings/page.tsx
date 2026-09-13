import { Metadata } from 'next';
import {
  getVehicleListings,
  getVehicleListingBrands,
  VehicleCondition,
  VehicleSort,
} from '@/lib/vehicle-listings';
import { VehicleListingsClient } from './VehicleListingsClient';

// Deliberately excluded from Google: this page is not registered in
// sitemap-static.xml or app/sitemap.ts, and robots.index is false here.
// See the conversation history / CLAUDE.md note below for why — the old
// marketplace's indexable listing pages hurt site-wide rankings, so this
// version stays off the discovery surfaces entirely rather than repeating
// that mistake. Do not add this route to any sitemap.
export const metadata: Metadata = {
  title: 'Vehicle Listings | Naira Autos',
  description: 'Browse vehicles curated by Naira Autos.',
  robots: {
    index: false,
    follow: true,
  },
};

interface PageProps {
  searchParams: {
    q?: string;
    brand?: string;
    condition?: string;
    body_type?: string;
    price_min?: string;
    price_max?: string;
    sort?: string;
    page?: string;
  };
}

const ALLOWED_SORTS: VehicleSort[] = ['newest', 'price_asc', 'price_desc'];
const ALLOWED_CONDITIONS: VehicleCondition[] = ['foreign_used', 'nigerian_used', 'brand_new'];

export default async function VehicleListingsPage({ searchParams }: PageProps) {
  const filters = {
    q: searchParams.q || undefined,
    brand: searchParams.brand || undefined,
    condition: ALLOWED_CONDITIONS.includes(searchParams.condition as VehicleCondition)
      ? (searchParams.condition as VehicleCondition)
      : undefined,
    bodyType: searchParams.body_type || undefined,
    priceMin: searchParams.price_min ? Number(searchParams.price_min) : undefined,
    priceMax: searchParams.price_max ? Number(searchParams.price_max) : undefined,
    sort: ALLOWED_SORTS.includes(searchParams.sort as VehicleSort)
      ? (searchParams.sort as VehicleSort)
      : 'newest',
    page: searchParams.page ? Math.max(1, Number(searchParams.page)) : 1,
  };

  const [{ listings, total, page, pageSize }, brands] = await Promise.all([
    getVehicleListings(filters),
    getVehicleListingBrands(),
  ]);

  return (
    <VehicleListingsClient
      initialListings={listings}
      total={total}
      page={page}
      pageSize={pageSize}
      brands={brands}
      filters={{
        q: filters.q,
        brand: filters.brand,
        condition: filters.condition,
        bodyType: filters.bodyType,
        priceMin: filters.priceMin,
        priceMax: filters.priceMax,
        sort: filters.sort,
      }}
    />
  );
}
