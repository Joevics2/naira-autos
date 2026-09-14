import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Globe2 } from 'lucide-react';
import { TOOLS_VI } from '@/lib/tools-list-vi';

export const metadata: Metadata = {
  title: 'Công Cụ Ô Tô Miễn Phí | Naira Autos',
  description: 'Công cụ miễn phí cho ô tô của bạn bằng tiếng Việt — sắp ra mắt. Tất cả đều miễn phí và không cần đăng ký.',
  alternates: {
    canonical: 'https://www.naira.autos/cong-cu',
    languages: {
      en: 'https://www.naira.autos/tools',
      es: 'https://www.naira.autos/herramientas',
      ar: 'https://www.naira.autos/adawat',
      fr: 'https://www.naira.autos/outils',
      pt: 'https://www.naira.autos/ferramentas',
      de: 'https://www.naira.autos/werkzeuge',
      ja: 'https://www.naira.autos/tsuru',
      it: 'https://www.naira.autos/strumenti',
      vi: 'https://www.naira.autos/cong-cu',
      'x-default': 'https://www.naira.autos/tools',
    },
  },
  keywords: ['công cụ ô tô miễn phí', 'thợ máy AI miễn phí', 'công cụ ô tô tiếng Việt'],
};

export default function ToolsVietnamesePage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              Công Cụ Miễn Phí
            </span>
            <Link href="/trang-chu" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              Trang Chủ
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
            Trung Tâm<br />
            <span className="text-emerald-400">Công Cụ</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg font-light max-w-lg leading-relaxed">
            Mọi thứ bạn cần để mua, bán và bảo dưỡng ô tô — miễn phí, không cần đăng ký.
          </p>
          <p className="text-white/30 text-xs mt-3 flex items-center gap-1.5">
            <Globe2 className="h-3 w-3" />
            Chúng tôi chuyển ngữ thêm công cụ mỗi tuần.
          </p>
        </div>
      </div>

      {/* ── Coming soon (no Vietnamese tools live yet) ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center max-w-2xl mx-auto">
          <p className="text-base font-bold text-foreground mb-2">Hiện chưa có công cụ tiếng Việt nào</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Chúng tôi đang chuyển ngữ thợ máy ảo AI và các công cụ khác sang tiếng Việt trong thời gian sớm nhất. Trong lúc chờ đợi, bạn có thể thử{' '}
            <Link href="/tools" className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2 font-semibold">các công cụ tiếng Anh của chúng tôi</Link>.
          </p>
        </div>
      </div>

      {TOOLS_VI.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pb-12" />
      )}
    </div>
  );
}
