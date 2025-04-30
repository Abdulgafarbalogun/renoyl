// components/Header.jsx
"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingCart } from 'lucide-react';
import CartCount from './CartCount';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Adding a placeholder div to prevent content from hiding behind fixed header */}
      <div className="h-16"></div>
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button 
              className="md:hidden mr-4 flex items-center" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/shop" className="uppercase text-sm font-medium text-gray-700 hover:text-green-600">
                Shop
              </Link>
              <Link href="/about" className="uppercase text-sm font-medium text-gray-700 hover:text-green-600">
                About
              </Link>
            </nav>
          </div>

          {/* Logo - Truly centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="block">
              <div className="relative h-10 w-28">
                <Image 
                  src="/img/logo.png" 
                  alt="Rentyl Logo" 
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <Link href="/account" className="uppercase text-sm font-medium text-gray-700 hover:text-green-600 hidden sm:block">
              My Account
            </Link>
            <Link href="/checkout" className="relative">
              <ShoppingCart size={22} />
              <CartCount />
              {/* <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span> */}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white z-50 border-b border-gray-200 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <Link href="/shop" className="text-gray-700 hover:text-green-600 text-lg" onClick={toggleMobileMenu}>
                  Shop
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-green-600 text-lg" onClick={toggleMobileMenu}>
                  About
                </Link>
                <Link href="/account" className="text-gray-700 hover:text-green-600 text-lg" onClick={toggleMobileMenu}>
                  My Account
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
