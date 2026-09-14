import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Globe2 } from 'lucide-react';
import { TOOLS_TH } from '@/lib/tools-list-th';

export const metadata: Metadata = {
  title: 'เครื่องมือรถยนต์ฟรี | Naira Autos',
  description: 'เครื่องมือฟรีสำหรับรถของคุณเป็นภาษาไทย — กำลังจะมีเร็ว ๆ นี้ ทั้งหมดฟรีและไม่ต้องสมัครสมาชิก',
  alternates: {
    canonical: 'https://www.naira.autos/khrueang-mue',
    languages: {
      en: 'https://www.naira.autos/tools',
      es: 'https://www.naira.autos/herramientas',
      ar: 'https://www.naira.autos/adawat',
      fr: 'https://www.naira.autos/outils',
      pt: 'https://www.naira.autos/ferramentas',
      de: 'https://www.naira.autos/werkzeuge',
      ja: 'https://www.naira.autos/tsuru',
      it: 'https://www.naira.autos/strumenti',
      th: 'https://www.naira.autos/khrueang-mue',
      'x-default': 'https://www.naira.autos/tools',
    },
  },
  keywords: ['เครื่องมือรถยนต์ฟรี', 'ช่างเครื่อง AI ฟรี', 'เครื่องมือรถยนต์ภาษาไทย'],
};

export default function ToolsThaiPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              เครื่องมือฟรี
            </span>
            <Link href="/na-lak" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              หน้าหลัก
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
            ศูนย์รวม<br />
            <span className="text-emerald-400">เครื่องมือ</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg font-light max-w-lg leading-relaxed">
            ทุกสิ่งที่คุณต้องการสำหรับการซื้อ ขาย และดูแลรถยนต์ — ฟรี ไม่ต้องสมัครสมาชิก
          </p>
          <p className="text-white/30 text-xs mt-3 flex items-center gap-1.5">
            <Globe2 className="h-3 w-3" />
            เรากำลังแปลเครื่องมือเพิ่มเติมทุกสัปดาห์
          </p>
        </div>
      </div>

      {/* ── Coming soon (no Thai tools live yet) ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center max-w-2xl mx-auto">
          <p className="text-base font-bold text-foreground mb-2">ยังไม่มีเครื่องมือภาษาไทยในขณะนี้</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            เรากำลังทำงานเพื่อนำช่างเครื่องเสมือน AI และเครื่องมืออื่น ๆ มาเป็นภาษาไทยเร็ว ๆ นี้ ระหว่างนี้คุณสามารถลองใช้{' '}
            <Link href="/tools" className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2 font-semibold">เครื่องมือภาษาอังกฤษของเรา</Link>{' '}ได้เลย
          </p>
        </div>
      </div>

      {/* Placeholder for when TOOLS_TH gets its first entries — same category-grid
          structure as the other language hubs (see /werkzeuge for reference). */}
      {TOOLS_TH.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pb-12" />
      )}
    </div>
  );
}
