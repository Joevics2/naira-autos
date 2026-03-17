// app/api/car-valuation/route.ts
import { NextRequest, NextResponse } from 'next/server';

const GEMINI_MODELS = [
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash',
  'gemini-2.5-flash-preview-09-2025',
  'gemini-2.5-flash-lite-preview-09-2025',
  'gemini-2.5-pro',
  'gemini-3-flash-preview',
];

// ─── Range widening ───────────────────────────────────────────────────────────
// Applied server-side so AI never controls the spread.
// <2M → ±25% (min ₦500k), 2M–5M → ±20% (min ₦1M), >5M → ±15% (min ₦1.5M)
function widenRange(mid: number): { low: number; high: number } {
  let pct: number;
  let minSpread: number;
  if (mid < 2_000_000)      { pct = 0.25; minSpread = 500_000; }
  else if (mid < 5_000_000) { pct = 0.20; minSpread = 1_000_000; }
  else                       { pct = 0.15; minSpread = 1_500_000; }

  let low  = Math.round((mid * (1 - pct)) / 50_000) * 50_000;
  let high = Math.round((mid * (1 + pct)) / 50_000) * 50_000;

  if (high - low < minSpread) {
    const half = Math.round(minSpread / 2 / 50_000) * 50_000;
    low  = Math.round(mid / 50_000) * 50_000 - half;
    high = Math.round(mid / 50_000) * 50_000 + half;
  }
  return { low: Math.max(low, 100_000), high };
}

// ─── Step 1: Gemini Vision — identify car + grade body ────────────────────────
// Returns carInfo including a numeric confidenceScore (0–100) used to decide
// whether SerpAPI reverse image search is needed.
async function identifyCarWithGemini(
  model: string,
  imageBase64: string,
  mimeType: string,
  apiKey: string
): Promise<Record<string, any>> {
  const prompt = `You are a car identification expert. Analyze this car image carefully.

Return ONLY raw JSON, no markdown, no explanation, no code fences:
{
  "brand": "e.g. Toyota",
  "model": "e.g. Camry",
  "yearRange": "e.g. 2018-2020",
  "yearMid": "e.g. 2019",
  "trim": "e.g. XSE V6 or empty string if unsure",
  "bodyType": "sedan|suv|hatchback|coupe|convertible|wagon|truck|van|bus|bike",
  "vehicleType": "car|truck|van|bus|bike",
  "color": "detected color e.g. Silver, Black, White",
  "fuelType": "Petrol|Diesel|Hybrid|Electric",
  "transmission": "Automatic|Manual",
  "estimatedCarType": "nigerian_used|foreign_used|brand_new",
  "bodyGrade": "very_clean|clean|not_clean",
  "bodyGradeReason": "one sentence explaining the body assessment e.g. Paint is consistent with no visible dents or scratches",
  "confidence": "High|Medium|Low",
  "confidenceScore": 85
}

Body grading rules — assess the EXTERIOR body only from the image:
- very_clean: no visible dents, scratches, rust, or paint issues. Panel gaps consistent.
- clean: minor wear, small scratches or stone chips possible. No dents or rust.
- not_clean: visible dents, rust patches, significant scratches, or paint fading.

confidenceScore rules:
- 80–100: You are highly confident in brand, model, AND year. Image is clear and unambiguous.
- 50–79: You can identify brand/model but year is uncertain, or image is partially obscured.
- 0–49: Image is unclear, car is uncommon, or multiple attributes are uncertain.

Be conservative — if the image is unclear or partial, set confidence to Low and confidenceScore accordingly.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { inline_data: { mime_type: mimeType, data: imageBase64 } },
            { text: prompt },
          ],
        }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 600 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Gemini identify failed (${res.status})`);
  }

  const data = await res.json();
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const cleaned = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
  return JSON.parse(cleaned);
}

// ─── Step 1b: SerpAPI Reverse Image Search ────────────────────────────────────
// Triggered when Gemini confidenceScore < 80.
// Tries SERP_API_KEY_1 → SERP_API_KEY_2 → SERP_API_KEY_3 as a fallback chain.
// Returns best-guess car details extracted from image search results.
async function reverseImageSearchWithSerp(
  imageBase64: string,
  mimeType: string
): Promise<{ serpCarName: string; serpDetails: string } | null> {
  const serpKeys = [
    process.env.SERP_API_KEY_1,
    process.env.SERP_API_KEY_2,
    process.env.SERP_API_KEY_3,
  ].filter(Boolean) as string[];

  if (!serpKeys.length) {
    console.warn('[car-valuation] No SERP_API_KEY_* configured, skipping reverse image search');
    return null;
  }

  // SerpAPI Google Lens requires a public image URL. We upload to a short-lived
  // data URI via the `image_content` base64 parameter supported by SerpAPI.
  // Docs: https://serpapi.com/google-lens-api
  for (const key of serpKeys) {
    try {
      const params = new URLSearchParams({
        engine: 'google_lens',
        api_key: key,
        // SerpAPI Google Lens accepts base64 directly via `image_content`
        image_content: imageBase64,
      });

      const res = await fetch(`https://serpapi.com/search?${params.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // SerpAPI calls can take a few seconds
        signal: AbortSignal.timeout(15_000),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        console.warn(`[car-valuation] SerpAPI key failed (${res.status}):`, errBody?.error);
        continue; // try next key
      }

      const data = await res.json();

      // Extract visual matches — these typically show car make/model/year
      const visualMatches: any[] = data?.visual_matches || [];
      const knowledgeGraph = data?.knowledge_graph || {};
      const relatedSearches: any[] = data?.related_searches || [];

      if (!visualMatches.length && !knowledgeGraph.title) {
        console.warn('[car-valuation] SerpAPI returned no visual matches');
        continue;
      }

      // Build a rich text context from the results for Gemini to reason from
      const lines: string[] = [];

      if (knowledgeGraph.title) {
        lines.push(`Knowledge Graph: ${knowledgeGraph.title}`);
        if (knowledgeGraph.description) lines.push(`Description: ${knowledgeGraph.description}`);
      }

      visualMatches.slice(0, 8).forEach((match: any, i: number) => {
        const parts = [match.title, match.source, match.snippet].filter(Boolean).join(' | ');
        if (parts) lines.push(`Match ${i + 1}: ${parts}`);
      });

      relatedSearches.slice(0, 5).forEach((rs: any) => {
        if (rs.query) lines.push(`Related search: ${rs.query}`);
      });

      const serpDetails = lines.join('\n');

      // Try to extract a car name from the most prominent result
      const serpCarName =
        knowledgeGraph.title ||
        visualMatches[0]?.title ||
        relatedSearches[0]?.query ||
        '';

      console.log(`[car-valuation] SerpAPI reverse image search succeeded: "${serpCarName}"`);
      return { serpCarName, serpDetails };

    } catch (e: any) {
      console.warn(`[car-valuation] SerpAPI key exception:`, e.message);
      // fallback to next key
    }
  }

  console.error('[car-valuation] All SerpAPI keys exhausted');
  return null;
}

// ─── Step 1c: Gemini refines identity using SerpAPI data ─────────────────────
// Only called when confidenceScore < 80 and SerpAPI returned results.
async function refineCarIdentityWithSerp(
  model: string,
  originalCarInfo: Record<string, any>,
  serpDetails: string,
  apiKey: string
): Promise<Record<string, any>> {
  const prompt = `You previously identified a car from an image with low confidence. 
Here is your original identification:
${JSON.stringify(originalCarInfo, null, 2)}

A reverse image search returned the following results that may help clarify the car identity:
---
${serpDetails}
---

Using this additional context, provide a refined car identification. 
If the search results clearly confirm or correct the brand, model, or year — update them.
If the results are irrelevant or unhelpful — keep your original values.

Return ONLY raw JSON, no markdown, no explanation, no code fences:
{
  "brand": "string",
  "model": "string",
  "yearRange": "string",
  "yearMid": "string",
  "trim": "string",
  "bodyType": "sedan|suv|hatchback|coupe|convertible|wagon|truck|van|bus|bike",
  "vehicleType": "car|truck|van|bus|bike",
  "color": "string",
  "fuelType": "Petrol|Diesel|Hybrid|Electric",
  "transmission": "Automatic|Manual",
  "estimatedCarType": "nigerian_used|foreign_used|brand_new",
  "bodyGrade": "very_clean|clean|not_clean",
  "bodyGradeReason": "string",
  "confidence": "High|Medium|Low",
  "confidenceScore": 0,
  "refinedBySerp": true
}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 600 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Gemini refine failed (${res.status})`);
  }

  const data = await res.json();
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const cleaned = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
  return JSON.parse(cleaned);
}

// ─── Step 2: Google Custom Search — real Nigerian market prices ───────────────
// Single query targeting Nigerian car marketplaces for real asking prices.
async function searchNigerianPrices(
  carName: string,
  apiKey: string,
  cx: string
): Promise<string> {
  const query = `${carName} price Nigeria (site:jiji.ng OR site:cars45.com OR site:autochek.africa OR site:naijauto.com)`;
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}&num=10`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      console.error('[car-valuation] Google Search error:', res.status, errBody?.error?.message);
      return '';
    }

    const data = await res.json();
    const items: any[] = data.items || [];
    if (!items.length) {
      console.warn('[car-valuation] Google Search returned 0 results for:', carName);
      return '';
    }

    const snippets = items
      .map((item: any) => {
        const parts = [item.title, item.snippet];
        if (item.displayLink) parts.push(`Source: ${item.displayLink}`);
        const price = item.pagemap?.offer?.[0]?.price || item.pagemap?.product?.[0]?.offers || '';
        if (price) parts.push(`Structured price: ${price}`);
        return parts.filter(Boolean).join('\n');
      })
      .join('\n\n');

    console.log(`[car-valuation] Google Search: ${items.length} results for "${carName}"`);
    return snippets;
  } catch (e: any) {
    console.error('[car-valuation] Google Search exception:', e.message);
    return '';
  }
}

// ─── Step 3: Gemini text — price using real data + body grade adjustment ──────
async function evaluateWithGemini(
  model: string,
  carInfo: Record<string, any>,
  priceSnippets: string,
  condition: string,
  location: string,
  apiKey: string
): Promise<Record<string, any>> {
  const conditionLabel =
    condition === 'excellent' ? 'Excellent (like new, all working)'
    : condition === 'good'    ? 'Good (minor wear, fully functional)'
    :                           'Fair (visible wear, may need repairs)';

  const currentYear = new Date().getFullYear();
  const carName = `${carInfo.yearMid || carInfo.yearRange} ${carInfo.brand} ${carInfo.model}${carInfo.trim ? ' ' + carInfo.trim : ''}`;

  const bodyAdjustNote =
    carInfo.bodyGrade === 'very_clean' ? 'Body is very clean — no price adjustment needed.'
    : carInfo.bodyGrade === 'clean'    ? 'Body is clean — apply a slight downward adjustment (3–7%).'
    :                                    'Body shows wear — apply a moderate downward adjustment (10–15%).';

  const searchContext = priceSnippets
    ? `Real Nigerian market data from multiple sources (general search + Jiji, Cars45, Autochek, Naijauto):\n---\n${priceSnippets}\n---\nUse these prices as your primary anchor. Extract any Naira figures mentioned and reason from them. Prefer prices from Nigerian marketplace listings (Jiji, Cars45, Autochek, Naijauto) over general results.`
    : `Use your training knowledge of ${currentYear} Nigerian car market prices for this car.`;

  const serpNote = carInfo.refinedBySerp
    ? `Note: Car identity was refined using a reverse image search (SerpAPI) due to initial low confidence. The identification above reflects this refinement.`
    : '';

  const prompt = `You are a Nigerian car market pricing expert. Price this specific car accurately.

Car identified: ${carName}
${serpNote}
Body condition from image analysis: ${carInfo.bodyGrade} — ${carInfo.bodyGradeReason}
Body grade adjustment rule: ${bodyAdjustNote}
Owner-reported condition: ${conditionLabel}
Location: ${location}
Current year: ${currentYear}

${searchContext}

Your pricing methodology:
1. Extract Naira price figures from the search data above as your anchor
2. Prefer prices from Nigerian marketplace listings (Jiji, Cars45, Autochek, Naijauto) — these are real asking prices
3. Determine if prices are for Tokunbo (foreign used) or Nigerian used — note this in valuationFactors
4. Apply body grade adjustment to the anchored price
5. Apply owner condition as secondary modifier: Excellent +5%, Good no change, Fair -10%
6. Return a single suggestedPrice (the server will calculate the range)

Return ONLY raw JSON, no markdown, no explanation, no code fences:
{
  "suggestedPrice": 0,
  "estimatedCarType": "nigerian_used|foreign_used|brand_new",
  "similarListingsCount": 0,
  "valuationFactors": ["user-friendly market insight e.g. 'Popular model with strong resale value in Lagos'", "age/mileage note e.g. '2020 model — relatively recent'", "condition note e.g. 'Clean body with good exterior presentation'", "pricing note e.g. 'Priced competitively for the Lagos market'"],
  "disclaimer": "one-line disclaimer about estimate accuracy",
  "description": "2-3 sentence listing description in Nigerian English, e.g. Clean Tokunbo ${carInfo.brand} ${carInfo.model}...",
  "reasonForSelling": "",
  "features": ["list typical features for this car from: Air Conditioning, Power Steering, Power Windows, Power Locks, AM/FM Radio, CD Player, Bluetooth, USB / AUX, Backup Camera, Parking Sensors, ABS, Airbags, Alloy Wheels, Sunroof, Leather Seats, Heated Seats, Navigation GPS, Cruise Control, Keyless Entry, Immobilizer"]
}

Rules:
- suggestedPrice: integer NGN only, no decimals
- If search data has Tokunbo AND Nigerian used prices, use the one that matches estimatedCarType from car identification
- Do not invent prices — anchor to search data where available
- similarListingsCount: 5–50 range
- features: only include what is standard or clearly typical for this exact model/year
- valuationFactors MUST be written for the end user — friendly, informative, no technical jargon
- NEVER mention: body grades, owner-reported condition, web search availability, internal adjustments, pricing methodology, reverse image search, or any system/process details in valuationFactors
- valuationFactors should read like a human expert explaining why a car is worth what it is — e.g. market demand, age, popularity, typical Nigerian market behaviour for this model`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.15, maxOutputTokens: 1000 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Gemini evaluate failed (${res.status})`);
  }

  const data = await res.json();
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const cleaned = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
  return JSON.parse(cleaned);
}

// ─── Main handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType, condition, location } = body;

    if (!imageBase64) return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    if (!condition)   return NextResponse.json({ error: 'No condition provided' }, { status: 400 });

    const geminiKey = process.env.GEMINI_API_KEY;
    const googleKey = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY;
    const googleCx  = process.env.GOOGLE_CUSTOM_SEARCH_CX;

    if (!geminiKey) return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });

    const loc = location || 'Lagos';
    let lastError = '';

    // ── Step 1: Identify car with Gemini Vision ──
    let carInfo: Record<string, any> | null = null;
    for (const model of GEMINI_MODELS) {
      try {
        carInfo = await identifyCarWithGemini(model, imageBase64, mimeType || 'image/jpeg', geminiKey);
        break;
      } catch (err: any) {
        lastError = err.message;
      }
    }

    if (!carInfo) {
      return NextResponse.json({ error: `Car identification failed. ${lastError}` }, { status: 502 });
    }

    // ── Step 1b: SerpAPI reverse image search (only if confidenceScore < 80) ──
    const confidenceScore = typeof carInfo.confidenceScore === 'number' ? carInfo.confidenceScore : 100;
    console.log(`[car-valuation] Gemini confidenceScore: ${confidenceScore}`);

    if (confidenceScore < 80) {
      console.log('[car-valuation] Confidence below 80 — triggering SerpAPI reverse image search');
      const serpResult = await reverseImageSearchWithSerp(imageBase64, mimeType || 'image/jpeg');

      if (serpResult) {
        // Step 1c: Refine Gemini identity using SerpAPI data
        for (const model of GEMINI_MODELS) {
          try {
            const refined = await refineCarIdentityWithSerp(model, carInfo, serpResult.serpDetails, geminiKey);
            carInfo = refined;
            console.log(`[car-valuation] Car identity refined by SerpAPI: ${carInfo.brand} ${carInfo.model} ${carInfo.yearMid}`);
            break;
          } catch (err: any) {
            lastError = err.message;
            console.warn('[car-valuation] Gemini refine attempt failed:', err.message);
          }
        }
      }
    } else {
      console.log('[car-valuation] Confidence >= 80 — skipping SerpAPI reverse image search');
    }

    // ── Step 2: Google Custom Search for pricing (parallel marketplace queries) ──
    const carName = `${carInfo.yearMid || carInfo.yearRange || ''} ${carInfo.brand} ${carInfo.model}`.trim();
    let priceSnippets = '';
    if (googleKey && googleCx) {
      priceSnippets = await searchNigerianPrices(carName, googleKey, googleCx);
    } else {
      console.warn('[car-valuation] Google Custom Search not configured — skipping price search');
    }

    // ── Step 3: Evaluate with Gemini text ──
    let evaluation: Record<string, any> | null = null;
    for (const model of GEMINI_MODELS) {
      try {
        evaluation = await evaluateWithGemini(model, carInfo, priceSnippets, condition, loc, geminiKey);
        break;
      } catch (err: any) {
        lastError = err.message;
      }
    }

    if (!evaluation) {
      return NextResponse.json({ error: `Pricing evaluation failed. ${lastError}` }, { status: 502 });
    }

    // ── Merge + apply range widening ──
    const mid = evaluation.suggestedPrice || 0;
    const { low, high } = widenRange(mid);

    const result = {
      // From Step 1 (identity)
      brand:           carInfo.brand,
      model:           carInfo.model,
      yearRange:       carInfo.yearRange,
      yearMid:         carInfo.yearMid,
      trim:            carInfo.trim,
      bodyType:        carInfo.bodyType,
      vehicleType:     carInfo.vehicleType,
      color:           carInfo.color,
      fuelType:        carInfo.fuelType,
      transmission:    carInfo.transmission,
      confidence:      carInfo.confidence,
      confidenceScore: carInfo.confidenceScore,
      refinedBySerp:   carInfo.refinedBySerp || false,
      // From Step 3 (evaluation)
      estimatedCarType:    evaluation.estimatedCarType,
      suggestedPrice:      mid,
      priceRangeLow:       low,
      priceRangeHigh:      high,
      similarListingsCount: evaluation.similarListingsCount,
      valuationFactors:    evaluation.valuationFactors,
      disclaimer:          evaluation.disclaimer,
      description:         evaluation.description,
      reasonForSelling:    evaluation.reasonForSelling,
      features:            evaluation.features,
      // Condition meta
      condition,
      conditionLabel: condition === 'excellent' ? 'Excellent' : condition === 'good' ? 'Good' : 'Fair',
      location: loc,
    };

    return NextResponse.json({ data: result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to analyze car' }, { status: 500 });
  }
}