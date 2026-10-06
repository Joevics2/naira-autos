import { id } from '@/lib/engine-sound/id';
import { EngineSoundMainPage, mainMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = mainMetadata(id);

export default function Page() {
  return <EngineSoundMainPage c={id} />;
}
