import { notFound } from 'next/navigation';
import CollectionPage, { collectionMetadata } from '../../../../components/CollectionPage';
import { levels } from '../../../../lib/collections';

export const revalidate = 3600;
const find = (slug) => levels.find((l) => l.slug === slug);
export function generateStaticParams() { return levels.map((l) => ({ level: l.slug })); }
export function generateMetadata({ params }) { const c = find(params.level); return c ? collectionMetadata(c) : {}; }
export default function Page({ params }) { const c = find(params.level); if (!c) notFound(); return <CollectionPage c={c} />; }
