import BestCarPage, { buildMetadata } from '@/components/best-car/BestCarPage';
import { vi } from '@/lib/best-car/vi';
import { carTextVi } from '@/lib/best-car/cars-vi';

export const metadata = buildMetadata(vi);

export default function Page() {
  return <BestCarPage c={vi} carText={carTextVi} />;
}
