'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, Camera, Loader2, CheckCircle, AlertCircle, Share2, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const NIGERIAN_STATES = [
  'Lagos', 'Abuja (FCT)', 'Rivers', 'Kano', 'Oyo', 'Delta', 'Enugu', 'Anambra',
  'Kaduna', 'Ogun', 'Ondo', 'Osun', 'Kwara', 'Edo', 'Cross River', 'Akwa Ibom',
  'Abia', 'Imo', 'Bauchi', 'Benue', 'Borno', 'Ekiti', 'Gombe', 'Jigawa',
  'Kebbi', 'Kogi', 'Nasarawa', 'Niger', 'Plateau', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara', 'Ebonyi', 'Bayelsa', 'Adamawa', 'Katsina',
];

type Condition = 'excellent' | 'good' | 'fair';
type Step = 'upload' | 'analyzing' | 'result';

interface ValuationResult {
  brand: string;
  model: string;
  yearRange: string;
  yearMid: string;
  trim: string;
  bodyType: string;
  vehicleType: string;
  condition: string;
  conditionLabel: string;
  location: string;
  estimatedCarType: string;
  suggestedPrice: number;
  priceRangeLow: number;
  priceRangeHigh: number;
  confidence: string;
  similarListingsCount: number;
  valuationFactors: string[];
  disclaimer: string;
  color: string;
  fuelType: string;
  transmission: string;
}

export interface ValuationFlowProps {
  mode: 'homepage' | 'add-listing';
  onPrefill?: (data: Record<string, any>) => void;
  onClose?: () => void;
}

function formatNairaFull(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

const CONDITIONS: { value: Condition; label: string; desc: string }[] = [
  { value: 'excellent', label: 'Excellent', desc: 'Like new, all working' },
  { value: 'good', label: 'Good', desc: 'Minor wear, fully functional' },
  { value: 'fair', label: 'Fair', desc: 'Visible wear, may need repairs' },
];

const ANALYSIS_STEPS = [
  'Identifying make, model & year...',
  'Checking Nigerian market prices...',
  'Calculating valuation...',
];

// ─── HOMEPAGE MODE: compact inline flow ──────────────────────────────────────
export function ValuationInline({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>('upload');
  const [imagePreview, setImagePreview] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imageMimeType, setImageMimeType] = useState('image/jpeg');
  const [condition, setCondition] = useState<Condition>('good');
  const [location, setLocation] = useState('Lagos');
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please upload a JPG or PNG image.'); return; }
    if (file.size > 10 * 1024 * 1024) { setError('Image must be under 10MB.'); return; }
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImagePreview(dataUrl);
      setImageBase64(dataUrl.split(',')[1]);
      setImageMimeType(file.type);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const runAnalysis = async () => {
    setStep('analyzing'); setAnalysisStep(0); setError('');
    const interval = setInterval(() => {
      setAnalysisStep(prev => prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev);
    }, 2000);
    try {
      const res = await fetch('/api/car-valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, mimeType: imageMimeType, condition, location }),
      });
      clearInterval(interval);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Analysis failed');
      setResult(json.data);
      setStep('result');
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || 'Something went wrong. Please try again.');
      setStep('upload');
    }
  };

  const handleListYourCar = () => {
    if (!result) return;
    sessionStorage.setItem('valuation_prefill', JSON.stringify({
      brand: result.brand, model: result.model, year: result.yearMid,
      bodyType: result.bodyType, vehicleType: result.vehicleType,
      condition: result.estimatedCarType, color: result.color,
      fuelType: result.fuelType, transmission: result.transmission,
      location: result.location, suggestedPrice: result.suggestedPrice,
      priceRangeLow: result.priceRangeLow, priceRangeHigh: result.priceRangeHigh,
      _source: 'valuation',
    }));
    router.push('/add-listing?from=valuation');
  };

  const handleSellForMe = () => {
    if (!result) return;
    const carName = `${result.yearRange} ${result.brand} ${result.model}${result.trim ? ' ' + result.trim : ''}`;
    const msg = encodeURIComponent(`Hi, I used the Valuation tool on Naira Autos.\n\nCar: ${carName}\nValue: ${formatNairaFull(result.suggestedPrice)}\nRange: ${formatNairaFull(result.priceRangeLow)} - ${formatNairaFull(result.priceRangeHigh)}\nCondition: ${result.conditionLabel}\nLocation: ${result.location}\n\nI'd like to use the Sell For Me service.`);
    window.open(`https://wa.me/2349032032472?text=${msg}`, '_blank');
  };

  const reset = () => {
    setStep('upload'); setImagePreview(''); setImageBase64('');
    setCondition('good'); setLocation('Lagos'); setResult(null); setError('');
  };

  // STEP: UPLOAD
  if (step === 'upload') {
    return (
      <div className="space-y-3">
        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => !imagePreview && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl transition-all ${
            isDragging ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-emerald-400 hover:bg-emerald-50/40 dark:hover:bg-emerald-900/20 dark:bg-gray-800/50'
          } ${imagePreview ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

          {imagePreview ? (
            /* Image uploaded: show preview + conditions side by side */
            <div className="flex flex-col sm:flex-row gap-4 p-3">
              {/* Image preview */}
              <div className="relative flex-shrink-0">
                <img src={imagePreview} alt="Car" className="w-full sm:w-40 h-32 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); reset(); }}
                  className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>

              {/* Conditions — plain text + radio, no container */}
              <div className="flex-1 flex flex-col justify-center gap-1">
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-1">Select condition</p>
                {CONDITIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer py-0.5">
                    <input
                      type="radio" name="hp-condition" value={opt.value}
                      checked={condition === opt.value}
                      onChange={() => setCondition(opt.value)}
                      className="accent-emerald-600 w-3.5 h-3.5"
                    />
                    <span className="text-sm text-gray-800 dark:text-gray-100">
                      <span className="font-medium">{opt.label}</span>
                      <span className="text-gray-500 dark:text-gray-400"> — {opt.desc}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            /* No image yet */
            <div className="flex flex-col items-center gap-3 p-5">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                <Camera className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Tap to upload your car photo</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">JPG, PNG, WebP • Max 10MB</p>
              </div>
              <div className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2 rounded-lg pointer-events-none">
                Choose Photo
              </div>
            </div>
          )}
        </div>

        {imagePreview && (
          <div className="flex items-center gap-2">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 h-9 rounded-lg border border-gray-200 dark:border-gray-600 px-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <Button onClick={runAnalysis} className="h-9 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4">
              Analyse Car
            </Button>
            {onClose && (
              <Button onClick={onClose} variant="outline" className="h-9 text-sm px-3">Cancel</Button>
            )}
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />{error}
          </div>
        )}

        {!imagePreview && (
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">💡 Best results: clear photo • front or side angle • full car visible</p>
        )}
      </div>
    );
  }

  // STEP: ANALYZING
  if (step === 'analyzing') {
    return (
      <div className="space-y-4">
        {imagePreview && (
          <div className="relative rounded-xl overflow-hidden h-36">
            <img src={imagePreview} alt="Car" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-white text-center">
                <Loader2 className="h-7 w-7 animate-spin mx-auto mb-1.5" />
                <p className="text-sm font-medium">Analysing your car...</p>
              </div>
            </div>
          </div>
        )}
        <div className="space-y-2">
          {ANALYSIS_STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2.5">
              {i < analysisStep ? <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                : i === analysisStep ? <Loader2 className="h-4 w-4 text-emerald-500 animate-spin flex-shrink-0" />
                : <div className="h-4 w-4 rounded-full border-2 border-gray-200 flex-shrink-0" />}
              <span className={`text-sm ${i <= analysisStep ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // STEP: RESULT
  if (step === 'result' && result) {
    const carName = `${result.yearRange} ${result.brand} ${result.model}${result.trim ? ' ' + result.trim : ''}`;
    return (
      <div className="space-y-3">

        {/* Car identity row */}
        <div className="flex items-center gap-3">
          {imagePreview && <img src={imagePreview} alt="Car" className="w-14 h-10 object-cover rounded-lg flex-shrink-0" />}
          <div>
            <p className="font-bold text-foreground text-sm leading-tight">{carName}</p>
            <p className="text-xs text-muted-foreground">{result.conditionLabel} • {result.location}</p>
          </div>
          <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${
            result.confidence === 'High'   ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
            : result.confidence === 'Medium' ? 'bg-amber-400/15 text-amber-600 dark:text-amber-400'
            : 'bg-red-500/10 text-red-500'}`}>
            {result.confidence}
          </span>
        </div>

        {/* Price range — replaces single Estimated Market Value block */}
        <div className="bg-emerald-500 rounded-xl px-4 py-3 shadow-lg shadow-emerald-500/20">
          <p className="text-[11px] text-white/70 font-semibold uppercase tracking-widest mb-2">Estimated Market Range</p>
          <div className="flex items-center gap-3">
            <div>
              <p className="text-[10px] text-white/60 mb-0.5">Low</p>
              <p className="text-xl font-black text-white leading-none">{formatNairaFull(result.priceRangeLow)}</p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full h-1.5 rounded-full bg-white/20 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 border-2 border-emerald-500 shadow-sm" />
              </div>
              <p className="text-[10px] text-amber-300 font-semibold">~{formatNairaFull(result.suggestedPrice)}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/60 mb-0.5">High</p>
              <p className="text-xl font-black text-white leading-none">{formatNairaFull(result.priceRangeHigh)}</p>
            </div>
          </div>
        </div>

        {/* Valuation factors */}
        {result.valuationFactors?.length > 0 && (
          <div className="bg-muted/50 rounded-xl p-3">
            <p className="text-xs font-semibold text-foreground mb-1.5">📊 Valuation Factors</p>
            <ul className="space-y-0.5">
              {result.valuationFactors.map((f, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-emerald-500 mt-0.5">•</span>{f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Disclaimer — no container */}
        <p className="text-xs text-amber-600 dark:text-amber-400 leading-relaxed">
          ⚠️ {result.disclaimer || 'Estimate based on visible condition. Actual value depends on mileage, mechanical condition, and service history.'}
        </p>

        {/* CTAs */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleListYourCar} className="h-11 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm">
              🚗 List Your Car
            </Button>
            <Button onClick={handleSellForMe} className="h-11 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-sm">
              <MessageCircle className="h-4 w-4 mr-1.5" /> Sell For Me
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">"List Your Car" pre-fills the form • "Sell For Me" is a 5% commission service</p>
          <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground underline w-full text-center transition-colors">
            Try another photo
          </button>
        </div>

      </div>
    );
  }

  return null;
}

// ─── ADD-LISTING MODE: compact panel ─────────────────────────────────────────
export function ValuationFlow({ mode, onPrefill, onClose }: ValuationFlowProps) {
  if (mode === 'homepage') return <ValuationInline onClose={onClose} />;

  // add-listing mode — same upload UI but on completion calls onPrefill and shows price advisory
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>('upload');
  const [imagePreview, setImagePreview] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imageMimeType, setImageMimeType] = useState('image/jpeg');
  const [condition, setCondition] = useState<Condition>('good');
  const [location, setLocation] = useState('Lagos');
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please upload an image.'); return; }
    if (file.size > 10 * 1024 * 1024) { setError('Image must be under 10MB.'); return; }
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImagePreview(dataUrl);
      setImageBase64(dataUrl.split(',')[1]);
      setImageMimeType(file.type);
    };
    reader.readAsDataURL(file);
  }, []);

  const runAnalysis = async () => {
    setStep('analyzing'); setAnalysisStep(0); setError('');
    const interval = setInterval(() => {
      setAnalysisStep(prev => prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev);
    }, 2000);
    try {
      const res = await fetch('/api/car-valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, mimeType: imageMimeType, condition, location }),
      });
      clearInterval(interval);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Analysis failed');
      setResult(json.data);
      setStep('result');
      if (onPrefill) onPrefill(json.data);
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || 'Something went wrong.');
      setStep('upload');
    }
  };

  const reset = () => {
    setStep('upload'); setImagePreview(''); setImageBase64('');
    setCondition('good'); setLocation('Lagos'); setResult(null); setError('');
  };

  if (step === 'upload' || step === 'analyzing') {
    return (
      <div className="space-y-3">
        <div
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => !imagePreview && step !== 'analyzing' && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl transition-all ${
            isDragging ? 'border-emerald-500 bg-emerald-50'
            : 'border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/40'
          } ${imagePreview && step !== 'analyzing' ? 'cursor-default' : step === 'analyzing' ? 'cursor-wait' : 'cursor-pointer'}`}
        >
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

          {step === 'analyzing' ? (
            <div className="flex items-center gap-3 p-3">
              {imagePreview && <img src={imagePreview} alt="Car" className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />}
              <div className="flex-1 space-y-1.5">
                {ANALYSIS_STEPS.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {i < analysisStep ? <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                      : i === analysisStep ? <Loader2 className="h-3.5 w-3.5 text-emerald-500 animate-spin flex-shrink-0" />
                      : <div className="h-3.5 w-3.5 rounded-full border border-gray-200 flex-shrink-0" />}
                    <span className={`text-xs ${i <= analysisStep ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : imagePreview ? (
            <div className="flex flex-col sm:flex-row gap-3 p-3">
              <div className="relative flex-shrink-0">
                <img src={imagePreview} alt="Car" className="w-full sm:w-32 h-24 object-cover rounded-lg" />
                <button type="button" onClick={(e) => { e.stopPropagation(); reset(); }}
                  className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-0.5">
                  <X className="h-3 w-3" />
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-0.5">
                <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-1">Select condition</p>
                {CONDITIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer py-0.5">
                    <input type="radio" name="al-condition" value={opt.value}
                      checked={condition === opt.value} onChange={() => setCondition(opt.value)}
                      className="accent-emerald-600 w-3.5 h-3.5" />
                    <span className="text-sm text-gray-800">
                      <span className="font-medium">{opt.label}</span>
                      <span className="text-gray-500"> — {opt.desc}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Camera className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Upload a photo of your car</p>
                <p className="text-xs text-gray-400">AI identifies it and fills the form • JPG, PNG • Max 10MB</p>
              </div>
            </div>
          )}
        </div>

        {imagePreview && step !== 'analyzing' && (
          <div className="flex items-center gap-2">
            <select value={location} onChange={(e) => setLocation(e.target.value)}
              className="flex-1 h-9 rounded-lg border border-gray-200 px-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
              {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <Button onClick={runAnalysis} className="h-9 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4">
              Fill Out Form
            </Button>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />{error}
          </div>
        )}
      </div>
    );
  }

  if (step === 'result' && result) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
          <CheckCircle className="h-4 w-4 flex-shrink-0" />
          <p className="text-sm font-medium">
            Form filled with <strong>{result.brand} {result.model}</strong> details. Review all fields below.
          </p>
        </div>
        <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-600 underline">
          Try a different photo
        </button>
      </div>
    );
  }

  return null;
}