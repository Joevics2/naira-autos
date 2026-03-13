import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugParam = await params;
  const slug = slugParam.slug;
  
  // Extract UUID from slug using regex — same logic as page.tsx
  const uuidMatch = slug.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  const id = uuidMatch ? uuidMatch[0] : slug;
  
  const { data: listing } = await supabase
    .from('listings')
    .select('title, price, images, brand, model, year, location_state, location_lga, condition, transmission, mileage, color, fuel_type')
    .eq('id', id)
    .maybeSingle();

  if (!listing) {
    return {
      title: 'Listing Not Found | Naira Autos',
    };
  }

  const imageUrl = listing.images && listing.images.length > 0 
    ? listing.images[0] 
    : '/og-image.png';

  const location = listing.location_lga ? `${listing.location_lga}, ${listing.location_state || 'Nigeria'}` : 'Nigeria';
  
  const listingSlug = `${listing.year}-${listing.brand.toLowerCase()}-${listing.model.toLowerCase().replace(/\s+/g, '-')}-${id}`;
  
  return {
    title: `${listing.year} ${listing.brand} ${listing.model} for Sale in ${location} | Naira Autos`,
    description: `Buy this ${listing.year} ${listing.brand} ${listing.model} - ${listing.condition || 'Used'} ${listing.transmission || ''} with ${listing.mileage?.toLocaleString() || '0'} km. Price: ₦${listing.price.toLocaleString()}. Location: ${location}.`,
    keywords: `${listing.brand} ${listing.model} for sale, used cars Nigeria, buy ${listing.brand} ${listing.model}, car dealers Lagos, ${listing.year} ${listing.brand}, ${listing.fuel_type} cars`,
    openGraph: {
      title: `${listing.year} ${listing.brand} ${listing.model} - ₦${listing.price.toLocaleString()}`,
      description: `Buy this ${listing.year} ${listing.brand} ${listing.model} for ₦${listing.price.toLocaleString()} in ${location}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
      url: `https://nairaautos.com/listing/${listingSlug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${listing.year} ${listing.brand} ${listing.model} - ₦${listing.price.toLocaleString()}`,
      description: `Buy this ${listing.year} ${listing.brand} ${listing.model} for ₦${listing.price.toLocaleString()} in ${location}`,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://nairaautos.com/listing/${listingSlug}`,
    },
  };
}

export default function ListingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}