"use client";

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

  if (products.length === 0) return null;

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
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-8 md:mb-16">
          <span className="inline-block text-[#2B5F3A] text-xs font-medium tracking-widest uppercase mb-4">
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-base">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative bg-[#F9F7F2] rounded-2xl overflow-hidden mb-5 aspect-square">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex items-start justify-between mb-5 px-1">
                <div>
                  <h3 className="font-medium text-gray-900 text-base mb-1">{product.title}</h3>
                  {product.subtitle && (
                    <p className="text-sm text-gray-500">{product.subtitle}</p>
                  )}
                </div>
                <span className="font-semibold text-gray-900 ml-4 shrink-0">
                  £{Number(product.price).toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3 px-1">
                <Link href={`/products/${product.id}`} className="flex-1">
                  <span className="block text-center border border-gray-200 hover:border-[#2B5F3A] hover:text-[#2B5F3A] text-gray-600 text-sm font-medium py-3 rounded-full transition-all duration-200">
                    View
                  </span>
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-[#2B5F3A] hover:bg-[#224a2e] text-white text-sm font-medium py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#2B5F3A]/20"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link href="/shop">
            <span className="inline-flex items-center gap-2 text-[#2B5F3A] text-sm font-medium border border-[#2B5F3A]/30 hover:border-[#2B5F3A] px-8 py-3.5 rounded-full transition-all duration-200">
              View All Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
