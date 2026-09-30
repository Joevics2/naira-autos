// scripts/check-best-car.ts — QA for every "Best Car For…" language.
//   npx tsx --tsconfig tsconfig.json scripts/check-best-car.ts
// Fails (exit 1) if a language is missing car text, has <800 SEO words, uses an
// unknown placeholder, or is not registered in hreflang.
import { CARS, USE_CASE_META } from '@/app/tools/cars-data';
import { seoWordCount, countWords } from '@/lib/best-car/helpers';
import { getGroup } from '@/lib/hreflang';
import { CAR_COUNTRIES } from '@/lib/car-country-pricing';
import { ALL } from '@/lib/best-car/registry';

const KNOWN = new Set(['countries', 'globalCars', 'usedCars', 'totalCars', 'n', 'country']);
let failed = false;
const fail = (m: string) => { failed = true; console.log('  ✗ ' + m); };

for (const { c, carText } of ALL) {
  console.log(`\n[${c.lang}] ${c.path}`);
  const words = seoWordCount(c);
  const faqWords = c.faqs.reduce((n, f) => n + countWords(f.q + ' ' + f.a, c.lang), 0);
  console.log(`  SEO words: ${words} (+${faqWords} FAQ)`);
  if (words < 800) fail(`SEO copy has ${words} words (<800)`);
  if (c.faqs.length < 8) fail(`only ${c.faqs.length} FAQs`);

  if (carText) {
    const missing = CARS.filter((car) => !car.availableCountries && !carText[car.id]).map((x) => x.id);
    const missingUsed = CARS.filter((car) => car.availableCountries && !carText[car.id]).map((x) => x.id);
    if (missing.length) fail(`missing text for ${missing.length} global cars: ${missing.slice(0, 5).join(', ')}…`);
    if (missingUsed.length) console.log(`  ! ${missingUsed.length} used-import cars fall back to English`);
    for (const [id, t] of Object.entries(carText)) {
      if (!t.commonIssues || !t.watchOut || !t.segment) fail(`empty field in ${id}`);
    }
  }

  const blob = JSON.stringify(c);
  for (const m of Array.from(blob.matchAll(/\{(\w+)(?::\w+)?\}/g))) if (!KNOWN.has(m[1]) && m[1] !== 'picks') fail(`unknown placeholder {${m[1]}}`);
  for (const tag of Object.keys(USE_CASE_META)) if (!(c.useCases as any)[tag]) fail(`missing use case ${tag}`);
  for (const code of [c.defaultCountry, c.picksCountry, ...c.priorityCountries]) {
    if (!CAR_COUNTRIES.some((x) => x.code === code)) fail(`unknown country code ${code}`);
  }
  const g = getGroup(c.path);
  if (!g || g.lang !== c.lang) fail(`path ${c.path} not registered for ${c.lang} in lib/hreflang.ts`);
  else if (!g.group.en) fail('hreflang group has no English entry');
  if (c.hubPath === '/tools' && c.lang !== 'en') fail('non-English page must live under its own hub, not /tools');
}
console.log(failed ? '\nFAILED' : '\nAll checks passed');
process.exit(failed ? 1 : 0);
