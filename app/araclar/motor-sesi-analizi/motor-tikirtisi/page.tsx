import { tr } from '@/lib/engine-sound/tr';
import { EngineSoundSubPage, subMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = subMetadata(tr, 'ticking');

export default function Page() {
  return <EngineSoundSubPage c={tr} subKey="ticking" />;
}
