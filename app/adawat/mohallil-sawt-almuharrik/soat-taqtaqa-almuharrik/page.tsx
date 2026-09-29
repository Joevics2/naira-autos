import { ar } from '@/lib/engine-sound/ar';
import { EngineSoundSubPage, subMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = subMetadata(ar, 'ticking');

export default function Page() {
  return <EngineSoundSubPage c={ar} subKey="ticking" />;
}
