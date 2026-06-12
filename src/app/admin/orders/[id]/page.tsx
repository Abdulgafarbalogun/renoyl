"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { adminApi, AdminOrder } from '@/lib/adminApi';

const STATUSES = ['pending', 'paid', 'fulfilled', 'refunded'] as const;
const STATUS_COLOURS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-blue-100 text-blue-700',
  fulfilled: 'bg-green-100 text-green-700',
  refunded: 'bg-gray-100 text-gray-600',
};

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthStore();
  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token || !id) return;
    adminApi.orders
      .get(token, id)
      .then(setOrder)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, id]);

  const updateStatus = async (status: string) => {
    if (!token || !order) return;
    setSaving(true);
    try {
      const updated = await adminApi.orders.updateStatus(token, order.id, status);
      setOrder(updated);
    } catch (e: unknown) {
      alert((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const refund = async () => {
    if (!token || !order) return;
    if (!confirm('Issue a full refund? This cannot be undone.')) return;
    setSaving(true);
    try {
      await adminApi.orders.refund(token, order.id);
      setOrder({ ...order, status: 'refunded' });
    } catch (e: unknown) {
      alert((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">Loading…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!order) return null;

  const addr = order.shippingAddress;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link href="/admin/orders" className="text-sm text-gray-500 hover:text-gray-800">
          ← Orders
        </Link>
        <div className="flex items-center gap-3 mt-1">
          <h2 className="text-xl font-semibold text-gray-900">
            Order #{order.id.slice(0, 8).toUpperCase()}
          </h2>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOURS[order.status] ?? 'bg-gray-100 text-gray-600'}`}
          >
            {order.status}
          </span>
        </div>
        <p className="text-sm text-gray-400 mt-0.5">
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Customer + shipping */}
      <div className="bg-white rounded-xl border p-6 grid grid-cols-2 gap-6 text-sm">
        <div>
          <p className="font-medium text-gray-700 mb-1">Customer</p>
          <p>{order.customerName || '—'}</p>
          <p className="text-gray-500">{order.customerEmail}</p>
        </div>
        {addr && (
          <div>
            <p className="font-medium text-gray-700 mb-1">Shipping Address</p>
            <p>{addr.line1}</p>
            {addr.line2 && <p>{addr.line2}</p>}
            <p>{[addr.city, addr.state, addr.postal_code].filter(Boolean).join(', ')}</p>
            <p>{addr.country}</p>
          </div>
        )}
      </div>

      {/* Line items */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Item</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600">Qty</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Unit Price</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="px-4 py-3">{item.productName}</td>
                <td className="px-4 py-3 text-center">{item.quantity}</td>
                <td className="px-4 py-3 text-right">${Number(item.productPrice).toFixed(2)}</td>
                <td className="px-4 py-3 text-right">
                  ${(Number(item.productPrice) * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t bg-gray-50">
            <tr>
              <td colSpan={3} className="px-4 py-3 text-right font-semibold">Total</td>
              <td className="px-4 py-3 text-right font-semibold">
                ${Number(order.totalAmount).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl border p-6 space-y-4">
        <p className="font-medium text-gray-800 text-sm">Actions</p>
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={order.status}
            onChange={(e) => updateStatus(e.target.value)}
            disabled={saving || order.status === 'refunded'}
            className="text-sm border rounded-lg px-3 py-2"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={() => updateStatus(order.status)}
            disabled={saving}
            className="bg-[#2B5F3A] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#224a2e] disabled:opacity-50 transition"
          >
            {saving ? 'Saving…' : 'Update status'}
          </button>
          {order.status !== 'refunded' && (
            <button
              onClick={refund}
              disabled={saving}
              className="border border-red-300 text-red-500 text-sm px-4 py-2 rounded-lg hover:bg-red-50 disabled:opacity-50 transition"
            >
              Issue refund
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
