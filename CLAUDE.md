# Naira Autos — Working Notes for Claude / Coding Agents

This file is read automatically by Claude Code (and should be checked by any
other agent working in this repo). It captures standards that are easy to
forget mid-task and expensive to retrofit across dozens of pages later.

## Every new page MUST ship with these four things

This applies to **every** page under `app/` that a user can land on directly
from a search engine — every top-level page (`evaluate-used-car`,
`cuanto-vale-mi-auto`, `kam-qeemat-sayarati`, `adawat`, etc.) and every
`app/tools/*` page. It does not apply to pure UI shells that always render
inside another page (e.g. a modal-only component).

Do not treat these as optional polish to add "if there's time." A page
without them is not done — Google can't rank a page it can't parse the
structure of, and a user who lands on it can't get back to where they came
from.

### 1. Visible breadcrumb trail + back button (in the hero)

Every page needs a breadcrumb nav **and** a circular back-arrow button,
placed together at the top of the hero, above the headline. Copy the pattern
from `app/tools/vin-checker/page.tsx` (canonical LTR reference) or
`app/kam-qeemat-sayarati/page.tsx` (canonical RTL reference).

LTR shape:
```tsx
<div className="flex items-center gap-3 mb-6 text-left">
  <Link href="/tools" className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/15 hover:border-amber-400/40 text-white/60 hover:text-amber-400 transition-all flex-shrink-0" aria-label="Back to tools">
    <ArrowLeft className="h-3.5 w-3.5" />
  </Link>
  <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/30">
    <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
    <ChevronRight className="h-3 w-3" />
    <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
    <ChevronRight className="h-3 w-3" />
    <span className="text-white/50">{Current Page Name}</span>
  </nav>
</div>
```

**RTL pages (Arabic) mirror this, they do not reuse it as-is:**
- `text-right` instead of `text-left`
- Back button icon is `ArrowRight`, not `ArrowLeft` — in RTL, "forward" reads
  visually left, so "back" points right. (Confirmed by existing convention:
  `ArrowLeft` is used for "forward/view all" actions in `app/home-arabic/page.tsx`.)
- Breadcrumb separator is `ChevronLeft`, not `ChevronRight` — matches the
  existing convention in `app/adawat/ai-mechanic-arabic/page.tsx`.
- Breadcrumb items read in natural Arabic order: الرئيسية → الأدوات → current
  page.

The breadcrumb **labels and hrefs must exactly match** the `BreadcrumbList`
JSON-LD on the same page (see below) — Google penalizes mismatches between
visible content and structured data.

### 2. JSON-LD structured data

Every page needs a `<script type="application/ld+json">` block. At minimum:
- A `breadcrumb` node of `@type: 'BreadcrumbList'`, matching the visible
  breadcrumb exactly (same names, same URLs, same order).
- A `mainEntity` describing what the page actually is (`SoftwareApplication`
  for a tool/calculator, `Article` for a blog post, `Product` for a listing,
  etc).
- A `faqPage` node (`@type: 'FAQPage'`) if the page has an FAQ section —
  and if you're writing FAQ copy anyway, make it a real `FAQPage` node
  instead of a plain section, it's close to free.

Reference implementations: `app/tools/vin-checker/page.tsx`,
`app/kam-qeemat-sayarati/page.tsx`, `app/evaluate-used-car/page.tsx`.

### 3. Metadata export

Every page needs a `metadata: Metadata` export with:
- `title`, `description`, `keywords` — written for the actual page content,
  not boilerplate.
- `openGraph` — `title`, `description`, `url`, `siteName`, `locale`
  (`'en'` / `'es'` / `'ar'`), `type`.
- `alternates.canonical` — the page's own canonical URL.
- `alternates.languages` — every language variant of this page that exists,
  **plus `x-default`**. This must be kept in sync in both directions: when
  you add a new language variant of an existing page, go back and add it to
  the `alternates.languages` of every other language variant too. (See how
  `evaluate-used-car`, `cuanto-vale-mi-auto`, and `kam-qeemat-sayarati` all
  cross-link each other.)

### 4. Registered in the site's discovery surfaces

A page nobody links to and that isn't in the sitemap effectively doesn't
exist to Google, no matter how well-structured it is internally. For every
new page:
- Add it to the relevant `lib/tools-list-{lang}.ts` (or equivalent index)
  so it surfaces on that language's tools hub.
- Add its URL to `app/sitemap-static.xml/route.ts`. Individual tool/content
  pages go in immediately. Hub/index pages for a new language (e.g.
  `/adawat`, `/home-arabic`) are held back until that language has a
  critical mass of live pages (~5) — see the comment already in that file
  for the reasoning; don't remove or "fix" that comment without discussing
  it, it's intentional.
- If a visible cross-language link makes sense on the page (e.g. "Read in
  English →"), add it — but this doesn't replace `alternates.languages`,
  it's in addition to it.

### Path convention: non-English tool pages live under their own language's index, not `/tools`

Tool pages moved away from `/tools/<name>` for non-English languages: a
Spanish tool lives at `/herramientas/<name>`, Arabic at `/adawat/<name>`,
French at `/outils/<name>`, Portuguese at `/ferramentas/<name>`. Only
English tool pages stay under `/tools/`. If you move an existing page to
follow this, add a permanent redirect in `next.config.js` from the old
path (see the `movedToolPageRedirects` block there for the pattern) — the
old URL may already be indexed/linked externally.

## Quick pre-commit checklist for any new/edited page

- [ ] Breadcrumb nav visible in the hero, back-button beside it
- [ ] Breadcrumb visible content matches `BreadcrumbList` JSON-LD exactly
- [ ] `mainEntity` (and `faqPage` if there's an FAQ) present in JSON-LD
- [ ] `metadata` export complete, including `alternates.languages` +
      `x-default`
- [ ] Other-language variants' `alternates.languages` updated to point back
      at this page, if this page is a new language variant of an existing one
- [ ] Page added to its language's tools/index list
- [ ] Page URL added to `sitemap-static.xml`
- [ ] RTL pages use `dir="rtl" lang="ar"` on the outer wrapper, and follow
      the mirrored icon conventions above, not the LTR ones
- [ ] `npx next lint --file <path>` and `NODE_OPTIONS="--max-old-space-size=8192" npx tsc --noEmit`
      both clean before committing (plain `tsc --noEmit` OOMs on this repo's
      size — always pass the larger heap)

## Concurrent editing note

Other sessions/agents may be working on this repo at the same time. Before
pushing, `git fetch` and check `git log FETCH_HEAD` — if the remote has
moved, merge (don't force-push) and re-verify lint/typecheck on the merged
tree before pushing.
