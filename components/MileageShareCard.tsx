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

function fmt(n: number, digits = 0) {
  return n.toLocaleString('en-US', { maximumFractionDigits: digits });
}

/** The one main sentence the card is built around — plain, readable,
 *  no isolated giant number that can look broken on small results (e.g.
 *  a lone "0.26x" blown up to 190px). */
export function mainSentence(d: ShareCardData): string {
  if (d.roundTrips >= 1) {
    return `${fmt(d.mileage)} ${d.unit} is like driving from ${d.fromCity} to ${d.toCity} and back ${fmt(d.roundTrips, 1)} times.`;
  }
  return `${fmt(d.mileage)} ${d.unit} is like driving from ${d.fromCity} to ${d.toCity} ${fmt(d.roundTrips * 2, 1)} times.`;
}

/** One contextual supporting fact — not three. Moon only gets mentioned
 *  once it's a genuinely notable milestone; otherwise Earth laps or
 *  driving days, whichever reads more naturally at that scale. */
export function supportingSentence(d: ShareCardData): string {
  if (d.moonTrips >= 1) return `That's enough distance to have driven to the Moon and back ${fmt(d.moonTrips, 1)} times.`;
  if (d.earthLaps >= 1) return `That's about ${fmt(d.earthLaps, 1)} laps around planet Earth.`;
  return `That's roughly ${fmt(d.drivingDays, 1)} days of non-stop driving.`;
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

/** Left-aligned wrap (not centered) — reads like a normal paragraph
 *  instead of a poster. Returns the y position right after the text. */
function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number {
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
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));
  return y + lines.length * lineHeight;
}

const CARD_W = 1080;
const CARD_H = 860;

function drawCard(canvas: HTMLCanvasElement, d: ShareCardData) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const W = CARD_W, H = CARD_H;
  ctx.clearRect(0, 0, W, H);

  // Plain dark background, one subtle glow — not busy
  ctx.fillStyle = '#0B0F12';
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W * 0.9, H * 0.05, 0, W * 0.9, H * 0.05, W * 0.5);
  glow.addColorStop(0, 'rgba(16,185,129,0.10)');
  glow.addColorStop(1, 'rgba(16,185,129,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  const marginX = 80;
  const maxWidth = W - marginX * 2;
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';

  // Small plain category label — no badge/pill, just says what this is
  ctx.font = '700 26px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.fillText('CAR MILEAGE CHECK', marginX, 100);

  // Main sentence — the actual content, readable size
  ctx.font = '700 52px Arial, sans-serif';
  ctx.fillStyle = '#ffffff';
  let y = wrapText(ctx, mainSentence(d), marginX, 190, maxWidth, 66);

  // Supporting sentence
  y += 40;
  ctx.font = '500 34px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  wrapText(ctx, supportingSentence(d), marginX, y, maxWidth, 46);

  // Bottom footer — the ONLY naira.autos branding on the card
  const footerH = 96;
  const footerY = H - footerH - 60;
  roundRect(ctx, marginX, footerY, maxWidth, footerH, 18);
  ctx.fillStyle = 'rgba(16,185,129,0.10)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(16,185,129,0.35)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.font = '800 32px Arial, sans-serif';
  ctx.fillStyle = '#34d399';
  ctx.fillText('naira.autos', marginX + 32, footerY + 44);
  ctx.font = '500 24px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.fillText('Free car mileage check', marginX + 32, footerY + 74);

  ctx.textAlign = 'right';
  ctx.font = '600 26px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.fillText('Check yours →', marginX + maxWidth - 32, footerY + 60);
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
      <canvas ref={canvasRef} width={CARD_W} height={CARD_H} className="hidden" />
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
