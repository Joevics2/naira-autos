/**
 * United Kingdom town dataset for the Distance Calculator tool
 * family. The 4 national capitals (London, Edinburgh, Cardiff,
 * Belfast) plus major cities and regional centres. The `state`
 * field holds the constituent country (England/Scotland/Wales/
 * Northern Ireland) since the UK isn't organised into US-style
 * states. Coordinates and population from GeoNames; London-metro
 * boroughs (Islington, Croydon, Harrow, etc.) are deliberately
 * excluded as redundant with London itself.
 * See gb-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const GB_TOWNS: DistanceTown[] = [
  { name: "London", state: "England (Capital)", lat: 51.50853, lng: -0.12574, population: 8961989, isCapital: true },
  { name: "Birmingham", state: "England", lat: 52.48142, lng: -1.89983, population: 1157603, isCapital: false },
  { name: "Glasgow", state: "Scotland", lat: 55.86515, lng: -4.25763, population: 626410, isCapital: false },
  { name: "Manchester", state: "England", lat: 53.48095, lng: -2.23743, population: 568996, isCapital: false },
  { name: "Sheffield", state: "England", lat: 53.38297, lng: -1.4659, population: 556500, isCapital: false },
  { name: "Leeds", state: "England", lat: 53.79648, lng: -1.54785, population: 536280, isCapital: false },
  { name: "Edinburgh", state: "Scotland (Capital)", lat: 55.95206, lng: -3.19648, population: 514990, isCapital: true },
  { name: "Liverpool", state: "England", lat: 53.41058, lng: -2.97794, population: 496770, isCapital: false },
  { name: "Bristol", state: "England", lat: 51.45523, lng: -2.59665, population: 479024, isCapital: false },
  { name: "Cardiff", state: "Wales (Capital)", lat: 51.48, lng: -3.18, population: 372089, isCapital: true },
  { name: "Leicester", state: "England", lat: 52.6386, lng: -1.13169, population: 368600, isCapital: false },
  { name: "Bradford", state: "England", lat: 53.79391, lng: -1.75206, population: 366187, isCapital: false },
  { name: "Belfast", state: "Northern Ireland (Capital)", lat: 54.59682, lng: -5.92541, population: 348005, isCapital: true },
  { name: "Coventry", state: "England", lat: 52.40656, lng: -1.51217, population: 345324, isCapital: false },
  { name: "Nottingham", state: "England", lat: 52.9536, lng: -1.15047, population: 323632, isCapital: false },
  { name: "Reading", state: "England", lat: 51.45625, lng: -0.97113, population: 318014, isCapital: false },
  { name: "Kingston upon Hull", state: "England", lat: 53.7446, lng: -0.33525, population: 314018, isCapital: false },
  { name: "Preston", state: "England", lat: 53.76282, lng: -2.70452, population: 313332, isCapital: false },
  { name: "Swansea", state: "Wales", lat: 51.62079, lng: -3.94323, population: 300352, isCapital: false },
  { name: "Newcastle upon Tyne", state: "England", lat: 54.97328, lng: -1.61396, population: 300125, isCapital: false },
  { name: "Southend-on-Sea", state: "England", lat: 51.53782, lng: 0.71433, population: 295310, isCapital: false },
  { name: "Brighton", state: "England", lat: 50.82838, lng: -0.13947, population: 283870, isCapital: false },
  { name: "Derby", state: "England", lat: 52.92277, lng: -1.47663, population: 270468, isCapital: false },
  { name: "Southampton", state: "England", lat: 50.90395, lng: -1.40428, population: 269781, isCapital: false },
  { name: "Wolverhampton", state: "England", lat: 52.58547, lng: -2.12296, population: 263700, isCapital: false },
  { name: "Plymouth", state: "England", lat: 50.37153, lng: -4.14305, population: 260203, isCapital: false },
  { name: "Stoke-on-Trent", state: "England", lat: 53.00415, lng: -2.18538, population: 258366, isCapital: false },
  { name: "Milton Keynes", state: "England", lat: 52.04172, lng: -0.75583, population: 256385, isCapital: false },
  { name: "Northampton", state: "England", lat: 52.25, lng: -0.88333, population: 245899, isCapital: false },
  { name: "Luton", state: "England", lat: 51.87967, lng: -0.41748, population: 225262, isCapital: false },
  { name: "Portsmouth", state: "England", lat: 50.79899, lng: -1.09125, population: 208100, isCapital: false },
  { name: "Swindon", state: "England", lat: 51.55797, lng: -1.78116, population: 201669, isCapital: false },
  { name: "Aberdeen", state: "Scotland", lat: 57.14369, lng: -2.09814, population: 198590, isCapital: false },
  { name: "Ipswich", state: "England", lat: 52.05917, lng: 1.15545, population: 178835, isCapital: false },
  { name: "Wigan", state: "England", lat: 53.54296, lng: -2.63706, population: 175405, isCapital: false },
  { name: "Warrington", state: "England", lat: 53.39254, lng: -2.58024, population: 172330, isCapital: false },
  { name: "Sunderland", state: "England", lat: 54.90465, lng: -1.38222, population: 170134, isCapital: false },
  { name: "Bournemouth", state: "England", lat: 50.72048, lng: -1.8795, population: 163600, isCapital: false },
  { name: "Peterborough", state: "England", lat: 52.57364, lng: -0.24777, population: 163379, isCapital: false },
  { name: "Oxford", state: "England", lat: 51.75222, lng: -1.25596, population: 162100, isCapital: false },
  { name: "York", state: "England", lat: 53.95763, lng: -1.08271, population: 156135, isCapital: false },
  { name: "Telford", state: "England", lat: 52.67659, lng: -2.44926, population: 155570, isCapital: false },
  { name: "Poole", state: "England", lat: 50.71429, lng: -1.98458, population: 151500, isCapital: false },
  { name: "Huddersfield", state: "England", lat: 53.64904, lng: -1.78416, population: 149017, isCapital: false },
  { name: "Dundee", state: "Scotland", lat: 56.46913, lng: -2.97489, population: 148210, isCapital: false },
  { name: "Cambridge", state: "England", lat: 52.2, lng: 0.11667, population: 145674, isCapital: false },
  { name: "Blackpool", state: "England", lat: 53.81667, lng: -3.05, population: 145007, isCapital: false },
  { name: "Norwich", state: "England", lat: 52.62783, lng: 1.29834, population: 143135, isCapital: false },
  { name: "Gloucester", state: "England", lat: 51.86568, lng: -2.2431, population: 132416, isCapital: false },
  { name: "Exeter", state: "England", lat: 50.7236, lng: -3.52751, population: 130709, isCapital: false },
  { name: "Lincoln", state: "England", lat: 53.22683, lng: -0.53792, population: 103813, isCapital: false },
  { name: "Worcester", state: "England", lat: 52.18935, lng: -2.22001, population: 101659, isCapital: false },
  { name: "Bath", state: "England", lat: 51.3751, lng: -2.36172, population: 101557, isCapital: false },
  { name: "Chester", state: "England", lat: 53.1905, lng: -2.89189, population: 90524, isCapital: false },
  { name: "Carlisle", state: "England", lat: 54.8951, lng: -2.9382, population: 78470, isCapital: false },
  { name: "Canterbury", state: "England", lat: 51.27904, lng: 1.07992, population: 55087, isCapital: false },
  { name: "Inverness", state: "Scotland", lat: 57.47908, lng: -4.22398, population: 47790, isCapital: false },
  { name: "Perth", state: "Scotland", lat: 56.39522, lng: -3.43139, population: 47350, isCapital: false },
  { name: "Stirling", state: "Scotland", lat: 56.11903, lng: -3.93682, population: 37910, isCapital: false },
  { name: "Newport", state: "Wales", lat: 50.70146, lng: -1.29124, population: 24884, isCapital: false },
  { name: "Bangor", state: "Wales", lat: 53.22752, lng: -4.12936, population: 18322, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return GB_TOWNS.find((t) => t.name === name);
}
