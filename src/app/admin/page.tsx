"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { adminApi, AnalyticsSummary, RevenuePoint } from '@/lib/adminApi';

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border p-6">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const { token } = useAuthStore();
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([
      adminApi.analytics.summary(token),
      adminApi.analytics.revenue(token, period),
    ])
      .then(([s, r]) => { setSummary(s); setRevenue(r); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, period]);

  if (loading) return <p className="text-gray-500">Loading…</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const maxRevenue = Math.max(...revenue.map((r) => r.revenue), 1);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Total Revenue" value={`$${summary?.revenue.toFixed(2) ?? '0.00'}`} />
          <StatCard label="Total Orders" value={String(summary?.orderCount ?? 0)} />
          <StatCard label="Avg Order Value" value={`$${summary?.avgOrderValue.toFixed(2) ?? '0.00'}`} />
        </div>
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-800">Revenue over time</h3>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as '7d' | '30d' | '90d')}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
        {revenue.length === 0 ? (
          <p className="text-sm text-gray-400 py-8 text-center">No revenue data for this period.</p>
        ) : (
          <div className="flex items-end gap-1 h-40">
            {revenue.map((pt) => (
              <div key={pt.day} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div
                  className="w-full bg-[#2B5F3A] rounded-t opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ height: `${(pt.revenue / maxRevenue) * 100}%`, minHeight: 2 }}
                />
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                  ${pt.revenue.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top products */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-800">Top Products</h3>
          <Link href="/admin/products" className="text-sm text-[#2B5F3A] hover:underline">
            Manage →
          </Link>
        </div>
        {!summary?.topProducts.length ? (
          <p className="text-sm text-gray-400">No sales data yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="pb-2 font-medium">Product</th>
                <th className="pb-2 font-medium text-right">Units Sold</th>
                <th className="pb-2 font-medium text-right">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {summary.topProducts.map((p) => (
                <tr key={p.name} className="border-b last:border-0">
                  <td className="py-2">{p.name}</td>
                  <td className="py-2 text-right">{p.quantity}</td>
                  <td className="py-2 text-right">${p.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
