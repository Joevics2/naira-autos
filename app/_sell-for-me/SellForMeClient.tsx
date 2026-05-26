'use client';

import { useState, useEffect } from 'react';
import {
  MessageCircle, Phone, Check, ChevronDown, ArrowRight,
  Shield, Zap, Users, Search, X,
} from 'lucide-react';

// ─── Accent token — swap 'orange' ↔ 'amber' to change dominant color ─────────
const ACCENT: 'orange' | 'amber' = 'orange';

const A = {
  orange: {
    pill:       'bg-orange-100 dark:bg-orange-500/15 border-orange-200 dark:border-orange-500/30',
    pillText:   'text-orange-600 dark:text-orange-400',
    dot:        'bg-orange-500',
    gradient:   'from-orange-400 to-amber-300',
    eyebrow:    'text-orange-500 dark:text-orange-400',
    link:       'text-orange-500 dark:text-orange-400 hover:text-orange-400 dark:hover:text-orange-300',
    glow1:      'bg-orange-600/20',
    glow2:      'bg-amber-500/10',
    stepColors: ['from-orange-400 to-orange-500', 'from-amber-400 to-orange-400', 'from-orange-500 to-red-400', 'from-green-400 to-emerald-500'],
  },
  amber: {
    pill:       'bg-amber-100 dark:bg-amber-500/15 border-amber-200 dark:border-amber-500/30',
    pillText:   'text-amber-600 dark:text-amber-400',
    dot:        'bg-amber-500',
    gradient:   'from-amber-400 to-yellow-300',
    eyebrow:    'text-amber-500 dark:text-amber-400',
    link:       'text-amber-500 dark:text-amber-400 hover:text-amber-400 dark:hover:text-amber-300',
    glow1:      'bg-amber-600/20',
    glow2:      'bg-yellow-500/10',
    stepColors: ['from-amber-400 to-amber-500', 'from-yellow-400 to-amber-400', 'from-amber-500 to-orange-400', 'from-green-400 to-emerald-500'],
  },
}[ACCENT];
// ─────────────────────────────────────────────────────────────────────────────

const SELL_STEPS = [
  { number: '01', title: 'Send your car details', description: 'WhatsApp us photos, a short video, year, mileage, and asking price. Takes 2 minutes.', icon: MessageCircle, color: A.stepColors[0] },
  { number: '02', title: 'We list & market it', description: 'Professional listing, compelling description, marketed across top Nigerian platforms.', icon: Zap, color: A.stepColors[1] },
  { number: '03', title: 'We screen buyers', description: 'No tyre-kickers. We verify intent and pre-qualify serious offers only.', icon: Shield, color: A.stepColors[2] },
  { number: '04', title: 'You collect, we settle', description: 'Receive your money first. Pay our fee only after the deal is done.', icon: Users, color: A.stepColors[3] },
];

const SELL_COMMISSION = [
  { range: 'Under ₦3M',    fee: '₦100,000' },
  { range: '₦3M – ₦5M',   fee: '₦200,000' },
  { range: '₦5M – ₦10M',  fee: '₦300,000' },
  { range: '₦10M – ₦20M', fee: '₦400,000' },
  { range: 'Above ₦20M',  fee: '3% of sale price' },
];

const WHATSAPP_NUMBER = '2349032047288';
const CALL_NUMBER = '09032047288';

function CommissionPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      <div
        className="absolute inset-0 bg-black/20 dark:bg-black/30 backdrop-blur-[2px] pointer-events-auto"
        onClick={onClose}
      />
      <div className="relative pointer-events-auto w-full max-w-sm mx-4 mb-6 sm:mb-0 bg-card border border-border rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/50 p-6 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <h3 className="font-black text-foreground text-lg mb-1">Commission Structure</h3>
        <p className="text-muted-foreground text-sm mb-4">
          You pay only <strong className="text-foreground font-semibold">after</strong> your car is sold and money received.
        </p>
        <div className="space-y-2">
          {SELL_COMMISSION.map((c, i) => (
            <div key={i} className="flex justify-between items-center px-4 py-3 bg-muted border border-border rounded-xl">
              <span className="text-muted-foreground text-sm">{c.range}</span>
              <span className="text-foreground font-bold text-sm">{c.fee}</span>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground/60 text-xs text-center mt-4">No sale = No fee. Simple.</p>
      </div>
    </div>
  );
}

export function SellForMeClient() {
  const [showCommission, setShowCommission] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleWhatsApp = (msg?: string) => {
    const text = msg ?? "Hi Naira Autos! I'd like to use your Sell For Me service. Here are my car details:";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleFindWhatsApp = () =>
    handleWhatsApp("Hi Naira Autos! I'd like to use your Find For Me service. Here's what I'm looking for:");

  const handleCall = () => window.open(`tel:${CALL_NUMBER}`, '_blank');

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex flex-col justify-center px-5 pt-16 pb-12 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full ${A.glow1} blur-[120px]`} />
          <div className={`absolute bottom-[-5%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full ${A.glow2} blur-[100px]`} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-screen-lg mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div
              className="transition-all duration-700"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)' }}
            >
              {/* Eyebrow tag */}
              <div className={`inline-flex items-center gap-2 ${A.pill} border rounded-full px-4 py-1.5 mb-6`}>
                <span className={`w-1.5 h-1.5 rounded-full ${A.dot} animate-pulse`} />
                <span className={`${A.pillText} text-xs font-semibold tracking-widest uppercase`}>Sell For Me Service</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-5 text-foreground">
                Sell your car.<br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${A.gradient}`}>
                  Zero stress.
                </span>
              </h1>

              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                WhatsApp us your car details. We handle listing, marketing, and buyer screening —
                and only charge you <em className="text-foreground not-italic font-semibold">after your car sells.</em>
              </p>

              {/* ── Find For Me teaser — embedded subtly ── */}
              <div className="mb-6 rounded-2xl border border-border bg-muted/40 px-5 py-4 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Search className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm font-bold leading-snug mb-0.5">
                    Want to buy a car instead? <span className="text-blue-500 dark:text-blue-400">We find it for you.</span>
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Tell us what you want. We search the market, verify the car and seller, then send you in — no scams, no wasted trips.
                  </p>
                </div>
                <button
                  onClick={handleFindWhatsApp}
                  className="flex-shrink-0 text-xs font-semibold text-blue-500 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 transition-colors mt-0.5 whitespace-nowrap"
                >
                  Find my car <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  { label: 'No sale', sublabel: 'No fee charged' },
                  { label: 'Free', sublabel: 'Car valuation' },
                  { label: 'Pay after', sublabel: 'You get paid first' },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 bg-muted border border-border rounded-full px-4 py-2">
                    <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span className="text-foreground text-sm font-semibold">{t.label}</span>
                    <span className="text-muted-foreground text-sm">— {t.sublabel}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3">
                <button
                  onClick={() => handleWhatsApp()}
                  className="group flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bb5a] text-white font-bold text-base px-7 py-4 rounded-2xl shadow-lg shadow-green-900/30 transition-all duration-200 active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                </button>
                <button
                  onClick={handleCall}
                  className="flex items-center justify-center gap-3 bg-muted hover:bg-muted/80 border border-border text-foreground font-semibold text-base px-7 py-4 rounded-2xl transition-all duration-200 active:scale-[0.98]"
                >
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  Call Us
                </button>
              </div>

              <button
                onClick={() => setShowCommission(true)}
                className="mt-6 text-muted-foreground/50 hover:text-muted-foreground text-sm underline underline-offset-4 transition-colors"
              >
                View our commission structure →
              </button>
            </div>

            {/* Right — card stack */}
            <div
              className="hidden lg:flex justify-center items-center relative h-[480px]"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(32px)', transition: 'all 0.8s ease 0.2s' }}
            >
              <div className="absolute top-8 right-4 w-72 h-52 bg-muted border border-border/50 rounded-3xl rotate-6" />
              <div className="absolute top-4 right-8 w-72 h-52 bg-muted/80 border border-border/60 rounded-3xl rotate-2" />
              <div className="absolute top-0 right-12 w-72 bg-card border border-border rounded-3xl shadow-2xl p-6 -rotate-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${A.gradient} flex items-center justify-center`}>
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-foreground font-bold text-sm">Your car is listed</p>
                    <p className="text-muted-foreground text-xs">Just now</p>
                  </div>
                </div>
                <div className="bg-muted rounded-2xl h-32 mb-4 flex items-center justify-center">
                  <p className="text-muted-foreground/40 text-xs">Car photo</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-foreground font-black text-lg">₦8,500,000</p>
                    <p className="text-muted-foreground text-xs">Toyota Camry · 2019</p>
                  </div>
                  <span className="bg-green-500/15 text-green-600 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/25">
                    Active
                  </span>
                </div>
              </div>
              <div className="absolute bottom-20 right-4 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-foreground font-bold text-sm">3 buyers interested</p>
                <p className="text-muted-foreground text-xs">All pre-screened ✓</p>
              </div>
            </div>

          </div>
        </div>

        <button
          onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors group"
        >
          <span className="text-xs tracking-widest uppercase">How it works</span>
          <ChevronDown className="w-4 h-4 animate-bounce transition-colors" />
        </button>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="px-5 py-20 border-t border-border/50">
        <div className="max-w-screen-lg mx-auto">
          <div className="text-center mb-14">
            <p className={`${A.eyebrow} text-xs font-bold uppercase tracking-widest mb-3`}>Simple Process</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">Four steps to sold</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SELL_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="group relative bg-muted/40 hover:bg-muted/70 border border-border hover:border-border/80 rounded-2xl p-6 transition-all duration-300"
                >
                  <span className="absolute top-4 right-5 text-5xl font-black text-foreground/[0.04] group-hover:text-foreground/[0.07] leading-none select-none transition-colors">
                    {step.number}
                  </span>
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-2 leading-snug">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  {i < SELL_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-5 h-5 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="px-5 py-20 border-t border-border/50">
        <div className="max-w-2xl mx-auto text-center">
          <div className={`inline-flex items-center gap-2 ${A.pill} border rounded-full px-4 py-1.5 mb-6`}>
            <span className={`w-1.5 h-1.5 rounded-full ${A.dot} animate-pulse`} />
            <span className={`${A.pillText} text-xs font-semibold tracking-widest uppercase`}>Ready when you are</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-foreground">Let's sell your car</h2>
          <p className="text-muted-foreground mb-10 text-base leading-relaxed">
            Drop us a message on WhatsApp with your car details.<br className="hidden sm:block" />
            We'll get back to you within the hour.
          </p>
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 justify-center">
            <button
              onClick={() => handleWhatsApp()}
              className="group inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bb5a] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl shadow-green-900/25 transition-all duration-200 active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
              <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
            </button>
            <button
              onClick={handleCall}
              className="inline-flex items-center justify-center gap-3 bg-muted hover:bg-muted/80 border border-border text-foreground font-semibold text-base px-8 py-4 rounded-2xl transition-all"
            >
              <Phone className="w-5 h-5 text-muted-foreground" />
              Call Us
            </button>
          </div>
          <button
            onClick={() => setShowCommission(true)}
            className="mt-8 text-muted-foreground/50 hover:text-muted-foreground text-sm underline underline-offset-4 transition-colors"
          >
            View our commission structure →
          </button>
        </div>
      </section>

      <CommissionPopup open={showCommission} onClose={() => setShowCommission(false)} />
    </div>
  );
}