import BestCarPage, { buildMetadata } from '@/components/best-car/BestCarPage';
import { ja } from '@/lib/best-car/ja';
import { carTextJa } from '@/lib/best-car/cars-ja';

export const metadata = buildMetadata(ja);

export default function Page() {
  return <BestCarPage c={ja} carText={carTextJa} />;
}
