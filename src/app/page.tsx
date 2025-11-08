// Static exported homepage (auth removed)
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import ImageGallery from '@/components/ImageGallery';
import CustomerReviews from '@/components/CustomerReviews';
import Footer from '@/components/Footer';
export default async function Home() { 

  return (
    <>
      <Header /> {/* Removed authContentSlot prop */}
      <Hero />
      <ProductShowcase />
      <ImageGallery />
      <CustomerReviews />
      <Footer />
    </>
  );
}

// (Previous auth-dependent variant removed for static deployment.)