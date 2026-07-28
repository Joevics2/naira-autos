import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Mic } from 'lucide-react';
import EngineSoundAnalyzerClient from './client';

// NOTE: title/description/keywords/FAQ content below are placeholders —
// intentionally kept minimal pending a keyword list. Do not expand the
// editorial content further until that's provided.
export const metadata: Metadata = {
  title: 'Engine Sound Analyzer — Free AI Diagnosis from Audio | Naira Autos',
  description: 'Record or upload your engine sound and get an instant AI diagnosis — likely causes, urgency level, and estimated repair cost for Nigerian vehicles.',
  alternates: { canonical: 'https://www.naira.autos/tools/engine-sound-analyzer' },
};

export default function EngineSoundAnalyzerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-[#080C10] pt-10 pb-10 px-4">
        <div className="max-w-screen-md mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Engine Sound Analyzer</span>
            </nav>
          </div>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              <Mic className="h-3 w-3" /> Free Tool
            </span>
            <h1 className="font-black uppercase text-white leading-[0.95] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Engine Sound<br /><span className="text-emerald-400">Analyzer</span>
            </h1>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              Record or upload the sound your car is making and get an instant AI diagnosis — likely causes, how urgent it is, and what it might cost to fix.
            </p>
          </div>
        </div>
      </div>

      <EngineSoundAnalyzerClient />
    </div>
  );
}
