'use client';

import { useState, useRef, useMemo } from 'react';
import {
  Mic, Square, Upload, X, Loader2, Wrench, AlertTriangle,
  CheckCircle2, AlertCircle, XCircle, Info, Lock, RotateCcw,
} from 'lucide-react';

// ── Audio cap: free tier analyses only the first 30s of any clip ───
// (Gemini audio decoding is billed per second — this bounds cost per
// analysis. Longer clips are trimmed client-side before upload rather
// than rejected, so the user still gets a result.)
const FREE_AUDIO_CAP_SECONDS = 30;

function getAudioDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const audio = document.createElement('audio');
    audio.preload = 'metadata';
    audio.onloadedmetadata = () => {
      const d = audio.duration;
      URL.revokeObjectURL(url);
      if (!isFinite(d) || isNaN(d)) reject(new Error('duration unavailable'));
      else resolve(d);
    };
    audio.onerror = () => { URL.revokeObjectURL(url); reject(new Error('metadata load failed')); };
    audio.src = url;
  });
}

function encodeWav(buffer: AudioBuffer): Blob {
  const numSamples = buffer.length;
  const sampleRate = buffer.sampleRate;
  const data = buffer.getChannelData(0);
  const bytesPerSample = 2;
  const blockAlign = bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * bytesPerSample;
  const ab = new ArrayBuffer(44 + dataSize);
  const view = new DataView(ab);
  const writeStr = (offset: number, s: string) => { for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i)); };
  writeStr(0, 'RIFF'); view.setUint32(4, 36 + dataSize, true); writeStr(8, 'WAVE');
  writeStr(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true);
  view.setUint16(22, 1, true); view.setUint32(24, sampleRate, true); view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true); view.setUint16(34, 16, true);
  writeStr(36, 'data'); view.setUint32(40, dataSize, true);
  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const s = Math.max(-1, Math.min(1, data[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }
  return new Blob([ab], { type: 'audio/wav' });
}

async function trimAudioToSeconds(file: File, maxSeconds: number): Promise<File | null> {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return null;
    const ctx = new AudioCtx();
    const arrayBuffer = await file.arrayBuffer();
    const decoded = await ctx.decodeAudioData(arrayBuffer.slice(0));
    const sampleRate = decoded.sampleRate;
    const framesToKeep = Math.min(decoded.length, Math.floor(maxSeconds * sampleRate));
    const trimmed = ctx.createBuffer(1, framesToKeep, sampleRate);
    const out = trimmed.getChannelData(0);
    if (decoded.numberOfChannels > 1) {
      const ch0 = decoded.getChannelData(0);
      const ch1 = decoded.getChannelData(1);
      for (let i = 0; i < framesToKeep; i++) out[i] = (ch0[i] + ch1[i]) / 2;
    } else {
      out.set(decoded.getChannelData(0).subarray(0, framesToKeep));
    }
    ctx.close();
    const blob = encodeWav(trimmed);
    return new File([blob], file.name.replace(/\.[^.]+$/, '') + '-trimmed.wav', { type: 'audio/wav' });
  } catch {
    return null;
  }
}

// ── Diagnosis types + rendering (same shape as AI Mechanic) ────────

type UrgencyLevel = 'safe' | 'monitor' | 'urgent' | 'stop_driving';

interface DiagnosisResult {
  summary: string;
  urgency: UrgencyLevel;
  certainty: number;
  certainty_note: string;
  likely_causes: Array<{ cause: string; probability: 'high' | 'medium' | 'low'; explanation: string }>;
  next_steps_to_confirm: string[];
  recommended_actions: Array<{ action: string; priority: 'immediate' | 'soon' | 'when_convenient'; diy: boolean }>;
  parts_to_check: string[];
  estimated_repair_cost_usd: { min: number | null; max: number | null; note: string };
  disclaimer: string;
}

const URGENCY_CONFIG: Record<UrgencyLevel, { bg: string; text: string; icon: React.ReactNode; label: string }> = {
  safe:         { bg: 'bg-emerald-950/40', text: 'text-emerald-300', icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />, label: 'Safe to Drive' },
  monitor:      { bg: 'bg-amber-950/40',   text: 'text-amber-300',   icon: <AlertCircle className="h-4 w-4 text-amber-400" />, label: 'Monitor Closely' },
  urgent:       { bg: 'bg-orange-950/40',  text: 'text-orange-300',  icon: <AlertTriangle className="h-4 w-4 text-orange-400" />, label: 'See a Mechanic Soon' },
  stop_driving: { bg: 'bg-red-950/40',     text: 'text-red-300',     icon: <XCircle className="h-4 w-4 text-red-400" />, label: 'Stop Driving Immediately' },
};

const PROB_COLORS = { high: 'bg-red-900/50 text-red-300', medium: 'bg-amber-900/50 text-amber-300', low: 'bg-blue-900/50 text-blue-300' };
const PRIORITY_CONFIG = {
  immediate: { label: 'Do Now', cls: 'bg-red-500 text-white' },
  soon: { label: 'Do Soon', cls: 'bg-orange-500 text-white' },
  when_convenient: { label: 'When Free', cls: 'bg-emerald-500 text-white' },
};

function DiagnosisCard({ diagnosis }: { diagnosis: DiagnosisResult }) {
  const urg = URGENCY_CONFIG[diagnosis.urgency];
  const hasCost = !!(diagnosis.estimated_repair_cost_usd?.min || diagnosis.estimated_repair_cost_usd?.max);
  const costStr = hasCost
    ? (diagnosis.estimated_repair_cost_usd.min && diagnosis.estimated_repair_cost_usd.max
        ? '$' + diagnosis.estimated_repair_cost_usd.min.toLocaleString() + ' – $' + diagnosis.estimated_repair_cost_usd.max.toLocaleString()
        : diagnosis.estimated_repair_cost_usd.min
        ? 'From $' + diagnosis.estimated_repair_cost_usd.min.toLocaleString()
        : 'Up to $' + (diagnosis.estimated_repair_cost_usd.max?.toLocaleString() ?? ''))
    : null;
  const diyActions = (diagnosis.recommended_actions ?? []).filter(a => a.diy);
  const mechanicActions = (diagnosis.recommended_actions ?? []).filter(a => !a.diy);
  const allActions = [...diyActions, ...mechanicActions];

  return (
    <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200/20 bg-slate-800 overflow-hidden">
      <div className={`px-4 py-3 ${urg.bg}`} style={{ borderLeftWidth: 3, borderLeftColor: 'currentColor' }}>
        <div className="flex items-center gap-2 mb-1.5">
          {urg.icon}
          <span className={`text-xs font-black uppercase tracking-widest ${urg.text}`}>{urg.label}</span>
          {hasCost && costStr && <span className="ml-auto text-xs font-bold text-slate-300 bg-black/20 px-2.5 py-0.5 rounded-full">{costStr}</span>}
        </div>
        <p className="text-sm leading-relaxed text-slate-100">{diagnosis.summary}</p>
      </div>

      <div className="divide-y divide-slate-600/50">
        {diagnosis.likely_causes?.length > 0 && (
          <div className="px-4 py-3.5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">{diagnosis.likely_causes.length > 1 ? 'Possible causes' : 'Most likely cause'}</p>
            <div className="space-y-3">
              {diagnosis.likely_causes.map((c, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${PROB_COLORS[c.probability]}`}>{c.probability.charAt(0).toUpperCase() + c.probability.slice(1)}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-100 leading-snug">{c.cause}</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{c.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {allActions.length > 0 && (
          <div className="px-4 py-3.5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">What to do</p>
            <div className="space-y-2.5">
              {allActions.map((a, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${a.diy ? 'bg-emerald-500/20 text-emerald-400' : PRIORITY_CONFIG[a.priority].cls}`}>{a.diy ? 'DIY' : PRIORITY_CONFIG[a.priority].label}</span>
                  <p className="text-sm text-slate-200 leading-relaxed">{a.action}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {diagnosis.next_steps_to_confirm?.length > 0 && (
          <div className="px-4 py-3.5">
            <p className="text-xs font-bold text-amber-400/70 uppercase tracking-wide mb-3">For a better diagnosis, also try</p>
            <div className="space-y-2">
              {diagnosis.next_steps_to_confirm.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed"><span className="text-amber-400 font-bold flex-shrink-0 text-xs mt-0.5">{i + 1}.</span>{s}</div>
              ))}
            </div>
          </div>
        )}

        {diagnosis.parts_to_check?.length > 0 && (
          <div className="px-4 py-3.5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">Parts to inspect</p>
            <div className="flex flex-wrap gap-1.5">
              {diagnosis.parts_to_check.map((p, i) => <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-slate-600/60 text-slate-200 border border-slate-500">{p}</span>)}
            </div>
          </div>
        )}

        {hasCost && costStr && (
          <div className="px-4 py-3.5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Repair cost estimate</p>
            <p className="text-lg font-black text-slate-100">{costStr}</p>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{diagnosis.estimated_repair_cost_usd.note}</p>
          </div>
        )}

        <div className="px-4 py-3.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-400">Confidence</span>
            <span className="text-sm font-bold text-slate-100">{diagnosis.certainty}%</span>
          </div>
          <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden mb-1">
            <div className={`h-full rounded-full transition-all duration-700 ${diagnosis.certainty >= 75 ? 'bg-emerald-500' : diagnosis.certainty >= 50 ? 'bg-amber-400' : 'bg-orange-500'}`} style={{ width: diagnosis.certainty + '%' }} />
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{diagnosis.certainty_note}</p>
        </div>

        <div className="px-4 py-3 bg-slate-700/40 flex items-start gap-2">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400 leading-relaxed">
            AI-generated diagnosis based on the first {FREE_AUDIO_CAP_SECONDS} seconds of audio — it isn&apos;t always 100% accurate and can miss things a hands-on inspection would catch. Use it as a starting point, not a final answer. For brakes, steering, or fuel issues, stop driving and see a qualified mechanic regardless of what this says.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main tool ────────────────────────────────────────────────────

export default function EngineSoundAnalyzerClient() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioNotice, setAudioNotice] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const audioUrl = useMemo(() => (audioFile ? URL.createObjectURL(audioFile) : null), [audioFile]);

  const reset = () => {
    setAudioFile(null); setAudioNotice(null); setDescription('');
    setBrand(''); setModel(''); setYear(''); setDiagnosis(null); setError('');
  };

  const handleAudioSelected = async (f: File) => {
    setAudioNotice(null); setDiagnosis(null); setError('');
    try {
      const duration = await getAudioDuration(f);
      if (duration <= FREE_AUDIO_CAP_SECONDS) { setAudioFile(f); return; }
      const trimmed = await trimAudioToSeconds(f, FREE_AUDIO_CAP_SECONDS);
      if (trimmed) {
        setAudioFile(trimmed);
        setAudioNotice(`This clip is ${Math.round(duration)}s long — on the free tier we'll only analyse the first ${FREE_AUDIO_CAP_SECONDS}s. Longer clips are coming as a paid option.`);
      } else {
        setAudioFile(f);
        setAudioNotice(`This clip is ${Math.round(duration)}s long. We recommend trimming it to ${FREE_AUDIO_CAP_SECONDS}s or less before uploading.`);
      }
    } catch {
      setAudioFile(f);
    }
  };

  const onFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 20 * 1024 * 1024) { setError('Max file size 20MB.'); return; }
    handleAudioSelected(f);
    e.target.value = '';
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg';
      const recorder = new MediaRecorder(stream, { mimeType });
      recordingChunksRef.current = [];
      recorder.ondataavailable = e => { if (e.data.size > 0) recordingChunksRef.current.push(e.data); };
      recorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(recordingChunksRef.current, { type: mimeType });
        const ext = mimeType.includes('webm') ? 'webm' : 'ogg';
        const file = new File([blob], `recording-${Date.now()}.${ext}`, { type: mimeType });
        setAudioFile(file); setDiagnosis(null); setError('');
        setIsRecording(false); setRecordingSeconds(0);
        if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      };
      recorder.start(100);
      mediaRecorderRef.current = recorder;
      setIsRecording(true); setRecordingSeconds(0); setAudioNotice(null);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds(s => {
          const next = s + 1;
          if (next >= FREE_AUDIO_CAP_SECONDS) {
            stopRecording();
            setAudioNotice(`Recording capped at ${FREE_AUDIO_CAP_SECONDS}s on the free tier — that's usually enough for a clear sound sample. Longer clips are coming as a paid option.`);
          }
          return next;
        });
      }, 1000);
    } catch {
      setError('Microphone access denied. Please allow microphone access and try again.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') mediaRecorderRef.current.stop();
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
  };

  const handleAnalyze = async () => {
    if (!audioFile) return;
    setLoading(true); setError(''); setDiagnosis(null);
    try {
      const fd = new FormData();
      fd.append('audio', audioFile);
      if (description.trim()) fd.append('description', description.trim());
      if (brand) fd.append('brand', brand);
      if (model) fd.append('model', model);
      if (year) fd.append('year', year);

      const res = await fetch('/api/engine-sound-analyzer', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setDiagnosis(data.diagnosis);
    } catch (err: any) {
      setError(err.message || 'Failed to analyse. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-5">

      {!diagnosis && (
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <input ref={fileInputRef} type="file" accept="audio/*" className="hidden" onChange={onFilePicked} />

          {!audioFile ? (
            <div className="grid grid-cols-2 gap-3">
              {isRecording ? (
                <button onClick={stopRecording} className="col-span-2 flex items-center justify-center gap-2 h-14 rounded-xl border border-red-500/60 bg-red-500/10 text-red-500 font-bold animate-pulse">
                  <Square className="h-4 w-4 fill-current" /> Stop ({recordingSeconds}s)
                </button>
              ) : (
                <button onClick={startRecording} className="flex items-center justify-center gap-2 h-14 rounded-xl border border-border hover:border-emerald-500/50 hover:bg-emerald-500/5 font-semibold text-sm text-foreground transition-all">
                  <Mic className="h-4 w-4" /> Record sound
                </button>
              )}
              {!isRecording && (
                <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2 h-14 rounded-xl border border-border hover:border-emerald-500/50 hover:bg-emerald-500/5 font-semibold text-sm text-foreground transition-all">
                  <Upload className="h-4 w-4" /> Upload clip
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border">
                <audio controls src={audioUrl ?? undefined} className="flex-1 h-9" />
                <button onClick={() => { setAudioFile(null); setAudioNotice(null); }} className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"><X className="h-4 w-4" /></button>
              </div>

              {audioNotice && (
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/25">
                  <Lock className="h-3.5 w-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 dark:text-amber-200/90 leading-relaxed">{audioNotice}</p>
                </div>
              )}

              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Optional: when does it happen? (e.g. only on cold start, only when turning)"
                rows={2} className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-emerald-500/50 resize-none" />

              <div className="grid grid-cols-3 gap-2">
                <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="Brand (optional)" className="px-3 py-2 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-emerald-500/50" />
                <input value={model} onChange={e => setModel(e.target.value)} placeholder="Model" className="px-3 py-2 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-emerald-500/50" />
                <input value={year} onChange={e => setYear(e.target.value)} placeholder="Year" className="px-3 py-2 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-emerald-500/50" />
              </div>

              <button onClick={handleAnalyze} disabled={loading}
                className={`w-full flex items-center justify-center gap-2 h-12 rounded-xl font-bold text-sm transition-all ${loading ? 'bg-white/10 text-muted-foreground cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'}`}>
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Analysing sound...</> : <><Wrench className="h-4 w-4" /> Analyse this sound</>}
              </button>
            </div>
          )}

          <div className="flex items-start gap-1.5 pt-1">
            <Info className="h-3 w-3 text-muted-foreground/60 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-muted-foreground/70 leading-relaxed">Free tier analyses the first {FREE_AUDIO_CAP_SECONDS} seconds of any clip. AI diagnosis isn&apos;t always 100% accurate — treat it as a starting point, not a final answer. For brakes, steering, or fuel issues, stop driving and see a mechanic regardless of what this says.</p>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      )}

      {loading && !diagnosis && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-6">
          <Loader2 className="h-4 w-4 animate-spin" /> Listening to your recording...
        </div>
      )}

      {diagnosis && (
        <div className="space-y-4">
          <DiagnosisCard diagnosis={diagnosis} />
          <button onClick={reset} className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border border-border text-sm font-semibold text-foreground hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all">
            <RotateCcw className="h-3.5 w-3.5" /> Analyse another sound
          </button>
        </div>
      )}
    </div>
  );
}
