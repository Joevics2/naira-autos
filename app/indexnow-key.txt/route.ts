import { NextResponse } from 'next/server';
import { indexNowKey } from '@/lib/search-ping';

// IndexNow ownership proof: the key must be retrievable as plain text from
// the host (referenced via `keyLocation` in lib/search-ping.ts).
export const dynamic = 'force-dynamic';

export async function GET() {
  const key = indexNowKey();
  if (!key) return new NextResponse('Not found', { status: 404 });
  return new NextResponse(key, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
