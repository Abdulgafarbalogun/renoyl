"use client";
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useZustandStore } from '@/store/zustandStore';
import { api, ApiProduct } from '@/lib/api';

type SortKey = 'default' | 'price-asc' | 'price-desc';

export default function ShopContent() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('default');
  const addItem = useZustandStore((state) => state.addItem);

  useEffect(() => {
    api.products.list()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(() => {
    let list = products.filter((p) => p.isActive);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q),
      );
    }
    if (sort === 'price-asc') list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === 'price-desc') list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
    return list;
  }, [products, search, sort]);

  return (
    <div className="min-h-screen bg-[#F9F7F2]">

      {/* Page header */}
      <div className="bg-white border-b border-gray-100 py-14">
        <div className="container mx-auto px-6 lg:px-12">
          <span className="block text-[#2B5F3A] text-xs font-medium tracking-widest uppercase mb-3">
            Collection
          </span>
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900">All Products</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12">

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-12">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="search"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full pl-11 pr-5 py-3 text-sm focus:outline-none focus:border-[#2B5F3A] focus:ring-1 focus:ring-[#2B5F3A]/30 transition"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-white border border-gray-200 rounded-full px-6 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#2B5F3A] cursor-pointer appearance-none"
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-100 rounded-2xl aspect-square mb-4" />
                <div className="h-3.5 bg-gray-100 rounded-full mb-2 w-3/4" />
                <div className="h-3.5 bg-gray-100 rounded-full w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && visible.length === 0 && (
          <div className="text-center py-28">
            <p className="text-gray-400 text-xl mb-3">
              {search ? `No results for &ldquo;${search}&rdquo;` : 'No products available'}
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-[#2B5F3A] text-sm underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Products grid */}
        {!loading && visible.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visible.map((product) => {
              const imageUrl = product.images?.[0] || '/img/placeholder.png';
              return (
                <div key={product.id} className="group">
                  <div className="relative bg-white rounded-2xl overflow-hidden mb-4 aspect-square">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="p-6 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="px-1">
                    <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">{product.name}</h3>
                    {product.description && (
                      <p className="text-xs text-gray-400 mb-2 line-clamp-1">{product.description}</p>
                    )}
                    <p className="font-semibold text-gray-900 mb-3">£{Number(product.price).toFixed(2)}</p>

                    <div className="flex gap-2">
                      <Link href={`/products/${product.id}`} className="flex-1">
                        <span className="block text-center border border-gray-200 hover:border-[#2B5F3A] hover:text-[#2B5F3A] text-gray-600 text-xs font-medium py-2.5 rounded-full transition-all duration-200">
                          View
                        </span>
                      </Link>
                      <button
                        onClick={() => addItem({
                          id: product.id,
                          name: product.name,
                          price: Number(product.price),
                          imageUrl,
                          quantity: 1,
                        })}
                        disabled={product.stock === 0}
                        className="flex-1 bg-[#2B5F3A] hover:bg-[#224a2e] text-white text-xs font-medium py-2.5 rounded-full transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && (
          <p className="text-xs text-gray-400 mt-12 text-center">
            {visible.length} product{visible.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}
