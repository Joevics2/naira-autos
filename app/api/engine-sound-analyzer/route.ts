// app/api/engine-sound-analyzer/route.ts
//
// Standalone engine/vehicle sound analyzer. Audio required; optional
// text description, brand/model/year for extra context. Same Gemini
// model waterfall and structured-diagnosis JSON shape as AI Mechanic,
// but this route is single-purpose (audio-first) and free-standing so
// it can be iterated on independently of the full AI Mechanic chat tool.
//
// Model list kept in sync with app/api/ai-mechanic/route.ts — see that
// file's header comment for why (stale preview snapshots can silently
// exhaust the whole waterfall). Check
// https://ai.google.dev/gemini-api/docs/deprecations before assuming
// a failure here is a code bug.
//
// Required env var:
//   GEMINI_API_KEY

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash',
  'gemini-2.5-pro',
];

// Free tier caps audio analysis at the first 30s of any clip — enforced
// client-side (trimmed to a mono 16kHz WAV before upload, ~1MB for 30s)
// to bound Gemini audio-decoding cost per request. This byte ceiling is
// just the backstop for browsers where client-side trimming isn't
// supported (falls back to sending the original file) — it is NOT
// itself a reliable duration check, since bitrate varies by format.
const MAX_AUDIO_BYTES = 8 * 1024 * 1024; // 8 MB

const SYSTEM_PROMPT = `You are a friendly but no-nonsense automotive mechanic with 25 years hands-on experience, serving drivers worldwide,
specialising in diagnosing vehicles from the sound of their engine, transmission, brakes, or suspension. A driver
has recorded a sound their vehicle is making and wants to know what it means.

TONE RULES:
- Be conversational. "That ticking sound usually means low oil pressure on cold start — here's what to check first."
- Explain technical terms simply: "parasitic drain (something draining power while the car is off)"
- Short sentences. No padding, no corporate language, no "it is recommended that".
- Never use the word "consult". Never say "further diagnosis may be necessary". Just say what to do.
- Acknowledge when multiple things could cause the same sound.
- Only the first 30 seconds of any audio clip is analysed — if the sound is intermittent or the clip seems cut short, say so.

YOUR KNOWLEDGE:
- Distinguishing knocking, ticking, grinding, squealing, rattling, and whining sounds by likely source (engine, transmission, brakes, belts, suspension, exhaust)
- Fuel quality issues (adulteration, low octane, water contamination) and their effects on knock sensors, injectors, oil viscosity — relevant anywhere, especially in markets where this is more common (e.g. Nigeria)
- Climate effects on cooling, rubber seals, batteries across hot/humid, cold/winter, and coastal/salt-air conditions
- Pothole and rough-road damage to suspension, chassis, CV joints, tyres
- Every major global brand: Toyota, Honda, Mercedes, Lexus, Kia, Hyundai, Ford, Volkswagen, Mitsubishi, and regional brands like Innoson (Nigeria)
- Common DIY fixes a driver can safely do themselves
- If the vehicle details or description signal a specific country or region, weight your diagnosis with that market's known local factors — but never assume a default country when nothing indicates one

RESPONSE STRUCTURE — follow exactly, no deviation:

1. summary: 1-2 short conversational sentences naming the sound and the likely fault directly.

2. urgency: one of "safe" | "monitor" | "urgent" | "stop_driving" — this exact English value, always, regardless of response language (the UI maps it to a localized label).
   - urgency_color: "green" | "yellow" | "orange" | "red"
   - For brake, steering, or fuel-leak-related sounds: always "urgent" or "stop_driving"

3. likely_causes: max 3 causes, ranked by probability. Each explanation = 1 plain sentence.

4. recommended_actions: split DIY vs mechanic clearly.
   - diy: true = things the user can safely do right now without tools or a workshop
   - diy: false = genuinely needs a lift, scanner, or skilled hands
   - priority: "immediate" (do before driving again) | "soon" (within a week) | "when_convenient" — this exact English value, always.

5. next_steps_to_confirm: specific things the user can do RIGHT NOW to narrow the diagnosis further
   (e.g. "Record the sound again with the AC off", "Note if the sound changes with engine RPM").

6. certainty: integer 0-100. Audio alone = max 80. Audio + text description = up to 88. Audio + vehicle details = up to 90.

7. certainty_note: one sentence on what would most increase confidence.

8. parts_to_check: list of specific components to inspect, in plain names.

9. estimated_repair_cost_usd: a rough international reference range in USD, min/max. This is NOT a localized quote — actual cost varies hugely by country and labour market. Say so explicitly in the note field. If the vehicle/location context strongly signals a specific country, you may mention that market's typical cost in the note as additional color, but the min/max numbers themselves stay in USD. If truly unknown, set both to null.

10. disclaimer: one sentence, shown separately in the UI. Do not reuse the example below verbatim — write your own sentence to this effect, in the response language.

Respond ONLY with valid JSON — no markdown, no preamble, no trailing text:

{
  "summary": "string",
  "urgency": "safe" | "monitor" | "urgent" | "stop_driving",
  "urgency_color": "green" | "yellow" | "orange" | "red",
  "certainty": <integer 0-100>,
  "certainty_note": "string",
  "likely_causes": [
    { "cause": "string", "probability": "high" | "medium" | "low", "explanation": "string" }
  ],
  "what_i_observed": ["string"],
  "next_steps_to_confirm": ["string"],
  "recommended_actions": [
    { "action": "string", "priority": "immediate" | "soon" | "when_convenient", "diy": true | false }
  ],
  "parts_to_check": ["string"],
  "estimated_repair_cost_usd": { "min": number | null, "max": number | null, "note": "string" },
  "disclaimer": "string — write your own, do not copy this example verbatim",
  "model_used": ""
}`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function tryModel(modelName: string, parts: any[]): Promise<{ text: string; model: string }> {
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: { temperature: 0.3, maxOutputTokens: 2048 },
  });
  const result = await model.generateContent(parts);
  return { text: result.response.text(), model: modelName };
}

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const description = (formData.get('description') as string) || '';
    const vehicleBrand = (formData.get('brand') as string) || '';
    const vehicleModel = (formData.get('model') as string) || '';
    const vehicleYear = (formData.get('year') as string) || '';
    const language = (formData.get('language') as string) || 'en';
    const audioFile = formData.get('audio') as File | null;

    if (!audioFile) {
      return NextResponse.json({ error: 'Please provide an audio recording of the sound.' }, { status: 400 });
    }
    if (audioFile.size > MAX_AUDIO_BYTES) {
      return NextResponse.json({ error: 'Audio file is too large. Please keep clips under 8MB (roughly 30 seconds).' }, { status: 400 });
    }

    let vehicleContext = '';
    if (vehicleBrand || vehicleModel || vehicleYear) {
      vehicleContext = `Vehicle: ${[vehicleYear, vehicleBrand, vehicleModel].filter(Boolean).join(' ')}\n\n`;
    }

    let textPrompt = vehicleContext + (description
      ? `Driver's description of the sound: ${description}`
      : 'No verbal description provided — analyse based on the audio only.');

    if (language !== 'en') {
      const langName = LANGUAGE_NAMES[language] || language;
      textPrompt += `\n\nIMPORTANT: Respond entirely in ${langName}. Every free-text string value in the JSON response (summary, likely_causes explanations, recommended_actions text, next_steps_to_confirm, parts_to_check, certainty_note, the cost note, disclaimer) must be written in ${langName} — natural, conversational ${langName} as a native ${langName}-speaking mechanic would write it, not a literal translation. Exception: urgency, urgency_color, probability, priority, and diy must stay EXACTLY as their specified English enum values regardless of response language — the interface maps these to localized labels itself. Keep all JSON keys in English exactly as specified below.`;
    }

    const parts: any[] = [{ text: textPrompt }];
    const bytes = await audioFile.arrayBuffer();
    parts.push({
      inlineData: {
        mimeType: audioFile.type || 'audio/wav',
        data: Buffer.from(bytes).toString('base64'),
      },
    });

    let rawText = '';
    let modelUsed = '';
    let lastError: any = null;

    for (const modelName of GEMINI_MODELS) {
      try {
        const result = await tryModel(modelName, parts);
        rawText = result.text;
        modelUsed = result.model;
        break;
      } catch (err: any) {
        lastError = err;
        console.warn(`[engine-sound-analyzer] Model ${modelName} failed:`, err?.message || err);
        continue;
      }
    }

    if (!rawText) {
      console.error('[engine-sound-analyzer] All models failed. Last error:', lastError);
      return NextResponse.json({ error: 'AI service is temporarily unavailable. Please try again in a moment.' }, { status: 503 });
    }

    const cleaned = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

    let diagnosis: any;
    try {
      diagnosis = JSON.parse(cleaned);
    } catch {
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          diagnosis = JSON.parse(jsonMatch[0]);
        } catch {
          return NextResponse.json({ error: 'Failed to parse AI response. Please try again.' }, { status: 500 });
        }
      } else {
        return NextResponse.json({ error: 'Unexpected AI response format. Please try again.' }, { status: 500 });
      }
    }

    diagnosis.model_used = modelUsed;
    return NextResponse.json({ diagnosis });

  } catch (err: any) {
    console.error('[engine-sound-analyzer] Unhandled error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error.' }, { status: 500 });
  }
}

export const runtime = 'nodejs';
