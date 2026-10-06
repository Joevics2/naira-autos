import { it } from '@/lib/engine-sound/it';
import { EngineSoundMainPage, mainMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = mainMetadata(it);

export default function Page() {
  return <EngineSoundMainPage c={it} />;
}
