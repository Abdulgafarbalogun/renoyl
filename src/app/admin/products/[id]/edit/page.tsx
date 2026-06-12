"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { adminApi, AdminProduct } from '@/lib/adminApi';
import ProductForm from '@/components/admin/ProductForm';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthStore();
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token || !id) return;
    adminApi.products
      .get(token, id)
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, id]);

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <Link href="/admin/products" className="text-sm text-gray-500 hover:text-gray-800">
          ← Products
        </Link>
        <h2 className="text-xl font-semibold text-gray-900 mt-1">Edit Product</h2>
      </div>
      {loading && <p className="text-gray-500">Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}
      {product && <ProductForm initial={product} />}
    </div>
  );
}
