import { fr } from '@/lib/engine-sound/fr';
import { EngineSoundMainPage, mainMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = mainMetadata(fr);

export default function Page() {
  return <EngineSoundMainPage c={fr} />;
}
