import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/**
 * Auto-publisher for draft blog posts. Called by cron-job.org.
 *
 *   GET /api/cron/publish-blogs
 *   Auth:   header  Authorization: Bearer <CRON_SECRET>   (or ?secret=<CRON_SECRET>)
 *
 * Query params (all optional):
 *   per_day  daily cap, counted per Lagos calendar day (default env BLOG_POSTS_PER_DAY or 3, max 20)
 *   count    max posts to publish in THIS run (default = whatever is left of the daily cap)
 *   lang     language to publish (default "en"); "all" = any language
 *   dry      "1" = preview only, publishes nothing
 *
 * Safe to call as often as you like: the daily cap is enforced from the DB, so
 * extra calls publish nothing once today's quota is used.
 * Tip: run it 3x/day with count=1&per_day=3 to spread posts out.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const provided =
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ||
    req.nextUrl.searchParams.get('secret');
  if (!secret || provided !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sp = req.nextUrl.searchParams;
  const clampInt = (v: string | null, fallback: number, max: number) => {
    const n = parseInt(v ?? '', 10);
    return Number.isFinite(n) && n >= 0 ? Math.min(n, max) : fallback;
  };
  const envDefault = clampInt(process.env.BLOG_POSTS_PER_DAY ?? null, 3, 20);
  const perDay = clampInt(sp.get('per_day'), envDefault, 20);
  const lang = sp.get('lang') || 'en';
  const dry = sp.get('dry') === '1';

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Start of the current day in Lagos (UTC+1, no DST) expressed in UTC.
  const LAGOS_OFFSET_MS = 60 * 60 * 1000;
  const lagosNow = new Date(Date.now() + LAGOS_OFFSET_MS);
  const dayStartUtc = new Date(
    Date.UTC(lagosNow.getUTCFullYear(), lagosNow.getUTCMonth(), lagosNow.getUTCDate()) - LAGOS_OFFSET_MS
  );

  let doneQ = supabase
    .from('blog_posts')
    .select('id', { count: 'exact', head: true })
    .eq('published', true)
    .gte('published_at', dayStartUtc.toISOString());
  if (lang !== 'all') doneQ = doneQ.eq('language', lang);
  const { count: publishedToday, error: countErr } = await doneQ;
  if (countErr) return NextResponse.json({ error: countErr.message }, { status: 500 });

  const remaining = Math.max(0, perDay - (publishedToday ?? 0));
  const toPublish = Math.min(remaining, clampInt(sp.get('count'), remaining, 20));

  let draftsQ = supabase
    .from('blog_posts')
    .select('id, slug, title, language', { count: 'exact' })
    .eq('published', false)
    .not('slug', 'is', null)
    .not('title', 'is', null)
    .not('content', 'is', null)
    .order('created_at', { ascending: true })
    .limit(Math.max(toPublish, 1));
  if (lang !== 'all') draftsQ = draftsQ.eq('language', lang);
  const { data: drafts, count: draftsTotal, error: draftErr } = await draftsQ;
  if (draftErr) return NextResponse.json({ error: draftErr.message }, { status: 500 });

  const base = {
    per_day: perDay,
    published_today_before: publishedToday ?? 0,
    drafts_in_queue: draftsTotal ?? 0,
  };

  if (toPublish === 0 || !drafts?.length) {
    return NextResponse.json({ ...base, published: [], note: toPublish === 0 ? 'Daily quota reached' : 'No drafts left' });
  }
  if (dry) {
    return NextResponse.json({ ...base, dry_run: true, would_publish: drafts.slice(0, toPublish) });
  }

  const now = new Date().toISOString();
  // Claim only rows still unpublished (safe against overlapping runs).
  // created_at is reset so the post shows today's date and sorts as newest.
  const { data: published, error: updErr } = await supabase
    .from('blog_posts')
    .update({ published: true, published_at: now, created_at: now, updated_at: now })
    .in('id', drafts.slice(0, toPublish).map((d) => d.id))
    .eq('published', false)
    .select('id, slug, title, language');
  if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });

  // Refresh cached pages so new posts appear right away.
  try {
    for (const p of published ?? []) {
      if (p.language === 'es') revalidatePath(`/blog-de-autos/${p.slug}`);
      else revalidatePath(`/blog/${p.slug}`);
    }
    revalidatePath('/blog');
    revalidatePath('/blog-de-autos');
    revalidatePath('/');
    revalidatePath('/sitemap-blogs.xml');
  } catch {
    // non-fatal; pages refresh on their normal ISR window
  }

  return NextResponse.json({
    ...base,
    published: published ?? [],
    drafts_remaining: Math.max(0, (draftsTotal ?? 0) - (published?.length ?? 0)),
  });
}
