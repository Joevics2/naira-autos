'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

// Footer is hidden on the 5 bottom-nav pages (they use the bottom nav instead)
// and on any full-screen tool pages where a footer would be distracting
const HIDE_ON_PATHS = ['/', '/tools', '/vehicles', '/tools/glossary', '/blog'];

export function Footer() {
  const pathname = usePathname();
  if (HIDE_ON_PATHS.includes(pathname)) return null;

  return (
    <footer className="bg-card border-t py-6 mt-auto">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Facebook className="h-5 w-5" />
            <span className="text-sm">Facebook</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Twitter className="h-5 w-5" />
            <span className="text-sm">Twitter</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span className="text-sm">Instagram</span>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Youtube className="h-5 w-5" />
            <span className="text-sm">YouTube</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <span className="text-border">|</span>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          <span className="text-border">|</span>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          <span className="text-border">|</span>
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          <span className="text-border">|</span>
          <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
          <span className="text-border">|</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <span className="text-border">|</span>
          <Link href="/tools" className="hover:text-primary transition-colors">Tools</Link>
        </div>

        <div className="text-center text-xs text-muted-foreground mt-4">
          © {new Date().getFullYear()} Naira Autos. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
