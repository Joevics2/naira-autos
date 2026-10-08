// Lightweight per-IP rate limit on Upstash Redis (already a dependency).
// Fails open: if Redis is unavailable the request is allowed through.
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

let redis: Redis | null = null;
try {
  redis = Redis.fromEnv();
} catch {
  redis = null;
}

export async function rateLimit(
  req: NextRequest,
  name: string,
  limit: number,
  windowSeconds: number
): Promise<NextResponse | null> {
  if (!redis) return null;
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const key = `rl:${name}:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, windowSeconds);
    if (count > limit) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(windowSeconds) } }
      );
    }
  } catch {
    // fail open
  }
  return null;
}
