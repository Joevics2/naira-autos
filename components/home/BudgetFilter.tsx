'use client';

import Link from 'next/link';

const budgetRanges = [
  { label: 'Under ₦1M', href: '/search?pmax=1000000' },
  { label: '₦3M', href: '/search?pmax=3000000' },
  { label: '₦5M', href: '/search?pmax=5000000', popular: true },
  { label: '₦10M', href: '/search?pmax=10000000' },
  { label: '₦20M', href: '/search?pmax=20000000' },
  { label: '₦20M+', href: '/search?pmax=1000000000' },
];

export function BudgetFilter() {
  return (
    <section className="py-10 bg-muted">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">

        <div className="mb-5">
          <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-1">Filter</p>
          <h2
            className="font-black uppercase text-foreground leading-none"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(26px, 3.5vw, 40px)' }}
          >
            Shop by Budget
          </h2>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {budgetRanges.map((range, index) => (
            <Link
              key={index}
              href={range.href}
              className={`
                flex-shrink-0 px-5 py-2.5 rounded-full border font-bold text-sm tracking-wide transition-all duration-200 hover:scale-[1.04]
                ${range.popular
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-400'
                  : 'bg-background border-border text-foreground hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400'
                }
              `}
            >
              {range.label}
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}