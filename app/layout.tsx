import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import { ConditionalBottomNav } from '@/components/layout/ConditionalBottomNav';
import { Toaster } from '@/components/ui/toaster';
import { PWAInstaller } from '@/components/PWAInstaller';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Footer } from '@/components/home/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://naira.autos';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Naira Autos - Nigerian Car Marketplace',
    template: '%s | Naira Autos',
  },
  description: 'Nigeria\'s premier car marketplace with mandatory video listings. Buy and sell cars, trucks, buses, vans, and bikes. Every vehicle includes video for full transparency.',
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
    title: 'Naira Autos - Nigerian Car Marketplace',
    description: 'Nigeria\'s premier car marketplace with mandatory video listings. Buy and sell cars, trucks, buses, vans, and bikes.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Naira Autos - Nigerian Car Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naira Autos - Nigerian Car Marketplace',
    description: 'Nigeria\'s premier car marketplace with mandatory video listings. Buy and sell cars.',
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
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
