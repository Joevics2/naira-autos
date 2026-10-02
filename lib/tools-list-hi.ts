import { Wrench, Car, Calculator } from 'lucide-react';

// Single source of truth for the Hindi tools index (/upkaran).
// Add an entry here ONLY when that tool's Hindi page is actually
// live — never list an untranslated tool (same rule as the other
// language tool lists).

export type ToolHi = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_HI: ToolHi[] = [
  {
    href: '/upkaran/aabhasi-mekanik',
    icon: Wrench,
    label: 'AI मैकेनिक',
    description: 'खराबी बताएं, फोटो, आवाज़ या वीडियो अपलोड करें और कुछ ही सेकंड में निदान व मरम्मत लागत पाएं।',
    badge: 'मुफ़्त',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'AI और स्मार्ट टूल्स',
  },
  {
    href: "/upkaran/aapke-liye-sabse-achhi-car",
    icon: Car,
    label: "आपके लिए सबसे अच्छी कार",
    description: "अपना उपयोग चुनें — फ़ैमिली, कमर्शियल, हाईवे, कम बजट, ऑफ़-रोड या एग्ज़ीक्यूटिव — और 55 देशों में स्थानीय कीमतों के साथ सुझाव पाएँ।",
    badge: "नया",
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: "लागत और रखरखाव",
  },
  {
    href: '/upkaran/car-aayat-shulk-calculator-bharat',
    icon: Calculator,
    label: 'भारत कार आयात शुल्क कैलकुलेटर',
    description: 'नई या पुरानी कार के आयात पर BCD, AIDC, IGST और शुल्क सहित कुल लैंडेड लागत निकालें — बजट 2025 और GST 2.0 की दरों के साथ।',
    badge: 'नया',
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: 'वित्त',
  },
];

export const CATEGORIES_HI = ['AI और स्मार्ट टूल्स', 'वित्त', 'लागत और रखरखाव', 'सत्यापन', 'संसाधन'];
