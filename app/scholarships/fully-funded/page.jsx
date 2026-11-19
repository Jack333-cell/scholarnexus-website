import CollectionPage, { collectionMetadata } from '../../../components/CollectionPage';
import { fullyFunded } from '../../../lib/collections';

export const revalidate = 3600;
export const metadata = collectionMetadata(fullyFunded);
export default function Page() { return <CollectionPage c={fullyFunded} />; }
