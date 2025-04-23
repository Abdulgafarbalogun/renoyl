'use client'

// components/Footer.jsx
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  

  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* EXPLORE Column */}
          <div className="col-span-1">
            <h3 className="text-white uppercase font-medium tracking-wide mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-white hover:text-green-200 text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-green-200 text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/help-faq" className="text-white hover:text-green-200 text-sm">
                  Help/FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* INFO Column */}
          <div className="col-span-1">
            <h3 className="text-white uppercase font-medium tracking-wide mb-4">Info</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping-returns" className="text-white hover:text-green-200 text-sm">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-white hover:text-green-200 text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-white hover:text-green-200 text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT Column */}
          <div className="col-span-1">
            <h3 className="text-white uppercase font-medium tracking-wide mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm">
                <a href="mailto:info@rentyl.com" className="text-white hover:text-green-200">
                  info@rentyl.com
                </a>
              </li>
              <li className="flex space-x-3 mt-3">
                <a href="https://facebook.com/rentyl" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-200">
                  <Facebook size={20} />
                </a>
                <a href="https://instagram.com/rentyl" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-200">
                  <Instagram size={20} />
                </a>
              </li>
            </ul>
          </div>

          {/* FOLLOW Column - Empty in the design */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-white uppercase font-medium tracking-wide mb-4">Follow</h3>
          </div>

          {/* JOIN OUR COMMUNITY Column */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-white uppercase font-medium tracking-wide mb-4">Join our community</h3>
            <form className="mt-2">
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="px-4 py-2 rounded-md text-gray-800 w-full"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-green-800 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition duration-300"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-8 border-t border-green-700 text-center">
          <div className="flex justify-center mb-4">
            <Link href="/">
              <div className="relative h-8 w-24">
                <Image
                  src="/img/logo.png" // You would need a white version of your logo
                  alt="Rentyl Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </Link>
          </div>
          <p className="text-xs text-green-200">
            © {new Date().getFullYear()} Rentyl. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;