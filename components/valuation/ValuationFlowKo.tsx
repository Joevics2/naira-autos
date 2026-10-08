'use client';

import { useState, useRef, useCallback } from 'react';
import { Camera, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VALUATION_COUNTRIES, getValuationCountry, symbolFor } from '@/lib/currencies';

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
  currency: string;
  country: string;
  confidence: string;
  similarListingsCount: number;
  valuationFactors: string[];
  disclaimer: string;
  color: string;
  fuelType: string;
  transmission: string;
}

function formatCurrencyFull(amount: number, symbol: string): string {
  return `${symbol}${amount.toLocaleString('en-US')}`;
}

const CONDITIONS: { value: Condition; label: string; desc: string }[] = [
  { value: 'excellent', label: '최상', desc: '거의 새 차와 같고 모든 기능이 완벽하게 작동함' },
  { value: 'good', label: '좋음', desc: '사용한 흔적이 적고 전반적으로 잘 운행됨' },
  { value: 'fair', label: '보통', desc: '눈에 보이는 사용 흔적이 있고 수리가 필요할 수 있음' },
];

function analysisStepsFull(countryName: string) {
  return [
    '분석을 위해 사진을 업로드하는 중...',
    '역이미지 검색을 수행하는 중...',
    '브랜드, 모델, 연식을 확인하는 중...',
    `${countryName}의 시장 가격을 조회하는 중...`,
    '시세를 계산하는 중...',
    '결과 보고서를 작성하는 중...',
  ];
}

// ─── MAIN MODE: compact inline flow ────────────────────────────────────────
export function ValuationInlineKo({ onClose }: { onClose?: () => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>('upload');
  const [imagePreview, setImagePreview] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imageMimeType, setImageMimeType] = useState('image/jpeg');
  const [condition, setCondition] = useState<Condition>('good');
  const [country, setCountry] = useState('');
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const selectedCountry = getValuationCountry(country || undefined);
  const currencySymbol = symbolFor(selectedCountry.currency);
  const ANALYSIS_STEPS_FULL = analysisStepsFull(selectedCountry.name);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) { setError('JPG 또는 PNG 형식의 사진을 업로드해 주세요.'); return; }
    if (file.size > 10 * 1024 * 1024) { setError('사진 크기는 10MB를 초과할 수 없습니다.'); return; }
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
    if (!country) { setError('먼저 국가를 선택해 주세요.'); return; }
    setStep('analyzing'); setAnalysisStep(0); setError('');
    const interval = setInterval(() => {
      setAnalysisStep(prev => prev < ANALYSIS_STEPS_FULL.length - 1 ? prev + 1 : prev);
    }, 7000);
    try {
      const loc = selectedCountry.name;
      const res = await fetch('/api/car-valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, mimeType: imageMimeType, condition, location: loc, country, lang: 'ko' }),
      });
      clearInterval(interval);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || '분석에 실패했습니다. 다시 시도해 주세요.');
      }
      setResult(json.data);
      setStep('result');
    } catch (err: any) {
      clearInterval(interval);
      const msg = err.message || '';
      const isRawTechError =
        msg.includes('JSON') || msg.includes('fetch') ||
        msg.includes('SyntaxError') || msg.includes('NetworkError') ||
        msg.includes('Failed to fetch');
      setError(isRawTechError ? '문제가 발생했습니다. 다시 시도해 주세요.' : msg);
      setStep('upload');
    }
  };

  const reset = () => {
    setStep('upload'); setImagePreview(''); setImageBase64('');
    setCondition('good'); setResult(null); setError('');
  };

  // STEP: IMAGE UPLOAD
  if (step === 'upload') {
    return (
      <div className="space-y-3">
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
            <div className="flex flex-col sm:flex-row gap-4 p-3">
              <div className="relative flex-shrink-0">
                <img src={imagePreview} alt="자동차" className="w-full sm:w-40 h-32 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); reset(); }}
                  className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-1">
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-1">차량 상태 선택</p>
                {CONDITIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer py-0.5">
                    <input
                      type="radio" name="hp-condition-ko" value={opt.value}
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
            <div className="flex flex-col items-center gap-3 p-5">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                <Camera className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">탭하여 차량 사진 업로드</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">JPG, PNG, WebP • 최대 10MB</p>
              </div>
              <div className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2 rounded-lg pointer-events-none">
                사진 선택
              </div>
            </div>
          )}
        </div>

        {imagePreview && (
          <div className="space-y-2">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className={`w-full h-9 rounded-lg border px-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                country ? 'border-gray-200 dark:border-gray-600' : 'border-amber-400'
              }`}
            >
              <option value="" disabled>국가 선택 (필수)</option>
              {VALUATION_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              <Button
                onClick={runAnalysis}
                disabled={!country}
                className="flex-1 h-9 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                차량 분석하기
              </Button>
              {onClose && (
                <Button onClick={onClose} variant="outline" className="h-9 text-sm px-3">취소</Button>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-800 rounded-lg px-3 py-2.5">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p>{error}</p>
              {imageBase64 && (
                <button onClick={runAnalysis} className="mt-1 text-xs font-semibold text-red-700 dark:text-red-400 underline">
                  다시 시도
                </button>
              )}
            </div>
          </div>
        )}

        {!imagePreview && (
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">💡 더 좋은 결과를 위한 팁: 선명한 사진 • 정면 또는 측면에서 촬영 • 차량 전체가 보이도록</p>
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
            <img src={imagePreview} alt="자동차" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-white text-center">
                <Loader2 className="h-7 w-7 animate-spin mx-auto mb-1.5" />
                <p className="text-sm font-medium">차량을 분석하는 중입니다...</p>
              </div>
            </div>
          </div>
        )}
        <div className="space-y-2">
          {ANALYSIS_STEPS_FULL.map((s, i) => (
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
    const resultSymbol = symbolFor((result.currency as any) || selectedCountry.currency);
    const confidenceLabel = result.confidence === 'High' ? '높음' : result.confidence === 'Medium' ? '중간' : '낮음';
    return (
      <div className="space-y-3">

        <div className="flex items-center gap-3">
          {imagePreview && <img src={imagePreview} alt="자동차" className="w-14 h-10 object-cover rounded-lg flex-shrink-0" />}
          <div>
            <p className="font-bold text-foreground text-sm leading-tight">{carName}</p>
            <p className="text-xs text-muted-foreground">{result.conditionLabel} • {result.location}</p>
          </div>
          <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${
            result.confidence === 'High'   ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
            : result.confidence === 'Medium' ? 'bg-amber-400/15 text-amber-600 dark:text-amber-400'
            : 'bg-red-500/10 text-red-500'}`}>
            {confidenceLabel}
          </span>
        </div>

        <div className="bg-emerald-500 rounded-xl px-4 py-3 shadow-lg shadow-emerald-500/20">
          <p className="text-[11px] text-white/70 font-semibold uppercase tracking-widest mb-2">예상 시장 가격 범위</p>
          <div className="flex items-center gap-3">
            <div>
              <p className="text-[10px] text-white/60 mb-0.5">최저</p>
              <p className="text-xl font-black text-white leading-none">{formatCurrencyFull(result.priceRangeLow, resultSymbol)}</p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full h-1.5 rounded-full bg-white/20 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 border-2 border-emerald-500 shadow-sm" />
              </div>
              <p className="text-[10px] text-amber-300 font-semibold">~{formatCurrencyFull(result.suggestedPrice, resultSymbol)}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/60 mb-0.5">최고</p>
              <p className="text-xl font-black text-white leading-none">{formatCurrencyFull(result.priceRangeHigh, resultSymbol)}</p>
            </div>
          </div>
        </div>

        {result.valuationFactors?.length > 0 && (
          <div className="bg-muted/50 rounded-xl p-3">
            <p className="text-xs font-semibold text-foreground mb-1.5">📊 평가 요소</p>
            <ul className="space-y-0.5">
              {result.valuationFactors.map((f, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-emerald-500 mt-0.5">•</span>{f}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-xs text-amber-600 dark:text-amber-400 leading-relaxed">
          ⚠️ {result.disclaimer || '이 견적은 사진에 보이는 상태를 기준으로 합니다. 실제 가격은 주행거리, 기계적 상태, 정비 기록에 따라 달라질 수 있습니다.'}
        </p>

        <div className="space-y-2">
          <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground underline w-full text-center transition-colors">
            다른 사진으로 다시 시도
          </button>
        </div>

      </div>
    );
  }

  return null;
}
