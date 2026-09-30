import BestCarPage, { buildMetadata } from '@/components/best-car/BestCarPage';
import { nl } from '@/lib/best-car/nl';
import { carTextNl } from '@/lib/best-car/cars-nl';

export const metadata = buildMetadata(nl);

export default function Page() {
  return <BestCarPage c={nl} carText={carTextNl} />;
}
