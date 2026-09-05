// lib/gemini-keys.ts
//
// Single source of truth for which Gemini models and API keys every
// AI-powered route on the site tries, in order.
//
// MODELS: gemini-3.1-flash-lite (primary, GA) -> gemini-3.5-flash (fallback, GA).
// Both are current, generally-available model IDs as of Sep 2026 — no
// dated preview snapshots, since those cycle out and silently exhaust
// the whole waterfall (see prior incident notes in ai-mechanic/route.ts
// and generate-social-post/route.ts). Before adding another model here,
// check https://ai.google.dev/gemini-api/docs/deprecations first.
//
// KEYS: same 4 keys (GEMINI_API_KEY -> GEMINI_API_KEY_4) reused by every
// route, so any one project's quota/rate-limit doesn't take a tool down —
// each route tries every (model, key) pair before giving up.

export const GEMINI_MODELS = ['gemini-3.1-flash-lite', 'gemini-3.5-flash'];

export function getGeminiKeys(): string[] {
  return [
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
    process.env.GEMINI_API_KEY_4,
  ].filter((k): k is string => !!k);
}
