'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Wrench, Mic, Video, Camera, AlertTriangle, CheckCircle2,
  AlertCircle, XCircle, ChevronRight, ChevronDown,
  Loader2, X, Zap, Car, Gauge,
  Plus, Trash2, MessageSquare, Send, History,
  Check, ArrowLeft
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

type UrgencyLevel = 'safe' | 'monitor' | 'urgent' | 'stop_driving';

interface DiagnosisResult {
  summary: string;
  urgency: UrgencyLevel;
  urgency_label: string;
  urgency_color: string;
  certainty: number;
  certainty_note: string;
  likely_causes: Array<{ cause: string; probability: 'high' | 'medium' | 'low'; explanation: string }>;
  what_i_observed: string[];
  next_steps_to_confirm: string[];
  recommended_actions: Array<{ action: string; priority: 'immediate' | 'soon' | 'when_convenient'; diy: boolean }>;
  parts_to_check: string[];
  estimated_repair_cost_ngn: { min: number | null; max: number | null; note: string };
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

// ── Constants ─────────────────────────────────────────────────────────────────

const STORAGE_KEYS = {
  SESSIONS: 'ai_mechanic_sessions',
  ACTIVE: 'ai_mechanic_active',
  VEHICLE: 'ai_mechanic_vehicle',
};

const NIGERIAN_BRANDS = [
  'Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Lexus', 'Nissan', 'Ford',
  'Hyundai', 'Kia', 'Volkswagen', 'Audi', 'Land Rover', 'Mazda', 'Peugeot',
  'Mitsubishi', 'Chevrolet', 'Subaru', 'Jeep', 'Volvo', 'Infiniti',
  'Acura', 'Porsche', 'Jaguar', 'Suzuki', 'Fiat', 'Renault', 'Opel',
  'MG', 'Chery', 'BYD', 'Haval', 'Innoson', 'Other',
];

const URGENCY_CONFIG: Record<UrgencyLevel, {
  bg: string; border: string; text: string; badgeBg: string; icon: React.ReactNode;
}> = {
  safe:         { bg: 'bg-emerald-950/40', border: 'border-emerald-700', text: 'text-emerald-300', badgeBg: 'bg-emerald-500', icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" /> },
  monitor:      { bg: 'bg-amber-950/40',   border: 'border-amber-700',   text: 'text-amber-300',   badgeBg: 'bg-amber-500',   icon: <AlertCircle className="h-4 w-4 text-amber-400" /> },
  urgent:       { bg: 'bg-orange-950/40',  border: 'border-orange-700',  text: 'text-orange-300',  badgeBg: 'bg-orange-500',  icon: <AlertTriangle className="h-4 w-4 text-orange-400" /> },
  stop_driving: { bg: 'bg-red-950/40',     border: 'border-red-700',     text: 'text-red-300',     badgeBg: 'bg-red-600',     icon: <XCircle className="h-4 w-4 text-red-400" /> },
};

const PROB_COLORS = {
  high:   'bg-red-900/50 text-red-300',
  medium: 'bg-amber-900/50 text-amber-300',
  low:    'bg-blue-900/50 text-blue-300',
};

const PRIORITY_CONFIG = {
  immediate:       { label: 'Do Now',    cls: 'bg-red-500 text-white' },
  soon:            { label: 'Do Soon',   cls: 'bg-orange-500 text-white' },
  when_convenient: { label: 'When Free', cls: 'bg-emerald-500 text-white' },
};

const SCHEMA_JSON = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://nairaautos.com/tools/ai-mechanic',
      name: 'AI Mechanic — Free Car Diagnostic Tool Nigeria',
      description: 'Get instant AI-powered vehicle diagnostics in Nigeria.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can AI diagnose my car from engine sound?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Upload an audio recording and the AI analyses it.' } },
        { '@type': 'Question', name: 'Is this free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Completely free — no login required.' } },
      ],
    },
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function uid() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }

function timeAgo(ts: number) {
  const d = Date.now() - ts;
  if (d < 60000) return 'Just now';
  if (d < 3600000) return Math.floor(d / 60000) + 'm ago';
  if (d < 86400000) return Math.floor(d / 3600000) + 'h ago';
  return Math.floor(d / 86400000) + 'd ago';
}

function blankSession(v: VehicleProfile): ChatSession {
  return { id: uid(), title: 'New conversation', messages: [], vehicle: v, createdAt: Date.now(), updatedAt: Date.now() };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CertaintyBar({ value, note }: { value: number; note: string }) {
  const color = value >= 75 ? 'bg-emerald-500' : value >= 50 ? 'bg-amber-400' : 'bg-orange-500';
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-white/50">Axion's confidence</span>
        <span className="text-base font-bold text-white">{value}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: value + '%' }} />
      </div>
      <p className="text-xs text-white/40 leading-relaxed">{note}</p>
    </div>
  );
}

function MediaPill({ icon, label, accept, file, onFile, onClear, maxMB }: {
  icon: React.ReactNode;
  label: string;
  accept: string;
  file: File | null;
  onFile: (f: File) => void;
  onClear: () => void;
  maxMB: number;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept={accept}
        className="hidden"
        onChange={e => {
          const f = e.target.files?.[0];
          if (!f) return;
          if (f.size > maxMB * 1024 * 1024) { alert('Max ' + maxMB + 'MB'); return; }
          onFile(f);
          e.target.value = '';
        }}
      />
      {file ? (
        <div className="flex items-center gap-1.5 pl-2.5 pr-2 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-medium max-w-[150px]">
          <Check className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{file.name}</span>
          <button onClick={onClear} className="flex-shrink-0 hover:text-red-400 transition-colors ml-0.5">
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 text-xs font-medium text-white/40 transition-all"
        >
          {icon}
          {label}
        </button>
      )}
    </>
  );
}

// ── Axion loading animation ────────────────────────────────────────────────────

function AxionLoadingSteps() {
  const steps = [
    'Reading your description...',
    'Checking fault patterns...',
    'Estimating repair costs...',
    'Preparing your diagnosis...',
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timings = [900, 1800, 2900];
    const timers = timings.map((delay, i) =>
      setTimeout(() => setActive(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="space-y-2 py-1">
      {steps.map((label, i) => {
        const done = i < active;
        const current = i === active;
        return (
          <div
            key={i}
            className={`flex items-center gap-2.5 transition-opacity duration-300 ${i > active ? 'opacity-25' : 'opacity-100'}`}
          >
            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${
              done
                ? 'bg-emerald-500 border-emerald-500'
                : current
                ? 'border-emerald-400 bg-emerald-500/20'
                : 'border-white/15 bg-transparent'
            }`}>
              {done
                ? <Check className="h-2.5 w-2.5 text-white" />
                : current
                ? <Loader2 className="h-2.5 w-2.5 animate-spin text-emerald-400" />
                : null
              }
            </div>
            <span className={`text-xs leading-none transition-colors duration-300 ${
              done ? 'text-white/40 line-through' : current ? 'text-emerald-300 font-medium' : 'text-white/25'
            }`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Diagnosis Card ────────────────────────────────────────────────────────────

function DiagnosisCard({ diagnosis }: { diagnosis: DiagnosisResult }) {
  const urg = URGENCY_CONFIG[diagnosis.urgency];
  const hasCost = !!(diagnosis.estimated_repair_cost_ngn?.min || diagnosis.estimated_repair_cost_ngn?.max);
  const costStr = hasCost
    ? (diagnosis.estimated_repair_cost_ngn.min && diagnosis.estimated_repair_cost_ngn.max
        ? '₦' + diagnosis.estimated_repair_cost_ngn.min.toLocaleString() + ' – ₦' + diagnosis.estimated_repair_cost_ngn.max.toLocaleString()
        : diagnosis.estimated_repair_cost_ngn.min
        ? 'From ₦' + diagnosis.estimated_repair_cost_ngn.min.toLocaleString()
        : 'Up to ₦' + (diagnosis.estimated_repair_cost_ngn.max?.toLocaleString() ?? ''))
    : null;

  const diyActions = (diagnosis.recommended_actions ?? []).filter(a => a.diy);
  const mechanicActions = (diagnosis.recommended_actions ?? []).filter(a => !a.diy);
  const allActions = [...diyActions, ...mechanicActions];

  return (
    <div className="space-y-2 mt-1 max-w-2xl">

      {/* URGENCY BANNER */}
      <div className={`rounded-xl border-2 p-4 ${urg.bg} ${urg.border}`}>
        <div className="flex items-center gap-2 mb-2">
          {urg.icon}
          <span className={`text-sm font-black uppercase tracking-wide ${urg.text}`}>{diagnosis.urgency_label}</span>
          {hasCost && costStr && (
            <span className="ml-auto text-xs font-bold text-white/70 bg-white/10 px-2.5 py-0.5 rounded-full">{costStr}</span>
          )}
        </div>
        <p className={`text-sm leading-relaxed font-medium ${urg.text}`}>{diagnosis.summary}</p>
      </div>

      {/* CONFIDENCE BAR — always visible */}
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <CertaintyBar value={diagnosis.certainty} note={diagnosis.certainty_note} />
      </div>

      {/* LIKELY CAUSES — compact */}
      {diagnosis.likely_causes?.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 space-y-2">
          <p className="text-xs font-bold text-white/60 uppercase tracking-wide">
            {diagnosis.likely_causes.length > 1 ? 'Possible causes' : 'Most likely cause'}
          </p>
          {diagnosis.likely_causes.map((c, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${PROB_COLORS[c.probability]}`}>
                {c.probability.charAt(0).toUpperCase() + c.probability.slice(1)}
              </span>
              <div>
                <p className="text-xs font-semibold text-white">{c.cause}</p>
                <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{c.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ACTIONS — DIY first, then mechanic */}
      {allActions.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-white/10">
            <p className="text-xs font-bold text-white/60 uppercase tracking-wide">What to do</p>
          </div>
          <div className="px-4 py-3 space-y-2.5">
            {allActions.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${
                  a.diy ? 'bg-emerald-500/20 text-emerald-300' : PRIORITY_CONFIG[a.priority].cls
                }`}>
                  {a.diy ? 'DIY' : PRIORITY_CONFIG[a.priority].label}
                </span>
                <p className="text-xs text-white/80 leading-relaxed">{a.action}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PARTS, COST, CONFIRMATIONS — always visible */}
      {(diagnosis.next_steps_to_confirm?.length > 0 || diagnosis.parts_to_check?.length > 0 || hasCost) && (
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 space-y-4">

          {diagnosis.next_steps_to_confirm?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-amber-300/70 uppercase tracking-wide mb-2">For a better diagnosis, also try:</p>
              <div className="space-y-1.5">
                {diagnosis.next_steps_to_confirm.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-amber-100/70">
                    <span className="text-amber-400 font-bold flex-shrink-0">{i + 1}.</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}

          {diagnosis.parts_to_check?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2">Parts to inspect</p>
              <div className="flex flex-wrap gap-1.5">
                {diagnosis.parts_to_check.map((p, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/10">{p}</span>
                ))}
              </div>
            </div>
          )}

          {hasCost && costStr && (
            <div>
              <p className="text-xs font-bold text-white/50 uppercase tracking-wide mb-1">Repair cost estimate</p>
              <p className="text-base font-black text-white">{costStr}</p>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">{diagnosis.estimated_repair_cost_ngn.note}</p>
            </div>
          )}

          <p className="text-xs text-white/50 leading-relaxed border-t border-white/10 pt-3">{diagnosis.disclaimer}</p>
        </div>
      )}
    </div>
  );
}

// ── Chat Bubble ───────────────────────────────────────────────────────────────

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
              <div className="bg-white/5 border border-white/10 text-white rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            )}
            {msg.diagnosis && <DiagnosisCard diagnosis={msg.diagnosis} />}
          </>
        )}
        <p className="text-xs text-white/25">{timeAgo(msg.timestamp)}</p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AIMechanicPage() {
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

  const activeSession = sessions.find(s => s.id === activeId) ?? null;

  // Load persisted data on mount
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

  const persist = useCallback((updated: ChatSession[]) => {
    setSessions(updated);
    try { localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated)); } catch {}
  }, []);

  const persistVehicle = useCallback((v: VehicleProfile) => {
    setVehicle(v);
    try { localStorage.setItem(STORAGE_KEYS.VEHICLE, JSON.stringify(v)); } catch {}
  }, []);

  const setActive = useCallback((id: string) => {
    setActiveId(id);
    try { localStorage.setItem(STORAGE_KEYS.ACTIVE, id); } catch {}
  }, []);



  const startNewChat = () => {
    const existingEmpty = sessions.find(s => s.messages.length === 0);
    if (existingEmpty) {
      setActive(existingEmpty.id);
    } else {
      const s = blankSession(vehicle);
      setSessions(prev => [s, ...prev]);
      setActiveId(s.id);
    }
    setSidebarOpen(false);
    setText('');
    setImageFile(null);
    setAudioFile(null);
    setVideoFile(null);
    setError('');
  };

  const deleteSession = (id: string) => {
    const updated = sessions.filter(s => s.id !== id);
    if (updated.length === 0) {
      const fresh = blankSession(vehicle);
      persist([fresh]);
      setActive(fresh.id);
    } else {
      persist(updated);
      if (activeId === id) setActive(updated[0].id);
    }
  };

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed && !imageFile && !audioFile && !videoFile) return;
    if (!activeSession) return;

    const userMsg: ChatMessage = {
      id: uid(),
      role: 'user',
      text: trimmed,
      media: imageFile
        ? { type: 'image', name: imageFile.name }
        : audioFile
        ? { type: 'audio', name: audioFile.name }
        : videoFile
        ? { type: 'video', name: videoFile.name }
        : undefined,
      timestamp: Date.now(),
    };

    const isFirst = activeSession.messages.length === 0;
    const title = isFirst ? (trimmed.slice(0, 52) || 'Media diagnosis') : activeSession.title;

    const withUser: ChatSession = {
      ...activeSession,
      title,
      messages: [...activeSession.messages, userMsg],
      updatedAt: Date.now(),
    };
    persist(sessions.map(s => s.id === activeId ? withUser : s));

    setText('');
    setImageFile(null);
    setAudioFile(null);
    setVideoFile(null);
    setLoading(true);
    setError('');

    try {
      const fd = new FormData();
      if (trimmed) fd.append('description', trimmed);
      if (vehicle.brand) fd.append('brand', vehicle.brand);
      if (vehicle.model) fd.append('model', vehicle.model);
      if (vehicle.year) fd.append('year', vehicle.year);
      if (imageFile) fd.append('image', imageFile);
      if (audioFile) fd.append('audio', audioFile);
      if (videoFile) fd.append('video', videoFile);

      const ctx = withUser.messages
        .filter(m => m.role === 'assistant')
        .slice(-5)
        .map(m => m.text)
        .filter(Boolean);
      if (ctx.length > 0) fd.append('context', JSON.stringify(ctx));

      const res = await fetch('/api/ai-mechanic', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      const diag: DiagnosisResult = data.diagnosis;
      const aiMsg: ChatMessage = {
        id: uid(),
        role: 'assistant',
        text: diag.summary,
        diagnosis: diag,
        timestamp: Date.now(),
      };
      const withAI: ChatSession = {
        ...withUser,
        messages: [...withUser.messages, aiMsg],
        updatedAt: Date.now(),
      };
      persist(sessions.map(s => s.id === activeId ? withAI : s));
    } catch (err: any) {
      setError(err.message || 'Failed to analyse. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Hide bottom nav on this page
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

  const hasInput = !!(text.trim() || imageFile || audioFile || videoFile);
  const vehicleSummary = [vehicle.year, vehicle.brand, vehicle.model].filter(Boolean).join(' ');
  const hasMessages = !!(activeSession?.messages.length);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_JSON) }}
      />

      {/* ── Dark hero + chat section ── */}
      <div
        className="relative bg-[#080C10] overflow-hidden"
        style={{
          backgroundImage: "url('/ai-mechanic-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C10] via-[#080C10]/90 to-[#080C10]/60 pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-16">

          {/* Back button + Breadcrumb */}
          <div className="flex items-center gap-3 mb-8">
            <Link
              href="/tools"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all"
              aria-label="Back to Tools"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">AI Mechanic</span>
            </nav>
          </div>

          {/* Two-column layout */}
          <div className="flex gap-5 items-start">

            {/* Sidebar overlay (mobile) */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/70 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <aside
              className={[
                'fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-64 flex-shrink-0',
                'flex flex-col bg-[#0D1117] border border-white/10 rounded-2xl',
                'shadow-2xl lg:shadow-none',
                'transition-transform duration-300 lg:translate-x-0 lg:self-start lg:sticky lg:top-6',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full',
              ].join(' ')}
              style={{ minHeight: '520px' }}
            >
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center">
                    <Wrench className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <span className="text-sm font-bold text-white">Axion — Chats</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/30 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-2.5 border-b border-white/10">
                <button
                  onClick={startNewChat}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/25 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  New conversation
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-2 px-2">
                {sessions.filter(s => s.messages.length > 0).length === 0 ? (
                  <p className="text-xs text-white/20 text-center py-8 px-3">No conversations yet</p>
                ) : sessions.filter(s => s.messages.length > 0).map((s, idx) => {
                  const prevDate = idx > 0 ? new Date(sessions[idx - 1].updatedAt).toDateString() : null;
                  const thisDate = new Date(s.updatedAt).toDateString();
                  const showLabel = thisDate !== prevDate;
                  const today = new Date().toDateString();
                  const label = thisDate === today ? 'Today'
                    : new Date(s.updatedAt) > new Date(Date.now() - 86400000 * 2) ? 'Yesterday'
                    : new Date(s.updatedAt).toLocaleDateString();
                  return (
                    <div key={s.id}>
                      {showLabel && (
                        <div className="text-xs font-semibold text-white/20 uppercase tracking-widest px-2 py-1.5 mt-1">{label}</div>
                      )}
                      <div
                        onClick={() => { setActive(s.id); setSidebarOpen(false); }}
                        className={`group flex items-start gap-2 px-2.5 py-2 rounded-lg cursor-pointer transition-colors ${
                          s.id === activeId ? 'bg-emerald-500/10 border border-emerald-500/20' : 'hover:bg-white/5'
                        }`}
                      >
                        <MessageSquare className={`h-3.5 w-3.5 flex-shrink-0 mt-0.5 ${s.id === activeId ? 'text-emerald-400' : 'text-white/20'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white/80 truncate">{s.title}</p>
                          <p className="text-xs text-white/25 mt-0.5">{s.messages.length} msgs · {timeAgo(s.updatedAt)}</p>
                        </div>
                        <button
                          onClick={e => { e.stopPropagation(); deleteSession(s.id); }}
                          className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-all"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-4 py-3 border-t border-white/10">
                <p className="text-xs text-white/20">Saved on this device.</p>
                <button
                  onClick={() => {
                    if (confirm('Clear all conversation history?')) {
                      const s = blankSession(vehicle);
                      persist([s]);
                      setActive(s.id);
                    }
                  }}
                  className="text-xs text-red-400/40 hover:text-red-400 mt-1 transition-colors"
                >
                  Clear history
                </button>
              </div>
            </aside>

            {/* Right column */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">

              {/* Hero header — always visible */}
              <div>
                <h1
                  className="font-black leading-tight tracking-tight text-white mb-2"
                  style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(26px, 4vw, 50px)' }}
                >
                  Hey, I'm Axion 👋 your AI mechanic.
                </h1>
                <p className="text-white/70 text-xl sm:text-2xl font-semibold leading-snug mb-4 max-w-xl">
                  What's going on with your car?
                </p>

                {/* Instructions — hidden once chat starts */}
                {!hasMessages && (
                  <div className="flex flex-col sm:flex-row gap-3 mt-3 mb-5">
                    {[
                      { num: '1', text: 'Describe, record, or film your car problem — any detail helps.' },
                      { num: '2', text: 'Upload or narrate the issue using the text box below.' },
                      { num: '3', text: 'Get an instant diagnosis, cost estimate, and next steps.' },
                    ].map(({ num, text: t }) => (
                      <div key={num} className="flex items-start gap-2.5 flex-1">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center mt-0.5">{num}</span>
                        <p className="text-xs text-white/60 leading-relaxed">{t}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Mobile history + new chat buttons */}
                <div className="flex items-center justify-between mb-1 lg:hidden">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white text-xs font-medium transition-all"
                  >
                    <History className="h-3.5 w-3.5" />
                    Past conversations
                    {sessions.filter(s => s.messages.length > 0).length > 0 && (
                      <span className="bg-emerald-500/30 text-emerald-400 text-xs px-1.5 py-0.5 rounded-full font-bold">
                        {sessions.filter(s => s.messages.length > 0).length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={startNewChat}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/25 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> New chat
                  </button>
                </div>
              </div>

              {/* Initial input form — hidden once conversation starts */}
              {!hasMessages && (
                <div>
                  {/* Vehicle: Brand | Model | Year */}
                  <div className="flex gap-2 mb-2">
                    <div className="relative flex-1 min-w-0">
                      <select
                        value={vehicle.brand}
                        onChange={e => persistVehicle({ ...vehicle, brand: e.target.value })}
                        className="w-full h-12 pl-3 pr-8 text-sm border border-white/20 rounded-xl bg-white/10 text-white/90 focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
                        style={{
                          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px center',
                        }}
                      >
                        <option value="" style={{ background: '#080C10' }}>Brand</option>
                        {NIGERIAN_BRANDS.map(b => (
                          <option key={b} value={b} style={{ background: '#080C10' }}>{b}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="Model"
                      value={vehicle.model}
                      onChange={e => persistVehicle({ ...vehicle, model: e.target.value })}
                      className="flex-1 min-w-0 h-12 px-3 text-sm border border-white/20 rounded-xl bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 transition-all"
                    />
                    <input
                      type="number"
                      placeholder="Year"
                      value={vehicle.year}
                      onChange={e => persistVehicle({ ...vehicle, year: e.target.value })}
                      min="1980"
                      max={new Date().getFullYear() + 1}
                      className="w-24 h-12 px-3 text-sm border border-white/20 rounded-xl bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 transition-all"
                    />
                  </div>

                  {/* Textarea + media pills + diagnose button */}
                  <div className="border border-white/20 rounded-xl bg-white/10 overflow-hidden focus-within:border-emerald-500/50 transition-all">
                    <textarea
                      value={text}
                      onChange={e => setText(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Describe your car problem... e.g. knocking sound on cold start, check engine light, brakes feel soft"
                      rows={3}
                      className="w-full px-4 pt-3 pb-2 text-sm bg-transparent text-white placeholder:text-white/40 focus:outline-none resize-none leading-relaxed"
                    />
                    <div className="flex items-center gap-2 px-3 pb-3 pt-1.5 border-t border-white/20">
                      <MediaPill
                        icon={<Camera className="h-3 w-3" />}
                        label="Photo"
                        accept="image/*"
                        file={imageFile}
                        onFile={setImageFile}
                        onClear={() => setImageFile(null)}
                        maxMB={10}
                      />
                      <MediaPill
                        icon={<Mic className="h-3 w-3" />}
                        label="Sound"
                        accept="audio/*"
                        file={audioFile}
                        onFile={setAudioFile}
                        onClear={() => setAudioFile(null)}
                        maxMB={20}
                      />
                      <MediaPill
                        icon={<Video className="h-3 w-3" />}
                        label="Video"
                        accept="video/*"
                        file={videoFile}
                        onFile={setVideoFile}
                        onClear={() => setVideoFile(null)}
                        maxMB={50}
                      />
                      <div className="ml-auto">
                        <button
                          onClick={handleSubmit}
                          disabled={!hasInput || loading}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                            hasInput && !loading
                              ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/25'
                              : 'bg-white/10 text-white/25 cursor-not-allowed'
                          }`}
                        >
                          {loading
                            ? <><Loader2 className="h-4 w-4 animate-spin" /> Analysing...</>
                            : <><Wrench className="h-4 w-4" /> Diagnose</>
                          }
                        </button>
                      </div>
                    </div>
                  </div>

                  {vehicleSummary && (
                    <p className="text-xs text-white/25 mt-2 flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-emerald-500" />
                      Vehicle saved on this device
                    </p>
                  )}
                </div>
              )}

              {/* Chat window — shown when messages exist, loading, or error */}
              {(hasMessages || loading || !!error) && (
                <div
                  className="bg-[#0D1117]/80 border border-white/10 rounded-2xl overflow-hidden flex flex-col backdrop-blur-sm"
                  style={{ maxHeight: '60vh', minHeight: '200px' }}
                >
                  <div className="flex-1 overflow-y-auto px-4 py-4">
                    {activeSession?.messages.map(msg => (
                      <ChatBubble key={msg.id} msg={msg} />
                    ))}

                    {/* Axion loading animation — no page jump */}
                    {loading && (
                      <div className="flex gap-2 mb-3">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                          <Wrench className="h-3.5 w-3.5 text-emerald-400" />
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 min-w-[220px]">
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

                  {/* Follow-up input bar */}
                  <div className="border-t border-white/10 bg-[#080C10]/80 px-3 py-2.5">
                    <div className="flex gap-2 items-center">
                      <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="Ask a follow-up... (Enter to send)"
                        rows={1}
                        className="flex-1 resize-none px-3 py-2 text-sm border border-white/10 rounded-xl bg-white/5 text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-500/40 transition-all leading-relaxed"
                      />
                      <button
                        onClick={handleSubmit}
                        disabled={!hasInput || loading}
                        className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                          hasInput && !loading
                            ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-md shadow-emerald-500/20'
                            : 'bg-white/5 text-white/20 cursor-not-allowed'
                        }`}
                      >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-2">
                        <MediaPill
                          icon={<Camera className="h-3 w-3" />}
                          label="Photo"
                          accept="image/*"
                          file={imageFile}
                          onFile={setImageFile}
                          onClear={() => setImageFile(null)}
                          maxMB={10}
                        />
                        <MediaPill
                          icon={<Mic className="h-3 w-3" />}
                          label="Sound"
                          accept="audio/*"
                          file={audioFile}
                          onFile={setAudioFile}
                          onClear={() => setAudioFile(null)}
                          maxMB={20}
                        />
                        <MediaPill
                          icon={<Video className="h-3 w-3" />}
                          label="Video"
                          accept="video/*"
                          file={videoFile}
                          onFile={setVideoFile}
                          onClear={() => setVideoFile(null)}
                          maxMB={50}
                        />
                      </div>
                      <button
                        onClick={startNewChat}
                        className="flex items-center gap-1 text-xs text-white/25 hover:text-emerald-400 transition-colors"
                      >
                        <Plus className="h-3 w-3" /> New chat
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Desktop: start new conversation link */}
              {!hasMessages && (
                <div className="hidden lg:flex items-center justify-end">
                  <button
                    onClick={startNewChat}
                    className="flex items-center gap-1.5 text-xs text-white/25 hover:text-emerald-400 transition-colors"
                  >
                    <Plus className="h-3 w-3" /> Start a new conversation
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* ── SEO content section (theme-aware) ── */}
      <div className="bg-background border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-20">

          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">How It Works</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Free Online Mechanic Help — In Three Steps
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-10">
              Our virtual auto mechanic gives you an instant online mechanic diagnosis without booking an appointment, waiting in a workshop, or paying a consultation fee.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { step: '01', title: 'Enter your vehicle details', desc: 'Select your brand, model, and year. We save this on your device so you never type it again — every diagnosis is automatically personalised to your car.', icon: <Car className="h-5 w-5" /> },
                { step: '02', title: 'Describe or upload media', desc: 'Type what is wrong in plain English. For better accuracy, attach a photo of the fault, an engine sound recording, or a short video. Even 10 seconds of audio can transform diagnosis accuracy.', icon: <Mic className="h-5 w-5" /> },
                { step: '03', title: 'Get your instant diagnosis', desc: 'Receive a full diagnosis: urgency level, ranked likely causes, DIY steps you can act on today, and repair cost estimates in Naira based on Lagos, Abuja, and Port Harcourt market prices.', icon: <Zap className="h-5 w-5" /> },
              ].map(({ step, title, desc, icon }) => (
                <div key={step} className="relative bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      {icon}
                    </div>
                    <span className="text-5xl font-black text-border" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{step}</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Full Coverage</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Does Our Online Mechanic Service Include?
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-10">
              Whether you need a quick online auto repair estimate, want to ask a mechanic online before visiting a workshop, or need an online car repair estimate calculator to plan your budget — this tool covers all of it, for free.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Engine Fault Diagnosis', desc: 'Knocking, misfires, rough idling, overheating, oil pressure warnings, check engine lights — our AI identifies the most likely causes ranked by probability.' },
                { title: 'Audio & Sound Analysis', desc: 'Upload a recording of the knock, rattle, squeal, or grinding. Our AI analyses the acoustic pattern to identify the fault.' },
                { title: 'Instant Urgency Assessment', desc: 'Every diagnosis includes a clear four-level verdict: Safe to Drive, Monitor Closely, See a Mechanic Soon, or Stop Driving Immediately.' },
                { title: 'Car Repair Quotes Online', desc: 'All cost estimates are grounded in Nigerian market prices — parts and labour at roadside mechanics and workshops across Lagos, Abuja, and Port Harcourt.' },
                { title: 'DIY Step-by-Step Actions', desc: 'Where a fault is something you can check or fix yourself, we tell you exactly how — before you spend money on a mechanic.' },
                { title: 'Conversational Follow-Up', desc: 'Ask follow-up questions and get answers in full context. Every session is saved on your device.' },
                { title: 'Multi-Vehicle Support', desc: 'Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, Innoson, Mitsubishi, and every other brand on Nigerian roads.' },
                { title: 'Photo & Video Diagnosis', desc: 'Send a photo of dashboard warning lights, unusual fluid leaks, or visible damage. Each piece of media increases diagnosis certainty significantly.' },
                { title: 'Parts Identification', desc: 'Every diagnosis lists the specific components most likely involved so you know exactly what to ask for at Ladipo market or any workshop.' },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-card border border-border rounded-2xl p-5 hover:border-emerald-500/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-sm">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">

              <div>
                <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  The Smartest Way to Get Car Repair Help Online in Nigeria
                </h2>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Every Nigerian driver has been there: a strange noise starts on Monday morning, you Google it for 20 minutes, get conflicting answers from three different forums, and end up at a mechanic who charges you NGN 5,000 just to look at it. Our <strong className="text-foreground">online mechanic service</strong> is built to break that cycle.
                  </p>
                  <p>
                    Naira Autos AI Mechanic is Nigeria's first <strong className="text-foreground">virtual auto mechanic</strong> — a free <strong className="text-foreground">online mechanic diagnosis</strong> tool that combines multimodal AI with automotive knowledge specific to Nigerian road conditions. Unlike a generic chatbot or a UK-trained tool, this system understands adulterated fuel, Lagos potholes, tropical heat effects on rubber seals, generator charging damage on alternators, and what parts actually cost in Ladipo or Onitsha market today.
                  </p>
                  <p>
                    When you need to <strong className="text-foreground">ask a mechanic online</strong> — right now, at 11pm, when no workshop is open — this is where you come. Ask a mechanic online now and get an answer in seconds, not hours. No appointment. No waiting room. No consultation fee.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Get an Auto Repair Estimate Online Before You Visit Any Workshop
                </h2>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    One of the most common ways Nigerian drivers get overcharged is by arriving at a workshop without knowing what a fair price looks like. Before you visit anyone, use our <strong className="text-foreground">online auto repair estimate</strong> feature to find out what your repair should cost — parts plus labour, broken down clearly.
                  </p>
                  <p>
                    Our <strong className="text-foreground">online car repair estimate calculator</strong> takes your specific vehicle — year, brand, model — then adjusts for the most likely fault based on everything you have described. The estimate you get is contextual, not generic. A 2010 Camry with 180,000km showing oil pressure warnings gets a different estimate than a 2020 Camry with 40,000km showing the same light, because the likely cause is different.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Can't Find a Mechanic Near You? Use Our Online Car Mechanic Instead
                </h2>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Searching for a <strong className="text-foreground">mechanic near me</strong> at 10pm? Looking for an <strong className="text-foreground">auto repair near me</strong> on a Sunday? Need a <strong className="text-foreground">mobile mechanic near me</strong> but cannot find one who will come out the same day? Our <strong className="text-foreground">online car mechanic</strong> is available 24 hours a day, 7 days a week.
                  </p>
                  <p>
                    While you are searching for a <strong className="text-foreground">cheap mechanic near me</strong> or an <strong className="text-foreground">engine repair near me</strong>, use this tool first. A 3-minute diagnosis here can save you hours of searching and thousands of naira in unnecessary repairs. When you do go to a mechanic, you will go knowing exactly what is wrong, what it should cost, and what to watch out for.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Why Audio Diagnosis Changes Everything
                </h2>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Experienced mechanics diagnose problems by sound before they even open a bonnet. Our AI has been trained to distinguish these patterns. When you upload an audio recording of your engine, our <strong className="text-foreground">online mechanic diagnosis</strong> can jump from 60% certainty (text only) to over 85%. Record the sound on your phone. 10 seconds is enough. Upload it here.
                  </p>
                </div>
              </div>

            </div>

            <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold text-foreground text-sm mb-4">Diagnosis Accuracy by Input</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Text description only', pct: 60, color: 'bg-orange-500' },
                    { label: '+ Photo attached', pct: 75, color: 'bg-amber-500' },
                    { label: '+ Audio recording', pct: 85, color: 'bg-emerald-500' },
                    { label: '+ Video clip', pct: 90, color: 'bg-emerald-600' },
                  ].map(({ label, pct, color }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>{label}</span>
                        <span className="font-bold text-foreground">~{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-border rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${color}`} style={{ width: pct + '%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold text-foreground text-sm mb-3">Supported Vehicles</h3>
                <div className="flex flex-wrap gap-1.5">
                  {['Toyota', 'Honda', 'Lexus', 'Mercedes', 'BMW', 'Kia', 'Hyundai', 'Innoson', 'Mitsubishi', 'Nissan', 'Ford', 'Peugeot', 'Trucks', 'Buses', 'Motorcycles'].map(v => (
                    <span key={v} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">{v}</span>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
                <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-3">Key Facts</h3>
                <ul className="space-y-2.5">
                  {[
                    '100% free — no subscription',
                    'No login or account required',
                    'Works on mobile and desktop',
                    'Costs quoted in Nigerian Naira',
                    'Available 24/7 — even Sundays',
                    'Conversation history saved locally',
                    'Ask unlimited follow-up questions',
                  ].map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                      <Check className="h-3 w-3 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold text-foreground text-sm mb-3">Also on Naira Autos</h3>
                <ul className="space-y-2">
                  {[
                    { label: 'Browse car listings', href: '/listings' },
                    { label: 'Post your car for sale', href: '/add-listing' },
                    { label: 'Get a free car valuation', href: '/#valuation' },
                    { label: 'Request a vehicle', href: '/requests' },
                  ].map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="flex items-center justify-between text-xs text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group">
                        <span>{label}</span>
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-[#080C10] rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3 block">Built for Nigerian Roads</span>
                <h2 className="text-3xl font-black uppercase text-white mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Your Online Mechanic for Car Problems in Nigeria
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Most virtual auto mechanic tools are trained on Western road conditions, UK MOT data, and American repair shop rates. They do not know that Nigerian petrol stations regularly sell adulterated fuel that strips engine oil viscosity 40% faster than the manufacturer expects. They do not know that Lagos roads can destroy a CV joint in 30,000km that should last 150,000km.
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Axion knows all of this. When you ask about your Toyota Corolla's knocking sound after a fuel fill-up, it considers adulteration first — because in Nigeria, that is statistically the most likely cause.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Fuel adulteration', desc: 'Understands how adulterated petrol affects knock sensors, injectors, and oil viscosity.' },
                  { title: 'Tropical heat effects', desc: 'Accounts for 35C+ ambient temperatures that accelerate rubber seal degradation.' },
                  { title: 'Pothole damage', desc: 'Recognises suspension and tyre fault patterns specific to Nigerian road surfaces.' },
                  { title: 'Local parts pricing', desc: 'Cost estimates drawn from Ladipo, Spare Parts Market, and registered workshops.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <p className="text-xs font-bold text-white mb-1">{title}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Why Us</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              AI Mechanic vs. Traditional Options
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground text-sm">Feature</th>
                    <th className="text-center px-4 py-3.5 font-bold text-emerald-600 dark:text-emerald-400 text-sm">Naira Autos AI Mechanic</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Workshop Visit</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Car Group / Forum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Available 24/7', 'Yes', 'No', 'Sometimes'],
                    ['Free to use', 'Yes', 'No', 'Yes'],
                    ['No travel required', 'Yes', 'No', 'Yes'],
                    ['Naira cost estimates', 'Yes', 'Varies', 'No'],
                    ['Audio/video analysis', 'Yes', 'Yes', 'No'],
                    ['Instant response', 'Yes', 'No', 'Sometimes'],
                    ['Consistent quality', 'Yes', 'Varies', 'No'],
                    ['Saves conversation history', 'Yes', 'No', 'No'],
                  ].map(([feat, ai, workshop, forum]) => (
                    <tr key={feat} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 text-muted-foreground">{feat}</td>
                      <td className="px-4 py-3 text-center font-bold text-emerald-600 dark:text-emerald-400">{ai}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{workshop}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{forum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">FAQ</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'What is an AI mechanic and how does it work?', a: 'An AI mechanic is a virtual auto mechanic that uses artificial intelligence to diagnose car problems remotely. You describe your problem, upload optional media, and the AI analyses your inputs against a vast knowledge base of vehicle faults, Nigerian road conditions, and local repair costs.' },
                { q: 'Is this the same as asking a mechanic online?', a: 'It is better in many ways. When you ask a mechanic online in a forum or WhatsApp group, you get one person\'s opinion based on a text description. Our online mechanic service analyses your description plus any photos, audio, or video you provide, cross-references it against thousands of known fault patterns, and returns a ranked diagnosis with confidence scores.' },
                { q: 'Can I get an online auto repair estimate for any car brand?', a: 'Yes. Our online vehicle repair estimate covers Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot, and all other brands commonly found on Nigerian roads.' },
                { q: 'How accurate is the online car repair estimate calculator?', a: 'Our auto repair cost estimate online draws from Nigerian market data. We give you a range (minimum to maximum) so you know what is reasonable. If a mechanic quotes significantly above our maximum, that is a red flag worth investigating.' },
                { q: 'Can the AI diagnose my car from an engine sound alone?', a: 'Yes. Audio is one of our most powerful inputs. Upload a recording of the knock, rattle, squeal, or grinding — even 10 seconds recorded directly on your phone. Our AI analyses the acoustic pattern and can often pinpoint whether you are dealing with worn bearings, piston slap, brake pad wear, or another specific fault.' },
                { q: 'What if I need a mobile mechanic or car repair near me?', a: 'Our tool diagnoses your problem first, so you know exactly what to ask for before you start searching. If the fault requires physical inspection or specialist equipment, we tell you clearly — and we tell you what type of mechanic or workshop to look for.' },
                { q: 'Is my conversation history stored on your servers?', a: 'No. All conversation history is saved only on your device using your browser\'s local storage. Nothing is retained on our servers beyond the active message you send for diagnosis. You can clear your conversation history at any time from the sidebar.' },
                { q: 'Do I need to log in or create an account?', a: 'No. The AI Mechanic is completely free and requires no account, no login, and no personal information. Your vehicle details are saved locally on your device for convenience. Just open the page and start diagnosing.' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none gap-3">
                    <span className="font-semibold text-foreground text-sm leading-relaxed">{q}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Ready? Diagnose Your Car Now.
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Free. Instant. No login. Nigeria's most accurate online mechanic diagnosis — available right now.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all"
            >
              <Wrench className="h-4 w-4" />
              Start Your Free Diagnosis
            </button>
          </section>

        </div>
      </div>
    </>
  );
}