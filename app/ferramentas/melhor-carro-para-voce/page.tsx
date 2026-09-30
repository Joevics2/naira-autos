import BestCarPage, { buildMetadata } from '@/components/best-car/BestCarPage';
import { pt } from '@/lib/best-car/pt';
import { carTextPt } from '@/lib/best-car/cars-pt';

export const metadata = buildMetadata(pt);

export default function Page() {
  return <BestCarPage c={pt} carText={carTextPt} />;
}
