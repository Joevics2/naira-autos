// lib/document-types.ts
// Dropdown source for the AI Document Writer. Add new document types here —
// the generator itself needs no code changes to support a new entry.
//
// `tier` is informational for now (everything currently runs through the
// AI-assembled generator). It marks which documents are good future
// candidates for the fixed Template tier (low variability, high volume)
// vs. which genuinely need per-deal AI clause assembly. Doesn't change
// runtime behavior yet — it's groundwork for when the Template tier is built.

export interface DocumentTypeDef {
  slug: string;
  label: string;
  description: string;
  tier: 'template' | 'ai';
  category: string;
}

export const DOCUMENT_TYPES: DocumentTypeDef[] = [
  // ── Sale & Ownership Transfer ──────────────────────────────────────────
  { slug: 'vehicle-bill-of-sale', label: 'Vehicle Bill of Sale', description: 'Transfers ownership of a vehicle from seller to buyer.', tier: 'template', category: 'Sale & Ownership Transfer' },
  { slug: 'vehicle-purchase-agreement', label: 'Vehicle Purchase Agreement (Detailed)', description: 'A fuller sale agreement with payment terms, as-is clauses, and defect disclosures.', tier: 'ai', category: 'Sale & Ownership Transfer' },
  { slug: 'installment-payment-agreement', label: 'Vehicle Installment Payment Agreement', description: 'A payment plan for a vehicle purchase spread over time.', tier: 'ai', category: 'Sale & Ownership Transfer' },
  { slug: 'deposit-reservation-agreement', label: 'Deposit / Reservation Agreement', description: 'Buyer pays a deposit to hold a vehicle before completing full payment.', tier: 'template', category: 'Sale & Ownership Transfer' },
  { slug: 'vehicle-trade-in-agreement', label: 'Vehicle Trade-In / Swap Agreement', description: 'A vehicle traded in as part or full payment toward another vehicle.', tier: 'ai', category: 'Sale & Ownership Transfer' },
  { slug: 'change-of-ownership-agreement', label: 'Change of Ownership Agreement', description: 'A broader transfer deed, also used for gifts or family transfers.', tier: 'template', category: 'Sale & Ownership Transfer' },
  { slug: 'as-is-sale-agreement', label: 'As-Is Vehicle Sale Agreement', description: 'A sale with no warranties — the buyer accepts the vehicle in its current condition.', tier: 'ai', category: 'Sale & Ownership Transfer' },

  // ── Hire, Lease & Rental ────────────────────────────────────────────────
  { slug: 'vehicle-lease-agreement', label: 'Vehicle Lease Agreement', description: 'Terms for leasing a vehicle over a fixed period.', tier: 'ai', category: 'Hire, Lease & Rental' },
  { slug: 'ride-hailing-hire-purchase-agreement', label: 'Uber/Bolt Driver Hire-Purchase Agreement', description: 'Lease-to-own terms for a ride-hailing driver, with ownership transferring on completion.', tier: 'ai', category: 'Hire, Lease & Rental' },
  { slug: 'ride-hailing-rental-agreement', label: 'Uber/Bolt Straight Rental Agreement', description: 'Fixed daily or weekly rental with no ownership change.', tier: 'template', category: 'Hire, Lease & Rental' },
  { slug: 'dispatch-rider-hire-agreement', label: 'Dispatch Rider / Logistics Bike Hire Agreement', description: 'Hire terms for a delivery motorcycle.', tier: 'template', category: 'Hire, Lease & Rental' },
  { slug: 'keke-lease-purchase-agreement', label: 'Keke (Tricycle) Lease-Purchase Agreement', description: 'Lease-to-own terms for a tricycle/keke.', tier: 'ai', category: 'Hire, Lease & Rental' },
  { slug: 'peer-to-peer-rental-agreement', label: 'Peer-to-Peer Car Rental Agreement', description: 'Short-term rental of a vehicle between individuals.', tier: 'template', category: 'Hire, Lease & Rental' },
  { slug: 'fleet-lease-agreement', label: 'Fleet / Multi-Vehicle Lease Agreement', description: 'Negotiated lease terms for someone leasing several vehicles to an operator.', tier: 'ai', category: 'Hire, Lease & Rental' },

  // ── Ownership Structures & Finance ──────────────────────────────────────
  { slug: 'co-ownership-partnership-agreement', label: 'Co-Ownership / Partnership Agreement', description: 'Terms for two or more people jointly owning one vehicle.', tier: 'ai', category: 'Ownership Structures & Finance' },
  { slug: 'vehicle-loan-security-agreement', label: 'Vehicle Loan & Security Agreement', description: 'A loan used to buy a vehicle, with the vehicle pledged as collateral.', tier: 'ai', category: 'Ownership Structures & Finance' },
  { slug: 'private-loan-lien-agreement', label: 'Private Loan / Lien Agreement', description: 'One person financing another\u2019s car purchase, with the car as collateral.', tier: 'ai', category: 'Ownership Structures & Finance' },
  { slug: 'consignment-agreement', label: 'Consignment Agreement', description: 'Owner allows a dealer or agent to sell the car on their behalf for a commission.', tier: 'template', category: 'Ownership Structures & Finance' },
  { slug: 'lien-release-letter', label: 'Lien Release / Lien Satisfaction Letter', description: 'Confirms a vehicle loan has been paid off and the lien is released.', tier: 'template', category: 'Ownership Structures & Finance' },

  // ── Protection & Disputes ────────────────────────────────────────────────
  { slug: 'vehicle-condition-inspection-report', label: 'Vehicle Condition / Inspection Report', description: 'Signed at handover to record the vehicle\u2019s condition, protecting both sides.', tier: 'template', category: 'Protection & Disputes' },
  { slug: 'indemnity-liability-waiver', label: 'Indemnity & Liability Waiver', description: 'For test drives or temporary use of a vehicle.', tier: 'template', category: 'Protection & Disputes' },
  { slug: 'warranty-disclaimer-as-is-statement', label: 'Warranty Disclaimer / "Sold As-Is" Statement', description: 'A standalone statement disclaiming warranties, attached to any sale.', tier: 'template', category: 'Protection & Disputes' },
  { slug: 'affidavit-of-ownership', label: 'Affidavit of Ownership (Private)', description: 'A sworn statement affirming you are the rightful owner before a sale.', tier: 'template', category: 'Protection & Disputes' },
  { slug: 'storage-custody-agreement', label: 'Storage / Custody Agreement', description: 'Terms for leaving a vehicle with someone — a mechanic, friend, or dealer — for a period.', tier: 'template', category: 'Protection & Disputes' },
  { slug: 'purchase-contingency-addendum', label: 'Purchase Contingency Addendum', description: 'Makes a sale conditional on financing approval or a passed inspection.', tier: 'ai', category: 'Protection & Disputes' },
  { slug: 'cancellation-rescission-agreement', label: 'Cancellation / Rescission of Sale Agreement', description: 'Unwinds a sale during a cooling-off period.', tier: 'template', category: 'Protection & Disputes' },
  { slug: 'dispute-resolution-addendum', label: 'Dispute Resolution / Arbitration Clause Addendum', description: 'Sets how disputes arising from the sale will be resolved.', tier: 'ai', category: 'Protection & Disputes' },
  { slug: 'cross-border-sale-addendum', label: 'Cross-Border Sale Addendum', description: 'Covers currency, export paperwork, and shipping risk for an international private sale.', tier: 'ai', category: 'Protection & Disputes' },

  // ── Disclosure & Compliance ──────────────────────────────────────────────
  { slug: 'odometer-disclosure-statement', label: 'Odometer Disclosure Statement', description: 'Certifies the vehicle mileage at the time of sale.', tier: 'template', category: 'Disclosure & Compliance' },
  { slug: 'damage-accident-disclosure', label: 'Damage / Accident History Disclosure', description: 'Discloses known prior damage or accident history.', tier: 'ai', category: 'Disclosure & Compliance' },
  { slug: 'salvage-title-disclosure', label: 'Salvage / Rebuilt Title Disclosure', description: 'Discloses a salvage or rebuilt title status.', tier: 'ai', category: 'Disclosure & Compliance' },
  { slug: 'emissions-safety-inspection-disclosure', label: 'Emissions / Safety Inspection Disclosure', description: 'Discloses emissions or safety inspection status, where required.', tier: 'ai', category: 'Disclosure & Compliance' },
  { slug: 'ev-battery-health-disclosure', label: 'EV Battery Health / Warranty Disclosure', description: 'Discloses an EV\u2019s battery health and any remaining warranty.', tier: 'ai', category: 'Disclosure & Compliance' },
  { slug: 'telematics-gps-consent-form', label: 'Telematics / GPS Tracker Consent Form', description: 'Records consent to a vehicle tracker or telematics device.', tier: 'template', category: 'Disclosure & Compliance' },

  // ── Ownership Edge Cases ──────────────────────────────────────────────────
  { slug: 'vehicle-gift-affidavit', label: 'Vehicle Gift Affidavit', description: 'Documents a vehicle given as a gift with no money changing hands.', tier: 'template', category: 'Ownership Edge Cases' },
  { slug: 'deceased-owner-transfer-affidavit', label: 'Deceased Owner Transfer / Inheritance Affidavit', description: 'Transfers a vehicle from a deceased owner to an heir.', tier: 'ai', category: 'Ownership Edge Cases' },
  { slug: 'spousal-co-owner-consent', label: 'Spousal or Co-Owner Consent to Sell', description: 'Records a co-owner or spouse\u2019s consent to sell a jointly held vehicle.', tier: 'template', category: 'Ownership Edge Cases' },
  { slug: 'corporate-authorization-letter', label: 'Corporate Authorization Letter', description: 'Authorizes a signatory to sell a vehicle on a company\u2019s behalf.', tier: 'template', category: 'Ownership Edge Cases' },
  { slug: 'vehicle-power-of-attorney', label: 'Vehicle Power of Attorney', description: 'Authorizes someone else to handle vehicle transactions on your behalf.', tier: 'ai', category: 'Ownership Edge Cases' },
  { slug: 'release-of-liability', label: 'Release of Liability (Notice of Sale)', description: 'Notifies of a completed sale to release the seller from future liability.', tier: 'template', category: 'Ownership Edge Cases' },

  // ── Fleet & Business Use ───────────────────────────────────────────────────
  { slug: 'company-car-policy', label: 'Company Car Policy / Use Agreement', description: 'Sets terms for an employee\u2019s use of a company vehicle.', tier: 'template', category: 'Fleet & Business Use' },
  { slug: 'fleet-sale-nda', label: 'NDA for Bulk/Fleet Sale Negotiations', description: 'Confidentiality agreement for negotiating a bulk or fleet vehicle sale.', tier: 'template', category: 'Fleet & Business Use' },

  // ── Other vehicle types ─────────────────────────────────────────────────
  { slug: 'motorcycle-bill-of-sale', label: 'Motorcycle Bill of Sale', description: 'Transfers ownership of a motorcycle.', tier: 'template', category: 'Other Vehicle Types' },
  { slug: 'trailer-equipment-bill-of-sale', label: 'Trailer / Equipment Bill of Sale', description: 'Transfers ownership of a trailer or heavy equipment.', tier: 'template', category: 'Other Vehicle Types' },
];

export function getDocumentType(slug: string): DocumentTypeDef | undefined {
  return DOCUMENT_TYPES.find(d => d.slug === slug);
}

// Countries the generator supports. Grounded research means this can cover
// far more markets than the fixed calculators — grouped by region for the
// dropdown.
export interface DocumentCountryDef {
  code: string;   // ISO 3166-1 alpha-2
  name: string;
  flag: string;
  region: string;
}

export const DOCUMENT_COUNTRIES: DocumentCountryDef[] = [
  // Africa
  { code: 'ng', name: 'Nigeria', flag: '\u{1F1F3}\u{1F1EC}', region: 'Africa' },
  { code: 'za', name: 'South Africa', flag: '\u{1F1FF}\u{1F1E6}', region: 'Africa' },
  { code: 'gh', name: 'Ghana', flag: '\u{1F1EC}\u{1F1ED}', region: 'Africa' },
  { code: 'ke', name: 'Kenya', flag: '\u{1F1F0}\u{1F1EA}', region: 'Africa' },
  { code: 'eg', name: 'Egypt', flag: '\u{1F1EA}\u{1F1EC}', region: 'Africa' },
  { code: 'ma', name: 'Morocco', flag: '\u{1F1F2}\u{1F1E6}', region: 'Africa' },
  { code: 'et', name: 'Ethiopia', flag: '\u{1F1EA}\u{1F1F9}', region: 'Africa' },
  { code: 'tz', name: 'Tanzania', flag: '\u{1F1F9}\u{1F1FF}', region: 'Africa' },
  { code: 'ug', name: 'Uganda', flag: '\u{1F1FA}\u{1F1EC}', region: 'Africa' },
  { code: 'rw', name: 'Rwanda', flag: '\u{1F1F7}\u{1F1FC}', region: 'Africa' },
  { code: 'sn', name: 'Senegal', flag: '\u{1F1F8}\u{1F1F3}', region: 'Africa' },
  { code: 'ci', name: 'Ivory Coast', flag: '\u{1F1E8}\u{1F1EE}', region: 'Africa' },
  { code: 'cm', name: 'Cameroon', flag: '\u{1F1E8}\u{1F1F2}', region: 'Africa' },
  { code: 'zm', name: 'Zambia', flag: '\u{1F1FF}\u{1F1F2}', region: 'Africa' },
  { code: 'zw', name: 'Zimbabwe', flag: '\u{1F1FF}\u{1F1FC}', region: 'Africa' },

  // Americas
  { code: 'us', name: 'United States', flag: '\u{1F1FA}\u{1F1F8}', region: 'Americas' },
  { code: 'ca', name: 'Canada', flag: '\u{1F1E8}\u{1F1E6}', region: 'Americas' },
  { code: 'mx', name: 'Mexico', flag: '\u{1F1F2}\u{1F1FD}', region: 'Americas' },
  { code: 'br', name: 'Brazil', flag: '\u{1F1E7}\u{1F1F7}', region: 'Americas' },
  { code: 'ar', name: 'Argentina', flag: '\u{1F1E6}\u{1F1F7}', region: 'Americas' },
  { code: 'co', name: 'Colombia', flag: '\u{1F1E8}\u{1F1F4}', region: 'Americas' },
  { code: 'cl', name: 'Chile', flag: '\u{1F1E8}\u{1F1F1}', region: 'Americas' },
  { code: 'pe', name: 'Peru', flag: '\u{1F1F5}\u{1F1EA}', region: 'Americas' },

  // Europe
  { code: 'gb', name: 'United Kingdom', flag: '\u{1F1EC}\u{1F1E7}', region: 'Europe' },
  { code: 'de', name: 'Germany', flag: '\u{1F1E9}\u{1F1EA}', region: 'Europe' },
  { code: 'fr', name: 'France', flag: '\u{1F1EB}\u{1F1F7}', region: 'Europe' },
  { code: 'es', name: 'Spain', flag: '\u{1F1EA}\u{1F1F8}', region: 'Europe' },
  { code: 'it', name: 'Italy', flag: '\u{1F1EE}\u{1F1F9}', region: 'Europe' },
  { code: 'nl', name: 'Netherlands', flag: '\u{1F1F3}\u{1F1F1}', region: 'Europe' },
  { code: 'pt', name: 'Portugal', flag: '\u{1F1F5}\u{1F1F9}', region: 'Europe' },
  { code: 'ie', name: 'Ireland', flag: '\u{1F1EE}\u{1F1EA}', region: 'Europe' },
  { code: 'be', name: 'Belgium', flag: '\u{1F1E7}\u{1F1EA}', region: 'Europe' },
  { code: 'ch', name: 'Switzerland', flag: '\u{1F1E8}\u{1F1ED}', region: 'Europe' },
  { code: 'se', name: 'Sweden', flag: '\u{1F1F8}\u{1F1EA}', region: 'Europe' },
  { code: 'no', name: 'Norway', flag: '\u{1F1F3}\u{1F1F4}', region: 'Europe' },
  { code: 'pl', name: 'Poland', flag: '\u{1F1F5}\u{1F1F1}', region: 'Europe' },
  { code: 'at', name: 'Austria', flag: '\u{1F1E6}\u{1F1F9}', region: 'Europe' },

  // Middle East
  { code: 'ae', name: 'United Arab Emirates', flag: '\u{1F1E6}\u{1F1EA}', region: 'Middle East' },
  { code: 'sa', name: 'Saudi Arabia', flag: '\u{1F1F8}\u{1F1E6}', region: 'Middle East' },
  { code: 'qa', name: 'Qatar', flag: '\u{1F1F6}\u{1F1E6}', region: 'Middle East' },
  { code: 'kw', name: 'Kuwait', flag: '\u{1F1F0}\u{1F1FC}', region: 'Middle East' },
  { code: 'bh', name: 'Bahrain', flag: '\u{1F1E7}\u{1F1ED}', region: 'Middle East' },
  { code: 'om', name: 'Oman', flag: '\u{1F1F4}\u{1F1F2}', region: 'Middle East' },
  { code: 'il', name: 'Israel', flag: '\u{1F1EE}\u{1F1F1}', region: 'Middle East' },
  { code: 'tr', name: 'Turkey', flag: '\u{1F1F9}\u{1F1F7}', region: 'Middle East' },

  // Asia
  { code: 'in', name: 'India', flag: '\u{1F1EE}\u{1F1F3}', region: 'Asia' },
  { code: 'pk', name: 'Pakistan', flag: '\u{1F1F5}\u{1F1F0}', region: 'Asia' },
  { code: 'cn', name: 'China', flag: '\u{1F1E8}\u{1F1F3}', region: 'Asia' },
  { code: 'jp', name: 'Japan', flag: '\u{1F1EF}\u{1F1F5}', region: 'Asia' },
  { code: 'kr', name: 'South Korea', flag: '\u{1F1F0}\u{1F1F7}', region: 'Asia' },
  { code: 'sg', name: 'Singapore', flag: '\u{1F1F8}\u{1F1EC}', region: 'Asia' },
  { code: 'my', name: 'Malaysia', flag: '\u{1F1F2}\u{1F1FE}', region: 'Asia' },
  { code: 'id', name: 'Indonesia', flag: '\u{1F1EE}\u{1F1E9}', region: 'Asia' },
  { code: 'ph', name: 'Philippines', flag: '\u{1F1F5}\u{1F1ED}', region: 'Asia' },
  { code: 'th', name: 'Thailand', flag: '\u{1F1F9}\u{1F1ED}', region: 'Asia' },
  { code: 'vn', name: 'Vietnam', flag: '\u{1F1FB}\u{1F1F3}', region: 'Asia' },

  // Oceania
  { code: 'au', name: 'Australia', flag: '\u{1F1E6}\u{1F1FA}', region: 'Oceania' },
  { code: 'nz', name: 'New Zealand', flag: '\u{1F1F3}\u{1F1FF}', region: 'Oceania' },
];

export function getDocumentCountry(code: string): DocumentCountryDef | undefined {
  return DOCUMENT_COUNTRIES.find(c => c.code === code);
}

// Document types flagged as higher legal risk — shown with a stronger
// warning since AI-assembled/grounded content alone shouldn't be trusted
// for these without real local legal review.
export const HIGH_RISK_DOCUMENT_TYPES = new Set([
  'vehicle-loan-security-agreement',
  'private-loan-lien-agreement',
  'vehicle-power-of-attorney',
]);
