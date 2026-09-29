import { ar } from '@/lib/engine-sound/ar';
import { EngineSoundMainPage, mainMetadata } from '@/components/engine-sound/EngineSoundPage';

export const metadata = mainMetadata(ar);

export default function Page() {
  return <EngineSoundMainPage c={ar} />;
}
