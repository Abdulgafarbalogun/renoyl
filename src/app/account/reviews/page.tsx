"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface OrderItem {
  productName: string;
  quantity: number;
}

interface Order {
  id: string;
  createdAt: string;
  status: string;
  items: OrderItem[];
}

export default function AccountReviewsPage() {
  const { token } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/orders/mine`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (r) => {
        if (!r.ok) throw new Error();
        const data = await r.json();
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [token]);

  const fulfilledOrders = orders.filter((o) => o.status === 'fulfilled');

  if (loading) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Awaiting Reviews</h2>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
              <div className="h-3 bg-gray-100 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (fulfilledOrders.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Awaiting Reviews</h2>
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <Star className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-600 font-medium mb-1">No reviews pending</p>
          <p className="text-gray-400 text-sm mb-6">
            Products from delivered orders will appear here for you to review.
          </p>
          <Link href="/shop" className="inline-block bg-[#2B5F3A] text-white px-6 py-2.5 rounded-lg text-sm hover:bg-[#224a2e] transition">
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Awaiting Reviews</h2>
      <div className="space-y-3">
        {fulfilledOrders.flatMap((order) =>
          (order.items ?? []).map((item, idx) => (
            <div
              key={`${order.id}-${idx}`}
              className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-medium text-gray-900 text-sm">{item.productName}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Order #{order.id.slice(0, 8).toUpperCase()} ·{' '}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                disabled
                title="Review feature coming soon"
                className="shrink-0 border border-[#2B5F3A] text-[#2B5F3A] px-4 py-2 rounded-lg text-xs font-medium opacity-50 cursor-not-allowed"
              >
                Add review
              </button>
            </div>
          ))
        )}
      </div>
      <p className="text-xs text-gray-400 mt-4 text-center">
        Product reviews are coming soon.
      </p>
    </div>
  );
}
