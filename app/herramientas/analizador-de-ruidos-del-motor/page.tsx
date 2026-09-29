import { es } from '@/lib/engine-sound/es';
import { EngineSoundMainPage, mainMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = mainMetadata(es);

export default function Page() {
  return <EngineSoundMainPage c={es} />;
}
