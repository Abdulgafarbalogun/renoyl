"use client";
import React from 'react';
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
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">{product.name}</h1>
      <p className="text-gray-700">{product.description}</p>
      <div className="bg-[#EDE4E1] inline-block px-4 py-2 rounded">
        <span className="font-medium">£{Number(product.price).toFixed(2)}</span>
      </div>
      <div className="space-y-2">
        <label htmlFor="quantity" className="block text-sm font-medium">Qty</label>
        <div className="flex items-center space-x-2">
          <select
            id="quantity"
            className="border border-gray-300 rounded px-3 py-2 w-20"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            aria-label="Product quantity"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <button
          className="w-full bg-[#2B5F3A] text-white px-6 py-2 rounded hover:bg-[#224a2e] transition"
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
      <CheckoutButton priceId={product.priceId} productName={product.name} />
    </div>
  );
}
