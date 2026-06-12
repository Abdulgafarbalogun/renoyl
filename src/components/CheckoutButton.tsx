"use client";

import { useStripe } from '@stripe/react-stripe-js';

interface CheckoutButtonProps {
  priceId: string;
  productName: string;
}

export default function CheckoutButton({ priceId, productName }: CheckoutButtonProps) {
  const stripe = useStripe();

  const handleCheckout = async () => {
    if (!stripe) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    try {
      // 1. Call your new API route to create a checkout session
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

      // 2. Redirect to Stripe Checkout using the session ID
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error("Stripe checkout error:", error.message);
      }
    } catch (error) {
      console.error("An error occurred during checkout:", error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={!stripe}
      className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400"
    >
      Buy Now
    </button>
  );
}
