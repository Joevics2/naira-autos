import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Globe2 } from 'lucide-react';
import { TOOLS_ID } from '@/lib/tools-list-id';

export const metadata: Metadata = {
  title: 'Alat Gratis untuk Mobil | Naira Autos',
  description: 'Alat gratis untuk mobil Anda dalam Bahasa Indonesia — segera hadir. Semua gratis dan tanpa pendaftaran.',
  alternates: {
    canonical: 'https://www.naira.autos/alat',
    languages: {
      en: 'https://www.naira.autos/tools',
      es: 'https://www.naira.autos/herramientas',
      ar: 'https://www.naira.autos/adawat',
      fr: 'https://www.naira.autos/outils',
      pt: 'https://www.naira.autos/ferramentas',
      de: 'https://www.naira.autos/werkzeuge',
      ja: 'https://www.naira.autos/tsuru',
      it: 'https://www.naira.autos/strumenti',
      id: 'https://www.naira.autos/alat',
      'x-default': 'https://www.naira.autos/tools',
    },
  },
  keywords: ['alat mobil gratis', 'mekanik AI gratis', 'alat mobil Bahasa Indonesia'],
};

export default function ToolsIndonesianPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              Alat Gratis
            </span>
            <Link href="/beranda" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              Beranda
            </Link>
            <Link href="/tools" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              English
            </Link>
            <Link href="/tsuru" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              日本語
            </Link>
          </div>
          <h1
            className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            Pusat<br />
            <span className="text-emerald-400">Alat</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg font-light max-w-lg leading-relaxed">
            Semua yang Anda butuhkan untuk membeli, menjual, dan merawat mobil — gratis, tanpa pendaftaran.
          </p>
          <p className="text-white/30 text-xs mt-3 flex items-center gap-1.5">
            <Globe2 className="h-3 w-3" />
            Kami menerjemahkan lebih banyak alat setiap minggu.
          </p>
        </div>
      </div>

      {/* ── Coming soon (no Indonesian tools live yet) ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center max-w-2xl mx-auto">
          <p className="text-base font-bold text-foreground mb-2">Belum ada alat Bahasa Indonesia saat ini</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Kami sedang menerjemahkan mekanik virtual AI dan alat lainnya ke Bahasa Indonesia secepatnya. Sementara menunggu, Anda bisa mencoba{' '}
            <Link href="/tools" className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2 font-semibold">alat berbahasa Inggris kami</Link>.
          </p>
        </div>
      </div>

      {TOOLS_ID.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pb-12" />
      )}
    </div>
  );
}
