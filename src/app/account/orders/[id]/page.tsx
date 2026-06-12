"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
  customerName: string;
  customerEmail: string;
  shippingAddress: Record<string, string> | null;
  items: { productName: string; productPrice: number; quantity: number }[];
}

export default function AccountOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token || !id) return;
    fetch(`${API_URL}/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (r) => {
        if (!r.ok) throw new Error('Order not found');
        return r.json();
      })
      .then(setOrder)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, id]);

  if (loading) return <p className="text-gray-500">Loading…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!order) return null;

  const addr = order.shippingAddress;

  return (
    <div className="space-y-6">
      <div>
        <Link href="/account/orders" className="text-sm text-gray-500 hover:text-gray-800">
          ← My Orders
        </Link>
        <div className="flex items-center gap-3 mt-1">
          <h2 className="text-lg font-semibold text-gray-900">
            Order #{order.id.slice(0, 8).toUpperCase()}
          </h2>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOURS[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
            {order.status}
          </span>
        </div>
        <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
      </div>

      {/* Shipping address */}
      {addr && (
        <div className="bg-white rounded-xl border p-5 text-sm">
          <p className="font-medium text-gray-700 mb-2">Shipping Address</p>
          <p>{addr.line1}</p>
          {addr.line2 && <p>{addr.line2}</p>}
          <p>{[addr.city, addr.state, addr.postal_code].filter(Boolean).join(', ')}</p>
          <p>{addr.country}</p>
        </div>
      )}

      {/* Line items */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Item</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600">Qty</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Price</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="px-4 py-3">{item.productName}</td>
                <td className="px-4 py-3 text-center">{item.quantity}</td>
                <td className="px-4 py-3 text-right">£{Number(item.productPrice).toFixed(2)}</td>
                <td className="px-4 py-3 text-right">£{(Number(item.productPrice) * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t bg-gray-50">
            <tr>
              <td colSpan={3} className="px-4 py-3 text-right font-semibold">Total</td>
              <td className="px-4 py-3 text-right font-semibold">£{Number(order.totalAmount).toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <Link href="/shop" className="inline-block border border-[#2B5F3A] text-[#2B5F3A] px-6 py-2 rounded-lg text-sm hover:bg-[#2B5F3A] hover:text-white transition">
        Continue shopping
      </Link>
    </div>
  );
}
