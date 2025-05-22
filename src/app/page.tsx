"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import ImageGallery from '@/components/ImageGallery';
import CustomerReviews from '@/components/CustomerReviews';
import Footer from '@/components/Footer';

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
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
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign in</button>
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