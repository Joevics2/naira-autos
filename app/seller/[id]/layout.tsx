import { createClient } from '@supabase/supabase-js';
import { Metadata } from 'next';

// Server-side Supabase client using service role key — bypasses RLS for metadata generation
// Safe here because this runs server-side only and the key is never sent to the browser
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const idParam = await params;
  const rawId = idParam.id;

  // Support both plain UUID and slug format (e.g. john-doe-dealer-<uuid>)
  const uuidMatch = rawId.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  const id = uuidMatch ? uuidMatch[0] : rawId;
  
  const { data: seller } = await supabase
    .from('profiles')
    .select('full_name, business_name, role, created_at')
    .eq('id', id)
    .maybeSingle();

  if (!seller) {
    return {
      title: 'Seller Not Found | Naira Autos',
    };
  }

  const sellerName = seller.business_name || seller.full_name || 'Seller';
  const roleLabel = seller.role === 'dealer' ? 'car-dealer' : seller.role === 'agent' ? 'car-agent' : 'car-owner';
  
  const slug = `${sellerName.toLowerCase().replace(/\s+/g, '-')}-${roleLabel}-${id}`;
  
  return {
    title: `${sellerName} - ${roleLabel.replace('-', ' ')} in Nigeria | Naira Autos`,
    description: `View ${sellerName}'s car listings in Nigeria. ${roleLabel.replace('-', ' ')} with verified listings on Naira Autos marketplace.`,
    keywords: `car dealer Nigeria, car seller Lagos, buy cars from dealer, ${sellerName} cars, verified car seller Nigeria`,
    openGraph: {
      title: `${sellerName} - ${roleLabel.replace('-', ' ')} | Naira Autos`,
      description: `View ${sellerName}'s car listings in Nigeria`,
      type: 'website',
      url: `https://naira.autos/seller/${slug}`,
    },
    alternates: {
      canonical: `https://naira.autos/seller/${slug}`,
    },
  };
}

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}