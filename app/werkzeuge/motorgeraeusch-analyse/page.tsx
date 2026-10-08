import { de } from '@/lib/engine-sound/de';
import { EngineSoundMainPage, mainMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = mainMetadata(de);

export default function Page() {
  return <EngineSoundMainPage c={de} />;
}
