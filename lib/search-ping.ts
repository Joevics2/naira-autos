// Notifies search engines when blog posts are published.
//
//  • IndexNow  – Bing, Yandex, Naver, Seznam, Yep (Google does NOT use IndexNow).
//  • Google Search Console API – re-submits /sitemap-blogs.xml (sitemaps.submit).
//  • Google Indexing API – URL_UPDATED per post. Google officially supports this
//    only for JobPosting/BroadcastEvent pages, so it is best-effort; disable with
//    GOOGLE_INDEXING_API=0.
//
// Env vars (all optional – anything not configured is skipped, never throws):
//   INDEXNOW_KEY                  8-128 chars [A-Za-z0-9-]. Defaults to a value derived from CRON_SECRET.
//   GOOGLE_SERVICE_ACCOUNT_JSON   full service-account JSON (raw or base64). The service-account
//                                 email must be added as an Owner in Search Console.
//   GSC_SITE_URL                  Search Console property, e.g. "sc-domain:naira.autos" or
//                                 "https://www.naira.autos/". Defaults to the URL-prefix property.
//   GOOGLE_INDEXING_API           "0" to turn off the Indexing API calls.
import { createHash, createSign } from 'crypto';

export const SITE = 'https://www.naira.autos';
const HOST = new URL(SITE).host;

// Keep in sync with app/sitemap-blogs.xml/route.ts
const BASE_PATH_BY_LANG: Record<string, string> = { en: '/blog', es: '/blog-de-autos' };

export const blogUrl = (p: { slug: string; language?: string | null }) =>
  `${SITE}${BASE_PATH_BY_LANG[p.language ?? 'en'] || '/blog'}/${p.slug}`;

export function indexNowKey(): string | null {
  const explicit = process.env.INDEXNOW_KEY;
  if (explicit && /^[A-Za-z0-9-]{8,128}$/.test(explicit)) return explicit;
  const secret = process.env.CRON_SECRET;
  if (!secret) return null;
  return createHash('sha256').update(`indexnow:${secret}`).digest('hex').slice(0, 32);
}

const timeout = () => AbortSignal.timeout(8000);

async function pingIndexNow(urls: string[]) {
  const key = indexNowKey();
  if (!key) return { skipped: 'no INDEXNOW_KEY/CRON_SECRET' };
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation: `${SITE}/indexnow-key.txt`, urlList: urls }),
    signal: timeout(),
  });
  return { status: res.status, ok: res.status === 200 || res.status === 202 };
}

type ServiceAccount = { client_email: string; private_key: string };

function loadServiceAccount(): ServiceAccount | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    const text = raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8');
    const j = JSON.parse(text);
    if (!j.client_email || !j.private_key) return null;
    return { client_email: j.client_email, private_key: String(j.private_key).replace(/\\n/g, '\n') };
  } catch {
    return null;
  }
}

const b64url = (b: Buffer | string) => Buffer.from(b).toString('base64url');

async function googleToken(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/indexing https://www.googleapis.com/auth/webmasters',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    })
  );
  const sig = createSign('RSA-SHA256').update(`${header}.${claim}`).sign(sa.private_key);
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claim}.${b64url(sig)}`,
    }),
    signal: timeout(),
  });
  const j = await res.json();
  if (!j.access_token) throw new Error(`token: ${j.error_description || j.error || res.status}`);
  return j.access_token;
}

async function pingGoogle(urls: string[]) {
  const sa = loadServiceAccount();
  if (!sa) return { skipped: 'no GOOGLE_SERVICE_ACCOUNT_JSON' };
  const token = await googleToken(sa);
  const auth = { Authorization: `Bearer ${token}` };
  const out: Record<string, unknown> = {};

  // 1) Re-submit the blog sitemap in Search Console.
  const property = process.env.GSC_SITE_URL || `${SITE}/`;
  const sitemap = `${SITE}/sitemap-blogs.xml`;
  try {
    const r = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/sitemaps/${encodeURIComponent(sitemap)}`,
      { method: 'PUT', headers: auth, signal: timeout() }
    );
    out.sitemap = { status: r.status, ok: r.ok, ...(r.ok ? {} : { error: (await r.text()).slice(0, 200) }) };
  } catch (e) {
    out.sitemap = { error: String(e) };
  }

  // 2) Indexing API, per URL (best effort).
  if (process.env.GOOGLE_INDEXING_API !== '0') {
    out.indexing = await Promise.all(
      urls.map(async (url) => {
        try {
          const r = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
            method: 'POST',
            headers: { ...auth, 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, type: 'URL_UPDATED' }),
            signal: timeout(),
          });
          return { url, status: r.status, ok: r.ok, ...(r.ok ? {} : { error: (await r.text()).slice(0, 200) }) };
        } catch (e) {
          return { url, error: String(e) };
        }
      })
    );
  }
  return out;
}

/** Notify search engines about freshly published posts. Never throws. */
export async function notifySearchEngines(posts: { slug: string; language?: string | null }[]) {
  const urls = posts.map(blogUrl);
  if (!urls.length) return { urls };
  const [indexNow, google] = await Promise.allSettled([pingIndexNow(urls), pingGoogle(urls)]);
  const unwrap = (r: PromiseSettledResult<unknown>) =>
    r.status === 'fulfilled' ? r.value : { error: String((r as PromiseRejectedResult).reason) };
  return { urls, indexNow: unwrap(indexNow), google: unwrap(google) };
}
