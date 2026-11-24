import { notFound } from 'next/navigation';
import CollectionPage, { collectionMetadata } from '../../../../components/CollectionPage';
import { countries } from '../../../../lib/collections';

export const revalidate = 3600;
const find = (slug) => countries.find((c) => c.slug === slug && c.items().length > 0);
export function generateStaticParams() { return countries.filter((c) => c.items().length > 0).map((c) => ({ country: c.slug })); }
export async function generateMetadata({ params }) { const c = find((await params).country); return c ? collectionMetadata(c) : {}; }
export default async function Page({ params }) { const c = find((await params).country); if (!c) notFound(); return <CollectionPage c={c} />; }
