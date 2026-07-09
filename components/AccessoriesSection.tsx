// components/AccessoriesSection.tsx
// Shared by /parts ("Common Accessories") and /maintenance ("Add-ons & Upgrades").
// Renders nothing when there's no data — conditional render, not an empty state.

import { ShoppingBag } from 'lucide-react';
import type { AccessoryItem } from '@/lib/vehicle-helpers';
import { buildAmazonSearchUrl } from '@/lib/vehicle-helpers';

interface AccessoriesSectionProps {
  title: string;
  items?: AccessoryItem[] | null;
}

export function AccessoriesSection({ title, items }: AccessoriesSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4"
          >
            <p className="text-sm font-semibold text-foreground">{item.name}</p>
            {item.description && (
              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            )}
            <a
              href={buildAmazonSearchUrl(item.name)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-auto inline-flex w-fit items-center text-sm font-medium text-primary underline underline-offset-2"
            >
              Shop on Amazon
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
