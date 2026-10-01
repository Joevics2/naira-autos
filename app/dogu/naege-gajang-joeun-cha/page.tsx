import BestCarPage, { buildMetadata } from '@/components/best-car/BestCarPage';
import { ko } from '@/lib/best-car/ko';
import { carTextKo } from '@/lib/best-car/cars-ko';

export const metadata = buildMetadata(ko);

export default function Page() {
  return <BestCarPage c={ko} carText={carTextKo} />;
}
