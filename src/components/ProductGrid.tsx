"use client"; // Add this directive at the top

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useZustandStore } from '../store/zustandStore';

interface Product {
  id: string | number;
  title: string;
  subtitle?: string;
  price: number;
  imageUrl: string;
  slug?: string;
}

interface ProductGridProps {
  products: Product[];
  title: string;
  subtitle: string;
}

const ProductGrid = ({ products, title, subtitle }: ProductGridProps) => {
  const addItem = useZustandStore((state) => state.addItem);
  
  const handleAddToCart = (product: Product) => {
    addItem({
      id: String(product.id),
      name: product.title,
      price: Number(product.price),
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  };
  
  return (
    <div className="container mx-auto py-16 px-4">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-normal mb-4 text-gray-900">{title}</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
      </div>
     
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {products.map((product) => (
          <div key={product.id} className="group">
            {/* Product Image Container */}
            <div className="bg-gray-100 rounded-lg p-8 mb-6 aspect-square flex items-center justify-center">
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={250}
                height={300}
                className="object-contain max-h-full"
              />
            </div>
            
            {/* Product Info */}
            <div className="text-center mb-6">
              <h3 className="font-normal text-base mb-1 text-gray-900">
                {product.title}
              </h3>
              <p className="font-semibold text-base text-gray-900">
                €{Number(product.price).toFixed(2)}
              </p>
            </div>
            
            {/* Buttons */}
            <div className="text-center flex gap-3 justify-center">
              <Link
                href={`/products/${product.id}`}
                className="flex-1 max-w-[120px] border border-gray-300 text-gray-700 px-6 py-2.5 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors duration-200 text-center"
              >
                SHOP
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 max-w-[120px] bg-gray-100 text-gray-700 px-6 py-2.5 text-sm font-medium rounded-full hover:bg-gray-200 transition-colors duration-200"
                aria-label={`Add ${product.title} to cart`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;