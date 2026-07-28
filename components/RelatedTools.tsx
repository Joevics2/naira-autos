import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { RELATED_TOOLS } from '@/lib/related-tools';

/**
 * Renders the "More Free Tools" cross-link block for a given tool slug,
 * pulling from the centralized registry in lib/related-tools.ts.
 * Returns null if the slug has no entry, so it's safe to drop in anywhere.
 */
export function RelatedTools({ tool }: { tool: string }) {
  const links = RELATED_TOOLS[tool];
  if (!links || links.length === 0) return null;

  return (
    <section>
      <h2
        className="text-xl font-black uppercase text-foreground mb-4"
        style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
      >
        More Free Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {links.map(({ href, label, color }) => (
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
  );
}
