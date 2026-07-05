import { supabase } from '@/lib/supabase';

// ── Types ─────────────────────────────────────────────────────────

export interface FAQ {
  question: string;
  answer: string;
}

export interface ObdCodeSummary {
  code: string;
  slug: string;
  title: string;
  system: string;
  category: string;
  severity: string;
}

export interface ObdCodeFull {
  id: string;
  code: string;
  slug: string;
  title: string;
  system: string;
  category: string;
  is_generic: boolean;
  severity: string;
  diy_difficulty: string;
  description: string;
  common_causes: string[];
  symptoms: string[];
  diagnostic_steps: string[];
  related_codes: string[];
  faqs: FAQ[];
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

const SUMMARY_COLUMNS = 'code, slug, title, system, category, severity';

// ── Fetch all published codes (hub page) ──────────────────────────

export async function getAllObdCodes(): Promise<ObdCodeSummary[]> {
  const { data, error } = await supabase
    .from('obd_codes')
    .select(SUMMARY_COLUMNS)
    .eq('is_published', true)
    .order('code', { ascending: true });

  if (error) {
    console.error('[obd-codes] getAllObdCodes error:', error.message);
    return [];
  }
  return (data ?? []) as ObdCodeSummary[];
}

// ── Fetch a single published code by slug ──────────────────────────

export async function getObdCode(slug: string): Promise<ObdCodeFull | null> {
  const { data, error } = await supabase
    .from('obd_codes')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('[obd-codes] getObdCode error:', error.message);
    }
    return null;
  }
  return data as ObdCodeFull;
}

// ── Fetch related codes by code array ───────────────────────────────

export async function getRelatedObdCodes(codes: string[]): Promise<ObdCodeSummary[]> {
  if (!codes || codes.length === 0) return [];
  const { data, error } = await supabase
    .from('obd_codes')
    .select(SUMMARY_COLUMNS)
    .in('code', codes)
    .eq('is_published', true)
    .order('code', { ascending: true });

  if (error) {
    console.error('[obd-codes] getRelatedObdCodes error:', error.message);
    return [];
  }
  return (data ?? []) as ObdCodeSummary[];
}

// ── Fetch all published slugs (for generateStaticParams) ────────────

export async function getAllObdCodeSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('obd_codes')
    .select('slug')
    .eq('is_published', true);

  if (error) {
    console.error('[obd-codes] getAllObdCodeSlugs error:', error.message);
    return [];
  }
  return (data ?? []).map((r: { slug: string }) => r.slug);
}

// ── Fetch codes by system (Powertrain/Body/Chassis/Network) ─────────

export async function getObdCodesBySystem(system: string): Promise<ObdCodeSummary[]> {
  const { data, error } = await supabase
    .from('obd_codes')
    .select(SUMMARY_COLUMNS)
    .eq('is_published', true)
    .eq('system', system)
    .order('code', { ascending: true });

  if (error) {
    console.error('[obd-codes] getObdCodesBySystem error:', error.message);
    return [];
  }
  return (data ?? []) as ObdCodeSummary[];
}

// ── Sitemap entries ──────────────────────────────────────────────────

export async function getObdCodesSitemapEntries(): Promise<
  { slug: string; updated_at: string }[]
> {
  const { data, error } = await supabase
    .from('obd_codes')
    .select('slug, updated_at')
    .eq('is_published', true)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('[obd-codes] getObdCodesSitemapEntries error:', error.message);
    return [];
  }
  return (data ?? []) as { slug: string; updated_at: string }[];
}

// ── Display config ────────────────────────────────────────────────

export const SEVERITY_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  Low:      { color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800' },
  Medium:   { color: 'text-amber-700 dark:text-amber-400',     bg: 'bg-amber-50 dark:bg-amber-900/20',     border: 'border-amber-200 dark:border-amber-800' },
  High:     { color: 'text-orange-700 dark:text-orange-400',   bg: 'bg-orange-50 dark:bg-orange-900/20',   border: 'border-orange-200 dark:border-orange-800' },
  Critical: { color: 'text-red-700 dark:text-red-400',         bg: 'bg-red-50 dark:bg-red-900/20',         border: 'border-red-200 dark:border-red-800' },
};

export const SYSTEM_LABELS: Record<string, string> = {
  Powertrain: 'Powertrain (P-codes)',
  Body:       'Body (B-codes)',
  Chassis:    'Chassis (C-codes)',
  Network:    'Network (U-codes)',
};
