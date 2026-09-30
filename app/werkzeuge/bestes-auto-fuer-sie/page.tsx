import BestCarPage, { buildMetadata } from '@/components/best-car/BestCarPage';
import { de } from '@/lib/best-car/de';
import { carTextDe } from '@/lib/best-car/cars-de';

export const metadata = buildMetadata(de);

export default function Page() {
  return <BestCarPage c={de} carText={carTextDe} />;
}
