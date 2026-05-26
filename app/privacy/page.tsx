import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Naira Autos Data Handling',
  description: 'Understand how Naira Autos collects, utilizes, and manages cookie structures and inputs across our free vehicular diagnostic platforms.',
  alternates: {
    canonical: 'https://www.naira.autos/privacy',
  },
  openGraph: {
    title: 'Naira Autos Privacy Policy',
    description: 'Clear statement outlining minimal logs collection and analytics reporting implementations.',
    url: 'https://www.naira.autos/privacy',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <div className="bg-[#080C10] border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/50">Privacy Policy</span>
          </nav>

          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">User Protection</span>
          </div>

          <h1
            className="font-black uppercase text-white leading-none tracking-tight mb-2"
            style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}
          >
            Privacy Policy
          </h1>
          <p className="text-white/60 text-xs">Last Updated: May 2026</p>
        </div>
      </div>

      <div className="bg-background">
        <div className="max-w-screen-md mx-auto px-4 py-14">
          <div className="prose dark:prose-invert space-y-8 text-sm text-muted-foreground leading-relaxed">
            
            <section>
              <h2 className="text-base font-bold text-foreground mb-2">1. Overview</h2>
              <p>
                At Naira Autos, we care about data transparency. This policy outlines how our network treats client parameters when utilizing the calculations platform hosted across www.naira.autos.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-2">2. Information Collection & Input Protection</h2>
              <p>
                Because our application suite operates primarily as an open utility, you are not forced to register user profile credentials to query basic car calculations.
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li><strong>Tool Input Metrics:</strong> Automotive variables submitted into our systems (e.g., VIN codes, car models, loan terms) are used exclusively to process results via active script components. They are not aggregated for commercial brokerage resale.</li>
                <li><strong>Voluntary Contact Information:</strong> Emails or phone records sent to us through customer help desks are exclusively retained to clear up your support requests.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-2">3. Cookies and Analytical Trackers</h2>
              <p>
                We leverage lightweight telemetry tags (such as Google Analytics or localized performance monitors) to analyze web traffic trends, monitor diagnostic load stresses, and trace page retention speeds. These programs log non-identifiable browser identities, device footprints, and geolocation tags to keep things performing optimized.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-2">4. Advertising and Third-Party Links</h2>
              <p>
                Our structural hubs may embed third-party contextual links or display banner scripts. Once you navigate outside of our site layers, we lose jurisdiction over data isolation policies. We recommend verifying their personal terms individually.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-2">5. Updates To This Statement</h2>
              <p>
                Naira Autos holds rights to modify this structural privacy text layout to mirror application design changes. Check this route periodically to review incremental shifts.
              </p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}