import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useZustandStore } from '../store/zustandStore';

interface Product {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  imageUrl: string;
  slug: string;
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
      id: product.id,
      name: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1
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
                €{product.price.toFixed(2)}
              </p>
            </div>
            
            {/* Buttons */}
            <div className="text-center flex flex-col space-y-2">
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-[#2B5F3A] text-white px-6 py-2 rounded hover:bg-[#224a2e] transition"
                aria-label={`Add ${product.title} to cart`}
              >
                Add to Cart
              </button>
              <Link
                href={`/products/${product.id}`}
                className="inline-block border border-gray-400 text-gray-800 px-12 py-3 text-sm font-medium uppercase tracking-wide hover:bg-gray-50 transition-colors duration-200"
              >
                SHOP
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;