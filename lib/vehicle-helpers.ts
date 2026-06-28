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
  year: number;
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
  year: number;
  image_url: string | null;
  intro: string | null;
  problems: Problem[];
  owners_advice: string | null;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  faqs: FAQ[];
}

// WHERE TO BUY — used on parts pages
export const WHERE_TO_BUY_MARKETS = [
  { name: 'Ladipo Market, Lagos',     desc: 'Widest selection nationwide. Negotiate hard.',           type: 'market' },
  { name: 'Nnewi, Anambra',          desc: 'Best for wholesale and rare parts.',                     type: 'market' },
  { name: 'Sabon Gari Market, Kano', desc: 'Best coverage for Northern Nigeria.',                    type: 'market' },
  { name: 'Watt Market, PH',         desc: 'Best option for Rivers and surrounding states.',         type: 'market' },
  { name: 'Jiji.ng',                 desc: 'Search by model and year. Verify seller ratings.',       type: 'online' },
  { name: 'Jumia',                   desc: 'Good for filters and brake pads. Fast delivery.',        type: 'online' },
];