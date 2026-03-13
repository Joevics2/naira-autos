'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Phone, Check, ChevronDown, ArrowRight, Star, Shield, Zap, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const STEPS = [
  {
    number: '01',
    title: 'Send your car details',
    description: 'WhatsApp us photos, a short video, year, mileage, and asking price. Takes 2 minutes.',
    icon: MessageCircle,
    color: 'from-orange-400 to-orange-500',
  },
  {
    number: '02',
    title: 'We list & market it',
    description: 'Professional photos & video walkthrough, compelling description, listed across top platforms.',
    icon: Zap,
    color: 'from-amber-400 to-orange-400',
  },
  {
    number: '03',
    title: 'We screen buyers',
    description: 'No tyre-kickers. We verify buyers and pre-qualify serious offers only.',
    icon: Shield,
    color: 'from-orange-500 to-red-400',
  },
  {
    number: '04',
    title: 'You collect, we settle',
    description: 'Receive your money first. Pay our fee only after the deal is done.',
    icon: Users,
    color: 'from-green-400 to-emerald-500',
  },
];

const TRUST_ITEMS = [
  { label: 'No sale', sublabel: 'No fee charged' },
  { label: 'Free', sublabel: 'Car valuation' },
  { label: 'Pay after', sublabel: 'You get paid first' },
];

const COMMISSION = [
  { range: 'Under ₦2M',       fee: '₦50,000' },
  { range: '₦2M – ₦5M',      fee: '₦100,000' },
  { range: '₦5M – ₦10M',     fee: '₦200,000' },
  { range: '₦10M – ₦20M',    fee: '₦300,000' },
  { range: 'Above ₦20M',      fee: '3%' },
];

const WHATSAPP_NUMBER = '2349032047288';
const CALL_NUMBER = '09032047288';

export default function SellForMePage() {
  const [showCommission, setShowCommission] = useState(false);
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleWhatsApp = () => {
    const msg = encodeURIComponent("Hi Naira Autos! I'd like to use your Sell For Me service. Here are my car details:");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${CALL_NUMBER}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-[88vh] flex flex-col justify-center px-5 pt-16 pb-12 overflow-hidden bg-background"
      >
        {/* Background texture / glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-orange-600/20 blur-[120px]" />
          <div className="absolute bottom-[-5%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-amber-500/10 blur-[100px]" />
          {/* Diagonal grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.8"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-screen-lg mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div
              className="transition-all duration-700 text-foreground"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)' }}
            >
              {/* Tag */}
              <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-500/15 border border-orange-200 dark:border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-orange-600 dark:text-orange-400 text-xs font-semibold tracking-widest uppercase">Sell For Me Service</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-5 text-foreground">
                Sell your car.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  Zero stress.
                </span>
              </h1>

              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                Send us a WhatsApp message with your car details. We handle everything — 
                listing, marketing, buyer screening — and only charge you <em className="text-foreground not-italic font-semibold">after your car sells.</em>
              </p>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-3 mb-10">
                {TRUST_ITEMS.map((t, i) => (
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
                  onClick={handleWhatsApp}
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
                  <Phone className="w-5 h-5 text-white/70" />
                  Call Us
                </button>
              </div>
            </div>

            {/* Right — visual card stack */}
            <div
              className="hidden lg:flex justify-center items-center relative h-[480px]"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(32px)', transition: 'all 0.8s ease 0.2s' }}
            >
              {/* Back card */}
              <div className="absolute top-8 right-4 w-72 h-52 bg-muted border border-border/50 rounded-3xl rotate-6" />
              {/* Mid card */}
              <div className="absolute top-4 right-8 w-72 h-52 bg-muted/80 border border-border/60 rounded-3xl rotate-2" />
              {/* Front card */}
              <div className="relative w-80 h-auto bg-card border border-border rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Your listing</span>
                  <span className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-bold px-2.5 py-1 rounded-full border border-green-200 dark:border-green-500/30">Active</span>
                </div>
                <div className="w-full h-36 rounded-2xl bg-gradient-to-br from-orange-100 via-orange-50 to-transparent dark:from-orange-500/30 dark:via-orange-500/20 dark:to-transparent border border-orange-200 dark:border-orange-500/20 mb-4 flex items-center justify-center overflow-hidden">
                  <span className="text-5xl">🚗</span>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded-full w-3/4" />
                  <div className="h-2.5 bg-muted/70 rounded-full w-1/2" />
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="h-2 bg-muted/70 rounded-full w-16 mb-1" />
                    <div className="h-3 bg-orange-200 dark:bg-orange-400/70 rounded-full w-24" />
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-orange-500 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg dark:shadow-orange-900/40 rotate-3">
                  5% on sale
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <button
          onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors group"
        >
          <span className="text-xs tracking-widest uppercase">How it works</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-orange-400 transition-colors" />
        </button>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="px-5 py-20 border-t border-border/50">
        <div className="max-w-screen-lg mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-500 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">Four steps to sold</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="group relative bg-muted/40 hover:bg-muted/70 border border-border hover:border-border/80 rounded-2xl p-6 transition-all duration-300"
                >
                  {/* Step number — watermark */}
                  <span className="absolute top-4 right-5 text-5xl font-black text-foreground/[0.04] group-hover:text-foreground/[0.07] leading-none select-none transition-colors">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <h3 className="font-bold text-foreground text-base mb-2 leading-snug">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>

                  {/* Connector arrow (not last) */}
                  {i < STEPS.length - 1 && (
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

      {/* ── Why choose us ── */}
      <section className="px-5 py-20 border-t border-border/50">
        <div className="max-w-screen-lg mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-orange-500 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">Why us</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 text-foreground">
                We've done this before.<br />
                <span className="text-muted-foreground/60">Many times.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Selling a car in Nigeria means dealing with time-wasters, lowballers, and no-shows. 
                We screen every single buyer before they contact you — so you only deal with people 
                who are genuinely ready to buy.
              </p>
              <button
                onClick={handleWhatsApp}
                className="group inline-flex items-center gap-2 text-orange-500 dark:text-orange-400 font-bold text-sm hover:text-orange-400 dark:hover:text-orange-300 transition-colors"
              >
                Start with a WhatsApp message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'Free', label: 'Car valuation', sub: 'Before you commit' },
                { value: '0%', label: 'Upfront fees', sub: 'Pay only after sale' },
                { value: 'Fast', label: 'Listing live', sub: 'Within 24 hours' },
                { value: 'Real', label: 'Screened buyers', sub: 'No time-wasters' },
              ].map((stat, i) => (
                <div key={i} className="bg-muted border border-border rounded-2xl p-5">
                  <p className="text-3xl font-black text-foreground mb-1">{stat.value}</p>
                  <p className="text-foreground/80 text-sm font-semibold">{stat.label}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="px-5 py-20 border-t border-border/50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/25 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-600 dark:text-orange-400 text-xs font-semibold tracking-widest uppercase">Ready when you are</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-foreground">
            Let's sell your car
          </h2>
          <p className="text-muted-foreground mb-10 text-base leading-relaxed">
            Drop us a message on WhatsApp with your car details.<br className="hidden sm:block" />
            We'll get back to you within the hour.
          </p>
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 justify-center">
            <button
              onClick={handleWhatsApp}
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

          {/* Commission link */}
          <button
            onClick={() => setShowCommission(true)}
            className="mt-8 text-muted-foreground/50 hover:text-muted-foreground text-sm underline underline-offset-4 transition-colors"
          >
            View our commission structure →
          </button>
        </div>
      </section>

      {/* ── Commission modal ── */}
      <Dialog open={showCommission} onOpenChange={setShowCommission}>
        <DialogContent className="max-w-sm bg-card border border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-foreground text-lg font-black">Commission Structure</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              You pay only after your car is sold and you have received your money.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            {COMMISSION.map((c, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-muted border border-border rounded-xl">
                <span className="text-muted-foreground text-sm">{c.range}</span>
                <span className="text-foreground font-bold text-sm">{c.fee}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground/60 text-xs text-center pt-1">No sale = No fee. Simple.</p>
        </DialogContent>
      </Dialog>

    </div>
  );
}