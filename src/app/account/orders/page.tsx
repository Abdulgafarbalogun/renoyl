"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const STATUS_COLOURS: Record<string, string> = {
  pending:   'bg-yellow-100 text-yellow-700',
  paid:      'bg-blue-100 text-blue-700',
  fulfilled: 'bg-green-100 text-green-700',
  refunded:  'bg-gray-100 text-gray-600',
};

interface Order {
  id: string;
  createdAt: string;
  status: string;
  totalAmount: number;
  items: { productName: string; quantity: number }[];
}

export default function AccountOrdersPage() {
  const { token } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(`${API_URL}/orders/mine`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch(() => setError('We couldn\'t load your orders. Please try again later.'))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border p-4 animate-pulse">
            <div className="h-3 bg-gray-100 rounded w-1/3 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 text-sm mb-3">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-[#2B5F3A] hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center">
        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-gray-600 font-medium mb-1">No orders yet</p>
        <p className="text-gray-400 text-sm mb-4">You haven&apos;t placed any orders yet.</p>
        <Link href="/shop" className="inline-block bg-[#2B5F3A] text-white px-6 py-2.5 rounded-lg text-sm hover:bg-[#224a2e] transition">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Order History</h2>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Order</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Date</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Total</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-mono text-xs text-gray-500">#{o.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                    {(o.items ?? []).map((i) => `${i.productName} ×${i.quantity}`).join(', ')}
                  </p>
                  <span className={`sm:hidden inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOURS[o.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap hidden sm:table-cell">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right font-medium">
                  £{Number(o.totalAmount).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-center hidden sm:table-cell">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOURS[o.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/account/orders/${o.id}`} className="text-[#2B5F3A] hover:underline text-xs whitespace-nowrap">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
