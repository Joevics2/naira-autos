import type { DistanceCalcStrings } from '@/components/distance-calculator/DistanceCalculatorWidget';

/**
 * Shared Arabic strings for the Distance Calculator widget, used by all
 * four Arabic-language pages (Egypt, Qatar, Saudi Arabia, UAE) — the "one
 * shared translated widget/strings" for the Arabic group. Country-specific
 * facts (town names, distances, article text) live in each page.tsx; this
 * file only covers the widget's fixed UI chrome.
 */
export const AR_STRINGS: DistanceCalcStrings = {
  from: 'من',
  to: 'إلى',
  popularRoutes: 'المسارات الشائعة',
  random: 'عشوائي',
  selectATown: 'اختر مدينة',
  searchPlaceholder: 'ابحث عن مدينة أو منطقة...',
  noTownsMatch: 'لا توجد مدن مطابقة لـ "%s"',
  capital: 'العاصمة',
  roadDistance: 'مسافة الطريق',
  verifiedRoute: 'مسار موثّق',
  estimated: 'تقديري',
  straightLine: 'خط مستقيم',
  asTheCrowFlies: '"كخط الطيران المباشر"',
  driveTime: 'مدة القيادة',
  ideal: 'مثالي',
  openInMaps: 'افتح هذا المسار في خرائط جوجل لمعرفة حالة المرور الحية',
  fuelCostEstimator: 'حاسبة تكلفة الوقود',
  pumpPricePerLitre: 'سعر اللتر عند المحطة',
  litresNeeded: 'يلزم %s لتر',
  nearestTownsTo: 'أقرب المدن إلى %s',
};
