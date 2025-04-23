'use client'

import Link from 'next/link';
import { useState } from 'react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white p-6 shadow-sm z-50">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center justify-center w-full lg:w-auto">
          <span className="font-semibold text-xl tracking-tight text-primary-green">
            RENOYL
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center px-3 py-2 border rounded text-primary-green border-primary-green hover:text-gold hover:border-gold"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="text-sm lg:flex-grow flex justify-center lg:justify-start mt-4 lg:mt-0">
            <Link href="/shop" className="block mt-4 lg:inline-block lg:mt-0 text-primary-green hover:text-gold mr-4">
              SHOP
            </Link>
            <Link href="/about" className="block mt-4 lg:inline-block lg:mt-0 text-primary-green hover:text-gold mr-4">
              ABOUT
            </Link>
            <Link href="/account" className="block mt-4 lg:inline-block lg:mt-0 text-primary-green hover:text-gold">
              MY ACCOUNT
            </Link>
          </div>
          <div className="mt-4 lg:mt-0">
            <Link href="/cart" className="inline-block text-sm px-4 py-2 leading-none border rounded text-primary-green border-primary-green hover:border-transparent hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;