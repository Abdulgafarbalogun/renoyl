"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu, X, ShoppingBag, Trash } from 'lucide-react';
import { useZustandStore } from '../store/zustandStore';
import { useAuthStore } from '../store/authStore';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const cart = useZustandStore((state) => state.cart);
  const removeItem = useZustandStore((state) => state.removeItem);
  const clearCart = useZustandStore((state) => state.clearCart);
  const { user, clearAuth } = useAuthStore();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Close account dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
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

  const handleClearCart = () => {
    if (window.confirm('Clear all items from cart?')) clearCart();
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
            <Link href="/shop" className="uppercase text-sm font-medium text-gray-700 hover:text-green-600">
              Shop
            </Link>
            <Link href="/about" className="uppercase text-sm font-medium text-gray-700 hover:text-green-600">
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
                  className="uppercase text-sm font-medium text-gray-700 hover:text-green-600 flex items-center gap-1"
                >
                  {user.name.split(' ')[0]}
                  <span className="text-xs">▾</span>
                </button>
                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border text-sm z-50">
                    <Link
                      href="/account"
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                    >
                      My Orders
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
              <Link href="/signin" className="uppercase text-sm font-medium text-gray-700 hover:text-green-600">
                Sign in
              </Link>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <button onClick={() => setCartOpen(!cartOpen)} aria-label="Shopping cart">
              <ShoppingBag className="h-6 w-6 text-gray-800" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {cartOpen && (
              <div className="absolute right-0 mt-2 w-[min(320px,calc(100vw-1rem))] bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="font-medium">Cart</h3>
                </div>
                {cart.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="mb-4 text-gray-600">Your cart is empty</p>
                    <Link href="/shop" onClick={() => setCartOpen(false)}>
                      <button className="bg-green-600 text-white px-4 py-2 rounded text-sm">Shop Now</button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="max-h-80 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="p-4 border-b flex items-center gap-3">
                          <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center shrink-0">
                            <Image src={item.imageUrl} alt={item.name} width={48} height={48} className="object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-sm text-gray-500">£{item.price.toFixed(2)} × {item.quantity}</p>
                          </div>
                          <button onClick={() => removeItem(item.id)} aria-label="Remove" className="text-gray-400 hover:text-red-500">
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t">
                      <div className="flex justify-between mb-3 font-medium">
                        <span>Total</span>
                        <span>£{total.toFixed(2)}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={handleClearCart} className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm hover:bg-red-50">
                          Clear
                        </button>
                        <Link href="/checkout" onClick={() => setCartOpen(false)} className="flex-1">
                          <button className="w-full bg-green-600 text-white px-3 py-2 rounded text-sm">Checkout</button>
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
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4 text-sm font-medium">
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            {user ? (
              <>
                <Link href="/account" onClick={() => setMobileMenuOpen(false)}>My Account</Link>
                <Link href="/account/orders" onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
                {user.role === 'admin' && (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-purple-600">Admin Panel</Link>
                )}
                <button onClick={() => { handleSignOut(); setMobileMenuOpen(false); }} className="text-left text-red-500">
                  Sign out
                </button>
              </>
            ) : (
              <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>Sign in</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
