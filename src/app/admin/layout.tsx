"use client";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '▦' },
  { href: '/admin/products', label: 'Products', icon: '◈' },
  { href: '/admin/orders', label: 'Orders', icon: '◉' },
  { href: '/admin/users', label: 'Customers', icon: '◎' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { token, user, clearAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      router.replace('/signin');
    }
  }, [token, user, router]);

  if (!token || user?.role !== 'admin') return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-[#1a3a28] text-white flex flex-col shrink-0">
        <div className="px-6 py-5 border-b border-white/10">
          <span className="text-lg font-semibold tracking-wide">Renoyl Admin</span>
        </div>
        <nav className="flex-1 py-4">
          {NAV.map(({ href, label, icon }) => {
            const active = href === '/admin' ? pathname === '/admin' : pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  active ? 'bg-white/10 font-medium' : 'hover:bg-white/5 text-white/70'
                }`}
              >
                <span>{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="px-6 py-4 border-t border-white/10 space-y-2">
          <Link href="/" className="block text-xs text-white/50 hover:text-white/80 transition-colors">
            ← Back to site
          </Link>
          <button
            onClick={() => { clearAuth(); router.push('/signin'); }}
            className="block text-xs text-white/50 hover:text-white/80 transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between shrink-0">
          <h1 className="text-sm text-gray-500">
            Logged in as <span className="font-medium text-gray-800">{user?.name}</span>
          </h1>
        </header>
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
