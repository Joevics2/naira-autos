// app/api/ai-mechanic/route.ts
//
// Accepts text + optional image / audio / video, sends to Gemini,
// returns structured diagnostic JSON.
//
// Model waterfall + API key rotation now live in lib/gemini-keys.ts,
// shared across every AI route on the site: gemini-3.1-flash-lite
// (primary) -> gemini-3.5-flash (fallback), each tried against every
// configured GEMINI_API_KEY / _2 / _3 / _4 in turn.
//
// Past incident: an earlier version of this list included dated preview
// snapshots and gemini-3-flash-preview, which Google had already marked
// superseded — every model in the waterfall could fail at once, returning
// "AI service is temporarily unavailable" for every request. If this
// starts failing again, check
// https://ai.google.dev/gemini-api/docs/deprecations before assuming
// it's a code bug.
//
// Required env vars (at least one):
//   GEMINI_API_KEY, GEMINI_API_KEY_2, GEMINI_API_KEY_3, GEMINI_API_KEY_4

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_MODELS, getGeminiKeys } from '@/lib/gemini-keys';

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;   // 10 MB inline
const MAX_AUDIO_BYTES = 20 * 1024 * 1024;   // 20 MB
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;   // 50 MB

const SYSTEM_PROMPT = `You are a friendly but no-nonsense automotive mechanic with 25 years hands-on experience, serving drivers worldwide.
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
- Common fault patterns across all major markets and climates — hot/humid, cold/winter, high-altitude, coastal/salt-air
- Fuel quality issues (adulteration, low octane, water contamination) and their effects on knock sensors, injectors, oil viscosity — relevant anywhere, especially in markets where this is more common (e.g. Nigeria)
- Pothole and rough-road damage to suspension, chassis, CV joints, tyres
- Every major global brand: Toyota, Honda, Mercedes, Lexus, Kia, Hyundai, Ford, Volkswagen, Mitsubishi, and regional brands like Innoson (Nigeria)
- Typical DIY fixes a driver can safely do themselves, and when a job genuinely needs a workshop
- If the vehicle details or description signal a specific country or region (e.g. mentions of Naira, Lagos, Nigerian road conditions), weight your diagnosis with that market's known local factors — but never assume a default country when nothing indicates one

RESPONSE STRUCTURE — follow exactly, no deviation:

1. summary: 1-2 short conversational sentences. State the likely fault directly. Example: "Sounds like low oil pressure on cold start — worth checking your oil level and condition first."

2. urgency: one of "safe" | "monitor" | "urgent" | "stop_driving" — this exact English value, always, regardless of response language (the UI maps it to a localized label).
   - urgency_color: "green" | "yellow" | "orange" | "red"
   - For brake, steering, or fuel leaks: always "urgent" or "stop_driving"

3. likely_causes: max 3 causes, ranked by probability. Each explanation = 1 plain sentence. If multiple causes could coexist, say so in the explanation.

4. recommended_actions: CRITICAL — split DIY vs mechanic clearly.
   - diy: true = things the user can safely do right now without tools or a workshop
   - diy: false = genuinely needs a lift, scanner, or skilled hands
   - Start with the easiest, safest checks. Build from simple to complex.
   - If no tool is available, give the tool-free alternative. Example: if no multimeter, suggest a jump-start test.
   - priority: "immediate" (do before driving again) | "soon" (within a week) | "when_convenient" — this exact English value, always.

5. next_steps_to_confirm: specific things the user can do RIGHT NOW to help narrow the diagnosis.
   Example: "Record 10 seconds of the sound on a cold start and send it", "Check if the noise changes when you turn the steering wheel left and right".
   These should increase diagnosis certainty. No vague advice.

6. certainty: integer 0-100. Text only = max 60. Add photo = up to 75. Add audio = up to 85. Add video = up to 90. All combined = up to 95.

7. certainty_note: one sentence on what would most increase confidence. Be specific. Example: "Send an audio recording — knocking sounds are much easier to pinpoint by ear than by description."

8. parts_to_check: list of specific components to inspect. Use plain names: "oil dipstick", "battery terminals", "brake pads". Not technical codes.

9. estimated_repair_cost_usd: a rough international reference range in USD, min/max. This is NOT a localized quote — actual cost varies hugely by country and labour market. Say so explicitly in the note field (e.g. "Rough global reference only — labour cost varies a lot by country; get a local quote before paying."). If the vehicle/location context strongly signals a specific country, you may mention that market's typical cost in the note as additional color, but the min/max numbers themselves stay in USD. If truly unknown, set both to null.

10. disclaimer: one sentence only, shown separately in the UI. Do not reuse the example below verbatim — write your own sentence to this effect, in the response language.

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

async function tryModel(modelName: string, apiKey: string, parts: any[]): Promise<{ text: string; model: string }> {
  const genAI = new GoogleGenerativeAI(apiKey);
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

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
  ar: 'Arabic',
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const description = (formData.get('description') as string) || '';
    const vehicleBrand = (formData.get('brand') as string) || '';
    const vehicleModel = (formData.get('model') as string) || '';
    const vehicleYear = (formData.get('year') as string) || '';
    const vehicleMileage = (formData.get('mileage') as string) || '';
    const language = (formData.get('language') as string) || 'en';
    const contextRaw = (formData.get('context') as string) || '';

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

    let textPrompt = vehicleContext + (description
      ? `Customer complaint: ${description}`
      : 'No verbal description provided — analyse based on the media files only.');

    // Follow-up messages: the frontend sends the last few assistant summaries
    // as JSON in `context` so Axion can build on the earlier diagnosis
    // instead of starting fresh each message. This was being sent but never
    // read — every follow-up lost all prior conversation memory.
    if (contextRaw) {
      try {
        const priorSummaries: string[] = JSON.parse(contextRaw);
        if (Array.isArray(priorSummaries) && priorSummaries.length > 0) {
          textPrompt =
            `Earlier in this conversation, you already gave these diagnoses:\n` +
            priorSummaries.map((s, i) => `${i + 1}. ${s}`).join('\n') +
            `\n\nThe customer is now following up. Treat this as a continuation of the same case — refer back to what you already said where relevant, and update or narrow your diagnosis rather than starting over.\n\n` +
            textPrompt;
        }
      } catch {
        // Malformed context shouldn't break the request — fall back to a
        // fresh diagnosis rather than failing the whole call.
      }
    }

    if (language !== 'en') {
      const langName = LANGUAGE_NAMES[language] || language;
      textPrompt += `\n\nIMPORTANT: Respond entirely in ${langName}. Every free-text string value in the JSON response (summary, likely_causes explanations, recommended_actions text, next_steps_to_confirm, parts_to_check, certainty_note, the cost note, disclaimer) must be written in ${langName} — natural, conversational ${langName} as a native ${langName}-speaking mechanic would write it, not a literal translation. Exception: urgency, urgency_color, probability, priority, and diy must stay EXACTLY as their specified English enum values (e.g. "urgent", "high", "immediate", true) regardless of response language — the interface maps these to localized labels itself. Keep all JSON keys in English exactly as specified below.`;

      if (language === 'ar') {
        textPrompt += `\n\nWrite in Modern Standard Arabic (الفصحى) — the neutral, professional register used in real Arabic automotive writing across Egypt and the Gulf, not a regional dialect (no Egyptian ammiya, no Gulf/Khaliji slang) and not a word-for-word machine translation. Use the actual terms a real Arabic-speaking mechanic or automotive writer uses (e.g. صيانة, عطل, تشخيص, ميكانيكي, ضاغط المكيف, حساس الأكسجين), not invented or overly literal renderings of the English terms. Keep car brand and model names in Latin script as they are (e.g. Toyota Corolla), since that is how they are written in real Arabic automotive content. Use standard Western Arabic numerals (0–9) for all figures, mileage, and prices — this is the convention in professional/technical Arabic writing, not Eastern Arabic-Indic numerals. If the vehicle details or description signal a specific country — Egypt, Saudi Arabia, the UAE, or Qatar — weight the diagnosis with that market's known conditions where relevant (extreme heat and sand/dust ingestion stressing air filters and AC systems in the Gulf, high ambient temperatures accelerating rubber seal and battery wear, coastal humidity in the UAE and Qatar affecting electrical connectors) — but never assume a default country when nothing indicates one.`;
      }
    }

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

    // ── Model waterfall × key rotation ────────────────────────────────────────
    const apiKeys = getGeminiKeys();
    if (apiKeys.length === 0) {
      console.error('[ai-mechanic] No GEMINI_API_KEY* env vars configured.');
      return NextResponse.json(
        { error: 'AI service is temporarily unavailable. Please try again in a moment.' },
        { status: 503 }
      );
    }

    let rawText = '';
    let modelUsed = '';
    let lastError: any = null;

    outer: for (const modelName of GEMINI_MODELS) {
      for (const apiKey of apiKeys) {
        try {
          const result = await tryModel(modelName, apiKey, parts);
          rawText = result.text;
          modelUsed = result.model;
          break outer;
        } catch (err: any) {
          lastError = err;
          console.warn(`[ai-mechanic] Model ${modelName} failed with a key:`, err?.message || err);
          continue;
        }
      }
    }

    if (!rawText) {
      console.error('[ai-mechanic] All models/keys failed. Last error:', lastError);
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