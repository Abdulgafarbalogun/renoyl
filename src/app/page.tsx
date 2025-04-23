import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import ImageGallery from '@/components/ImageGallery';
import CustomerReviews from '@/components/CustomerReviews';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* <Navigation /> */}
      <Header />
      <Hero />
      <ProductShowcase />
      <ImageGallery />
      <CustomerReviews />
      <Footer />
    </>
  );
}