import BestCarPage, { buildMetadata } from '@/components/best-car/BestCarPage';
import { es } from '@/lib/best-car/es';
import { carTextEs } from '@/lib/best-car/cars-es';

export const metadata = buildMetadata(es);

export default function Page() {
  return <BestCarPage c={es} carText={carTextEs} />;
}
