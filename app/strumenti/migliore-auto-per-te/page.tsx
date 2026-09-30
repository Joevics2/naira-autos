import BestCarPage, { buildMetadata } from '@/components/best-car/BestCarPage';
import { it } from '@/lib/best-car/it';
import { carTextIt } from '@/lib/best-car/cars-it';

export const metadata = buildMetadata(it);

export default function Page() {
  return <BestCarPage c={it} carText={carTextIt} />;
}
