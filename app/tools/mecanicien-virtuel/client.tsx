'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Wrench, Mic, Video, Camera, AlertTriangle, CheckCircle2,
  AlertCircle, XCircle, ChevronRight, ArrowLeft,
  Loader2, X, Zap, Car, Gauge,
  Plus, Trash2, MessageSquare, Send, History,
  Check
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────

type UrgencyLevel = 'safe' | 'monitor' | 'urgent' | 'stop_driving';

interface DiagnosisResult {
  summary: string;
  urgency: UrgencyLevel;
  urgency_color: string;
  certainty: number;
  certainty_note: string;
  likely_causes: Array<{ cause: string; probability: 'high' | 'medium' | 'low'; explanation: string }>;
  what_i_observed: string[];
  next_steps_to_confirm: string[];
  recommended_actions: Array<{ action: string; priority: 'immediate' | 'soon' | 'when_convenient'; diy: boolean }>;
  parts_to_check: string[];
  estimated_repair_cost_usd: { min: number | null; max: number | null; note: string };
  disclaimer: string;
  model_used: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  media?: { type: 'image' | 'audio' | 'video'; name: string };
  diagnosis?: DiagnosisResult;
  timestamp: number;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  vehicle: VehicleProfile;
  createdAt: number;
  updatedAt: number;
}

interface VehicleProfile {
  brand: string;
  model: string;
  year: string;
}

// ── Constants ─────────────────────────────────────────────────────

const STORAGE_KEYS = {
  SESSIONS: 'ai_mechanic_sessions_fr',
  ACTIVE: 'ai_mechanic_active_fr',
  VEHICLE: 'ai_mechanic_vehicle_fr',
};

const NIGERIAN_BRANDS = [
  'Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Lexus', 'Nissan', 'Ford',
  'Hyundai', 'Kia', 'Volkswagen', 'Audi', 'Land Rover', 'Mazda', 'Peugeot',
  'Mitsubishi', 'Chevrolet', 'Subaru', 'Jeep', 'Volvo', 'Infiniti',
  'Acura', 'Porsche', 'Jaguar', 'Suzuki', 'Fiat', 'Renault', 'Opel',
  'MG', 'Chery', 'BYD', 'Haval', 'Innoson', 'Autre',
];

const URGENCY_CONFIG: Record<UrgencyLevel, {
  bg: string; border: string; text: string; badgeBg: string; icon: React.ReactNode; label: string;
}> = {
  safe:         { bg: 'bg-emerald-950/40', border: 'border-emerald-700', text: 'text-emerald-300', badgeBg: 'bg-emerald-500', icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />, label: 'Sûr de conduire' },
  monitor:      { bg: 'bg-amber-950/40',   border: 'border-amber-700',   text: 'text-amber-300',   badgeBg: 'bg-amber-500',   icon: <AlertCircle className="h-4 w-4 text-amber-400" />, label: 'À surveiller de près' },
  urgent:       { bg: 'bg-orange-950/40',  border: 'border-orange-700',  text: 'text-orange-300',  badgeBg: 'bg-orange-500',  icon: <AlertTriangle className="h-4 w-4 text-orange-400" />, label: 'Voir un mécanicien bientôt' },
  stop_driving: { bg: 'bg-red-950/40',     border: 'border-red-700',     text: 'text-red-300',     badgeBg: 'bg-red-600',     icon: <XCircle className="h-4 w-4 text-red-400" />, label: 'Arrêtez de conduire immédiatement' },
};

const PROB_COLORS = {
  high:   'bg-red-900/50 text-red-300',
  medium: 'bg-amber-900/50 text-amber-300',
  low:    'bg-blue-900/50 text-blue-300',
};

const PROB_LABELS: Record<'high' | 'medium' | 'low', string> = {
  high: 'Probabilité élevée',
  medium: 'Probabilité moyenne',
  low: 'Probabilité faible',
};

const PRIORITY_CONFIG = {
  immediate:       { label: 'Maintenant',  cls: 'bg-red-500 text-white' },
  soon:            { label: 'Bientôt',     cls: 'bg-orange-500 text-white' },
  when_convenient: { label: 'Sans urgence', cls: 'bg-emerald-500 text-white' },
};

// ── Helpers ───────────────────────────────────────────────────────

function uid() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }

function timeAgo(ts: number) {
  const d = Date.now() - ts;
  if (d < 60000) return "À l'instant";
  if (d < 3600000) return 'Il y a ' + Math.floor(d / 60000) + 'min';
  if (d < 86400000) return 'Il y a ' + Math.floor(d / 3600000) + 'h';
  return 'Il y a ' + Math.floor(d / 86400000) + 'j';
}

function blankSession(v: VehicleProfile): ChatSession {
  return { id: uid(), title: 'Nouvelle conversation', messages: [], vehicle: v, createdAt: Date.now(), updatedAt: Date.now() };
}

// ── Sub-components ────────────────────────────────────────────────

function CertaintyBar({ value, note }: { value: number; note: string }) {
  const color = value >= 75 ? 'bg-emerald-500' : value >= 50 ? 'bg-amber-400' : 'bg-orange-500';
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">Indice de confiance d'Axion</span>
        <span className="text-sm font-bold text-slate-100">{value}%</span>
      </div>
      <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: value + '%' }} />
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{note}</p>
    </div>
  );
}

function MediaPill({ icon, label, accept, file, onFile, onClear, maxMB }: {
  icon: React.ReactNode; label: string; accept: string;
  file: File | null; onFile: (f: File) => void; onClear: () => void; maxMB: number;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={ref} type="file" accept={accept} className="hidden"
        onChange={e => {
          const f = e.target.files?.[0];
          if (!f) return;
          if (f.size > maxMB * 1024 * 1024) { alert('Max ' + maxMB + 'Mo'); return; }
          onFile(f); e.target.value = '';
        }} />
      {file ? (
        <div className="flex items-center gap-1.5 pl-2.5 pr-2 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-medium max-w-[150px]">
          <Check className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{file.name}</span>
          <button onClick={onClear} className="flex-shrink-0 hover:text-red-400 transition-colors ml-0.5"><X className="h-3 w-3" /></button>
        </div>
      ) : (
        <button type="button" onClick={() => ref.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 text-xs font-medium text-white/40 transition-all">
          {icon}{label}
        </button>
      )}
    </>
  );
}

function AxionLoadingSteps() {
  const steps = ['Lecture de la description...', 'Analyse des schémas de pannes...', 'Estimation du coût de réparation...', 'Préparation du diagnostic...'];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timings = [900, 1800, 2900];
    const timers = timings.map((delay, i) => setTimeout(() => setActive(i + 1), delay));
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <div className="space-y-2 py-1">
      {steps.map((label, i) => {
        const done = i < active; const current = i === active;
        return (
          <div key={i} className={`flex items-center gap-2.5 transition-opacity duration-300 ${i > active ? 'opacity-25' : 'opacity-100'}`}>
            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${
              done ? 'bg-emerald-500 border-emerald-500' : current ? 'border-emerald-400 bg-emerald-500/20' : 'border-white/15 bg-transparent'
            }`}>
              {done ? <Check className="h-2.5 w-2.5 text-white" /> : current ? <Loader2 className="h-2.5 w-2.5 animate-spin text-emerald-400" /> : null}
            </div>
            <span className={`text-xs leading-none transition-colors duration-300 ${done ? 'text-slate-600 line-through' : current ? 'text-emerald-400 font-medium' : 'text-slate-600'}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function DiagnosisCard({ diagnosis }: { diagnosis: DiagnosisResult }) {
  const urg = URGENCY_CONFIG[diagnosis.urgency];
  const hasCost = !!(diagnosis.estimated_repair_cost_usd?.min || diagnosis.estimated_repair_cost_usd?.max);
  const costStr = hasCost
    ? (diagnosis.estimated_repair_cost_usd.min && diagnosis.estimated_repair_cost_usd.max
        ? '$' + diagnosis.estimated_repair_cost_usd.min.toLocaleString() + ' – $' + diagnosis.estimated_repair_cost_usd.max.toLocaleString()
        : diagnosis.estimated_repair_cost_usd.min
        ? 'À partir de $' + diagnosis.estimated_repair_cost_usd.min.toLocaleString()
        : "Jusqu'à $" + (diagnosis.estimated_repair_cost_usd.max?.toLocaleString() ?? ''))
    : null;
  const diyActions = (diagnosis.recommended_actions ?? []).filter(a => a.diy);
  const mechanicActions = (diagnosis.recommended_actions ?? []).filter(a => !a.diy);
  const allActions = [...diyActions, ...mechanicActions];

  return (
    <div className="mt-1 max-w-2xl rounded-2xl border border-slate-200/20 bg-slate-800 overflow-hidden">

      {/* Urgency header */}
      <div className={`px-4 py-3 border-b ${urg.bg} ${urg.border} border-b-0`} style={{ borderLeftWidth: 3 }}>
        <div className="flex items-center gap-2 mb-1.5">
          {urg.icon}
          <span className={`text-xs font-black uppercase tracking-widest ${urg.text}`}>{urg.label}</span>
          {hasCost && costStr && (
            <span className="ml-auto text-xs font-bold text-slate-300 bg-black/20 px-2.5 py-0.5 rounded-full">{costStr}</span>
          )}
        </div>
        <p className="text-sm leading-relaxed text-slate-100">{diagnosis.summary}</p>
      </div>

      <div className="divide-y divide-slate-600/50">

        {/* Likely causes */}
        {diagnosis.likely_causes?.length > 0 && (
          <div className="px-4 py-3.5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
              {diagnosis.likely_causes.length > 1 ? 'Causes probables' : 'Cause la plus probable'}
            </p>
            <div className="space-y-3">
              {diagnosis.likely_causes.map((c, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 mt-0.5 whitespace-nowrap ${PROB_COLORS[c.probability]}`}>
                    {PROB_LABELS[c.probability] ?? c.probability}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-100 leading-snug">{c.cause}</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{c.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What to do */}
        {allActions.length > 0 && (
          <div className="px-4 py-3.5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Que faire</p>
            <div className="space-y-2.5">
              {allActions.map((a, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 mt-0.5 whitespace-nowrap ${
                    a.diy ? 'bg-emerald-500/20 text-emerald-400' : PRIORITY_CONFIG[a.priority].cls
                  }`}>
                    {a.diy ? 'Vous pouvez le faire vous-même' : PRIORITY_CONFIG[a.priority].label}
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">{a.action}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next steps to confirm */}
        {diagnosis.next_steps_to_confirm?.length > 0 && (
          <div className="px-4 py-3.5">
            <p className="text-xs font-bold text-amber-400/70 uppercase tracking-wide mb-3">Pour un diagnostic plus précis, essayez aussi</p>
            <div className="space-y-2">
              {diagnosis.next_steps_to_confirm.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed">
                  <span className="text-amber-400 font-bold flex-shrink-0 text-xs mt-0.5">{i + 1}.</span>{s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Parts to inspect */}
        {diagnosis.parts_to_check?.length > 0 && (
          <div className="px-4 py-3.5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">Pièces à vérifier</p>
            <div className="flex flex-wrap gap-1.5">
              {diagnosis.parts_to_check.map((p, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-slate-600/60 text-slate-200 border border-slate-500">{p}</span>
              ))}
            </div>
          </div>
        )}

        {/* Repair cost */}
        {hasCost && costStr && (
          <div className="px-4 py-3.5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Coût de réparation estimé</p>
            <p className="text-lg font-black text-slate-100">{costStr}</p>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{diagnosis.estimated_repair_cost_usd.note}</p>
          </div>
        )}

        {/* Trust score — bottom */}
        <div className="px-4 py-3.5">
          <CertaintyBar value={diagnosis.certainty} note={diagnosis.certainty_note} />
        </div>

        {/* Disclaimer */}
        <div className="px-4 py-3 bg-slate-700/40">
          <p className="text-xs text-slate-500 leading-relaxed">Ceci est un diagnostic assisté par IA. Utilisez-le comme point de départ, et confirmez toujours avec un professionnel qualifié avant toute réparation, surtout pour les freins, la direction ou le carburant.</p>
        </div>

      </div>
    </div>
  );
}

function ChatBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-1" title="Axion">
          <Wrench className="h-3.5 w-3.5 text-emerald-400" />
        </div>
      )}
      <div className={`${isUser ? 'max-w-xs' : 'flex-1 max-w-2xl'} flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1`}>
        {isUser ? (
          <div className="bg-emerald-500/20 border border-emerald-500/25 text-white rounded-2xl rounded-tr-sm px-3.5 py-2.5">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            {msg.media && (
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-emerald-400/70">
                {msg.media.type === 'image' && <Camera className="h-3 w-3" />}
                {msg.media.type === 'audio' && <Mic className="h-3 w-3" />}
                {msg.media.type === 'video' && <Video className="h-3 w-3" />}
                <span className="truncate">{msg.media.name}</span>
              </div>
            )}
          </div>
        ) : (
          <>
            {msg.text && !msg.diagnosis && (
              <div className="bg-slate-800 border border-slate-700 text-slate-100 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            )}
            {msg.diagnosis && <DiagnosisCard diagnosis={msg.diagnosis} />}
          </>
        )}
        <p className="text-xs text-slate-600">{timeAgo(msg.timestamp)}</p>
      </div>
    </div>
  );
}

// ── Main Client Component ─────────────────────────────────────────

export default function AIMechanicClientFR() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState<VehicleProfile>({ brand: '', model: '', year: '' });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeSession = sessions.find(s => s.id === activeId) ?? null;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      const saved: ChatSession[] = raw ? JSON.parse(raw) : [];
      const savedV = localStorage.getItem(STORAGE_KEYS.VEHICLE);
      const veh: VehicleProfile = savedV ? JSON.parse(savedV) : { brand: '', model: '', year: '' };
      const lastId = localStorage.getItem(STORAGE_KEYS.ACTIVE);
      setVehicle(veh);
      if (saved.length > 0) {
        setSessions(saved);
        setActiveId(lastId && saved.find(s => s.id === lastId) ? lastId : saved[0].id);
      } else {
        const s = blankSession(veh);
        setSessions([s]);
        setActiveId(s.id);
      }
    } catch {
      const s = blankSession({ brand: '', model: '', year: '' });
      setSessions([s]);
      setActiveId(s.id);
    }
  }, []);

  // Hide bottom nav
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'hide-bottom-nav';
    style.textContent = `
      nav[class*="fixed"][class*="bottom-0"] { display: none !important; }
      [class*="bottom-nav"] { display: none !important; }
      nav.fixed.bottom-0 { display: none !important; }
      body { padding-bottom: 0 !important; }
    `;
    document.head.appendChild(style);
    return () => { document.getElementById('hide-bottom-nav')?.remove(); };
  }, []);

  const persist = useCallback((updated: ChatSession[]) => {
    setSessions(updated);
    try { localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated)); } catch {}
  }, []);

  const persistVehicle = useCallback((v: VehicleProfile) => {
    setVehicle(v);
    setError('');
    try { localStorage.setItem(STORAGE_KEYS.VEHICLE, JSON.stringify(v)); } catch {}
  }, []);

  const setActive = useCallback((id: string) => {
    setActiveId(id);
    try { localStorage.setItem(STORAGE_KEYS.ACTIVE, id); } catch {}
  }, []);

  const startNewChat = () => {
    const existingEmpty = sessions.find(s => s.messages.length === 0);
    if (existingEmpty) { setActive(existingEmpty.id); }
    else {
      const s = blankSession(vehicle);
      setSessions(prev => [s, ...prev]);
      setActiveId(s.id);
    }
    setSidebarOpen(false);
    setText(''); setImageFile(null); setAudioFile(null); setVideoFile(null); setError('');
  };

  const deleteSession = (id: string) => {
    const updated = sessions.filter(s => s.id !== id);
    if (updated.length === 0) {
      const fresh = blankSession(vehicle);
      persist([fresh]); setActive(fresh.id);
    } else {
      persist(updated);
      if (activeId === id) setActive(updated[0].id);
    }
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
        setAudioFile(file);
        setIsRecording(false);
        setRecordingSeconds(0);
        if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      };
      recorder.start(100);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => setRecordingSeconds(s => s + 1), 1000);
    } catch {
      alert("Accès au microphone refusé. Autorisez l'accès et réessayez.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
  };

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed && !imageFile && !audioFile && !videoFile) return;
    if (!activeSession) return;

    const userMsg: ChatMessage = {
      id: uid(), role: 'user', text: trimmed,
      media: imageFile ? { type: 'image', name: imageFile.name }
        : audioFile ? { type: 'audio', name: audioFile.name }
        : videoFile ? { type: 'video', name: videoFile.name } : undefined,
      timestamp: Date.now(),
    };

    const isFirst = activeSession.messages.length === 0;
    const title = isFirst ? (trimmed.slice(0, 52) || 'Diagnostic multimédia') : activeSession.title;
    const withUser: ChatSession = { ...activeSession, title, messages: [...activeSession.messages, userMsg], updatedAt: Date.now() };
    persist(sessions.map(s => s.id === activeId ? withUser : s));

    setText(''); setImageFile(null); setAudioFile(null); setVideoFile(null);
    setLoading(true); setError('');

    try {
      const fd = new FormData();
      if (trimmed) fd.append('description', trimmed);
      if (vehicle.brand) fd.append('brand', vehicle.brand);
      if (vehicle.model) fd.append('model', vehicle.model);
      if (vehicle.year) fd.append('year', vehicle.year);
      fd.append('language', 'fr');
      if (imageFile) fd.append('image', imageFile);
      if (audioFile) fd.append('audio', audioFile);
      if (videoFile) fd.append('video', videoFile);

      const ctx = withUser.messages.filter(m => m.role === 'assistant').slice(-5).map(m => m.text).filter(Boolean);
      if (ctx.length > 0) fd.append('context', JSON.stringify(ctx));

      const res = await fetch('/api/ai-mechanic', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Une erreur s'est produite");

      const diag: DiagnosisResult = data.diagnosis;
      const aiMsg: ChatMessage = { id: uid(), role: 'assistant', text: diag.summary, diagnosis: diag, timestamp: Date.now() };
      const withAI: ChatSession = { ...withUser, messages: [...withUser.messages, aiMsg], updatedAt: Date.now() };
      persist(sessions.map(s => s.id === activeId ? withAI : s));
    } catch (err: any) {
      setError(err.message || "Impossible d'analyser. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };

  const hasInput = !!(text.trim() || imageFile || audioFile || videoFile);
  const vehicleSummary = [vehicle.year, vehicle.brand, vehicle.model].filter(Boolean).join(' ');
  const hasMessages = !!(activeSession?.messages.length);

  const showImageUpload = !audioFile && !videoFile;
  const showAudioUpload = !imageFile && !videoFile;
  const showVideoUpload = !imageFile && !audioFile;

  const dropdownArrowSvg = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")";

  return (
    <div
      id="axion-chat"
      className="relative bg-[#080C10] overflow-hidden"
      style={{ backgroundImage: "url('/ai-mechanic-hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center right', backgroundRepeat: 'no-repeat' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#080C10] via-[#080C10]/90 to-[#080C10]/60 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-16">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/outils" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Retour aux outils">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <nav className="flex items-center gap-1.5 text-xs text-white/30">
            <Link href="/accueil" className="hover:text-white/60 transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/outils" className="hover:text-white/60 transition-colors">Outils</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/50">Mécanicien IA</span>
          </nav>
          <div className="flex items-center gap-3 ml-auto">
            <Link href="/tools/ai-mechanic" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              Read in English →
            </Link>
            <Link href="/tools/mecanico-virtual" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              Leer en Español →
            </Link>
            <Link href="/tools/ai-mechanic-arabic" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              → بالعربية
            </Link>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-5 items-start">

          {/* Sidebar overlay (mobile) */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/70 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Sidebar */}
          <aside className={[
            'fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-64 flex-shrink-0',
            'flex flex-col bg-[#0D1117] border border-white/10 rounded-2xl',
            'shadow-2xl lg:shadow-none',
            'transition-transform duration-300 lg:translate-x-0 lg:self-start lg:sticky lg:top-6',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          ].join(' ')} style={{ minHeight: '520px' }}>

            <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center">
                  <Wrench className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <span className="text-sm font-bold text-white">Axion — Conversations</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/30 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-2.5 border-b border-white/10">
              <button onClick={startNewChat}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/25 transition-colors">
                <Plus className="h-3.5 w-3.5" /> Nouvelle conversation
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2 px-2">
              {sessions.filter(s => s.messages.length > 0).length === 0 ? (
                <p className="text-xs text-white/20 text-center py-8 px-3">Aucune conversation pour le moment</p>
              ) : sessions.filter(s => s.messages.length > 0).map((s, idx) => {
                const prevDate = idx > 0 ? new Date(sessions[idx - 1].updatedAt).toDateString() : null;
                const thisDate = new Date(s.updatedAt).toDateString();
                const showLabel = thisDate !== prevDate;
                const today = new Date().toDateString();
                const label = thisDate === today ? "Aujourd'hui"
                  : new Date(s.updatedAt) > new Date(Date.now() - 86400000 * 2) ? 'Hier'
                  : new Date(s.updatedAt).toLocaleDateString();
                return (
                  <div key={s.id}>
                    {showLabel && <div className="text-xs font-semibold text-white/20 uppercase tracking-widest px-2 py-1.5 mt-1">{label}</div>}
                    <div onClick={() => { setActive(s.id); setSidebarOpen(false); }}
                      className={`group flex items-start gap-2 px-2.5 py-2 rounded-lg cursor-pointer transition-colors ${
                        s.id === activeId ? 'bg-emerald-500/10 border border-emerald-500/20' : 'hover:bg-white/5'
                      }`}>
                      <MessageSquare className={`h-3.5 w-3.5 flex-shrink-0 mt-0.5 ${s.id === activeId ? 'text-emerald-400' : 'text-white/20'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white/80 truncate">{s.title}</p>
                        <p className="text-xs text-white/25 mt-0.5">{s.messages.length} msgs · {timeAgo(s.updatedAt)}</p>
                      </div>
                      <button onClick={e => { e.stopPropagation(); deleteSession(s.id); }}
                        className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-all">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-4 py-3 border-t border-white/10">
              <p className="text-xs text-white/20">Enregistré sur cet appareil.</p>
              <button onClick={() => {
                if (confirm("Supprimer tout l'historique des conversations ?")) {
                  const s = blankSession(vehicle);
                  persist([s]); setActive(s.id);
                }
              }} className="text-xs text-red-400/40 hover:text-red-400 mt-1 transition-colors">
                Effacer l'historique
              </button>
            </div>
          </aside>

          {/* Right column */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* Hero header */}
            <div>
              <h1 className="font-black leading-tight tracking-tight text-white mb-2"
                style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(26px, 4vw, 50px)' }}>
                Bonjour, je suis Axion 👋 votre mécanicien IA.
              </h1>
              <p className="text-white/70 text-xl sm:text-2xl font-semibold leading-snug mb-4 max-w-xl">
                Qu'est-ce qui ne va pas avec votre voiture ?
              </p>

              {!hasMessages && (
                <details className="mt-3 mb-5 group">
                  <summary className="flex items-center gap-2 cursor-pointer list-none text-xs text-white/40 hover:text-white/60 transition-colors w-fit">
                    <ChevronRight className="h-3.5 w-3.5 group-open:rotate-90 transition-transform" />
                    <span className="font-semibold uppercase tracking-wide">Comment ça marche</span>
                  </summary>
                  <div className="flex flex-col sm:flex-row gap-3 mt-3">
                    {[
                      { num: '1', text: 'Décrivez, enregistrez ou filmez le problème de votre voiture — chaque détail aide.' },
                      { num: '2', text: 'Téléchargez ou décrivez le problème dans le champ ci-dessous.' },
                      { num: '3', text: 'Obtenez un diagnostic instantané, un coût estimé et les prochaines étapes.' },
                    ].map(({ num, text: t }) => (
                      <div key={num} className="flex items-start gap-2.5 flex-1">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center mt-0.5">{num}</span>
                        <p className="text-xs text-white/60 leading-relaxed">{t}</p>
                      </div>
                    ))}
                  </div>
                </details>
              )}

              {/* Mobile history + new chat buttons */}
              <div className="flex items-center justify-between mb-1 lg:hidden">
                <button onClick={() => setSidebarOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white text-xs font-medium transition-all">
                  <History className="h-3.5 w-3.5" />
                  Conversations précédentes
                  {sessions.filter(s => s.messages.length > 0).length > 0 && (
                    <span className="bg-emerald-500/30 text-emerald-400 text-xs px-1.5 py-0.5 rounded-full font-bold">
                      {sessions.filter(s => s.messages.length > 0).length}
                    </span>
                  )}
                </button>
                <button onClick={startNewChat}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/25 transition-colors">
                  <Plus className="h-3.5 w-3.5" /> Nouvelle conversation
                </button>
              </div>
            </div>

            {/* Initial input form */}
            {!hasMessages && (
              <div>
                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-xl border border-red-500/30 bg-red-500/10 mb-3">
                    <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-300">{error}</p>
                  </div>
                )}
                <div className="flex gap-2 mb-1.5">
                  <div className="relative flex-1 min-w-0">
                    <select value={vehicle.brand} onChange={e => persistVehicle({ ...vehicle, brand: e.target.value })}
                      className={`w-full h-12 pl-3 pr-8 text-sm border rounded-xl bg-white/10 text-white/90 focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer ${!vehicle.brand ? 'border-white/20' : 'border-emerald-500/40'}`}
                      style={{ backgroundImage: dropdownArrowSvg, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
                      <option value="" style={{ background: '#080C10' }}>Marque (facultatif)</option>
                      {NIGERIAN_BRANDS.map(b => <option key={b} value={b} style={{ background: '#080C10' }}>{b}</option>)}
                    </select>
                  </div>
                  <input type="text" placeholder="Modèle (facultatif)" value={vehicle.model}
                    onChange={e => persistVehicle({ ...vehicle, model: e.target.value })}
                    className={`flex-1 min-w-0 h-12 px-3 text-sm border rounded-xl bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 transition-all ${vehicle.model ? 'border-emerald-500/40' : 'border-white/20'}`} />
                  <input type="number" placeholder="Année" value={vehicle.year}
                    onChange={e => persistVehicle({ ...vehicle, year: e.target.value })}
                    min="1980" max={new Date().getFullYear() + 1}
                    className={`w-28 h-12 px-3 text-sm border rounded-xl bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 transition-all ${vehicle.year ? 'border-emerald-500/40' : 'border-white/20'}`} />
                </div>
                <p className="text-xs text-white/30 mb-2">Facultatif, mais plus Axion en sait sur votre voiture, plus le diagnostic sera précis.</p>

                <div className="border border-white/20 rounded-xl bg-white/10 overflow-hidden focus-within:border-emerald-500/50 transition-all">
                  <textarea value={text} onChange={e => setText(e.target.value)} onKeyDown={handleKey}
                    placeholder="Décrivez le problème de votre voiture... ex. cliquetis au démarrage à froid, voyant moteur allumé, freins mous"
                    rows={3}
                    className="w-full px-4 pt-3 pb-2 text-sm bg-transparent text-white placeholder:text-white/40 focus:outline-none resize-none leading-relaxed" />
                  <div className="flex items-center gap-2 px-3 pb-2 pt-1.5 border-t border-white/20 flex-wrap">
                    {showImageUpload && <MediaPill icon={<Camera className="h-3 w-3" />} label="Photo" accept="image/*" file={imageFile} onFile={setImageFile} onClear={() => setImageFile(null)} maxMB={10} />}
                    {showAudioUpload && <MediaPill icon={<Mic className="h-3 w-3" />} label="Son" accept="audio/*" file={audioFile} onFile={setAudioFile} onClear={() => setAudioFile(null)} maxMB={20} />}
                    {showVideoUpload && <MediaPill icon={<Video className="h-3 w-3" />} label="Vidéo" accept="video/*" file={videoFile} onFile={setVideoFile} onClear={() => setVideoFile(null)} maxMB={50} />}
                    {/* Record button */}
                    {showAudioUpload && !audioFile && (
                      isRecording ? (
                        <button type="button" onClick={stopRecording}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-500/60 bg-red-500/20 text-red-400 text-xs font-medium animate-pulse transition-all">
                          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                          {recordingSeconds}s — Arrêter
                        </button>
                      ) : (
                        <button type="button" onClick={startRecording}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 text-xs font-medium text-white/40 transition-all">
                          <Mic className="h-3 w-3" /> Enregistrer
                        </button>
                      )
                    )}
                  </div>
                  <div className="px-3 pb-3">
                    <button onClick={handleSubmit} disabled={!hasInput || loading}
                      className={`w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        hasInput && !loading ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/25' : 'bg-white/10 text-white/25 cursor-not-allowed'
                      }`}>
                      {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Analyse en cours...</> : <><Wrench className="h-4 w-4" /> Diagnostiquer</>}
                    </button>
                  </div>
                </div>

                {vehicleSummary && (
                  <p className="text-xs text-white/25 mt-2 flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-emerald-500" /> Véhicule enregistré sur cet appareil
                  </p>
                )}
              </div>
            )}

            {/* Chat window */}
            {(hasMessages || loading || !!error) && (
              <div className="bg-[#0D1117]/80 border border-white/10 rounded-2xl overflow-hidden flex flex-col backdrop-blur-sm"
                style={{ maxHeight: '60vh', minHeight: '200px' }}>
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  {activeSession?.messages.map(msg => <ChatBubble key={msg.id} msg={msg} />)}
                  {loading && (
                    <div className="flex gap-2 mb-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                        <Wrench className="h-3.5 w-3.5 text-emerald-400" />
                      </div>
                      <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 min-w-[220px]">
                        <AxionLoadingSteps />
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="flex items-start gap-2 p-3 rounded-xl border border-red-500/30 bg-red-500/10 mb-3">
                      <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-red-300">{error}</p>
                    </div>
                  )}
                </div>

                {/* Follow-up bar */}
                <div className="border-t border-white/10 bg-[#080C10]/80 px-3 py-2.5">
                  <div className="flex gap-2 items-center">
                    <textarea value={text} onChange={e => setText(e.target.value)} onKeyDown={handleKey}
                      placeholder="Posez une question de suivi... (Entrée pour envoyer)" rows={1}
                      className="flex-1 resize-none px-3 py-2 text-sm border border-white/10 rounded-xl bg-white/5 text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-500/40 transition-all leading-relaxed" />
                    <button onClick={handleSubmit} disabled={!hasInput || loading}
                      className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        hasInput && !loading ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-md shadow-emerald-500/20' : 'bg-white/5 text-white/20 cursor-not-allowed'
                      }`}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-2 flex-wrap">
                      {showImageUpload && <MediaPill icon={<Camera className="h-3 w-3" />} label="Photo" accept="image/*" file={imageFile} onFile={setImageFile} onClear={() => setImageFile(null)} maxMB={10} />}
                      {showAudioUpload && <MediaPill icon={<Mic className="h-3 w-3" />} label="Son" accept="audio/*" file={audioFile} onFile={setAudioFile} onClear={() => setAudioFile(null)} maxMB={20} />}
                      {showVideoUpload && <MediaPill icon={<Video className="h-3 w-3" />} label="Vidéo" accept="video/*" file={videoFile} onFile={setVideoFile} onClear={() => setVideoFile(null)} maxMB={50} />}
                      {showAudioUpload && !audioFile && (
                        isRecording ? (
                          <button type="button" onClick={stopRecording}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-500/60 bg-red-500/20 text-red-400 text-xs font-medium animate-pulse transition-all">
                            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                            {recordingSeconds}s — Arrêter
                          </button>
                        ) : (
                          <button type="button" onClick={startRecording}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 text-xs font-medium text-white/40 transition-all">
                            <Mic className="h-3 w-3" /> Enregistrer
                          </button>
                        )
                      )}
                    </div>
                    <button onClick={startNewChat} className="flex items-center gap-1 text-xs text-white/25 hover:text-emerald-400 transition-colors">
                      <Plus className="h-3 w-3" /> Nouvelle conversation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!hasMessages && (
              <div className="hidden lg:flex items-center justify-end">
                <button onClick={startNewChat} className="flex items-center gap-1.5 text-xs text-white/25 hover:text-emerald-400 transition-colors">
                  <Plus className="h-3 w-3" /> Démarrer une nouvelle conversation
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
