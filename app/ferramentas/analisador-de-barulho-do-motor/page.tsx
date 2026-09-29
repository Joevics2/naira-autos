import { pt } from '@/lib/engine-sound/pt';
import { EngineSoundMainPage, mainMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = mainMetadata(pt);

export default function Page() {
  return <EngineSoundMainPage c={pt} />;
}
