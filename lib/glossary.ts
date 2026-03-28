import { supabase } from '@/lib/supabase';

// ── Types ─────────────────────────────────────────────────────────

export interface GlossaryTermSummary {
  slug: string;
  term: string;
  letter: string;
  category: string;
  short_definition: string;
  tags: string[];
}

export interface GlossaryTermFull {
  id: string;
  slug: string;
  term: string;
  letter: string;
  category: string;
  short_definition: string;
  full_definition: string;
  nigerian_context: string | null;
  example_usage: string | null;
  buyer_tip: string | null;
  seller_tip: string | null;
  common_misconceptions: string | null;
  price_impact: string | null;
  related_terms: string[];
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  og_image_alt: string | null;
  schema_type: string;
  created_at: string;
  updated_at: string;
}

// ── Fetch all published terms (hub page) ─────────────────────────

export async function getAllGlossaryTerms(): Promise<GlossaryTermSummary[]> {
  const { data, error } = await supabase
    .from('car_glossary')
    .select('slug, term, letter, category, short_definition, tags')
    .eq('is_published', true)
    .order('term', { ascending: true });

  if (error) {
    console.error('[glossary] getAllGlossaryTerms error:', error.message);
    return [];
  }
  return (data ?? []) as GlossaryTermSummary[];
}

// ── Fetch a single published term by slug ────────────────────────

export async function getGlossaryTerm(slug: string): Promise<GlossaryTermFull | null> {
  const { data, error } = await supabase
    .from('car_glossary')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('[glossary] getGlossaryTerm error:', error.message);
    }
    return null;
  }
  return data as GlossaryTermFull;
}

// ── Fetch related terms by slug array ───────────────────────────

export async function getRelatedTerms(slugs: string[]): Promise<GlossaryTermSummary[]> {
  if (!slugs || slugs.length === 0) return [];
  const { data, error } = await supabase
    .from('car_glossary')
    .select('slug, term, letter, category, short_definition, tags')
    .in('slug', slugs)
    .eq('is_published', true)
    .order('term', { ascending: true });

  if (error) {
    console.error('[glossary] getRelatedTerms error:', error.message);
    return [];
  }
  return (data ?? []) as GlossaryTermSummary[];
}

// ── Fetch all published slugs (for generateStaticParams) ─────────

export async function getAllGlossarySlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('car_glossary')
    .select('slug')
    .eq('is_published', true);

  if (error) {
    console.error('[glossary] getAllGlossarySlugs error:', error.message);
    return [];
  }
  return (data ?? []).map((r: { slug: string }) => r.slug);
}

// ── Fetch terms by letter ────────────────────────────────────────

export async function getGlossaryTermsByLetter(
  letter: string
): Promise<GlossaryTermSummary[]> {
  const { data, error } = await supabase
    .from('car_glossary')
    .select('slug, term, letter, category, short_definition, tags')
    .eq('is_published', true)
    .eq('letter', letter.toUpperCase())
    .order('term', { ascending: true });

  if (error) {
    console.error('[glossary] getGlossaryTermsByLetter error:', error.message);
    return [];
  }
  return (data ?? []) as GlossaryTermSummary[];
}

// ── Sitemap entries ──────────────────────────────────────────────

export async function getGlossarySitemapEntries(): Promise<
  { slug: string; updated_at: string }[]
> {
  const { data, error } = await supabase
    .from('car_glossary')
    .select('slug, updated_at')
    .eq('is_published', true)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('[glossary] getGlossarySitemapEntries error:', error.message);
    return [];
  }
  return (data ?? []) as { slug: string; updated_at: string }[];
}