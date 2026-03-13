import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import { ConditionalBottomNav } from '@/components/layout/ConditionalBottomNav';
import { Toaster } from '@/components/ui/toaster';
import { PWAInstaller } from '@/components/PWAInstaller';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Footer } from '@/components/home/Footer';

export const metadata: Metadata = {
  title: 'Naira Autos - Nigerian Car Marketplace',
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
    title: 'Naira Autos - Nigerian Car Marketplace',
    description: 'Buy and sell cars with video verification',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naira Autos - Nigerian Car Marketplace',
    description: 'Buy and sell cars with video verification',
    images: [
      {
        url: '/og-image.png',
      },
    ],
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
