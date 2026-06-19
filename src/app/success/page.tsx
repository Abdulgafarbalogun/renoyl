"use client";
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useZustandStore } from '@/store/zustandStore';

interface OrderItem {
  productName: string;
  quantity: number;
  productPrice: number;
}

interface Order {
  id: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const clearCart = useZustandStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
    if (!sessionId) { setLoading(false); return; }
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    fetch(`${apiUrl}/orders/by-session?sessionId=${sessionId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setOrder(data))
      .catch(() => null)
      .finally(() => setLoading(false));
  }, [sessionId, clearCart]);

  return (
    <div className="container mx-auto max-w-xl px-4 py-16 text-center">
      <div className="text-5xl mb-4">✓</div>
      <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-8">Thank you for your order. A confirmation email is on its way.</p>

      {loading && <p className="text-gray-500">Loading order details…</p>}

      {!loading && order && (
        <div className="bg-gray-50 rounded-lg p-6 text-left mb-8 border border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Order #{order.id.slice(0, 8).toUpperCase()}</p>
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1">Item</th>
                <th className="text-center py-1">Qty</th>
                <th className="text-right py-1">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2">{item.productName}</td>
                  <td className="text-center py-2">{item.quantity}</td>
                  <td className="text-right py-2">£{Number(item.productPrice).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-right font-semibold">Total: £{Number(order.totalAmount).toFixed(2)}</p>
        </div>
      )}

      <Link
        href="/shop"
        className="inline-block bg-[#2B5F3A] text-white py-3 px-8 rounded-lg hover:bg-[#224a2e] transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-gray-500">Loading…</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
