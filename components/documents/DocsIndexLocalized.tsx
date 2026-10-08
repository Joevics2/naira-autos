'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import type { CatKey } from '@/lib/documents-i18n/types';
import { CAT_ORDER } from '@/lib/documents-i18n/shared';

export interface HubTemplate {
  id: string;
  type: string;
  country: string;
  title: string;
  updated: string;      // ISO
  updatedLabel: string; // pre-formatted on the server (no hydration drift)
  cat: CatKey;
}

interface Props {
  templates: HubTemplate[];
  templateBase: string;
  countries: Record<string, { name: string; flag: string }>;
  regionCodes: string[];
  categories: Record<CatKey, string>;
  ui: {
    searchPlaceholder: string; clearSearch: string; sortLabel: string; sortCategory: string; sortCountry: string; sortLatest: string;
    categoryLabel: string; allCategories: string; countryLabel: string; allCountries: string; noMatch: string;
    updated: string; regionHeading: string; count: string; emptyList: string;
  };
  locale: string;
}

type SortMode = 'category' | 'country' | 'latest';

const SELECT = 'bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground w-full';

export default function DocsIndexLocalized({ templates, templateBase, countries, regionCodes, categories, ui, locale }: Props) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortMode>('category');
  const [cat, setCat] = useState<'all' | CatKey>('all');
  const [country, setCountry] = useState('all');

  const countryName = (code: string) => countries[code]?.name ?? code.toUpperCase();

  const countryOptions = useMemo(() => {
    const codes = Array.from(new Set(templates.map(t => t.country)));
    const region = codes.filter(c => regionCodes.includes(c));
    const rest = codes.filter(c => !regionCodes.includes(c));
    const byName = (a: string, b: string) => countryName(a).localeCompare(countryName(b), locale);
    return [...region.sort(byName), ...rest.sort(byName)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templates, regionCodes, locale]);

  const catOptions = useMemo(() => CAT_ORDER.filter(k => templates.some(t => t.cat === k)), [templates]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return templates.filter(t => {
      if (cat !== 'all' && t.cat !== cat) return false;
      if (country !== 'all' && t.country !== country) return false;
      if (!q) return true;
      return t.title.toLowerCase().includes(q) || countryName(t.country).toLowerCase().includes(q) || t.type.includes(q);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templates, query, cat, country]);

  const grouped = useMemo(() => {
    if (sort === 'latest') return null;
    const map = new Map<string, HubTemplate[]>();
    for (const t of filtered) {
      const key = sort === 'category' ? categories[t.cat] : countryName(t.country);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    }
    const entries = Array.from(map.entries());
    if (sort === 'country') entries.sort((a, b) => a[0].localeCompare(b[0], locale));
    else entries.sort((a, b) => CAT_ORDER.findIndex(k => categories[k] === a[0]) - CAT_ORDER.findIndex(k => categories[k] === b[0]));
    return entries;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, sort, categories]);

  const flat = useMemo(
    () => (sort === 'latest' ? [...filtered].sort((a, b) => +new Date(b.updated) - +new Date(a.updated)) : null),
    [filtered, sort],
  );

  const showRegion = !query && cat === 'all' && country === 'all' && sort === 'category';
  const region = showRegion ? templates.filter(t => regionCodes.includes(t.country)).slice(0, 6) : [];

  if (templates.length === 0) return <p className="text-sm text-muted-foreground">{ui.emptyList}</p>;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={ui.searchPlaceholder}
            aria-label={ui.searchPlaceholder}
            className="w-full bg-card border border-border rounded-lg ps-9 pe-9 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={ui.clearSearch}>
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select value={cat} onChange={e => setCat(e.target.value as 'all' | CatKey)} aria-label={ui.categoryLabel} className={SELECT}>
            <option value="all">{ui.allCategories}</option>
            {catOptions.map(k => <option key={k} value={k}>{categories[k]}</option>)}
          </select>
          <select value={country} onChange={e => setCountry(e.target.value)} aria-label={ui.countryLabel} className={SELECT}>
            <option value="all">{ui.allCountries}</option>
            {countryOptions.map(c => <option key={c} value={c}>{countries[c]?.flag ?? ''} {countryName(c)}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value as SortMode)} aria-label={ui.sortLabel} className={SELECT}>
            <option value="category">{ui.sortCategory}</option>
            <option value="country">{ui.sortCountry}</option>
            <option value="latest">{ui.sortLatest}</option>
          </select>
        </div>
        <p className="text-xs text-muted-foreground">{ui.count.replace('{n}', String(filtered.length))}</p>
      </div>

      {filtered.length === 0 && <p className="text-sm text-muted-foreground">{ui.noMatch.replace('{q}', query)}</p>}

      {region.length > 0 && (
        <section aria-labelledby="region-heading">
          <h2 id="region-heading" className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">{ui.regionHeading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {region.map(t => <Card key={`r-${t.id}`} t={t} base={templateBase} countries={countries} />)}
          </div>
        </section>
      )}

      {grouped && (
        <div className="space-y-8">
          {grouped.map(([name, items]) => (
            <section key={name}>
              <h2 className="text-xs font-bold tracking-widest uppercase text-sky-600 dark:text-sky-400 mb-3">{name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map(t => <Card key={t.id} t={t} base={templateBase} countries={countries} />)}
              </div>
            </section>
          ))}
        </div>
      )}

      {flat && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {flat.map(t => <Card key={t.id} t={t} base={templateBase} countries={countries} updatedPrefix={ui.updated} />)}
        </div>
      )}
    </div>
  );
}

function Card({ t, base, countries, updatedPrefix }: { t: HubTemplate; base: string; countries: Props['countries']; updatedPrefix?: string }) {
  const c = countries[t.country];
  return (
    <Link prefetch={false} href={`${base}/${t.type}/${t.country}`} className="bg-card border border-border hover:border-foreground/30 rounded-xl p-4 transition-colors">
      <p className="font-semibold text-foreground text-sm">{t.title}</p>
      <p className="text-xs text-muted-foreground mt-1">
        {c?.flag ?? '\u{1F30D}'} {c?.name ?? t.country.toUpperCase()}
        {updatedPrefix && <>{' · '}{updatedPrefix} {t.updatedLabel}</>}
      </p>
    </Link>
  );
}
