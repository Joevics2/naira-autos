import { ShoppingBag, ChevronDown } from 'lucide-react';

export function WhereToBuyJumpLink({ className = '' }: { className?: string }) {
  return (
    <a
      href="#where-to-buy"
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors ${className}`}
    >
      <ShoppingBag className="h-3.5 w-3.5" />
      Where to Buy
      <ChevronDown className="h-3.5 w-3.5" />
    </a>
  );
}
