import { vi } from '@/lib/engine-sound/vi';
import { EngineSoundMainPage, mainMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = mainMetadata(vi);

export default function Page() {
  return <EngineSoundMainPage c={vi} />;
}
