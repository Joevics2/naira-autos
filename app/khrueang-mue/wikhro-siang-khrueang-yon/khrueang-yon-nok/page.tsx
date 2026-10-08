import { th } from '@/lib/engine-sound/th';
import { EngineSoundSubPage, subMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = subMetadata(th, 'knocking');

export default function Page() {
  return <EngineSoundSubPage c={th} subKey="knocking" />;
}
