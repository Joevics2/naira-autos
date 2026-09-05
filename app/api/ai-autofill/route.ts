// app/api/ai-autofill/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GEMINI_MODELS, getGeminiKeys } from '@/lib/gemini-keys';

const SYSTEM_PROMPT = `You are an AI that extracts structured car listing data from free-form text by Nigerian car sellers.
Return ONLY a raw JSON object — no markdown, no explanation, no code fences.
Nigerian context: "Tokunbo"=foreign_used, "First body"=owner, "3.5M"=3500000.
Only include fields you are confident about. Exact allowed values:
condition: "nigerian_used"|"foreign_used"|"brand_new"
vehicleType: "car"|"truck"|"van"|"bus"|"bike"
bodyType: "sedan"|"suv"|"hatchback"|"coupe"|"convertible"|"wagon"|"truck"|"van"|"bus"|"bike"
accidentHistory: "never"|"minor"|"major"
sellerType: "owner"|"agent"|"dealer"
transmission: "Automatic"|"Manual"
fuelType: "Petrol"|"Diesel"|"Hybrid"|"Electric"
reasonForSelling: "upgrading"|"relocating"|"need_cash"|"company_disposal"|"other"
acWorking/engineCondition/wasRepainted/documentsComplete/oilConsumption: "yes"|"no"
price: numeric string only (no commas, no symbols)
negotiable/urgentSale: boolean
features: extract EVERY feature mentioned. Valid values: ["Air Conditioning","Power Steering","Power Windows","Power Locks","AM/FM Radio","CD Player","Bluetooth","USB / AUX","Backup Camera","Parking Sensors","ABS","Airbags","Alloy Wheels","Sunroof","Leather Seats","Heated Seats","Navigation GPS","Cruise Control","Keyless Entry","Immobilizer"]. Include all that apply — do NOT return an empty array if the text mentions any features.
Other fields: brand, model, year (string), trim, mileage (string, km only), color, locationState, cityArea, town, description, acIssue, engineIssue, missingDocs, otherIssues

social_post: Write one punchy WhatsApp/social media post to sell this car in Nigeria.
Pick ONE format at random from the 5 below. Fill ALL placeholders with real data — never leave [City], [condition], [price] etc. unfilled.

Format 1 — Headline-led:
"This [year] [Brand] [Model] in [City] is ready for a new owner

• [Condition e.g. Foreign used Tokunbo]
• [Paper status e.g. Full documents]
• [Best feature e.g. Leather seats + sunroof]
• ₦[price with commas]

naira.autos/listing/LISTING_SLUG"

Format 2 — Price-first:
"₦[price with commas]

[Year] [Brand] [Model] — [City], [State]
[Condition] · [Paper status] · [Top 2 features]

Full photos & details
naira.autos/listing/LISTING_SLUG"

Format 3 — Story/conversational:
"[Hook sentence e.g. My relocation is your gain.]

[Year] [Brand] [Model] | [City]
[Mileage if known] · [2-3 highlights e.g. Accident-free, AC ice cold, full documents]
₦[price with commas] [negotiable if applicable]

Serious buyers only.
naira.autos/listing/LISTING_SLUG"

Format 4 — Spec sheet:
"[Year] [Brand] [Model] | [City], [State]

Condition: [condition]
Mileage: [mileage or Not stated]
Color: [color]
Transmission: [Automatic or Manual]
Price: ₦[price with commas]

View listing: naira.autos/listing/LISTING_SLUG"

Format 5 — FOMO/CTA-first:
"[Sharp opener e.g. This one won't sit. I'm telling you now.]

[Year] [Brand] [Model] · [City] · ₦[price with commas]
[Condition] · [1-2 standout facts e.g. 62,000km, all papers complete]

naira.autos/listing/LISTING_SLUG"

Rules:
- Use naira.autos/listing/LISTING_SLUG as the URL placeholder
- Use ₦ for currency, format price with commas
- Max 8 lines, no phone numbers
- Nigerian tone — direct, confident, not salesy
- Return social_post as a plain JSON string`;

async function tryModel(model: string, text: string, apiKey: string): Promise<Record<string, any>> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ parts: [{ text: `Extract listing data and generate social post:\n\n${text}` }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 1400 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Model ${model} failed (${res.status})`);
  }

  const data = await res.json();
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  console.log(`[ai-autofill] ${model} raw (first 300):`, raw.slice(0, 300));

  // Strip markdown fences
  let cleaned = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
  // Remove control characters that break JSON.parse (same fix as generate-social-post)
  cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, '');

  let parsed: Record<string, any>;
  try {
    parsed = JSON.parse(cleaned);
  } catch (parseErr: any) {
    console.log(`[ai-autofill] ${model} JSON parse failed:`, parseErr.message);
    // Regex fallback: extract social_post manually, then try parsing without it
    const socialMatch = cleaned.match(/"social_post"\s*:\s*"([^"]*)"/);
    if (socialMatch) {
      // Remove the social_post field so the rest can parse cleanly
      const withoutSocialPost = cleaned
        .replace(/"social_post"\s*:\s*"[^"]*"\s*,?\s*/g, '')
        .replace(/,\s*}$/, '}')  // trailing comma cleanup
        .trim();
      try {
        parsed = JSON.parse(withoutSocialPost);
        parsed.social_post = socialMatch[1];
        console.log(`[ai-autofill] ${model} recovered via regex fallback`);
      } catch {
        throw new Error('JSON parse failed even after regex fallback');
      }
    } else {
      throw new Error('JSON parse failed and no social_post found via regex');
    }
  }

  return parsed;
}

export async function POST(req: NextRequest) {
  console.log('[ai-autofill] Received request');
  try {
    const { text } = await req.json();
    if (!text?.trim()) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const apiKeys = getGeminiKeys();
    if (apiKeys.length === 0) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
    }

    let lastError = '';
    for (let i = 0; i < GEMINI_MODELS.length; i++) {
      const model = GEMINI_MODELS[i];
      for (let k = 0; k < apiKeys.length; k++) {
        console.log(`[ai-autofill] Attempt model ${i + 1}/${GEMINI_MODELS.length} (${model}), key ${k + 1}/${apiKeys.length}`);
        try {
          const parsed = await tryModel(model, text, apiKeys[k]);
          const { social_post, ...listingData } = parsed;

          console.log('[ai-autofill] Keys:', Object.keys(parsed).join(', '));
          console.log('[ai-autofill] social_post present:', !!social_post);
          if (social_post) console.log('[ai-autofill] social_post preview:', String(social_post).slice(0, 120));

          return NextResponse.json({ data: listingData, social_post: social_post || null, model });
        } catch (err: any) {
          lastError = err.message;
          console.log(`[ai-autofill] ${model} failed with a key:`, err.message);
        }
      }
    }

    return NextResponse.json({ error: `All models/keys failed. Last error: ${lastError}` }, { status: 502 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to parse listing' }, { status: 500 });
  }
}