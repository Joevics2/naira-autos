/**
 * Verified road distances for Argentina, in kilometres. Sourced
 * from the Argentine government's own official tourism/travel page
 * (argentina.gob.ar/cordoba/llegar), which publishes Cordoba's road
 * distance to every one of the other 22 provincial capitals -
 * giving this tool 22 verified pairs from a single official source,
 * the richest government-published dataset found for any country
 * in this tool besides Nigeria's full UNDP matrix and Egypt's UN
 * Logistics Cluster matrix. A 23rd pair, Buenos Aires-Mendoza
 * (1,050km via RN7), is cross-checked across two independent
 * sources after an initial search turned up a much longer,
 * clearly non-direct routing (1,942km) that was discarded rather
 * than used. Every other route falls back to the Haversine-based
 * estimate in distance-engine.ts, which is what every page should
 * call rather than reading this object directly.
 */

export const AR_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Buenos Aires": { "C\u00f3rdoba": 715, "Mendoza": 1050 },
  "Catamarca": { "C\u00f3rdoba": 440 },
  "Corrientes": { "C\u00f3rdoba": 898 },
  "C\u00f3rdoba": { "Buenos Aires": 715, "Corrientes": 898, "Formosa": 1043, "La Plata": 757, "La Rioja": 435, "Mendoza": 670, "Neuqu\u00e9n": 1137, "Paran\u00e1": 361, "Posadas": 1213, "Rawson": 1455, "Resistencia": 875, "R\u00edo Gallegos": 3635, "Salta": 897, "Catamarca": 440, "San Juan": 500, "San Luis": 420, "San Miguel de Tucum\u00e1n": 590, "San Salvador de Jujuy": 930, "Santa Fe": 330, "Santa Rosa": 600, "Santiago del Estero": 430, "Ushuaia": 3228, "Viedma": 1194 },
  "Formosa": { "C\u00f3rdoba": 1043 },
  "La Plata": { "C\u00f3rdoba": 757 },
  "La Rioja": { "C\u00f3rdoba": 435 },
  "Mendoza": { "C\u00f3rdoba": 670, "Buenos Aires": 1050 },
  "Neuqu\u00e9n": { "C\u00f3rdoba": 1137 },
  "Paran\u00e1": { "C\u00f3rdoba": 361 },
  "Posadas": { "C\u00f3rdoba": 1213 },
  "Rawson": { "C\u00f3rdoba": 1455 },
  "Resistencia": { "C\u00f3rdoba": 875 },
  "R\u00edo Gallegos": { "C\u00f3rdoba": 3635 },
  "Salta": { "C\u00f3rdoba": 897 },
  "San Juan": { "C\u00f3rdoba": 500 },
  "San Luis": { "C\u00f3rdoba": 420 },
  "San Miguel de Tucum\u00e1n": { "C\u00f3rdoba": 590 },
  "San Salvador de Jujuy": { "C\u00f3rdoba": 930 },
  "Santa Fe": { "C\u00f3rdoba": 330 },
  "Santa Rosa": { "C\u00f3rdoba": 600 },
  "Santiago del Estero": { "C\u00f3rdoba": 430 },
  "Ushuaia": { "C\u00f3rdoba": 3228 },
  "Viedma": { "C\u00f3rdoba": 1194 },
};
