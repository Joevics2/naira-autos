import BestCarPage, { buildMetadata } from '@/components/best-car/BestCarPage';
import { fr } from '@/lib/best-car/fr';
import { carTextFr } from '@/lib/best-car/cars-fr';

export const metadata = buildMetadata(fr);

export default function Page() {
  return <BestCarPage c={fr} carText={carTextFr} />;
}
