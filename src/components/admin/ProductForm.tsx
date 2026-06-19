"use client";
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { adminApi, AdminProduct, ProductFormData } from '@/lib/adminApi';

interface Props {
  initial?: AdminProduct;
}

const EMPTY: ProductFormData = {
  name: '',
  price: 0,
  description: '',
  ingredients: '',
  stock: 0,
  images: [],
  isActive: true,
};

export default function ProductForm({ initial }: Props) {
  const { token } = useAuthStore();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ProductFormData>(
    initial
      ? {
          name: initial.name,
          price: initial.price,
          description: initial.description ?? '',
          ingredients: initial.ingredients ?? '',
          stock: initial.stock,
          images: initial.images ?? [],
          isActive: initial.isActive,
        }
      : EMPTY,
  );
  const [priceInput, setPriceInput] = useState(initial ? String(initial.price) : '');
  const [stockInput, setStockInput] = useState(initial ? String(initial.stock) : '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (key: keyof ProductFormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setUploading(true);
    try {
      const url = await adminApi.products.uploadImage(token, file);
      set('images', [...(form.images ?? []), url]);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const removeImage = (url: string) =>
    set('images', (form.images ?? []).filter((u) => u !== url));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setError('');
    try {
      if (initial) {
        await adminApi.products.update(token, initial.id, form);
      } else {
        await adminApi.products.create(token, form);
      }
      router.push('/admin/products');
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5 bg-white rounded-xl border p-8">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            required
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B5F3A]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (£) *</label>
          <input
            required
            type="number"
            min={0.01}
            step={0.01}
            value={priceInput}
            onChange={(e) => {
              setPriceInput(e.target.value);
              set('price', parseFloat(e.target.value) || 0);
            }}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B5F3A]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
          <input
            required
            type="number"
            min={0}
            value={stockInput}
            onChange={(e) => {
              setStockInput(e.target.value);
              set('stock', parseInt(e.target.value) || 0);
            }}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B5F3A]"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B5F3A]"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
          <textarea
            rows={2}
            value={form.ingredients}
            onChange={(e) => set('ingredients', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B5F3A]"
          />
        </div>

        <div className="col-span-2 flex items-center gap-2">
          <input
            id="isActive"
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => set('isActive', e.target.checked)}
            className="rounded"
          />
          <label htmlFor="isActive" className="text-sm text-gray-700">Active (visible in shop)</label>
        </div>
      </div>

      {/* Image upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
        <div className="flex flex-wrap gap-3 mb-3">
          {form.images?.map((url) => (
            <div key={url} className="relative group w-20 h-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="product" className="w-20 h-20 object-cover rounded-lg border" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
          <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#2B5F3A] transition-colors">
            {uploading ? (
              <span className="text-xs text-gray-400">…</span>
            ) : (
              <span className="text-2xl text-gray-400">+</span>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className="bg-[#2B5F3A] text-white px-6 py-2 rounded-lg text-sm hover:bg-[#224a2e] disabled:opacity-50 transition"
        >
          {saving ? 'Saving…' : initial ? 'Save changes' : 'Create product'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="border px-6 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
