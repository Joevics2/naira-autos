import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nairaautos.com';

const NIGERIAN_STATES = [
  'Lagos', 'Abuja-FCT', 'Kano', 'Rivers', 'Oyo', 'Kaduna', 'Ogun', 'Edo', 'Delta', 'Anambra',
  'Imo', 'Katsina', 'Enugu', 'Plateau', 'Cross-River', 'Akwa-Ibom', 'Borno', 'Osun',
  'Ondo', 'Kwara', 'Benue', 'Abia', 'Sokoto', 'Nasarawa', 'Adamawa', 'Kebbi', 'Taraba',
  'Niger', 'Gombe', 'Jigawa', 'Yobe', 'Zamfara', 'Ekiti', 'Bayelsa', 'Ebonyi', 'Kogi'
];

const BRANDS = [
  'Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Lexus', 'Nissan', 'Ford', 'Hyundai',
  'Kia', 'Volkswagen', 'Audi', 'Land-Rover', 'Mazda', 'Peugeot', 'Mitsubishi',
  'Chevrolet', 'Subaru', 'Isuzu', 'Jeep', 'Volvo', 'Infiniti', 'Acura', 'Porsche',
  'Range-Rover', 'Jaguar', 'Suzuki', 'Fiat', 'Renault', 'MG', 'Chery', 'BYD', 'Haval'
];

const VEHICLE_TYPES = ['car', 'suv', 'truck', 'van', 'bus', 'bike'];

const PRICE_RANGES = [
  'Under-1M', '1M-3M', '3M-5M', '5M-10M', '10M-20M', 'Above-20M'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Brand pages - high priority for SEO
  BRANDS.forEach((brand) => {
    entries.push({
      url: `${siteUrl}/search?brand=${encodeURIComponent(brand)}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    });
  });

  // State/location pages
  NIGERIAN_STATES.forEach((state) => {
    entries.push({
      url: `${siteUrl}/search?state=${encodeURIComponent(state)}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    });
  });

  // Vehicle type pages
  VEHICLE_TYPES.forEach((type) => {
    entries.push({
      url: `${siteUrl}/search?type=${encodeURIComponent(type)}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    });
  });

  // Price range pages
  PRICE_RANGES.forEach((price) => {
    entries.push({
      url: `${siteUrl}/search?price=${encodeURIComponent(price)}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    });
  });

  // Combined: Brand + State (most valuable for programmatic SEO)
  BRANDS.slice(0, 15).forEach((brand) => {
    NIGERIAN_STATES.slice(0, 10).forEach((state) => {
      entries.push({
        url: `${siteUrl}/search?brand=${encodeURIComponent(brand)}&state=${encodeURIComponent(state)}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      });
    });
  });

  // Combined: Brand + Vehicle Type
  BRANDS.slice(0, 15).forEach((brand) => {
    VEHICLE_TYPES.forEach((type) => {
      entries.push({
        url: `${siteUrl}/search?brand=${encodeURIComponent(brand)}&type=${encodeURIComponent(type)}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      });
    });
  });

  // Combined: State + Vehicle Type
  NIGERIAN_STATES.slice(0, 15).forEach((state) => {
    VEHICLE_TYPES.forEach((type) => {
      entries.push({
        url: `${siteUrl}/search?state=${encodeURIComponent(state)}&type=${encodeURIComponent(type)}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
      });
    });
  });

  console.log(`📊 Generated ${entries.length} search/SEO pages for sitemap`);

  return entries;
}

export const revalidate = 86400;
