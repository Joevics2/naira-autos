// app/api/generate-social-post/route.ts
//
// Called when a listing is approved and has no social_post yet.
// Can be triggered from:
//   - Your admin dashboard approval action
//   - A Supabase webhook (Database Webhook → listings → status = 'active')
//   - A cron job that sweeps approved listings with null social_post
//
// POST body: { listing_id: string } — we fetch the listing from Supabase server-side
// Returns: { social_post: string }
// Side-effect: updates listings.social_post in Supabase

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const GEMINI_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-2.5-flash-preview-09-2025",
  "gemini-2.5-pro",
];

// ─── Prompt: identical 5-format system to the autofill route ─────────────────
// Temperature is slightly higher here (0.8) since we're writing creative copy
// without the extraction constraint, so we get more variation across approvals.
const buildSocialPostPrompt = () => `You write WhatsApp/social media posts to sell cars in Nigeria.
You will receive structured car listing data. Return ONLY a raw JSON object with one field: social_post.
No markdown, no explanation, no code fences.

Pick ONE format at random from the 5 below. Vary your choice — do not always use the same structure.

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
[Mileage if known, e.g. "47,000km on the clock."] [2–3 highlights in plain speech.]

It's live on Naira Autos — won't be here long.
naira.autos/listings/LISTING_SLUG"

FORMAT 4 — Spec sheet (clean, data-forward):
"[Year] [Brand] [Model] | [City]

Condition: [condition, human-readable]
Mileage: [mileage or "Not stated"]
Color: [color]
Price: ₦[price formatted with commas]

Full listing → naira.autos/listings/LISTING_SLUG"

FORMAT 5 — CTA-first (urgency/FOMO hook leads):
"[Sharp FOMO opener, e.g. "If you've been waiting for the right one, this is it." or "Your next car just dropped. 👀"]

[Year] [Brand] [Model] · [City] · ₦[price]
[1–2 compact facts] · [Best feature]

naira.autos/listings/LISTING_SLUG"

Rules:
- Use the exact placeholder text LISTING_SLUG where the URL slug goes
- Format price with commas and ₦ symbol (e.g. ₦18,500,000)
- Maximum 7 lines total
- No phone numbers
- 1–3 emojis max, placed naturally
- Nigerian English tone: direct, confident, not corporate
- Return a plain JSON string with actual newline characters`;

async function generateWithGemini(listingText: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  for (const model of GEMINI_MODELS) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: buildSocialPostPrompt() }] },
            contents: [{ parts: [{ text: listingText }] }],
            generationConfig: { temperature: 0.8, maxOutputTokens: 512 },
          }),
        }
      );

      if (!res.ok) continue;

      const data = await res.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleaned = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
      const parsed = JSON.parse(cleaned);
      if (parsed?.social_post) return parsed.social_post;
    } catch {
      // try next model
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { listing_id } = await req.json();
    if (!listing_id) {
      return NextResponse.json({ error: 'listing_id required' }, { status: 400 });
    }

    // Use service role key so this works server-side regardless of RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: 'Supabase env not configured' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    // Fetch the listing
    const { data: listing, error: fetchError } = await supabase
      .from('listings')
      .select('id, brand, model, year, condition, price, location_state, location_lga, transmission, fuel_type, mileage, color, features, faq_ac_working, faq_documents_complete, accident_history, negotiable, social_post, slug')
      .eq('id', listing_id)
      .single();

    if (fetchError || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    // If social_post already exists, return it without regenerating
    if (listing.social_post) {
      const finalPost = listing.slug
        ? listing.social_post.replace(/LISTING_SLUG/g, listing.slug)
        : listing.social_post;
      return NextResponse.json({ social_post: finalPost, regenerated: false });
    }

    // Build a text summary of the listing to feed to the AI
    const conditionLabel: Record<string, string> = {
      nigerian_used: 'Nigerian used',
      foreign_used: 'Foreign used (Tokunbo)',
      brand_new: 'Brand new',
    };
    const priceFormatted = `₦${Number(listing.price).toLocaleString('en-NG')}`;
    const features = Array.isArray(listing.features) && listing.features.length > 0
      ? listing.features.join(', ')
      : 'Not specified';

    const listingText = [
      `${listing.year} ${listing.brand} ${listing.model}`,
      `Condition: ${conditionLabel[listing.condition] || listing.condition}`,
      `Price: ${priceFormatted}${listing.negotiable ? ' (negotiable)' : ''}`,
      `Location: ${listing.location_lga ? `${listing.location_lga}, ` : ''}${listing.location_state}`,
      listing.mileage ? `Mileage: ${Number(listing.mileage).toLocaleString()} km` : null,
      listing.color ? `Color: ${listing.color}` : null,
      listing.transmission ? `Transmission: ${listing.transmission}` : null,
      listing.fuel_type ? `Fuel: ${listing.fuel_type}` : null,
      listing.accident_history === 'never' ? 'Accident-free' : listing.accident_history ? `Accident history: ${listing.accident_history}` : null,
      listing.faq_documents_complete === 'yes' ? 'All documents complete' : null,
      listing.faq_ac_working === 'yes' ? 'AC working' : null,
      `Features: ${features}`,
    ].filter(Boolean).join('\n');

    const socialPost = await generateWithGemini(listingText);
    if (!socialPost) {
      return NextResponse.json({ error: 'AI generation failed' }, { status: 502 });
    }

    // Save to DB
    const { error: updateError } = await supabase
      .from('listings')
      .update({ social_post: socialPost })
      .eq('id', listing_id);

    if (updateError) {
      console.error('[generate-social-post] Failed to save:', updateError.message);
      // Still return the generated post even if save failed
    }

    // Replace slug placeholder if slug is available
    const finalPost = listing.slug
      ? socialPost.replace(/LISTING_SLUG/g, listing.slug)
      : socialPost;

    return NextResponse.json({ social_post: finalPost, regenerated: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}