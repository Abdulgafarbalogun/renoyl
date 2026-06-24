'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

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
    <>
      {/* Newsletter strip */}
      <div className="bg-[#EDE4E1]">
        <div className="container mx-auto px-6 lg:px-12 py-10 md:py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Join our community for updates &amp; news
          </h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Get exclusive offers, hair care tips, and new product launches straight to your inbox.
          </p>
        </div>
      </div>

      {/* Main footer */}
      <footer className="bg-[#1B3A2D] text-white">
        <div className="container mx-auto px-6 lg:px-12 pt-10 pb-8 md:pt-14 md:pb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10">

            {/* Logo + brand */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <div className="relative h-9 w-24 mb-4">
                <Image
                  src="/img/logo.png"
                  alt="Renoyl"
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'left' }}
                  className="brightness-0 invert"
                />
              </div>
              <p className="text-[#9CB8A8] text-xs leading-relaxed max-w-[180px]">
                Premium hair oils to combat hair loss, boost volume and nurture a healthy scalp.
              </p>
            </div>

            {/* Explore */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-4">Explore</p>
              <ul className="space-y-3">
                {[{ label: 'Shop', href: '/shop' }, { label: 'About', href: '/about' }].map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-[#9CB8A8] hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-4">Info</p>
              <ul className="space-y-3">
                {[
                  { label: 'Shipping & Returns', href: '/shipping-returns' },
                  { label: 'Terms & Conditions', href: '/terms-conditions' },
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-[#9CB8A8] hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Follow */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-4">Contact</p>
              <a href="mailto:info@renoyl.com" className="text-sm text-[#9CB8A8] hover:text-white transition-colors block mb-6">
                info@renoyl.com
              </a>
              <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-4">Follow</p>
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-white hover:text-white transition-all"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-white hover:text-white transition-all"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>

            {/* Join our community */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-4">Join Our Community</p>
              {status === 'success' ? (
                <div className="bg-[#2B5F3A]/40 border border-[#2B5F3A] rounded-xl px-4 py-3">
                  <p className="text-sm text-green-300 font-medium">You&apos;re subscribed!</p>
                  <p className="text-xs text-[#9CB8A8] mt-1">Thanks for joining.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition"
                  />
                  {status === 'error' && (
                    <p className="text-red-400 text-xs">Something went wrong. Try again.</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-white text-[#1B3A2D] hover:bg-[#F9F7F2] px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition disabled:opacity-60"
                  >
                    {status === 'loading' ? 'Subscribing…' : 'Submit'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-white/40">© {new Date().getFullYear()} Renoyl. All rights reserved.</p>
            <a href="mailto:info@renoyl.com" className="text-xs text-[#9CB8A8] hover:text-white transition-colors">
              info@renoyl.com
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
