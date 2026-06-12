"use client";
import Link from 'next/link';
import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <Link href="/admin/products" className="text-sm text-gray-500 hover:text-gray-800">
          ← Products
        </Link>
        <h2 className="text-xl font-semibold text-gray-900 mt-1">New Product</h2>
      </div>
      <ProductForm />
    </div>
  );
}
