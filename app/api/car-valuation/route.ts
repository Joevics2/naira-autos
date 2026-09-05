// app/api/car-valuation/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getValuationCountry, type ValuationCountry } from '@/lib/currencies';
import { GEMINI_MODELS, getGeminiKeys } from '@/lib/gemini-keys';

// ─── Range widening ───────────────────────────────────────────────────────────
// Rounding + spread scale to the target currency's typical magnitude —
// ₦2,000,000 and $2,000 need very different rounding granularity for the
// same relative price point.
function widenRange(mid: number, vc: ValuationCountry): { low: number; high: number } {
  let pct: number;
  let minSpread: number;
  if (mid < vc.lowThreshold)      { pct = 0.25; minSpread = vc.minSpreadLow; }
  else if (mid < vc.midThreshold) { pct = 0.20; minSpread = vc.minSpreadMid; }
  else                             { pct = 0.15; minSpread = vc.minSpreadHigh; }

  const roundTo = vc.roundTo;
  let low  = Math.round((mid * (1 - pct)) / roundTo) * roundTo;
  let high = Math.round((mid * (1 + pct)) / roundTo) * roundTo;

  if (high - low < minSpread) {
    const half = Math.round(minSpread / 2 / roundTo) * roundTo;
    low  = Math.round(mid / roundTo) * roundTo - half;
    high = Math.round(mid / roundTo) * roundTo + half;
  }
  return { low: Math.max(low, roundTo * 2), high };
}

// ─── JSON parser ──────────────────────────────────────────────────────────────
function parseJSON(raw: string): Record<string, any> {
  const stripped = raw
    .replace(/^```(?:json)?\s*/im, '')
    .replace(/\s*```\s*$/im, '')
    .trim();

  try { return JSON.parse(stripped); } catch {}

  const start = stripped.indexOf('{');
  const end   = stripped.lastIndexOf('}');
  if (start !== -1 && end > start) {
    const candidate = stripped.slice(start, end + 1);
    try { return JSON.parse(candidate); } catch {}

    const clean = candidate.replace(/,\s*([}\]])/g, '$1');
    try { return JSON.parse(clean); } catch {}

    const closed = autoClose(clean);
    try { return JSON.parse(closed); } catch {}
  }

  throw new Error(`Could not parse JSON: ${raw.slice(0, 300)}`);
}

function autoClose(s: string): string {
  const stack: string[] = [];
  let inString = false;
  let escape   = false;
  for (const ch of s) {
    if (escape) { escape = false; continue; }
    if (ch === '\\' && inString) { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === '{' || ch === '[') stack.push(ch === '{' ? '}' : ']');
    else if (ch === '}' || ch === ']') stack.pop();
  }
  let result = s.replace(/,\s*$/, '');
  while (stack.length) result += stack.pop();
  return result;
}

// ─── Gemini fetch ─────────────────────────────────────────────────────────────
async function geminiCall(
  model: string,
  apiKey: string,
  parts: any[],
  maxTokens = 50000,
  temperature = 0.1,
): Promise<Record<string, any>> {
  const hasImage = parts.some((p: any) => p.inline_data);
  const generationConfig: Record<string, any> = { temperature, maxOutputTokens: maxTokens };
  if (!hasImage) generationConfig.responseMimeType = 'application/json';

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts }], generationConfig }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Gemini request failed (${res.status})`);
  }

  const data      = await res.json();
  const candidate = data?.candidates?.[0];
  if (!candidate) {
    const blockReason = data?.promptFeedback?.blockReason;
    throw new Error(blockReason ? `Gemini blocked: ${blockReason}` : 'Gemini returned no candidates');
  }

  const raw = candidate?.content?.parts?.[0]?.text || '';
  if (!raw.trim()) {
    throw new Error(`Gemini returned empty response (finishReason: ${candidate?.finishReason || 'unknown'})`);
  }

  return parseJSON(raw);
}

// ─── imgbb upload ─────────────────────────────────────────────────────────────
async function uploadToImgbb(imageBase64: string): Promise<string> {
  const imgbbKey = process.env.IMGBB_API_KEY;
  if (!imgbbKey) {
    console.error('[car-valuation] IMGBB_API_KEY not set — cannot upload for SerpAPI');
    return '';
  }
  console.log(`[car-valuation] imgbb: key present (length=${imgbbKey.length}), uploading...`);

  const clean = imageBase64.replace(/^data:[^;]+;base64,/, '');
  console.log(`[car-valuation] imgbb: base64 length=${clean.length}`);

  try {
    const body = new URLSearchParams();
    body.append('image', clean);
    body.append('expiration', '600');

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    body.toString(),
      signal:  AbortSignal.timeout(20_000),
    });

    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.success) {
      console.error(`[car-valuation] imgbb upload failed: HTTP ${res.status}`, json?.error?.message || json?.status_txt || '');
      return '';
    }

    const url = json?.data?.url || json?.data?.display_url || '';
    if (!url) { console.error('[car-valuation] imgbb: no URL in response'); return ''; }

    console.log(`[car-valuation] imgbb upload succeeded: ${url}`);
    return url;
  } catch (e: any) {
    console.error('[car-valuation] imgbb upload threw:', e.message);
    return '';
  }
}

// ─── Step 1: SerpAPI Google Lens ──────────────────────────────────────────────
// Returns the FULL raw SerpAPI response dump — every field, unfiltered.
// Gemini receives everything and decides what to use.
async function reverseImageSearchWithSerp(
  imageBase64: string,
  vc: ValuationCountry,
): Promise<string> {
  const serpKeys = [
    process.env.SERP_API_KEY_1,
    process.env.SERP_API_KEY_2,
    process.env.SERP_API_KEY_3,
  ].filter(Boolean) as string[];

  if (!serpKeys.length) {
    console.warn('[car-valuation] No SERP_API_KEY_* env vars — SerpAPI skipped');
    return '';
  }
  console.log(`[car-valuation] SerpAPI: ${serpKeys.length} key(s) found`);

  const imageUrl = await uploadToImgbb(imageBase64);
  if (!imageUrl) {
    console.warn('[car-valuation] imgbb upload failed — SerpAPI skipped');
    return '';
  }

  for (let i = 0; i < serpKeys.length; i++) {
    const key = serpKeys[i];
    try {
      console.log(`[car-valuation] SerpAPI: trying key ${i + 1}/${serpKeys.length}...`);

      // `q`, `gl`, and `location` bias Google Lens toward the selected
      // country's market results (listings, prices, local context)
      // alongside the standard visual matches.
      const params = new URLSearchParams({
        engine:  'google_lens',
        api_key: key,
        url:     imageUrl,
        q:       `used car sale price ${vc.name} ${vc.currency}`,
        hl:      'en',
        gl:      vc.code,      // country bias — biases results to that country's domains
        location: vc.name,
      });

      const res = await fetch(`https://serpapi.com/search.json?${params.toString()}`, {
        method: 'GET',
        signal: AbortSignal.timeout(25_000),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        console.warn(`[car-valuation] SerpAPI key ${i + 1} failed (HTTP ${res.status}):`, data?.error || 'no error body');
        continue;
      }

      // Build a comprehensive raw dump of everything SerpAPI returned
      const sections: string[] = [];

      // Knowledge graph (car identity — highest confidence)
      if (data?.knowledge_graph) {
        sections.push('=== KNOWLEDGE GRAPH ===');
        sections.push(JSON.stringify(data.knowledge_graph, null, 2));
      }

      // All visual matches — titles, sources, snippets, prices, thumbnails metadata
      const visualMatches: any[] = data?.visual_matches || [];
      if (visualMatches.length) {
        sections.push(`=== VISUAL MATCHES (${visualMatches.length} total) ===`);
        visualMatches.forEach((m: any, idx: number) => {
          const entry = [
            `[${idx + 1}] Title: ${m.title || ''}`,
            m.source  ? `    Source: ${m.source}`  : '',
            m.link    ? `    Link: ${m.link}`       : '',
            m.snippet ? `    Snippet: ${m.snippet}` : '',
            m.price   ? `    Price: ${JSON.stringify(m.price)}` : '',
          ].filter(Boolean).join('\n');
          sections.push(entry);
        });
      }

      // Related searches
      const relatedSearches: any[] = data?.related_searches || [];
      if (relatedSearches.length) {
        sections.push('=== RELATED SEARCHES ===');
        relatedSearches.forEach((rs: any) => {
          if (rs.query) sections.push(`  - ${rs.query}`);
        });
      }

      // Text results (lens sometimes returns web results)
      const textResults: any[] = data?.text_results || [];
      if (textResults.length) {
        sections.push('=== TEXT RESULTS ===');
        textResults.forEach((t: any) => {
          sections.push(`  Title: ${t.title || ''} | Snippet: ${t.snippet || ''}`);
        });
      }

      const serpDump = sections.join('\n\n');
      console.log(`[car-valuation] SerpAPI key ${i + 1} succeeded: ${visualMatches.length} visual matches, ${relatedSearches.length} related searches`);
      console.log(`[car-valuation] SerpAPI dump size: ${serpDump.length} chars`);
      return serpDump;

    } catch (e: any) {
      console.warn(`[car-valuation] SerpAPI key ${i + 1} threw:`, e.message);
    }
  }

  console.error('[car-valuation] All SerpAPI keys exhausted');
  return '';
}

// ─── Step 2: Gemini Vision + SerpAPI dump → country-aware valuation ───────────
async function analyzeAndPriceWithGemini(
  model: string,
  imageBase64: string,
  mimeType: string,
  serpDump: string,
  condition: string,
  location: string,
  vc: ValuationCountry,
  apiKey: string,
  lang?: string,
): Promise<Record<string, any>> {
  const conditionLabel =
    condition === 'excellent' ? 'Excellent (like new, all working)'
    : condition === 'good'    ? 'Good (minor wear, fully functional)'
    :                           'Fair (visible wear, may need repairs)';

  const currentYear = new Date().getFullYear();
  const isNigeria = vc.code === 'ng';
  const isSpanish = lang === 'es';

  // Only the free-text fields get translated. Enum-like fields (bodyType,
  // vehicleType, fuelType, transmission, confidence, estimatedCarType) must
  // stay in English regardless of lang — the frontend matches on their
  // exact English values (e.g. result.confidence === 'High').
  const languageInstruction = isSpanish
    ? `\nLANGUAGE: Write "description", "bodyGradeReason", "disclaimer", and every string inside "valuationFactors" in natural, fluent Spanish. Keep every other field — bodyType, vehicleType, fuelType, transmission, confidence, estimatedCarType, and all JSON keys — in English exactly as specified below; do not translate those.\n`
    : '';

  const serpSection = serpDump
    ? `=== GOOGLE LENS REVERSE IMAGE SEARCH DATA ===
The following is the raw result from Google Lens scanning this exact car image.
Use it to confirm the car's make, model, year, trim, and any other details visible.
Cross-reference with your own vision analysis of the image.

${serpDump}

=== END OF GOOGLE LENS DATA ===`
    : 'No Google Lens data available — use your vision analysis of the image only.';

  // Nigeria's used-car market has a well-known local vs. foreign-import price
  // split (Tokunbo). Other markets don't have an equivalent split, so this
  // whole block of instructions/fields is Nigeria-only.
  const carTypeInstructions = isNigeria
    ? `4. Consider whether this is a Nigerian-used, Tokunbo (foreign-used), or brand-new vehicle based on the image
5. Apply condition and body grade adjustments to the price`
    : `4. Consider whether this is a used or brand-new vehicle based on the image
5. Apply condition and body grade adjustments to the price`;

  const carTypeField = isNigeria
    ? `"estimatedCarType": "nigerian_used|foreign_used|brand_new",`
    : `"estimatedCarType": "used|brand_new",`;

  const pricingCarTypeRules = isNigeria
    ? `- First assess estimatedCarType from the image (plate format, wear pattern, steering side, interior condition):
    - nigerian_used: locally used car, typically lower price bracket
    - foreign_used: Tokunbo/imported, typically 20-40% premium over nigerian_used equivalent
    - brand_new: dealership-fresh, full market price
- Price to the detected carType — do NOT assume Tokunbo unless the image evidence supports it`
    : `- First assess estimatedCarType from the image (wear pattern, interior condition):
    - used: pre-owned vehicle, price to condition and mileage indicators visible
    - brand_new: dealership-fresh, full market price`;

  const prompt = `You are a senior used car appraiser with deep knowledge of the ${vc.name} market${isNigeria ? ', specifically the Lagos, Abuja, and Port Harcourt markets' : ''}. Your job is to analyze the car image AND the Google Lens search data below, then produce an accurate ${vc.name} market valuation.
${languageInstruction}
${serpSection}

OWNER-REPORTED CONDITION: ${conditionLabel}
VALUATION LOCATION: ${location}, ${vc.name}
CURRENT YEAR: ${currentYear}

INSTRUCTIONS:
1. Use your vision to identify the car from the image (make, model, year, trim, color, body condition)
2. Cross-reference with the Google Lens data above to confirm identification
3. Use both your training knowledge of the ${vc.name} used car market AND any pricing signals in the Lens data to estimate the ${vc.currency} value
${carTypeInstructions}

Return ONLY a single valid JSON object. No markdown, no preamble, no explanation — just the JSON.

{
  "brand": "manufacturer name e.g. Toyota",
  "model": "model name e.g. Camry",
  "yearRange": "YYYY-YYYY",
  "yearMid": "YYYY",
  "trim": "trim level or empty string",
  "bodyType": "sedan|suv|hatchback|coupe|convertible|wagon|truck|van|bus|bike",
  "vehicleType": "car|truck|van|bus|bike",
  "color": "exterior color",
  "fuelType": "Petrol|Diesel|Hybrid|Electric",
  "transmission": "Automatic|Manual",
  ${carTypeField}
  "bodyGrade": "very_clean|clean|not_clean",
  "bodyGradeReason": "one sentence describing exterior condition from the image",
  "confidence": "High|Medium|Low",
  "suggestedPrice": 0,
  "similarListingsCount": 0,
  "valuationFactors": ["factor 1", "factor 2", "factor 3"],
  "disclaimer": "one sentence",
  "description": "2-3 sentences describing the car",
  "reasonForSelling": "",
  "features": ["feature1", "feature2"]
}

PRICING RULES:
- suggestedPrice must be an integer in ${vc.name} ${vc.currency}, no decimals
- Base price on current ${vc.name} market rates for this exact make/model/year/trim
${pricingCarTypeRules}
- bodyGrade adjustments: very_clean = no change | clean = -3% to -7% | not_clean = -10% to -15%
- condition adjustments: Excellent = +5% | Good = no change | Fair = -10%

BODY GRADE (from image only):
- very_clean: no dents, scratches, rust, or paint issues visible
- clean: minor stone chips or light wear, no dents or rust
- not_clean: visible dents, rust patches, significant scratches, or heavily faded paint

FEATURES — only include what is confirmed standard for this exact model and year:
Air Conditioning, Power Steering, Power Windows, Power Locks, AM/FM Radio, CD Player, Bluetooth, USB/AUX, Backup Camera, Parking Sensors, ABS, Airbags, Alloy Wheels, Sunroof, Leather Seats, Heated Seats, Navigation GPS, Cruise Control, Keyless Entry, Push Start, Immobilizer

VALUATION FACTORS — write exactly 3, in plain friendly language a car buyer in ${vc.name} would understand. No jargon, no mention of search data or internal methodology.`;

  const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');

  return geminiCall(
    model, apiKey,
    [
      { inline_data: { mime_type: mimeType, data: cleanBase64 } },
      { text: prompt },
    ],
    50000, 0.1,
  );
}

// ─── Main handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType, condition, location, country, skipSerp, lang } = body;

    if (!imageBase64) return NextResponse.json({ error: 'No image provided' },    { status: 400 });
    if (!condition)   return NextResponse.json({ error: 'No condition provided' }, { status: 400 });

    // country is required for every caller except add-listing mode
    // (skipSerp=true), which is a Nigeria-only marketplace feature and
    // always defaults to Nigeria regardless of what's passed.
    if (!skipSerp && !country) {
      return NextResponse.json({ error: 'Please select a country before evaluating.' }, { status: 400 });
    }

    const vc = getValuationCountry(skipSerp ? (country || 'ng') : country);

    const geminiKeys = getGeminiKeys();
    if (geminiKeys.length === 0) return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });

    const loc  = location || (vc.code === 'ng' ? 'Lagos' : vc.name);
    const mime = mimeType || 'image/jpeg';

    console.log('[car-valuation] ENV CHECK — Gemini keys configured:', geminiKeys.length, '| IMGBB_API_KEY:', !!process.env.IMGBB_API_KEY, '| SERP_API_KEY_1:', !!process.env.SERP_API_KEY_1, '| country:', vc.code);

    // Step 1: SerpAPI Google Lens (skipped when skipSerp=true, e.g. add-listing mode)
    console.log('[car-valuation] Step 1:', skipSerp ? 'SerpAPI skipped (Gemini-only mode)' : 'SerpAPI Google Lens...');
    const serpDump = skipSerp ? '' : await reverseImageSearchWithSerp(imageBase64, vc);

    // Step 2: Gemini — image + full SerpAPI dump → country-aware valuation
    console.log('[car-valuation] Step 2: Gemini analysis (image + SerpAPI data)...');
    let result: Record<string, any> | null = null;
    let lastError = '';

    outer: for (const model of GEMINI_MODELS) {
      for (const geminiKey of geminiKeys) {
        try {
          result = await analyzeAndPriceWithGemini(
            model, imageBase64, mime,
            serpDump, condition, loc, vc, geminiKey, lang,
          );
          console.log(`[car-valuation] Gemini [${model}] succeeded: ${result.brand} ${result.model} ${result.yearMid} @ ${vc.currency} ${result.suggestedPrice?.toLocaleString()}`);
          break outer;
        } catch (err: any) {
          lastError = err.message;
          console.warn(`[car-valuation] Gemini [${model}] failed with a key:`, err.message);
        }
      }
    }

    if (!result) {
      console.error('[car-valuation] All Gemini models/keys failed:', lastError);
      return NextResponse.json({ error: 'Could not analyze this image. Please try a clearer photo.' }, { status: 502 });
    }

    const mid = typeof result.suggestedPrice === 'number' ? result.suggestedPrice : 0;
    const { low, high } = widenRange(mid, vc);

    return NextResponse.json({
      data: {
        brand:                result.brand,
        model:                result.model,
        yearRange:            result.yearRange,
        yearMid:              result.yearMid,
        trim:                 result.trim               || '',
        bodyType:             result.bodyType,
        vehicleType:          result.vehicleType,
        color:                result.color,
        fuelType:             result.fuelType,
        transmission:         result.transmission,
        confidence:           result.confidence,
        estimatedCarType:     result.estimatedCarType,
        bodyGrade:            result.bodyGrade          || '',
        bodyGradeReason:      result.bodyGradeReason    || '',
        suggestedPrice:       mid,
        priceRangeLow:        low,
        priceRangeHigh:       high,
        currency:             vc.currency,
        country:              vc.code,
        similarListingsCount: result.similarListingsCount || 0,
        valuationFactors:     result.valuationFactors     || [],
        disclaimer:           result.disclaimer           || '',
        description:          result.description          || '',
        reasonForSelling:     result.reasonForSelling     || '',
        features:             result.features             || [],
        condition,
        conditionLabel: condition === 'excellent' ? 'Excellent' : condition === 'good' ? 'Good' : 'Fair',
        location: loc,
      },
    });

  } catch (err: any) {
    console.error('[car-valuation] Unhandled error:', err);
    const isDev = process.env.NODE_ENV === 'development';
    return NextResponse.json(
      { error: isDev ? (err.message || 'Failed to analyze car') : 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}