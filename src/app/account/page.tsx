"use client";
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function AccountOverviewPage() {
  const { user } = useAuthStore();

  const fields = [
    { label: 'Name',         value: user?.name  || '—' },
    { label: 'Address',      value: '—' },
    { label: 'Phone number', value: '—' },
    { label: 'Email',        value: user?.email || '—' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Overview</h2>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-lg">
        <div className="divide-y divide-gray-100">
          {fields.map(({ label, value }) => (
            <div key={label} className="py-4 first:pt-0 last:pb-0">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{label}</p>
              <p className="text-sm text-gray-900">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/account/profile"
            className="inline-block bg-[#2B5F3A] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#224a2e] transition-colors"
          >
            Edit personal details
          </Link>
          <Link
            href="/account/orders"
            className="inline-block border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:border-gray-300 transition-colors"
          >
            View orders
          </Link>
        </div>
      </div>
    </div>
  );
}
