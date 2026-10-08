import { th } from '@/lib/engine-sound/th';
import { EngineSoundMainPage, mainMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = mainMetadata(th);

export default function Page() {
  return <EngineSoundMainPage c={th} />;
}
