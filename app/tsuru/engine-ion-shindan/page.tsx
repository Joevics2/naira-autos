import { ja } from '@/lib/engine-sound/ja';
import { EngineSoundMainPage, mainMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = mainMetadata(ja);

export default function Page() {
  return <EngineSoundMainPage c={ja} />;
}
