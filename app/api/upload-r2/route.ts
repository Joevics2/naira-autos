/**
 * app/api/upload-r2/route.ts
 *
 * Handles image uploads to Cloudflare R2.
 * Place this file at: app/api/upload-r2/route.ts
 *
 * Required env vars (server-side only — no NEXT_PUBLIC_ prefix):
 *   R2_ACCOUNT_ID         e.g. abc123def456...
 *   R2_ACCESS_KEY_ID      from R2 API Tokens in Cloudflare dashboard
 *   R2_SECRET_ACCESS_KEY  from R2 API Tokens
 *   R2_BUCKET_NAME        e.g. jobmeter-media
 *   R2_PUBLIC_URL         e.g. https://pub-xxxx.r2.dev  (no trailing slash)
 *                         OR your custom domain: https://media.jobmeter.app
 *
 * You do NOT need a custom domain. To get your free r2.dev public URL:
 *   Cloudflare Dashboard → R2 → your bucket → Settings → Public access → Enable
 *
 * Install dependency:
 *   npm install @aws-sdk/client-s3
 */

import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  // Check env vars are set
  if (
    !process.env.R2_ACCOUNT_ID ||
    !process.env.R2_ACCESS_KEY_ID ||
    !process.env.R2_SECRET_ACCESS_KEY ||
    !process.env.R2_BUCKET_NAME ||
    !process.env.R2_PUBLIC_URL
  ) {
    return NextResponse.json({ error: 'R2 not configured' }, { status: 503 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop() || 'jpg';
    const key = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        CacheControl: 'public, max-age=31536000',
      })
    );

    const url = `${process.env.R2_PUBLIC_URL}/${key}`;
    return NextResponse.json({ url });
  } catch (error: any) {
    console.error('R2 upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}