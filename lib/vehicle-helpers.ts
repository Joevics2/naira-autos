// lib/vehicle-helpers.ts
// Shared types, formatters, and config for all vehicle knowledge pages

import { createClient } from '@supabase/supabase-js';

// ── Supabase ──────────────────────────────────────────────────

export function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// ── Vehicle types ─────────────────────────────────────────────

export const VEHICLE_TYPES: Record<string, { label: string; plural: string; singular: string }> = {
  cars:        { label: 'Cars',        plural: 'Cars',        singular: 'Car'        },
  trucks:      { label: 'Trucks',      plural: 'Trucks',      singular: 'Truck'      },
  vans:        { label: 'Vans',        plural: 'Vans',        singular: 'Van'        },
  buses:       { label: 'Buses',       plural: 'Buses',       singular: 'Bus'        },
  motorcycles: { label: 'Motorcycles', plural: 'Motorcycles', singular: 'Motorcycle' },
};

// Maps URL segment (e.g. "cars") to DB vehicle_type value (e.g. "car")
export const TYPE_SLUG_TO_DB: Record<string, string> = {
  cars:        'car',
  trucks:      'truck',
  vans:        'van',
  buses:       'bus',
  motorcycles: 'motorcycle',
};

export function getDbType(typeSlug: string): string {
  return TYPE_SLUG_TO_DB[typeSlug] ?? typeSlug;
}

// ── Types ─────────────────────────────────────────────────────

export interface VehicleModel {
  id: number;
  slug: string;
  name: string;
  brand_slug: string;
  brand_name: string;
  vehicle_type: string;
  body_type: string | null;
  brand_logo_url: string | null;
  brand_country: string | null;
  brand_description: string | null;
  overview: string | null;
  history: string | null;
  pros: string[] | null;
  cons: string[] | null;
  buying_tips: string[] | null;
  who_should_buy: string | null;
  nigeria_popularity: string | null;
  engine_summary: string | null;
  fuel_type: string | null;
  seating: number | null;
  drive_type: string | null;
  maintenance_score: string | null;
  parts_availability: string | null;
  reliability_rating: number | null;
  faqs: FAQ[];
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  popular: boolean;
}

export interface VehiclePrice {
  id: number;
  model_id: number;
  slug: string;
  brand_slug: string;
  brand_name: string;
  model_name: string;
  vehicle_type: string;
  year_start: number;
  year_end: number;
  generation: string | null;
  tokunbo_price_min: number | null;
  tokunbo_price_max: number | null;
  nigerian_used_price_min: number | null;
  nigerian_used_price_max: number | null;
  brand_new_price_min: number | null;
  brand_new_price_max: number | null;
  price_trend: string | null;
  price_updated_at: string | null;
  tokunbo_vs_used_analysis: string | null;
  engine_options: string[] | null;
  transmission: string[] | null;
  fuel_type: string | null;
  drive_type: string | null;
  seating: number | null;
  fuel_consumption_city: number | null;
  fuel_consumption_highway: number | null;
  fuel_consumption_combined: number | null;
  tank_size_litres: number | null;
  trim_levels: string[] | null;
  overview: string | null;
  what_to_look_out_for: string[] | null;
  buying_tips: string | null;
  maintenance_score: string | null;
  parts_availability_score: string | null;
  overall_rating: number | null;
  problems: Problem[];
  ownership_cost: OwnershipCost | null;
  faqs: FAQ[];
  meta_title: string | null;
  meta_description: string | null;
}

export interface VehicleParts {
  id: number;
  model_id: number;
  slug: string;
  brand_slug: string;
  brand_name: string;
  model_name: string;
  vehicle_type: string;
  year_start: number;
  year_end: number;
  generation: string | null;
  parts: SparePart[];
  availability_overview: string | null;
  compatibility_note: string | null;
  oem_vs_aftermarket: string | null;
  diy_vs_workshop: string | null;
  where_to_buy: string | null;
  faqs: FAQ[];
  meta_title: string | null;
  meta_description: string | null;
}

export interface Problem {
  title: string;
  description: string;
  severity: 'critical' | 'moderate' | 'minor';
  frequency: 'common' | 'occasional' | 'rare';
  repair_cost_min?: number;
  repair_cost_max?: number;
}

export interface OwnershipCost {
  annual_fuel_cost_min?: number;
  annual_fuel_cost_max?: number;
  annual_maintenance_cost_min?: number;
  annual_maintenance_cost_max?: number;
  insurance_estimate_min?: number;
  insurance_estimate_max?: number;
  notes?: string;
}

export interface SparePart {
  category: string;
  part_name: string;
  price_min?: number;
  price_max?: number;
  replacement_interval?: string;
  availability?: string;
  oem_recommended?: boolean;
  notes?: string | null;
}

export interface FAQ {
  question: string;
  answer: string;
}

// ── Formatters ────────────────────────────────────────────────

export function formatNaira(n?: number | null): string {
  if (!n) return '—';
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `₦${(n / 1_000).toFixed(0)}k`;
  return `₦${n.toLocaleString()}`;
}

export function formatPriceRange(min?: number | null, max?: number | null): string {
  if (!min && !max) return '—';
  if (min && max && min !== max) return `${formatNaira(min)} – ${formatNaira(max)}`;
  return formatNaira(min ?? max);
}

export function formatYearLabel(start: number, end: number): string {
  return start === end ? `${start}` : `${start}–${end}`;
}

// ── Score configs ─────────────────────────────────────────────

export const MAINTENANCE_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  'Low':    { color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  'Medium': { color: 'text-amber-700 dark:text-amber-300',     bg: 'bg-amber-500/10',   border: 'border-amber-500/30'   },
  'High':   { color: 'text-red-700 dark:text-red-300',         bg: 'bg-red-500/10',     border: 'border-red-500/30'     },
};

export const PARTS_CONFIG: Record<string, { color: string; bg: string; border: string; icon: string }> = {
  'Excellent': { color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: '✓✓' },
  'Good':      { color: 'text-blue-700 dark:text-blue-300',       bg: 'bg-blue-500/10',    border: 'border-blue-500/30',    icon: '✓'  },
  'Fair':      { color: 'text-amber-700 dark:text-amber-300',     bg: 'bg-amber-500/10',   border: 'border-amber-500/30',   icon: '~'  },
  'Poor':      { color: 'text-red-700 dark:text-red-300',         bg: 'bg-red-500/10',     border: 'border-red-500/30',     icon: '✕'  },
};

export const SEVERITY_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  critical: { color: 'text-red-700 dark:text-red-300',     bg: 'bg-red-500/10 border-red-500/20',     label: 'Critical' },
  moderate: { color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-500/10 border-amber-500/20', label: 'Moderate' },
  minor:    { color: 'text-blue-700 dark:text-blue-300',   bg: 'bg-blue-500/10 border-blue-500/20',   label: 'Minor'    },
};

export const FREQUENCY_CONFIG: Record<string, { color: string; label: string }> = {
  common:     { color: 'text-red-500',    label: 'Common'     },
  occasional: { color: 'text-amber-500',  label: 'Occasional' },
  rare:       { color: 'text-emerald-500',label: 'Rare'       },
};

export const TREND_CONFIG: Record<string, { color: string; label: string }> = {
  rising:  { color: 'text-red-500',     label: 'Price Rising'  },
  falling: { color: 'text-emerald-500', label: 'Price Falling' },
  stable:  { color: 'text-muted-foreground', label: 'Price Stable' },
};

// New table types (vehicle_parts and vehicle_problems rebuilt)
export interface VehiclePartRecord {
  id: string;
  model_id: number;
  brand_slug: string;
  brand_name: string;
  model_name: string;
  vehicle_type: string;
  year: string;   // e.g. "2015" or "2004-2010"
  image_url: string | null;
  intro: string | null;
  parts: SparePart[];
  buying_guide: string | null;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  faqs: FAQ[];
}

export interface VehicleProblemRecord {
  id: string;
  model_id: number;
  brand_slug: string;
  brand_name: string;
  model_name: string;
  vehicle_type: string;
  year: string;   // e.g. "2015" or "2004-2010"
  image_url: string | null;
  intro: string | null;
  problems: Problem[];
  owners_advice: string | null;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  faqs: FAQ[];
}

// WHERE TO BUY — used on parts and problems pages. "global" is the
// default view; each country has exactly 5 marketplaces with a short
// reason to use them. Prefer marketplaces with known affiliate programs
// (Amazon Associates, eBay Partner Network, AliExpress Affiliate, Awin
// partners like AutoDoc/Oscaro) when they're also genuinely good options —
// but a country's list should still be the 5 best places to buy, not just
// whichever pays a commission.
export const WHERE_TO_BUY_COUNTRIES = [
  { code: 'global', name: 'Global',        flag: '🌍' },
  { code: 'ng',      name: 'Nigeria',       flag: '🇳🇬' },
  { code: 'us',      name: 'United States', flag: '🇺🇸' },
  { code: 'gb',      name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'ca',      name: 'Canada',        flag: '🇨🇦' },
  { code: 'de',      name: 'Germany',       flag: '🇩🇪' },
  { code: 'fr',      name: 'France',        flag: '🇫🇷' },
  { code: 'za',      name: 'South Africa',  flag: '🇿🇦' },
  { code: 'in',      name: 'India',         flag: '🇮🇳' },
  { code: 'ae',      name: 'UAE',           flag: '🇦🇪' },
  { code: 'au',      name: 'Australia',     flag: '🇦🇺' },
] as const;

export const WHERE_TO_BUY_BY_COUNTRY: Record<string, { name: string; desc: string; url: string }[]> = {
  global: [
    { name: 'Amazon',       desc: 'Huge selection, buyer protection, ships to most countries.', url: 'https://www.amazon.com' },
    { name: 'eBay Motors',  desc: 'Good for OEM and used parts. Check seller ratings first.', url: 'https://www.ebay.com/motors' },
    { name: 'AliExpress',   desc: 'Lower prices on aftermarket parts. Best for non-urgent orders.', url: 'https://www.aliexpress.com' },
    { name: 'RockAuto',     desc: 'Massive catalog by make/model/year, competitive pricing.', url: 'https://www.rockauto.com' },
    { name: 'Partsouq',     desc: 'Ships worldwide, strong for OEM parts on imported/used cars.', url: 'https://partsouq.com' },
  ],
  ng: [
    { name: 'Jiji.ng',      desc: 'Nigeria\u2019s largest marketplace. Search by model, verify seller ratings.', url: 'https://jiji.ng' },
    { name: 'Jumia',        desc: 'Fast delivery for filters, brake pads, and common wear items.', url: 'https://www.jumia.com.ng' },
    { name: 'Konga',        desc: 'Alternative online marketplace, occasional deals on parts.', url: 'https://www.konga.com' },
    { name: 'Amazon',       desc: 'Good for parts not easily found locally, use a forwarding service.', url: 'https://www.amazon.com' },
    { name: 'AliExpress',   desc: 'Cheapest option for aftermarket parts if you can wait on shipping.', url: 'https://www.aliexpress.com' },
  ],
  us: [
    { name: 'Amazon',            desc: 'Fast Prime shipping, easy returns, huge selection.', url: 'https://www.amazon.com' },
    { name: 'eBay Motors',       desc: 'Great for OEM, used, and hard-to-find parts.', url: 'https://www.ebay.com/motors' },
    { name: 'RockAuto',          desc: 'Deep catalog, transparent pricing, no membership needed.', url: 'https://www.rockauto.com' },
    { name: 'AutoZone',          desc: 'In-store pickup same day, nationwide branch network.', url: 'https://www.autozone.com' },
    { name: 'CarParts.com',      desc: 'Parts-specialist retailer with frequent discount codes.', url: 'https://www.carparts.com' },
  ],
  gb: [
    { name: 'Amazon UK',         desc: 'Fast delivery, easy returns, wide selection.', url: 'https://www.amazon.co.uk' },
    { name: 'eBay UK Motors',    desc: 'Strong for OEM and used parts across the UK.', url: 'https://www.ebay.co.uk/motors' },
    { name: 'Euro Car Parts',    desc: 'UK\u2019s largest parts retailer, next-day delivery, click & collect.', url: 'https://www.eurocarparts.com' },
    { name: 'GSF Car Parts',     desc: 'Competitive trade and retail pricing, wide branch network.', url: 'https://www.gsfcarparts.com' },
    { name: 'AutoDoc',           desc: 'Large European catalog with frequent discounts.', url: 'https://www.autodoc.co.uk' },
  ],
  ca: [
    { name: 'Amazon Canada',     desc: 'Fast shipping and easy returns across Canada.', url: 'https://www.amazon.ca' },
    { name: 'eBay Motors',       desc: 'Good for OEM and used parts, ships within Canada.', url: 'https://www.ebay.ca/motors' },
    { name: 'RockAuto',          desc: 'Ships to Canada, deep catalog and competitive pricing.', url: 'https://www.rockauto.com' },
    { name: 'Canadian Tire',     desc: 'Huge retail network, easy in-store pickup.', url: 'https://www.canadiantire.ca' },
    { name: 'PartSource',        desc: 'Canada-focused parts retailer with local branches.', url: 'https://www.partsource.ca' },
  ],
  de: [
    { name: 'Amazon.de',         desc: 'Fast delivery across Germany and the EU.', url: 'https://www.amazon.de' },
    { name: 'AutoDoc',           desc: 'Leading European parts retailer, huge catalog coverage.', url: 'https://www.autodoc.de' },
    { name: 'Kfzteile24',        desc: 'Germany-focused retailer with fast dispatch.', url: 'https://www.kfzteile24.de' },
    { name: 'eBay Motors',       desc: 'Good for OEM and used parts across Germany.', url: 'https://www.ebay.de/motors' },
    { name: 'AliExpress',        desc: 'Cheaper aftermarket option if shipping time isn\u2019t urgent.', url: 'https://www.aliexpress.com' },
  ],
  fr: [
    { name: 'Amazon.fr',         desc: 'Fast delivery across France.', url: 'https://www.amazon.fr' },
    { name: 'Oscaro',            desc: 'Leading French parts e-tailer, strong catalog and pricing.', url: 'https://www.oscaro.com' },
    { name: 'AutoDoc',           desc: 'Wide European catalog, ships across France.', url: 'https://www.autodoc.fr' },
    { name: 'eBay Motors',       desc: 'Good for OEM and used parts.', url: 'https://www.ebay.fr/motors' },
    { name: 'AliExpress',        desc: 'Budget option for aftermarket parts.', url: 'https://www.aliexpress.com' },
  ],
  za: [
    { name: 'Takealot',          desc: 'South Africa\u2019s largest online retailer, fast local delivery.', url: 'https://www.takealot.com' },
    { name: 'Midas',             desc: 'Established parts retail chain with nationwide branches.', url: 'https://www.midas.co.za' },
    { name: 'AutoZone SA',       desc: 'Local retail chain, good for common wear items.', url: 'https://www.autozone.co.za' },
    { name: 'eBay Motors',       desc: 'Good for OEM and used parts, ships internationally.', url: 'https://www.ebay.com/motors' },
    { name: 'AliExpress',        desc: 'Cheapest option for aftermarket parts.', url: 'https://www.aliexpress.com' },
  ],
  in: [
    { name: 'Amazon India',      desc: 'Fast delivery, easy returns, huge selection.', url: 'https://www.amazon.in' },
    { name: 'Flipkart',          desc: 'Competitive pricing, fast delivery across India.', url: 'https://www.flipkart.com' },
    { name: 'Boodmo',            desc: 'India-focused catalog covering imported and local models.', url: 'https://www.boodmo.com' },
    { name: 'eBay Motors',       desc: 'Good for OEM and hard-to-find parts.', url: 'https://www.ebay.com/motors' },
    { name: 'AliExpress',        desc: 'Lower prices, longer shipping times.', url: 'https://www.aliexpress.com' },
  ],
  ae: [
    { name: 'Partsouq',          desc: 'UAE-based, ships worldwide, excellent for OEM parts.', url: 'https://partsouq.com' },
    { name: 'Amazon.ae',         desc: 'Fast local delivery across the UAE.', url: 'https://www.amazon.ae' },
    { name: 'Dubizzle',          desc: 'Popular local classifieds for parts and accessories.', url: 'https://dubai.dubizzle.com' },
    { name: 'eBay Motors',       desc: 'Good for OEM and used parts, ships internationally.', url: 'https://www.ebay.com/motors' },
    { name: 'AliExpress',        desc: 'Budget-friendly aftermarket option.', url: 'https://www.aliexpress.com' },
  ],
  au: [
    { name: 'Amazon Australia',  desc: 'Fast delivery, easy returns, wide selection.', url: 'https://www.amazon.com.au' },
    { name: 'eBay Motors',       desc: 'Great for OEM and used parts across Australia.', url: 'https://www.ebay.com.au/motors' },
    { name: 'Repco',             desc: 'Major Australian parts retailer with nationwide branches.', url: 'https://www.repco.com.au' },
    { name: 'Supercheap Auto',   desc: 'Big retail network, DIY-friendly staff and pricing.', url: 'https://www.supercheapauto.com.au' },
    { name: 'AliExpress',        desc: 'Lower-cost aftermarket option.', url: 'https://www.aliexpress.com' },
  ],
};