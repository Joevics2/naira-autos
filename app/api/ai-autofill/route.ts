// app/api/ai-autofill/route.ts
import { NextRequest, NextResponse } from 'next/server';

const GEMINI_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-2.5-flash-preview-09-2025",
  "gemini-2.5-flash-lite-preview-09-2025",
  "gemini-2.5-pro",
  "gemini-3-flash-preview",
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
Other fields: brand, model, year (string), trim, mileage (string, km only), color, locationState, cityArea, town, description, acIssue, engineIssue, missingDocs, otherIssues`;

async function tryModel(model: string, text: string, apiKey: string): Promise<Record<string, any>> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: GEMINI_PROMPT }] },
        contents: [{ parts: [{ text: `Extract listing data:\n\n${text}` }] }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 1024 },
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
        return NextResponse.json({ data: parsed, model });
      } catch (err: any) {
        lastError = err.message;
        // continue to next model
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