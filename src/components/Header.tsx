"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingBag, Trash } from 'lucide-react';
import { useZustandStore } from '../store/zustandStore';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  
  // Get cart data from Zustand store
  const cart = useZustandStore((state) => state.cart);
  const removeFromCart = useZustandStore((state) => state.removeFromCart);
  const clearCart = useZustandStore((state) => state.clearCart); // Added clearCart function
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartItems = cart;
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Function to handle clearing cart with confirmation
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear all items from your cart?')) {
      clearCart();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <button
            className="lg:hidden mr-4 flex items-center"
            onClick={toggleMobileMenu}
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
        
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="block">
            <div className="relative h-10 w-28">
              <Image src="/img/logo.png" alt="Rentyl Logo" fill style={{ objectFit: 'contain' }} priority />
            </div>
          </Link>
        </div>
        
        <div className="flex items-center space-x-6">
          <Link
            href="/signin"
            className="uppercase text-sm font-medium text-gray-700 hover:text-green-600 hidden sm:block"
          >
            My Account
          </Link>
          
          <div className="relative">
            <button 
              onClick={() => setCartOpen(!cartOpen)} 
              className="flex items-center"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-6 w-6 text-gray-800" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            
            {/* Mini Cart Dropdown */}
            {cartOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-medium">Cart</h3>
                </div>
                
                {cartItems.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="mb-4 text-gray-600">Your cart is empty</p>
                    <Link href="/shop">
                      <button className="bg-green-600 text-white px-4 py-2 rounded text-sm">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="max-h-80 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div key={item.id} className="p-4 border-b border-gray-100 flex items-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            <Image 
                              src={item.imageUrl} 
                              alt={item.name} 
                              width={50} 
                              height={50} 
                              className="object-contain" 
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">€{item.price.toFixed(2)}</p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs mr-2">Qty: {item.quantity}</span>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-400 hover:text-gray-600"
                                aria-label="Remove item"
                              >
                                <Trash className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 border-t border-gray-100">
                      <div className="flex justify-between mb-4">
                        <span className="font-medium">Total</span>
                        <span className="font-medium">€{calculateTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={handleClearCart}
                          className="flex-1 w-full bg-gray-100 text-gray-800 px-4 py-2 rounded text-sm hover:bg-red-100"
                        >
                          Clear Cart
                        </button>
                        <Link href="/checkout" className="flex-1">
                          <button className="w-full bg-green-600 text-white px-4 py-2 rounded text-sm">
                            Checkout
                          </button>
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
      
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white z-40 border-b border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/shop" onClick={toggleMobileMenu}>Shop</Link>
              <Link href="/about" onClick={toggleMobileMenu}>About</Link>
              <Link href="/account" onClick={toggleMobileMenu}>My Account</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;