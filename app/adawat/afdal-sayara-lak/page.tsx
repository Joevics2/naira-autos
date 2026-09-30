import BestCarPage, { buildMetadata } from '@/components/best-car/BestCarPage';
import { ar } from '@/lib/best-car/ar';
import { carTextAr } from '@/lib/best-car/cars-ar';

export const metadata = buildMetadata(ar);

export default function Page() {
  return <BestCarPage c={ar} carText={carTextAr} />;
}
