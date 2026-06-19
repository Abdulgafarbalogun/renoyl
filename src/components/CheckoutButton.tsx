"use client";

import { useState } from 'react';
import { api } from '@/lib/api';

interface CheckoutButtonProps {
  name: string;
  price: number;
}

export default function CheckoutButton({ name, price }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { url } = await api.stripe.createCheckoutSession({
        items: [{ name, price, quantity: 1 }],
        origin: window.location.origin,
      });
      if (url) window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      aria-label="Buy now"
      className="w-full border-2 border-[#2B5F3A] text-[#2B5F3A] hover:bg-[#2B5F3A] hover:text-white py-4 rounded-full font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {loading ? 'Redirecting…' : 'Buy Now'}
    </button>
  );
}
