import BestCarPage, { buildMetadata } from '@/components/best-car/BestCarPage';
import { th } from '@/lib/best-car/th';
import { carTextTh } from '@/lib/best-car/cars-th';

export const metadata = buildMetadata(th);

export default function Page() {
  return <BestCarPage c={th} carText={carTextTh} />;
}
