import BestCarPage, { buildMetadata } from '@/components/best-car/BestCarPage';
import { en } from '@/lib/best-car/en';

export const metadata = buildMetadata(en);

export default function Page() {
  return <BestCarPage c={en} />;
}
