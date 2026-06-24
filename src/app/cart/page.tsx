"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useZustandStore } from '@/store/zustandStore';
import { api } from '@/lib/api';
import PageBanner from '@/components/PageBanner';

export default function CartPage() {
  const cart = useZustandStore((s) => s.cart);
  const removeItem = useZustandStore((s) => s.removeItem);
  const updateItemQuantity = useZustandStore((s) => s.updateItemQuantity);
  const [coupon, setCoupon] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = async () => {
    if (!cart.length) return;
    setLoading(true);
    setError('');
    try {
      const { url } = await api.stripe.createCheckoutSession({
        items: cart.map((i) => ({
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          imageUrl: i.imageUrl,
        })),
        origin: window.location.origin,
      });
      if (url) window.location.href = url;
      else setError('Could not start checkout. Please try again.');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <PageBanner title="Cart" breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
        <div className="container mx-auto px-6 lg:px-12 py-20 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-200 mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
            Browse through our collections and find the Renoyl for you.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-[#2B5F3A] text-white px-8 py-3 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-[#224a2e] transition-colors"
          >
            Start shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageBanner title="Cart" breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
      <div className="container mx-auto px-6 lg:px-12 py-10">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 xl:gap-12">

          {/* Items list */}
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#EDE4E1] shrink-0">
                  <Image src={item.imageUrl} alt={item.name} fill style={{ objectFit: 'cover' }} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm mb-0.5 truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500">£{item.price.toFixed(2)}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[#2B5F3A] text-xs font-medium uppercase tracking-wide mt-1.5 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex flex-col items-end justify-between shrink-0">
                  <p className="font-semibold text-gray-900 text-sm">
                    £{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-1.5 border border-gray-200 rounded-full px-2 py-1">
                    <button
                      onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-900 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="w-5 text-center text-xs font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-900 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 h-fit">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Cart Summary</h2>

            <div className="flex justify-between text-sm mb-5">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold text-gray-900">£{subtotal.toFixed(2)}</span>
            </div>

            <div className="mb-6">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Coupon code</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2B5F3A] transition"
                />
                <button className="px-3 py-2 border border-[#2B5F3A] text-[#2B5F3A] rounded-lg text-sm font-medium hover:bg-[#2B5F3A] hover:text-white transition whitespace-nowrap">
                  Apply
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-[#2B5F3A] hover:bg-[#224a2e] text-white py-3.5 rounded-md text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-60"
            >
              {loading ? 'Please wait…' : 'Checkout'}
            </button>

            <Link
              href="/shop"
              className="block text-center text-xs text-gray-400 hover:text-gray-600 mt-3 transition-colors"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
