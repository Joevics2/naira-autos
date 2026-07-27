import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, ChevronDown, Check, Car, Mic, Zap } from 'lucide-react';
import AIMechanicClient from './client';

// ── Metadata (server-rendered into <head>) ────────────────────────

export const metadata: Metadata = {
  title: 'AI Mechanic Nigeria — Free Online Car Diagnosis Tool | Axion',
  description: 'Free AI car diagnosis for Nigeria. Describe your problem, upload engine sounds or photos, and get an instant diagnosis with Naira repair cost estimates. No login required.',
  alternates: { canonical: 'https://www.naira.autos/tools/ai-mechanic' },
  openGraph: {
    title: 'Axion — Free AI Mechanic for Nigerian Cars | Naira Autos',
    description: 'Instant car diagnosis online. Upload engine sounds, photos, or describe the fault. Get urgency rating, causes, DIY steps, and repair cost in Naira. Free, no login.',
    url: 'https://www.naira.autos/tools/ai-mechanic',
  },
  keywords: ['ai car diagnostics free','ai mechanic','ai mechanic free','instant mechanic ai','online mechanic','free ai mechanic','best ai for car diagnostics','free auto diagnosis','online car diagnostic'],
};

// ── Schema ────────────────────────────────────────────────────────

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/ai-mechanic',
      name: 'AI Mechanic Nigeria — Free Online Car Diagnosis Tool',
      description: 'Free AI-powered car diagnostic tool for Nigeria. Upload engine sounds, photos, or describe faults. Get an instant diagnosis with urgency rating and repair cost in Naira.',
      url: 'https://www.naira.autos/tools/ai-mechanic',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'AI Mechanic', item: 'https://www.naira.autos/tools/ai-mechanic' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is an AI mechanic and how does it work?',
          acceptedAnswer: { '@type': 'Answer', text: 'An AI mechanic is a virtual auto mechanic that uses artificial intelligence to diagnose car problems remotely. You describe your problem, upload optional media, and the AI analyses your inputs against a vast knowledge base of vehicle faults, Nigerian road conditions, and local repair costs.' },
        },
        {
          '@type': 'Question',
          name: 'Can AI diagnose my car from engine sound alone?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Upload a recording of the knock, rattle, squeal, or grinding — even 10 seconds recorded on your phone. Our AI analyses the acoustic pattern and can identify whether you are dealing with worn bearings, piston slap, brake pad wear, or another specific fault.' },
        },
        {
          '@type': 'Question',
          name: 'Is this free?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Completely free — no login, no subscription, no payment required. Open the page and start diagnosing immediately.' },
        },
        {
          '@type': 'Question',
          name: 'Is the AI diagnosis always accurate?',
          acceptedAnswer: { '@type': 'Answer', text: 'No — it is not always 100% accurate. It is a strong starting point based on the description, photo, audio, or video you provide, but it can miss things a hands-on inspection with a lift and diagnostic scanner would catch. Treat it as a first opinion, not a final answer, and always see a qualified mechanic in person for brakes, steering, or fuel-related issues regardless of what the diagnosis says.' },
        },
        {
          '@type': 'Question',
          name: 'Is this the same as asking a mechanic online?',
          acceptedAnswer: { '@type': 'Answer', text: 'It is better in many ways. When you ask a mechanic online in a forum or WhatsApp group, you get one person\'s opinion based on a text description. Our online mechanic service analyses your description plus any photos, audio, or video you provide, cross-references it against thousands of known fault patterns, and returns a ranked diagnosis with confidence scores.' },
        },
        {
          '@type': 'Question',
          name: 'How accurate is the online car repair estimate calculator?',
          acceptedAnswer: { '@type': 'Answer', text: 'Our auto repair cost estimate draws from Nigerian market data — parts and labour at roadside mechanics and workshops across Lagos, Abuja, and Port Harcourt. We give a range (minimum to maximum) so you know what is reasonable. If a mechanic quotes significantly above our maximum, that is a red flag worth investigating.' },
        },
        {
          '@type': 'Question',
          name: 'Can I get an online auto repair estimate for any car brand?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our online vehicle repair estimate covers Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot, and all other brands commonly found on Nigerian roads.' },
        },
        {
          '@type': 'Question',
          name: 'Is my conversation history stored on your servers?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. All conversation history is saved only on your device using your browser\'s local storage. Nothing is retained on our servers beyond the active message you send for diagnosis. You can clear your history at any time from the sidebar.' },
        },
        {
          '@type': 'Question',
          name: 'Do I need to log in or create an account?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. The AI Mechanic is completely free and requires no account, no login, and no personal information. Your vehicle details are saved locally on your device for convenience.' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Axion — AI Mechanic Nigeria',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'Free AI-powered car diagnosis for Nigeria. Describe faults, upload engine sounds or photos, get instant diagnosis with Naira repair estimates.',
      url: 'https://www.naira.autos/tools/ai-mechanic',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────

export default function AIMechanicPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── Interactive client component (chat UI) ── */}
      <AIMechanicClient />

      {/* ── SEO content — server-rendered, Google sees all of this ── */}
      <div className="bg-background border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-20">

          {/* How it works */}
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

          {/* What's included */}
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

          {/* Main content + sidebar */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">

              <div>
                <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  The Smartest Way to Get Car Repair Help Online in Nigeria
                </h2>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>Every Nigerian driver has been there: a strange noise starts on Monday morning, you Google it for 20 minutes, get conflicting answers from three different forums, and end up at a mechanic who charges you NGN 5,000 just to look at it. Our <strong className="text-foreground">online mechanic service</strong> is built to break that cycle.</p>
                  <p>Naira Autos AI Mechanic is Nigeria's first <strong className="text-foreground">virtual auto mechanic</strong> — a free <strong className="text-foreground">online mechanic diagnosis</strong> tool that combines multimodal AI with automotive knowledge specific to Nigerian road conditions. Unlike a generic chatbot or a UK-trained tool, this system understands adulterated fuel, Lagos potholes, tropical heat effects on rubber seals, generator charging damage on alternators, and what parts actually cost in Ladipo or Onitsha market today.</p>
                  <p>When you need to <strong className="text-foreground">ask a mechanic online</strong> — right now, at 11pm, when no workshop is open — this is where you come. Get an answer in seconds, not hours. No appointment. No waiting room. No consultation fee.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Get an Auto Repair Estimate Online Before You Visit Any Workshop
                </h2>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>One of the most common ways Nigerian drivers get overcharged is by arriving at a workshop without knowing what a fair price looks like. Before you visit anyone, use our <strong className="text-foreground">online auto repair estimate</strong> feature to find out what your repair should cost — parts plus labour, broken down clearly.</p>
                  <p>Our <strong className="text-foreground">online car repair estimate calculator</strong> takes your specific vehicle — year, brand, model — then adjusts for the most likely fault based on everything you have described. The estimate you get is contextual, not generic. A 2010 Camry with 180,000km showing oil pressure warnings gets a different estimate than a 2020 Camry with 40,000km showing the same light, because the likely cause is different.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Can't Find a Mechanic Near You? Use Our Online Car Mechanic Instead
                </h2>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>Searching for a <strong className="text-foreground">mechanic near me</strong> at 10pm? Looking for <strong className="text-foreground">auto repair near me</strong> on a Sunday? Our <strong className="text-foreground">online car mechanic</strong> is available 24 hours a day, 7 days a week.</p>
                  <p>A 3-minute diagnosis here can save you hours of searching and thousands of naira in unnecessary repairs. When you do go to a mechanic, you will go knowing exactly what is wrong, what it should cost, and what to watch out for.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Why Audio Diagnosis Changes Everything
                </h2>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>Experienced mechanics diagnose problems by sound before they even open a bonnet. Our AI has been trained to distinguish these patterns. When you upload an audio recording of your engine, our <strong className="text-foreground">online mechanic diagnosis</strong> can jump from 60% certainty (text only) to over 85%. Record the sound on your phone. 10 seconds is enough.</p>
                </div>
              </div>
            </div>

            {/* Sticky sidebar */}
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

          {/* Nigeria-specific section */}
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
                  { title: 'Tropical heat effects', desc: 'Accounts for 35°C+ ambient temperatures that accelerate rubber seal degradation.' },
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

          {/* Comparison table */}
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

          {/* FAQ */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">FAQ</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'What is an AI mechanic and how does it work?', a: 'An AI mechanic is a virtual auto mechanic that uses artificial intelligence to diagnose car problems remotely. You describe your problem, upload optional media, and the AI analyses your inputs against a vast knowledge base of vehicle faults, Nigerian road conditions, and local repair costs.' },
                { q: 'Is the AI diagnosis always accurate?', a: 'No — it\'s not always 100% accurate. It\'s a strong starting point, but it can miss things a hands-on inspection with a lift and scanner would catch. Treat it as a first opinion, and always see a mechanic in person for brakes, steering, or fuel issues regardless of what it says.' },
                { q: 'Is this the same as asking a mechanic online?', a: 'It is better in many ways. When you ask a mechanic online in a forum or WhatsApp group, you get one person\'s opinion. Our service analyses your description plus photos, audio, or video, cross-references it against thousands of known fault patterns, and returns a ranked diagnosis with confidence scores.' },
                { q: 'Can I get an online auto repair estimate for any car brand?', a: 'Yes. Our online vehicle repair estimate covers Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot, and all other brands on Nigerian roads.' },
                { q: 'How accurate is the online car repair estimate calculator?', a: 'Our auto repair cost estimate draws from Nigerian market data. We give a range (minimum to maximum) so you know what is reasonable. If a mechanic quotes significantly above our maximum, that is a red flag worth investigating.' },
                { q: 'Can the AI diagnose my car from an engine sound alone?', a: 'Yes. Audio is one of our most powerful inputs. Upload a recording of the knock, rattle, squeal, or grinding — even 10 seconds recorded on your phone. Our AI analyses the acoustic pattern and can often pinpoint whether you are dealing with worn bearings, piston slap, brake pad wear, or another specific fault.' },
                { q: 'What if I need a mobile mechanic or car repair near me?', a: 'Our tool diagnoses your problem first so you know exactly what to ask for before you start searching. If the fault requires physical inspection or specialist equipment, we tell you clearly — and we tell you what type of mechanic or workshop to look for.' },
                { q: 'Is my conversation history stored on your servers?', a: 'No. All conversation history is saved only on your device using your browser\'s local storage. Nothing is retained on our servers beyond the active message. You can clear your history at any time from the sidebar.' },
                { q: 'Do I need to log in or create an account?', a: 'No. The AI Mechanic is completely free and requires no account, no login, and no personal information. Your vehicle details are saved locally on your device. Just open the page and start diagnosing.' },
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

          {/* Final CTA */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Ready? Diagnose Your Car Now.
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Free. Instant. No login. Nigeria's most accurate online mechanic diagnosis — available right now.
            </p>
            <a href="#axion-chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
              Start Your Free Diagnosis
            </a>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Free Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/vin-checker',              label: 'VIN Checker',                color: 'blue' },
                { href: '/tools/vehicle-papers-checklist', label: 'Vehicle Papers Checklist',   color: 'violet' },
                { href: '/tools/import-duty-calculator',   label: 'Import Duty Calculator',     color: 'emerald' },
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