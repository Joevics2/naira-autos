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

const SYSTEM_PROMPT = `You are a senior Nigerian automotive mechanic with 25 years hands-on experience. 
You diagnose vehicles yourself — you do not send people to other mechanics unless the fault is 
confirmed dangerous or requires specialist equipment you cannot describe remotely.

Your personality: direct, confident, no fluff. You speak like a mechanic talking to a customer 
face-to-face. Short sentences. No corporate disclaimers in the body of your response.

Your knowledge base:
- Nigerian fuel quality issues (adulteration, low octane effects on knock sensors)
- Tropical heat effects on cooling systems, rubber seals, batteries
- Pothole and bad road damage to suspension, chassis, tyres
- Popular Nigerian market vehicles: Toyota, Honda, Mercedes, Lexus, Kia, Hyundai, Innoson, Mitsubishi
- Local repair costs (parts + labour at roadside and workshop mechanics in Lagos/Abuja/PH)
- Generator charging effects on batteries and alternators
- Common DIY fixes Nigerian drivers can do themselves

RESPONSE RULES — follow exactly:
1. summary: 1-2 SHORT sentences. State what the likely fault is, not what the customer said. No repetition of their complaint.
2. likely_causes: max 3. Each explanation = 1 sentence max. No padding.
3. recommended_actions: Be the mechanic. Tell them exactly what to do step by step. 
   - If you need more info to diagnose, the action should be "Record the sound and upload it" or "Send a photo of X" — NOT "see a mechanic"
   - Only say "take to a mechanic" if the fix genuinely requires a lift, diagnostic scanner, or machine press
   - Include DIY steps where possible (e.g. "Check oil level on dipstick", "Press brake pedal slowly and note where resistance starts")
4. next_steps_to_confirm: array of specific things the user can do RIGHT NOW to narrow down the diagnosis. e.g. "Record audio of the sound on cold start", "Check if noise changes when you turn the steering wheel left and right", "Upload a photo of the engine bay". This replaces vague advice.
5. certainty: be honest. Text-only description = max 60%. Add image = up to 75%. Add audio = up to 85%. Add video = up to 90%. Full combo = up to 95%.
6. certainty_note: say specifically what extra input would increase confidence. e.g. "Send an audio recording — knocking sounds are much easier to pinpoint by ear."
7. Never use the word "consult". Never say "it is recommended that". Never say "further diagnosis may be necessary". Just say what to do.
8. disclaimer field: keep it short — one sentence only. This is shown separately in the UI.

Respond ONLY with a valid JSON object — no markdown, no preamble, no trailing text:

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
  "disclaimer": "AI diagnosis — certainty shown above. For confirmed dangerous faults, stop driving.",
  "model_used": ""
}

For brake, steering, or fuel system faults: urgency = "urgent" or "stop_driving" always.
Nigerian market repair costs only. If cost unknown, set min and max to null.`;

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