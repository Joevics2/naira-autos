'use client';

// app/ai-mechanic/page.tsx
//
// AI Mechanic — multimodal vehicle diagnostic tool powered by Gemini.
// Accepts text description + optional image, audio, video.
// Returns structured diagnosis with certainty %, urgency level, causes, actions.

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Wrench, Upload, Mic, Video, Image as ImageIcon,
  AlertTriangle, CheckCircle2, AlertCircle, XCircle,
  ChevronRight, Loader2, Trash2, X, Zap, Info,
  Volume2, ShieldAlert, Car, Gauge
} from 'lucide-react';

// ── SEO metadata (server component handles this via layout, but we add
//    JSON-LD schema via a script tag rendered client-side) ──────────────────

const SCHEMA_JSON = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://nairaautos.com/tools/ai-mechanic',
      name: 'AI Mechanic — Free Car Diagnostic Tool Nigeria',
      description:
        'Get instant AI-powered vehicle diagnostics in Nigeria. Upload a photo, video, or engine sound recording and receive expert insight on car problems, repair costs, and urgency.',
      url: 'https://nairaautos.com/tools/ai-mechanic',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nairaautos.com' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://nairaautos.com/tools' },
          { '@type': 'ListItem', position: 3, name: 'AI Mechanic', item: 'https://nairaautos.com/tools/ai-mechanic' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can AI diagnose car problems from sound?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Our AI mechanic can analyse engine sounds, knocking, rattling, and squealing from an audio recording and provide likely causes and recommended actions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the AI mechanic diagnosis accurate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The AI provides a certainty percentage with every diagnosis. Results are most accurate when you combine a description, photo, and audio. Always confirm with a qualified mechanic for safety-critical repairs.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is this service free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, the AI Mechanic tool on Naira Autos is completely free to use.',
          },
        },
      ],
    },
  ],
};

// ── Types ─────────────────────────────────────────────────────────────────────

type UrgencyLevel = 'safe' | 'monitor' | 'urgent' | 'stop_driving';

interface DiagnosisResult {
  summary: string;
  urgency: UrgencyLevel;
  urgency_label: string;
  urgency_color: 'green' | 'yellow' | 'orange' | 'red';
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

// ── Helpers ───────────────────────────────────────────────────────────────────

const URGENCY_CONFIG: Record<UrgencyLevel, { bg: string; text: string; border: string; icon: React.ReactNode; badge: string }> = {
  safe: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    text: 'text-emerald-800 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
    badge: 'bg-emerald-500',
  },
  monitor: {
    bg: 'bg-yellow-50 dark:bg-yellow-950/30',
    text: 'text-yellow-800 dark:text-yellow-300',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: <AlertCircle className="h-5 w-5 text-yellow-600" />,
    badge: 'bg-yellow-500',
  },
  urgent: {
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    text: 'text-orange-800 dark:text-orange-300',
    border: 'border-orange-200 dark:border-orange-800',
    icon: <AlertTriangle className="h-5 w-5 text-orange-600" />,
    badge: 'bg-orange-500',
  },
  stop_driving: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    text: 'text-red-800 dark:text-red-300',
    border: 'border-red-200 dark:border-red-800',
    icon: <XCircle className="h-5 w-5 text-red-600" />,
    badge: 'bg-red-600',
  },
};

const PROBABILITY_COLORS = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
};

const PRIORITY_COLORS = {
  immediate: 'bg-red-500 text-white',
  soon: 'bg-orange-500 text-white',
  when_convenient: 'bg-emerald-500 text-white',
};

function CertaintyMeter({ value, note }: { value: number; note: string }) {
  const color =
    value >= 75 ? 'bg-emerald-500' :
    value >= 50 ? 'bg-yellow-500' :
    value >= 30 ? 'bg-orange-500' : 'bg-red-500';

  const label =
    value >= 75 ? 'High confidence' :
    value >= 50 ? 'Moderate confidence' :
    value >= 30 ? 'Low confidence' : 'Very uncertain';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">AI Certainty</span>
        <span className="text-2xl font-black text-foreground">{value}%</span>
      </div>
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="flex items-start justify-between gap-2">
        <span className={`text-xs font-semibold ${
          value >= 75 ? 'text-emerald-600' :
          value >= 50 ? 'text-yellow-600' :
          value >= 30 ? 'text-orange-600' : 'text-red-600'
        }`}>{label}</span>
        <span className="text-xs text-muted-foreground text-right leading-relaxed max-w-xs">{note}</span>
      </div>
    </div>
  );
}

function FileUploadZone({
  accept,
  label,
  icon,
  file,
  onFile,
  onClear,
  maxMB,
}: {
  accept: string;
  label: string;
  icon: React.ReactNode;
  file: File | null;
  onFile: (f: File) => void;
  onClear: () => void;
  maxMB: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={e => {
          const f = e.target.files?.[0];
          if (!f) return;
          if (f.size > maxMB * 1024 * 1024) {
            alert(`File too large. Max ${maxMB}MB.`);
            return;
          }
          onFile(f);
          e.target.value = '';
        }}
      />
      {file ? (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20">
          <div className="text-emerald-600 flex-shrink-0">{icon}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
          </div>
          <button type="button" onClick={onClear} className="text-red-500 hover:text-red-600 flex-shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full flex items-center gap-3 p-3 rounded-xl border border-dashed border-border hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all group"
        >
          <div className="text-muted-foreground group-hover:text-emerald-600 transition-colors flex-shrink-0">
            {icon}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">Max {maxMB}MB</p>
          </div>
          <Upload className="h-4 w-4 text-muted-foreground ml-auto group-hover:text-emerald-600 transition-colors" />
        </button>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function AIMechanicPage() {
  const { toast } = useToast();

  // Form state
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // Result state
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState('');

  const hasAnyInput = description.trim() || imageFile || audioFile || videoFile;

  const inputCount = [
    description.trim() ? 1 : 0,
    imageFile ? 1 : 0,
    audioFile ? 1 : 0,
    videoFile ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAnyInput) return;

    setLoading(true);
    setError('');
    setDiagnosis(null);

    try {
      const formData = new FormData();
      if (description) formData.append('description', description);
      if (brand) formData.append('brand', brand);
      if (model) formData.append('model', model);
      if (year) formData.append('year', year);
      if (mileage) formData.append('mileage', mileage);
      if (imageFile) formData.append('image', imageFile);
      if (audioFile) formData.append('audio', audioFile);
      if (videoFile) formData.append('video', videoFile);

      const res = await fetch('/api/ai-mechanic', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setDiagnosis(data.diagnosis);

      // Scroll to results
      setTimeout(() => {
        document.getElementById('diagnosis-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err: any) {
      setError(err.message || 'Failed to analyse. Please try again.');
      toast({ title: 'Analysis failed', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setDiagnosis(null);
    setError('');
    setDescription('');
    setBrand(''); setModel(''); setYear(''); setMileage('');
    setImageFile(null); setAudioFile(null); setVideoFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const urgency = diagnosis ? URGENCY_CONFIG[diagnosis.urgency] : null;

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_JSON) }}
      />

      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-8 pb-24">

          {/* ── Breadcrumb ── */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-foreground transition-colors">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">AI Mechanic</span>
          </nav>

          {/* ── Hero ── */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-widest uppercase">Free Tool</span>
            </div>
            <h1
              className="font-black uppercase text-foreground leading-none mb-3"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 6vw, 52px)' }}
            >
              AI Mechanic
            </h1>
            <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
              Describe your car problem, upload a photo, record the engine sound, or share a video.
              Get instant AI-powered insight — free, no login required.
            </p>

            {/* Input quality indicator */}
            {inputCount > 0 && (
              <div className="flex items-center gap-2 mt-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className={`h-2 w-8 rounded-full transition-all ${
                        i <= inputCount ? 'bg-emerald-500' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {inputCount === 1 ? 'Add more inputs for better accuracy' :
                   inputCount === 2 ? 'Good — adding more will help' :
                   inputCount === 3 ? 'Great combination of inputs' :
                   'Maximum inputs — best possible accuracy'}
                </span>
              </div>
            )}
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Vehicle details */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/40">
                <Car className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <p className="font-semibold text-foreground text-base">Vehicle Details <span className="text-muted-foreground font-normal text-sm">(optional but improves accuracy)</span></p>
              </div>
              <div className="px-5 py-5">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Brand</label>
                    <Input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g. Toyota" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Model</label>
                    <Input value={model} onChange={e => setModel(e.target.value)} placeholder="e.g. Camry" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Year</label>
                    <Input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="e.g. 2018" min="1980" max={new Date().getFullYear()} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Mileage (km)</label>
                    <Input type="number" value={mileage} onChange={e => setMileage(e.target.value)} placeholder="e.g. 75000" min="0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Describe the problem */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/40">
                <Wrench className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <p className="font-semibold text-foreground text-base">Describe the Problem</p>
              </div>
              <div className="px-5 py-5">
                <Textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="e.g. My car makes a knocking sound when I start it in the morning. It goes away after 2 minutes. Also noticed the engine oil light came on twice this week..."
                  rows={4}
                  className="text-base resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Be specific — mention when it happens, how long, any warning lights, recent repairs
                </p>
              </div>
            </div>

            {/* Media uploads */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/40">
                <Zap className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-base">Upload Media</p>
                  <p className="text-xs text-muted-foreground">Photo · Engine sound · Video — upload one or all three</p>
                </div>
              </div>
              <div className="px-5 py-5 space-y-3">

                {/* Audio highlight */}
                <div className="flex items-start gap-3 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 mb-4">
                  <Volume2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-emerald-800 dark:text-emerald-300">
                    <strong>Pro tip:</strong> Record your engine sound while the problem is happening. Audio diagnosis is our most unique feature — record the knock, rattle, or squeal directly from your phone.
                  </p>
                </div>

                <FileUploadZone
                  accept="image/*"
                  label="Upload a photo"
                  icon={<ImageIcon className="h-5 w-5" />}
                  file={imageFile}
                  onFile={setImageFile}
                  onClear={() => setImageFile(null)}
                  maxMB={10}
                />

                <FileUploadZone
                  accept="audio/*"
                  label="Upload engine sound recording"
                  icon={<Mic className="h-5 w-5" />}
                  file={audioFile}
                  onFile={setAudioFile}
                  onClear={() => setAudioFile(null)}
                  maxMB={20}
                />

                <FileUploadZone
                  accept="video/*"
                  label="Upload a video"
                  icon={<Video className="h-5 w-5" />}
                  file={videoFile}
                  onFile={setVideoFile}
                  onClear={() => setVideoFile(null)}
                  maxMB={50}
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              disabled={!hasAnyInput || loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base h-14 rounded-2xl"
            >
              {loading ? (
                <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Analysing your vehicle...</>
              ) : (
                <><Wrench className="h-5 w-5 mr-2" /> Diagnose My Car</>
              )}
            </Button>

            {!hasAnyInput && (
              <p className="text-center text-sm text-muted-foreground -mt-2">
                Add a description, photo, audio, or video to get started
              </p>
            )}
          </form>

          {/* ── Error ── */}
          {error && (
            <div className="mt-6 flex items-start gap-3 p-4 rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* ── Diagnosis Result ── */}
          {diagnosis && urgency && (
            <div id="diagnosis-result" className="mt-8 space-y-5">

              {/* Urgency banner */}
              <div className={`rounded-2xl border p-5 ${urgency.bg} ${urgency.border}`}>
                <div className="flex items-center gap-3 mb-3">
                  {urgency.icon}
                  <span className={`text-lg font-black uppercase tracking-wide ${urgency.text}`}>
                    {diagnosis.urgency_label}
                  </span>
                  <span className={`ml-auto text-xs font-bold text-white px-2.5 py-1 rounded-full ${urgency.badge}`}>
                    {diagnosis.urgency.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <p className={`text-base leading-relaxed ${urgency.text}`}>{diagnosis.summary}</p>
              </div>

              {/* Certainty meter */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <CertaintyMeter value={diagnosis.certainty} note={diagnosis.certainty_note} />
              </div>

              {/* Next steps to confirm — shown prominently before causes */}
              {diagnosis.next_steps_to_confirm?.length > 0 && (
                <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-emerald-200 dark:border-emerald-800">
                    <Zap className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <p className="font-bold text-emerald-900 dark:text-emerald-200 text-base">Help Me Diagnose Further</p>
                  </div>
                  <div className="px-5 py-4 space-y-2">
                    <p className="text-sm text-emerald-700 dark:text-emerald-400 mb-3">
                      To increase certainty, do any of these:
                    </p>
                    {diagnosis.next_steps_to_confirm.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Likely causes */}
              {diagnosis.likely_causes?.length > 0 && (
                <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/40">
                    <AlertTriangle className="h-4 w-4 text-emerald-500" />
                    <p className="font-semibold text-foreground text-base">Likely Causes</p>
                  </div>
                  <div className="px-5 py-4 space-y-4">
                    {diagnosis.likely_causes.map((cause, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <p className="font-semibold text-foreground text-sm">{cause.cause}</p>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${PROBABILITY_COLORS[cause.probability]}`}>
                              {cause.probability} likelihood
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{cause.explanation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What AI observed */}
              {diagnosis.what_i_observed?.length > 0 && (
                <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/40">
                    <Info className="h-4 w-4 text-emerald-500" />
                    <p className="font-semibold text-foreground text-base">What the AI Observed</p>
                  </div>
                  <ul className="px-5 py-4 space-y-2">
                    {diagnosis.what_i_observed.map((obs, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-2" />
                        {obs}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommended actions */}
              {diagnosis.recommended_actions?.length > 0 && (
                <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/40">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <p className="font-semibold text-foreground text-base">Recommended Actions</p>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    {diagnosis.recommended_actions.map((action, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${PRIORITY_COLORS[action.priority]}`}>
                          {action.priority.replace('_', ' ')}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm text-foreground leading-relaxed">{action.action}</p>
                          {action.diy && (
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">✓ Can be done yourself</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Parts to check + cost estimate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {diagnosis.parts_to_check?.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                    <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/40">
                      <Wrench className="h-4 w-4 text-emerald-500" />
                      <p className="font-semibold text-foreground text-base">Parts to Check</p>
                    </div>
                    <ul className="px-5 py-4 space-y-2">
                      {diagnosis.parts_to_check.map((part, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                          {part}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(diagnosis.estimated_repair_cost_ngn?.min || diagnosis.estimated_repair_cost_ngn?.max) && (
                  <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                    <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/40">
                      <Gauge className="h-4 w-4 text-emerald-500" />
                      <p className="font-semibold text-foreground text-base">Estimated Repair Cost</p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-2xl font-black text-foreground">
                        {diagnosis.estimated_repair_cost_ngn.min && diagnosis.estimated_repair_cost_ngn.max ? (
                          <>
                            ₦{diagnosis.estimated_repair_cost_ngn.min.toLocaleString()}
                            {' — '}
                            ₦{diagnosis.estimated_repair_cost_ngn.max.toLocaleString()}
                          </>
                        ) : diagnosis.estimated_repair_cost_ngn.min ? (
                          <>From ₦{diagnosis.estimated_repair_cost_ngn.min.toLocaleString()}</>
                        ) : (
                          <>Up to ₦{diagnosis.estimated_repair_cost_ngn.max?.toLocaleString()}</>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {diagnosis.estimated_repair_cost_ngn.note}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <div className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">Important Disclaimer</p>
                    <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
                      {diagnosis.disclaimer}
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-500 mt-2">
                      AI certainty: {diagnosis.certainty}% · Analysed by {diagnosis.model_used}
                    </p>
                  </div>
                </div>
              </div>

              {/* Try again */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={reset}
                  className="flex-1 font-semibold"
                >
                  Diagnose Another Problem
                </Button>
                <Link href="/listings" className="flex-1">
                  <Button size="lg" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold">
                    Browse Cars
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* ── How it works (shown before diagnosis) ── */}
          {!diagnosis && !loading && (
            <div className="mt-12">
              <h2 className="text-xl font-black uppercase text-foreground mb-5"
                style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif" }}>
                How It Works
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { step: '1', title: 'Describe or Upload', desc: 'Tell us what\'s wrong. Add a photo, engine sound, or video for better results.', icon: <Upload className="h-5 w-5" /> },
                  { step: '2', title: 'AI Analyses', desc: 'Our AI mechanic — trained on automotive knowledge and Nigerian road conditions — reviews your inputs.', icon: <Zap className="h-5 w-5" /> },
                  { step: '3', title: 'Get Insight', desc: 'Receive likely causes, urgency level, repair cost estimates, and recommended actions.', icon: <CheckCircle2 className="h-5 w-5" /> },
                ].map(({ step, title, desc, icon }) => (
                  <div key={step} className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-white font-black text-sm flex-shrink-0">
                        {step}
                      </span>
                      <div className="text-emerald-500">{icon}</div>
                    </div>
                    <p className="font-bold text-foreground mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              {/* FAQ section for SEO */}
              <div className="mt-10">
                <h2 className="text-xl font-black uppercase text-foreground mb-5"
                  style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif" }}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      q: 'Can the AI diagnose my car from an engine sound?',
                      a: 'Yes. Upload an audio recording of the knocking, rattling, or squealing sound and the AI will analyse it. For best results, record the sound while the problem is happening and describe when it occurs.'
                    },
                    {
                      q: 'How accurate is the AI mechanic?',
                      a: 'Every diagnosis includes a certainty percentage. Accuracy improves significantly when you combine a description with a photo and/or audio. Always verify safety-critical issues with a qualified mechanic.'
                    },
                    {
                      q: 'Is this free?',
                      a: 'Yes. The AI Mechanic tool is completely free to use on Naira Autos.'
                    },
                    {
                      q: 'Does it work for trucks, buses, and motorcycles?',
                      a: 'Yes. The AI can diagnose cars, trucks, buses, vans, and motorcycles. Provide the vehicle type, brand, and model for the most relevant insight.'
                    },
                  ].map(({ q, a }) => (
                    <div key={q} className="rounded-2xl border border-border bg-card p-5">
                      <p className="font-semibold text-foreground mb-2">{q}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}