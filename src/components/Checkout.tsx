"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useZustandStore } from '../store/zustandStore';
import { useAuthStore } from '../store/authStore';
import { api } from '@/lib/api';
import PageBanner from '@/components/PageBanner';

const Checkout = () => {
  const cart = useZustandStore((state) => state.cart);
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 5.00;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const { url } = await api.stripe.createCheckoutSession(
        {
          items: cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
          })),
          origin: window.location.origin,
        },
        token ?? undefined,
      );
      if (url) {
        window.location.href = url;
      } else {
        setError('Could not create checkout session. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <PageBanner title="Check out" breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Check out' }]} />
        <div className="container mx-auto py-16 px-4 text-center">
          <h2 className="text-2xl font-bold text-[#1B3A2D] mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Add some products before checking out.</p>
          <a href="/shop" className="px-8 py-3 rounded-md bg-[#2B5F3A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#224a2e] transition-colors">
            Browse Shop
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <PageBanner title="Check out" breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Check out' }]} />
      <div className="container mx-auto py-12 px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Order Summary */}
          <div className="bg-[#F9F7F2] rounded-2xl p-6 border border-[#EDE4E1]">
            <h2 className="text-lg font-semibold text-[#1B3A2D] mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#EDE4E1] flex-shrink-0">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    <span className="absolute -top-1 -right-1 bg-[#2B5F3A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1B3A2D]">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#2B5F3A]">
                    £{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#EDE4E1] pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span><span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span><span>£{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax (5%)</span><span>£{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1B3A2D] border-t border-[#EDE4E1] pt-3 mt-2">
                <span>Total</span><span>£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="flex flex-col justify-between">
            <div className="bg-white rounded-2xl p-6 border border-[#EDE4E1] mb-6">
              <h2 className="text-lg font-semibold text-[#1B3A2D] mb-3">Secure Payment</h2>
              <p className="text-sm text-gray-500 mb-4">
                You&apos;ll be taken to Stripe&apos;s secure checkout page to enter your payment and
                delivery details. Your card information is never stored on our servers.
              </p>
              <div className="flex gap-2 flex-wrap">
                {['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay'].map((m) => (
                  <span key={m} className="text-xs bg-[#F9F7F2] border border-[#EDE4E1] rounded px-2 py-1 text-gray-500">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-[#2B5F3A] hover:bg-[#224a2e] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold text-base transition-colors"
            >
              {loading ? 'Redirecting to Stripe…' : `Pay £${total.toFixed(2)} Securely`}
            </button>

            <p className="text-xs text-center text-gray-400 mt-3">
              Powered by Stripe · 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
