'use client';

import { useState, useRef, useMemo } from 'react';
import {
  Search, AlertCircle, RotateCcw, Wrench, Gauge, Car, Info, HelpCircle,
} from 'lucide-react';
import { matchEngineCode, EngineMatch, EngineMatchConfidence } from '@/lib/vehicle/engineNumberMatcher';

const EXAMPLES = ['2JZ-GTE', 'K20A', 'B58', 'RB26DETT', 'EJ257'];

function ConfidenceBadge({ confidence }: { confidence: EngineMatchConfidence }) {
  const map: Record<EngineMatchConfidence, { label: string; cls: string }> = {
    high: { label: 'High Confidence', cls: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400' },
    medium: { label: 'Medium Confidence', cls: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400' },
    low: { label: 'Low Confidence', cls: 'bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20 text-orange-700 dark:text-orange-400' },
    none: { label: 'No Match', cls: 'bg-muted border-border text-muted-foreground' },
  };
  const { label, cls } = map[confidence];
  return <span className={`text-xs px-2.5 py-1 rounded-full border font-bold ${cls}`}>{label}</span>;
}

function MatchCard({ match, rank }: { match: EngineMatch; rank: number }) {
  return (
    <div className={`rounded-2xl border bg-card p-4 sm:p-5 ${rank === 0 ? 'border-sky-500/40 ring-1 ring-sky-500/20' : 'border-border'}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground mb-0.5">{match.brand}{match.family ? ` · ${match.family}` : ''}</p>
          <p className="text-xl font-black text-foreground font-mono tracking-tight">{match.code}</p>
        </div>
        {rank === 0 && <span className="flex-shrink-0 text-[10px] font-bold tracking-widest uppercase bg-sky-500 text-white px-2.5 py-1 rounded-full">Best Match</span>}
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Gauge className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Displacement</p>
            <p className="text-sm font-semibold text-foreground">{match.displacement}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wrench className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Configuration</p>
            <p className="text-sm font-semibold text-foreground">{match.config}</p>
          </div>
        </div>
      </div>
      {match.powerRange && (
        <p className="text-xs text-muted-foreground mb-3"><span className="font-semibold text-foreground">Power:</span> {match.powerRange}</p>
      )}
      {match.notes && (
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{match.notes}</p>
      )}
      <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1.5">Common Applications</p>
        <div className="flex flex-wrap gap-1.5">
          {match.applications.map((app) => (
            <span key={app} className="text-xs px-2 py-1 rounded-lg bg-muted text-foreground/80">{app}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EngineNumberAnalyzerClient() {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { matches, confidence } = useMemo(() => matchEngineCode(submitted), [submitted]);

  const analyze = () => {
    const cleaned = input.trim();
    if (!cleaned) return;
    setSubmitted(cleaned);
  };

  const reset = () => {
    setInput('');
    setSubmitted('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const hasSearched = submitted.length > 0;

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">

        {/* Input bar */}
        <div className="max-w-2xl mb-8">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && analyze()}
                placeholder="e.g. 2JZ-GTE, K20A1234567, B58B30A0E123456"
                spellCheck={false}
                className="w-full h-12 px-4 text-sm font-mono tracking-wide border-2 border-muted-foreground rounded-xl bg-background text-foreground placeholder:text-muted-foreground/60 placeholder:font-sans focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
              />
            </div>
            <button
              onClick={analyze}
              disabled={!input.trim()}
              className={`flex items-center gap-2 px-5 rounded-xl text-sm font-bold transition-all flex-shrink-0 border-2 ${input.trim() ? 'bg-sky-500 hover:bg-sky-400 text-white border-sky-500 shadow-lg shadow-sky-500/25' : 'bg-muted text-muted-foreground border-muted-foreground cursor-not-allowed'}`}
            >
              <Search className="h-4 w-4" />Analyze
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
            <span className="text-xs text-muted-foreground">Try:</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => { setInput(ex); setSubmitted(ex); }}
                className="text-xs font-mono px-2 py-0.5 rounded-md bg-muted hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 text-muted-foreground transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {hasSearched && (
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <ConfidenceBadge confidence={confidence} />
              <span className="text-xs text-muted-foreground">for &ldquo;<span className="font-mono">{submitted}</span>&rdquo;</span>
              <button onClick={reset} className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                <RotateCcw className="h-3 w-3" /> New search
              </button>
            </div>

            {matches.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matches.map((m, i) => (
                    <MatchCard key={`${m.code}-${i}`} match={m} rank={i} />
                  ))}
                </div>

                <div className="flex items-start gap-2.5 p-4 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20">
                  <Info className="h-4 w-4 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-sky-800 dark:text-sky-300 leading-relaxed">
                    This is a <strong>family-code match only</strong>. The serial number stamped after the family code is unique to that individual engine and can&apos;t be decoded by any public tool. Always confirm against the manufacturer or your vehicle&apos;s official registration documents before buying, importing, or ordering parts.
                  </p>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">No known family code matched &ldquo;{submitted}&rdquo;</p>
                    <p className="text-xs text-muted-foreground mt-1">This database currently covers common performance and mainstream engine families. It doesn&apos;t yet include every code from every manufacturer.</p>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-2">How engine numbers are usually structured</p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground leading-relaxed list-disc list-inside">
                    <li>The <strong className="text-foreground">family code</strong> comes first — a short letter/number combination like 2JZ, K20, or B58 that identifies the engine design.</li>
                    <li>A <strong className="text-foreground">unique serial number</strong> follows it, identifying that specific individual engine — this part is never publicly decodable.</li>
                    <li>Try entering just the first part of the stamp (the letters and first few digits) rather than the full string.</li>
                    <li>Double-check you&apos;re reading the <strong className="text-foreground">engine number</strong>, not the chassis/VIN — they&apos;re stamped in different places and mean different things.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {!hasSearched && (
          <div className="max-w-2xl rounded-2xl border border-dashed border-border bg-muted/30 p-6 flex items-start gap-3">
            <Car className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Enter an engine number or engine code above — the full stamp or just the family code (e.g. <span className="font-mono text-foreground">2JZ-GTE</span>) both work. This tool matches against known family codes and shows brand, displacement, configuration, and common applications.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
