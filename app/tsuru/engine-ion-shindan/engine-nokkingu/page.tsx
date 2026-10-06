import { ja } from '@/lib/engine-sound/ja';
import { EngineSoundSubPage, subMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = subMetadata(ja, 'knocking');

export default function Page() {
  return <EngineSoundSubPage c={ja} subKey="knocking" />;
}
