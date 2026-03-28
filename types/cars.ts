// types/cars.ts — shared types for car knowledge pages

export interface CarBrand {
  id: number;
  slug: string;
  name: string;
  logo_url?: string;
  country?: string;
  description?: string;
  popular: boolean;
}

export interface CarModel {
  id: number;
  brand_id: number;
  slug: string;
  name: string;
  body_type?: string;
  segment?: string;
  image_url?: string;
  popular: boolean;
  brand?: CarBrand;
}

export interface CarYearGroup {
  id: number;
  model_id: number;
  year_start: number;
  year_end: number;
  slug: string;
  generation?: string;

  // Prices
  tokunbo_price_min?: number;
  tokunbo_price_max?: number;
  nigerian_used_price_min?: number;
  nigerian_used_price_max?: number;
  brand_new_price_min?: number;
  brand_new_price_max?: number;
  price_trend?: 'rising' | 'stable' | 'falling';
  price_updated_at?: string;

  // Specs
  engine_options?: string[];
  transmission?: string[];
  fuel_type?: string;
  drive_type?: string;
  seating?: number;
  fuel_consumption_city?: number;
  fuel_consumption_highway?: number;
  fuel_consumption_combined?: number;
  tank_size_litres?: number;
  trim_levels?: string[];

  // Content (Gemini-generated)
  overview?: string;
  what_to_look_out_for?: string[];
  buying_tips?: string;
  tokunbo_vs_used_analysis?: string;

  // Scores
  maintenance_score?: 'Low' | 'Medium' | 'High' | 'Very High';
  parts_availability_score?: 'Easy' | 'Moderate' | 'Hard';
  overall_rating?: number;

  // SEO
  meta_title?: string;
  meta_description?: string;
}

export interface CarProblem {
  id: number;
  title: string;
  description?: string;
  severity: 'minor' | 'moderate' | 'serious' | 'critical';
  frequency: 'rare' | 'occasional' | 'common' | 'very_common';
  repair_cost_min?: number;
  repair_cost_max?: number;
  sort_order: number;
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
  id: number;
  part_name: string;
  price_min?: number;
  price_max?: number;
  replacement_interval?: string;
  oem_recommended: boolean;
  availability?: string;
  notes?: string;
  sort_order: number;
  category?: { name: string; slug: string };
}

export interface SparePartsContent {
  availability_overview?: string;
  oem_vs_aftermarket?: string;
  where_to_buy?: string;
  diy_vs_workshop?: string;
  compatibility_note?: string;
  meta_title?: string;
  meta_description?: string;
}

export interface CarQuestion {
  id: number;
  author_name: string;
  question: string;
  ai_answer?: string;
  ai_answered_at?: string;
  upvotes: number;
  created_at: string;
  answers?: CarAnswer[];
}

export interface CarAnswer {
  id: number;
  author_name: string;
  answer: string;
  is_verified_mechanic: boolean;
  upvotes: number;
  created_at: string;
}

export interface OwnerStory {
  id: number;
  author_name: string;
  story: string;
  rating?: number;
  ownership_years?: number;
  created_at: string;
}

// ── Utilities ─────────────────────────────────────────────────────

export function formatNaira(amount: number): string {
  if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000)     return `₦${(amount / 1_000).toFixed(0)}k`;
  return `₦${amount.toLocaleString()}`;
}

export function formatPriceRange(min?: number, max?: number): string {
  if (!min && !max) return 'Price not available';
  if (!max)         return `From ${formatNaira(min!)}`;
  if (!min)         return `Up to ${formatNaira(max)}`;
  return `${formatNaira(min)} – ${formatNaira(max)}`;
}

// ── Config maps ───────────────────────────────────────────────────

export const SEVERITY_CONFIG = {
  minor:    { label: 'Minor',    color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
  moderate: { label: 'Moderate', color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/30'   },
  serious:  { label: 'Serious',  color: 'text-orange-400',  bg: 'bg-orange-500/10 border-orange-500/30' },
  critical: { label: 'Critical', color: 'text-red-400',     bg: 'bg-red-500/10 border-red-500/30'       },
};

export const FREQUENCY_CONFIG = {
  rare:        { label: 'Rare',        color: 'text-blue-400'   },
  occasional:  { label: 'Occasional',  color: 'text-amber-400'  },
  common:      { label: 'Common',      color: 'text-orange-400' },
  very_common: { label: 'Very Common', color: 'text-red-400'    },
};

export const MAINTENANCE_SCORE_CONFIG: Record<string, { color: string; bg: string }> = {
  'Low':       { color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30' },
  'Medium':    { color: 'text-amber-400',   bg: 'bg-amber-500/15 border-amber-500/30'     },
  'High':      { color: 'text-orange-400',  bg: 'bg-orange-500/15 border-orange-500/30'   },
  'Very High': { color: 'text-red-400',     bg: 'bg-red-500/15 border-red-500/30'         },
};

export const PARTS_SCORE_CONFIG: Record<string, { color: string; bg: string; icon: string }> = {
  'Easy':     { color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30', icon: '✓' },
  'Moderate': { color: 'text-amber-400',   bg: 'bg-amber-500/15 border-amber-500/30',     icon: '~' },
  'Hard':     { color: 'text-red-400',     bg: 'bg-red-500/15 border-red-500/30',         icon: '!' },
};

export const TREND_CONFIG: Record<string, { label: string; color: string }> = {
  rising:  { label: '↑ Rising',  color: 'text-red-400'     },
  stable:  { label: '→ Stable',  color: 'text-amber-400'   },
  falling: { label: '↓ Falling', color: 'text-emerald-400' },
};
