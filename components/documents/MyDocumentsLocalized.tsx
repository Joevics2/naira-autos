'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X, Trash2, ShieldAlert, FileText, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { DocumentHistoryEntry, getHistory, deleteFromHistory, clearHistory } from '@/lib/document-history';
import { sanitizeDocument } from '@/lib/document-format';
import DocumentEditor from '@/components/documents/DocumentEditor';
import type { DocsMineStrings } from '@/lib/documents-i18n/types';

type SortMode = 'latest' | 'oldest' | 'country' | 'type';
type SourceFilter = 'all' | 'template' | 'ai';

interface Props {
  s: DocsMineStrings;
  hubPath: string;
  locale: string;
  rtl: boolean;
  /** Link to the AI drafter in this language, if there is one (the "Axios" source filter and button). */
  axiosHref?: string;
}

export default function MyDocumentsLocalized({ s, hubPath, locale, rtl, axiosHref }: Props) {
  const [entries, setEntries] = useState<DocumentHistoryEntry[] | null>(null);
  const [query, setQuery] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('latest');
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [openEntry, setOpenEntry] = useState<DocumentHistoryEntry | null>(null);
  const Back = rtl ? ArrowRight : ArrowLeft;

  useEffect(() => { setEntries(getHistory()); }, []);

  const filtered = useMemo(() => {
    if (!entries) return [];
    const q = query.trim().toLowerCase();
    let list = entries;
    if (sourceFilter !== 'all') list = list.filter(e => e.source === sourceFilter);
    if (q) {
      list = list.filter(e =>
        e.documentTypeLabel.toLowerCase().includes(q) ||
        e.countryLabel.toLowerCase().includes(q) ||
        e.document.title.toLowerCase().includes(q));
    }
    const sorted = [...list];
    switch (sortMode) {
      case 'oldest': sorted.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt)); break;
      case 'country': sorted.sort((a, b) => a.countryLabel.localeCompare(b.countryLabel, locale)); break;
      case 'type': sorted.sort((a, b) => a.documentTypeLabel.localeCompare(b.documentTypeLabel, locale)); break;
      default: sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    }
    return sorted;
  }, [entries, query, sortMode, sourceFilter, locale]);

  if (openEntry) {
    return (
      <div className="space-y-4">
        <button onClick={() => setOpenEntry(null)} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <Back className="h-4 w-4" />
          {s.back}
        </button>
        <DocumentEditor
          document={openEntry.document}
          onChange={doc => setOpenEntry({ ...openEntry, document: doc })}
          isHighRisk={openEntry.isHighRisk}
          fileNamePrefix={openEntry.documentTypeSlug}
          labels={s.editor}
        />
      </div>
    );
  }

  const sources: { key: SourceFilter; label: string }[] = [
    { key: 'all', label: s.filterAll },
    { key: 'template', label: s.filterTemplates },
    ...(axiosHref ? [{ key: 'ai' as SourceFilter, label: 'Axios' }] : []),
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 rounded-lg px-4 py-3 text-xs">
        <ShieldAlert className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <span>{s.localNote}</span>
      </div>

      {entries === null ? null : entries.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-6 text-center space-y-3">
          <p className="text-sm text-muted-foreground">{s.empty}</p>
          <Link href={hubPath} className="text-sm font-semibold text-sky-500 hover:underline">{s.browse}</Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={s.searchPlaceholder}
                aria-label={s.searchPlaceholder}
                className="w-full bg-card border border-border rounded-lg ps-9 pe-9 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={s.clearSearch}>
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <select value={sortMode} onChange={e => setSortMode(e.target.value as SortMode)} aria-label={s.sortLatest} className="bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground sm:w-56">
              <option value="latest">{s.sortLatest}</option>
              <option value="oldest">{s.sortOldest}</option>
              <option value="country">{s.sortCountry}</option>
              <option value="type">{s.sortType}</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            {sources.map(opt => (
              <button
                key={opt.key}
                onClick={() => setSourceFilter(opt.key)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${sourceFilter === opt.key ? 'bg-sky-600 border-sky-600 text-white' : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">{s.noMatch.replace('{q}', query)}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map(entry => (
                <div key={entry.id} className="flex items-start justify-between gap-3 bg-card border border-border hover:border-foreground/30 rounded-xl px-4 py-3 transition-colors">
                  <button
                    onClick={() => setOpenEntry({ ...entry, document: sanitizeDocument(entry.document) })}
                    className="flex-1 text-start min-w-0 flex items-start gap-2.5"
                  >
                    {entry.source === 'ai'
                      ? <Sparkles className="h-4 w-4 text-sky-500 mt-0.5 flex-shrink-0" />
                      : <FileText className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />}
                    <span className="min-w-0 block">
                      <span className="block text-sm font-semibold text-foreground truncate">{entry.documentTypeLabel}</span>
                      <span className="block text-xs text-muted-foreground mt-0.5">{entry.countryLabel}</span>
                      <span className="block text-xs text-muted-foreground/70 mt-0.5">
                        {new Date(entry.createdAt).toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}
                        {' · '}{entry.source === 'ai' ? 'Axios' : s.sourceTemplate}
                      </span>
                    </span>
                  </button>
                  <button onClick={() => setEntries(deleteFromHistory(entry.id))} className="text-muted-foreground hover:text-red-500 p-1 transition-colors flex-shrink-0" aria-label={s.deleteOne}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => { clearHistory(); setEntries([]); }} className="text-xs font-medium text-muted-foreground hover:text-red-500 transition-colors">
            {s.clearAll}
          </button>
        </>
      )}
    </div>
  );
}
