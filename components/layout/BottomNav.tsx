'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wrench, CarFront, BookMarked, Newspaper } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/tools', icon: Wrench, label: 'Tools' },
    { href: '/vehicles', icon: CarFront, label: 'Prices & Parts', highlight: true },
    { href: '/guides', icon: BookMarked, label: 'Guides' },
    { href: '/blog', icon: Newspaper, label: 'Blog' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 safe-area-pb">
      <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          if (item.highlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-8"
              >
                <div
                  className={`rounded-full p-4 shadow-lg transition-colors ${
                    isActive
                      ? 'bg-primary/90'
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                >
                  <Icon className="h-6 w-6 text-primary-foreground" strokeWidth={2.5} />
                </div>
                <span className="text-xs mt-1 font-medium text-muted-foreground">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}