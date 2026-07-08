// lib/document-types.ts
// Dropdown source for the AI Document Writer. Add new document types here —
// the generator itself needs no code changes to support a new entry.

export interface DocumentTypeDef {
  slug: string;
  label: string;
  description: string;
}

export const DOCUMENT_TYPES: DocumentTypeDef[] = [
  { slug: 'vehicle-bill-of-sale', label: 'Vehicle Bill of Sale', description: 'Transfers ownership of a vehicle from seller to buyer.' },
  { slug: 'vehicle-loan-security-agreement', label: 'Vehicle Loan & Security Agreement', description: 'A loan used to buy a vehicle, with the vehicle pledged as collateral.' },
  { slug: 'vehicle-lease-agreement', label: 'Vehicle Lease Agreement', description: 'Terms for leasing a vehicle over a fixed period.' },
  { slug: 'vehicle-power-of-attorney', label: 'Vehicle Power of Attorney', description: 'Authorizes someone else to handle vehicle transactions on your behalf.' },
  { slug: 'odometer-disclosure-statement', label: 'Odometer Disclosure Statement', description: 'Certifies the vehicle mileage at the time of sale.' },
  { slug: 'vehicle-gift-affidavit', label: 'Vehicle Gift Affidavit', description: 'Documents a vehicle given as a gift with no money changing hands.' },
  { slug: 'release-of-liability', label: 'Release of Liability (Notice of Sale)', description: 'Notifies of a completed sale to release the seller from future liability.' },
  { slug: 'vehicle-trade-in-agreement', label: 'Vehicle Trade-In Agreement', description: 'A vehicle traded in as part or full payment toward another vehicle.' },
  { slug: 'installment-payment-agreement', label: 'Vehicle Installment Payment Agreement', description: 'A payment plan for a vehicle purchase spread over time.' },
  { slug: 'as-is-sale-agreement', label: 'As-Is Vehicle Sale Agreement', description: 'A sale with no warranties — the buyer accepts the vehicle in its current condition.' },
  { slug: 'motorcycle-bill-of-sale', label: 'Motorcycle Bill of Sale', description: 'Transfers ownership of a motorcycle.' },
  { slug: 'trailer-equipment-bill-of-sale', label: 'Trailer / Equipment Bill of Sale', description: 'Transfers ownership of a trailer or heavy equipment.' },
];

export function getDocumentType(slug: string): DocumentTypeDef | undefined {
  return DOCUMENT_TYPES.find(d => d.slug === slug);
}

// Countries the generator currently supports — same list already used for
// the globalized calculators, so it's a consistent, proven set.
export interface DocumentCountryDef {
  code: string;   // ISO 3166-1 alpha-2
  name: string;
  flag: string;
}

export const DOCUMENT_COUNTRIES: DocumentCountryDef[] = [
  { code: 'ng', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'us', name: 'United States', flag: '🇺🇸' },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'ca', name: 'Canada', flag: '🇨🇦' },
  { code: 'de', name: 'Germany', flag: '🇩🇪' },
  { code: 'fr', name: 'France', flag: '🇫🇷' },
  { code: 'za', name: 'South Africa', flag: '🇿🇦' },
  { code: 'in', name: 'India', flag: '🇮🇳' },
  { code: 'ae', name: 'UAE', flag: '🇦🇪' },
  { code: 'au', name: 'Australia', flag: '🇦🇺' },
];

export function getDocumentCountry(code: string): DocumentCountryDef | undefined {
  return DOCUMENT_COUNTRIES.find(c => c.code === code);
}

// Document types flagged as higher legal risk — shown with a stronger
// warning since AI-assembled/grounded content alone shouldn't be trusted
// for these without real local legal review.
export const HIGH_RISK_DOCUMENT_TYPES = new Set([
  'vehicle-loan-security-agreement',
  'vehicle-power-of-attorney',
]);
