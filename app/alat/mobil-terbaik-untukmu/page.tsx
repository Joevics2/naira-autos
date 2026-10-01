import BestCarPage, { buildMetadata } from '@/components/best-car/BestCarPage';
import { id } from '@/lib/best-car/id';
import { carTextId } from '@/lib/best-car/cars-id';

export const metadata = buildMetadata(id);

export default function Page() {
  return <BestCarPage c={id} carText={carTextId} />;
}
