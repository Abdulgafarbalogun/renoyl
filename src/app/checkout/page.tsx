"use client";

import Checkout from '@/components/Checkout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import SignIn from '@/components/signin'; // No longer needed here for Header

export default function CheckoutPage() {
  return (
    <>
      <Header /> {/* Remove authContentSlot prop */}
      <Checkout />
      <Footer />
    </>
  );
}
