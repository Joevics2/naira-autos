'use client';

import EngineSoundClient from '@/components/engine-sound/EngineSoundClient';
import { EN_UI } from '@/lib/engine-sound/en-ui';

export default function EngineSoundAnalyzerClient() {
  return <EngineSoundClient ui={EN_UI} lang="en" locale="en-US" />;
}
