// lib/vehicle/engineNumberMatcher.ts
//
// Pure client-side heuristic matcher — no API, no network calls. Matches a
// user-typed engine number / engine code against the static family-code
// database in engineNumberPatterns.ts and returns ranked candidates with a
// rough confidence level. This is a FAMILY-CODE match only: the unique
// serial number that follows the family code on a real engine stamp is not
// (and cannot be) decoded publicly.

import { engineCodes, EngineCodeRecord } from './engineNumberPatterns';

export type EngineMatch = EngineCodeRecord & { score: number };

export type EngineMatchConfidence = 'high' | 'medium' | 'low' | 'none';

export function normalizeEngineInput(input: string): string {
  return input
    .toUpperCase()
    .replace(/[\s\-_./\\]/g, '')
    .trim();
}

export function matchEngineCode(rawInput: string): {
  matches: EngineMatch[];
  confidence: EngineMatchConfidence;
} {
  const normalized = normalizeEngineInput(rawInput);
  if (!normalized || normalized.length < 3) {
    return { matches: [], confidence: 'none' };
  }

  const results = engineCodes
    .map((engine) => {
      let score = 0;
      const codeNorm = normalizeEngineInput(engine.code);

      // Exact match
      if (normalized === codeNorm) score += 100;

      // Starts with code (typical — family code first, serial after)
      if (normalized.startsWith(codeNorm)) score += 70;

      // Contains code somewhere in the string
      if (normalized.includes(codeNorm)) score += 40;

      // Alias match
      engine.aliases?.forEach((alias) => {
        const aliasNorm = normalizeEngineInput(alias);
        if (normalized === aliasNorm) score += 90;
        else if (normalized.startsWith(aliasNorm)) score += 60;
        else if (normalized.includes(aliasNorm)) score += 35;
      });

      // Family bonus — only when nothing else matched yet, so it doesn't
      // stack on top of an already-strong code/alias hit.
      if (
        score === 0 &&
        engine.family &&
        normalized.includes(normalizeEngineInput(engine.family))
      ) {
        score += 15;
      }

      // Weight boost for distinctive engines — only applied once the input
      // has actually matched something, so it can't create phantom results.
      if (score > 0) score += engine.weight || 5;

      return { ...engine, score };
    })
    .filter((r) => r.score >= 40)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  let confidence: EngineMatchConfidence = 'none';
  if (results.length > 0) {
    if (results[0].score >= 90) confidence = 'high';
    else if (results[0].score >= 60) confidence = 'medium';
    else confidence = 'low';
  }

  return { matches: results, confidence };
}
