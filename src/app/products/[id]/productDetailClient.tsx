"use client";
import React from 'react';
import { Leaf, Truck, RotateCcw } from 'lucide-react';
import { useZustandStore } from '@/store/zustandStore';
import CheckoutButton from '@/components/CheckoutButton';

interface ClientProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  ingredients: string;
  image: string;
  priceId: string;
}

const Stars = () => (
  <div className="flex items-center gap-2">
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <span className="text-sm text-gray-500">4.9 · 2,000+ reviews</span>
  </div>
);

export default function ProductDetailClient({ product }: { product: ClientProduct }) {
  const [quantity, setQuantity] = React.useState(1);
  const addItem = useZustandStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      imageUrl: product.image,
      quantity,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4 leading-tight">
          {product.name}
        </h1>
        <Stars />
      </div>

      <p className="text-3xl font-semibold text-[#2B5F3A]">
        £{Number(product.price).toFixed(2)}
      </p>

      <p className="text-gray-600 leading-relaxed">{product.description}</p>

      <div className="border-t border-gray-100" />

      {/* Quantity selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
        <div className="inline-flex items-center border border-gray-200 rounded-full overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-xl font-light"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-medium text-gray-900">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-xl font-light"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#2B5F3A] hover:bg-[#224a2e] text-white py-4 rounded-full font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#2B5F3A]/20 tracking-wide"
        >
          Add to Cart
        </button>
        <CheckoutButton priceId={product.priceId} productName={product.name} />
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-9 h-9 rounded-full bg-[#2B5F3A]/10 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-[#2B5F3A]" />
          </div>
          <p className="text-xs text-gray-600 font-medium">100% Natural</p>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-9 h-9 rounded-full bg-[#2B5F3A]/10 flex items-center justify-center">
            <Truck className="w-4 h-4 text-[#2B5F3A]" />
          </div>
          <p className="text-xs text-gray-600 font-medium">Free Shipping</p>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-9 h-9 rounded-full bg-[#2B5F3A]/10 flex items-center justify-center">
            <RotateCcw className="w-4 h-4 text-[#2B5F3A]" />
          </div>
          <p className="text-xs text-gray-600 font-medium">30-Day Returns</p>
        </div>
      </div>
    </div>
  );
}
