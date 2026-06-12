"use client";
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useZustandStore } from '@/store/zustandStore';
import { api, ApiProduct } from '@/lib/api';

type SortKey = 'default' | 'price-asc' | 'price-desc';

export default function ShopPage() {
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
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }
    if (sort === 'price-asc') list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === 'price-desc') list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
    return list;
  }, [products, search, sort]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Shop</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[#2B5F3A]"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B5F3A]"
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-72" />
          ))}
        </div>
      )}

      {!loading && visible.length === 0 && (
        <p className="text-gray-500 text-center py-16">
          {search ? `No products matching "${search}".` : 'No products available.'}
        </p>
      )}

      {!loading && visible.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visible.map((product) => {
            const imageUrl = product.images?.[0] || '/img/placeholder.png';
            return (
              <div key={product.id} className="flex flex-col">
                <div className="bg-gray-50 rounded-xl mb-3 overflow-hidden">
                  <div className="relative h-56 w-full">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="p-4 transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center flex flex-col flex-1">
                  <h3 className="text-sm font-medium text-gray-800 mb-1">{product.name}</h3>
                  {product.description && (
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                  )}
                  <p className="font-bold text-lg mb-3">£{Number(product.price).toFixed(2)}</p>
                  <div className="flex gap-2 mt-auto justify-center">
                    <Link href={`/products/${product.id}`}>
                      <span className="inline-block border border-gray-300 rounded-full px-5 py-1 text-sm font-medium text-gray-700 hover:bg-white transition-colors">
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
                      className="inline-block border border-[#2B5F3A] rounded-full px-5 py-1 text-sm font-medium text-[#2B5F3A] hover:bg-[#2B5F3A] hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
        <p className="text-sm text-gray-400 mt-8 text-center">
          {visible.length} product{visible.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
