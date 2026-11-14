import { Suspense } from 'react';
import { Metadata } from 'next';
import { getVehicleListings, getVehicleListingBrands } from '@/lib/vehicle-listings';
import { VehicleListingsClient } from './VehicleListingsClient';

// Deliberately excluded from Google: this page is not registered in
// sitemap-static.xml or app/sitemap.ts, and robots.index is false here.
// The old marketplace's indexable listing pages hurt site-wide rankings, so
// this version stays off the discovery surfaces entirely. Do not add this
// route to any sitemap.
export const metadata: Metadata = {
  title: 'Vehicle Listings | Naira Autos',
  description: 'Browse vehicles curated by Naira Autos.',
  robots: {
    index: false,
    follow: true,
  },
};

// ISR: this page must NOT read searchParams (that forces a fresh serverless
// render + Supabase query on every request). It renders the default first
// page and is cached for 5 minutes; filtered/paginated views are fetched
// client-side from the CDN-cached /api/vehicle-listings/public endpoint.
export const revalidate = 300;

export default async function VehicleListingsPage() {
  const [{ listings, total, page, pageSize }, brands] = await Promise.all([
    getVehicleListings({ sort: 'newest', page: 1 }),
    getVehicleListingBrands(),
  ]);

  return (
    <Suspense fallback={null}>
      <VehicleListingsClient
        initialListings={listings}
        total={total}
        page={page}
        pageSize={pageSize}
        brands={brands}
      />
    </Suspense>
  );
}
