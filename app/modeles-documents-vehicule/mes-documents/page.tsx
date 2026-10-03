import MyDocsPage from '@/components/documents/MyDocsPage';
import { docsMineMetadata } from '@/lib/documents-i18n/metadata';

export const metadata = docsMineMetadata('fr');

export default function Page() {
  return <MyDocsPage lang="fr" />;
}
