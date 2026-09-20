import { Wrench, Camera, ScanLine, Ruler } from 'lucide-react';

// Single source of truth for the Japanese tools index (/tsuru).
// Add an entry here ONLY when that tool's Japanese page is actually
// live — never list an untranslated tool (same rule as the other
// language tool lists).

export type ToolJa = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_JA: ToolJa[] = [
  {
    href: '/tsuru/kuruma-satei',
    icon: Camera,
    label: '愛車の価値は？',
    description: '写真をアップロードするだけで、AIが自国通貨で市場価格を即座に査定します。',
    badge: '無料',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'AIと便利ツール',
  },
  {
    href: '/tsuru/ai-shindan',
    icon: Wrench,
    label: 'AIメカニック',
    description: '車の症状を説明するか、写真や音声をアップロードすると、修理費用の見積もりを含む診断結果がすぐに表示されます。',
    badge: '無料',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'AIと便利ツール',
  },
  {
    href: '/tsuru/vin-code-shirabe',
    icon: ScanLine,
    label: 'VINコード（車台番号）照会',
    description: 'VINコード（車台番号）を無料で照会 — メーカー、モデル、年式、エンジン、生産国が即座にわかります。',
    badge: '無料',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: '確認・検証',
  },
  {
    href: '/tsuru/kyori-keisan',
    icon: Ruler,
    label: '距離計算機 — 日本',
    description: '日本の43都市間の道路距離と運転時間を計算、燃料費計算機付き。',
    badge: '新着',
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: '費用計算',
  },
];

export const CATEGORIES_JA = ['AIと便利ツール', '費用計算', 'メンテナンス', '確認・検証', 'その他のリソース'];
