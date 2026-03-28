// app/api/ai-autofill/route.ts
import { NextRequest, NextResponse } from 'next/server';

const GEMINI_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-2.5-flash-preview-09-2025",
  "gemini-2.5-flash-lite-preview-09-2025",
  "gemini-2.5-pro",
];

const GEMINI_PROMPT = `You are an AI that extracts structured car listing data from free-form text by Nigerian car sellers.
Return ONLY raw JSON — no markdown, no explanation, no code fences.
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
features: extract EVERY feature mentioned. Return as array. Valid values: ["Air Conditioning","Power Steering","Power Windows","Power Locks","AM/FM Radio","CD Player","Bluetooth","USB / AUX","Backup Camera","Parking Sensors","ABS","Airbags","Alloy Wheels","Sunroof","Leather Seats","Heated Seats","Navigation GPS","Cruise Control","Keyless Entry","Immobilizer"]. Include all that apply based on the text — do NOT return an empty array if the text mentions any features.
Other fields: brand, model, year (string), trim, mileage (string, km only), color, locationState, cityArea, town, description, acIssue, engineIssue, missingDocs, otherIssues

social_post: Write one WhatsApp/social media post to sell this car in Nigeria.
Pick ONE format at random from the 5 below. Vary your choice — do not always start with the same structure.

FORMAT 1 — Headline-led:
"This [year] [Brand] [Model] in [City] is ready for a new owner 🏠

• [Condition written naturally, e.g. "Foreign used, accident-free"]
• [Paper/duty status, e.g. "Full customs papers, duty paid"]
• [Best feature, e.g. "Ice-cold AC, Leather seats, Panoramic roof"]
• ₦[price formatted with commas][, negotiable — if applicable]

naira.autos/listings/LISTING_SLUG"

FORMAT 2 — Price-first:
"₦[price] 🤝

[Year] [Brand] [Model] — [City]
[Condition] · [Paper status] · [Top 2 features]

See photos & full details 👉 naira.autos/listings/LISTING_SLUG"

FORMAT 3 — Story/conversational (emotional, reads like a real person):
"[Punchy emotional hook about the car's condition or rarity — be creative, e.g. "Someone treated this car like a firstborn child 😭" or "This one sat in a garage and barely touched the road."]

[Year] [Brand] [Model] | [City]
[Mileage if known, e.g. "47,000km on the clock."] [2–3 highlights in plain speech, e.g. "Leather interior, panoramic sunroof, factory AC blowing ice."]

It's live on Naira Autos — won't be here long.
naira.autos/listings/LISTING_SLUG"

FORMAT 4 — Spec sheet (clean, no fluff, data-forward):
"[Year] [Brand] [Model] | [City]

Condition: [condition, human-readable]
Mileage: [mileage or "Not stated"]
Color: [color]
Price: ₦[price formatted with commas]

Full listing → naira.autos/listings/LISTING_SLUG"

FORMAT 5 — CTA-first (urgency/FOMO hook leads, car details follow):
"[Sharp FOMO opener, e.g. "If you've been waiting for the right one, this is it." or "Your next car just dropped. 👀"]

[Year] [Brand] [Model] · [City] · ₦[price]
[1–2 compact facts] · [Best feature]

naira.autos/listings/LISTING_SLUG"

Rules:
- Use the exact placeholder text LISTING_SLUG where the URL slug goes — do NOT invent a slug
- Format price with commas and ₦ symbol (e.g. ₦18,500,000)
- Maximum 7 lines total
- No phone numbers
- 1–3 emojis max, placed where they feel natural — not scattered on every line
- Nigerian English tone: direct, confident, no corporate or stiff language
- The value must be a plain JSON string. Use actual newline characters in the string.`;

async function tryModel(model: string, text: string, apiKey: string): Promise<Record<string, any>> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: GEMINI_PROMPT }] },
        contents: [{ parts: [{ text: `Extract listing data:\n\n${text}` }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1200 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Model ${model} failed (${res.status})`);
  }

  const data = await res.json();
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const cleaned = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
  return JSON.parse(cleaned);
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text?.trim()) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
    }

    let lastError = '';
    for (const model of GEMINI_MODELS) {
      try {
        const parsed = await tryModel(model, text, apiKey);
        const { social_post, ...listingData } = parsed;
        return NextResponse.json({ data: listingData, social_post: social_post || null, model });
      } catch (err: any) {
        lastError = err.message;
      }
    }

    return NextResponse.json({ error: `All models failed. Last error: ${lastError}` }, { status: 502 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to parse listing' },
      { status: 500 }
    );
  }
}