import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import ImageGallery from '@/components/ImageGallery';
import CustomerReviews from '@/components/CustomerReviews';

export const metadata: Metadata = {
  title: 'Renoyl — Premium Hair Oils',
  description: 'Premium hair oils formulated to combat hair loss, boost volume and nurture a healthy scalp.',
  openGraph: {
    title: 'Renoyl — Premium Hair Oils',
    description: 'Premium hair oils formulated to combat hair loss, boost volume and nurture a healthy scalp.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <ImageGallery />
      <CustomerReviews />
    </>
  );
}
