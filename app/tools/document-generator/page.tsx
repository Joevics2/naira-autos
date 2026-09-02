import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';
import DocumentGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'AI Vehicle Document Generator — Bill of Sale & More | Naira Autos',
  description: 'Generate a jurisdiction-correct vehicle bill of sale, loan agreement, lease, power of attorney, and more — free, AI-drafted, with legal requirements researched for your country. Edit, then download as PDF or Word.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/document-generator',
    languages: {
      en: 'https://www.naira.autos/tools/document-generator',
      es: 'https://www.naira.autos/tools/generador-de-documentos-ia',
      'x-default': 'https://www.naira.autos/tools/document-generator',
    },
  },
  openGraph: {
    title: 'AI Vehicle Document Generator | Naira Autos',
    description: 'Pick a document type and country. Our AI researches the real legal requirements for your jurisdiction and drafts a complete, formatted document — free, no login.',
    url: 'https://www.naira.autos/tools/document-generator',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/document-generator',
      name: 'AI Vehicle Document Generator',
      description: 'Free AI-powered vehicle document generator. Researches jurisdiction-specific legal requirements and drafts a complete, formatted document ready to edit and download.',
      url: 'https://www.naira.autos/tools/document-generator',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Document Generator', item: 'https://www.naira.autos/tools/document-generator' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is this a real legal document?',
          acceptedAnswer: { '@type': 'Answer', text: 'The generator drafts a document based on researched legal requirements for your chosen country, but it is informational only and not legal advice. For high-value or high-risk agreements, have it reviewed by a local attorney before you rely on it.' },
        },
        {
          '@type': 'Question',
          name: 'Is my document saved on your servers?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. The document you generate, and any edits you make, stay only in your own browser. We never store your name, deal details, or the finished document on our servers.' },
        },
        {
          '@type': 'Question',
          name: 'What formats can I download?',
          acceptedAnswer: { '@type': 'Answer', text: 'You can download your finished document as a PDF or as a Word (.docx) file, fully formatted with headings and signature blocks.' },
        },
        {
          '@type': 'Question',
          name: 'Is this free?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Completely free, no login required.' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'AI Vehicle Document Generator — Naira Autos',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'Free AI-powered vehicle document generator with jurisdiction-specific legal research.',
      url: 'https://www.naira.autos/tools/document-generator',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    },
  ],
};

export default function DocumentGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <DocumentGeneratorClient />

      {/* ── SEO content — server-rendered ── */}
      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <p className="text-xs text-muted-foreground">Last verified: August 2026</p>

          <div className="max-w-screen-lg space-y-10 text-sm text-muted-foreground leading-relaxed">

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                What Is the AI Vehicle Document Generator?
              </h2>
              <p className="mb-3">Buying, selling, leasing, or financing a vehicle almost always needs paperwork — and the paperwork that actually holds up depends entirely on where you are. A bill of sale that&apos;s perfectly valid in one country can be missing a mandatory disclosure, a witness signature, or a notarization requirement in another. This tool covers <strong className="text-foreground">57 document types across 160 countries</strong>, and instead of handing you a generic Western template with the country name swapped in, it researches the actual legal requirements for your chosen document and jurisdiction before drafting anything.</p>
              <p>Some documents (marked as templates) use a carefully structured, jurisdiction-adapted format. Others — typically the more nuanced agreements, like installment payment plans, trade-in swaps, or cross-border sale addendums — are fully AI-drafted around your specific details after the legal research step runs. Either way, you end up with a complete, formatted document, not a fill-in-the-blank shell.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                How It Works
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">1. Choose a document type and country.</strong> From a vehicle bill of sale to a power of attorney to a lien release letter, pick what you need and where the transaction is happening.</p>
                <p><strong className="text-foreground">2. The AI researches your jurisdiction.</strong> Before drafting anything, it works out what your country actually requires — mandatory clauses, required disclosures, whether notarization or a witness is needed, and any formatting conventions specific to that jurisdiction.</p>
                <p><strong className="text-foreground">3. Fill in your details.</strong> Enter the buyer, seller, and vehicle information, or use placeholders if you just want to see the structure first.</p>
                <p><strong className="text-foreground">4. Edit, then download.</strong> Review the generated document, make any edits directly in the browser, and download it as a PDF or Word (.docx) file — fully formatted with headings and signature blocks.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Documents You Can Generate
              </h2>
              <p className="mb-4">The 57 document types are organized into 10 categories, covering far more than a simple sale:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Sale & Ownership Transfer', items: 'Vehicle bill of sale, detailed purchase agreement, installment payment agreement, trade-in/swap agreement, as-is sale agreement' },
                  { title: 'Hire, Lease & Rental', items: 'Vehicle lease agreement, Uber/Bolt driver hire-purchase, dispatch rider hire agreement, peer-to-peer rental, fleet lease agreement' },
                  { title: 'Ownership Structures & Finance', items: 'Vehicle loan & security agreement, private loan/lien agreement, consignment agreement, lien release letter' },
                  { title: 'Protection & Disputes', items: 'Condition/inspection report, indemnity waiver, warranty disclaimer, purchase contingency addendum' },
                  { title: 'Disclosure & Compliance', items: 'Odometer disclosure, damage/accident history disclosure, salvage title disclosure, EV battery health disclosure' },
                  { title: 'Ownership Edge Cases', items: 'Vehicle power of attorney, gift affidavit, deceased owner transfer affidavit, spousal co-owner consent' },
                  { title: 'Fleet & Business Use', items: 'Company car policy, fleet vehicle assignment agreement, NDA for bulk/fleet sale negotiations' },
                  { title: 'Registration & Compliance', items: 'Vehicle import declaration, customs clearance authorization, roadworthiness certificate request' },
                ].map(({ title, items }) => (
                  <div key={title} className="bg-card border border-border rounded-xl p-4">
                    <p className="font-bold text-foreground text-sm mb-1.5">{title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{items}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Why Jurisdiction Actually Matters
              </h2>
              <p className="mb-3">A generic bill of sale template downloaded from a random website usually assumes one country&apos;s rules and quietly applies them everywhere. That can mean missing a notarization requirement that makes the document unenforceable, skipping a disclosure your jurisdiction legally requires (like odometer certification or salvage title status), or using a witness format a local registry won&apos;t accept. Because this tool researches the specific country you select before drafting, those requirements get built in rather than left for you to discover after the fact.</p>
              <p>That said, this is informational drafting, not legal advice. For high-value transactions or anything with unusual risk — a large private loan secured against a vehicle, a cross-border sale, a fleet-level agreement — it&apos;s worth having the finished document reviewed by a local attorney before you rely on it.</p>
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Your Details Stay in Your Browser
              </h2>
              <p className="mb-3">Nothing you type into this tool — buyer and seller names, vehicle details, the finished document itself — is stored on our servers. Everything, including your document history if you generate more than one, lives only in your own browser&apos;s local storage. That means you can safely draft a document involving real names and real deal terms without worrying about where that information ends up, and it also means clearing your browser data will clear your saved history, so download anything you want to keep.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Example: Why the Country Selection Matters
              </h2>
              <p>Tunde was selling a car privately to a buyer in another state and almost used a generic bill-of-sale template he found online. He ran it through this tool instead, selecting his actual jurisdiction. The AI-researched draft came back with a witness-signature requirement and an odometer disclosure clause that the generic template hadn&apos;t included — both of which local registries in his jurisdiction typically expect on a private vehicle sale. He added them before the buyer signed, avoiding a document that could have been challenged later.</p>
            </div>

          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Document Generator FAQ
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'Is this a real legal document?', a: 'The generator drafts a document based on researched legal requirements for your chosen country, but it\'s informational only, not legal advice. For high-value or high-risk agreements, have it reviewed by a local attorney before you rely on it.' },
                { q: 'Is my document saved on your servers?', a: 'No. The document you generate, and any edits you make, stay only in your own browser. We never store your name, deal details, or the finished document on our servers.' },
                { q: 'What formats can I download?', a: 'PDF or Word (.docx), fully formatted with headings and signature blocks.' },
                { q: 'Is this free?', a: 'Yes — completely free, no login required.' },
                { q: 'How many document types and countries are supported?', a: '57 document types across 10 categories, for 160 countries. Coverage ranges from a simple bill of sale to fleet agreements, import declarations, and inheritance affidavits.' },
                { q: 'What\'s the difference between a template and an AI-drafted document?', a: 'Template documents use a structured, jurisdiction-adapted format for straightforward cases. AI-drafted documents are fully generated around your specific details after the legal research step — used for more nuanced agreements like installment plans or cross-border sale addendums.' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3">
                    <span className="text-sm font-semibold text-foreground">{q}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4"><p className="text-sm text-muted-foreground leading-relaxed">{a}</p></div>
                </details>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Evelyn John</Link>, Auto Sales Expert. Document categories and clause coverage checked against real sale-transaction paperwork.
          </p>

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Free Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/documents', label: 'Free Document Templates', color: 'sky' },
                { href: '/tools/vehicle-papers-checklist', label: 'Vehicle Papers Checklist', color: 'violet' },
                { href: '/tools/ai-mechanic', label: 'AI Mechanic', color: 'emerald' },
              ].map(({ href, label, color }) => (
                <Link key={href} href={href} className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-${color}-50 dark:bg-${color}-500/10 border border-${color}-200 dark:border-${color}-500/20 hover:bg-${color}-100 dark:hover:bg-${color}-500/20 transition-all`}>
                  <p className={`text-sm font-bold text-${color}-700 dark:text-${color}-400`}>{label}</p>
                  <ChevronRight className={`h-4 w-4 text-${color}-500`} />
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
