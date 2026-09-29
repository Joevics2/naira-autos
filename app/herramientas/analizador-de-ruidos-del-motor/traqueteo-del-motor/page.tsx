import { es } from '@/lib/engine-sound/es';
import { EngineSoundSubPage, subMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = subMetadata(es, 'rattling');

export default function Page() {
  return <EngineSoundSubPage c={es} subKey="rattling" />;
}
