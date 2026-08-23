import { redirect } from 'next/navigation';

// REMOVED (2026-08-16) — every /plantillas/:type/:country page rendered
// the exact same document_templates row as /documents/:type/:country
// (same title, intro, sections — whatever language that document is
// actually written in), just wrapped in Spanish page chrome. Since each
// document is already localized per-country at the content level, this
// was a duplicate-content page for all 15 templates, not a translation.
// See next.config.js for the matching redirect (kept here too as a
// defensive fallback and so generateStaticParams isn't spent on this
// route at build time). Original implementation preserved in
// page.original.tsx.
export default function PlantillaDocumentoPage({
  params,
}: {
  params: { type: string; country: string };
}) {
  redirect(`/documents/${params.type}/${params.country}`);
}
