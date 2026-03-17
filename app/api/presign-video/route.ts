// app/api/presign-video/route.ts
//
// Returns a short-lived presigned PUT URL so the browser can upload
// a video directly to R2 without the file passing through our server.
// This avoids Vercel's 4.5 MB body limit and serverless timeouts.
//
// Required env vars (same account as your image R2 setup):
//   R2_ACCOUNT_ID
//   R2_ACCESS_KEY_ID
//   R2_SECRET_ACCESS_KEY
//   R2_BUCKET_NAME          (e.g. "naira-autos-videos")
//   R2_PUBLIC_URL           (e.g. "https://videos.nairaautos.com")
//
// The bucket can be the same bucket as images or a dedicated video bucket.
// A dedicated bucket (e.g. "naira-autos-videos") is cleaner for YouTube
// streaming later — easier to set lifecycle rules and access policies.

import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const MAX_VIDEO_SIZE_BYTES = 500 * 1024 * 1024; // 500 MB
const URL_EXPIRY_SECONDS = 3600; // presigned URL valid for 1 hour

const ALLOWED_TYPES = [
  'video/mp4',
  'video/quicktime',   // .mov
  'video/x-msvideo',  // .avi
  'video/webm',
  'video/3gpp',        // common on Android phones
];

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { filename, contentType, size } = await req.json();

    // ── Validate ────────────────────────────────────────────────────────────
    if (!filename || !contentType || !size) {
      return NextResponse.json({ error: 'filename, contentType and size are required' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json({ error: `File type ${contentType} not allowed` }, { status: 400 });
    }

    if (size > MAX_VIDEO_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File too large. Max ${MAX_VIDEO_SIZE_BYTES / 1024 / 1024} MB` },
        { status: 400 }
      );
    }

    // ── Generate unique key ──────────────────────────────────────────────────
    const ext = filename.split('.').pop()?.toLowerCase() || 'mp4';
    const key = `videos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    // ── Create presigned PUT URL ─────────────────────────────────────────────
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      ContentType: contentType,
      ContentLength: size,
      // This metadata survives to the object — useful for admin tooling
      Metadata: {
        'original-filename': encodeURIComponent(filename),
        'uploaded-at': new Date().toISOString(),
      },
    });

    const uploadUrl = await getSignedUrl(r2, command, { expiresIn: URL_EXPIRY_SECONDS });

    // The public URL the listing will store after upload completes
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

    return NextResponse.json({ uploadUrl, publicUrl, key });
  } catch (err: any) {
    console.error('[presign-video] Error:', err);
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}