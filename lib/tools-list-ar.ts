import { Wrench } from 'lucide-react';

// Single source of truth for the Arabic tools index (/adawat).
// Add an entry here ONLY when that tool's Arabic page is actually live —
// never list an untranslated tool, even as a "coming soon" placeholder
// (thin-content risk, same rule as tools-list-es.ts and the English
// tools list).

export type ToolAr = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_AR: ToolAr[] = [
  {
    href: '/tools/ai-mechanic-arabic',
    icon: Wrench,
    label: 'ميكانيكي افتراضي بالذكاء الاصطناعي',
    description: 'صف عطل سيارتك أو ارفع صورة أو صوتًا واحصل على تشخيص فوري مع تقدير تكلفة الإصلاح.',
    badge: 'مجاني',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'الذكاء الاصطناعي والأدوات الذكية',
  },
];

export const CATEGORIES_AR = ['الذكاء الاصطناعي والأدوات الذكية', 'المالية', 'التكاليف والصيانة', 'الفحص والتحقق', 'موارد'];
