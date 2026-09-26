import { Wrench, Camera } from 'lucide-react';

// Single source of truth for the Indonesian tools index (/alat).
// Add an entry here ONLY when that tool's Indonesian page is actually
// live — never list an untranslated tool (same rule as the other
// language tool lists).

export type ToolId = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_ID: ToolId[] = [
  {
    href: '/alat/montir-virtual',
    icon: Wrench,
    label: 'Montir Virtual AI',
    description: 'Jelaskan kerusakan, unggah foto, suara, atau video dan dapatkan diagnosis serta biaya perbaikan dalam hitungan detik.',
    badge: 'Gratis',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'AI dan Alat Cerdas',
  },
  {
    href: '/alat/berapa-harga-mobil-saya',
    icon: Camera,
    label: 'Berapa Harga Mobil Saya?',
    description: 'Unggah satu foto, biarkan AI menghitung nilai pasar dalam mata uang Anda hanya dalam hitungan detik.',
    badge: 'Gratis',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'AI dan Alat Cerdas',
  },
];

export const CATEGORIES_ID = ['AI dan Alat Cerdas', 'Keuangan', 'Biaya dan Perawatan', 'Verifikasi', 'Sumber Daya'];
