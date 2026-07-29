/**
 * Single source of truth for the "More Free Tools" cross-links shown at the
 * bottom of tool pages. Update a tool's related list here once and every
 * page using <RelatedTools tool="..." /> picks it up — no more hunting
 * through individual page.tsx files to add/change a cross-link.
 *
 * Stick to colors already used across the site (blue, emerald, violet,
 * amber, sky) — these Tailwind utility classes are already generated
 * elsewhere in the codebase.
 */

export interface RelatedToolLink {
  href: string;
  label: string;
  color: 'blue' | 'emerald' | 'violet' | 'amber' | 'sky';
}

export const RELATED_TOOLS: Record<string, RelatedToolLink[]> = {
  'import-duty-calculator': [
    { href: '/tools/china-car-import-calculator', label: 'China Car Import Calculator', color: 'sky' },
    { href: '/tools/registration-fee-calculator', label: 'Registration Fee Calculator', color: 'blue' },
    { href: '/tools/auto-loan-calculator', label: 'Auto Loan Calculator', color: 'emerald' },
    { href: '/tools/vin-checker', label: 'VIN Checker', color: 'violet' },
  ],
  'china-car-import-calculator': [
    { href: '/tools/import-duty-calculator', label: 'Import Duty Calculator', color: 'emerald' },
    { href: '/tools/vin-checker', label: 'VIN Checker', color: 'violet' },
    { href: '/tools/registration-fee-calculator', label: 'Registration Fee Calculator', color: 'blue' },
  ],
  'auto-loan-calculator': [
    { href: '/tools/insurance-calculator', label: 'Insurance Calculator', color: 'blue' },
    { href: '/tools/import-duty-calculator', label: 'Import Duty Calculator', color: 'emerald' },
    { href: '/tools/best-car-for', label: 'Best Car For Me', color: 'amber' },
  ],
  'insurance-calculator': [
    { href: '/tools/car-comparison', label: 'Car Comparison Tool', color: 'blue' },
    { href: '/tools/best-car-for', label: 'Best Car For...', color: 'emerald' },
    { href: '/tools/ai-car-valuation', label: 'AI Car Valuation', color: 'violet' },
  ],
  'registration-fee-calculator': [
    { href: '/tools/plate-number-checker', label: 'Plate Number Checker', color: 'sky' },
    { href: '/tools/import-duty-calculator', label: 'Import Duty Calculator', color: 'emerald' },
    { href: '/tools/vehicle-papers-checklist', label: 'Vehicle Papers Checklist', color: 'violet' },
    { href: '/tools/insurance-calculator', label: 'Insurance Calculator', color: 'blue' },
  ],
  'vehicle-papers-checklist': [
    { href: '/tools/vin-checker', label: 'VIN Checker', color: 'blue' },
    { href: '/tools/registration-fee-calculator', label: 'Registration Fee Calculator', color: 'emerald' },
    { href: '/tools/import-duty-calculator', label: 'Import Duty Calculator', color: 'violet' },
  ],
};
