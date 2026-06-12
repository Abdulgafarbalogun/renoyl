'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* EXPLORE */}
          <div>
            <h3 className="uppercase font-medium tracking-wide mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-green-200">Shop</Link></li>
              <li><Link href="/about" className="hover:text-green-200">About</Link></li>
              <li><Link href="/contact-us" className="hover:text-green-200">Contact us</Link></li>
            </ul>
          </div>

          {/* INFO */}
          <div>
            <h3 className="uppercase font-medium tracking-wide mb-4">Info</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shipping-returns" className="hover:text-green-200">Shipping &amp; Returns</Link></li>
              <li><Link href="/terms-conditions" className="hover:text-green-200">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-green-200">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="uppercase font-medium tracking-wide mb-4">Contact</h3>
            <a href="mailto:info@renoyl.com" className="text-sm hover:text-green-200">info@renoyl.com</a>
          </div>

          {/* FOLLOW */}
          <div>
            <h3 className="uppercase font-medium tracking-wide mb-4">Follow</h3>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-200"><Facebook size={20} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-200"><Instagram size={20} /></a>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="uppercase font-medium tracking-wide mb-4">Join our community</h3>
            {status === 'success' ? (
              <p className="text-sm text-green-200">Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                <input
                  type="email" required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your email address"
                  className="px-4 py-2 rounded-md text-gray-800 w-full text-sm"
                />
                {status === 'error' && (
                  <p className="text-red-300 text-xs">Something went wrong. Try again.</p>
                )}
                <button
                  type="submit" disabled={status === 'loading'}
                  className="bg-white text-green-800 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition uppercase text-sm disabled:opacity-60"
                >
                  {status === 'loading' ? 'Subscribing…' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-green-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative h-8 w-20">
            <Image src="/img/logo.png" alt="Renoyl" fill style={{ objectFit: 'contain' }} className="brightness-0 invert" />
          </div>
          <p className="text-xs text-green-300">© {new Date().getFullYear()} Renoyl. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
