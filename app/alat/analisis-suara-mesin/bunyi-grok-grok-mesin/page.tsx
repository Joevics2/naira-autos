import { id } from '@/lib/engine-sound/id';
import { EngineSoundSubPage, subMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = subMetadata(id, 'rattling');

export default function Page() {
  return <EngineSoundSubPage c={id} subKey="rattling" />;
}
