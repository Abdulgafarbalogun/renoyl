"use client";

import { useStripe } from '@stripe/react-stripe-js';

interface CheckoutButtonProps {
  priceId: string;
  productName: string;
}

export default function CheckoutButton({ priceId }: CheckoutButtonProps) {
  const stripe = useStripe();

  const handleCheckout = async () => {
    if (!stripe) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${apiUrl}/stripe/checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, origin: window.location.origin }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to create checkout session.');
      }

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) console.error('Stripe checkout error:', error.message);
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={!stripe}
      aria-label="Buy now"
      className="w-full border-2 border-[#2B5F3A] text-[#2B5F3A] hover:bg-[#2B5F3A] hover:text-white py-4 rounded-full font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      Buy Now
    </button>
  );
}
