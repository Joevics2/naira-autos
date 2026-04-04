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
  "gemini-2.5-flash-lite-preview-09-2025",
  "gemini-2.5-pro",
  "gemini-3-flash-preview",
];

const buildSocialPostPrompt = () => `You write WhatsApp/social media posts to sell cars in Nigeria.
Return ONLY a raw JSON object with one field: social_post.

Pick ONE format:

Format A:
"This [year] [Brand] [Model] in [City] is ready for a new owner

• [Condition]
• [Paper status]
• [Best feature]
• ₦[price]

naira.autos/listing/LISTING_SLUG"

Format B:
"₦[price]

[Year] [Brand] [Model] — [City]
[Condition] · [Paper status] · [Top 2 features]

See photos: naira.autos/listing/LISTING_SLUG"

Format C:
"[Year] [Brand] [Model] | [City]

Condition: [condition]
Mileage: [mileage]
Color: [color]
Price: ₦[price]

Full listing → naira.autos/listing/LISTING_SLUG"

Format D:
"[Year] [Brand] [Model] · [City] · ₦[price]
[Condition] · [Best feature]

naira.autos/listing/LISTING_SLUG"

Rules:
- URL format: naira.autos/listing/YEAR-BRAND-MODEL-ID (e.g. 2004-toyota-camry-7b08f4b0-76a0-4f8a-a5af-2fd8fc8535ee)
- Use ₦ for currency
- Max 7 lines, no phone numbers
- Return plain JSON string`;

async function generateWithGemini(listingText: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log('[generateWithGemini] API key present:', !!apiKey);
  if (!apiKey) return null;

  for (const model of GEMINI_MODELS) {
    console.log('[generateWithGemini] Trying model:', model);
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      console.log('[generateWithGemini] Calling API:', apiUrl.slice(0, 80));
      
      const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: buildSocialPostPrompt() }] },
            contents: [{ parts: [{ text: listingText }] }],
            generationConfig: { temperature: 0.8, maxOutputTokens: 512 },
          }),
        }
      );

      console.log('[generateWithGemini] Response status:', res.status);
      if (!res.ok) {
        console.log('[generateWithGemini] Response not ok, trying next model');
        continue;
      }

      const data = await res.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      console.log('[generateWithGemini] Raw response:', raw.slice(0, 200));
      
      let cleaned = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
      // Remove any control characters that could break JSON parsing
      cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, '');
      
      let parsed;
      try {
        parsed = JSON.parse(cleaned);
      } catch (parseErr: any) {
        console.log('[generateWithGemini] JSON parse failed, trying to extract:', parseErr?.message);
        // Try to extract social_post from the text manually
        const match = cleaned.match(/"social_post"\s*:\s*"([^"]*)"/);
        if (match) {
          console.log('[generateWithGemini] Extracted manually:', match[1].slice(0, 100));
          return match[1];
        }
        continue;
      }
      
      console.log('[generateWithGemini] Parsed JSON:', parsed);
      if (parsed?.social_post) {
        console.log('[generateWithGemini] Found social_post!');
        return parsed.social_post;
      }
    } catch (err: any) {
      console.log('[generateWithGemini] Error:', err.message, err.cause);
    }
  }
  console.log('[generateWithGemini] All models failed');
  return null;
}

export async function POST(req: NextRequest) {
  console.log('[generate-social-post] Received request');
  try {
    const { listing_id } = await req.json();
    console.log('[generate-social-post] listing_id:', listing_id);
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
    console.log('[generate-social-post] Supabase client created');

    // Fetch the listing
    const { data: listing, error: fetchError } = await supabase
      .from('listings')
      .select('id, brand, model, year, condition, price, location_state, location_lga, transmission, fuel_type, mileage, color, features, faq_ac_working, faq_documents_complete, accident_history, negotiable, social_post')
      .eq('id', listing_id)
      .single();

    if (fetchError || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    // If social_post already exists, return it without regenerating
    if (listing.social_post) {
      console.log('[generate-social-post] social_post already exists');
      const listingUrl = `naira.autos/listing/${listing.year}-${listing.brand?.toLowerCase().replace(/\s+/g, '-')}-${listing.model?.toLowerCase().replace(/\s+/g, '-')}-${listing.id}`;
      const finalPost = listing.social_post.replace(/LISTING_SLUG/g, listingUrl);
      return NextResponse.json({ social_post: finalPost, regenerated: false });
    }

    console.log('[generate-social-post] Building listing text for AI...');
    
    // Build the actual listing URL for the AI to reference
    const listingUrl = `naira.autos/listing/${listing.year}-${listing.brand?.toLowerCase().replace(/\s+/g, '-')}-${listing.model?.toLowerCase().replace(/\s+/g, '-')}-${listing.id}`;
    
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
      `Listing URL: ${listingUrl}`,
    ].filter(Boolean).join('\n');

    console.log('[generate-social-post] Listing text:', listingText.slice(0, 200));
    console.log('[generate-social-post] Calling Gemini...');
    const socialPost = await generateWithGemini(listingText);
    console.log('[generate-social-post] Gemini response:', socialPost ? 'got response' : 'no response');

    if (!socialPost) {
      console.error('[generate-social-post] AI generation returned null');
      return NextResponse.json({ error: 'AI generation failed' }, { status: 502 });
    }

    console.log('[generate-social-post] Saving to DB...');
    // Save to DB
    const { error: updateError } = await supabase
      .from('listings')
      .update({ social_post: socialPost })
      .eq('id', listing_id);

    if (updateError) {
      console.error('[generate-social-post] Failed to save:', updateError.message);
    } else {
      console.log('[generate-social-post] Saved to DB successfully');
    }

    // Replace slug placeholder with proper URL structure
    const slugUrl = `naira.autos/listing/${listing.year}-${listing.brand?.toLowerCase().replace(/\s+/g, '-')}-${listing.model?.toLowerCase().replace(/\s+/g, '-')}-${listing.id}`;
    const finalPost = socialPost.replace(/LISTING_SLUG/g, slugUrl);

    return NextResponse.json({ social_post: finalPost, regenerated: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}