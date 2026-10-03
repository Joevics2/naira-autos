import MyDocsPage from '@/components/documents/MyDocsPage';
import { docsMineMetadata } from '@/lib/documents-i18n/metadata';

export const metadata = docsMineMetadata('it');

export default function Page() {
  return <MyDocsPage lang="it" />;
}
