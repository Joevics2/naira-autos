import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { AuthProvider } from '@/contexts/AuthContext';
import { ConditionalBottomNav } from '@/components/layout/ConditionalBottomNav';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/CookieBanner';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.naira.autos';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Naira Autos — Car Prices, Tools & Guides for Nigeria',
    template: '%s | Naira Autos',
  },
  description: 'Free tools and expert guides for buying and selling cars in Nigeria. Import duty calculator, car prices, spare parts costs, AI mechanic, and the most complete Nigerian auto glossary.',
  // Commented out: this manifest is what makes browsers treat the site as
  // an installable PWA and show their native "Install app" / "Add to Home
  // Screen" prompt automatically. Removing it stops that prompt. The
  // manifest.json file itself is untouched — just re-add this line to
  // bring installability (and the prompt) back.
  // manifest: '/manifest.json',
  themeColor: '#258055',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'google-adsense-account': 'ca-pub-2042049454847724',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    siteName: 'Naira Autos',
    title: 'Naira Autos — Car Prices, Tools & Guides for Nigeria',
    description: 'Free tools and expert guides for buying and selling cars in Nigeria. Import duty calculator, car prices, spare parts costs, AI mechanic, and the most complete Nigerian auto glossary.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Naira Autos — Car Prices, Tools & Guides for Nigeria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naira Autos — Car Prices, Tools & Guides for Nigeria',
    description: 'Free tools and expert guides for buying and selling cars in Nigeria. Import duty calculator, car prices, spare parts, and the Nigerian auto glossary.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 1. Consent Mode v2 — must run BEFORE GA4 and AdSense below.
            Sets every signal to "denied" by default until the user
            responds to CookieBanner, which calls gtag('consent','update',...) */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500
            });
          `}
        </Script>

        {/* 2. Google Analytics (GA4) — loads after the consent default,
            so it automatically respects "denied" analytics_storage until
            the user accepts via CookieBanner. */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CB9068EPJM"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-CB9068EPJM');
          `}
        </Script>

        {/* 3. AdSense — also respects the consent default set above. */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2042049454847724"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen pb-20">
              {children}
              <Footer />
            </div>
            <ConditionalBottomNav />
            <Toaster />
            <CookieBanner />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
