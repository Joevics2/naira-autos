'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Download, Share2, Copy, Check, Loader2 } from 'lucide-react';

import { flagEmoji } from '@/lib/country-meta';

export interface ShareCardData {
  mileage: number;
  unit: 'km' | 'mi';
  fromCity: string;
  toCity: string;
  fromCountryCode: string;
  toCountryCode: string;
  roundTrips: number;
  earthLaps: number;
  moonTrips: number;
  drivingDays: number;
}

function fmt(n: number, digits = 0) {
  return n.toLocaleString('en-US', { maximumFractionDigits: digits });
}

/** The hook — a question, framed to make someone want the answer. */
export function hookLine(d: ShareCardData): string {
  return `¿${fmt(d.mileage)} ${d.unit === 'km' ? 'km' : 'millas'} es mucho para un auto? 🤔`;
}

/** The payoff — plain, readable, no isolated giant number that can look
 *  broken on small results (e.g. a lone "0.26x" blown up to 190px). */
export function mainSentence(d: ShareCardData): string {
  const fromFlag = flagEmoji(d.fromCountryCode);
  const toFlag = flagEmoji(d.toCountryCode);
  if (d.roundTrips >= 1) {
    return `🚗 Es más o menos lo mismo que manejar de ${d.fromCity}${fromFlag ? ' ' + fromFlag : ''} a ${d.toCity}${toFlag ? ' ' + toFlag : ''} ida y vuelta ${fmt(d.roundTrips, 1)} veces.`;
  }
  return `🚗 Es más o menos lo mismo que manejar de ${d.fromCity}${fromFlag ? ' ' + fromFlag : ''} a ${d.toCity}${toFlag ? ' ' + toFlag : ''} ${fmt(d.roundTrips * 2, 1)} veces.`;
}

/** One contextual supporting fact — not three. Moon only gets mentioned
 *  once it's a genuinely notable milestone; otherwise Earth laps or
 *  driving days, whichever reads more naturally at that scale. */
export function supportingSentence(d: ShareCardData): string {
  if (d.moonTrips >= 1) return `🌕 O ir a la Luna y volver ${fmt(d.moonTrips, 1)} veces.`;
  if (d.earthLaps >= 1) return `🌍 O dar la vuelta al mundo ${fmt(d.earthLaps, 1)} veces.`;
  return `⏱️ O manejar sin parar durante ${fmt(d.drivingDays, 1)} días.`;
}

export function shareText(d: ShareCardData): string {
  return `${hookLine(d)}\n\n${mainSentence(d)}\n${supportingSentence(d)}\n\nDescifra el kilometraje de tu auto\n👉 naira.autos/tools/calculadora-de-kilometraje`;
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

/** Wraps text and returns the line array without drawing — lets us
 *  measure total height first so blocks of text can be vertically
 *  centered instead of pinned to the top with dead space below. */
function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
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
  return lines;
}

function drawLines(ctx: CanvasRenderingContext2D, lines: string[], x: number, y: number, lineHeight: number) {
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));
}

const CARD_W = 1200;
const CARD_H = 630; // landscape — standard link-preview ratio, no wasted space

function drawCard(canvas: HTMLCanvasElement, d: ShareCardData) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const W = CARD_W, H = CARD_H;
  ctx.clearRect(0, 0, W, H);

  // Plain dark background, one subtle glow — not busy
  ctx.fillStyle = '#0B0F12';
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W * 0.92, H * 0.08, 0, W * 0.92, H * 0.08, W * 0.5);
  glow.addColorStop(0, 'rgba(16,185,129,0.10)');
  glow.addColorStop(1, 'rgba(16,185,129,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  const marginX = 70;
  const maxWidth = W - marginX * 2;
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';

  // Small plain category label
  ctx.font = '700 20px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fillText('KILOMETRAJE DEL AUTO', marginX, 58);

  // Footer geometry (needed now to compute the center space above it)
  const footerH = 84;
  const footerMarginBottom = 36;
  const footerY = H - footerH - footerMarginBottom;

  // Measure all three text blocks first so they can be vertically centered
  // in the space between the label and the footer — no dead gap.
  const hookFont = '800 40px Arial, sans-serif';
  const hookLineHeight = 50;
  ctx.font = hookFont;
  const hookLines = wrapLines(ctx, hookLine(d), maxWidth);

  const mainFont = '600 32px Arial, sans-serif';
  const mainLineHeight = 44;
  ctx.font = mainFont;
  const mainLines = wrapLines(ctx, mainSentence(d), maxWidth);

  const supportFont = '500 30px Arial, sans-serif';
  const supportLineHeight = 42;
  ctx.font = supportFont;
  const supportLines = wrapLines(ctx, supportingSentence(d), maxWidth);

  const blockGap = 22;
  const totalTextHeight =
    hookLines.length * hookLineHeight + blockGap +
    mainLines.length * mainLineHeight +
    supportLines.length * supportLineHeight;

  const topBound = 96; // just below the label
  const bottomBound = footerY - 30;
  let y = topBound + Math.max(0, (bottomBound - topBound - totalTextHeight) / 2) + hookLineHeight * 0.72;

  ctx.font = hookFont;
  ctx.fillStyle = '#ffffff';
  drawLines(ctx, hookLines, marginX, y, hookLineHeight);
  y += hookLines.length * hookLineHeight + blockGap;

  ctx.font = mainFont;
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  drawLines(ctx, mainLines, marginX, y, mainLineHeight);
  y += mainLines.length * mainLineHeight;

  ctx.font = supportFont;
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  drawLines(ctx, supportLines, marginX, y, supportLineHeight);

  // Bottom footer — the ONLY naira.autos branding on the card
  roundRect(ctx, marginX, footerY, maxWidth, footerH, 16);
  ctx.fillStyle = 'rgba(16,185,129,0.10)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(16,185,129,0.35)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.font = '700 26px Arial, sans-serif';
  ctx.fillStyle = '#34d399';
  ctx.fillText('Descifra el kilometraje', marginX + 28, footerY + 36);
  ctx.font = '600 24px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.fillText('👉 naira.autos/tools/calculadora-de-kilometraje', marginX + 28, footerY + 66);
}

export default function MileageShareCard({ data }: { data: ShareCardData | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
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
      a.download = 'kilometraje-de-mi-auto-naira-autos.png';
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
      const file = new File([blob], 'kilometraje-de-mi-auto-naira-autos.png', { type: 'image/png' });
      if (canShareFiles && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'El kilometraje de mi auto, explicado',
          text: data ? shareText(data) : undefined,
        });
      } else {
        await download();
      }
    } catch { /* user cancelled share sheet — not an error */ } finally { setBusy(false); }
  }, [getBlob, canShareFiles, download, data]);

  const copyText = useCallback(async () => {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(shareText(data));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable — silently ignore */ }
  }, [data]);

  if (!data) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-5">
      <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">Compartir</p>
      <div className="rounded-xl overflow-hidden border border-border mb-4 bg-[#0B0F12]">
        {previewUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="Vista previa de la tarjeta de kilometraje" className="w-full h-auto block" />
        )}
      </div>
      <canvas ref={canvasRef} width={CARD_W} height={CARD_H} className="hidden" />
      <div className="flex gap-2 mb-2">
        <button onClick={share} disabled={busy}
          className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold transition-all disabled:opacity-60">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}
          Compartir imagen
        </button>
        <button onClick={download} disabled={busy}
          className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-xl border border-border bg-background hover:border-emerald-500/50 text-foreground text-sm font-bold transition-all disabled:opacity-60">
          <Download className="h-4 w-4" />
          Descargar
        </button>
      </div>
      <button onClick={copyText}
        className="w-full flex items-center justify-center gap-1.5 h-10 rounded-xl border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-emerald-500/50 text-xs font-bold transition-all">
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? '¡Copiado!' : 'Copiar texto'}
      </button>
      <p className="text-[11px] text-muted-foreground mt-2.5 text-center">Publícalo bajo cualquier anuncio de auto — mira cómo la gente pregunta qué significa. 👀</p>
    </div>
  );
}
