// app/api/engine-sound-analyzer/route.ts
//
// Standalone engine/vehicle sound analyzer. Audio required; optional
// text description, brand/model/year for extra context. Same Gemini
// model waterfall and structured-diagnosis JSON shape as AI Mechanic,
// but this route is single-purpose (audio-first) and free-standing so
// it can be iterated on independently of the full AI Mechanic chat tool.
//
// Required env var:
//   GEMINI_API_KEY

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_MODELS = [
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash',
  'gemini-2.5-flash-preview-09-2025',
  'gemini-2.5-flash-lite-preview-09-2025',
  'gemini-2.5-pro',
  'gemini-3-flash-preview',
];

// Free tier caps audio analysis at the first 30s of any clip — enforced
// client-side (trimmed to a mono 16kHz WAV before upload, ~1MB for 30s)
// to bound Gemini audio-decoding cost per request. This byte ceiling is
// just the backstop for browsers where client-side trimming isn't
// supported (falls back to sending the original file) — it is NOT
// itself a reliable duration check, since bitrate varies by format.
const MAX_AUDIO_BYTES = 8 * 1024 * 1024; // 8 MB

const SYSTEM_PROMPT = `You are a friendly but no-nonsense Nigerian automotive mechanic with 25 years hands-on experience,
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
- Nigerian fuel adulteration and its effects on knock sensors, injectors, oil viscosity
- Tropical heat effects on cooling, rubber seals, batteries (35°C+ ambient)
- Pothole damage to suspension, chassis, CV joints, tyres
- Popular brands on Nigerian roads: Toyota, Honda, Mercedes, Lexus, Kia, Hyundai, Innoson, Mitsubishi
- Real local repair costs in Lagos, Abuja, Port Harcourt (parts + labour, roadside and workshop)
- Common DIY fixes Nigerian drivers can safely do themselves

RESPONSE STRUCTURE — follow exactly, no deviation:

1. summary: 1-2 short conversational sentences naming the sound and the likely fault directly.

2. urgency: one of "safe" | "monitor" | "urgent" | "stop_driving"
   - urgency_label: "Safe to Drive" | "Monitor Closely" | "See a Mechanic Soon" | "Stop Driving Immediately"
   - urgency_color: "green" | "yellow" | "orange" | "red"
   - For brake, steering, or fuel-leak-related sounds: always "urgent" or "stop_driving"

3. likely_causes: max 3 causes, ranked by probability. Each explanation = 1 plain sentence.

4. recommended_actions: split DIY vs mechanic clearly.
   - diy: true = things the user can safely do right now without tools or a workshop
   - diy: false = genuinely needs a lift, scanner, or skilled hands
   - priority: "immediate" (do before driving again) | "soon" (within a week) | "when_convenient"

5. next_steps_to_confirm: specific things the user can do RIGHT NOW to narrow the diagnosis further
   (e.g. "Record the sound again with the AC off", "Note if the sound changes with engine RPM").

6. certainty: integer 0-100. Audio alone = max 80. Audio + text description = up to 88. Audio + vehicle details = up to 90.

7. certainty_note: one sentence on what would most increase confidence.

8. parts_to_check: list of specific components to inspect, in plain names.

9. estimated_repair_cost_ngn: Nigerian market only. min/max range with a note. If unknown, set both to null.

10. disclaimer: one sentence, shown separately in the UI.

Respond ONLY with valid JSON — no markdown, no preamble, no trailing text:

{
  "summary": "string",
  "urgency": "safe" | "monitor" | "urgent" | "stop_driving",
  "urgency_label": "Safe to Drive" | "Monitor Closely" | "See a Mechanic Soon" | "Stop Driving Immediately",
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
  "estimated_repair_cost_ngn": { "min": number | null, "max": number | null, "note": "string" },
  "disclaimer": "AI diagnosis only, based on 30 seconds of audio. Not always 100% accurate. Stop driving immediately for brake, steering or fuel faults.",
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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const description = (formData.get('description') as string) || '';
    const vehicleBrand = (formData.get('brand') as string) || '';
    const vehicleModel = (formData.get('model') as string) || '';
    const vehicleYear = (formData.get('year') as string) || '';
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

    const textPrompt = vehicleContext + (description
      ? `Driver's description of the sound: ${description}`
      : 'No verbal description provided — analyse based on the audio only.');

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
