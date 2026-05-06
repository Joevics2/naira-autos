// File: app/sitemap-search.xml/route.ts
// Accessible at: https://naira.autos/sitemap-search.xml

import { NextResponse } from 'next/server';

const siteUrl = 'https://naira.autos';

export const revalidate = 86400;

const NIGERIAN_STATES = [
  'Lagos', 'Abuja-FCT', 'Kano', 'Rivers', 'Oyo', 'Kaduna', 'Ogun', 'Edo', 'Delta', 'Anambra',
  'Imo', 'Katsina', 'Enugu', 'Plateau', 'Cross-River', 'Akwa-Ibom', 'Borno', 'Osun',
  'Ondo', 'Kwara', 'Benue', 'Abia', 'Sokoto', 'Nasarawa', 'Adamawa', 'Kebbi', 'Taraba',
  'Niger', 'Gombe', 'Jigawa', 'Yobe', 'Zamfara', 'Ekiti', 'Bayelsa', 'Ebonyi', 'Kogi',
];

const BRANDS = [
  'Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Lexus', 'Nissan', 'Ford', 'Hyundai',
  'Kia', 'Volkswagen', 'Audi', 'Land-Rover', 'Mazda', 'Peugeot', 'Mitsubishi',
  'Chevrolet', 'Subaru', 'Isuzu', 'Jeep', 'Volvo', 'Infiniti', 'Acura', 'Porsche',
  'Range-Rover', 'Jaguar', 'Suzuki', 'Fiat', 'Renault', 'MG', 'Chery', 'BYD', 'Haval',
];

const VEHICLE_TYPES = ['car', 'suv', 'truck', 'van', 'bus', 'bike'];
const PRICE_RANGES = ['Under-1M', '1M-3M', '3M-5M', '5M-10M', '10M-20M', 'Above-20M'];

function makeUrl(loc: string, priority: number, changefreq = 'daily') {
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const entries: string[] = [];

  // Brand pages
  BRANDS.forEach((brand) => {
    entries.push(makeUrl(`${siteUrl}/search?brand=${encodeURIComponent(brand)}`, 0.9));
  });

  // State pages
  NIGERIAN_STATES.forEach((state) => {
    entries.push(makeUrl(`${siteUrl}/search?state=${encodeURIComponent(state)}`, 0.8));
  });

  // Vehicle type pages
  VEHICLE_TYPES.forEach((type) => {
    entries.push(makeUrl(`${siteUrl}/search?type=${encodeURIComponent(type)}`, 0.8));
  });

  // Price range pages
  PRICE_RANGES.forEach((price) => {
    entries.push(makeUrl(`${siteUrl}/search?price=${encodeURIComponent(price)}`, 0.7));
  });

  // Combined: Brand + State
  BRANDS.slice(0, 15).forEach((brand) => {
    NIGERIAN_STATES.slice(0, 10).forEach((state) => {
      entries.push(makeUrl(
        `${siteUrl}/search?brand=${encodeURIComponent(brand)}&amp;state=${encodeURIComponent(state)}`,
        0.8,
      ));
    });
  });

  // Combined: Brand + Type
  BRANDS.slice(0, 15).forEach((brand) => {
    VEHICLE_TYPES.forEach((type) => {
      entries.push(makeUrl(
        `${siteUrl}/search?brand=${encodeURIComponent(brand)}&amp;type=${encodeURIComponent(type)}`,
        0.8,
      ));
    });
  });

  // Combined: State + Type
  NIGERIAN_STATES.slice(0, 15).forEach((state) => {
    VEHICLE_TYPES.forEach((type) => {
      entries.push(makeUrl(
        `${siteUrl}/search?state=${encodeURIComponent(state)}&amp;type=${encodeURIComponent(type)}`,
        0.7,
      ));
    });
  });

  console.log(`Generated ${entries.length} search/SEO pages for sitemap`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `public, max-age=${revalidate}, stale-while-revalidate`,
    },
  });
}