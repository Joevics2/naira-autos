// app/api/vehicle-listings/ai-parse/route.ts
//
// Reuses the same Gemini model/key waterfall as app/api/ai-autofill/route.ts,
// but takes an image instead of free-form text (Gemini's vision input) so an
// admin can drop in a car photo — or a screenshot of a WhatsApp/social ad —
// and get the vehicle_listings fields auto-filled.

import { NextRequest, NextResponse } from 'next/server';
import { GEMINI_MODELS, getGeminiKeys } from '@/lib/gemini-keys';
import { NIGERIAN_STATES } from '@/lib/nigeria-locations';

const AVAILABLE_FEATURES = [
  'Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks',
  'AM/FM Radio', 'CD Player', 'Bluetooth', 'USB / AUX',
  'Backup Camera', 'Parking Sensors', 'ABS', 'Airbags',
  'Alloy Wheels', 'Sunroof', 'Leather Seats', 'Heated Seats',
  'Navigation GPS', 'Cruise Control', 'Keyless Entry', 'Immobilizer',
];

const PROMPT = `You are an AI that extracts structured car listing data from an image. The image is either:
(a) a photo of the vehicle itself, or
(b) a screenshot/photo of a car ad (WhatsApp, Facebook, flyer, etc.) containing text about the car.

If it's a photo of the car, infer what you visually can (brand, model if recognizable, body type, color) and leave fields you can't determine blank.
If it's a screenshot of an ad, extract every field mentioned in the text.

Nigerian context: "Tokunbo" = foreign_used, "Nigerian used" = nigerian_used, "First body" = original owner, "3.5M" = 3500000.

Return ONLY a raw JSON object — no markdown, no explanation, no code fences. Include ONLY fields you're confident about; omit the rest.
{
  "title": string (e.g. "2015 Toyota Camry"),
  "brand": string,
  "model": string,
  "year": number,
  "price": number (numeric only, no commas or currency symbols),
  "condition": "foreign_used" | "nigerian_used" | "brand_new",
  "transmission": "Automatic" | "Manual",
  "fuel_type": "Petrol" | "Diesel" | "Hybrid" | "Electric",
  "body_type": "sedan" | "suv" | "hatchback" | "coupe" | "convertible" | "wagon" | "truck" | "van" | "bus" | "bike",
  "color": string,
  "mileage": number (km),
  "state": string (must match one of: ${NIGERIAN_STATES.join(', ')}),
  "lga": string (LGA or area within the state),
  "town": string (specific neighborhood, optional),
  "description": string (clean, well-written 2-3 sentence description),
  "features": array of strings from this list only: ${AVAILABLE_FEATURES.join(', ')}
}`;

async function tryModel(model: string, base64: string, mimeType: string, apiKey: string) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: PROMPT },
              { inline_data: { mime_type: mimeType, data: base64 } },
            ],
          },
        ],
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
    const formData = await req.formData();
    const file = formData.get('image') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const apiKeys = getGeminiKeys();
    if (apiKeys.length === 0) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';

    let lastError = '';
    for (const model of GEMINI_MODELS) {
      for (const key of apiKeys) {
        try {
          const parsed = await tryModel(model, base64, mimeType, key);
          return NextResponse.json({ data: parsed, model });
        } catch (err: any) {
          lastError = err.message;
        }
      }
    }

    return NextResponse.json({ error: `All models/keys failed. Last error: ${lastError}` }, { status: 502 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to parse image' }, { status: 500 });
  }
}
