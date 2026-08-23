import { redirect } from 'next/navigation';

// REMOVED (2026-08-16) — /plantillas was a Spanish-chrome'd mirror of
// /documents showing the exact same template rows (whatever language each
// one is actually written in — English, Italian, Arabic, Dutch, etc, per
// country). That made it a true duplicate-content page, not a real
// localization, since none of the underlying legal text changed.
// See next.config.js for the matching redirect (kept here too as a
// defensive fallback and so no build-time work is spent on this route).
// Original implementation preserved in page.original.tsx.
export default function PlantillasIndexPage() {
  redirect('/documents');
}
