'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Calculator, ChevronDown, RotateCcw, ChevronLeft, ExternalLink, AlertTriangle, Info
} from 'lucide-react';

// حدود المصرف المركزي الإماراتي: حد أقصى 60 شهرًا للسيارات الجديدة، 48 للمستعملة؛
// حد أدنى 20% دفعة أولى؛ سقف الالتزامات الشهرية 50% من الدخل.
const MAX_TERM = { new: 60, used: 48 } as const;

const FLAT_RATES = [
  { key: 'low', label: 'سعر منخفض', rate: 1.99 },
  { key: 'mid', label: 'سعر شائع', rate: 2.99 },
  { key: 'high', label: 'سعر أعلى', rate: 4.5 },
] as const;

const BANKS = [
  { name: 'بنك الإمارات دبي الوطني (Emirates NBD)', note: 'من أكبر الممولين، عروض تفضيلية مع تحويل الراتب.', url: 'https://www.emiratesnbd.com/' },
  { name: 'بنك أبوظبي التجاري (ADCB)', note: 'تمويل سيارات جديدة ومستعملة.', url: 'https://www.adcb.com/' },
  { name: 'بنك المشرق (Mashreq)', note: 'موافقات سريعة عبر التطبيق.', url: 'https://www.mashreqbank.com/' },
  { name: 'بنك رأس الخيمة الوطني (RAKBANK)', note: 'أسعار تنافسية لغير محولي الراتب أيضًا.', url: 'https://www.rakbank.ae/' },
  { name: 'بنك دبي الإسلامي (Islamic — Murabaha)', note: 'تمويل متوافق مع الشريعة بصيغة المرابحة.', url: 'https://www.dib.ae/' },
  { name: 'مصرف أبوظبي الإسلامي (ADIB)', note: 'تمويل إسلامي بديل للتمويل التقليدي.', url: 'https://www.adib.ae/' },
];

function fmtAED(n: number) { return n.toLocaleString('ar-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }); }

// يحل عدديًا عن السعر الفعلي المتناقص (annual %) الذي ينتج نفس القسط الشهري
// الناتج عن طريقة "السعر الثابت" — بالتنصيف الثنائي (bisection)، لأن دالة القسط
// متزايدة دائمًا مع السعر.
function solveReducingRate(principal: number, targetPmt: number, months: number): number {
  const pmtFromRate = (annualRate: number) => {
    const mr = annualRate / 100 / 12;
    if (mr === 0) return principal / months;
    return (principal * mr * Math.pow(1 + mr, months)) / (Math.pow(1 + mr, months) - 1);
  };
  let lo = 0, hi = 100;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (pmtFromRate(mid) < targetPmt) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

export default function TamwilSayaratClient() {
  const [vehicleType, setVehicleType] = useState<'new' | 'used'>('new');
  const [price, setPrice] = useState('100000');
  const [downPayment, setDownPayment] = useState('20000');
  const [rateKey, setRateKey] = useState<typeof FLAT_RATES[number]['key'] | null>('mid');
  const [flatRate, setFlatRate] = useState('2.99');
  const [termMonths, setTermMonths] = useState('60');
  const [salary, setSalary] = useState('');
  const [showBanks, setShowBanks] = useState(false);

  const pickRate = (key: typeof FLAT_RATES[number]['key']) => {
    setRateKey(key);
    setFlatRate(String(FLAT_RATES.find(r => r.key === key)!.rate));
  };

  useEffect(() => {
    if (parseInt(termMonths) > MAX_TERM[vehicleType]) setTermMonths(String(MAX_TERM[vehicleType]));
  }, [vehicleType, termMonths]);

  const calc = useMemo(() => {
    const p = parseFloat(price) || 0;
    const dp = parseFloat(downPayment) || 0;
    const fr = parseFloat(flatRate) || 0;
    const months = parseInt(termMonths) || 0;
    const sal = parseFloat(salary) || 0;
    if (p <= 0 || months <= 0 || fr < 0) return null;
    const principal = Math.max(p - dp, 0);
    const totalInterestFlat = principal * (fr / 100) * (months / 12);
    const monthly = (principal + totalInterestFlat) / months;
    const totalPaid = monthly * months + dp;
    const effectiveRate = principal > 0 ? solveReducingRate(principal, monthly, months) : 0;
    return {
      monthly, totalPaid, totalInterestFlat, principal, effectiveRate,
      downPct: p > 0 ? (dp / p) * 100 : 0,
      dbr: sal > 0 ? monthly / sal : 0,
      sal,
    };
  }, [price, downPayment, flatRate, termMonths, salary]);

  const reset = () => {
    setVehicleType('new'); setPrice('100000'); setDownPayment('20000');
    setRateKey('mid'); setFlatRate('2.99'); setTermMonths('60'); setSalary('');
  };
  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all text-right';
  const termOptions = vehicleType === 'new' ? [12, 24, 36, 48, 60] : [12, 24, 36, 48];

  return (
    <div dir="rtl" className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── المدخلات ── */}
          <div className="lg:col-span-2 space-y-4">

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">نوع السيارة</label>
              <div className="grid grid-cols-2 gap-2">
                {(['new', 'used'] as const).map(v => (
                  <button key={v} onClick={() => setVehicleType(v)}
                    className={`h-10 rounded-lg text-sm font-bold border transition-all ${vehicleType === v ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    {v === 'new' ? 'جديدة' : 'مستعملة'}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">الحد الأقصى للمدة: {MAX_TERM[vehicleType]} شهرًا</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">سعر السيارة (درهم) <span className="text-red-500">*</span></label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="100000" className={iCls} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">الدفعة الأولى</label>
                {calc && <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{calc.downPct.toFixed(0)}%</span>}
              </div>
              <input type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)} placeholder="20000" className={iCls} />
              <p className="text-xs text-muted-foreground mt-1">الحد الأدنى التنظيمي: 20%</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">السعر الثابت المعلن (Flat Rate)</label>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {FLAT_RATES.map(r => (
                  <button key={r.key} onClick={() => pickRate(r.key)}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border transition-all ${rateKey === r.key ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    <span className="font-bold">{r.label}</span>
                    <span className={rateKey === r.key ? 'text-white/80' : 'text-muted-foreground/70'}>{r.rate}%</span>
                  </button>
                ))}
              </div>
              <div className="relative mt-2">
                <input type="number" value={flatRate} onChange={e => { setFlatRate(e.target.value); setRateKey(null); }} step="0.01" min="0" max="20" className={`${iCls} pl-16 pr-3`} />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">% سنويًا</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">المدة</label>
                <div className="grid grid-cols-2 gap-1">
                  {termOptions.map(t => (
                    <button key={t} onClick={() => setTermMonths(String(t))}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${termMonths === String(t) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                      {t} شهر
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">الراتب الشهري <span className="text-muted-foreground font-normal">(اختياري)</span></label>
                <input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="15000" className={iCls} />
              </div>
            </div>

            <button onClick={reset} className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
              <RotateCcw className="h-3.5 w-3.5" /> إعادة تعيين
            </button>
          </div>

          {/* ── النتيجة ── */}
          <div className="lg:col-span-3 space-y-3">
            {!calc ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                  <Calculator className="h-5 w-5 text-emerald-500/50" />
                </div>
                <p className="text-sm text-muted-foreground">املأ الحقول — تتحدث النتيجة فورًا.</p>
              </div>
            ) : (
              <>
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">القسط الشهري</p>
                  <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 leading-none"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    {fmtAED(calc.monthly)}
                  </p>
                  <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-1.5">{termMonths} شهرًا \u00b7 سعر ثابت معلن {flatRate}%</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/25">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400 mb-0.5">السعر الفعلي الحقيقي (المتناقص)</p>
                      <p className="text-xs text-amber-800/70 dark:text-amber-200/60">هذا ما تدفعه فعليًا، وليس الرقم المعلن أعلاه</p>
                    </div>
                    <p className="text-3xl font-black text-amber-700 dark:text-amber-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                      {calc.effectiveRate.toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">مبلغ التمويل</p>
                    <p className="text-sm font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtAED(calc.principal)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">إجمالي الفائدة</p>
                    <p className="text-sm font-black text-red-600 dark:text-red-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtAED(calc.totalInterestFlat)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">إجمالي المدفوع</p>
                    <p className="text-sm font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtAED(calc.totalPaid)}</p>
                  </div>
                </div>

                {calc.downPct < 20 && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-800 dark:text-red-200/80">الدفعة الأولى <strong>{calc.downPct.toFixed(0)}%</strong> أقل من الحد الأدنى الذي يفرضه المصرف المركزي (20%).</p>
                  </div>
                )}

                <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/25">
                  <Info className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800 dark:text-blue-200/80">رسوم السداد المبكر محكومة بسقف 1% من الرصيد المتبقي، وبحد أقصى 10,000 درهم.</p>
                </div>

                {calc.sal > 0 && (
                  <div className="p-4 rounded-2xl border border-border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">القسط / الراتب الشهري</p>
                      <p className="text-2xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                        {(calc.dbr * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${calc.dbr <= 0.5 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${Math.min(calc.dbr * 150, 100)}%` }} />
                    </div>
                    <p className="text-xs mt-2 text-muted-foreground">سقف المصرف المركزي لإجمالي الالتزامات الشهرية: 50% من الدخل.</p>
                  </div>
                )}

                <button onClick={() => setShowBanks(v => !v)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-border bg-card hover:border-emerald-500/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                  <span>بنوك تمويل السيارات في الإمارات</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showBanks ? 'rotate-180' : ''}`} />
                </button>
                {showBanks && (
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-3 py-2 bg-muted/50 border-b border-border">
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide">تمويل السيارات — الإمارات</p>
                    </div>
                    <div className="divide-y divide-border">
                      {BANKS.map(l => (
                        <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-between px-3 py-2.5 hover:bg-muted/30 transition-colors group gap-3">
                          <div>
                            <p className="text-xs font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{l.name}</p>
                            <p className="text-xs text-muted-foreground">{l.note}</p>
                          </div>
                          <ExternalLink className="h-3 w-3 text-muted-foreground/40 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <Link href="/vehicles" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">تصفح السيارات</p>
                    <ChevronLeft className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                  </Link>
                  <Link href="/adawat/fahs-raqm-alhaykal" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group">
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-400">فحص رقم الهيكل</p>
                    <ChevronLeft className="h-3.5 w-3.5 text-blue-600 dark:text-blue-500" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
