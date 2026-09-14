import { Camera } from 'lucide-react';

// Single source of truth for the Turkish tools index (/araclar).
// Add an entry here ONLY when that tool's Turkish page is actually
// live — never list an untranslated tool, even as a "coming soon"
// placeholder (same rule as the other language tool lists).

export type ToolTr = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_TR: ToolTr[] = [
  {
    href: '/araclar/arabam-ne-kadar-eder',
    icon: Camera,
    label: 'Arabam Ne Kadar Eder?',
    description: 'Bir fotoğraf yükleyin, yapay zeka saniyeler içinde kendi para biriminizle piyasa değerini hesaplasın.',
    badge: 'Ücretsiz',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'Yapay Zeka ve Akıllı Araçlar',
  },
];

export const CATEGORIES_TR = ['Yapay Zeka ve Akıllı Araçlar', 'Maliyet Hesaplama', 'Bakım', 'Doğrulama', 'Diğer Kaynaklar'];
