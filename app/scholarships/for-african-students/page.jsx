import CollectionPage, { collectionMetadata } from '../../../components/CollectionPage';
import { forAfrican } from '../../../lib/collections';

export const revalidate = 3600;
export const metadata = collectionMetadata(forAfrican);
export default function Page() { return <CollectionPage c={forAfrican} />; }
