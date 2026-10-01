// lib/best-car/en.ts — English strings for "Best Car For…" (/tools/best-car-for)
import type { BestCarStrings } from '@/lib/best-car/types';

export const en: BestCarStrings = {
  lang: 'en',
  locale: 'en',
  localeByCountry: { us: 'en-US', gb: 'en-GB', ng: 'en-NG', za: 'en-ZA', in: 'en-IN', au: 'en-AU', ca: 'en-CA', gh: 'en-GH', ke: 'en-KE' },
  dir: 'ltr',
  latin: true,

  path: '/tools/best-car-for',
  homePath: '/',
  hubPath: '/tools',
  aboutPath: '/about',
  comparePath: '/tools/car-comparison',
  fuelPath: '/tools/fuel-cost-calculator',
  valuationPath: '/evaluate-used-car',

  defaultCountry: 'ng',
  priorityCountries: ['ng', 'us', 'gb', 'ca', 'za', 'gh', 'ke', 'au', 'in', 'pk', 'ae', 'ph', 'et', 'tz'],
  picksCountry: 'us',

  nav: { home: 'Home', tools: 'Tools', current: 'Best Car For...', back: 'Back to Tools', breadcrumb: 'Breadcrumb' },

  meta: {
    title: 'Best Car For... 2026 — Car Recommender by Use Case, {countries} Countries',
    description:
      'Find the best car for your needs with prices in your own currency across {countries} countries. Pick a use case — family car, commercial use, highway driving, budget buy, off-road, executive, first car or fuel efficiency — and get a ranked top 5 from {globalCars} models, scored on maintenance cost, spare parts and fuel economy.',
    keywords: [
      'best car to buy 2026', 'best family car', 'best car for commercial use', 'best car recommender',
      'what car should i buy', 'best suv 2026', 'cheapest car to maintain', 'best first car to buy',
      'best car for highway driving', 'best executive car', 'best fuel efficient car', 'car recommendation',
      'best budget car', 'best off road car', 'best car to buy in nigeria', 'best tokunbo car nigeria',
      'best car for taxi', 'best car usa', 'best car uk', 'best car uae', 'best car india', 'best car south africa',
      'best car australia', 'best car canada', 'best car ghana', 'best car kenya', 'naira autos',
    ],
    ogTitle: 'Best Car For... 2026 — Car Recommender | Naira Autos',
    ogDescription: 'Global car recommender with local pricing for {countries} countries. Pick your use case and get the top 5 cars ranked by maintenance cost, fuel economy and spare parts availability.',
    ogLocale: 'en_US',
  },

  hero: {
    badge: 'Free Tool',
    verified: 'Prices last verified',
    h1: 'Best Car For...',
    intro:
      'Choose your country and your use case, and get ranked car recommendations with pricing in your local currency across {countries} countries — scored on maintenance cost, spare parts availability, fuel economy and ground clearance. {globalCars} models covered, from the Toyota Corolla to the Bugatti Chiron.',
  },

  ui: {
    countryLabel: 'Country & Currency',
    popularCountries: 'Popular markets',
    otherCountries: 'All other countries',
    africaNote: 'Includes {usedCars} older, secondhand import-market models specific to this region, alongside the {globalCars} global models.',
    prompt: 'What do you need the car for?',
    rankedBy: 'Ranked by:',
    topRecs: 'Top {n} recommendations — {country}',
    emptyState: 'Select a use case above to see recommendations',
    match: 'Match',
    electric: 'Electric',
    electricMotor: 'Electric motor',
    seatsFmt: '{n} seats',
    bootFmt: '{n}L boot',
    consumptionUnit: 'L/100km',
    showDetails: 'View details — issues & watch-outs',
    hideDetails: 'Hide details',
    commonIssues: 'Common issues:',
    estIn: 'est. in {country}',
    copyLink: 'Copy link',
    linkCopied: 'Link copied',
  },

  enums: {
    maintenance: { Low: 'Low', Medium: 'Medium', High: 'High', 'Very High': 'Very High' },
    spareParts: { Easy: 'Easy', Moderate: 'Moderate', Hard: 'Hard' },
    bodyType: {},
    fuelType: {},
    transmission: {},
  },

  useCases: {
    family:        { label: 'Family Car', icon: '👨‍👩‍👧‍👦', description: 'Space, safety and reliability for the whole family', priorities: 'Seats · Boot space · Reliability · Price', pickTitle: 'Best Family Car' },
    commercial:    { label: 'Commercial / Rideshare', icon: '🚖', description: 'Built for daily, high-mileage commercial use', priorities: 'Durability · Cheap parts · Fuel economy', pickTitle: 'Best for Commercial Use' },
    highway:       { label: 'Highway Driving', icon: '🛣️', description: 'Comfortable and stable for long-distance travel', priorities: 'Fuel economy · Engine power · Reliability', pickTitle: 'Best for Highway' },
    budget:        { label: 'Budget Buy', icon: '💰', description: 'Best value when money is tight', priorities: 'Low purchase price · Low maintenance', pickTitle: 'Best Budget Buy' },
    offroad:       { label: 'Off-Road / Rough Roads', icon: '🪨', description: 'High ground clearance for tough terrain and bad roads', priorities: 'Ground clearance · Durability · Parts', pickTitle: 'Best Off-Road / Bad Roads' },
    executive:     { label: 'Executive / Business', icon: '💼', description: 'Presence, comfort and brand image for professionals', priorities: 'Prestige · Engine · Running costs', pickTitle: 'Best Executive Car' },
    firstcar:      { label: 'First-Time Buyer', icon: '🎓', description: 'Easy to drive, forgiving and cheap to maintain', priorities: 'Low maintenance · Easy parts · Reliability', pickTitle: 'Best First Car' },
    fuelefficient: { label: 'Fuel / Energy Efficiency', icon: '⛽', description: 'The lowest running cost per kilometre', priorities: 'Fuel or energy use · Maintenance · Parts', pickTitle: 'Most Fuel Efficient' },
  },

  seo: {
    reviewedByLabel: 'Reviewed by',
    reviewer: 'Joshua Victor, Founder',
    updatedLabel: 'Content updated:',
    picksHeading: 'Best Cars by Use Case — 2026',
    picksNote:
      'These lists are generated by the same scoring the tool uses, for a global reference market. Exact rankings and prices adjust to the country you select above, and older used-import models are added for African countries.',
    faqHeading: 'Best Car FAQ',
    moreToolsHeading: 'More free tools',
    disclaimer:
      'Prices are estimates for {countries} markets, not quotes. Maintenance and parts ratings are editorial assessments and can differ by market. Always inspect a car, check its history and get a local quote before you buy.',
    sections: [
      {
        h2: 'How this car recommender works',
        paragraphs: [
          'Best Car For… ranks {totalCars} vehicles for the way you will actually use one. You pick a country and a use case — family, commercial or rideshare, highway driving, budget, off-road, executive, first car or fuel efficiency — and the tool scores every model that is sold or commonly imported in that market, then shows the top five. Each score runs from 0 to 100 and combines only measurable factors: maintenance cost, spare-parts availability, fuel or energy consumption, ground clearance, seating, boot space, engine size and purchase price.',
          'The weights change with the use case. For a taxi or delivery car, maintenance and parts availability make up 70% of the score. For an off-road buyer, ground clearance alone is half of it. For a first car, reliability and easy parts matter far more than power.',
          'Rankings are the same in every country on purpose. The score uses each car’s base price in US dollars, so switching from Lagos to London changes the price you see, not the order of the list. That keeps the recommendation about the car itself, while the estimate under each result adapts to your currency and to the typical import duties and taxes of your market. The tool covers {countries} countries: {globalCars} models are compared everywhere, and in African markets {usedCars} older imported models — the used cars many buyers there actually shop for — are added.',
        ],
      },
      {
        h2: 'Start with your daily use, not the spec sheet',
        paragraphs: [
          'The best car for you depends less on the specifications and more on your **real daily pattern**. A car that looks excellent on paper can be a poor choice if the nearest mechanic who knows it is far away, or if its ground clearance turns your commute into an obstacle course.',
          'For **commercial and rideshare use**, reliability at high mileage and low parts cost per kilometre decide everything. The Toyota Corolla and Toyota Camry are a familiar sight in taxi and delivery fleets in many countries because their engines are simple, tolerant of missed services and repairable by almost any mechanic.',
          'For **executive use**, brand perception is real, but it should not override running costs. A Mercedes-Benz S-Class is rated Very High for maintenance here: air suspension and complex electronics can turn one repair into a four-figure bill. Many professionals are better served by a well-kept mainstream sedan than by a high-mileage luxury car with mounting repair costs.',
          'For **first-time buyers**, mechanic familiarity matters most. A car whose faults need specialist diagnosis takes longer and costs more to fix. Toyota and Honda models with engines under 2.5 litres have the largest ecosystem of parts, mechanics and online advice wherever you are buying.',
          'For **families**, seats and boot space matter, but so does the price of a third-row SUV you may not need. That is why the family score also rewards a lower purchase price: a five-seat crossover often serves a family of four as well as a much larger vehicle at a fraction of the cost.',
          'For **off-road and rough-road buyers**, look at ground clearance first and drivetrain second. Around 250 mm of clearance makes potholes, flooded streets and unpaved tracks manageable, while a 140 mm sedan can still work in a city if the driver is careful — but speed bumps and flooding become a recurring problem.',
        ],
      },
      {
        h2: 'Total cost of ownership beats the sticker price',
        paragraphs: [
          'A cheaper car is not always the cheaper choice. Over five years, fuel, servicing, insurance, tyres and repairs can rival the purchase price, especially in markets where imported parts are slow to arrive. Two cars with similar prices can differ by thousands of dollars in ownership cost simply because one shares parts with millions of other vehicles and the other needs a dealer-only component.',
          'Use the maintenance and spare-parts badges on each result as a shortcut for that hidden cost, then run your shortlist through the [Fuel Cost Calculator](/tools/fuel-cost-calculator) to turn consumption figures into a monthly running-cost estimate for your own mileage. Resale value matters too: in many markets mainstream Japanese and Korean models tend to hold their value better than niche or high-maintenance brands, which lowers the real cost of owning them.',
        ],
      },
      {
        h2: 'New cars, used imports and what changes by market',
        paragraphs: [
          'The right answer depends on what is actually for sale where you live. In the United States, Canada, Australia and most of Europe, buyers mostly choose between new cars and locally traded used ones, and the {globalCars} global models cover that well. In much of Africa the picture is different: a large share of the cars on the road are used imports, often ten to twenty years old, shipped from Japan, Europe or North America. Those buyers care about corrosion history, gearbox condition and whether parts are stocked in their city.',
          'When you select an African country, the tool adds {usedCars} older models — from the 2003–2007 Toyota Corolla to the 2005–2015 Toyota Hilux — with issues and inspection tips written for used-car buyers. Gulf markets tend to combine lower vehicle taxes with cheaper fuel, which changes the value of large SUVs and V6 engines compared with high-tax markets such as Singapore or parts of northern Europe. That is why the country selector exists: the same car can be a sensible purchase in one market and an expensive indulgence in another.',
        ],
      },
      {
        h2: 'How to read the maintenance and spare-parts ratings',
        paragraphs: [
          '**Maintenance cost** rates the typical ongoing cost of keeping a model on the road relative to the others: Low, Medium, High or Very High. **Spare-parts availability** rates how easily replacement parts can be found: Easy, Moderate or Hard. Both are editorial ratings based on model reputation, typical service pricing and parts networks. They are not a quote from any garage, and they can differ between markets.',
          'Treat Low and Easy as a strong sign. Treat High or Hard as a prompt to ask local mechanics before you commit. Every result also lists common issues and a watch-out for that specific model — read them before you go to see the car.',
        ],
      },
      {
        h2: 'How country prices are estimated — and their limits',
        paragraphs: [
          'Each car has a base price in US dollars, an approximate 2025–2026 entry-trim figure. To show a local price, the tool multiplies that base by a country-specific market multiplier — a directional estimate of import duty, excise, VAT and typical dealer markup — and by an exchange rate. Because exchange rates and tax rules change, treat the result as a starting point for your budget, not a quote.',
          'Some models are simply not sold new in some countries, and trims, options and used-car condition can move real prices well away from these estimates. Confirm with local listings or a dealer before you set a final budget.',
        ],
      },
      {
        h2: 'Turning a shortlist into a decision',
        paragraphs: [
          'Pick your use case, open **View details** on each of the top results, and note the common issues. Compare your two favourites side by side with the [Car Comparison tool](/tools/car-comparison). Before you pay for any used car, check its history with the [VIN checker](/tools/vin-checker-global) and get an independent mechanical inspection. Once you own the car, the [AI car valuation](/evaluate-used-car) tool helps you track what it is worth. You can also use **Copy link** to share your exact country and use-case selection with a partner or a mechanic.',
        ],
      },
    ],
    exampleTitle: 'Example: matching a car to the real use case',
    exampleBody:
      'Illustrative scenario, not a customer case study. Imagine the owner of a small courier business in a large West African city who is drawn to a seven-seat SUV for its cargo room. In the commercial ranking, however, the Toyota Corolla and Toyota RAV4 score higher than larger vehicles, because the owner’s real routes are short, stop-start trips with moderate loads, where parts cost per kilometre and fuel use matter more than raw cargo space. The scores do not say the SUV is a bad vehicle — they say it is a worse match for that pattern. The money saved on the purchase price and fuel can stay in the business as working capital.',
  },

  related: { compare: 'Car Comparison Tool', fuel: 'Fuel Cost Calculator', valuation: 'AI Car Valuation' },

  faqs: [
    {
      q: 'Does this tool show real prices for my country?',
      a: 'It shows an estimate, not a live quote. Each car has a base price in US dollars; choosing your country applies that market’s typical import-duty and tax multiplier and an exchange rate to estimate a local price. Confirm with a dealer or local listing before you budget exactly.',
    },
    {
      q: 'How are the cars scored?',
      a: 'Every car gets a 0–100 score per use case from measurable factors — maintenance cost, spare-parts availability, fuel or energy use, ground clearance, seats, boot space, engine size and purchase price — with different weights for each use case. The ranking does not change by country; only the displayed price does.',
    },
    {
      q: 'What is the best family car to buy?',
      a: 'In our ranking, {picks:family} come out on top for family use, balancing seats, boot space, reliability and price. Larger families should check seat counts in each result’s details.',
    },
    {
      q: 'What is the best car for commercial or rideshare use?',
      a: 'For high-mileage commercial use the top three are {picks:commercial}. They combine low maintenance cost, easy spare parts and reasonable fuel use, which is what keeps cost per kilometre down.',
    },
    {
      q: 'What is the best car for rough or unpaved roads?',
      a: 'Ground clearance and durability lead this ranking. The current top three are {picks:offroad}. For city use only, a sedan is manageable with careful driving, but flooding and speed bumps will test low cars.',
    },
    {
      q: 'What is the best first car to buy?',
      a: 'The top first-car picks are {picks:firstcar}: low maintenance, easy parts and mechanics who know them everywhere. Avoid exotic and ultra-luxury brands as a first car — parts are expensive and specialist mechanics are required.',
    },
    {
      q: 'Which cars are the most fuel or energy efficient?',
      a: 'Hybrids and electric cars lead: {picks:fuelefficient}. Electric cars only make sense if reliable charging is available where you live and drive, so check charging coverage before you decide.',
    },
    {
      q: 'Why do African countries show older used models?',
      a: 'In many African markets, used imports are the main way people buy a car. When you select an African country the tool adds {usedCars} older models with used-buyer issues and inspection tips, alongside the {globalCars} global models.',
    },
  ],

  schema: {
    appName: 'Best Car For… — car recommender by use case',
    appDescription: 'Free car recommender: choose a country and use case and get a ranked top 5 from {totalCars} cars, with estimated local prices in {countries} countries.',
    publisher: 'Naira Autos',
    author: 'Naira Autos',
  },
};
