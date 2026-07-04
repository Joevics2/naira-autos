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

export const WHERE_TO_BUY_BY_COUNTRY: Record<string, { name: string; desc: string }[]> = {
  global: [
    { name: 'Amazon',       desc: 'Huge selection, buyer protection, ships to most countries.' },
    { name: 'eBay Motors',  desc: 'Good for OEM and used parts. Check seller ratings first.' },
    { name: 'AliExpress',   desc: 'Lower prices on aftermarket parts. Best for non-urgent orders.' },
    { name: 'RockAuto',     desc: 'Massive catalog by make/model/year, competitive pricing.' },
    { name: 'Partsouq',     desc: 'Ships worldwide, strong for OEM parts on imported/used cars.' },
  ],
  ng: [
    { name: 'Jiji.ng',      desc: 'Nigeria\u2019s largest marketplace. Search by model, verify seller ratings.' },
    { name: 'Jumia',        desc: 'Fast delivery for filters, brake pads, and common wear items.' },
    { name: 'Konga',        desc: 'Alternative online marketplace, occasional deals on parts.' },
    { name: 'Amazon',       desc: 'Good for parts not easily found locally, use a forwarding service.' },
    { name: 'AliExpress',   desc: 'Cheapest option for aftermarket parts if you can wait on shipping.' },
  ],
  us: [
    { name: 'Amazon',            desc: 'Fast Prime shipping, easy returns, huge selection.' },
    { name: 'eBay Motors',       desc: 'Great for OEM, used, and hard-to-find parts.' },
    { name: 'RockAuto',          desc: 'Deep catalog, transparent pricing, no membership needed.' },
    { name: 'AutoZone',          desc: 'In-store pickup same day, nationwide branch network.' },
    { name: 'CarParts.com',      desc: 'Parts-specialist retailer with frequent discount codes.' },
  ],
  gb: [
    { name: 'Amazon UK',         desc: 'Fast delivery, easy returns, wide selection.' },
    { name: 'eBay UK Motors',    desc: 'Strong for OEM and used parts across the UK.' },
    { name: 'Euro Car Parts',    desc: 'UK\u2019s largest parts retailer, next-day delivery, click & collect.' },
    { name: 'GSF Car Parts',     desc: 'Competitive trade and retail pricing, wide branch network.' },
    { name: 'AutoDoc',           desc: 'Large European catalog with frequent discounts.' },
  ],
  ca: [
    { name: 'Amazon Canada',     desc: 'Fast shipping and easy returns across Canada.' },
    { name: 'eBay Motors',       desc: 'Good for OEM and used parts, ships within Canada.' },
    { name: 'RockAuto',          desc: 'Ships to Canada, deep catalog and competitive pricing.' },
    { name: 'Canadian Tire',     desc: 'Huge retail network, easy in-store pickup.' },
    { name: 'PartSource',        desc: 'Canada-focused parts retailer with local branches.' },
  ],
  de: [
    { name: 'Amazon.de',         desc: 'Fast delivery across Germany and the EU.' },
    { name: 'AutoDoc',           desc: 'Leading European parts retailer, huge catalog coverage.' },
    { name: 'Kfzteile24',        desc: 'Germany-focused retailer with fast dispatch.' },
    { name: 'eBay Motors',       desc: 'Good for OEM and used parts across Germany.' },
    { name: 'AliExpress',        desc: 'Cheaper aftermarket option if shipping time isn\u2019t urgent.' },
  ],
  fr: [
    { name: 'Amazon.fr',         desc: 'Fast delivery across France.' },
    { name: 'Oscaro',            desc: 'Leading French parts e-tailer, strong catalog and pricing.' },
    { name: 'AutoDoc',           desc: 'Wide European catalog, ships across France.' },
    { name: 'eBay Motors',       desc: 'Good for OEM and used parts.' },
    { name: 'AliExpress',        desc: 'Budget option for aftermarket parts.' },
  ],
  za: [
    { name: 'Takealot',          desc: 'South Africa\u2019s largest online retailer, fast local delivery.' },
    { name: 'Midas',             desc: 'Established parts retail chain with nationwide branches.' },
    { name: 'AutoZone SA',       desc: 'Local retail chain, good for common wear items.' },
    { name: 'eBay Motors',       desc: 'Good for OEM and used parts, ships internationally.' },
    { name: 'AliExpress',        desc: 'Cheapest option for aftermarket parts.' },
  ],
  in: [
    { name: 'Amazon India',      desc: 'Fast delivery, easy returns, huge selection.' },
    { name: 'Flipkart',          desc: 'Competitive pricing, fast delivery across India.' },
    { name: 'Boodmo',            desc: 'India-focused catalog covering imported and local models.' },
    { name: 'eBay Motors',       desc: 'Good for OEM and hard-to-find parts.' },
    { name: 'AliExpress',        desc: 'Lower prices, longer shipping times.' },
  ],
  ae: [
    { name: 'Partsouq',          desc: 'UAE-based, ships worldwide, excellent for OEM parts.' },
    { name: 'Amazon.ae',         desc: 'Fast local delivery across the UAE.' },
    { name: 'Dubizzle',          desc: 'Popular local classifieds for parts and accessories.' },
    { name: 'eBay Motors',       desc: 'Good for OEM and used parts, ships internationally.' },
    { name: 'AliExpress',        desc: 'Budget-friendly aftermarket option.' },
  ],
  au: [
    { name: 'Amazon Australia',  desc: 'Fast delivery, easy returns, wide selection.' },
    { name: 'eBay Motors',       desc: 'Great for OEM and used parts across Australia.' },
    { name: 'Repco',             desc: 'Major Australian parts retailer with nationwide branches.' },
    { name: 'Supercheap Auto',   desc: 'Big retail network, DIY-friendly staff and pricing.' },
    { name: 'AliExpress',        desc: 'Lower-cost aftermarket option.' },
  ],
};