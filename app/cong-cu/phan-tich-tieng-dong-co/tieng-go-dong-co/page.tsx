import { vi } from '@/lib/engine-sound/vi';
import { EngineSoundSubPage, subMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = subMetadata(vi, 'knocking');

export default function Page() {
  return <EngineSoundSubPage c={vi} subKey="knocking" />;
}
