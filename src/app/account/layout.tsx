"use client";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShoppingBag,
  UserPen,
  Star,
  CreditCard,
  Settings,
  Mail,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import PageBanner from '@/components/PageBanner';

const NAV = [
  { href: '/account',            label: 'Overview',         icon: LayoutDashboard, exact: true },
  { href: '/account/orders',     label: 'Orders',           icon: ShoppingBag,     exact: false },
  { href: '/account/profile',    label: 'Personal details', icon: UserPen,         exact: false },
  { href: '/account/reviews',    label: 'Awaiting Reviews', icon: Star,            exact: false },
  { href: '/account/payment',    label: 'Payment',          icon: CreditCard,      exact: false },
  { href: '/account/settings',   label: 'Setting',          icon: Settings,        exact: false },
  { href: '/account/newsletter', label: 'Newsletter',       icon: Mail,            exact: false },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { token, clearAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!token) router.replace('/signin');
  }, [token, router]);

  if (!token) return null;

  const handleSignOut = () => {
    clearAuth();
    router.push('/');
  };

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <PageBanner title="My account" />

      <div className="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-12 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">

          {/* Sidebar */}
          <aside className="md:w-52 shrink-0">
            <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-1 md:pb-0">
              {NAV.map(({ href, label, icon: Icon, exact }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive(href, exact)
                      ? 'bg-[#2B5F3A] text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={15} className="shrink-0" />
                  {label}
                </Link>
              ))}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors whitespace-nowrap md:mt-2 w-full text-left"
              >
                <LogOut size={15} className="shrink-0" />
                Log out
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </>
  );
}
