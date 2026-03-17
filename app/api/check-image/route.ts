// app/api/check-image/route.ts
//
// Behaviour is controlled by the `strict_image_validation` flag in the
// `admin_settings` table (single row, id = 'global').
//
// Toggle ON  (strict = true)
//   ❌ Aspect ratio / tall images  — blocked
//   ❌ EXIF screenshot tag         — blocked
//   ❌ Small images (<400×300)     — blocked  "Please upload a clearer image"
//   ❌ Duplicate hash              — always blocked
//   ✅ Hash always generated & saved
//
// Toggle OFF (strict = false, default)
//   ✅ Aspect ratio / tall images  — allowed
//   ✅ EXIF screenshot tag         — allowed
//   ✅ Small images                — allowed (above absolute floor)
//   ❌ Duplicate hash              — always blocked
//   ✅ Hash always generated & saved
//
// Absolute floor (always blocked regardless of toggle):
//   width < 200 OR height < 150  → "Please upload a clearer image"

import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Absolute floor — always enforced, cannot be toggled off
const ABSOLUTE_MIN_WIDTH  = 200;
const ABSOLUTE_MIN_HEIGHT = 150;

// Strict-mode thresholds — only when strict_image_validation = true
const STRICT_MIN_WIDTH     = 400;
const STRICT_MIN_HEIGHT    = 300;
const MAX_SCREENSHOT_RATIO = 0.6; // width/height < 0.6 = suspiciously tall

const HASH_SIZE           = 16;
const DUPLICATE_THRESHOLD = 8;

// ── Helpers ───────────────────────────────────────────────────────────────────

async function computeDHash(buffer: Buffer): Promise<string> {
  const { data } = await sharp(buffer)
    .resize(HASH_SIZE + 1, HASH_SIZE, { fit: 'fill' })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let bits = '';
  for (let row = 0; row < HASH_SIZE; row++) {
    for (let col = 0; col < HASH_SIZE; col++) {
      const left  = data[row * (HASH_SIZE + 1) + col];
      const right = data[row * (HASH_SIZE + 1) + col + 1];
      bits += left < right ? '1' : '0';
    }
  }
  return BigInt('0b' + bits).toString(16).padStart((HASH_SIZE * HASH_SIZE) / 4, '0');
}

function hammingDistance(a: string, b: string): number {
  if (a.length !== b.length) return Infinity;
  let dist = 0;
  for (let i = 0; i < a.length; i++) {
    const xor = parseInt(a[i], 16) ^ parseInt(b[i], 16);
    dist += xor.toString(2).split('').filter(c => c === '1').length;
  }
  return dist;
}

function hashPrefix(hash: string, len = 8): string {
  return hash.slice(0, len);
}

async function isStrictModeEnabled(): Promise<boolean> {
  try {
    const { data, error } = await supabaseAdmin
      .from('admin_settings')
      .select('strict_image_validation')
      .eq('id', 'global')
      .single();
    if (error || !data) return false;
    return data.strict_image_validation === true;
  } catch {
    return false;
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const meta   = await sharp(buffer).metadata();
    const { width = 0, height = 0 } = meta;

    // ── 1. Absolute floor — always enforced ───────────────────────────────
    if (width < ABSOLUTE_MIN_WIDTH || height < ABSOLUTE_MIN_HEIGHT) {
      return NextResponse.json({
        blocked: true,
        reason:  'Please upload a clearer image. The photo is too small or low resolution.',
      }, { status: 422 });
    }

    // ── 2. Read strict mode toggle from DB ────────────────────────────────
    const strict = await isStrictModeEnabled();

    // ── 3. Strict-mode checks ─────────────────────────────────────────────
    if (strict) {
      if (width < STRICT_MIN_WIDTH || height < STRICT_MIN_HEIGHT) {
        return NextResponse.json({
          blocked: true,
          reason:  `Please upload a clearer image. Minimum size is ${STRICT_MIN_WIDTH}×${STRICT_MIN_HEIGHT}px — your photo is ${width}×${height}px.`,
        }, { status: 422 });
      }

      if (height > 0 && (width / height) < MAX_SCREENSHOT_RATIO) {
        return NextResponse.json({
          blocked: true,
          reason:  'This image looks like a screenshot. Please upload a real photo of the vehicle.',
        }, { status: 422 });
      }

      try {
        if (meta.exif) {
          const exifStr = meta.exif.toString('utf8').toLowerCase();
          if (
            exifStr.includes('screenshot') ||
            exifStr.includes('snip') ||
            exifStr.includes('grab')
          ) {
            return NextResponse.json({
              blocked: true,
              reason:  'This image appears to be a screenshot. Please upload a real photo of the vehicle.',
            }, { status: 422 });
          }
        }
      } catch (_) { /* no EXIF — fine */ }
    }

    // ── 4. Generate hash — always, regardless of strict mode ─────────────
    const dhash  = await computeDHash(buffer);
    const prefix = hashPrefix(dhash);

    // ── 5. Duplicate check — always, regardless of strict mode ───────────
    const { data: candidates, error: dbErr } = await supabaseAdmin
      .from('listing_image_hashes')
      .select('listing_id, dhash')
      .eq('hash_prefix', prefix);

    if (dbErr) {
      console.error('[check-image] DB query error:', dbErr.message);
      // Non-fatal — log and continue so a DB hiccup never blocks an upload
    }

    if (candidates && candidates.length > 0) {
      for (const row of candidates) {
        const dist = hammingDistance(dhash, row.dhash);
        if (dist <= DUPLICATE_THRESHOLD) {
          return NextResponse.json({
            blocked:    true,
            duplicate:  true,
            listing_id: row.listing_id,
            reason:     'This image already exists in another listing. Please use original photos of your vehicle.',
          }, { status: 422 });
        }
      }
    }

    // ── 6. All good — return hash so page.tsx can save it after insert ────
    return NextResponse.json({
      blocked:     false,
      dhash,
      hash_prefix: prefix,
    });

  } catch (err: any) {
    console.error('[check-image] Error:', err);
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}

export const runtime = 'nodejs';