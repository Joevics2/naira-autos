import BestCarPage, { buildMetadata } from '@/components/best-car/BestCarPage';
import { tr } from '@/lib/best-car/tr';
import { carTextTr } from '@/lib/best-car/cars-tr';

export const metadata = buildMetadata(tr);

export default function Page() {
  return <BestCarPage c={tr} carText={carTextTr} />;
}
