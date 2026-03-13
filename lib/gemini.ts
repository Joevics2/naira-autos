// lib/gemini.ts
// Single-call AI autofill for car listing forms using Gemini Flash

export interface ParsedListing {
  brand?: string;
  model?: string;
  year?: string;
  trim?: string;
  mileage?: string;
  transmission?: 'Automatic' | 'Manual';
  fuelType?: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  condition?: 'nigerian_used' | 'foreign_used' | 'brand_new';
  vehicleType?: 'car' | 'truck' | 'van' | 'bus' | 'bike';
  bodyType?: 'sedan' | 'suv' | 'hatchback' | 'coupe' | 'convertible' | 'wagon' | 'truck' | 'van' | 'bus' | 'bike';
  color?: string;
  accidentHistory?: 'never' | 'minor' | 'major';
  price?: string;
  negotiable?: boolean;
  urgentSale?: boolean;
  locationState?: string;
  cityArea?: string;
  town?: string;
  sellerType?: 'owner' | 'agent' | 'dealer';
  description?: string;
  reasonForSelling?: 'upgrading' | 'relocating' | 'need_cash' | 'company_disposal' | 'other';
  features?: string[];
  // FAQs
  acWorking?: 'yes' | 'no';
  acIssue?: string;
  engineCondition?: 'yes' | 'no';
  engineIssue?: string;
  wasRepainted?: 'yes' | 'no';
  documentsComplete?: 'yes' | 'no';
  missingDocs?: string;
  oilConsumption?: 'yes' | 'no';
  otherIssues?: string;
}

const NIGERIAN_STATES = [
  'Lagos', 'Abuja FCT', 'Kano', 'Rivers', 'Oyo', 'Kaduna', 'Ogun', 'Edo', 'Delta', 'Anambra',
  'Imo', 'Katsina', 'Enugu', 'Bauchi', 'Plateau', 'Cross River', 'Akwa Ibom', 'Borno', 'Osun',
  'Ondo', 'Kwara', 'Benue', 'Abia', 'Sokoto', 'Nasarawa', 'Adamawa', 'Kebbi', 'Taraba',
  'Niger', 'Gombe', 'Jigawa', 'Yobe', 'Zamfara', 'Ekiti', 'Bayelsa', 'Ebonyi', 'Kogi'
];

const KNOWN_BRANDS = [
  'Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Lexus', 'Nissan', 'Ford', 'Hyundai',
  'Kia', 'Volkswagen', 'Audi', 'Land Rover', 'Mazda', 'Peugeot', 'Mitsubishi',
  'Chevrolet', 'Subaru', 'Isuzu', 'Jeep', 'Volvo', 'Infiniti', 'Acura', 'Porsche',
  'Range Rover', 'Jaguar', 'Suzuki', 'Fiat', 'Renault', 'Opel', 'MG',
  'Chery', 'BYD', 'Haval', 'GAC', 'JAC', 'Innoson',
  'MAN', 'Scania', 'Hino', 'FUSO', 'Sinotruk', 'Shacman', 'Dongfeng', 'Foton',
  'Yutong', 'King Long', 'Higer', 'Ashok Leyland',
  'Yamaha', 'Bajaj', 'TVS', 'Haojue',
];

const AVAILABLE_FEATURES = [
  'Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks',
  'AM/FM Radio', 'CD Player', 'Bluetooth', 'USB / AUX',
  'Backup Camera', 'Parking Sensors', 'ABS', 'Airbags',
  'Alloy Wheels', 'Sunroof', 'Leather Seats', 'Heated Seats',
  'Navigation GPS', 'Cruise Control', 'Keyless Entry', 'Immobilizer',
];

const SYSTEM_PROMPT = `You are an AI that extracts structured car listing data from free-form text written by Nigerian car sellers.

Return ONLY a valid JSON object with no markdown, no explanation, no code blocks. Just the raw JSON.

Nigerian context:
- "Tokunbo" = foreign used car
- "Nigerian used" = locally used
- "First body" = original owner
- Common price formats: "3.5M", "₦3,500,000", "3500000"
- States: ${NIGERIAN_STATES.join(', ')}
- Common brands: ${KNOWN_BRANDS.join(', ')}

Extract these fields (include ONLY fields you are confident about, omit uncertain ones):
{
  "brand": string (must match one of the known brands, or the actual brand name),
  "model": string (e.g. "Camry", "Accord", "Hilux"),
  "year": string (4-digit year as string),
  "trim": string (e.g. "LE", "XLE", "Sport" - optional),
  "mileage": string (numeric only, km),
  "transmission": "Automatic" | "Manual",
  "fuelType": "Petrol" | "Diesel" | "Hybrid" | "Electric",
  "condition": "nigerian_used" | "foreign_used" | "brand_new",
  "vehicleType": "car" | "truck" | "van" | "bus" | "bike",
  "bodyType": "sedan" | "suv" | "hatchback" | "coupe" | "convertible" | "wagon" | "truck" | "van" | "bus" | "bike",
  "color": string,
  "accidentHistory": "never" | "minor" | "major",
  "price": string (numeric only, no commas or currency symbols),
  "negotiable": boolean,
  "urgentSale": boolean,
  "locationState": string (must match one of the Nigerian states listed above),
  "cityArea": string (area within the state),
  "town": string (specific neighborhood, optional),
  "sellerType": "owner" | "agent" | "dealer",
  "reasonForSelling": "upgrading" | "relocating" | "need_cash" | "company_disposal" | "other",
  "description": string (clean, well-formatted version of the description),
  "features": array of strings from this list only: ${AVAILABLE_FEATURES.join(', ')},
  "acWorking": "yes" | "no",
  "acIssue": string (if AC not working),
  "engineCondition": "yes" | "no",
  "engineIssue": string (if engine has issues),
  "wasRepainted": "yes" | "no",
  "documentsComplete": "yes" | "no",
  "missingDocs": string (if documents incomplete),
  "oilConsumption": "yes" | "no",
  "otherIssues": string
}`;

export async function parseListingWithGemini(text: string): Promise<ParsedListing> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error('Gemini API key not configured (NEXT_PUBLIC_GEMINI_API_KEY)');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ parts: [{ text: `Extract listing data from this text:\n\n${text}` }] }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 1024,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  // Strip markdown code fences if present
  const cleaned = rawText.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();

  try {
    return JSON.parse(cleaned) as ParsedListing;
  } catch {
    throw new Error('AI returned invalid JSON. Please try again or fill the form manually.');
  }
}