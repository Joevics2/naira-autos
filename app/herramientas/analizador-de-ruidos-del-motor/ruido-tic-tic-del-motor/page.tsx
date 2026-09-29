import { es } from '@/lib/engine-sound/es';
import { EngineSoundSubPage, subMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = subMetadata(es, 'ticking');

export default function Page() {
  return <EngineSoundSubPage c={es} subKey="ticking" />;
}
