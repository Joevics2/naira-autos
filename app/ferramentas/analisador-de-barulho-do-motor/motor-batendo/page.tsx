import { pt } from '@/lib/engine-sound/pt';
import { EngineSoundSubPage, subMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = subMetadata(pt, 'knocking');

export default function Page() {
  return <EngineSoundSubPage c={pt} subKey="knocking" />;
}
