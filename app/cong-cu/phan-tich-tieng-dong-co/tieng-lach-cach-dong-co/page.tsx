import { vi } from '@/lib/engine-sound/vi';
import { EngineSoundSubPage, subMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = subMetadata(vi, 'rattling');

export default function Page() {
  return <EngineSoundSubPage c={vi} subKey="rattling" />;
}
