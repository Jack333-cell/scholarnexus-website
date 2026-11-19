import CollectionPage, { collectionMetadata } from '../../../components/CollectionPage';
import { closingSoon } from '../../../lib/collections';

export const revalidate = 3600;
export function generateMetadata() { return collectionMetadata(closingSoon()); }
export default function Page() { return <CollectionPage c={closingSoon()} />; }
