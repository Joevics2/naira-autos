import { it } from '@/lib/engine-sound/it';
import { EngineSoundSubPage, subMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = subMetadata(it, 'rattling');

export default function Page() {
  return <EngineSoundSubPage c={it} subKey="rattling" />;
}
