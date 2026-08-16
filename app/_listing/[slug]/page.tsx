import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ListingDetailClient } from './client';

type Props = {
  params: Promise<{ slug: string }>;
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function extractUuid(slug: string): string {
  const match = slug.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  return match ? match[0] : slug;
}

function buildListingSlug(listing: any): string {
  const brand = (listing.brand || 'car').toLowerCase().replace(/\s+/g, '-');
  const model = (listing.model || 'vehicle').toLowerCase().replace(/\s+/g, '-');
  return `${listing.year}-${brand}-${model}-${listing.id}`;
}

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = extractUuid(slug);

  const { data: listing } = await supabase
    .from('listings')
    .select('id, title, price, images, brand, model, year, location_state, location_lga, condition, transmission, mileage, color, fuel_type, description, body_type, video_url')
    .eq('id', id)
    .maybeSingle();

  if (!listing) {
    return { title: 'Listing Not Found | Naira Autos' };
  }

  const firstImage = listing.images?.[0] ?? '/og-image.png';
  const location = [listing.location_lga, listing.location_state ?? 'Nigeria'].filter(Boolean).join(', ');
  const canonical = `https://www.naira.autos/listing/${buildListingSlug(listing)}`;
  const conditionLabel = listing.condition === 'brand_new' ? 'Brand New' : listing.condition === 'foreign_used' ? 'Foreign Used' : 'Nigerian Used';
  const title = `${listing.year} ${listing.brand} ${listing.model} for Sale in ${location} | Naira Autos`;
  const description = `Buy this ${listing.year} ${listing.brand} ${listing.model} (${conditionLabel}) in ${location}. ${listing.transmission ? listing.transmission + ' transmission. ' : ''}${listing.mileage ? listing.mileage.toLocaleString() + ' km. ' : ''}Price: ₦${listing.price.toLocaleString()}. ${listing.description ? listing.description.slice(0, 100) + '...' : ''}`;

  return {
    title,
    description,
    keywords: [
      `${listing.brand} ${listing.model} for sale Nigeria`,
      `${listing.year} ${listing.brand} ${listing.model}`,
      `buy ${listing.brand} in ${listing.location_state}`,
      `used cars ${listing.location_state}`,
      `${listing.fuel_type ?? ''} cars Nigeria`,
      `${listing.body_type ?? ''} cars for sale`,
      'car marketplace Nigeria',
      'naira autos',
    ].filter(Boolean).join(', '),
    openGraph: {
      title: `${listing.year} ${listing.brand} ${listing.model} — ₦${listing.price.toLocaleString()}`,
      description: `${conditionLabel} · ${listing.transmission ?? ''} · ${listing.mileage?.toLocaleString() ?? '0'} km · ${location}`,
      url: canonical,
      type: 'website',
      images: listing.images?.slice(0, 4).map((img: string, i: number) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: `${listing.year} ${listing.brand} ${listing.model} — photo ${i + 1}`,
      })) ?? [{ url: firstImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${listing.year} ${listing.brand} ${listing.model} — ₦${listing.price.toLocaleString()}`,
      description: `${conditionLabel} · ${location} · ₦${listing.price.toLocaleString()}`,
      images: [{ url: firstImage, alt: `${listing.year} ${listing.brand} ${listing.model}` }],
    },
    alternates: { canonical },
    robots: { index: true, follow: true },
  };
}

// ── Page (Server Component) ───────────────────────────────────────────────────
export default async function ListingDetailPage({ params }: Props) {
  const { slug } = await params;
  const id = extractUuid(slug);

  const { data: listing } = await supabase
    .from('listings')
    .select('*, profiles(*)')
    .eq('id', id)
    .maybeSingle();

  if (!listing) notFound();

  const location = [listing.city_area, listing.location_lga, listing.location_state].filter(Boolean).join(', ');
  const canonical = `https://www.naira.autos/listing/${buildListingSlug(listing)}`;
  const firstImage = listing.images?.[0] ?? '/og-image.png';
  const conditionLabel = listing.condition === 'brand_new' ? 'Brand New' : listing.condition === 'foreign_used' ? 'Foreign Used' : 'Nigerian Used';

  // ── JSON-LD: Vehicle (Car) ─────────────────────────────────────────────────
  const vehicleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${listing.year} ${listing.brand} ${listing.model}`,
    description: listing.description ?? `${listing.year} ${listing.brand} ${listing.model} for sale in ${location} at ₦${listing.price.toLocaleString()}.`,
    url: canonical,
    image: listing.images?.map((img: string, i: number) => ({
      '@type': 'ImageObject',
      url: img,
      name: `${listing.year} ${listing.brand} ${listing.model} — photo ${i + 1}`,
      description: `${listing.year} ${listing.brand} ${listing.model} ${listing.color ?? ''} for sale in ${location}`,
    })) ?? [{ '@type': 'ImageObject', url: firstImage }],
    brand: { '@type': 'Brand', name: listing.brand },
    model: listing.model,
    modelDate: listing.year?.toString(),
    vehicleModelDate: listing.year?.toString(),
    fuelType: listing.fuel_type ?? undefined,
    vehicleTransmission: listing.transmission ?? undefined,
    color: listing.color ?? undefined,
    bodyType: listing.body_type ?? undefined,
    vehicleConfiguration: listing.trim ?? undefined,
    numberOfDoors: listing.doors ?? undefined,
    mileageFromOdometer: listing.mileage != null
      ? { '@type': 'QuantitativeValue', value: listing.mileage, unitCode: 'KMT' }
      : undefined,
    itemCondition: listing.condition === 'brand_new'
      ? 'https://schema.org/NewCondition'
      : 'https://schema.org/UsedCondition',
    offers: {
      '@type': 'Offer',
      price: listing.price,
      priceCurrency: 'NGN',
      availability: 'https://schema.org/InStock',
      url: canonical,
      priceValidUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      seller: {
        '@type': listing.seller_type === 'dealer' ? 'AutoDealer' : 'Person',
        name: listing.profiles?.business_name ?? listing.profiles?.full_name ?? 'Naira Autos Seller',
      },
    },
    // Video with thumbnail using first listing image — fixes GSC video indexing
    ...(listing.video_url
      ? {
          video: {
            '@type': 'VideoObject',
            name: `${listing.year} ${listing.brand} ${listing.model} — Video Walkthrough`,
            description: `Video inspection of this ${listing.year} ${listing.brand} ${listing.model} listed on Naira Autos.`,
            thumbnailUrl: firstImage,
            contentUrl: listing.video_url,
            embedUrl: listing.video_url.includes('youtube.com') || listing.video_url.includes('youtu.be')
              ? `https://www.youtube.com/embed/${listing.video_url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=))([^\/&?\n]*)/)?.[1]}`
              : listing.video_url,
            uploadDate: listing.created_at?.split('T')[0] ?? new Date().toISOString().split('T')[0],
            publisher: {
              '@type': 'Organization',
              name: 'Naira Autos',
              logo: { '@type': 'ImageObject', url: 'https://www.naira.autos/logo.png' },
            },
          },
        }
      : {}),
  };

  // ── JSON-LD: BreadcrumbList ────────────────────────────────────────────────
  // FIX: Added '@id' matching the reference used in webPageSchema below.
  // Without this, Google detects two separate BreadcrumbList objects — one valid
  // and one (the @id reference) missing 'itemListElement', causing a critical error.
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://www.naira.autos' },
      { '@type': 'ListItem', position: 2, name: 'Search', item: 'https://www.naira.autos/search' },
      { '@type': 'ListItem', position: 3, name: listing.brand, item: `https://www.naira.autos/search?brand=${encodeURIComponent(listing.brand)}` },
      { '@type': 'ListItem', position: 4, name: `${listing.year} ${listing.brand} ${listing.model}`, item: canonical },
    ],
  };

  // ── JSON-LD: FAQPage (condition report) ───────────────────────────────────
  type FaqItem = {
    question: string;
    answer: string;
  };

  const faqAnswers: FaqItem[] = [
    listing.faq_ac_working
      ? {
          question: 'Is the Air Conditioning working?',
          answer: listing.faq_ac_working === 'yes' ? 'Yes — AC is fully functional.' : `No — ${listing.faq_ac_issue ?? 'AC is not working.'}`
        }
      : null,
    listing.faq_engine_condition
      ? {
          question: 'Is the engine in good condition?',
          answer: listing.faq_engine_condition === 'yes' ? 'Yes — engine is in excellent condition.' : `No — ${listing.faq_engine_issue ?? 'Engine has issues.'}`
        }
      : null,
    listing.faq_was_repainted
      ? {
          question: 'Has the vehicle been repainted?',
          answer: listing.faq_was_repainted === 'no' ? 'No — original factory paint.' : 'Yes — the vehicle has been repainted.'
        }
      : null,
    listing.faq_documents_complete
      ? {
          question: 'Are all vehicle documents complete?',
          answer: listing.faq_documents_complete === 'yes' ? 'Yes — all documents are complete and valid.' : `No — missing: ${listing.faq_missing_documents ?? 'some documents.'}`
        }
      : null,
    listing.faq_oil_consumption
      ? {
          question: 'Does the vehicle consume oil between services?',
          answer: listing.faq_oil_consumption === 'no' ? 'No — normal oil consumption.' : 'Yes — the vehicle consumes oil between services.'
        }
      : null,
    listing.faq_other_issues
      ? {
          question: 'Are there any other known issues?',
          answer: listing.faq_other_issues
        }
      : null,
  ].filter((item): item is FaqItem => item !== null);

  const faqSchema = faqAnswers.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqAnswers.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      }
    : null;

  // ── JSON-LD: WebPage ───────────────────────────────────────────────────────
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${listing.year} ${listing.brand} ${listing.model} for Sale in ${location}`,
    url: canonical,
    description: `Buy a ${conditionLabel} ${listing.year} ${listing.brand} ${listing.model} in ${location}. ₦${listing.price.toLocaleString()}.`,
    breadcrumb: { '@id': `${canonical}#breadcrumb` },
    primaryImageOfPage: { '@type': 'ImageObject', url: firstImage },
    datePublished: listing.created_at,
    dateModified: listing.updated_at ?? listing.created_at,
    inLanguage: 'en-NG',
    publisher: {
      '@type': 'Organization',
      name: 'Naira Autos',
      url: 'https://www.naira.autos',
      logo: { '@type': 'ImageObject', url: 'https://www.naira.autos/logo.png' },
    },
  };

  return (
    <>
      {/* ── JSON-LD Schemas (server-rendered, always visible to crawlers) ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/*
        ── SSR SNAPSHOT ─────────────────────────────────────────────────────────
        This invisible block is rendered server-side so Googlebot sees the key
        listing data in the initial HTML even before JS hydrates.
        sr-only keeps it out of the visual UI.
      */}
      <div className="sr-only" aria-hidden="true">
        <h1>{listing.year} {listing.brand} {listing.model} for Sale in {location}</h1>
        <p>Price: ₦{listing.price.toLocaleString()}</p>
        <p>Condition: {conditionLabel}</p>
        {listing.transmission && <p>Transmission: {listing.transmission}</p>}
        {listing.fuel_type && <p>Fuel: {listing.fuel_type}</p>}
        {listing.mileage != null && <p>Mileage: {listing.mileage.toLocaleString()} km</p>}
        {listing.color && <p>Colour: {listing.color}</p>}
        {listing.body_type && <p>Body Type: {listing.body_type}</p>}
        {listing.year && <p>Year: {listing.year}</p>}
        <p>Location: {location}</p>
        {listing.description && <p>{listing.description}</p>}
        {listing.images?.map((img: string, i: number) => (
          <img
            key={i}
            src={img}
            alt={`${listing.year} ${listing.brand} ${listing.model} ${listing.color ?? ''} — photo ${i + 1} — for sale in ${location}`}
            width={1200}
            height={800}
          />
        ))}
      </div>

      {/* ── Interactive Client Component ── */}
      <ListingDetailClient listing={listing} />
    </>
  );
}