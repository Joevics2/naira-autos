-- ============================================================
-- Seed: Toyota Camry 2015 — Parts & Problems
-- Run in Supabase SQL Editor
-- ============================================================

-- ── VEHICLE PARTS ─────────────────────────────────────────

INSERT INTO vehicle_parts (
  model_id,
  brand_slug, brand_name, model_name, vehicle_type,
  year, image_url,
  intro, parts, buying_guide,
  slug, meta_title, meta_description,
  faqs
) VALUES (
  (SELECT id FROM vehicle_models WHERE slug = 'camry' AND brand_slug = 'toyota' LIMIT 1),
  'toyota', 'Toyota', 'camry', 'car',
  2015,
  NULL,

  -- INTRO
  'The 2015 Toyota Camry is one of the most widely available Tokunbo sedans in the Nigerian market, and for good reason — its parts are abundant, mechanics are familiar with it across every major city, and the 2.5-litre 2AR-FE engine is known for going well past 200,000 kilometres with basic maintenance. This guide covers realistic spare parts prices across Lagos, Abuja, and Port Harcourt markets, with notes on where to source each component and what to expect from OEM versus aftermarket quality.',

  -- PARTS JSONB
  '[
    {
      "category": "Engine",
      "part_name": "Engine Air Filter",
      "price_min": 3500,
      "price_max": 8000,
      "replacement_interval": "Every 15,000km or 12 months",
      "availability": "Excellent",
      "oem_recommended": false,
      "notes": "Denso and Bosch aftermarket filters perform well. OEM Toyota filter available at CFAO and authorised dealers."
    },
    {
      "category": "Engine",
      "part_name": "Engine Oil Filter",
      "price_min": 2000,
      "price_max": 5000,
      "replacement_interval": "Every 5,000km with every oil change",
      "availability": "Excellent",
      "oem_recommended": true,
      "notes": "Do not use cheap no-brand filters on the 2AR-FE engine — the engine is prone to oil consumption and a quality filter matters."
    },
    {
      "category": "Engine",
      "part_name": "Spark Plugs (Set of 4)",
      "price_min": 18000,
      "price_max": 40000,
      "replacement_interval": "Every 60,000km (iridium) or 30,000km (standard)",
      "availability": "Good",
      "oem_recommended": true,
      "notes": "Iridium plugs are strongly recommended. NGK and Denso are the correct OEM specifications. Avoid copper plugs from roadside vendors."
    },
    {
      "category": "Engine",
      "part_name": "Timing Chain Kit",
      "price_min": 55000,
      "price_max": 130000,
      "replacement_interval": "Inspect at 120,000km, replace if rattle present",
      "availability": "Fair",
      "oem_recommended": true,
      "notes": "The 2AR-FE uses a chain, not a belt — it should last the life of the engine with proper oil maintenance. Rattle on cold start is the warning sign. Source from Aspanda or authorised dealers only."
    },
    {
      "category": "Engine",
      "part_name": "Water Pump",
      "price_min": 20000,
      "price_max": 50000,
      "replacement_interval": "Every 100,000km or when leaking",
      "availability": "Good",
      "oem_recommended": false,
      "notes": "Gates and Aisin aftermarket pumps are reliable alternatives to OEM. Replace gasket at the same time."
    },
    {
      "category": "Cooling",
      "part_name": "Radiator",
      "price_min": 35000,
      "price_max": 85000,
      "replacement_interval": "As needed — inspect for leaks or corrosion",
      "availability": "Good",
      "oem_recommended": false,
      "notes": "Aluminium aftermarket radiators from reputable Chinese brands (CSF, Spectra) work well in Nigerian heat. Avoid plastic-tank radiators — they crack under Lagos traffic conditions."
    },
    {
      "category": "Cooling",
      "part_name": "Thermostat",
      "price_min": 5000,
      "price_max": 12000,
      "replacement_interval": "Every 80,000km or if overheating",
      "availability": "Excellent",
      "oem_recommended": false,
      "notes": "A common cause of overheating complaints. Inexpensive part — always replace when flushing coolant."
    },
    {
      "category": "Brakes",
      "part_name": "Front Brake Pads",
      "price_min": 12000,
      "price_max": 28000,
      "replacement_interval": "Every 30,000–50,000km depending on driving style",
      "availability": "Excellent",
      "oem_recommended": false,
      "notes": "Akebono and Bosch pads are recommended. Lagos stop-start traffic wears front pads significantly faster than highway driving."
    },
    {
      "category": "Brakes",
      "part_name": "Rear Brake Pads",
      "price_min": 10000,
      "price_max": 22000,
      "replacement_interval": "Every 50,000–70,000km",
      "availability": "Excellent",
      "oem_recommended": false,
      "notes": "Rear pads typically last longer than fronts. Replace in pairs."
    },
    {
      "category": "Brakes",
      "part_name": "Front Brake Rotors (Pair)",
      "price_min": 28000,
      "price_max": 70000,
      "replacement_interval": "Every 60,000–80,000km or when below minimum thickness",
      "availability": "Good",
      "oem_recommended": false,
      "notes": "Cross-drilled aftermarket rotors are popular but standard solid rotors handle Nigerian road conditions better long-term."
    },
    {
      "category": "Suspension",
      "part_name": "Front Shock Absorbers (Each)",
      "price_min": 20000,
      "price_max": 55000,
      "replacement_interval": "Every 80,000km or when bouncing excessively",
      "availability": "Good",
      "oem_recommended": false,
      "notes": "KYB and Monroe are the recommended brands. Nigerian roads degrade shocks faster than US or European averages — inspect every 40,000km."
    },
    {
      "category": "Suspension",
      "part_name": "Front Lower Control Arm",
      "price_min": 22000,
      "price_max": 55000,
      "replacement_interval": "As needed — typically 80,000–120,000km",
      "availability": "Good",
      "oem_recommended": false,
      "notes": "Pot holes are the primary cause of control arm failure in Nigeria. Check bushings and ball joints — often the bushing fails before the arm itself."
    },
    {
      "category": "Suspension",
      "part_name": "CV Axle Shaft",
      "price_min": 25000,
      "price_max": 60000,
      "replacement_interval": "When clicking sound appears on turning",
      "availability": "Good",
      "oem_recommended": false,
      "notes": "Clicking when turning at low speed is the classic symptom. Replace the full shaft rather than just the CV boot in high-mileage cars."
    },
    {
      "category": "Electrical",
      "part_name": "Car Battery",
      "price_min": 45000,
      "price_max": 90000,
      "replacement_interval": "Every 2–3 years in Nigeria",
      "availability": "Excellent",
      "oem_recommended": false,
      "notes": "Inverter use and frequent short trips drain batteries faster. Amaron and Exide perform well in Nigeria heat. Avoid roadside batteries without warranty."
    },
    {
      "category": "Electrical",
      "part_name": "Alternator",
      "price_min": 50000,
      "price_max": 130000,
      "replacement_interval": "As needed — typically 120,000–180,000km",
      "availability": "Good",
      "oem_recommended": false,
      "notes": "Signs of failure: battery warning light, dimming lights, electrical components behaving erratically. Rebuilt alternators are available but new units are more reliable in Nigerian heat."
    },
    {
      "category": "Electrical",
      "part_name": "Starter Motor",
      "price_min": 28000,
      "price_max": 70000,
      "replacement_interval": "As needed",
      "availability": "Good",
      "oem_recommended": false,
      "notes": "Slow cranking, especially in the morning, is the early warning sign. Often confused with battery failure — test both before replacing either."
    },
    {
      "category": "Air Conditioning",
      "part_name": "AC Compressor",
      "price_min": 85000,
      "price_max": 200000,
      "replacement_interval": "As needed — commonly fails at 100,000–150,000km",
      "availability": "Good",
      "oem_recommended": false,
      "notes": "The 2015 Camry AC compressor is a known weak point in Nigeria. Running the AC with low refrigerant destroys the compressor. Always check refrigerant levels before replacing the compressor."
    },
    {
      "category": "Air Conditioning",
      "part_name": "AC Evaporator",
      "price_min": 40000,
      "price_max": 95000,
      "replacement_interval": "As needed — commonly 8–12 years",
      "availability": "Fair",
      "oem_recommended": false,
      "notes": "Foul smell from vents is the primary symptom. Dashboard removal is required for replacement — factor in significant labour cost."
    },
    {
      "category": "Transmission",
      "part_name": "Transmission Fluid Change",
      "price_min": 15000,
      "price_max": 35000,
      "replacement_interval": "Every 60,000km",
      "availability": "Excellent",
      "oem_recommended": true,
      "notes": "Use Toyota WS (World Standard) ATF only. Using the wrong fluid in the 6-speed automatic causes shudder and long-term damage. Many mechanics in Nigeria use generic ATF — insist on the correct specification."
    },
    {
      "category": "Filters",
      "part_name": "Cabin Air Filter",
      "price_min": 4000,
      "price_max": 9000,
      "replacement_interval": "Every 15,000km or 12 months",
      "availability": "Excellent",
      "oem_recommended": false,
      "notes": "Frequently neglected in Nigeria. A clogged cabin filter reduces AC efficiency noticeably. Located behind the glove box — owner-replaceable in under 10 minutes."
    }
  ]'::JSONB,

  -- BUYING GUIDE (1000+ words)
  E'Buying spare parts for the 2015 Toyota Camry in Nigeria is significantly easier than for most other vehicles in its class. The XV50 generation (2012–2017) was exported to Nigeria in large numbers through Cotonou and Port Harcourt, which means the local parts supply chain is well-established. That said, the ease of availability has also created a market flooded with counterfeit and substandard components — and on a vehicle with known engine oil consumption issues, installing the wrong parts can turn a small problem into an expensive one.\n\nUnderstanding OEM Versus Aftermarket\n\nFor the 2015 Camry, not all parts carry the same OEM-versus-aftermarket stakes. Engine internals, transmission components, and anything related to the 2AR-FE engine''s oil system should use genuine Toyota parts or top-tier OEM-equivalent brands like Denso, Aisin, and NGK — all of which manufacture the original components for Toyota anyway. For these parts, saving ₦5,000 on a counterfeit oil filter or cheap spark plug can cost you ₦500,000 in engine repairs six months later.\n\nOn the other hand, brake pads, air filters, cabin filters, shock absorbers, and radiators have excellent aftermarket options at significant savings. Brands like KYB (shock absorbers), Akebono (brake pads), Gates (belts and water pumps), and Bosch (filters and ignition) all produce quality components at prices well below Toyota dealer pricing. These are the parts where buying aftermarket makes economic sense without compromising reliability.\n\nWhere to Buy Parts in Lagos\n\nLadipo Market in Mushin remains the largest and most comprehensive spare parts market in West Africa. For the Toyota Camry, you will find virtually every component here — from engine internals to body panels to electrical components. The key is knowing what you need before you arrive, and having a trusted contact inside the market. Prices at Ladipo are negotiable, and the first price quoted is rarely the best price. As a reference point, a set of four NGK iridium spark plugs for the 2015 Camry should cost between ₦18,000 and ₦25,000. If you are being quoted significantly above or below this range, something is wrong with either the quality or the deal.\n\nAspanda Complex in Lagos Island is the preferred source for genuine and first-grade Toyota parts. The sellers here generally carry more reliable stock than Ladipo, and the pricing reflects this. For high-stakes parts like timing chain kits, transmission filters, and genuine AC compressors, Aspanda is worth the premium. Expect to pay 20–40% more than Ladipo prices, but with significantly higher confidence in authenticity.\n\nFor urgent purchases or those based outside Lagos, authorised Toyota dealers — including CFAO Motors and Toyota Nigeria Limited branches — carry genuine parts for the Camry. Dealer pricing is the highest available, but authenticity is guaranteed and warranty applies. For a vehicle you plan to keep long-term, this is the right approach for critical components.\n\nAbuja Parts Market\n\nIn Abuja, Dei-Dei Auto Parts Market serves as the primary sourcing location. The selection is smaller than Lagos markets, but availability for the Camry is generally good given the car''s popularity. Abuja mechanics tend to source from Lagos for specialised parts, which adds lead time and sometimes inflated prices. If you live in Abuja and need a specialised component quickly, calling a trusted Lagos parts dealer for same-day bus transport is a common and effective approach.\n\nPort Harcourt\n\nPort Harcourt''s spare parts trade is centred around the Mile 1 and Rumuola areas. Parts availability for the Toyota Camry is reasonable in PH, though pricing tends to run 10–15% higher than Lagos due to transportation costs. Given Port Harcourt''s coastal humidity, parts related to the cooling system and electrical components tend to degrade faster — factor this into your maintenance schedule if you are operating a Camry in Rivers State.\n\nMaintenance Schedule That Actually Matters in Nigeria\n\nThe Toyota Camry''s recommended service intervals are designed for temperate climates with clean fuel and consistent electricity. In Nigeria, where fuel quality varies, stop-start traffic is constant, and air quality in Lagos is among the worst in Africa, these intervals need adjustment.\n\nEngine oil should be changed every 5,000 kilometres, not the 10,000 kilometres printed in the service manual. Use 5W-30 full synthetic oil — this is particularly important for the 2AR-FE engine, which has documented oil consumption issues. Running this engine on cheap mineral oil or incorrect viscosity accelerates wear on the piston rings, which are the primary cause of oil burning in high-mileage examples.\n\nThe transmission fluid in the 6-speed automatic should be changed every 60,000 kilometres using Toyota World Standard (WS) ATF exclusively. This is non-negotiable. Many Nigerian mechanics use generic Dexron ATF as a substitute — this is incorrect and will eventually cause transmission shudder and, in severe cases, clutch pack damage. The shudder is commonly misdiagnosed as engine mounts or driveshaft issues, leading to unnecessary parts replacement before the actual cause is identified.\n\nAC refrigerant should be checked annually. The 2015 Camry uses R-134a refrigerant. Running the AC with low refrigerant damages the compressor, which is an expensive repair. A recharge costs between ₦5,000 and ₦12,000 at a reputable mechanic — far cheaper than the ₦85,000–₦200,000 compressor replacement it prevents.\n\nChoosing a Mechanic\n\nFor the 2015 Toyota Camry specifically, seek out a mechanic with demonstrated experience on Toyota vehicles rather than a general specialist. Toyota''s diagnostic systems, particularly the VSC and ABS warning light patterns, require familiarity with Toyota-specific fault codes. A good indicator: ask the mechanic what transmission fluid the Camry requires. If the answer is not "Toyota WS ATF" or a close equivalent, find another mechanic.\n\nAvoid mechanics who suggest replacing expensive components — alternators, compressors, control modules — without first running diagnostic checks. The 2015 Camry''s OBD2 port accepts any standard scanner, and a proper diagnosis should precede any significant repair recommendation.',

  -- SLUG
  'toyota-camry-2015-parts',

  -- META
  'Toyota Camry 2015 Spare Parts Prices in Nigeria | Naira Autos',
  'Complete spare parts prices for the 2015 Toyota Camry in Nigeria. Engine, brakes, suspension, AC and electrical parts with Lagos, Abuja and PH market prices.',

  -- FAQS
  '[
    {
      "question": "Where can I buy genuine Toyota Camry 2015 parts in Lagos?",
      "answer": "Aspanda Complex on Lagos Island is the best source for genuine Toyota parts. Ladipo Market in Mushin has a wider range at lower prices, but you need to verify part quality carefully. CFAO Motors and Toyota Nigeria Limited dealer branches stock genuine parts with warranty."
    },
    {
      "question": "How much does it cost to service a 2015 Toyota Camry in Nigeria?",
      "answer": "A basic service including oil change (5W-30 full synthetic), oil filter, and inspection costs between ₦25,000 and ₦55,000 depending on your location and mechanic. A full service including air filter, cabin filter, and spark plugs runs ₦60,000 to ₦120,000."
    },
    {
      "question": "What transmission fluid does the 2015 Toyota Camry need?",
      "answer": "The 2015 Camry 6-speed automatic requires Toyota WS (World Standard) ATF. Using generic Dexron ATF will cause transmission shudder over time. Always specify Toyota WS when instructing your mechanic."
    },
    {
      "question": "Why does my 2015 Toyota Camry burn oil?",
      "answer": "The 2.5-litre 2AR-FE engine in the 2015 Camry has a known oil consumption issue, particularly in units that received the Toyota PCV modification fix. Check oil level every 2,000 to 3,000 kilometres and use 5W-30 full synthetic oil to minimise consumption."
    },
    {
      "question": "How much does AC repair cost on the 2015 Toyota Camry in Nigeria?",
      "answer": "A refrigerant recharge costs ₦5,000 to ₦12,000. Replacing the AC compressor costs ₦85,000 to ₦200,000 including labour. Replacing the AC evaporator, which requires dashboard removal, costs ₦80,000 to ₦150,000 in parts and labour combined."
    }
  ]'::JSONB
);

-- ── VEHICLE PROBLEMS ──────────────────────────────────────

INSERT INTO vehicle_problems (
  model_id,
  brand_slug, brand_name, model_name, vehicle_type,
  year, image_url,
  intro, problems, owners_advice,
  slug, meta_title, meta_description,
  faqs
) VALUES (
  (SELECT id FROM vehicle_models WHERE slug = 'camry' AND brand_slug = 'toyota' LIMIT 1),
  'toyota', 'Toyota', 'camry', 'car',
  2015,
  NULL,

  -- INTRO
  'The 2015 Toyota Camry has a justified reputation for reliability in the Nigerian market, but it is not without its faults. Several issues are specific to the 2.5-litre 2AR-FE engine that powers most Nigerian-market examples, and others are a direct consequence of Nigerian road and weather conditions rather than manufacturing defects. This guide is written from the perspective of real-world Camry ownership in Nigeria — not the sanitised version you will find in American owner forums, where the roads are smooth and the fuel is consistent.',

  -- PROBLEMS JSONB
  '[
    {
      "title": "Engine Oil Consumption (2AR-FE)",
      "description": "The 2.5-litre 2AR-FE engine fitted to the majority of 2015 Camrys sold in Nigeria as Tokunbo has a documented oil consumption problem acknowledged by Toyota in a Technical Service Bulletin (TSB 0094-12). Affected engines can consume between 500ml and 1 litre of oil every 3,000 kilometres. The root cause is excessive clearance between the piston rings and cylinder walls, which allows oil to be drawn into the combustion chamber and burned. The problem is frequently made worse in Nigeria by mechanics using incorrect oil viscosity or cheap mineral oil during servicing. Symptoms include a slight blue tint to exhaust smoke on startup, unexplained oil loss without any visible leaks, and an engine that runs fine despite being dangerously low on oil.",
      "severity": "moderate",
      "frequency": "common",
      "repair_cost_min": 150000,
      "repair_cost_max": 450000
    },
    {
      "title": "AC System Failure — Evaporator and Compressor",
      "description": "Air conditioning failure is arguably the most complained-about issue with the 2015 Toyota Camry in Nigeria, and for understandable reasons — a non-functional AC in Lagos or Abuja is not a minor inconvenience, it is a daily misery. Two components are primarily responsible. The AC evaporator, located inside the dashboard, is prone to developing slow leaks that cause the refrigerant to escape gradually over months. The first symptom is reduced cooling efficiency; owners often recharge the refrigerant repeatedly without fixing the underlying leak. The compressor, meanwhile, fails most commonly because it has been run with low or no refrigerant — a consequence of the evaporator leak going unaddressed. When the compressor seizes, metal particles circulate through the entire AC system, meaning flushing all lines is required alongside compressor replacement. Labour for dashboard removal to access the evaporator runs ₦40,000 to ₦80,000 in addition to parts costs.",
      "severity": "moderate",
      "frequency": "common",
      "repair_cost_min": 80000,
      "repair_cost_max": 280000
    },
    {
      "title": "Transmission Shudder at Highway Speeds",
      "description": "The 6-speed automatic transmission in the 2015 Camry is generally reliable, but a specific shudder felt between 60 and 100 km/h is a known complaint. In most cases, this is not a mechanical transmission failure — it is caused by contaminated or degraded transmission fluid, or by a previous service where non-Toyota ATF was used. The torque converter lock-up clutch is sensitive to fluid quality, and the shudder is the clutch slipping rather than locking cleanly. The fix is a transmission fluid flush using Toyota WS ATF, which resolves the issue in the majority of cases. If a fluid change does not resolve the shudder, the torque converter itself may need replacement — a significantly more expensive repair.",
      "severity": "critical",
      "frequency": "occasional",
      "repair_cost_min": 15000,
      "repair_cost_max": 350000
    },
    {
      "title": "Suspension Wear from Nigerian Road Conditions",
      "description": "The 2015 Camry''s suspension was designed for American road surfaces, which are significantly smoother than Nigerian urban roads. As a result, suspension components wear faster in Nigeria than any service manual would suggest. The front lower control arm bushings typically degrade within 60,000 to 80,000 kilometres of Nigerian driving — about half their American lifespan. Worn bushings cause a knocking sound over rough surfaces and imprecise steering response. The front shock absorbers similarly degrade faster, with excessive bouncing over speed bumps as the primary symptom. In Abuja, where speed bumps are particularly aggressive, shock absorber lifespan can be as low as 50,000 kilometres on Camrys driven daily.",
      "severity": "moderate",
      "frequency": "common",
      "repair_cost_min": 40000,
      "repair_cost_max": 130000
    },
    {
      "title": "VSC and Check Engine Warning Lights",
      "description": "VSC (Vehicle Stability Control) and Check Engine lights illuminate more frequently on Nigerian Camrys than on their American counterparts, and the reasons are often related to fuel quality and sensor sensitivity. Oxygen sensors and mass airflow (MAF) sensors are the most common triggers. The 2015 Camry''s engine management system is calibrated for 91-octane or higher fuel; consistent use of adulterated or substandard fuel causes the oxygen sensors to read incorrectly, triggering the Check Engine light. The MAF sensor is sensitive to dust and contaminants, which are more prevalent in Nigerian air than American. Cleaning the MAF sensor with MAF cleaner spray resolves many false warning light complaints without parts replacement. Scan with an OBD2 reader before spending money on any sensor replacement.",
      "severity": "minor",
      "frequency": "common",
      "repair_cost_min": 5000,
      "repair_cost_max": 45000
    },
    {
      "title": "Catalytic Converter Theft",
      "description": "While not a mechanical defect, catalytic converter theft has become a significant problem for Toyota Camry owners in Lagos and Abuja. The Camry''s ground clearance and catalytic converter design make it relatively easy to access from underneath, and the precious metals inside (platinum, palladium, rhodium) are valuable in scrap markets. A replacement catalytic converter costs ₦80,000 to ₦180,000. Owners parking in unsecured locations overnight are most at risk. Installing a catalytic converter protection cage (available at Aspanda for ₦15,000 to ₦35,000) is strongly recommended for Lagos-based owners.",
      "severity": "critical",
      "frequency": "occasional",
      "repair_cost_min": 80000,
      "repair_cost_max": 180000
    },
    {
      "title": "Power Steering Rack Leak",
      "description": "Electric power steering on the 2015 Camry eliminates the traditional power steering fluid leak, but the steering rack itself can develop mechanical wear in high-mileage examples. The symptom is a clunking or knocking sensation felt through the steering wheel when driving over rough roads or turning at slow speeds. This is distinct from a worn control arm (which produces a similar knock) and requires a mechanic experienced with Camry steering systems to diagnose correctly. Steering rack replacement is among the more expensive repairs on this vehicle.",
      "severity": "moderate",
      "frequency": "rare",
      "repair_cost_min": 120000,
      "repair_cost_max": 350000
    }
  ]'::JSONB,

  -- OWNERS ADVICE (1000+ words)
  E'If you are considering buying a 2015 Toyota Camry in Nigeria, the following advice comes from real inspection experience across Lagos, Abuja, and Port Harcourt markets — not from theory. The Camry is a genuinely good car, but the specific issues listed above mean that a poorly maintained example can turn into a money pit within six months of purchase. A well-maintained one, bought correctly, will serve you reliably for years.\n\nStart With the Engine Oil Dipstick\n\nBefore you look at anything else — before you sit in the car, before you discuss price, before you even properly inspect the exterior — pull the engine oil dipstick. Look at two things: the level and the colour. The level should be between the minimum and maximum marks. If it is below the minimum, the seller has either neglected the car or is hiding an oil consumption problem. The colour should be amber to light brown if the oil is relatively fresh, or dark brown if it is due for a change. Black, thick oil with a burnt smell indicates the car has been neglected. Mayonnaise-coloured or foamy oil on the dipstick means water contamination — this is a serious red flag that suggests a blown head gasket or internal coolant leak. Walk away from any Camry with foamy or milky oil.\n\nThe Oil Consumption Test\n\nBecause the 2015 Camry''s 2AR-FE engine is known to consume oil, ask the seller to let you check the oil level at two separate times — once at the start of your inspection and again after a 20-30 minute test drive. If the level has dropped visibly in that time, the consumption is severe. Any honest seller will agree to this. A seller who refuses should be viewed with suspicion.\n\nTest the Air Conditioning Before Anything Else\n\nStart the engine, switch the AC to maximum cold and maximum fan speed, and wait three minutes. In Nigerian heat, a properly functioning 2015 Camry AC should produce noticeably cold air within 60 to 90 seconds. If the air is only mildly cool after three minutes, the system is either low on refrigerant (possibly due to an evaporator leak) or the compressor is underperforming. Note that a simple recharge might temporarily restore cooling — ask the seller when the AC was last recharged. If the answer is "recently," this is a signal that there may be a leak rather than just natural refrigerant loss.\n\nCheck Under the Car\n\nGround clearance on the 2015 Camry is modest, but you can see enough from a crouch. Look for:\n\nOil drips or wet patches directly beneath the engine — a sign of a leaking gasket or drain plug.\n\nRust on the exhaust system — common on high-mileage Tokunbo cars, and a sign of how the vehicle was stored in the US before import.\n\nAny evidence of fresh undercoating applied selectively — this can indicate accident damage or rust being concealed.\n\nThe catalytic converter should be present and intact. If there is a section of straight pipe where the catalytic converter should be, the car has had its converter stolen and a temporary pipe fitted — either negotiate a significant discount to cover replacement, or walk away.\n\nTransmission Behaviour on the Test Drive\n\nDuring the test drive, specifically test the transmission at highway speed. Find a stretch of road where you can maintain 80 to 100 km/h for at least two minutes. The transmission should be smooth and quiet — any shudder, vibration, or hesitation at this speed range is the torque converter slip symptom described above. It may be as cheap as a fluid change to fix, or it may require a torque converter replacement. Either way, use it to negotiate the price.\n\nAlso test kickdown response: from 60 km/h, apply full throttle and count how quickly the transmission drops gears to accelerate. A healthy 2015 Camry automatic should respond decisively within one second. A sluggish or hesitant response suggests transmission fluid issues at minimum.\n\nSteering and Suspension Over Rough Roads\n\nNigeria will tell you the truth about a car''s suspension in ways a smooth American road never would. During the test drive, deliberately drive over at least two or three significant potholes or speed bumps at normal speed (not slowly). Listen carefully. A single distinct knock from the front indicates a worn control arm bushing or ball joint. A persistent rattle suggests loose components. Multiple different sounds from multiple directions suggests the car has been significantly neglected.\n\nAlso test the steering at low speed — turn the wheel from lock to lock while stationary. Any grinding or notching sensation in the steering suggests a problem with the rack or electric power steering unit.\n\nCheck the Service History\n\nA 2015 Camry being sold in Nigeria today has likely been in the country for four to eight years. In that time, it may have passed through multiple owners. Ask for any available service records — even a mechanic''s receipt or a notation on the dashboard sticker. The specific question to ask any seller is: "What type of transmission fluid has been used?" The correct answer is Toyota WS ATF. If the seller does not know, or if previous receipts show generic ATF, budget for a transmission fluid flush immediately after purchase.\n\nIf the seller can show you that the timing chain area has been inspected or the oil consumption issue addressed by a Toyota dealer (TSB repair), this adds significant value to the car.\n\nWhat to Pay\n\nA 2015 Toyota Camry in good condition with honest mileage (150,000 to 200,000 kilometres is realistic for an 8-10 year old Tokunbo) should cost between ₦5,500,000 and ₦8,000,000 in the current Lagos market. Below ₦5,000,000 for a 2015 model should raise immediate questions about undisclosed problems. The AC system and oil consumption issues, if present, represent ₦150,000 to ₦600,000 in potential near-term repair costs — factor these into any negotiation.\n\nA car that passes all the checks above is worth paying market price for. One that has one or two issues identified during inspection should be negotiated down by at least the cost of fixing those issues plus a reasonable allowance for your time and inconvenience.',

  -- SLUG
  'toyota-camry-2015-problems',

  -- META
  'Toyota Camry 2015 Common Problems in Nigeria | What to Check Before Buying | Naira Autos',
  'Known problems with the 2015 Toyota Camry in Nigeria — oil consumption, AC failure, transmission shudder and more. What to inspect before buying.',

  -- FAQS
  '[
    {
      "question": "Is the 2015 Toyota Camry a reliable car in Nigeria?",
      "answer": "Yes, with proper maintenance it is one of the most reliable cars in its class in Nigeria. The main risks are the 2AR-FE engine oil consumption issue and AC evaporator failure — both are manageable with correct servicing and inspection before purchase."
    },
    {
      "question": "Why does the 2015 Toyota Camry burn oil?",
      "answer": "Toyota issued a Technical Service Bulletin for the 2AR-FE engine''s documented oil consumption problem. Piston ring design allows oil into the combustion chamber, particularly in high-mileage examples. Check the oil level every 2,000 kilometres and use 5W-30 full synthetic oil to minimise consumption."
    },
    {
      "question": "What should I check when buying a used 2015 Toyota Camry in Nigeria?",
      "answer": "Check the engine oil dipstick for level and colour, test the AC cooling performance, inspect under the car for leaks and verify the catalytic converter is present, and test the transmission at highway speed for shudder. Ask about transmission fluid history — Toyota WS ATF should have been used."
    },
    {
      "question": "How much does a 2015 Toyota Camry cost in Nigeria?",
      "answer": "A 2015 Toyota Camry in good condition currently sells for between ₦5,500,000 and ₦8,000,000 in Lagos depending on mileage, condition, and seller. Prices in Abuja tend to run slightly higher. Anything significantly below ₦5,000,000 warrants close scrutiny for undisclosed faults."
    },
    {
      "question": "Is the 2015 Toyota Camry AC a common problem in Nigeria?",
      "answer": "Yes. AC evaporator leaks and compressor failure are among the most frequently reported issues with the 2015 Camry in Nigeria. Always test the AC thoroughly before purchase and ask when the refrigerant was last recharged — a recent recharge without a diagnosed leak repaired is a warning sign."
    }
  ]'::JSONB
);
