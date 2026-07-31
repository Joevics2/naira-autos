'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Download, Share2, Loader2 } from 'lucide-react';

export interface ShareCardData {
  mileage: number;
  unit: 'km' | 'mi';
  fromCity: string;
  toCity: string;
  roundTrips: number;
  earthLaps: number;
  moonTrips: number;
  drivingDays: number;
}

const CARD_SIZE = 1080;

function fmt(n: number, digits = 0) {
  return n.toLocaleString('en-US', { maximumFractionDigits: digits });
}

/** Pick the single most impressive way to frame the result — the whole
 *  point of the card is one number that makes someone stop scrolling. */
export function heroFraming(d: ShareCardData) {
  if (d.moonTrips >= 1) return { emoji: '🌕', big: `${fmt(d.moonTrips, 1)}x`, label: 'trips to the Moon and back' };
  if (d.earthLaps >= 3) return { emoji: '🌍', big: `${fmt(d.earthLaps, 1)}x`, label: 'laps around planet Earth' };
  if (d.roundTrips >= 1) return { emoji: '🔁', big: `${fmt(d.roundTrips, 1)}x`, label: `${d.fromCity} ↔ ${d.toCity}, round trip` };
  return { emoji: '🚗', big: `${fmt(d.roundTrips, 2)}x`, label: `${d.fromCity} → ${d.toCity}` };
}

export function tagline(d: ShareCardData): string {
  const pool = d.moonTrips >= 1
    ? ['This car could apply for astronaut training. 🧑\u200d🚀', 'NASA might want a word.', 'Basically interstellar at this point.']
    : d.earthLaps >= 1
    ? ['This thing has EARNED its keep.', 'At this point it deserves a pension.', 'Not a car — a frequent flyer.']
    : d.roundTrips >= 3
    ? ['That is serious road time.', 'Certified road warrior. 🛣️', 'This car has seen things.']
    : ['Barely broken in.', 'Still got that new-car smell (probably).', 'Just warming up.'];
  // deterministic pick so it doesn't flicker between re-renders
  const seed = Math.round(d.roundTrips * 7 + d.earthLaps * 13);
  return pool[seed % pool.length];
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapCenteredText(ctx: CanvasRenderingContext2D, text: string, cx: number, y: number, maxWidth: number, lineHeight: number): number {
  const words = text.split(' ');
  let line = '';
  const lines: string[] = [];
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  lines.forEach((l, i) => ctx.fillText(l, cx, y + i * lineHeight));
  return lines.length;
}

function drawCard(canvas: HTMLCanvasElement, d: ShareCardData) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const S = CARD_SIZE;
  ctx.clearRect(0, 0, S, S);

  // Background
  ctx.fillStyle = '#080C10';
  ctx.fillRect(0, 0, S, S);
  const glow = ctx.createRadialGradient(S * 0.85, S * 0.1, 0, S * 0.85, S * 0.1, S * 0.6);
  glow.addColorStop(0, 'rgba(16,185,129,0.20)');
  glow.addColorStop(1, 'rgba(16,185,129,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, S, S);
  const glow2 = ctx.createRadialGradient(S * 0.1, S * 0.95, 0, S * 0.1, S * 0.95, S * 0.5);
  glow2.addColorStop(0, 'rgba(16,185,129,0.12)');
  glow2.addColorStop(1, 'rgba(16,185,129,0)');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, S, S);

  // Top bar — brand
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 40px Arial, sans-serif';
  ctx.fillText('naira.autos', 64, 96);
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.font = '600 24px Arial, sans-serif';
  ctx.fillText('Car Intelligence Hub', 64, 128);

  // Badge top-right
  ctx.textAlign = 'right';
  const badgeText = '🚗 MILEAGE CHECK';
  ctx.font = '700 24px Arial, sans-serif';
  const badgeW = ctx.measureText(badgeText).width + 48;
  roundRect(ctx, S - 64 - badgeW, 64, badgeW, 52, 26);
  ctx.fillStyle = 'rgba(16,185,129,0.15)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(16,185,129,0.4)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#34d399';
  ctx.textAlign = 'center';
  ctx.fillText(badgeText, S - 64 - badgeW / 2, 98);

  const hero = heroFraming(d);

  // Mileage recap pill
  ctx.textAlign = 'center';
  ctx.font = '700 30px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.fillText(`${fmt(d.mileage)} ${d.unit === 'km' ? 'KM' : 'MILES'} ON THE CLOCK`, S / 2, 235);

  // Hero emoji
  ctx.font = '150px Arial, sans-serif';
  ctx.fillText(hero.emoji, S / 2, 400);

  // Hero big number
  ctx.font = '900 190px Arial, sans-serif';
  ctx.fillStyle = '#34d399';
  ctx.fillText(hero.big, S / 2, 560);

  // Hero label
  ctx.font = '700 42px Arial, sans-serif';
  ctx.fillStyle = '#ffffff';
  wrapCenteredText(ctx, hero.label, S / 2, 620, S - 160, 52);

  // Tagline
  ctx.font = 'italic 600 30px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText(tagline(d), S / 2, 700);

  // Stat row
  const stats = [
    { emoji: '🌍', big: fmt(d.earthLaps, 1), label: 'Earth laps' },
    { emoji: '🌕', big: fmt(d.moonTrips, 2), label: 'Moon trips' },
    { emoji: '⏱️', big: fmt(d.drivingDays, 1), label: 'days non-stop' },
  ];
  const cardW = 280, cardH = 190, gap = 30;
  const totalW = cardW * 3 + gap * 2;
  const startX = (S - totalW) / 2;
  const cardY = 750;
  stats.forEach((s, i) => {
    const x = startX + i * (cardW + gap);
    roundRect(ctx, x, cardY, cardW, cardH, 24);
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.font = '52px Arial, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(s.emoji, x + cardW / 2, cardY + 66);
    ctx.font = '900 44px Arial, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(s.big, x + cardW / 2, cardY + 122);
    ctx.font = '600 22px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText(s.label, x + cardW / 2, cardY + 155);
  });

  // Bottom CTA bar
  const ctaY = S - 130;
  roundRect(ctx, 64, ctaY, S - 128, 80, 20);
  ctx.fillStyle = '#10b981';
  ctx.fill();
  ctx.fillStyle = '#04110c';
  ctx.font = '800 32px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Check your car\'s mileage free  →  naira.autos', S / 2, ctaY + 51);
}

export default function MileageShareCard({ data }: { data: ShareCardData | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [canShareFiles, setCanShareFiles] = useState(false);

  useEffect(() => {
    setCanShareFiles(typeof navigator !== 'undefined' && typeof navigator.share === 'function' && typeof navigator.canShare === 'function');
  }, []);

  useEffect(() => {
    if (!data || !canvasRef.current) { setPreviewUrl(null); return; }
    drawCard(canvasRef.current, data);
    setPreviewUrl(canvasRef.current.toDataURL('image/png'));
  }, [data]);

  const getBlob = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!canvasRef.current) return resolve(null);
      canvasRef.current.toBlob((b) => resolve(b), 'image/png');
    });
  }, []);

  const download = useCallback(async () => {
    setBusy(true);
    try {
      const blob = await getBlob();
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'my-car-mileage-naira-autos.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally { setBusy(false); }
  }, [getBlob]);

  const share = useCallback(async () => {
    setBusy(true);
    try {
      const blob = await getBlob();
      if (!blob) return;
      const file = new File([blob], 'my-car-mileage-naira-autos.png', { type: 'image/png' });
      if (canShareFiles && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My car\'s mileage, explained',
          text: 'Check what your car\'s mileage actually means — free tool at naira.autos',
        });
      } else {
        await download();
      }
    } catch { /* user cancelled share sheet — not an error */ } finally { setBusy(false); }
  }, [getBlob, canShareFiles, download]);

  if (!data) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-5">
      <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">Share this</p>
      <div className="rounded-xl overflow-hidden border border-border mb-4 bg-[#080C10]">
        {previewUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="Shareable mileage card preview" className="w-full h-auto block" />
        )}
      </div>
      <canvas ref={canvasRef} width={CARD_SIZE} height={CARD_SIZE} className="hidden" />
      <div className="flex gap-2">
        <button onClick={share} disabled={busy}
          className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold transition-all disabled:opacity-60">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}
          Share
        </button>
        <button onClick={download} disabled={busy}
          className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-xl border border-border bg-background hover:border-emerald-500/50 text-foreground text-sm font-bold transition-all disabled:opacity-60">
          <Download className="h-4 w-4" />
          Download
        </button>
      </div>
      <p className="text-[11px] text-muted-foreground mt-2.5 text-center">Post it under any car listing — watch people ask what it means. 👀</p>
    </div>
  );
}
