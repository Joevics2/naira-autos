'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Footer is hidden only on screens where the bottom navigation menu shows
const HIDE_ON_PATHS = ['/', '/tools', '/vehicles', '/tools/glossary', '/blog'];

export function Footer() {
  const pathname = usePathname();
  if (HIDE_ON_PATHS.includes(pathname)) return null;

  return (
    <footer className="bg-card border-t py-6 mt-auto">
      <div className="max-w-screen-xl mx-auto px-4">
        
        {/* Navigation Links */}
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

        {/* Copyright */}
        <div className="text-center text-xs text-muted-foreground mt-4">
          © {new Date().getFullYear()} Naira Autos. All rights reserved.
        </div>
      </div>
    </footer>
  );
}