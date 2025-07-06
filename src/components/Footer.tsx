'use client'

// components/Footer.jsx
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
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
                <Link href="/contact-us" className="text-white hover:text-green-200 text-sm">
                  Contact us
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
                <a href="mailto:info@renoyl.com" className="text-white hover:text-green-200">
                  info@renoyl.com
                </a>
              </li>
            </ul>
          </div>

          {/* FOLLOW Column */}
          <div className="col-span-1">
            <h3 className="text-white uppercase font-medium tracking-wide mb-4">Follow</h3>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-200">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-200">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* JOIN OUR COMMUNITY Column */}
          <div className="col-span-1">
            <h3 className="text-white uppercase font-medium tracking-wide mb-4">Join our community</h3>
            <form onSubmit={handleSubmit} className="mt-2">
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your email address"
                  className="px-4 py-2 rounded-md text-gray-800 w-full"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-green-800 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition duration-300 uppercase"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
