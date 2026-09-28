import type { Lang } from '@/lib/hreflang';

// Breadcrumb / back-button labels for hub pages. Home and Tools labels match
// what each language's existing tool pages already use, so hub and tool
// breadcrumbs read identically.
export const NAV_LABELS: Record<Lang, { home: string; tools: string; blog: string; back: string }> = {
  en: { home: 'Home', tools: 'Tools', blog: 'Blog', back: 'Back' },
  es: { home: 'Inicio', tools: 'Herramientas', blog: 'Blog', back: 'Volver' },
  ar: { home: 'الرئيسية', tools: 'الأدوات', blog: 'المدونة', back: 'رجوع' },
  fr: { home: 'Accueil', tools: 'Outils', blog: 'Blog', back: 'Retour' },
  pt: { home: 'Início', tools: 'Ferramentas', blog: 'Blog', back: 'Voltar' },
  de: { home: 'Startseite', tools: 'Werkzeuge', blog: 'Blog', back: 'Zurück' },
  ja: { home: 'ホーム', tools: 'ツール', blog: 'ブログ', back: '戻る' },
  it: { home: 'Home', tools: 'Strumenti', blog: 'Blog', back: 'Indietro' },
  tr: { home: 'Ana Sayfa', tools: 'Araçlar', blog: 'Blog', back: 'Geri' },
  th: { home: 'หน้าหลัก', tools: 'เครื่องมือ', blog: 'บล็อก', back: 'ย้อนกลับ' },
  id: { home: 'Beranda', tools: 'Alat', blog: 'Blog', back: 'Kembali' },
  vi: { home: 'Trang Chủ', tools: 'Công Cụ', blog: 'Blog', back: 'Quay lại' },
  nl: { home: 'Startpagina', tools: 'Gereedschappen', blog: 'Blog', back: 'Terug' },
  hi: { home: 'मुख्य पृष्ठ', tools: 'उपकरण', blog: 'ब्लॉग', back: 'वापस जाएं' },
  ko: { home: '홈', tools: '도구', blog: '블로그', back: '뒤로' },
  ru: { home: 'Главная', tools: 'Инструменты', blog: 'Блог', back: 'Назад' },
};
