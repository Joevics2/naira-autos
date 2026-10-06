import { tr } from '@/lib/engine-sound/tr';
import { EngineSoundMainPage, mainMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = mainMetadata(tr);

export default function Page() {
  return <EngineSoundMainPage c={tr} />;
}
