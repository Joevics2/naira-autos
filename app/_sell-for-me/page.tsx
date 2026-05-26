import { SellForMeClient } from './SellForMeClient';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://naira.autos/sell-for-me',
      url: 'https://naira.autos/sell-for-me',
      name: 'Sell or Find Your Car in Nigeria | Naira Autos Concierge',
      description:
        'Sell your car hassle-free in Nigeria — we market it, screen buyers, and you pay only after it sells. Or let us find your next car: we verify the vehicle and the seller before sending you.',
      inLanguage: 'en-NG',
      isPartOf: { '@id': 'https://naira.autos' },
    },
    {
      '@type': 'Service',
      '@id': 'https://naira.autos/sell-for-me#sell-service',
      name: 'Sell For Me',
      serviceType: 'Car Sales Concierge',
      description:
        'Naira Autos markets your car, screens buyers, and only charges a commission after your car is sold and you have received payment. No sale, no fee.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Naira Autos',
        url: 'https://naira.autos',
        telephone: '+2349032047288',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'NG',
          addressRegion: 'Lagos',
        },
      },
      areaServed: { '@type': 'Country', name: 'Nigeria' },
      offers: {
        '@type': 'Offer',
        description: 'Commission paid only after sale. Free car valuation included.',
        priceSpecification: [
          { '@type': 'UnitPriceSpecification', name: 'Under ₦3M',    price: '100000', priceCurrency: 'NGN' },
          { '@type': 'UnitPriceSpecification', name: '₦3M – ₦5M',   price: '200000', priceCurrency: 'NGN' },
          { '@type': 'UnitPriceSpecification', name: '₦5M – ₦10M',  price: '300000', priceCurrency: 'NGN' },
          { '@type': 'UnitPriceSpecification', name: '₦10M – ₦20M', price: '400000', priceCurrency: 'NGN' },
          { '@type': 'UnitPriceSpecification', name: 'Above ₦20M',  description: '3% of sale price', priceCurrency: 'NGN' },
        ],
      },
    },
    {
      '@type': 'Service',
      '@id': 'https://naira.autos/sell-for-me#find-service',
      name: 'Find For Me',
      serviceType: 'Car Buying Concierge',
      description:
        'Naira Autos searches the Nigerian car market on your behalf, physically inspects the vehicle, verifies ownership and seller credibility, then connects you with the seller only when everything checks out.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Naira Autos',
        url: 'https://naira.autos',
        telephone: '+2349032047288',
      },
      areaServed: { '@type': 'Country', name: 'Nigeria' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the Sell For Me service work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WhatsApp us your car details — photos, a short video, year, mileage, and asking price. We list and market it professionally, screen all buyers, and only connect serious offers to you. You collect your money, then pay our commission. No sale means no fee.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the commission for Sell For Me?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our commission is ₦100,000 for cars under ₦3M; ₦200,000 for ₦3M–₦5M; ₦300,000 for ₦5M–₦10M; ₦400,000 for ₦10M–₦20M; and 3% of the sale price for cars above ₦20M. You pay only after the car is sold and you have received your money.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does the Find For Me service do?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Tell us the car you want — budget, brand, model, year range. We search our network, physically inspect the vehicle, verify the ownership documents and the seller's credibility, and only then send you to view it. A flat service fee is agreed upfront before we begin.",
          },
        },
        {
          '@type': 'Question',
          name: 'Do I pay upfront to sell my car?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. There are zero upfront fees. We only charge a commission after your car sells and you have received your payment in full.',
          },
        },
        {
          '@type': 'Question',
          name: 'How quickly will my car be listed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We aim to have your car listed and marketed within 24 hours of receiving your details on WhatsApp.',
          },
        },
      ],
    },
  ],
};

export default function SellForMePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SellForMeClient />
    </>
  );
}