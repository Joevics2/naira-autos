/**
 * Russia town dataset for the Distance Calculator tool family.
 * 32 major cities. Coordinates are city-centre points; populations are
 * rounded approximations used only for ordering. The "state" field holds the federal district. Kaliningrad is an exclave with no direct road link to the rest of Russia, so pairs involving it are straight-line-derived estimates only.
 * See ru-distance-matrix.ts: no route here is marked verified.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const RU_TOWNS: DistanceTown[] = [
  { name: "Москва", state: "Центральный", lat: 55.7558, lng: 37.6173, population: 13010112, isCapital: true },
  { name: "Санкт-Петербург", state: "Северо-Западный", lat: 59.9343, lng: 30.3351, population: 5601911, isCapital: false },
  { name: "Новосибирск", state: "Сибирский", lat: 55.0084, lng: 82.9357, population: 1633595, isCapital: false },
  { name: "Екатеринбург", state: "Уральский", lat: 56.8389, lng: 60.6057, population: 1544376, isCapital: false },
  { name: "Казань", state: "Приволжский", lat: 55.7887, lng: 49.1221, population: 1314661, isCapital: false },
  { name: "Нижний Новгород", state: "Приволжский", lat: 56.2965, lng: 43.9361, population: 1228199, isCapital: false },
  { name: "Челябинск", state: "Уральский", lat: 55.1644, lng: 61.4368, population: 1189525, isCapital: false },
  { name: "Самара", state: "Приволжский", lat: 53.1959, lng: 50.1002, population: 1173299, isCapital: false },
  { name: "Омск", state: "Сибирский", lat: 54.9885, lng: 73.3242, population: 1154507, isCapital: false },
  { name: "Ростов-на-Дону", state: "Южный", lat: 47.2357, lng: 39.7015, population: 1142162, isCapital: false },
  { name: "Уфа", state: "Приволжский", lat: 54.7388, lng: 55.9721, population: 1144809, isCapital: false },
  { name: "Красноярск", state: "Сибирский", lat: 56.0153, lng: 92.8932, population: 1187771, isCapital: false },
  { name: "Воронеж", state: "Центральный", lat: 51.672, lng: 39.1843, population: 1057681, isCapital: false },
  { name: "Пермь", state: "Приволжский", lat: 58.0105, lng: 56.2502, population: 1034002, isCapital: false },
  { name: "Волгоград", state: "Южный", lat: 48.708, lng: 44.5133, population: 1028036, isCapital: false },
  { name: "Краснодар", state: "Южный", lat: 45.0355, lng: 38.9753, population: 932629, isCapital: false },
  { name: "Саратов", state: "Приволжский", lat: 51.5336, lng: 46.0343, population: 901361, isCapital: false },
  { name: "Тюмень", state: "Уральский", lat: 57.1522, lng: 65.5272, population: 855600, isCapital: false },
  { name: "Тольятти", state: "Приволжский", lat: 53.5078, lng: 49.4204, population: 684709, isCapital: false },
  { name: "Ижевск", state: "Приволжский", lat: 56.8527, lng: 53.2115, population: 648213, isCapital: false },
  { name: "Барнаул", state: "Сибирский", lat: 53.3606, lng: 83.7636, population: 630000, isCapital: false },
  { name: "Иркутск", state: "Сибирский", lat: 52.2864, lng: 104.2807, population: 617000, isCapital: false },
  { name: "Хабаровск", state: "Дальневосточный", lat: 48.4802, lng: 135.0719, population: 616000, isCapital: false },
  { name: "Ярославль", state: "Центральный", lat: 57.6261, lng: 39.8845, population: 570000, isCapital: false },
  { name: "Владивосток", state: "Дальневосточный", lat: 43.1155, lng: 131.8855, population: 600000, isCapital: false },
  { name: "Махачкала", state: "Северо-Кавказский", lat: 42.9849, lng: 47.5047, population: 603000, isCapital: false },
  { name: "Томск", state: "Сибирский", lat: 56.4977, lng: 84.9744, population: 570000, isCapital: false },
  { name: "Оренбург", state: "Приволжский", lat: 51.7682, lng: 55.0968, population: 570000, isCapital: false },
  { name: "Кемерово", state: "Сибирский", lat: 55.3547, lng: 86.0873, population: 556000, isCapital: false },
  { name: "Сочи", state: "Южный", lat: 43.5855, lng: 39.7231, population: 466000, isCapital: false },
  { name: "Мурманск", state: "Северо-Западный", lat: 68.9585, lng: 33.0827, population: 270000, isCapital: false },
  { name: "Калининград", state: "Северо-Западный", lat: 54.7104, lng: 20.4522, population: 489000, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return RU_TOWNS.find((t) => t.name === name);
}
