import { notFound } from 'next/navigation';

// TEMPORARILY DISABLED (commented out, not deleted) — 2026-08-16.
// We consolidated all published vehicle content into a single searchable
// hub at /vehicles for SEO/AdSense reasons (too many thin, mostly-unindexed
// pages). The full original implementation is preserved untouched in
// ./page.original.tsx in this same folder.
//
// To restore this route: delete this file and rename page.original.tsx
// back to page.tsx.
export default function DisabledPage() {
  notFound();
}
