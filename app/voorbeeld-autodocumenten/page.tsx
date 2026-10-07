import DocsHubPage from '@/components/documents/DocsHubPage';
import { docsMetadata } from '@/lib/documents-i18n/metadata';

export const revalidate = 604800; // ISR: same 24h window as the template pages
export const metadata = docsMetadata('nl');

export default function Page() {
  return <DocsHubPage lang="nl" />;
}
