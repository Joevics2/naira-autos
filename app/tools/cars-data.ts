// cars-data.ts
// Shared global dataset for the Car Comparison Tool and Best Car For... Recommender.
// Add new cars here — both tools pick them up automatically.
//
// Prices are stored as an approximate 2025/2026 base (entry-trim) price range
// in USD — either the US-market MSRP or, where a model isn't officially sold
// in the US, the closest global-equivalent starting price. The country
// selector in each tool converts this into a local-currency estimate using
// lib/car-country-pricing.ts (base USD × country multiplier × FX rate).
//
// Fuel consumption is in L/100km (combined). Electric vehicles use
// isElectric: true and fuelConsumption: 0 — tools should display "Electric"
// rather than a L/100km figure for these. Ground clearance in mm, boot
// space in litres (0 for pickup beds or where not meaningfully comparable).

export type MaintenanceCost = 'Low' | 'Medium' | 'High' | 'Very High';
export type SparePartsAvail = 'Easy' | 'Moderate' | 'Hard';
export type UseCaseTag =
  | 'family'
  | 'commercial'
  | 'highway'
  | 'budget'
  | 'offroad'
  | 'executive'
  | 'firstcar'
  | 'fuelefficient';

export interface CarData {
  id: string;
  brand: string;
  model: string;
  yearRange: string;
  segment: string;             // display badge, e.g. "Economy Sedan", "Hypercar"
  bodyType: string;
  seats: number;
  engineCC: number;            // 0 for EVs
  isElectric: boolean;
  fuelType: string;
  transmission: string;
  fuelConsumption: number;     // L/100km combined, 0 for EVs
  groundClearance: number;     // mm
  bootSpace: number;           // litres
  basePriceUSD: { min: number; max: number }; // approx. 2025/2026 base price
  maintenanceCost: MaintenanceCost;
  spareParts: SparePartsAvail;
  commonIssues: string;
  bestFor: UseCaseTag[];
  watchOut: string;
  imageUrl: string;
}

export const CARS: CarData[] = [
  {
    id: 'toyota-corolla', brand: 'Toyota', model: 'Corolla', yearRange: '2025–2026',
    segment: 'Economy Sedan', bodyType: 'Sedan', seats: 5, engineCC: 2000, isElectric: false,
    fuelType: 'Petrol / Hybrid', transmission: 'CVT', fuelConsumption: 6.2, groundClearance: 140, bootSpace: 371,
    basePriceUSD: { min: 24000, max: 24500 }, maintenanceCost: 'Low', spareParts: 'Easy',
    commonIssues: 'Among the most reliable cars sold anywhere; minor CVT judder reported in stop-start traffic on some units.',
    bestFor: ['budget', 'firstcar', 'commercial', 'fuelefficient', 'family'],
    watchOut: 'Base petrol trims can feel underpowered on steep highway grades — the hybrid variant is worth the extra for most buyers.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/2003-2004_Toyota_Corolla_--_10-18-2011.jpg/320px-2003-2004_Toyota_Corolla_--_10-18-2011.jpg',
  },
  {
    id: 'honda-civic', brand: 'Honda', model: 'Civic', yearRange: '2025–2026',
    segment: 'Economy Sedan', bodyType: 'Sedan / Hatchback', seats: 5, engineCC: 1500, isElectric: false,
    fuelType: 'Petrol / Hybrid', transmission: 'CVT', fuelConsumption: 6.8, groundClearance: 135, bootSpace: 419,
    basePriceUSD: { min: 24700, max: 25800 }, maintenanceCost: 'Low', spareParts: 'Easy',
    commonIssues: 'Very dependable; turbo models have had minor oil-dilution complaints, largely resolved by software updates.',
    bestFor: ['budget', 'firstcar', 'fuelefficient', 'highway'],
    watchOut: 'Manual-transmission trims are increasingly rare — confirm availability in your market before shopping around it.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/2009_Honda_Civic_Sedan_%28FA1%29_%28facelift%2C_blue%29%2C_front_8.18.19.jpg/320px-2009_Honda_Civic_Sedan_%28FA1%29_%28facelift%2C_blue%29%2C_front_8.18.19.jpg',
  },
  {
    id: 'toyota-camry', brand: 'Toyota', model: 'Camry (Hybrid)', yearRange: '2025–2026',
    segment: 'Family Sedan', bodyType: 'Sedan', seats: 5, engineCC: 2500, isElectric: false,
    fuelType: 'Hybrid', transmission: 'eCVT', fuelConsumption: 5.2, groundClearance: 140, bootSpace: 428,
    basePriceUSD: { min: 28000, max: 31500 }, maintenanceCost: 'Low', spareParts: 'Easy',
    commonIssues: 'Hybrid battery has a strong long-term reliability record; very few drivetrain complaints.',
    bestFor: ['family', 'highway', 'executive', 'fuelefficient'],
    watchOut: 'Now sold hybrid-only in most markets — if you specifically want a V6, check whether the outgoing generation is still available used.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/2010_Toyota_Camry_%28ACV40R_MY10%29_Altise_sedan_%282011-04-22%29.jpg/320px-2010_Toyota_Camry_%28ACV40R_MY10%29_Altise_sedan_%282011-04-22%29.jpg',
  },
  {
    id: 'mazda-mx5-miata', brand: 'Mazda', model: 'MX-5 Miata', yearRange: '2025–2026',
    segment: 'Roadster', bodyType: 'Convertible', seats: 2, engineCC: 2000, isElectric: false,
    fuelType: 'Petrol', transmission: 'Manual / Automatic', fuelConsumption: 7.4, groundClearance: 120, bootSpace: 130,
    basePriceUSD: { min: 30000, max: 37500 }, maintenanceCost: 'Low', spareParts: 'Moderate',
    commonIssues: 'Very few mechanical issues; soft-top wear and tear over years is the main upkeep item.',
    bestFor: ['highway'],
    watchOut: 'Just two seats and minimal cargo space — a second car for most owners, not a sole daily driver.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/2019_Mazda_MX-5_RF_2.0_Sport_Nav.jpg/320px-2019_Mazda_MX-5_RF_2.0_Sport_Nav.jpg',
  },
  {
    id: 'porsche-911', brand: 'Porsche', model: '911', yearRange: '2025–2026',
    segment: 'Sports Coupe', bodyType: 'Coupe', seats: 4, engineCC: 3000, isElectric: false,
    fuelType: 'Petrol', transmission: 'PDK / Manual', fuelConsumption: 10.5, groundClearance: 100, bootSpace: 132,
    basePriceUSD: { min: 120000, max: 170000 }, maintenanceCost: 'Very High', spareParts: 'Hard',
    commonIssues: 'Exceptionally well engineered; specialist servicing is mandatory and costly outside major cities.',
    bestFor: ['highway', 'executive'],
    watchOut: 'Parts and service require a Porsche specialist wherever you are — budget for it before you budget for the car.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/2020_Porsche_911_Carrera_S.jpg/320px-2020_Porsche_911_Carrera_S.jpg',
  },
  {
    id: 'tesla-model-3', brand: 'Tesla', model: 'Model 3', yearRange: '2025–2026',
    segment: 'Electric Sedan', bodyType: 'Sedan', seats: 5, engineCC: 0, isElectric: true,
    fuelType: 'Electric', transmission: 'Single-speed', fuelConsumption: 0, groundClearance: 140, bootSpace: 425,
    basePriceUSD: { min: 37000, max: 42500 }, maintenanceCost: 'Low', spareParts: 'Moderate',
    commonIssues: 'Very few drivetrain issues; panel-gap and paint-quality inconsistencies reported on some early builds.',
    bestFor: ['fuelefficient', 'highway', 'family'],
    watchOut: 'Charging infrastructure and service-center access vary hugely by country — check local Supercharger and service coverage first.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/2018_Tesla_Model_3_Long_Range_Front.jpg/320px-2018_Tesla_Model_3_Long_Range_Front.jpg',
  },
  {
    id: 'ford-mustang', brand: 'Ford', model: 'Mustang', yearRange: '2025–2026',
    segment: 'Muscle Coupe', bodyType: 'Coupe', seats: 4, engineCC: 5000, isElectric: false,
    fuelType: 'Petrol', transmission: 'Automatic / Manual', fuelConsumption: 11.5, groundClearance: 110, bootSpace: 379,
    basePriceUSD: { min: 32000, max: 40000 }, maintenanceCost: 'Medium', spareParts: 'Moderate',
    commonIssues: 'Mechanically simple V8; live rear axle on some trims can feel unsettled on rough roads.',
    bestFor: ['highway', 'executive'],
    watchOut: 'V8 models are thirsty — factor fuel cost in heavily outside the US, where petrol is typically pricier.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/2018_Ford_Mustang_GT_Fastback.jpg/320px-2018_Ford_Mustang_GT_Fastback.jpg',
  },
  {
    id: 'chevrolet-corvette-c8', brand: 'Chevrolet', model: 'Corvette (C8)', yearRange: '2025–2026',
    segment: 'Sports Car', bodyType: 'Coupe', seats: 2, engineCC: 6200, isElectric: false,
    fuelType: 'Petrol', transmission: '8-speed DCT', fuelConsumption: 12.8, groundClearance: 100, bootSpace: 357,
    basePriceUSD: { min: 68000, max: 75000 }, maintenanceCost: 'High', spareParts: 'Hard',
    commonIssues: 'Mechanically robust mid-engine drivetrain; infotainment software glitches reported on early model years.',
    bestFor: ['highway', 'executive'],
    watchOut: 'Right-hand-drive availability is limited to a handful of markets — confirm your country gets an official version before ordering.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/2020_Chevrolet_Corvette_Stingray.jpg/320px-2020_Chevrolet_Corvette_Stingray.jpg',
  },
  {
    id: 'jeep-wrangler', brand: 'Jeep', model: 'Wrangler', yearRange: '2025–2026',
    segment: 'Off-Road SUV', bodyType: 'SUV', seats: 5, engineCC: 3600, isElectric: false,
    fuelType: 'Petrol', transmission: 'Manual / Automatic', fuelConsumption: 12.5, groundClearance: 252, bootSpace: 898,
    basePriceUSD: { min: 35000, max: 42000 }, maintenanceCost: 'Medium', spareParts: 'Moderate',
    commonIssues: '"Death wobble" front-suspension shimmy reported on some units; otherwise legendary off-road durability.',
    bestFor: ['offroad', 'family'],
    watchOut: 'Truck-like on-road ride and poor around-town fuel economy — a genuine compromise if most driving is highway commuting.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/2018_Jeep_Wrangler_Sahara.jpg/320px-2018_Jeep_Wrangler_Sahara.jpg',
  },
  {
    id: 'toyota-rav4', brand: 'Toyota', model: 'RAV4', yearRange: '2025–2026',
    segment: 'Compact SUV', bodyType: 'SUV', seats: 5, engineCC: 2500, isElectric: false,
    fuelType: 'Petrol / Hybrid', transmission: 'CVT / eCVT', fuelConsumption: 6.5, groundClearance: 195, bootSpace: 580,
    basePriceUSD: { min: 30000, max: 33000 }, maintenanceCost: 'Low', spareParts: 'Easy',
    commonIssues: 'Extremely reliable; the hybrid model has minimal complaints even at high mileage.',
    bestFor: ['family', 'offroad', 'fuelefficient', 'commercial'],
    watchOut: "Popular enough that demand pushes used prices close to new in many markets — shop several listings before settling.",
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/2019_Toyota_RAV4_XLE_AWD.jpg/320px-2019_Toyota_RAV4_XLE_AWD.jpg',
  },
  {
    id: 'bmw-3series', brand: 'BMW', model: '3 Series', yearRange: '2025–2026',
    segment: 'Sport Sedan', bodyType: 'Sedan', seats: 5, engineCC: 2000, isElectric: false,
    fuelType: 'Petrol', transmission: 'Automatic', fuelConsumption: 7.2, groundClearance: 130, bootSpace: 480,
    basePriceUSD: { min: 45000, max: 50000 }, maintenanceCost: 'High', spareParts: 'Hard',
    commonIssues: 'Newer B48 engines are dependable; older N20 units had timing-chain and cooling-system issues.',
    bestFor: ['highway', 'executive'],
    watchOut: 'Maintenance costs run well above mainstream Japanese sedans — factor this into total cost of ownership, not just the price tag.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/BMW_E90_front_20080331.jpg/320px-BMW_E90_front_20080331.jpg',
  },
  {
    id: 'mercedes-sclass', brand: 'Mercedes-Benz', model: 'S-Class', yearRange: '2025–2026',
    segment: 'Luxury Flagship Sedan', bodyType: 'Sedan', seats: 5, engineCC: 3000, isElectric: false,
    fuelType: 'Petrol / Hybrid', transmission: 'Automatic', fuelConsumption: 9.0, groundClearance: 130, bootSpace: 550,
    basePriceUSD: { min: 115000, max: 125000 }, maintenanceCost: 'Very High', spareParts: 'Hard',
    commonIssues: 'Air suspension and complex electronics are the main long-term cost risk; otherwise superbly engineered.',
    bestFor: ['executive'],
    watchOut: 'Depreciation is steep and repairs are specialist-only — best bought new or under warranty rather than as a high-mileage used car.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Mercedes-Benz_W211_front_20080318.jpg/320px-Mercedes-Benz_W211_front_20080318.jpg',
  },
  {
    id: 'ford-f150', brand: 'Ford', model: 'F-150', yearRange: '2025–2026',
    segment: 'Full-Size Pickup', bodyType: 'Pickup', seats: 6, engineCC: 3500, isElectric: false,
    fuelType: 'Petrol', transmission: 'Automatic', fuelConsumption: 12.0, groundClearance: 220, bootSpace: 0,
    basePriceUSD: { min: 38000, max: 45000 }, maintenanceCost: 'Medium', spareParts: 'Easy',
    commonIssues: 'EcoBoost turbo engines need disciplined oil-change intervals; otherwise a well-proven workhorse.',
    bestFor: ['commercial', 'offroad', 'family'],
    watchOut: 'Full-size US trucks are wide and heavy — parking and narrow-road countries can make daily use genuinely impractical.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/2021_Ford_F-150_XLT.jpg/320px-2021_Ford_F-150_XLT.jpg',
  },
  {
    id: 'land-rover-range-rover', brand: 'Land Rover', model: 'Range Rover', yearRange: '2025–2026',
    segment: 'Luxury SUV', bodyType: 'SUV', seats: 5, engineCC: 3000, isElectric: false,
    fuelType: 'Petrol / Hybrid', transmission: 'Automatic', fuelConsumption: 11.0, groundClearance: 218, bootSpace: 818,
    basePriceUSD: { min: 105000, max: 120000 }, maintenanceCost: 'Very High', spareParts: 'Hard',
    commonIssues: 'Air suspension and electrical faults are a known long-term risk; genuinely superb off-road capability when everything works.',
    bestFor: ['offroad', 'executive', 'family'],
    watchOut: 'Historically among the most expensive vehicles to maintain — an extended warranty is close to essential.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/2013_Land_Rover_Range_Rover_Vogue.jpg/320px-2013_Land_Rover_Range_Rover_Vogue.jpg',
  },
  {
    id: 'vw-golf-gti', brand: 'Volkswagen', model: 'Golf GTI', yearRange: '2025–2026',
    segment: 'Hot Hatch', bodyType: 'Hatchback', seats: 5, engineCC: 2000, isElectric: false,
    fuelType: 'Petrol', transmission: 'DSG / Manual', fuelConsumption: 7.5, groundClearance: 140, bootSpace: 374,
    basePriceUSD: { min: 33000, max: 36000 }, maintenanceCost: 'High', spareParts: 'Hard',
    commonIssues: 'DSG mechatronic unit and timing-chain tensioner issues on older generations; still a benchmark hot hatch.',
    bestFor: ['highway'],
    watchOut: 'VW parts and specialist labor cost noticeably more than mainstream Japanese equivalents outside Europe.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/VW_Golf_V_front_20071112.jpg/320px-VW_Golf_V_front_20071112.jpg',
  },
  {
    id: 'subaru-outback', brand: 'Subaru', model: 'Outback', yearRange: '2025–2026',
    segment: 'Adventure Wagon', bodyType: 'Wagon', seats: 5, engineCC: 2500, isElectric: false,
    fuelType: 'Petrol', transmission: 'CVT', fuelConsumption: 8.5, groundClearance: 213, bootSpace: 920,
    basePriceUSD: { min: 30000, max: 35000 }, maintenanceCost: 'Medium', spareParts: 'Moderate',
    commonIssues: 'Older EJ-series head-gasket issues resolved with newer FB-series engines; strong all-weather reputation.',
    bestFor: ['family', 'offroad', 'highway'],
    watchOut: 'Subaru dealer and parts networks are thin outside its core markets (US, Japan, Australia) — check local support first.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/2020_Subaru_Outback.jpg/320px-2020_Subaru_Outback.jpg',
  },
  {
    id: 'honda-crv', brand: 'Honda', model: 'CR-V', yearRange: '2025–2026',
    segment: 'Compact SUV', bodyType: 'SUV', seats: 5, engineCC: 1500, isElectric: false,
    fuelType: 'Petrol / Hybrid', transmission: 'CVT', fuelConsumption: 7.0, groundClearance: 208, bootSpace: 589,
    basePriceUSD: { min: 30000, max: 34000 }, maintenanceCost: 'Low', spareParts: 'Easy',
    commonIssues: 'Very few mechanical issues; early turbo oil-dilution complaints have since been resolved.',
    bestFor: ['family', 'fuelefficient', 'commercial'],
    watchOut: 'Popular and reliable enough that used values stay high — negotiate on price, not just the financing terms.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/2017_Honda_CR-V.jpg/320px-2017_Honda_CR-V.jpg',
  },
  {
    id: 'tesla-model-y', brand: 'Tesla', model: 'Model Y', yearRange: '2025–2026',
    segment: 'Electric Crossover', bodyType: 'SUV', seats: 5, engineCC: 0, isElectric: true,
    fuelType: 'Electric', transmission: 'Single-speed', fuelConsumption: 0, groundClearance: 167, bootSpace: 854,
    basePriceUSD: { min: 40000, max: 45000 }, maintenanceCost: 'Low', spareParts: 'Moderate',
    commonIssues: 'Very few drivetrain issues; some suspension noise reported on early production units.',
    bestFor: ['family', 'fuelefficient', 'highway'],
    watchOut: "Resale value has been more volatile than traditional automakers' due to Tesla's frequent price adjustments.",
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/2020_Tesla_Model_Y.jpg/320px-2020_Tesla_Model_Y.jpg',
  },
  {
    id: 'rivian-r1t', brand: 'Rivian', model: 'R1T', yearRange: '2025–2026',
    segment: 'Electric Pickup', bodyType: 'Pickup', seats: 5, engineCC: 0, isElectric: true,
    fuelType: 'Electric', transmission: 'Single-speed', fuelConsumption: 0, groundClearance: 306, bootSpace: 0,
    basePriceUSD: { min: 70000, max: 80000 }, maintenanceCost: 'Medium', spareParts: 'Hard',
    commonIssues: 'New platform with limited long-term data; early owners report minor software bugs, mostly patched.',
    bestFor: ['offroad', 'family'],
    watchOut: 'Service centers and charging infrastructure for this brand exist in only a handful of countries — check local support first.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/2022_Rivian_R1T.jpg/320px-2022_Rivian_R1T.jpg',
  },
  {
    id: 'hyundai-ioniq5', brand: 'Hyundai', model: 'Ioniq 5', yearRange: '2025–2026',
    segment: 'Electric Crossover', bodyType: 'SUV', seats: 5, engineCC: 0, isElectric: true,
    fuelType: 'Electric', transmission: 'Single-speed', fuelConsumption: 0, groundClearance: 160, bootSpace: 527,
    basePriceUSD: { min: 42000, max: 47000 }, maintenanceCost: 'Low', spareParts: 'Moderate',
    commonIssues: 'Very reliable EV platform; 12V battery drain reported on some early units left unused for weeks.',
    bestFor: ['family', 'fuelefficient', 'highway'],
    watchOut: '800V ultra-fast charging needs a compatible charger to hit advertised times — slower chargers work but take much longer.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Hyundai_Ioniq_5_IMG_5993.jpg/320px-Hyundai_Ioniq_5_IMG_5993.jpg',
  },
  {
    id: 'kia-ev9', brand: 'Kia', model: 'EV9', yearRange: '2025–2026',
    segment: 'Electric 3-Row SUV', bodyType: 'SUV', seats: 7, engineCC: 0, isElectric: true,
    fuelType: 'Electric', transmission: 'Single-speed', fuelConsumption: 0, groundClearance: 184, bootSpace: 828,
    basePriceUSD: { min: 55000, max: 65000 }, maintenanceCost: 'Low', spareParts: 'Moderate',
    commonIssues: 'New model with limited long-term data; shares the reliable E-GMP platform with the Ioniq 5.',
    bestFor: ['family'],
    watchOut: 'Third-row EV SUVs lose meaningful range with all seats occupied and loaded — check real-world range reviews, not just spec-sheet numbers.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/2024_Kia_EV9.jpg/320px-2024_Kia_EV9.jpg',
  },
  {
    id: 'porsche-taycan', brand: 'Porsche', model: 'Taycan', yearRange: '2025–2026',
    segment: 'Electric Sports Sedan', bodyType: 'Sedan', seats: 4, engineCC: 0, isElectric: true,
    fuelType: 'Electric', transmission: '2-speed (rear)', fuelConsumption: 0, groundClearance: 128, bootSpace: 407,
    basePriceUSD: { min: 100000, max: 115000 }, maintenanceCost: 'Very High', spareParts: 'Hard',
    commonIssues: 'Very few drivetrain faults; 12V battery and infotainment software issues reported on early cars.',
    bestFor: ['highway', 'executive'],
    watchOut: 'Real-world range trails the advertised WLTP figures more than most EVs, especially at highway speed — plan charging stops accordingly.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Porsche_Taycan_Turbo_S_IMG_2745.jpg/320px-Porsche_Taycan_Turbo_S_IMG_2745.jpg',
  },
  {
    id: 'ferrari-296gtb', brand: 'Ferrari', model: '296 GTB', yearRange: '2025–2026',
    segment: 'Hybrid Supercar', bodyType: 'Coupe', seats: 2, engineCC: 3000, isElectric: false,
    fuelType: 'Petrol Hybrid', transmission: 'DCT', fuelConsumption: 12.0, groundClearance: 120, bootSpace: 200,
    basePriceUSD: { min: 340000, max: 360000 }, maintenanceCost: 'Very High', spareParts: 'Hard',
    commonIssues: 'Complex hybrid system requires factory-trained technicians; extremely limited independent service options anywhere.',
    bestFor: ['executive'],
    watchOut: 'Only official Ferrari service centers can properly maintain the hybrid system — annual service costs run into the tens of thousands.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Ferrari_296_GTB_IMG_0421.jpg/320px-Ferrari_296_GTB_IMG_0421.jpg',
  },
  {
    id: 'lamborghini-revuelto', brand: 'Lamborghini', model: 'Revuelto', yearRange: '2025–2026',
    segment: 'Hybrid V12 Flagship', bodyType: 'Coupe', seats: 2, engineCC: 6500, isElectric: false,
    fuelType: 'Petrol Hybrid', transmission: 'DCT', fuelConsumption: 17.0, groundClearance: 110, bootSpace: 100,
    basePriceUSD: { min: 600000, max: 700000 }, maintenanceCost: 'Very High', spareParts: 'Hard',
    commonIssues: 'Brand-new platform — essentially no independent long-term reliability data exists yet.',
    bestFor: ['executive'],
    watchOut: 'Waiting lists commonly run one to two years or more from order, with allocation tightly controlled by the factory in most markets.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Lamborghini_Revuelto_IMG_1721.jpg/320px-Lamborghini_Revuelto_IMG_1721.jpg',
  },
  {
    id: 'mclaren-artura', brand: 'McLaren', model: 'Artura', yearRange: '2025–2026',
    segment: 'Hybrid Supercar', bodyType: 'Coupe', seats: 2, engineCC: 3000, isElectric: false,
    fuelType: 'Petrol Hybrid', transmission: 'DCT', fuelConsumption: 11.5, groundClearance: 110, bootSpace: 160,
    basePriceUSD: { min: 240000, max: 270000 }, maintenanceCost: 'Very High', spareParts: 'Hard',
    commonIssues: 'Early production cars had reported electrical and software gremlins; McLaren has issued several updates.',
    bestFor: ['executive'],
    watchOut: "McLaren's dealer network is far thinner than Ferrari's or Lamborghini's — confirm a service center exists in your country first.",
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/McLaren_Artura_IMG_2384.jpg/320px-McLaren_Artura_IMG_2384.jpg',
  },
  {
    id: 'bugatti-chiron-tourbillon', brand: 'Bugatti', model: 'Chiron / Tourbillon', yearRange: '2025–2026',
    segment: 'Hypercar', bodyType: 'Coupe', seats: 2, engineCC: 8000, isElectric: false,
    fuelType: 'Petrol / Hybrid', transmission: 'Automatic', fuelConsumption: 22.0, groundClearance: 100, bootSpace: 50,
    basePriceUSD: { min: 3000000, max: 4500000 }, maintenanceCost: 'Very High', spareParts: 'Hard',
    commonIssues: 'Essentially bespoke, hand-built vehicles — maintenance is a factory-managed relationship, not an independent repair market.',
    bestFor: ['executive'],
    watchOut: 'Ownership at this level includes factory-mandated storage, transport, and service arrangements far beyond a normal car purchase.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Bugatti_Chiron_IMG_4224.jpg/320px-Bugatti_Chiron_IMG_4224.jpg',
  },
  {
    id: 'rolls-royce-phantom', brand: 'Rolls-Royce', model: 'Phantom', yearRange: '2025–2026',
    segment: 'Ultra-Luxury Sedan', bodyType: 'Sedan', seats: 5, engineCC: 6750, isElectric: false,
    fuelType: 'Petrol', transmission: 'Automatic', fuelConsumption: 15.5, groundClearance: 130, bootSpace: 548,
    basePriceUSD: { min: 500000, max: 630000 }, maintenanceCost: 'Very High', spareParts: 'Hard',
    commonIssues: 'Exceptionally well built; bespoke coachwork and electronics mean only Rolls-Royce-trained technicians should service it.',
    bestFor: ['executive'],
    watchOut: 'Nearly every unit is bespoke-configured — resale value depends heavily on the specification choices made at order time.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Rolls-Royce_Phantom_VIII_IMG_3311.jpg/320px-Rolls-Royce_Phantom_VIII_IMG_3311.jpg',
  },
  {
    id: 'bentley-continental-gt', brand: 'Bentley', model: 'Continental GT', yearRange: '2025–2026',
    segment: 'Luxury Grand Tourer', bodyType: 'Coupe', seats: 4, engineCC: 4000, isElectric: false,
    fuelType: 'Petrol', transmission: 'Automatic', fuelConsumption: 13.0, groundClearance: 130, bootSpace: 358,
    basePriceUSD: { min: 250000, max: 320000 }, maintenanceCost: 'Very High', spareParts: 'Hard',
    commonIssues: 'Air suspension and complex electronics are the main long-term expense; mechanically very well engineered.',
    bestFor: ['highway', 'executive'],
    watchOut: 'Independent specialists for Bentley are rare outside major cities — factor dealer-only servicing into running costs.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Bentley_Continental_GT_IMG_1928.jpg/320px-Bentley_Continental_GT_IMG_1928.jpg',
  },
  {
    id: 'aston-martin-db12', brand: 'Aston Martin', model: 'DB12', yearRange: '2025–2026',
    segment: 'Grand Tourer', bodyType: 'Coupe', seats: 4, engineCC: 4000, isElectric: false,
    fuelType: 'Petrol', transmission: 'Automatic', fuelConsumption: 12.5, groundClearance: 120, bootSpace: 335,
    basePriceUSD: { min: 250000, max: 340000 }, maintenanceCost: 'Very High', spareParts: 'Hard',
    commonIssues: "Historically Aston's electronics and infotainment lagged rivals; recent generations have improved significantly.",
    bestFor: ['highway', 'executive'],
    watchOut: 'Depreciation curves and parts costs are steep — this is a car to buy for the experience, not as an investment.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Aston_Martin_DB12_IMG_0512.jpg/320px-Aston_Martin_DB12_IMG_0512.jpg',
  },
  {
    id: 'audi-e-tron-gt', brand: 'Audi', model: 'RS e-tron GT', yearRange: '2025–2026',
    segment: 'Electric Performance Sedan', bodyType: 'Sedan', seats: 4, engineCC: 0, isElectric: true,
    fuelType: 'Electric', transmission: 'Single/2-speed', fuelConsumption: 0, groundClearance: 121, bootSpace: 405,
    basePriceUSD: { min: 140000, max: 160000 }, maintenanceCost: 'High', spareParts: 'Moderate',
    commonIssues: "Shares the Porsche Taycan's platform and reliability profile; very few drivetrain faults reported.",
    bestFor: ['highway', 'executive'],
    watchOut: 'High-performance EV tires wear quickly and are expensive to replace — factor this into running costs.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Audi_e-tron_GT_IMG_2211.jpg/320px-Audi_e-tron_GT_IMG_2211.jpg',
  },
  {
    id: 'bmw-ix', brand: 'BMW', model: 'iX', yearRange: '2025–2026',
    segment: 'Electric Luxury SUV', bodyType: 'SUV', seats: 5, engineCC: 0, isElectric: true,
    fuelType: 'Electric', transmission: 'Single-speed', fuelConsumption: 0, groundClearance: 174, bootSpace: 500,
    basePriceUSD: { min: 90000, max: 110000 }, maintenanceCost: 'Medium', spareParts: 'Moderate',
    commonIssues: 'Reliable drivetrain; some owners report infotainment software quirks that BMW has patched via updates.',
    bestFor: ['family', 'executive'],
    watchOut: 'Polarizing styling with a large front grille — worth seeing in person before committing, opinions vary sharply.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/BMW_iX_IMG_4402.jpg/320px-BMW_iX_IMG_4402.jpg',
  },
  {
    id: 'mercedes-g-class', brand: 'Mercedes-Benz', model: 'G-Class', yearRange: '2025–2026',
    segment: 'Luxury Off-Roader', bodyType: 'SUV', seats: 5, engineCC: 4000, isElectric: false,
    fuelType: 'Petrol', transmission: 'Automatic', fuelConsumption: 14.0, groundClearance: 241, bootSpace: 667,
    basePriceUSD: { min: 140000, max: 180000 }, maintenanceCost: 'Very High', spareParts: 'Hard',
    commonIssues: 'Extremely durable body-on-frame design; running costs and parts prices are firmly luxury-tier.',
    bestFor: ['offroad', 'executive'],
    watchOut: 'Its boxy shape means real-world fuel economy and wind noise are worse than the price tag might suggest.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Mercedes-Benz_G-Class_W464_IMG_2033.jpg/320px-Mercedes-Benz_G-Class_W464_IMG_2033.jpg',
  },
  {
    id: 'toyota-land-cruiser', brand: 'Toyota', model: 'Land Cruiser', yearRange: '2025–2026',
    segment: 'Off-Road SUV', bodyType: 'SUV', seats: 7, engineCC: 3500, isElectric: false,
    fuelType: 'Petrol / Diesel', transmission: 'Automatic', fuelConsumption: 10.5, groundClearance: 225, bootSpace: 909,
    basePriceUSD: { min: 60000, max: 80000 }, maintenanceCost: 'Low', spareParts: 'Easy',
    commonIssues: 'Legendary reliability; virtually no major complaints even at very high mileage.',
    bestFor: ['offroad', 'family', 'commercial'],
    watchOut: 'High demand keeps resale values unusually strong — expect to pay close to new for a lightly used example in most markets.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/2022_Toyota_Land_Cruiser_300.jpg/320px-2022_Toyota_Land_Cruiser_300.jpg',
  },
  {
    id: 'ford-bronco', brand: 'Ford', model: 'Bronco', yearRange: '2025–2026',
    segment: 'Off-Road SUV', bodyType: 'SUV', seats: 5, engineCC: 2300, isElectric: false,
    fuelType: 'Petrol', transmission: 'Automatic / Manual', fuelConsumption: 11.5, groundClearance: 216, bootSpace: 1103,
    basePriceUSD: { min: 40000, max: 50000 }, maintenanceCost: 'Medium', spareParts: 'Moderate',
    commonIssues: 'Early units had reported hardtop leaks and connectivity issues, mostly addressed by recalls and updates.',
    bestFor: ['offroad', 'family'],
    watchOut: 'Removable doors and roof are genuinely fun but add wind noise and squeaks over time without careful maintenance.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/2021_Ford_Bronco_IMG_0912.jpg/320px-2021_Ford_Bronco_IMG_0912.jpg',
  },
  {
    id: 'chevrolet-silverado', brand: 'Chevrolet', model: 'Silverado', yearRange: '2025–2026',
    segment: 'Full-Size Pickup', bodyType: 'Pickup', seats: 6, engineCC: 5300, isElectric: false,
    fuelType: 'Petrol / Diesel', transmission: 'Automatic', fuelConsumption: 12.5, groundClearance: 231, bootSpace: 0,
    basePriceUSD: { min: 40000, max: 50000 }, maintenanceCost: 'Medium', spareParts: 'Easy',
    commonIssues: 'Well-proven V8 drivetrain; infotainment electrical gremlins reported on some model years.',
    bestFor: ['commercial', 'offroad', 'family'],
    watchOut: 'Full-size trucks are impractical or outright unavailable new in many countries — check local import rules first.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/2019_Chevrolet_Silverado_1500.jpg/320px-2019_Chevrolet_Silverado_1500.jpg',
  },
  {
    id: 'ram-1500', brand: 'Ram', model: '1500', yearRange: '2025–2026',
    segment: 'Full-Size Pickup', bodyType: 'Pickup', seats: 6, engineCC: 5700, isElectric: false,
    fuelType: 'Petrol', transmission: 'Automatic', fuelConsumption: 12.0, groundClearance: 203, bootSpace: 0,
    basePriceUSD: { min: 40000, max: 50000 }, maintenanceCost: 'Medium', spareParts: 'Easy',
    commonIssues: 'Air-suspension option adds long-term complexity; otherwise a comfortable, well-regarded truck.',
    bestFor: ['commercial', 'family', 'highway'],
    watchOut: 'Known for one of the smoothest rides in its class, at the cost of slightly less rugged off-road capability than rivals.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/2019_Ram_1500_Laramie.jpg/320px-2019_Ram_1500_Laramie.jpg',
  },
  {
    id: 'honda-odyssey', brand: 'Honda', model: 'Odyssey', yearRange: '2025–2026',
    segment: 'Minivan', bodyType: 'Minivan', seats: 8, engineCC: 3500, isElectric: false,
    fuelType: 'Petrol', transmission: 'Automatic', fuelConsumption: 10.5, groundClearance: 163, bootSpace: 1219,
    basePriceUSD: { min: 38000, max: 45000 }, maintenanceCost: 'Low', spareParts: 'Moderate',
    commonIssues: 'Early 10-speed automatic had software-related shift-quality complaints; very few mechanical issues since.',
    bestFor: ['family', 'commercial'],
    watchOut: 'Minivans are a shrinking segment outside North America — resale and parts support are strongest in the US.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/2018_Honda_Odyssey_Elite.jpg/320px-2018_Honda_Odyssey_Elite.jpg',
  },
  {
    id: 'toyota-sienna', brand: 'Toyota', model: 'Sienna (Hybrid)', yearRange: '2025–2026',
    segment: 'Hybrid Minivan', bodyType: 'Minivan', seats: 8, engineCC: 2500, isElectric: false,
    fuelType: 'Hybrid', transmission: 'eCVT', fuelConsumption: 6.8, groundClearance: 168, bootSpace: 1197,
    basePriceUSD: { min: 38000, max: 45000 }, maintenanceCost: 'Low', spareParts: 'Moderate',
    commonIssues: 'Hybrid-only since its current generation; extremely dependable with few reported issues.',
    bestFor: ['family', 'commercial', 'fuelefficient'],
    watchOut: 'AWD versions use a rear electric motor rather than a mechanical driveshaft — check winter-driving reviews if that matters to you.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/2021_Toyota_Sienna_Limited.jpg/320px-2021_Toyota_Sienna_Limited.jpg',
  },
  {
    id: 'mazda-cx5', brand: 'Mazda', model: 'CX-5', yearRange: '2025–2026',
    segment: 'Compact SUV', bodyType: 'SUV', seats: 5, engineCC: 2500, isElectric: false,
    fuelType: 'Petrol', transmission: 'Automatic', fuelConsumption: 8.0, groundClearance: 210, bootSpace: 442,
    basePriceUSD: { min: 30000, max: 35000 }, maintenanceCost: 'Low', spareParts: 'Moderate',
    commonIssues: 'Very few complaints; a premium-feeling interior for its price with an excellent reliability record.',
    bestFor: ['family', 'highway'],
    watchOut: 'Turbo variants require premium fuel to hit their rated output — factor that into running costs.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/2018_Mazda_CX-5_GT.jpg/320px-2018_Mazda_CX-5_GT.jpg',
  },
  {
    id: 'subaru-wrx', brand: 'Subaru', model: 'WRX', yearRange: '2025–2026',
    segment: 'Performance Sedan', bodyType: 'Sedan', seats: 5, engineCC: 2400, isElectric: false,
    fuelType: 'Petrol', transmission: 'Manual / Automatic', fuelConsumption: 10.5, groundClearance: 137, bootSpace: 411,
    basePriceUSD: { min: 33000, max: 40000 }, maintenanceCost: 'Medium', spareParts: 'Moderate',
    commonIssues: 'Turbo engine needs disciplined oil-change intervals; otherwise a durable all-weather performance platform.',
    bestFor: ['highway'],
    watchOut: 'Insurance costs for turbocharged AWD performance sedans run high for younger drivers in many markets.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/2022_Subaru_WRX_IMG_3821.jpg/320px-2022_Subaru_WRX_IMG_3821.jpg',
  },
  {
    id: 'nissan-z', brand: 'Nissan', model: 'Z', yearRange: '2025–2026',
    segment: 'Sports Coupe', bodyType: 'Coupe', seats: 2, engineCC: 3000, isElectric: false,
    fuelType: 'Petrol', transmission: 'Manual / Automatic', fuelConsumption: 11.0, groundClearance: 130, bootSpace: 235,
    basePriceUSD: { min: 42000, max: 50000 }, maintenanceCost: 'Medium', spareParts: 'Moderate',
    commonIssues: 'The twin-turbo VR30 engine, shared with Infiniti, is generally reliable but still building a long-term track record.',
    bestFor: ['highway'],
    watchOut: 'A relatively low-volume model in most markets — parts availability and resale value vary a lot by country.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/2023_Nissan_Z_IMG_1102.jpg/320px-2023_Nissan_Z_IMG_1102.jpg',
  },
  {
    id: 'toyota-gr86-subaru-brz', brand: 'Toyota', model: 'GR86 / Subaru BRZ', yearRange: '2025–2026',
    segment: 'Sports Coupe', bodyType: 'Coupe', seats: 4, engineCC: 2400, isElectric: false,
    fuelType: 'Petrol', transmission: 'Manual / Automatic', fuelConsumption: 8.8, groundClearance: 130, bootSpace: 237,
    basePriceUSD: { min: 30000, max: 35000 }, maintenanceCost: 'Low', spareParts: 'Moderate',
    commonIssues: 'The naturally aspirated flat-four is simple and dependable; no major reliability concerns reported.',
    bestFor: ['highway', 'firstcar'],
    watchOut: 'Rear-wheel drive with modest power is easy to drive quickly but genuinely requires attention in the wet.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/2022_Toyota_GR_86_IMG_2244.jpg/320px-2022_Toyota_GR_86_IMG_2244.jpg',
  },
  {
    id: 'hyundai-ioniq5-n', brand: 'Hyundai', model: 'Ioniq 5 N', yearRange: '2025–2026',
    segment: 'Electric Performance', bodyType: 'SUV', seats: 5, engineCC: 0, isElectric: true,
    fuelType: 'Electric', transmission: 'Single-speed (simulated gears)', fuelConsumption: 0, groundClearance: 150, bootSpace: 480,
    basePriceUSD: { min: 65000, max: 70000 }, maintenanceCost: 'Medium', spareParts: 'Moderate',
    commonIssues: 'Very new model built on the reliable E-GMP platform; track use accelerates tire and brake wear significantly.',
    bestFor: ['highway'],
    watchOut: 'Aggressive driving drains the battery far faster than the standard Ioniq 5 — spirited-driving range is notably shorter in practice.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Hyundai_Ioniq_5_IMG_5993.jpg/320px-Hyundai_Ioniq_5_IMG_5993.jpg',
  },
  {
    id: 'volvo-xc90', brand: 'Volvo', model: 'XC90', yearRange: '2025–2026',
    segment: 'Luxury 3-Row SUV', bodyType: 'SUV', seats: 7, engineCC: 2000, isElectric: false,
    fuelType: 'Petrol / Hybrid', transmission: 'Automatic', fuelConsumption: 8.5, groundClearance: 238, bootSpace: 680,
    basePriceUSD: { min: 55000, max: 65000 }, maintenanceCost: 'Medium', spareParts: 'Moderate',
    commonIssues: 'The turbocharged four-cylinder is the only engine offered — refined, though some buyers expect more cylinders at this price.',
    bestFor: ['family', 'executive', 'offroad'],
    watchOut: 'Plug-in hybrid variants need regular charging to hit advertised efficiency — used purely as a petrol car, economy is unremarkable.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/2020_Volvo_XC90_IMG_1132.jpg/320px-2020_Volvo_XC90_IMG_1132.jpg',
  },
  {
    id: 'lexus-rx', brand: 'Lexus', model: 'RX', yearRange: '2025–2026',
    segment: 'Luxury Crossover', bodyType: 'SUV', seats: 5, engineCC: 2400, isElectric: false,
    fuelType: 'Petrol / Hybrid', transmission: 'Automatic / eCVT', fuelConsumption: 7.5, groundClearance: 200, bootSpace: 612,
    basePriceUSD: { min: 50000, max: 60000 }, maintenanceCost: 'Low', spareParts: 'Easy',
    commonIssues: 'One of the most reliable luxury SUVs on the market; very few reported issues even at high mileage.',
    bestFor: ['family', 'executive', 'fuelefficient'],
    watchOut: 'Handles more like a comfortable cruiser than a sporty SUV — test drive against rivals if driving dynamics matter to you.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/2023_Lexus_RX_350h_IMG_0091.jpg/320px-2023_Lexus_RX_350h_IMG_0091.jpg',
  },
  {
    id: 'genesis-g90', brand: 'Genesis', model: 'G90', yearRange: '2025–2026',
    segment: 'Flagship Luxury Sedan', bodyType: 'Sedan', seats: 5, engineCC: 3500, isElectric: false,
    fuelType: 'Petrol', transmission: 'Automatic', fuelConsumption: 10.5, groundClearance: 150, bootSpace: 495,
    basePriceUSD: { min: 90000, max: 100000 }, maintenanceCost: 'Medium', spareParts: 'Moderate',
    commonIssues: 'Very well built with strong reliability data from parent Hyundai; the main limitation is brand recognition, not mechanicals.',
    bestFor: ['executive'],
    watchOut: 'Resale value is a genuine unknown in markets where the Genesis brand is new — expect steeper depreciation than established luxury rivals.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Genesis_G90_IMG_0231.jpg/320px-Genesis_G90_IMG_0231.jpg',
  },
  {
    id: 'polestar-4', brand: 'Polestar', model: '4', yearRange: '2025–2026',
    segment: 'Electric Performance Crossover', bodyType: 'SUV', seats: 5, engineCC: 0, isElectric: true,
    fuelType: 'Electric', transmission: 'Single / dual-motor', fuelConsumption: 0, groundClearance: 158, bootSpace: 526,
    basePriceUSD: { min: 55000, max: 65000 }, maintenanceCost: 'Medium', spareParts: 'Moderate',
    commonIssues: 'New model with limited long-term data; shares componentry with Volvo/Geely group models.',
    bestFor: ['highway', 'family'],
    watchOut: 'No rear window on some trims — relies entirely on a camera-based rearview mirror, which not everyone adapts to easily.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Polestar_4_IMG_0033.jpg/320px-Polestar_4_IMG_0033.jpg',
  },
  {
    id: 'lucid-air', brand: 'Lucid', model: 'Air', yearRange: '2025–2026',
    segment: 'Luxury Electric Sedan', bodyType: 'Sedan', seats: 5, engineCC: 0, isElectric: true,
    fuelType: 'Electric', transmission: 'Single / dual-motor', fuelConsumption: 0, groundClearance: 126, bootSpace: 970,
    basePriceUSD: { min: 70000, max: 90000 }, maintenanceCost: 'Medium', spareParts: 'Hard',
    commonIssues: 'Excellent efficiency and range; as a low-volume brand, few long-term reliability patterns exist yet.',
    bestFor: ['highway', 'executive'],
    watchOut: 'Service centers exist in only a small number of countries — confirm local support is realistic before buying.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Lucid_Air_IMG_0442.jpg/320px-Lucid_Air_IMG_0442.jpg',
  },
  {
    id: 'cadillac-escalade', brand: 'Cadillac', model: 'Escalade', yearRange: '2025–2026',
    segment: 'Full-Size Luxury SUV', bodyType: 'SUV', seats: 7, engineCC: 6200, isElectric: false,
    fuelType: 'Petrol / Diesel', transmission: 'Automatic', fuelConsumption: 13.5, groundClearance: 203, bootSpace: 722,
    basePriceUSD: { min: 80000, max: 95000 }, maintenanceCost: 'High', spareParts: 'Moderate',
    commonIssues: 'Air suspension and the large curved OLED display are the main long-term cost risks; the drivetrain itself is proven GM hardware.',
    bestFor: ['family', 'executive'],
    watchOut: 'Its size makes it genuinely difficult to park and maneuver outside North America — measure your garage and streets first.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/2021_Cadillac_Escalade_IMG_2012.jpg/320px-2021_Cadillac_Escalade_IMG_2012.jpg',
  },
  {
    id: 'mini-cooper', brand: 'MINI', model: 'Cooper', yearRange: '2025–2026',
    segment: 'Premium Hatchback', bodyType: 'Hatchback', seats: 4, engineCC: 1500, isElectric: false,
    fuelType: 'Petrol', transmission: 'Automatic / Manual', fuelConsumption: 6.5, groundClearance: 135, bootSpace: 210,
    basePriceUSD: { min: 28000, max: 35000 }, maintenanceCost: 'High', spareParts: 'Hard',
    commonIssues: 'Peppy turbo engines; timing-chain and cooling-system issues have appeared on higher-mileage examples.',
    bestFor: ['firstcar', 'highway'],
    watchOut: 'Charming to drive, but running costs (parts, insurance) are noticeably higher than mainstream small hatchbacks like the Corolla or Civic.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/2021_MINI_Cooper_S_IMG_0921.jpg/320px-2021_MINI_Cooper_S_IMG_0921.jpg',
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export function maintenanceScore(cost: MaintenanceCost): number {
  return { Low: 4, Medium: 3, High: 2, 'Very High': 1 }[cost];
}

export function sparePartsScore(avail: SparePartsAvail): number {
  return { Easy: 3, Moderate: 2, Hard: 1 }[avail];
}

export const USE_CASE_META: Record<UseCaseTag, { label: string; icon: string; description: string; priorities: string }> = {
  family:        { label: 'Family Car',          icon: '👨‍👩‍👧‍👦', description: 'Space, safety, and reliability for the whole family', priorities: 'Seats · Boot space · Reliability' },
  commercial:    { label: 'Commercial / Rideshare', icon: '🚖', description: 'Built for daily high-mileage commercial use',             priorities: 'Durability · Fuel economy · Cheap parts' },
  highway:       { label: 'Highway Driving',     icon: '🛣️',  description: 'Comfortable and stable for long-distance travel',        priorities: 'Comfort · Fuel range · Stability' },
  budget:        { label: 'Budget Buy',          icon: '💰', description: 'Best value for a tight budget',                          priorities: 'Low purchase price · Low maintenance' },
  offroad:       { label: 'Off-Road / Rough Roads', icon: '🪨', description: 'High ground clearance for tough terrain and bad roads', priorities: 'Ground clearance · Durability · 4WD' },
  executive:     { label: 'Executive / Business',icon: '💼', description: 'Presence, comfort, and brand image for professionals',    priorities: 'Interior quality · Brand · Comfort' },
  firstcar:      { label: 'First-Time Buyer',    icon: '🎓', description: 'Easy to drive, forgiving, and cheap to maintain',        priorities: 'Low maintenance · Easy parts · Reliability' },
  fuelefficient: { label: 'Fuel / Energy Efficiency', icon: '⛽', description: 'Lowest running cost per kilometre',                priorities: 'Consumption · Engine size · City driving' },
};
