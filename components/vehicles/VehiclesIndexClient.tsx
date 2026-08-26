'use client';

// components/vehicles/VehiclesIndexClient.tsx
//
// One searchable, filterable grid of every published vehicle model —
// car, van, truck, bus, motorcycle — all in the same card design.
// Each card shows 1-3 buttons (Problems / Parts / Maintenance),
// only for whichever categories actually have published content.

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X, SlidersHorizontal, Wrench, AlertTriangle, Calendar, ChevronRight, type LucideIcon } from 'lucide-react';

export interface VehicleCardData {
  key: string;
  typeSlug: string;
  typeLabel: string;
  brandSlug: string;
  brandName: string;
  modelSlug: string;
  modelName: string;
  bodyType: string | null;
  image: string | null;
  imageReference: string | null;
  maintenanceScore: string | null;
  partsAvailability: string | null;
  reliabilityRating: number | null;
  yearRangeLabel: string | null;
  partsHref: string | null;
  problemsHref: string | null;
  maintenanceHref: string | null;
  modelHref: string;
}

type SortMode = 'name' | 'brand' | 'type';

const TYPE_LABELS: Record<string, string> = {
  cars: 'Cars',
  vans: 'Vans',
  trucks: 'Trucks',
  buses: 'Buses',
  motorcycles: 'Motorcycles',
};

interface Props {
  cards: VehicleCardData[];
  typeCounts: Record<string, number>;
}

export default function VehiclesIndexClient({ cards, typeCounts }: Props) {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [sortMode, setSortMode] = useState<SortMode>('name');

  const brandsForType = useMemo(() => {
    const set = new Set<string>();
    for (const c of cards) {
      if (typeFilter === 'all' || c.typeSlug === typeFilter) set.add(c.brandName);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [cards, typeFilter]);

  // If the brand filter no longer applies to the selected type, treat it as "all" without an extra render/effect.
  const effectiveBrandFilter = brandsForType.includes(brandFilter) ? brandFilter : 'all';

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards.filter(c => {
      if (typeFilter !== 'all' && c.typeSlug !== typeFilter) return false;
      if (effectiveBrandFilter !== 'all' && c.brandName !== effectiveBrandFilter) return false;
      if (!q) return true;
      return (
        c.brandName.toLowerCase().includes(q) ||
        c.modelName.toLowerCase().includes(q) ||
        (c.bodyType?.toLowerCase().includes(q) ?? false) ||
        c.typeLabel.toLowerCase().includes(q)
      );
    });
  }, [cards, query, typeFilter, effectiveBrandFilter]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sortMode === 'brand') list.sort((a, b) => a.brandName.localeCompare(b.brandName) || a.modelName.localeCompare(b.modelName));
    else if (sortMode === 'type') list.sort((a, b) => a.typeLabel.localeCompare(b.typeLabel) || a.brandName.localeCompare(b.brandName));
    else list.sort((a, b) => `${a.brandName} ${a.modelName}`.localeCompare(`${b.brandName} ${b.modelName}`));
    return list;
  }, [filtered, sortMode]);

  const activeFilterCount = (typeFilter !== 'all' ? 1 : 0) + (effectiveBrandFilter !== 'all' ? 1 : 0) + (query.trim() ? 1 : 0);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Vehicles</span>
        </nav>

        {/* Header */}
        <div>
          <h1
            className="font-black uppercase text-foreground mb-3 leading-none"
            style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 4vw, 56px)' }}
          >
            All <span className="text-emerald-500">Vehicles</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl">
            {cards.length} model{cards.length !== 1 ? 's' : ''} covered — search or filter to find parts prices, common problems, and maintenance schedules.
          </p>
        </div>

        {/* Search */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by brand, model, or body type..."
              className="w-full bg-card border border-border rounded-lg pl-9 pr-9 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filters — stack on mobile, row on desktop */}
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={typeFilter}
              onChange={e => { setTypeFilter(e.target.value); setBrandFilter('all'); }}
              className="bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground sm:w-48 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            >
              <option value="all">All types ({cards.length})</option>
              {Object.entries(TYPE_LABELS).map(([slug, label]) => (
                typeCounts[slug] ? <option key={slug} value={slug}>{label} ({typeCounts[slug]})</option> : null
              ))}
            </select>

            <select
              value={effectiveBrandFilter}
              onChange={e => setBrandFilter(e.target.value)}
              className="bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground sm:w-48 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            >
              <option value="all">All brands</option>
              {brandsForType.map(b => <option key={b} value={b}>{b}</option>)}
            </select>

            <select
              value={sortMode}
              onChange={e => setSortMode(e.target.value as SortMode)}
              className="bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground sm:w-48 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            >
              <option value="name">Sort: Name A–Z</option>
              <option value="brand">Sort: Brand A–Z</option>
              <option value="type">Sort: Vehicle type</option>
            </select>

            {activeFilterCount > 0 && (
              <button
                onClick={() => { setQuery(''); setTypeFilter('all'); setBrandFilter('all'); }}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground border border-border rounded-lg px-3 py-2.5 transition-colors"
              >
                <X className="h-3.5 w-3.5" /> Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {sorted.length === 0 ? (
          <div className="bg-card border border-dashed border-border rounded-xl p-10 text-center">
            <SlidersHorizontal className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-foreground font-medium mb-1">No vehicles match your search.</p>
            <p className="text-xs text-muted-foreground">Try a different brand, model, or clear your filters.</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground">{sorted.length} result{sorted.length !== 1 ? 's' : ''}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sorted.map(c => <VehicleCard key={c.key} card={c} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function VehicleCard({ card }: { card: VehicleCardData }) {
  const buttons: { href: string; label: string; icon: LucideIcon; classes: string }[] = [
    card.partsHref && {
      href: card.partsHref, label: 'View Parts', icon: Wrench,
      classes: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30',
    },
    card.problemsHref && {
      href: card.problemsHref, label: 'Common Issues', icon: AlertTriangle,
      classes: 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30',
    },
    card.maintenanceHref && {
      href: card.maintenanceHref, label: 'Maintenance', icon: Calendar,
      classes: 'border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/30',
    },
  ].filter((b): b is { href: string; label: string; icon: LucideIcon; classes: string } => Boolean(b));

  const titleLine = [card.brandName, card.modelName].filter(Boolean).join(' ') + (card.yearRangeLabel ? ` ${card.yearRangeLabel}` : '');

  return (
    <div className="flex flex-col border-2 border-border rounded-xl overflow-hidden bg-card shadow-sm">
      <Link href={card.modelHref} className="block">
        {card.image ? (
          <div>
            <div className="relative aspect-video bg-muted overflow-hidden">
              <img
                src={card.image}
                alt={titleLine}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute top-1.5 left-1.5 bg-black/55 text-white text-[10px] font-semibold leading-none px-1.5 py-1 rounded uppercase tracking-wide">
                {card.typeLabel}
              </span>
            </div>
            {card.imageReference && (
              <a
                href={card.imageReference}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="block text-[11px] text-muted-foreground hover:text-foreground underline underline-offset-2 px-3 pt-1"
              >
                Image credit
              </a>
            )}
          </div>
        ) : (
          <div className="aspect-video bg-muted flex flex-col items-center justify-center text-center px-3 gap-1">
            <span className="text-sm font-semibold text-muted-foreground/60 capitalize">{titleLine}</span>
          </div>
        )}
        <div className="px-3 pt-2">
          <p className="font-bold text-foreground text-base capitalize leading-tight">{titleLine}</p>
        </div>
      </Link>

      <div className="p-3 pt-2 mt-auto">
        <div className="flex flex-wrap gap-2">
          {buttons.map(b => {
            const Icon = b.icon;
            return (
              <Link
                key={b.label}
                href={b.href}
                className={`flex-1 min-w-[110px] flex items-center justify-between gap-1.5 px-3 py-2 rounded-lg border transition-colors ${b.classes}`}
              >
                <span className="flex items-center gap-1.5 text-xs font-semibold">
                  <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                  {b.label}
                </span>
                <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
