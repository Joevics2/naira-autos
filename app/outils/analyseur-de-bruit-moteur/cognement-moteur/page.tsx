import { fr } from '@/lib/engine-sound/fr';
import { EngineSoundSubPage, subMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = subMetadata(fr, 'knocking');

export default function Page() {
  return <EngineSoundSubPage c={fr} subKey="knocking" />;
}
