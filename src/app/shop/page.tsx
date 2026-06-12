import type { Metadata } from 'next';
import ShopContent from './ShopContent';

export const metadata: Metadata = {
  title: 'Shop — Renoyl',
  description: 'Browse the full Renoyl range of premium hair oils. Search, sort, and add to cart.',
  openGraph: {
    title: 'Shop — Renoyl',
    description: 'Browse premium hair oils — search, sort, and add to cart.',
    type: 'website',
  },
};

export default function ShopPage() {
  return <ShopContent />;
}
