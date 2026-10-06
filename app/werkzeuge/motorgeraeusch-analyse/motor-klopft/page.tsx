import { de } from '@/lib/engine-sound/de';
import { EngineSoundSubPage, subMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = subMetadata(de, 'knocking');

export default function Page() {
  return <EngineSoundSubPage c={de} subKey="knocking" />;
}
