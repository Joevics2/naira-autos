import BestCarPage, { buildMetadata } from '@/components/best-car/BestCarPage';
import { hi } from '@/lib/best-car/hi';
import { carTextHi } from '@/lib/best-car/cars-hi';

export const metadata = buildMetadata(hi);

export default function Page() {
  return <BestCarPage c={hi} carText={carTextHi} />;
}
