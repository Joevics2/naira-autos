import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, AlertTriangle } from 'lucide-react';
import VehicleLicenseNigeriaClient from './client';

export const metadata: Metadata = {
  title: 'Vehicle License Renewal Nigeria 2026 — Requirements, Steps & State Portals',
  description: 'How to renew your Nigerian vehicle license: required documents, step-by-step process, official state portals (Lagos MVAA, FCT DRTS), and typical costs. Not the same as your driver\'s license — see the difference.',
  keywords: [
    'vehicle license renewal nigeria',
    'how to renew vehicle license nigeria',
    'vehicle license renewal nigeria online',
    'vehicle license vs drivers license nigeria',
    'nvis frsc portal',
    'lagos mvaa portal',
    'road worthiness renewal cost',
    'vehicle license renewal requirements nigeria',
    'expired vehicle license fine nigeria',
  ].join(', '),
  alternates: { canonical: 'https://www.naira.autos/tools/vehicle-license/nigeria' },
  openGraph: {
    title: 'Vehicle License Renewal Nigeria — Requirements, Steps & Portals | Naira Autos',
    description: 'Free guide to renewing your Nigerian vehicle license — requirements, process, official portals, and costs by state.',
    url: 'https://www.naira.autos/tools/vehicle-license/nigeria',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Vehicle License Renewal Nigeria — Requirements, Steps & State Portals',
      description: 'How to renew a Nigerian vehicle license — requirements, process, official portals, and costs by state.',
      url: 'https://www.naira.autos/tools/vehicle-license/nigeria',
      dateModified: '2026-07-24',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Vehicle License', item: 'https://www.naira.autos/tools/vehicle-license' },
          { '@type': 'ListItem', position: 4, name: 'Nigeria', item: 'https://www.naira.autos/tools/vehicle-license/nigeria' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is a vehicle license the same as a driver\'s license in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'No — they are completely different documents. The vehicle license (also called the vehicle particulars sticker) is tied to your car and renewed annually at your state MVAA or VIO. Your driver\'s license is tied to you personally, issued by the FRSC, and valid for 3 or 5 years. Renewing one has no effect on the other.' } },
        { '@type': 'Question', name: 'How do I renew my vehicle license online in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Lagos and FCT residents can renew fully online: Lagos via the MVAA portal (lagosmvnla.ng), FCT via the DRTS self-service portal (selfservice.fctevreg.com). Enter your plate number, verify your details, pay online, then visit a collection station for the physical sticker or inspection. Most other states still require an in-person visit to the state MVAA or VIO office.' } },
        { '@type': 'Question', name: 'What documents do I need to renew a vehicle license in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Typically: your expiring vehicle license, valid third-party or comprehensive insurance, a roadworthiness certificate (often renewed together), proof of ownership, a valid ID (NIN increasingly required), your plate number and VIN/chassis number, and proof of payment for any outstanding fines.' } },
        { '@type': 'Question', name: 'How much does vehicle license renewal cost in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'It varies by state, engine size, and vehicle type. A full renewal package (license + roadworthiness + insurance) typically runs ₦15,000–₦50,000+ for a private saloon car. Use the state picker above for a range specific to your state, or the Naira Autos Registration Fee Calculator for a detailed breakdown.' } },
        { '@type': 'Question', name: 'What happens if my vehicle license expires in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'You risk fines (typically ₦5,000–₦15,000 per expired document), vehicle impoundment, and compounding penalties the longer you wait. FRSC has significantly increased enforcement in recent years. Renew at least 30 days before expiry to avoid delays.' } },
      ],
    },
  ],
};

export default function VehicleLicenseNigeriaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools/vehicle-license" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools/vehicle-license" className="hover:text-white/60 transition-colors">Vehicle License</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇳🇬 Nigeria</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">Free Guide</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">36 States + FCT</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Vehicle License<br /><span className="text-emerald-400">Renewal — Nigeria</span>
            </h1>
            <p className="text-white/75 text-sm leading-relaxed">Requirements, step-by-step process, official state portals, and typical costs — pick your state below.</p>
          </div>
        </div>
      </div>

      {/* Vehicle License vs Driver's License — the #1 point of confusion */}
      <div className="bg-amber-500/5 border-y border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-bold text-foreground">This page is about your Vehicle License — not your Driver&apos;s License. They are different documents.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-card border border-emerald-500/30">
              <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2">Vehicle License (this page)</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Belongs to your <strong className="text-foreground">car</strong>, not you</li>
                <li>Renewed <strong className="text-foreground">every year</strong></li>
                <li>Issued by your <strong className="text-foreground">state MVAA/VIO</strong></li>
                <li>Also called the &quot;vehicle particulars sticker&quot;</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">Driver&apos;s License (not this page)</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Belongs to <strong className="text-foreground">you</strong>, the driver</li>
                <li>Valid for <strong className="text-foreground">3 or 5 years</strong></li>
                <li>Issued nationally by the <strong className="text-foreground">FRSC</strong></li>
                <li>Use the <Link href="/tools/registration-fee-calculator" className="text-amber-600 dark:text-amber-400 hover:underline">Registration Fee Calculator</Link> (Driver&apos;s Licence mode) for this</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <VehicleLicenseNigeriaClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          {/* Editorial content */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Why Vehicle License Renewal Matters
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
                <div className="space-y-4">
                  <p>Nigerian vehicle license renewal is handled primarily at the state level — Lagos through MVAA, FCT through DRTS — with FRSC/NVIS providing national database oversight. It is required annually, and the exact process and fees vary slightly by state.</p>
                  <p>Renewal is rarely just one document. Your vehicle license, roadworthiness certificate, and insurance typically expire around the same time and are usually renewed together, since most states check them as a bundle before issuing a new sticker.</p>
                </div>
                <div className="space-y-4">
                  <p>Enforcement has tightened significantly in recent years — expired documents now carry a real risk of fines and vehicle impoundment, not just a warning. There is no nationwide grace period, so the safest approach is renewing 30 days before expiry rather than waiting.</p>
                  <p>Fees are set by each state and adjusted periodically by the Joint Tax Board (JTB), which is why this guide gives ranges rather than fixed prices — always confirm the exact figure on your state&apos;s official portal before paying.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Vehicle License Renewal FAQ
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'Is a vehicle license the same as a driver\'s license?', a: 'No. The vehicle license is tied to your car and renewed annually through your state MVAA/VIO. Your driver\'s license is tied to you personally, issued nationally by the FRSC, and valid for 3 or 5 years. Renewing one has no effect on the other.' },
                { q: 'Can I renew my vehicle license online?', a: 'Yes in Lagos (lagosmvnla.ng) and FCT (selfservice.fctevreg.com) — enter your plate number, verify details, pay online, then collect your sticker or complete inspection at a station. Most other states still require an in-person office visit.' },
                { q: 'What documents do I need?', a: 'Your expiring vehicle license, valid insurance, a roadworthiness certificate, proof of ownership, a valid ID (NIN increasingly required), your plate/VIN details, and proof of payment for any outstanding fines.' },
                { q: 'What if my license has already expired?', a: 'Renew as soon as possible — fines typically run ₦5,000–₦15,000 per expired document and can compound the longer you wait, with real impoundment risk in states with active enforcement like Lagos.' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3">
                    <span className="text-sm font-semibold text-foreground">{q}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4"><p className="text-sm text-muted-foreground leading-relaxed">{a}</p></div>
                </details>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground/70 border-t border-border pt-6">
            This guide is informational only and not affiliated with the FRSC or any state government agency. Fees and processes change periodically — always confirm current figures on your state&apos;s official portal before paying, and avoid unofficial agents or unverified payment links.
          </p>

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Free Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/registration-fee-calculator', label: 'Registration Fee Calculator', color: 'blue' },
                { href: '/tools/vehicle-papers-checklist',    label: 'Vehicle Papers Checklist',     color: 'rose' },
                { href: '/tools/vin-checker',                 label: 'VIN Checker',                  color: 'violet' },
              ].map(({ href, label, color }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-${color}-50 dark:bg-${color}-500/10 border border-${color}-200 dark:border-${color}-500/20 hover:bg-${color}-100 dark:hover:bg-${color}-500/20 transition-all`}
                >
                  <p className={`text-sm font-bold text-${color}-700 dark:text-${color}-400`}>{label}</p>
                  <ChevronRight className={`h-4 w-4 text-${color}-500`} />
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
