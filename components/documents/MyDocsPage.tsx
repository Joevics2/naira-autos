import { getDocs, type DocsLang } from '@/lib/documents-i18n';
import DocsHeader from '@/components/documents/DocsHeader';
import LanguagePills from '@/components/ui/LanguagePills';
import MyDocumentsLocalized from '@/components/documents/MyDocumentsLocalized';

export default function MyDocsPage({ lang }: { lang: DocsLang }) {
  const s = getDocs(lang);
  return (
    <div className="min-h-screen bg-background" dir={s.dir} lang={s.locale}>
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-6 space-y-6">
        <DocsHeader
          lang={lang}
          schema={false}
          crumbs={[{ label: s.docsLabel, path: s.path }, { label: s.mine.title, path: s.minePath }]}
        />
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{s.mine.title}</h1>
            <LanguagePills path={s.minePath} tone="auto" />
          </div>
          <p className="text-sm text-muted-foreground">{s.mine.intro}</p>
        </div>
        <MyDocumentsLocalized s={s.mine} hubPath={s.path} locale={s.locale} rtl={s.dir === 'rtl'} axiosHref={s.axiosHref} />
      </div>
    </div>
  );
}
