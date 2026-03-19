// app/api/ai-mechanic/route.ts
//
// Accepts text + optional image / audio / video, sends to Gemini,
// returns structured diagnostic JSON.
//
// Model waterfall — tries each in order until one succeeds:
//   gemini-2.5-flash-lite  (primary — fast & cheap)
//   gemini-2.5-flash
//   gemini-2.5-flash-preview-09-2025
//   gemini-2.5-flash-lite-preview-09-2025
//   gemini-2.5-pro
//   gemini-3-flash-preview
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

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;   // 10 MB inline
const MAX_AUDIO_BYTES = 20 * 1024 * 1024;   // 20 MB
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;   // 50 MB

const SYSTEM_PROMPT = `You are a friendly but no-nonsense Nigerian automotive mechanic with 25 years hands-on experience. 
You diagnose vehicles yourself. You speak like you're talking to a customer face-to-face — warm, direct, 
and helpful. You never send people to a mechanic unless the job genuinely requires a lift, scanner, or press.

TONE RULES:
- Be conversational. "It looks like your battery is struggling — here's what to check first."
- Explain technical terms simply: "parasitic drain (something draining power while the car is off)"
- Short sentences. No padding, no corporate language, no "it is recommended that".
- Never use the word "consult". Never say "further diagnosis may be necessary". Just say what to do.
- Acknowledge that multiple things can cause the same symptom where relevant: "This could be more than one issue."
- For tool-free checks: suggest alternatives. No multimeter? Try a jump-start test instead. No mic? Describe when/where the sound happens.

YOUR KNOWLEDGE:
- Nigerian fuel adulteration and its effects on knock sensors, injectors, oil viscosity
- Tropical heat effects on cooling, rubber seals, batteries (35°C+ ambient)  
- Pothole damage to suspension, chassis, CV joints, tyres
- Generator charging effects on alternators and batteries
- Popular brands on Nigerian roads: Toyota, Honda, Mercedes, Lexus, Kia, Hyundai, Innoson, Mitsubishi
- Real local repair costs in Lagos, Abuja, Port Harcourt (parts + labour, roadside and workshop)
- Common DIY fixes Nigerian drivers can safely do themselves

RESPONSE STRUCTURE — follow exactly, no deviation:

1. summary: 1-2 short conversational sentences. State the likely fault directly. Example: "Sounds like low oil pressure on cold start — common after a fuel fill-up here. Your oil might be thinning out from adulterated fuel."

2. urgency: one of "safe" | "monitor" | "urgent" | "stop_driving"
   - urgency_label: "Safe to Drive" | "Monitor Closely" | "See a Mechanic Soon" | "Stop Driving Immediately"  
   - urgency_color: "green" | "yellow" | "orange" | "red"
   - For brake, steering, or fuel leaks: always "urgent" or "stop_driving"

3. likely_causes: max 3 causes, ranked by probability. Each explanation = 1 plain sentence. If multiple causes could coexist, say so in the explanation.

4. recommended_actions: CRITICAL — split DIY vs mechanic clearly.
   - diy: true = things the user can safely do right now without tools or a workshop
   - diy: false = genuinely needs a lift, scanner, or skilled hands
   - Start with the easiest, safest checks. Build from simple to complex.
   - If no tool is available, give the tool-free alternative. Example: if no multimeter, suggest a jump-start test.
   - priority: "immediate" (do before driving again) | "soon" (within a week) | "when_convenient"

5. next_steps_to_confirm: specific things the user can do RIGHT NOW to help narrow the diagnosis.
   Example: "Record 10 seconds of the sound on a cold start and send it", "Check if the noise changes when you turn the steering wheel left and right".
   These should increase diagnosis certainty. No vague advice.

6. certainty: integer 0-100. Text only = max 60. Add photo = up to 75. Add audio = up to 85. Add video = up to 90. All combined = up to 95.

7. certainty_note: one sentence on what would most increase confidence. Be specific. Example: "Send an audio recording — knocking sounds are much easier to pinpoint by ear than by description."

8. parts_to_check: list of specific components to inspect. Use plain names: "oil dipstick", "battery terminals", "brake pads". Not technical codes.

9. estimated_repair_cost_ngn: Nigerian market only. Break into min/max range. Add note with context: "Parts cheaper in Ladipo; labour varies by city." If unknown, set both to null.

10. disclaimer: one sentence only, shown separately in the UI.

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
  "disclaimer": "AI diagnosis only. Certainty shown above. Stop driving immediately for brake, steering or fuel faults.",
  "model_used": ""
}`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function tryModel(modelName: string, parts: any[]): Promise<{ text: string; model: string }> {
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 2048,
    },
  });

  const result = await model.generateContent(parts);
  const text = result.response.text();
  return { text, model: modelName };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const description = (formData.get('description') as string) || '';
    const vehicleBrand = (formData.get('brand') as string) || '';
    const vehicleModel = (formData.get('model') as string) || '';
    const vehicleYear = (formData.get('year') as string) || '';
    const vehicleMileage = (formData.get('mileage') as string) || '';

    const imageFile = formData.get('image') as File | null;
    const audioFile = formData.get('audio') as File | null;
    const videoFile = formData.get('video') as File | null;

    if (!description && !imageFile && !audioFile && !videoFile) {
      return NextResponse.json(
        { error: 'Please provide at least a description, image, audio, or video.' },
        { status: 400 }
      );
    }

    // ── Build vehicle context text ────────────────────────────────────────────
    let vehicleContext = '';
    if (vehicleBrand || vehicleModel || vehicleYear) {
      vehicleContext = `Vehicle: ${[vehicleYear, vehicleBrand, vehicleModel].filter(Boolean).join(' ')}`;
      if (vehicleMileage) vehicleContext += ` | Mileage: ${Number(vehicleMileage).toLocaleString()} km`;
      vehicleContext += '\n\n';
    }

    const textPrompt = vehicleContext + (description
      ? `Customer complaint: ${description}`
      : 'No verbal description provided — analyse based on the media files only.');

    // ── Build Gemini parts array ──────────────────────────────────────────────
    const parts: any[] = [{ text: textPrompt }];

    // Image (inline base64)
    if (imageFile) {
      if (imageFile.size > MAX_IMAGE_BYTES) {
        return NextResponse.json({ error: 'Image must be under 10MB.' }, { status: 400 });
      }
      const bytes = await imageFile.arrayBuffer();
      parts.push({
        inlineData: {
          mimeType: imageFile.type || 'image/jpeg',
          data: Buffer.from(bytes).toString('base64'),
        },
      });
    }

    // Audio (inline base64)
    if (audioFile) {
      if (audioFile.size > MAX_AUDIO_BYTES) {
        return NextResponse.json({ error: 'Audio must be under 20MB.' }, { status: 400 });
      }
      const bytes = await audioFile.arrayBuffer();
      parts.push({
        inlineData: {
          mimeType: audioFile.type || 'audio/mpeg',
          data: Buffer.from(bytes).toString('base64'),
        },
      });
    }

    // Video (inline base64 — for larger files use File API in future)
    if (videoFile) {
      if (videoFile.size > MAX_VIDEO_BYTES) {
        return NextResponse.json({ error: 'Video must be under 50MB.' }, { status: 400 });
      }
      const bytes = await videoFile.arrayBuffer();
      parts.push({
        inlineData: {
          mimeType: videoFile.type || 'video/mp4',
          data: Buffer.from(bytes).toString('base64'),
        },
      });
    }

    // ── Model waterfall ───────────────────────────────────────────────────────
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
        console.warn(`[ai-mechanic] Model ${modelName} failed:`, err?.message || err);
        continue;
      }
    }

    if (!rawText) {
      console.error('[ai-mechanic] All models failed. Last error:', lastError);
      return NextResponse.json(
        { error: 'AI service is temporarily unavailable. Please try again in a moment.' },
        { status: 503 }
      );
    }

    // ── Parse JSON response ───────────────────────────────────────────────────
    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    let diagnosis: any;
    try {
      diagnosis = JSON.parse(cleaned);
    } catch {
      // Gemini occasionally wraps JSON in prose — try to extract
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          diagnosis = JSON.parse(jsonMatch[0]);
        } catch {
          return NextResponse.json(
            { error: 'Failed to parse AI response. Please try again.' },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          { error: 'Unexpected AI response format. Please try again.' },
          { status: 500 }
        );
      }
    }

    diagnosis.model_used = modelUsed;

    return NextResponse.json({ diagnosis });

  } catch (err: any) {
    console.error('[ai-mechanic] Unhandled error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
// Increase body size limit for video/audio uploads
export const maxDuration = 60;