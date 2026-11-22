import CollectionPage, { collectionMetadata } from '../../../components/CollectionPage';
import { forKenyan } from '../../../lib/collections';

export const revalidate = 3600;
export const metadata = collectionMetadata(forKenyan);
export default function Page() { return <CollectionPage c={forKenyan} />; }
