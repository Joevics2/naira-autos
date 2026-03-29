import { Metadata } from 'next';
import SearchClient from './SearchClient';

const BASE_URL = 'https://nairaautos.com';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function formatPriceLabel(val: number): string {
  if (val >= 1_000_000) return `\u20a6${(val / 1_000_000).toFixed(val % 1_000_000 === 0 ? 0 : 1)}M`;
  if (val >= 1_000)     return `\u20a6${(val / 1_000).toFixed(0)}K`;
  return `\u20a6${val}`;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const brand  = searchParams.brand  as string | undefined;
  const state  = searchParams.state  as string | undefined;
  const area   = searchParams.area   as string | undefined;
  const type   = searchParams.type   as string | undefined;
  const pmin   = searchParams.pmin   as string | undefined;
  const pmax   = searchParams.pmax   as string | undefined;
  const owner  = searchParams.owner  as string | undefined;
  const video  = searchParams.video  === '1';
  const urgent = searchParams.urgent === '1';
  const q      = searchParams.q      as string | undefined;

  // ── Price label ─────────────────────────────────────────────────────────────
  let priceLabel: string | undefined;
  if (pmin || pmax) {
    const lo = pmin ? formatPriceLabel(Number(pmin)) : '\u20a60';
    const hi = pmax ? formatPriceLabel(Number(pmax)) : '';
    priceLabel = hi ? `${lo}\u2013${hi}` : `From ${lo}`;
  }

  // ── Canonical — reflects actual filter combo ─────────────────────────────
  const canonicalParams = new URLSearchParams();
  if (brand)                                      canonicalParams.set('brand',  brand);
  if (state)                                      canonicalParams.set('state',  state);
  if (area && !area.startsWith('all-'))           canonicalParams.set('area',   area);
  if (type)                                       canonicalParams.set('type',   type);
  if (pmin)                                       canonicalParams.set('pmin',   pmin);
  if (pmax)                                       canonicalParams.set('pmax',   pmax);
  if (owner)                                      canonicalParams.set('owner',  owner);
  if (video)                                      canonicalParams.set('video',  '1');
  if (urgent)                                     canonicalParams.set('urgent', '1');
  if (q)                                          canonicalParams.set('q',      q);

  const canonicalPath = canonicalParams.toString()
    ? `${BASE_URL}/search?${canonicalParams.toString()}`
    : `${BASE_URL}/search`;

  // ── Build title/description parts ────────────────────────────────────────
  const titleParts: string[] = [];
  const kwExtras:   string[] = [];

  if (brand) {
    titleParts.push(brand);
    kwExtras.push(`${brand} Nigeria`, `${brand} cars for sale`, `buy ${brand} Nigeria`);
  }
  if (type) {
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1) + (type === 'bus' ? 'es' : 's');
    titleParts.push(typeLabel);
    kwExtras.push(`${type}s for sale Nigeria`, `used ${type}s Nigeria`);
  }
  if (urgent) {
    titleParts.unshift('Urgent Sale');
    kwExtras.push('urgent car sale Nigeria', 'quick car sale Nigeria');
  }
  if (video) {
    kwExtras.push('cars with video Nigeria');
  }
  if (owner) {
    const ownerLabel = owner.charAt(0).toUpperCase() + owner.slice(1);
    kwExtras.push(`buy car from ${owner} Nigeria`);
    if (!titleParts.length) titleParts.push(`${ownerLabel} Listings`);
  }
  if (q && !brand) {
    titleParts.push(q);
    kwExtras.push(q, `${q} Nigeria`);
  }

  const locationLabel = area && !area.startsWith('all-')
    ? `${area}, ${state}`
    : state || '';

  if (locationLabel) kwExtras.push(`cars in ${locationLabel}`, `buy car ${locationLabel}`);
  if (priceLabel)    kwExtras.push(`cars ${priceLabel} Nigeria`);

  // ── Compose strings ─────────────────────────────────────────────────────
  const baseKw = 'used cars Nigeria, buy cars Lagos, car dealers Nigeria, second hand cars, car marketplace Nigeria, cars for sale Nigeria';
  const keywords = [baseKw, ...kwExtras].join(', ');

  let title: string;
  let description: string;

  if (!titleParts.length && !locationLabel && !priceLabel) {
    title = 'Search Used Cars for Sale in Nigeria | Naira Autos';
    description = 'Browse thousands of verified cars for sale across Nigeria. Filter by brand, location, price, and vehicle type. Find the best deals on Toyota, Honda, Mercedes, BMW and more on Naira Autos.';
  } else {
    const subject    = titleParts.length ? titleParts.join(' ') : 'Used Cars';
    const locationPt = locationLabel ? ` in ${locationLabel}` : ' in Nigeria';
    const pricePt    = priceLabel    ? ` (${priceLabel})`     : '';
    title = `${subject} for Sale${locationPt}${pricePt} | Naira Autos`;

    const subjectDesc = titleParts.length ? titleParts.join(' ').toLowerCase() : 'used cars';
    const locDesc     = locationLabel ? `in ${locationLabel}` : 'across Nigeria';
    const priceDesc   = priceLabel    ? ` priced ${priceLabel}` : '';
    const ownerDesc   = owner         ? ` from verified ${owner}s` : '';
    const videoDesc   = video         ? ' with video tours' : '';

    description = `Find verified ${subjectDesc}${priceDesc}${ownerDesc}${videoDesc} for sale ${locDesc} on Naira Autos. Browse listings with photos${video ? ' and video tours' : ''}. Compare prices and contact sellers directly.`;
  }

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type:     'website',
      url:      canonicalPath,
      siteName: 'Naira Autos',
    },
    twitter: {
      card:        'summary',
      title,
      description,
    },
    alternates: {
      canonical: canonicalPath,
    },
    robots: {
      index:  true,
      follow: true,
    },
  };
}

export default function SearchPage() {
  return <SearchClient />;
}