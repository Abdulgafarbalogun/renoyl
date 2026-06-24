"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useZustandStore } from '../store/zustandStore';
import { useAuthStore } from '../store/authStore';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const cart = useZustandStore((state) => state.cart);
  const { user, clearAuth } = useAuthStore();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSignOut = () => {
    clearAuth();
    setAccountOpen(false);
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">

        {/* Left — mobile hamburger + desktop nav */}
        <div className="flex items-center">
          <button
            className="lg:hidden mr-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className="hidden md:flex space-x-8">
            <Link href="/shop" className="uppercase text-xs font-semibold tracking-widest text-gray-700 hover:text-[#2B5F3A] transition-colors">
              Shop
            </Link>
            <Link href="/about" className="uppercase text-xs font-semibold tracking-widest text-gray-700 hover:text-[#2B5F3A] transition-colors">
              About
            </Link>
          </nav>
        </div>

        {/* Centre — logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <div className="relative h-10 w-28">
              <Image src="/img/logo.png" alt="Renoyl" fill style={{ objectFit: 'contain' }} priority />
            </div>
          </Link>
        </div>

        {/* Right — account + cart */}
        <div className="flex items-center space-x-6">

          {/* Account */}
          <div className="hidden sm:block relative" ref={accountRef}>
            {user ? (
              <>
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="uppercase text-xs font-semibold tracking-widest text-gray-700 hover:text-[#2B5F3A] transition-colors flex items-center gap-1"
                >
                  My Account
                  <span className="text-xs">▾</span>
                </button>
                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border text-sm z-50">
                    <Link
                      href="/account"
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                    >
                      Overview
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/account/profile"
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                    >
                      Personal Details
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setAccountOpen(false)}
                        className="block px-4 py-2.5 hover:bg-gray-50 text-purple-600 font-medium"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <hr className="my-1" />
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-red-500"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link href="/signin" className="uppercase text-xs font-semibold tracking-widest text-gray-700 hover:text-[#2B5F3A] transition-colors">
                My Account
              </Link>
            )}
          </div>

          {/* Cart */}
          <div className="relative" ref={cartRef}>
            <button onClick={() => setCartOpen(!cartOpen)} aria-label="Shopping cart" className="relative">
              <ShoppingBag className="h-6 w-6 text-gray-800" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#2B5F3A] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {cartOpen && (
              <div className="absolute right-0 mt-2 w-[min(340px,calc(100vw-1rem))] bg-white rounded-xl shadow-xl z-50 overflow-hidden border border-gray-100">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <h3 className="font-semibold text-sm text-gray-900">
                    Cart {cartItemsCount > 0 && <span className="text-gray-400 font-normal">({cartItemsCount})</span>}
                  </h3>
                  <button onClick={() => setCartOpen(false)} aria-label="Close">
                    <X size={16} className="text-gray-400 hover:text-gray-700" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="px-4 py-10 text-center">
                    <ShoppingBag className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 mb-4">Your cart is empty</p>
                    <Link href="/shop" onClick={() => setCartOpen(false)}>
                      <span className="inline-block bg-[#2B5F3A] text-white px-5 py-2 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-[#224a2e] transition-colors">
                        Shop now
                      </span>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                      {cart.map((item) => (
                        <div key={item.id} className="p-4 flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#EDE4E1] rounded-lg overflow-hidden shrink-0 relative">
                            <Image src={item.imageUrl} alt={item.name} fill style={{ objectFit: 'cover' }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              £{item.price.toFixed(2)} × {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 shrink-0">
                            £{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border-t bg-gray-50/50">
                      <div className="flex justify-between text-sm font-semibold text-gray-900 mb-3">
                        <span>Subtotal</span>
                        <span>£{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href="/cart"
                          onClick={() => setCartOpen(false)}
                          className="flex-1 border border-gray-200 hover:border-[#2B5F3A] text-gray-700 hover:text-[#2B5F3A] text-xs font-semibold py-2.5 rounded-md text-center transition-colors"
                        >
                          View Cart
                        </Link>
                        <Link
                          href="/checkout"
                          onClick={() => setCartOpen(false)}
                          className="flex-1 bg-[#2B5F3A] hover:bg-[#224a2e] text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-md text-center transition-colors"
                        >
                          Checkout
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white z-40 border-b shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-1 text-sm font-medium">
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700">Shop</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700">About</Link>
            <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700">
              Cart {cartItemsCount > 0 && <span className="ml-1 bg-[#2B5F3A] text-white text-xs rounded-full px-1.5 py-0.5">{cartItemsCount}</span>}
            </Link>
            <hr className="my-1" />
            {user ? (
              <>
                <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700">My Account</Link>
                <Link href="/account/orders" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700">My Orders</Link>
                {user.role === 'admin' && (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-gray-50 text-purple-600">Admin Panel</Link>
                )}
                <button
                  onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                  className="px-3 py-2.5 rounded-lg hover:bg-red-50 text-left text-red-500"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link href="/signin" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700">Sign in</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
