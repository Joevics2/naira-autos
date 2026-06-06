import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import { ConditionalBottomNav } from '@/components/layout/ConditionalBottomNav';
import { Toaster } from '@/components/ui/toaster';
import { PWAInstaller } from '@/components/PWAInstaller';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/CookieBanner';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://naira.autos';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Naira Autos — Car Prices, Tools & Guides for Nigeria',
    template: '%s | Naira Autos',
  },
  description: 'Free tools and expert guides for buying and selling cars in Nigeria. Import duty calculator, car prices, spare parts costs, AI mechanic, and the most complete Nigerian auto glossary.',
  manifest: '/manifest.json',
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
            <PWAInstaller />
            <CookieBanner />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
